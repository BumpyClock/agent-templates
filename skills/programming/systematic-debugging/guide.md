---
title: Systematic Debugging
description: Root-cause debugging workflow for bugs, test failures, build failures, regressions, performance problems, and unexpected behavior.
---

# Systematic Debugging

Core rule: no fix without a named root cause. Before you propose a fix, state the mechanism — "X produces bad value Y, which breaks Z" — not just a suspect. When the error message plus a read of the code reveals the cause directly, the phases collapse to: confirm cause, fix, verify. When the cause is unclear, work the phases in order and spend effort proportional to how unclear it still is.

Cheap, reversible diagnostic probes — logs, a debugger, a temp toggle you revert — are always fine. The failure this guide prevents is landing an untested guess as the fix.

## Phase 0 — Check the plug

Rule out trivial causes before deep investigation: wrong branch, wrong environment, stale build, wrong service instance, mismatched versions. If behavior changed with no code change — after a restart, between runs, between machines — suspect stale persistent state first: caches, lock files, config files, serialized state.

## Phase 1 — Build a feedback loop

A tight pass/fail signal that goes red on this bug is the core of the work; hypotheses and instrumentation all consume it. Read the full error message and stack trace first — they often contain the answer. Then name one command (test invocation, curl script, CLI run against a fixture, headless-browser script, replayed captured trace) that:

- drives the actual bug path and asserts the user's exact symptom — not "runs without erroring";
- gives the same verdict every run;
- finishes in seconds and runs unattended.

Check recent changes (`git diff`, recent commits, new dependencies) while building it — the trigger is often there. Non-deterministic bug → raise the reproduction rate until it is debuggable: loop the trigger, parallelize, add stress, narrow timing windows. If you genuinely cannot build a loop, stop and say so; list what you tried and what access or captured artifact (log dump, HAR, recording) would unblock it. Do not hypothesize without a loop.

## Phase 2 — Minimise

Shrink the repro to the smallest scenario that still goes red. Cut inputs, callers, config, and steps one at a time, re-running the loop after each cut. Done when every remaining element is load-bearing. A minimal repro shrinks the hypothesis space and becomes the regression test.

Bug appeared between two known states → bisect (`git bisect run` with the loop as the verdict). Test pollution (state appearing during test runs from an unknown test) → `find-polluter.sh` in this directory.

## Phase 3 — Hypothesise

Generate several ranked hypotheses before testing any — a single hypothesis anchors on the first plausible idea. Each must be falsifiable: "if X is the cause, then Y will change the outcome." If you cannot state the prediction, discard or sharpen it. Compare against working examples of the same pattern in the codebase and list every difference, however small.

## Phase 4 — Probe

Each probe maps to one hypothesis prediction; change one variable at a time. Prefer a debugger or REPL breakpoint over logs; targeted logs at the boundaries that distinguish hypotheses over log-everything-and-grep. Tag every debug log with a unique prefix (for example `[DEBUG-a4f2]`) so cleanup is a single grep.

In multi-component systems, log what enters and exits each component boundary, run once, and locate which layer breaks before investigating inside it.

Trace bad values backward to their origin: what called this, what passed the value, where it was created. Fix at the source, not where the error surfaced. A symptom-point fix is acceptable only as a deliberate stopgap (source is external or out of scope) — name it as one and file the follow-up.

Performance regressions: measure a baseline first (profiler, timing harness, query plan), then bisect. Do not guess from logs.

## Phase 5 — Fix and verify

Implement one fix that addresses the named cause. No bundled refactoring or "while I'm here" improvements. Regression test per SKILL.md Gates 2–3: turn the minimised repro into a failing test at a correct seam, watch it fail, apply the fix, watch it pass, then re-run the loop against the original scenario. No correct seam exists → that is itself a finding; record it instead of writing a false-confidence test.

For a bug caused by invalid data, validate at each layer on the traced path of this bug — entry point, business logic, environment guard — so the bug becomes structurally impossible. Speculative validation elsewhere is the impossible-case handling SKILL.md pushes back on.

Fix did not work → do not stack another on top. Return to Phase 1 with the new information.

## When stuck

- Repeated failed fixes (~3 is a signal, not a quota), each revealing a new problem elsewhere, or fixes that need "massive refactoring" → the architecture is likely wrong. Stop and surface the architectural question to the user before sinking more effort; working autonomously, write it down and lead with it in the report.
- Get a fresh view: restate the problem from scratch, or hand the evidence to a fresh agent or reviewer. Tunnel vision on a stale hypothesis is a named failure mode, not a character flaw.
- Sustained user pushback ("stop guessing", repeated correction) signals an unverified assumption — re-check it before continuing.

## Cleanup — before declaring done

- Original repro loop is green on the un-minimised scenario.
- Regression test passes, or the missing-seam finding is recorded.
- Tagged instrumentation removed (grep the prefix); throwaway probes deleted or promoted to real tests.
- The confirmed hypothesis is stated in the commit or PR message so the next debugger learns.

## Report-only / multi-hypothesis triage

Use when the ask is investigate-and-report (no fix expected), or more than ~3 plausible hypotheses are live:

- Generate distinct, non-overlapping hypotheses; for each, state why it fits, what would disconfirm it, and the fastest test.
- Spawn one sub-agent per active hypothesis when parallelism helps; each returns evidence and next action.
- Synthesize: eliminate weak hypotheses, rank the survivors, report most likely cause(s), recommended fix, verification plan, open questions.

## Related

- `condition-based-waiting.md` — replace arbitrary sleeps with condition polling (flaky/async repros).
- `find-polluter.sh` — bisect which test creates unwanted files or state.
- `../references/verification-before-completion.md` — evidence standard before claiming the fix works.
