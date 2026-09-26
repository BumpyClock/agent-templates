---
name: git-and-releases
description: Prepare branches, commits, pull requests, stacked-PR plans, authorized merges, release checklists, or safe worktree and simulator cleanup.
---

# Git and releases

Use this skill for commit or PR preparation, stacked-PR planning, an authorized merge, release preparation, or requested worktree cleanup. Follow repository templates and policies before these defaults. This skill defines conventions, not permission to commit, push, open or merge a PR, publish a release, or delete user state.

## Choose the procedure

- For an authorized PR, read [Opening a PR](references/opening-a-pr.md). For PR feedback or a request to watch CI, use [Resolve PR comments](../resolve-pr-comments/SKILL.md); opening a PR alone does not start monitoring.
- For a multi-phase or stacked-PR plan, read [Stacked PR planning](references/stacked-pr.md). A plan-only request ends with the plan. Continue into implementation when the user's task already authorizes it.
- For requested disk cleanup, read [Worktree and simulator cleanup](references/worktree-and-simulator-cleanup.md) and pause before irreversible deletion.
- For local screenshots or recordings that belong on a GitHub PR, read [Attaching media to a pull request](references/attaching-media.md). Upload only to the intended repository and PR.

## Branches and change descriptions

- Use short, descriptive branch names such as `fix/issue-123` or `feat/session-cache`.
- Use `type(scope): subject` for PR titles and commit subjects. Choose `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, or `perf`; name the affected area in the scope. Write a short, imperative subject without a final period.
- Explain the problem and reason for the change before implementation details. Name concrete behavior, relevant symbols, compatibility changes, and material decisions.
- Use `Why`, `Scope`, `Tradeoffs`, `Blast Radius`, and `Verification` sections when useful, not as a required template. Omit empty sections and boilerplate.
- State relevant validation commands and results, plus material checks omitted and why. Reuse evidence under the [programming validation guidance](../programming/SKILL.md#testing--validation); preparing a commit or PR does not add a test gate.
- Include screenshots or videos for user-visible changes when they substantiate a claim or improve reviewability. Keep commit bodies focused on rationale that the subject and diff do not explain.

## Merges and releases

For authorized merges, follow the repository's merge policy. Do not infer squash, merge-commit, or rebase strategy from the target branch name. If no policy is available and the strategy affects history or a stacked change, ask before merging.

For release preparation, follow the repository's release checklist. Read `docs/RELEASING.md` when present; otherwise, locate the applicable instructions. Create a missing checklist only when necessary for the requested release work. Stop at the requested deliverable without inferring permission to publish or deploy.
