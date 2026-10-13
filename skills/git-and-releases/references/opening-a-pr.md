# Opening a PR

Use when PR creation is authorized. Opening a PR is not an automatic final step of every coding task. Follow repository policies and the [skill's authorization boundary](../SKILL.md) first.

**Worktree.** Work from a git worktree off the repository's base branch when useful. Isolate independent writers with separate branches and worktrees. For work on one branch, coordinate file ownership in one worktree and serialize commits and other Git state changes. Refresh shared branches only after preserving uncommitted work. For a dirty branch with unrelated work, preserve it before creating a fresh worktree. Never run `git reset --hard` or discard edits without checking the target and obtaining authorization for data loss.

**Commits.** When authorized to commit, make small, ordered, landable commits. Amend when the fix belongs in a just-made commit; make a new commit when separable. Rebase or rewrite history only when authorized and safe for collaborators.

**Pre-PR cleanup.** Complete these passes over the proposed diff and PR text before opening the PR. Clean code and comments before committing them.

1. Use [Deslop](../../programming/references/refactoring/deslop.md) to remove unnecessary code complexity while preserving the intended behavior.
2. Review comments against the [programming comment policy](../../programming/SKILL.md#code-clarity-and-comments). Remove narration and preserve useful explanations and required documentation.
3. Use [Technical writing](../../pstack/technical-writing/SKILL.md#pr-and-commit-text) to check changed documentation, PR descriptions, and commit text for accuracy, consistent terminology, reviewer context, and evidence.
4. Use [Unslop](../../pstack/unslop/SKILL.md) to remove prose filler and repetition without changing meaning.

Prefer a cheaper capable reviewer for bounded cleanup. One reviewer can perform several passes over the same context; separate passes do not require separate agents. Give delegated work explicit file ownership and the relevant diff, intent, and verification evidence. The coordinating agent inspects the resulting edits and resolves substantive questions, escalating when the reviewer cannot establish correctness.
Reuse completed passes whose scope is unchanged. Recheck only affected areas after edits or unresolved findings, and validate code changes under the shared verification guidance. Finish when the applicable findings are addressed or reported, not after a fixed number of review rounds.

**Titles.** Use Conventional Commits in the form `type(scope): subject`. Use `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, or `perf` as the type. Use the changed area as the scope. Keep the subject short and imperative; name a real symbol when one carries the change. For example, `fix(pstack): retarget opening-a-pr babysit trigger`. Do not add a trailing period.

**Descriptions.** The PR body is a briefing, not the lab notebook. A reviewer who has the diff should learn why the change exists, what is out of scope, and how you proved the change works. If the repository uses the PR body as the squash commit body, keep it concise (about 40 lines or less). Use these sections in order when useful and omit empty ones:

- `## Why`. State the intent and approach in one or two short paragraphs. Do not list SHAs or rebase genealogy.
- `## Scope`. Name real symbols and paths. Name both sides of a rename or retarget; state boundaries when they matter.
- `## Tradeoffs`. Name only rejected alternatives a reviewer would otherwise ask about.
- `## Blast Radius`. Name who or what the change touches and why it is safe or risky. State the continuing cost if the base branch stays red without the fix.
- `## Verification`. Name each real run path and outcome. For a performance change, report one primary number with its unit in `before → after` form and link detailed evidence rather than pasting metric tables.

Attach videos or screenshots when they prove a claim. Do not paste full SHAs, lane recitals, file-by-file checklists, or "CLEAN" verdicts in the body; link detailed artifacts. Do not use `## Summary` or `## Test plan` boilerplate. A commit body does not restate its subject.

**Forge.** Resolve the forge before the first PR operation. For GitHub stacks, use native `gh stack`; this takes precedence over the Origin preference below. Use `gh pr ...` for individual PR metadata, readiness, and checks. For standalone PRs, GitHub CLI (`gh`) is the default. If `command -v origin` succeeds and Origin can resolve the repository, prefer `origin pr ...`; otherwise stay on `gh` and record the fallback. Do not require Graphite (`gt`).

**Size and stacks.** Prefer narrow PRs for separable changes. Branch from trunk for independent work. For dependent GitHub PRs, follow the [native stacked-PR workflow](https://docs.github.com/en/pull-requests/how-tos/stacked-pull-requests). A chain of PR base branches alone is not completion evidence; verify GitHub stack membership and order.

- Check `gh stack --help` before stack operations. If unavailable, report the missing capability and follow applicable installation permissions. Do not silently substitute Origin, Graphite, or manual branch surgery.
- For a new stack, use `gh stack init <first-branch>`, commit the first unit, then `gh stack add <next-branch>` for each dependent unit. For an existing remote stack, use `gh stack checkout <pr-url>`. For existing local branches, inspect their ancestry and adopt them in dependency order with `gh stack init <first-branch> <next-branch>`.
- Publish with `gh stack submit --auto --open` when all affected PRs should be ready. This pushes branches and creates or updates the GitHub stack. Check generated titles and bodies against the guidance above; edit individual PR metadata with `gh pr edit`. For existing unlinked PRs, consult `gh stack link --help` before linking them. Do not recreate PRs merely to register their stack.
- For authorized maintenance, use `gh stack rebase --upstack` after changing a lower layer, then `gh stack push`. Use `gh stack sync` to reconcile after merges. These operations can rewrite and push multiple branches; preserve the existing authorization and branch-ownership boundaries. Do not replace them with per-branch `git rebase`, cherry-pick/reset loops, manual force-pushes, or base-retarget loops. Native stack rebasing is expected when needed; rebasing is not a PR-opening prerequisite.
- Resolve stack rebase conflicts through `gh stack rebase --continue` or `gh stack rebase --abort`. Do not bypass stack state with raw Git recovery commands. Inspect divergence before choosing a recovery; do not delete or rebuild a remote stack as an automatic fallback.
- Finish with `gh stack view --json` and verify remote membership, order, intended bases, and PR status. Recheck affected validation after head or base changes.

See GitHub's [CLI reference](https://docs.github.com/en/pull-requests/reference/stacked-prs-cli-commands) and [stack maintenance guide](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/managing-stacked-pull-requests). Check installed command help before using flags. Stack commands do not expand permission to publish, rewrite shared history, merge, or delete branches.

**Readiness.** Unless the user or repository requests a draft, open PRs ready. With Origin, pass `--status open`; with `gh pr create`, omit `--draft`. With `gh stack submit --auto`, use `--open` for ready PRs; omitting it creates drafts. Because `--open` also marks existing PRs ready, preserve intentional drafts and use per-PR readiness when the stack mixes draft and ready work. Cloud-agent PR tools may default to draft; set `draft: false` when readiness is intended. If a PR still opens as a draft, run `origin pr ready <number>` or `gh pr ready <number>` according to the resolved forge. Run `origin pr view <number>` or `gh pr view <number>` before referring to PR status.

**Babysit.** Opening a PR does not start monitoring. Post the URL and finish the requested phase or stack. For an explicit request to babysit, use [Babysit PR](../../babysit-pr/SKILL.md). Push back when feedback drifts from intent.

A subagent that opens a PR follows the same cleanup procedure and returns its URL and evidence, not a monitoring loop. Do not repeat completed passes solely because another agent takes over.
