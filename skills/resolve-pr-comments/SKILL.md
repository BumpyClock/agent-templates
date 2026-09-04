---
name: resolve-pr-comments
description: Use when creating or updating GitHub pull requests, improving PR reviewability, or triaging human or automated review feedback. Classifies feedback as fix, dismiss, or ask, applies approved fixes, and replies before thread resolution.
---

# PRs and comments

Produce reviewable PRs and evidence-based replies. A review comment does not automatically require a code change.

For a review-resolution request, fetch, triage, apply authorized fixes, reply, and confirm thread state.

## Create/update PR

Inspect first: `git log --oneline origin/main..HEAD`, `git diff --stat origin/main...HEAD`, existing `gh pr view`. Why unclear → ask.

Body: repo PR template when one exists (`.github/PULL_REQUEST_TEMPLATE.md` or variants); else these sections:

- **Summary** — first sentence states what changes and why; problem before solution; link the issue.
- **Changes** — grouped by area, not a commit replay; call out anything surprising in the diff.
- **Testing** — exact commands and results; name what was not run and why.
- **Review Notes** — risky files, suggested read order, decisions that need reviewer judgement.

Titles: SKILL.md prefix defaults; repo convention wins; wording follows commit-subject rules. Voice for titles, bodies, comments, replies: SKILL.md "Message voice". Write for the reviewer: front-load conclusions, meaningful headings and link text, state facts without hedging. Breaking change → `[BREAKING]`, `**BREAKING CHANGE:**`, migration steps, affected API.

Create only when user asks: `gh pr create --title "..." --body "..."` (`--draft` ok). Long body → build in a file, `--body-file`.

## Reviewability pass

For tidy-PR / reduce-noise asks:

1. Inspect commits, diff size, paths, generated files, PR body.
2. Flag noise: stale body, unrelated changes, mixed mechanical+logic, missing tests, unclear entry points.
3. Prefer safe edits (body, review notes, grouping, test/risk notes) over history rewrite.
4. Rewrite/rebase/squash/force-push needs plan + user approval. Snapshot `git rev-parse origin/<head>^{tree}` before; verify final diff still matches intended code after. Don't push if tree changed unintentionally.
5. Too large → recommend split; don't polish wrong PR shape.

## Resolve target PR first

"The PR" ambiguous, don't guess ask user if you cannot infer.


## Fetch comments

Quick triage read: `pr-comments [<pr>] [--repo <owner/repo>] [--json] [--all]` — counts + full bodies in one call. Read-only: output lacks the GraphQL thread IDs resolution needs.

Resolution-capable fetch — one GraphQL call returns thread IDs + comments:

```bash
gh api graphql -f query='query($owner:String!,$repo:String!,$pr:Int!){repository(owner:$owner,name:$repo){pullRequest(number:$pr){reviewThreads(first:100){nodes{id isResolved isOutdated path line comments(first:20){nodes{databaseId author{login} createdAt body}}}}}}}' -F owner={o} -F repo={r} -F pr={n}
```

REST fallback — all three endpoints, always `--paginate`:

```bash
gh api repos/{o}/{r}/pulls/{pr}/comments --paginate    # inline review comments
gh api repos/{o}/{r}/issues/{pr}/comments --paginate   # conversation comments
gh api repos/{o}/{r}/pulls/{pr}/reviews --paginate     # review bodies
```

Include human and automated feedback, even when resolved status is absent or ambiguous. Read child replies. Split long summary comments into distinct claims. Record conversation comments and check annotations without thread IDs separately. Fetch annotations with `gh api repos/{o}/{r}/check-runs/{id}/annotations`.

Auth fails → SKILL.md globals. `gh` hangs → network, not auth: run slow calls separately with a timeout; skip non-essential data (labels) rather than block the task.

## Validate and triage

Read `references/review-triage.md` before any review decision. It owns the `fix` / `dismiss` / `ask` rubric and pattern boundaries.

1. Read all fetched feedback before any edit.
2. Record each claim with its thread or comment ID, state, path/line, author, severity, and current PR head SHA.
3. Apply the rubric to each claim against current code and local repo rules. Record the decision and evidence.
4. Report unrelated discoveries separately. Keep fixes within the approved scope.
5. When delegation helps, share the fetched claims, rubric, absolute repo path, and explicit authorization scope. Require evidence for every returned decision.

## Fix

Group `fix` decisions by area and severity. Apply authorized fixes on the branch that owns the code. Add regression tests for behavior changes. Keep `ask` decisions open for user input. Repeated comments alone do not justify code or architecture changes.

## Reply + resolve

Reply FIRST, resolve second. Never resolve a thread without a reply. Can't post → draft replies, leave unresolved, report.

GraphQL preferred — same `PRRT_` thread id drives both mutations:

```bash
gh api graphql -f query='mutation($t:ID!,$b:String!){addPullRequestReviewThreadReply(input:{pullRequestReviewThreadId:$t,body:$b}){comment{url}}}' -F t=<PRRT_id> -f b='<reply>'
gh api graphql -f query='mutation($t:ID!){resolveReviewThread(input:{threadId:$t}){thread{isResolved}}}' -F t=<PRRT_id>
```

REST alternate: `gh api -X POST repos/{o}/{r}/pulls/{pr}/comments/{databaseId}/replies -f body='...'` — keyed on comment id; resolving still needs the GraphQL thread id (extra mapping query). Empty/wrong id → opaque `Could not resolve to a node with the global id of ''`.

Write 2-4 sentences with the decision and evidence. For `fix`, cite the change and commit on the PR head. For local-only fixes, report the pending push and leave the thread open. For `dismiss`, cite the disproof, existing fix, or approved deferral task. For `ask`, state the unresolved question and leave the thread open.

Confirm cited paths and commits exist before any reply. Resolve only when every claim has a completed `fix` or supported `dismiss` decision. Report comments without thread IDs separately. For a follow-up PR for a closed issue, use `Refs #n` instead of `Closes`.

Mutation fails → record failure + draft text, continue with remaining threads, report failures explicitly. Optional summary comment: list fixes AND deliberate rejections.

## Verify, loop, merge

1. Fetch threads again after replies. Confirm each reply and resolution independently. List open `ask` decisions, failed mutations, and other unresolved claims. Claim completion only when no actionable feedback remains.
2. Delegate died or stalled mid-post → re-fetch what actually landed before re-posting anything. Double-post guard.
3. New-comment loop: record `createdAt` baseline; bot reviewer pending → poll `gh pr checks <pr> --json name,bucket,state` filtered to the gates that matter (`gh pr checks` exits 1 on any failure, including unrelated infra); re-fetch filtered `createdAt > baseline`; repeat until nothing actionable.
4. Bot reviewer down (billing/limits) → substitute local adversarial review; tell user.
5. Merge only on user authorization: `gh pr merge <pr> --merge --match-head-commit <sha>` guards the race.
6. Push only when user asks.

Conflicting reviewers: summarize both, tag reviewers, propose middle path only if clear.

## Second opinions

Optional — architecture smells, deeper causes, or user-requested adversarial passes: `codex review`, `coderabbit review --agent`, `agy --model ...`, `pi --model ...` — whichever are installed; parallel independent takes.

## Re-request review

Only after blocking/significant feedback done: `gh pr edit <pr> --add-reviewer <username>`.
