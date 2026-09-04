# Model the Domain

## Trigger

Stateful logic, repeated shape assumptions, or related branches obscure a domain invariant.

## Decision

Choose the representation before the dependent logic. Name the valid states, permitted transitions, and dominant access patterns.

- Use a state machine or discriminated union when independent flags permit contradictory states.
- Use a typed model when loose parameters repeat the same shape assumptions.
- Use a table or registry when branches express the same lookup rule.
- Use a reducer or command model when several mutation paths must preserve one transition contract.
- Choose a queue, index, map, or graph when the access pattern justifies it.
- Group code by domain knowledge and ownership rather than execution phases that duplicate the same rules.

A task with `completed: boolean` and `completedAt?: Date` admits inconsistent combinations.
Derive completion from the timestamp, or encode the valid variants explicitly.
Use [Type System Discipline](principle-type-system-discipline.md) when the type can enforce the invariant.

## Limit

Preserve clear local code when a new structure adds indirection without fewer invalid states, duplicate rules, or lifecycle risks.
Similar statements do not necessarily share one domain concept.
Add shared infrastructure only when current consumers or dependencies require it.
Use [architecture guidance](../architecture/architecture-planning.md) for prerequisite and contract decisions.
