# vacuous-test

## Trigger
Digests-Swift repo audit (2026-07-04): test file contains `XCTAssertTrue(true)` after calling a function under a name like `testDoesNotCrash`, plus a loop `for c in cases { _ = normalize(c) }` under `testHandlesAllInputsCorrectly` with no assertion at all.

## Expected
Remove the tautological assertion. Assess the executed operation separately: a trap or uncaught exception can fail a crash test. Retain useful crash coverage, and assert output values when correctness is the intended contract. Delete the test only when no useful contract remains.

## Observed failure
Agent (Sonnet 4.5, 2026-07-04) kept both tests as "smoke coverage" without checking whether any real change could fail them.
