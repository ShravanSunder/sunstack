---
name: domain-rust
description: "Use when writing, changing or reviewing Rust code, a Rust crate's module layout or its SQLx migrations, or choosing which cargo commands to run."
disable-model-invocation: true
---

# Rust

Read this skill in full before the Rust work it governs; your own full read earlier this session counts.

Rust can make invalid states unrepresentable, so let it: enums with payloads, newtypes with fallible constructors, and `Result` on every production path that can fail. One Tokio runtime owns the I/O; blocking work goes to the smallest `spawn_blocking` unit, and side effects leave the hot path under a tracker that drains them. Storage and transport stay at the crate's edge, translated into domain types on the way in and into domain errors on the way out.

## Gates

The repo's `rust-toolchain.toml`, `clippy.toml`, `rustfmt.toml`, workspace lints and scripts win over everything here. `unsafe` stays forbidden unless the repo allows it. Prefer workspace dependencies, and don't invent unstable rustfmt options. When the repo defines no commands:

```bash
cargo fmt --all -- --check
cargo clippy --workspace --all-targets -- -D warnings
cargo nextest run   # when nextest is the repo's runner; otherwise cargo test
```

## Types

- Domain states are enums with payload variants, Serde-tagged with tag and field names that match the wire contract. `Result` for expected failures, `Option` for absence; no string states or boolean bags.
- No production `.unwrap()`, `.expect()`, `panic!`, `todo!` or `unimplemented!`, and no re-allowing those clippy lints outside tests. Tests may unwrap where the repo relaxes the lints for test code.
- `serde_json::Value` only at an unknown or partial envelope, and classify it into an enum straight away. Substring search on model text is not a protocol. A pass-through protocol checks size, auth and malformed JSON only, and reads `"type"` out of a `Value` only when this crate owns that schema.
- Wire codes and human copy are separate channels, so a CLI phrase never ships as JSON:

```rust
impl RoutingReason {
    pub const fn as_str(self) -> &'static str { /* snake_case wire code */ }
    pub const fn human_phrase(self) -> &'static str { /* CLI copy */ }
}
```

When a new kind of identity or validated string appears, give it its own newtype whose constructor returns `Result` and rejects the empty string, and keep kinds apart (`AccountId`, `ReservationId`) even when both serialize as UUID strings ([build valid shapes instead of checking loose ones](../principle-types-are-communication/SKILL.md)).

```rust
impl AccountId {
    pub fn new(value: impl Into<String>) -> Result<Self, IdError> {
        let value = value.into();
        if value.is_empty() {
            return Err(IdError::Empty);
        }
        Ok(Self(value))
    }
}
```

Where bytes arrive from the wire, a file or a row, deserialize into the wire shape with Serde, build the domain value through its constructor, and fail closed with a field-tagged error such as `CorruptAccount { field }` ([deserializing proves the shape, not the meaning](../principle-types-are-communication/SKILL.md)). An unknown stored `status` never defaults to enabled, and a sentinel `Unknown` or `Default` never persists as a terminal state.

## Errors

Domain errors use `thiserror`; `anyhow` appears only where the repo already uses it at a named edge.

Where an error leaves the crate, convert `sqlx::Error`, `std::io::Error` or a transport error into this crate's `thiserror` enum at that boundary ([translate at the boundary, in both directions](../principle-separate-the-concerns/SKILL.md)).

When an effectful RPC's reply doesn't parse after the mutation was sent, return an `OutcomeUnknown` variant carrying what reconciliation needs, never `Ok` ([an unknown ending is never a guessed success](../principle-design-for-failure/SKILL.md)).

## Time

- Use the time crate the repo chose, `chrono` or `time`, and never both.
- Wall-clock timestamps are timezone-aware UTC, serialized as RFC 3339 where the wire contract asks for it.
- `Instant` and `Duration` are for elapsed time and timeouts only, and an `Instant` is never serialized. A numeric duration names its unit (`timeout_ms`).
- A local-calendar schedule carries its timezone. Don't store local intent as UTC, and don't mix epoch units or ad-hoc timestamp strings.

## Async

The entrypoint owns the one Tokio runtime (`#[tokio::main]` or the test runtime): no async-std, no smol, no nested `Runtime::block_on`. Blocking work goes to `spawn_blocking` in the smallest unit; a dedicated thread only when the work must outlive a task or can't join the blocking pool.

```rust
// bad: a nested runtime inside an async CLI
let runtime = tokio::runtime::Builder::new_current_thread().enable_all().build()?;
runtime.block_on(render_loop())

// good
render_loop().await

// bad: one blocking lump around a sync open plus resolve
tokio::task::spawn_blocking(move || {
    let resolver = ProxyCredentialResolver::open(&db_path, &secret_root, now)?;
    resolver.resolve_provider_credentials(&account_id)
}).await?

// good: the async store stays on the runtime; only the secret read blocks
let account = self.state_store.load_account(account_id).await?;
let bundle = tokio::task::spawn_blocking(move || secret_store.read_secret(&key)).await??;
```

- The hot path forwards first; affinity, audit and database side effects run in the background, and migrations and maintenance stay off the request path. Every hot-path wait is bounded with `select!`, a timeout and cancellation.
- An accept loop interleaves `accept`, `join_next` and shutdown in one `tokio::select!`, so it never accepts N connections and only then awaits them. `join_next()` returns `None` whenever the set is empty, which in an accept loop means no connection is open right now; guard that branch and keep accepting.

When work leaves the hot path through `tokio::spawn`, register it with a `TaskTracker` or the crate's equivalent, give it a cancellation path, and drain it at shutdown ([every background task has an owner](../principle-design-for-concurrency/SKILL.md)).

Before putting a `Mutex` around state that crosses an `.await`, check whether one owning task can hold that state instead; when a lock stays, choose its scope from the invariant it protects, hold a per-key `tokio::sync::Mutex` lease with a synchronous key lookup when the resources are independently keyed, and never hold a `std::sync::Mutex` guard across the `.await` ([remove the sharing before you serialize it](../principle-design-for-concurrency/SKILL.md)).

## Names

Modules that carry a responsibility get two or three words (`native_channel_relay.rs`, `stored_thread_catalog.rs`), never `util.rs`, `types.rs`, `sync.rs` or `db.rs`. `main.rs`, `lib.rs`, `mod.rs` and a crate-root `error.rs` stay conventional, and `error.rs` holds only the crate's errors.

When naming a function, name the effect it has: `attach_and_observe` is not a read, and an `open` that migrates needs a name that says so ([a name is a promise about the effect](../principle-define-the-domain-first/SKILL.md)).

## Crates and dependencies

Dependencies point one way. Cargo rejects a cycle between crates through normal and build dependencies, and allows one between modules, so a boundary that must hold is a crate boundary. Keep the layers the repository already has. Before adding a crate, name the boundary that needs the compiler to hold it, and prefer a few large crates to many small ones, since each extra crate adds public surface, duplicated generic code and churn ([add complexity only when an outcome needs it now](../principle-justify-the-complexity/SKILL.md)).

One allowed shape, for an application whose execution and rules have grown apart (illustrative, not required):

```text
contracts   ids, ports, shared data            depends on nothing above it
runtime     stores, workers, adapters          depends on contracts
service     the application's rules            depends on contracts, runtime
host        startup: builds and injects        depends on all three
```

- When a lower crate needs something from a higher one, move the item down, split the type, or have the lower crate declare a small trait that the higher crate implements. Never add the upward dependency, and never move the caller up to dodge it.
- Inside a crate, module cycles compile and grow quietly. When the repo has a module-cycle check, keep it passing by breaking the new cycle; refresh its baseline only to record a cycle that shrank or a rename.
- When wiring a component, give its constructor the named handles it uses, built at the composition point for their lifetime ([wire each dependency where its lifetime starts, and hand each part only what it uses](../principle-separate-the-concerns/SKILL.md)). In Rust a service locator usually looks like a `Services` or `Context` struct passed down for callers to pick from, a global registry, or an `Arc<dyn Any>` map; replace it with the handles.
- Keep a test helper that only its own crate uses in a `#[cfg(test)]` module or under `tests/`. When other crates' tests need it, export it behind a `test-support` feature that no default feature and no production dependency enables, and check that the shipping package's production dependency view (`cargo tree -p <package> -e normal,build,features` with its release target and features) does not show the feature. Cargo merges features across a build, so a dev-dependency alone does not keep it out, and the tree is a diagnostic, not proof of what the release build compiled.
- When an item moves to another crate, update every caller in the same change; leave no `pub use` at the old path.

## Storage

IF the change touches SQLx queries, migrations or pools, load `references/sqlx-sqlite.md` and return each rule that applies to the change under the selected backend and the repo's conventions, met or named as a gap, and the checked-query metadata command when the repo uses checked queries.

## Tests

Integration tests live where the crate already puts them, `tests/` or `crates/*/tests/`.

When a test proves async behavior, hold a step open with a blocking test double and bound the wait with `tokio::time::timeout`, never `sleep`; for the hot path, that double shows forwarding still completes while a side effect blocks ([a race test has to make the bad interleaving happen](../principle-write-tests-that-can-fail/SKILL.md)).

## Signs you skipped it

- `status: String`, a pair of `bool`s standing for a state, or `serde_json::Value` where the shape is known.
- `.unwrap()` or `.expect()` on a production path, or one `id: String` used for two kinds.
- `sqlx::Error` or `std::io::Error` in a public signature, or `Ok` after a mutation whose reply didn't parse.
- A `std::sync::Mutex` guard held across `.await`, a nested `block_on`, or an untracked `tokio::spawn` for work that must finish.
- `sleep` in an async test.
- A lower crate's `Cargo.toml` naming a higher crate, a services struct handed to constructors, a `pub use` left at a moved item's old path, a module-cycle baseline that grew, or a `test-support` feature in the shipping package's normal/build feature tree.
