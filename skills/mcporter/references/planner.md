# Planner

Alias `planner`. Discover plans before requesting their tasks or goals.

```bash
mcporter call planner.QueryPlans --args '{}' --output json
mcporter call planner.QueryTasksInPlan --args '{"planId":"PLAN_ID","status":"inProgress"}' --output json
mcporter call planner.GetTask --args '{"taskId":"TASK_ID"}' --output json
mcporter call planner.QueryGoalsInPlan --args '{"planId":"PLAN_ID"}' --output json
```

`QueryPlans` returns recently used plans, not a guaranteed complete tenant inventory.
`QueryTasksInPlan` returns up to 400 tasks with summary fields.
Pass a returned `skipToken` to continue. Use `GetTask` for full details.
Supported status filters are `notStarted`, `inProgress`, and `completed`.
`assignedToUserId` requires an Entra object ID; resolve people through [m365-user](m365-user.md).

Create and update tools change plans, tasks, or goals. Read the current object before an authorized update.
Inspect the chosen write schema and verify the stored result afterward.
