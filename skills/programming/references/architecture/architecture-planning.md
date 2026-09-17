# Architecture planning

Use when module boundaries, contracts, prerequisites, or architectural tradeoffs need a decision.

Use [Foundational Thinking](../principles/principle-foundational-thinking.md) when dependent work needs a shared prerequisite.

## Workflow

1. Inspect the affected boundaries, data flow, and project constraints. Read existing decisions that govern the change rather than map the whole repository.
2. Clarify goals, scope, non-functional requirements, and what must not change.
3. Make significant decisions explicit with options, trade-offs, and consequences.
4. Define contracts before work starts: API shapes, data ownership, events, module boundaries, and dependency direction.
5. Sequence work into prerequisites, core changes, integration, and verification.

## Architecture decisions

Record durable architectural decisions when future changes need their rationale or tradeoffs.
Routine implementation details do not need an ADR; an internal boundary can still warrant one.
Use the repository's ADR location, index, and authoring guide. If establishing a new convention is within scope, default to `docs/adr/` with `docs/adr/README.md` as its index.
Before changing a design governed by an ADR, read the relevant indexed decision.
When a decision is superseded, mark its status and link its replacement rather than delete the historical rationale.

Use the repository's format. The following is a fallback when an ADR is warranted and no template exists; include only meaningful alternatives.

```text
## ADR: <title>
### Status: Proposed
### Context: <problem and tensions>
### Options:
1. <option A> - <pros> / <cons>
2. <option B> - <pros> / <cons>
### Decision: <chosen option and tipping reason>
### Consequences:
- Makes easier: <what this unlocks>
- Makes harder: <what this costs>
- Revisit if: <what would change this decision>
```

## Principles

- Every new service, queue, cache, or database must justify operational cost.
- Start with the simplest design that can work.
- The best architecture is one the team can run.
- Split things that change independently. Combine things that change together.
- Do not choose technology before understanding the problem.
- Do not design for scale the system does not have.

## Failure thinking

- For every external dependency, ask what happens when it is down.
- For every write, ask what happens if it happens twice.
- For every async operation, ask what happens if it never completes.

## Output

Report the decision, affected contracts, consequential tradeoffs, and unresolved questions.
Include sequencing, diagrams, or an integration strategy only when they help implement or assess the requested design.
