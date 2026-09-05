# Review triage

Assess each claim against the current PR head and repository requirements.
Reviewer identity and repeated comments do not establish correctness.

| Decision | Basis |
| --- | --- |
| `fix` | Evidence supports a correction within the user's authorized scope. |
| `dismiss` | Evidence shows the claim is false, already addressed, or explicitly deferred by the owner. |
| `ask` | A material decision requires user intent, new authority, or evidence that the agent cannot obtain. |

Investigate uncertainty before you ask the user.
Distinguish a verified defect from a preference or a proposed scope change.
A pre-existing defect can still matter if the PR exposes or worsens it.

Support each decision with applicable code, a contract, a test result, or a commit.
Reuse valid evidence for the same revision and behavior.
For stale claims, check whether the exact concern still applies.
An outdated comment marker alone does not establish a fix.

Preserve authorization and independent acceptance requirements for high-risk changes.
An owner's preference does not disprove a security or data-loss defect.
Report an approved deferral as a valid issue with a follow-up task, not a false positive.
Keep unresolved risk open.

For stacked PRs, identify the lowest unmerged PR that owns the defect.
If that PR has merged, respect the active workflow's scope for a separate fix.
Never rewrite merged history to address a review comment.

## Record reusable patterns

Keep repository-specific lessons with that repository.
Propose a shared rule only when repeated evidence establishes a useful decision boundary.
Do not turn individual dismissals into a catalog of universal exceptions.
