# OneDrive

Alias `onedrive`. These tools target the signed-in user's OneDrive, not every accessible SharePoint library.

```bash
mcporter call onedrive.findFileOrFolderInMyDrive --args '{"searchQuery":"release notes"}' --output json
mcporter call onedrive.getFileOrFolderMetadataInMyOnedrive --args '{"fileOrFolderId":"ITEM_ID"}' --output json
mcporter call onedrive.readSmallTextFileFromMyOnedrive --args '{"fileId":"FILE_ID"}' --output json
```

Search accepts a full or partial filename. Use returned IDs instead of deriving them from URLs.
For a known sharing URL, use `getFileOrFolderMetadataByUrl` with `fileOrFolderUrl`.
For Word text and comments, use [word](word.md) with the sharing URL.
For binary content, inspect `readSmallBinaryFileFromMyOnedrive` rather than treating it as a text file.

Rename, delete, and some move tools require an `etag`.
Read fresh metadata and preserve concurrency checks; do not invent or reuse a stale value.
Sharing and sensitivity-label changes alter access or classification and need explicit authorization.
If an operation returns an `operationToken`, inspect it with `checkOperationStatusInMyOnedrive` before reporting completion.
