# Apply findings and maintain plans

Use this reference for requested implementation, plan reconciliation, or issue publication.

## Apply findings or execute a plan

An explicit request to apply findings authorizes their implementation scope.
Use [Programming](../../programming/SKILL.md) for implementation.
A plan file or special command is not required when the conversation already defines the work.

Check whether the cited source and assumptions still apply.
Preserve user edits and unrelated repository state.
Handle focused work directly.
Delegate independent work when separate context or expertise justifies the cost.
Use a worktree when isolation is necessary or the user requests one.

Give a delegate the selected scope, constraints, source paths, and acceptance criteria.
Inspect the resulting artifact and reuse valid validation evidence.
Run additional checks when artifact changes or unresolved risk require them.
Use one independent acceptance review for consequential claims when required.
Add reviewers only for unresolved disagreement or distinct expertise.

Report completed changes, validation, and residual risks.
Stop at a concrete blocker that requires new authority or unavailable evidence.
Do not commit, push, merge, or publish unless the user requests that action.

## Reconcile plans

Compare plan status with current source and available evidence.
Mark a plan complete only when its acceptance criteria hold.
Refresh stale source references without assuming a moved line means a fixed defect.
Report blockers and retire findings that no longer apply.
Reuse existing plan IDs and numbers.

## Publish issues

Publish issues only when the request or an explicit `--issues` flag authorizes them.
Confirm the repository and account before the external write.
Use the existing issue workflow and available labels.
Record each created issue URL in the corresponding plan.
Report failed publication separately from completed local plans.
