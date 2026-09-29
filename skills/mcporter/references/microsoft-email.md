# MicrosoftEmail

Alias `MicrosoftEmail`. Schema discovery succeeded on 2026-09-28 with 22 tools.

## Common calls

Use `SearchMessagesQueryParameters` when the request can be expressed as OData filters or KQL.
Use `SearchMessages` when interpretation or relevance ranking is needed.

```bash
mcporter call MicrosoftEmail.SearchMessagesQueryParameters --args '{"queryParameters":"?$filter=isRead eq false&$top=10&$select=id,subject,from,receivedDateTime","preferTextBody":true}' --output json
mcporter call MicrosoftEmail.SearchMessages --args '{"message":"Find messages needing my response from last week"}' --output json
mcporter call MicrosoftEmail.GetMessage --args '{"id":"MESSAGE_ID","bodyPreviewOnly":false}' --output json
mcporter call MicrosoftEmail.GetAttachments --args '{"messageId":"MESSAGE_ID"}' --output json
```

`queryParameters` must start with `?`.
Do not combine `$search` with `$filter`, `$orderby`, or `$skip`.
Use `$search` for recipient matching; recipient collections do not support `$filter`, including `any()` and `all()`.
`body` and `bodyPreview` are not filterable. Combining `$filter` with `$orderby` can fail with `InefficientFilter`; sort locally instead.
When `hasMoreResults` is true, pass the returned `nextLink` URL as `nextLink`; it overrides `queryParameters`.
The argument also accepts the full `@odata.nextLink` URL.
Natural-language search can take 30 seconds and can miss recently indexed messages.
Continue related natural-language searches with their returned `conversationId`.
`GetMessage` uses `id`; attachment tools such as `GetAttachments` use `messageId`.

## Drafts and sending

`CreateDraftMessage` prepares a draft with `subject`, `body`, `contentType`, and recipient arrays `to`, `cc`, and `bcc`.
Use `contentType:"Text"` for plain text. Resolve ambiguous recipients before creating a draft.
`UpdateDraft` and `AddDraftAttachments` use `messageId`; the latter accepts an `attachmentUris` array.
`GetAttachments` lists attachments. `DownloadAttachment` requires both `messageId` and `attachmentId`.

`ReplyToMessage`, `ReplyAllToMessage`, `ReplyWithFullThread`, and `ReplyAllWithFullThread` create drafts by default.
Set `sendImmediately:false` explicitly for draft-only requests; `true` sends immediately.
The full-thread variants preserve quoted history and can include original non-inline attachments.
`SendDraftMessage` uses `id`. It and `SendEmailWithAttachments` send mail; inspect forwarding tools before using them.
Creating a draft does not authorize sending it. Confirm recipients and the intended action before sending.
Do not retry a timed-out send until the mailbox state establishes whether it succeeded.
