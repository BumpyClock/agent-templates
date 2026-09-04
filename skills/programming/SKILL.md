---
name: programming
description: "Risk-proportional code and design guidance. Use for implementation, diagnosis, refactors, tests, or agent-guidance comparisons. Includes conditional principles and workflows."
---

# Programming

Repository instructions and the user's contract override these defaults.

- Implement the complete requested behavior with the least unnecessary complexity.
- Prefer existing conventions, platform features, and dependencies when their semantics fit the task.
- Select tests and checks by risk, coverage, diagnostic value, and cost.
- Match completion claims to evidence for the actual artifact.

Preserve security, accessibility, boundary validation, and protections against data loss as part of the contract.

## Principles

Read the relevant reference before the decision it informs. Apply its limits as well as its advice.
These are conditional references, not a checklist. Explain consequential choices rather than list principle names in every reply.

- Stateful logic or repeated shape assumptions: [Model the Domain](references/principles/principle-model-the-domain.md).
- Invalid field combinations or ambiguous primitive types: [Type System Discipline](references/principles/principle-type-system-discipline.md).
- External input or framework adapters: [Boundary Discipline](references/principles/principle-boundary-discipline.md).
- Retries or partial failure: [Make Operations Idempotent](references/principles/principle-make-operations-idempotent.md).
- Concurrent writes: [Separate Before Serializing Shared State](references/principles/principle-separate-before-serializing-shared-state.md).
- Indirection or hidden mutable state: [Minimize Reader Load](references/principles/principle-minimize-reader-load.md).
- Consequential design uncertainty with viable alternatives: [Exhaust the Design Space](references/principles/principle-exhaust-the-design-space.md).
- Repetitive edits or costly manual evidence collection: [Build the Lever](references/principles/principle-build-the-lever.md).
- Recurrent defects or corrections: [Encode Lessons in Structure](references/principles/principle-encode-lessons-in-structure.md).
- An addition would extend obsolete structure: [Subtract Before You Add](references/principles/principle-subtract-before-you-add.md).
- A requirement creates repeated design exceptions: [Redesign from First Principles](references/principles/principle-redesign-from-first-principles.md).
- Several changes depend on one prerequisite: [Foundational Thinking](references/principles/principle-foundational-thinking.md).
- Product or API tradeoffs affect consumers: [Experience First](references/principles/principle-experience-first.md).

## Execution

For large outputs or context pressure, use [Guard the Context Window](references/execution/principle-guard-the-context-window.md).

## Workflows

Select the workflow that matches the requested deliverable:

- New or changed behavior: [Feature](references/workflows/feature.md).
- Defect or unclear regression: [Fix Root Causes](systematic-debugging/guide.md#fix-root-causes).
- Structural or API refactor: [Refactoring](references/refactoring/clean-refactoring.md), including [Migrate Callers Then Delete Legacy APIs](references/refactoring/clean-refactoring.md#migrate-callers-then-delete-legacy-apis).
- Read-only code explanation or design recommendation: [Investigation](../pstack/how/SKILL.md).
- Measured performance change: [Perf issue](references/performance/perf-issue.md).
- Live-process diagnosis: [Runtime forensics](references/performance/runtime-forensics.md).
- Provided capture analysis: [Trace forensics](references/performance/trace-forensics.md).
- A design or behavior question needs a throwaway probe: [Prototype](../engineering/prototype/SKILL.md).
- Agent-guidance comparison: [Eval](evals/README.md).

## References

- New, changed, or suspicious tests: [Test quality](references/write-tests.md).
- Explicit TDD request or repository requirement: [TDD workflow](references/tdd-rules.md).
- Ambiguous or consequential completion evidence: [Verification](references/verification-before-completion.md).
- Module boundaries, contracts, or prerequisite decisions: [Architecture](references/architecture/architecture-planning.md).
- Type or schema review: [Type design](references/design/type-design.md).
- Language or UI uncertainty: the relevant file under `references/languages/` or [Web development](references/web-development.md).
