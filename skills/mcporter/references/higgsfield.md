# Higgsfield

Alias `higgsfield`. Use for media generation and editing, brand assets, product visuals, websites, apps, and games.
Tool names and examples below were checked against live MCP schemas on 2026-10-08; no generation jobs were submitted.

## Workflow guides

Read only the guide that matches the requested output, then its relevant supporting references.
These are ordinary reference bundles, not invokable skills. References to `higgsfield-*` names mean the guides below.
Retained frontmatter and `agents/` files are source metadata, not invocation instructions or tool authorization.

| Task | Guide |
| --- | --- |
| General images, videos, 3D assets, audio, ads, or video virality analysis | [higgsfield-generate](higgsfield/higgsfield-generate/README.md) |
| Visual identity, logos, palettes, typography, packaging, signage, merchandise, or brandbooks | [higgsfield-brandkit](higgsfield/higgsfield-brandkit/README.md) |
| Product photography, lifestyle visuals, hero banners, carousels, or virtual try-on | [higgsfield-product-photoshoot](higgsfield/higgsfield-product-photoshoot/README.md) |
| Marketplace listing images, product cards, or A+ content | [higgsfield-marketplace-cards](higgsfield/higgsfield-marketplace-cards/README.md) |
| Train a face-consistent Soul Character | [higgsfield-soul-id](higgsfield/higgsfield-soul-id/README.md) |
| Complete narrated explainers or animated stories | [higgsfield-video-explainer](higgsfield/higgsfield-video-explainer/README.md) |
| Websites, apps, playable games, or game assets | [higgsfield-websites](higgsfield/higgsfield-websites/README.md) |
| YouTube thumbnails, Shorts covers, or Instagram video covers | [higgsfield-youtube-thumbnail](higgsfield/higgsfield-youtube-thumbnail/README.md) |

The guides document the native `higgsfield` CLI. Do not pass CLI flags directly to MCP tools.
For MCP operations, use the verified calls below or inspect the specific tool schema before translating a workflow.
Resolve bundled `references/` and `scripts/` paths relative to the selected guide's directory, not the mcporter root.
For Brandkit commands, set `SKILL_ROOT` to the directory containing its `README.md`.

## MCP discovery

For a named recipe or setup slash, call `get_preset_instructions` before uploads or other workflow actions.
For a model request, use `models_explore` to resolve the model and inspect its input contract.

```bash
mcporter call higgsfield.get_preset_instructions --args '{"preset":"PRESET_NAME"}' --output json
mcporter call higgsfield.models_explore --args '{"action":"recommend","query":"Text-only product video","type":"video","input":"text","limit":5}' --output json
mcporter call higgsfield.models_explore --args '{"action":"get","model_id":"MODEL_ID"}' --output json
mcporter call higgsfield.get_presets --args '{"source":"viral","limit":10}' --output json
mcporter call higgsfield.get_presets --args '{"source":"marketing_studio","category":"product-shot","limit":10}' --output json
```

Replace `PRESET_NAME`, `MODEL_ID`, and job IDs with actual values.
`models_explore` uses `after` from `next_page_token` for list/search pagination.
`get_presets` uses `cursor`; carry forward the returned cursor instead of guessing it.

## Generation and recovery

MCP generation tools include `generate_image`, `generate_video`, `generate_audio`, `generate_3d`, and media batch variants.
Their `params` payloads depend on the selected model. Inspect the model contract; do not invent a universal payload.
Upload tools include `media_upload`, `media_import_url`, and `media_confirm`; inspect the needed schema before transferring media.

```bash
mcporter list higgsfield.generate_image --schema --no-oauth
mcporter list higgsfield.media_upload --schema --no-oauth
mcporter call higgsfield.job_status --args '{"jobId":"JOB_UUID"}' --output json
mcporter call higgsfield.job_display --args '{"id":"JOB_UUID"}' --output json
```

Preserve submitted job IDs. After a timeout, inspect the existing job instead of submitting a duplicate generation.
Verify completion and resulting media before reporting success.
For website operations, tools include `create_website`, `website_status`, `deploy_website`, and `publish_website`.
Read the website guide and inspect the needed tool schema before a write.

Follow the selected guide's approval gates. Tool availability does not authorize paid generation, publication, or account changes.
Keep credentials and private media out of public searches and reference files.
