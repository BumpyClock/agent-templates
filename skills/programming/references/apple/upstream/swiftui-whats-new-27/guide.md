---
name: swiftui-whats-new-27
description: SwiftUI SDK 27 API changes and migration diagnostics.
---
# SwiftUI changes in SDK 27

Use for adoption of a listed API or a diagnostic matching its migration notes.
Follow the [Apple reference constraints](../../guide.md#local-constraints); availability varies by API and platform.
Read the relevant declaration and example before selecting among similarly named overloads.

| Task | Reference |
| --- | --- |
| Reordering in lists, stacks, grids, or custom containers | [Reordering](references/reorderable.md) |
| `AsyncImage` caching, request policies, or custom sessions | [Async images](references/async-image.md) |
| Toolbar overflow, visibility, pinning, or dynamic content | [Toolbars](references/toolbar.md) |
| Alerts or confirmation dialogs driven by an optional item | [Item bindings](references/item-binding.md) |
| Swipe actions outside `List` | [Swipe actions](references/swipe-actions.md) |
| `@State` initialization or synthesized-property diagnostics after migration | [State macro](references/state-macro.md) |
| `@ContentBuilder` overload ambiguity or type-check regressions | [Content builders](references/content-builder.md) |

For the documented `@State` migration errors, consult the state-macro reference rather than assuming that reordering initializer assignments preserves behavior.
