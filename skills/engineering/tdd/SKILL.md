---
name: tdd
description: "Test-first development. Use when the user or repository explicitly requires TDD or red-green-refactor."
---

# Test-first development

Use TDD only when the user or repository requests test-first work and there is an observable behavior with an independent expectation.
Do not manufacture tests for mechanical configuration, wiring, or type changes that would only restate the implementation; use relevant existing checks instead.

## Choose the contract seam

A test seam is the public boundary through which a consumer observes behavior, such as an exported function, module API, or user action.
Exercise the actual subject through that boundary rather than its private structure.

Reuse approved seams and contract decisions without reapproval.
Resolve ordinary implementation choices from repository evidence.
Ask only when a consequential unresolved choice changes coverage or product behavior. Explain what each candidate seam detects, misses, and costs, then recommend one.

## Work in vertical slices

1. Select one requested behavior and a plausible failure that a focused test should detect.
   Use a thin path through relevant consumers when integration is part of the uncertainty; this does not require a browser or full-system test.
2. **Red:** add or select the test and run it before changing the implementation.
   Confirm that it fails for the intended behavior, not a syntax, setup, or dependency error.
   If it already passes, determine whether the behavior exists or the assertion cannot distinguish it; do not break correct code to manufacture red.
3. **Green:** implement the smallest complete behavior for that slice, run the focused check, and correct supported failures.
   Do not weaken useful assertions to obtain a pass.
4. Clean up or refactor while green when it improves the authorized change.
   Preserve the contract and rerun affected checks after edits. Do not force a refactor or broaden scope merely to complete a cycle.

Continue through remaining requested behaviors instead of writing a batch of speculative tests before any implementation.
Parameterized cases for the same behavior can belong to one focused slice.

## Keep tests meaningful

- Derive expected outcomes independently from the specification, known examples, protocol requirements, or invariants. Do not copy production logic into the expectation.
- Name observable capabilities and assert returned values, errors, or contractual effects. Internal renames should not break tests when the public contract is unchanged.
- Use mocks or fakes at boundaries when nondeterminism, external effects, or setup cost justify substitution, such as network services, time, randomness, or persistence. Keep ordinary internal logic real and do not mock away the behavior under test.
- Assert payloads, ordering, or interaction counts when they define the contract. Use real integration evidence when the dependency or adapter's behavior is itself at risk.

## Completion

Complete the requested behavior through its consumers and correct material gaps exposed by relevant checks.
Broaden validation only for affected integrations, failures, or unresolved risks; reuse sufficient evidence after the latest relevant change.
If a runner is unavailable, use an equivalent that preserves the required semantics and restrictions or report the missing red/green observation. An unrun check is not a pass.
Report delivered behavior, observed check results, and remaining limits.

## Source

Adapted from [Matt Pocock's TDD guide](https://github.com/mattpocock/skills/blob/main/docs/engineering/tdd.md).