# Foundational Thinking

## Trigger

Several changes depend on a common contract, data representation, integration point, or unresolved prerequisite.

## Decision

Identify the prerequisite that makes dependent work concrete.
Establish the smallest usable version before consumers depend on assumptions about it.
Use [Model the Domain](principle-model-the-domain.md) for the representation itself.
Use [architecture guidance](../architecture/architecture-planning.md) for ownership, interfaces, and dependency direction.

For example, agree the event shape and its owner before separate producers and consumers implement different versions.
A thin end-to-end slice can expose an incorrect foundation sooner than a complete infrastructure layer.
Order units so each resolves a dependency or produces relevant evidence for the next.

## Limit

A foundation needs current consumers or a demonstrated prerequisite.
Do not add a framework, CI system, abstraction layer, or schema for hypothetical future phases.
Do not let a speculative scaffold delay a direct solution.
Preserve the product target under [Experience First](principle-experience-first.md).
