# Context selection

| Type | Responsibility |
| --- | --- |
| `App` | Application services, globals, and entity access |
| `Context<T>` | Operations associated with entity `T`, plus application access |
| `Window` | Per-window layout, input, focus, and paint operations |
| `AsyncApp` | Foreground async access to application state |
| `AsyncWindowContext` | Foreground async access associated with a window |

These types are capabilities, not a parent-child ownership hierarchy.
Use the narrowest context that provides the required operation.
Preserve a separate `Window` argument when the API requires one.

Use closure-provided contexts for entity updates.
Do not retain borrowed contexts across an await.
Use the async context supplied by the relevant task API.
Treat closed windows and released entities as possible outcomes of delayed work.

For ownership constraints, use [entities](entity.md).
For receiver-specific task APIs, use [async](async.md).

Source: [GPUI context source](https://github.com/zed-industries/zed/blob/main/crates/gpui/src/app/context.rs).
