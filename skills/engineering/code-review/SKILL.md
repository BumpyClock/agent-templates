---
name: code-review
description: Review committed or uncommitted changes against a fixed point. Use for branch, PR, or work-in-progress reviews.
---

# Code review

Review the requested committed or worktree changes against a user-supplied fixed point. Make no code edits.

Assess two axes and report them separately:

- **Standards** — does the diff follow repo standards and the strict maintainability baseline?
- **Spec** — does the diff implement the originating issue or spec?

Nuclear maintainability guidance applies by default. It is a higher acceptance bar, not a separate mode or a request for more findings. Working behavior and passing tests do not excuse a high-confidence structural regression.

## Inputs

- **Fixed point:** required commit, branch, tag, or revision such as `main` or `HEAD~5`.
- **Focus:** optional Standards lens: `architecture`, `complexity`, `time-complexity`, `duplication`, `dead-code`, `legacy-code`, `tests`, `errors`, `types`, `comments`, `docs`, `deps`, or `all`. Default: `all`.
- **Spec:** optional issue, path, or supplied text.

Focus narrows supplemental Standards lenses only. Always apply documented repo standards, nuclear guidance, and the Fowler smell baseline. Always run complete Spec review.

## Process

### 1. Pin the fixed point

Use the fixed point exactly as the user supplied it. If none exists, ask for one.

Confirm it resolves:

```bash
git rev-parse <fixed-point>
```

Select the endpoints from the requested scope. For a committed branch or PR review, capture:

```bash
git diff <fixed-point>...HEAD
git log <fixed-point>..HEAD --oneline
```

For a work-in-progress review, resolve the merge base and inspect the current worktree:

```bash
base=$(git merge-base <fixed-point> HEAD)
git diff "$base" --
git diff --cached --
git ls-files --others --exclude-standard
```

The first diff includes the resulting staged and unstaged tracked changes since the merge base.
The cached diff identifies staged changes that the worktree may reverse.
Read relevant untracked files directly. Do not stage them to create a diff.
Treat binary and deleted files explicitly in the coverage report.

Use merge-base comparison for branch and worktree scopes. Use a direct commit comparison when the user requests exact endpoints.
Stop for an invalid ref. Report an empty review only after checking every requested scope, including untracked files for WIP.
State the base, endpoints, and excluded files in the report.

### 2. Identify the spec source

Search in this order:

1. Find issue references in commit messages, such as `#123`, `Closes #45`, or GitLab `!67`.
2. Use a spec path or text the user supplied.
3. Search `docs/`, `specs/`, and `.scratch/` for a file that matches branch or feature name.
4. Ask the user when no source exists.

Fetch referenced issues through the workflow in `docs/agents/issue-tracker.md`. If that file is absent, tell the user to run `/setup-matt-pocock-skills`.

If the user confirms that no spec exists, skip the Spec subagent and report `no spec available`.

### 3. Identify Standards sources

Find repo documents that define code standards, such as `AGENTS.md`, `CLAUDE.md`, `CODING_STANDARDS.md`, or `CONTRIBUTING.md`.

Read `references/standards-baseline.md`. Apply its nuclear baseline, approval bar, Fowler smells, selected focus lenses, and deletion-first tags.

Repo standards override a heuristic when they explicitly endorse the questioned pattern. Tool-enforced rules do not need manual review.

Keep findings anchored to changed code. Inspect unchanged neighboring code only to verify ownership, helper reuse, conventions, or failure mode.

### 4. Review both axes

Review a small or tightly coupled diff directly. Delegate separate axes when context size, distinct expertise, or risk justifies the cost.
Use one independent acceptance pass when required. Do not add a fixed reviewer sequence merely because this is a code review.
Give each reviewer the selected endpoints and untracked-file scope, not only the committed diff command.

#### Standards subagent

Give it:

- Full diff command and commit list.
- Standards-source paths.
- Full contents of `references/standards-baseline.md`.
- Selected focus.
- This brief:

> Review only the fixed-point diff. Report each documented-standard violation and each applicable baseline finding. Cite documented rules by file. Name Fowler smells and deletion-first tags where relevant. Distinguish hard violations, blocking nuclear findings, and advisory judgment calls. A repo standard overrides a heuristic when it explicitly endorses the pattern. Skip tool-enforced rules. Require concrete diff evidence and high confidence for blockers. Return `Disposition: approve` when no blocking Standards finding remains. Return `Disposition: needs work` otherwise. For each finding, give changed location, evidence, maintenance cost or failure mode, and smallest safe fix. Keep report under 400 words.

#### Spec subagent

Give it:

- Full diff command and commit list.
- Spec path or fetched contents.
- This brief:

> Report requirements that are missing or partial, behavior not requested by the spec, and requirements whose implementation appears wrong. Quote the spec for each finding. Keep report under 400 words.

### 5. Aggregate without cross-axis ranking

Present reports under these headings:

```markdown
## Standards

Disposition: approve | needs work

[Standards findings]

## Spec

[Spec findings or `no spec available`]
```

Keep the Standards disposition inside the Standards axis. Do not produce a global verdict.

Do not merge or rerank findings across axes. Preserve each report verbatim or clean it lightly.

End with one line that gives finding count and worst issue within each axis. Do not choose one winner across axes.

## Interpretation

A change can pass one axis and fail the other:

- Standards pass, Spec fail: clean code implements the wrong behavior.
- Spec pass, Standards fail: requested behavior introduces an unacceptable structural regression.

Axis separation prevents either result from hiding the other.
