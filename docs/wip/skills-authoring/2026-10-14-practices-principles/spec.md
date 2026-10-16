# Useful practice and principle composition: project 1 specification

Specification v3, 2026-10-14. Owner-directed behavior-changing updates. This document specifies one implementation PR, containing 11 runs with exactly one named skill per run. Independent SPEC review accepted v2 at `2d57193b`; all eleven runtime runs are now implemented as authored source, with tests/evaluations explicitly deferred by the owner. Independent implementation review returned `targeted-revision`; the dated [v3 corrections](#2026-10-14-v3-corrections) supersede the v2 rows they name, and the same review lead re-verified them on 2026-10-15. The dated [v4 section](#2026-10-15-v4-principle-citations) converts every principle call to a citation and applies the approved principle inventory. Behavior proof and release remain unclaimed. [projects.md](projects.md) preserves both project scopes and the owner's base correction.

## Purpose and success

The method should help an agent make the right engineering decision, not merely produce the expected headings or cite principle names. Existing practices own recurring methods; principles teach portable judgment at the decisions inside those methods. Each call has a condition, full teaching and a result the next action uses. A role retains responsibility and selects methods; loading a method grants no new authority.

Success is observable on realistic tasks: the agent inspects decisive sources, uses the appropriate judgment, produces the result its method owns, preserves authorized scope and accepts only supported claims. It also recognizes clean cases: reuse adequate evidence, keep a permitted exact assertion, preserve safe parallelism, answer a small request briefly and avoid unrelated workflows. Structural links and valid packaging do not establish this success.

No Markdown schemas: no new fenced field contracts, mandatory report slots, status taxonomies, serialized decision records or pseudo-YAML results. Ordinary tables explaining a design, small worked examples, runnable syntax and supplied prompts are not schema definitions. The principle return is usable working state, not a second artifact or a mandatory user-facing recital. Existing #127 typed role contracts remain unchanged.

## Baseline and sourcing

Runtime baseline is PR #127, branch `skills/practices-manage-agents`, `0bad422c38e4a047e10ae9d7107f182534d5a0af`, sunstack-dev 2.76.0. Dedicated worktree branch is `skills/practices-principles`. #128 is closed and reference only. `test-design` and `verification-design` do not exist at this baseline and are not introduced by this spec.

The 11 target trees were compared between #127 and closed #128: no differences were found. Whole target bodies, testing/verification scenario references, research routes/classes/ledger/countercheck, management packet, presentation semantics and decisive operational references were read at the #127-based worktree or at the verified identical footprint. Earlier Worker reports are discovery material; current sources decide the design.

Source observations, not reproduced behavior failures:

- Four practice bodies and five companion methods have no literal `principle-*` calls. Owner requires useful direct composition; missing text alone does not establish missing agent judgment.
- Research already verifies load-bearing claims at `practices-research/SKILL.md:25`; Researcher charter `:7` already teaches pasted-proposal versus adoption. The update sharpens application, not invention of research verification.
- Management `SKILL.md:8-12` already separates role, form, assignment and model; `:48` already requires evidence assessment. Existing charters and typed packets are real counterevidence to a claim that role composition is absent.
- Testing principle `:19` discusses circular/wrong oracles, `:25-27` real floor/layer, `:35` intended-cause red. Strengthen two-sided assertion and chronology distinctions without duplicating that tutorial.
- Verification principle `:17` checks version/place and `:41` rejects immediate ceremonial rechecking. Extend the middle case: changed revision with unchanged relevant dependencies, versus unchanged source run against a different target.
- Linear body `:113` and bootstrap template `:129` can be read as tracker architecture authorship. Preserve doc authority and route the contradiction before changing the projection.
- Security body `:38` reserves threat-model creation to an explicit request, but routing `:33` tells a missing-context recipient to create one first. Correct that owned prompt to match the existing scope; do not design a new security policy.
- Shared presentation semantics `:15-21` distinguishes flow/state/sequence. TUI catalog `:271-277` substitutes state for long/branching processes and `:325` substitutes sequence for important transitions. Correct the conflicting local family-choice advice, preserving layout examples.

The need is approved user intent: useful methods, relevant principle composition, strengthened testing/evidence judgment and no pedantic new machinery. Historical agent failures supply illustrative cases only; no faithful RED reproduction or causal fix claim is made. Current posture: drafted from owner intent; behavior not yet evaluated.

## Decisions

| ID | Default | Why and cost |
|---|---|---|
| D1 | Base on #127; exclude #128 changes | Carries accepted role/form/packet foundation without adopting the disputed phase system. Cost: later phase ideas need fresh analysis. |
| D2 | One target per run, one final PR | Keeps authorship/proof accountable without eleven review requests to the owner. Acceptance covers this whole multi-run spec. |
| D3 | Preserve names, descriptions and invocation controls | This is method/judgment improvement, not discovery-policy redesign. Principles remain caller-selected full reads. |
| D4 | Decision-local calls; no universal principle bundle | Helps the judgment at hand without filling every context with unrelated leaves. Cost: predicates must be explicit. |
| D5 | Reuse same-agent full reads when unchanged | Role and practice can both depend on a principle without ceremonial re-reading. Another agent's read never counts. |
| D6 | Keep short local applications; prune only replaced generic teaching | Prevents duplication without making the caller guess how a rule applies. File length alone does not select removal. |
| D7 | No new Markdown or machine schemas | Results remain ordinary method output; #127 typed contracts are preserved. No new validator or registry is needed. |
| D8 | Existing references own depth | New management catalog is a coherent policy module; all other planned depth edits use existing homes. Cost: exact catalog read is still required at selection. |
| D9 | No role, phase or taxonomy implementation | Those are project 2. Security remains `ops-security-review` here; no domain leaf is installed. |
| D10 | Fresh task exercises plus clean controls | Measures decisions and restraint. Static string checks cannot prove teaching; prior-revision controls are required for any improvement claim. |
| D11 | No app, scan, Linear or stack mutation in skill proof by default | Task-local source/log fixtures can exercise reasoning. Real external interactions need their own granted route and cannot be simulated as production proof. |
| D12 | Land one version/changelog change with the complete implementation | Keeps release metadata coherent. Spec-only commits do not bump runtime version or refresh clients. |

## Common authoring contract

Use the ordinary literal call forms: `MUST load <principle> and return <decision result>` or `IF <observable condition>, load <principle> and return <decision result>`. Resolve skill names through the installed plugin, read the leaf in full and load a scenario reference when its predicate holds. Do not encode a loader hook, native-invocation bypass or installed-cache path in runtime prose.

Keep mental model, main path, always-needed invariants and completion visible in each body. A principle supplies the why and general judgment; the method keeps its sequence and consumes the result. Coherent always-needed detail can use MUST; branch detail uses an observable IF. Callers own entry predicates; references own the selected local work. No instruction asks a helper to perform independent judgment as a mechanical dispatch.

A full principle already read by this same agent at the same revision/context can be reused. Reuse the result only while the decision it answers remains applicable. A changed source/assignment or uncertainty calls for the affected read, not every leaf. Keep working state out of user replies unless it explains the outcome, risk or decision the owner needs.

## Run order and surfaces

All target homes below are under `plugins/sunstack-dev/skills/`. Trigger surfaces stay byte-for-byte unchanged, including each existing `agents/openai.yaml`. Both principle leaves keep `disable-model-invocation: true`; ordinary caller reads remain possible. All runs are updates, behavior-changing and not scoped because predicates/calls or multiple owned text homes change. No new skill is created.

| Run | Target | Main path | Depth | Proof posture | State |
|---|---|---|---|---|---|
| R1 | principle-write-tests-that-can-fail | Two-sided assertion and honest chronology | Existing example_scenarios | Pattern/technique exercise | implemented |
| R2 | principle-verify-before-accepting | Evidence dependency/applicability judgment | Existing example_scenarios | Pattern/discipline exercise | implemented |
| R3 | practices-research | Trace → judge claim → synthesize | Existing ledger/countercheck only where needed | Technique + clean control | implemented |
| R4 | practices-manage-agents | Cut/classify → dispatch → assess | New model-catalog; existing examples | Technique/discipline/reference exercise | implemented |
| R5 | practices-collaboration | Action wording and authorized closure | Existing discovery/waiting retained | Discipline/technique exercise | implemented |
| R6 | practices-show-me-your-work | Material checkpoint and Lead resume | Existing markdown-view; fallback retained | Technique/discipline exercise | implemented |
| R7 | presentation-webui | Reader question before medium | Existing shared diagram-semantics, edited here once | Technique exercise | implemented |
| R8 | presentation-tui | Reader question before shape | Existing craft refs: conflicting family rules only | Technique/reference exercise | implemented |
| R9 | ops-linear-tracking | Truth conflict, dependencies, surprise | Existing ticket-templates | Discipline/technique exercise | implemented |
| R10 | ops-observability-stack | Ownership dispute and claim scope | Existing producer/query refs retained | Pattern/discipline exercise | implemented |
| R11 | ops-security-review | Inherited scope and adopted finding | Existing routing prompt corrected | Discipline/reference exercise | implemented |

R1/R2 land first; remaining runs consume their current teaching. R7 alone edits shared `diagram-semantics.md`; R8 consumes it and corrects its own competing instructions. Implement sequentially within the same worktree; no parallel writers to those shared homes. Runs change text only; proof fixtures remain permanent repository fixtures, not temporary test scripts.

## R1: Testing principle

**Promise/success.** An agent designing or assessing a test chooses an independent, contract-grounded assertion that catches the specified defect and lets materially different correct implementations pass; it labels red cause and chronology honestly.

**Body change.** After independent-oracle judgment, teach the two-sided check: compare one named forbidden implementation and one allowed alternative against the assertion. Undefined global order, incidental wording or timing cannot become hidden requirements. Exact equality stays where the contract promises it. In the red section, state that a break introduced after green can demonstrate sensitivity, not tests-first chronology or a pre-existing defect; no logged intended red remains a gap.

**Depth.** Add two worked cases to `references/example_scenarios.md`: per-pane versus global ordering, and setup-red → existing green → deliberate break → restored green. Keep mock-eats-input, oracle, layer, concurrency and clean-refactor teaching. The body scenario index names the new cases so the existing reference route discovers them. No mutation/property tool requirement is added.

**Failure/control and completion.** Failure: exact global ordering rejects a permitted schedule; import error or after-green break is reported as tests-first. Controls: exact contracted order stays exact; pure serialization rule uses real producer/validator without unrelated E2E; a permitted break/restore is labeled sensitivity only. Complete when the test choice and evidence statement distinguish those outcomes without rewriting the contract or claiming runs not observed.

## R2: Evidence acceptance principle

**Promise/success.** An agent reusing evidence can name its exact claim, the target it observed and relevant dependencies, reuse adequate unchanged coverage and identify changed or unknown coverage without automatic global reruns.

**Body change.** Extend version/place guidance: inspect what the observation depended on, what changed there, and whether the recorded build/configuration/client matches the claimed target. A newer commit alone invalidates nothing; equal source alone proves no delivery. Apply the same general judgment to semantic review coverage without equating it with executable coverage. Existing claim specificity, decisive output inspection and honest limits remain.

**Depth.** Add one paired dependency-reuse example to the existing scenario reference: a real journey on a declared build, an unrelated prose change, then a routing/config/target change. Preserve wrong-checkout and second-harness cases. No hashes, evidence registry, receipt schema or new target records.

**Failure/control and completion.** Failure: source equality or timestamp accepts an old installed binary as current; unrelated docs edit triggers an unnecessary app run. Control: inspected unchanged exercised paths/config/target supports scoped reuse. Complete when the supported claim and exact observation still owed are clear, without reporting inspected source as observed behavior.

## R3: Research

**Promise/success.** The evidence walk produces a checked answer with source context and supported scope; an authentic excerpt cannot be promoted into an unsupported consequential conclusion.

**Call sites.** At local re-anchor/source walk: IF a material claim depends on indirect material, version, path or decision origin, load `principle-read-ground-truth-first` and return what the decisive source establishes versus inference. At claim promotion: MUST load `principle-verify-before-accepting` and return the precise conclusion, inspected support and limit before adopting a load-bearing conclusion. At synthesis: IF several sources or competing findings must be explained to another reader, load `principle-write-for-the-reader` and return the answer arranged around that receiving decision.

**Placement/application.** Steps 2/4 consume source context; step 5 consumes claim support; step 6 consumes ordered synthesis. Teach a compact application: read surrounding text, separate the proposition stated from evidence of its adoption, and report the narrower fact if adoption is absent. This produces provenance evidence; Researcher never decides the architecture merely because it found a source. Its charter's existing case stays unchanged.

**No Markdown schema/result inflation.** Replace the pseudo-field contract in `references/evidence-ledger.md` with ordinary recording guidance and one short narrative example using existing claim meanings. Keep queries/nulls/coverage where consequential; no new flags, statuses or universal report slots. Reconcile Return with the existing ledger's “evidence complete; caller decides” concept: a bounded completed answer returns to its commissioner. Load the existing phase-token reference only if the research returns an applicable gap/transition; do not fabricate phase readiness from evidence completion or introduce a new token.

**Preserve.** Source-route/class references, freshness, supplied question/non-goals, direct versus inference distinction, optional independently commissioned countercheck, zero accepted findings, and role/grant boundaries. Do not widen countercheck into a mandatory second review. Small anchored transcription needs no synthesis exercise or broader source survey.

**Failure/control and completion.** Quoted agent proposal in an owner message is inferred as adoption; explicit later owner adoption is a valid control. Another control asks one current code question: answer it and return, without inventing a planning gap or readiness. Complete when the material answer is supported or the exact gap is visible, with no design verdict or unauthorized handoff.

## R4: Agent management

**Promise/success.** Commission one bounded responsibility with an honest closing check, appropriate form/capacity/grant, safe resources and verified handback. Classification serves this cut rather than becoming public catalog recital.

**Call sites.** Before cutting work: IF the inherited outcome/owner picture is unsettled, materially changed or ambiguous, load `principle-build-the-shared-model-first` and return the understood outcome, boundary and unsettled premise. Before choosing a cut: IF independently checkable responsibilities are mixed or a proposed split changes their boundary, load `principle-separate-the-concerns` and return the distinct jobs and reason for the cut. Before parallel dispatch: IF jobs can touch shared mutable resources or consume unfinished work, load `principle-design-for-concurrency` and return the invariant, harmful ordering and existing isolation/prerequisite. Before relying on a handback: MUST load `principle-verify-before-accepting` and return the exact supported claim, observed scope and remaining gap.

**Depth.** Move the complete tier/exact-id/model tables unchanged to `references/model-catalog.md`. Step 3 MUST loads it and consumes one eligible row and the reason that row requires. Body keeps classification, role/form admissibility, owner override and completion. Catalog owns policy detail, not job meaning. Preserve owner-assigned model/effort and continuation; no model changes are designed by this move. Keep the full examples as teaching, but choose the relevant worked cut; the agent need not narrate all six answers in every owner reply.

**Same-run catalog consumer cutover.** Retarget the current catalog/exact-id/effort policy reads in these eight management references to the single `references/model-catalog.md` owner:

- `references/execution-forms.md`
- `references/native-providers-codex.md`
- `references/native-providers-claude.md`
- `references/native-providers-cursor.md`
- `references/acpx-legacy.md`
- `references/acpx-provider-codex.md`
- `references/acpx-provider-claude.md`
- `references/acpx-provider-cursor.md`

Update all policy-home mentions in those files in R4, alongside Step 3's mandatory read. Preserve every provider command/encoding, eligibility row, exact-id rule, effort rule, relationship lifecycle and access grant; this is a pointer cutover, not provider redesign. Selected routes read the one policy home when they need it; unrelated provider contracts are not a read bundle. Remove the old policy body rather than leave a second copy or forwarding shell. Complete the move only when each listed consumer reaches the new owner and the moved policy matches the prior policy; use the existing R4 retrieval/control exercise and structural pointer check.

Add an isolated-versus-shared-fixture example to existing `delegation-examples.md`. Resource isolation permits parallelism; a real unfinished dependency waits on its owning completion. Do not create scheduler/locks/global capacity state. The existing waiting owner remains collaboration.

**Preserve.** Seven charters, typed role contracts, pair identities, route selection, permissions, no-author-history reviews and Lead acceptance. Operator collection never gains synthesis or repair authority. Unchanged bounded assignments reuse current understanding without another owner confirmation.

**Failure/control and completion.** Two independent-topic probes reset one fixture and accept each other's output; separate fixture/output control remains parallel. Wrong-owner green handback is returned as a gap; correct-owner current proof is accepted without another summary. Complete when the supplied job has a sound cut and handback disposition, not merely a valid packet or created session.

## R5: Collaboration

**Promise/success.** A consequential request reaches the right participant with actionable meaning; only the authorized closer resolves the work after whole-scope evidence is inspected.

**Call sites.** Before shaping an assignment or consequential decision another session must use: IF that condition holds, load `principle-write-for-the-reader` and return the requested result, governing source and relevant limits in actionable wording. At deliberate resolution: IF the root's authorized closer is about to resolve it, load `principle-verify-before-accepting` and return the whole integrated claim, decisive outcomes and remaining obligation.

**Preserve/placement.** Place calls in Message or post and deliberate resolution respectively. Discovery, seats, self-identity, exact routes, granted posting, waits and no-home handling retain existing homes. The trace retains account content; no new collaboration report. Don't move or rewrite role/phase authority. A direct assignment message and a durable checkpoint still serve different needs; do not merge them merely to shorten the method.

**Failure/control and completion.** Addressed “continue” hides which changed obligation governs; a clear existing assignment/acknowledgement stays brief. Two individually green slices fail integrated closure; adequate inspected combined evidence closes without a new run. Complete when action and closure reflect the correct scope, identity and grant.

## R6: Work trails

**Promise/success.** A cold successor can act from a material checkpoint without inheriting unsupported completion or losing reasons, limits and the next useful action.

**Call sites.** At meaningful update/checkpoint: MUST load `principle-write-for-the-reader` and return a concise decision/reason/evidence/open-action account appropriate to the reader. In the Lead's resume branch: IF an old completion claim or newly accepted result will guide continuation and its evidence-to-claim step is unchecked, load `principle-verify-before-accepting` and return the supported claim or narrower fact/gap.

**Preserve/placement.** The normal output is the existing trace update; no second ledger/report. Keep session-logs versus curated memory rules, writer grants, no repo trails, no shared index, correction history, stand-in limits and collaboration-owned resolution. Worker/Operator still contribute to the commissioner's account. Historical transcription stays attributed; it does not make the writer a Verifier. Existing fallback/reconciliation and markdown-view references retain their purpose; broader extraction is project 2.

**Failure/control and completion.** Stand-in pass becomes real-provider completion on resume; a current adequate checkpoint is reused without re-running proof or opening another account. Complete when current continuation context is useful and supported to its stated extent.

## R7: Web presentation

**Promise/success.** A substantial explanation answers the reader's question in the smallest useful view, preserving required relationships, assumptions, risk and unknowns.

**Call site.** Before media selection: MUST load `principle-write-for-the-reader` and return the reader's next question/action and the smallest view that answers it. This applies to substantial explanations; the existing terse/exact-format bypass still wins for small replies.

**Depth ownership.** Strengthen the existing shared `diagram-semantics.md`, once in this run, with a compact question-to-slice application: identify intended answer → retain required facts/uncertainty → select focal target/path → select semantic family/disclosure → choose the consuming surface's medium → check a cold reader can find the answer and correction point. Keep its common method owned here; don't add a new presentation skill, schema or giant role-composition example. The phase/owner supplies authoritative meaning; presentation does not remove required facts to fit.

**Failure/control and completion.** Correct full network hides the requested change; a focused delta table answers it. True topology question keeps necessary labeled edges. Terse answer gains no artificial diagram. Complete when the reader can answer the question and identify material limits; no mandatory smaller-medium rejection recital in user prose.

## R8: Terminal presentation

**Promise/success.** Apply reader-first selection with intact meaning and readable terminal geometry, rather than changing the semantic relationship to fit a drawing.

**Call site.** Before the shape picker for a substantial explanation: MUST load `principle-write-for-the-reader` and return the reader's question, essential relationship and smallest readable view under the host geometry. Reuse R7's shared semantics and existing atom/Markdown baseline. Preserve the short/exact-format bypass.

**Owned depth edits.** In `references/shape-catalog.md`, replace advice that long/branching flow becomes state or transition importance alone becomes sequence. Local catalogs consume the shared family selection and teach its terminal realization. Slice a large flow or choose another flow layout; state requires lifecycle states, sequence requires communicating actors. Inspect the matching clauses in `references/architecture.md` and `references/sequence-and-state.md` and align only conflicting family advice. Keep worked geometry, recovery labels and useful examples. No wholesale 900-line catalog decomposition, new rendering vocabulary or arithmetic tool is admitted here.

**Failure/control and completion.** Approval branches become invented lifecycle states for a neat box; a true recovery lifecycle remains state, and actor messages remain sequence. Complete when required meaning survives the selected drawing and technical atoms remain usable, without changing the TUI surface's existing stance.

## R9: Linear tracking

**Promise/success.** Tracking projects the adopted design and delivery dependencies; factual progress updates never silently redefine approved outcomes.

**Call sites.** IF a ticket becomes competing design authority, load `principle-one-owner-per-truth` and return the established owner and conflict. IF dependency/source records disagree, load `principle-read-ground-truth-first` and return the governing/current relation comparison. IF implementation contradicts the adopted model, load `principle-refine-mental-models` and return the assumed/found/consequence distinction and owning correction destination.

**Local consistency repairs.** Update the post-implementation paragraph to route changed meaning to its design owner before projecting the resolution into tickets. Correct `references/ticket-templates.md` bootstrap example so it consumes an adopted design/plan or names the missing input; it doesn't appoint the tracker/Operator to author architecture. Preserve independently deliverable concepts and surgical dependency behavior. Provider syntax remains in existing MCP/CLI references, no current provider API claim or new manual is introduced.

**Failure/control and completion.** Code omits approved recovery and tracker rewrites the requirement to close the ticket; valid checklist progress under unchanged design proceeds without ownership audit. Conflict returns to the existing owner, not a newly minted phase. Complete when tracking updates reflect approved meaning and current dependencies within the supplied operation.

## R10: Observability method

**Promise/success.** The agent chooses the smallest operational loop and reports exactly what its current target's observations establish.

**Call sites.** IF shared-stack lifecycle or producer ownership is disputed, load `principle-one-owner-per-truth` and return the existing owner from current sources. IF health/telemetry observations will be relied on to close a proof claim, load `principle-verify-before-accepting` and return the actual target, correlated observation and supported scope.

**Preserve.** Shared stack versus app producer separation; managed/external modes; strict explicit launch versus ordinary fail-open; fresh markers/state/labels; producer scrubbing; inconclusive failed queries. Existing producer/query/application reference routes remain. No stack commands, helper repair, correlation schema, infrastructure lifecycle change or security scan belongs to this run. The discovered negative-query helper concern is deferred to its existing tool owner; skill prose cannot repair swallowed exit status.

**Failure/control and completion.** Collector health/stale other-worktree sample is offered as current app emission; a health-only request closes narrowly, or a current correlated producer observation supports its specific claim. Query access failure/timeout stays inconclusive. Complete when observation and claim match without creating another app proof run for an adequate current observation.

## R11: Security handoff method

**Promise/success.** An explicit scoped security request reaches the official workflow with its exact grant; borrowed context cannot manufacture broader scan, persistent threat-model or repair authority.

**Call sites.** IF an inherited packet or route changes scope, exclusions or repair authority, load `principle-hold-the-scope` and return the consequential difference and owner/contract anchor. IF adopting coverage or a finding for repair, load `principle-verify-before-accepting` and return the current source, actual coverage and validated failure. Attributed status forwarding alone is not adopting a finding.

**Depth repair.** In `references/routing.md`, replace the missing-context instruction to create a repository threat model with reporting the exact missing context. Preserve demonstrated prerequisites of the selected official workflow; don't invent or waive them. Body retains narrow route choice and explicit threat-model request. Existing prompt may state the supplied task/context/limits, but it does not become a Markdown schema or new authoritative contract.

**Preserve.** Official scanner/tool ownership, unavailable-plugin copy-paste route, read-only default, requested supporting files, validated finding before repair and owner acceptance. No rename to audit family or domain content in this project. No scan/API/repair is run merely to test the skill.

**Failure/control and completion.** Read-only diff request plus missing model turns into persisted full-repo model or repair; explicit threat-model request remains valid, and bounded request with adequate context stays bounded. A severe stale report is not a current finding. Complete when selected route, preserved scope and supported handoff are inspectable without granting the executor additional engineering authority.

## Proof design and claim limits

Structural checks cover all changed bodies/references/metadata pointers: exact destinations exist, predicates/results are usable, frontmatter is unchanged, no references point at nonexistent #128 phases, no new Markdown schemas/types/statuses are introduced, and every altered ownership sentence agrees with its consumer. These checks establish route/packaging integrity only.

Behavior exercises use fresh agents with no authoring history. Write checks before the runs and keep them outside the subject work directory; subjects receive realistic tasks and fixtures, not tests, hidden criteria, questionnaires about reads or prompts asking them to cite principles. The record must show which skill copy loaded and the observed actions. Trigger checks, if a trigger changes through an admitted finding, do not name that skill in the task. Current unchanged-trigger proof is structural plus checking retained boundary examples; it is not a newly demonstrated auto-loading claim.

For each of the 11 runs, execute its named failure situation and materially different clean control. R1 also covers exact-order and sensitivity-only controls; R2 covers both unchanged coverage and changed target; R4 preserves isolated parallelism; R7/R8 preserve terse and appropriate-family controls; R11 preserves status-only forwarding. One fresh attempt per case is minimum characterization, not universal reliability; repeat affected cases only for variance/failure or a stronger stated claim. If claiming improvement, run the #127 prior copy on the same task/checks with fresh context and report the measured delta. If the prior copy already succeeds, report no demonstrated improvement.

Use permanent scoped fixture/scenario files in the existing `tests/skills` harness, selecting its supported route after reading it. Do not add an evaluation framework, temporary test program, universal 11-skill preload or new Markdown result schema. When runtime cannot expose the loaded path or action record, that is a behavior-proof gap. Fresh model examples do not prove provider availability, production correctness or cross-client invocation mechanics.

Scenario outcomes are semantic: what was inspected, chosen, changed, concluded and handed back. Printing principle names is not the check. Record raw action/output evidence and rationalizations only in the executor's proof home, not runtime prose or this design. Keep independent review separate from subject exercises.

Known repository commands, read from `tests/skills/package.json`: `pnpm --dir tests/skills run test`, `pnpm --dir tests/skills run typecheck`, `pnpm --dir tests/skills run test:evals`. At implementation, run fitting selected cases before the required whole skill suite/typecheck; do not blindly start every paid eval. Run `claude plugin validate .` for supported packaging, changed-file formatting/whitespace and pointer checks. No `.github/workflows` exists at this baseline; don't invent a hosted-CI gate or count absence as a green check. Review the PR's required checks once it exists.

## Coordination and delivery

Only these docs change during spec design. The abandoned #128-based worktree is untouched and unconsumed. Runtime, main, closed #128 branch and owner untracked WIP are read-only. No cache/install/global mutation occurs. The work root remains the established ai-tools thread; no extra shared index or repo work trail is created.

The eventual implementation write set is the 11 named skill trees, R7's existing shared `diagram-semantics.md`, permanent scoped tests/fixtures, version metadata and one dated changelog entry/index line. Role charters/schemas, phases, orchestrators, standalone observability helper and unrelated shared files are excluded. The new management `model-catalog.md` is the only planned new runtime reference. Existing test fixture extension is support, not a new schema or runtime mechanism.

At implementation entry, verify current #127/main content, branch/HEAD/status, pending writers and spec acceptance. Owner merges #127. If it is squash-merged, compare resulting target-tree content before moving the branch onto the landed main with normal stack operations; do not assume commit-id equality or cherry-pick #128. If still open, preserve its stack dependency. Register/submit the dependent branch through `gh stack`, with draft PR state observed. Do not rewrite or delete other branches.

Final runtime landing updates sunstack-dev metadata consistently and one public-safe dated changelog under 20 lines. Baseline is 2.76.0; choose the next unused version from the current live metadata at landing, not closed #128's unmerged 2.77.0 by assumption. Cache refresh is a separately explicit post-push/release proof step. This spec does not authorize merges, tags, releases or client refresh.

One persistent Implementer executes admitted runs and associated proof, paired with a Verifier under current management rules. Lead authors governing spec/plan and accepts evidence. Independent skill implementation review consumes the assessed current diff and proof. No helper designs a replacement method or changes owner meaning silently.

## Review and completion

Spec review is required before runtime edits. Independent teaching and structure families inspect the whole multi-run artifact; author does not reduce its own review. Their checks are mental-model-fit/depth-coverage and trigger-routing/rule-agreement, respectively, with independent Lead verification and rubric reduction. Review record: v1 at `bdcba527` completed all four checks and returned `targeted-revision / revise-first` for the catalog consumer cutover only. The same independent review lead verified that correction at v2 `2d57193b` and returned `great / accepted-to-implement`, four checks complete, no accepted findings open. This process-only record preserves the reviewed v2 meaning; runtime dispatch, proof, PR readiness and release remain separate. Review sessions are independent Sol/xhigh sessions, with no cross-family assurance. Keep detailed review reports and iteration history in system/task temp, not this design.

A reviewed spec may authorize implementation but does not prove behavior or PR readiness. At implementation completion, each run records its diff, fitting proof, assessed limits and independent result before state advances. Every open fixture/provider/client assumption remains unverified. Final PR readiness requires current checks, comments/threads, body/base/head/mergeability and the risk of merging; owner retains merge authority.

Highest design risk is adding plausible principle links that merely increase reading and leave the agent's decisions unchanged. The failure/clean pairs, retained cases, internal working-state returns and sentence-level pruning are intended to expose that. A different risk is cutting local teaching so far that callers must guess its application; short applied result clauses stay.

Detailed spec completion requires all 11 promises, call predicates/results, owned depths, retained responsibilities and proof cases to be reviewable; no run may be accepted with a missing method or an unspecified proof route. Project 2 remains saved analysis scope. Implemented states record authored source only; these documents establish no shipped or behaviorally improved result.


## 2026-10-14 v3 corrections

Source: independent implementation review of PR #131 at `b064824` (findings D1–D6, A1–A18) and the owner's decisions D1, D4, D5 and D7 of the same day, plus D8 of 2026-10-15. Each row names the v2 text it supersedes; that text stays above as history. The same review lead re-verified this section on 2026-10-15, before any runtime edit; V3-9 was added that day.

### Decisions

| ID | Supersedes | Decision | Why and cost |
|---|---|---|---|
| V3-1 | D3 "caller-selected full reads"; Common authoring contract `:51` "Resolve skill names through the installed plugin…" and the `:55` reuse paragraph | Principles are read as files through one new shared reference, `shared-references/principle-reading.md` (contract below). Each calling skill gets one pointer line before its first principle call. Call sites keep the `principle-<name>` name and the `load` verb. | Principles are hidden from model invocation, so "load `principle-x`" did not resolve on a host without the owner's private devfiles instruction, and the D5 reuse rule never reached runtime text (review D1). One owner for both rules; costs one file read per run that reaches a principle call. |
| V3-2 | v2 call-site text in R3, R4, R5, R6, R9, R10, R11 | Each principle call fires on an observable event and returns a result the next action uses (call table below). | v2 predicates such as "materially changed", "consequential decision" and "competing design authority" can't be observed, so the read happened by mood; the runtime copied them word for word (review D4). |
| V3-3 | R6 "At meaningful update/checkpoint: MUST"; R7/R8 "for a substantial explanation" | Show-me's write-for-the-reader call becomes an IF on a cold-read checkpoint. The presentation MUSTs stay, without the leading clause: the bypass at the top of each skill already gates them. | Show-me's MUST fired at every checkpoint and changed no decision its body didn't already make. |
| V3-4 | Failure/control text in R4 `:136`, R5 `:146`, R6 `:156`, R10 `:196`, R11 `:208` copied into runtime | Runtime carries no "reuse adequate current evidence / no equivalent run" clause; `principle-verify-before-accepting` (`:17`) owns reuse. Failure/control lines are proof design only. | Restated in six consumers with "adequate" undefined where used (review A6). |
| V3-5 | R9 "Local consistency repairs" (no readiness rule admitted) | Admit the Linear readiness rule in the owner's D5 wording (R9 rows below). | Added in `b064824` without admission, with "delivery boundary" undefined (review D5). |
| V3-6 | R4 Depth "Move the complete tier/exact-id/model tables unchanged to `references/model-catalog.md`. Step 3 MUST loads it…"; R4 "Same-run catalog consumer cutover"; D8 "New management catalog is a coherent policy module"; Coordination `:228` "The new management `model-catalog.md` is the only planned new runtime reference" | Owner decision D7: the model catalog stays in `practices-manage-agents/SKILL.md`. Restore `## Model catalog` byte-identical to `0bad422`, after `## Classify` and before `## Completion`. Delete `references/model-catalog.md`. Step 3 returns to "**Resolve an eligible model** from the catalog for that role, form and classified job, with any recorded reason the tier requires." with its base Completion line. The eight consumers in R4's list return to their `0bad422` pointer text. | Owner preference: the catalog is read where the model is chosen. Cost: step 3 reads a longer body; no consumer cutover remains to maintain. |
| V3-7 | Coordination write set `:228`; and, for these lines only, projects.md project 1 "no … global instruction change" | The write set adds: `shared-references/principle-reading.md`; `docs/principles-index.md` `:3` and `:8`; plugin README Research (`:139`) and Principles (`:185`) paragraphs; root `AGENTS.md` research row (`:124`), principles clause of "Skill layers" (`:113`) and principles table row (`:148`); changelog alignment. Text below. | These lines say how principles load and what research returns. v2 left them stale or changed them without admission (review A1, A16). |
| V3-8 | R1 Body change "no logged intended red remains a gap"; R3 "Keep queries/nulls/coverage where consequential" | R1: the gap is "no red observed against the pre-fix code"; a deliberate break after green shows sensitivity only. R3: record every null result (Boundaries `:16`); Boundaries `:15` owns the claim labels and the ledger uses the same five. | The v2 wording produced the runtime defects in review A8 and A7. |
| V3-9 | R4 Main path as authored at `b064824` (910 words by `wc -w`) | Owner decision D8: rewrite `practices-manage-agents` "## Main path" in one pass to about 550 words, below #127's 721. Keep the step order, each step's Completion line, every MUST/IF call in its v3 form, the V3-1 pointer line once, and these bright lines: missing intent, contract, plan or grant is a gap, not a Partial direction; who may commission whom; a native Worker returns further decomposition to its parent; host settings go in the tool's own arguments and packet text grants nothing; send a drifting agent a correction instead of restarting it; only the Lead accepts delivery; delegate only independent work that costs less to hand off than to do, with #127's "one helper per unit, one table at the end" restored (A4). Cut what another owner states: step 2's role-to-result list and Researcher continuity (role table); its Luna-through-Router example and address keeping (`execution-forms.md` route list and ledger); "Creating a session never grants leadership" (`execution-forms.md:5`, intro); step 5's form-mechanics and target-identity sentences and its Worker Completion sentence (`execution-forms.md`); step 6's field list and contract-reading sentence (`agent-job-packet.md` "Fill each field", "Read only the schema you need") and the two sentences after the concurrency IF (`delegation-examples.md` shared-fixture example). Step 3 is V3-6's base one-liner. A cut rule with no other owner keeps its shortest form. Role-specific text (role table, pair order, fixed-forms paragraph) stays until the role layer moves it. | The Main path grew by restating rules other files own. Cost: steps 5 and 6 send the agent to their references for detail it used to see inline. |
| V3-10 | V3-1's shared reference contract (owns/consumers/inputs/return, rules 1–5, complete-when) and its pointer line | Owner decision D10 (2026-10-15): the pointer line in each caller is "Before your first `principle-*` call, MUST load `../../shared-references/principle-reading.md`." `principle-reading.md` is succinct: **What** (principles are engineering principles), **Why hidden** (they would crowd every context; a skill reads one at the decision that needs it), **How** (a call to `principle-<name>` means read `../principle-<name>/SKILL.md`, or `../skills/principle-<name>/SKILL.md` from `shared-references/`, in full; load `references/example_scenarios.md` only when the principle says to; your own full read earlier in this session counts, another agent's doesn't), then: use the result in your next step and tell the owner only when it explains an outcome, risk or decision. V3-1 stays above as history. | The V3-1 pointer was long and repeated in every caller. Cost: the reference no longer lists its consumers or a return shape; the pointer check and grep find the callers. |

### Shared reference contract (V3-1)

`plugins/sunstack-dev/shared-references/principle-reading.md` opens like the other shared references: what it owns, its consumers, expected inputs, return.

- Owns: how a skill reads a `principle-*` skill its text calls.
- Consumers: the nine R3–R11 skills; the seven `role-*` skills once the role layer lands.
- Expected input: the principle name at the call site, and whether the caller sits in a skill folder or in `shared-references/`.
- It states exactly these rules:
  1. `principle-*` skills are files, not invocable skills; they are hidden from model invocation on purpose, so read the file.
  2. From a skill folder, `principle-<name>` is `../principle-<name>/SKILL.md`, a sibling folder in the same plugin. From `shared-references/` it is `../skills/principle-<name>/SKILL.md`.
  3. Read the principle in full. Load its `references/example_scenarios.md` only when the principle's own IF holds.
  4. A full read this same agent already made in this session, of an unchanged file, counts. Another agent's read never counts.
  5. Use the principle's result in the calling method's next action. Don't recite it to the owner unless it explains an outcome, risk or decision the owner needs.
- Return: the file read, whether its scenario reference was read, and the result the call site names.
- Complete when: the call site's result comes from a full read this agent made in this session of the unchanged file.

Pointer line, identical in every caller:

> IF this run reaches a `principle-*` call, load `../../shared-references/principle-reading.md` before that call and return the principle file to read and whether a read you already made counts.

It sits immediately before the skill's first principle call: research, first line under Ordered Workflow; manage-agents, first line under Main path; collaboration, first line under Message or post; show-me, before the Open-or-resume table; webui, first line under Media selection; tui, first line under Shape picker; linear and observability, after the opening paragraph; security, first line under Workflow.

### Call sites (V3-2, V3-3, V3-4)

Anchors are at `b064824`. "Also" lists the sentences around the call that the rewrite replaces or that restate another owner's rule.

| Run | Anchor | New call | Also |
|---|---|---|---|
| R3 | research step 2 `:23` | IF a claim rests on a summary, memory, quote or label whose source you haven't opened, load `principle-read-ground-truth-first` and return that source, opened, with the claim labeled by a Boundaries class. | Delete S2; proposal versus adoption is said once, at step 5. |
| R3 | research step 5 `:26` | IF a conclusion is load-bearing, load `principle-verify-before-accepting` and return the conclusion, the anchor you opened for it and what that anchor doesn't cover. | Keep the proposal/adoption sentence, ending "…report only that it was proposed". Delete "That establishes provenance…". |
| R3 | research step 6 `:27` | IF the answer combines several sources or competing findings for another reader, load `principle-write-for-the-reader` and return the answer ordered for the decision named in step 1. | Restore, per question, whether the evidence supports, refutes or complicates it (step 1's frame). |
| R3 | research Return `:33` | IF the evidence shows a missing requirement, specification or design decision that another owner must fill, load `../../shared-references/phase-return-tokens.md` and return that gap token with its evidence. | Questions, coverage, verbatim queries, every null result, competing hypotheses and gaps go "in the ledger when one is written, otherwise in the reply". One no-readiness sentence stays: "A completed answer returns without a phase token; the caller decides what follows." |
| R4 | manage-agents step 1 `:36`, moved to the head of the step | IF you can't state in one sentence, from the plan or commission, the result the owner wants, load `principle-build-the-shared-model-first` and return that sentence with the assumption it rests on, or the owner question that blocks it, before cutting. | none |
| R4 | manage-agents step 1 `:36` | IF one job would both build and judge its own result, or both collect and interpret evidence, load `principle-separate-the-concerns` and return the split jobs, each with the check that closes it. | none |
| R4 | manage-agents step 6 `:47`, moved before "then dispatch both" | IF two jobs would write the same file, fixture, branch or service state, or one needs the other's unfinished output, load `principle-design-for-concurrency` and return the shared resource, the ordering that breaks it, and the isolation or wait you write into each packet's limits. | none |
| R4 | manage-agents step 7 `:49` | IF you will use a claim from a handback, load `principle-verify-before-accepting` and return each claim matched to the commit, target and output you opened, or named as a gap. | "A green run that exercised a different component, or another helper's checkout, doesn't close the job." Delete the reuse clause. |
| R5 | collaboration Message or post `:38` | IF a follow-up message changes what another session must deliver or decide, load `principle-write-for-the-reader` and return the message: the new deliverable, the source it comes from and what stays out of scope. | "'Continue' is enough when nothing changed." Delete "Use this result directly…". The typed commission stays with `practices-manage-agents` step 6. |
| R5 | collaboration resolve `:52` | IF you hold the root's `orchestrator` seat and are about to resolve it, load `principle-verify-before-accepting` and return the check that covered the slices together, or the obligation still open. | Keep "Two green slices…". Delete the reuse clause and "Any remaining obligation…" (`:50` owns it). |
| R6 | show-me Lead resume cell `:18` | IF a "done" claim in the thread will guide your next step and you haven't checked it against current sources, load `principle-verify-before-accepting` and return the part current sources support; continue from that part and carry the rest as open work. | none |
| R6 | show-me `:28` | IF the checkpoint will be read cold (a handoff, a stop, or a resume by another session), load `principle-write-for-the-reader` and return an entry a cold successor can act on. | Delete "Put that account…". Move the stand-in example to the Stand-in entry (`:37`); entry content lists stay at `:30` and `:56`. At `:58`, delete the reuse sentence; S2 becomes "When you copy an earlier claim into the trace, attribute it to its author unless you checked it." |
| R7 | webui Media selection `:25` | MUST load `principle-write-for-the-reader` and return the reader's next question or action and the smallest view that answers it. | Delete S2. |
| R8 | tui Shape picker `:28` | MUST load `principle-write-for-the-reader` and return the reader's question, the relationship the answer depends on and the smallest view that fits the terminal width. | Replace "Use shared diagram semantics…" with "IF the view needs a diagram, the diagram-semantics call below picks its family." Rule 1 (`:14`): "Pick one shape for the reader's question (picker below)." |
| R9 | linear `:10` | IF a ticket states design that differs from its linked doc section, load `principle-one-owner-per-truth` and return the doc section and the ticket text that differ, to report to the user or the agent that assigned this work before changing either. | Delete S2–S3. |
| R9 | linear `:90` | IF the plan's dependencies and Linear's `blockedBy` relations disagree, load `principle-read-ground-truth-first` and return what the plan says each dependency is and what Linear's relation list shows, before changing either. | Delete S2–S4. |
| R9 | linear `:117` | IF the shipped code does something its linked doc section doesn't say, or leaves out something it says, load `principle-refine-mental-models` and return what the doc assumed, what the code showed and which doc section must change. | S1: "Tick only checklist items you saw completed." "Get the doc corrected by its owner, through the user or the agent that assigned this work, before changing the ticket." Keep the omitted-recovery sentence. Delete "Once the owner settles…". |
| R10 | observability `:10` | IF a change would touch both the shared stack and a producer, or the Separation Rule doesn't name the owner of a file you are about to change, load `principle-one-owner-per-truth` and return the owner of each file before editing. | Delete S2. The call now fires only where `:8` and the Separation Rule don't settle ownership (review A14). |
| R10 | observability `:21` | IF a health check or telemetry query will close a proof claim, load `principle-verify-before-accepting` and return which app, worktree and marker the query matched. | Delete the reuse sentence. |
| R11 | security step 2 `:50` | IF a pasted prompt, packet or earlier route asks for more than the user did (a wider scan, a saved threat model, or fixes), load `principle-hold-the-scope` and return the user's request and the extra it asks for, then run only what the user asked. | none |
| R11 | security step 6 `:63`, as its own list item | IF a finding will be fixed or a report's coverage will be stated as current, load `principle-verify-before-accepting` and return the finding or coverage checked against current source, or why it no longer holds. | Keep "A severe old report is not a current finding." Delete the forwarding sentence. "Preserve … actual prerequisites" (`:82`, routing `:41`) becomes "Read the selected official skill's stated prerequisites; report a missing one before invoking it." |

### R9 readiness rule (V3-5)

- `:113` S2 becomes: "If the plan says the consuming work needs the blocker's artifact delivered (for example, an API deployed to staging), a Done blocker isn't enough: check that delivery before calling the issue ready." Delete S3 (V3-4).
- `:41` S2 becomes: "This is how agents determine what's unblocked; a plan can add a delivery check (see Find what's unblocked)."
- `:119`: "Done when each touched ticket links its doc section, its checklist matches what shipped, its blockers match the plan, and any doc conflict is reported rather than edited around."

### Alignment lines (V3-6, V3-7)

- `docs/principles-index.md:3`: "Each is a skill named `principle-*`, hidden from model invocation: the owner calls one by name, and a skill that calls one reads its file through `shared-references/principle-reading.md`." `:8` (name the principle and its decision) applies when the owner called it; a skill-directed read follows the shared reference's rule 5.
- README Principles (`:185`): "None loads on its own. Consuming skills select and read principles in full at applicable decisions." becomes "The model never loads one on its own; a skill that calls one reads its file through `shared-references/principle-reading.md`."
- README Research (`:139`), last two sentences: "Substantial runs record source-class coverage, primary anchors and null results in a research ledger. It returns its checked answer and limits to the commissioner, with a phase return token only when the evidence shows a gap another owner must fill."
- `AGENTS.md` research row (`:124`) ends "…`tmp/practices-research/` ledgers, and a checked answer with its limits; a phase return token only for a gap another owner must fill".
- `AGENTS.md` "Skill layers" principles clause (`:113`): "Principles (`principle-*`) are the bottom layer: principles hidden from model invocation, read as files through `shared-references/principle-reading.md` when the owner or a calling skill names one; they name only sibling principles; `plugins/sunstack-dev/docs/principles-index.md` maps them."
- `AGENTS.md` principles table row (`:148`): "Engineering principles, one judgment each (for example `principle-design-for-failure`), hidden from model invocation and read as files through `shared-references/principle-reading.md`; family map in `plugins/sunstack-dev/docs/principles-index.md`".
- Changelog `2026-10-14-practice-principle-composition.md`: delete line 7 (V3-6). Line 10 names as updated the README Research and Principles paragraphs, the AGENTS research and principle lines and the principles index. Add the shared reference (V3-1) and the Linear readiness rule (V3-5). Record the implementation-review result and behavior unverified/deferred. Stays under 20 lines.

### Security gate record (review A17)

| Surface | Change after v3 | Decision | Required proof |
|---|---|---|---|
| `ops-security-review` SKILL + `references/routing.md` | Narrows: a missing threat model is reported, not created; stated prerequisites are read before invoking | allowed (R11, D11) | source review; no scan runs as proof |
| 8 native/ACPX provider references | None: V3-6 returns their pointer lines to `0bad422` | allowed | `git diff 0bad422 -- <file>` shows no change for each |
| Model catalog, including its `~/.config/agent-context/model-map.md` read | Back in `SKILL.md`, byte-identical to `0bad422` | allowed | the section diffs empty against `0bad422` |
| `ops-observability-stack`, `ops-linear-tracking` | Adds checks only; no new commands or writes | allowed | source review |
| `shared-references/principle-reading.md` | New read-only procedure naming relative sibling paths | allowed | each caller's pointer path and each sibling principle path resolve |

No runtime line adds a home, cache or installed-plugin path.

### Covered without spec change

A3, A4, A9, A10 (`shape-catalog.md:275`, `:726` and the family-to-picker line), A12's Completion clause ("no root resolved with an open obligation"), A15's list-item split and A18 are runtime corrections inside the v2 and v3 boundary. A18 applies the review's slop line list after the rows above; where a row above rewrites a line, the row's text wins.

### Run states (supersede the State column in "Run order and surfaces")

| Run | Target | State |
|---|---|---|
| none | `shared-references/principle-reading.md` (shared prerequisite, no skill target; lands before the pointer lines) | implemented · verified by the review lead |
| R1 | principle-write-tests-that-can-fail | implemented · v3 corrections applied and verified by the review lead · behavior unverified/deferred |
| R2 | principle-verify-before-accepting | implemented · v3 corrections applied and verified by the review lead · behavior unverified/deferred |
| R3 | practices-research | implemented · v3 corrections applied and verified by the review lead · behavior unverified/deferred |
| R4 | practices-manage-agents | implemented · v3 corrections applied and verified by the review lead · behavior unverified/deferred |
| R5 | practices-collaboration | implemented · v3 corrections applied and verified by the review lead · behavior unverified/deferred |
| R6 | practices-show-me-your-work | implemented · v3 corrections applied and verified by the review lead · behavior unverified/deferred |
| R7 | presentation-webui | implemented · v3 corrections applied and verified by the review lead · behavior unverified/deferred |
| R8 | presentation-tui | implemented · v3 corrections applied and verified by the review lead · behavior unverified/deferred |
| R9 | ops-linear-tracking | implemented · v3 corrections applied and verified by the review lead · behavior unverified/deferred |
| R10 | ops-observability-stack | implemented · v3 corrections applied and verified by the review lead · behavior unverified/deferred |
| R11 | ops-security-review | implemented · v3 corrections applied and verified by the review lead · behavior unverified/deferred |

## Implementation state, 2026-10-14

R1–R11 are committed on `skills/practices-principles` as draft PR #131, head `b064824`, base #127 `0bad422`. `16e0bd8a` records the implementation slices, `b7d6541f` authors R1–R11, and `b0648241` reconciles readiness and clarifies prose, including the Linear rule and README edits that V3-5 and V3-7 now admit. Version 2.77.0 is set in all three client manifests and marketplace entries. Independent cross-lineage implementation review at `b064824` returned `targeted-revision` with ship decision `blocked`, and owner decision D7 was added. The v3 corrections in `4d05ac7..fa5139a` close findings D1–D5 and A1–A18; D6 was handled in the PR descriptions. In a throwaway worktree the review lead observed `git diff --check` clean, `claude plugin validate .` passing, the skill suite at 149/149 and typecheck exit 0. Behavior proof stays deferred by the owner. The v3 corrections, including V3-9, are applied on this branch in local commits after `4d05ac7` and were verified by the review lead. After them the implementer observed the skill suite at 149/149, typecheck exit 0, `claude plugin validate .` passing and `git diff --check` clean. Nothing is pushed, and no merge, release or cache refresh has happened.

## 2026-10-15 v4: principle citations

Source: the owner's 2026-10-15 decisions for this conversion; the accepted principle citation grammar ([spec](../2026-10-15-principle-citation/spec.md), accepted at `cd26f9b3`, implemented in `skill-authoring` 0.2.0 at `ff8c911b` and `312391ab`); and the owner-approved principle inventory for the four practices and the five ops and presentation skills ("all recommended"). The inventory rows were anchored at `991667b`; the rows below are re-anchored on this branch at `c2b9c18`. Each decision names the v2 or v3 text it supersedes, and that text stays above as history. Role-skill inventory items are not in this PR; they land on #132.

### Decisions

| ID | Supersedes | Decision | Why and cost |
|---|---|---|---|
| V4-1 | V3-1 rules 3–4 and V3-10 "How" (the read rule lived in `principle-reading.md`) | In all 17 `principle-*` skills, the first body line after the H1 title is exactly: "Read this principle in full before applying it; your own full read earlier this session counts." | Owner decision 1. The grammar makes the principle's read rule the precondition for citing it, and `placement-and-calls` checks it, so a citing skill writes no loader line. |
| V4-2 | V3-1 (shared reference and pointer line), V3-10, and the V3-7 alignment lines that name `principle-reading.md` | Hard cutover with no stub: delete `shared-references/principle-reading.md` and the pointer line "Before your first `principle-*` call, MUST load …" in all nine callers. Update every live file that names it: `AGENTS.md` (Skill layers principles clause, principles table row), the plugin `README.md` Principles paragraph, `docs/principles-index.md` `:3` and `:8`, and the #131 changelog entry. Older dated changelogs and `docs/wip` history stay. | Owner decision 2. Two homes for the read rule would drift, and the grammar has no loader line. |
| V4-3 | Common authoring contract "Use the ordinary literal call forms: `MUST load <principle> …`"; the "New call" column of the V3-2 call table (its predicates survive as moments where a row below keeps them) | Every principle use in the nine skills, their references (including the seven role charters under `practices-manage-agents/references/roles/`) and `shared-references/diagram-semantics.md` uses the citation form `<observable moment>, <action in plain words> ([<principle's judgment in plain words>](<relative path>))`. No ``load `principle-`` remains in these files. | Owner decision 3; grammar D1 and D5. |
| V4-4 | The V3-2 call table rows, as changed below | Apply the approved inventory for the nine skills (rows below): the inventory predicate becomes the moment and its return becomes the action. Side fixes: the ticket-templates "sync handlers sufficient for now" Deferred example; the presentation-tui walkthrough's adjective pro/con example, whose costs now say what and who pays; diagram-semantics' "two viable options", changed to include doing nothing. practices-research · define-the-domain-first is dropped. | Owner decision 4. |
| V4-5 | none | The seven role charters in this PR change form only. A charter copy of a citation that a skill it names at that step already makes is dropped: `lead.md`'s cut-work shared-model (management step 1 cites it) and `researcher.md`'s read-ground-truth and write-for-the-reader (`practices-research` steps 2 and 6 cite them). Every role inventory item lands on #132, where the charters become `role-*` skills. | Role items are out of this stage; the drops follow the grammar's once-per-decision rule. Cost: the #131 → #132 merge resolves these files against #132's role skills. |
| V4-6 | V3 "Run states" | Run states below. The version stays 2.77.0: #131 is unreleased, and its changelog entry is updated in place. | D12: one version change for the PR. |
| V4-7 | none | Runtime proof B5 from the citation grammar spec is owed by this conversion. It is planned and deferred, not run. A failing B5 goes to the owner before any further conversion. | The grammar spec's Coordination gives B5 to this conversion; its D2 records the assumption B5 tests. |
| V4-8 | none | Management step 1's split rule reads "If one job would both build its own result and review or accept it, or both collect and interpret evidence, split it and give each job the check that closes it." | Keeps the split rule from taking associated proof away from the Implementer (`practices-manage-agents/SKILL.md` Direction: "Tests and proof for an agent's own change stay with that agent"). |
| V4-9 | none | A charter's principles are cited at their moments, not read up front: `references/agent-job-packet.md` `requiredReads` lists "the practices to read in full and the principles this job touches beyond those the charter cites", and `schemas/assignment-fields.ts` `principles` is described as "Job-specific principles to read in full beyond those the charter cites". | Without it, a packet started from "the charter's defaults" would have the recipient read every cited principle at the start (a seam from V4-3). |

### Inventory rows (V4-4)

Anchors are at `c2b9c18`. Each row's citation sentence is the moment, then the action, then the link to the principle.

| Skill | Anchor | Principle | Inventory | Moment → action |
|---|---|---|---|---|
| practices-research | step 2 `:25` | read-ground-truth-first | change | A question asks what code, a library or a running system does → trace each claim to its decisive source read in full (every matching caller or write, the conditions around it, what is wired or deployed), label it by a Boundaries class, and report a failed read as an access gap, not an absence. |
| practices-research | step 5 `:28` | verify-before-accepting | keep | Before accepting a load-bearing conclusion → name the anchor opened for it and what that anchor doesn't cover. |
| practices-research | step 5 `:28` | experiment-before-proposing | add | A behavior or performance question is still unresolved or contested after the walk → write the bounded probe and its deciding result down before running it where it touches no product state, and record what it showed; without a grant to run it, return the probe and the grant it needs as a gap. |
| practices-research | step 6 `:29` | write-for-the-reader | keep | The answer combines several sources or competing findings for another reader → order it for the decision named in step 1, and move detail that decision doesn't need into the ledger when one is written. |
| practices-research | none | define-the-domain-first | dropped | none |
| practices-manage-agents | step 1 `:38` | build-the-shared-model-first | keep | The owner's result can't be stated in one sentence from the plan or commission → settle that sentence and its assumption, or name the blocking owner question, before cutting. |
| practices-manage-agents | step 1 `:38` | separate-the-concerns | remove | The sentence stays without a citation. |
| practices-manage-agents | step 6 `:48` | design-for-concurrency | keep | Two jobs would write the same file, fixture, branch or service state, or one needs the other's unfinished output → name the shared resource and the ordering that breaks it, and write the isolation or wait into each packet's limits. |
| practices-manage-agents | step 7 `:50` | refine-mental-models | add | A helper returns the same gap or failure after a correction, or contradicts the plan's premise → find the premise every attempt shared and decide drift (correct the packet) or break (back to the plan or the owner), before another correction or a higher model tier. |
| practices-manage-agents | step 7 `:50` | verify-before-accepting | keep | Before using a claim from a handback → match it to the commit, target and output opened, or name it as a gap. |
| practices-manage-agents | step 7 `:50` | hold-the-scope | add | A handback returns a change → mark each commission outcome and limit line carried, weakened or dropped, and trace each addition to the plan or return it as an owner question. |
| practices-manage-agents | `references/execution-forms.md` Continue | design-for-failure | add | A helper granted `write-and-execute` or an external effect ends or goes silent without a handback, before its job is resumed, replaced or re-dispatched → list what it may already have changed with the source checked for each, and decide adopt, clean up or wait. |
| practices-collaboration | Message or post `:40` | write-for-the-reader | remove | The inline rule stays: a follow-up that changes what another session must deliver or decide states the new deliverable, its source and what stays out of scope. |
| practices-collaboration | resolve `:54` | verify-before-accepting | keep | The root's orchestrator, or its explicit successor, is about to resolve it → name the check that covered the slices together, or the obligation still open. |
| practices-show-me-your-work | Lead resume cell `:22` | verify-before-accepting | keep | An unchecked "done" claim in the thread will guide the next step → find the part current sources support, continue from it and carry the rest as open work. |
| practices-show-me-your-work | after the resume table | build-the-shared-model-first | add | The Lead resumes and the thread, session-log or conversation holds an owner correction made after the plan → restate the goal and decisions, list each later correction with the plan line it overrides, and put that list to the owner before dependent work. |
| practices-show-me-your-work | `:32` | write-for-the-reader | keep | The checkpoint will be read cold → use the sources' own names instead of labels coined in the session, give the next step as a command or path checked at its source, and keep assumptions, risks and unverified interactions near the top. |
| presentation-webui | Media selection `:27` | write-for-the-reader | change | Before choosing a medium → name the reader's next question or action and the smallest view that answers it, and keep the assumptions, risks and unverified items ahead of technical detail. |
| presentation-webui | Core rules | name-the-tradeoffs | add | The response asks the owner to choose → per option (doing nothing included when credible) the gain, the cost and who pays; the assumption that would flip the choice and its cheapest check; the recommendation and its revisit signal; one-way door or reversible call. |
| presentation-tui | Shape picker `:30` | write-for-the-reader | change | Before picking a shape → name the reader's question, the relationship the answer depends on and the smallest view that fits the terminal width, and keep the assumptions, risks and unverified items ahead of technical detail. |
| presentation-tui | Core rules | name-the-tradeoffs | add | As presentation-webui. |
| ops-linear-tracking | `:12` | one-owner-per-truth | remove | The sentence stays without a citation. |
| ops-linear-tracking | `:92` | read-ground-truth-first | change | The plan's dependencies and Linear's `blockedBy` relations disagree → for each disputed dependency, set the plan line that states it (or "inferred from order") beside Linear's relation; an inferred dependency never overwrites a listed relation. |
| ops-linear-tracking | Create issues workflow | hold-the-scope | add | Deriving milestones or tickets from a design or plan → trace each scope line, acceptance criterion and Deferred item to its section; raise an untraced line or a deferred doc obligation instead of writing it. |
| ops-linear-tracking | Create issues workflow | design-for-failure | add | A create or relation call errored or timed out, or a breakdown resumes in a project that already has items → match each intended item to an existing one (adopt) or mark it absent (create), before any further create call. |
| ops-linear-tracking | Find what's unblocked `:115` | read-ground-truth-first | add | The plan needs the blocker's artifact delivered → observe the delivery where it runs, or say "unverified" and where you looked, before calling the issue ready. |
| ops-linear-tracking | `:119` | refine-mental-models | change | Shipped code and its doc section differ → decide drift (the doc holds; the gap stays an open obligation) or break (the assumption failed; name the doc section). Absorbs the omitted-recovery sentence. |
| ops-observability-stack | `:12` | one-owner-per-truth | keep | A change touches both the stack and a producer, or the Separation Rule names no owner → name the owner of each file before editing. |
| ops-observability-stack | before `:23` | read-ground-truth-first | add | Telemetry is missing or a stack check fails, before restarting or editing → find the first point on the path observed failing, each labeled seen or inferred. |
| ops-observability-stack | `:23` | verify-before-accepting | change | A health check or query will close a proof claim → for health-only closure, name the observed stack or health endpoint and leave app emission outside the result; for producer-emission proof, name the app, worktree and marker matched and what remains uncovered. A canary-absence claim needs the canary on the producer path under that marker. |
| ops-security-review | step 2 `:52` | hold-the-scope | remove | The sentence stays without a citation. |
| ops-security-review | step 6 `:65` | verify-before-accepting | keep | Before fixing a finding or stating a report's coverage as current → check it against current source, or say why it no longer holds. |
| role charters | Methods | 11 citations | form only (V4-5) | advisor 2, implementer 2, lead 1, operator 1, reviewer 2, verifier 3, researcher 0. |

### Proof (V4-7)

- Static. A check script confirms that every `](…principle-…/SKILL.md)` link resolves from its file, that no ``load `principle-`` remains in `plugins/`, that `principle-reading` appears nowhere outside `docs/wip` and changelogs dated before 2026-10-14, and that all 17 principles open with the read rule; it lists every citation with file:line and is shown failing on a seeded defect. Also `pnpm --dir tests/skills run test` and `typecheck`, `claude plugin validate .` and `git diff --check`. Static proof is structural only.
- B5 runtime A/B (owed, deferred). Fixture A holds a strong citation at step 3, beside a principle whose first body line is the read rule and which holds a move the sentence lacks: a green run on an older commit doesn't prove the head. Fixture B holds the same sentence without the link. The task reaches step 3 with a handback whose CI is green on the previous commit. Check, from the host's record: A opens the principle at step 3 and rejects the stale run; B is the control. Not run in this PR. A failing B5 (principle unread at the moment, or its judgment absent from the action) goes to the owner before any further conversion, including #132's.
- Behavior. The inventory changes stay behavior-unverified, with the rest of this spec.

### Run states (v4; supersede the v3 Run states)

| Run | Target | State |
|---|---|---|
| none | 17 `principle-*` skills: read rule (V4-1) | implemented `4b640de3` · verified by the review lead at `de76441d` |
| none | `shared-references/principle-reading.md`: deleted (V4-2) | implemented `b8a739fa` · verified by the review lead at `de76441d` |
| R1 | principle-write-tests-that-can-fail | v3 implemented and verified · read rule implemented `4b640de3` · behavior unverified/deferred |
| R2 | principle-verify-before-accepting | v3 implemented and verified · read rule implemented `4b640de3` · behavior unverified/deferred |
| R3 | practices-research | v4 citations implemented `3b04ea47` · verified by the review lead at `de76441d` · behavior unverified/deferred · B5 owed |
| R4 | practices-manage-agents | v4 citations implemented `d53c9070`, `79c79957`, corrections `dc84c014` · verified by the review lead at `de76441d` · behavior unverified/deferred · B5 owed |
| R5 | practices-collaboration | v4 citations implemented `974940b8` · verified by the review lead at `de76441d` · behavior unverified/deferred · B5 owed |
| R6 | practices-show-me-your-work | v4 citations implemented `fda2f0c8` · verified by the review lead at `de76441d` · behavior unverified/deferred · B5 owed |
| R7 | presentation-webui | v4 citations implemented `a54785c2` · verified by the review lead at `de76441d` · behavior unverified/deferred · B5 owed |
| R8 | presentation-tui | v4 citations implemented `a54785c2` · verified by the review lead at `de76441d` · behavior unverified/deferred · B5 owed |
| R9 | ops-linear-tracking | v4 citations implemented `caeda35c` · verified by the review lead at `de76441d` · behavior unverified/deferred · B5 owed |
| R10 | ops-observability-stack | v4 citations implemented `4c41cd0d` · verified by the review lead at `de76441d` · behavior unverified/deferred · B5 owed |
| R11 | ops-security-review | v4 citations implemented `43024a83` · verified by the review lead at `de76441d` · behavior unverified/deferred · B5 owed |

### Implementation state, 2026-10-15

The v4 runtime commits `4b640de3..b8a739fa` follow this section's commit `e8127da4` on `skills/practices-principles`, from `c2b9c18`. The implementer observed: the citation check passing (38 citation sentences; every link resolves to a same-plugin principle; no ``load `principle-`` in `plugins/`; no `principle-reading` outside `docs/wip` and changelogs dated before 2026-10-14; all 17 principles open with the read rule), and failing on four seeded defects before they were restored; `pnpm --dir tests/skills run test` 149/149; `typecheck` exit 0; `claude plugin validate .` passing; `git diff --check c2b9c18` clean. The management Main path is 757 words by `wc -w` at `b8a739fa` and 760 after C2 (685 before v4 without the pointer line; #127's was 721). The review lead's corrections C1–C3 are `dc84c014` (packet principles beyond the charter's citations; the split rule keeps associated proof with the Implementer) and `de76441d` (V4-8, V4-9 and the research step 6 row). Static proof is structural only. The review lead verified v4 at its anchors at `de76441d`; no independent implementation review of v4 has run. B5 is owed, and nothing is pushed.
