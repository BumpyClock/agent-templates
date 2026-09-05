---
name: swiftui-view-refactor
description: Refactor SwiftUI view structure, identity, and state ownership.
---

# SwiftUI View Refactor

Preserve behavior, layout, and existing architecture unless the requested refactor changes them.
Use local member-order and file conventions.
Do not require MV, MVVM, or a file split based only on line count.

## Refactor decisions

- Extract a subview when it creates a useful state, dependency, reuse, or update boundary.
- Keep small computed view helpers when a separate type adds no useful boundary.
- Move domain logic to its owner rather than into a new layer solely to shorten `body`.
- Preserve state lifetime across structural changes.
- Use conditional branches for distinct UI states when replacement is intentional.
- Preserve identity when the same conceptual view must retain state.
- Choose initializer inputs, callbacks, or environment dependencies based on ownership.
- Keep optional models when absence represents a real lifecycle state.

SwiftUI associates state with view identity.
An initial value for `@State` does not reset retained state each time the view initializer runs.
Do not assume a new initializer dependency replaces an existing state-owned model.

## References

- For state wrappers and deployment targets, read [UI patterns](../swiftui-ui-patterns/guide.md).
- For a model-versus-view decision, read [Model boundaries](references/mv-patterns.md).
- For identity semantics, use [Demystify SwiftUI](https://developer.apple.com/videos/play/wwdc2021/10022/).
- For model lifetime, use [State documentation](https://developer.apple.com/documentation/swiftui/state).
