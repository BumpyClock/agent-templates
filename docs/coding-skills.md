---
read_when: Update coding workflow skills or their shared references.
---

# Coding guidance ownership

`skills/programming/SKILL.md` contains cross-cutting defaults and routes to task-specific references.

- `skills/programming/references/write-tests.md` owns test quality and coverage decisions.
- `skills/programming/references/tdd-rules.md` owns the explicit TDD workflow.
- `skills/programming/systematic-debugging/guide.md` owns diagnosis.
- `skills/programming/references/verification-before-completion.md` owns completion evidence and its reuse.

The `diagnosing-bugs` and `tdd` skills route to these references.
Poteto's proof and sequence references use the same verification owner.
Keep shared rules in their owner instead of duplicate workflow checklists.
Platform guides retain runner APIs and domain-specific examples, with links to the shared test policy.
Git and PR skills use the same verification owner. They retain authorization and operation safety without extra test gates, independent completion reviews, or automatic review loops.

## Design principles

`skills/programming/references/principles/` owns conditional code and design principles.
Each `principle-*.md` file defines a trigger, a decision, and a limit.
The index in `skills/programming/SKILL.md` selects references by the current decision.
Use these principles through `programming` without a Poteto mode invocation.

The library also preserves named decisions for subtraction, first-principles redesign, foundations, and consumer experience.
Type reviews use `references/design/type-design.md`, which points to the shared type principle.
Keep the reference index conditional rather than require every principle on every task.

Migrate Callers Then Delete Legacy APIs is a named rule in `references/refactoring/clean-refactoring.md`.
Fix Root Causes is a named rule in `systematic-debugging/guide.md`.
These names use the existing procedures rather than duplicate them in separate principle files.
Guard the Context Window lives in `references/execution/`, separate from design principles.
Laziness Protocol uses the shared refactor contract.
Outcome-Oriented Execution uses `references/verification-before-completion.md` and the refactor contract.
Keep the adapted rules in their shared owners rather than duplicate active workflow checklists.

## Shared workflows

`programming` routes by the requested deliverable.
Shared workflows do not require Poteto mode, mandatory delegation, fixed agent panels, or automatic PR creation.

| Workflow | Owner |
| --- | --- |
| Bug fix | [Systematic diagnosis](../skills/programming/systematic-debugging/guide.md) |
| Eval | [Agent-guidance evaluation](../skills/programming/evals/README.md) |
| Feature | [Feature workflow](../skills/programming/references/workflows/feature.md) |
| Investigation | [How](../skills/pstack/how/SKILL.md) |
| Perf issue | [Performance workflow](../skills/programming/references/performance/perf-issue.md) |
| Prototype | [Prototype skill](../skills/engineering/prototype/SKILL.md) |
| Refactoring | [Clean refactoring](../skills/programming/references/refactoring/clean-refactoring.md) |
| Runtime forensics | [Live diagnosis](../skills/programming/references/performance/runtime-forensics.md) |
| Trace forensics | [Capture analysis](../skills/programming/references/performance/trace-forensics.md) |

The prototype skill separates interactive state demonstrations, UI alternatives, and bounded behavioral probes.
A prototype-only request stops at its decision and evidence.
Live diagnostics require explicit authority for code injection or shared-state mutation.
An evaluation compares artifacts under equivalent conditions rather than reward principle citations.

Preserve `skills/pstack/poteto-mode/` as reference material.
Apply adaptations in the shared owners above, not in the preserved Poteto files.
The adapted workflows do not inherit the original mode's orchestration requirements.

## Existing test cleanup

`skills/engineering/test-cleanup/SKILL.md` owns audits and edits of existing suites.
Use `$test-cleanup audit <path>` for a report or `$test-cleanup clean up <path>` for authorized test edits.
The workflow records keep, delete, rewrite, and unresolved verdicts with evidence of retained coverage.
It preserves uncertain tests and separates production defects from test-only cleanup.
Test quantity, age, and presumed AI authorship do not establish test value.

Evaluate rules against task outcomes and counterexamples under `skills/programming/evals/`.
Treat historical incidents as evidence for investigation rather than permanent mandates.

Archived skills reside under `skills_archive/` and do not belong in the active discovery tree.
Preserve archive contents and replace active invocation routes when a skill moves there.
