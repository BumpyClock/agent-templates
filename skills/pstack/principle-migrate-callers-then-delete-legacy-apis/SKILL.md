---
name: principle-migrate-callers-then-delete-legacy-apis
description: "Coordinate caller migration and old-path removal when replacing an internal API, while preserving required external compatibility."
---

# Migrate Callers Then Delete Legacy APIs

## Trigger

An internal API replaces an old API and its consumers can change together.

## Decision

Inventory consumers before retirement, including callers outside the immediate package when the contract permits them.
Migrate those consumers and remove the obsolete path in the same coherent change when feasible.
Remove duplicate implementations after the replacement serves the required contract.
Update tests for the supported contract and remove assertions that only preserve obsolete implementation details.
Use [Test Behavior Not Implementation](../principle-test-behavior-not-implementation/SKILL.md) to distinguish those assertions from compatibility coverage.

## Limit

For required public API, CLI, configuration, or stored-data compatibility, preserve an explicit bridge or use an authorized migration plan.
Name the consumer contract, owner, and removal condition for a temporary bridge.
An absent local caller does not prove that an externally supported API is unused.
For persisted data, replayed requests, or independently upgraded consumers, identify the supported reader and writer combinations before changing the format.
Retain representative historical payloads or fixtures when they establish a compatibility contract that current producers no longer exercise.
Use dual reads, dual writes, aliases, or versioned migration only when the supported rollout requires them.
Do not preserve every historical shape by default.
