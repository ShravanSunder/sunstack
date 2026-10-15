# Verification as an engineering practice

Draft v5, 2026-10-15. This revision designs the owner's chosen generic verification and setup/upkeep practices, usable under the caller's existing assignment. The completed v3 review does not accept this expansion; affected SPEC review is required. No runtime implementation is authorized by this document. Owner: `sunstack-dev`. The observation practice's working identifier is `practices-verification`; the generic setup/upkeep practice's proposed identifier is `practices-verification-maintenance`. These are proposed paths using the owner's terms, not claims that those skills are installed. The four existing practices and the paired SDLC Verifier packet/commissioning rules remain unchanged. How and why are approved practices whose own authoring spec precedes setup/upkeep implementation.

## Owner D5 decision and delivery proposal — 2026-10-15

The owner answered through the Advisor in Router push `01a14076-8fe0-70d3-ac5a-7a4faea907eb`: “per project yes we3 need a verificaiton skil, but we need a base pace to start with a generic proactic eand genri cgenrate/mtain skill as well”; “the generic skikll can say check the proejct for specific details and load them”; “no we use plugisn genric”; “or .agents/skills/*”; “we can symlink for .calude/skills/* ok”. The last spelling refers to Claude's `.claude/skills/` home.

**D12 supersedes D5:** provide a generic plugin verification practice AND a generic project-verification generation/maintenance capability. Each consumer project has its specific verification skill; the generic practice discovers and loads that skill for project details, retaining the generic method for a bounded check when specifics are absent. Missing project apparatus is reported as a setup gap; it does not silently authorize creation. Generic skills remain plugin-delivered. Project-authored verification skills have their canonical home under `.agents/skills/verify-<app>/`, with the expressly authorized relative `.claude/skills/verify-<app>` symlink. This is not a cached-plugin synchronization or installation mechanism.

This revision defines discovery/selection, generation/maintenance, project recipes, lifecycle, writer scope and proof below. One generic setup/upkeep skill has generate and maintain entry conditions because both serve one continuing project capability. Existing D10 ownership, product-repair exclusion, UI tool rules, evidence reuse and owner merge authority remain intact. The completed v3 review's D5 wait is answered, but its implementation acceptance is not automatically closed: the chosen scope is the broader alternative.

**Historical D13 proposal, withdrawn by D14:** permit an unpaired Verifier only for expressly assigned verification-apparatus setup/upkeep, versus limiting setup/upkeep to existing paired workstreams. This proposal incorrectly treated ordinary practice invocation as role commissioning.

**D14 supersedes D13 and narrows D10 to assigned SDLC ownership:** after selecting the standalone option, the owner immediately clarified: “its not a role, thats a skill that i would lauch as ap ractice”; “the sldc for a proejct needs a verifier. so i was thingk tahts rkoles”; “we dont need a role to call a practice no?”. Verification and setup/upkeep practices run under the caller's current assignment and actual permissions. Loading one does not create, change or commission a role. Within an SDLC workstream the designated Verifier retains accountable verification and assigned apparatus ownership. Outside that workstream an authorized caller can run setup/upkeep without a Verifier packet or a paired Implementer. Do not infer authority to overwrite someone else's actively owned apparatus. No unpaired-Verifier variant, management exception or typed-packet change is part of this design, and there is no remaining D13 question to ask again.

**D15, subsequent owner direction, 2026-10-15:** use `practices-verification-maintenance`, retarget #131 to main, and select the first consumer proof project without another question. The Lead selects codex-router's TUI, subject to its actual project instructions and scoped proof worktree. The owner also directed “the verivfricaiton skill can be stolen from lauren and improved our main goal is what we are working on” and “make a tree of what we are doign wahat we ened to do and proceed”. Adapt Pstack's inspected create/maintain implementation directly to the accepted local boundaries rather than designing another framework. This task-specific permission allows copying/adaptation despite the repository's generic no-upstream-prose-copy guideline; retain Lauren Tan's copyright and MIT notice for copied/substantially adapted material, plus source attribution in the skill's bundled notice, inspiration provenance and changelog. Keep the reviewed behavior, grants and proof scope unchanged; this provenance direction does not adopt Cursor paths, blanket fan-out, product repairs, fixed map headings or automatic PR authority. Proceed through the agreed spec/plan/implementation/review gates; merge remains the owner's action.

Delivery tree, current as of 2026-10-15 after the owner's implementation order (how and why first, then verification, then project verification upkeep):

```text
main
└─ #131 management foundation + principle composition (now targets main)
   └─ #132 role skills
      └─ skills/practices-how-why: how and why practices
         └─ NEW: verification practice + role/implementation-phase callers
            └─ NEW: project verification-skill generation and upkeep
```

The earlier draft placed verification below how/why. The owner's order puts how/why first; the dependency below is unchanged, since upkeep consumes both.

Live GitHub inspection found #127 closed without merge, #131 still targeting its branch, and #132 targeting #131. The management foundation is 11 commits ahead of main and already contained in #131. Respect the owner's closure of #127. Recommended base normalization: retarget #131 to main with that foundation explicitly in its reviewed scope. Done on 2026-10-15 under D15: #131 targets main and #132 targets #131. The owner's supplied Cloud handoff names #132 at `77bef11`, and the current remote still matches that handoff; do not invent a wait for another handoff. Before implementation, confirm the head and ownership have not changed. Do not reopen #127 or mutate existing PRs as part of this design task. The new layers use one linear `gh stack`; their role/phase adapters land with the method they introduce, rather than being inserted into the existing PRs.

Verification and how/why are conceptually independent; the owner chose to land how/why first. Project generation/upkeep consumes how for its source pass and verification for its live pass, so it follows both. The consumer project for real generation/maintenance proof must be named with its own write/run grant; the plugin PR does not create an arbitrary consumer project's skill. The older nine-run proposal must be reconciled in both documents before overlapping `implement-plan` changes execute; remaining phase/principle extraction is a separate follow-up, not hidden in these new features.

The original D1–D11 rows and withdrawn D13 proposal remain as history. D12 supersedes D5; the owner's D14 clarification resolves the role/invocation confusion. Other sections below describe the active v5 proposal.

## Purpose and success

Verification turns an adopted expected outcome into a discriminating observation on the intended target. It asks what could still be wrong despite green checks, chooses an observation that can tell those cases apart, and reports what the evidence actually establishes. It includes checking feasibility before a build and maintaining an assigned driver when that is the work needed. It does not confer a role or a write grant.

Success: given a declared behavior, its governing expectation, the relevant surface and the caller's authority, an agent can choose a feasible check, use adequate existing evidence or perform a fitting observation, detect a misleading green, preserve useful evidence, and return a conclusion with its exact remaining limits. It can do this for a native app, TUI, CLI, service, library or browser without inventing a universal harness or forcing every claim through the whole application.

The design starts from explicit owner intent, the current Verifier contract and checked source research. No new behavior evaluation has run. Source inspection establishes the teaching and ownership opportunity; it does not establish that this practice improves agent behavior.

## What belongs where

```text
Principles: judgments about proof, test sensitivity, experiments and acceptance
     │
     ▼
Verification practice: prepare → observe or reuse → challenge adequacy → report
     ▲
     │ used within each assignment
Implementer                 Verifier                    Lead / Reviewer
own change and proof        paired observation          acceptance / findings
product regression tests    assigned drivers only       existing authority
```

| Owner | Work it keeps |
| --- | --- |
| Practice | Reusable choice-and-observation method, including feasibility, target selection, adequacy, reuse, evidence preservation and scoped driver work. |
| Generic setup/upkeep practice | Creates or maintains one project's verification capability under the caller's existing request/assignment, using how for source reconstruction and verification for live observations. It does not require a Verifier role, choose a role, start an implementation lifecycle or open a PR by itself. |
| Project verification skill | Canonical app-specific instructions, journey detail and owned helpers. It supplies mechanics under the caller's claim and grant; it cannot change the expected outcome or confer broader permissions. |
| `role-verifier` | Pairing with the Implementer; prebuild challenge, independent observation and assigned driver responsibility; permitted writes and reporting. No product repairs, product regression authorship, expectation negotiation or delivery acceptance. |
| `role-implementer` | Feature code, product regression tests, development loop, associated proof and corrections. Using the practice does not make its own proof independent. |
| `role-lead` | Governing decisions, integration and acceptance. A Verifier observation or passing driver is evidence for that decision. |
| `role-reviewer` | Independent findings about contracts, assertions and implementation. Its existing inspect/execute grant and review policy stay binding. |
| Phases | When proof is required, the adopted outcome, actual project gates, sequencing and completion/report contract. The practice consumes these rather than replacing them. |
| Existing practices | Research owns evidence gathering; collaboration owns coordination; show-me-your-work owns the trace; manage-agents owns assignment, pairing, models and forms. None is renamed or expanded here. |

The Verifier can judge whether its observations are adequate while the Lead retains acceptance. This is accountable SDLC work, not a prerequisite for any agent to perform a verification method. An ordinary request or authorized automation can invoke either practice directly under the current assignment; management is needed when work is delegated, not simply because a practice is loaded. Independence is a source/assignment fact, not an extra rerun. An Operator can perform an exact granted procedure and return observations; the assigning engineer makes the adequacy judgment.

## Decisions proposed

These are visible defaults for review, not implied owner approvals. A later owner change is appended with the decision it supersedes.

| Decision | Default and reason |
| --- | --- |
| D1 — One reusable method | Create the verification practice; keep responsibility, permissions and result contracts with roles and phases. Several current owners perform this same observation work. |
| D2 — Existing judgments | Compose the four existing proof-related principles at actual decisions. Do not copy their tutorials or create a new generic verification principle. |
| D3 — Surface-independent core | Keep the main path short; conditional owned depth handles browser, native, terminal and service/library differences. Language alone does not determine the observation route. |
| D4 — Fitting proof | Keep real the interaction named in the claim. An honest focused test can establish pure logic; a real integration journey can satisfy runtime proof. A separate manual run is required only for something existing proof does not establish or an applicable gate requires. |
| D5 — Project apparatus | Recommended default: use existing project routes and conditionally build/repair a focused driver within the caller's grant. Do not generate a per-project verification skill, feature index or framework automatically. The owner has been shown this choice versus generation by default; the answer remains open. Either choice leaves the common method intact. |
| D6 — Evidence reuse | Inspect target and dependencies before reusing proof. Repeat for changed dependencies, unresolved doubt or a required gate; never merely to make a second agent appear independent. |
| D7 — Meaning and authority | Use an adopted expectation independent of the implementation. A wrong or unsettled expectation returns to its owner. Running this practice never permits changing product code, tests, security boundaries or proof gates beyond the assignment. |
| D8 — Adoption scope | First integrate through Verifier and Implementer roles. Preserve phase-specific policies; do not rewrite every phase or take over their proof contracts in this change. Other owners may invoke the practice directly within their existing grants. |
| D9 — Teaching, not forms | No mandatory Markdown schema, standard receipt, document hash, fixed run count or always-required screenshot. Existing consumers keep their report formats. |
| D10 — Driver writer, 2026-10-15 | Clarifies D5 and D7: the assigned Verifier owns verification-driver construction/maintenance. A different writer needs explicit owner direction naming that writer and the driver paths; a generic product implementation/write grant is insufficient. The Implementer uses existing verification drivers and returns their gaps, while retaining product tests and their own test fixtures. |
| D11 — Phase integration, 2026-10-15 | Supersedes D8's first-adoption target list: include `implement-plan` as R4. The phase keeps which obligation, when proof is needed, required gates and completion; the practice owns the observation method. The earlier nine-run proposal's R5 must be reconciled to this split before either overlapping runtime change executes. |

D5 is superseded by D12. D13 is withdrawn by the owner's D14 clarification. The affected review judges the chosen apparatus design with direct practice invocation and unchanged role/packet rules.

## Trigger and main path

Model- and user-invocable, like other practices. Proposed trigger:

> Use when checking whether a declared behavior works on its intended target, challenging whether proposed proof can establish it, or building or maintaining an assigned verification driver. Not for delivery acceptance, general code review, root-cause investigation or product repairs.

The body teaches one connected activity. Its spine stays visible in `SKILL.md`:

1. **Establish the claim and expected outcome.** Read the governing expectation and identify a concrete wrong behavior the check must distinguish. Use the caller's existing scope, gates and authority; missing meaning is an exact question, not a reason to invent an oracle. Check the assertion against a materially different allowed implementation too.
2. **Find project details, then choose the observation route.** MUST load `references/project-verification-selection.md` and return the selected canonical project skill and relevant detail, or its absent/conflicting result. Apply its app-specific instructions to this claim without inheriting new authority. If it is absent, retain that setup gap and use the generic method only for the bounded observation the grant permits; do not create a project skill or invoke setup/upkeep automatically. Inspect established commands, drivers and harnesses, trace the entrypoint to its effect, and choose what must stay real at the cheapest suitable boundary. Before a build, challenge feasibility without pretending the future observation happened.
3. **Check target and evidence applicability.** Establish the actual app/binary/package, build/source where relevant, configuration, client, state/fixtures and entrypoint. Reuse adequate evidence when those dependencies still match. Source equality alone does not establish an installed target; source changes unrelated to the claim need not invalidate an observation.
4. **Prepare and observe within the grant.** If a run is needed, discover usable readiness and isolate the state or instance it uses. Drive the relevant action and observe its consequential result, including the failure, round trip, restart or overlap the claim actually covers. Use bounded completion signals; an acknowledgement, idle prompt or healthy process is not the feature outcome.
5. **Challenge the observation.** Could this check pass on the wrong target, an inert probe, an unexercised fixture or a replaced interaction? Could it reject behavior the contract permits? Use a suitable known-good/bad case, independent readback or other deciding check when needed and authorized. A missing sensitivity observation stays a gap. Do not alter product code or cause a fault merely because sensitivity would be useful.
6. **Preserve evidence and attribute the gap.** Retain the useful action/result evidence and command output where the project or assignment already puts it. Clean only owned run residue, preserving evidence. Distinguish inaccessible target/setup, a driver defect, product behavior contradicting the adopted outcome, disputed expectation and stale instructions when the evidence supports that distinction. When the cause is unknown, return the observed failure and deciding missing evidence for the caller to route to diagnosis; do not guess a category or begin a repair. Repair only what the caller owns; return other gaps to their owner.
7. **Report the supported conclusion.** State what was actually run or reused, what target/path it covered, the observed result and consequential gaps. No checks discovered or executed is not green; missing observations are unknown rather than zero failures; inconclusive is not a pass. A feasibility assessment says whether the route is viable and what it still needs; it does not claim the feature works. If adequate proof already closes the claim, stop rather than inventing another check.

For a comparative/quantitative claim, establish the workload, baseline/comparator and deciding criterion before observation, with repetitions and controls proportionate to noise and stakes. This is a conditional application of the existing experiment principle, not a new evaluation framework.

## Composition at the decisions

Use the accepted decision-local citation grammar from the current skill-authoring source. Each sentence states the real action; its relative link supplies the principle. The principle's own full-read instruction stays in that principle. Do not reintroduce principle loader lines or public read receipts. Own procedure depth still uses explicit conditional reference calls.

| Principle | Concrete action in this practice |
| --- | --- |
| `principle-write-tests-that-can-fail` | At observation selection or driver work, name the forbidden behavior, independent expectation and allowed alternative; establish whether the check can distinguish them at an honest boundary. |
| `principle-prove-it-works` | When choosing and exercising the route, drive the relevant real interaction and inspect the user/caller-visible outcome. |
| `principle-verify-before-accepting` | Before reusing an observation or reporting its support, inspect target/dependency applicability and raw evidence, then bound the conclusion. Validating an uncertain instrument is one concrete application of this judgment. |
| `principle-experiment-before-proposing` | When a claim compares performance or scored behavior, choose the baseline, workload and deciding result before the run. |
| `principle-one-owner-per-truth` | In project setup/upkeep, preserve one canonical authored verification capability; resolve competing owners and make the Claude path a link, not another writer or copied tree. |
| `principle-write-for-the-reader` | When authoring the project skill, give a cold reader the app identity, working entry, selected journey and actual observation; move exceptional depth into owned references without hiding prerequisites or unverified scope. |

There is no second copy of those judgments in the role or phase that invokes the practice for the same decision. Keep local instructions that specify actual obligations, product-test ownership, grants and required observations; they are not redundant merely because related principles exist.

## Progressive depth

Depth below is owned by this practice. The separate setup/upkeep skill and generated project skill own their own depth. No new shared runtime reference or universal schema is proposed.

| Proposed reference | Load condition and work it teaches | Concrete return |
| --- | --- | --- |
| `references/project-verification-selection.md` | Every run selects the declared project/app and its matching verification details using the bounded discovery procedure below. A clear no-match is useful; ambiguity must not become a guess. | One selected canonical project skill and relevant depth, an explicit absent result, or a conflict needing resolution. |
| `references/browser-observation.md` | A claim requires browser behavior. Establish target, fixture/session, action and expected scene; inspect visible result and relevant network/storage effects. A committed project harness is usable within its grant. When the agent itself drives or inspects the on-screen UI, use computer use and the Chrome plugin as the standing instructions require; do not introduce Playwright as an alternate route. | Checked browser route and observations, or the exact inaccessible outcome. |
| `references/native-observation.md` | A claim requires native app behavior. Bind the intended executable/bundle and build/configuration; discover approved inspection/control routes; refresh UI state after changes and inspect the effect. Agent-driven on-screen inspection follows computer use, with Peekaboo secondary as the standing instructions require. | Native target and behavior evidence, including what build/launch alone did not establish. |
| `references/terminal-observation.md` | A claim requires a CLI or TUI. Identify binary, arguments/environment, PTY/session/pane and current action; observe output/state/exit or an operation-owned completion signal. Old scrollback and a prompt from another operation do not count. | Correlated terminal action/result and owned cleanup. |
| `references/service-and-library-observation.md` | A claim concerns a service, protocol or library caller. Select the public boundary; correlate effects to the producing entrypoint, not timestamps alone; keep transport real when delivery/order/recovery is claimed. When evidence uses the shared local OTel/Victoria stack, use `ops-observability-stack` for its existing stack mechanics and health-versus-producer proof procedure instead of copying them; other stacks use their project's procedure. | Response and relevant state/effect evidence or the remaining interaction gap. |
| `references/verification-drivers.md` | An absent or broken route prevents an observation and the assignment explicitly includes verification-driver work and names its paths. Generic product-code or test write access is insufficient. Discover existing apparatus first, make the smallest reusable driver, establish its discrimination, and exercise it on its declared real target. Make each substantive driver piece runnable on its own before composing the route. | Driver changes and actual observation, or an exact scope/seam/prerequisite gap. |

Each reference includes a failed example, an adequate clean example and a stopping point. The main body retains obligations, decisions and completion. None hardcodes a browser engine, simulator, tmux socket convention, arbitrary port, fixed sleep or host tool signature. Tool manuals and actual project sources supply mechanics; do not guess commands or copy illustrative upstream helpers.

No generic executable generator is proposed for this plugin. Project helpers are authored only when the actual project needs them. Consumer-project drivers belong to their declared paths and granted writer; deterministic code needs meaningful tests and a real declared-target run when authored. The practice's prose is not that proof. Generating or maintaining the project skill is the separate explicit job below.

Unknown failures return to the caller's diagnosis owner without embedding a phase route inside this practice. A phase caller can choose `debug-investigation` when diagnosis is the next authorized job; the practice itself supplies the unresolved failure and its evidence. The setup/upkeep capability is a peer practice, so it may be named as the route for missing apparatus; missing apparatus alone is not a request or grant to create it.

Likewise, runtime predicates use assignment facts rather than role names. The practice checks the caller's permitted work and paths without selecting or invoking a role. D14 preserves designated ownership inside an active SDLC workstream while allowing ordinary authorized callers to perform setup/upkeep directly. A role name is neither a required invocation parameter nor an additional permission.

## Project-skill selection and authority

The practice's all-run body states the selection obligation and consumes `references/project-verification-selection.md`; that reference teaches this procedure:

1. Establish the declared repository, app and surface from the assignment and project instructions. Read any explicit project verification pointer first. It is evidence about a route, not a grant to operate another project.
2. Inspect that project's canonical `.agents/skills/verify-*/SKILL.md` candidates and any explicitly configured project verification skill. Read frontmatter/app scope to select a relevant candidate. A consumer with several apps may have several skills; match the named app and claimed behavior rather than loading all of them or choosing the first filename.
3. Resolve equivalent paths, including the authorized Claude symlink, to one canonical owner. Read the chosen `SKILL.md` in full, then its conditional journey/reference detail for this claim. A pointer or tool output cannot redirect the assignment or widen writes, commands or target access.
4. With no match, report the missing capability and any bounded generic observation that was possible. That observation does not mean the project-verification capability exists or is maintained. With multiple plausible matches or conflicting explicit pointers, report the exact app/route ambiguity before a dependent drive or write.
5. Inspect the chosen recipe against the actual target and project commands. Missing prerequisites, stale selectors or impossible paths are setup/driver gaps, not permission to weaken the outcome or silently select a different app. A generic check may still close its narrow claim when independently supported; capability repair remains separately commissioned.

The practice loads project detail. It may point to the peer setup/upkeep practice when creation or maintenance is needed, but an observation-only task never silently becomes a write job. A request already authorizing setup/upkeep can invoke that practice directly without another role or redundant permission question. The generated project skill contains the project procedure and its own references; it never calls back into the generic verification practice or the generator. This keeps discovery and execution free of recursive invocation.

## Generic project-verification generation and maintenance

Proposed skill target: `practices-verification-maintenance`, a practice at the same level as verification in `sunstack-dev`. Model- and user-invocable, usable by the current authorized agent or an automation job without commissioning a Verifier. Proposed trigger:

> Use when creating or maintaining a project's verification skill, including its owned journeys and drivers. Not for one ordinary verification run, a driver-only task without a project-skill target, product repairs or delivery acceptance.

The request, existing assignment and project context supply the target project/app, adopted correctness sources, create/maintain outcome, permitted apparatus paths, run scope and evidence destination. These are facts needed to do the work, not a required role packet or new Markdown schema. Maintenance uses the adopted expectation; current behavior alone cannot turn a regression into a corrected instruction. Preserve any designated owner and coordinate overlapping writes. If delegation is needed, use existing management; otherwise perform the practice in the current assignment. Role selection, model choice, SDLC pairing and publication remain with their existing owners.

Its main path is:

1. **Identify the existing owner and permitted work.** Inspect project instructions and the named app's verification capability. Generate when creation is the assigned outcome and the canonical target is absent; maintain when the target exists and upkeep is assigned. A maintain request with no target returns that gap, and a create request does not overwrite an existing owner or create a second parallel recipe. Name any existing path/link conflict before writing.
2. **Reconstruct how the scoped behavior works.** MUST load the approved how practice (proposed identifier `practices-how`, settled by its separate spec) and return the scoped source-backed entrypoint/owner/state/effect/return map and gaps used to construct or assess the project recipe. Read real launch, initialization, seed/auth, harness, test and cleanup instructions. Ask only for meaning, permission or target selection that sources cannot settle. A broken product build or unavailable prerequisite is a bounded gap, not permission to repair product code.
3. **Create or correct project-specific teaching.** Write the actual app identity, usable readiness, read-only health check, driving route, meaningful observations and owned cleanup. Add scoped feature journeys and helpers only as needed; use real commands/selectors/paths checked at source, never illustrative upstream tools or placeholders presented as working instructions. Preserve unmade decisions and unverified surfaces rather than manufacturing complete coverage.
4. **Exercise the resulting capability.** MUST load `practices-verification` and return the scoped observations or applicable reused evidence from the newly authored project skill, plus unobserved outcomes and gaps. Generation must exercise its own launch/readiness/health/drive/evidence/cleanup route for at least one representative mapped journey before claiming an operable capability; this does not prove every feature or entrypoint. For maintenance, account for every journey in the assigned coverage, using applicable existing observations or fresh runs where changed, uncertain or explicitly required. Source-clean alone is not live coverage. Every selected gap stays visible rather than disappearing into a clean verdict.
5. **Triage and make only apparatus corrections.** Confirmed stale instructions can be corrected against adopted meaning; a driver that cannot reach working behavior can be repaired within its named paths and re-driven. A product regression, unresolved expected outcome or unknown cause returns evidence to its owner. Never revise a journey merely to match broken current behavior. Debug each substantive helper on its own before combining it into the app-driving route.
6. **Leave reusable instructions and retained evidence.** Clean resources/residue created by the run within its actual cleanup grant; do not kill by a broad process name or delete another session's state. Verify required evidence survives cleanup. Return what was generated/changed, scoped coverage and observed or reused results, remaining gaps and the actual artifact paths. No useful change means no manufactured commit/PR. The caller's normal delivery procedure owns publication and the user owns merge.

The setup/upkeep body remains scannable. Its own `references/project-capability-generation.md` teaches the create branch, `references/project-capability-maintenance.md` teaches source reconciliation and coverage/triage, and `references/project-skill-layout.md` teaches canonical homes, links and progressive placement. Each call has an observable create/maintain/layout condition, concrete work/result and stopping point. These are different jobs from the verification practice's surface-observation depth; neither owner copies the other's tutorial.

### Project artifact and lifecycle

```text
<project>/.agents/skills/verify-<app>/
  SKILL.md                    app-specific entry, route and completion
  references/                 selected journeys and exceptional setup depth
  scripts/                    only helpers this project actually needs
<project>/.claude/skills/verify-<app>
  -> ../../.agents/skills/verify-<app>
```

The project skill has valid portable frontmatter with its actual name and trigger; extra client metadata is added only when the target client supports it and it is validated. Its body names the app and relevant surfaces, how to launch and distinguish usable readiness from an answering port, a read-only instance/target health check, how to select and drive its journeys, observations that establish their outcomes, and owned cleanup. Depth describes each journey's prerequisites, entrypoints/actions, independently grounded expected results, relevant failures and gotchas. Use source-backed stable handles. No fixed feature count, mandatory four-heading template, copied principle tutorial or separate manually maintained inventory is required. Evidence and work trails remain in their existing task/project/log homes, not accumulated in the skill as a second mutable status ledger.

Every helper the project skill owns is runnable independently, has a documented invocation and is proven at its meaningful boundary. The skill has no invented tools, plaintext secret values or machine-specific cached plugin paths. Its instructions follow project and host policies for UI tools and actual commands. Only owned scratch resources are cleaned; a correct cleanup leaves the proof available.

The `.agents` directory is the single authored source. The optional Claude path is a relative symlink expressly authorized by the owner; it is not another copied tree. Create it only for the named project when that path is absent and granted, or validate that an existing link already resolves to the intended canonical owner. A real directory, unrelated link, escaping target or competing canonical owner is a conflict, not permission to replace/delete it. No global skill symlinks, cache synchronization, package installation or home-level delivery mechanism is introduced.

A generated recipe not exercised on its real target is a draft with a named gap. A successful representative generation run establishes operability only for that exercised route. A maintenance conclusion covers exactly the commissioned journeys and applicable observations; unobserved or inaccessible parts remain explicit. Later feature changes are reasons to commission upkeep, not authorization for an automatic watcher, scheduled mutation or PR loop.

### Assignment boundary for apparatus work

Project skill prose, journey files, helpers and the authorized Claude link are verification apparatus; feature code and product regression tests remain excluded. Work follows the caller's actual scope and project ownership. An ordinary user request or authorized automation does not need a Verifier packet to invoke or perform the practice. A read-only observation request does not authorize writes; a setup/upkeep request does not authorize product repairs.

When the caller is the commissioned SDLC Verifier, keep its current paired role contract and boundaries: its assigned apparatus paths must fit both `work.scriptWritePaths` and outer `limits.writePaths`, and `adoptedReference` remains the correctness basis. That role-specific packet is not imposed on other callers. Within the active workstream, others use the apparatus and route its changes to the assigned owner unless the owner changes the assignment. No `pairedImplementer` optionality, new mode, new schema or management commissioning rule is introduced. The same practice can serve accountable project verification or a normal direct setup/upkeep request because capability and responsibility are separate.

## Concrete cases the teaching must handle

| Situation | Appropriate result |
| --- | --- |
| A native send test observes mocked IPC success; arrival in a declared pane is required. | Identify the target pane/build; observe arrival and wrong-routing behavior through the relevant real path. No arrival observation means the outcome remains open. |
| A TUI capture contains a previous completion prompt. | Correlate the current input with its operation and subsequent output; return a gap if the harness cannot distinguish old content. |
| A save returns success but reopening loses the body. | Check the claimed persistence through independent readback/round trip. The toast alone cannot close it. |
| A service log could come from a scheduler or manual command. | Attribute the producing entrypoint and operation; do not infer it from a nearby timestamp or shared run label. |
| The driver exits 0 but its probe cannot detect a known failure. | Treat the observation route as inadequate; repair assigned driver paths or return that gap. Silence is not success. |
| A current real integration test already exercises the exact interaction and its rejection case. | Inspect applicability and reuse it; do not require an additional manual journey for appearances. |
| A pure domain rule is proven by an honest focused test. | Use that evidence. Do not launch the entire app or invent UI proof. |
| A seed prerequisite is unavailable. | Identify readiness/fixture gap; preserve the outcome and assertion rather than deleting the hard case. |
| A deliberate post-fix break is caught. | Report sensitivity and actual chronology; do not claim historical pre-fix RED or tests-first development. |
| The adopted ordering is per pane; a global-order assertion rejects valid implementations. | Preserve allowed behavior and return the oracle problem to its owning author/Lead. Peers do not negotiate a new expected outcome for green. |
| A verification-only assignment is asked to repair the feature while checking it. | Return the product defect to its implementation owner; preserve the assigned observation/driver boundary. |
| The assignment is skill/schema-only. | Use fitting source/structural evidence and name behavior not evaluated. It does not authorize unrelated app runs. |
| Several apps have verification skills, and a Claude symlink points at the same canonical skill. | Select the declared app, deduplicate equivalent paths and read only its relevant detail. Ambiguous scope stays a selection gap. |
| No project skill exists during an observation-only assignment. | Perform a fitting bounded check if possible and report the missing capability; do not write a skill or silently start setup/upkeep. |
| Creation is assigned but the Claude path is a real directory or unrelated link. | Preserve it and report the concrete conflict; do not replace it or create a second authoritative recipe. |
| Setup authors a plausible recipe without exercising it. | Return a draft and exact prerequisite/run gap; do not claim an operable project capability. |
| Upkeep sees the app violate an adopted promise. | Preserve that promise and report a product regression; do not rewrite the journey to make current behavior appear correct. |
| The user or an authorized automation requests project verification setup/upkeep without an SDLC workstream. | Run the practice under the current scope; do not manufacture a Verifier role, packet or Implementer pair. |
| A designated SDLC Verifier invokes the same practice. | Keep its paired commission and assigned apparatus boundaries; practice loading changes neither responsibility nor grant. |

## Authoring runs and coordination

This is a behavior-changing, user-directed creation/extraction, not a mechanical edit. Each run targets exactly one skill. All are `proposed`; no runtime file has changed.

| Run | Target | Surface allocation and completion |
| --- | --- | --- |
| R1 | Verification practice, working identifier `practices-verification` | Trigger: conditions above, invocable as a practice. Main path: one observation method including project-skill selection/loading. Depth: all-run discovery module plus five conditional owned references. Proof: trigger/near-miss, application, ambiguity/absence/conflict and valid-reuse controls. Registration/version/changelog accompany this creation when implemented. |
| R2 | `role-verifier` | Keep trigger, assignment, pairing, independence and completion. Compose the generic method for assigned feasibility/observation/driver work; describe assigned verification apparatus precisely, including its project skill/journeys/helpers where commissioned, while excluding product repairs/tests. Preserve the wrong-oracle route and practical case. Its packet/typed support and management commissioning rule remain unchanged. Reuse a named procedure's existing practice call rather than repeat it for the same decision. |
| R3 | `role-implementer` | Invoke the practice for the Implementer's own behavior proof when its named phase/procedure does not already do so. Keep feature/test authorship, TDD work, existing required gates and corrections. Prune only generic observation teaching actually owned by R1. Report verification-driver defects to their assigned Verifier; do not infer driver ownership from product-test authority. Do not add another mandatory role or another unconditional manual pass. |
| R4 | `implement-plan` | At its observation method step, use the verification practice and consume its proposed route/actual result for the slice's obligation. Keep slice admission, obligation mapping, required gates, integration timing, local commands/report and completion. Reconcile earlier proposal R5 so its citation governs the phase gate and does not duplicate observation technique now owned by R1. No changes to other phase contracts. |
| R5 | Proposed `practices-verification-maintenance` | Create the peer generate/maintain practice with the trigger, six-step method, three owned teaching references, project layout and scoped real-consumer proof above. Compose the approved how and verification practices. Invocation uses the caller's current assignment; no mandatory role/packet. No generic executable generator, automatic scheduler, PR or product-repair authority. This lands in NEW 3 after how/why and verification. |
| R7 | `role-verifier` | When R5 lands, compose that peer practice for the role's assigned project-capability setup/upkeep. Preserve the existing paired commission, adopted reference, apparatus paths, product exclusions, observation independence and acceptance boundary. The practice is also directly invocable by other authorized callers; the role neither monopolizes it nor grants it new authority. |

Former R6 (management/typed-contract exception) is withdrawn by D14; it is not an implementation run. No changes to the four existing practices, pairing schema or role commissioning are needed for direct practice invocation.

Design source: `/Users/shravansunder/dev/ai-tools.skills-practices-principles`, `skills/phase-principle-composition` at `789e0ef0`, runtime unchanged from `d9e717b6`. PR #131/#132 remain separately owned work; this spec does not edit or merge their branches. The eventual implementation commission must name its actual current base after those PRs' disposition; no implementation is admitted by guessing that base. Existing nine-run composition proposal is not authority for these new runs.

At implementation, R1 and R5 own their respective new-PR plugin version/changelog and applicable skill index/metadata registration, using `sunstack-dev`; their adapters/support runs record behavior in the same relevant release changeset. The separate how/why spec owns NEW 2; R5 does not execute before that real dependency lands. No installed-cache refresh, release, commit, push or merge is performed by this design task. Per-source provenance updates belong to the eventual authoring changeset, not an automatic mutation of the read-mostly admired-source catalog.

## Proof and review plan

Current posture: drafted from owner intent and source research; behavior not yet evaluated. No historical RED, improved judgment, model discovery or cross-client reliability claim is made.

- Trigger evaluation uses realistic requests for an outcome observation, prebuild feasibility and an assigned broken driver. Near misses include general code review, selecting a product behavior, finding an unexplained failure's cause, repairing product code, pure source lookup and ordinary delivery acceptance. The request does not name the skill during routing evaluation.
- Application cases sample at least one interactive surface and one CLI/service/library surface, plus applicable-evidence reuse and the scope/authority countercase. Choose actual fitting cases when a run is commissioned; no fixed repetition quota is imposed. Sensitivity, wrong target, valid alternative, fixture readiness and evidence-preserving cleanup must be covered at the smallest fitting layer rather than each expanded into an E2E journey.
- Inspect the loaded/offered skill copy and actual agent actions when a claim depends on them. A final answer claiming compliance is not evidence of those actions. Keep evaluation checks outside the working context and judge against the actual task, including legitimate non-application.
- For any claim of improvement, compare with the prior method on the same cases under fresh contexts. Equal correct decisions establish no added benefit. User-directed authoring can still proceed with that stated proof limit.
- Driver behavior, if later added to a consumer project, needs meaningful deterministic checks and its actual declared-target interaction. No driver code is written in this design task.
- Generation/maintenance evaluation uses a fresh reader on the produced project skill: discover and load the right app, run a representative real journey, preserve evidence through owned cleanup, and report remaining coverage. Exercise create-versus-maintain, absent target, conflicting link, stale recipe versus product regression, multi-app selection and an already-adequate observation. A fixture-only generation check proves structure, not that an app-driving recipe works. Before a real consumer trial, name its actual checkout/app, adopted reference, allowed writes/commands and proof route from that project's sources/instructions; a consumer grant is not inferred from this plugin spec. The owner's Agent Studio/native and codex-router/TUI examples are candidate proof surfaces, not invented completed runs.
- Invocation coverage must distinguish a direct authorized setup/upkeep request from a commissioned SDLC Verifier using the same practice. The former needs no new role, pairing or packet; the latter keeps its current paired commission and apparatus paths. Check that an observation-only request does not create files, and that a loaded practice cannot take over another active owner's writes. No new packet validator/schema or pairing rule is part of this change.
- Apply fitting static validation to the eventual skill files, then assess the diff against this scope. Independent skill spec review is owed before runtime edits; implementation review and fitting behavior proof are owed before release. No existing required project proof is weakened.

## Security and provenance

Research/adaptation decision: allowed for reading source and writing original design prose. Pstack, Matt Pocock and Superpowers license files were read as MIT; no upstream source code or skill prose is copied. Other admired packs supply reviewed idea-level input only, not adopted executable resources or copied text. Their executable resources were not security-audited.

The practice and setup/upkeep job describe effects, subprocesses, authenticated surfaces, project skill writes and helpers. These remain inside named project/host grants. Reading a project skill never grants its commands or writes. The owner expressly permits the project-local relative Claude symlink; conflicts are returned rather than overwritten. Credential values never enter instructions, logs or reports. Installations, privileged actions, production fault injection, home/cache writes and cached-plugin synchronization are not granted. Network effects required by an actual project route need that route's explicit grant. Exact commands/tool capabilities and helper write/effect/cleanup paths are inspected before later authoring or execution. Existing startup failure never authorizes product repairs. No executable payload or project symlink is implemented in this design task.

## Research basis

Lead and Advisor compared five bounded reports, then the Lead inspected decisive primary sources. These are source observations and design inferences, not upstream/local effectiveness proof.

- Local [Verifier](../../../../plugins/sunstack-dev/skills/role-verifier/SKILL.md), [Implementer](../../../../plugins/sunstack-dev/skills/role-implementer/SKILL.md), existing proof principles and implementation/review procedures. The Verifier already owns prebuild feasibility, adequacy, real target observation and assigned drivers; role authority stays there.
- [Pstack creation](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/create-verification-skill/SKILL.md) and [maintenance](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/maintain-verification-skill/SKILL.md): repository-specific routes, usable readiness, distinct health/behavior checks, evidence-preserving cleanup and diagnosis of doc/driver/product failures. Those are generator/upkeep skills; their feature-map headings, full-map audit, Cursor path and automatic repair/PR authority do not become requirements here.
- [Matt's diagnosis method](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/diagnosing-bugs/SKILL.md): a symptom-sensitive runnable loop and fitting observation routes. Fixed hypothesis counts, browser tooling and forced confirmation are not imported.
- [Superpowers completion](https://github.com/obra/superpowers/blob/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/verification-before-completion/SKILL.md) and its task-reviewer guidance: inspect actual output and reject false greens, while its own reviewer guidance supports focused doubt-driven reruns. This spec follows local dependency-based reuse rather than the blanket same-message-run rule.
- Dimillian native launch, Addy telemetry attribution, and the other admired packs supplied surface cases: match the actual app/binary/configuration, correlate an action to its outcome, detect inert instruments, and preserve allowed behavior. No personal tool defaults, fixed sleeps, screenshot-metric verdict or scheduled mutation loop is adopted.

Detailed research and the Advisor's source inventory remain outside the repository under `/private/tmp/2026-10-verification-practice/` and `/private/tmp/2026-10-verification-practice-sources/`. Only this skill spec is written under `docs/wip/skills-authoring/`.

## Review status

Draft v3. The Advisor read v1 whole and returned six candidates. Driver authority, UI route, observability ownership, honest non-pass outcomes and unknown-cause handling were clarified; phase/practice observation ownership now has the explicit R4 and cross-proposal reconciliation. An upward call from the practice to a diagnosis phase was deliberately rejected in favor of returning evidence to its caller. The v2 residual check closed F5/F6 and identified a role-name predicate in the driver branch; v3 replaces it with the explicit driver-work assignment and named paths while retaining D10 at the role/management boundary. The Advisor's final bounded v3 check found no residual on those corrections.

Formal independent SPEC review of v3 completed on 2026-10-15. All four checks were complete and no new correctable drafting findings were accepted. Its historical verdict was `targeted-revision` / `revise-first` solely for then-unanswered D5. D12 now answers that choice with broader apparatus scope; v3 acceptance does not transfer automatically. Reports remain under `/private/tmp/2026-10-verification-practice-review/`.

Draft v4 entered affected review, but its proposed D13 role exception was held when the owner clarified ordinary practice invocation versus SDLC accountability. Preserve observed reviewer findings as evidence, not acceptance of that mistaken assumption.

Active target is corrected draft v5. D14 resolves the invocation boundary: both generic capabilities are practices; any authorized caller can invoke them under its current assignment. The paired SDLC Verifier role remains unchanged, former R6 is withdrawn, and no typed-contract exception is proposed. D5 and D13 are resolved, not owner waits.

Formal affected SPEC review completed all four required checks on v5. It accepted one important trigger-routing finding: the setup/upkeep description also matched a driver-only task without a project-skill target. The author sharpened only that description; the same independent lead reopened the actual corrected trigger and unchanged caller/driver/admission boundaries, then checked both project-skill upkeep and the driver-only countercase. Open accepted findings fell from 1 to 0. Final SPEC verdict: `great`; implementation decision: `accepted-to-implement` as a quality judgment only. The owner's earlier instruction not to implement yet is superseded by D15, which directs implementation through the agreed spec, plan, implementation and review gates. Original review and `correction-closure-v5.md` are retained outside the repository under `/private/tmp/2026-10-verification-practice-review/`. The same Sol-family limitation remains; no cross-lineage assurance is claimed. This status paragraph records the result without changing the accepted design. The separately specified how dependency, cross-proposal reconciliation and an actual consumer-project grant remain prerequisites for their dependent implementation work. No runtime implementation, behavior improvement, client discovery, packaging or shipping is claimed.
