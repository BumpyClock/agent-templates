# SwiftUI State and Dependencies

Use ownership and lifecycle requirements to select the data model.
SwiftUI does not require one architecture for every app.

## State

Use `@State` for view-owned values or supported Observation models.
Use `@Binding` for access to parent-owned value state.
Use `@Bindable` when a control needs bindings to an injected `@Observable` model.

`@Observable` is a macro, not a property wrapper.
`ObservableObject` is a protocol, not `@ObservableObject`.
Use `@StateObject` for an owned `ObservableObject` and `@ObservedObject` for an injected instance.
Keep these patterns in existing code unless migration is part of the task.

## Dependencies and work

Pass feature-local dependencies through initializers when that makes ownership clear.
Use the environment for dependencies shared across a view hierarchy.
Preserve useful Combine pipelines and UIKit or AppKit integration.

Use `.task` for work tied to view lifetime.
Use `.task(id:)` when input changes should cancel and restart work.
Handle cancellation without presenting it as a user-visible failure.
Neither `async` nor `Task { }` alone guarantees execution outside the main actor.

## Example: owned Observation model and an editor

This example requires iOS 17 or macOS 14.
The parent owns the model lifetime.
The child derives a binding without a second state container.

```swift
import SwiftUI
import Observation

@MainActor
@Observable
final class ProfileDraft {
    var name = ""
}

@MainActor
struct ProfileScreen: View {
    @State private var draft = ProfileDraft()

    var body: some View {
        ProfileEditor(draft: draft)
    }
}

@MainActor
struct ProfileEditor: View {
    @Bindable var draft: ProfileDraft

    var body: some View {
        TextField("Name", text: $draft.name)
    }
}
```

For a hierarchy-wide model, the owner can supply `.environment(draft)` instead.
A descendant can retrieve `@Environment(ProfileDraft.self)` and create a local `@Bindable` value when controls need bindings.
Provide the same environment dependency in previews.
A required type-based environment lookup fails if no ancestor supplies that type.

## State lifetime during a refactor

An initializer-provided `@State` value seeds storage for a view identity.
It does not replace retained state whenever the parent supplies a different initializer argument.
Use an injected model when the parent must replace the reference.
Use an explicit model update when the existing editor must retain unsaved state.
Use `.id(recordID)` only when a record change must reset the subtree, including focus, tasks, and local state.

## References

- [Model data](https://developer.apple.com/documentation/swiftui/managing-model-data-in-your-app)
- [Observation migration](https://developer.apple.com/documentation/swiftui/migrating-from-the-observable-object-protocol-to-the-observable-macro)
- [Async state examples](../../swiftui-ui-patterns/references/async-state.md)
- [Concurrency settings](../../swift-concurrency-expert/guide.md)
