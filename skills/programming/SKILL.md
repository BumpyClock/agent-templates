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
- Reduce what maintainers must understand and coordinate. Judge abstractions by the complexity they hide or invariants they enforce, not caller counts or function length.
- Give each business rule one authoritative owner. Share code when consumers represent the same concept and should change together; similar syntax alone is insufficient.
- Encode recurring, important invariants in types, constraints, lints, or tests when enforcement is more reliable than reminders.
- Make states, ownership, and dependencies explicit. Use types and data structures to prevent relevant invalid states. Validate untrusted input at boundaries; enforce authorization and mutable-state invariants where they can change.
- For stateful or asynchronous changes, examine authoritative state, ordering, partial failure, retries, cancellation, cleanup, and resource bounds where relevant. Make failures observable; recover only when the resulting behavior remains valid.
- Refactor in behavior-preserving steps. Capture uncertain existing behavior before changing it. Migrate controlled callers coherently; preserve external and stored-data contracts unless their migration is authorized. Give necessary compatibility bridges a removal condition.
- Explain non-obvious intent, constraints, or tradeoffs in comments. Preserve useful contract documentation, safety notes, licenses, and directives; remove comments that merely restate code.
- Always work from first principles. invoke the relevant principle-* skills from ../pstack/

## Verify and finish

- Choose the smallest reliable checks covering the changed contract and material risks. Use integration or end-to-end checks when correctness spans boundaries. Respect required project gates and reuse valid evidence.
- Test outcomes, failures, and invariants with expectations independent of the implementation. A plausible behavioral defect should fail the relevant check; a behavior-preserving internal rewrite should normally pass.
- Add durable tests for meaningful regression risk or coverage gaps. Keep temporary probes temporary. Repeat or broaden verification only when changes, failures, unresolved risk, or required gates justify it.
- For performance work, measure a representative baseline and compare equivalent workloads after the change. Preserve correctness; bound claims to what was measured.
- Reuse existing diagnostics. Retain only useful, low-noise instrumentation. Update affected contracts and documentation when the change makes them inaccurate.
- Complete implementation, integration, and necessary verification within the authorized scope. Review-only requests end with findings. Report the result, consequential decisions, verification, and unresolved limits.

## Conditional references

Open references only when their specific guidance is needed. They provide task detail; they do not make every change require a separate workflow, design contest, or principle catalogue.

| Need | Reference |
| --- | --- |
| Coordinated feature work | [Feature](references/workflows/feature.md) |
| Substantial structural migration | [Refactoring](references/refactoring/clean-refactoring.md) |
| Unresolved module ownership or interface decision | [Codebase design](../engineering/codebase-design/SKILL.md) |
| Code review | [Review rubric](../engineering/code-review/SKILL.md) |
| Performance investigation | [Performance](references/performance/perf-issue.md); [live process](references/performance/runtime-forensics.md); [capture analysis](references/performance/trace-forensics.md), as applicable |
| Platform-specific work | [Apple](references/apple/guide.md), [WinUI](references/winui/guide.md), [GPUI](references/gpui/guide.md), or [TypeScript contracts](references/languages/typescript-patterns.md) |
| Persistent telemetry changes | [Telemetry](../engineering/telemetry/SKILL.md) |
| Requested commits, PRs, or release work | [Git and releases](../git-and-releases/SKILL.md) |
