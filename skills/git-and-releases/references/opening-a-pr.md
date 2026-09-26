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

**Forge.** Resolve the forge before the first PR operation and keep that choice for create, edit, view, watch, and merge. GitHub CLI (`gh`) is the default. If `command -v origin` succeeds and Origin can resolve the repository, prefer `origin pr ...`; otherwise stay on `gh` and record the fallback. Do not require Graphite (`gt`).

**Size and stacks.** Prefer narrow PRs for separable changes. A stack is a base-branch chain. The root PR targets trunk; each child branch rebases onto its parent's exact tip and its PR targets the parent branch. Create a child with `origin pr create --status open --base <parent-branch>` or `gh pr create --base <parent-branch>` according to the resolved forge. Retarget an existing child with `origin pr edit <pr> --base <parent-branch>` or `gh pr edit <pr> --base <parent-branch>`. Branch from trunk for independent work. Refresh against trunk before substantial stack work when safe.

**Readiness.** Unless the user or repository requests a draft, open PRs ready. With Origin, pass `--status open`; with `gh`, omit `--draft`. Cloud-agent PR tools may default to draft; set `draft: false` when readiness is intended. If a PR still opens as a draft, run `origin pr ready <number>` or `gh pr ready <number>` according to the resolved forge. Run `origin pr view <number>` or `gh pr view <number>` before referring to PR status.

**Babysit.** Opening a PR does not start monitoring. Post the URL and finish the requested phase or stack. For an explicit request to babysit, use [Resolve PR comments](../../resolve-pr-comments/SKILL.md). Push back when feedback drifts from intent.

A subagent that opens a PR follows the same cleanup procedure and returns its URL and evidence, not a monitoring loop. Do not repeat completed passes solely because another agent takes over.
