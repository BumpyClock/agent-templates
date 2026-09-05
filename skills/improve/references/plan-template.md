# Handoff Plan Template

Use this template for a durable executor handoff.
Select sections by task risk and executor needs.
Omit empty sections and gates that do not establish a useful contract.

```markdown
# <Requested outcome>

## Context

- Problem and concrete cost.
- Relevant source paths, contracts, and documented decisions.
- Necessary facts from the conversation.
- Source commit and material assumptions.

## Scope

- Authorized behavior changes.
- Compatibility requirements and protected boundaries.
- Explicit exclusions.

## Implementation

1. <Bounded action with relevant paths or symbols.>
2. <Next action, if needed.>

Describe dependencies and consequential decisions.
Allow implementation choices that preserve the requested contract.

## Acceptance

- Observable completion criteria.
- Focused checks with exact commands and expected results.
- Existing coverage and material gaps.
- Commands already checked, unrun commands, and known blockers.

## Reassessment

- Assumptions that could invalidate the approach.
- Decisions that require user input or new authority.
- Explicitly deferred work.
```

## Execution boundaries

Before execution, compare material assumptions with current source.
Harmless line or filename drift does not require a stop.
Revise affected details when the contract remains valid.
Stop when a missing decision, unavailable evidence, or authority boundary prevents safe progress.

Place checks at useful contract boundaries rather than after every mechanical edit.
Investigate failed checks before another attempt.
Do not impose a universal retry count.

Do not commit, push, or publish unless the user authorizes that action.

## Optional plan index

Use an index when several plans need dependency or status coordination.
Preserve existing plan IDs and record reasons for rejected or blocked work.

```markdown
| Plan | Outcome | Depends on | Status |
|------|---------|------------|--------|
| 001  | ...     | —          | TODO   |
```

Update status only when the relevant acceptance evidence supports the change.
Include baseline metrics only for requested comparisons or acceptance criteria that require them.
Use a measured baseline for performance claims.
For behavior-preserving cleanup, select checks for the affected contracts rather than require the complete suite by default.
