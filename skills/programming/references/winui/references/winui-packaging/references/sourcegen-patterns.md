# Source Generator Patterns — Detailed Reference

Detailed code patterns for AOT compilation and source generators. See [guide.md](../guide.md) for rules summary.

---

## Trimming Configuration

```xml
<PropertyGroup>
  <PublishTrimmed>true</PublishTrimmed>
  <TrimMode>full</TrimMode>
  <SuppressTrimAnalysisWarnings>false</SuppressTrimAnalysisWarnings>
</PropertyGroup>
```

For reflection-heavy code, annotate to preserve members:

```csharp
public void LoadService([DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors)] Type serviceType)
    => Activator.CreateInstance(serviceType);
```

---

## Trim Compatibility Testing

Keep warnings enabled during development:

```xml
<SuppressTrimAnalysisWarnings>false</SuppressTrimAnalysisWarnings>
<TrimmerSingleWarn>false</TrimmerSingleWarn>
```

Patterns to eliminate:

- `Type.GetType("MyNamespace.MyClass")` — use `typeof(T)` or `[DynamicDependency]`
- `Activator.CreateInstance(someType)` without `[DynamicallyAccessedMembers]`
- `Assembly.LoadFrom()` — use compile-time references
- Unattributed reflection: `typeof(T).GetProperties()`

---

## JSON Source Generator Setup

```csharp
[JsonSerializable(typeof(UserProfile))]
[JsonSerializable(typeof(List<UserProfile>))]
internal partial class AppJsonContext : JsonSerializerContext { }

// No reflection at runtime
var json = JsonSerializer.Serialize(profile, AppJsonContext.Default.UserProfile);
var obj = JsonSerializer.Deserialize(json, AppJsonContext.Default.UserProfile);
```

---

## Regex Source Generator

```csharp
public partial class InputValidator
{
    [GeneratedRegex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]
    private static partial Regex EmailRegex();
    public bool IsValidEmail(string input) => EmailRegex().IsMatch(input);
}
```

---

## XAML Compilation (x:Bind)

```xml
<!-- ✅ AOT-safe: compile-time generated -->
<TextBlock Text="{x:Bind ViewModel.Title, Mode=OneWay}" />

<!-- ❌ Reflection-based, not trim-safe -->
<TextBlock Text="{Binding Path=Title}" />
```

Set `x:DataType` on pages: `<Page x:DataType="viewmodels:MainViewModel">`

---

## CsWin32 Setup

Generates P/Invoke wrappers at compile time. Add `Microsoft.Windows.CsWin32` NuGet package. List needed APIs in `NativeMethods.txt`:

```
GetDpiForWindow
SetWindowPos
ShowWindow
```

---

## CommunityToolkit.Mvvm Source Generators

When a WinUI 3 app publishes with Native AOT or trimming, use `[ObservableProperty]` on partial properties, not fields. The field form generates code that is not AOT compatible in WinRT apps, because the CsWinRT generator cannot produce marshalling code for it. The CsWinRT reflection fallback works only in builds without AOT or trimming.

The analyzer reports the field form as warning **MVVMTK0045** whenever the CsWinRT AOT optimizer runs in automatic mode, which is the default for WinUI 3 projects. Without AOT or trimming, the field form works, and partial properties are a preference.

Partial properties need CommunityToolkit.Mvvm 8.4+. With 8.4.1+ and a Roslyn 5.0+ compiler, C# 14 or later works. With 8.4.0 or an older compiler, set `<LangVersion>preview</LangVersion>`. With a lower language version, the generator reports error **MVVMTK0041**.

```csharp
public partial class SettingsViewModel : ObservableObject
{
    [ObservableProperty] public partial string UserName { get; set; }
    [RelayCommand] private async Task SaveAsync() => await _service.SaveAsync(UserName);
}
```

---

## Single-File Publishing Configuration

```xml
<PropertyGroup>
  <SelfContained>true</SelfContained>
  <PublishSingleFile>true</PublishSingleFile>
  <EnableCompressionInSingleFile>true</EnableCompressionInSingleFile>
</PropertyGroup>
```

Primarily for unpackaged apps. Combine with `<PublishTrimmed>true</PublishTrimmed>`.
