---
name: programming
description: "Implement, debug, refactor, or review code with scoped changes and evidence."
---

# Programming

Use project constraints and established context. Scale planning, exploration, and verification to uncertainty and the consequences of being wrong.

## Establish the contract

- Identify the requested outcome, affected consumers, invariants, compatibility requirements, and evidence of completion. Inspect the relevant owners, callers, and checks; reuse facts already established.
- For defects, reproduce or characterize the failure, test a discriminating hypothesis, and fix the responsible layer. When reproduction is unavailable, distinguish the suspected cause from what the evidence establishes.

## Keep the design coherent

- Make the smallest complete change that leaves the affected design coherent. Prefer existing owners and idioms. Avoid unrelated cleanup, parallel mechanisms, and capabilities built for hypothetical needs.
- Reduce what maintainers must understand and coordinate. Judge abstractions by the complexity they hide or invariants they enforce, not caller counts or function length. Keep single-use logic inline unless a helper hides a complex boundary or its name makes the caller clearer.
- Give each business rule one authoritative owner. Share code when consumers represent the same concept and should change together; similar syntax alone is insufficient.
- Encode recurring, important invariants in types, constraints, lints, or tests when enforcement is more reliable than reminders.
- Make states, ownership, and dependencies explicit. Use types and data structures to prevent relevant invalid states. Validate untrusted input once at the boundary that owns it and pass typed values inward; do not recheck values that a schema, constructor, or internal type already guarantees. Enforce authorization and mutable-state invariants where they can change.
- For stateful or asynchronous changes, examine authoritative state, ordering, partial failure, retries, cancellation, cleanup, and resource bounds where relevant. Make failures observable; recover only when the resulting behavior remains valid.
- Refactor in behavior-preserving steps. Capture uncertain existing behavior before changing it. Migrate controlled callers coherently; preserve external and stored-data contracts unless their migration is authorized. Give necessary compatibility bridges a removal condition.
- Explain non-obvious intent, constraints, or tradeoffs in comments. Preserve useful contract documentation, safety notes, licenses, and directives; remove comments that merely restate code.
- Reason from first principles. Open a [principle](#principles) when its trigger matches the decision at hand.
- Do not chase edge cases that are unlikely or impossible in practice, such as a theoretical race or security scenario. Each guard for one widens the scope and invites the next. Prefer a design that makes the path impossible. Otherwise leave the guard out and note the case in the final report: what could go wrong, how likely it is, and what the guard would cost, in plain words. A case that the affected contract or a reference names as expected is in scope; handle it.

## Verify and finish

- Choose the smallest reliable checks covering the changed contract and material risks. Use integration or end-to-end checks when correctness spans boundaries. Respect required project gates and reuse valid evidence.
- Test outcomes, failures, and invariants with expectations independent of the implementation. A plausible behavioral defect should fail the relevant check; a behavior-preserving internal rewrite should normally pass.
- Add durable tests for meaningful regression risk or coverage gaps. Keep temporary probes temporary. Repeat or broaden verification only when changes, failures, unresolved risk, or required gates justify it.
- For performance work, measure a representative baseline and compare equivalent workloads after the change. Preserve correctness; bound claims to what was measured.
- Reuse existing diagnostics. Retain only useful, low-noise instrumentation. Update affected contracts and documentation when the change makes them inaccurate.
- Complete implementation, integration, and necessary verification within the authorized scope. Review-only requests end with findings. Report the result, consequential decisions, verification, and unresolved limits.
- When options are otherwise equal, choose the one that serves the user experience, developer experience, and agent experience together.

## Conditional references

Open references only when their specific guidance is needed. They provide task detail; they do not make every change require a separate workflow, design contest, or principle catalogue.

| Need | Reference |
| --- | --- |
| Defect with an unknown cause | [Fix Root Causes](../pstack/principle-fix-root-causes/SKILL.md) |
| Coordinated feature work | [Feature](references/workflows/feature.md) |
| Requested refactor or structural migration | [Refactoring](references/refactoring/clean-refactoring.md) |
| Unresolved module ownership or interface decision | [Codebase design](../engineering/codebase-design/SKILL.md) |
| Code review | [Review rubric](../engineering/code-review/SKILL.md) |
| Error handling, fallback, or retry review | [Silent failures](references/error-handling/silent-failures.md) |
| Domain type or state-machine review | [Type design](references/design/type-design.md) |
| Browser UI or React behavior | [Web development](references/web-development.md) |
| Performance investigation | [Performance](references/performance/perf-issue.md); [live process](references/performance/runtime-forensics.md); [capture analysis](references/performance/trace-forensics.md), as applicable |
| Platform-specific work | [Apple](references/apple/guide.md), [WinUI](references/winui/guide.md), [GPUI](references/gpui/guide.md), or [TypeScript contracts](references/languages/typescript-patterns.md) |
| Persistent telemetry changes | [Telemetry](../engineering/telemetry/SKILL.md) |
| Requested commits, PRs, or release work | [Git and releases](../git-workflow/SKILL.md) |

## Principles

Open a principle when its trigger matches. Most changes need none or one.

| Trigger | Principle |
| --- | --- |
| Two or more fixes that share one premise failed the same check | [Attack the Premise](../pstack/principle-attack-the-premise/SKILL.md) |
| Validation, error handling, or framework adapters | [Boundary Discipline](../pstack/principle-boundary-discipline/SKILL.md) |
| Repetitive or bulk edits, migrations, analyses, or checks | [Build the Lever](../pstack/principle-build-the-lever/SKILL.md) |
| Work could use separate contexts or parallel execution | [Delegate After the Contract](../pstack/principle-delegate-after-the-contract/SKILL.md) |
| The same instruction or correction recurs | [Encode Lessons in Structure](../pstack/principle-encode-lessons-in-structure/SKILL.md) |
| Novel UI interaction or architecture decision with no precedent | [Exhaust the Design Space](../pstack/principle-exhaust-the-design-space/SKILL.md) |
| Product, UX, or feature-scope tradeoff | [Experience First](../pstack/principle-experience-first/SKILL.md) |
| Measuring, or acting on a measured number | [Explain the Number](../pstack/principle-explain-the-number/SKILL.md) |
| Debugging | [Fix Root Causes](../pstack/principle-fix-root-causes/SKILL.md) |
| Choosing core types, data structures, or scaffold order | [Foundational Thinking](../pstack/principle-foundational-thinking/SKILL.md) |
| Tempted to add an abstraction, layer, or signal threading | [Laziness Protocol](../pstack/principle-laziness-protocol/SKILL.md) |
| Commands or loops that run amid crashes, restarts, or retries | [Make Operations Idempotent](../pstack/principle-make-operations-idempotent/SKILL.md) |
| New internal API while old callers exist | [Migrate Callers Then Delete Legacy APIs](../pstack/principle-migrate-callers-then-delete-legacy-apis/SKILL.md) |
| Code is hard to trace | [Minimize Reader Load](../pstack/principle-minimize-reader-load/SKILL.md) |
| Stateful logic, heavy branching, or a repeated shape assumption | [Model the Domain](../pstack/principle-model-the-domain/SKILL.md) |
| Tempted to ask permission for reversible work | [Never Block on the Human](../pstack/principle-never-block-on-the-human/SKILL.md) |
| Planned rewrite or migration with phase boundaries | [Outcome-Oriented Execution](../pstack/principle-outcome-oriented-execution/SKILL.md) |
| Before declaring a task done | [Prove It Works](../pstack/principle-prove-it-works/SKILL.md) |
| A new requirement strains an existing design | [Redesign from First Principles](../pstack/principle-redesign-from-first-principles/SKILL.md) |
| Concurrent actors may write the same file, branch, key, or state | [Separate Before Serializing Shared State](../pstack/principle-separate-before-serializing-shared-state/SKILL.md) |
| Multi-step sweeps, migrations, or stacked commits and PRs | [Sequence Verifiable Units](../pstack/principle-sequence-verifiable-units/SKILL.md) |
| Sequencing an addition, refactor, or rewrite | [Subtract Before You Add](../pstack/principle-subtract-before-you-add/SKILL.md) |
| Writing, changing, or keeping a test | [Test Behavior, Not Implementation](../pstack/principle-test-behavior-not-implementation/SKILL.md) |
| Designing types or function signatures | [Type System Discipline](../pstack/principle-type-system-discipline/SKILL.md) |
