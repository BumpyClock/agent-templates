---
name: pr-review-canvas
description: "Interactive local HTML PR walkthrough — grouped diffs + annotations, reads like a peer explaining what matters."
---

# PR Review Canvas

Interactive local HTML PR walkthrough — grouped diffs + annotations, reads like a peer explaining what matters. Explanatory artifact, not substitute for review findings.

Assets bundled in `<skill-dir>/canvas/`: `styles.css`, `renderer.js`, `template.html` (MIT, `canvas/LICENSE.txt`; source: cursor-team-kit). `<skill-dir>` = this skill's install directory, not repo-relative. Read all three before assembling — they define the available CSS classes (`.file-card`, `.file-note`, `.bp-section`, `.verdict`, …) and JS helpers (`toggle`, `toggleBP`, `renderDiff`, `esc`).

Work dir: session scratchpad if the harness provides one, else `<OS temp dir>/pr-review-{number}` (`/tmp` on POSIX, `$env:TEMP` on Windows). Sandboxed sessions often block shell `>` redirection and `cd`-in-compound commands — prefer the Write tool for files you author, keep commands `cd`-free, run from the work dir's parent only via absolute paths.

## 1. Fetch

Resolve the PR from its URL, number, or current branch with `gh`.
Fetch metadata and per-file patches.
Save all file pages as one JSON array:

```bash
mkdir -p "{workdir}"
gh api "repos/{owner}/{repo}/pulls/{number}/files" --paginate --slurp \
  > "{workdir}/files.json"
```

If redirection fails, save stdout with an available file tool.
Proceed only after the fetch succeeds.

Also fetch review comments for annotation folding: `gh api repos/{owner}/{repo}/pulls/{number}/comments --paginate` (add `issues/{number}/comments` when conversation context matters).

## 2. Body HTML

Write only `<body>` contents to `{workdir}/body.html`:

- Header (title, PR number, author, stats) → TL;DR → core files expanded with annotations → wiring/integration condensed → mechanical/generated/rename-only collapsed → review checklist (risks, questions, suggested review order).
- Fold fetched review comments into relevant file annotations; drop the rest.
- Useful: pseudocode summaries, before/after behavior tables, inline SVG flow diagrams, callouts for breaking changes/races/migration order/security/perf/rollback.
- Use `<div data-diff="src/example.ts"></div>` placeholders for diffs.
- Use the complete `filename` from `files.json` as each key.
- Escape filenames for HTML attributes, including quotes and ampersands.
- Preserve import and whitespace changes in the rendered diff. The renderer adds move annotations without removal of changed lines.

## 3. Assemble

Never hand-embed patch text into executable JS — patches can contain `</script>`. Use (`python` instead of `python3` on Windows):

```bash
python3 <<'PY'
import json
from pathlib import Path

workdir = Path("{workdir}")
skill_dir = Path("{skill-dir}")  # absolute path of this skill's directory
pages = json.loads((workdir / "files.json").read_text())
patches = {file["filename"]: file.get("patch") or "" for page in pages for file in page}
body = (workdir / "body.html").read_text()
css = (skill_dir / "canvas" / "styles.css").read_text()
js = (skill_dir / "canvas" / "renderer.js").read_text()
tmpl = (skill_dir / "canvas" / "template.html").read_text()

safe_json = json.dumps(patches).replace("<", "\\u003c").replace(">", "\\u003e").replace("&", "\\u0026")
out = (
    tmpl.replace("/* INJECT_CSS */", css)
    .replace("/* INJECT_JS */", js)
    .replace("<!-- INJECT_BODY -->", body)
    .replace('{"__PR_DIFFS_PLACEHOLDER__":true}', safe_json)
)
for marker in ("INJECT_CSS", "INJECT_JS", "INJECT_BODY", "__PR_DIFFS_PLACEHOLDER__"):
    assert marker not in out, f"unreplaced marker: {marker}"
assert len(out) > len(body) + len(css) + len(js), "assembly lost content"
(workdir / "index.html").write_text(out)
PY
```

Assertion fires → template markers drifted; diff `template.html` against the replace strings before retrying. Silent no-op replace = page loads with every diff blank.

## 4. Serve

Check the port is free (taken → try 8433, 8434…), then serve:

```bash
lsof -nP -iTCP:8432 -sTCP:LISTEN || true   # Windows: Get-NetTCPConnection -LocalPort 8432 -State Listen
python3 -m http.server 8432 --bind 127.0.0.1 --directory "{workdir}"
```

Serve only the dedicated work directory.
Use a persistent background session or process for the server command.
Record its session ID or PID.
Check that the page loads and file sections expand before delivery.
Report `http://127.0.0.1:<port>/` and the absolute path to `index.html`.
Keep the server active after delivery so the user can review the page.
Provide the exact cleanup command or session stop action for that server.
If persistent processes are unavailable, provide `index.html` and the command to serve it.
Stop the server when the user requests cleanup.

## Maintenance

After renderer changes, run `node --test "{skill-dir}/canvas/renderer.test.cjs"`.

## Guardrails

- Keep mechanical/generated files collapsed unless risk hides there.
- No tokens, secrets, internal URLs, or unrelated PR comments in HTML.
- PR too large (~>100 files / >5k changed lines) → index page or recommend splitting.
