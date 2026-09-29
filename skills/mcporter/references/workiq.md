# WorkIQ

Alias `Workiq`, including its capitalization.
Use `retrieve` for evidence across enterprise sources. Use workload-specific tools when the source is already known.

```bash
mcporter call Workiq.retrieve --args '{"query":"Find the release readiness decisions from the last week","strategy":"grounding"}' --output json
```

Use `grounding` for indexed Microsoft 365 content, such as SharePoint, OneDrive, Teams, and Outlook.
Use `copilot`, the default, when sources are unknown or include federated connectors and external enterprise systems.
Ground answers in the returned `markdown` field and retain its source citations and sensitivity labels.
An optional `capabilities` allow-list narrows sources. Inspect its nested schema only when source scoping is needed.

Use `ask` when delegating a question to a Copilot agent rather than retrieving source evidence.

```bash
mcporter call Workiq.ask --args '{"question":"Summarize the release readiness decisions from the last week"}' --output json
```

Continue related `ask` calls with the returned `conversationId`.
`fileUrls` supplies OneDrive or SharePoint context. Provide `timeZone` only when the user's IANA time zone is known.

For entity reads, discover `fetch` and use returned entity URLs rather than inventing paths.
`fetch_blob` accepts a relative WorkIQ `path`, not an absolute URL, and returns base64 for files up to 4 MB.
Entity creation, updates, deletion, actions, and function calls need separate schema inspection and task authorization.
