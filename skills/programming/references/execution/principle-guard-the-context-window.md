# Guard the Context Window

## Trigger

Large outputs, repeated reads, or a long task make relevant evidence and decisions hard to retain.

## Decision

Select the information needed for the next decision before retrieval.
Use file ranges, targeted queries, bounded logs, and artifact metadata instead of complete payloads when those observations suffice.
Keep exact errors, source locations, unresolved questions, and links to the original evidence in concise summaries.
Reuse relevant context rather than repeat a read without a changed question or artifact.

For independent work that needs substantial separate context, delegate a bounded question with an acceptance condition.
Retain ownership of the result and inspect evidence that supports consequential claims.
Before a phase transition or context reduction, preserve the contract, current state, evidence locations, and next action.

## Limit

Context management does not justify incomplete coverage or unsupported summaries.
Keep necessary details available even when the summary is short.
Compaction and retrieval can recover space, but summaries can lose distinctions.
Revisit the source when a conclusion depends on those distinctions.
Do not delegate a short lookup merely to avoid a small read.
Keep private captures and unrelated session data outside the task context.
