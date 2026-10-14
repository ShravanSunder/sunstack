# Common Review Method

This reference owns the baseline every mode-complete and focused reviewer follows before its mission.

Expected inputs: exact mode, complete targets, governing sources, confirmed goal boundary, accepted requirements set, applicable structural-realization confirmation, constraints, risk predicates, and selected mission.

Return: the reconstructed intent, the source-backed case and countercase walk, the exact semantic gaps, plus coverage, authority and traceability evidence, crux evidence, candidate findings, and the stop boundary.

## Establish Authority and Read Completely

Verify the complete target set, governing specification, and source authority. Read every target file or separately labeled in-chat record completely — the whole artifact, top to bottom — before substantive findings; sampling sections or trusting a summary is a skipped read. Account for the read in the coverage rows: every section of every target artifact appears as covered by a dimension or judgment, or as an anchored exclusion with its reason, and completion binds to that accounting. Coverage rows are the accounting, not a reading receipt: add no digests, hashes, line counts, or read attestations beside them. Open load-bearing sources cited by claims.

For file-backed design documents, inventory every required visual asset and Markdown embed. Resolve relative links, open the actual image when access exists, and compare labels, edges, grouping, boundaries, order, alt text and caption with the governing prose and exact semantic views. Require actual image-inspection evidence and the supported destination-preview result claimed by the author. A cache-only path, missing asset, broken embed, unreadable image, invented relationship or decorative visual is a concrete finding. A picture-type view passed as a text fence while the destination renders Mermaid is a finding, even when image access is missing. A UI image that adds a control the requirement does not change, or that skips a changed screen, is a finding. When image or preview access is unavailable, return exact partial visual coverage; do not infer a pass from Markdown syntax, a prompt or an author's summary.

Verify the accepted requirements set against the current owner-confirmed requirements record and confirmed goal boundary. Otherwise use the last inspectable owner-accepted governing source. If neither source exists or they conflict, return the authority gap. Never recover accepted meaning from mutually narrowed current files alone. Any removed or superseded requirement needs explicit owner authority. For simplification, recovery of the accepted starting point, or requirement subtraction, return one compact disposition row per stable identity (`covered | owner-authorized supersession | gap` plus anchor). Identities may share a row only when every member identity is enumerated and all share the same disposition and anchor; a bare "coverage intact" assertion is not a result in those cases.

For every mode that reads the Program Design (`program-only`, `test-only`, `verification-only`, `five-artifact-design`), inspect the complete structural-realization confirmation or recorded owner waiver, or return its exact missing owner decision. Treat design dimensions as `required | satisfied by the existing system | not applicable | unresolved`; a general review category is not a reason to invent a subsystem.

Partial coverage cannot return a clean recommendation.

## Reconstruct Independently

Extract the model without preserving author section order:

```text
authority, problem, consumers, outcomes
requirements, contracts, constraints
components, owners, interfaces, state, flows
failure/concurrency/security behavior
proof modalities and seams
decisions, non-goals, debt, assumptions, gaps
```

Mode-complete review reconstructs the full selected mode. Focused review reconstructs only the necessary slice after still reading the complete target file or in-chat record set.

Judge in dependency order: authority and problem, then outcomes and requirements, then contracts, then structural realization, then test strategy, then real-system proof. An upstream fatal defect bounds downstream review.

## Walk a Case and a Countercase

Traceability shows where things are linked, never whether they are right. Pick one concrete input the owner cares about and follow it through every document the mode reads, asking at each step whether a capable implementer would land on the adopted outcome. Then pick the countercase most likely to break the design and follow it the same way. A walk you can write down as numbered steps, with the document anchor at each step, is evidence; "the trace is complete" is not.

Five outcomes look alike from a distance and need different results:

- **Connected and wrong.** Every link holds, but the root row promises what the owner never adopted, because the cited source says something else. Only opening the source catches it. The finding goes to the document where the meaning first went wrong.
- **Good and unchanged.** The walk and countercase both hold and no rail is unserved. Return `ready` with what held; inventing a finding to look thorough is a defect of the review.
- **Proof mocked away.** A planned test or verification case replaces the very interaction its claim is about, so it passes for the wrong implementation. The finding names the claimed interaction and the layer that keeps it real.
- **Corrected without recurrence.** A correction closed an earlier finding and nothing it touched reopened it. Verify the corrected anchors and carry coverage; do not restart the review.
- **Missing owner decision.** The walk reaches a question the governing sources cannot answer and a correction would have to choose product meaning. Return `decision-needed` with the exact question; do not pick an answer as a finding.

## Audit Authority

For every load-bearing basis, distinguish:

```text
code-compelled
user-chosen
author recommendation mislabeled as authority
contradiction of authoritative non-goal/constraint
```

Open code sources before claiming they compel behavior. Verify user choices through durable evidence rather than author paraphrase.

## Attack the Crux

Use applicable probes:

- inversion;
- divergent implementers;
- failure interleaving;
- owner removal;
- negative-space expansion;
- proof break;
- pretend planner.

Use the downstream consumer for the selected mode:

```text
requirements-only     pretend Specification author
specification-only    pretend program designer
program-only          pretend test designer and pretend planner
test-only             pretend Implementer writing the tests
verification-only     pretend Verifier on the delivered target
five-artifact-design  pretend planner
```

The consumer may decide only its downstream-owned work; a required invention of meaning owned by the reviewed artifact is a readiness failure.

## Reconstruct for the Human Reader

After the full pass, restate the selected model compactly and point to where a human would correct it. Check progressive disclosure and apply this deletion question at section/view level and obvious process-residue or duplication sites:

```text
If this element disappeared, which first understanding, decision, trace,
failure simulation, proof path, or authoritative lookup would become
underdetermined?
```

For `requirements-only`, reconstruct affected people -> current pain -> adopted outcome -> boundary and non-goals. For `specification-only`, reconstruct Requirements -> Specification observable contract -> proof obligation. For `program-only`, reconstruct governing obligation -> scenario/contract -> current/proposed call-path delta -> owner/state/failure behavior -> proof seam. For `test-only`, reconstruct obligation -> wrong behavior -> what stays real -> layer and oracle -> completion and planned red. For `verification-only`, reconstruct outcome -> declared reference -> route and target -> observation -> passing condition and limits. For `five-artifact-design`, reconstruct the whole chain from Requirements through Verification Design.

Flag a concrete comprehension failure, process narration, obscure heading, decorative view, or deletion candidate only when its reader consequence is named. Inability to restate the model is evidence of incoherence, not automatically a prose finding. A material unresolved comprehension risk may route to `reader-understanding` after parent reduction.

## Finding Calibration

Report only source-backed reader, behavior, or design effects. Each candidate names the exact anchor and explains in ordinary language what is wrong, the observable consequence, what the next agent would otherwise have to guess, the smallest correction, the semantic owner, and how the correction is confirmed.

Test removal before completing a questioned mechanism. A finding may repair the confirmed design; it may not expand the goal, accepted requirements, or agreed acceptable complexity without an owner decision.

Stop at the mission boundary. Do not edit, redesign beyond the smallest target, or issue the parent verdict.

Complete when: coverage and model reconstruction are explicit, a concrete case and the strongest countercase were walked with anchors, the highest-risk crux was attacked, and findings are executable rather than topical.
