# Proof Architecture and Traceability

This reference owns requirement realization, structural proof seams and their sufficiency, the interactions a proof must keep real, enforcement classes, and construction of the requirement/design/proof trace table. It is the table's only builder: `artifact-and-self-review.md` verifies it, and the returned coverage disposition is derived from its rows.

Expected inputs: the Requirements rows (`U`), the Specification's obligations (`R`) with their scenarios or observable contracts, the entity binding table, behavioral interface contracts, state model, failure/recovery decisions, proof-modality inventory, and complete target structure/flows.

Return the sufficient structural seams, the observation points, the interactions that must stay real, the trace table, enforcement decisions, and gaps.

## Who Decides What About Proof

Program Design decides where behavior can be observed and which interactions a proof may not replace. Test Design chooses the scenario, independent oracle, layer and substitutions within those limits. Planning turns that strategy into steps, files and commands. So this reference names seams and real boundaries, never test files, commands, test order or evidence-capture mechanics.

## The Chain

Every requirement is realized along this chain. The trace table carries it from `U` through proof. The proof cell names the observable boundary and seam; the required observations and the enforcement decisions below are recorded outside the table:

```text
authorized need U
  -> obligation R and its scenario or observable contract
  -> entity E it is written over
  -> semantic owner (component)
  -> interface/contract that realizes it
  -> shape and its schema/type home
  -> state transition it drives or reads
  -> failure handling it depends on
  -> observable boundary
  -> seam, and the interactions that must stay real there
  -> required state/log/trace/metric/artifact
  -> structural invariant and enforcement class
```

## The Trace Table

Before writing a row, open the binding table (owner, home, shape per `E`), the interface contracts (which variant realizes this obligation), the state model (which transition), the failure decisions (which handling), and the proof seams (where the behavior is observed).

```text
| U | R | E | owner | interface | shape and home | state | failure | proof |
```

Write one row per Specification obligation (`R`), into the artifact, or into the response in a chat-only run. Two obligations that share a contract still each keep their own row, so a deleted obligation shows as a deleted row.

Cell rules:

- The `R` cell names the obligation and its scenario or observable contract, not only an identifier.
- The `U` cell names every Requirements row the obligation traces to, or reads `none: <why>`. `U` and `E` may each list several ids. `E` reads `none: <why>` when the obligation is written over no entity, such as a platform constraint or a pure quality obligation.
- For a cross-cutting row (tenant isolation, audit, rate limiting), the owner and interface cells cite the mechanism owner, such as the guard component and its check, never "all components".
- `gap: <why>` marks design that is missing. It is not a placeholder for "not applicable"; that is `none: <why>` or a plain value such as `stateless guard`.
- No cell is blank, and no cell says "see above" or "see interfaces". The owner cell names a component, never a package. The proof cell names a seam Test Design can choose a scenario and layer for, never a test file or command.

Derive each obligation's returned disposition from its row: `covered` when every cell names a concrete element or a reasoned `none:`; `gap` when any cell reads `gap: <why>`; `owner-authorized supersession` when the `R` cell carries `superseded: <owner decision anchor>`. Accepted identities that are not obligation rows (entities, constraints, variants, defaults, proof obligations) are reported beside the table with their own anchors, never inferred from it.

Good: a reviewer can walk each row from need to proof without opening prose; the `E` cell matches the Specification's identifiers; the shape cell names both the shape and the module it lives in.

Bad: a paragraph tagged with identifiers instead of a table; a trace kept in working state or scratch; a row whose shape cell says "see interfaces"; an obligation with no row, or two obligations merged into one row; a blank cell; a package in the owner column; a bare "coverage intact".

Stop when every obligation has one row, no cell is blank, and each disposition follows from its row by the rule above.

## Dependencies and Seams

Classify each dependency:

```text
in-process
locally substitutable
remote but owned
true external
```

State what must be real, what may be replaced through the designed seam, and what observation proves the behavior. A mockable signature without a production-realistic observation path is not proof architecture.

A seam is sufficient when the wrong behavior an obligation forbids can be seen through it while the interaction that would cause that behavior is still real. For pane routing, the router's return value is not sufficient: a router that acknowledges and writes to the focused pane still returns success. The seam is pane B's input buffer, observed with the router-to-pane write real. A substitute for that write may serve a test of the router's own branching, never the routing claim.

Use a proof call graph when the test or operational harness follows materially different owners or boundaries than production. Show the driver/fixture, real versus replaced boundaries, observation point, and evidence returned; otherwise keep proof on the trace table.

Choose enforcement class where appropriate:

```text
type or interface
schema
runtime guard
transaction/atomic boundary
lint/static rule
automated test
health check
operational alarm
```

For each material invalid state, decide how it is kept out: the illegal combination is unrepresentable, or the trusted entry rejects it. Name the enforcement class beside that decision. Good: a negative total cannot be constructed, or the charge entry refuses it. Bad: the design is "add a negative test."

Name the seam, the observation and what stays real; Test Design chooses the scenario, oracle and layer that use them.

Complete when: every Specification obligation has one trace row whose cells name a concrete element, a reasoned `none:`, or a `gap: <why>`; every material invalid state has an illegality decision with its enforcement class; every material design element traces back to a legitimate need; and unprovable claims remain explicit.
