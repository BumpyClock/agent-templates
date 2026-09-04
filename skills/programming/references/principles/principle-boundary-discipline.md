# Boundary Discipline

## Trigger

External input enters the system, or a framework adapter mixes transport details with domain logic.

## Decision

Validate data where trust changes. Convert raw input into a domain value before internal consumers depend on its guarantees.

- Validate CLI arguments, configuration, network payloads, and stored data against the relevant contract.
- Keep transport and framework representations inside their adapters unless the public contract deliberately exposes them.
- Keep domain transformations independent of framework state where this reduces dependencies.
- Propagate errors to the owner that can recover or report them.
- Remove repeated validation only when an upstream guarantee still holds at the use site.

A validated identifier can pass between internal functions without repeated syntax checks.
Access to the resource can still require a current authorization decision.

## Limit

Internal code is not unconditionally trustworthy.
Mutation, concurrency, stale data, plugins, and unsafe interop can invalidate earlier guarantees.
Preserve invariants at construction and mutation points.
Retain checks for runtime conditions that the type or input parser cannot establish.

Extract a pure function when it clarifies the contract, not to create a wrapper around every framework call.
