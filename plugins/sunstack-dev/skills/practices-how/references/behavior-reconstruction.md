# Behavior Reconstruction

This reference owns the source walk that turns what you have read into representative paths a reader can simulate.

Expected inputs: the named behavior and question from step 1, the entry and hops read in step 2, and the terms, owners and boundaries from step 3.

Return: for the named question, the representative source-backed path or paths, the owner, state and effect relationships along them, the return and error behavior, and the edges that stay unresolved, with each edge marked observed or inferred.

## What to open

Open the sources that decide the relationships the question depends on:

- the entry and the consumers of its result;
- the parts that own the state the behavior reads or changes, where that state lives and how long it lasts;
- the places that change state or cause an effect outside the process;
- the calls, events, messages and data that connect them;
- the registration, configuration and wiring that decide which implementation runs;
- the failure, retry, timeout and cancellation behavior on the path;
- the boundaries where the path leaves its thread, process, host or system;
- the test or harness that exercises the path, and how its wiring differs from production.

Skip a relationship the question doesn't depend on; a pure calculation has no state lifetime to trace.

## Choose the representative paths

Start with the path the question names. Add the path most callers take when it differs, and a failure or alternate path when the reader's next action depends on it, for example when they are about to change error handling or the behavior they asked about only appears on that branch. A set of paths is representative when every case the reader cares about either follows one of them or leaves it at a branch you name. One path usually covers a function; two or three cover most subsystem questions.

## Record each path

At the entry and at each hop, find the guards that can end the path before its main line runs: early returns, environment or config flags, caps and checks for missing input. Note what each guard returns and who sets each flag it reads. A flag that another process sets for this one, such as a parent that exports a variable before launching a child that runs the same code, is a boundary crossing, so name it with the other crossings.

For each path, carry the walk from step 2 through every function between the entry and the effect, and name the form the result takes on the way back to its consumer: a return value, a thrown error, an emitted event or state a later reader observes. A working note can look like this. It is scratch for your own walk, and the explanation the reader gets takes its shape from their question.

```text
entry -> caller -> owner -> state change or effect
      <- result | error | event | observable state -> consumer
edge kinds: call | await | callback | event | job | external
anchors: file:line for each hop; test or runtime evidence where it exists
```

## Read each edge for what it means

The implementation behind an edge decides whether the sender waits, what it observes, where outcomes and errors go and what ordering or delivery holds, and one name (event, queue, future) covers implementations that answer those differently. For each hop, read the dispatcher, queue client or await site that carries it and record its answers.

- **Call.** Find what catches, wraps or swallows an error between the callee and the caller.
- **Await or future.** Find who awaits the future and where. For one nobody awaits, read what the runtime does with its failure (logs it, crashes the process or drops it) and whether a handler is attached.
- **Callback.** The dispatcher that runs a callback often lives apart from the code that registered it. Find the registration to know who owns the behavior, and read whether the dispatcher runs the callback before it returns or later, and what it does with an error the callback throws.
- **Event or message.** Find every subscriber the configuration registers, whether publishing returns before or after they run, whether the publisher sees their state changes and errors, and the delivery guarantee (at most once or at least once) and ordering the dispatcher or broker gives.
- **Job or queue.** Find whether the submitter gets an acknowledgement or a future it awaits for the result, what it sees when the queue is closed or full, the result is never sent or the consumer rejects the job, where the job records its outcome, how the original requester learns it and what happens after the last retry.
- **External.** A network call, a subprocess or a database. Find the timeout, the retry and what the caller does when the other side is slow, unreachable or answers with an error.

An in-process emitter may call its listeners before `emit` returns. Then the publisher's next line sees the state a listener changed, and a listener that throws raises its error out of `emit` and fails the publisher's request unless something there catches it. Read as fire-and-forget, that edge would lose its error path.

## Check the wiring

Before you explain an implementation as the behavior, find what selects it: the registration in a container or plugin list, the factory and the config value it reads, the route table, the feature flag or the subclass the runtime instantiates. Note the conditions under which a different implementation runs. When the only caller of a class is its own test, say so.

## Keep the production path and the proof path apart

A test can wire fakes, a different config or a shortcut entry. When you use a test to corroborate a path, read its setup and say which parts of production it exercises.

## Ownership smells

Repeated synchronization effects, a value copied into local state, the same derived value computed in two places and cleanup races usually mean two parts disagree about who owns a value. Trace who owns the source value, who derives or copies it, who starts and cancels the effects, and which render or callback reads the stale copy. Report the ownership as the code has it, and leave the design decision the smell points to with the caller.

## Good and bad

Good: an anchored chain from a real entry to the owner that changes state, on to the effect, and back to what the caller observes, with each edge's kind named, observed edges kept apart from inferred ones, and each gap stated where it sits.

Bad: a file inventory; function names listed in call order with no state or effect; a diagram that stops at the effect and leaves out the return or error edge; an implementation explained as live behavior without the registration that selects it; an accident of the current code described as what the system must do.

## Worked cases

The cases are illustrative, and their file paths belong to a fictional codebase.

### An asynchronous request through a queue

**Question.** "How does exporting a report work?"

**Walk.** `POST /reports/:id/exports` (`routes/exports.ts:14`) validates the request, inserts an `export_jobs` row with status `queued`, enqueues `{ jobId }` (`services/export-service.ts:31-48`) and returns `202` with the job id. A worker process consumes the `exports` queue (`workers/export-worker.ts:9`, registered in `workers/index.ts:22`). It loads the row, renders the file, uploads it and sets the status to `done` with the file URL, or to `failed` with the error message (`export-worker.ts:40-77`). The browser polls `GET /exports/:jobId`, which only reads the row (`routes/exports.ts:52`).

**What the explanation needs.** The path has two halves joined by the queue. The request half ends at `202`, and nothing in it waits for the file. The reply reaches the user through the row and the poll, so the row's status is the contract between the halves. The queue retries a failed message three times (`queue.config.ts:8`), and the worker writes `failed` only inside its own catch, so a job that kills the worker on every attempt, for example by running it out of memory, leaves the row `queued` once the retries run out. A search for other writers of `export_jobs.status` found none; report that search with its result, and leave open whether anything outside this repository resets stuck rows.

**Wrong.** "The endpoint creates the export and returns it to the user." That treats the `202` as completion, hides the worker as the owner of the file and drops the failure that leaves the user polling forever.

### A stale copy in the UI

**Question.** "How does the user's name reach the header, and what updates it after a rename?"

**Walk.** The server owns the profile. `useProfile()` mirrors it into a shared client store, and the rename mutation updates that store on success (`profile-store.ts:18-35`). The settings page reads the store directly, so it shows the new name. The header calls `useState(profile.name)` on mount (`Header.tsx:12`) and renders that local value, so later store updates never reach the screen.

**What the explanation needs.** It names the owner (the server, mirrored by the store), the copy (the header's local state), the copy's refresh rule (none after mount) and the render that reads the stale copy. With those four, the reader can predict that a rename after mount stays invisible in the header until it remounts.

**Wrong.** "The header reads the name from the store." It reads the store once, on mount, and renders its own copy after that. Also wrong for this practice is proposing a fix, such as an effect that syncs the store into the local state. That adds a second writer, and the choice of fix belongs to the caller.

### An implementation that isn't wired

**Question.** "How does the API rate limit requests?"

**Walk.** A search finds `RedisRateLimiter` (`rate-limit/redis-limiter.ts`), a sliding-window limiter with thorough tests. Before explaining it, find what the API uses. The middleware takes a `RateLimiter` from the container (`middleware/rate-limit.ts:7`), and the container binds `InMemoryRateLimiter` unless `RATE_LIMIT_BACKEND=redis` (`container.ts:41-46`). The deployment config in this repository doesn't set that variable (`deploy/api.env`).

**What the explanation needs.** As configured here, the API runs the in-memory limiter, so each instance counts on its own and the effective limit grows with the number of instances. The Redis limiter runs only when that variable is set. Its tests call it directly and say nothing about the API path. Whether an environment outside this repository sets the variable is unobserved, and the explanation says so.

**Wrong.** A careful account of the sliding window in `RedisRateLimiter`, presented as how the API behaves.

### A short pure calculation

**Question.** "How does `proratedRefund` work?"

**Walk.** `proratedRefund` is a 14-line pure function (`billing/proration.ts:20-33`). It takes the plan price in cents, the period length in days and the days used. It returns `0` when the days used reach the period length, and otherwise `floor(price * (periodDays - daysUsed) / periodDays)`. That guard also keeps a zero-day period from dividing by zero. Its one caller passes integer cents (`billing/cancel.ts:58`).

**What the explanation needs.** Those sentences and the anchor are enough. A 3000-cent plan on a 30-day period cancelled after 12 days refunds 1800. The reader can now work out any case by hand, so the explanation is finished.

**Wrong.** A tour of the billing module, a sequence diagram of cancellation or a list of every file read on the way.

## When to stop

Stop when every path the answer relies on runs from entry to effect and back with anchored hops and named edge kinds, or its missing edge is named with where you looked; observed and inferred edges are labeled; the return and error behavior is stated; the owner of each piece of state on the path is named; each unresolved edge says what would settle it; and the reader could predict the named case from those paths.
