---
name: programming
description: "Implement, debug, refactor, or test code; review code designs."
---

# Programming

Repository instructions and the user's requested deliverable override these defaults.


## Completion and scope

- Honor requested review checkpoints. Otherwise, continue implementation until the requested behavior and its completion evidence are established, including corrections to failures caused by the change. Do not stop solely for review of a first pass.
- Continue independent, unblocked work when another part needs input. Stop at the agreed outcome or a required product decision, unavailable access, or authorization boundary.
- Handle small tasks and continuous investigations directly. Delegate independent, substantial work only when its benefit exceeds coordination cost; give each delegate a bounded objective and assess the result against it.

## Code clarity and comments

- Correct code 
- Performant code — think about allocations, data structures, hot paths
- Readable code — every line should earn its place. Use clear names, types, and structure. 
- Comments should explain non-obvious reasons, constraints, or tradeoffs rather than repeat the code or justify avoidable complexity.
- Keep comments current and preserve required API documentation, safety notes, licenses, and tool directives.

## Reuse and restraint

- Reuse or extend an existing helper, type, component, or pattern when practical. Prefer a smaller complete change over a parallel path or speculative abstraction.
- Do not add unrelated features, infrastructure, or refactors. Ask before expanding the agreed scope, not merely because the implementation is larger than expected.
- Follow the repository's file organization and co-location conventions. Split files when cohesion or the requested structural change warrants it, not to meet a fixed file-size or one-concept rule.
- When integrating upstream files, stage them in the platform's temporary directory and review the diff before applying selected changes. Preserve unrelated local edits.
- Use web research for current, high-risk, or uncertain facts, not stable facts already known. Prefer authoritative sources; use exact errors in diagnostic searches and the session date when recency matters.

## Validation

- Use the smallest existing checks that cover the affected contract and risk. Leave full suites to CI unless repository requirements or wider risk justify a local run.
- Prefer a focused E2E check for changed app behavior when it directly establishes the outcome. Use lower-level tests when they cover the contract more directly or economically.
- Preserve test intent and meaningful assertions. Add or revise tests for material coverage gaps, not to mirror the implementation. Reuse valid evidence; repeat or broaden checks only after relevant changes, failures, unresolved concerns, or required project gates.
- Read documentation when it defines an affected contract or resolves project-specific uncertainty. Follow relevant `read_when` hints; a small, understood edit does not need a repository map or documentation sweep.
- Update relevant documentation for behavior or API changes unless repository policy prohibits it. Keep completion evidence observable through task-appropriate inspection tools or logs.

## Principles

Read the relevant reference before the decision it informs. Apply its limits as well as its advice.
These are conditional references, not a checklist. Explain consequential choices rather than list principle names in every reply.

- A requested mechanism may not serve the goal: [Attack the Premise](references/principles/principle-attack-the-premise.md).
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
- Test assertions depend on internal structure rather than behavior: [Test Behavior Not Implementation](references/principles/principle-test-behavior-not-implementation.md).

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
- Commit or PR preparation, an authorized merge, or release preparation: [Git and releases](references/workflows/git-and-releases.md).

## Platform context

Read platform context only when the task concerns that platform.
Select the relevant nested guide rather than load its complete reference set.

- GPUI components, entities, actions, focus, or tests: [GPUI](references/gpui/guide.md).
- WinUI 3 or Windows App SDK setup, XAML, builds, tests, packaging, or WPF migration: [WinUI](references/winui/guide.md).
- Swift, SwiftUI, UIKit, App Intents, or Xcode tasks: [Apple platform references](references/apple/guide.md).
- TypeScript domain types or external input contracts: [TypeScript patterns](references/languages/typescript-patterns.md).

## References

- Module boundaries, contracts, prerequisite decisions, or ADRs: [Architecture](references/architecture/architecture-planning.md).
- Type or schema review: [Type design](references/design/type-design.md).
- Language or UI uncertainty: the relevant file under `references/languages/` or [Web development](references/web-development.md).
