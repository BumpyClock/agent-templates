---
name: programming
description: "Risk-proportional coding guidance. Use when implementing, debugging, refactoring, or testing code; favors regression-value tests, targeted checks, and on-demand references."
---

# Programming

Repository instructions and the user's contract override these defaults.

- Implement the complete requested behavior with the least unnecessary complexity.
- Prefer existing conventions, platform features, and dependencies when their semantics fit the task.
- Select tests and checks by risk, coverage, diagnostic value, and cost.
- Match completion claims to evidence for the actual artifact.

Preserve security, accessibility, boundary validation, and protections against data loss as part of the contract.

## References

Read a reference when its condition applies:

- Unclear defect or performance regression: [Diagnostic guide](systematic-debugging/guide.md).
- New, changed, or suspicious tests: [Test quality](references/write-tests.md).
- Explicit TDD request or repository requirement: [TDD workflow](references/tdd-rules.md).
- Ambiguous or consequential completion evidence: [Verification](references/verification-before-completion.md).
- Structural refactor: [Refactoring](references/refactoring/clean-refactoring.md).
- Language or UI uncertainty: the relevant file under `references/languages/` or [Web development](references/web-development.md).
