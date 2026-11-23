# Artifact and Author Self-Review

This reference owns artifact structure choice, normative-home integrity, navigation, view verification, pruning, and the author self-check.

Expected inputs: authority/problem model, outcomes/non-goals, `core` and `later` slices, need and rule records, contract inventory, cross-cutting obligations, and repo documentation conventions.

Return in workflow order: first the artifact structure decision, artifact identity, traceability/navigation result, view-verification result, and pruned elements; after the caller runs the complete author self-check stage, return the author self-check with exact gaps.

## Choose Structure for the Reader

Apply the record and page layout returned from `design-documents.md` before choosing sections: need and rule records, and the page's why and what parts. For chat-only work, keep separately labeled Requirements and Specification parts.

A substantial specification normally needs homes for:

```text
load-bearing decisions
problem and current observable reality
consumers and authority
domain entities two readers could read differently: identity, relationships, invariants, observable states
goals, outcomes, success conditions
non-goals and negative space
source and decision basis
rules, with their cases
observable surface contracts
failure and partial-success expectations
cross-cutting obligations and constraints
resolved alternatives when they change meaning
decision and assumption records
open decisions and evidence gaps
```

Records hold the needs, rules, decisions and assumptions; the page sections hold the rest. These are not mandatory headings. When the capability map fires, group the page's what sections by capability: each `R` is shown once, under its home capability. Entities stay one section that every capability links to. Within a capability, and in a one-concern set, organize by journey, protocol, domain, or decision when that better preserves the specification spine. Use concrete reader questions to check whether the group purpose, invariant, failure, open decision and deciding proof remain understandable.

An `R` takes its home from the `U` rows it traces to. When those rows sit in different capabilities, home it in the capability whose reader would look for it first and name the others under "also serves". An obligation with no `U` row, such as a platform constraint, takes the capability whose behavior it constrains. A cross-cutting obligation, such as one audit rule over every capability, takes the home of the need that asked for it and lists the rest under "also serves". `E` and `R` identifiers never encode a capability, so regrouping renumbers nothing. A long page splits by capability, never by kind of meaning.

Keep these workflow and process details out of the design artifact:

- source or review coverage;
- self-check and readiness state;
- acceptance narration;
- process history and advisor names;
- PR lifecycle;
- research ledgers.

A compact source pointer may remain when readers or tooling use it for authoritative lookup. Rationale must stand on technical or product constraints.

Link to the admitted Requirements identity. Do not copy its user needs, priorities, or boundary narrative onto the page or into a rule.

## Navigation

Lead with the smallest Why/What model that lets a human confirm the problem and intended outcome, then reveal the entities, rules, observable contracts, failure behavior and constraints. A rule's need link carries the trace; follow it instead of drawing a chain by hand. Diagrams may explain relationships but may not be the only home of normative meaning.

## Apply Required Why/What Views

Consume each selected view's reader question plus the predicates, cardinality, and must-expose fields from the `SKILL.md` Required Why/What Views table without restating them. Before returning, compare the actual shown view with that selected table row: verify the required number of views and every must-expose field in the displayed result itself. Preserve separate class journeys; when the source establishes no pain or evidence, show that exact gap rather than inventing one, and when current behavior already supplies the desired outcome, show that preservation explicitly.

Consume the shared rendering result for the actual shown view and reject any missing semantic field, failed visual check, unresolved fallback, or content that does not answer its stated reader question. A shared-renderer gap blocks. A generated image passes or fails under `sunstack-dev/shared-references/generated-document-visuals.md`.

- The capability map lets the owner confirm the parts at a glance. It is built from the records over the confirmed capability list, so the list keeps one home. A linked rule appears once, under its home, and names the other capability:

  ```text
  import    card charges and receipt photos arrive in a claim without retyping    R1 R2 R5   R5 also serves approval
  approval  a manager approves or returns a claim, with a reason, in one place    R3 R4 R6
  payout    an approved claim reaches the employee's account on the next pay run  R7 R8
  ```

  An entry named `ingest service`, or arrows between capabilities as if they called each other, has crossed into structure and routes to `design-program`.
- Journey maps cite the need records they explain; the records remain normative. Good steps express the user's job and source-established observable pain, or mark that pain and its evidence unknown. A screen tour, component name, or cross-class chain is not a journey.
- Context diagrams keep the system opaque and place external consumers, stakeholders, surfaces, contracts, and relevant non-consumers around the boundary. Internal components, owners, stores, or enforcement points are structural How and route to `design-program`.
- Entity maps show each `E` entity with its identity rule, relationships with cardinality, and observable states; the entity definitions stay normative. A map that shows a package, schema, type, or store has crossed into `design-program`.

Prune a view that adds no decision clarity. View application is complete when every fired predicate has the required number of passed views, each required semantic field is visible, and adding another view would only duplicate an existing relationship.

## Human Deletion Test

For every heading, paragraph, list, table, and diagram, ask what first confirmation, correction, decision, trace, failure simulation, proof path, or later authoritative lookup becomes underdetermined if it disappears. Delete or merge the element when the answer is none.

Preserve:

- authority and negative space;
- problems, outcomes, rules, and observable contracts;
- failure obligations, constraints, and proof;
- rationale, examples, and relationships a human needs to challenge the meaning.

Flag process, review, or PR narration; sibling-role recitals; summaries that repeat the preceding model; record text copied onto the page; and decorative views. Give shared authority or boundary meaning one smallest useful home and link to it elsewhere.

Use plain, specific headings that tell the reader what they will learn or decide. A specialized domain term is fine when it carries stable meaning; formal-sounding prose that adds no decision, relationship, rationale, boundary, example, or correction point is not.

## Author Self-Check

Re-read the records and the page and record:

- source authority conflicts or stale evidence;
- a `core` rule with no need, a `core` need with no rule, or a rule whose cases lack its reference;
- a rule over a contested noun the page does not define, an entity with no identity rule or with implementation terms in its definition, or a defined entity no rule uses;
- vague, compound, multi-sentence, or task-shaped rules;
- missing negative, failure, partial-success, cancellation, or compatibility behavior;
- hidden internal How;
- contradictory goals and non-goals;
- duplicated normative homes, including record text copied onto the page;
- missing, semantically incomplete, unreadable, or decorative Required Why/What Views;
- a substantive section that lacks a supported relational diagram, or whose prose does not give its context and interpretation; a tiny fact split into an artificial diagram section;
- a generated image that fails `sunstack-dev/shared-references/generated-document-visuals.md`;
- journey maps that fail to cite their need records or context diagrams that cross into internal How;
- a capability named by a component, a need with no home capability or two homes, a rule copied under a second capability instead of linked, or an identifier that encodes its capability;
- accepted requirements lost or superseded without owner authority;
- changes from the confirmed goal boundary hidden as specification completeness;
- process state, obscure headings, or reader-facing elements that fail the human deletion test;
- whether a human can enter from the needs, understand the smallest Why/What model, follow a need to its rules and their cases, and continue to program design without review notes or scratch.

Then run the design-item pass, in this order:

1. **Sentence support, first.** Read every need and rule record and every page sentence that settles meaning: entity definitions, invariants, defaults and thresholds. Ask of each: does its source support all of what it claims? Return an `unsupported claim` nudge for each one that it does not, with where to read.
2. **Items.** List every design item; return, for each, every applicable label from `design-documents.md`'s nudge labels, or `ok` alone.
3. **Quote lookup.** IF an owner-message export is supplied, look each quoted span up by its authority: for `owner-words`, find the span in the cited row and confirm it is the owner's own text, not option wording or a pasted reply; for `owner-accepted`, find the agent's wording where cited and the owner's acceptance in the cited selection record itself or a later acceptance event, and keep it as agent wording. An export's pasted-text flag is a hint, not a verdict. Otherwise return `quote not checked` with each quoted item's source.
4. **Rank and promote** the `author` and `unknown` items; bring the high-ranked ones that need the owner as decisions.

Every result of this pass is a nudge: it says what you saw and where to read, and it adds no readiness condition.

For a simplification request, return accepted-requirements coverage separately from prose or mechanism deletion, as record ids in the returned state, never in the design. A bare "coverage intact" assertion is not a report. A shorter artifact that loses users, variants, defaults, scenarios, contracts, or proof obligations is scope loss, not pruning.

Run the result against the current artifact state. Record exact failures, not “needs more detail.”

Self-check is author evidence only. It never substitutes for fresh independent review.

Complete when: each need and rule has one record and no copy on the page, every capability reaches its rules or carries a named gap, the reader can navigate need to rule and its cases, every reader-facing element earns its attention cost, boundary and accepted-requirements coverage are intact, and the self-check names every known gap.
