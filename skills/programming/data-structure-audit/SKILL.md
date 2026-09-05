---
name: data-structure-audit
description: Use when the user requests a complete, read-only codebase audit of data structures, state models, algorithms, control flow, or ownership.
---

# Data Structure Audit

Run a read-only, agent-orchestrated audit of the complete codebase. Find material simplifications in data structures, state representation, control flow, algorithms, and ownership.

Do not edit repository files. Do not run tests. Do not implement recommendations. Do not commit or push. Use read-only inspection commands only.

Act as the coordinator. Continue until the coverage contract is complete and independent reviewers validate the final audit.

## 1. Establish the coverage contract

Inspect the repository. Inventory every identifiable subsystem.

Give each subsystem:

- a stable ID and descriptive name;
- an exact, non-overlapping ownership boundary;
- its key implementation files;
- its public interfaces, major call sites, and relevant tests;
- one status: `queued`, `in review`, `recommend`, or `skip`.

Include frontend, backend, shared infrastructure, platform bridges, generated-contract ownership, and test or tooling infrastructure when material.

Maintain one canonical audit report outside the repository. Use it as the coverage contract and include:

- the subsystem inventory;
- confirmed opportunities;
- explicit skip decisions;
- cross-cutting patterns;
- duplicates and superseded findings;
- final priorities and dependencies;
- an audit log.

Do not use broad catch-all rows as proof of coverage.

## 2. Run bounded subsystem reviews

Delegate independent subsystems when separate context or expertise justifies the cost. Otherwise inspect directly. Give each worker an exact ownership boundary.

Limit concurrency to the lanes that you can coordinate. Use one consolidated wait mechanism. Let productive workers finish. Harvest each result before you close its worker.

Give each worker this brief:

> Review the assigned subsystem for at most two material simplifications in its data structures, state representation, control flow, algorithms, or ownership.
>
> Inspect its implementation, public interfaces, major call sites, and existing tests. Stay inside the assigned ownership boundary. Report cross-subsystem concerns without expanding the assigned scope.
>
> Look for:
>
> - scattered booleans or nullable fields that permit invalid combinations and need a state machine or discriminated union;
> - repeated object-shape assumptions that need one shared typed model;
> - duplicated branches that a small map, registry, reducer, or command model can remove;
> - unclear state or behavior ownership that a small module boundary can clarify;
> - repeated scans, transformations, or lookups that need a suitable collection or index;
> - lifecycle, concurrency, or asynchronous states that permit stale or contradictory values.
>
> Prefer clear local code. Do not force an abstraction.
>
> Reject changes that provide only stylistic consistency, hypothetical extensibility, minor line-count reduction, or relocated branching.
>
> Return at most two opportunities. Return `skip` when no opportunity meets the materiality threshold.

Require this schema for every returned opportunity:

- **Verdict:** `recommend` or `skip`.
- **Evidence:** Exact file and line references.
- **Current complexity:** Current complexity or permitted invalid states.
- **Proposed representation:** The proposed representation and why it is simpler.
- **Implementation scope:** The smallest credible scope, affected files, and affected interfaces.
- **Risks:** Regression risks and migration concerns.
- **Validation:** Existing validation and required additional validation.
- **Confidence:** `high`, `medium`, or `low`.

## 3. Validate and synthesize

Validate each finding against the current repository before acceptance. Reuse source reads and evidence from the current audit.

Reject, narrow, or demote a finding when it is vague, duplicated, based on incorrect semantics, or only relocates complexity.

Record each skip as completed coverage. Deduplicate overlapping findings. Assign each accepted recommendation to one authoritative subsystem.

Open bounded review batches until every inventory row has a final `recommend` or `skip` status.

## 4. Audit the audit

Use one bounded independent review to assess:

1. repository coverage and missing subsystem boundaries;
2. duplication and ownership overlap;
3. materiality and over-abstraction;
4. schema completeness;
5. dependency-aware priority order.

Add reviewers only for unresolved disagreement or distinct expertise. Reuse valid evidence rather than repeat completed checks.
If independent review is unavailable, complete direct validation and report the review limit without a false independent-verification claim.

If the coverage pass finds an omission, add a new subsystem row. Audit that row through the same workflow. Do not broaden a completed boundary to hide the omission.

Rank final recommendations by concrete impact, confidence, implementation effort, blast radius, and prerequisites. Identify the best first implementation slices.

## Completion gate

Complete the audit only when:

- every identifiable subsystem has a completed review;
- every subsystem has a recommendation or explicit skip;
- every finding has complete evidence, scope, risk, and validation fields;
- duplicates and weak abstractions are removed;
- priorities and dependencies are internally consistent;
- the audit created no repository changes.

Before the final response, inspect repository status. Report any pre-existing changes separately. Do not claim that this audit caused them.

Return the canonical report. State the coverage result, accepted recommendations, explicit skips, review validation result, and repository status.
