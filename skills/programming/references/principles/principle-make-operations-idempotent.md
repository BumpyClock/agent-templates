# Make Operations Idempotent

## Trigger

A command, lifecycle operation, or consumer can repeat after a retry, restart, duplicate delivery, or partial failure.

## Decision

Define the identity of one logical operation and the state that successful completion must produce.
Distinguish a retry of that operation from a new intentional request.

- Reconcile existing state when the contract describes a desired end state.
- Use an operation identifier or deduplication key when repeated delivery must produce one effect.
- Define recovery at failure points between the effect and its completion record.
- Use transactions or atomic state changes when the available storage can preserve the required invariant.
- Observe remote completion when a timeout leaves the outcome unknown.

At startup, adopt compatible live state.
Remove stale artifacts only after an ownership check.
Base cleanup on the artifact's role and relevant content, not creation order alone.
A PID alone does not establish lock ownership across process reuse or hosts.
Refresh inputs for each new scheduler cycle.
Preserve a retried operation's identity and payload.

Select checks for duplicate delivery and relevant interrupted states under [programming guidance](../../SKILL.md).
A restart that appears clean can still hide a duplicated external effect.

## Limit

Not every operation should converge to the same state.
Distinct purchases, increments, and log events can legitimately accumulate.
Preserve those semantics rather than deduplicate requests by equal payload alone.

Local bookkeeping cannot guarantee exactly one effect in a remote system without support from that system.
When safe recovery is unavailable, report the uncertain outcome rather than retry blindly or claim success.
