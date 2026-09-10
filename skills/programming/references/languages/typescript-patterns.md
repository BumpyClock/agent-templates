# TypeScript Patterns

Use these examples for domain types and external input contracts.
Match existing repository conventions before introducing a new type pattern.
Use [Type System Discipline](../principles/principle-type-system-discipline.md) for the design decision.

## Distinct identifiers

Use branded identifiers when accidental interchange has a concrete cost.
Validate untrusted values before a brand assertion.

```ts
type AgentId = string & { readonly __brand: "AgentId" };

function parseAgentId(input: string): AgentId {
  if (!isUUID(input)) throw new Error(`Invalid agent id: ${input}`);
  return input as AgentId;
}
```

This example assumes the project supplies `isUUID`.
A type assertion does not perform runtime validation.

## State variants

Use a discriminated union when fields depend on a state variant.

```ts
type DiffState =
  | { kind: "loading" }
  | { kind: "ready"; diff: GitDiff }
  | { kind: "error"; error: string };
```

This example assumes the project supplies `GitDiff`.
Preserve its established discriminant name.

Use an exhaustive branch when a new variant must expose incomplete consumers.

```ts
function statusLabel(state: DiffState): string {
  switch (state.kind) {
    case "loading":
      return "Loading";
    case "ready":
      return "Ready";
    case "error":
      return state.error;
    default: {
      const exhaustive: never = state;
      return exhaustive;
    }
  }
}
```

## Empty inputs

Keep ordinary arrays when empty input has a valid result.
Use a non-empty tuple when the caller must establish that precondition.

```ts
type NonEmpty<T> = [T, ...T[]];

function first<T>(items: NonEmpty<T>): T {
  return items[0];
}
```

A result of `T | undefined` is another valid contract when absence is expected.
Types do not protect unvalidated external data or uncontrolled mutation.

## Schema-owned types

When the repository has a runtime schema library, derive types from the schema that validates the input.

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(["admin", "member"]),
});

type User = z.infer<typeof UserSchema>;

function parseUser(input: unknown): User {
  return UserSchema.parse(input);
}
```

Use the project's existing equivalent rather than add a dependency for this example.
Use the schema's non-throwing result when invalid input is an expected branch.
Derive consumer views from generated protocol types with `Pick`, `Omit`, or indexed access instead of duplicate interfaces.
Treat `satisfies` as a compile-time compatibility check, not runtime validation.
Use assertions only where the claimed invariant has evidence that the compiler cannot express.

## Boundary types

Accept untrusted payloads as `unknown` and parse them into a named domain type.
Keep `Record<string, unknown>` inside the parser rather than pass it to domain consumers.
Aliases and inline index signatures do not change that boundary.
Use a dictionary in domain logic only when arbitrary keys are part of the actual contract.

Prefer discriminant checks, `in`, and `typeof` or `instanceof` when those checks establish the required type.
A custom type guard must verify every guarantee in its predicate.
An assertion or guard signature alone does not establish those guarantees.

Preserve a protocol's unknown-field policy rather than reject or ignore extra fields indiscriminately.
For persisted JSON, define version handling and report parse failures through the existing error path.
Do not convert corrupt state into a silent success-shaped default.

Use [Boundary Discipline](../principles/principle-boundary-discipline.md) for input and mutation guarantees.
