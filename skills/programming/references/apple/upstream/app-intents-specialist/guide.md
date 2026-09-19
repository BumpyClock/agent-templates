---
name: app-intents-specialist
description: App Intents execution, entities, queries, parameters, and compatibility.
---
# App Intents patterns

Use for App Intents implementation or review.
Follow the [Apple reference constraints](../../guide.md#local-constraints).
For version-specific APIs introduced in iOS 26 or 27, use [App Intents changes](../app-intents-whats-new-27/guide.md).

## Compatibility

Saved shortcuts and donations depend on intent type names, stable `AppEntity.id` values, and `AppEnum` raw values.
App Shortcut phrases are a separate spoken-invocation contract; changing a phrase need not change the underlying saved intent.
Do not silently rename or remove shipped identifiers or phrases. Preserve the supported contract or use an authorized migration.

## References

| Decision | Reference |
| --- | --- |
| `perform()`, actor isolation, retries, or irreversible effects | [Execution model](references/execution-model.md) |
| Entity identity, hydration, search, or enumeration | [Entities and queries](references/entities-and-queries.md) |
| Property predicates, sorting, and query execution | [Property queries](references/entity-property-queries.md) |
| Persisted enum values and display representations | [App enums](references/app-enum.md) |
| Value requests, missing parameters, or disambiguation | [Parameters](references/parameters.md) |
| Shortcuts editor visibility and conditional summaries | [Parameter summaries](references/parameter-summaries.md) |
| `@Dependency` placement, registration, and isolation | [Dependencies](references/dependencies.md) |
| Result factories and user-visible errors | [Results and errors](references/results-and-errors.md) |
| Donating in-app actions | [Donation](references/donation.md) |
| Localizable strings and interpolation | [Localization](references/localization.md) |
| App Shortcut metadata and phrases | [Shortcut phrases](references/app-shortcut-phrases.md) |
| Intent boundaries, enums, entities, or free-form parameters | [Factoring](references/factoring.md) |
| Opening entities and stable URL mappings | [URL representation](references/url-representation.md) |
| Widget and control configuration intents | [Configuration intents](references/configuration-intents.md) |
