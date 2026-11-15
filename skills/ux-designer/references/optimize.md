# Optimize

This file covers web interfaces. For native apps, use the platform profiler and apply the same loop.

Measure the affected behavior, find the bottleneck, fix it, then measure again under the same conditions. Don't optimize what isn't slow. When no tool can measure the behavior, make only changes with a clear static cause, such as an oversized image or an image without dimensions, and report the missing measurement.

## Assess Performance Issues

Understand current performance and identify problems:

1. **Measure the affected behavior**. Select relevant metrics from these categories:
   - **Core Web Vitals**: LCP, INP, CLS scores
   - **Load time**: First Contentful Paint, Total Blocking Time
   - **Bundle size**: JavaScript, CSS, image sizes
   - **Runtime performance**: Frame rate, memory usage, CPU usage
   - **Network**: Request count, payload sizes, waterfall

2. **Identify bottlenecks**:
   - What's slow? (Initial load? Interactions? Animations?)
   - What's causing it? (Large images? Expensive JavaScript? Layout thrashing?)
   - How bad is it? (Perceivable? Annoying? Blocking?)
   - Who's affected? (All users? Mobile only? Slow connections?)

## Optimization Strategy

Select techniques that address the measured bottleneck within the requested scope.
The sections below are options, not a required checklist. Infrastructure and architecture changes, such as a CDN, service worker, server-side rendering, or API redesign, are outside UI scope. Recommend them in the report instead of implementing them.

### Loading Performance

**Optimize Images**:
- Size images for their display size, in modern formats, with responsive sources (`srcset`, `picture`).
- Lazy-load images outside the initial viewport.
- Keep likely LCP images eager, as described in [LCP guidance](https://web.dev/articles/optimize-lcp).

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

**JavaScript, CSS, and fonts**:
- Split and lazy-load code that the initial view does not need. Remove unused dependencies and CSS.
- Load only the font weights in use. Use `font-display: swap` or `optional`, and preload a critical font.
- Subset a font only by shipping a subset file. `unicode-range` limits which characters use a face. It does not shrink the file.

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

**Rendering**:
- Use `content-visibility: auto` or virtual scrolling for long lists.
- Use CSS `contain` for independent regions.
- Bound expensive paint areas for blur, filter, and shadow effects. Smaller, isolated areas cost less.
- Match the frame budget to the target refresh rate, about 16.7ms at 60Hz or 8.3ms at 120Hz. Avoid long-running JavaScript during animation.
- For scroll-linked work, prefer passive listeners, `IntersectionObserver`, or scroll-driven CSS over scroll handlers.

For animation property cost, `will-change`, and runtime choices, follow [Runtime and performance](animate.md#runtime-and-performance).

### React/Framework Optimization

**React-specific**:
- Use the React DevTools Profiler to identify expensive updates.
- Before manual memoization, check whether React Compiler already handles the affected code.
- For costly parent-driven updates with unchanged props, consider `memo()`.
- Use `useMemo()` to cache expensive calculation results when measurements justify it.
- Use `useCallback()` when stable function identity benefits a memoized child or Hook dependency.
- Keep inline functions unless function identity causes a measured problem or affects required behavior.

Follow [React memoization guidance](https://react.dev/reference/react/useCallback#should-you-add-usecallback-everywhere) for the distinction between cached results and function identity.

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP < 2.5s)
- Prioritize the LCP resource: correct size, eager loading, `fetchpriority="high"`.
- Remove render-blocking work ahead of it.

### Interaction to Next Paint (INP < 200ms)
- Break up long tasks and defer non-critical JavaScript.
- Move heavy computation to a web worker.

### Cumulative Layout Shift (CLS < 0.1)
- Set dimensions or `aspect-ratio` on images, videos, and embeds.
- Don't inject content above existing content.
- Avoid animations that shift layout.

## Performance Monitoring

**Available tool options**:
- Chrome DevTools (Lighthouse, Performance panel)
- WebPageTest
- Core Web Vitals (Chrome UX Report)
- Bundle analyzers (webpack-bundle-analyzer)
- Existing performance monitoring, when the project has it

Use existing tools and telemetry when available and relevant. Do not add monitoring services.

**Metric options**:
- LCP, INP, CLS (Core Web Vitals; INP replaced FID in March 2024)
- First Contentful Paint (FCP)
- Total Blocking Time (TBT)
- Bundle size
- Request count

Select device and network conditions that represent the affected users and measured bottleneck.
Use available hardware or suitable simulation, and report limits that affect the conclusion.

Do not trade accessibility or working functionality for performance.

## Verify Improvements

Compare relevant before-and-after measurements under comparable conditions.
Use [Critique](critique.md) for affected-output inspection, repeat checks, and verification limits.
Use existing field telemetry when it can resolve a relevant uncertainty.
Check devices, network conditions, and functional states that the optimization can affect.

Stop when the scoped performance result is supported by evidence and relevant regression checks pass.
Report any unresolved bottleneck or unavailable measurement rather than expand the task automatically.
