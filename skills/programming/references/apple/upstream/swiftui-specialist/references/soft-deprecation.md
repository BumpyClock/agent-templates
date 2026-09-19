# Soft-deprecated APIs

SwiftUI marks some APIs deprecated with version `100000.0`, suppressing compiler warnings while indicating that new code should prefer a replacement.
Soft deprecation alone does not establish a defect or authorize a migration.

## Identify the API

Search [the API list](soft-deprecated-apis.md) for the symbol in question.
The header records the SDK versions used to generate it. For newer SDKs or an uncertain declaration, check installed headers.
Check the replacement's availability against supported deployment targets.

## Apply within scope

- For new code, prefer the supported replacement when it fits the contract.
- For a requested review or modernization, identify relevant soft-deprecated uses and explain their replacements. Treat working APIs as migration opportunities, not urgent failures solely because of this marker.
- For a feature or bug fix, preserve existing APIs unless changing them directly supports the current work and is justified under the shared cleanup guidance. Do not turn a small edit into a framework migration.
- Do not scan unrelated views for soft deprecations or append a routine offer to migrate them.

For example, adding a search field to `SearchView` does not require migrating an unrelated `HomeView` from `NavigationView`.
Keeping an existing supported API while editing its consumer is not the same as choosing it for new code.
Report a migration decision when it materially affects compatibility, scope, or the requested outcome.
