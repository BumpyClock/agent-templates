# Test behavior, not implementation

## Trigger

You add or change a test, or review whether its assertions protect a supported behavior.

## Decision

Name the observable contract and a plausible defect that the test must detect.

- Invoke the subject through its consumer interface or an equivalent boundary for the test's scope.
- Derive expected results from an independent contract, example, or oracle rather than the current implementation.
- Assert returned values, externally visible state, or protocol effects, including payloads when those define the contract.
- Check that the subject's execution contributes to the assertion, even when a fixture or lifecycle hook invokes it.
- For absence assertions, use a contrasting input when inert code could otherwise satisfy the test.

A slug test can assert that `slugify("Hello, World!")` returns `"hello-world"`.
An assertion that compares `slugify(input)` with itself has no independent expectation.
For a configurable limit, exercise the mechanism that consumes the limit rather than merely repeat its current value.

Ask whether an inert or plausibly broken subject would still pass.
If it would, revise or remove the test only after a review of its supported contract.

## Limit

This principle evaluates test value. It does not require a new test for every change.
Mock calls, empty results, expected exceptions, and absence of effects can be contractual behavior.
An inert-subject check is a heuristic, not proof of validity or redundancy.
Preserve property tests, cross-table invariants, compile-time checks, and meaningful framework-driven assertions.
Keep independent literal expectations for protocol or design contracts, even when production contains the same value.
Shared failures do not make tests redundant when they protect different inputs, boundaries, or persistence semantics.
Retain uncertain tests until evidence establishes their supported contract.
Select checks according to the risk and coverage guidance in [Programming](../../SKILL.md).
