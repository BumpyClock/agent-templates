---
name: swiftui-ui-patterns
description: Choose SwiftUI component patterns for navigation, presentation, and view state.
---

# SwiftUI UI Patterns

Use existing component and dependency conventions when they fit the task.
Choose state ownership before the property wrapper.
Do not introduce a global router or replace the app architecture for a local UI change.

## State ownership

| Need | Tool |
| --- | --- |
| View-owned value or supported `@Observable` model | `@State` |
| Child access to parent-owned value state | `@Binding` |
| Injected `@Observable` model | Stored property |
| Bindings to an `@Observable` model | `@Bindable` |
| Shared environment dependency | `@Environment` |
| Owned `ObservableObject` | `@StateObject` |
| Injected `ObservableObject` | `@ObservedObject` |

Observation support begins with iOS 17 and macOS 14.
Existing `ObservableObject` code remains valid on newer systems.
Avoid an unrelated Observation migration.

For model-driven presentation, prefer `.sheet(item:)`.
Use Boolean presentation state when the sheet has no selected model.
Choose callbacks or internal dismissal based on action ownership.

## References

- For component selection, read [Component index](references/components-index.md).
- For a new app shell, read [App dependencies](references/app-wiring.md) as an example, not a required architecture.
- For navigation history, read [NavigationStack](references/navigationstack.md).
- For modal ownership, read [Sheets](references/sheets.md).
- For external URLs, read [Deep links](references/deeplinks.md).
- For cancellation and changing inputs, read [Async state](references/async-state.md).
- For preview fixtures, read [Previews](references/previews.md).
- For scroll-driven secondary content, read [Scroll reveal](references/scroll-reveal.md).
- For identity or update-cost concerns, read [Performance](references/performance.md).

Use [Apple's model data guide](https://developer.apple.com/documentation/swiftui/managing-model-data-in-your-app) for current Observation semantics.
