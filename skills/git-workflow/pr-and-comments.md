# PRs and Comments

Goal: reviewable PRs, low-noise feedback handling, reply+resolve that survives independent verification.

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

"The PR" ambiguous, or fetched comments don't match what user described → `gh pr list --state open --limit 30 --json number,title,headRefName` before anything else. Wrong-PR mis-targets happen.

Be on the PR branch, up to date, before addressing comments. Current checkout dirty with unrelated work → isolated worktree or temp clone (`git clone --branch <br> --single-branch <url> <tmpdir>`), never manual stash.

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

Bot quirks: always include `claude` / `codex` / `coderabbit` comments even when resolved-status is missing or ambiguous — actionable feedback often sits in child replies. `claude` may leave one long comment instead of threads; treat as one unresolved thread. Failed-check annotations are feedback too: `gh api repos/{o}/{r}/check-runs/{id}/annotations`.

Auth fails → user runs `gh auth login`. `gh` hangs → network, not auth: run slow calls separately with a timeout; skip non-essential data (labels) rather than block the task.

## Validate and triage

1. Read all fetched comments before editing. Normalize: thread id, resolved state, path/line, author, body, severity.
2. Validate each against current code with evidence. Classify `valid` / `invalid` / `needs-info`.
3. Explicit repo rules (CLAUDE.md/AGENTS.md near touched files) beat preference.
4. Skip as false positives: pre-existing issues the PR didn't introduce; linter-catchable nits (unless CI fails); style without repo-rule backing; lines outside the diff; intentional changes already explained in the PR body.
5. Non-comment issues found while scanning: report verified ones, one line each, separate from comment triage; do not fix unasked.
6. Subagents available → parallelize validation when thread count warrants it. Fetch and normalize once; validators reuse that output rather than re-fetching. Every delegated prompt gets absolute repo path + explicit authorization scope — consent does not survive hops implicitly.

## Fix

Group valid comments by area and severity; implement sequentially; tests where behavior changes. Large/risky fix → ask first. Recurring nits → look for architecture smell; real → stop, tell user, propose boundary/owner/contract path.

## Reply + resolve

Reply FIRST, resolve second. Never resolve a thread without a reply. Can't post → draft replies, leave unresolved, report.

GraphQL preferred — same `PRRT_` thread id drives both mutations:

```bash
gh api graphql -f query='mutation($t:ID!,$b:String!){addPullRequestReviewThreadReply(input:{pullRequestReviewThreadId:$t,body:$b}){comment{url}}}' -F t=<PRRT_id> -f b='<reply>'
gh api graphql -f query='mutation($t:ID!){resolveReviewThread(input:{threadId:$t}){thread{isResolved}}}' -F t=<PRRT_id>
```

REST alternate: `gh api -X POST repos/{o}/{r}/pulls/{pr}/comments/{databaseId}/replies -f body='...'` — keyed on comment id; resolving still needs the GraphQL thread id (extra mapping query). Empty/wrong id → opaque `Could not resolve to a node with the global id of ''`.

Reply content: verdict + evidence, 2–4 sentences. Fixed → what changed + commit hash; verify cited refs/paths resolve before posting. Invalid → why, with current-code evidence. Needs-info → targeted question. Already addressed elsewhere → short reply pointing at the mechanism, then resolve. Deferred → name the tracking task. Follow-up PR for a closed issue → `Refs #n`, never `Closes`.

Mutation fails → record failure + draft text, continue with remaining threads, report failures explicitly. Optional summary comment: list fixes AND deliberate rejections.

## Verify, loop, merge

1. After posting: one fresh query re-fetches threads, asserts every reply landed and unresolved count is 0 (or lists leftovers). Never trust a delegate's own count.
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
