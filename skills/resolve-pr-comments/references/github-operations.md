# GitHub operations

Use `gh` or the available GitHub connector within the authorized scope.

## Retrieve feedback

Fetch review threads, issue conversation comments, and review bodies as required by the request.
Paginate thread lists and comments within each thread.
A fixed `first:100` or `first:20` limit does not establish complete retrieval.
Include check annotations when they contain relevant feedback.

Preserve GraphQL review thread IDs separately from REST comment IDs.
Conversation comments and review summaries do not have resolvable review thread IDs.
For a partial fetch, report the missing evidence before a completeness claim.

## Reply and resolve

Use GraphQL `addPullRequestReviewThreadReply` to reply with a review thread ID.
Use `resolveReviewThread` with that same ID only after the reply succeeds.
A REST reply uses a review comment ID instead.

Pass reply text through a JSON payload file or connector arguments.
Do not interpolate review text or replies into shell syntax.
After an interrupted mutation, fetch the thread to determine whether the operation succeeded.
