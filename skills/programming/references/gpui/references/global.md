# Global state

Use `Global` for state whose ownership belongs to the application.
Use entities for state with an independent owner or lifetime.
Frequency of change alone does not determine the choice.

Initialize required globals before access through `global::<T>()`.
Use optional access when absence is a valid state.

## Mutation and observation

Use GPUI global mutation APIs for GPUI-owned state.
Check `observe_global` and the mutation API's notification behavior in the resolved version.
Do not assume all global changes are silent.

Interior mutation through an `Arc`, lock, or atomic can bypass GPUI notification paths.
Use those types when cross-thread ownership requires them, not as a default for mutable globals.
Notify dependent views through the application's established path.

## Application setting example

This fragment uses the GPUI 0.2.2 `Global`, `set_global`, and `global_mut` APIs.
It is not a standalone compiled example.

```rust
struct Preferences {
    compact: bool,
}
impl Global for Preferences {}

cx.set_global(Preferences { compact: false });
cx.global_mut::<Preferences>().compact = true;
```

A dependent entity can retain an observation subscription:

```rust
let subscription = cx.observe_global::<Preferences>(|_, cx| {
    cx.notify();
});
```

The returned handle belongs in that entity's state.
In this API, `global_mut` marks the global for observer notification.
Mutation of a nested atomic through an immutable global reference does not use that same path.
For a theme or preference cache, preserve the existing notification contract rather than adding a second event bus.

Source: [App global APIs](https://docs.rs/gpui/latest/gpui/struct.App.html).
