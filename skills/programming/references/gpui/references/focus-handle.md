# Focus and keyboard navigation

Retain a `FocusHandle` for each persistent focus target.
Associate that handle with the element through `track_focus`.
Recreation of a handle on every render loses focus identity.

Use the relevant `Window` for focus changes and focus queries.
Match signatures to the resolved revision.

## Navigation contract

Do not assume `track_focus` alone provides Tab navigation.
Check the application's key bindings, tab-stop support, and component-library focus helpers.
Use the existing focus system rather than a second traversal mechanism.

For a modal, preserve the intended focus scope and restore focus when the modal closes.
Check keyboard activation, reverse traversal, and a visible focus indicator when those behaviors change.
Use focus-within semantics when a container must remain active while a descendant has focus.

For action dispatch, use [actions](actions.md).
For window-dependent checks, use [tests](test.md).

## Persistent focus target example

This fragment uses GPUI 0.2.2 signatures and is not compiled here.
The view constructor creates `focus_handle` once with `cx.focus_handle()`.

```rust
impl Focusable for SearchView {
    fn focus_handle(&self, _: &App) -> FocusHandle {
        self.focus_handle.clone()
    }
}

impl SearchView {
    fn activate(&mut self, window: &mut Window) {
        self.focus_handle.focus(window);
    }
}
```

The render tree associates the same handle with the dispatch target:

```rust
div()
    .key_context("SearchView")
    .track_focus(&self.focus_handle)
    .on_action(cx.listener(Self::confirm))
```

`confirm` has parameters `&mut self`, `&Confirm`, `&mut Window`, and `&mut Context<Self>`.
The action and its key binding must exist separately.
`is_focused(window)` checks the exact target.
`contains_focused(window, cx)` also accepts a focused descendant.

For modal restoration, retain the previous target only for the intended modal lifetime.
Restore it only if it remains valid for the current window and product state.
A replaced or closed parent view must not receive stale focus restoration.

Source: [GPUI 0.2.2 FocusHandle](https://docs.rs/gpui/0.2.2/gpui/struct.FocusHandle.html).

Source: [GPUI window and focus implementation](https://github.com/zed-industries/zed/blob/main/crates/gpui/src/window.rs).
