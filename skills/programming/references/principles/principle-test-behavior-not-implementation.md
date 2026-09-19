# Test behavior, not implementation

## Trigger

You add or change a test, or review whether its assertions protect a supported behavior.

## Decision

Name the observable contract and a plausible defect that the test must detect.
Apply this guidance when choosing tests and throughout implementation, not only during final review.
When exploring the codebase for tests, read `CONTEXT.md` if it exists so test names and interface vocabulary match the project's domain language. Respect ADRs for the area under test.

### What a good test is

A good test reads like a specification: "user can checkout with a valid cart" names an observable capability.
It should survive internal refactors when the public contract is unchanged.

- Invoke the subject through its consumer interface or an equivalent boundary for the test's scope.
- Derive expected results from an independent contract, example, or oracle rather than the current implementation.
- Assert returned values, externally visible state, or protocol effects, including payloads when those define the contract.
- Check that the subject's execution contributes to the assertion, even when a fixture or lifecycle hook invokes it.
- For absence assertions, use a contrasting input when inert code could otherwise satisfy the test.

A slug test can assert that `slugify("Hello, World!")` returns `"hello-world"`.
An assertion that compares `slugify(input)` with itself has no independent expectation.
For a configurable limit, exercise the mechanism that consumes the limit rather than merely repeat its current value.

### Seams: where tests go

A test seam is the public boundary through which a consumer observes behavior, such as an exported function, module API, or user action.
Test through that interface rather than reaching into its implementation.

**Test only at user-confirmed seams.** Before writing tests, record the seams under test in the conversation or existing task plan and confirm them with the user.
Ask: "What's the public interface, and which seams should we test?"
No test is written at an unconfirmed seam. Confirmation covers the agreed seams and scope; seek new confirmation before adding or changing a seam.
Prioritize critical paths and complex logic rather than attempting to test every implementation detail or edge case.

When the interface shape or seam placement is in question, invoke `codebase-design` and consult its [shared vocabulary](../../../engineering/codebase-design/SKILL.md).
Use it as a reference for module depth, interfaces, seams, and adapters, not as a requirement to run a separate design workflow.

### Anti-patterns

- **Implementation-coupled:** tests private methods, mocks ordinary internal collaborators, or observes results through a side channel outside the selected contract. Querying a database to verify a checkout API can bypass the behavior its consumer sees; querying storage can be appropriate when persistence is itself the selected contract. The warning sign is a test that breaks after a refactor without a contract change.
- **Tautological:** derives the expectation using the same logic as production, such as `expect(add(a, b)).toBe(a + b)`, reconstructs a snapshot with that logic, or compares a constant with itself. Use an independent specification, worked example, or known-good literal so the test can disagree with a faulty implementation.
- **Horizontal slicing:** writes all tests before any implementation. This commits to imagined behavior and test structure before feedback from working code. In TDD, use vertical slices: one test, one minimal implementation, then the next test informed by the previous cycle.

Ask whether an inert or plausibly broken subject would still pass.
If it would, revise or remove the test only after a review of its supported contract.

### Mocks and effects

Use mocks or fakes at boundaries when nondeterminism, external effects, or setup cost justify substitution, such as network services, time, randomness, or persistence.
Keep ordinary internal logic real and do not mock away the behavior under test.
Assert payloads, ordering, or interaction counts when they define the contract.
Use real integration evidence when the dependency or adapter's behavior is itself at risk.

### Test-driven development

Use this red-to-green loop when the user or repository requests test-first work and there is an observable behavior with an independent expectation.
Do not manufacture tests for mechanical configuration, wiring, or type changes that would only restate the implementation; use relevant existing checks instead.
Apply this principle's test-quality and seam rules before and during every cycle.

1. Select one requested behavior at a user-confirmed seam and a plausible failure that one focused test should detect.
   Use a thin path through relevant consumers when integration is part of the uncertainty; this does not require a browser or full-system test.
2. **Red:** add or select the test and run it before changing the implementation.
   Confirm that it fails for the intended behavior, not a syntax, setup, or dependency error.
   If it already passes, determine whether the behavior exists or the assertion cannot distinguish it; do not break correct code to manufacture red.
3. **Green:** implement the smallest complete behavior for that slice, run the focused check, and correct supported failures.
   Do not weaken useful assertions to obtain a pass or anticipate future tests with speculative features.

Use one seam, one test, and one minimal implementation per cycle.
Let each completed slice inform the next test, and continue until the requested behavior works through its consumers.
Refactoring is not part of this loop. Defer it to the review stage; use [Code review](../../../engineering/code-review/SKILL.md) for that work.
If a runner is unavailable, use an equivalent that preserves the required semantics and restrictions or report the missing red/green observation. An unrun check is not a pass.

## Limit

This principle evaluates test value and placement. It does not require a new test for every change or impose TDD when it was not requested.
Reading or running existing tests does not require new seam approval.
Mock calls, empty results, expected exceptions, and absence of effects can be contractual behavior.
An inert-subject check is a heuristic, not proof of validity or redundancy.
Preserve property tests, cross-table invariants, compile-time checks, and meaningful framework-driven assertions.
Keep independent literal expectations for protocol or design contracts, even when production contains the same value.
Shared failures do not make tests redundant when they protect different inputs, boundaries, or persistence semantics.
Retain uncertain tests until evidence establishes their supported contract.
Select checks according to the risk and coverage guidance in [Programming](../../SKILL.md).
