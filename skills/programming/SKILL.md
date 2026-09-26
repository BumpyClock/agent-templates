---
name: programming
description: "Implement, debug, refactor, or test code; review code designs."
---


## Code clarity and comments

- Correct code 
- Performant code — think about allocations, data structures, hot paths
- Readable code — every line should earn its place. Use clear names, types, and structure. 
- Use comments only to explain non-obvious reasons, constraints, or tradeoffs. Do not repeat code or justify avoidable complexity. Simplify the code instead.
  - Keep comments current and preserve required documentation, safety notes, licenses, and tool directives.
  - When similar code stays duplicated on purpose, comment why the copies evolve independently or are not yet abstracted.
- Reuse or extend an existing helper, type, component, or pattern when practical & efficient. Prefer a smaller complete change over a parallel path or speculative abstraction.
- Use judgment about related cleanup, including bounded refactors and high-confidence flaky-test fixes. Include it when it supports the current work and its benefit outweighs the risk and review cost; otherwise skip it. Do not add unrelated features or infrastructure. Ask before materially expanding the agreed scope, not merely because the implementation is larger than expected.
- Before adding a dependency, check whether existing dependencies or a simple implementation already meet the need. Read their docs and type definitions before assuming a feature is missing. When adding one, prefer a mature, well-maintained library over reimplementing general-purpose functionality.
- Never leave a `TODO` without context: state the reason and removal condition, or link a trackable task.
- Follow the repository's file organization and co-location conventions. Split files when cohesion or the requested structural change warrants it, not to meet a fixed file-size or one-concept rule.
  - If the current structure hinders the task, explain the concrete cost and the tradeoffs of a better structure. Do not infer the user's intent or expertise from the existing code.
- When integrating upstream files, stage them in the platform's temporary directory and review the diff before applying selected changes. Preserve unrelated local edits.
- Use web research for current, high-risk, or uncertain facts, not stable facts already known. Prefer authoritative sources; use exact errors in diagnostic searches and the session date when recency matters.
- Fix/refactor: delete old path by default. Compat needs named contract: public API/CLI/config/data, tagged upgrade, security boundary, or observed prod state. Unsure: ask before alias/shim/fallback. Tests alone != contract.
- The number of tokens used to edit files is best minimized, all else being equal. Therefore, when it will not affect the end result, try to surgically edit a file rather than rewrite the entire thing.


## Testing & Validation

- Use the smallest existing checks that cover the affected contract and risk. Honor explicit user requests for additional verification. Leave full suites to CI unless the user requests them, repository requirements apply, or wider risk justifies a local run.
- Prefer a focused E2E check for changed app behavior when it directly establishes the outcome. Use lower-level tests when they cover the contract more directly or economically.
- Preserve test intent and meaningful assertions. Add or revise tests for material coverage gaps, not to mirror the implementation. Reuse valid evidence; repeat or broaden checks only after relevant changes, failures, unresolved concerns, or required project gates.
- Read documentation when it defines an affected contract or resolves project-specific uncertainty. Follow relevant `read_when` hints; a small, understood edit does not need a repository map or documentation sweep.
- Update relevant documentation for behavior or API changes unless repository policy prohibits it. Keep completion evidence observable through task-appropriate inspection tools or logs.

## Observability

For new or materially changed app behavior, identify how important outcomes, failures, and performance will be observed. Preserve existing telemetry contracts and reuse signals that already answer the question.

During implementation and debugging, add focused debug logs where they help agents and humans follow execution, inspect relevant state changes, and locate failures. Reuse the existing logging facilities and inspect the output during development. Keep sensitive data out of logs. Remove temporary probes before delivery, or deliberately retain useful, low-noise diagnostics at the appropriate log level.

For persistent application instrumentation or changes to telemetry collection, use [Telemetry](../telemetry/SKILL.md). Temporary local debug probes do not require the full telemetry workflow. Cosmetic changes and behavior-preserving refactors do not by themselves need new events.

## Related guidance

- For an unresolved module-interface or ownership decision, use [Codebase design](../engineering/codebase-design/SKILL.md).
- For a contested design or consequential acceptance claim, use an independent review with the [Code review](../engineering/code-review/SKILL.md) rubric.
- For technical documents whose structure or explanation needs work, use [Technical writing](../pstack/technical-writing/SKILL.md). Routine replies follow shared prose rules. Substantial prose revision uses [Unslop](../pstack/unslop/SKILL.md); agent instructions use the harness's skill-authoring guidance.
- Before a commit, use the [deslop pass](references/refactoring/deslop.md). Review comments against **Code clarity and comments** when preparing your own changes for review.


## Principles

Use the references that address a decision in the task. Each leaf owns its advice and limits.
Report consequential choices and evidence, not a recital of principle names.

**Core**

- [Foundational Thinking](references/principles/principle-foundational-thinking.md) applies when several changes share an unresolved prerequisite.
- [Redesign from First Principles](references/principles/principle-redesign-from-first-principles.md) applies when a requirement creates repeated exceptions or parallel representations.
- [Attack the Premise](references/principles/principle-attack-the-premise.md) applies when repeated fixes fail or evidence challenges the requested mechanism.
- [Subtract Before You Add](references/principles/principle-subtract-before-you-add.md) applies when an addition would extend obsolete structure or duplicate decisions.
- [Minimize Reader Load](references/principles/principle-minimize-reader-load.md) applies to unnecessary indirection or hidden mutable state.
- [Outcome-Oriented Execution](references/principles/principle-outcome-oriented-execution.md) applies to planned migrations with explicit phase boundaries.
- [Experience First](references/principles/principle-experience-first.md) applies when implementation convenience conflicts with consumer outcomes.
- [Exhaust the Design Space](references/principles/principle-exhaust-the-design-space.md) applies to consequential choices with viable alternatives and no established answer.
- [Build the Lever](references/principles/principle-build-the-lever.md) applies to repetitive edits, error-prone transformations, or costly manual evidence collection.

**Architecture**

- [Model the Domain](references/principles/principle-model-the-domain.md) applies when state or repeated branches obscure a domain invariant.
- [Boundary Discipline](references/principles/principle-boundary-discipline.md) applies to external input and framework adapters.
- [Type System Discipline](references/principles/principle-type-system-discipline.md) applies when types permit invalid states or ambiguous identifiers.
- [Make Operations Idempotent](references/principles/principle-make-operations-idempotent.md) applies to operations that can repeat after retries or partial failure.
- [Migrate Callers Then Delete Legacy APIs](references/refactoring/clean-refactoring.md#migrate-callers-then-delete-legacy-apis) applies when replacing an internal API with existing callers.
- [Separate Before Serializing Shared State](references/principles/principle-separate-before-serializing-shared-state.md) applies to concurrent writers.

**Verification**

- [Prove It Works](references/principles/principle-prove-it-works.md) guides completion evidence.
- [Fix Root Causes](systematic-debugging/guide.md#fix-root-causes) guides diagnosis.
- [Sequence Work into Verifiable Units](references/principles/principle-sequence-verifiable-units.md) guides dependent changes and their verification boundaries.
- [Test Behavior, Not Implementation](references/principles/principle-test-behavior-not-implementation.md) guides test design and coverage review.

**Execution**

- [Guard the Context Window](references/execution/principle-guard-the-context-window.md) applies when retrieval or separate workstreams threaten useful context.
- [Never Block on the Human](references/principles/principle-never-block-on-the-human.md) guides reversible decisions within the authorized task.
- [Encode Lessons in Structure](references/principles/principle-encode-lessons-in-structure.md) applies to recurring defects or corrections that reveal an unenforced invariant.

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
- PR feedback or requested review and CI monitoring: [Resolve PR comments](../resolve-pr-comments/SKILL.md).
- Commit or PR preparation, a stacked-PR plan, an authorized merge, release preparation, or requested worktree cleanup: [Git and releases](../git-and-releases/SKILL.md).

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
