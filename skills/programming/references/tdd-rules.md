# TDD workflow

Use when the user or repository requires TDD, or when test-first development helps resolve an uncertain contract.

Use [test quality](write-tests.md) for assertions, test levels, doubles, and coverage decisions.

1. Select a bounded behavior and an interface through which to test it.
2. Write a test that expresses the intended contract.
3. Run the test and confirm failure for the expected reason.
4. Implement the behavior and confirm that the test passes.
5. Refactor where useful, then run the affected checks.

Repeat the cycle for the next behavior.
Ask about the interface only when its choice changes an unresolved user requirement.

Preserve pre-existing and user-authored code when test-first work requires a separate baseline.
Describe exploratory implementation followed by tests accurately rather than retroactively calling it TDD.
State any necessary deviation from an explicit TDD requirement.

Use [verification](verification-before-completion.md) for final evidence and check scope.
