# Interaction and Visual Clarity

Read when: you need optional motion recipes, contrast, color usage, navigation context, or dark mode guidance.

## Optional Motion Recipes

Use [Animate](animate.md) for motion purpose, timing, easing, runtime choices, and performance constraints.
Apply [Reduced Motion](accessibility.md#reduced-motion) to any selected recipe.
For an audit of existing motion, use the `improve-animations` skill.
Select a recipe only when it serves the interaction and chosen design direction.

### Compact State Changes

- For frequent control feedback, try a 150ms response.
- For a compact panel transition, try 200–250ms.
- For deceleration, compare `cubic-bezier(0.25, 1, 0.5, 1)` with the baseline example.

### Enter and Exit Motion

- For a selected focal entrance, group content into semantic chunks: title, description, controls, rows, or cards.
- If order needs emphasis, try about 100ms between chunks or 80ms between title words.
- When product tone supports it, try opacity with small vertical movement and light blur.
- When spatial context permits, try a small fixed exit movement, such as -12px, rather than full-height travel.

### Contextual Icon Motion

Examples include copy → copied, play → pause, and favorite → favorited.

- When an icon state change needs emphasis, try opacity and scale for the swap.
- For a distinct swap, try scale 0.25 → 1 with opacity 0 → 1.
- If blur clarifies the swap, try 4px → 0 within the baseline performance constraints.

### Press Feedback

- When scale fits the control, try a subtle press response such as 0.96.
- If scale distracts, choose static feedback or another suitable treatment.

## Contrast Hierarchy
- Use four levels: foreground, secondary, muted, faint.
- Apply the system consistently across text, icons, and borders.

## Color Roles
- Use color for a defined semantic, categorical, or brand role.
- For restrained product interfaces, try neutral structure with color reserved for actions and states.
- Prefer typography and spacing over extra color in data-heavy UI.

## Navigation Context
- Provide navigation context so screens feel grounded.
- Include one or more of: navigation, location indicator, user or workspace context.
- For sidebars, consider the same background as main content with a subtle border.

## Dark Mode
- Prefer borders over shadows for separation.
- Adjust semantic colors to avoid harshness on dark backgrounds.
- Keep the same hierarchy system with inverted values.

## Anti-Patterns
Usually wrong — break one only with a stated reason tied to the design direction:
- Dramatic drop shadows.
- Large radius (16px or more) on small elements.
- Asymmetric padding without reason.
- Pure white cards on colored backgrounds.
- Thick borders (2px or more) for decoration.
- Excessive spacing in product UI, such as margins over 48px between closely related sections. Marketing pages can use larger gaps for pacing.
- Decorative gradients.
- Competing brand accents without distinct roles.

## Always Question
- Did I choose a direction or default?
- Does the direction fit the users and context?
- Does every element feel crafted?
- Is the depth strategy consistent?
- Is everything aligned to the grid?

## The Standard
Design every interface as if a team obsesses over 1px differences. Aim for intricate minimalism with context-driven personality.
