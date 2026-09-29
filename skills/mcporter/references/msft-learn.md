# Microsoft Learn

Alias `msft-learn`. Use for official Microsoft and Azure documentation or code examples.

```bash
mcporter call msft-learn.microsoft_docs_search --args '{"query":"Azure Functions managed identity authentication"}' --output json
mcporter call msft-learn.microsoft_docs_fetch --args '{"url":"https://learn.microsoft.com/azure/azure-functions/functions-reference"}' --output json
mcporter call msft-learn.microsoft_code_sample_search --args '{"query":"DefaultAzureCredential Azure Blob Storage","language":"python"}' --output json
```

Search returns up to 10 excerpts, not full articles. Fetch relevant primary pages when details matter.
Use `microsoft_code_sample_search` for implementation examples; the optional `language` narrows results.
Keep source URLs with the resulting guidance. Do not send private code or enterprise content in documentation queries.
