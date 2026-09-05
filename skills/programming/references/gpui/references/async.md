# Async tasks

Keep entity and window access on the GPUI foreground executor.
Move CPU-intensive or blocking work to the background executor.
Return results to a foreground task before an entity update.

Match `spawn` signatures to the receiver and resolved GPUI revision.
`App::spawn`, `Context::spawn`, and window-aware variants are not interchangeable.
Use the repository's working pattern rather than an example from another revision.

## Lifetime and cancellation

A task handle retains the task.
Dropping the handle cancels the task unless it was detached.
Retain the handle when component destruction or replacement should cancel the work.
Detach only when the work should continue without that handle.

Use weak entity access when a task must not retain its owner.
Account for entity release and window closure after an await.
For replaceable requests, prevent an older result from overwriting newer state.

GPUI has its own executor.
Do not assume a Tokio reactor exists.
Use the available executor timer or the application's explicit runtime integration.

For deterministic timer and cancellation checks, use [test mechanics](test-reference.md).

## Background result with an owner lifetime

This fragment follows GPUI 0.2.2 `Context::spawn` and `BackgroundExecutor::spawn` signatures.
It is illustrative, not compiled here.
`compute` is an application function with owned, `Send` inputs and output.
`pending` is an `Option<Task<()>>` field.

```rust
let work = cx.background_executor().spawn(async move {
    compute(input)
});
self.pending = Some(cx.spawn(async move |this, cx| {
    let result = work.await;
    if this.update(cx, |state, cx| {
        state.result = Some(result);
        cx.notify();
    }).is_err() {
        return;
    }
}));
```

`this` is already a weak entity handle supplied by `Context::spawn`.
The failed update means this owner no longer exists.
If `compute` returns an operation error, preserve that error separately from entity release.
The update is synchronous even though its context permits async access.

Replacement of `pending` drops the previous task handle.
Cancellation does not undo external effects or necessarily interrupt CPU work that has already started.
Use a request identity check when results can arrive through independent tasks or callbacks:

```rust
if request_id != state.current_request_id {
    return;
}
state.result = Some(result);
cx.notify();
```

For debounce behavior, await an executor timer before the request and retain the replaceable task in its owner.
For periodic work, retain the loop task and use an executor timer between iterations.
Choose detached work only when neither owner destruction nor replacement should cancel it.

Source: [GPUI 0.2.2 Context::spawn](https://docs.rs/gpui/0.2.2/gpui/struct.Context.html#method.spawn).

Sources: [Task API](https://docs.rs/gpui/latest/gpui/struct.Task.html),
[Context API](https://docs.rs/gpui/latest/gpui/struct.Context.html),
[executor source](https://github.com/zed-industries/zed/blob/main/crates/gpui/src/executor.rs).
