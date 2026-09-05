---
name: winui-wpf-migration
description: Port WPF behavior to WinUI 3 while preserving the application contract.
---

# WPF to WinUI 3

Choose a migration boundary from the requested scope.
Preserve reusable domain code, valid MVVM abstractions, and supported distribution requirements.
A WinUI port does not inherently require a new MVVM library or conversion of every binding.

## Platform differences

For source probes, API mappings, and binding examples, use [migration examples](references/migration-examples.md).

| WPF feature | WinUI consideration |
| --- | --- |
| `System.Windows.Controls` | Use `Microsoft.UI.Xaml.Controls` equivalents where their behavior fits |
| `Dispatcher.Invoke` | `DispatcherQueue.TryEnqueue` queues work asynchronously and can fail |
| `DataGrid` | Choose a compatible grid or list from required edit, sort, selection, and accessibility behavior |
| `WrapPanel` | Consider `ItemsRepeater` with an appropriate layout |
| `TabControl` | Consider `TabView` and preserve document lifetime behavior |
| `DynamicResource` | Use `ThemeResource` where theme-dependent lookup is required |
| WPF image types | Use WinUI image sources or `Windows.Graphics.Imaging` at the UI boundary |

Capture the UI dispatcher on the owning thread.
Handle a failed enqueue when completion matters.
Do not treat an asynchronous enqueue as equivalent to synchronous `Invoke`.

Keep WPF framework references out of the WinUI XAML project.
Do not enable `UseWPF` as a WinUI compiler workaround.
Separate retained WPF code into a deliberate interop boundary when the migration requires it.

## State and resources

Preserve `Binding` where runtime `DataContext` behavior remains appropriate.
For compiled bindings, account for `x:Bind` source resolution and its `OneTime` default.
Port resource keys and property targets deliberately. A file extension change alone does not migrate localization behavior.

## Completion

Validate the migrated behavior, target architecture, and intended activation path.
Preserve package identity and app data unless the requested migration changes them.
Use [development guidance](../winui-dev-workflow/guide.md) for launch failures and [design guidance](../winui-design/guide.md) for control behavior.

Consult [Microsoft migration guidance](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/migrate-to-windows-app-sdk/) for API differences.
