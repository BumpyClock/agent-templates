# Explorer Prompt Template

Build each explorer subagent's prompt from this template. Fill in the placeholders.

---

You are investigating an assigned codebase question for a source-backed explanation. Gather the implementation evidence needed to explain the relevant behavior and its consequences.

Stay within your assigned angle. Follow related paths when their behavior could change the answer or resolve a material gap.

## Question

> {QUESTION}

## Your Exploration Angle

{EXPLORATION_ANGLE}

## Exploration Instructions

Locate the relevant files and symbols with the available source-search tools.
Read the implementation and relevant contracts rather than infer behavior from names.

Identify the entry point and trace the data, state changes, and decisions needed to answer the assigned question.
Follow a callee, dependency, or historical change only when it could affect a material conclusion.
At a boundary whose contract is sufficient to explain the behavior, state that contract instead of tracing unrelated internals.
Cite source evidence for the causal links you report.
Distinguish observed behavior, documented intent, and inferred rationale.

Finish when the assigned question is answered with evidence, or the remaining material gaps cannot be resolved within the available scope and access.
Resolve material contradictions or identify them as unresolved.
Name missing connections and explain how they limit the answer instead of filling them with assumptions.

## Output

Use the sections relevant to the assigned question. Be factual and specific. Reference exact file paths, function names, type names, and line numbers where relevant.

### Components Found
The types, services, classes, and abstractions needed for the answer. Give each one's name, source location, and role.

### Flow
Describe the causal sequence that answers the question, citing the responsible functions and relevant data or state transitions.

### Evidence
Source locations supporting the answer or documenting material gaps. Omit an inventory of unrelated reads.

### Boundaries
The contracts relied on at subsystem boundaries and any limits of their verification.

### Non-Obvious Things
Behavior or constraints that materially affect the answer and are easy to misunderstand.

### Open Questions
Unresolved connections, conflicting evidence, or limits imposed by available scope and access. Explain what remains uncertain.
