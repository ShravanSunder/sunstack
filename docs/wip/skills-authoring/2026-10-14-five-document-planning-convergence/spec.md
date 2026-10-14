# Planning from the five design documents

2026-10-14 · v3 accepted at SPEC stage · owner plugin: `sunstack-dev` · F6, after the design-family layer

Planning turns an adopted design into work that can be carried out and checked. It must use the Test Design's regression strategy and the Verification Design's real-system observations, rather than quietly starting again from the first three documents. This change connects the existing planners to the new family; it leaves their slicing, dependency, grouping and improvement-triage methods intact.

This is a skill-change spec, not an implementation plan. Both runs are **proposed**. Current authority is design only: author and independently review this spec. Runtime edits and associated proof need a separate accepted commission. The source changes described here are drafted from approved intent; agent behavior has not been evaluated.

## Basis and current defect

The accepted family allocation is `2026-10-13-design-family-rebuild/depth-and-consumers.md:101–108`. Its proof-owner decision at :37 places seams in Program Design, scenarios/oracles/layers/substitutions in Test Design, and translation/scheduling in planning. The owner-adopted plan home is recorded in `2026-10-13-skill-system-decisions/decisions.md:189–190`. Those paths are sibling skill-authoring documents, not new runtime dependencies.

Current runtime source is `skills/design-family-rebuild` at `ffe309643aa90d48563e8b2026aa1ead29743885` (draft PR #128), above `skills/practices-manage-agents` at `0bad422c38e4a047e10ae9d7107f182534d5a0af` (draft PR #127). All plugin paths below are relative to `plugins/sunstack-dev/` at that revision.

Decisive source observations:

- `skills/plan-implementation/SKILL.md:15–16` admits three documents; its slice reference :60–62 chooses oracles, layers and existing-test dispositions itself. A new five-document design can therefore pass planning without its last two documents affecting the plan.
- `skills/plan-improve-repo/SKILL.md:21–28` requires `three-artifact-design`; `skills/spec-program-review/SKILL.md:39–62` now offers five local modes and `five-artifact-design`. That design-bearing improvement admission names a mode the producer no longer returns.
- `shared-references/canonical-implementation-plan.md:20–28` carries the old basis labels and three pointers. Its :59 and the design planner :31 mandate ignored temporary delivery plans, contrary to the adopted durable home.
- `skills/orchestrator-implementation-goal/SKILL.md:22` maps neither `test-design-gap` nor `verification-design-gap`, although both exist in `shared-references/phase-return-tokens.md`.
- `tests/skills/lib/minimal-planning-delivery-contract.test.ts:29,53–56,202–212` and `spec-program-design-user-requirements-contract.test.ts:434–462` intentionally preserve the old planner contract. They need the corresponding contract cutover, not deletion to manufacture green.

These are source discrepancies, not reproduced agent failures. The Advisor independently inventoried them; the Lead reopened the controlling files. No inference, evaluation, app run or test has been performed for F6.

## What success means

A reader can follow the current ready design result through a canonical plan, either planner, plan handoff, executor and review without losing either the Test Design or Verification Design, treating planned evidence as observed, or accepting a three-document substitute. A mechanics-only improvement still reaches a proportional plan without invented design documents. A durable plan travels with the repository and remains one immutable authority.

```text
Reviewed five-document design
  -> planner reads the documents and verifies their current closure
  -> schedules adopted test scenarios and real-system cases into slices
  -> canonical plan preserves that basis and proof obligations
  -> handoff carries it unchanged
  -> implementer executes and proves; paired verifier observes; reviewer reviews

Admitted mechanics-only improvement
  -> planner anchors the bounded repair in current source and regression expectations
  -> same canonical plan and unchanged delivery-intent rules
```

The five documents stay the design authority; the plan is the execution sequence. Its obligation-to-proof rows link adopted scenarios/cases instead of copying their contents into another design, JSON inventory or event store.

## Decisions and preserved boundaries

| ID | Decision | Reason and cost |
| --- | --- | --- |
| D1 | Hard cutover to `reviewed-five-artifact-design` and `current-five-artifact-design-ready` for design-bearing planning. | The current producer has five responsibilities. An alias would hide missing strategy. Old completed plans remain historical; consumers return a discrepancy to the originating planner rather than silently upgrading them. |
| D2 | Consume the current `FiveDocumentSet` and five local closures plus integrated `five-artifact-design` closure; verify actual semantic applicability. | Existing schemas own these representations. Links and ready labels alone do not establish their content. No duplicate schema or mandatory new serialization of the Markdown plan. |
| D3 | On a design basis, Test Design owns scenarios, independent oracles, layers, substitutions and keep/repair/remove decisions; Verification Design owns reference, real route, cases, passing conditions, reuse and limits. Planning owns their placement, concrete commands and prerequisites. | Scheduling can discover a strategy is impossible; it returns the appropriate gap instead of designing a replacement or weakening proof. This prevents two authorities for the same strategy. |
| D4 | Preserve `implementation-mechanics-only` exactly as a source-proven alternative, never an automatic fallback when a five-document set is incomplete. | Existing small repairs should not acquire a compulsory design cycle. Their planner still selects proportional regression/proof details from established contracts and source; any new design-bearing decision exits that basis. |
| D5 | Durable plans use `docs/specs/<spec>/plans/<yyyy-mm-dd-plan-name>.md`. Temporary advisory `plan-only` work may keep the existing temporary home. Tickets cannot refer to temporary plans. | Adopted owner direction. Delivery planning no longer edits ignore policy to hide its canonical plan. A temporary advisory plan cannot be upgraded in place for delivery. |
| D6 | Proposed Lead default for a mechanics-only improvement with no spec: use a dated improvement work-unit folder under `docs/specs/`, containing `plans/`; create no fabricated Specification or extra admission document. | This keeps one durable home and the existing no-design branch. The naming cost is a folder under `specs` with no spec file. This is not owner-confirmed; any later owner answer supersedes this default before implementation. |
| D7 | Keep the existing resolvable canonical Markdown path and source-applicability checks across worktrees. | No branch locator protocol, copies, digest or new plan identity format. If the receiving agent cannot open the actual plan or basis, it returns the access/path discrepancy. |
| D8 | Reviewer and Verifier responsibilities stay as adopted in #127/#128. | Complete governing-basis reading includes all five documents for design-bearing work. This does not turn implementation review into a second design cycle, replace paired verification, or prevent source-backed test-quality findings under existing review rails. |
| D9 | Preserve existing terminals, planner authorship, improvement authority, audit-only exits and carrier immutability. | A label, validation receipt, handoff or ticket cannot authorize execution. No new approval stage, staffing taxonomy, lifecycle ledger or planning algorithm. |
| D10 | Leave dormant historical planning fixtures and handoff-packet home policy outside this cutover. | No current reader consumes `fixtures/minimal-planning-delivery/`; rewriting them proves no live integration. Handoff-packet placement is a separate issue from canonical plan placement. |

No unresolved product or strategy decision has been assigned to the implementer. D6 is an explicit proposed default, not a claim that the owner decided the no-spec case. Keep this row's history if it changes.

2026-10-14 clarifications, effective in v2; the original decisions remain above:

| ID | Decision | Reason and cost |
| --- | --- | --- |
| D11 | Clarifies D2: when supplied, consume the existing `DesignCycleResult` ready variant through its producer's validator/contract, including confirmations and `deliveryEvidenceOwed`; otherwise verify equivalent current five-document readiness from the actual governing evidence. | The accepted execution-contracts.md:26,58 names planning as its consumer. No synthetic cycle or second input schema. Owed evidence becomes scheduled obligations and stays planned. |
| D12 | Clarifies D5: explicit owner direction wins; otherwise apply an established governing repository plan-home policy before the default. A tracking selection needs a durable plan. | Preserve repository conventions rather than creating a competing home. The adopted `docs/specs/<spec>/plans/` default still applies to this owner's work unless changed. Merely finding an old folder does not establish a policy. |
| D13 | Extends D6's proposed default to any durable basis without a file-backed spec folder, including five separately labeled chat documents: use `docs/specs/<yyyy-mm-dd-work-name>/plans/` with no invented spec file. | Chat-only design keeps its existing semantic readiness and can support delivery. File creation is not a new design-admission requirement. This remains a proposed Lead default, not an owner-confirmed answer. |
| D14 | Clarifies D7–D9: the Lead owns the plan as a governing artifact; executors read it and may not silently author, move, upgrade or sweep it into their write scope. When it must travel, the Lead arranges its existing authorized repository delivery. | No universal pre-execution commit gate or separate docs branch is added. If a plan is in the reviewed diff, read it fully and check its canonical contract and governing authority; route defects to the originating planner rather than counting its proposed tasks as delivered product behavior. The diff is never ignored. |

2026-10-14 bounded v3 corrections; these effective rows supersede the indicated wording above:

| ID | Decision | Reason and cost |
| --- | --- | --- |
| D15 | Supersedes D11's validator wording: the cycle producer validates its own result before handback. Planning consumes a supplied ready payload as data, using the shared document/closure contracts and actual evidence; it never loads or imports an orchestrator-owned schema. | Preserve the accepted producer/consumer boundary and layer rule. No schema ownership move, duplicate cycle validator or implicit upstream workflow invocation. Confirmations and owed observations are still inspected and scheduled. |
| D16 | Clarifies D5/D12 and supersedes D13's subject: absent explicit owner/repo policy, a written plan is durable by default; use a temporary home only for explicitly requested temporary/advisory work. `plan-only` alone does not mean temporary. For a durable plan whose basis has no file-backed spec folder, retain D13's proposed dated work-unit folder with no fabricated spec. | Remove the arbitrary home choice for direct improvement plans without adding a question at every run. The no-spec folder remains a strikeable Lead default, not owner-confirmed. |

## Run 1 — `plan-implementation`

**Classification:** behavior-changing update from user-directed intent. One target; consumer edits below only implement this input/output boundary.

**Trigger:** keep model and user invocation available. Update description and discovery wording with this proposed trigger; it names situations and adjacent strategy owners, not workflow steps:

```yaml
description: "Use when writing or revising a repository-grounded implementation plan from a reviewed five-document design, an admitted improvement finding, or a direct planning request. Not for discovering improvements (plan-improve-repo), designing tests (test-design), or designing real-system proof (verification-design)."
```

**Main path:** admit the complete current five-document set and its closures, or the unchanged admitted-improvement return. Open the governing sources and inspect repository reality. Schedule proof-bearing slices, choose meaningful edges and grouping, write one canonical plan at its proper home, then return the unchanged existing ready/non-ready and delivery-context forms. Incomplete TD, VD or their review coverage routes to the semantic owner; it never falls back to the first three documents or manufactures a mechanics-only classification.

When a design-cycle return is supplied, consume its producer-validated ready payload as data instead of extracting only its first three documents or assembling a second shape. Open its actual confirmations/review evidence and schedule its `deliveryEvidenceOwed`; producer validation and a ready literal are not semantic acceptance. Direct source-based planning without that return checks the same adopted readiness against its actual sources, preserving file and separately labeled chat media. A non-ready cycle is routed by its exact gap, never promoted by the planner.

**Depth and calls:** retain `references/slice-and-proof-design.md` as the all-run teaching owner and `shared-references/canonical-implementation-plan.md` as the shared record/home owner. Their main-path calls use literal `MUST load` with the concrete slice/proof map and canonical result returned. Keep basis selection, the strategy boundary and completion visible inline. Add no new reference shell merely to rename a concept.

The canonical reference owns this conditional field-contract call: IF consuming a design-bearing basis, load `shared-references/schemas/design-document-references.ts` and `shared-references/schemas/design-closure-evidence.ts` (paths from the plugin root) and return the current FiveDocumentSet and matching closure/confirmation references or an exact shape/applicability discrepancy. These shared files own the representations; the planner opens the actual documents and evidence for meaning. Any component-shape validation uses these existing shared schemas, not an orchestrator-owned file. Producer cycle validation stays with its producer; existing permanent cycle tests may import its schema without turning the planning phase into its caller.

Use existing principles at the decisions they improve, reading their leaves in full: shared-model and ground-truth before interpreting the design, tests-that-can-fail and prove-it-works when judging a proof substitution, and verify-before-accepting before returning ready. Existing practices continue to own research, management, collaboration and traces. The planner teaches how to turn constraints into executable work; it does not restate those manuals or treat field presence as engineering judgment.

The slice reference teaches two branches:

- For reviewed design, start from Requirements/Specification obligations and Program Design boundaries, then link the adopted TD scenarios and VD cases to their execution slices and earliest suitable integration gate. Detailed cases stay in those documents. Every owed strategy item is scheduled or has an exact semantic gap; shared observations can satisfy several obligations without duplicated runs. Resolve command/file mechanics from current code while preserving the chosen oracle, layer, required real interaction, passing condition and target.
- For mechanics-only work, use the existing source-backed regression/proof method proportionally. No TD/VD is fabricated. The plan's proof expectations become the supplied basis for the paired Verifier, not a substitute design cycle.

Concrete teaching case: TD specifies that saving one draft ID twice must leave one row in the real repository, while VD specifies persistence after restarting the delivered app. Planning schedules the integration regression when the repository slice lands and the restart observation when the runnable system exists. A mocked repository and an extra unit test cannot replace either adopted obligation. If the real restart route is unavailable, return that feasibility gap with its owner, preserving the owed observation.

**Supporting cutover, bounded to this contract:**

- `shared-references/canonical-implementation-plan.md`: five pointers, current local/integrated closure evidence, new labels, durable home, immutable record, and historical-plan discrepancy handling. Reference the existing set/closure authority, not another hand-maintained type.
- `skills/plan-implementation/README.md` and `agents/openai.yaml`: the actual new input and strategy boundary.
- `skills/plan-handoff/SKILL.md`: the planning route label. Its basis/template already carries the record unchanged; edit only a demonstrated omission, never its packet home in this run.
- `skills/orchestrator-implementation-goal/SKILL.md` and its goal-routing reference: admit the new current basis and map TD/VD gaps to the existing bounded design owner, alongside spec/program gaps. Do not widen the requested terminal.
- `skills/implement-plan` and `skills/implementation-review`: inspect their canonical-contract calls; change only a demonstrated basis/admission omission. Existing complete-basis reading now includes all five. Do not recopy phase fields or redesign review lanes/rails.
- `skills/implementation-handoff/SKILL.md`: verify its existing complete canonical-record pass-through against the new basis; no edit is required when that existing call suffices. Apply D14 at canonical ownership and executor/review admission only where the durable artifact creates an actual omission.
- `skills/discuss-clarify-mental-models/SKILL.md` planning route, the plugin README planning-admission/usage sections, and the repository `AGENTS.md` plan-implementation index row: remove the live three-document-only input description. The repo row mirrors the owning skill; no global/devfiles edit is included.
- The two named permanent source-contract tests: update this run's assertions and add narrowly scoped absence checks at the actual active consumers. Historical three-document examples are excluded from a blanket zero-string rule.

**Completion:** the new cycle → canonical basis → design planner → handoff → executor/review source walk preserves all five responsibilities. It covers a valid set, missing TD, missing VD, stale local or integrated coverage, alias/combined content despite well-formed pointers, a command that cannot execute adopted strategy, mechanics-only admission, and a plan-only result that remains non-executable. Source inspection establishes these written paths; it does not prove an agent follows them.

## Run 2 — `plan-improve-repo`

**Classification:** behavior-changing update from user-directed intent, depending on Run 1's canonical contract.

**Trigger:** retain audit/improvement situations and the reviewed-design-planning neighbour boundary. Change only stale basis wording in discovery metadata; no audit portfolio expansion.

**Main path:** keep audit, vetting and prioritization intact. A design-bearing finding is ready for planning only with the five current documents, five local closures and integrated ready review covering their current meaning. `implementation-mechanics-only` retains its positive source test. `design-required` returns the exact missing semantic owner without plan writing. Direct admitted plans remain `plan-only`; orchestrated delivery returns the unchanged admitted finding for the design planner to author its delivery plan.

Test strategy is consumed from the reviewed design, as in D3, when this skill writes a design-bearing direct improvement plan. The mechanics-only branch follows D4. Neither direct improvement planning nor validation invents TD/VD or decides absent product meaning.

For the proposed no-file-backed-spec home default, use one dated folder per scoped audit/work unit and one separate plan per admitted finding; design-backed findings keep their own spec-associated home, and a later new delivery plan uses the existing applicable work home. This placement creates no shared-index prerequisite or new plan authority.

**Depth:** retain `references/improvement-plan-template.md`, `validation-checklist.md`, and `reconcile-backlog.md`, under their existing observable write/validate/reconcile predicates. Update the template's basis and coverage to five documents and the current closure. Validation and reconciliation preserve the original canonical record and return a separate receipt; an old three-document plan remains unchanged and returns the exact originating-planner discrepancy.

Concrete teaching case: changing a bounded formatter invocation without changing a product contract can remain mechanics-only after source inspection. Changing what a retry does after partial success needs design: the planner routes the failure policy instead of hiding it as a small cleanup. A finding with three good documents and no test/verification strategy does not qualify by either branch merely because the implementation looks short.

**Supporting cutover:** the three owned references above where their actual contract requires it, `agents/openai.yaml`, and the improvement rows of the same permanent source-contract tests. No new audit lanes, compulsory shared index or scenario-fixture rewrite is needed for this convergence.

**Completion:** direct design-ready and mechanics-only improvement paths preserve their distinct basis and plan-only terminal; an orchestrated admitted finding carries the full current basis unchanged; missing or stale TD/VD routes to `test-design`/`verification-design`, and missing review coverage to its review owner. Existing admission/validation/reconciliation methods stay intact.

## Proof and independent review

This spec has no executed F6 proof. Each run's posture is `drafted from user intent; behavior not yet evaluated`. The structural work below is planned for a later implementation commission, not granted by this document alone.

Use the existing `tests/skills` harness from the monorepo root. Its package declares Vitest unit tests and `tsc --noEmit`; retain its installed dependency setup. No new local dependencies, schema framework, Markdown parser or node_modules tree.

1. Update the affected permanent source-contract assertions before the source change, show the expected old-basis/home/route mismatch, then show they pass after the cutover. Assertion failures must identify the actual changed contract, not imports, fixture setup or test discovery. These checks protect source consistency; they do not test model judgment.
2. Run the scoped tests, repo-required type/format/lint checks on changed executable/test files, relevant full unit suite, valid local-link/import checks, and whitespace checks. Record exact commands, counts, exits and target revision. Do not weaken unrelated gates or claim an empty CI rollup is a pass.
3. Independently read the actual source chain listed under each run and inspect the completion cases there. Exercise existing FiveDocumentSet/cycle validators through their permanent tests when relied on; a schema parse cannot establish document content, alias resolution or actual review adequacy. Add no new runtime validator without a named consumer need.
4. The paired Verifier supplies finite source/consumer/proof observations under a separate explicit grant; the Lead inspects decisive anchors and actual proof before commissioning independent implementation review. Keep source acceptance, observed execution, client loading, CI, rollout and release separate.

An actual fresh-context behavior/trigger evaluation is separately admitted later. No model experiment, pressure run, Jev judgment or product-app run is required or authorized here, and no source green is advertised as earned trust. The independent SPEC review checks this entire two-run scope before implementation; correction verification reuses the same review lead and preserves finding identity.

Deferred existing recognition gap: `docs-maintain`'s doc-role map names `docs/plans/` and `docs/superpowers/plans/`, omitting nested spec-associated plans. This predates F6; its actual lifecycle method checks current accepted/user authority and preserves active phase ownership, and no actual incorrect move was observed. F6 does not rewrite that lifecycle/index. The adopted home and D12 precedence remain governing; a later doc-maintenance correction may recognize that home without reopening it.

Direct-call routing has a named integration limit: the family defines TD/VD gap tokens and this layer updates the goal orchestrator, but the installed/global devfiles index has not yet been converged in the separately authorized lane. F6 returns the exact semantic gap/owner and does not claim complete installed direct-routing behavior. Global changes remain outside this layer; actual consumer convergence alone is not client/release readiness.

## Coordination, status and non-goals

The Lead owns this spec and future plan/commission; helpers supply evidence. The assigned Main Claude Implementer executes only after current accepted review and the bounded commission. Retain the existing Advisor, paired Verifier and independent Review Lead relationships; no new fleet. The commission supplies their exact sessions and the existing work root. Review history and reports remain on that root or disposable scratch, not in the design body.

The implementation is a separate linear `gh stack` layer above #128, not a rewrite of #122, #127 or #128. Its parent is frozen `ffe30964` until a separately recorded source change requires re-anchoring. The current Main worktree is not granted to the Lead for runtime edits. The existing docs worktree owns this skill-change spec. Preserve all owner WIP folders.

Once separately commissioned, both runs land one user-visible `sunstack-dev` version bump from #128's actual metadata and one dated changelog entry of at most 20 lines with affected skills, structural proof and unverified behavior/refresh status. Verify actual parent metadata at that point; no version or cache mutation occurs during design. Do not auto-refresh installations, mark ready or merge.

Sensitive-surface decision: allowed for the bounded source/reference/test-contract authoring described here, including removal of the obsolete delivery-plan ignore-policy instruction. No new shell/network procedure, hook, asset, credential handling, dependency or home-level write is introduced. Future command execution and publication follow the separately admitted implementation/proof grant, not this design-only spec. Public artifacts omit private paths and collaboration identities.

| Run | Target | Actual status | Evidence |
| --- | --- | --- | --- |
| 1 | `plan-implementation` | proposed | This v3 spec; no runtime change or F6 run |
| 2 | `plan-improve-repo` | proposed | This v3 spec; depends on Run 1 |

Review record: accepted revision v3; mental-model-fit, depth-coverage, trigger-routing and rule-agreement complete across both named runs and their supporting consumer contracts. Verdict `great`; implementation decision `accepted-to-implement`; boundary `source-only`. The original whole-v2 report plus the same Review Lead's current-anchor v3 verification closes all four accepted findings (4 → 0) and binds this entire design, including the Run 2 placement clarification. Full reports and dispositions stay on the work root supplied in the commission. Both runs remain proposed: implementation, behavior proof, installed routing and release are not established or authorized by SPEC acceptance.

Non-goals: global/devfiles instruction changes; cache/client/platform loading changes; role/practice additions; new verification drivers; Jev runtime or eval-system implementation; model/behavior testing; product code; planning algorithms, DAGs, tickets, sequencing, audit triage, delivery terminals or author transfers; new plan schemas, hashes, copied case inventories, approval/progress records or shared indexes; handoff-packet location cleanup; dormant fixtures and historical document rewrites; release or merge.
