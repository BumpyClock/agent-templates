# Figma

Alias `figma`. Use for design context, screenshots, node structure, variables, and component mappings.

Extract `fileKey` and `nodeId` from the supplied Figma URL.
For `https://figma.com/design/FILE_KEY/NAME?node-id=123-456`, use that file key and node `123:456`.
Examples contain placeholders; use the actual file key, not the literal `FILE_KEY`.

```bash
mcporter call figma.get_design_context --args '{"fileKey":"FILE_KEY","nodeId":"123:456"}' --output json
mcporter call figma.get_screenshot --args '{"fileKey":"FILE_KEY","nodeId":"123:456"}' --output json
mcporter call figma.get_metadata --args '{"fileKey":"FILE_KEY"}' --output json
mcporter call figma.get_variable_defs --args '{"fileKey":"FILE_KEY","nodeId":"123:456"}' --output json
```

Start with the requested node's design context.
For an oversized selection, inspect metadata and request the relevant child nodes instead.
Use screenshots to understand visual intent. `get_screenshot` defaults to a 1024-pixel maximum dimension.
Its short-lived image URL is the normal output; request inline base64 only when URL fetching is unavailable.
Do not set `forceCode` or `disableCodeConnect` unless the user explicitly requests that behavior.

`get_code_connect_map` reads component mappings for `fileKey` and `nodeId`.
Mapping writes, `use_figma`, and file creation change design assets. Discover their schemas only for an authorized editing task.
