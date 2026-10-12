---
name: principle-concurrency-and-ordering
description: "Use when two actors, retries, callbacks, or late results can touch the same resource, or work runs concurrently. Name the invariant, find the interleaving that breaks it, separate the shared thing before serializing it, and order by causal signals, not sleeps."
disable-model-invocation: true
---

# Concurrency and Ordering

**Apply when** two actors, retries, callbacks, or late results can touch the same resource, or work runs concurrently.

**Rule.** Name the invariant that must hold, then find the order of events that breaks it: two writers, a late result landing after a newer one, a retry overlapping the original, a release before the response. First try to remove the sharing: give each actor its own key, file, or record, and merge when reading. Serialize only when one shared writer is a real invariant, and enforce it structurally (one owner, a transaction, compare-and-swap), not by convention. Order by causal signals (a handle, an event, a version), never by sleeps.

**Why.** Interleaving bugs are intermittent: they pass every test that runs in one order and appear under load. A sleep encodes a guess about timing that the next slow machine breaks.

**The test.**

1. What invariant must hold, and which order of events breaks it?
2. Can the actors stop sharing the thing instead of taking turns on it?
3. Does anything wait by sleeping or polling where an event or handle exists?

**Distinct from.**

- `principle-what-happens-when-it-fails` is one operation's endings; this card is two actors at once. If a retry can overlap a late original, use both.
- Unfinished old work alone doesn't prove unsafe sharing: inspect the actual resource before adding coordination.

**Applied means** you name the invariant, the interleaving you found, and the separation or ordering you chose.

## Worked case

A worker handles a request, releases its hold on the session, and then posts the response. Between the release and the post, a second request takes the session and its response arrives first; the client matches responses by arrival order and shows the wrong one. Better: correlate responses by request id, and post before releasing. The test holds the worker between the two steps to force the bad order, instead of sleeping and hoping.

## Overkill

When one actor owns the state and every completion order gives the same result, interleaving analysis adds nothing. Don't lock state that only one actor touches.
