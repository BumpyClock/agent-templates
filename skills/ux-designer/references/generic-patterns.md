# Generic patterns and the built-result floor

Read before building a new page or visual direction, and when a critique checks for generic design. Within an established product, the product's design system wins over the style defaults here. Accessibility requirements still apply.

Check the built result, not the intention. Run the checks together on one render, or on one contact sheet for motion.

## The floor

- **Contrast:** meet [Color and contrast](accessibility.md#color-and-contrast). On colored surfaces, tint secondary text from the surface hue or the foreground instead of neutral gray.
- **Depth:** shadows carry an offset and a soft blur. A zero-offset colored halo is decoration.
- **Spacing:** tight groups, generous separation, more space above a heading than below it. Read the computed values.
- **Type:** follow the measure in [Typeset](typeset.md). As starting limits, use a display maximum of 6rem and a tracking floor of -0.04em. Balance headings and make scale and weight steps obvious. Run the real copy at each target breakpoint and fix what overflows.
- **Motion:** prefer one authored moment over scattered effects or one identical entrance on every section. Use an exponential ease-out from an already-visible default. Blur, backdrop-filter, clip-path, mask, and shadow are available when they stay within [Runtime and performance](animate.md#runtime-and-performance).
- **States:** hover, disabled, loading, error, and empty, for the controls whose behavior can enter them. Plus real content, working controls, responsive composition, and keyboard focus.
- **Browser surfaces:** text selection, the caret, focus rings, underline offset, and numerals in tabular data ship with browser defaults. In a new visual direction, theme them from the palette. Style scrollbars only when the direction needs it, and keep them operable.
- **Copy:** the product's own language. Controls name their action. Errors name the problem and the recovery.
- **Coverage:** every brief requirement is present and reachable from the primary navigation or the current task.

## Patterns to avoid by default

These patterns are the defaults of generated pages. Avoid each one unless the brief or the product's design system asks for it. When you catch yourself reaching for one, rewrite the element instead of softening it.

Page scaffolds:

- Same-size cards of icon plus heading plus text as the page structure. Do not nest cards.
- The hero-metric template: big number, small label, supporting stats, accent.
- A kicker or eyebrow above a heading. Keep one only when it carries information the heading does not, such as a category the reader needs.
- Section numbers (01 / 02 / 03), unless the sequence carries information the reader needs.
- A modal for a task that needs neither interruption nor protected focus.
- A fade-in animation on every scroll.

Surface habits:

- Gradient text. Emphasis comes from weight or size.
- Glass and blur as decoration. For translucent materials as a chosen depth approach, see [Layout](layout.md#materials-and-depth).
- A colored `border-left` or `border-right` above 1px on cards, list items, callouts, or alerts.
- Hard offset shadows (`box-shadow: 4px 4px 0`) outside a direction that is neobrutalist.
- Sparklines, progress rings, and soft-shadowed rounded rectangles that stand in for content.
- Monospace as a costume for "technical". Use it for code, data, or measurement.
- In a new visual direction, a system display face (Impact, Arial Black, the platform sans) as the display voice. Source a face whose character matches the direction. This does not apply to native apps, utility tools, or existing systems, where [Typeset](typeset.md) defaults to the platform font.
- Unicode glyphs or emoji that stand in for an icon system. Use a real icon library or authored SVG, in one consistent stroke and weight.
- Geometric masks that stand in for organic contours. A circle, polygon, or radial-gradient cutout around a photographic subject reads worse than no cutout. Derive an alpha matte from the image, or produce a cut-out asset.
- Light or dark theme picked by product category. Pick it from the use scene: who, where, and under what ambient light.
