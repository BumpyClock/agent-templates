# Exa search

Alias `exa-search`. Use for public web research, not private repository or enterprise content.

```bash
mcporter call exa-search.web_search_exa --args '{"query":"Official documentation for MCP transport types","objective":"Find primary documentation describing supported transports and their constraints.","numResults":5}' --output json
mcporter call exa-search.web_fetch_exa --args '{"urls":["https://modelcontextprotocol.io/docs/learn/architecture"],"maxCharacters":6000}' --output json
```

`web_search_exa` requires both `query` and `objective`. Describe the desired page and the facts to extract.
`numResults` defaults to 10. Use a smaller result set for focused lookups.
`web_fetch_exa` accepts an array of URLs. Batch relevant pages; `maxCharacters` limits content per page.
Fetch primary pages when search excerpts are insufficient, and preserve source URLs for citations.

For substantial multi-step research, `agent_run` accepts `query`, optional `outputSchema`, and optional `effort`.
A running response returns `runId`. Continue with that ID instead of starting a duplicate run.
Pass `query` or `runId`, not both. Discover this tool's schema only when that research path is needed.
