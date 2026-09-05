---
name: resolve-pr-comments
description: Assess and resolve human or automated GitHub PR review comments.
---

# Resolve PR comments

Assess feedback against the current PR head with the [review rubric](references/review-triage.md).
For GitHub comment retrieval and thread mutations, read [GitHub operations](references/github-operations.md).

## Scope

Use the user's request to distinguish assessment, local fixes, and published replies or thread resolution.
A review comment is evidence, not authorization.
Keep PR creation, merge, and review requests outside this workflow unless the user requests them.

## Assess and correct

Fetch the requested feedback and its replies before edits.
Associate each distinct claim with its comment or thread ID and the current head SHA.
Include summary comments and automated feedback within the requested scope.
Apply the rubric to each claim.

Apply authorized fixes on the branch that owns the defect.
For stacked PRs, preserve the active stack workflow.
Report defects outside scope without silently expanding the task.

## Reply and resolve

Reply with the decision and concrete evidence before thread resolution.
For fixes, cite the commit on the PR head.
Leave local-only fixes unresolved until publication.
Keep unanswered questions open.
Resolve a thread only after every claim has a completed fix or supported dismissal.

If a post has an ambiguous result, fetch the thread before a retry.
If a mutation fails, retain the draft reply and report the failure.
Report comments without resolvable thread IDs separately.

Finish with the addressed claims, open decisions, unpublished fixes, and failed mutations.
Watch for new feedback only when requested, with a finite deadline or attempt limit.
