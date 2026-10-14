---
name: program-design
description: "Use when defining or revising the structural How that realizes a settled Specification (owners, entity bindings, interfaces, state, flows, failure handling, trust boundaries and proof seams), or when a concrete seam or observation gap comes back. Not for defining what entities mean (spec-design) or choosing test scenarios and layers (test-design)."
---

# Program Design

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

This skill answers one question: how will the system make the Specification's obligations true, and where does each truth live? A program design is the structural realization of a fixed observable contract. It must compose: a reader can walk a request from its entrypoint to its effect and back, find the one owner of each truth, simulate the failure that matters, and see where the behavior can be observed.

Most designs turn on a few decisions: where authoritative state lives, who owns coordination, retry and timeout, which boundaries are local, process, network, trust or lifecycle, and what must stay real for proof. That set is the crux. Start from the system that exists, find the crux, compare the structures that could credibly settle it, and name who pays for the one you choose. Tables and bindings record a decision already reasoned through; filling them first turns the design into an inventory.

A walk tells you more than a diagram:

```text
Obligation: text sent to pane B arrives in pane B once, or the operator sees it fail.
Current:    the client retries after 2s; the router also retries after its own timeout.
Walk:       the client times out while the router's first write is still in flight.
            The router retries, the client retries, and pane B receives the text three times.
Crux:       retry has two owners.
Choice:     the router owns retry and dedupe; the client sends once and branches on
            delivered | failed(reason). Cost: the client waits up to the router's deadline,
            and the client team gives up its own retry policy.
```

Sort every structural claim the walk produces into one of three kinds. An invariant the structure enforces ("only the router retries") is yours to decide. Owner meaning ("how long an operator may wait") belongs to the Specification; when it is missing, return a `specification-gap`. A fact about the running system ("the terminal transport drops duplicate writes") needs observation; until someone observes it, it is an assumption listed as owed evidence.

The Lead loads this skill and authors the structure, its views and visual briefs. Helpers return current-system or external evidence; a 🦉 Advisor may challenge through `practices-manage-agents`. Advice and evidence are neither authorship nor acceptance.

## Main Path

### 1. Take the governing documents as fixed input

MUST load `../../shared-references/requirements-specification-program-design.md` and return the distinct Requirements and Specification identities this design realizes, plus the observable contract it must not change.

Read the whole Requirements, Specification and confirmed goal boundary. Take from them the authorized needs (`U`), entities (`E`), obligations (`R`), constraints, failure expectations, proof obligations, non-goals and the accepted requirements set. A combined `Requirements/spec` artifact, a missing identity, a missing goal boundary or accepted requirements set, or meaning the design would have to invent returns a `specification-gap`; Program Design never rewrites upstream meaning.

When revising, classify the correction as Why/What, structural How, or both. Removing unrelated machinery is How unless the owner changes outcomes or scope. When both change, return to `spec-design` first and resume after the observable contract is settled.

Apply a caller's artifact-home policy: when it names `<project-root>/docs/specs/`, create a new Program Design there and return its path. An authoritative pre-existing Program Design stays where it lives.

Completion: the governing identities, goal boundary, accepted requirements set and correction class are explicit, and every missing upstream meaning is a returned gap.

### 2. Trace the system that exists

MUST load `references/current-system-model.md` and return the source-backed entry-to-effect and recovery model used to compare proposed changes. Start at a real entrypoint, follow the callers and callees to the state change or side effect, and trace the result and error back to the consumer. Read `principle-read-ground-truth-first` in full before you state how current code behaves.

For each dimension (components, interfaces, state, calls and flows, failure and recovery, concurrency, compatibility and cutover, trust, proof), record whether it is required by a named obligation, satisfied by the existing system with evidence, not applicable with a reason, or unresolved. These are questions, not sections; never invent a store, protocol, retry policy or migration to fill one.

IF an external platform, protocol, library or runtime claim could change feasibility, structure or proof and local sources do not establish it, use `practices-research` or a bounded lookup and return the source, version, transfer assumptions and structural consequence before selection.

Completion: current behavior and what constrains the change are source-backed, and what changes versus what stays authoritative is explicit.

### 3. Find the crux and choose the structure

MUST load `references/alternatives-and-crux.md` and return the crux, the credible alternatives, the chosen boundary, its cost and payer, and the evidence that could overturn it. Start with the existing foundation and its smallest workable change. Compare alternatives only when they differ on a real owner, boundary, consistency, lifecycle or proof decision; when only one credible structure exists, say so. Read `principle-name-the-tradeoffs` in full before you write the comparison.

Re-anchor before selecting target composition: compare the selected direction with the confirmed goal, accepted requirements and non-goals, permitted and protected systems, owner-set package limits, existing foundation, smallest workable change, and agreed acceptable complexity. Delete a mechanism when no confirmed obligation needs it. When pursuing a mechanism would widen the confirmed goal boundary, return the exact mismatch and owner expansion decision instead of completing it. New durable identity, persistence, a control plane, an external service, cross-run state or a broad migration is that kind of expansion unless the goal boundary authorized it. Read `principle-justify-the-complexity` in full before you keep a new mechanism. Keep this comparison in returned workflow state, not durable program-design prose.

Explain the choice in ordinary words: what changes, what stays, why the smaller structure is enough, what it costs and who bears that cost.

Completion: the chosen direction names what improves, where cost moves, the debt and its payer, and the evidence that would reopen it; unsupported machinery is deleted or its expansion decision returned.

### 4. Choose owners, interfaces and bindings

MUST load `references/components-ownership-interfaces.md` and return the chosen owners, interfaces and domain-state and schema bindings. Name one authoritative owner for each truth, invariant, lifecycle and side effect, and state its allowed and forbidden dependency edges. Specify each interface by what its callers can rely on: closed result variants, errors and cancellation, ordering and idempotency. Bind every Specification entity to its semantic owner, package home, schema home and the shape it has at each boundary, in the repository's type conventions.

Read `principle-one-owner-per-truth`, `principle-types-are-communication` and `principle-separate-the-concerns` in full at these choices. Design prose keeps the Specification's entity terms; a code name appears only in binding cells.

Completion: every entity has a binding row with each cell filled or marked `gap: <why>`, every component has one job and one reason to change, and a planner could locate implementation surfaces without deciding interface semantics.

### 5. Walk the calls and states

MUST load `references/state-calls-and-flows.md` and return the state, call and data realization and the real callers it affects. Walk one representative caller end to end through the proposed structure, compare it edge by edge with the current path, and mark what is added, removed or changed. Model a state machine or table when timing or order changes correctness.

Existing stored values and deployed consumers are facts to plan for. They do not justify a compatibility path nobody approved: the default is a hard cutover with its migration, and a dual path needs an owner decision.

Completion: every write path reaches one owner, every boundary-crossing edge names its shape, and no hop reads "and then it happens".

### 6. Walk the failure that matters

IF failure, recovery or overlapping actors affect an obligation, read `principle-design-for-failure` and `principle-design-for-concurrency` in full where each applies, then load `references/failure-concurrency-recovery.md` and return its recovery owner, the repeats that are safe, and the failure or interleaving result. Construct the concrete case: the timeout after the side effect, the callback that arrives after its owner closed, the two writers that race. "Use retries" or "add a lock" is a design only once its owner, eligibility, invariant and observable consequence are named.

IF trust, platform, performance or another cross-cutting constraint changes the realization, load `references/cross-cutting-realization.md` and return its enforcement or observation owner and its consequence for the chosen structure.

Completion: every material failure and interleaving preserves the invariants or has an owned recovery, and every applicable quality obligation has a structural owner or a reasoned not-applicable result.

### 7. Place the proof seams

MUST load `references/proof-architecture-and-traceability.md` and return the sufficient structural seams, the observation points and the interactions that must stay real. Program Design decides where behavior can be observed and what a proof may not replace. Test Design chooses scenarios, oracles, layers and substitutions inside those limits, and planning schedules the resulting work. Decide for each material invalid state whether the structure makes it unrepresentable or the trusted entry rejects it.

Completion: every Specification obligation has one trace row with no blank cell, and every material obligation has an observable seam or an explicit proof gap.

### 8. Author the design and check it

Author it by Authoring the Design below. For substantial work, stage current and target comparisons, alternatives and prototype views in working state or `tmp/design-workflows/<date>-<slug>/`; scratch is never a normative home, and the trace table always lives in the artifact.

After any deletion or simplification, compare coverage with the accepted requirements set. Mechanisms may become fewer; the complete accepted requirements set from `spec-design` (affected classes, stable identities and requirements, priorities and assigners, named variants, defaults, observable contracts, constraints, and proof obligations) may not lose any item without owner authority. Report each identity as `covered | owner-authorized supersession | gap` with its anchor; identities share a row only when every member identity is enumerated and all share the same disposition and anchor.

Then re-read the whole artifact as an integration self-check, using the procedure in the loaded `references/artifact-and-self-review.md`. The self-check is author evidence and never replaces independent review.

Completion: each design element serves an obligation, constraint, failure policy or proof need, every accepted identity has its disposition, and the self-check names every known gap.

### 9. Confirm the structural realization with the owner

Before review, ask the authorized owner to confirm the current structural realization, and end the turn. Lead with what the owner can read:

```text
component view, drawn
one representative entry-to-effect path, drawn
binding table
trace table
deviations and unresolved decisions: none | list
```

Showing means the views and tables are in front of the owner; a chat-only run puts them in the response. Reuse a confirmation only when it covers this same set. Requested machinery outside the confirmed goal boundary is rejected and creates no owner decision. An explicit owner instruction to skip the confirmation and go to review is a waiver; record it, still show the views, and continue in the same turn. A caller's instruction, a packet claim or silence is not a waiver.

Completion: the owner confirmed this structural realization, or waived the confirmation explicitly, or the turn ended `decision-needed` waiting for the reply.

### 10. Review the design, then return

Call `spec-program-review` using its `classify-review-requirement` operation with: requested mode `program-only`; the current Requirements, Specification and Program Design identities; scope and claimed semantic effect; governing-source coverage; matched material-risk predicates; and `callerRequirement: required` on the design's first or substantive local cycle, which classification cannot waive. A later purely nonsemantic edit may pass `none` and reuse current coverage.

When review is required, invoke `spec-program-review` separately in `program-only` mode with fresh context and read-only authority, carrying the three identities, governing sources, confirmed goal boundary, accepted requirements set, the structural-realization confirmation, constraints, non-goals, risk predicates, and claimed proof or gaps. Follow each accepted finding's correction route: Why/What returns to `spec-design`; structural How returns here; `both` returns to `spec-design` first and resumes here only after the observable contract is settled; caller-owned decisions return to the caller and this design does not resume until they are resolved. Follow `spec-program-review`'s bounded review-and-correction-round policy for convergence and later review.

MUST load `schemas/program-design-result.ts` and return the ProgramDesignResult after the structural confirmation or waiver and the local review. A result is `locally-ready` (inputs, the document, owners and crux and seam summary, confirmation, ready review, owed evidence), `blocked` (an exact gap, which may name an upstream owner such as `specification-gap`), or `decision-needed` (an owner tradeoff or the awaited confirmation, with its brief). Test Design and Verification Design consume the ready result; it never means the five-document design is ready.

IF returning a substantial design in chat, use the `presentation-*` skill matching the current surface to render the selected component, call, state or failure views; the durable artifact stays the source of truth.

Completion: the returned result validates, its review closure names the produced document, and every gap is in the result.

## Authoring the Design

Read `principle-write-for-the-reader` in full before you organize the artifact. Author top-down: begin with the rendered fired views, then reveal entity homes, components, interfaces, call paths, state, failure and recovery, concurrency, cutover, trust and proof. Link through the Specification's scenario or observable contract rather than jumping from raw needs to components.

Apply the Required Views predicates. For each selected view, state the reader question it answers. IF one or more predicates fire, or the substantial per-document visual obligation applies even when no precise-view predicate fires, load `../../shared-references/diagram-rendering-and-fallbacks.md` before the local artifact reference and return the selected medium, fallback decision, semantic-preservation result, visual-check result, and exact capability or preview gap.

Ownership, calls, sequence, state, flow, failure and trust render as Mermaid in the file when the destination renders Mermaid. A screen the user will see is also an Image Gen picture grounded in the current app, beside that Mermaid, or the design records `no current UI`. An exact user format wins, except that a text fence is not a pass for a picture-type view when Mermaid can render. A generated image with an invented owner, edge, state or control fails, and never replaces a required view or field. Keep distinct reader questions in separate views when combining them would hide an owner, edge, transition, failure path or seam; a request for one all-in-one diagram does not override the fired predicates.

MUST load `references/artifact-and-self-review.md` and return the structural artifact and views, the self-check and the confirmation gap.

### Required Views

Use a view only when it makes an important structural or behavioral relationship easier for a person to understand, confirm or correct:

| View | Use when | Must expose |
| --- | --- | --- |
| entity -> home map | any file-backed design with a new or modified contract | each `E`, its semantic owner, package or module home marked `new \| modified \| existing`, and schema/type home |
| component tree | three or more components/levels or contested ownership | responsibility, owner, consumers, reason to change |
| call graph/sequence | a material runtime entrypoint-to-effect path is added, removed, or changed; the path explains how a material obligation works; or control crosses owners or async boundaries | current and proposed source-anchored paths, or proposed-only with explicit no predecessor; entrypoint, callers/callees, owning component, sync/async/event edges, state reads/writes or external effects, result/error propagation, current evidence anchors, added/removed/changed edges, and preservation-critical or contested unchanged edges |
| proof call graph | proof harness differs from production path | seam, real/fake boundary, observation |
| state machine/table | lifecycle/order changes correctness | owner, states, transitions, guards, illegal paths |
| data/event flow | data crosses storage/process/service boundaries | authority, transformations, persistence/privacy, and the shape on each boundary-crossing edge (name, discriminant, fields with nullability, schema home) |
| failure/recovery flow | partial failure, retry, or compensation exists | detection, containment, retry, cleanup, recovery owner |
| trust-boundary view | untrusted actors/input/secrets/processes exist | assets, entry points, policy owner, enforcement, containment |
| requirement/design/proof trace | any file-backed design | one row per Specification obligation (`R`), even when obligations share a contract: `U · R · E · owner · interface · shape and home · state · failure · proof`; the `R` cell names its scenario or observable contract; the `U` cell names every Requirements row the obligation traces to; `U` and `E` may read `none: <why>`, and each may list several ids; a cross-cutting row's owner and interface cells cite the mechanism owner; `gap: <why>` marks missing design only |

Paths are current-source or traceability anchors; the design never becomes a future task inventory.

## Bounded Evidence Help

There is no fixed swarm. Select an evidence lane only when its predicate holds:

```text
current sources constrain ownership, calls, state or proof and the Lead lacks a model
  -> references/lanes/current-system-explorer.md
one bounded external question could change feasibility, structure or proof
  -> references/lanes/external-prior-art-platform.md
```

IF a predicate holds and delegation is useful, load `practices-manage-agents` and return the role, form and packet, then load `references/lanes/lane-schema.md` and return its evidence packet and receipt contract. A lane returns a `complete | partial | blocked` evidence receipt and never chooses alternatives, target views, structure or prose; the Lead opens the load-bearing sources and alone designs and writes.

## Where Program Design Stops

Program Design settles bindings and contract shapes, owners, boundaries, interfaces, state, flows, recovery, concurrency, cutover, trust, proof seams and what must stay real. Test Design chooses scenarios, independent oracles, layers and fixtures within those seams. Planning chooses task slices, exact files, order, commands, checkpoints and rollback procedure.

## Not Ready While

Do not return `locally-ready` while any of these hold:

- Requirements and Specification lack separate identities, or upstream meaning is missing, conflicting or silently rewritten;
- the structure was chosen without current-system evidence or a named greenfield basis, or a material choice lacks credible alternatives, cost, payer and the evidence that would reopen it;
- an entity lacks a binding row, a boundary crossing has only a prose shape, or a result or decision contract is an open string;
- a truth, invariant, lifecycle or side effect has two owners or none;
- a material runtime path lacks its current and proposed walk with marked deltas;
- a material failure or interleaving has no owned recovery, or a retry or lock has no named owner, eligibility and consequence;
- a proof seam is missing for a material obligation, or the trace table lacks a row or has a blank cell;
- a mechanism survives that no confirmed obligation needs, or simplification lost an accepted identity without owner authority;
- a fired view lacks its rendering result or semantic fields;
- a helper authored structure, views or prose;
- the structural-realization confirmation or waiver is missing, or the required local review is missing, partial, stale or not ready.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
