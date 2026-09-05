# Component API conventions

Use neighboring components to identify the repository's public API conventions.
GPUI does not require a universal field order, callback type, or component trait stack.

Use `RenderOnce` for a value that produces an element tree.
Use an entity-backed `Render` view when state needs a persistent identity.
Implement `Styled` or interactivity traits only when the component exposes those capabilities.

For callback storage, choose ownership from the actual clone and lifetime requirements.
Do not require `Rc<dyn Fn>` for every callback.
Keep state ownership clear between a component and its caller.

## Library-specific conventions

`Sizable`, `Selectable`, `Disableable`, and `ActiveTheme` are component-library APIs.
Use them only when the selected library and version provide them.
A `base: Div` field and a separate `StyleRefinement` field are design choices, not GPUI requirements.

## Caller-owned state

A short-lived `RenderOnce` value can borrow persistent state through a cloned entity handle:

```rust
#[derive(IntoElement)]
struct Picker {
    state: Entity<PickerState>,
}

impl Picker {
    fn new(state: &Entity<PickerState>) -> Self {
        Self { state: state.clone() }
    }
}
```

This structural fragment omits the application-specific `RenderOnce` implementation.
The caller creates `PickerState` once, outside repeated render calls.
Reconstruction of `Picker` then preserves selection and task ownership in the same entity.
Use this shape only when caller ownership fits the component API.

## Style and interaction forwarding

For a wrapper that exposes `Styled`, the returned style must reach its rendered element.
A separate `StyleRefinement` field has no visible effect unless render applies it.
Direct delegation to the base element avoids that separate merge:

```rust
impl Styled for Badge {
    fn style(&mut self) -> &mut StyleRefinement {
        self.base.style()
    }
}
```

This fragment assumes `base: Div` and a render implementation that uses that base.
If render applies defaults after caller styles, it can overwrite the caller's choice.
Preserve the repository's intended precedence and test an override when that API changes.

For interactive wrappers, preserve element identity and forward the installed handlers to the final element.
A stored callback that render never installs is not an implemented interaction.
Disabled behavior must govern keyboard and action activation as well as mouse callbacks.
Keep selected state separate from disabled state unless the product contract explicitly connects them.

For a new public component, use [new components](new-component.md).
For layout and theme behavior, use [layout](layout-and-style.md).

Sources: [RenderOnce API](https://docs.rs/gpui/latest/gpui/trait.RenderOnce.html),
[GPUI Component source](https://github.com/longbridge/gpui-component).
