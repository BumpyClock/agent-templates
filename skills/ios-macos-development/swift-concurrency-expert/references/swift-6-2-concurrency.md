# Swift 6.2 Concurrency Decisions

Swift compiler version, language mode, default actor isolation, and upcoming feature flags are separate inputs.
Check the target's actual settings before applying a concurrency example.
Swift 6.2 support does not mean every target enables the same behavior.

## Async execution

With `NonisolatedNonsendingByDefault`, nonisolated async functions retain the caller's actor.
Without that feature, the earlier generic-executor behavior applies.
An explicit `nonisolated(nonsending)` async function retains the caller's actor.
An `@concurrent` async function executes outside the caller's actor.

```swift
nonisolated struct PhotoProcessor {
    @concurrent
    func process(data: Data) async -> ProcessedPhoto? {
        // Perform CPU-intensive work here.
    }
}
```

This schematic example requires a real implementation and a safe transfer contract for its inputs and result.
Use `@concurrent` for the expensive operation, not as a blanket annotation.
Preserve cancellation and error propagation.
Do not assume `Task { }` moves work outside its inherited actor.

## Isolated conformances

An isolated conformance can satisfy a protocol while restricting conformance use to the specified actor.

```swift
protocol Exportable {
    func export()
}

extension StickerModel: @MainActor Exportable {
    func export() {
        photoProcessor.exportAsPNG()
    }
}
```

Check callers before changing conformance isolation.
The conformance cannot serve a caller that requires nonisolated use.

## Shared state

Use `@MainActor` for UI-owned mutable state.
Choose another actor or synchronization mechanism for state with different access requirements.
Do not use `@unchecked Sendable` unless a documented synchronization or immutability contract supports it.

Default main-actor isolation is a target-level design choice.
It does not eliminate cancellation bugs, reentrancy hazards, or deadlocks.
Review invariants that span an `await`, even when the compiler accepts the code.

## Example: protect state and isolate expensive work

This Swift 6.2 example separates a UI-owned cache from a stateless CPU operation.
The explicit annotations do not depend on default actor isolation.

```swift
@MainActor
final class NumberStore {
    private var cache: [String: [Int]] = [:]

    func sortedValues(_ values: [Int], for key: String) async throws -> [Int] {
        if let cached = cache[key] { return cached }
        let result = try await Self.sort(values)
        try Task.checkCancellation()
        cache[key] = result
        return result
    }

    @concurrent
    private static func sort(_ values: [Int]) async throws -> [Int] {
        try Task.checkCancellation()
        let result = values.sorted()
        try Task.checkCancellation()
        return result
    }
}
```

The key must identify immutable input content.
Two callers can miss the cache before either resumes from `await`.
This example permits duplicate work, but it does not deduplicate requests or bound cache size.
Add those policies only when the feature requires them.
Cancellation checks bracket the synchronous sort, but cannot interrupt it mid-operation.

## Diagnostic boundaries

| Symptom | Relevant distinction |
| --- | --- |
| A non-`Sendable` argument causes a data-race diagnostic | Identify the actor boundary and feature flags before changing annotations. |
| UI freezes inside `Task { }` | The task can inherit main-actor isolation. Inspect its synchronous CPU work. |
| Mutable `static let shared` instance fails concurrency checks | `let` protects the reference, not the object's mutable properties. |
| Protocol conformance fails outside the main actor | An isolated conformance cannot fulfill a nonisolated caller's contract. |
| An old request replaces a newer result | Actor isolation prevents simultaneous access, not stale writes after suspension. |

Use [async state examples](../../swiftui-ui-patterns/references/async-state.md) for cancellation before UI publication.

## Primary sources

- [SE-0461: Async function isolation](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0461-async-function-isolation.md)
- [Swift concurrency migration](https://www.swift.org/migration/documentation/swift-6-concurrency-migration-guide/)
- [SE-0470: Isolated conformances](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0470-isolated-conformances.md)
