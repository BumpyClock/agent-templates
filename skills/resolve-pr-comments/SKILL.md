---
name: resolve-pr-comments
description: Assess and resolve human or automated GitHub PR review comments, and monitor review and CI when asked to watch or babysit a PR.
---

Assess feedback against the current PR head with the [review rubric](references/review-triage.md).
Review bots are useful but not always right. Verify every finding against the source before changing code.

## Assess and correct

- Fetch the requested feedback and its replies before edits.
  - Use the `pr-comments` CLI. If unavailable, use `gh` to fetch comments.
- Associate each distinct claim with its comment or thread ID and the current head SHA.
- Include summary comments and automated feedback within the requested scope.
- Apply authorized fixes on the branch that owns the defect.
  - If repeated comments suggest an architectural issue, investigate whether the PR needs a correction or the concern belongs in a separate follow-up.
  - Weigh UX, DX, and agent workflow benefits against the user's original goal. Address real shortcomings without letting review feedback expand the PR's scope.
  - Commit and push fixes only when publication is authorized.
- For stacked PRs, preserve the active stack workflow.
- Report defects outside scope without silently expanding the task.
- Reply with the decision and concrete evidence before thread resolution.
  - For fixes, cite the commit on the PR head.
  - Leave local-only fixes unresolved until publication.
  - For false positives or suggestions not worth addressing within the user's goal, give a written reason before resolving the thread.
- Follow available PR-commenting skills or harness guidance for every posted reply.
- Use screenshots or videos when they clarify a finding or fix, with available media-upload skills or tools.
- Keep unanswered questions and unresolved risk open.
- Resolve a thread only after every claim has a completed fix or supported dismissal.

If a post has an ambiguous result, fetch the thread before a retry.
If a mutation fails, retain the draft reply and report the failure.
Report comments without resolvable thread IDs separately.

## Monitor review and CI

After publishing fixes, or when the user asks to watch or babysit a PR:

- Prefer harness PR-monitoring tools so new comments and check results trigger a response. Otherwise, poll the PR for new comments and checks, including review-bot CI actions.
- Track the current head SHA and latest push time. Act only on new checks and comments newer than that push, and verify check results belong to the current head. Refresh this baseline after each push.
- Reassess previously open claims against the current source before resolving them; an older comment is not proof that its concern was fixed.
- Inspect failed check logs. Distinguish repository failures from infrastructure flakes, fix real failures within scope, and retry infrastructure failures only when authorized.
- Watch the PR's target base branch, usually `main`, and rebase when needed and authorized. Preserve the stack workflow and reassess review and CI against the new head.
- If an overlapping PR makes this PR obsolete, stop monitoring and report it. Ask before closing the PR unless closure was explicitly authorized.
- If nothing has changed, stay quiet rather than posting filler comments.
- Stop when review bots have completed successfully on the latest commit, required checks are green on that commit, and no actionable review claims remain.
- Stop at 15 minutes or five monitoring cycles, whichever comes first. Do not reset these limits after a push. If the limit is reached before readiness, report pending checks, feedback, and blockers.

Merge only when the user explicitly requested it. Otherwise, report that the PR is ready only after the completion conditions above are met.

Finish with the addressed claims, open decisions, unpublished fixes, failed mutations, and, if monitoring, PR readiness or remaining blockers.
