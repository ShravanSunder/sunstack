---
name: principle-design-for-concurrency
description: "Use when actors already overlap: two workers, retries, callbacks, background tasks, or late results can touch the same resource. Name the invariant, find the interleaving that breaks it, isolate the shared state before serializing it, and order by causal signals, not sleeps."
disable-model-invocation: true
---

# Design for Concurrency

Read this principle in full before applying it; your own full read earlier this session counts.

Concurrency is how work stays fast and an interface stays responsive, so you want it. The cost is that once actors overlap (two workers, a retry and its original, a callback arriving late, a background task and the code that started it, two tabs) correctness depends on an order you don't control. Interleaving bugs are intermittent: they pass every test that runs in one order and appear under load or on a slower machine. Designing for concurrency means naming the invariant that must hold, finding the order of events that breaks it, preferring to remove the sharing over coordinating it, and ordering by signals, never by time. It copes with concurrency that exists or that you chose for a reason; it is not a reason to add locks.

## How to think it through

**Name the invariant first.** "One active session per user." "A held reservation keeps the item hidden." "The latest write wins." Without a stated invariant there is nothing to check an interleaving against, and "add a lock" is just a guess.

**Walk the interleavings that could break it.** What if B runs between A's read and A's write? What if the response to request 1 arrives after the response to request 2? What if a retry overlaps a slow original? What if a release happens before the response is posted? What if a wait wakes up after its condition has changed again? What if a result arrives for a request already superseded? Two checks answer the last two: after waiting, recheck the condition before acting; and carry a request id or a revision with every async read, dropping any answer captured from state that has since moved on. Cancelling the superseded request saves work, but keep the check unless cancellation guarantees no late result can land; a callback already queued still can.

**Remove the sharing before you serialize it.** Ask whether the actors need one shared mutable thing, or are each publishing their own facts. Give each actor its own key, file, record, or task, and merge when reading. Two workers writing their own field into one shared state file is still shared mutation; two files merged on read is not.

**Serialize only for a real single-writer invariant, and do it structurally.** One owner (a single task or actor that holds the state), a transaction, or a compare-and-swap on a version. Conventions and comments are not concurrency control, and "we need a lock" is a smell to check, not a default.

**Order by causal signals, never by time.** Wait on an event, a task handle, or a version, and never infer readiness from elapsed time. When an external system offers only reads (a status endpoint, no callback), poll its authoritative state with a deadline, backoff, cancellation, and a check that it is still the thing you started. In tests, hold a step open or drive a controllable clock to force the bad order; no wall-clock waits. Before choosing a debounce or throttle, find out the current state and when events arrive.

**Every task has an owner.** Whoever starts background work tracks it, can cancel it cooperatively, and drains it on shutdown; close or await it before claiming the work is done. A fire-and-forget task that must finish can lose its write.

**Bound it.** Fan-out gets a maximum concurrency. Identical work is deduplicated (refresh once per worktree, not once per open tab). Every wait on the hot path has a timeout and a cancellation path. When a producer is faster than its consumer (title updates during generation, a stream of test output), coalesce, batch, or chunk it.

**Keep the hot path clear.** The request path forwards first; audit, metrics, and other side effects run in the background. Blocking work (sync file I/O, CPU-heavy steps) goes to a blocking pool or thread, kept to the smallest blocking unit, never onto the async executor. Use one async runtime per process, because a second runtime means rewriting every I/O boundary. Never nest a `block_on`: inside an async runtime it panics or stalls a worker thread. Don't hold a synchronous lock across an `await`: another task on the same thread can need that lock, and the two deadlock.

**The hard call is whether the overlap is real.** Unfinished old work alone doesn't prove unsafe sharing; inspect the actual resource and who touches it: "Old jobs left in the queue don't show unordered writes; check the owner and the post-then-release sequence before adding another lock." A transiently odd ordering deserves evidence before a change; it may be a symptom of something else. And removing concurrency the work needs is a regression too: serializing requests or tests "to be safe" trades a correctness worry for a slow system. Keep the parallelism and make the shared state safe.

## Example: the response that arrived first

A worker handles a request, releases its hold on the session, then posts the response. Between the release and the post, a second request takes the session, and its response arrives first. The client matches responses by arrival order and shows the wrong one. Better: correlate responses by request id, and post before releasing. The test holds the worker between the two steps to force the bad order, instead of sleeping and hoping.

IF the case in front of you doesn't match the response example, or you are reviewing someone else's concurrent design, load `references/example_scenarios.md` (scenarios, simplest first: two workers, one state file; refresh once per worktree; search results out of order; the background write nobody waited for; the test that could only sleep; the blocking lump; the reservation the scan ignored) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

When one actor owns the state and every completion order gives the same result, interleaving analysis adds nothing. Don't lock state that only one actor touches.

## Signs you skipped it

- A sleep or a delay treated as "ready", in code or in a test; or polling with no deadline, or polling where a completion signal exists.
- Two writers that read the same state and overwrite each other, with no transaction, single owner, or version check between them.
- Responses matched by arrival order.
- A lock or mutex with no named invariant, or a synchronous lock held across an `await`.
- A background task nobody tracks, cancels, or drains.
- Unbounded fan-out, or the same refresh started once per tab.

When one operation can end in a timeout or a partial result, decide what each ending leaves behind and which system knows whether the effect happened ([design for failure](../principle-design-for-failure/SKILL.md)); when a retry can overlap the original, use both. When you decide which single part owns a piece of state, name that owner and the operation the others call ([one owner per truth](../principle-one-owner-per-truth/SKILL.md)).
