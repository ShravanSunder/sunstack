# Current-System Model

This reference owns Program Design's current-system model. It shapes the `practices-how` return into the owners, flows, state and failure behavior the later steps design against, and it classifies how far the current system constrains the target.

Expected inputs: the governing Specification and confirmed goal boundary, the `practices-how` model step 2 returned, current docs, and known platform constraints.

Return: current component/owner tree, production and proof flows, state/mutation map, failure behavior, constraint degree, `changes / remains authoritative`, the greenfield basis where nothing current exists, contradictions, evidence gaps, and source identities with current applicability and coverage.

## Cover What the Obligations Touch

Step 10 pairs the current path of each material runtime-behavior group with its proposed path, so the how return must cover every group the Specification's obligations change or depend on. List those groups and match each to a returned path. IF a group has no returned path, load `practices-how` and return that group's path, or the search that shows no current implementation exists.

If no current implementation or call path exists, record the source-backed greenfield basis and applicable platform, external-boundary, and proof-harness constraints instead of inventing frames or edges.

## Shape the Outputs

| Output | What it holds, from the how return |
| --- | --- |
| component/owner tree | each part on the paths and the state, decision or effect it owns |
| production and proof flows | each anchored path with its return and error edges, plus the test or harness path wherever its wiring differs from production |
| state/mutation map | each piece of state on the paths, its owner, its lifetime and every writer |
| failure behavior | the failure, retry, timeout and cancellation edges on the paths |
| source identities | each source the model rests on, the version read, and whether it still describes current behavior |

Carry each anchor and its observed or inferred label into these outputs. Keep each ownership smell the how return reports on the component/owner tree. Step 3 takes it as a crux the alternatives pass must resolve. The smell shows ownership is unsettled; it does not prove which target boundary fixes it.

## Contradictions and Gaps

Compare the model with current docs and with what the Specification assumes about the current system. Record each contradiction with both anchors. Current code is evidence of what exists; the Specification governs what must be true.

An inferred or unresolved edge that a target choice would rest on is an evidence gap. List it with what would settle it.

## Degree of Constraint

Classify:

```text
greenfield
compatibility-bound
migration-bound
platform-bound
legacy-ownership-bound
```

Name what the change may replace and what remains authoritative. For external prior art/platform evidence, return borrow/adapt/do-not-borrow plus version and transfer assumptions.

Good: every behavior group the target changes has an anchored current path ready to pair with its proposed path, each owner and writer is named, the constraint class and the replace/keep split rest on sources, and each inferred edge a target choice leans on is listed as a gap.

Bad: current code treated as desired authority; a target choice resting on an edge the how return marked inferred; a changed behavior group with neither a current path nor a greenfield basis; a constraint class with no source behind it.

Complete when: each load-bearing current behavior has an anchored entry-to-effect path with its return and error edges, or its absence is bound to a source-backed greenfield basis; proof paths are inspectable; contradictions are explicit with both anchors; constraint degree and `changes / remains authoritative` are named; and target design can no longer rely on an invented current model.
