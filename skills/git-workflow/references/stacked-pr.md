# Stacked PRs

## Decide whether to stack

| Condition | Use |
| --- | --- |
| One cohesive change, or splitting leaves a broken intermediate state | One PR. |
| Reviewable changes do not depend on each other | Independent PRs targeting the repository's base branch. |
| Reviewable layers depend on unmerged layers below them | A native GitHub stack, ordered from dependencies to dependents. |
| Branches must live in different forks | Separate PRs. Native stacks require all branches in the same repository. |

Size alone does not justify a stack. Each layer must work against its parent and have a focused reviewable diff.
A plan-only request ends with the decision and proposed layers. Execution requires the [skill's existing authorization](../SKILL.md).

## Create a native GitHub stack

Follow [Opening a PR](opening-a-pr.md) for cleanup, titles, and descriptions.
Run `gh stack --help` first. If unavailable, run `gh extension install github/gh-stack` when installation is authorized, or report the blocker.
Do not substitute Origin, Graphite, or a manual branch chain.

Replace uppercase placeholders with the intended trunk, branch names, file paths, and commit text.
Preserve unrelated edits before switching branches. Start from the intended base, not an unrelated feature branch.

```sh
gh stack init --base TRUNK FIRST_BRANCH
# Implement the first layer.
git add -- FIRST_LAYER_PATHS
git commit -m "feat(SCOPE): FIRST_LAYER_SUBJECT"

gh stack add NEXT_BRANCH
# Implement the dependent layer.
git add -- NEXT_LAYER_PATHS
git commit -m "feat(SCOPE): NEXT_LAYER_SUBJECT"
```

Repeat `gh stack add` from the current top, then implement and commit each additional layer.
When publication is authorized, push the branches and create linked PRs without an interactive editor:

```sh
gh stack submit --auto --open
gh stack view --json
```

`--auto` generates titles. Review titles and bodies, then correct them with `gh pr edit`.
`--open` marks both new and existing PRs ready. Omit it for intentional drafts or mixed-readiness stacks.
Use `gh pr ready PR_NUMBER` for individual readiness changes.
Confirm GitHub stack membership, order, intended bases, and readiness before reporting the PR URLs.
A base-branch chain alone is not a registered GitHub stack.

## Existing work and updates

Inspect branch ancestry before adopting existing branches.

| Situation | Command |
| --- | --- |
| Adopt existing local branches, listed bottom to top | `gh stack init --base TRUNK FIRST_BRANCH NEXT_BRANCH` |
| Resume an existing remote stack | `gh stack checkout PR_URL` |
| Link existing PRs, listed bottom to top | `gh stack link FIRST_PR_URL NEXT_PR_URL`, then `gh stack checkout FIRST_PR_URL` for local tracking |
| Change a lower layer | `gh stack checkout BRANCH`, commit the fix there, then `gh stack rebase --upstack && gh stack push` |
| Reconcile after merges or trunk changes | `gh stack sync` |
| Resolve a stack rebase conflict | Stage the resolved files, then `gh stack rebase --continue`; use `gh stack rebase --abort` to cancel |

Rebase, push, and sync can rewrite and publish multiple branches. Preserve authorization and branch ownership.
Do not replace stack operations with per-branch rebase, cherry-pick/reset, force-push, or base-retarget loops.
Do not bypass stack state with raw Git recovery or automatically recreate a divergent remote stack.
After updates, rerun affected checks and inspect `gh stack view --json`. These commands do not authorize merging.

Sources: GitHub's [creation guide](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-stacked-pull-requests), [CLI reference](https://docs.github.com/en/pull-requests/reference/stacked-prs-cli-commands), and [maintenance guide](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/managing-stacked-pull-requests).
