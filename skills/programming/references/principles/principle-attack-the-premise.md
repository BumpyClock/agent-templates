# Attack the premise

## Trigger

Any of these conditions applies:

- Repeated fixes fail the same acceptance check.
- Fixes pass, but each review round finds defects in machinery that the previous fix added.
- A proposed defense targets a failure path that has no reachability evidence.
- Evidence contradicts an assumption behind the requested mechanism.

## Decision

State the required outcome and the assumption shared by candidate fixes.
Choose a bounded observation that could disprove that assumption before another similar fix.
For a defended failure path, trace the producer of the condition from real callers before you add another guard.
Prefer removing the path or narrowing its owner over hardening the guard.

For uneven work or resource use, compare the distribution across actors rather than only the aggregate.
Use existing metrics or a repeatable query under [Build the Lever](principle-build-the-lever.md) when a census is useful.

- Compare affected and unaffected actors across equivalent runs.
- Account for capacity and workload differences before a conclusion about role assignment.
- Trace who assigns a persistent role under [Fix Root Causes](../../systematic-debugging/guide.md#fix-root-causes).
- Remove or rotate the assignment when the shared contract does not require a fixed owner.

For example, a persistent resource imbalance may come from a fixed producer role, not an inadequate cleanup path.
Compare an assignment change with repeated compensation against the original acceptance check.
Use [Redesign from First Principles](principle-redesign-from-first-principles.md) when a new requirement, rather than an unsupported assumption, motivates the change.

## Limit

Repeated failure is a reason to test a premise, not proof that the premise is false.
An unreachable path needs a cited trace, not an assertion. When reachability cannot be established with bounded effort, treat the path as reachable.
An even census does not disprove assumptions about timing, payload size, or causal order.
Keep fixed ownership when ordering, affinity, security, or another contract requires it.
Do not require a census for a failure without actors or distributional imbalance.
An alternative mechanism still needs authorization and must preserve the user's constraints.
