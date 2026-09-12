# Animation audit guidance

Read the categories relevant to the requested audit or plan.
The examples draw on Emil Kowalski's design engineering philosophy ([emilkowal.ski](https://emilkowal.ski/)).
They are defaults for evaluating motion, not universal target values or a list of required changes.

## Recon within scope

Identify what can explain the affected behavior:

- Framework, motion libraries, and component libraries, such as Motion, React Spring, GSAP, CSS, WAAPI, Radix, or Base UI.
- Shared easing and duration tokens, Tailwind configuration, keyframes, transition props, and gesture handlers.
- Existing spring configurations and platform conventions. Extend the existing system rather than create parallel tokens.
- Product intent and use frequency. Repeated command-palette actions need different timing from occasional onboarding.

Search the named components and relevant dependencies for `transition`, `animation`, `@keyframes`, `motion.`, `animate={`, `useSpring`, `ease-in`, `transition: all`, `scale(0)`, `prefers-reduced-motion`, or `transform-origin` as needed.
A matching token is a lead, not proof of a defect.

## 1. Purpose & frequency

Look for a purpose such as spatial continuity, state indication, feedback, explanation, or an intentional rare celebration.
Decoration that repeatedly delays a task is a reason to reduce or remove motion.

| Frequency | Decision |
| --- | --- |
| Frequent keyboard shortcuts or command-palette actions | Prefer immediate feedback; retain motion only when it helps without delaying the action. |
| Repeated hover effects or list navigation | Keep feedback brief and avoid repeated entrance choreography. |
| Occasional modals, drawers, or toasts | Use motion when it explains state or relationships. |
| Rare onboarding or celebrations | Expressive motion can fit the product, with accessible alternatives. |

Inspect repeated interactions for perceived latency, blocked input, and distracting restarts. Removing motion can be the right fix; instant state changes are not inherently defects.

## 2. Easing & duration

Common starting points when project or platform conventions do not already resolve the choice:

- Entering or exiting → **`ease-out`** (starts fast, feels responsive)
- Moving / morphing on screen → **`ease-in-out`**
- Hover / color change → **`ease`**
- Constant motion (marquee, progress) → **`linear`**
- Default → **`ease-out`**

An `ease-in` response can feel delayed because it starts slowly, but intentional acceleration or an exit can justify it.
Judge the observed response rather than the easing name. Preserve suitable existing tokens.
When stronger deceleration or movement is needed, these are examples, not required replacements for built-in curves:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);        /* strong ease-out for UI */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);    /* strong ease-in-out for on-screen movement */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* iOS-like drawer curve */
```

Choose duration by distance, input method, use frequency, and platform behavior.
Routine feedback often fits within 100-300ms. Larger overlays can need longer without delaying input.
Illustrative ranges:

| Element | Duration |
| --- | --- |
| Button press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing / explanatory | Can be longer |

Inspect slow initial responses, input blocked until motion ends, and repeated tooltip delays. A duration above 300ms is a prompt to inspect context, not an automatic finding.

## 3. Physicality & origin

- For routine overlays, prefer a subtle scale such as `0.9-0.97` with opacity when a spatial entrance helps. Scaling from zero can make content difficult to track, but may suit an intentional graphic effect.
- Trigger-anchored popovers, dropdowns, and tooltips usually scale from their trigger:
  ```css
  .popover { transform-origin: var(--radix-popover-content-transform-origin); } /* Radix */
  .popover { transform-origin: var(--transform-origin); }                       /* Base UI */
  ```
  A centered modal can correctly use `transform-origin: center`. Judge the intended relationship.
- If scale fits the control, press feedback might use `transform: scale(0.97)` with `transition: transform 160ms ease-out`. Color or other visible state feedback can be sufficient.

Inspect misleading origins, unreadable scaling, and missing action feedback. A pure fade or nonanimated response is valid when it serves the task.

## 4. Interruptibility

CSS transitions can retarget from the current rendered value. Replacing a keyframe animation can restart it.
Rapid or reversible interactions should continue without a visible jump. Transitions, springs, WAAPI, or library-managed keyframes can satisfy this when they preserve the required state and velocity.

- For entry without JS, consider `@starting-style` when supported. A mounted-state attribute is a fallback when the target browsers require it.
- Springs can preserve velocity in gesture-driven motion. Verify the library's interruption behavior.
- A Motion spring example is `{ type: "spring", duration: 0.5, bounce: 0.2 }`. Tune it to distance, platform, and product intent rather than copying it into every interaction.
- Deliberate hold or confirmation phases may need slower timing than the system response. Symmetric timing is a problem only when it obscures intent or delays feedback.

Exercise rapid toggles, reversals, toast stacking, and drags. Check for restarts, jumps, and abrupt stops.
Choose gesture dismissal using the platform's distance and velocity contract; do not transplant thresholds between APIs with different units.

## 5. Performance

- Prefer `transform` and `opacity` when they express the intended effect. They often avoid layout work, but compositing and smoothness still depend on the runtime.
- Layout-driving properties such as `width`, `height`, `margin`, `padding`, `top`, and `left` can cause layout and paint. Consider FLIP, transforms, or grid techniques; retain other properties when their meaning and measured cost justify them.
- Prefer explicit transition properties. Investigate `transition: all` for unintended motion or unnecessary work rather than assume every use drops frames.
- Motion shorthand acceleration depends on the library version and animation path. If profiling shows main-thread transform work, compare a supported full-transform path such as `animate={{ transform: "translateX(100px)" }}` before prescribing a rewrite.
- Inherited CSS variables can broaden style recalculation. Check the affected subtree and consider setting the animated property on the target element when that reduces measured work.
- CSS and WAAPI can avoid per-frame JavaScript for supported effects. Use the existing runtime when dynamic or gesture-driven motion requires it.
- Blur, filters, shadows, and large painted regions can be expensive, especially on constrained devices. Bound the region and radius, and measure rather than assume a fixed blur limit is safe.

Inspect dropped frames, excessive layout or style work, and main-thread contention under the affected workload.
Separate code-level performance concerns from measured bottlenecks.

## 6. Accessibility

Follow the [reduced-motion contract](../ux-designer/references/accessibility.md#reduced-motion).
Preserve visible state changes and action feedback, not obligatory animation. Instant updates are valid.
Brief, non-spatial opacity or color transitions are optional when helpful and safe for the affected context.

For a component whose nonessential motion is isolated in `.motion-feedback`:

```css
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .motion-feedback:hover { transform: scale(1.03); }
}
@media (prefers-reduced-motion: reduce) {
  .motion-feedback { animation: none; transition: none; }
}
```

Keep the final state and all content accessible when motion is absent. Do not remove transforms needed for layout.
In JS, use the runtime's reduced-motion preference, such as `useReducedMotion()`, to select the affected behavior. Native apps should honor the platform preference.

Inspect reduced-motion output, keyboard interaction, and relevant pointer modes. Flag lost feedback, hidden content, or nonessential movement that ignores the preference, not the absence of animation.

## 7. Cohesion & tokens

- Motion should match the product's personality — playful can be bouncier, a dashboard stays crisp. Mismatched personality across components is a finding.
- Reuse shared motion tokens when the behavior is shared. Similar curves merit consolidation only when their differences are unintended.
- A short stagger, such as 30-80ms between siblings, can explain a group entrance. Cap the total delay and keep controls usable; no stagger is also valid.
- A subtle blur, such as `filter: blur(2px)`, can reduce visible overlap in some crossfades. Inspect readability and rendering cost before adopting it.

Inspect inconsistent responses to equivalent actions and crossfades that visibly obscure state. Do not report a missing decorative effect by itself.

## 8. Missed opportunities

Suggest additional motion only when it would improve an observed task or a requested expressive moment:

- State changes that teleport (content swaps, layout jumps) where a brief transition would prevent a jarring change.
- Spatially connected UI whose relationship is unclear without a transition.
- A first-run, success, or celebration moment where the requested product direction calls for expression.
- Percentage translations, such as `translateY(100%)` of the element's own height, or `clip-path: inset()` can express a reveal without fixed pixel offsets. Check runtime support and cost.

No missed opportunities is a valid result. Keep additive suggestions separate from defects.

## Evidence and reporting

Confirm every reported location against the relevant code or inspected output. Exclude duplicates and documented tradeoffs unless evidence shows a conflict with the requested behavior or an accessibility requirement.
State when timing, bounce, interruption, or performance needs a runtime check instead of guessing from code.

Order findings by user impact and effort. Severity follows the consequence, not the presence of a particular easing or property:

- HIGH for blocked tasks, harmful motion, inaccessible interactions, or severe responsiveness failures.
- MEDIUM for material continuity, feedback, or usability defects.
- LOW for supported polish or consistency improvements.

For a substantial audit, a table can help:

| Severity | Category | Location | Evidence and impact | Fix |
| --- | --- | --- | --- | --- |

A short audit can use a concise list. Report the assessed scope and verification limits.
Stop after the requested coverage and material findings; do not pad the report with speculative defects or opportunities.
