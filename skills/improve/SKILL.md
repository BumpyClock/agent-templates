---
name: improve
description: Audit a codebase and prioritize evidence-backed improvements. Use for codebase audits, roadmaps, or implementation plans.
license: MIT
metadata:
  author: shadcn
  version: "1.2.0"
---

# Improve

Produce evidence-backed findings or self-contained plans for the requested scope. Keep audit-only requests read-only.
When the user explicitly requests implementation, continue through [Programming](../programming/SKILL.md) within that scope.

## Hard Rules

1. **Preserve audit scope.** Do not edit source during an audit-only request. Write requested plans under `plans/` or an agreed report directory.
2. **Keep audit operations read-only.** Use inspection and side-effect-free checks. Implementation, commits, and external writes require authorization from the task.
3. **Every plan must be fully self-contained.** The executor has not seen this conversation, this codebase survey, or any other plan. If a plan references "the pattern discussed above," it is broken.
4. **Never reproduce secret values.** If the audit finds credentials, tokens, or `.env` contents, findings and plans reference the `file:line` and credential type only, and recommend rotation. The value itself must never appear in anything you write.
5. **Honor task transitions.** An explicit request to apply findings authorizes the selected implementation scope. No special command or repeated approval is required.

## Workflow

### Phase 1 — Scope the audit

Map the territory before judging it:

- Read repository instructions and the documents or configuration needed to establish the requested scope and its contracts.
- Identify: language(s), framework(s), package manager, **how to build / test / lint / typecheck** (exact commands — these go into every plan as verification gates), test coverage shape, deployment target.
- Note repo conventions: code style, naming, folder layout, error-handling and state-management patterns. Plans must tell the executor to *match* these, with examples.
- Tag key directories with the trust boundaries they touch (user-input, network, filesystem, secrets, process-exec, database, auth, permissions, concurrency, external-api, serialization). Subagent prompts point at boundaries, not at "the codebase" — "`src/webhooks/` handles unauthenticated network input" beats "look for security issues".
- Check git signal where useful (`git log --oneline -30`; churn hotspots via `git log --format= --name-only | sort | uniq -c | sort -rn | head -30`, crossed with file size/complexity — high churn × high complexity is where audits pay off) for what's actively evolving vs. frozen.
- Snapshot cheap quality metrics into the scoreboard table in `plans/README.md` (format in [references/plan-template.md](references/plan-template.md)): LOC, dependency count, test count, coverage (only if cheap to run), typecheck/lint error count, build time. Every future audit and `reconcile` re-snapshots — interpret these metrics against task outcomes; test count alone does not measure quality.

If the repo has no working verification command (no tests, broken build), record that — "establish a verification baseline" is often finding #1, and it must precede risky plans in the dependency order.

### Phase 2 — Audit (parallel)

Audit the codebase across the categories in [references/audit-playbook.md](references/audit-playbook.md) — read it now. Categories: **correctness/bugs, security, performance, test coverage, tech debt & architecture, AI slop & generated-code debt, dependencies & migrations, DX & tooling, docs, direction (features & what to build next)**.

**Run the mechanical sweep first** — the playbook's "Run the tools first" table (dead-code detectors, duplication, `ast-grep` bug patterns, strict typecheck, coverage). Static tools have near-perfect recall on mechanical patterns; spend model attention on judging their output and on what tools can't find. Tool hits are leads, not findings — each still needs the evidence/impact/confidence treatment.

Delegate independent audit boundaries when separate context or expertise justifies the cost. Otherwise inspect directly. Choose agent count from the work, not a category quota. Each delegated prompt must include:

- the **absolute path** to this skill's `references/audit-playbook.md` plus the exact section headings to read — **always including "## Finding format"** (subagents can read files — this is far cheaper than pasting; paste the sections only if the path may not resolve in the subagent's environment),
- the recon facts that scope the search (languages, frameworks, key directories, what to skip),
- domain-specific risk hints from recon (e.g. for a CLI that writes user files: "pay attention to path traversal and command injection"), including the trust-boundary tags for the directories in scope,
- the evidence contract: every evidence ref needs `path`, a 1-based line range, **and a verbatim quote (≤3 lines) copied exactly from those lines** — quotes are mechanically checked against the repo after the audit, and a finding whose quote doesn't match is dropped,
- an explicit instruction to return findings only — no fixes, no file dumps — and to confirm it could read the playbook file.

Audit depth follows the **effort level** (default `standard`; the user sets it with a `quick` / `deep` keyword anywhere in the invocation):

| | `quick` | `standard` (default) | `deep` |
|---|---|---|---|
| Coverage | Recon hotspots only — highest-churn, highest-criticality code | Hotspot-weighted, key packages | Whole repo, every package |
| Subagents | 0–1 (sweep directly when feasible) | ≤4 concurrent | ≤8 concurrent, one per category |
| Breadth | "medium" | "very thorough" for correctness + security, "medium" rest | "very thorough" everywhere |
| Categories | correctness, security, performance, AI slop, tests | all ten | all ten |
| Findings | top ~6, HIGH-confidence only | full table | full table incl. LOW-confidence "investigate" items |

Whatever the level, say in the final report what was *not* audited. On a large monorepo even `deep` scopes subagents to packages, not the root.

Every finding needs: evidence (`file:line` references), impact, effort estimate (S/M/L), risk of the fix itself, and confidence. No vibes-only findings.

### Phase 3 — Vet, prioritize, confirm

**Mechanically validate evidence first.** Collect every candidate finding into a JSON file in a scratch location *outside the repo* — shape: `{"findings": [{"id", "title", "evidence": [{"path", "startLine", "endLine", "quote"}]}]}` — then run:

```bash
node <this skill's directory>/scripts/validate-evidence.mjs --repo <repo-root> --findings <file.json>
```

The script drops any finding whose cited file, line range, or quote doesn't match the repo's actual bytes (exit 1 when anything drops; per-drop reasons on stderr). A dropped finding gets **one re-cite attempt** — subagent line numbers drift more often than they fabricate — then goes to "considered and rejected" with the script's reason. **No finding enters the table without a kept row in the script's report.** This is the cheap deterministic gate; the judgment gates below run only on what survives it.

**Validate substance before presentation.** Check cited code for by-design behavior, incorrect attribution, duplicates, and unsupported impact. Reuse source reads and valid evidence from this audit. Record rejected findings so they do not return without new evidence.

**Review consequential findings independently.** Use one bounded review across the relevant findings when risk or an acceptance requirement justifies it. Ask the reviewer to challenge evidence and assumptions. Add reviewers only for unresolved disagreement or distinct expertise. Deep coverage does not require a reviewer quota or majority vote. Report uncertainty rather than treat it as proof for either verdict.

**Check ground-truth claims against ground truth.** A finding asserting something "does not exist" or "is unpublished" — package versions, APIs, config options — gets verified against the live source (`npm view <pkg>@<ver>`, official docs via web) before it survives; knowledge-cutoff hallucinations dress up as facts. Fail open: only a confirmed contradiction drops the finding — 404s, timeouts, and offline keep it.

**Reproduce HIGH-impact correctness bugs.** Before planning one, attempt a minimal repro: run an existing test with the triggering input, or a small script in a temp dir outside the repo (the read-only rule permits both). A repro upgrades confidence to HIGH and becomes the plan's regression test case verbatim. A bug that resists a repro attempt gets an "investigate" plan, not a "fix" plan.

Present the vetted findings table to the user, ordered by leverage (impact ÷ effort, weighted by confidence):

| # | Finding | Category | Impact | Effort | Risk | Evidence |

Present **direction findings separately**, after the table — they're options for the maintainer to weigh, not problems ranked against bugs, and burying "build a plugin system" under "fix the N+1" serves neither. 2–4 grounded suggestions max, each with its evidence and trade-offs in two or three sentences.

Report dependencies between findings. For an audit-only request, finish with findings and a recommended next scope.
Write plans when requested. Ask for selection only when the requested scope remains materially ambiguous.
Continue with already authorized plans or implementation without another selection gate.

### Phase 4 — Write the plans

For each selected finding, write one plan file using the template in [references/plan-template.md](references/plan-template.md) — read it before writing the first plan. Exception: **AI-slop findings batch into one plan per pattern class** (not per site) — mechanical steps, ideal for cheap executors, done criterion a `grep`/`ast-grep` query that must return zero matches. Plans go in:

```
plans/
  README.md          ← index: priority order, dependency graph, status table
  001-<slug>.md
  002-<slug>.md
```

**Excerpts come from your own reads, never from a subagent's report.** Before writing each plan, open every cited file yourself — subagent line numbers and attributions are leads, not facts, and a wrong excerpt becomes a wrong plan that fails its own drift check.

Before writing anything: record `git rev-parse --short HEAD` — every plan stamps the commit it was written against (the executor uses it for drift detection). If `plans/` already exists from a previous run, **reconcile, don't duplicate**: read `plans/README.md`, keep numbering monotonic, skip findings already planned or listed as rejected, and mark superseded plans stale in the index. If `plans/` exists for some unrelated purpose, use `advisor-plans/` instead and say so.

Write each plan **for the weakest plausible executor**. That means:

- All context inlined: why this matters, exact file paths, current-state code excerpts, the repo's conventions to follow (with a snippet of an existing exemplar file).
- Steps that are explicit and ordered, each with its own verification command and expected output.
- Hard boundaries: files in scope, files explicitly out of scope, things that look related but must not be touched.
- Machine-checkable done criteria — commands and expected results, not prose like "works correctly."
- A test plan that identifies existing coverage and any material gaps, under [test quality](../programming/references/write-tests.md).
- A maintenance note (what future changes will interact with this, what to watch in review).
- Escape hatches: "if X turns out to be true, STOP and report back instead of improvising."

Finish by writing `plans/README.md` with the recommended execution order, dependencies between plans, and a status column the executor models can update.

## Invocation variants

- Bare invocation → full workflow above.
- `quick` / `deep` (anywhere in the invocation) → effort level for the audit; see the table in Phase 2. Composes with everything: `quick security`, `deep --issues`. Default is `standard`.
- With a focus argument (e.g. `security`, `perf`, `tests`) → run Recon, then audit only that category, then plan.
- `branch` → audit only the current working branch's changes: scope = files changed since the merge-base with the default branch (`git diff --name-only $(git merge-base origin/<default> HEAD)..HEAD`) plus their direct importers/callers. Light recon, all categories, usually no subagents. **Tag every finding `introduced` (by this branch) or `pre-existing` (in touched files)** — the table separates them; don't blame the branch for legacy debt, but do surface what it's building on top of. If on the default branch or zero commits ahead, say so and offer a full audit instead.
- `next` (or `features`, `roadmap`) → run Recon, then audit only the direction category, in more depth: 4–6 grounded suggestions, each with evidence, trade-offs, and a coarse effort estimate. Selected ones become design/spike plans, not build-everything plans.
- `plan <description>` → skip the audit; the user already knows what they want. Run Recon, investigate just enough to specify it properly, and write a single plan. If the description is too ambiguous to specify honestly, first try to resolve each ambiguity from the codebase itself; only what's left becomes questions to the user — asked one at a time, each with a recommended answer.
- `review-plan <file>` → critique the plan against its requirements and tighten it. Use independent review for consequential uncertainty or an explicit acceptance requirement, not merely because the plan was written in this session.
- `execute <plan>` or an explicit request to apply findings → implement the authorized scope through [Programming](../programming/SKILL.md). Use [closing the loop](references/closing-the-loop.md) for plan status and delegated execution. Delegation and worktrees are optional unless isolation is necessary.
- `reconcile` → process what happened since last session: verify DONE plans, investigate BLOCKED ones, refresh drifted TODOs, retire dead findings. See [references/closing-the-loop.md](references/closing-the-loop.md).
- `--issues` (modifier on any planning invocation) → also publish each written plan as a GitHub issue via `gh`, URL recorded in the plan and index. Only with the explicit flag. See [references/closing-the-loop.md](references/closing-the-loop.md).

## Tone of the output

You are advising, not selling. State findings plainly with evidence, flag uncertainty honestly, and prefer "not worth doing" verdicts over padding the list. A short list of high-confidence, high-leverage plans beats a long one.
