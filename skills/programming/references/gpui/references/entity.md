# Entities

An `Entity<T>` retains GPUI-owned state.
A `WeakEntity<T>` permits access without that ownership.

Use a strong handle when the caller must keep the state alive.
Use a weak handle for callbacks or tasks that must not retain the owner.
A closure does not require a weak handle merely because it is a closure.

## Updates

Use the context passed into `entity.update` for operations within that update.
Do not access the same entity again while its mutable update is active.
An update to a different entity is not inherently invalid.
Check callback paths for indirect reentry into the first entity.

Call `cx.notify()` when dependent views or observers need notice of a state change.
A field assignment alone does not express that dependency.

Handle a failed weak update according to the task lifetime.
Entity release can be an expected cancellation condition.
Do not suppress unrelated operation errors with an indiscriminate `.ok()`.

For task lifetime rules, use [async](async.md).
For observation, use [events](event.md).

## Shared state example

This fragment uses the GPUI 0.2.2 API shape, without a component library.
It is not a standalone compiled example.

```rust
struct Counter {
    count: usize,
}

let counter = cx.new(|_| Counter { count: 0 });
let shared = counter.clone();
counter.update(cx, |counter, cx| {
    counter.count += 1;
    cx.notify();
});
assert_eq!(shared.read(cx).count, 1);
```

The clone refers to the same state, not a snapshot.
A parent can retain a child entity while the child holds a weak parent handle.
Strong handles in both directions can prevent release.
Independent entities can share a strong model handle when that lifetime is intentional.

For derived view state, retain an `observe` subscription and notify the dependent view after its derived state changes.
Observation does not replace ownership of the source model.

| Need | API shape |
| --- | --- |
| Borrow state within synchronous application access | `entity.read(cx)` |
| Return a value from context-mediated access | `entity.read_with(cx, |state, cx| value)` |
| Mutate state through its entity context | `entity.update(cx, |state, cx| result)` |
| Refer without retention | `entity.downgrade()` |
| Compare entity identity rather than contents | `entity.entity_id()` |

Sources: [ownership and data flow](https://docs.rs/gpui/latest/gpui/_ownership_and_data_flow/index.html),
[Entity API](https://docs.rs/gpui/latest/gpui/struct.Entity.html).
