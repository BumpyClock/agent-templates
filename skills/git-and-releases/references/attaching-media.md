# Attaching media to a pull request

Use GitHub's user-attachments API when a screenshot, diagram, or short recording genuinely improves reviewer understanding. This procedure uploads a local file and submits the resulting URL to the requested PR; generating markdown without updating the PR is incomplete.

Put the values in variables so filenames and target repositories are not inferred or interpolated unsafely:

```bash
FILE='assets/dashboard.png'
NAME="$(basename -- "$FILE")"
MIME='image/png'
TARGET='https://github.com/OWNER/REPO/pull/123'
REPO='OWNER/REPO'
```

Set `REPO` from the requested target rather than assuming the current checkout is correct. Keep the untrusted filename in the quoted `FILE` variable.

Resolve and validate the target repository's numeric database ID:

```bash
REPO_ID="$(gh api "repos/$REPO" --jq .id)" ||
  { echo "repo lookup failed" >&2; exit 1; }
case "$REPO_ID" in
  ''|*[!0-9]*) echo "no repository_id for $REPO" >&2; exit 1 ;;
esac
```

Upload the raw bytes, passing metadata through `--url-query` so reserved filename characters are encoded:

```bash
TOKEN="$(gh auth token)" ||
  { echo "GitHub authentication unavailable" >&2; exit 1; }
URL="$(curl --fail-with-body -sS -X POST \
  "https://uploads.github.com/user-attachments/assets" \
  --url-query "name=$NAME" \
  --url-query "content_type=$MIME" \
  --url-query "repository_id=$REPO_ID" \
  -H "Content-Type: application/octet-stream" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -H "Authorization: Bearer $TOKEN" \
  --data-binary "@$FILE" | jq -r .url)"
case "$URL" in
  https://*) ;;
  *) echo "upload failed: $URL" >&2; exit 1 ;;
esac
```

For GitHub Enterprise Server, use the configured endpoint's `uploadsUrl` host instead of `uploads.github.com`. `--url-query` requires curl 7.87 or newer, and `--fail-with-body` requires curl 7.76 or newer.

Submit the hosted URL to the requested target:

```bash
# Append an image to the PR description.
BODY="$(gh pr view "$TARGET" --repo "$REPO" --json body -q .body)"
printf '%s\n\n![%s](%s)\n' "$BODY" "$NAME" "$URL" |
  gh pr edit "$TARGET" --repo "$REPO" --body-file -

# Or add a new image comment.
# gh pr comment "$TARGET" --repo "$REPO" --body "![$NAME]($URL)"
```

Use `![alt text](url)` for images. Put a video URL on its own line so GitHub can render its player, or use a plain markdown link when that reads better. Set `MIME` to the file's actual media type, such as `video/mp4`. Never use multipart forms, base64, or JSON wrappers for the upload, and do not proceed unless the response contains a validated `https://` URL.

