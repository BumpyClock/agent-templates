# GPUI

Use this guide for GPUI implementation and diagnosis.
Read only the topic that affects the task.

## Version and library boundary

Use the GPUI revision resolved by `Cargo.lock` and any workspace patches.
The published crate, Zed Git revisions, and GPUI forks can have different APIs.
Check the resolved source when a signature, platform requirement, or example does not match.

GPUI and Longbridge `gpui-component` are separate layers.
Do not assume `crates/ui`, `crates/story`, `cx.theme()`, or component-library traits exist in every GPUI project.
Preserve the application's chosen component library and architecture.

## Topics

- For component structure, use [new components](references/new-component.md).
- For component API conventions, use [style guide](references/style-guide.md).
- For layout and theme behavior, use [layout](references/layout-and-style.md).
- For custom layout or paint phases, use [elements](references/element.md).
- For context selection, use [contexts](references/context.md).
- For persistent state and ownership, use [entities](references/entity.md).
- For task lifetimes and background work, use [async](references/async.md).
- For event delivery and subscriptions, use [events](references/event.md).
- For keyboard commands, use [actions](references/actions.md).
- For focus and keyboard navigation, use [focus](references/focus-handle.md).
- For application-wide state, use [globals](references/global.md).
- For GPUI-specific test support, use [tests](references/test.md).
- For requested component examples, use [stories](references/generate-component-story.md).
- For component documentation, use [documentation](references/generate-component-documentation.md).
- For requested PR text, use [PR descriptions](references/github-pull-request-description.md).

## Sources

- [GPUI source and examples](https://github.com/zed-industries/zed/tree/main/crates/gpui) describe upstream APIs.
- [Published GPUI API](https://docs.rs/gpui/latest/gpui/) describes the published crate, not every Git revision.
- [GPUI Component documentation](https://longbridge.github.io/gpui-component/) applies only to that library.

Use the affected contract to define completion.
Report any platform or runtime checks that remain unavailable.
