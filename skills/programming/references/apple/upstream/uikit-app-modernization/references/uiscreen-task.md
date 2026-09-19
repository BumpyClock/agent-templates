# Task: UIScreen.main Modernization

## Overview

`UIScreen.main` reflects a single-window assumption and is now deprecated for window-relative use. Modern iOS supports multiple windows (iPad multitasking, Stage Manager, iPhone Mirroring), where `UIScreen.main` may not represent the display the calling code is rendering on.

**Detection patterns:**

- `UIScreen.main.scale` / `UIScreen.mainScreen.scale`
- `UIScreen.main.bounds` / `UIScreen.mainScreen.bounds`
- `UIScreen.main.nativeBounds` / `UIScreen.mainScreen.nativeBounds`
- `UIScreen.main.nativeScale` / `UIScreen.mainScreen.nativeScale`
- `UIScreen.main.traitCollection` / `UIScreen.mainScreen.traitCollection`
- `UIScreen.main.coordinateSpace` / `UIScreen.mainScreen.coordinateSpace`
- `UIScreenBrightnessDidChangeNotification` with `UIScreen.main`/`UIScreen.mainScreen` as object

Other sites to inspect within the requested migration:

- **Nil-screen fallbacks** — `screen == nil ? [UIScreen mainScreen] : screen`, `self.window.screen ?: [UIScreen mainScreen]`, `screen ?? UIScreen.main`. The `[UIScreen mainScreen]` fallback IS a target site, even when wrapped in a nil check. See the [Fallback Paths](#fallback-paths) section below for the full handling.
- **Private helpers whose only `UIScreen` use is "incidental"** — e.g., a `-(CGFloat)pixelWidth` helper that internally reads `[UIScreen mainScreen].scale`. The helper is the deprecation target, even if the caller looks unrelated to display rendering.
- **Cached `dispatch_once` / static-let / lazy-var helpers** that read `UIScreen.main` once at first call and freeze the value (e.g., `mainScreenScale()`, `isLargeDevice()`, `isRetina()`). The helper itself is the target.
- `UIScreen.main` passed to another function, such as `MapsIdiomIsMac(UIScreen.mainScreen)` or `UIRoundToScreenScale(value, UIScreen.mainScreen.scale)`. Follow the same context and caller-migration rules as a direct use.
- Hardware-specific properties such as `nativeScale` without an available screen context. Report an unresolved lifecycle or interface decision rather than inventing a replacement or forcing a diff.

For scope, supporting edits, and unchanged sites, use the [migration contract](../guide.md#core-principles).

Inspect the actual type hierarchy and available inputs. A filename such as `Manager` or `ViewModel` is not evidence that a new overload is needed.

---

## Pattern 1: UIScreen.main.scale → traitCollection.displayScale

**Intent:** Get display scale for pixel-perfect rendering (2x, 3x).

These rules apply to any `UIScreen.main.traitCollection` access, not just `.displayScale`. The context (view vs non-view) determines the approach, regardless of which trait is being accessed.

`UITraitCollection.current` retains the shared-display assumption of `UIScreen.main`; it is not a context-aware replacement.
Use it only inside a necessary deprecated bridge that preserves an existing caller contract while callers migrate to explicit context.

Honor an explicitly requested context source unless evidence shows it cannot meet the contract; surface that conflict rather than silently substituting another source.
Otherwise prefer an existing parameter, then the consumer's local context, before traversing a longer object chain.
Use an existing scalar scale parameter when it already expresses the needed value; do not change its type just to match an example.

| Context | Replacement |
|---------|-------------|
| **SwiftUI `View` struct** | `@Environment(\.displayScale) private var displayScale` |
| UIView/UIViewController instance method | `self.traitCollection.displayScale` |
| Correct view, trait collection, or scale already supplied | Use that input, including in non-view classes |
| Internal helper with all callers available for coordinated migration | Change the signature and callers together; no deprecated wrapper is needed |
| Supported external API, protocol/override contract, or independently migrated callers | Add an explicit-context API and preserve a required compatibility bridge |
| Test code | Use the object-under-test's `traitCollection` |

For a new trait-dependent API, `traitCollection: UITraitCollection` is the example shape; preserve a narrower established contract or an explicitly requested signature.
When adding a parameter, preserve existing parameter order and trailing-closure usage.
Move callers with the correct context to the new path. A wrapper alone does not remove their shared-screen assumption.

### Two-part pattern: API swap + invalidation

For cached values, pair the API replacement with the refresh mechanism described in [Invalidation analysis](#invalidation-analysis).

```swift
// COMPLETE — replacement + invalidation (both parts required)
class MyCell: UITableViewCell {
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        imageView.layer.contentsScale = traitCollection.displayScale
        registerForTraitChanges([UITraitDisplayScale.self]) { (self: MyCell, previousTraitCollection) in
            self.imageView.layer.contentsScale = self.traitCollection.displayScale
        }
    }
}
```

> **ObjC equivalent:** `[self registerForTraitChanges:@[UITraitDisplayScale.class] withHandler:^(typeof(self) self, UITraitCollection *previousTraitCollection) { ... }]` or use `withAction:@selector(methodName)` for a separate method.

Use `registerForTraitChanges` where supported by the deployment target.
Preserve a supported older-target observation path when needed rather than silently raising the minimum OS.

### Deprecate-and-forward pattern (non-view classes)

Use this pattern only when the decision table above establishes a compatibility obligation.
It has three parts: deprecation, an explicit-context API, and forwarding from the retained entry point.
The examples assume consumers that cannot all migrate in the same change.

The pattern can apply to:
- Instance methods on non-view classes
- Static/class methods (`static func`, `class func`, ObjC class methods)
- **Static computed properties** (e.g., `static var onePixel: CGFloat`) — deprecate the property, introduce a new `static func` with `traitCollection:` parameter
- **Computed properties** (e.g., `var displayScale: CGFloat`) — deprecate the property, introduce a new method with `traitCollection:` parameter
- **Protocol extensions** (e.g., `extension MyProtocol { func renderBadge() }`) — deprecate the existing method in the extension, introduce a new method with `traitCollection:` parameter
- **Free functions** — deprecate the original, introduce a new function with `traitCollection:` parameter

For static properties or protocol extensions where adding a parameter changes the API shape (property → function), that is expected and correct. The old property/method stays as the deprecated wrapper.

Place compatibility handling at the supported boundary that needs it.
Update a private helper and its callers together when possible rather than deprecating the helper for hypothetical future callers.
Thread the actual context far enough through the call chain to remove the shared-state dependency; do not add parameters to unaffected APIs.

**Swift (do NOT delete the old method when adding a new overload):**

```swift
// WRONG — old method removed, only new method left (breaks ABI for out-of-diff callers):
class ImageProcessor: NSObject {
    func generateThumbnail(for image: UIImage, traitCollection: UITraitCollection) -> UIImage {
        let scale = traitCollection.displayScale
        return processImage(image, scale: scale)
    }
    // ← old generateThumbnail(for:) was deleted — out-of-diff callers can no longer compile,
    //   and there is no deprecation signal pointing them to the new API
}

// RIGHT — full deprecate-and-forward (all three parts mandatory, OLD METHOD KEPT):
class ImageProcessor: NSObject {
    @available(*, deprecated, message: "use generateThumbnail(for:traitCollection:) instead")
    func generateThumbnail(for image: UIImage) -> UIImage {
        return generateThumbnail(for: image, traitCollection: .current)
    }

    func generateThumbnail(for image: UIImage, traitCollection: UITraitCollection) -> UIImage {
        let scale = traitCollection.displayScale
        return processImage(image, scale: scale)
    }
}
```

**Swift initializers — the old initializer must remain as a deprecated wrapper:**

```swift
// WRONG — old init removed:
class GlyphButton: UIButton {
    init(glyph: Glyph, traitCollection: UITraitCollection) { ... }
    // ← old init(glyph:) was deleted — callers that don't yet pass traitCollection break
}

// RIGHT — old init kept as deprecated wrapper:
class GlyphButton: UIButton {
    @available(*, deprecated, message: "use init(glyph:traitCollection:) instead")
    convenience init(glyph: Glyph) {
        self.init(glyph: glyph, traitCollection: .current)
    }

    init(glyph: Glyph, traitCollection: UITraitCollection) { ... }
}
```

**Objective-C:**

In headers (or above the implementation when no header exists), the old method's declaration MUST carry a real deprecation attribute — not just a comment. Use `__attribute__((deprecated("use newMethod instead")))`. A `// Deprecated:` comment alone does not generate compiler warnings for callers and is NOT sufficient.

```objc
// In ThumbnailGenerator.h — preferred default when UIKit/Availability headers are in scope:
@interface ThumbnailGenerator : NSObject
- (UIImage *)generateThumbnailForURL:(NSURL *)url __attribute__((deprecated("use generateThumbnailForURL:traitCollection: instead")));
- (UIImage *)generateThumbnailForURL:(NSURL *)url traitCollection:(UITraitCollection *)traitCollection;
@end

// In ThumbnailGenerator.m:
@implementation ThumbnailGenerator

- (UIImage *)generateThumbnailForURL:(NSURL *)url {
    return [self generateThumbnailForURL:url traitCollection:[UITraitCollection currentTraitCollection]];
}

- (UIImage *)generateThumbnailForURL:(NSURL *)url traitCollection:(UITraitCollection *)traitCollection {
    CGFloat scale = traitCollection.displayScale;
    return [self renderThumbnail:url scale:scale];
}

@end
```

When an implementation-only declaration still has a demonstrated compatibility obligation, place its deprecation attribute with the declaration:

```objc
- (UIImage *)renderBadge __attribute__((deprecated("use renderBadgeWithTraitCollection: instead"))); {
    return [self renderBadgeWithTraitCollection:[UITraitCollection currentTraitCollection]];
}
```

**Objective-C class methods (`+` methods) — same pattern, not inline:**

```objc
@interface BadgeAnimationGenerator : NSObject
+ (CAAnimation *)animation __attribute__((deprecated("use animationWithTraitCollection: instead")));;
+ (CAAnimation *)animationWithTraitCollection:(UITraitCollection *)traitCollection;
@end

@implementation BadgeAnimationGenerator

+ (CAAnimation *)animation {
    return [self animationWithTraitCollection:[UITraitCollection currentTraitCollection]];
}

+ (CAAnimation *)animationWithTraitCollection:(UITraitCollection *)traitCollection {
    CGFloat scale = traitCollection.displayScale;
    // ... use scale ...
}

@end
```

**Forwarding-chain consistency:** When the new overload calls other methods on `self` or on wrapped/sub-objects, those calls must also use the `traitCollection:`-accepting version — not the deprecated version. A new method that internally calls `object.deprecatedMethod` instead of `object.deprecatedMethod(traitCollection: traitCollection)` silently ignores the passed `traitCollection`. Verify every call site within the new method's body.

## Invalidation analysis

Determine whether the scale-derived result is cached or recomputed when the relevant display context changes.
A local variable can still produce a cached image, layer property, or constraint.
If an existing lifecycle or observation path already refreshes that value, preserve it.
Otherwise register for the relevant trait and recalculate the cached result.

**Registration pattern — register in init/setup, specify `UITraitDisplayScale`:**

```swift
registerForTraitChanges([UITraitDisplayScale.self]) { (self: MyView, previousTraitCollection) in
    // Recalculate the cached value(s)
}
```

> **ObjC:** `[self registerForTraitChanges:@[UITraitDisplayScale.class] withHandler:^(typeof(self) self, UITraitCollection *previousTraitCollection) { ... }]`. Alternative: use `withAction:@selector(methodName)` when recalculation is in a separate method.

The trait-change handler must cause the affected cached property to be recalculated.
Call an existing update method or update the property directly.
`setNeedsLayout` or `setNeedsDisplay` is sufficient only when the resulting layout or drawing path actually recomputes that value.

```swift
// directly update the cached property:
registerForTraitChanges([UITraitDisplayScale.self]) { (cell: MyCell, previousTraitCollection) in
    cell.layer.borderWidth = 1.0 / cell.traitCollection.displayScale
}
```

### Quick-reference: cached vs transient

Use these indicators to locate stored results and their refresh paths.

**Cached (needs a refresh path):**
- Assigned to a layer property (`contentsScale`, `borderWidth`, `rasterizationScale`, `lineWidth`)
- Assigned to a constraint constant
- Stored in an ivar or property (`_cachedScale`, `_hairlineWidth`)
- Used to generate an image that is then stored (`button.setImage(...)`, `imageView.image = ...`)
- Generated images retained by buttons, icons, badges, snapshots, or thumbnails. Even if a method computes a fresh image, its consumer may keep that result across display changes.
- Inside a setup method (`init`, `viewDidLoad`, `awakeFromNib`, `configure...`, `setup...`, `update...Images`) that sets scale-dependent values on views — even if the method computes fresh, its output is stored
- Used to compute a value passed to `CGAffineTransform`, `UIBezierPath`, or drawing code called once during setup

**Existing recalculation or transient use (may need no extra registration):**
- Inside `layoutSubviews`, `drawRect:`, `updateConstraints`, or `viewIsAppearing:` when the supported lifecycle refreshes the affected value
- Inside a private helper called by that refresh path
- Used in a local variable that doesn't escape the current scope and the method runs on-demand (not just once at setup)
- Inside a method triggered by user interaction (`@IBAction`, gesture handler) — runs fresh each time

When the lifetime is unclear, inspect the caller and refresh path rather than adding redundant observers by default.

### Examples: when registration IS needed

**Cached in init:**
```swift
override init(frame: CGRect) {
    super.init(frame: frame)
    separatorLine.lineWidth = 1.0 / traitCollection.displayScale
    registerForTraitChanges([UITraitDisplayScale.self]) { (self: MyView, previousTraitCollection) in
        self.separatorLine.lineWidth = 1.0 / self.traitCollection.displayScale
    }
}
```

**Cached image:**
```swift
func updateThemeButtonImages() {
    let scale = traitCollection.displayScale
    let renderer = UIGraphicsImageRenderer(size: size)
    cachedButtonImage = renderer.image { context in /* ... */ }
    button.setImage(cachedButtonImage, for: .normal)
}

// In init or setup — handler INVOKES the existing method, never duplicates its body:
registerForTraitChanges([UITraitDisplayScale.self]) { (self: MyView, previousTraitCollection) in
    self.updateThemeButtonImages()
}
```

Reuse the update method rather than copying its body into the handler.
The Objective-C equivalent can use `withAction:@selector(updateThemeButtonImages)`.

---

## Pattern 2: UIScreen.main.bounds → view.bounds

**Intent:** Get available space for layout or dimensions.

Do **NOT** replace with `self.bounds` when the code is asking "how big is the display area." The local view's bounds represent its own size, not the available screen/window space.

Do **NOT** use `?? 0` or `?? .zero` as fallback for window bounds. Refactor the API to accept size as a parameter, or move to a lifecycle point where window is guaranteed.

| Context | Replacement |
|---------|-------------|
| UIView/UIViewController in `loadView` or `init` (initial frame) | `CGRectZero` / `.zero`. **Never** access `self.view` in `loadView` — causes infinite recursion. Auto Layout resizes before display. |
| UIViewController in safe lifecycle methods | `self.view.bounds` |
| UIView in safe lifecycle methods | `self.superview.bounds` |
| UIView/UIViewController in unsafe methods | Move code to `viewIsAppearing` for view controllers and `layoutSubviews` for views or later |
| Non-view class / static / free function | Pass `bounds: CGRect`; retain the original only when the compatibility decision requires it |

> **`CGRectZero` is ONLY for `loadView`/`init`.** Substituting `CGRectZero` for `[UIScreen mainScreen].bounds` in any other context (instance methods past `viewDidLoad`, layout helpers, sizing computations) produces a zero-sized layout that breaks the feature. If the call site is in a safe lifecycle method, use `self.view.bounds` (view controller) or `self.superview.bounds` (view). If `view` may be nil, move the code or ask the user — but never substitute `CGRectZero` outside `loadView`/`init`.

Safe view controller methods (view hierarchy guaranteed): `viewIsAppearing`, `viewDidAppear`, `viewWillDisappear`.
Unsafe view controller methods (view may not be in a view hierarchy): `init`, `loadView`, `viewDidLoad`, `viewWillAppear`.

**Non-view class (deprecated wrapper):**

```swift
class LayoutHelper {
    @available(*, deprecated, message: "Pass bounds from the caller's window or view context")
    static func calculateOptimalWidth() -> CGFloat {
        // TODO: Modernization - Callers should pass bounds from their window/view context
        return calculateOptimalWidth(in: UIScreen.main.bounds)
    }

    static func calculateOptimalWidth(in bounds: CGRect) -> CGFloat {
        return bounds.width * 0.9
    }
}
```

> The deprecated wrapper keeps `UIScreen.main.bounds` as a temporary bridge. **Never** replace the bridge with `UIApplication.shared.connectedScenes` or other shared state references.

---

## Pattern 3: UIScreen.main.nativeScale — NO trait-collection equivalent

`nativeScale` is the physical pixel density of the hardware display; `displayScale`/`scale` is the logical scale factor (2x, 3x). There is no trait-collection equivalent — it must come from a screen object. Same applies to `nativeBounds` and `coordinateSpace`.

```swift
// Before
let nativeScale = UIScreen.main.nativeScale
// After
let nativeScale = window.windowScene.screen.nativeScale
```

**Always use `window.windowScene.screen`**, not `window.screen`. In multi-scene environments, `window.screen` may not reflect the correct display — `windowScene.screen` ensures the screen is resolved through the scene's connection to its display. This applies to **all** screen properties accessed via window: `nativeScale`, `nativeBounds`, `scale`, `bounds`, `coordinateSpace`. Using `self.view.window.screen.nativeScale` instead of `self.view.window.windowScene.screen.nativeScale` is always wrong.

---

## Pattern 4: Keyboard Notification Coordinate Space

**Intent:** Convert keyboard frame from notification using a coordinate space.

When handling keyboard notifications (`UIKeyboardWillShowNotification`, `UIKeyboardWillChangeFrameNotification`, etc.), the notification's `object` is the screen posting the notification. Use `notification.object` to get the coordinate space — **never** substitute `self.view.window.screen` or `self.view.window.windowScene.screen`.

```objc
// WRONG — indirect path, may be nil:
CGRect keyboardFrame = [notification.userInfo[UIKeyboardFrameEndUserInfoKey] CGRectValue];
CGRect converted = [self.view.window.screen.coordinateSpace convertRect:keyboardFrame toCoordinateSpace:self.view];

// RIGHT — notification.object IS the screen:
CGRect keyboardFrame = [notification.userInfo[UIKeyboardFrameEndUserInfoKey] CGRectValue];
CGRect converted = [((UIScreen *)notification.object).coordinateSpace convertRect:keyboardFrame toCoordinateSpace:self.view];
```

This is the correct approach because:
1. `notification.object` is guaranteed to be the screen — it's always available
2. `self.view.window` may be nil if the view isn't in the hierarchy yet
3. In multi-screen environments, `notification.object` is the specific screen, not necessarily the main screen

---

## Special Cases

### Free Functions and Cached Helpers

For a free function or cached helper, migrate its callers using the decision table above.
If the migration is blocked, one useful TODO can record the shared assumption and intended replacement at the owner; do not repeat it mechanically at every call site.

```swift
// TODO: Modernization - This cached helper assumes a single screen scale. Convert callers to pass
// traitCollection.displayScale from their view/VC context. Once all callers are migrated, remove this function.
func mainScreenScaleFactor() -> CGFloat {
    // ... cached dispatch_once returning UIScreen.main.scale
}

// Existing caller, retained only while migration is deferred:
self.layer.contentsScale = mainScreenScaleFactor()
```

For device-type cached helpers (`isLargeDevice()`, `isCompactDevice()`): the TODO must explain that with flexible windowing and iPhone Mirroring, cached screen-size checks no longer reflect the active window's dimensions. Call sites should use size classes or window bounds.

### Notification Observers

When migrating `UIScreen.mainScreen` in notification observers, the TODO must note that the screen can change when a window moves between displays. The observation needs to track screen changes and re-subscribe.

```objc
// TODO: Modernization - UIScreen.mainScreen assumes a fixed screen. When a window moves between
// displays, the screen changes. Track the window's current screen, observe brightness on that
// screen, and re-subscribe when the screen changes (e.g., via windowScene.screen updates).
[[NSNotificationCenter defaultCenter] addObserver:self
    selector:@selector(brightnessChanged:)
    name:UIScreenBrightnessDidChangeNotification
    object:UIScreen.mainScreen];
```

### Fallback Paths

When code already has `self.window.screen ?: UIScreen.mainScreen`, keep the window-based access (correct path). Only address the fallback:

```objc
// TODO: Modernization - The UIScreen.mainScreen fallback assumes a single display. Consider
// what should happen when self.window is nil (e.g., return early or defer until window is set).
UIScreen *screen = self.window.screen ?: UIScreen.mainScreen;
```

When code already has `self.traitCollection.displayScale` with a `UIScreen.mainScreen.scale` fallback (e.g., `self.traitCollection.displayScale ?: UIScreen.mainScreen.scale`), **remove the entire fallback and use just `self.traitCollection.displayScale`**. The fallback is not needed as local trait collections provide their own fallback value.

```objc
// Before — ternary fallback:
CGFloat scale = self.traitCollection.displayScale ?: UIScreen.mainScreen.scale;

// RIGHT — remove fallback entirely:
CGFloat scale = self.traitCollection.displayScale;
```

When removing a UIScreen fallback where `self.traitCollection` is available, remove the entire fallback — do NOT substitute `1.0`, `?: 1`, or any other literal or invented value. If the original code was `self.traitCollection.displayScale ?: UIScreen.mainScreen.scale`, the correct replacement is `self.traitCollection.displayScale` — not `self.traitCollection.displayScale ?: 1`. The replacement must not introduce a fallback that was not present in the original non-UIScreen code path.

**Magic-number substitution is forbidden across the board.** When the original fallback is guarding something other than scale (e.g., a layout constant, a default width, a layout-driven offset), do NOT collapse the expression by substituting an invented literal for the screen-derived value. Examples of forbidden replacements:

```objc
// WRONG — invented magic number replaces the screen-derived value:
// Original: CGFloat width = useFullWidth ? [UIScreen mainScreen].bounds.size.width : 262.f;
CGFloat width = useFullWidth ? 262.f : 262.f;  // ← magic number invented to remove UIScreen

// WRONG — CGRectZero substituted for screen bounds outside loadView/init:
// Original: CGRect frame = [UIScreen mainScreen].bounds;
CGRect frame = CGRectZero;  // ← only safe in loadView/init; produces zero-sized layout elsewhere

// RIGHT — preserve the surrounding control structure with the correct context:
CGFloat width = useFullWidth ? self.view.window.bounds.size.width : 262.f;
```

If the surrounding code was using the screen as a way to get "available space," the correct replacement is `self.view.bounds` in view controllers and `self.superview.bounds` in views. If you genuinely cannot determine a safe replacement, ask the user — never substitute a magic number to make the deprecation go away.

When the original code has a ternary where **both branches compute the same semantic value** (display scale) via different accessors — e.g., `self.window.screen ? self.window.screen.scale : UIScreen.mainScreen.scale` — and `self.traitCollection.displayScale` provides that same value correctly, simplify the entire expression to `self.traitCollection.displayScale`. The ternary's purpose was to avoid the UIScreen fallback when a better source was available; `traitCollection.displayScale` serves that purpose directly without the nil-check.

**Important distinction:** This full-expression simplification applies only when both branches compute the **same value** (e.g., both get display scale). When the primary path computes a **different value** or uses a different public API (e.g., `window.screen.nativeScale` vs `UIScreen.mainScreen.scale`), preserve the primary path and only replace the UIScreen fallback.

### UIWindow Initialization

Replace `UIWindow(frame: UIScreen.main.bounds)` **only** when a `windowScene` is locally available. Otherwise add a TODO — never fetch from `connectedScenes`.

```swift
// windowScene in scope → safe to replace
func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options: UIScene.ConnectionOptions) {
    guard let windowScene = scene as? UIWindowScene else { return }
    window = UIWindow(windowScene: windowScene)
}

// windowScene not available → add TODO
// TODO: Modernization - Replace with UIWindow(windowScene:) by accepting a UIWindowScene parameter
// or moving initialization to scene(_:willConnectTo:options:).
private let window: UIWindow = UIWindow(frame: UIScreen.main.bounds)
```

### SwiftUI

Replace `UIScreen.main.bounds` with `GeometryReader`. For display scale, use `@Environment(\.displayScale)`. If GeometryReader adoption is too complex, add a TODO.

```swift
// In a SwiftUI View struct:
@Environment(\.displayScale) private var displayScale
// ... in body:
imgRenderer.scale = displayScale
```

### UIGraphicsImageRendererFormat(for: UIScreen.main.traitCollection)

This pattern passes a `traitCollection` to a format initializer. **Never remove the `for:` argument — always pass a trait collection through it.**

Use an available local trait collection, or add a context parameter to the enclosing method.
The following examples retain a wrapper for a supported caller contract; migrate internal-only signatures directly.

```swift
// Deprecate-and-forward on the enclosing method:
@available(*, deprecated, message: "use renderBadge(traitCollection:) instead")
func renderBadge() -> UIImage {
    return renderBadge(traitCollection: .current)
}

func renderBadge(traitCollection: UITraitCollection) -> UIImage {
    let format = UIGraphicsImageRendererFormat(for: traitCollection)
    // ...
}
```

```objc
// ObjC equivalent (real deprecation attribute on the declaration — prefer API_DEPRECATED_WITH_REPLACEMENT):
- (UIImage *)renderBadge __attribute__((deprecated("use renderBadgeWithTraitCollection: instead")));
- (UIImage *)renderBadgeWithTraitCollection:(UITraitCollection *)traitCollection;

// In the implementation:
- (UIImage *)renderBadge {
    return [self renderBadgeWithTraitCollection:[UITraitCollection currentTraitCollection]];
}

- (UIImage *)renderBadgeWithTraitCollection:(UITraitCollection *)traitCollection {
    UIGraphicsImageRendererFormat *format = [[UIGraphicsImageRendererFormat alloc] initForTraitCollection:traitCollection];
    // ...
}
```

The decision table's internal-helper exception applies here too.

### Call-Chain Propagation

When adding a context parameter, follow affected callers until the value comes from the actual consumer.
Change internal signatures together and retain bridges only at supported compatibility boundaries.

---

## Implementation Rules

1. Preserve code style and formatting. Handle both Swift and Objective-C.
2. Preserve useful helpers such as `UIRoundToScale`; pass the correct context-derived value instead of duplicating their calculations.
3. Keep unrelated availability checks, nil guards, and constructor paths unless the requested change establishes that their contract is obsolete.
4. Apply the API decision table and invalidation section together, including supporting caller and lifecycle edits.

## Completion evidence

Check that the affected consumers use the intended context and that cached results refresh when it changes.
Exercise relevant lifecycle paths, including programmatic and nib initialization when both are supported.
Account for remaining shared-screen uses as required bridges, dead code, or explicit migration limits.
Do not treat a non-empty diff or a matching branch count as proof of preserved behavior.

---

## API Reference

- [TN3187: Architecting your app for multiple windows](https://developer.apple.com/documentation/uikit/app_and_environment/scenes)
- [TN3124: Coordinate spaces and coordinate conversion](https://developer.apple.com/documentation/uikit/uicoordinatespace)
