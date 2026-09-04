# Minimize Reader Load

## Trigger

A change requires a reader to trace repeated indirection or reconstruct hidden mutable state.

## Decision

Examine both the path to the answer and the state needed to understand it.

- Collapse a wrapper when it only repeats another contract and hides no useful decision.
- Keep an interface that hides substantial domain knowledge, even when its implementation spans several files.
- Prefer derived values to mutable copies that must remain synchronized.
- Restrict mutable state to the smallest owner that can preserve its invariant.
- Expose the invariant at its owner rather than repeat it in every consumer.

Ask where a value originates and which operations can change it.
A useful simplification reduces the facts a caller must know, not merely the line count.

## Limit

File count, caller count, and trace time are clues, not deletion thresholds.
A one-caller module can isolate a platform dependency, protect an invariant, or preserve a public contract.
Keep that separation when removal would transfer complexity or risk to the caller.
Use [refactoring guidance](../refactoring/clean-refactoring.md) to preserve contracts during a structural change.
