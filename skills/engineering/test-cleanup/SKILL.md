---
name: test-cleanup
description: "Audit or remove low-value existing tests with evidence of retained contract coverage. Use when the user requests test cleanup or a test-debt review."
disable-model-invocation: true
---

# Test cleanup

Read [test quality](../../programming/references/write-tests.md) for the assessment criteria.
Use [verification](../../programming/references/verification-before-completion.md) for check scope and evidence limits.
This skill owns the cleanup workflow, not a separate test standard.

## Establish scope and mode

Use the named suite or infer a bounded scope from the task context.
If neither identifies a target, ask for the repository or suite.
For an explicit repository-wide audit, inventory all test areas and report any areas not inspected.

Treat an audit or review request as read-only unless the user also requests fixes.
Treat an explicit cleanup request as authorization for evidence-backed test edits within scope.
Honor existing approval requirements without a second approval for already authorized changes.

Assess test value from the contract, coverage, and maintenance cost, regardless of age or presumed AI authorship.
A lower test count is not an acceptance criterion.

## Audit

1. Identify the relevant runner, fixtures, generated cases, and current results.
2. Read candidate tests, the behavior they exercise, and related coverage.
3. Classify each inspected candidate as keep, delete, rewrite, or unresolved.
4. Record evidence for proposed changes and the coverage that remains.
5. Present the proposed changes, then apply them if the task authorizes edits.

Use search patterns to locate candidates, not to decide their verdicts.
Delegate independent suite areas when that reduces work, then inspect evidence for proposed deletions.

| Verdict | Required basis |
| --- | --- |
| Keep | Useful contract coverage or diagnostic value at acceptable cost. |
| Delete | No useful contract remains, or other coverage preserves its value at lower cost. |
| Rewrite | A useful contract remains, but the test fails to protect it or imposes avoidable maintenance cost. |
| Unresolved | Contract, callers, coverage, or failure cause remains uncertain. Retain the test and state the missing evidence. |

For each proposal or coherent group of equivalent candidates, record:

- Test location and the intended contract, or evidence that the contract no longer applies.
- Concrete defect or maintenance cost in the test.
- When a useful contract remains, the failure scenario and how retained or revised coverage detects it.
- For duplicate coverage, the retained test location and any differences in inputs, environment, speed, or diagnostic value.

A tautology can warrant deletion without a replacement when it protects no behavior.
A test that conceals an unprotected contract usually warrants a focused rewrite.
Retain tests when equivalence depends only on similar names, shared lines, or presumed implementation intent.

## Apply coherent batches

Record a relevant baseline before edits and identify pre-existing failures.
If execution is unavailable, disclose that limit and restrict edits to changes supported by other direct evidence.

- Keep production behavior and supported APIs unchanged during test cleanup.
- Remove test fixtures or helpers only when the cleanup makes them unused within the inspected dependencies.
- Select rewrite scope and test level under the shared test-quality reference.
- Run checks that exercise retained and revised coverage after each coherent batch.
- Inspect the final diff for weakened assertions, suppressed failures, and lost inputs or environments.

Investigate a failed test before its deletion or relaxation.
Preserve useful parameterized, property, snapshot, compile-time, interaction, and smoke tests when their contracts justify them.
A test without an explicit assertion can still check compilation, an expected exception, or successful execution.
Report production defects separately unless the user authorizes a broader fix.

## Completion report

Report inspected scope, changes by verdict, retained coverage, check results, unresolved candidates, and uninspected areas.
Separate test cases from test files when counts are useful, and state how generated cases were counted.
A green suite after deletion does not by itself establish that useful coverage survived.
