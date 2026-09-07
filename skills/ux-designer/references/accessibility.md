# Accessibility

Read when: building or speccing any custom interactive component — dialog/modal, dropdown menu, accordion, custom select/combobox, disclosure/toggle, tabs — or any focus, motion, form-validation, or contrast behavior. This is the a11y contract for the custom UI this skill prescribes.

## Control Selection

- Reuse established project components that meet the required behavior and accessibility needs.
- When no suitable project component exists, prefer native elements.
- Use `<button>`, `<a href>`, `<input>`, `<select>`, `<textarea>`, `<dialog>`, or `<details>/<summary>` when they meet the required behavior.
- Build custom controls only when required behavior exceeds native capabilities, not solely for visual consistency.
- Verify keyboard interaction, focus behavior, and semantics for custom controls.
- First rule of ARIA: don't use ARIA if a native element does the job. Second: don't change native semantics. A `<div role="button">` needs `tabindex="0"`, Enter/Space handlers, and `:focus-visible` — all things `<button>` already has.
- No ARIA is better than bad ARIA. A wrong role actively misleads assistive tech; absent role degrades to plain text.

## The patterns this skill builds (WAI-ARIA APG)
Terse contract per pattern — roles, states, keys. Full detail: w3.org/WAI/ARIA/apg.

**Disclosure (show/hide one region)** — prefer `<details>/<summary>`. Custom: trigger is `role="button"` (use `<button>`), `aria-expanded` true/false, `aria-controls` → panel id. Keys: Enter/Space toggle.

**Dialog / modal** — container `role="dialog"` + `aria-modal="true"`, labeled by `aria-labelledby` (visible title) or `aria-label`. All operable elements are descendants. On open: move focus in (first focusable, or the title/close for large or destructive content). Trap Tab/Shift+Tab inside; Escape closes; on close return focus to the invoker. Elements behind the modal get `inert`. Prefer native `<dialog>`.showModal() — it gives trap + inert + Escape for free.

**Menu button (actions menu)** — trigger `aria-haspopup="menu"`, `aria-expanded`, `aria-controls` → menu. Menu is `role="menu"`; items `role="menuitem"`. Keys: Enter/Space/Down open menu and focus first item (Up → last); within menu Up/Down move (wrap), Escape closes and returns focus to trigger, Tab closes. Roving `tabindex` (only active item is tabbable), not `aria-activedescendant`. Do NOT use this for a nav list of links — that's just a styled `<ul>` of `<a>`.

**Accordion** — each header is a `<button>` wrapped in a real heading (`<h3>` etc. with correct level), `aria-expanded`, `aria-controls` → panel. Panel is `role="region"` `aria-labelledby` → its button. Keys: Enter/Space toggle; Tab/Shift+Tab move between headers and page (arrow keys optional). Don't force single-open unless the design needs it.

**Combobox / custom select** — for select-only, input has `role="combobox"`, `aria-expanded`, `aria-controls` → listbox, `aria-activedescendant` → active option (focus stays on the combobox). Popup `role="listbox"`; options `role="option"` with `aria-selected="true"` on the chosen one. Keys: Down/Up open and move active option, Enter selects + closes, Escape closes, typeahead jumps. Native `<select>` handles all of this — only go custom when you must render option content the native control can't.

## Focus management
- Style `:focus-visible`, not `:focus` — keyboard users get a ring, mouse users don't. Never `outline: none` without an equivalent replacement (WCAG 2.4.7 failure).
- Indicator: solid, ≥2px thick, ≥3:1 contrast against adjacent colors, with `outline-offset: 2px` so it clears the element. A visible-by-default ring beats a subtle one.
- Focus order follows DOM order and reading order. Don't reorder with positive `tabindex`; fix the DOM. `tabindex="0"` adds to order, `tabindex="-1"` makes programmatically focusable only.
- Trap focus ONLY in modals; nowhere else. When a popover/menu closes, return focus to its trigger.
- First interactive element on every page: a skip link (`<a href="#main">`) visible on focus.
- Focus must not be hidden behind sticky headers or the on-screen keyboard (WCAG 2.4.11 Focus Not Obscured, AA).

## Forms
- Every input has a programmatically associated `<label>` (`for`/`id` or wrapping). Icon-only controls get `aria-label`.
- Placeholder is never a label — it vanishes on input, fails contrast, and disappears for screen readers. Keep the visible label.
- Errors: reference the message with `aria-describedby`, set `aria-invalid="true"`, and announce via a container that is `role="alert"` or `aria-live="assertive"` (polite for non-blocking). Don't signal error by color alone — add text and an icon.
- Group related fields with `<fieldset>/<legend>`. Mark required fields in text, not just an asterisk color.

## Reduced Motion

This section owns reduced-motion requirements across all motion baselines and recipes.

- For web interfaces, provide an explicit `prefers-reduced-motion: reduce` path.
- For native interfaces, honor the platform reduced-motion preference.
- Under reduced motion, disable nonessential spatial effects, parallax, scroll-driven reveals, automatic carousel advances, background loops, zoom/spin, and physics/magnetic hover.
- Preserve visible state changes and action feedback without a requirement for animation.
- Use instant updates or optional brief, non-spatial opacity or color transitions when these clarify state.
- Preserve all content and controls when motion is absent.
- Retain essential motion only when no alternative can preserve the required information or functionality.
- Verify the reduced-motion path in the affected output. Do not assume opacity-only effects are safe in every context.

This skill requires respect for reduced-motion preferences independently of its WCAG AA target.
For web guidance, see [WCAG 2.3.3, Level AAA](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) and [CSS technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39).

## Color and contrast
- Never encode meaning in color alone — pair with text, icon, shape, or pattern (WCAG 1.4.1). Error red also says "Error" and carries an icon.
- Text contrast (WCAG 1.4.3 AA): ≥4.5:1 normal, ≥3:1 for large text (≥24px, or ≥18.7px bold).
- Non-text contrast (1.4.11 AA): require ≥3:1 against adjacent colors for necessary control, state, and graphical information.
- Apply this requirement to boundaries, focus indicators, icons, and chart marks when users need them to identify or understand that information.
- Exclude decorative borders when other visuals identify the control. See [WCAG boundary requirements](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries).
- Verify contrast in affected states of each supported theme. A token that passes on white can fail on a dark surface.

## Touch targets
- Minimum 24×24 CSS px (WCAG 2.5.8 AA); undersized targets need enough spacing that a 24px circle centered on each doesn't overlap a neighbor.
- Practical floor is higher: 44×44 (iOS HIG / WCAG 2.5.5 AAA) and 48×48 (Android) — treat 44px as the real design target, 24px as the absolute AA minimum.
- Enlarge the hit area with padding, not just the visual — a 16px icon in a 44px tap zone is correct.
