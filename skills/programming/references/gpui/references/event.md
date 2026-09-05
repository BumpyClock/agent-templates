# Events and subscriptions

Use `cx.emit(event)` for a typed event.
Implement `EventEmitter<E>` on the emitter for event type `E`.

Use `subscribe` when a consumer needs the event payload.
Use `observe` when a consumer needs notice from `cx.notify()`.
An event and an entity notification express different contracts.
Emit both only when both contracts apply.

## Subscription lifetime

Retain the returned `Subscription` for the required lifetime.
Dropping it cancels the subscription.
Detach only when explicit cancellation through the handle is unnecessary.

Attach subscriptions during the owner's setup or an explicit dependency change.
Avoid duplicate subscriptions on each render.
Use window-aware subscription variants when the callback requires window access.

For callbacks that update another entity, check for feedback loops and reentrant access.
For tests, retain subscriptions until the expected event has been observed.

## Typed event and retained consumer

This fragment follows GPUI 0.2.2 and is not a standalone compiled example.
The caller supplies `source: Entity<Source>` inside `Consumer` construction.

```rust
struct ValueChanged(usize);
struct Source;
impl EventEmitter<ValueChanged> for Source {}

struct Consumer {
    value: usize,
    _subscription: Subscription,
}

let consumer = cx.new(|cx| {
    let subscription = cx.subscribe(&source, |this: &mut Consumer, _, event: &ValueChanged, cx| {
        this.value = event.0;
        cx.notify();
    });
    Consumer { value: 0, _subscription: subscription }
});
source.update(cx, |_, cx| cx.emit(ValueChanged(42)));
```

The subscription lasts as long as the consumer.
The caller retains the source separately in this example.
The source emits a payload without a state notification because it has no changed render state.
The consumer notifies its own observers after its value changes.

For payload-free dependencies, the corresponding callback shape is:

```rust
let subscription = cx.observe(&source, |this, source, cx| {
    this.value = source.read(cx).value;
    cx.notify();
});
```

This alternative assumes a source with a `value` field and a matching consumer field.
Retain this handle in the consumer as well.

Sources: [Context event APIs](https://docs.rs/gpui/latest/gpui/struct.Context.html),
[Subscription API](https://docs.rs/gpui/latest/gpui/struct.Subscription.html).
