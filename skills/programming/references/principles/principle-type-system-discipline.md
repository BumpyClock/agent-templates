# Type System Discipline

## Trigger

A type permits invalid field combinations, interchangeable identifiers, unhandled variants, or operations with undefined cases.

## Decision

Use the type system to exclude concrete failures at construction or use sites.

- Model alternatives as sum types rather than a collection of optional fields.
- Construct valid values directly when practical. A non-empty collection can contain a head and a remainder.
- Distinguish semantic primitives when accidental interchange would cause a real defect, such as `UserId` and `OrderId`.
- Use exhaustive variant checks so a new variant exposes each incomplete consumer.
- Derive types from an authoritative schema when a maintained generator or language feature supports it.
- Validate external data under [Boundary Discipline](principle-boundary-discipline.md) before the application treats it as a domain value.
- Prefer validation, type refinement, or a better representation to an assertion that only silences the compiler.

For example, `{ kind: 'open' } | { kind: 'done'; at: Date }` excludes a completed task without its timestamp.
A runtime assertion or unexplained null check can identify an invariant that the current type does not express.

## Limit

Strengthen a type when a consumer needs the guarantee, not merely because greater precision is possible.
An empty list has a valid sum of zero, so `sum` does not need a non-empty input type.
A first-element operation may need that guarantee.

Keep plain primitives when interchange is harmless or extra wrappers add more complexity than protection.
At an unavoidable interop boundary, isolate an unsafe assertion and state its precondition.
Types do not replace authorization, runtime resource checks, or invariant preservation after mutation.
