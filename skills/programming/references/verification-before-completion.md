# Verification before completion

Use when completion evidence is ambiguous or consequential.

This reference owns verification policy for implementation and delivery tasks. Git and PR skills own their operations and authorization rules.

## Choose evidence for the claim

1. Identify the behavior, artifact, or property that the claim concerns.
2. Select checks that can distinguish the intended result from a plausible failure.
3. Run the relevant checks against the changed artifact.
4. Inspect their results and report the scope and limits of the evidence.

Use repository-required checks and add broader checks when dependencies or risk justify them.
A compiler check can establish a type property. Runtime behavior usually needs an execution check.
A successful test run establishes only what those tests cover.

## Reuse valid evidence

Associate results with the checked revision or file state, environment, inputs, and command.
Reuse prior results when those conditions remain applicable.
Repeat checks after changes that could invalidate their results, or when an explicit policy requires another run.
A conversation turn does not invalidate evidence.
A commit, push, or PR reply does not itself require a new verification pass.

## Match the check to the work

| Claim | Useful evidence |
| --- | --- |
| Tests pass | Relevant runner result and exit status, with suite scope stated. |
| Build succeeds | Build result for the relevant target and configuration. |
| Bug fixed | The original scenario now succeeds, or equivalent evidence with reproduction limits stated. |
| Regression test detects the defect | Expected failure against defective behavior when practical. |
| Requirements met | Contract comparison plus checks of material behaviors. |
| Visual result is correct | Inspection of the current rendered artifact under relevant conditions. |
| Delegate completed the task | Inspection of the actual artifact and acceptance evidence. |

Use baseline comparisons when they help distinguish new failures from pre-existing failures or establish a performance change.
Avoid universal absence-of-regression claims from a limited suite.

## Scale execution

Group dependent edits into coherent units that admit a meaningful check.
Keep incomplete intermediate states local unless the repository explicitly permits them in published artifacts.
Use focused checks during development and broader checks at the relevant integration point.
Prefer existing runners and tools before a new verification script.
Use manual inspection when it observes the contract sufficiently.

## Report limits

Report failed checks with the command and relevant output.
Distinguish an unexecuted check from a failed check.
State uncertainty when evidence supports a likely explanation but cannot establish the full claim.
