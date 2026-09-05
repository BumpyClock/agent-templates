# Complex Investigation

Use this reference for subsystem explanations with several independent paths or substantial source context.

## Scope and research

Identify the behavior or design decision the answer must explain.
Trace entry points, state changes, dependencies, and externally visible results.
Use history when it can establish rationale that current source cannot show.

Split research only where independent questions justify separate contexts.
Keep a continuous call chain with one investigator when division would duplicate work.
When delegation helps, give each investigator a bounded question and relevant source paths.
Use the available harness rather than assume a specific agent API.

The [explorer brief](explorer-prompt.md) provides an optional prompt for delegated source research.
Require evidence and unresolved questions, not file dumps.
A separate synthesis context may use the [explainer brief](explainer-prompt.md) when the collected material warrants it.

## Synthesis

Resolve contradictory reports against source.
Separate implementation facts from architectural interpretation.
Reuse valid research rather than inspect the subsystem again for each output section.

Organize the answer around the user's question.
Useful sections can include concepts, runtime flow, ownership, constraints, and failure modes.
Omit sections that add no useful information.
Use diagrams only when relationships are clearer than prose.

## Critique

Establish the relevant behavior before assessment.
The answer does not need a separate full explanation before its recommendation.

Use the [critique rubric](critique-rubric.md) to assess concrete tradeoffs.
Use a separate critic only when independent expertise or substantial context justifies the cost.
The [critic brief](critic-prompt.md) is available for that case.

Distinguish actionable problems, optional improvements, and rejected concerns.
Retain responsibility for evidence supplied by other agents.
