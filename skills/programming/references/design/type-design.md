# Type Design

Use when creating or reviewing domain models, public APIs, schemas, protocol types, state machines, or any type meant to enforce business rules.

Read [Type System Discipline](../../../pstack/principle-type-system-discipline/SKILL.md) for representation choices and their limits.
Use the framework below to assess a concrete type.

## Core mission

Evaluate whether type designs express useful invariants and make invalid states hard or impossible to construct.

## Analysis framework

1. Identify invariants: consistency rules, state transitions, field relationships, preconditions, postconditions, and business rules.
2. Evaluate encapsulation: internals hidden, mutation guarded, public interface minimal and complete.
3. Assess expression: invariants communicated clearly through names, constructors, fields, and API shape.
4. Judge usefulness: invariants prevent real bugs and match business requirements.
5. Examine enforcement: construction validates, mutation points preserve rules, compile-time guarantees used where practical.

## Reporting

Report only types with a concern. For each one, name the invalid state it allows, show how code can construct that state, and give the smallest change that prevents it.
Rank findings by the bug they allow, not by the framework step that found them. A type with no concern needs no entry.
