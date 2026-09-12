# GitHub operations

Use the host's permitted GitHub tools or `gh` within the authorized scope.

## Retrieve feedback

Fetch review threads, issue conversation comments, and review bodies as required by the request.
Paginate thread lists and comments within each thread.
A fixed `first:100` or `first:20` limit does not establish complete retrieval.
Include check annotations when they contain relevant feedback.

Preserve GraphQL review thread node IDs separately from REST review-comment database IDs.
Conversation comments and review summaries do not have resolvable review thread IDs.
For a partial fetch, report the missing evidence before a completeness claim.

## Reply and resolve

For an authorized reply and resolution, use the host-native combined operation when provided.
Supply the IDs required by its schema; a combined operation may require both a thread node ID and a review-comment database ID.
If the host requires that operation, do not bypass it with lower-level calls after failure or unavailability.
Otherwise, fall back only to operations the host permits and only for the actions the user authorized.
Do not use an operation that also resolves a thread when only a reply is authorized.

The reply must succeed in the existing review thread before that same thread is resolved.
For permitted direct API fallback, reply with GraphQL `addPullRequestReviewThreadReply` using the review thread node ID, or the REST review-comment replies endpoint using the review comment's database ID.
In that fallback, use `resolveReviewThread` with that same thread node ID only after the reply succeeds.
Do not substitute an issue conversation comment or a disconnected top-level PR comment for a thread reply.

Pass reply text through a JSON payload file or connector arguments.
Do not interpolate review text or replies into shell syntax.
After an ambiguous or interrupted mutation, fetch the thread before any retry.
Check both the reply and the resolved state.
Retry only an outstanding action through a permitted operation; do not post the same reply again.
If no permitted operation can complete the remaining action without duplicating the reply, report the blocker.
