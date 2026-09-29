# Craft

Alias `craft`. Two main tools accept one string argument, `command`.
Use `craft_read` for discovery and reading; use `craft_write` only for authorized changes.

```bash
mcporter call craft.craft_read --args '{"command":"search project notes"}' --output text
mcporter call craft.craft_read --args '{"command":"folders list; documents list"}' --output text
mcporter call craft.craft_read --args '{"command":"documents resolve-link CRAFT_URL"}' --output text
mcporter call craft.craft_read --args '{"command":"blocks get ROOT_BLOCK_ID --format markdown"}' --output text
mcporter call craft.craft_read --args '{"command":"tasks list --scope active"}' --output text
```

Resolve Craft URLs first. The returned `rootBlockId` is not necessarily the URL's document ID.
Independent commands can be batched with semicolons. Do not batch a dependent read before resolving its ID.
Use `--offset` or `--cursor` when the command returns pagination.
For tables, inspect `collections schema --collection COLLECTION_ID` before changing properties.

Example authorized append, after resolving the target:

```bash
mcporter call craft.craft_write --args '{"command":"blocks add --id ROOT_BLOCK_ID --markdown \"New paragraph.\""}' --output text
```

Craft needs actual newline characters in its parsed Markdown argument, not literal backslash-n text.
For reliable multiline input, build JSON with a JSON encoder rather than manually adding escape layers.
`blocks update` replaces the first block and inserts additional blocks when given multiple blocks.
Read the target again after a write. Use inner command help for less common Craft operations:

```bash
mcporter call craft.craft_write --args '{"command":"blocks update --help"}' --output text
```
