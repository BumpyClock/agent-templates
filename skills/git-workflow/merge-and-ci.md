# Merge and CI

Apply the authorization and preservation rules in `SKILL.md`.

## Merge

Establish merge readiness from current PR evidence and repository requirements for checks, reviews, conversations, and branch state. Report unmet requirements before a merge.

Choose the merge method from repository policy and the value of individual commits. For a squash merge, check the final commit message against repository conventions.

Confirm the merge result before you report completion. Treat branch deletion as a separate action under `SKILL.md`, section `Cleanup`.

## Conflicts

Resolve conflicts from the intended behavior of both changes and the current repository context. Ask only when the evidence cannot determine a material choice.

Regenerate lockfiles and generated files with the repository's own tools where appropriate. Inspect the complete resolution for lost changes and conflict markers. Validate the affected behavior with repository checks.

## CI failures

Use check results and logs to identify the cause before a correction or rerun. Distinguish code failures from infrastructure failures and unavailable evidence.

Use the bundled helper when it simplifies failure inspection. Replace `<skill-dir>` with this skill's install directory.

```bash
python3 <skill-dir>/scripts/inspect_pr_checks.py --repo . --pr <number-or-url> --json
```

The helper collects failed checks and available GitHub Actions log excerpts. For direct inspection, use `gh pr checks` and `gh run view`. If run logs are unavailable, job logs may be accessible through `gh api repos/<owner>/<repo>/actions/jobs/<job_id>/logs`.

Validate corrections locally where possible. Retry when a correction, environment change, or evidence of a transient failure justifies another attempt. Continue until relevant CI checks pass or a concrete blocker prevents progress.

Report observed CI status for the current revision, with links and unresolved causes. Distinguish local test results from CI results. Identify checks whose logs or results remain unavailable.
