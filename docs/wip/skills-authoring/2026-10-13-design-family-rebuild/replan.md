# Rebuild the design family above PR #127

2026-10-13. Lead-authored working replan; implementation is not yet commissioned. Owner direction: close the old, pedantic PR #122 and redo the work as a new `gh stack` layer above #127. #122 was closed and its original branch/history remain available as source evidence. PR #127 owns current roles, execution forms and typed assignments, including the pending progressive-disclosure amendment.

## What success means

Design skills help the Lead and owner decide how a system should behave and why its structure can deliver that behavior. They teach how to frame a problem, identify the crux, compare tradeoffs, walk failure cases and choose honest evidence. The five documents carry those decisions. Completing tables alone does not make the design ready: the implementation planner must not need to invent governing meaning, and the Lead must understand and inspect material handbacks before accepting them.

The owner wants engineering judgment to dominate the text; bookkeeping is a small supporting part. Keep methods close to the decisions they improve, worked failure and clean cases, and direct calls to the relevant full principle. Move detailed mechanics behind conditional references. Avoid numerical token budgets or a new compliance ledger that recreates the problem.

## Settled direction and source limits

- **Fresh dependent delivery:** `main → skills/practices-manage-agents (#127) → new design-family-rebuild layer`. Use installed `gh stack`, adopting the existing lower branch, then adding the new layer when its commission is ready. No wait for #127 merge, new parallel worktree, main edit, replay of #122's 23 commits or automatic merge. Source changes to #127 propagate through ordinary stack operations with current evidence retained honestly.
- **Current names and roles:** `sunstack-dev`; consume `practices-manage-agents` and its per-role contracts. Lead authors design/plan and accepts; helpers return evidence; Implementer and Verifier remain paired Sidekicks; Reviewer findings and Advisor challenge have their distinct purposes. Do not transplant #122's competing charters or Worker-as-role vocabulary.
- **Coverage remains five documents** for the adopted project/chunkier-workstream design unit. Requirements, Specification, Program Design, Test Design and Verification Design have distinct homes. Preserve the adopted card, structure and final-set owner confirmations; changing which jobs require them is not part of this rebuild.
- **Existing safety, scope, proof and storage rules hold.** Preserve source-grounded authority, hard cutover, diagrams for reader questions, boundary validation, meaningful tests, real-path verification, artifact homes and board-first trails. Existing repo verification drivers are inputs to inspect, not assumed missing or already successful.
- **Behavior evaluation remains deferred.** Ordinary source/schema/type/unit/quality proof is fitting for the skill implementation; it does not establish actual routing, teaching effectiveness or earned autonomy. Existing no-trigger/pressure/E1/model/eval/app/property/mutation grant remains until the owner changes it. Broad rollout/release still needs its explicit proof-gap decision.

Source basis: current main/PR #127; selected current and closed-#122 source files; first-tranche `requirements.md` owner-sourced U-lines, checked against later corrections; and `2026-10-12-layer-tree/layer-tree.md` engineering-method notes with their explicit owner-decision qualifications. The layer tree is discussion evidence, not a blanket adoption of every Advisor suggestion. OP3/OP7/OP12 and #20/#22–#28 remain open proposals; their presence in #122 is not adoption. Historical review labels do not transfer to the new implementation. Current names and #127 supersede old role rows; U2's `spec-program-review` name stays, because #122's rename was not adopted.

## The engineering spine

Proposed teaching, for review rather than a new adopted policy: the ordinary forward dependency is Requirements → Specification → Program Design → Test/Verification Design → independent design review. The Lead can investigate a later risk early to learn whether a decision is viable; the findings return to the phase that owns its meaning. Finalizing a downstream artifact still requires the governing meaning it uses. An ownership assumption disproved by evidence returns to the structural decision, rather than being disguised as a missing test. A missing product expectation returns to Specification. A failed agent-added restriction is dropped while approved outcomes stay.

Proposed method: pick the next unresolved decision by what depends on it, the cost of a wrong answer, the uncertainty and what evidence can settle it. Give the owner the tradeoff only they control; resolve discoverable facts from current source. Keep the Lead engaged in design and source-backed acceptance. A controller that merely relays phase-complete reports fails this purpose. This applies the current global drift/model-break rules; it does not adopt a new automatic reopening, spike or review policy.

| Phase | Judgment it must teach | Carry forward |
|---|---|---|
| Requirements | Who is affected, what problem matters, scope, authority, adopted outcomes versus proposed extras | Owner-readable needs with decisive provenance and genuinely open meaning |
| Specification | Identity, states and invariants; observable promises; failure obligations; a cheap literal implementation that satisfies the words but misses the outcome | Defined domain and checkable outcomes that preserve owner intent; explicit reference where correctness depends on one |
| Program Design | Trace current entry-to-effect and error paths; choose the truth/recovery owner; compare boundaries; named state variants and interfaces; walk relevant interleavings | Structural rationale, costs, callers, schemas, failure/concurrency/trust boundaries, test seams and observation points |
| Test Design | Start from forbidden behavior; determine what must stay real, then choose the cheapest honest deterministic layer; derive an independent expected outcome; accept all allowed outcomes | Scenarios, fixtures, assertions and layer choice; existing-test keep/repair/remove; planned RED distinguishes behavior from setup errors |
| Verification Design | Choose observation by requirement and reference; inspect the existing route's actual target and exercised boundary; challenge feasibility before building; reuse adequate actual proof | Real-surface cases, target/config/reference, observable outcome, passing conditions, remaining risks and honest limits |
| Design review | Reconstruct the intended outcome and walk a concrete case/countercase; challenge structure and proof feasibility, then inspect coverage and invented extras | Source-anchored findings to their semantic owners, current corrected closure and gaps; no author edits or acceptance |

The pyramid is coverage distribution, not a quota. A unit test can be enough for a pure rule; an interaction claim needs that interaction real. A fixture that mocks away the wrong behavior is inadequate; ordering or timing no contract requires must not become a hidden rule. A planned test is not an observed passing run. The Verifier examines the delivered reference/target and test adequacy; the Reviewer independently examines assertions and design/code contracts. Neither substitutes for Lead acceptance.

## Principles and practices compose at the decision

Use existing principle leaves for their actual judgments: shared model and scope at framing; domain/ground truth at observable rules; one truth owner/types/separation/failure/concurrency at structure; tests-that-can-fail at scenario/oracle/layer selection; prove-it-works and verify-before-accepting at evidence; reader clarity at every artifact. Each call says when to read and which concrete choice it informs. Do not duplicate the full principle prose or force all seventeen leaves on every phase.

`practices-research` supplies checked evidence; collaboration and show-me-your-work supply coordination/trace; management supplies roles/forms/models. Phase-owned methods remain at their engineering altitude. Proposed new verification-route or recurring-correction practices are separately admitted work, not hidden prerequisites requiring agents to invent missing skills. Existing project route discovery and applicable proof remain available through current procedures.

## Fresh run sequence

One named skill target per run; the whole replan becomes a multi-run skill spec before execution. Incidental caller/shape changes stay with the owning run and do not turn into separate competing authorities.

1. `spec-design`: Requirements and Specification teaching, provenance, domain/observable contracts and relevant views.
2. `program-design`: structural choice, type/ownership/interface/state/failure reasoning and proof seams.
3. `test-design`: scenario/oracle/layer method and existing-test evaluation.
4. `verification-design`: existing real routes, declared correctness reference, core outcomes, feasibility challenge and delivered report.
5. `spec-program-review`: independent engineering judgment, concrete case walks and semantic findings/closure; retain the owner-named skill.
6. `orchestrator-design`: decision/evidence loop, existing owner confirmations, dependency-aware continuation and route-backs.
7. Separate planner-convergence prerequisite, not a planner redesign in this six-skill round: consume the current five-document design and proof obligations before any delivery-ready claim. Its adopted plan home is `docs/specs/<spec>/plans/`, never tmp links in tickets. The owner's workstream-sequencing and Linear-ticket directions are retained as follow-on planning scope; mechanism choices remain proposed. A narrow consumer repair and the fuller planning follow-on get their own explicit commissions.

The run order helps expose dependencies; it is not permission to implement from this discussion draft. Shared phase-result schemas are owned once and disclosed by phase/variant, following the packet-split lesson. Typed structure carries actual returns and labels, while natural-language design documents stay readable; do not impose a Markdown AST/ID linter as correctness proof. Sketch essential coverage links once rather than duplicating trace tables at every boundary.

## Salvage, boundary and next artifact

Read valuable #122 reasoning about independent references, real surfaces, domain identity, structural crux, test placement, failure and views. Re-author where it helps this purpose. Its old paths, management implementation, graph bookkeeping, unresolved model rows and dependency seams are superseded inputs. Do not wholesale port its controller or treat every source-linked statement as an adopted requirement.

Before handing implementation to Claude, this Lead writes the fresh multi-run spec with per-skill trigger/main-path/depth/proof choices, effective decisions, actual source evidence and current stack base. The existing Advisor challenges it; independent skill-spec reviewers inspect it without authoring history. Implementation follows only after that admission. Same Main Implementer and paired Verifier remain; existing native/Router help follows the current role/model scope.

A new code layer and PR will be created through `gh stack` above the final #127 head. Candidate version/changelog is coordinated once across the fresh design family. The global devfiles skill index still names the three-document cycle and omits Test/Verification Design: coordinated global-instruction cutover is a named separate dependency under that repository's commit/application boundary, not an edit authorized here. Release/cache/global-instruction and merge decisions remain separate. #122 stays closed as provenance. The immediate dependency is the progressive-disclosure amendment in #127, while fresh design authoring can proceed independently.

Current state: replan written; no new design-family source files, stack branch or replacement PR yet. The next artifact is the explicit multi-run design-family spec, followed by its source review. Runtime role loading and design-skill teaching effectiveness remain unverified.
