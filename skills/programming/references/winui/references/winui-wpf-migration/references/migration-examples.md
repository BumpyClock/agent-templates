# WPF Migration Examples

Use the section for the API or behavior under migration.
These mappings identify candidates, not equivalent behavior or authorization for a whole-app rewrite.

## Source boundaries

For a source inventory, exclude generated output:

```sh
rg -n 'System\.Windows\.|PresentationCore|PresentationFramework|UseWPF' \
  -g '*.cs' -g '*.csproj' -g '!**/obj/**' -g '!**/bin/**' .
```

A match needs classification. For example, `System.Windows.Input.ICommand` is usable outside WPF and does not require replacement.
Inspect project references as well as namespaces before removal of an assembly dependency.

For a new WinUI project beside WPF, align `RootNamespace`, XAML `x:Class`, and code-behind partial class names.
Merge application initialization deliberately instead of replacement of the generated WinUI app lifecycle.

## API candidates

| WPF API | WinUI candidate or decision |
| --- | --- |
| `System.Windows.Media` | `Microsoft.UI.Xaml.Media` for corresponding UI types |
| `System.Windows.Data` converters | WinUI converter interfaces with different method signatures |
| `Menu` / `MenuItem` | `MenuBar`, `MenuBarItem`, or `MenuFlyoutItem` according to placement |
| `ToolBar` | `CommandBar` where its overflow behavior fits |
| `StatusBar` | An explicit layout with the required status semantics |
| `WrapPanel` | `ItemsRepeater` plus layout, with selection and keyboard behavior supplied if needed |
| WPF bitmap source | `Microsoft.UI.Xaml.Media.Imaging.BitmapImage` for display, or `Windows.Graphics.Imaging` for pixel operations |

An `ItemsRepeater` layout does not supply all list-control interaction behavior.
Do not substitute a list for a data grid without preservation of required cell edit and navigation behavior.

## Dispatcher lifetime

Capture the owning UI `DispatcherQueue` before work leaves that thread.
For a nonblocking notification, the relevant shape is:

```csharp
bool accepted = uiDispatcher.TryEnqueue(() => ApplyResult(result));
if (!accepted)
{
    return;
}
```

This example discards an update after queue shutdown. Use it only when the owner no longer needs the result.
An accepted enqueue does not mean the callback has completed.
If callers require completion or error propagation, use the project's awaitable dispatcher abstraction.
Do not use this substitution for synchronous WPF `Dispatcher.Invoke` without an explicit completion contract.

## Binding source and updates

For a page with a `ViewModel` property and a notifying `Title`:

```xml
<TextBlock Text="{x:Bind ViewModel.Title, Mode=OneWay}" />
```

For an inherited runtime `DataContext`:

```xml
<TextBlock Text="{Binding Title}" />
```

`x:Bind` resolves from the page or control, not its `DataContext`. Its default mode is `OneTime`.
For compiled bindings inside a `DataTemplate`, supply the item type through `x:DataType`.
Retain `OneTime` when a value is intentionally fixed. Handle nullable paths and property notifications for dynamic values.

For resource migration, preserve resource identifiers and map localized property targets such as `SaveButton.Content` to `x:Uid="SaveButton"`.
Use the [localization examples](../../winui-code-review/references/quality-rules.md#globalization) for `.resw` structure and `ResourceLoader` calls.
A `.resx` rename alone does not perform these mappings.

Sources: [data binding](https://learn.microsoft.com/en-us/windows/apps/develop/data-binding/data-binding-in-depth), [TryEnqueue](https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.dispatching.dispatcherqueue.tryenqueue).
