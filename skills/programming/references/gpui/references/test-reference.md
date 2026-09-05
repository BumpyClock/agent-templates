# GPUI test mechanics

Use the repository's current GPUI test setup.
Test helpers and available context methods depend on the resolved revision and feature flags.

## Events and focus

Retain subscription handles for the duration of event assertions.
Drive deferred work through the test executor before assertions when the operation is asynchronous.
For keyboard dispatch, create a window and establish the intended focus path.
Do not substitute a direct handler call for an input dispatch test.

## Time and tasks

Use the GPUI test executor's clock controls for timer-dependent behavior.
`run_until_parked` drains runnable work.
Do not assume it advances future timers.
Use the clock-advance API exposed by the resolved executor.

Retain or await task handles according to the lifetime under test.
For cancellation defects, test owner release or task replacement.
For replaceable requests, test results that arrive out of order.

Use external I/O only when that boundary is part of the test contract.
An executor permission to park does not provide a timeout or isolation.
Do not add real sleeps to repair a deterministic test.

## Entity and event example

This example uses upstream test-context APIs inspected on 2026-09-05.
It requires GPUI test support and is not compiled in this documentation repository.

```rust
use gpui::{AppContext as _, EventEmitter, TestAppContext};
use futures::StreamExt as _;

struct Counter(usize);
#[derive(Clone, Debug, PartialEq)]
struct Changed(usize);
impl EventEmitter<Changed> for Counter {}

#[gpui::test]
async fn publishes_updated_value(cx: &mut TestAppContext) {
    let counter = cx.new(|_| Counter(0));
    let mut events = cx.events::<Changed, _>(&counter);
    counter.update(cx, |counter, cx| {
        counter.0 += 1;
        cx.emit(Changed(counter.0));
        cx.notify();
    });
    assert_eq!(counter.read_with(cx, |counter, _| counter.0), 1);
    assert_eq!(events.next().await, Some(Changed(1)));
}
```

The event stream starts before the mutation.
A test with a manually created subscription must retain its handle instead.
This test covers state and event payload, not a rendered label or key binding.

## Deterministic delay example

For a component whose delay is 100 milliseconds, the test can inspect both sides of the deadline:

```rust
component.update(cx, |component, cx| component.start_delay(cx));
cx.run_until_parked();
assert!(!component.read_with(cx, |component, _| component.done));
cx.executor().advance_clock(std::time::Duration::from_millis(100));
cx.run_until_parked();
assert!(component.read_with(cx, |component, _| component.done));
```

This fragment assumes `start_delay` retains a GPUI timer task and sets `done` after its timer resolves.
The first drain allows the task to establish its timer before clock advancement.
For cancellation, replace or release the owner before advancement and assert the observable effect remains absent.

## Window input example

`add_window_view` supplies a root entity and its `VisualTestContext` in the inspected upstream API:

```rust
let (view, cx) = cx.add_window_view(|_, cx| SearchView::new(cx));
let focus = view.read_with(cx, |view, _| view.focus_handle.clone());
cx.update(|window, _| focus.focus(window));
cx.simulate_keystrokes("enter");
```

Use `cx.simulate_keystrokes("enter")` for a keymap test and `cx.dispatch_action(Confirm)` for an action-path test.
The fixture must register its key bindings and render its action listeners.
The fragment assumes a `SearchView` fixture and is not a complete test.

For randomized scheduler failures, preserve the reported seed and the repository's reproduction command.
Use the test macro's iteration controls when applicable, not Rust's test-thread count.

Sources: [test context source](https://github.com/zed-industries/zed/blob/main/crates/gpui/src/app/test_context.rs),
[executor source](https://github.com/zed-industries/zed/blob/main/crates/gpui/src/executor.rs).
