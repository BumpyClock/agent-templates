# Components, Type, and Icons

Read for control treatment, icons, or editorial-minimal components.

## Isolated Controls
- Treat pickers, filters, and dropdowns as crafted objects, not plain text.
- Follow [Control Selection](accessibility.md#control-selection) for project components, native elements, and custom controls.
- For custom select triggers, use inline-flex and no-wrap text to keep label and chevron on one line.

## Typography

Follow [Typeset](typeset.md) for the typography baseline, role consistency, text wrap, numeric text, and font behavior.

## Iconography
- Use the project's existing icon set if one exists; otherwise pick one coherent family (Phosphor is a good default; Lucide, platform sets also fine) and stick to it.
- Add icons only when they carry meaning.
- Remove decorative icons that add no semantic value.
- Give standalone icons subtle containers so they feel intentional.
- Align icons optically when geometric centering looks wrong.
- For text + icon buttons, make icon-side padding about 2px smaller than text-side padding when it improves balance.
- For play triangles and asymmetric icons, shift the glyph optically or fix the SVG/viewBox when possible.

## Hit Areas
- Target 44x44px for interactive controls; 40x40px is the practical floor for dense UI.
- If the visible control is smaller, specify an expanded hit area.
- Expanded hit areas must not overlap nearby interactive elements.

## Editorial-Minimal Components
These belong to the Editorial minimalism direction (see `design-direction.md`), not universal defaults — use only when that direction is chosen.
- Tags / status badges: pill radius, ~11-12px type, uppercase with wide tracking (~0.05em), background from the Editorial minimalism pastel pairs in `design-direction.md`.
- Keystroke chips: render shortcuts in `<kbd>` — `1px solid #EAEAEA`, `4px` radius, `#F7F6F3` background, monospace font.
- Accordions as border rows: strip the container box; separate items with `border-bottom: 1px solid #EAEAEA` only; `+`/`−` toggle glyph.
- Faux-OS window chrome: a minimal frame with a white top bar and three small light-gray circles for macOS controls.
- Distinguish illustrative mockups from actual product screenshots.
