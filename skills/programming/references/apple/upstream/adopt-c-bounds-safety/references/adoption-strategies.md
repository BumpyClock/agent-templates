# Adoption strategies for `-fbounds-safety`

Use for an authorized adoption in an existing C project.
Keep the sequence needed for ABI compatibility and valid bounds, without requiring checkpoint commits or a separate approval for each file.

## Scope and prerequisites

Identify the target, supported compilers, build configurations, and requested adoption mode.
Use the user's stated choice; ask when full versus header-only adoption remains consequentially ambiguous.

- Full adoption annotates headers and enables `-fbounds-safety` in implementation files.
- Header-only adoption annotates public interfaces without enabling the flag in implementation files. It benefits adopting clients but does not check the library's implementation.

Inspect existing edits before changes. Preserve unrelated work; a dirty worktree or absence of version control does not by itself prevent adoption.
Honor requested review checkpoints. Commits require the normal authorization and repository conventions; adoption does not authorize them.
If separate source and enablement commits are requested, verify that the source builds with the flag off before the source commit, then re-enable and verify the flag before the build-setting commit.

## Build system source of truth

Use the repository's maintained build configuration and commands.
For Xcode, resolve the relevant workspace, project, target, and configuration rather than guessing from the directory name.
Prefer available project-scoped tools; use supported alternatives when they preserve the same scope.

If the Xcode project is generated, put flag configuration in the generator's maintained input rather than only in the generated project.
For incremental full adoption, establish how the build system attaches per-file C flags. Report a missing capability instead of pretending that another build system's mechanism applies.
Header-only validation needs a way to compile an adopting translation unit, not necessarily an Xcode project.

## Full Adoption

### Typical source changes

Annotations should express the actual bounds contract, not a guessed upper limit.
Consult [language rules](language-overview.md) or [specific pitfalls](common-patterns-and-pitfalls.md) when a diagnostic or representation decision needs them.

```c
// BEFORE
void take_elements(const element_t *elements, size_t count);

// AFTER
void take_elements(const element_t *__counted_by(count) elements, size_t count);
```

Do not put ABI-changing `__indexable` or `__bidi_indexable` annotations on consumer-facing APIs.
Use `__unsafe_indexable` only when the real contract cannot yet provide bounds; record the limitation rather than fabricate an annotation.

Dependent pointer/count assignments may need to change together:

```c
// BEFORE
int find_zero(int *__counted_by(count) elements, size_t count) {
    int idx = -1;
    while (idx < count && *elements != 0) {
        // error: assignment to 'int *__single __counted_by(count)' 'elements' requires corresponding assignment to 'count'
        ++elements;
        ++idx;
    }
    return idx;
}

// AFTER
int find_zero(int *__counted_by(count) elements, size_t count) {
    int idx = -1;
    size_t original_count = count;
    while (idx < original_count && *elements != 0) {
        ++elements;
        --count;
        ++idx;
    }
    return idx;
}
```

Annotation changes can affect callers as well as definitions. Follow diagnostics through the affected interfaces.
Keep unavoidable `__unsafe_forge_*` conversions at the boundary with non-adopted code rather than propagating unsafe pointers internally.

### 0. Code research

Identify public headers, their implementations, and dependent callers.
Use the call graph to choose an adoption order when it reduces repeated annotation changes.
For a larger migration, track files as adopted, pending, or explicitly skipped using the existing task mechanism.
There is no required agent count or per-file task hierarchy.

### 1. Headers First

Annotate shared interfaces before their adopting implementation files so dependent code sees a consistent contract.
Include function parameters, returns, struct fields, and globals that are in scope.

```c
// C standard library style:
void *memcpy(void *__sized_by(n) dst, const void *__sized_by(n) src, size_t n);

// Custom API:
int process_buffer(const uint8_t *__counted_by(len) data, size_t len);
```

For an adopted public header:

```c
#include <ptrcheck.h>
__ptrcheck_abi_assume_single()
```

The directive applies to the current header, not subsequently included headers.
Preserve explicit buffer annotations rather than relying on the implicit single-element pointer contract.

#### Capturing deferred Safe Wrapper retrofits

For a public API that still needs `__unsafe_indexable`, record its signature, implementing file, and the reason bounds cannot be expressed.
Use [Safe Wrappers for Public APIs](common-patterns-and-pitfalls.md#safe-wrappers-for-public-apis) for a compatible replacement.
Apply wrappers in the full-adoption refinement step, or within separately authorized source work for header-only adoption.
An internal-only signature can usually be changed with its callers instead of retaining a public compatibility shim.

### 2. Create a Validation File

Compile a translation unit that includes the adopted headers with `-fbounds-safety`.
Reuse an existing check if it establishes that contract; otherwise use a focused validation `.c` file.
Attach the flag to that file without enabling unrelated implementation files.
Keep a persistent validation file only when it belongs in the requested deliverable or repository checks.

For header-only work, continue with [Header-Only Adoption](#header-only-adoption), not the full-adoption enablement steps.

### 3. Enable Per-File in Implementation

Enable the flag one implementation file at a time in the selected order.

1. Add the per-file flag and fix supported compiler diagnostics. `-ferror-limit=0` can expose all diagnostics when useful.
2. Exercise relevant runtime behavior with the project's existing tests or another focused check. A successful compile cannot rule out runtime bounds traps.
3. Correct bounds violations using [runtime debugging](runtime-debugging.md), then continue to the next file when the affected contract is supported.

Find existing test commands from repository guidance rather than requiring the user to supply them.
If runtime evidence is unavailable, report that limit and do not claim runtime safety. Ask only when missing information or a consequential risk decision blocks further work.

#### Handling a compiler crash

Preserve the compiler command, stderr, and matching crash artifacts before another attempt.
Clang may report preprocessed `.c` and replay `.sh` paths under `$TMPDIR`, plus a crash log under `~/Library/Logs/DiagnosticReports/`.
Inspect a replay script before execution and keep reproduction within the authorized build environment.

For a multi-architecture build that cannot generate preprocessed source, reproduce separately for each relevant `-arch` value.
Keep large artifacts outside the conversation; record their paths and which architecture reproduced the crash.
Preprocessed source can contain private code. Do not upload a reproducer or file external feedback without authorization.

Try a bounded, behavior-preserving workaround when the evidence supports it.
Do not silently weaken a public bounds contract or undertake a broad refactor to avoid the compiler bug.
If the workaround would change the agreed guarantees, present the tradeoff against [skipping enablement](#skipping-a-files-enablement).
For a retained workaround, record the intended code and an available issue or artifact reference:

```c
// WORKAROUND for clang -fbounds-safety crash.
// Intended: <the annotation or expression to restore when the compiler is fixed>.
// See <issue identifier or retained reproducer path>.
```

#### Skipping a file's enablement

Record skipped files and the reason. If partial adoption changes the agreed target, obtain that scope decision before treating the migration as complete.

- Retain per-file flags on adopted files; do not switch the whole target to `ENABLE_C_BOUNDS_SAFETY`.
- `__ptrcheck_unavailable_r` checks only adopting translation units. Audit callers in skipped files separately when migrating a legacy API.
- Preserve ABI compatibility across translation units. Wide-pointer annotations on cross-file interfaces can mismatch non-adopting callers.

For an in-progress file, restore only the changes from this attempt that cannot be kept coherently, including its enablement flag when necessary.
Preserve pre-existing edits and useful compatible annotations. Ask if ownership or the intended retained state is unclear; do not reset the whole file by default.

### 4. Switch to target-level enablement

Only when every implementation file in the target has adopted the flag, replace per-file flags with the target-wide setting.
Use [build settings](build-settings.md) for the supported configuration.
Make the flag transition coherently and verify the resulting configuration.

### 5.1 Safe Wrapper retrofits

Apply recorded public-API wrappers using the [shared pattern](common-patterns-and-pitfalls.md#safe-wrappers-for-public-apis).
Switch internal callers to the safe entry point and keep legacy shims for supported external consumers.
Verify the affected target and runtime behavior.
For partial adoption, do not mistake compilation for proof that callers in skipped files migrated.

### Completion

Report the adopted headers and files, enabled configurations, remaining unsafe interfaces, skipped files, and observed checks.
Full adoption requires the requested implementation coverage; a partial result must be named as such.
Additional fuzzing or broader tests can be useful when existing evidence leaves material runtime uncertainty, not as an automatic extra phase.

### Soft Trap Mode

Soft traps log violations instead of terminating execution, which can help collect multiple failures during debugging.
Use [build settings](build-settings.md) and [runtime debugging](runtime-debugging.md) for the mechanics.
Soft traps do not enforce bounds safety. Restore enforcement before claiming completed enforcing adoption.

### Performance Optimization

Measure overhead before optimization. Compiler remarks can locate emitted checks.
Possible changes include loop bounds that permit check elimination, iteration order, explicit pre-loop bounds checks, and simpler count expressions.
Keep performance work within the requested scope and preserve the same bounds guarantee.

## Header-Only Adoption

Use for public interfaces consumed by adopting clients when the library implementation remains outside `-fbounds-safety`.
Follow [Headers First](#1-headers-first) and [header validation](#2-create-a-validation-file).
Do not enable the flag on implementation files or rewrite their callers as an incidental part of this mode.

### 3. Safe Wrapper retrofits (if any captured)

Adding wrapper definitions changes implementation files and needs authorization beyond a header-only request.
If that source work is already explicitly included, proceed without a redundant approval; otherwise explain the candidates and ask.
Declining it leaves source files unchanged and the unsafe interfaces recorded as limitations.

For authorized wrappers:

- Keep internal callers unchanged in this mode; the legacy shim calls the new safe variant.
- Preserve matching annotations on the safe variant's declaration and definition.
- Keep `<ptrcheck.h>` reachable so annotations expand appropriately when the flag is off.
- Do not add forge calls to the non-adopting legacy implementation merely for symmetry.
- Check compilation and the changed wrapper behavior using relevant existing evidence.

### 4. Header-only adoption complete

Report the annotated interface and validation result.
Adopting clients gain compiler information and call-site bounds checks; non-adopting clients retain the flag-off interface.
The library implementation still lacks bounds-check enforcement, and compilation of the headers does not prove its annotations match runtime behavior.
Full adoption remains separate work unless already authorized.
