---
name: git-workflow
description: "Git/GitHub: PRs, commits, branches, worktrees, conflicts, comments, CI, interactive PR review canvas."
---

# Git Workflow

Git/GitHub ops. Safety first. Small explicit commands. No surprise state moves.

## How to apply this skill

Three tiers of authority:

1. **Safety/consent rules** (Global rules below, plus any ask/consent/never rule in a sub-doc): absolute. Never relax.
2. **Repo convention**: beats any format/template in these docs. Check existing history, templates, and settings before applying a default.
3. **Everything else** (naming formats, PR bodies, reply/report templates): defaults and examples. Use judgement; adapt wording and structure to context. Content requirements matter, exact phrasing doesn't.

## Global rules

- Branch changes need consent: create, switch, rebase, merge, delete. Destructive ops need explicit ask: force-delete, force-push, overwrite, history rewrite. These gates hold on their own; an AGENTS.md/CLAUDE.md can add gates, never remove them.
- Inspect first: `git status --short`, then relevant `git diff` / `git log`.
- Stage explicit paths only. Never `git add .` or `git add -A`.
- Auth fails → ask user to run `gh auth login`; don't invent tokens. When multiple accounts logged in, ensure correct account is used, switch if needed.

Each rule above is defined only here; sub-docs reference or remind, never redefine.

## Tooling defaults

- Use `gh` for GitHub. Prefer API/JSON for PR comments/checks.

## Read needed guide

| Task | Read |
| --- | --- |
| Commit, amend, branch, rebase, cleanup | `commits-and-branches.md` |
| Create PR, PR body, reviewability pass, PR-comment loop | `pr-and-comments.md` |
| Merge PR, resolve conflicts, fix CI | `merge-and-ci.md` |
| Parallel/isolated branch work | `worktree-management.md` |
| Changelog setup/update | `add-changelog.md` |
| Interactive HTML PR walkthrough ("review canvas") | `pr-review-canvas.md` |

## Message voice

Applies to commit messages, PR titles/bodies, review comments/replies. Branch naming: `commits-and-branches.md`. Repo convention wins over all of it.

- Lowercase imperative subject/title; active voice; plain concrete words; no filler, hedging, or hype.
- Bodies use complete sentences: no contractions, one topic per sentence, keep sentences short (~20 words). Bullet lists are fine; each bullet is a complete sentence.
- Explain what and why, not how — the diff shows how.
- Idiomatic git terms ("clean up", "roll back", "set up") are fine; jargon the reader must decode is not.

## PR title prefixes

- Default when repo has no convention of its own: `[Feature]`, `[Fix]`, `[Refactor]`, `[Perf]`, `[Docs]`, `[Test]`, `[Build]`, `[BREAKING]`.
- Prefix sets category; wording follows Message voice above.
