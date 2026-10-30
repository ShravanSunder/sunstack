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
