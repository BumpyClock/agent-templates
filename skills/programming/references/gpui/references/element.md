# Custom elements

Use `Render` for an entity-backed view and `RenderOnce` for a composable value.
Use the low-level `Element` trait when those interfaces cannot express the required layout or paint behavior.

## Phase contract

| Phase | Responsibility |
| --- | --- |
| `request_layout` | Request layout nodes and retain state required by later phases |
| `prepaint` | Use resolved bounds to prepare hitboxes and paint state |
| `paint` | Submit visual output and install the relevant input handlers |

Copy trait signatures from the resolved source.
Associated types and phase arguments can change between revisions.
Preserve stable element identity when interaction state must survive across frames.
Pass phase state through the trait's associated state types.

Use an upstream element with similar clipping, child layout, or input behavior as a focused reference.
Do not infer correct hit testing from visible output alone.

## Phase-state example

For a custom interactive region, a useful state split is:

```text
request_layout → LayoutId + child layout state
prepaint       → resolved bounds + hitbox
paint          → visual output + handler that captures this frame's hitbox
```

This is a design sketch, not an `Element` implementation.
`request_layout` describes constraints, not the final screen position.
`prepaint` has resolved bounds for hitbox placement.
A paint-installed mouse handler checks the hitbox and dispatch phase before an action.
The visible bounds and interactive bounds must use the same coordinate and clipping contract.

Frame-local state does not replace persistent model state.
Store selection, scroll ownership, or durable task handles in the owning entity or supported persistent element state.
Keep child layout identifiers with their corresponding children when custom layout reorders them.
For an overlapping element, test which target receives input as well as which element appears on top.

Sources: [Element API](https://docs.rs/gpui/latest/gpui/trait.Element.html),
[element source](https://github.com/zed-industries/zed/blob/main/crates/gpui/src/element.rs).
