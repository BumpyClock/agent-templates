# Model Boundaries

Use these criteria when a refactor changes the owner of presentation state.

## Keep state in the view

Use local state when one view owns its lifetime and transitions.
Avoid a reference model that only duplicates a property wrapper or forwards environment access.
Use `@Query` directly when its SwiftData behavior fits the feature.

## Use a model

Use a presentation model when it owns meaningful state transitions, shared presentation state, or an independent lifetime.
Preserve an existing MVVM architecture that fits the application.
Testability can justify a model when it exposes behavior that otherwise lacks a useful test boundary.

Keep domain operations in domain types or services.
Choose subview extraction to separate UI responsibilities, not as a substitute for model ownership.

## Example: preserve parent-owned selection

Use a binding when an extracted control edits a value that the parent owns.
A second `@State` initialized from that value would create independent storage.

```swift
import SwiftUI

struct FilterSection: View {
    let options: [String]
    @Binding var selection: String

    var body: some View {
        Picker("Filter", selection: $selection) {
            ForEach(options, id: \.self) { option in
                Text(option).tag(option)
            }
        }
    }
}
```

This example assumes unique, stable option strings.
Use a domain identifier when labels can repeat or change.

## SwiftData boundary

An existing `@Query` can remain in a view when the query and model context already express the required lifecycle.
A wrapper that manually fetches and copies the same collection adds another synchronization obligation.
A service or model can still own persistence transactions, cross-screen workflows, and independently testable domain behavior.
Preserve the existing context and save/error policy when a refactor extracts a row or action.

For view-lifetime request examples, read [Async state](../../swiftui-ui-patterns/references/async-state.md).
For owned and injected reference models, read [State examples](../../swift-ui/references/modern-swift.md).

## Refactor scope

Remove a model only when the requested refactor covers that boundary and the replacement preserves state lifetime and behavior.
Do not replace persistence or dependency injection patterns because an example uses another approach.
