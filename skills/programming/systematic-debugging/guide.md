---
title: Systematic Debugging
description: Evidence-proportional diagnosis for defects, test failures, build failures, and performance regressions.
---

# Systematic diagnosis

Use evidence to explain the failure mechanism and select a proportionate correction. Source inspection, logs, traces, and partial reproductions can support diagnosis. A deterministic local reproduction is useful evidence, not a prerequisite.

## Workflow

1. Establish the symptom and expected behavior from the report and available artifacts.
2. Inspect the relevant code, environment, and recent changes for evidence that explains the difference.
3. Choose the next check that best distinguishes plausible causes at reasonable cost.
4. Apply a correction within the authorized scope when the evidence supports its mechanism. Use [Fix Root Causes](../../pstack/principle-fix-root-causes/SKILL.md) to correct the invariant owner.
5. Check the affected behavior and report the result with any unresolved uncertainty.

For an obvious cause, these steps can collapse into a source check, correction, and focused validation. For an unclear cause, repeat evidence collection as each result narrows the question.

## Evidence and probes

Check branch, build, service instance, versions, and persistent state when those could explain the symptom. Use a test, request replay, CLI fixture, browser check, or captured trace when it offers a useful feedback loop.

For test failures, distinguish failures in product behavior, test expectations, setup or teardown, workers, and the harness or CI environment before changing production code. If cleanup also fails, preserve the primary failure and report cleanup as additional evidence rather than replacing the original error.

For failures after restart, use the persistent-state guidance in [Fix Root Causes](../../pstack/principle-fix-root-causes/SKILL.md).

When a reproduction costs more than it resolves, continue with source and available operational evidence. State which parts of the original failure remain unobserved. Simplify a reproduction only while that effort helps isolate the mechanism or creates a useful regression test.

For uncertain causes, state predictions that available evidence can support or reject. Use the number of hypotheses the evidence warrants. Prefer a debugger, targeted log, or reversible probe that answers a specific question. Control unrelated variables when the comparison depends on them.

For intermittent failures, consider repeated trials, stress, or controlled scheduling. Preserve the conditions that matter to the failure. Report trial counts and observed failures instead of treating one successful run as proof of absence.


## Report

Remove temporary probes or retain useful diagnostics deliberately within the agreed scope.

Report the supported cause, correction or mitigation, observed results, and residual uncertainty. If progress requires unavailable evidence or access, name the smallest concrete next step. For report-only work, present supported hypotheses and discriminating checks without a speculative correction.

## References

- [Condition-based waiting](condition-based-waiting.md): use for asynchronous checks that rely on arbitrary delays.
- [Find polluter](find-polluter.sh): inspect and adapt for tests that create unwanted files or state.
  Run from the test root with an initially absent target. The helper passes each matched file to `npm test`.
  Exit 0 means no target observed after successful runs, 1 means target observed, and 2 means inconclusive.
