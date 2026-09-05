# Layout and style

Use the application's existing layout primitives and design tokens.
GPUI provides `Styled` and CSS-like layout values.
A theme accessor such as `cx.theme()` belongs to an application or component library, not GPUI itself.

## Layout defects

Inspect parent constraints, child minimum size, overflow policy, and clipping before fixed-size workarounds.
Use `px`, `rems`, and relative lengths according to the intended scale.
Check long content and window resize when those inputs affect the changed layout.

Use a custom `Element` only when existing composition cannot express the layout.
For phase-specific behavior, use [elements](element.md).

## Flexible row example

This GPUI `Styled` fragment illustrates a fixed icon area beside flexible text.
It does not define application spacing tokens and is not compiled here.

```rust
div()
    .flex()
    .items_center()
    .gap(px(8.))
    .child(div().flex_shrink_0().child(icon))
    .child(div().flex_1().min_w(px(0.)).child(label))
```

`icon` and `label` are application-provided elements.
The flexible child can shrink below its content's intrinsic width because its minimum width is zero.
The product still needs an explicit wrap, truncation, or overflow policy for the label.
For vertical scroll regions, inspect the analogous minimum-height constraint and the available parent height.

`px(...)` expresses a pixel length.
`rems(...)` follows the window's rem scale rather than the immediate parent's font size.
`relative(0.5)` expresses a proportional length, not a viewport breakpoint.
Percentage sizes require suitable parent constraints.

## GPUI Component

When the project uses Longbridge `gpui-component`, preserve its active theme and component APIs.
Check the installed version's theme fields instead of copying names from another project.
Do not replace the product's design with Shadcn conventions merely because this library uses related patterns.

Sources: [Styled API](https://docs.rs/gpui/latest/gpui/trait.Styled.html),
[GPUI Component documentation](https://longbridge.github.io/gpui-component/).
