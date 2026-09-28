# Review triage

Assess human and automated claims against the current PR head, supported contracts, and the user's goal.
Reviewer identity, repeated comments, and review pass count do not establish correctness.

| Decision | Basis |
| --- | --- |
| `fix` | Evidence supports a correction within the authorized scope. |
| `dismiss` | Evidence shows the claim is false, already addressed, or a suggestion that does not warrant changing this PR. |
| `ask` | A material decision requires user intent, new authority, or evidence the agent cannot obtain, or any change to a user-visible guarantee. |

Investigate uncertainty before asking. Novelty alone is not a reason to ask.
Choose a mechanism within an unchanged guarantee yourself.
Narrowing, broadening, or reinterpreting a guarantee changes it. So does turning a documented known limit into a requirement.
When a subagent reports that a product decision is needed, relay the question to the user. Do not turn the report into a spec.
Distinguish defects from preferences and scope changes. A pre-existing defect can matter if the PR exposes or worsens it.
Report verified defects outside the repair scope without treating them as false positives.
Keep unresolved risk open on a reachable path, especially for security, privacy, data integrity, or migration claims.
A defense for a path that no caller reaches is dead code, not open risk.
An earlier dismissal in the same area is not evidence that a new finding is harmless.

## Evidence that changes the decision

- For an edge-case or failure-path claim, trace the producer of the condition from real callers before you decide. The producer is what raises the error, enqueues the item, or enters the state.
  - Reachable: fix it. Prefer a change that removes the producer over a guard that defends against it.
  - Unreachable: cite the trace. Then dismiss the claim, or delete the dead defense instead of hardening it.
  - Not established with bounded effort: treat the path as reachable. First check whether removing the producer costs less than defending against it.
- Check stale findings against the current implementation. An outdated marker or withdrawn comment is not proof of a fix. For a claimed missing guard, verify that it protects the relevant principal before the side effect.
- Verify usage across the relevant stack before dismissing an unused-code claim. Do not assume a future consumer exists or ignore a public API contract.
- An intentional visual change can explain a changed default. It does not by itself answer accessibility, focus, or keyboard-behavior concerns.
- For manual replacements of native UI behavior, compare input handling, hit-testing, and update timing rather than assuming visual equivalence preserves behavior.
- A framework or type invariant can disprove a warning when it actually enforces the claimed guarantee. Trace timing and state changes when that guarantee could be lost across a boundary.
- Temporary duplication or owner-deferred cleanup can be reasonable. Confirm the scope and removal plan; do not use them to excuse a new regression.
- When a suggested fallback broadens an error condition, check whether it conflates a missing dependency with a failed operation and masks the original error.

For a claim that an existing test fails, run the relevant test on the PR head and inspect the result.
A failure supports the claim only when it fails for the cited reason.
A passing test does not disprove missing coverage or semantic drift. Compare the assertions with the required behavior when coverage is the disputed point.
Reuse applicable evidence instead of repeating a run solely because another reviewer raised the same claim.

Keep project-specific lessons with that project.
Promote a shared rule only when repeated evidence establishes a useful decision boundary, not a catalog of past dismissals.
