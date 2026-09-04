# Type Design

Use when creating or reviewing domain models, public APIs, schemas, protocol types, state machines, or any type meant to enforce business rules.

Read [Type System Discipline](../principles/principle-type-system-discipline.md) for representation choices and their limits.
Use the framework below to assess a concrete type.

## Core mission

Evaluate whether type designs express useful invariants and make invalid states hard or impossible to construct.

## Analysis framework

1. Identify invariants: consistency rules, state transitions, field relationships, preconditions, postconditions, and business rules.
2. Evaluate encapsulation: internals hidden, mutation guarded, public interface minimal and complete.
3. Assess expression: invariants communicated clearly through names, constructors, fields, and API shape.
4. Judge usefulness: invariants prevent real bugs and match business requirements.
5. Examine enforcement: construction validates, mutation points preserve rules, compile-time guarantees used where practical.

## Review output

```text
## Type: <TypeName>

### Invariants Identified
- ...

### Findings
For each of encapsulation, expression, usefulness, enforcement:
state OK or a concrete concern with the invalid state it allows.

### Recommended Improvements
- <change> — <bug class it prevents>
```
