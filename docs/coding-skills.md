---
read_when: Update coding workflow skills or their shared references.
---

# Coding guidance ownership

`skills/programming/SKILL.md` contains cross-cutting defaults and routes to task-specific references.

- `skills/programming/references/write-tests.md` owns test quality and coverage decisions.
- `skills/programming/references/tdd-rules.md` owns the explicit TDD workflow.
- `skills/programming/systematic-debugging/guide.md` owns diagnosis.
- `skills/programming/references/verification-before-completion.md` owns completion evidence and its reuse.

The `diagnosing-bugs`, `tdd`, and `principle-prove-it-works` skills route to these references.
The sequence principle defines coherent work units and uses the same verification reference.
Keep shared rules in their owner instead of duplicate workflow checklists.
Platform guides retain runner APIs and domain-specific examples, with links to the shared test policy.

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
