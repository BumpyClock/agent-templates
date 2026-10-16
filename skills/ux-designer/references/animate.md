# Motion baseline

Use motion to explain feedback, state, and spatial relationships, or to support a deliberate expressive moment. Omit motion that slows the task or moves information the user is reading or acting on merely for style.

This guidance describes behavior rather than a platform API. Use the project's existing motion tokens and animation primitives; extend them rather than introducing a parallel system. Values below are starting points when project tokens are absent. Examples use pseudocode and equations: distances share one logical coordinate system, velocities use those units per second, and runtime-specific parameters require adaptation.

Make a recommendation and explain it briefly. Explore alternatives when requested or when a meaningful tradeoff remains. Implement once the direction is clear.

## Build sequence

Decide whether and why to animate before choosing properties or timing.

### 1. Should this animate?

| Frequency | Default |
| --- | --- |
| 100+ times/day (keyboard shortcuts, command palette toggle) | Instant updates or very brief feedback; do not delay the next action |
| Tens of times/day (hover effects, list navigation) | Fast, subtle feedback or none |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare / first-time (onboarding, success, celebration) | More expressive motion when appropriate |

Judge by frequency and task latency, not input method. Keyboard initiation alone does not disqualify motion. If motion would hinder the task, explain why and offer an instant state change or static affordance.

### 2. What is the purpose?

Identify the purpose before continuing:

- Feedback confirms an action was received.
- Spatial consistency shows where something came from or went.
- State indication makes a change legible.
- Continuity bridges a change that would otherwise appear abrupt.
- Explanation demonstrates how something works in marketing or onboarding.
- Delight adds expression to a rare or first-time moment.

If none applies, omit the animation. A decorative pointer-tracking effect may suit a marketing page, but should not move data in a banking graph.

### 3. Which properties?

Animate only the properties needed to convey the change. Prefer transforms and opacity where they avoid layout and repaint work; see [Runtime and performance](#runtime-and-performance) for exceptions and measurement. Avoid scaling entrances from zero.

### 4. What timing model?

Use retargetable transitions for simple state changes. Prefer springs when gesture momentum and velocity continuity matter; see [Spring behavior](#spring-behavior) for tuning.

Choose duration by distance, consequence, and frequency. When no project scale applies:

| Duration | Typical use |
| --- | --- |
| 100–150 ms | Micro-interactions |
| 150–250 ms | Standard UI and state changes |
| 200–400 ms | Modals and drawers |
| 300–400 ms | Page transitions |

Keep routine feedback under 300 ms by default. Larger surfaces or longer travel may need more time for continuity or a sense of weight, without blocking input. Prefer faster exits when dismissal clears the user's path.

Use deceleration for arrivals. One starting point is a cubic Bézier curve from (0, 0) to (1, 1), with control points (0.16, 1) and (0.3, 1). Deliberate actions may need asymmetric timing: a hold-to-confirm could fill over 2 seconds linearly, then reset over 200 ms with deceleration when released early.

### 5. How does it interrupt or exit?

Define what happens when the action repeats, reverses, or is cancelled before completion. Follow [Interruption and continuity](#interruption-and-continuity) for retargeting and [Spatial continuity](#spatial-continuity) for origins and exit paths.

### 6. What happens under reduced motion?

Apply the [Reduced Motion](accessibility.md#reduced-motion) contract with the initial implementation. Preserve visible feedback without requiring animation. Instant updates are valid.

For optional state, entrance, icon, or press treatments, see [Interaction Presets](interaction-visual-clarity.md#optional-motion-recipes).

## Immediate feedback and gesture tracking

- Show feedback as soon as a press begins. Commit activation on release according to the platform's control semantics, including cancellation when the user moves away. Use its movement tolerance and hit-target conventions.
- Remove unnecessary debounces, timers, transition waits, and gesture-recognition delays. Resolve competing gestures through the platform's recognition system; only incur double-tap disambiguation where double-tap is supported.
- For dragging, use the platform's movement threshold before committing to a direction. Then track input 1:1 within bounds, preserving the offset where the element was grabbed. Do not snap its center to the pointer or smooth direct tracking into lag.
- Retain gesture ownership when input leaves the element's bounds, and handle cancellation. Use continuous gesture updates rather than only completed-swipe notifications.
- Keep recent position samples with timestamps to estimate release velocity.
- Enable hover-only treatments only for input methods that support hover.

## Interruption and continuity

Interactive transitions must accept repeated or reversed input without waiting to finish. A draggable element should be grabbable mid-motion; a status cross-fade does not need a grab interaction, but must handle new state without blocking controls.

Retarget from the current displayed value rather than the previous target, which would cause a visible jump. Duration-based transitions and keyframe sequences can support interruption when the implementation preserves this state.

During autonomous spring retargeting, preserve current position and velocity where appropriate. During direct dragging, follow the input instead of blending its reversals into lag. At release, use the velocity handoff described below. Spring APIs do not guarantee this continuity automatically.

For two-dimensional motion, preserve both velocity components. Independent axis springs are one way to do this; a vector-aware solver can also maintain the required state.

## Spring behavior

Spring APIs expose different parameters. Some use mass, stiffness, and damping; others expose damping ratio and response, duration, or bounce. Map the intended behavior to the runtime's documented model.

- Damping ratio controls oscillation. A ratio of `1.0` is critically damped and is a useful starting point for non-bouncy UI. Ratios below `1.0` permit oscillation; lower values produce more bounce. Initial velocity can still carry the element past its target even at critical damping.
- Response, where exposed, controls the spring's timescale. Lower generally means snappier. Its definition is runtime-dependent and is not necessarily time to target or settling duration.

Reserve bounce mainly for momentum-driven releases. Restrained bounce may also suit an explicitly chosen expressive moment, but should not be the default for routine controls.

Illustrative starting points for a damping-ratio/response model:

| Interaction | Damping ratio | Response (seconds) |
| --- | --- | --- |
| Non-bouncy reposition | `1.0` | `0.4` |
| Rotation after a momentum-driven release | `0.8` | `0.4` |
| Drawer or sheet after a momentum-driven release | `0.8` | `0.3` |

These are not portable API configurations. Verify parameter definitions and tune the behavior rather than copying numbers between models.

## Release, momentum, and boundaries

### Velocity handoff

Pass the gesture's release velocity as the spring's initial velocity, converting to the runtime's documented units. Prefer absolute velocity when supported. Some APIs instead normalize velocity by the remaining displacement:

```text
relativeVelocity = releaseVelocity / (targetPosition − currentPosition)
```

Example: current position = 50 logical units, target = 150, and release velocity = 50 units/second → normalized velocity = 0.5 per second. Preserve the sign. When remaining displacement is zero or near zero, do not divide; use the runtime's supported handling for that case or an absolute-velocity representation.

### Momentum projection

For momentum-driven snapping, choose the target from the projected resting position rather than the release point. This lets a flick carry an element farther than a slow drag.

```text
ON gesture release:
    position ← current displayed position
    velocity ← estimated release velocity
    projectedPosition ← project resting position using the platform's deceleration model
    target ← nearest valid snap point to projectedPosition

    START spring:
        from = position
        to = target
        initial velocity = velocity
```

Prefer the platform's predicted resting position when available. Otherwise use a deceleration model consistent with the interaction and its coordinate/time units. Projection chooses the target; velocity handoff preserves continuity on the way there.

### Boundary resistance

Where elastic boundaries suit the interaction, increase resistance as the user drags beyond an edge. Continued, diminishing movement communicates the limit without making the control appear unresponsive.

One example resistance model:

```text
displayedOvershoot =
    (overshoot × extent × resistance)
    / (extent + resistance × |overshoot|)
```

- `overshoot`: signed distance beyond the boundary.
- `extent`: positive size of the interaction region along that axis.
- `resistance`: positive, dimensionless tuning factor; `0.55` is an example starting point.
- All distances use the same logical units. Add the displayed overshoot to the boundary position.

Prefer the platform's existing boundary-resistance behavior rather than layering a second model on top.

## Spatial continuity

- Reverse the entrance path by default for reversible open/close actions. Directional dismissal or navigation may use a different path when it communicates the action, such as swiping an item away.
- Anchor scaling or expansion to the trigger when that relationship matters, so users can see where a menu or popover came from.
- Choose easing and duration for each action independently of its spatial path. An exit need not mirror entrance timing.
- Make intermediate motion indicate the destination or outcome rather than following an arbitrary trajectory.

## Runtime and performance

Use existing animation primitives that support the required retargeting, sequencing, and dynamic values. Do not add a dependency for an effect the stack can express cleanly. Specify the properties that animate rather than implicitly animating every change.

Use shared-element or coordinated scene transitions when continuity across states is the point. Use scroll-driven motion only when the scroll relationship carries meaning, and provide a usable fallback. Content must remain visible and usable if animation initialization fails or motion is unavailable.

Use the runtime's display-synchronized scheduler. Avoid unnecessary per-frame layout work from dimensions, layout positions, or spacing; use visual transforms or layout-transition facilities when appropriate. Properties beyond transforms and opacity are valid when the effect justifies the cost and profiling supports it. Bound blur, filter, shadow, and custom rendering work to isolated regions.

Apply rendering preparation hints only when measurements show a benefit, shortly before animation and only to the affected properties or layers. Release temporary resources afterward. Transforms alone do not guarantee fast output.

Inspect fast motion on target displays for strobing, judder, and loss of readability. Adjust distance, timing, or treatment where needed. Subtle blur or stretch can convey speed in expressive motion, but must be evaluated for legibility and rendering cost.

## Accessibility and multimodal feedback

In addition to the reduced-motion contract applied in the build sequence, honor these independent preferences:

| Preference | Behavior |
| --- | --- |
| Reduced transparency | Increase surface opacity and remove background blur while preserving the theme |
| Increased contrast | Strengthen surface separation and necessary boundaries |

Avoid full-viewport moving backgrounds, slow looping oscillations, and abrupt brightness jumps. Fading a large moving surface is not a substitute for reducing nonessential spatial motion. Respect autoplay and sound preferences; stop nonessential loops when offscreen or hidden.

When combining motion, sound, and haptics:

- Make the cause clear. Trigger feedback on the relevant event, such as a toggle changing or an item snapping into place.
- Coordinate outputs with minimal perceptible skew. Use platform synchronization facilities where available and account for output latency.
- Reserve sound and haptics for meaningful events such as success, error, commit, or snap. Repeated feedback should not distract from the task.

## Verify

Use [Critique](critique.md) for output inspection and verification limits. Select devices, input methods, and states based on the affected motion and its risks.

- Each animation explains feedback, state, or a relationship, or supports the chosen expressive direction.
- Repeated input, reversal, interruption, and gesture cancellation behave correctly.
- Affected paths remain usable on the selected devices and input methods.
- Reduced motion meets the accessibility contract and preserves visible feedback and state changes.
- Expensive effects stay smooth and legible on target devices.
- Removing an animation would lose meaning or intentional character, not merely decoration.
