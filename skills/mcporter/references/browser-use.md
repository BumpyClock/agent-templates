# Existing Chrome automation

Use `chrome-devtools` for browser tasks against the user's existing Chrome profile.
Reattach to that profile; login, SSO, extensions, and device checks can depend on it.

Never switch to `chrome-isolated`, Playwright, Puppeteer, or the Codex in-app browser unless the user explicitly requests an isolated/new browser.
The same restriction applies to AppleScript, `osascript`, GUI scripting, and macOS `open` for browser control.
The narrowly scoped Peekaboo attachment recovery below is the exception.

## Attach and identify the page

```bash
mcporter call chrome-devtools.list_pages --args '{}' --output text
```

Confirm that the returned pages match the user's real tabs.
If only blank/default pages appear, stop and report failed attachment. Read [Chrome configuration](chrome-config.md) for repair.

Use returned `pageId` values in every page-specific call, even after `select_page`.
The inspected schema requires explicit `pageId`; selecting a page does not replace this argument.

## Common calls

Examples use page `9` and illustrative element IDs. Replace them with IDs from the current session.
Take a snapshot before acting. Use only current `uid` values, and refresh after navigation or significant DOM changes.
These are individual examples, not a script to execute blindly.

```bash
mcporter call chrome-devtools.select_page --args '{"pageId":9}' --output text
mcporter call chrome-devtools.navigate_page --args '{"pageId":9,"url":"https://example.com"}' --output text
mcporter call chrome-devtools.take_snapshot --args '{"pageId":9}' --output text
mcporter call chrome-devtools.click --args '{"pageId":9,"uid":"1_38","includeSnapshot":true}' --output text
mcporter call chrome-devtools.fill --args '{"pageId":9,"uid":"1_13","value":"text","includeSnapshot":true}' --output text
mcporter call chrome-devtools.evaluate_script --args '{"pageId":9,"function":"() => document.title"}' --output json
mcporter call chrome-devtools.take_screenshot --args '{"pageId":9}' --output json
```

Use screenshots when visual layout matters. For rendered UI bugs, verify the affected page in existing Chrome.
Source inspection, `curl`, Worker tests, and isolated browser tests are supporting evidence, not equivalent live UI proof.
If existing Chrome is unavailable, report the verification gap.
Never print secrets from the DOM, inputs, or network logs. Check only presence, length, status, or account identity when needed.

## Attachment consent and recovery

If Chrome shows "Allow remote debugging?", inspect the visible prompt before acting.

Use computer use to click the Allow button.

```bash
PB="${PEEKABOO_BIN:-$HOME/bin/peekaboo}"
[ -x "$PB" ] || PB="$(command -v peekaboo)"
"$PB" permissions status --json
"$PB" see --app frontmost --path /tmp/chrome-attach.png --json --annotate
```

Only for a clearly identified Chrome DevTools/MCP attachment prompt, click its visible Allow button once.
Use coordinates from the current snapshot.

```bash
"$PB" click --coords <allow_x>,<allow_y> --json
mcporter call chrome-devtools.list_pages --args '{}' --output text
```

If the button is invisible or the prompt is ambiguous, stop and ask. Do not switch browser tooling.
For `DevToolsActivePort` or persistent connection failures, follow [Chrome configuration](chrome-config.md).
