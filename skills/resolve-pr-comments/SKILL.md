---
name: resolve-pr-comments
description: Assess and resolve human or automated GitHub PR review comments.
---

Assess feedback against the current PR head with the [review rubric](references/review-triage.md).


## Assess and correct

- Fetch the requested feedback and its replies before edits.
  - use `pr-comments` cli tool. if unavailable use `gh` cli to fetch comments.
- Associate each distinct claim with its comment or thread ID and the current head SHA.
- Include summary comments and automated feedback within the requested scope.
- Apply authorized fixes on the branch that owns the defect.
  - If repeated comments hint at an architectural issue, treat it as a sign of a larger problem and investigate. Decide if the issue is worth addressing in this PR or if we should create a separate issue.
  - Decide if issue is worth addressing or if it should be ignored.
    - Make the best decision for UX, DX, and agent workflow improvements.
  - commit and push the fix.
- For stacked PRs, preserve the active stack workflow.
- Report defects outside scope without silently expanding the task.
- Reply with the decision and concrete evidence before thread resolution.
  - For fixes, cite the commit on the PR head.
  - Leave local-only fixes unresolved until publication.
- Keep unanswered questions open.
- Resolve a thread only after every claim has a completed fix or supported dismissal.

If a post has an ambiguous result, fetch the thread before a retry.
If a mutation fails, retain the draft reply and report the failure.
Report comments without resolvable thread IDs separately.

Finish with the addressed claims, open decisions, unpublished fixes, and failed mutations.
Watch for new feedback coming in via CI actions of code review agents with a finite deadline (max 15min) or attempt limit(max 5).
