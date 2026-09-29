# Teams

Alias `teams`. Use direct search for precise keywords, senders, and dates.

```bash
mcporter call teams.SearchTeamMessagesQueryParameters --args '{"queryString":"release readiness","from":0,"size":10}' --output json
mcporter call teams.SearchTeamsMessages --args '{"message":"Find discussions about unresolved release readiness decisions"}' --output json
mcporter call teams.ListChatMessages --args '{"chatId":"CHAT_ID"}' --output json
```

`SearchTeamMessagesQueryParameters` uses KQL and accepts at most 25 results per page.
Advance `from` for pagination. Chat-message search does not support `subject:`, `to:`, or `hasAttachment:`.
Use natural-language `SearchTeamsMessages` for exploratory questions and preserve its `conversationId` for follow-ups.
It can return chat IDs for reading full history.

Use `ListChats` to find a chat by name or member, not to search message content.
For channels, use `ListTeams`, then `ListChannels` with `teamId`.
`ListChannelMessages` requires both `teamId` and `channelId`.
Keep chat, channel, team, and message IDs distinct.

Send, reply, edit, delete, membership, and file-sharing tools change shared state.
Inspect the chosen schema and confirm the target before an authorized write.
After a timed-out send, inspect recent messages before retrying.
