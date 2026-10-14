# Reviewing the Five-Artifact Design

This reference owns `five-artifact-design` mode judgment: one integrated reader of the whole current set.

The integrated reader reconstructs the design end to end itself. Each document already had its own local review; those results and reviewers are context to consult, never verdicts to forward. The per-document lenses below run inside this whole-set reading and do not replace the local cycles.

MUST load `../../../shared-references/requirements-specification-program-design.md` and return the Requirements, Specification, Program Design, Test Design and Verification Design identity status: present, resolvable and distinct, or the exact gap.

Then apply each document's lens within the whole-set reading:

- MUST load `reviewing-requirements.md` and return its judgment of the Requirements as the set's authority.
- MUST load `reviewing-specification.md` and return its judgment of the Specification against the Requirements.
- MUST load `reviewing-program-design.md` and return its judgment of the Program Design against the Specification.
- MUST load `reviewing-test-design.md` and return its judgment of the Test Design against the obligations and seams.
- MUST load `reviewing-verification-design.md` and return its judgment of the Verification Design against the reference and the Test Design.

If an identity is missing or two documents collapse into one, record a blocker-level finding, route the smallest correction to the earliest affected owner, and never return `ready`. Do not split, create or edit documents during review.

## Walk One Outcome Through All Five

Pick the outcome the owner cares about most and follow it through the whole set:

```text
U3   operators' typed text reaches the pane they address
R1   text sent to pane B appears in B's input and in no other pane; an acknowledgement
     without arrival is a failure
E1   Pane, identified by its stable pane id
PD   PaneRouter owns delivery and retry; the client sends once; B's input buffer is the
     observation seam; the router-to-pane write must stay real in any routing proof
TD   integration scenario with the real write and two real panes, A focused; the oracle
     is B's buffer holding exactly the sent text and A's unchanged
VD   on the installed build, pane B's visible input shows the text, recorded with the
     build identity; the IPC reply is diagnosis only
```

At each step ask whether the next document consumes what the previous one fixed, in the same terms. A break anywhere is a finding for the document where it starts. Then walk the countercase most likely to slip through the whole chain (here, a router that acknowledges and writes to the focused pane) and check that some layer would catch it: the Specification forbids it, Program Design exposes the seam, Test Design keeps the write real, Verification Design observes the pane rather than the reply.

Inspect across the set:

- every material Specification obligation has one structural realization, a test scenario or a stated reason it needs none, and a verification case or a named limit;
- every material design element, scenario and verification case traces to an obligation, constraint, failure policy or proof need;
- boundary altitude agrees: no document narrows, broadens or contradicts the observable behavior another document fixed;
- the seams Program Design names are the ones Test Design and Verification Design use, and what Program Design says must stay real is real in their scenarios and cases;
- non-goals and compatibility survive realization, testing and verification;
- retained requirements match the owner-confirmed or last inspectable owner-accepted baseline, including named variants, defaults, constraints and proof obligations;
- every applicable material runtime-behavior group has a visible current/proposed call-path delta or explicit no-predecessor case, with added, removed, and changed edges plus preservation-critical or contested unchanged edges;
- the trace table walks cleanly row by row (see Trace Table Rows below);
- each term means the same thing in all five documents (see Term Consistency below);
- all coverage is semantically current for the current documents, with any post-review non-semantic changes recorded by the parent;
- planned red runs and planned verification observations are described as owed, never as observed;
- a planner can choose tasks, order and commands without inventing meaning, structure, test strategy or proof.

## Trace Table Rows

What to open: the Program Design's trace table (`U · R · E · owner · interface · shape and home · state · failure · proof`), the Requirements rows, the Specification's obligations and entity table, the design sections each cell summarizes, and the Test Design scenarios and Verification Design cases the proof cells lead to.

How to judge: walk every row and every cell; do not sample. For each cell, say what it holds.

- A blank cell is a finding. So is a cross-reference such as "see interfaces" or "see above": it is not a populated cell.
- `gap: <why>` is an honest marking of missing design. Report it only when the gap leaves an accepted obligation unrealized that the design should have settled; never treat the marking itself as a defect.
- `none: <why>` is valid in the `U` and `E` cells and for values that do not apply, such as a stateless guard's state.
- The table has one row per Specification obligation (`R`); two obligations that share a contract still each have their own row. Each row's `R` cell names an obligation in the Specification, its `U` cell names every Requirements row that obligation traces to or reads `none: <why>`, and its `E` cell cites Specification entity ids; `U` and `E` may each list several ids.
- Each cell agrees with the section it summarizes: the owner is the component the design names, the interface is the contract it defines, the shape and home match the binding table.
- A row's proof cell names a seam that the Test Design and Verification Design use, or the missing use is a finding for the document that dropped it.
- A cross-cutting row's owner and interface cells cite the mechanism owner.
- Every accepted obligation has a row, and the returned coverage disposition matches the rows.

Route a defective cell to `program-design` with the smallest correction: fill the cell or mark it `gap: <why>`. Route a row whose `U`, `R` or `E` cell points at something the Requirements or Specification do not contain to `spec-design`.

Stop when every row has been walked and every defective cell has a finding.

## Term Consistency

What to open: the Specification's entity table, each obligation, each Program Design heading, binding-table row and contract name, and the nouns the Test Design and Verification Design use in scenarios, oracles and cases.

How to judge: a noun that cites an `E` and keeps that entity's identity, relationships and states is consistent. A code name in a shape or home cell is a binding, not a term. A design-only concept that names the `E` or `R` it serves is legitimate, but naming a served id is not enough by itself: its own identity, lifecycle or states, relationships or invariants signal a possible missing Specification entity.

- A synonym for an existing `E` in design, test or verification prose is a finding routed to the document that used it: rename to the Specification's term.
- A noun with no `E` that names nothing it serves, or behaves like an entity, is a finding with `Route: spec-design`: the Specification decides whether it is a new entity or already covered. Review does not define it.
- A scenario or verification case that judges a different instance than the Specification's identity rule defines (two reminders where the identity rule says one) is a finding for the Test Design or Verification Design.

Stop when every noun resolves to an `E`, a design-only concept with its served `E` or `R`, or a routed finding.

## Readiness

The integrated `ready` requires its own complete reading of all five documents; local results missing or stale are a coverage gap for the cycle, and this review may still return bounded findings.

Use the pretend planner:

```text
may decide: tasks, exact files, order, DAG, exact commands, the executor's red/green steps,
            evidence capture, checkpoints, rollout
must consume: requirements and contracts, entity bindings and boundary shapes,
              components, owners and interfaces, state, flows, failure, concurrency,
              cutover, trust and proof seams, test scenarios with their layers and oracles,
              verification cases with their references, targets and limits
```

Complete when: all five identities were separately reconstructed; one outcome and its strongest countercase were walked through all five; cross-document traceability is bidirectional and every trace-table row was walked; every noun resolved under Term Consistency; accepted requirements remain covered; applicable call-path deltas are visible; planned evidence is described as owed; contradictions are resolved or blocked; and planning has no semantic design, test or proof decisions left.
