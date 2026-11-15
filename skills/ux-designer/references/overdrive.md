# Overdrive

Read only when the user asks for a technically ambitious effect, or the brief needs one. This reference covers web techniques.

Push an interface past conventional limits: a table that handles a million rows, a dialog that morphs from its trigger, a form that validates in real time with streaming feedback, a page transition that feels cinematic.

Context decides what "extraordinary" means. A particle system on a creative portfolio is impressive. The same particle system on a settings page is embarrassing. A settings page with instant optimistic saves and animated state transitions is extraordinary too. Understand the project's personality and goals before you choose.

Apply [Reduced Motion](accessibility.md#reduced-motion) and [Animate](animate.md) to every effect.

### Choose the direction

Ambitious effects misfire easily, so compare a few directions before you build: different techniques, levels of ambition, and aesthetic approaches. Weigh browser support, performance cost, and complexity.

When the user named the effect, or the brief makes one direction the clear fit, build it and name the alternatives in the report. Ask the user to choose first when the directions differ substantially in cost or character and the brief does not settle it. Also ask before you add a dependency or large asset, request a device permission, or change product behavior. Put each direction's description and trade-offs in the question, so the user chooses between things they can read.

### Verify in the browser

Ambitious effects rarely work on the first try, so verify them in the browser rather than from code. An effect that runs can still stutter, ease wrong, or land on the wrong frame. Aim the checks at timing, easing, and smoothness, and batch the fixes between looks.

---

## Assess What "Extraordinary" Means Here

The right kind of technical ambition depends entirely on what you're working with. Before choosing a technique, ask: **what would make a user of THIS specific interface say "wow, that's nice"?**

### For visual/marketing surfaces
Pages, hero sections, landing pages, portfolios: the "wow" is often sensory: a scroll-driven reveal, a shader background, a cinematic page transition, generative art that responds to the cursor.

### For functional UI
Tables, forms, dialogs, navigation: the "wow" is in how it FEELS: a dialog that morphs from the button that triggered it via View Transitions, a data table that renders 100k rows at 60fps via virtual scrolling, a form with streaming validation that feels instant, drag-and-drop with spring physics.

### For performance-critical UI
The "wow" is invisible but felt: a search that filters 50k items without a flicker, a complex form that never blocks the main thread, an image editor that processes in near-real-time. The interface just never hesitates.

### For data-heavy interfaces
Charts and dashboards: the "wow" is in fluidity: GPU-accelerated rendering via Canvas/WebGL for massive datasets, animated transitions between data states, force-directed graph layouts that settle naturally.

**The common thread**: something about the implementation goes beyond what users expect from a web interface. The technique serves the experience, not the other way around.

## The Toolkit

Organized by what you're trying to achieve, not by technology name.

### Make transitions feel cinematic
- **View Transitions API** (same-document: all browsers; cross-document: no Firefox): shared element morphing between states. A list item expanding into a detail page. A button morphing into a dialog. This is the closest thing to native FLIP animations.
- **`@starting-style`** (all browsers): transition elements from `display: none` to visible with CSS only. Pair it with `transition-behavior: allow-discrete`.
- **Spring physics**: natural motion with mass, tension, and damping instead of cubic-bezier. Use the project's existing motion primitives first. Otherwise: motion (formerly Framer Motion), GSAP, or a small spring solver.

### Tie animation to scroll position
- **Scroll-driven animations** (`animation-timeline: scroll()`): CSS-only, no JS. Parallax, progress bars, reveal sequences all driven by scroll position. (Browser support changes; check current support, feature-detect with `@supports`, and provide a static fallback)

### Render beyond CSS
- **WebGL** (all browsers): shader effects, post-processing, particle systems. Libraries: Three.js, OGL (lightweight), regl. Use for effects CSS can't express.
- **WebGPU** (partial support; feature-detect): next-gen GPU compute, more powerful than WebGL. Always fall back to WebGL2; gate it behind API detection plus a `navigator.gpu.requestAdapter()` null check, so a blocklisted or headless GPU still reaches the fallback.
- **Canvas 2D / OffscreenCanvas**: custom rendering, pixel manipulation, or moving heavy rendering off the main thread entirely via Web Workers + OffscreenCanvas.
- **SVG filter chains**: displacement maps, turbulence, morphology for organic distortion effects.

### Make data feel alive
- **Virtual scrolling**: render only visible rows for tables/lists with tens of thousands of items. No library required for simple cases; TanStack Virtual for complex ones.
- **GPU-accelerated charts**: Canvas or WebGL-rendered data visualization for datasets too large for SVG/DOM. Libraries: deck.gl, regl-based custom renderers.
- **Animated data transitions**: morph between chart states rather than replacing. D3's `transition()` or View Transitions for DOM-based charts.

### Animate complex properties
- **`@property`** (all browsers): register custom CSS properties with types, enabling animation of gradients, colors, and complex values that CSS can't normally interpolate.
- **Web Animations API** (all browsers): JavaScript-driven animations with the performance of CSS. Composable, cancellable, reversible. The foundation for complex choreography.

### Push performance boundaries
- **Web Workers**: move computation off the main thread. Heavy data processing, image manipulation, search indexing: anything that would cause jank.
- **OffscreenCanvas**: render in a Worker thread. The main thread stays free while complex visuals render in the background.
- **WASM**: near-native performance for computation-heavy features. Image processing, physics simulations, codecs.

### Interact with the device
- **Web Audio API**: spatial audio, audio-reactive visualizations, sonic feedback. Requires user gesture to start.
- **Device APIs**: orientation, geolocation. Use sparingly and always with user permission.

**NOTE**: This reference is about enhancing how an interface FEELS, not changing what a product DOES. Adding real-time collaboration, offline support, or new backend capabilities are product decisions, not UI enhancements. Focus on making existing features feel extraordinary.

## Implement with Discipline

### Progressive enhancement is non-negotiable

Every technique must degrade gracefully. The experience without the enhancement must still be good.

```css
@supports (animation-timeline: scroll()) {
  .hero { animation-timeline: scroll(); }
}
```

```javascript
if ('gpu' in navigator && await navigator.gpu.requestAdapter()) { /* WebGPU */ }
else if (canvas.getContext('webgl2')) { /* WebGL2 fallback */ }
/* CSS-only fallback must still look good */
```

### Performance rules

- Hold the display's refresh rate. Simplify when frames drop visibly.
- Lazy-initialize heavy resources (WebGL contexts, WASM modules) only when near viewport.
- Pause off-screen rendering. Kill what you can't see.
- Test with CPU throttling and a mobile viewport, or on a mid-range device when one is available. Report which you used.

### Polish is the difference

The gap between "cool" and "extraordinary" is in the last 20% of refinement: the easing curve on a spring animation, the timing offset in a staggered reveal, the subtle secondary motion that makes a transition feel physical. Refine past the first version that works. Stop when the effect holds the display frame rate under the checked conditions, the fallback and reduced-motion paths work, and remaining issues are reported.

Do not:
- Ship effects that cause jank under the checked conditions.
- Use a new API without a functional fallback.
- Add sound without explicit user opt-in.
- Use technical ambition to mask weak design fundamentals. Fix those first with [Layout](layout.md) and [Typeset](typeset.md).
- Layer multiple competing extraordinary moments. Focus creates impact; excess creates noise.

## Verify the Result

- **The removal test**: Take it away. Does the experience feel diminished, or does nobody notice?
- **The device test**: Is it still smooth under CPU throttling and at a mobile viewport?
- **The context test**: Does this make sense for THIS brand and audience?

Inspect the result through [Critique](critique.md).
