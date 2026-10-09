# AI Tools SDLC skill audit

**Audit snapshot 2026-10-07 · Finalized 2026-10-08 · Grok and Opus reviews source-investigated**

The main problem is verified acceptance across roles: the Lead should plan, check the actual work, and accept it; the Sidekick should implement and prove. Delegation is appropriate, but a “done” message cannot carry work through acceptance without someone inspecting current source and real proof. The log investigation finds skipped checks and ambiguous authority as well as concrete examples where this split worked.

Your skill sources already describe much of that discipline. They cover alignment, domain modeling, design, planning, bounded implementation, independent review, and PR readiness. Source coverage is a strength; reliable execution of those controls remains a separate question. Adding another general SDLC pack would duplicate much of the work and import conflicting authority rules.

The useful additions from the trio are more specific: reusable project verification and feature-map upkeep, measured performance investigation, explicit session-retrospective evidence, and clearer evidence and risk in reviewer-facing summaries. First resolve the current source inconsistencies. Then pilot the missing verification capability and measure context cost before pruning.

## How to read this report

- [Individual analysis of every local skill](local-skill-analysis.md): all 31, with related trio mechanisms, strengths, concerns, proof limits, and a disposition.
- [Complete trio correlation and gap catalog](trio-correlation.md): all 136 pinned entries, including partial matches and entries with no clear local owner. An unmatched entry does not automatically justify a new skill.
- [Work trace](/Users/shravansunder/dev/ai-tools/tmp/practices-research/2026-10-07-sdlc-portfolio/summary.md): scope changes, assignments, decisions, verification, corrections, and review outcomes, with the board source cutoff.
- [Hierarchy and acceptance investigation](hierarchy-and-acceptance.md): Lauren's primary interview, the desired Lead/Sidekick split, actual local/Sunclaw chains, and the acceptance checks to prove.
- [Session evidence](/Users/shravansunder/dev/ai-tools/tmp/practices-research/2026-10-07-sdlc-portfolio/session-evidence.md): ten evidence cards and a bounded three-session October sample.
- [Research ledger](/Users/shravansunder/dev/ai-tools/tmp/practices-research/2026-10-07-sdlc-portfolio/research-ledger.md): sources, queries, freshness, exclusions, and the boundary of the claims.

The comparative sources are **pstack, Matt Pocock, and Addy Osmani only**. The pasted Gemini guide is a useful hypothesis set, not an authoritative inventory or runtime benchmark.

## Coverage and evidence strength

| Corpus | Coverage established | What it does not establish |
| --- | --- | --- |
| Local AI Tools | 31 active skill packages: 28 workflow skills and three tool/scaffolding skills; complete main-file and metadata reads by separate quality Workers; material findings reopened by the Lead | All skills activate correctly or work reliably on the current model |
| pstack | 47 main skills, three automation-owned skills, 23 playbooks: 73 pinned entries | All 73 are active plugin entry points, or the full latest remote tree was reviewed |
| Matt | 38 pinned skill files, including the beta bucket; targeted v1.3.0 and current v1.3.1 reads | The entire current remote portfolio was inspected |
| Osmani | 25 pinned skill files, with command-to-skill distinctions checked | The entire latest remote tree was inspected |
| Historical sessions | Six-session audit/corrections and three Oct 5 Lead exports; additional native Claude/Codex chains; two Sunclaw gate histories and Liaison follow-through; repeated dated incidents | A representative failure rate or a causal defect in current 2.70.0 wording |
| Existing eval exports | 277 JSON files parsed; 67 actual outcomes, all Luna medium; 15 outcomes touch audited skill families and 52 concern a separate authoring package | A current-HEAD portfolio benchmark, multi-model comparison, or comparable cost improvement |

Local source: `main`, HEAD `10ebacfb4ce72893196c87d51bc2271f72fe8922`, workflow version `2.70.0`. `origin/main` was one documentation-only commit ahead; its diff changed no plugin skill. Two existing untracked authoring folders were preserved. Neither product code nor plugin source was changed.

Pinned upstream sources are Matt `c55ee46073ed923f86ce59a5eb3b6d895095d1b7`, pstack `ecc249f1e306fc64ddf83c7bed16cacf7c2239db`, and Osmani `2686b620fc1fed2e8f60c704839c766b8594c6b6`. Version-sensitive claims received limited current-head checks. The admired meta-repo is now `/Users/shravansunder/code/opensource/agent-skills/ai-dev-skills/`; the catalog's older Documents path is stale. At the 2026-10-08 review resume, current HEAD is `695c96379d01b8998f9746a6d3e474c2557836bd`, one docs-only commit beyond the audited snapshot; plugin and hook sources are unchanged. The audit pin remains `10ebacfb`.

Evidence labels used throughout: **source observation**, **historical observation**, **reported count**, **inference**, and **unverified**. A full-text read flag is an inspection receipt. It is not a behavior score. Correlations are functional relationships, not claims of copied provenance or complete equivalence.

## Your skills in the same seven lifecycle groups

The primary group is a navigation choice. Several skills serve more than one stage; the detailed analysis preserves those relationships.

| Group | Local primary owners | Assessment |
| --- | --- | --- |
| 1. Define: discovery, alignment, domain modeling | `discuss-pathfinding`, `discuss-clarify-mental-models`, `spec-design`, `program-design`, `orchestrator-design`, `spec-handoff` | Strong explicit meaning and ownership. Fix the design orchestrator's advertised boundary and handoff fallback. |
| 2. Plan: decomposition and task graph | `plan-implementation`, `plan-improve-repo`, `plan-handoff`, `ops-linear-tracking` | Proof-bearing slices, real dependencies, and immutable plan authority already exist. Improve tracking operation completion. |
| 3. Build: implementation and execution | `implement-plan`, `orchestrator-implementation-goal`, `scaffold-project` | Clear execution ownership and scope. Scaffolding's retrofit choices need to agree with its actual command. |
| 4. Verify: testing and observation | `debug-investigation`, `ops-observability-stack`, `peekaboo` | Good diagnosis and native observation primitives. Missing a distinct project-verifier creation/upkeep lifecycle and a detailed measured performance route. |
| 5. Review: independent judgment and simplification | `implementation-review`, `spec-program-review`, `ops-security-review` | Stronger source/authority separation than a generic persona swarm. Keep proportional risk selection; investigate evaluator disagreements before changing a skill. |
| 6. Ship: evidence-backed PRs and delivery | `implementation-pr-wrapup`, `implementation-handoff` | Current GitHub state and merge authorization are explicit. PRs can communicate proof and rollback consequences more directly without replacing the established template. |
| 7. Retro and maintenance | `docs-maintain`, `skill-audit`, `skills-creation` | Skill maintenance exists. General session mining needs a more explicit evidence procedure; recurring mechanical mistakes should reach existing tooling owners. |
| Cross-cutting support | `manage-agents`, `practices-collaboration`, `practices-show-me-your-work`, `practices-research`, `presentation-tui`, `presentation-webui`, `agent-collaboration` | Keep distinct responsibilities. Clarify research completion versus phase handoff; avoid adding another lifecycle store. |

## The quality rubric, applied to this portfolio

| Dimension | What is already good | What should improve |
| --- | --- | --- |
| Judgment versus mechanics | Exact Operators, repo scaffolding scripts, observation CLI, source-based gates | Make repeated collection and verifier invocation reproducible at the existing owning boundary. Zero skill-local scripts does not mean zero tooling: scripts already live elsewhere in this repo. |
| Trigger and invocation | Narrow phase triggers, adjacent-skill exclusions, namespace families | Resolve contradictions between trigger, body, README, and pressure scenario. Do not copy another harness's invocation metadata blindly. |
| Mental model and main path | Why/What/How separation, explicit plan admission, proof route, role model | Put the decisive action beside its predicate. Extra taxonomy will not repair a transition that is never loaded. |
| Progressive disclosure | Named references and conditional risk checks are widespread | Measure the material actually loaded. Moving all-run text behind another mandatory read improves organization but may save no context. |
| Scope and authority | Lead authors governing design/plan; helpers return evidence; owner controls material decisions and merges | Preserve these boundaries when adapting autopilot, prototype, or design-exploration sources. Do not turn elapsed time into approval. |
| Verification | Red/green where fitting, real/fake distinction, proof challenge, independent oracles, head freshness | Build reusable access to the actual observation seam; distinguish generated harness documentation from a harness actually exercised. |
| Completion and outputs | Concrete returns, incomplete work, stand-ins, and semantic route-backs | Repair inconsistent labels and missing output fallbacks. A delivery receipt proves its reported stage, not work completion. |
| Efficiency and learning | Context pointers, bounded delegation, trace, source-driven maintenance | Calibrate evaluation, record comparable usage, and close recurring mechanical failure classes with code or tools before adding prose. |

No numerical “skill quality” score is assigned. There is no calibrated current-head behavioral benchmark that would justify one.

## What the session logs actually show

Two different problems need separate treatment. **Execution of an existing rule** covers skipped or overstated proof and acceptance: current source already requires Lead assessment before review, source-bound proof, role ownership, meaningful checkpoints, and continuation through authorized work. **Commissioned work that fails or never starts** also appears: the current completion obligation remains clear, but an explicit failed-executor/reassignment procedure is not established in the inspected role and delivery instructions. The Sunclaw #463 case requires an owner and pressure proof for that transition, alongside acceptance checks. Its unstarted-fallback observation is bounded through 2026-10-07 23:34Z; a later 2026-10-08 09:09Z checkpoint claims a start, and a separate status note reports the continuation ended with `test_swift_exit=1`. Neither source supplies a verified matching-head aggregate receipt. The historical delay remains evidence; no current unstarted or readiness claim is made. Its exact causal explanation remains unresolved.

The ten session cards preserve both misses and recoveries. Particularly useful examples are:

- On Oct 5, a Lead admitted that tests and synthetic CLI calls had not established real-agent activity. The source export then records a stronger real-agent interaction. This supports improving the observation path; it does not prove a permanent current skill defect. See [the admission](/Users/shravansunder/dev/session-logs/projects/2026/2026-10-lead-integration-research/workbooks/timelines/agent-studio.pane-fixes.1c8b74a0.txt:5806).
- Another Oct 5 Lead acted from a stale note about wakes. A real wake test changed the understanding and the duplicate local crons were removed. This is a tool/version and retained-context problem as well as an execution problem. See [the wake correction](/Users/shravansunder/dev/session-logs/projects/2026/2026-10-lead-integration-research/workbooks/timelines/agent-studio.ci-improvements.13a23d79.txt:12039).
- Sept 13/19 records show green totals cited for absent or narrower scenarios. The parent withheld completion after inspecting assertions. That parent verification is a positive control worth preserving. See [coverage overclaims and corrections](/Users/shravansunder/dev/memory-logs/skills/log/2026-09-13-test-coverage-overclaimed.md:7).
- A compaction changed a recorded scheduling statement in one inspected session. The available evidence does not establish compaction as the sole cause of the eventual delay or a broad recurrence rate.
- The earlier audit explicitly rejected a “sleep” count: 14 and six Codex waits were waits for a running process's output. They were not sleep polling. The conflicting aggregate is not reused as a fresh rate. See [the verification correction](/Users/shravansunder/dev/memory-logs/skills/investigation/2026-09-30-orchestration-adherence/audits/LEAD-VERIFICATION.md:9).

The sample is purposive, drawn from high-load long-running work. It is not a population estimate. Some historical versions are unknown; others predate current wording. A failed provider request, a stale capability note, a grader disagreement, and a skipped skill gate have different owners and should not be grouped into one “bad skill” score.

The existing exported batches record `13 pass / 6 fail`, `16 pass / 7 fail / 3 inconclusive`, `8 pass / 11 fail`, and `2 pass / 1 fail`. These are four different saved batches, not a controlled trend. **52 of 67 outcomes** concern separate in-progress `skill-creation`, `skill-review`, and `skill-orchestrator` families; **15 of 67** touch five audited families. In the final 19-outcome batch, **14 concern the separate package and five touch audited families**. Every outcome reports subject `gpt-6-luna` at `medium` effort. The final batch's checkpoint distinguishes nine retained behavior misses and two criterion-only failures; those counts are not portfolio failure counts. Revision metadata says `working-tree`, so no saved result establishes matched-head 2.70.0 behavior. The parent rechecked subject/revision/run identity against all 67 primary outcome observations, beyond the Operator's accounting artifact.

## Corrections to the supplied trio guide

| Guide claim | Primary-source result | Consequence for your audit |
| --- | --- | --- |
| pstack supplies a generic bundled Playwright/CDP verification CLI | It generates repo-specific verification instructions and helpers, preferring an existing harness. Current targeted source agrees. | Borrow the discovery, doctor, drive, evidence, cleanup, and maintenance lifecycle. Do not invent a universal CLI or discard your existing native test infrastructure. |
| pstack `/unslop` is code simplification | It edits prose. Refactoring is a separate playbook. | Correlate `unslop` with writing guidance, and refactoring with behavior-preserving change and proof. |
| A verifier swarm makes a PR safe to auto-merge | Swarm, live scenario verification, and autopilot are distinct; the autopilot source has explicit-go and clean-verdict gates. Random fuzzing is not established by the inspected source. | Keep local owner merge authority. A clean review never manufactures a merge grant. |
| Matt v1.3 uses `GLOSSARY.md` and per-ticket TDD | Confirmed at v1.3.0 and v1.3.1; the admired local pin is older 1.2.3. | Version-qualify comparisons. Do not call a newer behavior false because the local submodule is old. |
| Matt's retro has a compaction-loss category | Its seven bullets end with information access; compaction is discussed elsewhere. | You can explicitly investigate compaction, but attribute that extension to the local need. |
| Osmani `/review` always runs four personas | The inspected review is a five-axis skill; shipping has three reviewer personas; web performance is separate. Selected current files match the pin. | Use specialist review only for a named residual risk, not a fixed fan-out ritual. |
| The test pyramid must be exactly 80/15/5 | Osmani presents approximate guidance and excludes non-behavioral docs/config from red/green. | Preserve fitting proof and required repo gates; do not impose a numeric test quota or a pointless test on every edit. |
| All empirical details in the original three videos are established | Their titles/authors were verified; full transcripts and throughput figures were not independently verified. The subsequently named Lauren/Peng interview received direct public-caption inspection. | Keep the evidence classes and specific video sources separate. |

Detailed primary anchors and version checks are in [pstack](pstack-source.md), [Matt](matt-source.md), and [Osmani](osmani-source.md). The separately requested [Lauren hierarchy interview](/Users/shravansunder/dev/ai-tools/tmp/practices-research/2026-10-07-sdlc-portfolio/lauren-hierarchy-evidence.md) confirms bot review/evaluation and delegated execution in examples, but not a universal Matcha acceptance protocol or absent leaf delegation tools.

## Prioritized changes and their smallest useful shape

These are recommendations for later named authoring runs, not approved implementations. Each preserves existing scope and proof. `update`, `create`, `merge`, and `skip` describe the disposition; no proposed skill is installed by this audit.

### R01 · Update `orchestrator-design`: settle its continuation boundary

**Why and evidence.** Its [trigger](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/orchestrator-design/SKILL.md#L3) and [README](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/README.md#L130) describe a design cycle stopping before planning. Its [continuation section](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/orchestrator-design/SKILL.md#L78) requires authoring a plan and commissioning implementation. An active pressure scenario intentionally expects that continuation. This is a present source-contract inconsistency, not an untested typo.

**Recommendation.** Preserve the bounded design owner and route continued delivery to the existing delivery owner, keeping the same Lead and reviewed artifact pointers. The alternative is to broaden the advertised design orchestrator contract everywhere. That retains fewer transition loads but increases overlap with the delivery orchestrator. The first option gives each owner a clearer reason to change; it requires an owner-approved contract disposition before editing.

- **Trigger/owner:** the existing bounded design-cycle trigger and owner.
- **`SKILL.md`:** one design terminal, one conditional continuation handback, preserved Lead authorship and scope.
- **`references/`:** update the adjacent routing/README explanation only where it consumes the chosen boundary; do not add a controller manual.
- **`scripts/`:** not needed for the semantic choice; existing contract checks can validate the chosen route.
- **Pressure coverage:** update the existing continued-delivery scenario plus design-only and review-only negative controls. A passing updated fixture must not erase current authorized continuation behavior without the owner disposition.

**Priority:** P1. **Tradeoff:** clearer ownership, at the cost of a deliberate contract cutover rather than a cosmetic wording edit.

### R02 · Update `scaffold-project`: connect retrofit intent to the existing script

The [intake](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/ai-scaffold/skills/scaffold-project/SKILL.md#L126) offers skip or overwrite. The [later conflict step](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/ai-scaffold/skills/scaffold-project/SKILL.md#L159) instead offers skip or per-file prompts, after script execution. The [script](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/ai-scaffold/scripts/scaffold/scaffold-project.sh#L36) already supports `--overwrite` and defaults to skipping existing files. The main example does not show how the selected preference reaches that flag. Default skip is a positive control; this audit does not claim data loss occurred.

- **Trigger/owner:** existing-project retrofit under `scaffold-project`.
- **`SKILL.md`:** one consistent conflict choice, resolved before execution, with its exact command mapping and preserved default skip.
- **`references/`:** provider/template inventory stays out of the main route; any unsupported per-file procedure is removed or explicitly admitted as separate work.
- **`scripts/`:** reuse the existing script; a new overwrite mechanism is not needed to fix the described wiring.
- **Pressure coverage:** new scenario needed for skip, explicitly selected overwrite, and no repeated preference question; permanent fixture proof should observe file contents through the real script. This is the only active local skill with zero scenario files in this harness, not proof that it has no tests elsewhere.

**Priority:** P1. **Tradeoff:** less repeated questioning and predictable configuration changes, with a small source-to-command correction.

### R03 · Update `practices-research`: distinguish finishing from handing work onward

The [main return instruction](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-research/SKILL.md#L30) requires a listed phase token, while the [ledger template](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-research/references/evidence-ledger.md#L52) also permits `none` and `blocked`. The shared token list defines neither. A research-only audit must be able to finish without manufacturing planning or implementation authority.

- **Trigger/owner:** existing source gathering before a receiving workflow continues.
- **`SKILL.md`:** clarify terminal research status and when a phase handoff token is required, keeping scope-limited direct calls terminal.
- **`references/`:** align the ledger and token consumer contract in the same cutover.
- **`scripts/`:** no new runtime mechanism; existing structural validation may check label agreement.
- **Pressure coverage:** new research-only-complete, blocked-evidence, and actual-phase-handoff scenarios; preserve the existing substantial-ledger scenario.

**Priority:** P2. **Tradeoff:** a small contract clarification removes a source of forced routing; introducing new tokens without updating consumers would create more ambiguity.

### R04 · Update `spec-handoff`: complete the output fallback

Its [trigger and source inputs](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/spec-handoff/SKILL.md#L24) accept conversational design context, while the default output requires a repo-root directory. It has no explicit no-repository/unwritable-destination return. `plan-handoff` already has a useful read-only inline pattern.

- **Trigger/owner:** existing design-context portability before a plan exists.
- **`SKILL.md`:** resolve the available destination, then emit the complete inline prompt when file output is unavailable; state the missing file artifact honestly and preserve authority.
- **`references/`:** retain its own packet template and add the fallback example there; do not merge the three phase-specific handoff packets.
- **`scripts/`:** not needed.
- **Pressure coverage:** new no-repository and no-writes cases; keep ready-design routing and successor-authority controls.

**Priority:** P2. **Tradeoff:** greater portability without another owner question, at the cost of clearly distinguishing transferable content from a saved file.

### R05 · Update `ops-linear-tracking`: make each operation's observed result explicit

The [trigger](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-linear-tracking/SKILL.md#L3) covers inspect, update, and delete, but the [common workflows](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-linear-tracking/SKILL.md#L88) concentrate on creation, finding unblocked work, and description updates. There is no comparable completion/output contract for the whole trigger. The protection against relation replacement is valuable and stays.

- **Trigger/owner:** the existing named Linear operation within user-authorized scope.
- **`SKILL.md`:** identify the exact target and requested effect; report affected IDs, observed provider result, preserved relations, and unresolved effect when needed.
- **`references/`:** operation-specific readback and current-schema discovery belong beside the existing MCP/CLI recipes.
- **`scripts/`:** not needed for a new wrapper; reuse supported connector/CLI operations.
- **Pressure coverage:** new inspect-with-no-write, update-preserves-unmentioned-fields/relations, delete-target, and uncertain-result cases. A simulated connector can test routing; a separately authorized controlled real interaction is needed for any live-effect claim.

**Priority:** P2. **Tradeoff:** a clearer result contract, with bounded extra observation where the provider response does not settle the effect. This is a source completeness gap, not a demonstrated bad Linear mutation.

### R06 · Update existing evidence and audit owners: session recall, retro, and placement

Matt's `retro` and pstack's `recall`/`reflect` teach a useful loop: select relevant sessions, inspect actions, check live state, identify repeated friction, and propose improvements. Your existing `practices-research` and `skill-audit` are the right owners for the requested skill-portfolio version of that loop. A new mega-retro skill is not needed for this audit's repeated workflow.

- **Trigger/owner:** `practices-research` for evidence gathering; `skill-audit` for skill-portfolio disposition. A general codebase improvement remains with its existing repository-improvement owner.
- **`SKILL.md`:** keep the compact source-class and portfolio decision paths; add only the condition/result that activates the retrospective evidence procedure and placement decision.
- **`references/`:** source selection, chronology, recurrence denominators, user correction/action/outcome separation, positive controls, stale version checks, and a seven-category friction rubric. The categories guide inspection; they are not mandatory empty report sections.
- **`scripts/`:** reuse existing exported-log tooling for inventory and bounded event windows. Only genuinely repeated missing collection mechanics justify a script; causal classification stays judgment.
- **Pressure coverage:** update evidence-first scenarios and add stale-summary, duplicate-run, process-wait-versus-poll, positive-control, and historical-versus-current-version cases.

**Priority:** P2. **Tradeoff:** fewer improvised log hunts and more defensible recommendations; overfitting one transcript still requires the human disposition this report preserves.

### R07 · Update `debug-investigation`: measured performance as conditional depth

Pstack's `perf-issue` and `hillclimb`, and Osmani's performance skill, provide a repeatable baseline → hypothesis → one change → measurement → regression decision. Local diagnosis and observability cover parts of this, but [the current debug route](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/debug-investigation/SKILL.md#L26) does not teach that detailed measurement loop. This is a capability extension supported by source comparison, not a reproduced current wording defect.

- **Trigger/owner:** a reported performance symptom within the existing diagnosis owner; keep fixes subject to its accepted fix phase.
- **`SKILL.md`:** the observable condition for loading measurement depth and the required baseline/result, without a new generic optimizer orchestrator.
- **`references/`:** realistic workload, environment controls, independent metric, harness sensitivity, noise/repetitions, frozen comparison method, one hypothesis at a time, correctness gate, and honest stopping.
- **`scripts/`:** project-owned benchmark/profiling commands; do not build a universal profiler or copy pstack's fixed model and worktree choices.
- **Pressure coverage:** new “one faster sample,” changed-workload, improved-metric-but-broken-behavior, and unproven-reproduction cases.

**Priority:** P2 when a performance workload is admitted. **Tradeoff:** measured progress replaces intuition, but maintaining a valid workload has real cost. Do not import the example ten-iteration floor as a universal rule.

### R08 · Update `implementation-pr-wrapup`: expose evidence and consequences within its current body

Matt's PR skill makes proof, reversibility, and blast radius easy for a human to find. Local [PR description](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implementation-pr-wrapup/references/pr-description.md#L18) already explains the change shape, and the main workflow already asks the risks and worst failure. The opportunity is reviewer visibility, not a replacement PR lifecycle.

- **Trigger/owner:** the existing description-drafting predicate, tied to the current head/diff.
- **`SKILL.md`:** retain dispatch, freshness, and authorization gates; no extra generic verification run.
- **`references/`:** teach when the existing notes should state affected behavior/proof, rollback or recovery cost, and concrete blast radius. Preserve the exact three headings, public-safe content rules, and visual restrictions.
- **`scripts/`:** not needed; reuse already-produced evidence and current CI rather than rerunning equivalent validation.
- **Pressure coverage:** update body quality tests for material evidence/risk and a cosmetic/docs control that should remain brief.

**Priority:** P3. **Tradeoff:** faster human review with a small increase in useful body content; no blanket screenshot, new heading, or runtime-before/after obligation for every PR.

### R09 · Update skill proof interpretation where necessary: calibrate before repairing

The local authoring workflow already [requires inspecting flagged transcripts](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/skills-creation/references/testing/pressure-testing.md#L49). The exported eval records show why that matters: check outcomes depend on criteria and observed evidence, and the runner checkpoint explicitly separates behavior misses from criterion-only failures.

- **Trigger/owner:** `skills-creation` when evaluating a named skill or claiming a behavior improvement; evaluator defects remain with their code owner.
- **`SKILL.md`:** preserve the four-surface craft model and honest proof ladder. Add no global “score means quality” shortcut.
- **`references/`:** require the disposition to join subject source, scenario, criterion, grader, observations, and actual outcome; preserve known-good/known-bad controls and distinguish execution failure, inconclusive judgment, and behavior miss.
- **`scripts/`:** repair deterministic collection or classifier defects at the existing evaluator boundary only after cause is established; no replacement runner is proposed here.
- **Pressure coverage:** existing cases and paired controls should be reused; update needed only for an admitted observed error. No broad live batch is justified merely to raise a score.

**Priority:** P1 before any evaluation-driven skill repair. **Tradeoff:** more reliable conclusions; it may leave some apparent failures unresolved until their exact criteria/source identity are recovered.

### R10 · Create `verification-project`: pilot one missing distinct workflow

`verification-project` is a provisional audit label, not an admitted skill name. The proposal must settle a namespace-first family and searchable action/role under the existing Namespace Map; `ops-verify-project` is one convention-fitting candidate if its operational ownership fits. A new family would require an explicit Namespace Map addition. Naming and ownership must be settled before any skill creation.

This is the one new workflow worth taking into a bounded proposal first. Pstack's creation and maintenance skills cover a lifecycle that the local tool and phase skills only partially cover: discover the real runtime controls, establish a reusable verifier and user-feature map, prove the verifier, and keep it honest as the application changes. Repeated proof gaps across different deliveries show the cost of weak observation, although they do not prove that absence of this skill caused each incident.

The existing role split still applies: the Lead settles the governing verifier contract and plan; its assigned implementation Sidekick builds and proves the harness. The Lead then checks the actual source/proof before review or acceptance. This recommendation does not turn the Lead into the coder or insert another relay supervisor.

- **Trigger/owner:** “Use when creating or maintaining a project's repeatable real-path verification harness and feature-to-proof map.” Keep it separate from implementing a feature, reviewing its proof, or controlling one macOS window.
- **`SKILL.md`:** select create versus maintain; discover existing launch/driver/observation/isolation; doctor before driving; record the feature-to-outcome contract; run the generated path; retain evidence through cleanup; separate harness drift from product regression.
- **`references/`:** platform-specific recipes and a small feature-map example, loaded only for the target surface. Native UI uses the authorized computer-use or existing harness routes. Do not replace an established native observation seam with a convenient web surrogate.
- **`scripts/`:** helpers belong with the owning project/harness and reuse its existing commands. The generic workflow stays plugin-delivered. The repo rule against runtime skill sync/symlink delivery means pstack's generated `.cursor/skills/` layout cannot be copied wholesale; choose the storage boundary in the proposal, with repo-native verification docs as the minimal candidate.
- **Pressure coverage:** new scenarios needed: generated-but-unrun is draft; wrong/unhealthy instance; convenient entry point misses a mapped route; cleanup deletes evidence; harness drift versus product regression; blocked external prerequisite; native surface cannot be substituted; maintenance covers its admitted map.

**Priority:** P1 capability pilot after contract corrections and proof calibration. **Tradeoff:** a maintained observation interface reduces repeated setup and human babysitting, but creates upkeep work. Start with one project and one real feature. Expansion requires evidence that the pilot pays for itself. The proposal must settle who owns the map, driver, evidence, and cleanup before implementation.

## What to prune, merge, and deliberately skip

**No whole-skill deletion or merge is admitted by this evidence.** Similar subjects are often different jobs: spec/plan/implementation handoffs preserve different authority; TUI and rendered chat have different presentation constraints; source gathering, collaboration, and trace recording have different reasons to change. Their shared mechanics can be factored only when real consumers need the same stable procedure.

Prune sentences and forced loads after testing the effect. Begin with duplicated explanations and return narration in the largest design/authoring bodies, not with obligations that protect authority, accepted requirements, real-path proof, or convergence. The local four-surface/deletion-test method already supplies the right standard: remove a sentence only when its removal changes no required behavior.

The corpus has **51,009 words in 31 main files**, of which **47,245 are in the 28 workflow main files**. The five largest workflow bodies total **22,225 words**: about **47%** of workflow main-file volume. These are whitespace word counts, not model tokens and not a per-turn charge. Installed discovery descriptions, loaded body text, optional references, cached input, generated output, and repeated calls have different costs.

Measure actual loaded material and corrections on representative narrow and substantial tasks before setting a pruning target. Compare the same task, source, model/effort, and proof obligation; record subject and judge usage separately where available. A shorter file with more mandatory reference reads is not automatically cheaper. The exported cost discussion has no comparable baseline, so no dollar saving or percent speedup is claimed.

Deliberate skips from the trio include blanket principle skills already covered by repository instructions; provider-specific setup/model rules; Slack/Benny automation without a local demand; universal no-comments rules; automatic merge/deploy grants; package-specific or course-content migrations; fixed persona counts; compulsory isolated worktrees for dependent slices; and a second persistent plan/decision authority. These exclusions are individually accounted for in the full catalog.

Important partial gaps that do **not** yet justify another skill are empirical prototypes, characterization/equivalence refactoring, frontend implementation craft, worktree reclamation, CI pipeline authoring, and long-horizon decision maps. Some have real local primitives; others have no repeated local failure established. Record the missing mechanism and consumer first. General code knowledge or a library-specific command is not enough to justify a new runtime skill.

## Practical improvement sequence

1. Resolve R01/R02 and the research/handoff output contracts against current owners and consumers. Preserve required behavior and source-bound negative controls.
2. Calibrate the saved eval findings under R09; treat source/version/criterion gaps explicitly before authoring a causal fix.
3. Admit one project-verification proposal and prove one real feature with retained evidence. Maintain the pilot once before expanding it.
4. Add the retrospective evidence procedure and, when a workload needs it, measured performance depth to existing owners.
5. Improve reviewer-visible evidence/risk within the existing PR format.
6. Measure loaded context and real task friction, then prune text with matching behavioral controls. Reuse the role/authority model and deterministic tooling already present.

Before that sequence, prove the **role, execution, and acceptance transitions** described in [the hierarchy investigation](hierarchy-and-acceptance.md): the Sidekick completes implementation/proof, the Lead actually opens/challenges decisive source/proof before review or acceptance, and a failed or unstarted commission remains owned until a verified recovery or explicit blocker. `manage-agents` owns executor failure/reassignment fit; `orchestrator-implementation-goal` owns whole-work completion. The native logs show successful checks, source-claim overstatement, executor-route ambiguity, duplicated owner questions, a synthetic hook treated as continuation authority, and a promised fallback still unstarted at the 2026-10-07 cutoff. Later start/end claims are retained separately from matching-head proof. A new supervisor layer is not admitted as the fix.

This sequence is a recommendation, not an implementation plan or a publication grant. The report's completion boundary is source/log analysis, exhaustive mappings, trace, and the requested independent reviews. Current live skill adherence, savings from proposed changes, full latest-remote coverage, and unrun pressure scenarios remain unverified.

## Independent review and investigation

### Live post-review supplement: stop-classifier and deployment boundary

The repeated stop-hook continuations produced an additional current observation. Two retained JEV receipts classify this session as unfinished and block its stop while Grok's required model exception remains unanswered. The deciding prompt/classifier and executable shell match checkout; the shell's difference is a comment. Luna fallback settings still name 5.6/low where checkout defaults name 6/medium, but those settings do not decide a successful JEV classification. The hook's generic block log prints fallback model/effort even when JEV decided, so those fields cannot identify the deciding model. The explicit-wait branch and its permission-wait control already exist. Selected-window recognition and the two possible unfinished-branch entry conditions remain unproven without the actual scores/window.

[Bounded diagnosis](/Users/shravansunder/dev/ai-tools/tmp/debug-workflows/2026-10-07-ai-tools-main-stop-review-model-gate/debug-investigation.md) records source anchors, sanitized receipts, competing hypotheses and fitting proof. [Affected Opus review](/Users/shravansunder/dev/ai-tools/tmp/practices-research/2026-10-07-sdlc-portfolio/opus-stop-supplement-review.md) corrected the fallback attribution, comment-only shell difference and score-retention proof shape; the Lead independently checked and applied them. No classifier fix is recommended yet, and no home runtime was changed. Its failure intake is staged locally because private memory-logs has unrelated dirty/divergent state and a pull/rebase prerequisite outside this audit's authority.

The owner requested fresh Grok and Opus reviews after analysis. [Initial Opus review](/Users/shravansunder/dev/ai-tools/tmp/practices-research/2026-10-07-sdlc-portfolio/opus-review.md) returned denominator and failed-execution-owner corrections, which the Lead investigated against primary records and applied. [Corrected-settings confirmation](/Users/shravansunder/dev/ai-tools/tmp/practices-research/2026-10-07-sdlc-portfolio/opus-review-confirmation.md) reaffirmed those corrections, narrowed an overbroad source-absence claim, and withdrew its selected-positive-controls success-rate inference and empty-output-file finding. The Lead also challenged the follow-up's historical typing-authorization inference against exact old source, the accepted spec, and an actual pre-compaction owner message. Strong #105 source/base verification is preserved; no categorical historical authority judgment is made.

[Review investigation](/Users/shravansunder/dev/ai-tools/tmp/practices-research/2026-10-07-sdlc-portfolio/review-investigation.md) retains dispositions and coverage limits; [review runtime](/Users/shravansunder/dev/ai-tools/tmp/practices-research/2026-10-07-sdlc-portfolio/review-runtime.md) records failed transports, settings corrections and the one-review fast exception. [Grok's source review](/Users/shravansunder/dev/ai-tools/tmp/practices-research/2026-10-07-sdlc-portfolio/grok-review.md) found a later #463 checkpoint update and stale current-status paragraphs. The Lead opened the primary checkpoint, the separate later status note, and the relevant timeline lines; dated the historical negative; retained later claims separately from aggregate proof; and corrected the status and evidence links. [Grok's bounded correction check](/Users/shravansunder/dev/ai-tools/tmp/practices-research/2026-10-07-sdlc-portfolio/grok-review-confirmation.md) confirmed those changes with no remaining material findings. The initial Grok CLI reported permission denial after returning review text; the correction pass exited 0 in verified Q&A mode with the same read/search-only policy. The denied action was not exposed by the supported receipt and is not retrospectively approved or described as a clean initial run.

The requested boundary—source/log analysis, 31 individual local assessments, 136 pinned trio correlations, trace, independent Grok and Opus reviews, and Lead investigation—is complete with the stated coverage limits. This is not a current live-behavior benchmark or authorization to implement recommendations. Reviewer agreement does not substitute for primary-source verification. Current live skill behavior, future pressure cases, proposed savings and the current #463 aggregate remain unverified; the separate failure intake remains staged locally rather than claimed filed in private memory-logs.
