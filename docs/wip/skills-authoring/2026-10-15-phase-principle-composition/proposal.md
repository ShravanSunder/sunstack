# Compose phase work from existing engineering principles

Spec v1 · independently accepted-to-implement, 2026-10-15 · `sunstack-dev` · user-directed, behavior-changing updates.

This is the specification for the next implementation PR above #132. It is not an implementation, a review verdict or a request to publish a spec-only PR.

## What changes

Phases should teach how to carry out their particular engineering job. Principles should teach the judgments that apply across those jobs. A shared reference should hold one repeated procedure when its real callers already select that procedure. A new practice needs its own useful loading condition and end-to-end method; repeated prose alone does not earn another skill.

The first slice updates nine existing phase skills. It composes their concrete decisions with existing principles and removes only the portable tutorial material those principles already teach. It also extracts the common proof-command execution procedure from the two review phases into one shared reference. No new practice or principle is proposed in this slice.

Example: Specification still produces the entity table and settles or raises each identity question. The domain principle teaches how to decide identity from behavior. Program Design still produces the actual owner/interface model; the separation principle teaches where a boundary earns its place. Neither phase becomes a list of links.

## Problem and decisive evidence

The owner's goal is for skills to teach engineering judgment through composition rather than duplicate it or accumulate ceremony. The six source-audit units covered the active non-orchestrator portfolio. The following findings justify this bounded slice; citation counts are a discovery signal, not its success criterion.

Paths below are relative to `plugins/sunstack-dev/`. They refer to the source inherited from #132; implementation must reopen the actual current files before editing.

| Existing phase teaching | Existing judgment owner | Why change the composition |
| --- | --- | --- |
| `skills/spec-design/references/domain-entities.md`, What to Inspect and Settled or Unmade: extracting synonyms, same-instance distinctions, states and the Reminder example | `principle-define-the-domain-first` | The reference repeats the principle's extraction moves and example. Identity judgment has two editable tutorial homes. |
| `skills/program-design/references/components-ownership-interfaces.md`, Behavioral Interfaces: representative caller and real-seam taxonomy | `principle-separate-the-concerns` | The principle already teaches reason to change, consumer-shaped interfaces and when a direct function needs no seam. |
| Program Design selection/simplification and both review `references/lanes/dispel.md` files: deletion, pass-through layers and unsupported mechanisms | `principle-justify-the-complexity` | The same portable necessity test is retaught. Local requirement coverage and finding dispositions are separate obligations. |
| `skills/plan-implementation/references/slice-and-proof-design.md`, Match Proof to Each Change: cheapest honest layer, independent oracle and test-removal grounds | `principle-write-tests-that-can-fail` | The principle owns those judgments; the planner owns the actual proof map and implementation sequence. |
| Implementation execution and both review reductions: claim versus observation and drift versus a failed premise | `principle-prove-it-works`, `principle-verify-before-accepting`, `principle-refine-mental-models` | Producing proof, assessing proof and deciding what a surprise means are distinct judgments with existing owners. |
| Both review `references/lanes/proof-challenge.md` files: exact execution grant, command-chain preflight, write containment and observed-output capture | Proposed `shared-references/review-proof-command-execution.md` | These are nearly identical operational instructions with two actual callers. The review methods already decide when to run them. |

Source observations establish duplicated teaching and procedure, not a demonstrated improvement in agent behavior. Earlier citation pilots observed principle retrieval and correct judgments with equally correct controls; they do not prove the benefit of this new composition or qualify every client.

## Observable success

For each updated phase, an agent can perform its concrete job without inventing a missing step or following a generic virtue. At the selected judgment point it reaches the existing principle, applies it to the actual decision, and preserves the phase's required result and authority. It also recognizes the valid case where no extra boundary, broader proof or owner question is needed.

The resulting source has one maintained home for each extracted tutorial and for the shared command procedure. Each phase retains the obligations another agent needs to use its result: its actual tables, source reads, coverage, decision conditions, grants, routes and completion criteria. Fewer words or more principle citations alone do not satisfy this goal.

## Design decisions

These are the proposed defaults for review, not claims that the owner already approved every line.

| ID | Default | Reason and cost |
| --- | --- | --- |
| D1 | Reuse the existing 17 principles; add none | No audit unit established a distinct missing engineering judgment. Existing domain, separation and complexity principles cover the strongest omissions. Costs selective caller work rather than new vocabulary. |
| D2 | Add no new practice in this slice | Research already owns the evidence walk; debugging owns causal investigation. Review command execution has two preselected callers and fits a shared reference. Avoids a broad `practices-verification` skill that would mix proof design, production, observation and acceptance. |
| D3 | Cite the principle at one concrete decision; retain the local action | Use the current citation grammar from `skill-authoring` 0.2.0. A naked principle name or “apply X” cannot replace the step. No all-principle entry load or public read recital. |
| D4 | Put the citation in the file that owns the decision | A body may select an owned reference that cites the principle. Do not cite it again in the body for that same decision. Reading a principle follows its current full-read rule. |
| D5 | Prune general explanation only after comparing it with the principle | A repeated output obligation or local example can remain. Duplication of vocabulary is not proof of duplication of responsibility. Retaining a phase contract costs some intentional overlap. |
| D6 | Preserve phase authority, output and convergence rules | This slice changes teaching ownership, not the authorized workflow. No loss of entity coverage, proof gates, exact correction routes or role independence. |
| D7 | Share command execution, not the whole proof challenge | Claim selection, interpretation, rerun policy, check order, statuses and readiness remain with each review method. Costs two small adapters, with the common operational safety rules maintained once. |
| D8 | Preserve hard cutover and explicit external-consumer decisions | Program Design's coexistence guidance becomes conditional on an authorized external constraint and owner-set cutover plan. It cannot independently authorize an elective compatibility path. Necessary migration modeling remains available. |
| D9 | Leave triggers and invocation metadata unchanged | Existing phases still load for the same jobs. Principles remain hidden from implicit invocation. No new description or role selection surface is needed. |
| D10 | Keep the first PR to the nine named targets | Discuss, docs/handoffs, roles, ops/presentation and management followups remain separate audit proposals. This prevents a targeted extraction from becoming a portfolio rewrite. |

## Surface allocation and run sequence

Each run updates exactly one named skill. All use the current trigger and invocation settings unchanged. The sequence below is for authoring and integration; it does not authorize publishing an incomplete shared-reference cutover.

### R1 — `spec-design`: derive meaning using the domain principle

**Promise:** turn settled owner meaning into defined entities and observable obligations without inventing implementation or unnecessarily asking the owner to define what the sources already decide.

At entity derivation in `references/domain-entities.md`, cite `../../principle-define-the-domain-first/SKILL.md` on the action of deciding identity, relationships and observable states from settled behavior. Keep the body's mandatory reference load and its concrete entity-table return. Keep the explicit distinction between derivation from settled statements and genuinely unmade owner meaning.

Remove the reference's repeated general extraction/sufficiency tutorial where the principle already owns it; keep source selection, authoritative-term reuse, stable E identifiers, filled entity-table example, exact gap and route, and completion. The Reminder may remain as a filled phase table, not a second free-standing explanation of the same principle. No table, route or phase convention moves into the principle.

**Pressure cases:** a moved due date preserves identity while re-hold creates a new instance; a genuinely ambiguous same-instance rule needs the exact owner question; an authoritative glossary is reused without reopening it. Check the produced entity meaning and gap, not whether the reply recites the principle.

### R2 — `program-design`: boundaries and complexity earn their place

**Promise:** realize the fixed observable contract with justified components, consumer-shaped interfaces, singular owners and preserved requirements.

At target-composition selection, retain the concrete obligation/deletion challenge and cite `principle-justify-the-complexity`. In `references/components-ownership-interfaces.md`, put the separation citation at the real boundary/interface choice. If a decision already lives in that reference, do not add a parallel body citation for it. In `references/artifact-and-self-review.md`, prune portable necessity explanations while retaining the actual artifact/coverage self-check and local view/trace obligations.

Retain entity bindings, shapes, closed variants, representative interaction, owners, dependency rules, actual diagrams, accepted-requirements coverage and structural-realization confirmation. A boundary that hides a necessary lifecycle or policy remains legitimate. The principle supplies judgment, not permission to remove it.

In `references/state-calls-and-flows.md`, qualify coexistence modeling: first establish the external consumer or persisted-state constraint and the owner's cutover decision. Then model only the authorized phases. Preserve the existing phase fields for authority, readers/writers, skew, transition, rollback, failure and proof. No new shim, dual path or approval ledger is introduced by this edit.

**Pressure cases:** remove an unneeded wrapper but retain the adapter that owns cancellation; reject a new store with no required outcome; preserve every accepted identity after simplification; distinguish an elective parallel compatibility path from an owner-authorized external-consumer migration.

### R3 — `plan-implementation`: plan tests that can disprove the claim

**Promise:** produce a runnable slice/proof plan whose checks can observe the actual obligation at a suitable layer.

In `references/slice-and-proof-design.md`, cite `../../principle-write-tests-that-can-fail/SKILL.md` where proof and an independent oracle are selected. Prune the duplicate general mocked-boundary/oracle tutorial. Retain each slice's proof map, project layer source or `project silent`, property/example choice, concrete test keep/repair/remove disposition and required removal evidence, integration gates and split/replan stops. Do not create a proof-design practice or framework.

**Pressure cases:** a producer/consumer change requires their real serialization connection and a contract-derived expected value; a pure rounding rule stays a focused unit check; an existing test is not removed merely because a new test looks similar.

### R4 — `plan-improve-repo`: accept candidates, then plan their real proof

**Promise:** turn verified, admitted improvement evidence into a plan without upgrading an unsupported candidate or planning through a design gap.

Cite `principle-verify-before-accepting` at candidate vetting before admission, retaining the opened anchors and rejected/unknown dispositions. In the existing proof-integrity step, cite `principle-write-tests-that-can-fail` at the selection of proof that can reject the named failure. Avoid another verification citation at every validation row. Keep admission variants, plan-only/delivery distinction, separate current-state result and immutable canonical plan contract.

**Pressure cases:** reject a polished candidate contradicted by its cited source; plan a real interaction instead of two disconnected mocked suites; retain the design-required route; allow matching evidence to be reused after a prose-only edit.

### R5 — `implement-plan`: produce proof and classify surprises

**Promise:** carry the approved slice through its real path and distinguish a bounded repair from a failed governing premise.

In `references/execution-and-proof.md`, cite `../../principle-prove-it-works/SKILL.md` at obligation-to-observation selection and `../../principle-refine-mental-models/SKILL.md` at surprise classification. Retain the concrete proof report and five local result classes, scope/authority branches and exact routes. Remove only the general tutorial already taught by those principles. Leave test production and role grants with their existing owners; a role that already cites a principle for the same decision need not repeat the call as an extra checklist.

**Pressure cases:** a real-path automated journey counts without an equivalent repeated manual run; a green wrapper test does not prove the planned transport effect; reversible drift is repaired inside scope; an owner-contract break returns its exact consequence rather than inventing a new seam.

### R6 — `debug-investigation`: ground causal claims and reconsider failed premises

**Promise:** return a diagnosis whose causal claim is as narrow as the evidence and a next action that addresses the actual uncertainty.

At failing-boundary/caller tracing, cite `principle-read-ground-truth-first` with the actual divergence to locate. At repeated-premise failure, cite `principle-refine-mental-models` while retaining the existing local failed-fix signal and read-only/fix admission. Do not centralize debugging into the principle or add a generic investigation practice: `practices-research` already owns gathering/checking sources, while this phase owns reproduction and ranked causal hypotheses.

Retain the bug packet, reproduction classification, supporting/missing evidence, smallest discriminating step, artifact rules and monitoring procedure. A source-confirmed mechanism is distinct from proving it caused a historical incident.

**Pressure cases:** sandbox denial remains inability to observe rather than an outage; a plausible downstream symptom remains a hypothesis; repeated fixes sharing a wrong premise trigger reconsideration; an ordinary established regression can receive a bounded fix without redesign.

### R7 — `implementation-review`: compose judgment and extract common execution

**Promise:** judge the delivered implementation against its governing obligations and challenge claimed proof without adding unrequested design.

Cite complexity at the deletion/necessity decision in `references/lanes/dispel.md`; verification at candidate evidence assessment in `references/finding-and-reduction.md`; refinement at that reference's ordinary-finding versus broken-premise decision. Keep distinct decision predicates and do not repeat those citations in the body. Preserve rails, complete diff/chunk coverage, delivered-extra versus reviewer-suggestion dispositions, result precedence and convergence.

Extract only the common command procedure from `references/lanes/proof-challenge.md` to `shared-references/review-proof-command-execution.md`, using the contract below. The lane remains a real adapter with its mission, inputs, local selected claims, interpretation, rerun-on-failure rule and returned check status. The shared procedure does not decide whether proof establishes the claim.

**Pressure cases:** reject a reviewer request for an unneeded circuit breaker; retain a necessary lifecycle boundary; reject stale/wrong-target proof while reusing still-applicable evidence; stop an ungranted or would-write command without repairing the environment.

### R8 — `spec-program-review`: consume the same execution procedure, preserve design judgment

**Promise:** reconstruct and judge the current design's meaning and realization without turning review into new design or implementation.

Use complexity at its dispel decision, verification at its candidate assessment, and refinement at its ordinary correction versus failed-premise decision. Keep mode-specific target admission, semantic coverage, structural-realization confirmation, ordered routes and bounded correction policy. Conditional failure/concurrency citations belong only in the selected risk lane when that actual operation has uncertain effects or overlapping actors; keep the scenario's invariant/recovery/proof result.

Retarget this phase's `references/lanes/proof-challenge.md` to the shared command procedure. Retain its narrower executable-claim predicate and existing design-level proof interpretation. Do not import implementation review's automatic failure-rerun rule: the shared reference must not harmonize the existing difference silently.

**Pressure cases:** design without executable proof uses its read-only proof-seam check, not an invented run; a cited executable claim gets the granted observation or exact gap; an unknown mutation outcome is not definite failure; a harmless completion-order difference is not a race defect.

### R9 — `implementation-pr-wrapup`: assess readiness evidence at its actual gate

**Promise:** compare current PR gates with observations of the current PR without treating green CI as merge permission or inventing fresh code review.

In `references/merge-gates.md`, cite `../../principle-verify-before-accepting/SKILL.md` on the actual gate-to-observation comparison. Keep all live head/base/body/check/thread/mergeability, public-safety, final re-fetch and explicit merge-authority requirements. Retain description authoring/publishing ownership and monitor behavior. No new PR policy, watch cadence, API call or automatic merge is introduced.

**Pressure cases:** matching previous execution evidence may survive unrelated prose edits, while independently mutable PR state still needs its existing current query; green CI with an unresolved actionable thread is not ready; readiness without merge authority does not merge.

## Shared reference contract

**Proposed path:** `plugins/sunstack-dev/shared-references/review-proof-command-execution.md`.

**Real consumers:** the two existing `references/lanes/proof-challenge.md` files. Each caller retains selection, the reviewer's judgment and its own returned check status. Each selects the command procedure only for the existing granted-command branch. Without a grant the lane remains inspect-only and reports the exact observation gap.

**Caller form from either lane:** `IF a selected proof claim has a recorded execution grant, load ../../../../shared-references/review-proof-command-execution.md and return the command-chain preflight, allowed-command observations, write comparison and execution gaps for this lane's claim assessment.` The calling reviewer may commission an Operator through existing management; the reference does not create delegation authority. The exact prescribed command set and execution limits travel in that Operator commission.

The reference owns these existing mechanics once: resolve scripts/hooks/configuration before running; classify predicted writes; stop tracked or unknown writes; execute only exact granted commands; permit only the existing listed ignored build outputs; reject credential/network/outside-worktree effects; capture output and exit status in scratch; compare reviewed-worktree status before/after and invalidate results with tracked changes; report denied or blocked execution. It preserves the existing no-install/no-home-write/no-fix boundaries. No command is executed to discover whether it is safe.

It returns observations and exceptions to the lane, not a readiness verdict or expanded grant. Per-claim proof meaning, false-green interpretation, failure-rerun policy and next required observation stay with the lane/reviewer. Repeated fixed return fields may remain concise local obligations; no new Markdown schema, parser or typed result framework is added.

Both active callers cut over in the same PR. Remove the common procedure copies after verifying equivalent safety coverage; retain no forwarding stub. No instruction to load this file belongs in the principles, roles or unrelated research/debug work.

## Security and proof posture

Authoring basis: user-directed intent, supported by current source duplication. No behavioral RED has been reproduced for these phase-composition changes. The proposed safety decision is **allowed** for relocating the existing bounded review-command instructions without changing their grant or effects. Untrusted input remains the reviewed command chain. Third-party adoption, secrets, new executable code, new network behavior and home/cache writes are out of scope. Any implementation that would change those effects must stop before that edit and return the changed surface for disposition.

At implementation, compare each extracted passage with its existing principle and every local obligation before deleting it. Check relative links from their actual containing files, both consumers of the new shared reference, unchanged trigger/metadata and preserved phase result/grant rules. Run the repository's fitting formatter/structural checks, skill suite/typecheck and plugin validation required for the resulting diff. Static success proves source integration, not teaching efficacy.

Each run has its positive and counterexample scenarios above. If executing behavior proof, use fresh agents with no authoring history and realistic requests that do not expose the checks; confirm the actual changed skill/principle copy opened from the host record. Record what action occurred and whether required local outputs survived. Prior-revision controls are needed for an improvement claim. No fixed repetition quota, public read receipts, document digests or ceremonial artifact identity is introduced. A missing/equal control means no demonstrated improvement, not invented RED or an automatic ban on owner-directed authoring.

This spec authorizes no evaluations or runtime edits by itself. Those belong to the subsequently accepted implementation/proof commission. Report drafted source, structural integration, observed examples and cross-client discovery as separate claims. Existing B5, role discovery and Claude/Cursor reliability gaps are not closed by this spec.

## Coordination and delivery

Baseline: `skills/role-skill-promotion` (#132), after the five accepted source corrections at `d9e717b6`. New stack branch: `skills/phase-principle-composition`, based directly on that branch. Worktree: the existing dedicated practices/principles worktree. Preserve Cloud's history; do not add these new proposals to #131/#132.

Current pending work is this spec only; no runtime file for R1–R9 has changed. The branch is prepared with `gh stack add`; do not submit a spec-only PR. Once spec review accepts this meaning and implementation is commissioned, the nine target runs land as one coherent implementation PR above #132 through `gh stack`. The owner retains merge authority.

At implementation integration, choose the next unreleased `sunstack-dev` version from the then-current parent, intended 2.78.0 → 2.79.0 if unchanged. Update its three client manifests, marketplace version entries and one public-safe dated changelog entry together. Do not bump `skill-authoring`. Record validation and refresh status honestly. No installed-cache mutation or release is part of this slice unless later commissioned explicitly.

## Deliberate followups and exclusions

- Existing audit proposals for discuss/domain clarification, docs/handoff readership, Linear authority, presentation duplication and management's collection/interpretation wording stay outside this first PR. They are not implicit implementation tasks.
- Role-peer references, target-neutral Reviewer, owner-opened Advisor and role-specific collaboration remain the separately approved future design. This slice neither cancels nor implements them.
- No orchestrator edits, restored #128 runtime, `domain-*`/`audit-*` renames, new role, principle merge, blanket citation pass, forced principle preload, compaction policy or output-only citation grammar.
- No deleting accepted phase tables, visual obligations, proof gates or owner decisions under the banner of simplification. Any such requested redesign needs its own settled scope.

## Status

R1–R9: **proposed**; no runtime authoring has started. The independent Sol 6.1 high Lead-perspective challenge found no material residual. Independent formal SPEC review of v1 returned `great` and `accepted-to-implement` on 2026-10-15: mental-model-fit, depth-coverage, trigger-routing and rule-agreement are all complete, with no accepted findings. The retained review lead and its two prescribed reviewers had no target authorship; this was same-family review, without cross-family assurance. Review reports and discussion stay outside this spec. This accepts the specified design for a later implementation commission; it claims no implementation, behavior proof, publication or shipping.
