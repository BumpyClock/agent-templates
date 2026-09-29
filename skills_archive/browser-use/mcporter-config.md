# mcporter Chrome Config

Use when Chrome DevTools MCP attaches to a blank/isolated browser, cannot see the user's real tabs, or errors around `DevToolsActivePort`.

## Identify the existing configuration

Home config owns the default:

```bash
mcporter config get chrome-devtools --json
```

Check `source.path` to identify the effective configuration. A project `config/mcporter.json` can intentionally override home config. Preserve a valid override; do not rewrite both scopes merely because both exist.

Resolve the user-data directory from the intended running Chrome instance or verified machine-local configuration. If using Chrome's displayed Profile Path, distinguish the profile subdirectory from its containing user-data directory. Do not assume a username, a default location, or a new profile. If the intended directory cannot be identified, stop and report the missing information.

Expected shape when an explicit directory is required:

```json
{
  "command": "npx",
  "args": [
    "-y",
    "chrome-devtools-mcp",
    "--auto-connect",
    "--userDataDir",
    "<VERIFIED_EXISTING_CHROME_USER_DATA_DIR>"
  ]
}
```

Replace the placeholder with the resolved directory in local configuration. It is not a literal path, and JSON does not expand `$HOME`.
Keep machine-specific paths out of shared skill files.

`chrome-devtools` means reattach to existing Chrome. `chrome-isolated` is available only for an explicit user request for a fresh session.

## Verify

```bash
mcporter call chrome-devtools.list_pages --args '{}' --output text
```

Pass: output lists the user's visible tabs.

Fail: output shows only `about:blank`, a single empty tab, or a page set that does not match Chrome.

## Repair the effective entry

Use the verified directory as `CHROME_USER_DATA_DIR`. Repair only the entry that prevents the authorized existing-session workflow, preserving unrelated settings.
Choose the appropriate scope below, not both by default.

For a broken home entry:

```bash
: "${CHROME_USER_DATA_DIR:?Set the verified existing Chrome user-data directory}"
mcporter config add chrome-devtools --scope home --command npx --arg -y --arg chrome-devtools-mcp --arg --auto-connect --arg --userDataDir --arg "$CHROME_USER_DATA_DIR" --description "Chrome DevTools MCP - reattach existing Chrome profile"
```

For a broken project entry identified by `source.path`:

```bash
: "${CHROME_USER_DATA_DIR:?Set the verified existing Chrome user-data directory}"
mcporter config add chrome-devtools --scope project --command npx --arg -y --arg chrome-devtools-mcp --arg --auto-connect --arg --userDataDir --arg "$CHROME_USER_DATA_DIR" --description "Chrome DevTools MCP - reattach existing Chrome profile"
```

Then verify again:

```bash
mcporter call chrome-devtools.list_pages --args '{}' --output text
```

Only when the user explicitly requests an isolated session, configure a separate alias instead of replacing the existing-session entry:

```bash
mcporter config add chrome-isolated --scope home --command npx --arg -y --arg chrome-devtools-mcp --description "Chrome DevTools MCP - isolated browser for explicit fresh-session tests"
```

## Recovery

If `DevToolsActivePort` or connection startup fails:

```bash
mcporter daemon restart
mcporter call chrome-devtools.list_pages --args '{}' --output text
```

Retry once. If still broken, ask the user to restart Chrome or the DevTools bridge. Do not switch to AppleScript, Playwright, Puppeteer, or `chrome-isolated` unless the user explicitly asks for a fresh browser.
Keep the attach-prompt consent and ambiguity rules in [Browser Use](SKILL.md). Configuration repair does not authorize bypassing them.

## Source Notes

mcporter loads config layers from:

- explicit `--config` or `$MCPORTER_CONFIG`
- first existing home config: `~/.mcporter/mcporter.json` or `.jsonc`
- project `config/mcporter.json`

Avoid `/tmp` config files for Chrome. They bypass normal config discovery and make agents copy long commands that are easy to misuse.
