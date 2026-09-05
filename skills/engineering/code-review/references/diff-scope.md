# Diff scope

Use explicit user endpoints exactly.
Resolve refs to commit IDs so the report identifies the reviewed revisions.
For invalid refs, report the error rather than substitute another base.

## Branch or PR

Use the PR target or requested base for a merge-base comparison:

```bash
git rev-parse <base> <head>
git diff <base>...<head> --
git log <base>..<head> --oneline
```

For exact endpoints, use `git diff <from> <to> --` instead.
For a single ordinary commit, compare its parent with that commit.
For a merge commit, establish the intended parent or comparison from the request.

## Local changes

For uncommitted changes only, use `HEAD` as the base.
For branch changes plus local work, resolve the merge base of the target branch and `HEAD`.

```bash
git diff <resolved-base> --
git diff --cached --
git ls-files --others --exclude-standard
```

The first diff shows the resulting tracked worktree relative to the base.
The cached diff exposes staged changes that unstaged edits can reverse.
For a staged-only request, review only the cached diff and its staged file contents.
Read relevant untracked files directly without staging them.

Report binary, deleted, inaccessible, or excluded files when they affect coverage.
Check every requested scope before reporting an empty diff.
If the reviewed state changes during review, reassess affected conclusions or identify the earlier snapshot in the report.
