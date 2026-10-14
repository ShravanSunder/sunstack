---
name: spec-design
description: "Use when authoring or revising durable Requirements from settled owner meaning, or a Specification's domain entities and observable obligations. Not for eliciting unwritten owner meaning (discuss-pathfinding) or choosing internal structure (program-design)."
---

# Spec Design

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

This skill answers one question: what must be true for the people this work serves, and how would someone outside the system tell whether it is? It answers in two documents with separate homes:

```text
Requirements    why, and for whom
                who is affected, what hurts today, which outcomes the owner adopted,
                what stays protected, what is out of bounds
                        |
                        v
Specification   what must be observably true
                the nouns the obligations talk about, the obligations over them,
                failure behavior, and the proof each claim needs
```

Neither document says how the system is built. Program Design owns internal structure, Test Design owns the regression strategy, and Verification Design owns real-system proof.

Two judgments carry the work. The first is legitimacy: every normative statement traces to an owner decision or a binding contract. A well-argued proposal, the current code, and your own restatement of the owner are not decisions. The second is precision: for each obligation, picture the cheapest implementation that satisfies its words. If that implementation could still miss the outcome the owner wants, the words are wrong, and you rewrite them until it fails.

The Lead loads this skill and writes both documents, their views and their visual briefs. Helpers return evidence. A rendering tool may realize pixels from an unchanged Lead-authored brief; it never becomes the author.

## Main Path

### 1. Frame the problem and its authority

Start from the people affected. Name each affected class (end users, developers consuming an API or CLI, buyers, operators, downstream agents), what they observe today, who pays for it, and the difference the owner wants. Keep the observable problem apart from its suspected cause; an unproven cause never authorizes product behavior.

Then sort the sources. Normative sources are owner decisions, adopted records and binding external contracts. Everything else is evidence: code shows current behavior, incidents show cost, prior art shows options. Evidence about an internal mechanism yields an observable outcome to preserve, never an owner choice about keeping that mechanism.

MUST load `../../shared-references/requirements-specification-program-design.md` and return the document identities this work uses: the Requirements home, the separate Specification home, and whether each is a file or a labeled chat record.

MUST load `references/authority-and-problem-framing.md` and return the consumer problem, the adopted goal boundary, the governing sources with their authority, and the authority conflicts.

Read `principle-build-the-shared-model-first` in full when you frame the problem, and `principle-read-ground-truth-first` in full before you claim what a source establishes.

IF important owner meaning is unwritten, or the sources cannot settle meaning the Requirements or Specification needs, use `discuss-pathfinding`, record which document owns the missing meaning, and resume with its returned record; never re-ask a decision it already confirmed. Ask the owner only what legitimate sources cannot settle, one load-bearing decision at a time. IF you bring the owner a decision, read `principle-name-the-tradeoffs` in full, then load `../../shared-references/owner-decision-brief.md` and return the brief.

IF an external platform, protocol, library or empirical claim could change an obligation and local sources do not establish it, use `practices-research` or a bounded lookup, and return the source, its version, and the transfer assumptions before you derive the obligation.

The caller may pass a `new artifact home` policy. When it names `<project-root>/docs/specs/`, create new Requirements and Specification files there as distinct paths. Authoritative pre-existing artifacts stay where they live.

Completion: you can state who is affected, what they observe now, which difference the owner adopted and which source authorizes it, and every remaining owner question is exact.

### 2. Hold the boundary

Re-anchor before deriving or revising normative requirements: compare the proposed meaning with the confirmed goal, accepted requirements, permitted and protected systems, owner-set package limits, non-goals, and existing foundation from the confirmed goal boundary. Return `aligned` or the exact mismatch. On a mismatch, stop normative authoring and return the owner decision, or use `discuss-clarify-mental-models` when the shared model itself drifted. Keep the comparison in returned workflow state, not durable specification prose.

Read `principle-hold-the-scope` in full at this comparison. It decides between an adopted constraint and an invented restriction. "Package B stays untouched", confirmed by the owner, binds the design. "Never retry a failed send", added because it felt safer, traces to no one; drop it, or bring it to the owner as a decision.

When revising, classify the correction first: Requirements, Specification, Program Design, or a named combination. Removing unrelated machinery is a Program Design correction unless the owner also changes users, outcomes, obligations or proof. A Program Design-only correction routes to `program-design` and never narrows these documents. When both change, settle Requirements and Specification first.

A revision changes only what its correction touches. Recover the accepted requirements set from the current owner-confirmed record and confirmed goal boundary, or else from the last inspectable owner-accepted governing source; mutually narrowed current files never establish it by themselves. Reuse the existing identities and coverage links: affected classes, stable U/E/P/O/R/C/V identities, priorities and assigners, named variants, defaults, observable contracts, constraints and proof obligations. Produce inspectable per-item coverage that names each accepted identity, authoritative meaning, and specification destination or owner-authorized supersession. A count or an assertion that coverage is intact is not coverage evidence. Every removed item needs explicit owner authority.

Completion: the comparison is `aligned` or has returned the exact mismatch and its owner route, and on a revision every accepted identity has a destination or an owner-authorized supersession.

### 3. Write the Requirements, then confirm and review them

The Requirements document organizes the owner's settled meaning. It meets this minimum source contract:

```text
source identity
inspectable location when a human must verify the source
affected user and stakeholder classes
stable U identifiers
need or outcome and why it matters
row-level evidence and producer-owned authority state
priority and priority assigner
unresolved hypotheses
```

A row is normative-eligible only when its producer-owned authority state is `authorized`. Reuse one qualifying Requirements source when it exists. When settled authoritative meaning is spread across sources with no qualifying home, materialize one normalized Requirements artifact from it, without asking, inferring or confirming missing meaning.

State each outcome separately from any requested mechanism, and name the nearest plausible expansion the work will not make; a useful non-goal blocks a scope guess a capable implementer would make. When independently governed capabilities, protocols or consumer journeys are mixed, split them into semantic slices before polishing requirements.

MUST load `references/requirements-and-traceability.md` and return the adopted Requirements coverage, each normative-eligible U row with its authority, and the owner meaning still unmet.

Author the document by Authoring Each Document below. Then show it to the owner. Explicit confirmation, a correction, or an explicit waiver counts; vague assent, silence, delegation and your own restatement do not. Obtain its independent local review in mode `requirements-only` (step 8) before any Specification work.

A Requirements-only request ends with its RequirementsResult. It creates no Specification and runs no Specification-only entity, context or coverage views.

Completion: the Requirements identity is reused or materialized without duplication, the owner confirmed or waived it, and its local review is ready.

### 4. Define the nouns

An obligation is a sentence about nouns. "At most one pending reminder per ticket" cannot be tested until a reader knows what makes two reminders the same and when a reminder stops being pending. Define every entity the obligations will name: its identity rule, relationships with cardinality, invariants and observable states. Derive them from what the owner already said; reading "a fresh reminder, not the old one" as an identity rule is Specification work, because the owner already decided it. Route a term to `discuss-pathfinding` only when two careful readers of the settled sources would answer its same-instance question differently, and carry that exact question.

IF authoring or changing a domain entity, read `principle-define-the-domain-first` in full, then load `references/domain-entities.md` and return each entity's identity rule, states and invariants, with no type, schema, table, package or wire shape.

Completion: a stranger reading only the Specification can decide every same-instance and state question the obligations depend on.

### 5. Write the obligations, then try to break them

Write each normative requirement in the shape the loaded `references/requirements-and-traceability.md` teaches: over defined entities, with a basis, an observable pass/fail condition, and its failure expectation. Cover normal behavior, boundaries, failure, partial success, cancellation, compatibility, and the nearest behavior deliberately left undefined.

Then break each material obligation. Take the cheapest implementation that satisfies its words and ask whether it delivers the outcome:

```text
Words:    When an operator sends text to pane B, the send succeeds.
Cheap:    The router acknowledges the request; the text lands in the focused pane, or nowhere.
Result:   Outcome missed. An acknowledgement satisfied "succeeds".
Rewrite:  When an operator sends text to pane B, the text appears in pane B's input
          and in no other pane. An acknowledgement without that arrival is a failure.
```

Keep breaking until no cheap implementation passes the words while missing the outcome.

IF authoring or changing an observable obligation, load `references/observable-contracts.md` and return the permitted and forbidden behavior plus the literal-counterexample correction.

For security, privacy, reliability, performance, accessibility, observability, data lifecycle and platform compatibility, state the externally required guarantee or mark it not applicable with a reason. Name assets, actors and prohibited outcomes when sensitive behavior is in scope; enforcement design belongs to `program-design`.

Completion: every goal is covered by obligations over defined entities, each consumer can predict normal, boundary, failure, partial, cancellation and compatibility behavior, and two capable implementers would not invent different product behavior.

### 6. Name the proof each claim needs

MUST load `references/proof-obligations.md` and return which observable claims need proof and the independent reference each is judged against. Scenarios, oracles and test layers stay with `test-design`; real-system observation stays with `verification-design`. When no observation could tell pass from fail at the claimed boundary, return a `program-design-gap` for the missing seam instead of weakening the obligation.

Completion: every material obligation names evidence that could prove it at its real boundary, and every proof gap is explicit.

### 7. Author the Specification and check it

Author it by Authoring Each Document below. The Specification links to the Requirements identity instead of copying its needs, and every normative claim has exactly one home.

For substantial work, stage source notes, alternative wording and temporary U→E→P→O→R→C→V comparisons in working state or `tmp/design-workflows/<date>-<slug>/`. Scratch never owns normative meaning or becomes required reading.

Then re-read the whole document as an author self-check, using the procedure in the loaded `references/artifact-and-self-review.md`: authority conflicts, accepted-requirements coverage, traceability, vague or compound obligations, missing failure behavior, hidden internal How, contradictory goals and non-goals, questions disguised as assumptions, process residue, and elements that fail the human deletion test. The self-check is author evidence and never replaces independent review.

Completion: a stranger can navigate from user need through entity, obligation, observable behavior and proof, and the self-check names every known gap.

### 8. Review each document, then return

Each document gets its own independent local review before its result is locally ready, and the inputs follow the mode:

- `requirements-only` reviews the Requirements alone. It carries the Requirements identity, the governing owner records and sources, and the confirmed goal boundary. No Specification exists yet, and none is required.
- `specification-only` reviews the Specification against its governing Requirements. It carries the distinct Requirements and Specification identities.

Call `spec-program-review` using its `classify-review-requirement` operation with: the requested mode and that mode's identities; scope and claimed semantic effect; governing-source coverage; matched material-risk predicates; and `callerRequirement: required` on a document's first or substantive local cycle, which classification cannot waive. A later purely nonsemantic edit may pass `none` and reuse current coverage under that skill's semantic-change rules.

When review is required, invoke `spec-program-review` separately in that mode with fresh context and read-only authority, carrying the mode's document identities, governing sources, confirmed goal boundary, accepted requirements set, constraints, non-goals, and proof claims or gaps. Correct accepted findings here; the same review relationship checks the corrected anchors under `spec-program-review`'s bounded review-and-correction-round policy.

MUST load `schemas/spec-design-result.ts` and return the RequirementsResult, plus the SpecificationResult when the request covered it, each after its own local review closed. A result is `locally-ready` (the document, its summary, its ready review, and for Requirements the owner's confirmation or waiver), `blocked` (an exact gap with its evidence), or `decision-needed` (the same plus the owner decision brief). Locally ready means the caller can use the document; it never means the five-document design is ready. Program Design consumes the Specification result.

IF returning a substantial specification in chat and its problem, consumer, authority or requirement-to-proof relationships are non-obvious, use the `presentation-*` skill matching the current surface to render only those relationships; an exact user-requested format wins.

Completion: each returned result validates, its review closure names the document it produced, and every gap is in the result instead of in the documents.

## Authoring Each Document

Read `principle-write-for-the-reader` in full before you organize a document. Lead with the smallest Why/What map a person needs to confirm the problem and intended outcome, then reveal requirements, entities, obligations, failure behavior, constraints and proof. Link every normative-eligible U row to the obligation it authorizes, and show one compact `Requirements -> Specification -> Program Design` path instead of repeating each document's role.

Apply the Required Why/What Views below. For each selected view, state the reader question it answers. IF one or more predicates fire, or the substantial per-document visual obligation applies even when no precise-view predicate fires, load `../../shared-references/diagram-rendering-and-fallbacks.md` before the local artifact reference and return the selected medium, fallback decision, semantic-preservation result, visual-check result, and exact capability or preview gap. A Requirements view stays at Requirements altitude: affected people, their job, current pain and desired outcome.

Each newly authored or substantively revised substantial document needs a meaningful visual beside the explanation it supports; reuse a current correct visual when it still explains current meaning. Each accepted requirement that changes a screen, page or other UI surface is a user-visible moment: Requirements shows that moment with Image Gen grounded in the current app, or records `no current UI`. A people/job/pain picture does not cover a changed screen. Specification may show the same screens only to pin what the user observes, and keeps the product one opaque system. Context, entity and other topology views render as Mermaid when the destination renders Mermaid; an exact user format wins, except that a text fence is not a pass for a picture-type view when Mermaid can render. A cache path, prompt, chat-only image or broken embed is not completion, and generated imagery supplements normative prose and tables without replacing them. Rejecting a requested all-in-one or internally focused diagram still leaves the selected views to render; in a chat-only run, show and check them in the response.

MUST load `references/artifact-and-self-review.md` and return the distinct artifact, required views, author self-check and unresolved gaps.

Apply the caller's artifact-home policy first; otherwise follow the repository's documented spec location, or `docs/specs/` for substantial file-backed work. A combined `Requirements/spec` artifact, or a Requirements document that contains the observable contract, does not satisfy the separation. Research ledgers, review reports, readiness narration and process history stay out of both documents.

### Required Why/What Views

Use a view only when it makes an important Why/What relationship easier for a person to understand, confirm or correct. This table is the sole owner of view predicates, cardinality and required semantic fields:

| View | Use when | Must expose |
| --- | --- | --- |
| journey map | per normative-eligible load-bearing direct-user class when the job has a material sequence or pain relationship and the view makes that relationship easier to confirm or correct | one distinct view for that class exposing user-worded steps, observed pain and evidence, desired observable difference, and cited U rows; never chain separate direct-user classes into one journey; when pain or evidence is not established, mark that field unknown rather than inventing it, and when the source says the current outcome is already the desired one, show preservation of that settled outcome rather than fabricating a gap; reuse or link a current requirements-level sequence when it already exposes these fields, and keep the user-requirements source as the normative home |
| context diagram | two or more external consumers or observable surfaces exist | consumers and stakeholders, observable surfaces/contracts, relevant negative space, and the system as one opaque node |
| entity map | the Specification defines one or more entities | entities with `E` identifiers, identity rules, domain relationships with cardinality (belongs-to and references, never component owners), and observable states; the entity table remains the normative home and the map shows no package, schema, type or store |
| requirement coverage table | multiple or interacting material requirements exist, or their U/E/P/O/R/C/V trace is non-obvious | U when present, E, P, O, R, C and V links plus gaps; keep one simple trace inline instead of creating a table |

The first internal component, owner, dependency edge, state store or enforcement point inside the system crosses into `program-design`. Diagrams may explain relationships but are never the only home of normative meaning.

## Bounded Evidence Help

There is no default swarm. IF one bounded evidence, observable-surface, product-intent or contract question benefits from independent work, load `practices-manage-agents` and return the role, form and packet for that question. The packet names the exact question, sources, maximum authority and expected anchors. A helper never writes Requirements or Specification meaning, prose, organization or views; the Lead opens the decisive sources and authors the documents.

## Not Ready While

Do not return `locally-ready` while any of these hold:

- the Requirements lacks a resolvable identity; or, for Specification work, the Specification lacks its own resolvable identity apart from the Requirements, or one artifact plays both roles;
- a normative claim lacks an authorizing source, or rests on a row whose authority state is not `authorized`;
- an obligation names an undefined entity, an entity's identity rule cannot decide the hardest case the sources raise, or an entity is defined in implementation terms;
- a material obligation still passes the cheapest literal implementation that misses the outcome;
- the goal boundary lacks the owner's explicit confirmation or correction, or the documents expand it without a new owner decision;
- an accepted requirement lost its destination without owner-authorized supersession;
- unresolved product meaning is disguised as an assumption, or internal architecture is presented as a requirement without an authoritative constraint;
- an applicable view lacks its cardinality, semantic fields, passed rendering result or separate normative home;
- a helper authored governing prose, organization or views;
- the Requirements confirmation or waiver is missing, or a required local review is missing, partial, stale or not ready.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
