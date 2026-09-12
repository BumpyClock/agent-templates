---
name: speak
description: "Generate a voice note or play an authorized audible notification."
disable-model-invocation: true
---

# Speak

Use `sag` for requested or standing-authorized speech. Match the message and delivery mode to that authorization without reconfirming settled preferences.

## Delivery and content

- For a file-only voice note, use `--no-play` with `--output`. Saving audio does not authorize speaker playback.
- For an audible notification, use playback only when the request or standing preference authorizes it.
- Sending the resulting file to another person or service is a separate action with its own authorization.

Generation transmits text to ElevenLabs. Send only approved notification text. Exclude secrets, repository excerpts, logs, and unrelated private details. A short project label may identify an update; do not upload repository files or full task context to enrich it. If provider use or content is not authorized, report that boundary in text instead of transmitting it.

Read the [CLI reference](references/cli-reference.md) for generation, playback, output formats, and timeout controls.

## Prerequisites

Use configured credentials from the current environment or supported key-file options. `ELEVENLABS_API_KEY` is supported; no particular environment-file location is assumed. Check availability without printing credentials or collecting unrelated configuration.

Read [installation and configuration](references/install.md) only when a required prerequisite is missing. Install tools or configure an account only within authorized setup scope. Otherwise report the missing prerequisite, without claiming audio was generated.

## Completion

Reuse valid configuration rather than repeating setup for each alert. Check the previous attempt's process and output before retrying an uncertain generation or playback, so a retry does not produce duplicate alerts.
Finish after the requested file or playback attempt and report its result. For file output, verify the artifact exists; report truncation or delivery uncertainty when relevant. Playback success does not prove the user heard it.
