---
name: principle-fix-root-causes
description: "Trace a supported defect to its invariant owner instead of adding guards that only conceal invalid state."
---

# Fix Root Causes

## Trigger

A defect has evidence that supports a correction, or repeated symptom fixes leave the failure mechanism unresolved.

## Decision

Trace bad values or transitions to the component that owns their invariant. Correct that mechanism within the task scope.
Validate data where trust changes, then preserve validated invariants through internal contracts.

Search for other instances of the supported failure pattern within the affected scope.
Fix the shared owner when possible instead of adding guards that only conceal invalid state.

For failures after restart, inspect saved configuration, caches, locks, and serialized state before assuming a code regression.
Preserve suspect state before any authorized reset so diagnosis does not destroy the evidence.
If a reset restores behavior, investigate state validation or migration rather than prescribe repeated deletion.

For performance work, use a baseline measurement, profile, or query plan before a correction.
Compare results under relevant conditions. Use bisection when known good and bad states permit a meaningful comparison.
Use [systematic diagnosis](../../programming/systematic-debugging/guide.md) when the cause still needs investigation.

## Limit

When the cause is external or inaccessible, a bounded mitigation can still be useful.
Identify it as a mitigation and state what cause remains unresolved.
If a correction fails, reassess the evidence before another edit and remove changes that no longer have a basis.
Use the affected behavior to assess the correction under [Prove It Works](../principle-prove-it-works/SKILL.md).
