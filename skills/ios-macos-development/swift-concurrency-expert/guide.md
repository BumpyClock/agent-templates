---
name: swift-concurrency-expert
description: Resolve Swift actor isolation, Sendable, and data-race diagnostics.
---

# Swift Concurrency Expert

_Attribution: copied from @Dimillian’s `Dimillian/Skills` (2025-12-31)._

## Overview

Review and fix Swift Concurrency issues in Swift 6.2+ codebases by applying actor isolation, Sendable safety, and modern concurrency patterns with minimal behavior changes.

## Workflow

### 1. Triage the issue

- Capture the exact compiler diagnostics and the offending symbol(s).
- Identify the current actor context (`@MainActor`, `actor`, `nonisolated`) and whether a default actor isolation mode is enabled.
- Check the compiler version, language mode, and `NonisolatedNonsendingByDefault` setting independently.
- Do not enable project-wide concurrency settings to suppress a local diagnostic unless the task includes that migration.
- Confirm whether the code is UI-bound or intended to run off the main actor.

### 2. Apply the smallest safe fix

Prefer edits that preserve existing behavior while satisfying data-race safety.

Common fixes:
- **UI-bound types**: annotate the type or relevant members with `@MainActor`.
- **Protocol conformance on main actor types**: make the conformance isolated (e.g., `extension Foo: @MainActor SomeProtocol`).
- **Global/static state**: protect with `@MainActor` or move into an actor.
- **Expensive work**: use `@concurrent` where supported when execution must leave the caller's actor.
- **Mutable shared state**: use actor isolation or another justified synchronization mechanism. An actor is not a dedicated thread.
- **Sendable errors**: prefer immutable/value types; add `Sendable` conformance only when correct; avoid `@unchecked Sendable` unless you can prove thread safety.


## Reference material

- See `references/swift-6-2-concurrency.md` for Swift 6.2 changes, patterns, and examples.
- See `references/swiftui-concurrency-tour-wwdc.md` for SwiftUI-specific concurrency guidance.
