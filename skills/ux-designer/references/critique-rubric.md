# Critique rubric

Read for an explicit comprehensive critique or structured usability assessment. Use [Critique](critique.md) for access, evidence, and the report. Use [Generic patterns](generic-patterns.md) for the built-result floor and the patterns to flag.

Complete the assessment with evidence, concrete effects on the task, and explicit verification limits.

## Core criteria

**Design specificity:** Is the composition, interaction, and visual language grounded in this product, or could an unrelated product use it unchanged?

**Holistic design:** hierarchy, IA, emotional fit, discoverability, composition, typography, color, accessibility, states, copy, and edge cases. Read the references that own the affected topics.

**Cognitive load:** use [Cognitive load](#cognitive-load). Report checklist failures and overloaded decision points.

**Emotional journey:** peak-end rule, emotional valleys, reassurance at high-stakes moments.

**Nielsen heuristics:** assess against [Nielsen's heuristics](#nielsens-heuristics). Score them only when the user requests a structured assessment, as described in [Optional structured scores](#optional-structured-scores).


## Cognitive load

Classify each problem as intrinsic (structure it), extraneous (eliminate it), or germane (support it).

**Checklist:**
1. Single focus: the primary task is free of competing elements.
2. Chunking: groups are small enough to scan. About four items per group is a useful starting point.
3. Grouping: related items are visually grouped.
4. Visual hierarchy: the most important thing is obvious at once.
5. One thing at a time: one decision before the next.
6. Minimal choices: each decision point shows only the options the user must compare.
7. Working memory: nothing to remember from a previous screen.
8. Progressive disclosure: complexity appears only when needed.

Report each failed item with its evidence. Several failures on one task indicate high load.

Option count alone does not establish overload. Flag a decision point when users must compare many ungrouped options, or must recall information from another screen. Recognized, well-grouped options, such as a sidebar or a settings list, can exceed any fixed count.

Starting points by surface. Depart from one when the content needs it:
- Action buttons: one primary, one or two secondary, the rest in a menu.
- Navigation: group top-level items when they exceed what users can scan.
- Long-form articles: one reading path, related links in one block at the end.
- Gallery and portfolio indexes: one decision per screen (which piece to open).

**Named violations** (use these names in findings): Wall of Options, Memory Bridge, Hidden Navigation, Jargon Barrier, Visual Noise Floor, Inconsistent Pattern, Multi-Task Demand, Context Switch.

## Nielsen's heuristics
1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize, diagnose, and recover from errors
10. Help and documentation

## Optional structured scores

Use numeric scores only when the user requests a structured assessment. Otherwise, report evidence-backed findings without scores.
Score each assessed heuristic independently on the scale below. A score describes the inspected task and states, not the entire product.

| Score | Meaning |
|---|---|
| 0 | Observed defects prevent the assessed task. |
| 1 | Observed defects create major task difficulty. |
| 2 | Observed defects create material friction, but the task remains possible. |
| 3 | The assessed task works with minor friction. |
| 4 | No material issue was observed within the assessed scope. |

- Mark a heuristic `n/a` only when it does not apply to the assessed task, and explain why.
- Mark relevant behavior `unverified` when the evidence is insufficient, and state what remains unknown.
- For partial evidence, limit the score to inspected states and list unverified states separately.
- Support each score with observations rather than the presence or absence of example features.
- Omit aggregate scores unless the user requests them.
- For a requested total, exclude `n/a` and `unverified` heuristics from both the total and maximum.
- Report all exclusions and partial coverage beside any requested total.
- Compare scores only when task, scope, evidence, and criteria are comparable.
- Do not convert scores into release approval, redesign mandates, or claims of complete usability.

No score cancels an observed defect. Report consequential defects individually, regardless of other scores.
