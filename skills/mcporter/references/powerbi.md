# Power BI

Alias `powerbi`. Find the report or semantic model, then inspect its schema before writing DAX.

```bash
mcporter call powerbi.DiscoverArtifacts --args '{"searchQuery":"release dashboard","artifactTypes":["SemanticModel"],"maxResults":5}' --output json
mcporter call powerbi.GetSemanticModelSchema --args '{"artifactId":"ARTIFACT_ID"}' --output json
```

`DiscoverArtifacts` requires nonempty search text. Supported types are `SemanticModel` and `Report`.
For a supplied report URL, use `ResolveReportIdFromUrl` with `url`, then `GetReportMetadata` with `reportObjectId`.
Preserve the returned IDs; do not infer them from display names.
After the initial schema overview, optional `queries` can request up to five JMESPath selections.
Use `ValueSearch` to resolve category values rather than guessing them.

`ExecuteQuery` requires `artifactId` and a `daxQueries` array containing one to four queries.
Each query must contain one `EVALUATE` statement. Use schema-confirmed table, column, and measure names.
Set `maxRows` for bounded output; the default is 250 and server limits still apply.
Explain filters and aggregation with the result. Do not interpret a truncated sample as a complete dataset.
