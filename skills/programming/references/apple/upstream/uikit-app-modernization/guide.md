---
name: uikit-app-modernization
description: Modernize UIKit screen, orientation, scene-lifecycle, or safe-area behavior.
---
# UIKit app modernization

Use for a requested UIKit migration in Swift or Objective-C.
Select the task reference that matches the requested behavior rather than applying every migration to the codebase.

## Core principles

- Resolve display and window information from the consumer's actual context, not global scene or device state.
- Preserve control flow, lifecycle behavior, threading, and supported callers. Do not replace dynamic values with invented constants.
- Include supporting edits needed for the migration: signatures, callers, trait-change observation, configuration, and relevant checks. Scope is defined by the behavior being migrated, not by whether every changed line contained a deprecated symbol.
- Migrate internal callers together when feasible. Retain a deprecated forwarding bridge only for a supported compatibility contract; use the API-specific decision in the selected reference.
- When a migration needs both an API replacement and invalidation of cached values, deliver both in the same coherent change.
- Ask when the correct replacement depends on an unresolved behavior or compatibility decision. A mechanical substitution does not need a separate approval or reviewer.
- Leave a TODO only when it usefully records deferred in-scope work. State the blocker and intended replacement without duplicating an existing annotation.

## Workflow

1. Locate the requested APIs and their affected consumers. Inspect class hierarchy, available context, and whether derived values are cached.
2. Apply the selected reference's replacement and supporting changes within scope. Use small coherent batches when the migration is large.
3. Check the affected behavior and account for remaining occurrences. Dead code, required bridges, already-migrated code, and blocked sites can remain unchanged; report the reason rather than force a diff.

Completion means the requested behavior uses the intended context, supported consumers still work, and unresolved migration limits are explicit.

## Task registry

| Task | Reference |
| --- | --- |
| Replace `UIScreen.main` and related shared-screen assumptions | [Screen context](references/uiscreen-task.md) |
| Replace layout-related orientation checks with size classes or window bounds | [Orientation](references/orientation-task.md) |
| Migrate AppDelegate behavior to SceneDelegate | [Scene lifecycle](references/scene-lifecycle-task.md) |
| Handle dynamic and asymmetric safe areas | [Safe-area insets](references/safe-area-task.md) |
