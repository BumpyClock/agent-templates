# Redesign from First Principles

## Trigger

A new requirement creates repeated exceptions, parallel representations, or coordination across owners that should share one contract.

## Decision

Describe the design that would fit if the requirement had existed from the start.
Compare that target with the current design and its compatibility obligations.
Choose a bounded change that improves ownership or removes invalid states without unnecessary replacement.

For example, a second delivery method may reveal a transport-independent domain contract.
Extract that contract only if it removes real duplication or a repeated special case.
Use [refactoring guidance](../refactoring/clean-refactoring.md) for caller migration and old-path removal.

## Limit

The thought experiment does not authorize a rewrite or expand the task scope.
Preserve requirements that remain valid, including compatibility, performance, and operational constraints.
A local extension can be the right result when the existing design already fits.
Deliver a larger authorized redesign in coherent units under [verification guidance](../verification-before-completion.md).
