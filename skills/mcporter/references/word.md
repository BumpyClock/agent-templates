# Word

Alias `word`. Read a Word document from its OneDrive or SharePoint sharing URL.

```bash
mcporter call word.GetDocumentContent --args '{"url":"DOCUMENT_SHARING_URL"}' --output json
```

The result includes plain text, comments, filename, size, `driveId`, and `documentId`.
The input must be a sharing URL, not a local path or a document title.
Resolve unknown files through [onedrive](onedrive.md) or [WorkIQ](workiq.md) before reading.

`CreateDocument` requires `fileName`.
`AddComment` requires `driveId`, `documentId`, and `newComment`.
`ReplyToComment` additionally requires `commentId`.
For authorized writes, inspect the exact comment or document schema and use IDs from the read result.
Comments can notify collaborators; reading a document does not authorize posting a comment.
