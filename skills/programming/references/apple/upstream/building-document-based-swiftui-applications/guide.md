---
name: building-document-based-swiftui-applications
description: Build or migrate SwiftUI document apps using the Document protocol.
---
# SwiftUI document apps

Use for document creation, opening, editing, saving, export, or an authorized migration to the `Document` protocol.
Follow the [Apple reference constraints](../../guide.md#local-constraints) and check the closure signatures and concurrency contracts for the selected API.

For editable document implementations, include undo registration: SwiftUI uses the undo stack to track unsaved changes.
Read-only viewers do not need artificial mutations or undo actions.
Prefer the `Document` protocol for new apps targeting iOS 27, macOS 27, or visionOS 27 and later; preserve supported deployment targets and existing APIs outside migration scope.

| Task | Reference |
| --- | --- |
| New document flows, readers/writers, package files, undo, or progress | [Creating document apps](references/creating-document-apps.md) |
| Migration from `FileDocument` or `ReferenceFileDocument` | [Migrating document apps](references/migrating-document-apps.md) |
| Custom document formats and handler declarations | [Uniform type identifiers](references/uniform-type-identifiers.md) |
