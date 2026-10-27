# 2026-10-27 Domain Rust: crates set the dependency direction

`sunstack-dev` 2.100.0 adds a `Crates and dependencies` section to `domain-rust`, one "Signs you skipped it" line, and the topic words to its description.

Dependencies point one way, and a boundary that must hold is a crate boundary, because Cargo rejects crate cycles and allows module cycles. The repository keeps its own layers. A new crate needs a named boundary that requires the compiler, and a few large crates beat many small ones. A lower crate that needs a higher one moves the item down, splits the type, or declares a small trait the higher crate implements. A module-cycle check is kept passing by breaking the cycle, never by growing its baseline. Constructors get named handles at the composition point for their lifetime, with no services struct. Crate-local test helpers stay in `#[cfg(test)]` or `tests/`; exported helpers sit behind a `test-support` feature that production dependencies never enable, checked with `cargo tree -p <package> -e normal,build,features`. Moved items leave no `pub use` behind.

All six Codex, Claude and Cursor plugin and marketplace version fields move to 2.100.0, and the changelog index links this entry. No commands, hooks, references or plugin README sections change.

Spec: `docs/wip/skills-authoring/2026-10-27-domain-rust-crate-dag/spec.md`.
