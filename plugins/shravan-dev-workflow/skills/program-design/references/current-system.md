# Today's System

This reference owns the model of how the system works today: real paths from entry to effect, who owns each truth, where state changes, how failure is handled, and where behavior is observed now.

Expected inputs: the Specification's rules and entities, the bounded system surface, source roots, current docs, tests, logs, and traces, and known platform limits. Return: the current paths with anchors, the degree of constraint, what changes and what stays authoritative, contradictions, and gaps.

## Trace Relationships, Not File Lists

Inspect the smallest useful set:

```text
entry boundary and consumers
runtime components and authoritative owners
mutation and side-effect sites
production calls/events/data flow
state lifetime and storage
failure/retry/recovery behavior
platform/external boundaries
where behavior is observed today: tests, logs, traces, metrics
```

Open load-bearing sources. A file list or search result is not a model.

For each relationship, record direct observation, inference, or unresolved gap. Current code is evidence of today; what is wanted is governed by the Specification.

## Reconstruct Representative Call Paths

For each load-bearing behavior, start at a concrete user, API, event, job, CLI, or test entrypoint and follow the real caller/callee chain to the state mutation, side effect, or external boundary. Then trace the result, error, event, or observable state back to its consumer.

If no current implementation or call path exists, mark the behavior new and record the platform, external-boundary, and observation constraints that still apply, instead of inventing frames or edges.

Use source navigation and tests as the baseline. When runtime stack traces, distributed traces, logs, profiles, or debugger captures exist, use them to confirm which path actually ran. A stack trace is point-in-time evidence, not the whole program model: normalize it into the relevant call chain and keep recursion, framework frames, generated code, callbacks, async continuations, event hops, and process boundaries explicit when they affect ownership or behavior.

Record each representative path as:

```text
entrypoint -> caller -> callee/owner -> mutation or side effect
           <- result | error | event | observable state
edge semantics: sync | async | callback | event | job | external
evidence anchors: source plus runtime/test evidence when available
```

Good: a source-anchored entrypoint-to-effect chain that separates observed runtime frames from inferred edges and shows where ownership, state, failure, or observation crosses a boundary.

Bad: a raw stack dump, a list of function names, or a diagram that omits the return/error path and the state change or side effect.

## Diagnose Ownership Smells

In UI and refactor work, repeated synchronization effects, duplicated derived state, prop/state mirroring, and cleanup races often reveal unclear ownership or lifecycle coupling. Trace:

- who owns the source value;
- who derives it;
- who starts and cancels effects;
- which render or callback observes stale state;
- which current interface forces cross-owner coordination.

The symptom does not prove the target boundary. It names the crux the structure choice must resolve.

## Degree of Constraint

Classify:

```text
greenfield
compatibility-bound
migration-bound
platform-bound
legacy-ownership-bound
```

Name what the change may replace and what remains authoritative.

When an external platform, protocol, library, or runtime claim could change feasibility, structure, or observability and local sources do not settle it, answer that one question from primary sources: the exact version and supported environment, its state and failure semantics, the assumptions that must hold for it to transfer here, and borrow, adapt, or do-not-borrow. Popularity is not authority.

Good: a source-backed map from entry to state owner to side effect to where it is observed.

Bad: a folder inventory, inference recorded as fact, or current code treated as what is wanted.

## Complete When

Each load-bearing behavior has a normalized entrypoint-to-effect path with its return and error behavior and evidence anchors, or is marked new with its constraints; today's observation points are named; contradictions are explicit; and the design can no longer lean on an invented model of today.
