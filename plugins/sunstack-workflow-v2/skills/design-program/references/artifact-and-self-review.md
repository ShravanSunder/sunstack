# Program-Design Artifact and Self-Review

This reference owns view application, page navigation, simplification, binding-table and realization-record verification, term agreement, and author integration self-check. `SKILL.md` owns view selection and required semantic fields. `components-ownership-interfaces.md` builds the entity binding table and `proof-architecture-and-traceability.md` writes the realization records; this reference verifies both.

Expected inputs: the need and rule records with the page's entity definitions, accepted requirements set, confirmed goal boundary, current/target models, entity binding table, realization and decision records, debt, selected rendering results, and repo documentation conventions.

Return in workflow order:

1. Page structure and view application, page identity, verification of the binding table and realization records, view-verification result, and pruned elements.
2. After the caller runs the complete integration self-check stage, the self-check gaps.

## Apply Required Views

Consume each selected view's reader question plus the selected predicates and required semantic fields from the `SKILL.md` Required Views table without restating them. Consume the shared rendering result for every firing and reject missing fields, failed visual checks, unresolved fallbacks, or a view that does not answer its stated reader question. A generated image passes or fails under `sunstack-dev/shared-references/generated-document-visuals.md`, and never disagrees with the exact structural views.

For call graph or sequence views, consume the current-to-proposed delta from `state-calls-and-flows.md` rather than copying a raw stack trace. Compare the displayed fields with the `call graph/sequence` row in `SKILL.md`'s Required Views table, and check that each boundary-crossing edge carries its shape as `state-calls-and-flows.md` requires.

Verify the realization records against the design: each names the rules it realizes, each `core` rule that needs new structure is named by one, each agrees with the section that explains it, and no record's text is restated on the page.

Diagrams do not replace behavioral interface or failure prose. Paths may anchor current evidence; the design names owners, package or module homes, and schema homes, never a task list, write scopes, or exact files.

For a substantial design, lead with the smallest integrated overview composed from already-fired views, then reveal detail in the order a reader needs it: diagram, then table, then code shape. Make every selected call or flow view representative of the actual boundary crossing. The view must preserve the semantic fields selected by the caller; format never excuses a missing owner, edge status, state/effect, result/error path, or evidence anchor.

A behavioral journey diagram remains in its owning HTML section with its purpose, important transitions, outcomes and failures explained in context.

Good: the smallest set of views lets a reader simulate composition, execution, and the riskiest failure, and find where each entity lives.

Bad: prose labeled as a diagram, decorative boxes with no semantic owners, every possible view emitted mechanically, syntax chosen before the relationship is understood, or a passed result claimed with missing semantic fields.

## Simplify

Recheck the components, interfaces, states, and mechanisms chosen at target-composition selection against the finished artifact. Remove one that no longer serves an obligation, constraint, failure policy, or proof need, or that owns a truth another component already owns, and record the removal in the returned coverage below.

For every heading, paragraph, list, table, and view, ask:

```text
which requirement/constraint/failure/proof need does it serve:
who reads it:
what that reader loses if it is deleted:
```

Removal is valid only when it changes no human confirmation, correction, decision, trace, failure simulation, proof path, accepted-requirements coverage, or later authoritative lookup.

Remove:

- process, review, or PR narration;
- repeated companion ownership recitals;
- obscure headings;
- summaries that repeat the preceding model;
- views that add no decision clarity.

Preserve:

- authoritative provenance and negative space;
- entity bindings, owners, interfaces, state, calls, and flows;
- failure, recovery, trust, cutover, and proof decisions;
- accepted debt with payer and revisit signal.

After deletion or simplification, return accepted-requirements coverage as record ids in the returned state, never in the design: each accepted identity's record id, owner-authorized supersession or gap. A bare "coverage intact" assertion is not a report. Deleting an entity is a coverage loss.

Choose the expression that fits the relationship:

- concise prose for one rule or rationale;
- the binding table for where each entity lives;
- a component tree for ownership;
- a call or sequence view for entrypoint-to-effect behavior;
- a state table or machine for lifecycle;
- a flow for data, failure, or recovery;
- a comparison table for alternatives;
- a concrete example when an interface remains abstract.

Make headings say what the human will learn, such as “How a Job Moves From Queued to Done,” rather than compressed workflow jargon.

Remove an “Architecture documentation impact” section when it only lists post-implementation documentation or PR cleanup; route that work to planning or `sunstack-dev:docs-maintain`. Remove a “Design completion boundary” section when it only repeats acceptance, review, or planning gates. Preserve any actual system obligation, and keep in the returned self-check the readiness result that says whether planning can proceed without inventing owners, interfaces, state, failure behavior, or proof seams.

## Integration Self-Check

Re-read the whole artifact:

- integrated overview matches detailed models;
- each substantive structural explanation answers its ownership, lifecycle, boundary or failure question through adjacent context, a view of its relationship and interpretation; every separately fired view remains present, and one explanation may group related identities without collapsing required views or bindings;
- every Specification entity has a binding row with owner, home, schema/type home, disposition, and convention, or a `gap: <why>`;
- every boundary crossing has a shape in the found convention or a field list with nullability and discriminant;
- each term means the same thing in the Specification and the design: design prose uses the `E` term, a code name appears only in shape and home cells, and a design noun with no `E` names the `E` or `R` it serves;
- ownership is singular and dependency rules consistent;
- interfaces match state and flows, and every result or decision contract is a closed variant with a bounded reason set;
- every applicable current/proposed call-path delta exposes added, removed, and changed edges plus preservation-critical or contested unchanged edges;
- happy/failure/recovery/concurrency paths agree;
- cross-cutting obligations map to structure/failure/proof;
- every `core` rule that needs new structure is named by a realization, and every realization names a rule;
- anything that stores or sends says what happens when it fails, and anything that crosses a trust boundary says who is trusted with what;
- every accepted requirement and entity remains covered or has owner-authorized supersession;
- every design element has a legitimate basis: run the design-item pass below;
- the artifact records the selected structure with its credible alternatives, tradeoffs, and falsifiers;
- every reader-facing element passes the human deletion test;
- every generated visual passes `sunstack-dev/shared-references/generated-document-visuals.md` and agrees with the prose and exact views;
- progressive disclosure leads from rule through owner, call/state/failure behavior, and proof without scratch or process notes;
- what is shown includes who does what, one representative entry-to-effect path, the entity bindings, and the generated design-item list;
- no planner-owned file, sequence, or command detail leaked in;
- no missing Why/What or entity meaning was invented;
- the Program Design preserves rather than rewrites the needs' authorized boundary and the rules' observable contract;
- two capable implementers would build the same structural behavior and the same contract shapes.

The design-item pass, in this order:

1. **Sentence support, first.** Read every realization record and every sentence that settles a component, owner, store, seam, default or binding, including those the binding table shows. Ask of each: does its source support all of what it claims? Return an `unsupported claim` nudge for each one that it does not, with where to read.
2. **Items.** List every design item; return, for each, every applicable label from `design-documents.md`'s nudge labels, or `ok` alone.
3. **Quote lookup.** IF an owner-message export is supplied, look each quoted span up by its authority: for `owner-words`, confirm the span is the owner's own text in the cited row; for `owner-accepted`, find the agent's wording and the owner's acceptance in the cited selection record itself or a later acceptance event. Otherwise return `quote not checked` with each quoted item's source.
4. **Rank and promote** the `lead-decided` decisions and open assumptions; bring the high-ranked ones that need the owner as decisions through the existing `decision-needed` conditions.

Every result of this pass is a nudge and adds no readiness condition.

Run the self-check against the current program design and governing specification. Keep source/review coverage, readiness, acceptance, planning, PR, and release state in the returned result rather than on the page. A source pointer may remain when later readers need it for authoritative lookup. The self-check is not independent review.

Complete when:

- the artifact composes as one proportional structural realization;
- every fired view has a passed rendering result with preserved semantics;
- the binding table, realization records and current/proposed call deltas are visible, and accepted-requirements coverage is in the returned state;
- unnecessary structure is pruned;
- every known gap is exact.
