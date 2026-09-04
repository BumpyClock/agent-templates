# Test quality

Use for new tests, test changes, suspected test defects, and test review.

## Select useful coverage

- Identify the behavior or contract each test protects.
- Select the test level by coverage, execution cost, and diagnostic value.
- Use unit tests for local contracts and integration tests for interactions between components.
- Retain overlapping tests when speed, diagnosis, or distinct integration coverage justifies their maintenance cost.
- Compare proposed tests with existing coverage before an addition.
- Add tests where existing coverage leaves material risk unprotected.
- Use static checks for compiler-enforced contracts when they provide sufficient evidence.

Test count has no quota. A change can need zero, one, or several new tests.

## Keep expectations independent

- Derive expected results from the specification, known examples, or an independent reference.
- Preserve literal expectations that encode a contractual value, such as a protocol byte or business limit.
- For configuration consistency tests, read the authoritative configuration when configuration changes should preserve the test's claim.
- Assert the observable contract. Counts or successful execution are sufficient when they are the contract.
- Let the operation under test produce the state that the assertion examines.
- Match test names to the paths and outcomes the tests actually exercise.

An expectation derived from the production calculation cannot independently detect an error in that calculation.

## Control dependencies

- Prefer stable interfaces over incidental implementation details.
- Assert interactions when the interaction itself is the contract, such as a required external notification.
- Use test doubles where isolation, fault injection, or execution cost justifies them.
- Preserve the collaborator behavior on which the test depends.
- Include production integration coverage where doubles could conceal incompatible assumptions.
- Use framework waits or condition checks for asynchronous completion.

## Investigate failures

Treat implementation regressions, outdated expectations, fixture defects, and environmental changes as competing hypotheses.

- Compare the failure with the intended contract and the relevant change.
- Require contract or measurement evidence before a weaker assertion or wider tolerance.
- Control relevant variables in comparisons.
- For stochastic behavior, choose samples and statistical criteria that can distinguish acceptable behavior from a material regression.
- Inspect related failures when they can reveal a shared cause.

## Check test effectiveness

- When practical, run a regression test against the defective implementation and confirm the expected failure.
- Use a targeted mutation when the test's sensitivity remains uncertain and the cost is justified.
- Preserve unrelated work when you restore defective code for a check.
- State the evidence limit when a failure demonstration is unsafe or disproportionate.

Several tests can precede an implementation or share a runner invocation when their contracts are clear.
Use the [TDD workflow](tdd-rules.md) when the user or repository requires it.
Use the [verification reference](verification-before-completion.md) for completion evidence.

## Remove tests with evidence

- Remove tautologies, irrelevant assertions, and tests for behavior that the supported contract has removed.
- Compare coverage and diagnostic value before deletion of overlapping tests.
- Confirm external and indirect use before deletion of an apparently unused API or its tests.

An absent local caller does not establish that a public API, plugin, reflection target, or FFI export is unused.

Use [test cleanup](../../engineering/test-cleanup/SKILL.md) when the user requests an audit or cleanup of an existing suite.
