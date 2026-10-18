# Reviewing the Four-Document Design

This reference owns `four-document-design` mode judgment.

Four-document design review independently repeats load-bearing local checks; it does not trust author self-checks or prior local review as the only evidence.

Before four-document-design-specific integration checks, MUST load `../../../shared-references/design-documents.md` and return the Requirements, Specification, Program Design, and Verification Design identity status. Then MUST load `reviewing-specification.md` and return its complete specification-mode judgment for the current Requirements and Specification. Then MUST load `reviewing-program-design.md` and return its complete program-mode judgment for the current Program Design and governing Specification. Then MUST load `reviewing-verification-design.md` and return its complete judgment of the current Verification Design against the Specification and Program Design. Four-document design judgment consumes all four separately reconstructed identities and the three local results; it may not replace them with a combined `Requirements/spec`, author summary, or prior-review summary.

If Requirements and Specification are missing or collapsed into one identity, record a blocker-level finding and return `needs-revision`. Route the smallest correction to `spec-design` before any downstream repair. A missing Verification Design, or a Program Design proof column standing in for one, is a blocker-level finding routed to `verification-design`. Do not split, create, or edit artifacts during review. Downstream findings may still be reported when the available sources support them, but they do not remove the first required correction, and the review cannot be `ready`.

Inspect:

- every material specification obligation has one design realization;
- every material design element traces to an obligation, constraint, failure policy, or proof need;
- boundary altitude agrees across the four documents;
- design does not narrow, broaden, or contradict observable behavior;
- each requirement walks cleanly from its obligations to their seams and planned observation (see Requirement to Observation below);
- non-goals and compatibility survive realization;
- security/reliability and other applicable qualities map to owner, mechanism, failure/degradation, and proof;
- retained requirements match the owner-confirmed or last inspectable owner-accepted baseline, including any named variants, defaults, constraints, and proof obligations;
- the four documents remain separately identifiable, with normative Specification obligations tracing to the governing Requirements source;
- every applicable material runtime-behavior group has a visible current/proposed call-path delta or explicit no-predecessor case, with added, removed, and changed edges plus preservation-critical or contested unchanged edges;
- the trace table walks cleanly row by row (see Trace Table Rows below);
- each capability's line runs from its need to its proof (see Capability Through-Lines below);
- each term means the same thing across all four documents (see Term Consistency below);
- all coverage is semantically current for the current artifacts, with any post-review non-semantic changes recorded by the parent;
- a planner can choose tasks/order/commands without inventing meaning, How, or the proof route.

## Requirement to Observation

What to open: each Requirements row (`U`), the Specification obligations (`R`) it links with each one's proof obligation (`V`), the Program Design trace row for each `R`, and the Verification Design row for the `U` with any shared observation it names.

How to judge: walk every requirement; do not sample. For each `U`, follow each `R` across the documents:

```text
U -> R and its V (expected behavior, threshold, target constraints, reference)
  -> trace row's proof seam -> Verification Design observation and passing condition
```

The chain holds when each link uses the same ids and the current text of the link before it:

- the Verification Design row names every `R` the `U` links, and each `R` is decided by an observation or listed as unverified;
- the observation uses the `V` as it stands now: its reference, threshold, and target constraints, not an earlier or paraphrased copy;
- the observation sits at a seam the trace row's proof cell names for that `R`, or the Verification Design returned a `program-design-gap` for it.

Route a broken link to its owner: a row that drifted from its `V` or seam to `verification-design`; a missing or unobservable `V` to `spec-design`; a seam that cannot carry any observation to `program-design`. An upstream correction continues to `verification-design` for the rows it changes.

Stop when every requirement has been walked from each obligation to its observation or a routed finding.

## Trace Table Rows

What to open: the Program Design's trace table (`U · R · E · owner · interface · shape and home · state · failure · proof`), the Requirements rows, the Specification's obligations and entity table, and the design sections each cell summarizes.

How to judge: walk every row and every cell; do not sample. For each cell, say what it holds.

- A blank cell is a finding. So is a cross-reference such as "see interfaces" or "see above": it is not a populated cell.
- `gap: <why>` is an honest marking of missing design. Report it only when the gap leaves an accepted obligation unrealized that the design should have settled; never treat the marking itself as a defect.
- `none: <why>` is valid in the `U` and `E` cells and for values that do not apply, such as a stateless guard's state.
- The table has one row per Specification obligation (`R`); two obligations that share a contract still each have their own row. Each row's `R` cell names an obligation in the Specification, its `U` cell names every Requirements row that obligation traces to or reads `none: <why>`, and its `E` cell cites Specification entity ids; `U` and `E` may each list several ids.
- Each cell agrees with the section it summarizes: the owner is the component the design names, the interface is the contract it defines, the shape and home match the binding table.
- A cross-cutting row's owner and interface cells cite the mechanism owner.
- Every accepted obligation has a row, and the returned coverage disposition matches the rows.

Route a defective cell to `program-design` with the smallest correction: fill the cell or mark it `gap: <why>`. Route a row whose `U`, `R`, or `E` cell points at something the Requirements or Specification do not contain to `spec-design`.

Stop when every row has been walked and every defective cell has a finding.

## Capability Through-Lines

Skip this walk when the Requirements carry no capability list; the per-row walks above cover a one-concern set.

What to open: the capability list and its home `U` rows in the Requirements, the capability map and capability groups in the Specification, the capability groups of the Program Design trace rows and of the Verification Design rows, and each capability's through-line in the root index when the set has one.

How to judge: walk every capability; do not sample. Follow each key through the documents:

```text
capability key and purpose (Requirements)
  -> its home U rows (Requirements)
  -> the R obligations those rows reach, under the same key (Specification)
  -> one trace row per R, under the R's home key (Program Design)
  -> the rows for its U rows, under the same key (Verification Design)
  -> its through-line, when the set has an index
```

The line holds when each document carries the same key over the rows the document before it passed on. It stops at the first document where the capability's rows are missing, filed under another key, or grouped under a component name instead of the key. Report one finding for the capability, attributed to the document where its line stops and listing every row it strands, and route it as the walks above do:

- a listed capability with no home `U` row stops at the Requirements, and one whose home rows reach no `R`, or whose `R` sit under no key or another key, stops at the Specification: both route to `spec-design`;
- an `R` with no trace row, or a row grouped under another capability, stops at Program Design: `program-design`;
- no row for the capability's `U` rows, or rows grouped under another key, stops at Verification Design: `verification-design`;
- a through-line that skips a step or links the wrong section goes to the phase that owns that document's step.

In a broken copy of the job-submission set:

```text
billing-export  U5 U6 -> R7 R8 R9 -> trace rows R7 R8 R9 -> no Verification Design row names U5 or U6
                stops at Verification Design; route verification-design

scheduling      U3 U4 -> no R traces to U3 or U4
                stops at the Specification; route spec-design
```

The per-row walk already flags U5 and U6 as rowless; the capability finding names the larger gap, that finance's whole part of the system has no planned proof. Scheduling's line stops earlier. Program Design and Verification Design may still have sections headed scheduling, but with no `R` behind them they realize and prove nothing the owner asked for here. File no separate findings against them for the same missing link; the Specification correction continues downstream under the rule above.

A line that ends at a recorded gap, such as home rows that are all unauthorized, is honest; report it only when it leaves an accepted requirement unrealized. This walk adds to the per-row walks and replaces none of them. When a per-row finding and a capability finding name the same missing link, they share one root cause, and reduction merges them into the capability finding.

Stop when every capability has been walked to its proof or to a routed finding at the document where its line stops.

## Term Consistency

What to open: the Specification's entity table, each obligation, each Program Design heading, binding-table row, and contract name, and each Verification Design row.

How to judge: a design noun that cites an `E` and keeps that entity's identity, relationships, and states is consistent. A code name in a shape or home cell is a binding, not a term. A design-only concept that names the `E` or `R` it serves is legitimate, but naming a served id is not enough by itself: its own identity, lifecycle or states, relationships, or invariants signal a possible missing Specification entity.

- A synonym for an existing `E` used in design prose (a new word where the Specification already has a term) is a finding with `Route: program-design`, or `Route: verification-design` when it appears in a Verification Design row: rename to the Specification's term.
- A design noun with no `E` that names nothing it serves, or behaves like an entity, is a finding with `Route: spec-design`: the Specification decides whether it is a new entity or already covered. Review does not define it.

Stop when every design noun resolves to an `E`, a design-only concept with its served `E` or `R`, or a routed finding.

## Readiness

If local results are missing, a `four-document-design` result of `ready` requires independently repeating and recording the missing local checks. Missing prerequisites may still yield bounded findings, never false readiness.

Use the pretend planner:

```text
may decide: tasks, exact files, order, DAG, exact commands, red/green steps,
            evidence capture, checkpoints, rollout
must consume: requirements/contracts, entity bindings and boundary shapes,
              components/owners/interfaces,
              state/flows/failure/concurrency/cutover/trust/proof seams,
              each requirement's planned observation, target, journey,
              reused tests, passing condition, and what stays unverified
```

Complete when: all four identities were separately reconstructed, cross-artifact traceability is bidirectional, every requirement was walked to its observation and every trace-table row was walked, every capability's line was walked to its proof or its stop, every design noun resolved under Term Consistency, accepted requirements remain covered, applicable call-path deltas are visible, contradictions are resolved or blocked, and planning has no semantic design decisions left.
