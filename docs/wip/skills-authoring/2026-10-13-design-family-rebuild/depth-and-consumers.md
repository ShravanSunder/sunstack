# Teaching depth, literal calls and affected consumers

2026-10-13. Part of the family spec. Paths are relative to each calling skill unless prefixed `shared-references/`. Existing teaching homes are retained; new homes are named below. The implementer writes their teaching inside these choices, not a new reference architecture. Mental model, ordinary spine, decisions, phase order and completion remain inline. Shape files are boundary contracts, never the teaching owner of a stage.

Each loaded teaching reference takes the current governing sources and the named decision. It returns the indicated choice with decisive anchors, its concrete tradeoff/countercase, and any exact unresolved gap. It completes only when that choice is usable by the caller; missing required meaning returns the cause-based gap from execution-contracts.md. It does not prescribe its own entry mode. This shared convention does not replace each reference's domain-specific good/bad examples and completion condition.

## Run 1 — spec-design

Keep consumer/problem, authority versus inference, observable wording/countercase and self-check/local review inline. Retain the following real teaching homes:

- MUST load `references/authority-and-problem-framing.md` and return the consumer problem, adopted goal boundary and authority conflicts.
- MUST load `references/requirements-and-traceability.md` and return the adopted Requirements coverage and unmet owner meaning; complete its own Requirements local review before moving to Specification.
- IF authoring or changing a domain entity, load `references/domain-entities.md` and return its identity, states and invariants without internal implementation structure.
- IF authoring or changing an observable obligation, load `references/observable-contracts.md` and return the permitted/forbidden behavior plus the literal-counterexample correction.
- MUST load `references/proof-obligations.md` and return which observable claims need proof and their independent references; test-layer selection remains Test Design.
- MUST load `references/artifact-and-self-review.md` and return the distinct artifact, required views, author self-check and unresolved gaps.
- MUST load `schemas/spec-design-result.ts` and return the appropriate RequirementsResult or SpecificationResult after its own local-review closure.

At each decision read the named applicable principle in full: shared model at framing, hold scope at boundary, define domain at entity reasoning, read ground truth at authority claims, tradeoffs at owner choices, write for reader at explanation. Use existing practices for their owned jobs. These calls never stand in for local review.

## Run 2 — program-design

Keep structural crux, alternative comparison, responsibility/type choices, real caller/failure walk, structural confirmation and local review inline.

- MUST load `references/current-system-model.md` and return the source-backed entry-to-effect and recovery model used to compare proposed changes.
- MUST load `references/alternatives-and-crux.md` and return the crux, credible alternatives, chosen boundary, cost/payer and evidence that could overturn it.
- MUST load `references/components-ownership-interfaces.md` and return the chosen owners, interfaces and domain-state/schema bindings.
- MUST load `references/state-calls-and-flows.md` and return the state/call/data realization and affected real callers.
- IF failure, recovery or overlapping actors affect an obligation, load `references/failure-concurrency-recovery.md` and return its recovery owner, safe repeats and failure/interleaving result.
- IF trust, platform, performance or another cross-cutting constraint changes realization, load `references/cross-cutting-realization.md` and return its enforcement/observation owner and consequence for the selected structure.
- MUST load `references/proof-architecture-and-traceability.md` and return the sufficient structural seams, observations and real-interaction constraints; apply the ownership correction below.
- MUST load `references/artifact-and-self-review.md` and return the structural artifact/views, self-check and confirmation gap.
- MUST load `schemas/program-design-result.ts` and return ProgramDesignResult after structural confirmation/waiver and local review.

Conditional existing evidence lanes stay with current-system/prior-art owners through practices-research and management; do not force a default swarm. Relevant full principles govern one truth owner, communicating types, concern boundaries, justified complexity, failure/concurrency and reader understanding.

Proof-owner correction in this run: replace the current proof reference's “Planning owns which test proves the decision” and any matching row/layer instruction. Program Design owns seam/observation sufficiency and structural constraints on what must stay real. Test Design chooses the scenario, independent oracle, layer and substitutions within those constraints. Planning translates/schedules that adopted strategy into implementation steps and commands. Keep Program Design's legitimate real/fake boundary and invalid-state enforcement judgments; do not transfer all proof structure to tests.

## Run 3 — test-design (new)

Keep forbidden behavior → real interaction → cheapest honest layer → independent assertion → deterministic completion inline, with the testing-pyramid judgment and local review. New teaching homes:

- MUST load `references/scenarios-oracles-and-layers.md` and return case coverage with an independent oracle, honest layer and the interactions that must remain real. Include a clean pure-rule case and an interaction whose mock would erase the failure; reject assertions that exclude permitted outcomes.
- IF assessing existing tests affected by the change, load `references/existing-test-quality.md` and return keep/repair/remove decisions grounded in protection, determinism and diagnosis, with proposed repairs routed to the Implementer.
- IF completion is asynchronous or fixtures can fail before behavior is exercised, load `references/fixtures-and-completion.md` and return a fixture that reaches the intended assertion plus correlated completion; setup failure is not behavioral RED.
- MUST load `schemas/test-design-result.ts` and return TestDesignResult after local review, with its document, decisive strategy summary and planned-evidence limits; keep full scenarios/oracles in the design rather than a duplicate JSON case inventory.

Read principle-write-tests-that-can-fail at the scenario/oracle/layer choice; use full types/read-ground-truth/reader principles when those decisions arise. No mock-count rule, required mutation tool, sleep or all-layers quota.

## Run 4 — verification-design (new)

Keep adopted outcome/reference → existing actual route → reachable observation → cases/limits → judgment inline. Distinguish authored design, prebuild challenge and delivered observations; #127 determines the work/grant, and a planned case is not a run.

- MUST load `references/reference-and-outcome-cases.md` and return case coverage tied to the actual independent reference and observable outcome; include wrong-target and acknowledgement-without-outcome cases.
- MUST load `references/real-surface-and-feasibility.md` and return the inspected target/config/readiness/drive/observation route and feasibility gaps. Existing offline preparation is not live readiness.
- IF examining a delivered implementation or its actual evidence, load `references/delivered-evidence-and-test-adequacy.md` and return observed applicability, Test Design/pyramid/assertion/real-boundary adequacy, actual RED limits and precise correction owners. The reference teaches historical evidence reuse and the malformed-packet chronology countercase. No product-test edits or inferred execution authority.
- IF an explicitly assigned verification apparatus is absent, broken or cannot reach the required outcome, load `references/verification-apparatus.md` and return the built/repaired driver's demonstrated reference-to-observation capability, retained evidence and unresolved limits. Inspect existing launch/health/drive/evidence/cleanup owners; stay within named paths and command/tool grants; use the surface's real completion signal and clean only run-owned resources. Missing grants or reference/reachability stop that branch. Future admitted driver work must prove its real end-to-end interaction; existence or a mocked import is insufficient. The present authoring job grants no app run or driver modification.
- IF authoring the Verification Design, load `schemas/verification-design-result.ts` and return VerificationDesignResult after its local review. For prebuild/delivered work use #127's supplied Verifier work-result contract instead; do not imply local design review makes delivery accepted.

Use prove-it-works and verify-before-accepting at the evidence decision, reading their leaves in full. Apparatus teaching stays here until an independently admitted practice replaces it in one cutover. No speculative runtime package, Jev correctness oracle or new project driver is a prerequisite.

## Run 5 — spec-program-review

Keep review/classify entry, target authority, independent whole reading, case/countercase, selected checks, semantic owner routing and retained correction closure inline. Extend the actual operation/mode boundaries in execution-contracts.md.

- IF operation is classify-review-requirement, load `references/classifying-review-requirement.md` and return ReviewClassification with zero reviewer dispatches. Extend its local modes/first-cycle requirement; preserve semantic-effect and current-coverage reasoning.
- IF operation is review, load `references/reviewing-common-method.md` and return reconstructed intent, source-backed case/countercase and exact semantic gaps.
- IF reviewing requirements-only, load new `references/reviewing-requirements.md` and return authority/adoption/scope judgment.
- IF reviewing specification-only, load retained `references/reviewing-specification.md` and return observable meaning/domain judgment against Requirements.
- IF reviewing program-only, load retained `references/reviewing-program-design.md` and return structural realization and proof-seam judgment.
- IF reviewing test-only, load new `references/reviewing-test-design.md` and return scenario/oracle/layer/fixture adequacy and false-green countercases.
- IF reviewing verification-only, load new `references/reviewing-verification-design.md` and return reference/surface/observation/feasibility judgment and unverified limits.
- IF reviewing five-artifact-design, load new `references/reviewing-five-artifact-design.md` and return an independently reconstructed end-to-end outcome and cross-document consistency judgment. Replace the old three-artifact review reference and all live callers in one cutover, with no stub.
- IF operation is review, load `references/coordination-and-chunking.md` and return a whole-mode pass or sequential overlapping seam plan; retain mode-complete and chunk lanes where applicable.
- IF operation is review, load `references/lanes/lane-schema.md` and return complete/partial/blocked check statuses and selection reasons.
- IF executable proof is claimed, load retained `references/lanes/proof-challenge.md` and return claim-versus-observation findings within the explicit execution grant; no grant means source-only proof gaps.
- IF operation is review, load retained `references/lanes/dispel.md` and return candidate classifications and unsupported-delivery findings after source checks.
- IF a named unresolved risk matches a retained focused-lane predicate, load that exact existing lane and return its source-backed risk findings; preserve current predicate→lane mapping, not a new all-lanes default.
- IF operation is review, load `references/finding-and-reduction-schema.md` and return the coverage-bound result, verified dispositions, cause-based owner and retained remediation. Extend its concept/route labels for Test Design and Verification Design; keep its complete narrative Finding as the single owner.
- IF returning classification, load `schemas/review-classification.ts` and return ReviewClassification. IF returning a review, load `schemas/design-review-result.ts` and return DesignReviewResult with its report pointer; check statuses, findings, coverage and correction evidence stay in that actual report.

All five new/local modes follow the same independent semantic method, calibrated severity and valid clean controls. A role charter governs Reviewer authority; this phase teaches design judgment, not a copied staffing catalog. The existing convergence rule remains.

## Run 6 — orchestrator-design

Keep decision/evidence interpretation, dependencies, five local cycles, integrated reading and the three adopted confirmations inline. Preserve Lead authorship/acceptance; helpers gather evidence rather than author governing sections.

- MUST load `../../shared-references/requirements-specification-program-design.md` and return the five document responsibilities and distinct current identities.
- MUST load `references/phase-results-and-continuation.md` (new) and return the interpreted phase result, unresolved next dependency or exact semantic gap. This reference teaches the execution-contracts continuation and the case of a failed ownership assumption; it links each phase's own schema rather than duplicating their fields.
- IF an owner-controlled tradeoff or authorized model break requires a decision, load `../../shared-references/owner-decision-brief.md` and return the assumed model, decisive observation, consequence and concrete owner choice. Existing global scope/break rules decide whether this condition holds; no automatic reconfirmation protocol.
- MUST load `references/local-and-integrated-review.md` (new) and return the five current local closures and independent whole-set review state, or exact next review/correction owner. Its stage detail follows U37 and execution-contracts, without an extra confirmation/fleet.
- MUST load `../../shared-references/phase-return-tokens.md` and return the existing/new gap mapping or design terminal, without widening direct work.
- MUST load `schemas/design-cycle-result.ts` and return DesignCycleResult after interpreting current review evidence and adopted confirmation state.

Read full shared-model/scope/tradeoff/refine-model/verify-before-accepting/reader principles where they change the decision. Management/research/trace/coordination remain practice-owned; this phase never becomes a message-forwarding controller.

## Actual cutover allocation

Family runs own their direct producers, local/integrated review, schemas, view/rendering/index/discovery consumers and the shared five-document identity/token contract. They update direct design portability in `spec-handoff` and its packet references, and design meaning/return-owner navigation in `discuss-clarify-mental-models`. Caller procedures are only changed for those actual interfaces.

Separate narrow F6 layer, after the family: `plan-implementation` and its input references; `shared-references/canonical-implementation-plan.md`; `plan-improve-repo` body, template, validation checklist and discovery prompt; `plan-handoff`; readiness/basis references in `orchestrator-implementation-goal`, `implement-plan`, `implementation-review`, and any remaining planning route in `discuss-clarify-mental-models`. It consumes `five-artifact-design` closure and FiveDocumentSet, replaces active `reviewed-three-artifact-design` with `reviewed-five-artifact-design` and `current-three-artifact-design-ready` with `current-five-artifact-design-ready`, and preserves the independent `implementation-mechanics-only` basis. No old label alias or three-document-only acceptance path remains for this adopted design basis. Historical docs retain their original values.

F6 carries only the minimum input/output/basis convergence and the adopted `docs/specs/<spec>/plans/` home. It does not redesign planning algorithms, DAGs, tickets, sequencing or improvement triage. The Lead authors its separate bounded commission; Main implements, paired Verifier observes real schema/consumer gates and retained reviewers close corrections. The family can be a draft layer before F6; delivery/release readiness waits for actual consumer convergence. A source walk must traverse new cycle → canonical plan → design/improvement planner → plan handoff → executor/review without silently falling back to three documents.

Global devfiles instructions/cache/client changes remain a separately authorized lane. Runtime artifact reading, teaching transfer, trust improvement, behavior evaluation and release are not established by these source contracts.

## Security boundary for this authoring

Decision: allowed for source-only spec/schema/reference/interface authoring and fitting structural checks. Future apparatus instructions are limited to assigned paths, existing owners, declared references and explicit command/tool grants. Network/app/privileged execution, client-cache refresh, secret handling and third-party prose copying are deferred, not authorized here. Later admitted executable apparatus needs its real behavior proof and sensitive-surface review. This spec adds no current script, hook or shell/network execution.
