# Craft Foundations

Read when: you are setting spacing, padding, radius, depth, and surface treatment rules.

## 4px Grid
A starting scale for product UI when the project has none. Extend it (48, 64, 96) for marketing pacing. On the web, express the values in `rem`.
- 4px: micro spacing (icon gaps).
- 8px: tight spacing (within components).
- 12px: standard spacing (between related elements).
- 16px: comfortable spacing (section padding).
- 24px: generous spacing (between sections).
- 32px: major separation.

## Rhythm From Relationships
The 4px grid supplies the values; the relationship picks which one:
- Heading to its first paragraph: close.
- Paragraph to sibling paragraph or list: one body rhythm.
- Label, value, and detail: identical across all peers.
- Content group to new section: clearly larger than any gap inside a group.
Give every gap one owner: the parent stack/grid sets it; children don't add competing margins. Judge the whole transition, not the token — a valid section gap beside an underfilled row still reads as a hole (reflow rules in `page-composition.md`).

## Symmetrical Padding
- Use symmetric padding for containers and cards by default.
- Controls with text usually need more horizontal than vertical padding.
- Break symmetry elsewhere only when content balance or hierarchy needs it.

## Border Radius System
- Choose one system and use it everywhere.
- Sharp: 4px, 6px, 8px.
- Soft: 8px, 12px.
- Minimal: 2px, 4px, 6px.
- These are suggested values, adjust based on design needs.

## Concentric Border Radius
- For nested rounded surfaces, set `outer radius = inner radius + padding`.
- Example: parent padding 8px plus child radius 12px gives parent radius 20px.
- Use strict radius math when nested surfaces sit close together.
- If spacing between surfaces is larger than 24px, treat them as separate surfaces and choose radii independently.
- Same radius on parent and child usually makes the inner shape feel swollen or misaligned.

## Depth and Elevation Strategy
Choose one primary approach and stay consistent. Borders can still mark separators, table boundaries, and input outlines in any approach.
- Borders-only (flat): clean, technical, dense. Use subtle borders to separate regions.
- Single shadow: soft lift with one shadow layer.
- Layered shadows: richer depth for premium surfaces.
- Surface color shifts: background tints create hierarchy without shadows.
- Translucent materials: only for a platform or direction that uses them. See [Materials and depth](layout.md#materials-and-depth).

In any approach:
- An elevation change on interaction can give immediate feedback on focus, selection, or hover.
- For border-like shadows on light surfaces, prefer a transparent 1px ring plus subtle lift/ambient layers.
- For dark mode, prefer borders or a simple low-opacity white ring over shadows, because deep shadows usually disappear. Keep the same hierarchy roles and retune the values. Adjust semantic colors so they are not harsh on dark backgrounds.

```css
/* Borders-only */
--border: rgba(0, 0, 0, 0.08);
--border-subtle: rgba(0, 0, 0, 0.05);
border: 0.5px solid var(--border);

/* Single shadow */
--shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

/* Layered shadows */
--shadow-layered:
  0 0 0 0.5px rgba(0, 0, 0, 0.05),
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 2px 4px rgba(0, 0, 0, 0.03),
  0 4px 8px rgba(0, 0, 0, 0.02);
```

## Surface Consistency
- Vary internal card layouts by content.
- Keep surface treatment consistent: border weight, shadow depth, corner radius, padding scale, type hierarchy.

## Image Outlines
- Add an inset 1px low-opacity outline to photos, thumbnails, avatars, and media tiles when they sit on varied backgrounds or inside surface systems.
- Light mode: pure black at about 10% opacity.
- Dark mode: pure white at about 10% opacity.
- Keep image outlines neutral. Do not tint them with brand, slate, zinc, or accent colors.
