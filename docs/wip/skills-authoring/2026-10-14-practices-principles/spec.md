# Useful practice and principle composition — project 1 specification

Specification v2, 2026-10-14. Owner-directed behavior-changing updates. This document specifies one implementation PR, containing 11 runs with exactly one named skill per run. Independent SPEC review accepted v2 at `2d57193b`; all eleven runtime runs are now implemented as authored source, with tests/evaluations explicitly deferred by the owner. Implementation review, behavior proof and release remain unclaimed. [projects.md](projects.md) preserves both project scopes and the owner's base correction.

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
- Verification principle `:17` checks version/place and `:41` rejects immediate ceremonial rechecking. Extend the middle case: changed revision with unchanged relevant dependencies, versus unchanged source with a different actual target.
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
| D4 | Decision-local calls; no universal principle bundle | Helps the actual judgment without filling every context with unrelated leaves. Cost: predicates must be explicit. |
| D5 | Reuse same-agent full reads when unchanged | Role and practice can both depend on a principle without ceremonial re-reading. Another agent's read never counts. |
| D6 | Keep short local applications; prune only replaced generic teaching | Prevents duplication without making the caller guess how a rule applies. File length alone does not select removal. |
| D7 | No new Markdown or machine schemas | Results remain ordinary method output; #127 typed contracts are preserved. No new validator or registry is needed. |
| D8 | Existing references own depth | New management catalog is a coherent policy module; all other planned depth edits use existing homes. Cost: exact catalog read is still required at selection. |
| D9 | No role, phase or taxonomy implementation | Those are project 2. Security remains `ops-security-review` here; no domain leaf is installed. |
| D10 | Fresh task exercises plus clean controls | Measures decisions and restraint. Static string checks cannot prove teaching; prior-revision controls are required for any improvement claim. |
| D11 | No app, scan, Linear or stack mutation in skill proof by default | Task-local source/log fixtures can exercise reasoning. Actual external interactions need their own granted route and cannot be simulated as production proof. |
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

## R1 — Testing principle

**Promise/success.** An agent designing or assessing a test chooses an independent, contract-grounded assertion that catches the specified defect and lets materially different correct implementations pass; it labels red cause and chronology honestly.

**Body change.** After independent-oracle judgment, teach the two-sided check: compare one named forbidden implementation and one allowed alternative against the assertion. Undefined global order, incidental wording or timing cannot become hidden requirements. Exact equality stays where the contract promises it. In the red section, state that a break introduced after green can demonstrate sensitivity, not tests-first chronology or a pre-existing defect; no logged intended red remains a gap.

**Depth.** Add two worked cases to `references/example_scenarios.md`: per-pane versus global ordering, and setup-red → existing green → deliberate break → restored green. Keep mock-eats-input, oracle, layer, concurrency and clean-refactor teaching. The body scenario index names the new cases so the existing reference route discovers them. No mutation/property tool requirement is added.

**Failure/control and completion.** Failure: exact global ordering rejects a permitted schedule; import error or after-green break is reported as tests-first. Controls: exact contracted order stays exact; pure serialization rule uses real producer/validator without unrelated E2E; a permitted break/restore is labeled sensitivity only. Complete when the test choice and evidence statement distinguish those outcomes without rewriting the contract or claiming runs not observed.

## R2 — Evidence acceptance principle

**Promise/success.** An agent reusing evidence can name its exact claim, actual observed target and relevant dependencies, reuse adequate unchanged coverage and identify changed or unknown coverage without automatic global reruns.

**Body change.** Extend version/place guidance: inspect what the observation depended on, what changed there, and whether the recorded build/configuration/client actually matches the claimed target. A newer commit alone invalidates nothing; equal source alone proves no delivery. Apply the same general judgment to semantic review coverage without equating it with executable coverage. Existing claim specificity, decisive output inspection and honest limits remain.

**Depth.** Add one paired dependency-reuse example to the existing scenario reference: a real journey on a declared build, an unrelated prose change, then a routing/config/target change. Preserve wrong-checkout and second-harness cases. No hashes, evidence registry, receipt schema or new target records.

**Failure/control and completion.** Failure: source equality or timestamp accepts an old installed binary as current; unrelated docs edit triggers an unnecessary app run. Control: inspected unchanged exercised paths/config/target supports scoped reuse. Complete when the supported claim and exact observation still owed are clear, without reporting inspected source as observed behavior.

## R3 — Research

**Promise/success.** The evidence walk produces a checked answer with source context and supported scope; an authentic excerpt cannot be promoted into an unsupported consequential conclusion.

**Call sites.** At local re-anchor/source walk: IF a material claim depends on indirect material, version, path or decision origin, load `principle-read-ground-truth-first` and return what the decisive source establishes versus inference. At claim promotion: MUST load `principle-verify-before-accepting` and return the precise conclusion, inspected support and limit before adopting a load-bearing conclusion. At synthesis: IF several sources or competing findings must be explained to another reader, load `principle-write-for-the-reader` and return the answer arranged around that receiving decision.

**Placement/application.** Steps 2/4 consume source context; step 5 consumes claim support; step 6 consumes ordered synthesis. Teach a compact application: read surrounding text, separate the proposition stated from evidence of its adoption, and report the narrower fact if adoption is absent. This produces provenance evidence; Researcher never decides the architecture merely because it found a source. Its charter's existing case stays unchanged.

**No Markdown schema/result inflation.** Replace the pseudo-field contract in `references/evidence-ledger.md` with ordinary recording guidance and one short narrative example using existing claim meanings. Keep queries/nulls/coverage where consequential; no new flags, statuses or universal report slots. Reconcile Return with the existing ledger's “evidence complete; caller decides” concept: a bounded completed answer returns to its commissioner. Load the existing phase-token reference only if the research actually returns an applicable gap/transition; do not fabricate phase readiness from evidence completion or introduce a new token.

**Preserve.** Source-route/class references, freshness, supplied question/non-goals, direct versus inference distinction, optional independently commissioned countercheck, zero accepted findings, and role/grant boundaries. Do not widen countercheck into a mandatory second review. Small anchored transcription needs no synthesis exercise or broader source survey.

**Failure/control and completion.** Quoted agent proposal in an owner message is inferred as adoption; explicit later owner adoption is a valid control. Another control asks one current code question: answer it and return, without inventing a planning gap or readiness. Complete when the material answer is supported or the exact gap is visible, with no design verdict or unauthorized handoff.

## R4 — Agent management

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

## R5 — Collaboration

**Promise/success.** A consequential request reaches the right participant with actionable meaning; only the authorized closer resolves the work after whole-scope evidence is inspected.

**Call sites.** Before shaping an assignment or consequential decision another session must use: IF that condition holds, load `principle-write-for-the-reader` and return the requested result, governing source and relevant limits in actionable wording. At deliberate resolution: IF the root's authorized closer is about to resolve it, load `principle-verify-before-accepting` and return the whole integrated claim, decisive outcomes and remaining obligation.

**Preserve/placement.** Place calls in Message or post and deliberate resolution respectively. Discovery, seats, self-identity, exact routes, granted posting, waits and no-home handling retain existing homes. The trace retains account content; no new collaboration report. Don't move or rewrite role/phase authority. A direct assignment message and a durable checkpoint still serve different needs; do not merge them merely to shorten the method.

**Failure/control and completion.** Addressed “continue” hides which changed obligation governs; a clear existing assignment/acknowledgement stays brief. Two individually green slices fail integrated closure; adequate inspected combined evidence closes without a new run. Complete when action and closure reflect the correct scope, identity and grant.

## R6 — Work trails

**Promise/success.** A cold successor can act from a material checkpoint without inheriting unsupported completion or losing reasons, limits and the next useful action.

**Call sites.** At meaningful update/checkpoint: MUST load `principle-write-for-the-reader` and return a concise decision/reason/evidence/open-action account appropriate to the reader. In the Lead's resume branch: IF an old completion claim or newly accepted result will guide continuation and its evidence-to-claim step is unchecked, load `principle-verify-before-accepting` and return the supported claim or narrower fact/gap.

**Preserve/placement.** The normal output is the existing trace update; no second ledger/report. Keep session-logs versus curated memory rules, writer grants, no repo trails, no shared index, correction history, stand-in limits and collaboration-owned resolution. Worker/Operator still contribute to the commissioner's account. Historical transcription stays attributed; it does not make the writer a Verifier. Existing fallback/reconciliation and markdown-view references retain their purpose; broader extraction is project 2.

**Failure/control and completion.** Stand-in pass becomes actual-provider completion on resume; a current adequate checkpoint is reused without re-running proof or opening another account. Complete when current continuation context is useful and supported to its stated extent.

## R7 — Web presentation

**Promise/success.** A substantial explanation answers the reader's question in the smallest useful view, preserving required relationships, assumptions, risk and unknowns.

**Call site.** Before media selection: MUST load `principle-write-for-the-reader` and return the reader's next question/action and the smallest view that answers it. This applies to substantial explanations; the existing terse/exact-format bypass still wins for small replies.

**Depth ownership.** Strengthen the existing shared `diagram-semantics.md`, once in this run, with a compact question-to-slice application: identify intended answer → retain required facts/uncertainty → select focal target/path → select semantic family/disclosure → choose the consuming surface's medium → check a cold reader can find the answer and correction point. Keep its common method owned here; don't add a new presentation skill, schema or giant role-composition example. The phase/owner supplies authoritative meaning; presentation does not remove required facts to fit.

**Failure/control and completion.** Correct full network hides the requested change; a focused delta table answers it. True topology question keeps necessary labeled edges. Terse answer gains no artificial diagram. Complete when the reader can answer the question and identify material limits; no mandatory smaller-medium rejection recital in user prose.

## R8 — Terminal presentation

**Promise/success.** Apply reader-first selection with intact meaning and readable terminal geometry, rather than changing the semantic relationship to fit a drawing.

**Call site.** Before the shape picker for a substantial explanation: MUST load `principle-write-for-the-reader` and return the reader's question, essential relationship and smallest readable view under the host geometry. Reuse R7's shared semantics and existing atom/Markdown baseline. Preserve the short/exact-format bypass.

**Owned depth edits.** In `references/shape-catalog.md`, replace advice that long/branching flow becomes state or transition importance alone becomes sequence. Local catalogs consume the shared family selection and teach its terminal realization. Slice a large flow or choose another flow layout; state requires lifecycle states, sequence requires communicating actors. Inspect the matching clauses in `references/architecture.md` and `references/sequence-and-state.md` and align only conflicting family advice. Keep worked geometry, recovery labels and useful examples. No wholesale 900-line catalog decomposition, new rendering vocabulary or arithmetic tool is admitted here.

**Failure/control and completion.** Approval branches become invented lifecycle states for a neat box; a true recovery lifecycle remains state, and actor messages remain sequence. Complete when required meaning survives the selected drawing and technical atoms remain usable, without changing the TUI surface's existing stance.

## R9 — Linear tracking

**Promise/success.** Tracking projects the adopted design and delivery dependencies; factual progress updates never silently redefine approved outcomes.

**Call sites.** IF a ticket becomes competing design authority, load `principle-one-owner-per-truth` and return the established owner and conflict. IF dependency/source records disagree, load `principle-read-ground-truth-first` and return the governing/current relation comparison. IF implementation contradicts the adopted model, load `principle-refine-mental-models` and return the assumed/found/consequence distinction and owning correction destination.

**Local consistency repairs.** Update the post-implementation paragraph to route changed meaning to its design owner before projecting the resolution into tickets. Correct `references/ticket-templates.md` bootstrap example so it consumes an adopted design/plan or names the missing input; it doesn't appoint the tracker/Operator to author architecture. Preserve independently deliverable concepts and surgical dependency behavior. Provider syntax remains in existing MCP/CLI references, no current provider API claim or new manual is introduced.

**Failure/control and completion.** Code omits approved recovery and tracker rewrites the requirement to close the ticket; valid checklist progress under unchanged design proceeds without ownership audit. Conflict returns to the existing owner, not a newly minted phase. Complete when tracking updates reflect approved meaning and actual dependencies within the supplied operation.

## R10 — Observability method

**Promise/success.** The agent chooses the smallest operational loop and reports exactly what its current target's observations establish.

**Call sites.** IF shared-stack lifecycle or producer ownership is disputed, load `principle-one-owner-per-truth` and return the existing owner from current sources. IF health/telemetry observations will be relied on to close a proof claim, load `principle-verify-before-accepting` and return the actual target, correlated observation and supported scope.

**Preserve.** Shared stack versus app producer separation; managed/external modes; strict explicit launch versus ordinary fail-open; fresh markers/state/labels; producer scrubbing; inconclusive failed queries. Existing producer/query/application reference routes remain. No stack commands, helper repair, correlation schema, infrastructure lifecycle change or security scan belongs to this run. The discovered negative-query helper concern is deferred to its existing tool owner; skill prose cannot repair swallowed exit status.

**Failure/control and completion.** Collector health/stale other-worktree sample is offered as current app emission; a health-only request closes narrowly, or a current correlated producer observation supports its specific claim. Query access failure/timeout stays inconclusive. Complete when observation and claim match without creating another app proof run for an adequate current observation.

## R11 — Security handoff method

**Promise/success.** An explicit scoped security request reaches the official workflow with its exact grant; borrowed context cannot manufacture broader scan, persistent threat-model or repair authority.

**Call sites.** IF an inherited packet or route changes scope, exclusions or repair authority, load `principle-hold-the-scope` and return the consequential difference and owner/contract anchor. IF adopting coverage or a finding for repair, load `principle-verify-before-accepting` and return the current source, actual coverage and validated failure. Attributed status forwarding alone is not adopting a finding.

**Depth repair.** In `references/routing.md`, replace the missing-context instruction to create a repository threat model with reporting the exact missing context. Preserve demonstrated prerequisites of the selected official workflow; don't invent or waive them. Body retains narrow route choice and explicit threat-model request. Existing prompt may state the supplied task/context/limits, but it does not become a Markdown schema or new authoritative contract.

**Preserve.** Official scanner/tool ownership, unavailable-plugin copy-paste route, read-only default, requested supporting files, validated finding before repair and owner acceptance. No rename to audit family or domain content in this project. No scan/API/repair is run merely to test the skill.

**Failure/control and completion.** Read-only diff request plus missing model turns into persisted full-repo model or repair; explicit threat-model request remains valid, and bounded request with adequate context stays bounded. A severe stale report is not a current finding. Complete when selected route, preserved scope and supported handoff are inspectable without granting the executor additional engineering authority.

## Proof design and claim limits

Structural checks cover all changed bodies/references/metadata pointers: exact destinations exist, predicates/results are usable, frontmatter is unchanged, no references point at nonexistent #128 phases, no new Markdown schemas/types/statuses are introduced, and every altered ownership sentence agrees with its consumer. These checks establish route/packaging integrity only.

Behavior exercises use fresh agents with no authoring history. Write checks before the runs and keep them outside the subject work directory; subjects receive realistic tasks and fixtures, not tests, hidden criteria, questionnaires about reads or prompts asking them to cite principles. The record must show the actual loaded skill copy and observed actions. Trigger checks, if a trigger changes through an admitted finding, do not name that skill in the task. Current unchanged-trigger proof is structural plus checking retained boundary examples; it is not a newly demonstrated auto-loading claim.

For each of the 11 runs, execute its named failure situation and materially different clean control. R1 also covers exact-order and sensitivity-only controls; R2 covers both unchanged coverage and changed target; R4 preserves isolated parallelism; R7/R8 preserve terse and appropriate-family controls; R11 preserves status-only forwarding. One fresh attempt per case is minimum characterization, not universal reliability; repeat affected cases only for variance/failure or a stronger stated claim. If claiming improvement, run the #127 prior copy on the same task/checks with fresh context and report the actual delta. If the prior copy already succeeds, report no demonstrated improvement.

Use permanent scoped fixture/scenario files in the existing `tests/skills` harness, selecting its actual supported route after reading it. Do not add an evaluation framework, temporary test program, universal 11-skill preload or new Markdown result schema. When runtime cannot expose the loaded path or action record, that is a behavior-proof gap. Fresh model examples do not prove provider availability, production correctness or cross-client invocation mechanics.

Scenario outcomes are semantic: what was inspected, chosen, changed, concluded and handed back. Printing principle names is not the check. Record raw action/output evidence and rationalizations only in the executor's proof home, not runtime prose or this design. Keep independent review separate from subject exercises.

Known repository commands, read from `tests/skills/package.json`: `pnpm --dir tests/skills run test`, `pnpm --dir tests/skills run typecheck`, `pnpm --dir tests/skills run test:evals`. At implementation, run fitting selected cases before the required whole skill suite/typecheck; do not blindly start every paid eval. Run `claude plugin validate .` for supported packaging, changed-file formatting/whitespace and pointer checks. No `.github/workflows` exists at this baseline; don't invent a hosted-CI gate or count absence as a green check. Review actual required checks when the PR exists.

## Coordination and delivery

Only these docs change during spec design. The abandoned #128-based worktree is untouched and unconsumed. Runtime, main, closed #128 branch and owner untracked WIP are read-only. No cache/install/global mutation occurs. The work root remains the established ai-tools thread; no extra shared index or repo work trail is created.

The eventual implementation write set is the 11 named skill trees, R7's existing shared `diagram-semantics.md`, permanent scoped tests/fixtures, version metadata and one dated changelog entry/index line. Role charters/schemas, phases, orchestrators, standalone observability helper and unrelated shared files are excluded. The new management `model-catalog.md` is the only planned new runtime reference. Existing test fixture extension is support, not a new schema or runtime mechanism.

At implementation entry, verify current #127/main content, branch/HEAD/status, pending writers and spec acceptance. Owner merges #127. If it is squash-merged, compare resulting target-tree content before moving the branch onto the landed main with normal stack operations; do not assume commit-id equality or cherry-pick #128. If still open, preserve its stack dependency. Register/submit the dependent branch through `gh stack`, with draft PR state observed. Do not rewrite or delete other branches.

Final runtime landing updates sunstack-dev metadata consistently and one public-safe dated changelog under 20 lines. Baseline is 2.76.0; choose the next unused version from the current live metadata at landing, not closed #128's unmerged 2.77.0 by assumption. Cache refresh is a separately explicit post-push/release proof step. This spec does not authorize merges, tags, releases or client refresh.

One persistent Implementer executes admitted runs and associated proof, paired with a Verifier under current management rules. Lead authors governing spec/plan and accepts evidence. Independent skill implementation review consumes the assessed current diff and proof. No helper designs a replacement method or changes owner meaning silently.

## Review and completion

Spec review is required before runtime edits. Independent teaching and structure families inspect the whole multi-run artifact; author does not reduce its own review. Their checks are mental-model-fit/depth-coverage and trigger-routing/rule-agreement, respectively, with independent Lead verification and rubric reduction. Review record: v1 at `bdcba527` completed all four checks and returned `targeted-revision / revise-first` for the catalog consumer cutover only. The same independent review lead verified that correction at v2 `2d57193b` and returned `great / accepted-to-implement`, four checks complete, no accepted findings open. This process-only record preserves the reviewed v2 meaning; runtime dispatch, proof, PR readiness and release remain separate. Review sessions are independent Sol/xhigh sessions, with no cross-family assurance. Keep detailed review reports and iteration history in system/task temp, not this design.

A reviewed spec may authorize implementation but does not prove behavior or PR readiness. At implementation completion, each run records its actual diff, fitting proof, assessed limits and independent result before state advances. Every open fixture/provider/client assumption remains unverified. Final PR readiness requires actual current checks, comments/threads, body/base/head/mergeability and the risk of merging; owner retains merge authority.

Highest design risk is adding plausible principle links that merely increase reading and leave the agent's decisions unchanged. The failure/clean pairs, retained cases, internal working-state returns and sentence-level pruning are intended to expose that. A different risk is cutting local teaching so far that callers must guess its application; short applied result clauses stay.

Detailed spec completion requires all 11 promises, call predicates/results, owned depths, retained responsibilities and proof cases to be reviewable; no run may be accepted with a missing method or an unspecified proof route. Project 2 remains saved analysis scope. Implemented states record authored source only; these documents establish no shipped or behaviorally improved result.


## Implementation state, 2026-10-14

R1–R11 were authored sequentially from the accepted v2 meaning under implementation-plan slices 1–2, starting at `16e0bd8a` with runtime equal to #127 `0bad422c`. Evidence for each implemented row is the current working diff of its named body and depth above: R1/R2 add their worked teaching cases; R3 replaces the ledger field template; R4 moves the complete catalog and retargets all eight named policy consumers; R5/R6 add local composition; R7 owns the shared semantic edit; R8 aligns its three craft references; R9/R11 correct their existing prompts/examples; R10 retains operational references. Frontmatter and `agents/openai.yaml` are unchanged. Role charters, typed contracts, fixtures and project 2 are unchanged.

The owner explicitly deferred tests and evaluations. Validators, formatters and runtime exercises were not run in this authoring draft per the plan's dated boundary. The proof design above remains owed for later verification, not waived or reported passing. All eleven runs are drafted from approved intent; behavior has not been evaluated and independent implementation review has not run. Source comparison is author assessment, not an independent verdict. The sole requested scratch handback carries the complete current diff and per-run comparison for Lead inspection before commit/PR.

Source metadata inspected at this stage used 2.76.0 across all three clients and marketplace entries, with no 2.77.0 live-source release entry. The authoring changeset selects 2.77.0 consistently and records the deferred proof and unrefreshed clients in its dated changelog. Closed #128's unmerged version is not adoption authority. No commit, push, PR, merge, release or installed-cache refresh is performed by this authoring commission.
