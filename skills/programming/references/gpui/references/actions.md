# Actions and keyboard commands

Use `actions!` for unit actions.
Use `#[derive(Action)]` when an action needs data.
Preserve action names and payload compatibility when external keymaps depend on them.

Register key bindings through the application's initialization path.
Associate scoped commands with a matching `key_context`.
Attach action listeners to the intended focus dispatch path.

Match listener signatures to the resolved GPUI revision.
A listener that receives `Window` cannot use a copied callback that omits that parameter.

## Dispatch checks

For a keyboard defect, inspect the keymap, active context, focus path, and action propagation.
A direct method call does not test key dispatch.
Test the shortcut through the window when dispatch is the affected contract.

Do not assume `cmd` means Control on Windows or Linux.
Use the project's platform-specific keymap or the modifier syntax supported by its GPUI revision.

For focus ownership, use [focus](focus-handle.md).

## Scoped command example

This GPUI 0.2.2 fragment connects a unit action to a key context.
It is not a complete application or a compiled test.

```rust
actions!(search, [Confirm]);

// Application initialization:
cx.bind_keys([KeyBinding::new("enter", Confirm, Some("SearchView"))]);

// SearchView render:
div()
    .key_context("SearchView")
    .track_focus(&self.focus_handle)
    .on_action(cx.listener(Self::confirm))
```

The `confirm` method belongs in `impl SearchView`, not inside `impl Render`.
Its callback accepts `&Confirm`, `&mut Window`, and `&mut Context<Self>` after `&mut self`.
The handler decides whether to perform the operation or permit ancestor behavior.
In GPUI 0.2.2, bubble-phase action handlers stop propagation by default.
Use `cx.propagate()` when the ancestor should also receive an unhandled action.

Source: [GPUI 0.2.2 action propagation](https://docs.rs/gpui/0.2.2/gpui/struct.App.html#method.propagate).

Sources: [GPUI key dispatch](https://github.com/zed-industries/zed/blob/main/crates/gpui/docs/key_dispatch.md),
[action API](https://docs.rs/gpui/latest/gpui/trait.Action.html).
