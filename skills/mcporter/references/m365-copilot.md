# Microsoft 365 Copilot

Alias `m365-copilot`. Use for internal questions spanning workloads or when the specific source is unclear.
Prefer `MicrosoftEmail`, `teams`, `onedrive`, or another workload-specific server when the source is known.
Use [WorkIQ](workiq.md) when raw retrieval evidence is needed instead of a synthesized Copilot answer.

```bash
mcporter call m365-copilot.copilot_chat --args '{"message":"Find the decisions and supporting documents for the release review","enableWebSearch":false}' --output json
```

`message` is required. Continue follow-up questions with the returned `conversationId`.
Optional `fileUris` grounds the answer in known SharePoint or OneDrive files.
Keep `enableWebSearch` false for internal research. Use public search tools for public information instead.
Do not treat a synthesized answer as proof of a write or of complete search coverage.
