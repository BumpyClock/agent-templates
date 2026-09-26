# Multi-phase and stacked-PR planning

Use this guide to divide a change into reviewable units with explicit dependencies and completion evidence.
A plan-only request ends with the plan. Planning within an authorized implementation task does not add a separate approval gate.

## Define the units

State the intended outcome, scope, and material constraints.
Resolve questions from available evidence. Use a bounded prototype when uncertain behavior affects the plan; ask when a choice requires user intent or authority.

Group changes by contracts and dependencies rather than file count.
Each unit should have an observable result and a check that establishes it.
Coordinated edits can belong in one unit when splitting them would create an unusable intermediate state.
Name any deliberately temporary breakage and where it must be resolved.

For each phase or PR, identify its purpose, affected area, dependencies, and verification.
Record significant alternatives, risks, and open decisions when they affect execution.
Use enough detail for an implementer to continue without rediscovering the plan's assumptions.
A short change can have a short plan.

## Preserve stack dependencies

Independent PRs target the repository's base branch. A dependent PR targets its parent branch until that dependency lands.
Plan delivery from dependencies to dependents, with each published unit meeting the repository's acceptance requirements.
Follow [Opening a PR](opening-a-pr.md) for branch and PR mechanics.

When several people or agents work on a stack, make branch ownership and shared-file coordination explicit.
Choose parallel work where it can proceed without competing writers or invalidating another owner's evidence.
Do not prescribe agent counts, model choices, or orchestration tools unless the project requires them.

## Plan verification and handoff

Select checks using the [programming validation guidance](../../programming/SKILL.md#testing--validation).
Use live interaction checks when they establish changed behavior, and performance measurements when performance is part of the contract or risk.
Compare equivalent scenarios when reporting before-and-after measurements.
If the base lacks the feature, verify the new behavior against its own acceptance criteria rather than invent a baseline.

Associate consequential verification results with the revision and base they cover.
After changes to either, reuse evidence whose assumptions still hold and rerun affected checks.
Before reporting merge readiness, confirm required checks, review state, and mergeability for the current head and intended base.

Identify who owns the next action and any unresolved approval or product decision.
Include screenshots or recordings when they help someone assess an interaction.
Follow existing authorization and repository merge policy; the plan grants no additional publication or merge authority.
