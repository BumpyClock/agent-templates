# Separate Before Serializing Shared State

## Trigger

Concurrent actors can modify the same file, key, branch, object, or related state.

## Decision

Determine whether the actors need one canonical mutable object or merely publish independent facts.

- Give independent facts separate owned records when readers can combine them without a consistency violation.
- Preserve one authoritative object when a shared invariant requires it.
- For shared mutation, use structural coordination such as a transaction, single writer, lock, or atomic compare-and-swap.
- Include partial failure and ownership transfer in the coordination contract.

Two workers that update independent fields in one JSON file still share a write target.
Separate status files can remove that contention when no atomic snapshot across the fields is required.
Instructions to take turns do not enforce exclusive access.

## Limit

Separate storage can make a cross-record invariant harder to preserve.
Keep related state together when atomic consistency is part of the contract.

Do not fragment a coherent source file or test suite merely to give each agent a file.
Assign one owner or serialize edits when the artifact should remain coherent.
Use [test quality](../write-tests.md) for suite ownership and coverage decisions.
