# Plans

Use this route to create or review implementation plans.
A plan request does not require a full codebase audit.

Inspect the relevant source, contracts, and repository commands.
Define the outcome, scope, dependencies, necessary changes, and acceptance evidence.
Include enough context for an executor without the conversation.
State which commands were checked and which remain unrun.

For a durable implementation handoff, adapt [Plan template](plan-template.md).
Use only the sections and gates justified by the task.
Do not require a command after each mechanical step or stop for harmless source drift.
Reassess changed assumptions before execution.

Use the requested destination.
Otherwise, place requested plan files under `plans/`.
Reuse existing plan numbers and record the source commit for drift checks.
Create an index when several plans need dependency or status coordination.
Include baseline metrics only when a requested comparison needs them.

For plan review, inspect the plan against its requirements and current source.
For execution, use [Execution](closing-the-loop.md).
Publish issues only with explicit authorization.
