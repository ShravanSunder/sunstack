# Design-family interfaces and continuation

2026-10-13. Part of the Lead-authored family spec, not a runtime manual or execution grant. This settles the return, review and consumer choices that v2 left to the implementer. The engineering methods remain in each skill's main path and teaching references. Typed returns carry decisions and evidence between actual callers; they do not prove the decisions are correct.

## Five responsibilities, one current set

Keep the existing shared owner `plugins/sunstack-dev/shared-references/requirements-specification-program-design.md`; extend its content to five responsibilities without a forwarding file or a rename for its own sake. Requirements owns authorized needs, Specification observable promises, Program Design structural realization, Test Design regression strategy, Verification Design real-system proof strategy. Every substantial adopted design unit has five distinct document identities.

Define `DesignDocumentReferenceSchema` and inferred `DesignDocumentReference` in `shared-references/schemas/design-document-references.ts`. A reference has `kind: requirements | specification | program-design | test-design | verification-design` and a discriminated location: `file` with nonempty `path`, or `chat` with nonempty `recordReference` and `label`. File paths follow the caller's repository/home policy; the schema does not inspect a filesystem or parse Markdown. The producer verifies that each pointer resolves to the stated subject.

The same file owns `FiveDocumentSetSchema`: required named fields `requirements`, `specification`, `programDesign`, `testDesign`, `verificationDesign`, each constrained to its own kind. Reject a missing field, wrong kind or repeated location identity. Callers additionally inspect aliases and actual contents: distinct strings alone cannot establish five distinct documents. Do not require new document IDs, rename existing requirement references or create a shared tracking index.

## Result homes and real consumers

All paths below are relative to `plugins/sunstack-dev/`. Every new schema imports pinned `zod@4.6.5`, describes every field and discriminant, derives types with `z.infer`, validates strict boundary objects and exposes readonly results. Reuse the established shared check setup and Bun cache. No local node_modules, second package toolchain or handwritten duplicate interfaces. Each result schema has a short comment showing its direct import; prose explains its purpose and links to that schema instead of redefining fields.

| Producer | Authoritative schema and exported result | Consumers |
|---|---|---|
| spec-design, Requirements work | `skills/spec-design/schemas/spec-design-result.ts`: `RequirementsResultSchema`, `RequirementsResult` | spec-design's Specification work; orchestrator-design; local review |
| spec-design, Specification work | Same file: `SpecificationResultSchema`, `SpecificationResult`; `SpecDesignResultSchema` is the real union of these two phases | program-design; orchestrator-design; local review |
| program-design | `skills/program-design/schemas/program-design-result.ts`: `ProgramDesignResultSchema`, `ProgramDesignResult` | test-design, verification-design, orchestrator-design; local review |
| test-design | `skills/test-design/schemas/test-design-result.ts`: `TestDesignResultSchema`, `TestDesignResult` | verification-design, orchestrator-design and local review; planning/Implementer read the document through the adopted design set, not this phase return |
| verification-design, authoring the design | `skills/verification-design/schemas/verification-design-result.ts`: `VerificationDesignResultSchema`, `VerificationDesignResult` | orchestrator-design, integrated review, planning and paired Verifier |
| spec-program-review, classification | `skills/spec-program-review/schemas/review-classification.ts`: `ReviewClassificationSchema`, `ReviewClassification` | the four producer skills, including Requirements work in spec-design |
| spec-program-review, actual review | `skills/spec-program-review/schemas/design-review-result.ts`: `DesignReviewResultSchema`, `DesignReviewResult` | local producers; orchestrator-design; later readiness consumers |
| orchestrator-design | `skills/orchestrator-design/schemas/design-cycle-result.ts`: `DesignCycleResultSchema`, `DesignCycleResult` | continued delivery/plan-implementation, design handoff, current-state validation |

No aggregate file imports every phase merely for discovery. A phase reads its own schema and shared imports; a review reads its review schema. Only the cycle imports the complete set/result definitions it actually validates. Put small shared gap/reference definitions in `shared-references/schemas/`, not a second all-purpose packet library. #127 remains the sole owner of roles, forms, helper assignments, access grants and role handbacks.

## Phase payloads and honest readiness

The phase discriminator is `phase: requirements | specification | program-design | test-design | verification-design`. Each phase result is a closed union on `status`:

- `locally-ready`: required current input references, the produced document reference, a substantive summary and current independent local-review closure. The author self-check remains a step, with no new self-check artifact. This result means the phase can hand its work to its caller; it is never whole-cycle or delivery readiness.
- `blocked`: required exact gap, decisive evidence or its absence, and produced draft references (an empty array means no draft). No locally-ready payload is admitted with an unresolved blocking gap.
- `decision-needed`: the same blocked-work information plus the exact owner decision brief reference. This does not invent a new confirmation or require an owner decision for an agent-added inference.

Use the field names `inputs`, `document`, `summary`, `localReview` and `plannedEvidence` for ready returns. Inputs are named upstream document references constrained to the phase's required kinds; Requirements instead carries `governingSources`. `plannedEvidence` lists only observations explicitly owed later, not every design case; empty means none owed by this phase. Blocked/decision returns use `gap`, `evidenceSummary` and `draftDocuments`; decision-needed adds `ownerDecisionReference`. All human explanations/source-reference strings are nonempty; an empty draft array explicitly represents no artifact. Strict variants exclude ready-only fields from blocked returns. The phase-specific table below fixes the summary's required meanings without serializing its document again.

The shared `DesignGapSchema` / `DesignGap`, in `shared-references/schemas/design-gap.ts`, owns `token`, `reason`, `affectedSources` and `requiredResolution`. Tokens are the existing `requirements-gap`, `specification-gap`, `program-design-gap`, plus deliberate new `test-design-gap` and `verification-design-gap`. `affectedSources` is a required array of inspectable references; empty must be explained by `reason`. `requiredResolution` states what settles the gap, rather than an arbitrary next action. A phase may discover a gap belonging upstream; the token names that semantic owner.

Required ready payload meaning by phase:

| Phase | Current inputs and substantive summary |
|---|---|
| Requirements | Governing owner/source references; produced Requirements; confirmed goal boundary and adopted-outcome summary; requirements confirmation reference or explicit owner waiver |
| Specification | Distinct Requirements; produced Specification; domain/observable obligation summary and obligation-to-requirement references; no internal component decisions |
| Program Design | Requirements and Specification; produced Program Design; chosen owners/interfaces/states, crux and tradeoff summary; structural-realization confirmation reference or explicit owner waiver; proof-seam constraints |
| Test Design | Requirements, Specification, Program Design; produced Test Design; decisive scenario/oracle/layer choice and its tradeoff; exact limitations requiring later evidence |
| Verification Design | Requirements, Specification, Program Design, Test Design; produced Verification Design; declared reference, real outcome/observation strategy and decisive limits; exact observations still owed at delivery |

Test Design itself owns scenario coverage: specified wrong behavior, independent expected outcome, cheapest honest layer, what must remain real, fixture and correlated completion. It records existing-test keep/repair/remove judgments where relevant. Its result points to that document and explains the decisive choice, without a caseCoverage array repeating each case. Planned RED is described as planned; a result cannot claim an observed RED without the executor's actual evidence. The local reviewer and continuing Lead open the actual cases before accepting adequacy.

Verification Design itself owns outcomes, obligation/reference links, actual target surface, reachable observation, passing conditions and remaining risks. Its result carries the decisive strategy and document reference rather than duplicating every case. A required seam/reference that cannot be specified blocks this phase; evidence explicitly owed at delivery is listed as planned and cannot become an observed result. The reviewer and continuing Lead inspect the real reference/route definition rather than counting nonempty fields.

`shared-references/schemas/design-closure-evidence.ts` owns `LocalReviewClosureSchema`, `IntegratedReviewClosureSchema` and `OwnerConfirmationSchema`, with inferred types, because phases and the cycle consume these same meanings. A local closure has `reviewStatus: ready`, `reviewResultReference` and its kind-constrained `coveredDocument`; integrated closure substitutes `coveredDocuments: FiveDocumentSet`. Actual applicability, check coverage and finding/correction evidence remain in the referenced review report. Confirmation is a closed `status: confirmed | waived-by-owner` union with a nonempty `sourceReference`; explicit owner evidence is required in both variants.

Ready phases require `localReview` and, for Requirements/Program Design, their own `confirmation`. The ready cycle requires `localReviews` with five named, correctly covered entries, `integratedReview`, and `confirmations` with named `requirements`, `structuralRealization` and `finalSet` entries. The validator checks that closure targets match the ready payload's documents. The caller opens actual reports/corrections and checks authority/current meaning; a claimed ready literal is not acceptance. Requirements and Specification each have their own local cycle even though one skill authors both. Future prebuild/delivered Verifier observations remain #127's work-specific Verifier result, not a phase result masquerading as delivery proof.

## Local reviews, then independent integration

Preserve U37: every document has its own independent Sol6.1 review cycle through `practices-manage-agents`, followed by one whole-set reader. The producer authors, self-checks and obtains its local review before returning locally-ready. The Lead inspects its material findings and actual correction; the same local review relationship checks bounded corrected anchors. No extra owner approval is added for that review cycle. Retain the three adopted owner confirmations at Requirements, structural realization and final set.

`spec-program-review` keeps two operations:

1. `classify-review-requirement` performs reviewer-free classification. Extend its `requestedMode` to the five local modes below. Inputs remain covered targets, scoped governing-source inventory, scope/semantic effect, matched risks, caller requirement and applicable prior coverage. Its typed result is `invocationState: complete` with `classification: review-required | non-substantial`, decision branch, covered targets, source/semantic-change basis and caller requirement; or `invocationState: blocked` with exact missing inputs and no classification.
2. `review` runs independent judgment. Its typed result preserves `ready | needs-revision | blocked | decision-needed | not-converging`; classification is not a review verdict.

| Review mode | Whole target and required governing context |
|---|---|
| `requirements-only` | Requirements; owner/source authority and adopted goal boundary |
| `specification-only` | Specification, with distinct governing Requirements |
| `program-only` | Program Design, with distinct Requirements/Specification and structural confirmation or owner waiver |
| `test-only` | Test Design, with Requirements/Specification/Program Design; judge scenario, oracle, layer and real interaction |
| `verification-only` | Verification Design, with all four upstream documents; judge declared reference, real surface, observation, feasibility and limits |
| `five-artifact-design` | All five distinct documents; independently walk outcome → structure → regression → real proof and same terms across the set |

Each producer's first/substantive local cycle passes `callerRequirement: required` under U37; that obligation cannot be classified away. A later purely nonsemantic direct edit may reuse inspected current review coverage under the existing semantic-change rules. A bounded accepted correction retains its reviewer and correction closure. Unknown semantic effect is not non-substantial. The five-artifact mode is not passed through the classifier: initial integrated readiness always needs the whole-set review. No compatibility alias for `three-artifact-design` remains in active callers after the allocated cutover.

The integrated reader independently reads the whole current set and can consult the five local results/reviewers for context. It does not forward those verdicts as its own. It uses the existing mode-complete, conditional chunk/proof/risk, dispel, reduction and convergence methods; per-document lenses inside this pass do not replace local cycles. Staffing beyond the specifically preserved local Sol6.1 instruction stays in management.

`DesignReviewResult` has required `mode`, mode-constrained `targets`, `status`, `reportReference` and `next`. The referenced report remains the sole home of check statuses, source/semantic coverage, findings/dispositions, gaps and correction evidence, owned by `finding-and-reduction-schema.md` and extended to the two new semantic owners. Preserve that whole coverage-bound result, human explanation and non-edit/non-acceptance boundary; do not serialize it again in the return. `next` is `stop` with reason or `continue` with exactly one owner and compact handoff references. Accepted multi-owner corrections start at the earliest affected semantic owner; missing owner meaning routes to pathfinding with the recorded return owner. Missing evidence does not acquire invented meaning.

The review producer refuses `ready` when its report contains partial/blocked selected checks, coverage gaps or unresolved accepted corrections; its caller independently inspects that report before acceptance. The schema rejects covered targets incompatible with the mode, but cannot establish report meaning. An observed non-converging cycle stops under the existing convergence rule; it does not create automatic waiver/approval authority.

## Controller interpretation and cycle result

On `locally-ready`, the Lead reads the substantive phase summary, decisive artifact sections and current local closure, then chooses the unresolved next dependency. Normal completion is Requirements → Specification → Program Design → Test Design → Verification Design → integrated review → final owner confirmation. Early downstream feasibility investigation can inform an upstream choice; it cannot finalize a document whose governing meaning is missing. A Program Design local return no longer jumps directly to whole-cycle readiness.

Map gap tokens in `shared-references/phase-return-tokens.md`: requirements → pathfinding; specification → spec-design; program → program-design; test → test-design; verification → verification-design. A review returns the same cause-based owner or an exact stop. The controller owns the map, keeping lower-phase references free of higher orchestrator names. Mapping never widens a direct phase/review request.

`DesignCycleResult` is a union on `status`:

- `ready`: `token: ready-for-planning`, the validated `documents: FiveDocumentSet`, five named local-review closures, current integrated review closure, the three confirmation/waiver references, substantive outcome/structural/proof summary, and explicit `deliveryEvidenceOwed`. There is no unresolved blocking gap. Planned delivery evidence is not a passing observation. The ready schema rejects missing roles, repeated document identities, non-ready review closure and incomplete confirmation variants; the Lead checks authority and current semantic coverage by reading the sources.
- `blocked` or `decision-needed`: exact `gap`, current produced draft references and the last meaningful conclusion; decision-needed additionally carries the owner brief reference. No `ready-for-planning` token or ready payload is present.
- `not-converging`: current set references, the retained review result reference, exact repeated failure and owner brief reference. No fabricated ready token.

A design-ready result is a design terminal. Continued delivery reaches only a converged planner input after F6; direct design work ends here. Lead acceptance, observations and unresolved limits stay explicit. No new risk-ledger, automatic reopening/reconfirmation policy or phase-complete-with-blocking-seams policy is introduced.

## Concrete validating route

The actual validators are these Zod schemas imported by producers/callers and permanent Vitest files under `tests/skills/lib/`: `design-phase-results.test.ts`, `design-review-results.test.ts`, `design-cycle-results.test.ts`. Use the established suite/type/lint/format setup and Bun imports; no standalone dependency installation or Markdown checker.

Tests must exercise representation consumers: one structurally valid locally-ready payload per phase; blocked/decision cases; a wrong local mode/target; classifier returns with missing inputs; a phase-ready payload missing its substantive summary/document/local review is rejected; integrated ready with a missing/repeated document, mismatched or non-ready closure or missing confirmation is rejected; valid ready with explicitly planned delivery evidence is accepted. Check imported single-phase modules without sibling phase dependencies. Static source walks establish actual continuation/classifier calls and required document/report reading. JSON parsing cannot judge oracle, report closure, authority, document contents or runtime feature correctness. Do not write paragraph-matching tests or claim new RED/model behavior from these gates.
