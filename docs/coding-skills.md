---
read_when: Update coding workflow skills or their shared references.
---

# Coding guidance ownership

`skills/programming/SKILL.md` contains cross-cutting defaults and routes to task-specific references.

- `defaults/AGENTS.md` owns shared scope, authorization boundaries, and output policy. Coding conventions belong in `programming`, not the always-loaded global file.
- `skills/programming/SKILL.md` owns implementation completion, bounded delegation, code comments, and reuse guidance.
- `skills/programming/SKILL.md` also owns focused development-time debug logging for agent and human inspection. Persistent instrumentation uses `telemetry`; temporary local probes do not require its full workflow.
- `skills/programming/references/principles/principle-test-behavior-not-implementation.md` owns test quality, user-confirmed seams, and the explicit TDD loop.
- `skills/programming/systematic-debugging/guide.md` owns diagnosis.
- `skills/programming/SKILL.md` owns risk-proportional check selection and evidence reuse. Task workflows define the observation that establishes completion.
- `skills/programming/references/architecture/architecture-planning.md` owns ADR guidance. Follow repository conventions and preserve superseded decisions as history.
- `skills/git-and-releases/SKILL.md` owns branch, commit, PR, merge, and release conventions, stacked-PR planning, and requested worktree cleanup. Load it for that work, not for every code edit.
- `skills/engineering/data-structure-audit/SKILL.md` owns requested complete data-structure audits. It is a standalone skill in a discoverable group, not nested inside another skill.

The `diagnosing-bugs` skill routes to the diagnosis reference; test-first work uses the test-behavior principle without a separate skill invocation.
Current workflows use the shared check-selection guidance.
Keep shared rules in their owner instead of duplicate workflow checklists.
Platform guides retain runner APIs and domain-specific examples.
Git and PR skills use the same verification owner. Stack planning adds dependency, ownership, and handoff guidance without fixed agent counts, orchestration tools, or extra verification gates.
`skills/resolve-pr-comments/references/review-triage.md` owns the evidence-based rubric for human and automated feedback. Invoking feedback resolution includes assessment and babysitting after authorized fixes are committed and pushed, without a separate watch request. Assessment-only requests remain bounded, and opening a PR alone does not invoke monitoring. Monitoring readiness is defined by PR state, not a particular watcher's verdict names.
For CI-service billing, quota, or runner outages, `resolve-pr-comments` uses local checks appropriate to the changed contract and reports unavailable remote checks. Exact CI environment reconstruction and paid CI recovery are not required. Material environment differences and unavailable checks remain explicit validation gaps. Local validation does not override forge merge requirements.

`docs-list` is an optional index of existing documentation summaries and `read_when` hints from frontmatter.
Use it to find relevant guidance, not to require a documentation sweep before each edit.
Related cleanup is a judgment call under `programming`: include bounded improvements when they support the current work and justify their risk and review cost; otherwise skip them.

## Apple reference ownership

`skills/programming/references/apple/guide.md` owns shared Apple scope, source provenance, and SDK checks.
Imported guides are local references, not separately invoked skills.
They select API examples and task-specific constraints without mandatory subagents, repeated full-document reads, or automatic commits.
UIKit references keep migration decisions and exceptions together, including supporting caller and invalidation edits.
Xcode security reviews are read-only; hardening and persistent decision records require the corresponding authorized scope.
Bounds-safety adoption preserves header-only versus full-adoption boundaries, ABI compatibility, and partial-adoption limits without prescribing checkpoint commits.

## Design principles

`skills/programming/references/principles/` owns conditional code and design principles.
Each `principle-*.md` file defines a trigger, a decision, and a limit.
The index in `skills/programming/SKILL.md` selects references by the current decision.
Use these principles through `programming` without a Poteto mode invocation.

The library also preserves named decisions for subtraction, first-principles redesign, foundations, and consumer experience.
Type reviews use `references/design/type-design.md`, which points to the shared type principle.
Keep the reference index conditional rather than require every principle on every task.

Migrate Callers Then Delete Legacy APIs is a named rule in `references/refactoring/clean-refactoring.md`.
Fix Root Causes is a named rule in `systematic-debugging/guide.md`.
These names use the existing procedures rather than duplicate them in separate principle files.
Guard the Context Window lives in `references/execution/`, separate from design principles.
Minimize Reader Load owns indirection and simplification guidance without file-count thresholds.
Outcome-Oriented Execution uses the shared completion guidance and the refactor contract.
Completion evidence matches the changed contract and explicit user requests. Static checks, unit tests, runtime checks, and artifact inspection are valid when they establish that contract.
Keep the adapted rules in their shared owners rather than duplicate active workflow checklists.

## Shared workflows

`programming` routes by the requested deliverable.
Shared workflows do not require Poteto mode or automatic PR creation.
Design exploration and delegation follow the triggers in `programming` and the referenced skills.

| Workflow | Owner |
| --- | --- |
| Bug fix | [Systematic diagnosis](../skills/programming/systematic-debugging/guide.md) |
| Feature | [Feature workflow](../skills/programming/references/workflows/feature.md) |
| Investigation | [How](../skills/pstack/how/SKILL.md) |
| Architecture improvement | [Improve codebase architecture](../skills/engineering/improve-codebase-architecture/SKILL.md) |
| Perf issue | [Performance workflow](../skills/programming/references/performance/perf-issue.md) |
| Prototype | [Prototype skill](../skills/engineering/prototype/SKILL.md) |
| Refactoring | [Clean refactoring](../skills/programming/references/refactoring/clean-refactoring.md) |
| Runtime forensics | [Live diagnosis](../skills/programming/references/performance/runtime-forensics.md) |
| Explicit TDD | [Test-behavior principle](../skills/programming/references/principles/principle-test-behavior-not-implementation.md#test-driven-development) |
| Trace forensics | [Capture analysis](../skills/programming/references/performance/trace-forensics.md) |

The prototype skill separates interactive state demonstrations, UI alternatives, and bounded behavioral probes.
A prototype-only request stops at its decision and evidence.
Live diagnostics require explicit authority for code injection or shared-state mutation.

Poteto mode is preserved unchanged under `skills_archive/poteto-mode/`.
Its companion agent definition is archived under `agents-archive/poteto-agent.md`.
Active workflows use the shared owners above instead of loading the archived mode.
Unresolved module-interface decisions route through `codebase-design`. Exhaust the Design Space applies when consequential choices have viable alternatives and no established answer.
Ordinary function-boundary changes do not require parallel exploration, delegated implementation, or repeated review.

## Review and diagnosis cost

Use direct evidence and focused checks for an understood task.
Add independent review for consequential acceptance claims, unresolved disagreement, or distinct expertise.
Reuse valid evidence across review, commit, and PR steps.
Preserve explicit repository acceptance requirements and authorization boundaries.

Audit skills remain read-only for audit requests.
An explicit request to apply findings changes the task to implementation without a required command or extra confirmation.
Reserve the animation advisor for audits and roadmaps, not ordinary animation changes.

The Rust entrypoint routes by category instead of loading the complete rule catalog.
Routine prose uses the global voice rules. The full style catalog applies to substantial revision, explicit style review, or pre-PR cleanup.
`skills/git-and-releases/references/opening-a-pr.md` owns the pre-PR cleanup sequence. Its passes cover code complexity, comments, technical accuracy and reviewer context, then prose cleanup. Cheaper capable reviewers can share context across passes. The coordinator inspects edits, and unchanged passes are not repeated merely for a handoff.
SSH diagnosis remains read-only. Service changes require authorized repair and checks for active sessions.

## Existing test cleanup

`skills/engineering/test-cleanup/SKILL.md` owns audits and edits of existing suites.
Use `$test-cleanup audit <path>` for a report or `$test-cleanup clean up <path>` for authorized test edits.
The workflow records keep, delete, rewrite, and unresolved verdicts with evidence of retained coverage.
It preserves uncertain tests and separates production defects from test-only cleanup.
Test quantity, age, and presumed AI authorship do not establish test value.

Treat historical incidents as evidence for investigation rather than permanent mandates.

Archived skills reside under `skills_archive/` and do not belong in the active discovery tree.
Preserve archive contents and replace active invocation routes when a skill moves there.
The former `tdd` skill is preserved under `skills_archive/tdd/`; active TDD guidance lives only in the test-behavior principle.

## Archived workflow aliases and process skills

These eight skills retain their original contents under `skills_archive/`.
Their replacements avoid duplicate aliases and mandatory review or publication steps.

| Archived skill | Replacement |
| --- | --- |
| `implement` | Request implementation directly with `programming`. |
| `grill-me` | Use `grilling`. |
| `grill-with-docs` | Request `grilling` plus `domain-modeling`. |
| `wait-what` | Request a clearer explanation with the necessary context. |
| `weekly-review` | Use `what-did-i-get-done` with a seven-day window. |
| `automate-me` | Use `skill-creator` with scoped preference evidence. |
| `skill-review` | Use `skill-creator` to assess and revise the requested skill. |
| `reflect` | Request a bounded session review and proposed edits. |

After archive moves, run `bun scripts/link-agent-templates/link-agent-templates.ts --setup all` to refresh linked configurations.
The flat skill linker removes stale repository skill symlinks and preserves real directories.

## Additional workflow archives

These skill directories retain their original files under the corresponding group in `skills_archive/`.

| Archived skill | Replacement |
| --- | --- |
| `improve` | Request a codebase audit or implementation plan directly. Use `programming` for implementation. |
| `research` | Request source research directly, with a cited report when needed. |
| `resolving-merge-conflicts` | Request conflict resolution under the repository's Git authorization rules. |
| `architect` | Use `codebase-design` and the architecture references under `programming`. |
| `blast-radius` | Request dependency-impact analysis with `code-review`. |
| `interrogate` | Request independent reviewers with `code-review` when needed. |
| `swarm` | Specify parallel work, ownership, and the required result in the task. |
| `handoff` | Request a context summary with artifact references for the next session. |
| `to-questionnaire` | Request a questionnaire for the named recipient and decision. |
| `make-bot-ui` | Request a webhook UI for the available runtime. |

`wayfinder`, `to-spec`, `to-tickets`, `triage`, and `teach` remain active.
Wayfinder assigns source research directly rather than invokes the archived `research` skill.
`technical-writing` retains explicit invocation and routes document-type guidance to a separate reference.
Its root owns technical accuracy, terminology, reader context, and document scope, including the PR and commit text pass. `unslop` owns prose cleanup without duplicating the global prose standard.
