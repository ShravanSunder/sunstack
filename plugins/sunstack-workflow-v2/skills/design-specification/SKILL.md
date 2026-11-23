---
name: design-specification
description: "Use when authoring or revising Requirements from settled meaning, or a Specification's rules and entities. Not for eliciting unwritten owner meaning (discuss-pathfinding)."
---

# Spec Design

Base dependency: locate `sunstack-dev:presentation-html` using the host's listed skill path; from its skill directory go up `../..` to the base plugin root. Resolve every `sunstack-dev:<name>` there as `skills/<name>/SKILL.md`, including hidden principles and domains; append reference suffixes beneath that skill. Resolve `sunstack-dev/shared-references/...` beneath that same root. Never assume the two plugin caches are adjacent.

IF no work reference is in context and the task qualifies, open or resume the trace through `sunstack-dev:practices-show-me-your-work` before phase work.

Requirements, Specification, Program Design, and Verification Design are separate kinds of meaning, each with its own record kind on one milestone page (`design-documents.md`):

```text
Requirements (need records)
  WHY, for whom, and within what boundary?
  Authorized needs, desired outcomes, priorities, and limits.
                    |
                    v
Specification (rule records)
  WHAT must be observably true, and against what reference?
  Normative observable rules, each naming the needs it serves.
                    |
                    v
Program Design
  HOW will the internal system satisfy it?
  Structural realization of the fixed observable obligations.
                    |
                    v
Verification Design
  HOW will each rule be shown to hold?
  Planned checks: what will be seen, on which target, and what stays unverified.
```

A specification is the observable contract for authorized product meaning. Its rules never substitute for the need records that authorize them.

The Lead loads this skill and authors the Requirements and Specification itself, including their views, diagrams, organization, settled sections and visual briefs. Bounded helpers may return evidence. A rendering tool may realize pixels, typography, spacing and style from an unchanged Lead-authored brief, but the Lead chooses the reader question, exact labels and relationships, semantic composition, invariants and exclusions and accepts or corrects the candidate. Neither route transfers governing authorship or makes an image the normative home.

It turns evidence and authorized decisions into a contract that another capable agent can realize without inventing product meaning:

```text
consumer and problem
  -> current observable reality
  -> desired outcome
  -> domain entities the obligations are written over
  -> normative requirement
  -> observable contract or constraint
  -> failure expectation
  -> proof obligation
```

Source authority establishes which meaning is legitimate; it supports the contract rather than replacing it as the primary model. Every `MUST` needs a legitimate basis. Every material requirement needs an observable consequence. An obligation is a sentence about nouns, so the Specification defines those nouns (what makes two instances the same, how they relate, which states they pass through) before it writes obligations over them. Unresolved owner meaning routes through `sunstack-dev:discuss-pathfinding`; internal component structure and the binding of entities to packages, schemas, and wire shapes stay downstream in `design-program`.

## Boundary

This skill admits or materializes durable Requirements from already-settled authoritative meaning and authors the separate Specification:

- Requirements: affected people, authorized needs, desired outcomes, priorities, limits, and non-goals, as need records;
- Specification: normative observable rules, each naming the needs it serves, as rule records;
- problem, consumers, and current observable behavior;
- domain entities: for each noun two readers could read differently, a canonical term with a stable `E` identifier, identity rule, relationships, invariants, and observable states, defined on the page;
- source authority and important user decisions;
- normative requirements and traceability;
- public or externally observable UI, API, CLI, data, configuration, and operational contracts;
- externally required failure, compatibility, security, reliability, performance, accessibility, privacy, and operability obligations;
- proof obligations: the threshold, target constraints, and authoritative reference that decide each material rule, written as its cases;
- `core` and `later` slices;
- the records, the page's why and what sections, and the author self-check.

It does not elicit or confirm genuinely unwritten owner meaning and does not choose components, internal owners, dependency direction, state storage, call graphs, recovery mechanisms, the evidence class, target, or journey that will prove an obligation, task order, files, or exact validation commands, and it does not bind an entity to a package, schema, type, table, or wire shape. Route unwritten owner meaning to `sunstack-dev:discuss-pathfinding`, structural How and entity binding to `design-program`, the proof strategy to `design-verification`, and review-only work to `design-review`.

Routing cases:

```text
true:      "Write a durable Requirements document from these settled, user-confirmed decisions. Do not write the Specification yet."
near miss: "Interview me to discover what users need and which boundary I actually want." -> discuss-pathfinding
near miss: "Clean up this settled Requirements document without changing its meaning." -> docs-maintain
near miss: "Take this through Requirements, Specification, Program Design, Verification Design, and independent design review." -> the full design-cycle workflow, not this phase
```

## Terminal Contract

Return exactly one:

```text
locally-ready
decision-needed
evidence-blocked
deferred
```

A `locally-ready` result includes the milestone page and its need and rule record ids; governing-source identities, authority, current applicability, and coverage; the confirmed goal boundary; the accepted requirements set; load-bearing decisions; the `core` and `later` slices; author self-check; required independent local-review coverage; remaining gaps; and an explicit statement that design acceptance is not claimed. These are returned workflow state, not narrative sections in the specification.

For an explicitly Requirements-only request, finish the need records and the page's why part and return `deferred` for Specification. Before that early return, state the Requirements reader question at Requirements altitude (affected people, their job, current pain and desired outcome), and apply the `capability map` row of the Required Why/What Views table to the needs. When that row fires, the map is the first view request, carrying that row's need fields. Then MUST load `sunstack-dev/shared-references/diagram-rendering-and-fallbacks.md` with those requests to return the document medium and any page proof, the selected medium, semantic-preservation result, actual visual check and exact generated-image/capability gap for that page, and compare the shown map with its table row before returning. This call does not run Specification-only entity or context predicates, writes no rule record, opens no downstream work, and must not invent a Specification, interface or internal component. Record the caller's authority to stop there, the consequence that Specification and Program Design are not ready, the exact visual or capability gap when one remains, and the condition for re-entering Specification work. Do not write rules or recommend `design-program`.

Produce terminal labels by observable condition:

- `locally-ready`: every completion blocker is cleared and the complete return above exists.
- `decision-needed`: legitimate sources cannot settle load-bearing product meaning, public behavior, compatibility, policy, or cost/risk tolerance; return the decision owner and evidence, and IF returning `decision-needed`, load `sunstack-dev/shared-references/owner-decision-brief.md` and return the brief.
- `evidence-blocked`: required governing or observational evidence is missing, inaccessible, stale, or contradictory enough that a truthful obligation cannot be derived; return the exact evidence and access/state change needed.
- `deferred`: an authorized caller explicitly postpones scoped work after its consequence is recorded; return completed coverage, deferred scope, authority for deferral, consequence, and re-entry condition.

After producing the terminal result, return exactly one phase-guided route:

```text
locally-ready -> recommend design-program
decision-needed | evidence-blocked | deferred -> stop with the exact reason
```

When unmade owner meaning blocks Requirements or Specification, use `sunstack-dev:discuss-pathfinding` and resume this phase with its clarified return. Pathfinding is not a separate next phase after `locally-ready`. Before recommending `design-program`, inspect its declared inputs and return a compact pointer-based handoff containing the milestone page and its need and rule record ids, confirmed goal boundary and accepted-requirements status, phase result, exact remaining gaps, and why structural How is next. Do not copy full artifacts, unrelated history, or orchestration counters. A direct design-specification invocation carries no cycle budget.

## Workflow

### 1. Establish authority, audience, and artifact boundary

Accept an optional call-scoped `new artifact home` policy. When the caller supplies `<project-root>/docs/specs/`, create a new milestone's records and page beneath that home and return their exact paths. Preserve authoritative pre-existing artifacts elsewhere; do not relocate or reject them because of the policy. The artifact-home policy applies only to new outputs in the current call and is not persisted as workflow state.

MUST load `sunstack-dev/shared-references/design-documents.md` and return the need and rule records this run writes, the page sections that explain them, the ids downstream phases consume, and the design-item contents, nudge labels and ranking this run uses.

MUST load `references/authority-and-problem-framing.md` and return its first result for stage 1: artifact boundary, consumers, decision authority, governing-source identities/classes and current applicability, confirmed goal boundary, and accepted-requirements recovery. Retain the loaded reference and working state for stage 2 and the terminal return. Surface an exact owner decision immediately when it blocks authoring.

Inventory current sources before treating the draft as truth. External popularity is advisory evidence unless an authorized contract makes it normative.

When implementation or incident evidence names internal mechanisms, classify it as evidence and return every authorized observable outcome before any remaining gap. That evidence does not create an owner choice between retaining the mechanism and turning it into a product contract. Route structural choices to `design-program`; ask only about missing product meaning or an actual external compatibility or operational constraint established by a legitimate source.

IF important user or stakeholder meaning is unwritten, or an authoritative source cannot settle required Requirements or Specification meaning, use `sunstack-dev:discuss-pathfinding`, record which of those two homes owns the missing meaning, and return the complete record, record identity and rows, goal boundary established by `sunstack-dev:discuss-pathfinding` and checked against the fields in the already-loaded reference, explicit confirmation or correction by the authorized owner, refusal or fallback result, and exact gaps.

Consume pathfinding's complete return as input to the recorded Requirements or Specification owner. Do not create a second Requirements record or re-ask an already confirmed decision. If a field required by the already-loaded reference is absent, keep it as an exact gap. Classify the returned record in the governing-source inventory.

If the user declines extraction, reassess the remaining sources:

- continue when an alternate authoritative source exists;
- return `decision-needed` when owner meaning is missing;
- return `evidence-blocked` when necessary evidence is missing;
- keep only non-blocking uncertainty as a visible hypothesis gap.

Decline itself selects no terminal label, and a hypothesis never authorizes a normative requirement or `locally-ready`.

The minimum accepted Requirements source contract is:

```text
source identity
inspectable location when a human must verify the source
affected user and stakeholder classes
capability list (key, owner's name, one-line purpose) and each row's one home capability, when the needs span two or more capabilities
stable U identifiers
need or outcome and why it matters
row-level evidence and producer-owned authority state
priority and priority assigner
unresolved hypotheses
```

A row is normative-eligible only when its producer-owned authority state is `authorized`. A pathfinding record or an equivalent source may satisfy this contract; equivalent sources need not copy the pathfinding document shape. Reuse one qualifying, separately identifiable Requirements source. When settled authoritative meaning is distributed across sources but has no qualifying Requirements home, write it as need records without eliciting, confirming, or inventing meaning, preserving its stable identities, home capabilities, evidence/authority classifications, priorities, and gaps.

The capability list is owner meaning. Take it from the parts the source itself names. When the needs span several parts and the source names none, the list is unwritten owner meaning for `sunstack-dev:discuss-pathfinding` under the rule above; do not name the parts yourself from the rows.

Before deriving normative requirements, consume the explicitly confirmed goal boundary or apply the already-loaded reference's goal-boundary check to another governing source. Proposed meaning outside that boundary returns `decision-needed`; specification completeness does not authorize it.

IF an external platform, protocol, library, policy, or empirical claim could change product meaning or an observable obligation and current local sources do not establish it, perform a bounded lookup directly or use `sunstack-dev:practices-research`; return the exact external source identity/version, authority status, transfer assumptions, and remaining evidence gap before deriving the affected obligation.

Completion: the Requirements source is qualifying, reused or written as need records without duplication; artifact boundary, consumers, decision authority, source classes, confirmed goal boundary, accepted-requirements recovery, and authority conflicts are explicit.

### 2. Model the problem and its domain before proposing obligations

Name what happens today, who bears the cost, where it is observable, what proves it, and what would remain wrong if the requested feature existed only nominally. Keep implementation root cause separate from the observable problem.

Using the already-loaded `references/authority-and-problem-framing.md`, complete problem modeling and return its second result: the authority/problem model with current reality, desired gap, important decisions, conflicts, and evidence gaps. Retain it in working state for the artifact and terminal return.

MUST load `references/domain-entities.md` and return the entity definitions for each noun two readers could read differently (stable `E` identifier, canonical term, identity rule, relationships with cardinality, invariants, observable states, the source terms it canonicalizes, and the authorizing U rows when present or otherwise the settling source or decision record) with every slot filled from the sources or marked as an exact gap, plus undefined-noun gaps and any term routed to `sunstack-dev:discuss-pathfinding` with its exact same-instance question. Define an entity when the settled sources let two readers decide the same-instance question the same way; route a term only when they cannot. A noun every reader reads the same way stays a plain word. Deriving an identity rule or state from settled owner behavior statements is Specification authoring. The inference `references/authority-and-problem-framing.md` forbids is filling in owner meaning the sources leave missing. Two rationalizations leave nouns undefined at this stage and both are rejected: "the data model is design's problem", and "the source did not define enough entity semantics, so I must ask", which is a stop only when two readers would answer differently. An entity definition names no type, schema, table, package, or payload field; that binding is `design-program`'s work.

When revising existing artifacts, classify the requested correction before editing: Requirements, Specification, Program Design, or a named combination. Removing unrelated concurrency, cleanup, reporter, or lifecycle machinery is a Program Design correction unless the authorized owner also changes users, outcomes, requirements, scenarios, defaults, observable obligations, or proof obligations. A Program Design-only correction routes to `design-program` and does not authorize narrowing the governing Requirements or Specification. When upstream meaning and Program Design both change, settle Requirements and Specification first.

For a semantic correction to an existing Requirements or Specification view, re-open its governing sources, re-run correction classification and the affected view predicate and semantic-field check, update the records it touches, and run artifact self-review. Skip unrelated stages unless the correction invalidates their source or decision result. Pure rendering-format changes route to `sunstack-dev:docs-maintain`.

Using the comparison taught by `references/authority-and-problem-framing.md`, build the accepted requirements set from the current owner-confirmed requirements record and confirmed goal boundary. If unavailable, recover the last inspectable owner-accepted governing source. If neither exists or the sources conflict, return `decision-needed` with the authority conflict; mutually narrowed current files never establish the accepted starting point by themselves.

Reuse the existing identities and links for:

- affected classes and stable U, E and R identities;
- priorities and assigners;
- named variants such as skills or scenarios;
- customer defaults;
- observable contracts, constraints, and proof obligations.

Do not create a separate ledger or duplicate document. Every removed or superseded item needs explicit owner authority.

Accepted-requirements coverage is returned state, derived from record ids: each accepted identity's record id, or its owner-authorized supersession, or the gap. It is never written into the design. A count or an assertion that coverage is intact is not coverage evidence.

Re-anchor before deriving or revising normative requirements: compare the proposed meaning with the confirmed goal, accepted requirements, permitted and protected systems, owner-set package limits, non-goals, and existing foundation from the confirmed goal boundary. Return `aligned` or the exact mismatch. On mismatch, stop normative authoring and return the existing owner decision, or use `sunstack-dev:discuss-clarify-mental-models` when the shared model itself drifted. Keep the comparison in returned workflow state, not durable specification prose.

Completion: the current/desired gap is inspectable, each causal claim is evidenced or labeled as a hypothesis, every noun two readers could read differently is a defined entity with an `E` identifier and every slot filled or marked as an exact gap, accepted-requirements coverage is returned by record id when applicable, and the Re-anchor comparison is aligned or has returned the exact mismatch and owner route.

### 3. Define outcomes, non-goals, and semantic slices

State the outcomes the change must create and the nearest plausible expansions it will not create. Separate outcomes from requested mechanisms.

When independently governed capabilities, protocols, domains, or consumer journeys are mixed, split those semantic slices before polishing requirements. Mark each slice `core` or `later`. Only `core` slices get need and rule records; a `later` slice is a `later` deliverable, an id and a title.

Completion: each goal has an observable success condition, each material non-goal blocks a likely scope guess, every slice has one reason to change, and every slice is `core` or `later`.

### 4. Resolve decisions at the correct altitude

Search legitimate sources before asking. Ask only when product meaning, public behavior, irreversible compatibility, policy, or cost/risk tolerance remains undecidable.

Ask one load-bearing decision at a time: load `sunstack-dev/shared-references/owner-decision-brief.md` and return the brief, including foreclosed choices. Delegation, vague assent, silence, or a topic change is not decision authority.

When you write a sentence that settles a choice or rests on something you have not checked, write its design item in the same edit: a decision with its authority first, or, when you cannot show it, an open owner question or an assumption; an assumption as open. Words you wrote that the owner selected or said yes to are the owner's acceptance of your wording: quote them as "the owner selected the option worded …" or "the owner accepted the wording …", and mark any reading you take beyond them as your own assumption. Three excuses skip this; each fails:

- "I'll list the assumptions at the end": a list written after the page invites the miss this section exists for, an invented sentence that already reads as settled.
- "The owner picked it, so those are the owner's words": the owner chose the words; you wrote them.
- "The quote is in the owner's messages, so it's theirs": a selected option or a pasted reply sits in the owner's message and is still agent text.

Completion: each load-bearing branch has durable authority evidence, is explicitly deferred with consequence, or produces `decision-needed`. Return the design items written so far, and a nudge for each decision or assumption you notice without its item, or whose authority cannot be shown; a missing item does not hold this step.

### 5. Derive normative requirements

MUST load `references/requirements-and-traceability.md` with the stage-2 entity definitions and undefined-noun gaps to write each rule as one sentence over defined entities, naming the needs it serves, repair vague or task-shaped statements, and return the rule records plus any need no rule serves and any entity no rule uses.

For substantial or uncertain work, stage source notes, alternative wording, prototype views, and temporary comparisons in private working state, the repository's ignored scratch convention, or `tmp/design-workflows/<date>-<slug>/`. Quick work keeps the comparison in working state. Scratch never owns normative meaning or becomes required reading.

Prune as you go: if removing a rule, contract, failure obligation or constraint changes nothing observable and crosses no necessary truth boundary, delete it; nothing is written down for this test. Owner-set repository or package limits may constrain implementation without becoming normative product behavior. A template slot does not authorize adjacent work.

Completion: every `core` goal is covered, every rule has a basis and an observable pass/fail consequence (its need links are the design check's to report), every rule names only defined entities where readers could differ (an obligation over an undefined contested noun routes back to stage 2, and an entity no rule uses is pruned or its gap recorded), and two capable implementers would not need to invent different product behavior.

### 6. Specify observable contracts and negative space

MUST load `references/observable-contracts.md` to inspect each load-bearing external surface and return its applicable contract, failure, compatibility, example, and undefined-behavior slots.

Completion: each consumer can predict normal, boundary, failure, partial-success, and compatibility behavior without knowing the internal architecture.

### 7. State cross-cutting obligations without designing their realization

For each of security, privacy, reliability, performance, accessibility, observability, data lifecycle, compliance, and platform compatibility that applies, write the externally required guarantee as a rule; record no not-applicable judgment. One question is always answered: when sensitive behavior is in scope, name the assets, actors, prohibited outcomes, and security non-goals. Leave trust-boundary realization and enforcement calls to `design-program`.

Completion: each applicable quality is a rule or constraint, not an adjective or a hidden implementation choice, and sensitive behavior in scope names its assets, actors and prohibited outcomes.

### 8. Name what decides pass and fail

For each material rule, write its proof obligation into its cases: the expected behavior, any threshold, the target constraints it must hold under, and the authoritative reference it is judged against. The rule's sentence stays one sentence. The reference is where the correct answer comes from, such as a protocol specification, an approved design, or a golden output. A latency obligation names its measured boundary, workload class, and threshold. Do not weaken an obligation to what a current harness can observe.

Choose no evidence class, target run, `verify-<app>` journey, reused test, file, command, or capture procedure. Verification Design chooses how each requirement is shown to hold, after Program Design exposes the seams.

Completion: every material rule has cases that a wrong implementation would fail, with its reference named or marked as an exact gap, and none names an evidence class, journey, or command.

### 9. Author the smallest coherent artifact

Apply the Required Why/What Views predicates. For each selected view, state the reader question it answers: which parts the system has and which needs or rules belong to each, whose job and pain must be understood, who interacts with the opaque system and across which observable surfaces, or which nouns the rules are about and what makes two instances the same. IF one or more predicates fire, or the substantial per-document visual obligation applies even when no precise-view predicate fires, load `sunstack-dev/shared-references/diagram-rendering-and-fallbacks.md` before the local artifact reference. Supply the selected precise views plus the per-document explanatory-visual obligation when applicable, and return the document medium and any page proof, plus each view's selected medium, fallback decision, semantic-preservation result, visual-check result, and exact capability or preview gap.

The page's why and what parts each need a meaningful visual beside the explanation they support when substantially authored or revised. Each accepted need that changes a screen, page, or other UI surface gets a UI view grounded in the current app, or records `no current UI`; a people/job/pain picture does not cover a changed screen. The what part may show the same screens only to pin what the user observes; the product stays one opaque system. The shared rendering owner chooses every medium, and `generated-document-visuals.md` owns what a generated image must pass.

Rejecting a requested all-in-one or internally focused diagram does not complete the selected views and does not require owner approval of their presentation. Render the clearest valid replacements that preserve the required meaning. In a read-only or chat-only run, show those views in the response; describing the diagrams without producing and checking them leaves the view work incomplete.

MUST load `references/artifact-and-self-review.md` with the Required Why/What Views decisions and rendering results to choose the artifact structure, preserve the specification spine, apply view discrimination and pruning, and return the structure decision, traceability/navigation result, view-verification result, pruned elements, artifact identity, and exact view gaps.

Apply any caller-supplied artifact-home policy first. Otherwise follow the repository's documented spec location, or use `docs/specs/` for substantial file-backed work. Keep research ledgers and review reports out of the design.

Author top-down: begin with the smallest Why/What map a human needs to confirm the problem and intended outcome, then reveal rules, observable contracts, failures, constraints, and proof.

In a file-backed set, write the need and rule records, each subject's in its own file when the milestone has several (`design-documents.md`), then use `sunstack-dev:presentation-html`, passing the reader's question and the record ids, to write the page's why and what sections: who is affected and why, the capability grouping, the entities readers could read differently, and the context a rule needs to be read correctly. The page shows each record by id and never restates it.

Every link the page names resolves.<!-- D004 -->

The design-item list is generated from the records. Keep unanswered owner questions as open decision records; `presentation-html` chooses how they and every other piece are shown, and its `engineering-documents.md` owns how a section's answer and its view sit together. The why part's views introduce no internal components or enforcement, and no view becomes the only home of a rule. Run the design check and the matching static check through `presentation-html`.

Completion: each need and rule has one record and no copy on the page; every normative claim has one home; a stranger can navigate from need through problem, rule, observable behavior, and proof; every accepted identity has a record or owner-authorized supersession; and the design check reports no `core` rule without a need.

### 10. Run the author self-check

Using the Author Self-Check procedure in the already-loaded `references/artifact-and-self-review.md`, re-read the records and the page. Check authority conflicts, accepted-requirements coverage, rules that name no need, vague or multi-sentence rules, missing contract/failure behavior, hidden How, contradictory goals/non-goals, proof gaps, assumptions disguised as decisions, record text copied onto the page, process residue, obscure headings, and reader-facing elements that fail the human deletion test. For each generated visual, consume its result under `sunstack-dev/shared-references/generated-document-visuals.md`, then return the author self-check with exact gaps, its sentence-support nudges, every applicable label for each design item or `ok` alone, the ranking, and any decisions promoted to the owner.

The design check reports missing need and check links, and prints design notes for a need no rule serves and a rule no realization names. In a file-backed set, then run the design rules over the page with the command in `../design-review/SKILL.md` step 5, and fix or answer each warning before returning; a warning on a link to a record placed on that page is the engine gap step 5 names, so leave it and never add an `id`; a binding-row warning before Program Design exists is expected, so leave it too.

Completion: the current artifact has a self-check result with exact passes and gaps. Self-check is never independent review.

### 11. Obtain fresh local review when required

Call `design-review` using its `classify-review-requirement` operation with: requested future mode `specification-only`; the milestone page and its need and rule record ids; scope and claimed semantic effect; governing-source coverage; matched material-risk predicates; and `caller requirement: required | none` (default `none`). Consume the `review-required | non-substantial` result, decision branch, basis, source coverage, caller requirement, and preserved identities.

When `review-required`, invoke `design-review` separately in `specification-only` mode with fresh context and read-only authority, carrying the milestone page and its need and rule record ids, governing sources, confirmed goal boundary, accepted requirements set, constraints, non-goals, proof claims or gaps, and `owner-message export: path | none`. Route accepted Why/What findings back here and follow `design-review`'s bounded review-and-correction-round policy for its convergence rule, parent verification, and any later review.

Completion: the permitted independent review coverage and parent-verified corrections are ready under `design-review`'s policy, or the exact `non-substantial` basis or block is recorded.

### 12. Return the local result

Return the milestone page, handed over as `design-documents.md` says, and its need and rule record ids; governing-source identities, authority, current applicability, and coverage; confirmed goal boundary; accepted requirements set; decision inventory; `core` and `later` slices; self-check; independent local-review coverage; gaps; and non-acceptance boundary.

IF returning a substantial specification in chat and problem, consumer, authority, journey, or requirement-to-proof relationships are non-obvious, use the `presentation-*` skill matching the current surface to render only those Why/What relationships; honor an exact user-requested format instead. Keep normative meaning in the records and route internal component, call, state, or failure-mechanism views to `design-program`.

Completion: the caller can invoke `design-program`, compose the result into caller-owned workflow state, or provide the exact missing decision/evidence without reinterpreting the artifact.

## Required Why/What Views

Use a view only when it makes an important Why/What relationship easier for a human to understand, confirm, or correct. This table is the sole owner of view predicates, cardinality, and required semantic fields:

| View | Use when | Must expose |
| --- | --- | --- |
| capability map | the needs span two or more capabilities; a one-concern set has none | one map covering the whole capability set (never one map per capability), built from the records and shown before the page's other views; each capability's key, owner-worded name, and one-line purpose, named by what users get and never by a component, internal owner, or store; an area level above the capabilities only when there are more than about seven; each capability's home need records with the rules that serve them; "also serves" links |
| journey map | per normative-eligible load-bearing direct-user class when the job has a material sequence or pain relationship and the view makes that relationship easier to confirm or correct | one distinct view for that class exposing user-worded steps, observed pain and evidence, desired observable difference, and cited U rows; never chain separate direct-user classes into one journey; when pain or evidence is not established, mark that field unknown rather than inventing it, and when the source says the current outcome is already the desired one, show preservation of that settled outcome rather than fabricating a gap; reuse or link a current requirements-level sequence when it already exposes these fields, and keep the user-requirements source as the normative home |
| context diagram | two or more external consumers or observable surfaces exist | consumers and stakeholders, observable surfaces/contracts, relevant negative space, and the system as one opaque node |
| entity map | the page defines one or more entities | entities with `E` identifiers, identity rules, domain relationships with cardinality (belongs-to, references; never component owners), and observable states; the entity definitions remain the normative home and the map shows no package, schema, type, or store |

The first internal component, owner, dependency edge, state store, or enforcement point inside the system crosses into `design-program`. Diagrams may explain relationships but may not be the only home of normative meaning.

## Bounded Evidence Help

IF one bounded evidence, observable-surface, product-intent, or contract question benefits from independent work, use `practices-manage-agents` to select the agent pattern and runtime.

The packet names the exact evidence question, sources, maximum authority, non-goals, and expected anchors. Delegation is parallel-safe only after the source inventory and semantic boundary exist. Instance authority is equal to or narrower than the packet and never includes need or rule meaning, records, prose, organization, views, diagrams, or integration. Return a `complete | partial | blocked` evidence receipt; the Lead opens the decisive sources, verifies the result, and authors the artifact itself.

## Completion Blockers

Do not return `locally-ready` while any of these hold:

- substantial file-backed work lacks need and rule records and a resolvable page, or a `core` slice has no records;
- a need's or rule's text is copied onto the page, or a rule is longer than one sentence instead of carrying its detail in cases;
- settled authoritative Requirements are duplicated instead of reused, or need records written from distributed sources invent or confirm missing owner meaning instead of routing it through `sunstack-dev:discuss-pathfinding`;
- a normative claim lacks authority or an explicit decision gap;
- a rule relies on a noun two readers could read differently that the page does not define; an entity lacks an identity rule that decides the hardest case the source raises, or leaves a relationship, invariant, or observable-state slot neither filled nor marked as an exact gap; or an entity is defined in implementation terms such as a type, schema, table, package, or payload field;
- a user-facing rule serves a need whose authority state is not `authorized`, or a normative-eligible need has no stable U identifier;
- the goal boundary lacks explicit confirmation or correction by the authorized owner, acceptable outcome-level evidence, or the specification expands its goal, affected classes, missing outcomes, permitted/protected systems, owner-set package limits, non-goals, or acceptable complexity without a new owner decision;
- the accepted requirements set cannot be recovered from the current owner-confirmed source or last inspectable owner-accepted baseline, conflicts with those sources, lacks returned coverage by record id, or loses an item without owner-authorized supersession;
- the design check reports a `core` rule with no need;
- unresolved product meaning is disguised as an assumption;
- a returned gap omits an authorized observable outcome, or `decision-needed` is based only on whether implementation or incident mechanisms should be retained or made normative;
- a material non-goal is omitted, an applicable cross-cutting quality lacks a rule or constraint, or sensitive behavior in scope names no assets, actors or prohibited outcomes;
- internal architecture or implementation tasks are presented as requirements without an externally authoritative constraint;
- an applicable Required Why/What View lacks the required cardinality, semantic fields, passed rendering result, or separate normative home;
- an accepted need changes a UI surface and the why part has neither a passed UI view of that moment grounded in the current app nor an explicit `no current UI` gap, without an explicit owner-authorized deferral;
- a material rule's cases lack its reference without an exact gap, or name an evidence class, journey, or command;
- delegated evidence was copied as governing prose or a helper originated, organized, rewrote, or chose the expression of a need, a rule, a settled section, or a required view;
- a required independent review is missing, stale, partial, silent, or blocked;
- governing-source coverage, self-check, readiness, review state, or acceptance/PR narration appears on the page instead of in returned workflow state;
- the page or record ids, source coverage, or non-acceptance boundary is missing.
- a `locally-ready` result omits `design-program`, recommends more than one next skill, or routes to planning, implementation, or pathfinding;
- a non-ready terminal invents a continuation instead of returning its exact decision, evidence, or deferral stop;
- the continuation handoff omits the destination's required boundary and authority state or copies full artifacts and unrelated history.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `sunstack-dev:practices-show-me-your-work`.
