# unsafe-minimize-scope

> Keep `unsafe` blocks as small as possible — mark only the operation that requires unsafety, not the surrounding safe code.

## Why It Matters

Shrinking unsafe blocks isolates the operations whose safety invariants need justification, making reviews tractable and bugs easier to find. An `unsafe fn` declares caller obligations; explicit unsafe blocks identify operations whose preconditions the implementation must uphold. Rust 2024 enables the `unsafe_op_in_unsafe_fn` lint by default, warning about unsafe operations outside an explicit block. Repositories can deny the lint.

## Bad

```rust
// Entire function body marked unsafe — safe arithmetic, bounds checks,
// and the single unsafe dereference are all equally "dangerous" to a reader.
unsafe fn sum_at(ptr: *const i32, len: usize, index: usize) -> i32 {
    let adjusted_len = len.saturating_sub(1); // safe — but looks unsafe
    assert!(index <= adjusted_len);           // safe — but looks unsafe
    let value = *ptr.add(index);              // the only actually unsafe op
    value + 1                                 // safe — but looks unsafe
}
```

```rust
// Huge unsafe block wrapping safe logic inside an unsafe fn (2024 edition
// warns without unsafe {} here, but large blocks are still hard to audit).
pub unsafe fn process(ptr: *const u8, len: usize) -> Vec<u8> {
    unsafe {
        let mut result = Vec::with_capacity(len); // safe
        for i in 0..len {                         // safe
            result.push(*ptr.add(i));             // unsafe — buried in noise
        }
        result
    }
}
```

## Good

Prefer a safe operation when it already enforces the required boundary:

```rust
fn sum_at(values: &[i32], index: usize) -> i32 {
    values[index] + 1
}
```

A slice supplies the memory-validity contract, and indexing checks bounds. A raw pointer plus an asserted length does not establish that the memory is valid.

```rust
/// # Safety
///
/// `ptr` must be valid for reads for `len` bytes and properly aligned.
pub unsafe fn process(ptr: *const u8, len: usize) -> Vec<u8> {
    let mut result = Vec::with_capacity(len); // safe — outside any unsafe block
    for i in 0..len {
        // SAFETY: caller guarantees ptr is valid for len bytes; i < len.
        let byte = unsafe { *ptr.add(i) };
        result.push(byte);
    }
    result
}
```

## Key Points

- **2024 edition `unsafe_op_in_unsafe_fn`**: use explicit unsafe blocks even inside an `unsafe fn`. The lint warns by default and can be denied by repository policy.
- Expose a safe wrapper only when its types or checks establish every safety invariant. Otherwise preserve an explicit `unsafe fn` caller contract.
- Each small unsafe block needs its own `// SAFETY:` comment (see `unsafe-safety-comment`).
- If multiple consecutive lines are all unsafe for the *same* invariant reason, a single block covering only those lines is acceptable.

## When a Larger Block Is Acceptable

If two unsafe operations share the *exact same precondition* and separating them would require re-stating the identical justification, a single block covering both is fine — but it should still be the minimum necessary scope.

## See Also

- [unsafe-safety-comment](unsafe-safety-comment.md) - write `// SAFETY:` above every unsafe block
- [unsafe-send-sync-manual](unsafe-send-sync-manual.md) - document invariants when manually implementing Send/Sync
