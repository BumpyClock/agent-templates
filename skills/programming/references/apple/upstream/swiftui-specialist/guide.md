---
name: swiftui-specialist
description: SwiftUI data flow, view structure, localization, and rendering patterns.
---
# SwiftUI patterns

Use the relevant reference when writing or reviewing SwiftUI code.
Follow the [Apple reference constraints](../../guide.md#local-constraints) for scope and SDK verification.

| Decision | Reference |
| --- | --- |
| View decomposition, initialization cost, or single-child `Group` | [Structure](references/structure.md) |
| `@State`, `@Binding`, `@Observable`, or observation granularity | [Data flow](references/dataflow.md) |
| `@Environment`, `@Entry`, unstable defaults, or frequent updates | [Environment](references/environment.md) |
| Conditional modifiers, identity, or `AnyShapeStyle` | [Modifiers](references/modifiers.md) |
| User-facing strings, bundles, formatting, or RTL | [Localization](references/localization.md) |
| Custom `Animatable` types | [Animation](references/animations.md) |
| `ForEach`, `List`, or row identity and structure | [Collections](references/foreach.md) |
| Whether an existing API should be migrated within the task | [Soft-deprecation policy](references/soft-deprecation.md) |
| A specific soft-deprecated API and its replacement | [API lookup](references/soft-deprecated-apis.md) |

For SDK 27 API changes and migration diagnostics, use [SwiftUI changes](../swiftui-whats-new-27/guide.md).
