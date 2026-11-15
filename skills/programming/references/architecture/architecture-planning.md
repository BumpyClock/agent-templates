# Architecture planning

Use for decisions that span components: new services or stores, data ownership, cross-module contracts, or sequencing of prerequisites.
For one module's interface or ownership, use [codebase design](../../../engineering/codebase-design/SKILL.md).

Use [Foundational Thinking](../../../pstack/principle-foundational-thinking/SKILL.md) when dependent work needs a shared prerequisite.

## Workflow

1. Inspect the affected boundaries, data flow, and project constraints. Read existing decisions that govern the change rather than map the whole repository.
2. Clarify goals, scope, non-functional requirements, and what must not change.
3. Make significant decisions explicit with options, trade-offs, and consequences.
4. Define contracts before work starts: API shapes, data ownership, events, module boundaries, and dependency direction.
5. When work has dependent parts, sequence prerequisites, core changes, integration, and verification.

## Architecture decisions

Use the repository's ADR location, index, and format.
Before changing a design governed by an ADR, read the relevant decision.
When no convention exists, [ADR format](../../../engineering/domain-modeling/ADR-FORMAT.md) defines when an ADR is warranted and what it contains.
When a decision is superseded, mark its status and link its replacement rather than delete the historical rationale.

## Failure thinking

- For every external dependency, ask what happens when it is down.
- For every write, ask what happens if it happens twice.
- For every async operation, ask what happens if it never completes.

## Output

Report the decision, affected contracts, consequential tradeoffs, and unresolved questions.
Include sequencing, diagrams, or an integration strategy only when they help implement or assess the requested design.
