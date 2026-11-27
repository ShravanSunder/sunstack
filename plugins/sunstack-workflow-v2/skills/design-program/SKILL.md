---
name: design-program
description: "Use when defining or revising structural How: entities' owners, homes and schemas; components, interfaces, state, flows, failure, trust boundaries, proof seams. Not for what entities mean or other Why/What (design-specification)."
---

# Program Design

Base dependency: locate `sunstack-dev:presentation-html` using the host's listed skill path; from its skill directory go up `../..` to the base plugin root. Resolve every `sunstack-dev:<name>` there as `skills/<name>/SKILL.md`, including hidden principles and domains; append reference suffixes beneath that skill. Resolve `sunstack-dev/shared-references/...` beneath that same root. Never assume the two plugin caches are adjacent.

IF no work reference is in context and the task qualifies, open or resume the trace through `sunstack-dev:practices-show-me-your-work` before phase work.

A program design is the structural realization of a fixed observable contract.

The Lead loads this skill and authors the complete structural How: alternatives, selections, components, ownership, interfaces, state/failure policy, target views and diagrams, final prose and visual briefs. Bounded helpers may return current-system or external evidence. A 🦉 Advisor may challenge and advise through `practices-manage-agents`; advice is neither authorship nor acceptance. A rendering tool may realize pixels, typography, spacing and style from an unchanged Lead-authored brief, while semantic grouping, order, boundaries, labels, edges, invariants and candidate acceptance remain with the Lead.

It explains how authoritative rules become owned runtime behavior:

```text
rule
  -> current-system evidence and constraint degree
  -> structural crux and credible alternatives
  -> entity binding
  -> selected target composition
  -> responsible target component
  -> owned truth / decision
  -> interface contract
  -> state transition
  -> normal flow
  -> failure / recovery / concurrency behavior
  -> proof seam
```

The design is not a component inventory. It must compose: a reader can walk the main flow, locate each source of truth, simulate material failures/interleavings, and see where proof observes the behavior.

## Boundary

This skill owns:

- current-system modeling and target alternatives;
- binding each Specification entity to a semantic owner, a package or module home, a schema/type home, and the shape it has at each boundary it crosses;
- component trees, singular ownership, dependency direction, and internal interfaces;
- state/lifecycle, control/data/call flows, migration/cutover, failure/recovery, concurrency, and consistency;
- structural realization of security, reliability, performance, privacy, accessibility, observability, compliance, and platform obligations;
- proof seams and structural enforcement classes;
- design-program artifacts and author integration self-check.

It does not invent product meaning, observable obligations, entity definitions, task/file order, exact commands, or review verdicts. Requirements owns WHY, for whom, and the authorized boundary; Specification owns WHAT must be observably true and what each entity (`E`) means; Program Design owns HOW the internal system satisfies that fixed observable contract. Design prose uses the Specification's entity terms and never renames them; code identifiers appear in the shape and home cells of the binding table. Route missing Why/What to `design-specification`, review-only work to `design-review`, and planning mechanics to plan creation.

## Terminal Contract

Return exactly one:

```text
locally-ready
specification-gap
evidence-blocked
decision-needed
deferred
```

A `locally-ready` result includes the project page with its realization and decision record ids; the confirmed goal boundary and accepted requirements set from `design-specification`; current-system, constraint, platform, and external source identities with current applicability; structural model and call-path deltas; the design check result; author self-check; required independent local-review coverage; debt/gaps; and explicit non-acceptance. These are returned workflow state, not page sections. The binding table itself is page content.

A bounded scope decision, design excerpt, or chat explanation without that complete return cannot be `locally-ready`, even when its selected structure is sound.

Produce terminal labels by observable condition:

- `locally-ready`: every completion blocker is cleared and the complete return above exists.
- `specification-gap`: governing Why/What, including an entity the design needs, is missing, conflicting, stale, or would be silently invented; return the exact gap and `design-specification` route.
- `evidence-blocked`: load-bearing current-system, platform, feasibility, or proof-path evidence is missing, inaccessible, stale, or contradictory; return the exact evidence and access/state change needed.
- `decision-needed`: exactly two conditions qualify. **Open selection:** two or more viable structural directions remain inside the confirmed goal boundary, and choosing needs owner-controlled cost, risk, compatibility, or policy tolerance that neither the Specification, the confirmed goal, nor the owner's standing instructions settle. **Needed authority:** every viable realization needs a material change or an owner-reserved choice outside current authority (step 4's material scope expansion; step 5's `new` storage engine, driver or migration tool; step 5's injected storage boundary for a home on more than one runtime, which the owner chooses even when every driver already exists, unless the design reuses unchanged a boundary the owner already settled; step 5's identity or cardinality mismatch; or a cutover the owner has not decided), so the work cannot proceed without authorization. Nothing else qualifies: "the structure is new" and "the owner might want to see it" are not decisions, and optional machinery is rejected while the run continues (step 16). Return the decision owner and falsifiers, and load `sunstack-dev/shared-references/owner-decision-brief.md` and return the brief addressed to the Chief of Staff role, never directly to the owner; when no Chief of Staff resolves, follow that reference's recipient-gap rule instead.
- `deferred`: an authorized caller explicitly postpones scoped work after its consequence is recorded; return completed coverage, deferred scope, authority for deferral, consequence, and re-entry condition.

After producing the terminal result, return exactly one phase-guided route:

```text
locally-ready      -> recommend design-verification
specification-gap  -> recommend design-specification
decision-needed    -> stop with the brief from owner-decision-brief.md,
                      routed as that reference says
evidence-blocked | deferred -> stop with the exact reason
```

Before recommending a skill, inspect that destination's declared inputs and return a compact pointer-based handoff containing relevant artifact and governing-source pointers, the phase result and current boundary status, the exact gap or decision, and why that destination owns the next work. A Verification Design handoff includes the project page, the rule and realization record ids, confirmed goal boundary and accepted requirements set, the proof seams and their gaps, and constraints/non-goals. Exclude copied artifacts, unrelated implementation history, and orchestration counters. A direct design-program invocation carries no cycle budget.

## Workflow

### 1. Validate authoritative Why/What

Accept an optional call-scoped `new artifact home` policy. When the caller supplies `<repository-root>/docs/specs/`, create any new file-backed Program Design beneath that home and return its exact path. Otherwise follow the repository's documented location; failing that, a project in an initiative is created inside that initiative's `projects/` folder, wherever the repository keeps the initiative, and a standalone project in `docs/specs/<project>/`. Preserve an authoritative pre-existing Program Design elsewhere; do not relocate or reject it because of the policy. The artifact-home policy applies only to a new output in the current call and is not persisted as workflow state.

MUST load `sunstack-dev/shared-references/design-documents.md` and return the need and rule records this design consumes, the realization and decision records it writes, the page's how sections, and the design-item contents, nudge labels and ranking this run uses. Missing need or rule records for a `core` deliverable return `specification-gap` to `design-specification` before structural work begins; do not write or copy them here.

MUST load the guide's `references/typed-design.md` at the binding `sunstack-dev:presentation-html`'s `references/demistify.md` selects, and return the helpers, fields and files this run writes, and the CLI address from that binding's entry guide `authoring/SKILL.md`. IF the project belongs to an initiative, also load `references/typed-design-initiative.md` and return the initiative root, the project numbers, the qualified-reference form and the alias source. Create a new project with the guide's `design init` at that CLI address.

Read every need and rule record, the page's why and what sections, and the confirmed goal boundary accepted by `design-specification`. Extract authorized needs (`U`), outcomes, priorities, boundaries, the entity definitions (`E`), observable contracts and rules (`R`), constraints, failure expectations, each rule's cases (threshold, target constraints, and reference), the deliverables, non-goals, open decisions, owner-set package or system limits, and the accepted requirements set. Treat the Specification's observable contract as fixed input. If the Specification does not carry or point to the confirmed goal boundary and accepted requirements set, return the exact `design-specification` gap before selecting target structure; Program Design does not reconstruct or rewrite upstream authority.

Classify gaps as `missing meaning | conflicting meaning | feasibility question | design choice | planning detail`. Missing or conflicting meaning returns `specification-gap`; do not patch it locally.

Classify a requested correction as requirements/Why/What, structural How, or both. Removing unrelated implementation machinery is How unless the owner changes governing outcomes or scope. For How-only corrections, consume the accepted requirements set as fixed input. When both change, return to `design-specification` first and resume only after revised Why/What is settled.

For a semantic correction to a structural view, reload current-system evidence and the governing obligation, re-run the affected ownership/interface/call/state/flow decision and view predicate, update the records it touches, and run artifact self-review. Skip unrelated stages unless the correction changes their source, owner, or invariant. Pure rendering-format changes route to `sunstack-dev:docs-maintain`.

Completion: the need and rule records, confirmed goal boundary, accepted requirements set, entity definitions, non-goals, fixed observable contract, correction class, and route-back gaps are explicit.

### 2. Build the current-system model from sources

MUST load `sunstack-dev:practices-how` and return the source-backed current behavior model for each load-bearing behavior the Specification's obligations change or depend on: anchored entry-to-effect paths with their return and error edges, the owners and state on them, their boundary crossings, the test or harness path wherever its wiring differs from production, observed and inferred edges, and the edges left unresolved. Delegated parts of that walk go through the current-system-explorer lane under Bounded Evidence Help.

MUST load `references/current-system-model.md` and return, built from that model, the current component/owner tree, production and proof flows, state/mutation map, failure behavior, constraint degree, `changes / remains authoritative`, the greenfield basis where nothing current exists, contradictions, evidence gaps, and source identities with current applicability.

IF an external platform, protocol, library, sandbox, runtime, or empirical claim could change feasibility, structure, or proof and current local sources do not establish it, perform a bounded lookup directly or use `sunstack-dev:practices-research`. If delegation is useful, the external-prior-art-platform lane may perform that lookup under the Bounded Evidence Help contract; delegation is not required. Return the exact external source identity/version, authority status, transfer assumptions, structural consequence, and remaining evidence gap before selection.

Completion: each load-bearing current behavior has an anchored entry-to-effect path with its return and error edges, or a source-backed greenfield basis; degree of constraint is source-backed; and `changes / remains authoritative` is explicit.

Two questions are always answered: anything that stores or sends says what happens when it fails, and anything that crosses a trust boundary says who is trusted with what. Write every other dimension (components, interfaces, state, calls/flows, concurrency/consistency, compatibility/cutover, and proof) only where it applies, for `core` rules; record no not-applicable judgment. The forced list is the owner's to extend. Never invent a store, protocol, retry policy, migration, governance surface, or other subsystem merely to fill a dimension.

### 3. State the crux and forces

MUST load `references/alternatives-and-crux.md` for stages 3-4 and return the crux, forces, and evidence gaps that block credible alternatives. Apply its structural-crux, forces, alternatives, tradeoff, falsifier, and selection method in working state. Surface only an evidence gap that blocks credible alternatives.

Completion: the design problem is expressed as falsifiable structural choices rather than generic quality goals.

### 4. Generate viable alternatives

Start with the existing foundation and its minimal-change realization. Use clean-boundary, pragmatic, and risk perspectives only when they produce a materially different credible structure. Compare alternatives only when a real choice exists; do not manufacture an architecture to fill the alternatives stage.

Using the already-loaded `references/alternatives-and-crux.md`, select the direction and record its tradeoffs, debt/payer, falsifiers/revisit signals, and unresolved decision/evidence gaps for the terminal result.

New durable identity or history, persistence, certification or governance, a control plane, an external service, cross-run state, or a broad migration is material scope expansion when the confirmed goal boundary did not authorize it. Return the owner decision needed to allow that additional complexity rather than making the mechanism inevitable through design prose.

Re-anchor before selecting target composition: compare the selected direction with the confirmed goal, accepted requirements and non-goals, permitted and protected systems, owner-set package limits, existing foundation, smallest workable change, and acceptable complexity. Delete a mechanism when no confirmed obligation needs it. If pursuing it would widen the confirmed goal boundary or budget, return the exact mismatch and owner expansion decision instead of completing the mechanism. Keep this comparison in returned workflow state, not durable design-program prose.

Explain the selection in ordinary language: what changes, what stays the same, why the smaller structure is enough, what it costs, who bears that cost, and what evidence would justify a larger design. A request to use architecture vocabulary does not replace any of those concrete answers; labels such as “minimal structural delta” or “clean boundary” may summarize the explanation but may not carry it.

Write the selected direction as a choice record whose options are the credible alternatives you weighed, or as a ruling when only one direction was credible, and each accepted debt and each scope rejection as a decision record, in the same edit as its passage: an agent's decision from `author`, with its weight, when the call is inside this phase's structural authority, or the owner's decision where it came from the owner.

Completion: the selected direction names what improves, where cost moves, accepted debt/payer, complexity spent, and evidence that would reopen the choice; the Re-anchor comparison is aligned, has deleted unsupported machinery, or has returned the exact expansion decision; and the actual choice and tradeoff are explained in ordinary language.

### 5. Bind the domain model

IF the design targets TypeScript, Python or Rust, load `sunstack-dev:domain-<lang>` for each such language and return the rules the design's types, interfaces, module boundaries and concurrency follow; the repository's own conventions win where they differ.

MUST load `references/components-ownership-interfaces.md` for stages 5-8 and return, first, the entity binding table: one row per `E` giving its semantic owner, package or module home (`new | modified | existing`, with the code name on `existing` rows), schema/type home, shape at each boundary it crosses, `persisted | derived | cached`, the type convention it follows or `none found`, and, for a persisted home, its storage engine or driver and migration tool, each `existing | new`. A home that must work on more than one runtime names its injected storage boundary and each runtime's driver, each `existing | new`. That reference owns convention discovery, the filled binding-and-shape template, and the existing-code rules.

A `new` storage engine, driver or migration tool, or a second one for a job the repository already does one way, is material scope under stage 4's rule and returns `decision-needed`, so the owner chooses it on the design page before planning. Choosing the injected storage boundary for a home on more than one runtime is also the owner's decision on the design page, even when every driver already exists: return `decision-needed` for it unless the design reuses unchanged a boundary the owner already settled. Engines chosen separately per runtime, with no shared injected boundary, are a design gap to close before `locally-ready`.

Build the entity binding table in working state before selecting a component tree. For the final artifact, use the overview/views-first reading order in stages 15-16. Write each shape in the repository's type conventions; with none found, write fields, nullability, and discriminant. Results and decisions are closed variants with bounded reasons. Disclose by depth: the binding table, then each code shape. Schemas, homes, and payload fields are this step's output even when a request assigns them to planning. Package detail stops at the binding table; exact files stay with planning.

Every design-only concept names the `E` or `R` it serves. An existing type with a different name is a binding recorded in the home cell, never a synonym or a rename. An identity or cardinality mismatch with existing code is a structural choice, and `decision-needed` when resolving it exceeds the confirmed goal boundary. Only a missing noun or a conflicting meaning returns `specification-gap`.

Completion: every `E` has a binding row with every cell filled or marked `gap: <why>`; every persisted row names its engine or driver and migration tool, each `existing | new`; every boundary crossing has a shape in the found convention or a field list with nullability and discriminant; every result or decision contract is a closed variant; and every design-only concept names the `E` or `R` it serves.

### 6. Select the target composition

Using the already-loaded `references/components-ownership-interfaces.md`, apply its target-tree, ownership, dependency, and behavioral-interface method in working state.

Derive the integrated overview from the binding table before detailing mechanisms. For UI/refactor work, include the render/component tree and distinguish state owners, pure views, integration/effect boundaries, and derived state.

IF the design adds a new component, state store, identity, interface, contract, dependency, migration, operating surface, or proof mechanism, MUST load `sunstack-dev:principle-justify-the-complexity` and return, for each one, the specification obligation it serves, what breaks or moves into its callers if it is removed, why the existing foundation cannot supply it, and why it stays within the agreed acceptable complexity. Delete it when no confirmed obligation breaks and its callers would not inherit a lifecycle, policy, or failure rule it owns. Do not complete missing contracts for a mechanism you deleted.

Completion: each component has one job, reason to change, consumers, owned behavior, and justified interface.

### 7. Assign ownership and dependency direction

Name one authoritative owner for each material truth, invariant, lifecycle, and side effect. Define allowed and forbidden edges plus how violations are detected.

Completion: no second source of truth or unexplained shared responsibility remains.

### 8. Define interfaces as behavioral boundaries

Specify caller-visible guarantees, not only signatures. Derive at least one representative interaction from consumer needs while hiding owner policy. Write result and decision contracts as closed variants in the conventions step 5 found.

Using the already-loaded `references/components-ownership-interfaces.md`, complete the component tree, ownership/dependency maps, behavioral interface contracts, forbidden edges, and gaps for the artifact and terminal result.

Completion: a planner can later locate implementation surfaces without deciding interface semantics.

### 9. Model state and lifecycle

MUST load `references/state-calls-and-flows.md` for stages 9-10 and return the applicable state/lifecycle model and current-to-proposed call-path comparison procedure. Apply its state/lifecycle, current-to-proposed call-path, flow, and migration/cutover method in working state.

Use a state machine or table when timing/order changes correctness. Distinguish persisted, derived, cached, and synchronized state.

Completion: every write path reaches one owner and illegal transitions have defined handling.

### 10. Draw normal control, data, and call flows

Trace each material requirement from consumer to owner and observable outcome. Include async/background, event, persistence, cache, and proof-harness paths when they alter semantics.

Using the already-loaded `references/state-calls-and-flows.md`, return the state transitions; for every material runtime-behavior group, the source-anchored current and proposed entrypoint-to-effect paths or proposed-only with explicit no predecessor; added, removed, and changed owner/caller/callee/state/effect/result-error edges plus unchanged edges whose preservation is requirement-critical, safety-critical, or contested; end-to-end control/data flows naming the binding table's shape on each boundary-crossing edge; and compatibility/migration/cutover phase models. Requirements sharing one path may cite one delta. A raw stack trace is evidence, not the design output.

Completion: there is no “and then magic happens” hop; every applicable runtime-behavior design has a visible call path and marked delta edges; every boundary-crossing edge names its shape or a `gap: <why>`; migration phases each name authority, version skew, transition, rollback/reconciliation, failure, and proof.

### 11. Design failure, partial success, and recovery

MUST load `references/failure-concurrency-recovery.md` for stages 11-12 and return the failure/recovery and partial-success map. Apply its detection, containment, retry, idempotency, timeout/cancellation, cleanup, partial-success, recovery, ordering, and consistency method in working state.

Completion: failure flows are as explicit as happy paths and every recovery action has one owner.

### 12. Design concurrency and consistency

Model overlap only when multiple actors, processes, renders, requests, events, or retries can interact. State ordering, atomicity, conflict resolution, duplicates/out-of-order behavior, mechanism class, and backpressure where applicable.

Using the already-loaded `references/failure-concurrency-recovery.md`, return the complete failure/recovery, concurrency, ordering, and consistency decisions plus gaps.

Completion: every material interleaving preserves invariants or has defined conflict/failure behavior.

### 13. Realize cross-cutting obligations

MUST load `references/cross-cutting-realization.md` to map each applicable quality obligation and return its structural owner, mechanism/boundary, failure or degradation behavior, and proof seam.

Standalone security scans remain separate; ordinary trust-boundary architecture remains program design.

Completion: each applicable obligation has structural How, and anything that crosses a trust boundary says who is trusted with what.

### 14. Define proof architecture, structural enforcement, and the realization records

MUST load `references/proof-architecture-and-traceability.md` to return the realization records, proof seams, real/fake boundary decisions, enforcement classes, and one illegality decision per material invalid state: unrepresentable, or rejected at the trusted entry. Each realization record says in one sentence how its owner realizes the rules it names. Add each realization id to the scope of the `core` deliverables that build it. A realization that addresses another project's rule names that rule by qualified id. A structural decision that several projects share is an initiative decision, written once there. The trace is the records' links; the design check computes it.

Write a proof seam or real/fake boundary as a decision record only when the answer is not the obvious one, and each stand-in as an assumption record in the same edit, naming what it stands in for and what would close it.

Do not choose exact test files, commands, or execution order. Completion of this load: the design names no test path and no red/green step for that illegality decision.

Completion: each rule the design check's note lists with no realization has been judged to need no new structure, or now has one; a seam, real/fake boundary or enforcement choice that is not obvious is recorded as a decision; and a rule with no way to observe it is a recorded gap.

### 15. Trace, simplify, and author the artifact

Apply the Required Views predicates. For each selected view, state the reader question it answers: where each entity lives, who owns what, how a request reaches its effect and returns a result, what shape crosses each boundary, how state changes, or how failure is contained or recovered. IF one or more predicates fire, or the substantial per-document visual obligation applies even when no precise-view predicate fires, load `sunstack-dev/shared-references/diagram-rendering-and-fallbacks.md` before the local artifact reference. Supply the selected precise views plus the per-document explanatory-visual obligation when applicable, and return the document medium and any page proof, plus each view's selected medium, fallback decision, semantic-preservation result, visual-check result, and exact capability or preview gap.

A newly authored or substantively revised substantial Program Design renders each fired structural view through the shared rendering owner, which chooses every medium. A screen the user will see also gets a UI view grounded in the current app, beside its structural views, not instead of them. `sunstack-dev/shared-references/generated-document-visuals.md` owns what a generated image must pass; an image never becomes the authoritative design.

In a file-backed set, write the decision records, and the realization records in the file that already holds their rules (`design-documents.md`), then use `sunstack-dev:presentation-html`, passing the reader's question and the record ids, to write the page's how part, organized by the ownership, lifecycle, contract or call-path questions that explain it, and take back the component for each. The page places each record as `design-documents.md` says and never restates it. A call path is labelled source-derived or proposed. Keep open design choices separate from settled structure. Run the design check and the matching static check through `presentation-html`.

Put the entity binding table on the page that holds the entity definitions, in, or directly under the heading of, an element with `id="bindings"`; the design rule reads binding rows only there, on the same page.

`presentation-html`'s `engineering-documents.md` owns how each How explanation and its view sit together. Every fired view still appears with its required fields; a view never substitutes for a binding row or a record, and governing guards, boundary shapes and failure obligations stay visible.

Keep distinct reader questions in separate views when combining them would hide an owner, call edge, state transition, failure path, or proof seam. A request for one diagram or valid Mermaid syntax does not override the fired view predicates or semantic fields: reject the overloaded request and render the separate inspectable views now rather than also producing the lossy all-in-one view.

MUST load `references/artifact-and-self-review.md` with the Required Views decisions and rendering results to consume and verify the binding table and the realization records, apply view examples and pruning, and return the artifact decision, artifact identity, navigation result, view-verification result, pruned elements, and exact view gaps.

For substantial or uncertain work, stage source notes, current/target comparisons, credible alternatives, and prototype component/call/state/failure views in private working state, the repository's ignored scratch convention, or `tmp/design-workflows/<date>-<slug>/`. Quick work keeps the comparison in working state. Scratch is optional evidence, never a normative home or required reading.

Author top-down. Begin with a short answer-first overview through `sunstack-dev:presentation-html`, followed by the rendered fired views. The overview lets a human explain how the specified behavior works, then reveal entity homes, components, interfaces, call paths, state, flows, failure/recovery, concurrency, cutover, trust, and proof. Link through the immediate specification scenario or observable contract rather than jumping from raw customer needs directly to components.

The Lead expresses every realization, entity binding, component, ownership rule, interface, state/failure policy, view, and claim. Unmapped needs return as gaps rather than becoming delegated design work.

After deletion or simplification, compare coverage with the accepted requirements set. Many mechanisms may become fewer, but the complete accepted requirements set from `design-specification` (affected classes, stable identities and requirements, priorities and assigners, named variants, defaults, observable contracts, constraints, and proof obligations) may not lose any item without owner authority. Stop on a conflict with mutually narrowed current files.

Completion: each design element serves a rule, constraint, failure policy, or proof need; after any deletion or simplification pass, the returned state names each accepted identity's record id, owner-authorized supersession or gap; and every fired Required View has a passed rendering result with its semantic fields preserved.

### 16. Run the author integration self-check and record the structure decision

Using the Integration Self-Check procedure in the already-loaded `references/artifact-and-self-review.md`, re-read the complete artifact for entity bindings and boundary shapes, term agreement with the Specification, component composition, singular ownership, dependency direction, interfaces, call-path deltas, state/flow/failure consistency, concurrency, cross-cutting realization, proof seams, the realization records and accepted-requirements coverage, process residue, obscure headings, plan leakage, and unresolved specification meaning. For each generated visual, consume its result under `sunstack-dev/shared-references/generated-document-visuals.md`, then return the integration self-check with exact gaps.

The design check reports missing need and check links, and prints design notes for a need no rule serves and a rule no realization names. In a file-backed set, then run the design rules over the page with the command in `../design-review/SKILL.md` step 5, and fix or answer each warning before returning; a warning on a link to a record placed on that page is the engine gap step 5 names, so leave it and never add an `id`.

Record the structure decision in the artifact: the selected structure, the credible alternatives, their tradeoffs, and the falsifiers that would reopen the choice. Then show, in this order, who does what and where the boundaries are, one representative path from entry to effect, the entity bindings, and the generated design-item list, each in the component `presentation-html` returns for it.

New components and contracts and complexity spent are read from what is shown and the records; accepted-requirements coverage is returned state, derived from record ids. Saying they exist is not showing them; a read-only or chat-only run puts them in the response. When requested machinery falls outside the confirmed goal boundary, reject it and continue with the authorized design; that rejected pressure does not create a new owner decision.

The integration self-check's return also carries its sentence-support nudges, every applicable label for each design item or `ok` alone, the ranking, and any decisions promoted to the owner.

Then continue to step 17 in the same run. Do not ask anyone to confirm the structure: stop only when a `decision-needed` condition holds, and then with its brief.

Completion: the current artifact has exact passes and gaps and records the selected structure with its alternatives, tradeoffs, and falsifiers; the views above were shown; and every accepted requirement remains covered or has owner-authorized supersession. Self-check is never independent review.

### 17. Obtain fresh local review when required

Call `design-review` using `classify-review-requirement` with: requested future mode `program-only`; the project page and its need, rule, realization and decision record ids; scope and claimed semantic effect; governing-source coverage; matched material-risk predicates; and `caller requirement: required | none` (default `none`). Consume the `review-required | non-substantial` result, decision branch, basis, source coverage, caller requirement, and preserved identities.

When required, invoke `design-review` separately in `program-only` mode with fresh context and read-only authority, carrying:

- the project page and its need, rule, realization and decision record ids;
- governing sources, authority states, and coverage;
- confirmed goal boundary and accepted requirements set;
- constraints, non-goals, risk predicates, and claimed proof evidence or gaps;
- the readiness question and any prior coverage plus semantic-change record;
- `owner-message export: path | none`.

Consume each accepted finding's ordered correction route: Why/What returns to `design-specification`; structural How returns here; `both` returns to `design-specification` first and resumes here only after the observable contract is settled; caller-owned decisions return to the caller and this design does not resume until they are resolved. Follow `design-review`'s bounded review-and-correction-round policy for its convergence rule, parent verification, and any later review.

Completion: the permitted independent review coverage and parent-verified corrections are ready under `design-review`'s policy, or the exact non-substantial basis or block is recorded.

### 18. Return the local result

Return the project page, handed over as `design-documents.md` says, and its realization and decision record ids; confirmed goal boundary and accepted requirements set; current-system, constraint, platform, and external source identities with current applicability; structural and call-path-delta maps; the design check result; self-check; independent review; debt/gaps; and non-acceptance.

IF returning a substantial program design in chat, use the `presentation-*` skill matching the current surface to render the selected component, call, state, or failure views before the compact result summary; honor an exact user-requested format instead. The records and the page remain the source of truth.

Completion: the caller can continue to `design-verification` or supply the exact missing specification decision/evidence.

## Required Views

Use a view only when it makes an important structural or behavioral relationship easier for a human to understand, confirm, or correct:

The owner's question column gives the question the view answers on the owner's page; `none` marks agent detail, which sits one action away there.

| View | Owner's question | Use when | Must expose |
| --- | --- | --- | --- |
| component tree | Who does what, and where are the boundaries? | three or more components/levels or contested ownership | responsibility, owner, consumers, reason to change |
| call graph/sequence | What happens when a request comes in? | a material runtime entrypoint-to-effect path is added, removed, or changed; the path explains how a material obligation works; or control crosses owners or async boundaries | current and proposed source-anchored paths, or proposed-only with explicit no predecessor; entrypoint, callers/callees, owning component, sync/async/event edges, state reads/writes or external effects, result/error propagation, current evidence anchors, added/removed/changed edges, and preservation-critical or contested unchanged edges |
| proof call graph | none | proof harness differs from production path | seam, real/fake boundary, observation |
| state machine/table | How does each thing move through its states, and what is never allowed? | lifecycle/order changes correctness | owner, states, transitions, guards, illegal paths |
| data/event flow | none | data crosses storage/process/service boundaries | authority, transformations, persistence/privacy, and the shape on each boundary-crossing edge (name, discriminant, fields with nullability, schema home) |
| failure/recovery flow | none | partial failure, retry, or compensation exists | detection, containment, retry, cleanup, recovery owner |
| trust-boundary view | Who does what, and where are the boundaries? | untrusted actors/input/secrets/processes exist | assets, entry points, policy owner, enforcement, containment |

Paths are valid current-source or traceability anchors; the design must not become a future task inventory.

## Bounded Evidence Help

Select an evidence lane only when its observable predicate holds:

```text
current sources constrain ownership/calls/state/proof and the parent lacks a model
  -> references/lanes/current-system-explorer.md
one bounded external question could change feasibility/structure/proof
  -> references/lanes/external-prior-art-platform.md
```

Before any optional dispatch, MUST use `practices-manage-agents` to pick the role and launch and hand off the lane.

IF a predicate holds and delegation is useful, MUST load `references/lanes/lane-schema.md` and return its shared evidence packet and receipt contract. Dispatch the selected lane with the exact assignment, governing source pointers, observed predicate and prerequisites, bounded evidence question and source scope, and any instance constraint that narrows the selected lane reference. The lane reference owns the invariant mission, maximum authority, return, and stop boundary.

The subagent loads `references/lanes/lane-schema.md` and the exact selected lane path named above.

Parallel-safe only after the lane prerequisites exist and its result is not an input to another selected lane; scheduling may serialize. Instance authority is equal to or narrower than the lane maximum and never includes alternatives, target models or views, design selection, structural realization, prose, normative integration, design review, or acceptance. Return a `complete | partial | blocked` evidence receipt; after one explicit follow-up, silence is `no-receipt`. The Lead opens load-bearing sources, verifies the evidence, resolves conflicts, and alone designs and writes.

## Planning Boundary

Program design settles entity bindings and contract shapes, owners, boundaries, interfaces, state, flows, recovery/concurrency, cutover, trust, and proof seams. Package detail stops at the binding table. Planning writes each deliverable's steps in its record, the plan that explains them, the write surfaces and proof each step must produce, the order of steps inside the deliverable, exact commands, checkpoints, deployment and rollback; dependencies between deliverables live in the deliverable records.

## Completion Blockers

Do not return `locally-ready` while any of these hold:

- a `core` deliverable lacks its need or rule records;
- authoritative Why/What is missing, stale, conflicting, or silently rewritten;
- the confirmed goal boundary or accepted requirements set is missing, unrecoverable, conflicting, or rebuilt from mutually narrowed current files;
- target structure was selected without current-system evidence or a named greenfield basis;
- a material structural choice lacks credible alternatives, explicit tradeoffs, accepted debt and payer, or falsifiers/revisit signals;
- a Specification entity lacks a binding row;<!-- D003 -->
- a binding cell is blank rather than `gap: <why>`;
- a boundary crossing has only a prose shape;
- a result or decision contract is an open string or prose variant list;
- a `core` rule that needs new structure has no realization naming it, or a realization names no rule;
- something that stores or sends has no failure behavior, or something that crosses a trust boundary does not say who is trusted with what;
- a material component lacks one owner, reason to change, consumer, or behavioral interface;
- a material runtime-behavior group lacks a source-grounded current and proposed entrypoint-to-effect path, or proposed-only with explicit no predecessor, including added/removed/changed owner/call/state/effect/result-error edges and any preservation-critical or contested unchanged edge;
- an applicable Required View was selected but not rendered in an inspectable form, or a substantial design with contested ownership or cross-owner control remains prose-only;
- a fired Required View lacks a passed rendering result or any required semantic field was lost in the selected medium;
- a screen the user will see lacks a passed UI view grounded in the current app beside, never replacing, its structural views, without an exact `no current UI` gap or an explicit owner-authorized deferral;
- state, flow, failure/recovery, concurrency, migration, trust, or proof semantics are applicable but undefined;
- delegated evidence was treated as target design, or a helper originated alternatives, target models/views, structural realization, section prose, or any design meaning;
- a mechanism survives even though removing it breaks no confirmed requirement and its callers would not inherit a lifecycle, policy, or failure rule it owns, or simplification loses accepted requirements without owner authority;
- planning would still need to invent an owner, interface, state/failure policy, trust control, or proof seam;
- required independent review is missing, stale, partial, silent, or blocked;
- source/review coverage, self-check, readiness, acceptance, planning, PR, or release narration appears on the page instead of in returned workflow state;
- the page or record ids, source coverage, or non-acceptance are missing.
- a continuation omits a next skill, recommends more than one, or contradicts the terminal mapping above;
- a continuation handoff omits the destination's required exact gap, boundary state, or artifact pointers, or copies unrelated history.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `sunstack-dev:practices-show-me-your-work`.
