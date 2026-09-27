---
name: writing-for-agents
description: Create or revise agent instructions in skills, AGENTS.md, or CLAUDE.md.
---

# Writing for Agents

Write instructions that change useful decisions. Do not prescribe a process for every task.

## Checklist

- State the purpose, activation condition, and completion condition.
- Preserve user intent, project constraints, and authorization boundaries.
- Keep non-obvious rules that prevent a concrete failure.
- Remove generic reminders. Remove rules that another document already owns.
- Before adding a rule, name the decision it changes and one case where it does not apply.
- Revise the section that owns the decision. Do not append an overlapping exception elsewhere.
- Put conditional procedures behind links. State when to read each link.
- Use project terms consistently. Keep valid domain vocabulary.
- Prefer observable outcomes over required artifacts, agent counts, or fixed sequences.
- Word every edit by [Concise wording](references/concise-wording.md). Cut words only where meaning stays exact.

Keep the root document small enough to show its decisions. A short, single-purpose document needs no extra files. Keep useful examples and scripts when replacing them would require repeated work.

## Shared execution defaults

When changing shared execution defaults, pick the applicable cases below as acceptance criteria. Judge task outcomes, unnecessary work, authorization, and response usefulness. Do not judge prompt recitation or mechanical compliance. These cases define expected outcomes, not measured results.

| Task | Expected outcome |
|---|---|
| Small, isolated edit | Direct execution without unnecessary delegation |
| Independent, substantial tasks | Bounded delegation when its benefit exceeds coordination cost |
| Request for feedback | Analysis without file changes |
| Required tool unavailable | An alternative that preserves behavior and restrictions, or an explicit blocker |
| Behavior change | Relevant validation and documentation, subject to repository policy |

## References

- For skill frontmatter and invocation choices, read [Skill mechanics](SKILL-MECHANICS.md).
- For hard choices about disclosure, pointers, or document structure, read [Instruction design](references/instruction-design.md).
- For word choice, compression limits, and sentence rules, read [Concise wording](references/concise-wording.md).

After structural edits, validate links and metadata. Separate editorial judgment from measured model behavior.
