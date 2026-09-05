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
- Place conditional procedures behind links with explicit activation conditions.
- Use project terms consistently without replacing valid domain vocabulary.
- Prefer observable outcomes over required artifacts, agent counts, or fixed sequences.

Keep the root document small enough to expose its decisions.
A short, single-purpose document does not need more files.
Preserve useful examples and scripts when their replacement would require repeated work.

## References

- For skill frontmatter and invocation choices, read [Skill mechanics](SKILL-MECHANICS.md).
- For a difficult choice about disclosure, pointers, or document structure, read [Instruction design](references/instruction-design.md).
- For a claim about model performance, use [Outcome evaluations](../../programming/evals/README.md).

Validate links and metadata after structural edits.
Distinguish editorial judgment from measured model behavior.
