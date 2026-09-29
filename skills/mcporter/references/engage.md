# Viva Engage

Alias `engage`. Use `search` for topic discovery, even when a community is already known.
Use `get_community_posts` for chronological browsing without a topic filter.

```bash
mcporter call engage.search --args '{"query":"release readiness","first":5}' --output json
mcporter call engage.get_conversation_by_id --args '{"threadId":"THREAD_ID"}' --output json
```

Search returns previews by default. Request `previewTextOnly:false` and `bodyFormat:"PlainText"` when full bodies are needed.
Scope with `communityIds` or `contextCommunityId`; use IDs from returned communities.
Paginate each result category with its returned cursor, such as `afterThreads`.
Preserve community privacy and sensitivity labels when using or quoting results.

Replies, edits, reactions, bookmarks, pinning, and campaigns change account or community state.
Inspect the selected write tool's schema before an authorized action.
For formatted messages, first read `get_message_body_formatting_guidelines`.
