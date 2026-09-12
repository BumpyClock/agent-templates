---
name: writing-for-agents
description: Create or revise agent instructions in skills, AGENTS.md, or CLAUDE.md.
---

# Writing for Agents

Write instructions that change useful decisions without prescribing a process for every task.

## Checklist

- State the purpose, activation condition, and completion condition.
- Preserve user intent, project constraints, and authorization boundaries.
- Keep non-obvious rules that prevent a concrete failure.
- Remove generic reminders and duplicate rules already owned elsewhere.
- Before adding a rule, identify the decision it should change and a case where it should not apply.
- Revise the section that owns the decision instead of appending an overlapping exception.
- Place conditional procedures behind links with explicit activation conditions.
- Use project terms consistently without replacing valid domain vocabulary.
- Prefer observable outcomes over required artifacts, agent counts, or fixed sequences.

Keep the root document small enough to expose its decisions.
A short, single-purpose document does not need more files.
Preserve useful examples and scripts when their replacement would require repeated work.

## Shared execution defaults

For behavior changes to shared execution defaults, select applicable cases below to define acceptance criteria.
Assess task outcomes, unnecessary work, authorization, and response usefulness rather than prompt recitation or mechanical compliance.
These cases define expected outcomes, not measured results.

| Task | Expected outcome |
|---|---|
| Small, isolated edit | Direct execution without unnecessary delegation |
| Independent, substantial tasks | Bounded delegation when its benefit exceeds coordination cost |
| Request for feedback | Analysis without file changes |
| Required tool unavailable | An alternative that preserves behavior and restrictions, or an explicit blocker |
| Behavior change | Relevant validation and documentation, subject to repository policy |

## References

- For skill frontmatter and invocation choices, read [Skill mechanics](SKILL-MECHANICS.md).
- For a difficult choice about disclosure, pointers, or document structure, read [Instruction design](references/instruction-design.md).

Validate links and metadata after structural edits.
Distinguish editorial judgment from measured model behavior.
