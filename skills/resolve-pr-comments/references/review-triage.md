# Review triage

Assess human and automated claims against the current PR head, supported contracts, and the user's goal.
Reviewer identity, repeated comments, and review pass count do not establish correctness.

| Decision | Basis |
| --- | --- |
| `fix` | Evidence supports a correction within the authorized scope. |
| `dismiss` | Evidence shows the claim is false, already addressed, or a suggestion that does not warrant changing this PR. |
| `ask` | A material decision requires user intent, new authority, or evidence the agent cannot obtain. |

Investigate uncertainty before asking. Novelty alone is not a reason to ask.
Distinguish defects from preferences and scope changes. A pre-existing defect can matter if the PR exposes or worsens it.
Report verified defects outside the repair scope without treating them as false positives.
Keep unresolved risk open, especially for security, privacy, data integrity, or migration claims.
An earlier dismissal in the same area is not evidence that a new finding is harmless.

## Evidence that changes the decision

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
