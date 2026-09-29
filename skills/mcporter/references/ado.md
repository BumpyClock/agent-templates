# Azure DevOps

Alias `ado`. Schema discovery succeeded on 2026-09-28 with 35 tools.
Most tools group operations behind an `action` argument. Use the action-specific requirements, not only the schema's required array.
Several parameters lack JSON types; follow their descriptions and preserve numeric IDs and arrays in `--args`.

## Projects and repositories

```bash
mcporter call ado.core_list_projects --args '{"top":10}' --output json
mcporter call ado.repo_repository --args '{"action":"list","project":"PROJECT","top":10}' --output json
```

Replace `PROJECT`, `REPOSITORY_ID`, and illustrative numeric IDs with supplied or discovered values.
Discover projects only when the target is unknown. Repository names need project context.
Project listing accepts `continuationToken`; repository listing uses `skip` and `top`.

## Work items

```bash
mcporter call ado.search_workitem --args '{"searchText":"release readiness","top":10}' --output json
mcporter call ado.wit_work_item --args '{"action":"get","id":12345}' --output json
mcporter call ado.wit_work_item --args '{"action":"get_batch","project":"PROJECT","ids":[12345,12346]}' --output json
mcporter call ado.wit_work_item --args '{"action":"list_comments","project":"PROJECT","workItemId":12345,"top":10}' --output json
```

`get` uses `id` and can omit `project` because work-item IDs are organization-unique.
Other work-item actions require `project`. `get_batch` takes an integer array, not comma-separated text.
Comments and revisions use `workItemId`, not `id`.
For `get` and `get_batch`, choose `fields` or `expand`, never both.
Search supports `skip`, `top`, and `continuationToken`. Revisions use `skip` and `top`, with at most 200 per page.

## Pull requests

```bash
mcporter call ado.repo_pull_request --args '{"action":"list","project":"PROJECT","repositoryId":"REPOSITORY_ID","status":"Active","top":10}' --output json
mcporter call ado.repo_pull_request --args '{"action":"get","project":"PROJECT","repositoryId":"REPOSITORY_ID","pullRequestId":12345}' --output json
mcporter call ado.repo_pull_request --args '{"action":"get_changes","project":"PROJECT","repositoryId":"REPOSITORY_ID","pullRequestId":12345,"top":20,"includeDiffs":false,"includeLineContent":false}' --output json
```

`list` requires repository or project scope. `get` requires project, repository, and pull-request IDs.
`get_changes` defaults to the latest iteration and includes diffs and line content unless disabled.
Start with file metadata when only the changed-file list is needed. Request content for actual code review.
Paginate with `skip` and `top`; changes are capped at 100 files per page.
Branch filters use full refs such as `refs/heads/main`. Status values include `Active`, `Completed`, `Abandoned`, and `All`.

## Builds and logs

```bash
mcporter call ado.pipelines_definition --args '{"action":"list","project":"PROJECT","top":10}' --output json
mcporter call ado.pipelines_build --args '{"action":"list","project":"PROJECT","top":10}' --output json
```

Use discovered definition IDs to narrow build searches when needed.
`pipelines_build` actions `get_status` and `get_changes` require the returned numeric `buildId`.
For logs, call `pipelines_build_log` with `action:"list"`, `project`, and `buildId`.
Then use `action:"get_content"` with the returned `logId` and optional inclusive `startLine` and `endLine`.
Log reads return at most 5000 lines; page long logs instead of assuming the first response is complete.

Definition and build listings return `items` and `continuationToken`; preserve the same `queryOrder` when continuing.
Build `get_changes` instead uses `changesContinuationToken`.
Do not combine `buildIds` with other build filters.
Repository-filtered build listing returns only one page, even when more builds exist.

## Writes and less common operations

Inspect the selected tool's schema for wiki, query, iteration, artifact, or advanced-security tasks.
Work-item edits, comments, links, pull-request changes, branch creation, wiki edits, and pipeline writes require task authorization.
Do not queue or retry a pipeline merely to inspect its status.
Read current state before a write and verify the result before reporting completion.
