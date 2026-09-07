Performance is a feature. Identify the actual bottleneck for THIS interface, fix it, then measure. Don't optimize what isn't slow.

## Assess Performance Issues

Understand current performance and identify problems:

1. **Measure the affected behavior**. Select relevant metrics from these categories:
   - **Core Web Vitals**: LCP, INP, CLS scores
   - **Load time**: Time to interactive, first contentful paint
   - **Bundle size**: JavaScript, CSS, image sizes
   - **Runtime performance**: Frame rate, memory usage, CPU usage
   - **Network**: Request count, payload sizes, waterfall

2. **Identify bottlenecks**:
   - What's slow? (Initial load? Interactions? Animations?)
   - What's causing it? (Large images? Expensive JavaScript? Layout thrashing?)
   - How bad is it? (Perceivable? Annoying? Blocking?)
   - Who's affected? (All users? Mobile only? Slow connections?)

**CRITICAL**: Measure before and after. Premature optimization wastes time. Optimize what actually matters.

## Optimization Strategy

Select techniques that address the measured bottleneck within the requested scope.
The sections below are options, not a required checklist or authorization for infrastructure changes.

### Loading Performance

**Optimize Images**:
- Use modern formats (WebP, AVIF)
- Proper sizing (don't load 3000px image for 300px display)
- Lazy-load images outside the initial viewport.
- Keep likely LCP images eager, as described in [LCP guidance](https://web.dev/articles/optimize-lcp).
- Responsive images (`srcset`, `picture` element)
- Compress images (80-85% quality is usually imperceptible)
- Use CDN for faster delivery

Example for an initially visible hero that is likely to be the LCP element:

```html
<img
  src="hero.webp"
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
  sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
  loading="eager"
  fetchpriority="high"
  alt="Hero image"
/>
```

**Reduce JavaScript Bundle**:
- Code splitting (route-based, component-based)
- Tree shaking (remove unused code)
- Remove unused dependencies
- Lazy load non-critical code
- Use dynamic imports for large components

```javascript
// Lazy load heavy component
const HeavyChart = lazy(() => import('./HeavyChart'));
```

**Optimize CSS**:
- Remove unused CSS
- Critical CSS inline, rest async
- Minimize CSS files
- Use CSS containment for independent regions

**Optimize Fonts**:
- Use `font-display: swap` or `optional`
- Subset fonts (only characters you need)
- Preload critical fonts
- Use system fonts when appropriate
- Limit font weights loaded

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
  unicode-range: U+0020-007F; /* Basic Latin only */
}
```

**Optimize Loading Strategy**:
- Critical resources first (async/defer non-critical)
- Preload critical assets
- Prefetch likely next pages
- Service worker for offline/caching
- HTTP/2 or HTTP/3 for multiplexing

### Rendering Performance

**Avoid Layout Thrashing**:
```javascript
// Reads after writes can force repeated layout work.
elements.forEach(el => {
  const height = el.offsetHeight;
  el.style.height = `${height * 2}px`;
});

// Complete reads before writes to avoid forced layout between elements.
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = `${heights[i] * 2}px`;
});
```

**Optimize Rendering**:
- Use CSS `contain` property for independent regions
- Minimize DOM depth (flatter is faster)
- Reduce DOM size (fewer elements)
- Use `content-visibility: auto` for long lists
- Virtual scrolling for very long lists (react-window, TanStack Virtual)

**Reduce Paint & Composite**:
- Use `transform` and `opacity` for reliable movement, but allow blur, filters, masks, clip paths, shadows, and color shifts when they create meaningful polish
- Avoid casual animation of layout-driving properties (`width`, `height`, `top`, `left`, margins)
- Use `will-change` sparingly for known expensive operations
- Bound expensive paint areas for blur/filter/shadow effects (smaller and isolated is faster)

### Animation Performance

**Property Cost**:

Transform and opacity can avoid layout and paint work. They do not guarantee GPU acceleration or smooth output.
Measure the affected browser stages with the [animation performance guide](https://web.dev/articles/animations-guide).

```css
/* These properties can permit compositor-only updates. */
.animated {
  transform: translateX(100px);
  opacity: 0.5;
}

/* Changes to geometry can require layout and paint. */
.animated {
  left: 100px;
  width: 300px;
}
```

**Frame Budget**:
- Match the frame budget to the target refresh rate, about 16.7ms at 60Hz or 8.3ms at 120Hz.
- Use `requestAnimationFrame` for JS animations
- Debounce/throttle scroll handlers
- Use CSS animations when possible
- Avoid long-running JavaScript during animations

**Intersection Observer**:
```javascript
// Efficiently detect when elements enter viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element is visible, lazy load or animate
    }
  });
});
```

### React/Framework Optimization

**React-specific**:
- Use the React DevTools Profiler to identify expensive updates.
- Before manual memoization, check whether React Compiler already handles the affected code.
- For costly parent-driven updates with unchanged props, consider `memo()`.
- Use `useMemo()` to cache expensive calculation results when measurements justify it.
- Use `useCallback()` when stable function identity benefits a memoized child or Hook dependency.
- Keep inline functions unless function identity causes a measured problem or affects required behavior.
- Virtualize long lists
- Code split routes

Follow [React memoization guidance](https://react.dev/reference/react/useCallback#should-you-add-usecallback-everywhere) for the distinction between cached results and function identity.

**Framework-agnostic**:
- Minimize re-renders
- Debounce expensive operations
- Memoize computed values
- Lazy load routes and components

### Network Optimization

**Reduce Requests**:
- Combine small files
- Use SVG sprites for icons
- Inline small critical assets
- Remove unused third-party scripts

**Optimize APIs**:
- Use pagination (don't load everything)
- GraphQL to request only needed fields
- Response compression (gzip, brotli)
- HTTP caching headers
- CDN for static assets

**Optimize for Slow Connections**:
- Adaptive loading based on connection (navigator.connection)
- Optimistic UI updates
- Request prioritization
- Progressive enhancement

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP < 2.5s)
- Optimize hero images
- Inline critical CSS
- Preload key resources
- Use CDN
- Server-side rendering

### Interaction to Next Paint (INP < 200ms)
- Break up long tasks
- Defer non-critical JavaScript
- Use web workers for heavy computation
- Reduce JavaScript execution time

### Cumulative Layout Shift (CLS < 0.1)
- Set dimensions on images and videos
- Don't inject content above existing content
- Use `aspect-ratio` CSS property
- Reserve space for ads/embeds
- Avoid animations that cause layout shifts

```css
/* Reserve space for image */
.image-container {
  aspect-ratio: 16 / 9;
}
```

## Performance Monitoring

**Available tool options**:
- Chrome DevTools (Lighthouse, Performance panel)
- WebPageTest
- Core Web Vitals (Chrome UX Report)
- Bundle analyzers (webpack-bundle-analyzer)
- Performance monitoring (Sentry, DataDog, New Relic)

Use existing tools and telemetry when available and relevant. Do not add monitoring services as part of this checklist.

**Metric options**:
- LCP, INP, CLS (Core Web Vitals; INP replaced FID in March 2024)
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Total Blocking Time (TBT)
- Bundle size
- Request count

Select device and network conditions that represent the affected users and measured bottleneck.
Use available hardware or suitable simulation, and report limits that affect the conclusion.

**NEVER**:
- Optimize without measuring (premature optimization)
- Sacrifice accessibility for performance
- Break functionality while optimizing
- Use `will-change` everywhere (creates new layers, uses memory)
- Lazy load above-fold content
- Optimize micro-optimizations while ignoring major issues (optimize the biggest bottleneck first)
- Forget about mobile performance (often slower devices, slower connections)

## Verify Improvements

Compare relevant before-and-after measurements under comparable conditions.
Use [Critique](critique.md) for affected-output inspection, repeat checks, and verification limits.
Use existing field telemetry when it can resolve a relevant uncertainty.
Check devices, network conditions, and functional states that the optimization can affect.

Stop when the scoped performance result is supported by evidence and relevant regression checks pass.
Report any unresolved bottleneck or unavailable measurement rather than expand the task automatically.
