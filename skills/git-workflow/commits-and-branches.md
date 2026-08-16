# Commits and Branches

Goal: reviewable changes. No surprise pushes, branch moves, hidden staging.

## Before any git write

`git status --short`, `git diff`, `git branch --show-current`. Unexpected delete/rename → stop, ask.

## Stale lock

`fatal: Unable to create '.git/index.lock': File exists` → check no live git process first (`pgrep -fl git`). None running → report, remove only the lock file (`trash .git/index.lock`), retry once. A blocked destructive command is a decision, not an obstacle: never re-route it through another tool (`python os.unlink`, etc.) — surface to user instead.

## Commits

- Check repo style first: `git log --oneline -20`. Repo convention wins; else Conventional Commits (`feat|fix|refactor|build|ci|chore|docs|style|perf|test`), voice per SKILL.md "Message voice".
- Subject: `type(scope): summary` — lowercase, imperative, no trailing period. Aim ~50 chars, hard max 72. Test the part after the colon: "if applied, this commit will <summary>". Lowercase is deliberate: Conventional Commits style, not cbeams rule 3.
- Blank line between subject and body — rebase and format-patch tooling misparse without it. Wrap body at 72.
- Body = what and why, not how: the problem, why this solution, unintuitive consequences. Subject-only is fine for trivial changes; everything else gets a body.
- Breaking → `!` or `BREAKING CHANGE:` footer.
- Stage explicit paths only; prefer `committer "<type>(scope): msg" <paths…>`. Never `git add .` / `-A`. `git add -p` ok for partial.
- Before commit: `git diff --staged`; run relevant tests/checks or state not run.
- Failed hook → fix root cause, stage explicit paths, new commit (not amend).

## Amend policy

Amend only when ALL true: user asked; last commit unpushed; you authored it (`git log -1 --format='%an'`); change belongs to that commit (completion/typo). Never amend pushed, foreign, or merge commits.

## Branches

- Changes need consent: create, switch, rebase, merge, delete.
- Naming: match repo pattern (`git branch -a`); else `<type>/<issue>-<short-desc>`, lowercase, hyphens.
- Update from main: rebase solo branches, merge shared ones. Never rebase shared/pushed branch without explicit history-rewrite consent.
- Push only when asked.

## Cleanup

List candidates first (`git branch --merged main` / `--no-merged main`), ask, delete exact names only. Force-delete (`-D`) and remote delete need explicit ask. `git fetch --prune` ok when useful. No bulk deletion.
