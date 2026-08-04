---
name: git-workflow
description: "Git/GitHub: PRs, commits, branches, worktrees, conflicts, comments, CI, interactive PR review canvas."
context: fork
---

# Git Workflow

Git/GitHub ops. Safety first. Small explicit commands. No surprise state moves.

## How to apply this skill

Three tiers of authority:

1. **Safety/consent rules** (Global rules below): absolute. Never relax.
2. **Repo convention**: beats any format/template in these docs. Check existing history, templates, and settings before applying a default.
3. **Everything else** (naming formats, PR bodies, reply/report templates): defaults and examples. Use judgement; adapt wording and structure to context. Content requirements matter, exact phrasing doesn't.

## Global rules

- Safety/consent gates from AGENTS.md are absolute here. In this skill they extend to: branch changes needing consent = create, switch, rebase, merge, delete; destructive also = force-delete, force-push, overwrite.
- Inspect first: `git status --short`, then relevant `git diff` / `git log`.
- Never `git add .` or `git add -A`. Use `committer`: stages explicit paths, rejects `.`.
- Use `gh` for GitHub. Prefer API/JSON for PR comments/checks.
- Ask before resolving binary conflicts or choosing one side blindly.
- Auth fails → ask user to run `gh auth login`; don't invent tokens.

## Read needed guide

| Task | Read |
| --- | --- |
| Commit, amend, branch, rebase, cleanup | `commits-and-branches.md` |
| Create PR, write PR body, improve reviewability, or the full PR-comment loop — fetch, validate, fix, reply, resolve, verify — when user says "resolve pr comments", "address review feedback", or similar. | `pr-and-comments.md` |
| Merge PR, resolve conflicts, fix CI | `merge-and-ci.md` |
| Parallel/isolated branch work | `worktree-management.md` |
| Changelog setup/update | `add-changelog.md` |
| Interactive HTML PR walkthrough ("review canvas") | `pr-review-canvas.md` |

## Quick commands

```bash
# Status
git status --short
git diff
git diff --staged

# Commit explicit paths
committer "fix(scope): concise change" path/to/file.ts

# PR data
gh pr view --json number,title,url,headRefName,baseRefName

# Comments triage (read-only — no thread IDs; reply/resolve mechanics in pr-and-comments.md)
pr-comments [<pr>] [--repo <owner/repo>] [--json] [--all]

# Checks
gh pr checks <pr>
python3 <skill-dir>/scripts/inspect_pr_checks.py --repo . --pr <pr>
# <skill-dir> = this skill's install directory (bundled script), not repo-relative
```

## PR title prefixes

- Default when repo has no convention of its own: `[Feature]`, `[Fix]`, `[Refactor]`, `[Perf]`, `[Docs]`, `[Test]`, `[Build]`, `[BREAKING]`.
- Prefix sets category; wording stays plain. Commit/PR voice: AGENTS.md rules.
