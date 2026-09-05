---
name: winui-design
description: Select WinUI controls or change XAML layout, data bindings, themes, and accessibility.
---



## Control discovery

For unfamiliar controls or API uncertainty, use `winapp find-ui` when available:

```powershell
winapp find-ui "<focused feature>"                    # compact matches + scenario IDs
winapp find-ui --id <scenario-id>                    # full XAML/C# + prerequisite notes
winapp find-ui --id <id-1> --id <id-2> --json        # batch, structured output
winapp find-ui --list                                # browse all default-source scenarios
winapp find-ui "<feature>" --refresh                 # force a corpus refresh
```

Default search covers the WinUI Gallery, Windows Community Toolkit, and curated core patterns. Reactor's C#-only/MVU samples are opt-in with `--source reactor`; use them only for Reactor projects. The Gallery/Toolkit/Reactor corpus is fetched and cached by WinApp CLI, while core patterns work offline.

## App-shape anchors

Use these examples when the task requires a new app structure. Preserve an existing structure that fits the requirements.

| App type | Anchor controls | Reference apps |
|----------|-----------------|----------------|
| Settings / config tool | `NavigationView` Left + `SettingsCard` / `SettingsExpander` | Windows Settings, Slack |
| Document / session editor | `TabView` + full-bleed content, light chrome | Windows Terminal, VS Code, Notepad |
| Hierarchical browser | `TreeView` + `ListView` + `BreadcrumbBar` | File Explorer, Outlook |
| Developer tool / dashboard | `NavigationView` + card layout | Dev Home, GitHub Desktop |
| Single-purpose utility | Mode switcher + compact grid | Calculator, Snipping Tool |
| Media / canvas / hero | `Grid` with hero surface, floating commands, **no** `NavigationView` | Photos, Spotify, Clipchamp |

## Reach-for-this control map

Use these control choices as examples, not fixed rules:

- **Navigation:** 2–7 sections → `NavigationView`; document/session tabs → `TabView`; breadcrumb trail → `BreadcrumbBar`; 2–3 modes → `SelectorBar`.
- **Data display:** Use `ListView` for lists, `GridView` for tiles, and `TreeView` for hierarchies. For tables, compare grid dependencies against edit, sort, selection, and accessibility requirements. A list with column headers is sufficient only when those requirements fit.
- **Input:** Text → `TextBox`; number → `NumberBox`; search → `AutoSuggestBox`; date → `CalendarDatePicker`; boolean → `ToggleSwitch`; pick one from 2–3 → `RadioButtons`; pick one from 4+ → `ComboBox`.
- **Feedback:** Blocking decision → `ContentDialog`; contextual action → `Flyout` / `MenuFlyout`; onboarding / hint → `TeachingTip`; inline status / async progress → `InfoBar`; system notification → `AppNotification`.

For unresolved control choices, consult samples or the installed SDK documentation.

## Window sizing (WinUI 3 specifics)

WinUI 3 does not expose WPF `SizeToContent`. Choose initial dimensions from the content, display work area, and saved window state.

Avoid fixed size formulas that assume a title bar height, font scale, or content density.

`AppWindow.Resize` uses physical pixels. Convert from DIPs with the applicable window DPI when necessary.
Do not assume `XamlRoot` exists before attachment to the visual tree. For an HWND-based conversion:

```csharp
using Microsoft.UI;
using Microsoft.UI.Windowing;
using System.Runtime.InteropServices;
using Windows.Graphics;

public sealed partial class MainWindow : Window
{
    [DllImport("user32.dll")]
    private static extern uint GetDpiForWindow(IntPtr hWnd);

    public MainWindow()
    {
        InitializeComponent();
        var hwnd  = Win32Interop.GetWindowFromWindowId(AppWindow.Id);
        var scale = GetDpiForWindow(hwnd) / 96.0;
        // Use the requested initial dimensions in DIPs.
        AppWindow.Resize(new SizeInt32((int)(widthDip * scale), (int)(heightDip * scale)));
    }
}
```

Don't size the window by setting `Width`/`Height` on the root `Grid` — that clips content, not the window.

## XAML landmines (the things you'll otherwise ship broken)

### `x:Bind` defaults to `OneTime`

```xml
<!-- ❌ silently never updates -->
<TextBlock Text="{x:Bind Vm.Status}" />
<!-- ✅ -->
<TextBlock Text="{x:Bind Vm.Status, Mode=OneWay}" />
```

### TextBox update timing

Use `PropertyChanged` when the model must receive each edit. Preserve `LostFocus` when focus loss is the intended commit boundary.

```xml
<TextBox Text="{x:Bind Vm.Name, Mode=TwoWay, UpdateSourceTrigger=PropertyChanged}" />
```

Default trigger resolves to `LostFocus` specifically for `TextBox.Text` (most other properties default to `PropertyChanged`). The VM is not updated per keystroke, and UIA keyboard-simulation tests (WinAppDriver `SendKeys`, etc.) that assert immediately after typing will see stale VM state until focus moves.

### Attached properties from C# use static setters, not initializers

```csharp
using Microsoft.UI.Xaml.Automation;

// ❌ WRONG — does not compile. CS0117: 'Button' does not contain a definition for 'AutomationProperties'.
// AutomationProperties is a static class of attached-property accessors, not an instance member.
var btn = new Button { AutomationProperties = { AutomationId = "BtnSave" } };

// ✅ CORRECT
var btn = new Button { Content = "Save" };
AutomationProperties.SetAutomationId(btn, "BtnSave");
AutomationProperties.SetName(btn, "Save button");
Grid.SetRow(btn, 1);
ToolTipService.SetToolTip(btn, "Save the current document");
```

### `Converter={x:Null}` crashes `x:Bind` at runtime

`{x:Bind}` requires `Converter` to be a `{StaticResource}` lookup. `Converter={x:Null}` compiles but the generated code calls `LookupConverter("")`, which returns null, then dereferences it — you get `Resource Dictionary Key can only be String-typed` / `NullReferenceException` on first activation of the binding. If you don't want a converter, omit the property entirely.

### Optional function bindings

Use a function binding for a suitable local transformation. Preserve a reusable converter when it fits the project.

```csharp
// MainPage.xaml.cs
public static Visibility BoolToVisibility(bool v) => v ? Visibility.Visible : Visibility.Collapsed;
public static Visibility InvertBoolToVisibility(bool v) => v ? Visibility.Collapsed : Visibility.Visible;
public static bool Not(bool v) => !v;
```
```xml
<TextBlock Visibility="{x:Bind local:MainPage.BoolToVisibility(Vm.IsLoading), Mode=OneWay}" />
<Button   IsEnabled="{x:Bind local:MainPage.Not(Vm.IsLoading), Mode=OneWay}" />
```

### Acrylic and `ThemeShadow` rendering rules

- `BackgroundSizing` defaults to `InnerBorderEdge` on both `Border` and `Control`, which correctly clips acrylic to the inner stroke. The hazard is the opposite of intuition: don't *change* it to `OuterBorderEdge` on a bordered acrylic surface — that's what makes the material bleed past the stroke.
- `ThemeShadow` casts a shadow from the caster's `Translation` Z. Microsoft's recommended elevations are `16` for tooltips, `32` for popup/flyout UI, `128` for dialogs — pick by surface type. For non-popup casters, add the surfaces it should land on to `ThemeShadow.Receivers`; otherwise the shadow has nothing to fall on and looks clipped.

## Theming rules (short version)

- `{ThemeResource ...}` at usage sites (updates on theme switch). `{StaticResource}` inside `ThemeDictionaries` for theme-local definitions; `SystemAccentColor` / `SystemColor*` are the exceptions and stay `{ThemeResource}`.
- Define required custom keys for supported themes, including `HighContrast`. Prefer explicit `Light` and `Dark` dictionaries for theme-specific values.
- Name resources by purpose (`CardBackgroundBrush`, `DangerTextBrush`), not hue.
- Light/Dark working ≠ High Contrast working. Test in a Contrast theme separately.
- Never set `HighContrastAdjustment="None"` unless your app already supplies system-aware brushes throughout.

## Anti-patterns

| ❌ Don't | ✅ Do instead |
|---------|--------------|
| Reflexively build every app as `NavigationView` Left | Pick the closest row in the silhouette table; hero / document / utility shapes are equally valid |
| Treat brand colour or tinted backdrop as off-pattern | Overriding `SystemAccentColor` or using a tinted `DesktopAcrylicBackdrop` is how Microsoft's own first-party apps differentiate |
| Tiny content island on an oversized window | Either size the window to the content (see *Window sizing*) or let content fill the available space |
| Custom pill / segmented tab switcher built by hand | `NavigationView` Top or `SelectorBar` |
| Equal-width 50/50 column split where one pane is structural | Stable size for the structural pane, flexible for content — only if a structural pane is part of the silhouette at all |
| Hard-coded color literals (`#RRGGBB`, `White`) | `{ThemeResource}` brushes by semantic name |
| `ScrollViewer` wrapped around a `ListView` / `GridView` | The collection control already scrolls — give it a constrained height |
| Custom `ControlTemplate` for a standard control | Built-in control + lightweight style overrides |
| Placeholder text used as the only field label | Always provide a visible label |
| Required commands hidden at small widths with no route | Overflow menu, secondary surface, or a responsive promotion rule |
| Modal `ContentDialog` for non-blocking hints | `TeachingTip`, `InfoBar`, or inline status |
| Destructive action (Delete / Discard / Reset) fired without confirmation | `ContentDialog` with verb-labelled primary action and `Cancel` secondary; surface item identity (name, count) in the body |
| Custom list control when `ListView` / `GridView` fits | Use the platform collection + virtualisation |

Prefer platform controls when their behavior fits.
For custom controls, preserve keyboard access, focus, UI Automation, contrast, and relevant interaction states.

## References (load on demand)

| File | Load when… |
|------|-----------|
| `references/brushes-and-icons.md` | Looking up a brush key by purpose, picking between `Icon` / `IconSource` slots, choosing among `FontIcon` / `SymbolIcon` / `PathIcon` / etc. |
| `references/theme-accessibility.md` | Authoring theme dictionaries, custom brushes/styles/templates, or High Contrast support. |
| `references/layout-review.md` | Reviewing responsive behaviour, breakpoints, or empty/loading/error coverage on a data-driven page. |
