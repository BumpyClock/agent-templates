---
name: programming
description: "Use when coding. Implement, debug, refactor; review code designs."
---


## Code clarity and comments
- Correct code 
- Performant code — think about allocations, data structures, hot paths
- Readable code — every line should earn its place. Use clear names, types, and structure. 
- I hate comments. No comments in the code unless they explain non-obvious reasons, constraints, or tradeoffs. Do not repeat code or justify avoidable complexity. Simplify the code instead.
  - Only preserve required documentation, safety notes, licenses, and tool directives.
  - When similar code stays duplicated on purpose, comment why the copies evolve independently or are not yet abstracted.
- Reuse or extend an existing helper, type, component, or pattern when practical & efficient. Prefer a smaller complete change over a parallel path or speculative abstraction.
- Use web research for current, high-risk, or uncertain facts, not stable facts already known. Prefer authoritative sources; use exact errors in diagnostic searches and the session date when recency matters.


## Testing & Validation

- Use the smallest existing checks that cover the affected contract and risk.
- Prefer a focused E2E check for changed app behavior when it directly establishes the outcome. Use lower-level tests when they cover the contract more directly or economically. Add or revise tests for material coverage gaps, not to mirror the implementation. Reuse valid evidence; repeat or broaden checks only after relevant changes, failures, unresolved concerns, or required project gates.

## Observability

For new or materially changed app behavior identify how important outcomes, failures, and performance will be observed. Preserve existing telemetry contracts and reuse signals that already answer the question.

During implementation and debugging, add focused debug logs to help agents and humans follow execution, inspect relevant state changes, and locate failures. Reuse the existing logging facilities and inspect the output during development. Remove temporary probes before delivery, only retain useful, low-noise diagnostics at the appropriate log level.

For persistent application instrumentation or changes to telemetry collection, use `telemetry` skill. Temporary local debug probes do not require the full telemetry workflow. Cosmetic changes and behavior-preserving refactors do not by themselves need new events.

## Principles

Read the leaf skill in full for any principle you apply. Each entry names when it applies.

**Core**

- **Laziness Protocol** (**principle-laziness-protocol**). Refactoring, sizing a diff, or tempted to add abstractions, layers, or signal threading. Bias to deletion and the smallest change that solves the problem.
- **Foundational Thinking** (**principle-foundational-thinking**). Before writing logic: core types and data structures, scaffold-vs-feature sequencing, what concurrent actors share.
- **Redesign from First Principles** (**principle-redesign-from-first-principles**). Integrating a new requirement into an existing design. Redesign as if it had been foundational from day one.
- **Attack the Premise** (**principle-attack-the-premise**). Two or more fixes that share one premise have failed the same gate. Take a census of which actors hold the imbalance before the next fix, then question the premise instead of writing another fix that assumes it.
- **Subtract Before You Add** (**principle-subtract-before-you-add**). Sequencing an addition, refactor, or rewrite. Remove dead weight first, then build on the simpler base.
- **Minimize Reader Load** (**principle-minimize-reader-load**). Reviewing or shaping code that's hard to trace. Count layers and hidden state, collapse one-caller wrappers, shrink mutable scope.
- **Outcome-Oriented Execution** (**principle-outcome-oriented-execution**). Planned rewrites and migrations with explicit phase boundaries. Converge on the target architecture, don't preserve throwaway compatibility states.
- **Experience First** (**principle-experience-first**). Product, UX, or feature-scope tradeoffs. Choose user delight over implementation convenience.
- **Exhaust the Design Space** (**principle-exhaust-the-design-space**). A novel interaction or architectural decision with no precedent. 
- 
- **Build the Lever** (**principle-build-the-lever**). Any non-trivial repeated work. Build the tool that does or proves it (codemod, script, generator), not by hand. The tool is the artifact a reviewer reruns.

**Architecture**

- **Model the Domain** (**principle-model-the-domain**). Writing stateful logic, or code that branches a lot or repeats a shape assumption across files. Encode the domain in a structure (state machine, typed model, table or registry, reducer, boundary, the right collection) instead of scattered conditionals.
- **Boundary Discipline** (**principle-boundary-discipline**). Wiring validation, error handling, or framework adapters. Guards at system boundaries, trust internal types, keep business logic pure.
- **Type System Discipline** (**principle-type-system-discipline**). Designing types or a signature in any typed language. Make illegal states unrepresentable, brand primitives, parse external data at boundaries.
- **Make Operations Idempotent** (**principle-make-operations-idempotent**). Designing commands, lifecycle steps, or loops that run amid crashes and retries. Converge to the same end state.
- **Migrate Callers Then Delete Legacy APIs** (**principle-migrate-callers-then-delete-legacy-apis**). Introducing a new internal API while old callers exist. Migrate and delete in one wave.
- **Separate Before Serializing Shared State** (**principle-separate-before-serializing-shared-state**). Concurrent actors might write the same file, branch, key, or object. Eliminate the sharing first.

**Verification**

- **Prove It Works** (**principle-prove-it-works**). After a task, before declaring done. Verify against the real artifact, not a proxy or "it compiles".
- **Fix Root Causes** (**principle-fix-root-causes**). Debugging. Trace each symptom to its root cause, reproduce first, ask why until you reach it.
- **Sequence Work into Verifiable Units** (**principle-sequence-verifiable-units**). Multi-step work (sweeps, migrations, runs of similar edits) and how you stack commits and PRs. Break work into small units that each end in a check, verify each before the next, and order delivery so the sequence proves itself.
- **Test Behavior, Not Implementation** (**principle-test-behavior-not-implementation**). Writing, changing, or keeping a test. Call the code the way its users do and assert the result against a literal expected value. If the test would still pass when every imported function returns `undefined`, rewrite the assertion or delete the test.

**Delegation**

- **Guard the Context Window** (**principle-guard-the-context-window**). Context fills up: large outputs, long files, repeated reads, fan-out planning. Route bulk to subagents, keep summaries in the main thread.
- **Never Block on the Human** (**principle-never-block-on-the-human**). Tempted to ask "should I do X?" on reversible work. Proceed, present the result, let the human course-correct.

**Meta**

- **Encode Lessons in Structure** (**principle-encode-lessons-in-structure**). You catch yourself writing the same instruction a second time. Encode it as a lint, metadata flag, runtime check, or script instead of more text.

## Related guidance

- Nontrivial change, architecture decision, or "are we sure?" → the **how** skill.
- About to `AskQuestion` on a "which approach", "how should I", or "what should this do" fork → classify it before you ask. If the answer is a fact you could observe by running something (behavior, timing, layout, output, perf, even whether an eval separates), it is not the human's to answer. Sketch it via the Prototype playbook (`playbooks/prototype.md`) and let the result decide. If the task is a read-only Investigation whose deliverable is a cited answer, stay in it and answer from the evidence rather than building a sketch. Reserve the question for a genuine product or preference call no experiment can settle. Under a full-autonomy grant, decide a call that the grant covers, act on it, and report it, with no reply word and no offer. Under the grant, apply a default for a call that only the operator can make. Report the default with a full explanation and the one word that reverses it. Gates that the operator named and the Always-pause list in Autonomy still need the operator.
- Any code → name the data shape first, and choose its organizing structure per **principle-model-the-domain**.
- Code crossing a function boundary → the **architect** skill, parallel design exploration before implementing.
- Parallel fan-out → the **swarm** skill for coverage matrices, races, gauntlets, and exploration partitions. Use **arena** for design or code bakeoffs with base selection and grafting.
- Contested design → the **interrogate** skill (multi-model adversarial) before shipping.
- Nontrivial multi-step → write the throughput checkpoint (Feature step 3).
- Any prose surface → the **unslop** skill.
- Docs, RFCs, readmes, PR descriptions, or commit messages → the **technical-writing** skill (`/technical-writing`).
- Before commit → the `deslop` skill.
- Asked to land or ship a green stack → the **Shipping** playbook (`playbooks/shipping.md`). Green is not safe. Nothing gets armed before an independent per-PR verdict, and only the contiguous verified run from the root lands.
- Each skill owns its advice and limits.
  Report consequential choices and evidence, not a recital of principle names.
- For an unresolved module-interface or ownership decision, use [Codebase design](../engineering/codebase-design/SKILL.md).
- For a contested design or consequential acceptance claim, use an independent review with the [Code review](../engineering/code-review/SKILL.md) rubric.
- For technical documents whose structure or explanation needs work, use [Technical writing](../pstack/technical-writing/SKILL.md). Routine replies follow shared prose rules. Substantial prose revision uses [Unslop](../pstack/unslop/SKILL.md); agent instructions use the harness's skill-authoring guidance.



## Workflows

Select the workflow that matches the requested deliverable:

- New or changed behavior: [Feature](references/workflows/feature.md).
- Defect or unclear regression: [Systematic diagnosis](systematic-debugging/guide.md).
- Structural or API refactor: [Refactoring](references/refactoring/clean-refactoring.md), including [Migrate Callers Then Delete Legacy APIs](../pstack/principle-migrate-callers-then-delete-legacy-apis/SKILL.md).
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
