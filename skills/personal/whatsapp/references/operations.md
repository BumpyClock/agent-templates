# WhatsApp operations

Apply the account and authorization boundaries in the [skill root](../SKILL.md). Select only the operation needed.
These commands are templates. Replace `ACCOUNT` with the authorized named account, `JID` with the verified conversation or recipient, and the other uppercase placeholders with values from the request. Do not run unresolved templates.

## Archive reads

Use the primary archive for stored history. The no-sync option keeps these reads separate from a requested refresh. If the installed CLI cannot honor that option, use a verified read-only alternative or report the limitation rather than silently enabling sync.

```bash
wacrawl --sync never status
wacrawl --sync never doctor
wacrawl --sync never chats --limit 20
wacrawl --sync never unread --limit 20
wacrawl --sync never --json unread --limit 100
wacrawl --sync never messages --after AFTER_DATE --limit 50
wacrawl --sync never messages --chat JID --asc --limit 100
wacrawl --sync never messages --has-media --limit 50
wacrawl --sync never --json search "QUERY"
wacrawl --sync never search "QUERY" --after AFTER_DATE --from-them
```

Use an ISO date from the requested time range for `AFTER_DATE`. Run status or doctor only when readiness is unknown or a failure calls it into question.

## Account inspection

List accounts when selection or store location is unknown:

```bash
WACLI_READONLY=1 wacli accounts list --json
```

Inspect the selected account without connecting. Use only the relevant command, not the whole list.

```bash
wacli --account ACCOUNT doctor --read-only --json
wacli --account ACCOUNT auth status --read-only --json
wacli --account ACCOUNT chats list --read-only --json
wacli --account ACCOUNT messages list --read-only --json --limit 50
wacli --account ACCOUNT messages search --read-only --json "QUERY"
```

Normal multi-account work uses `--account`, not a shared `--store`. Reuse valid authentication evidence; do not reconnect merely to inspect stored messages.

## Sending and attachments

Use the selected account for an explicitly requested send or reply. A request to send from the agent uses `agent`; use `me` only for an explicit request to act on the user's behalf. The examples deliberately do not hard-code either account.

```bash
wacli --account ACCOUNT send text --to JID --message "APPROVED_MESSAGE"
wacli --account ACCOUNT send text --to JID --reply-to MESSAGE_ID --message "APPROVED_REPLY"
```

Downloading media or sending a file requires authorization for that attachment operation. Neither follows automatically from a text-message request.

```bash
wacli --account ACCOUNT media download --chat JID --id MESSAGE_ID
wacli --account ACCOUNT send file --to JID --file APPROVED_FILE --caption "APPROVED_CAPTION"
```

Confirm the recipient and submitted operation from the result. Report an accepted send separately from proof that a person received or read it.

## Refresh and monitoring

A requested one-time refresh is separate from stored-message inspection:

```bash
wacrawl sync
wacli --account ACCOUNT sync --once --events
```

Choose the relevant archive or account command, not both by default.

For explicitly requested monitoring, establish the account, conversation, requested event, and finite deadline first. The command below synchronizes the account and emits account-wide events. Use it only when that account-wide sync is authorized; otherwise use a supported conversation-scoped alternative or report the limitation. Inspect and report only events within the authorized conversation.

```bash
wacli --account ACCOUNT sync --follow --events
```

This command does not enforce the deadline itself. Use a run-owned supervisor or tmux session with an enforced stop at the deadline, and track the exact process or session created. If that bounded lifecycle cannot be enforced, do not start a follower.
Reuse an existing run-owned watcher only when its scope and remaining lifetime match. Stop only the watcher this operation owns on the requested event, cancellation, or deadline. Do not leave a persistent listener after a one-time send or refresh.

## Archive imports and backups

Run imports and backup uploads only when requested for the intended source and destination. An archive search does not authorize either operation.

```bash
wacrawl import --copy-media
wacrawl backup status
wacrawl --sync never backup push
```

The backup push is still an external upload even with `--sync never`; that flag suppresses sync, not the upload.
