# WinUI theming reference (deep dictionary patterns)

Load this when authoring **custom** theme dictionaries, brushes, styles, templates, or High Contrast variants. `guide.md` already covers the short rules and the most common landmines — this file is for going deeper.

## Minimal ThemeDictionary pattern

```xml
<ResourceDictionary.ThemeDictionaries>
  <ResourceDictionary x:Key="Light">
    <SolidColorBrush x:Key="AppSurfaceBrush" Color="#FFFFFFFF" />
  </ResourceDictionary>
  <ResourceDictionary x:Key="Dark">
    <SolidColorBrush x:Key="AppSurfaceBrush" Color="#FF1F1F1F" />
  </ResourceDictionary>
  <ResourceDictionary x:Key="HighContrast">
    <SolidColorBrush x:Key="AppSurfaceBrush" Color="{ThemeResource SystemColorWindowColor}" />
  </ResourceDictionary>
</ResourceDictionary.ThemeDictionaries>
```

Then apply with `Background="{ThemeResource AppSurfaceBrush}"`. Theme-local resource references inside a dictionary should use `{StaticResource}` (they resolve once per dictionary); only `SystemAccentColor` / `SystemColor*` need `{ThemeResource}` inside a dictionary because they themselves react to system changes.

## ResourceKey redirects (zero-allocation theming)

When you want a named brush that just *points at* a platform brush in each theme:

```xml
<ResourceDictionary x:Key="Light">
  <StaticResource x:Key="MyChromeBrush" ResourceKey="ControlFillColorDefaultBrush" />
</ResourceDictionary>
```

Cheaper than allocating a `SolidColorBrush` per theme and stays correct if the platform brush is retuned.

## High Contrast rules

- Use system contrast colors or suitable platform resources for foreground and background pairs. Avoid opacity changes that reduce contrast.
- See the HC pairing table in [brushes-and-icons.md](brushes-and-icons.md#high-contrast-systemcolor-pairings) for which background pairs with which foreground.
- In a contrast theme, WinUI selects one dictionary from each `ThemeDictionaries` collection. If a `HighContrast` dictionary exists, it is selected even when it is empty. A key missing from it does not fall back to the `Light`, `Dark`, or `Default` dictionary. The lookup continues to outer scopes and platform resources.
- For an app-defined key in `Light` and `Dark`, define the same key in `HighContrast` and map it to a `SystemColor*` resource, as in the example above. If the lookup finds the key nowhere, XAML raises a parse error. The build may not detect it, so it can first appear at run time in a contrast theme.
- For a platform key that you override (lightweight styling), an empty `HighContrast` dictionary is valid. The lookup reaches the platform's own contrast value.
- Never set `HighContrastAdjustment="None"` to "fix" a contrast issue — it silences the system's auto-adjustment, so unless you've supplied correct system-aware brushes everywhere it makes things worse.

## Runtime theme switching

`Window.Content` is a `FrameworkElement` — set `RequestedTheme` on it (or any subtree root) to override:

```csharp
if (App.MainWindow.Content is FrameworkElement root)
    root.RequestedTheme = ElementTheme.Dark;
```

`{ThemeResource}` references update on the switch; `{StaticResource}` references and any inline `SolidColorBrush` allocations do not. If you see colours that don't change on theme switch, that's the usual cause.

## Custom styles — `BasedOn` discipline

- `BasedOn="{StaticResource DefaultButtonStyle}"` (or the platform default) so platform updates flow through.
- Don't re-declare properties the base style already sets unless you're overriding the value.
- Don't author a full `ControlTemplate` for a standard control just to tweak chrome — override the brush/spacing theme resources at the local scope instead.

Source: [Microsoft XAML theme resources](https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/xaml-theme-resources).
