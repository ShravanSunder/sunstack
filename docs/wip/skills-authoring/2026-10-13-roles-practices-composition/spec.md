# Roles, execution forms and practice composition

2026-10-13 · revision v5 with owner Verifier clarification and approved craft fixes · accepted-to-implement; source-only acceptance, implementation proof and review still owed.

## Goal and success

Update and rename one skill: `manage-agents` → `practices-manage-agents`, owned by `sunstack-dev`. It commissions and assesses agent work with a clear responsibility, execution form, method, scope and closing check.

The owner's goal is engineering guidance that improves thinking, not a system optimized for filling packets. Success means an agent can explain the problem and governing outcome, inspect decisive evidence, use the right method, recognize a broken assumption, and return a result inside its actual authority. The Lead understands what the evidence establishes before accepting it.

Authoring basis: **user-directed intent**. The owner approved roles composed from principles and practices, clarified Worker/Sidekick as execution forms, kept Operator as a cheap collection/execution role, and said every Implementer gets a Verifier. Historical failures inform examples; this change has no causal-fix or measured improvement claim. Pressure testing remains explicitly deferred.

This spec includes [role teaching and ready prompts](role-teaching-and-prompts.md) and [the typed-packet contract](packet-contract.md). The independent review covers this whole set, not only the filename rename.

## Current evidence and coordination

- Live baseline inspected: main `54a075aa6d873e67953c3456b16beeb835c58eaa`, sunstack-dev 2.75.1.
- Candidate PR #122 at `e2adb45a535645f4563e778800f397059a7a7974` supplies useful duties. Its role charters, five-document controller, schemas and compaction claims are not automatically adopted.
- The Codex Lead owns this spec, execution commission/plan and substantive acceptance. Claude `67681626` is the owner-assigned main Implementer; the existing Advisor challenges. The owner may talk directly to the Implementer and retains merge authority.
- Owner authorized a **new PR**, separate from #122. Implementer setup is reported at `ai-tools.skills-practices-manage-agents`, branch `skills/practices-manage-agents`, based on origin/main `54a075aa`. Verify actual cwd/branch/head/dirty state before writes.
- This target becomes the role/form authority. Before #122 lands, its owner removes competing charter changes and consumes this home. No aliases, forwarding skills, history rewrite or automatic merge.
- Ordinary trails remain on the shared board or in session-logs under destination rules; curated conclusions belong in memory-logs. No shared handoff index.

## The model

| Concern | Meaning | Authority |
|---|---|---|
| Role | The result, judgment and decision boundary the agent owns | Selected role charter |
| Execution form | How its conversation is managed | Management's execution-form rules |
| Assignment | Current outcome, inputs, grants and closing check | Commissioner under its actual authority |
| Practice | Repeatable method used for this work | That practice's skill |
| Principle | Engineering judgment applied at the relevant decision | Full principle leaf and conditional depth |
| Phase | The current engineering step and its return | Selected by the caller; carried as assignment data |
| Model | Capacity and cost for this job | Catalog resolved at commission |

**Worker** is a parent-managed native subagent, retained through the bounded job's corrections. **Sidekick** is a separately managed session, addressed and reused across related work. Native workers may themselves have thread IDs: the distinction is management/lifetime, not whether an ID exists. Neither form independently grants governing design or acceptance authority.

**Roles are seven:** Lead, Advisor, Implementer, Verifier, Reviewer, Researcher and Operator. There is no Worker role. Sidekick is a postfix showing execution form, not a generic responsibility.

| Role | Form policy | Charter |
|---|---|---|
| 🦁 Lead | Main owner conversation | `references/roles/lead.md` |
| 🦉 Advisor | Always Sidekick, owner-requested | `references/roles/advisor.md` |
| 🐒 Implementer | Always Sidekick | `references/roles/implementer.md` |
| 🔬 Verifier | Always Sidekick, paired with each Implementer | `references/roles/verifier.md` |
| 🔎 Reviewer | Always Sidekick, independent of author history | `references/roles/reviewer.md` |
| 📚 Researcher | Worker for bounded native work; Sidekick for continuing investigation or a route-required bounded job | `references/roles/researcher.md` |
| 🔧 Operator | Cheap prescribed/guided collection or execution; Worker by default, Sidekick when the authorized job needs a separately managed session | `references/roles/operator.md` |

Display session titles as role + Sidekick, including Advisor Sidekick, Implementer Sidekick, Verifier Sidekick, Reviewer Sidekick and Researcher Sidekick. Native forms identify the responsibility too, such as Researcher Worker or Operator Worker. Existing correct names need no ceremonial rewrite. Role authority stays in one charter regardless of display title.

Not every role/form combination is admitted. The fixed-form policy above wins over convenience. Default feature code and associated proof stay with the Implementer Sidekick; native workers collect evidence, perform guided research or execute prescribed operations. A native worker does not acquire independent feature implementation, architecture or acceptance authority from being cheap.

A **workstream** here is the bounded continuing implementation assignment named by the Lead's plan/commission and closed by its declared proof: usually a Milestone containing Tasks. It is not a new Router entity or an automatic synonym for a PR. The commission names the exact unit. A Verifier pairs with every Implementer; this does not create another pair for each collection subtask.

## What the role files must teach

The companion document supplies the teaching and prompt spine for all seven roles. Runtime authoring must preserve its substantive meaning, adapting wording for readability rather than turning it into a checklist.

Each file leads with the role's lens: what it must understand, what can fool it, which decisions it makes, and what good work looks like. It then composes relevant practices and principles, gives a concrete wrong-path example and a clean case, and provides the ready commissioning opening. Job fields are supporting structure.

The quality bar is observable in the text:
- an unfamiliar case can be reasoned about using the guidance;
- the example exposes a failure despite apparently good receipts;
- a clean result proceeds without redundant ceremony;
- the role has a different responsibility from adjacent roles;
- named methods have a condition, concrete result and use;
- bookkeeping cannot be the sole owner of an engineering stage.

These are source/content checks, not proof that agents already apply the guidance correctly.

The global action-triggered principles stay authoritative. Each role names its distinctive judgments; the commissioner adds job-specific full reads, including testing/type/boundary principles when the work calls for them. The role's short list is not an exclusive allowlist. Do not duplicate the global trigger catalog.

Research remains **one practice**. A Researcher Worker on Luna can investigate one supplied question. A Researcher Sidekick on Sol can coordinate Operators/Workers and synthesize a continuing investigation. Operators perform the cheap first pass: scripts, scraping, extraction, observation and monitoring, using supplied criteria. They return candidate material; the Researcher checks decisive anchors and interprets it. Guided local extraction is allowed; deciding the investigation's premise, engineering meaning or acceptance is not.

## Control and evidence

The Lead designs and plans with the owner, names the workstream, and commissions the Implementer–Verifier pair. They share setup, facts and reproductions directly. Expected outcomes and correctness references come from governing sources, not their agreement.

The Implementer changes code, writes product tests and supplies associated proof. The Verifier checks test adequacy, pyramid placement and the intended red-to-green evidence, then observes the real affected behavior. For app work it writes, maintains and runs the assigned verification scripts/drivers against the real built or installed app and configuration, rather than treating suite code as the app observation. That does not grant feature-code edits or product regression-suite authorship. Missing regression cases return to the Implementer. A later explicit owner grant may change that boundary through a revised charter/commission.

The Lead reads the decisive source and evidence and asks: what was required, what was observed, did it exercise the relevant boundary, what does it establish, and what remains unknown? Delegated observation is legitimate when the Lead interprets it. Repeating an equivalent adequate run merely to claim personal involvement adds no proof.

A settled implementation defect returns to the Implementer and is re-observed after correction. A broken governing assumption or unresolved reference returns to the Lead and, where required, the owner. Independent implementation review follows Lead assessment. Reviewers judge source, tests and contracts and check corrections; they do not fix or accept. The Advisor challenges the live model and interpretation rather than acting as another approval hop.

The Chief of Staff's outer-loop policy stays in its own repo. A watchdog may use code or models to monitor workflow; it does not substitute for product observation or technical acceptance.

## Management's visible main path

1. **Classify the job** by direction, span, horizon and closing check. Missing intent/contract/grant is a gap. Preserve Exact as a prescribed procedure and Complete as a supplied approach with local details left to decide. Operator eligibility now includes Exact procedures and bounded Complete/Local collection under supplied criteria; this explicitly replaces the old Exact-only Operator rule and horizon examples. Guided labels/excerpts remain candidates, while choosing the inquiry, engineering synthesis and correctness judgment belong to the Researcher or commissioning role. Larger research closes a Researcher assignment, not an Operator verdict.
2. **Choose responsibility, then form.** Apply the seven-role table and fixed forms. Continuity changes Researcher's form, not its responsibility. The Lead commissions Advisor, Implementer, Verifier and Reviewer Sidekicks. A Sidekick with a charter's management grant may commission bounded Operator/Researcher help for its assigned job, using native Workers or separately managed helper sessions when the authorized route requires them, including Luna through Router from Claude. Retain their exact addresses, corrections and handbacks; creating a session never grants leadership or wider work. Native Workers return further decomposition to their parent rather than fan out or open sessions by default.
3. **Resolve an eligible model** and host-supported settings. No row means cut the job or report the capability/policy gap; never improvise a frontier pick or change the Lead's model.
4. **Load the role prompt.** MUST load the selected role's charter from the table and return its ready opening and default reads. The commissioner and recipient each read it in full. IF you are the Lead starting qualifying management work, load `references/roles/lead.md` and return its acceptance stance and applicable reads.
5. **Choose the route for the form.** MUST load `references/execution-forms.md` and return the supported route, lifecycle and history boundary for the chosen form before creating, reusing or dispatching any helper. It owns detailed form mechanics and selects the retained provider and ACP manuals. Preserve exact target identities, observed creation and delivery stages, and recovery from uncertain operations.
6. **MUST load `references/agent-job-packet.md` and return the typed commission.** Fill the role, form, supplied method, required full reads, reachable sources, limits, closing condition and declared return owner. For an Implementer–Verifier pair, create or reuse both Sidekick sessions without dispatching their work, obtain their real addresses, then fill both mutually referencing packets and dispatch them. No placeholder pair address or extra ID/index is needed. Host settings go in actual tool arguments; packet text does not establish OS confinement or authorization.
7. **Continue and assess.** Reacquire charter/commission/trace at assignment, material correction and resume, and check the role boundary before handback. Read governing sources through those pointers. Match each material claim to current evidence; return a specific gap or scoped result. Only the Lead accepts delivery.

`delegation-examples.md` must show contrasts: cheap prescribed extraction versus research interpretation; a short Researcher Worker versus a continuing Researcher Sidekick; and a full Implementer–Verifier pair. Remove examples where “continuity changed the role” or a generic Sidekick catalog selects research on the wrong model.

## Models and budget

The catalog maps **role + valid form + classified job** to capacity. Keep a short set of rows; do not generate a Cartesian matrix.

- Operator: Luna, medium for exact watch/script/collection work; high for bounded Complete/Local collection when supplied extraction criteria require local inference. Both remain cheap collection/execution, not an independent engineering verdict. Remove the Claude Haiku Operator and native-Worker rows.
- Researcher: bounded Complete/Local work uses Luna high, as a native Worker when supported or a Sidekick when the required model must use Router. A route-required bounded Sidekick keeps that job's capacity and closing check; it gets no automatic fan-out or continuing-program mandate. The existing Sol medium capacity for a supplied cross-owner approach remains subject to the recorded Daily-driver reason. A continuing Researcher Sidekick uses Sol high to xhigh with useful Luna helpers. Opus is not a research default.
- Implementer Sidekick: transfer existing executor eligibility explicitly—Luna high/xhigh for Exact or Complete Local; Sol/Opus medium for Complete Cross-domain (the old Worker executor row); Sol/Opus high to xhigh for the existing permitted Partial cross-domain/system implementation work. Missing governing choices still belong to the Lead. Preserve owner-assigned Claude execution.
- Verifier Sidekick: Sol or Opus high to xhigh, from a different lineage than its Implementer when available. A missing eligible route is a named gap, not omission of the Verifier.
- Reviewer Sidekick: existing Grok/Sol/Opus rows and effort ranges; at least one reviewer from a different lineage than Lead/author. Frontier rows need their existing explicit authorization.
- Advisor Sidekick: existing Sol/Opus rows; existing frontier authorization boundaries remain.
- Lead: owner-selected model, never escalated.

Exact provider IDs still come from the active model map/advertised host contract. Record a reason where the existing Daily-driver policy requires it. No larger-context/fast variant, fixed fan-out count or Haiku collection row is added.

## Typed packet and prompt ownership

Choose **one owned TypeScript schema file**, `schemas/agent-job-packet.ts`, using Zod v4 and `.describe()` on fields. This local placement choice follows the owner's “yes schema,” types-as-communication standard and preference for one checkable source. It is not a new SDK, parser framework or orchestration store.

`agent-job-packet.md` teaches how to commission and points to that file. Each role file owns its ready opening/read defaults and refers to the same schema with a comment import line. No duplicate Markdown schema or seven parallel interfaces.

The schema exports inferred types and:
- one shared job base (outcome, sources, limits, closing condition, return-contract reference);
- `requiredReads` carrying the full charter pointer, named practices and named principles; role defaults plus job-specific additions;
- a role-discriminated union with a required execution form, fixed to Sidekick for the four fixed roles and main for Lead;
- real role payloads: Operator procedure/criteria and expected observations; Researcher question/approach; Implementer plan/slice and write scope; Verifier adopted reference and distinct pre-build challenge, observation-with-target, or apparatus assignment; Reviewer target/procedure and no-author-history requirement; Advisor current question/model; Lead owner intent/current governing context;
- access variants that require actual allowed operations/write paths where relevant, rather than optional boolean bags;
- typed helper handbacks for Operator observations, Researcher synthesis and Advisor challenges when no existing phase/method return owns them.

Existing phase-owned returns retain their authority. A typed packet references that result owner; it does not create a universal acceptance result or copy phase schemas. Human chat stays prose. Worker is a form and never a role discriminator.

Derive types with `z.infer`, reuse `.pick()`/`.omit()`/`.extend()` as appropriate, use readonly values, descriptive names and explicit function types, and avoid casts/`any`. Build object variants before readonly wrapping; ZodReadonly is not an extendable object. Do not add a refinement-heavy schema framework to encode natural-language judgment.

A typed read list does not prove correct selection or actual reading. A schema-valid grant does not prove permission. A typed completed handback does not prove the feature works. Evidence collection, semantic interpretation and acceptance remain in the roles/methods.

Main starts without a direct Zod dependency or plugin TS setup. Implement the narrow validation seam in the existing `tests/skills` TypeScript/Vitest setup: a single `zod@4.6.5` pin in the schema import and matching test dependency/resolution, with fitting import/typecheck/invalid-payload proof. Normal pnpm resolution also moves the existing eval core/peer/optional Zod 4.4.3 references to 4.6.5; both installed consumer manifests allow `>=3 <5`, and candidate #122 shows that lock change. This bounded dependency effect is allowed. Do not add an alias, override, second schema version or unrelated dependency upgrade to preserve the disproven unchanged-graph assumption. Run fitting offline unit/typecheck/import proof; actual eval/model execution remains unrun and must be named as a gap. Keep one version when the branches converge. Reuse the candidate pattern selectively without merging it or migrating repo tooling. Bun may run the schema directly using its shared cache; no new package/service or cache refresh is commissioned here.

## Runtime placement

```text
plugins/sunstack-dev/skills/practices-manage-agents/
├── SKILL.md                         # model, selection, catalog and visible completion
├── agents/openai.yaml               # renamed current metadata
├── references/
│   ├── roles/                      # seven teaching files + ready prompts
│   │   ├── lead.md
│   │   ├── advisor.md
│   │   ├── implementer.md
│   │   ├── verifier.md
│   │   ├── reviewer.md
│   │   ├── researcher.md
│   │   └── operator.md
│   ├── execution-forms.md           # Worker/Sidekick mechanics and constraints
│   ├── agent-job-packet.md          # commissioning judgment; schema pointer
│   ├── delegation-examples.md       # meaningful contrasts
│   └── existing provider/ACP manuals
└── schemas/agent-job-packet.ts       # one described Zod v4 authority
```

Invocation remains both user and model. Trigger to author:
> Use when delegating to subagents, agent teams or parallel agents: the Lead or an authorized helper chooses an Advisor, Implementer, Verifier, Reviewer, Researcher or Operator, its valid Worker or Sidekick form, and model; or spawns, commissions, continues, steers, waits for, monitors, verifies or assesses that work, including a fan-out across many units. Not for performing the assigned engineering phase itself.

Roles compose lower-level practices/principles; charters do not select or invoke phases/orchestrators. The caller carries a selected phase/procedure as assignment data. Management owns roles/forms, not document coverage, plan storage, ticket creation or the work's lifecycle controller.

## Delivery source boundary

Current Claude startup documentation supports applicable instructions for normal non-fork subagents, with Explore/Plan/`omitClaudeMd` exceptions. Non-fork children do not inherit parent-invoked skills; a fork inherits parent conversation context. Pinned Codex `092d3acd` inherits applied parent instruction snapshots and initializes the child's project instruction manager. These are documented/source capabilities, not evidence about every current harness or a full required read.

Every helper prompt explicitly requires its selected charter/practice/principle reads. Provide applicable instruction pointers where delivery is absent/unestablished, including independent sessions. Our charters are ordinary references: native skill preload and a compaction token cap do not establish their delivery/survival. Reacquisition remains required; E1 retention/application is unrun.

Primary sources inspected: [Claude startup](https://code.claude.com/docs/en/sub-agents#what-loads-at-startup), [Codex spawn](https://github.com/openai/codex/blob/092d3acd6bec3e3a14bdc7e7a2810ab628ab759d/codex-rs/core/src/thread_manager.rs#L1811-L1847), [Codex initialization](https://github.com/openai/codex/blob/092d3acd6bec3e3a14bdc7e7a2810ab628ab759d/codex-rs/core/src/session/session.rs#L1475-L1510). No native-delivery experiment ran.

## Hard cutover and scope

Rename the management folder/frontmatter/metadata and every live name consumer in one changeset. Remove the old discoverable skill; no shim. Inventory actual consumers again before implementation.

Inspected consumers include repo/plugin READMEs and AGENTS; both plugin manifests' keyword/usage metadata; current phases/practices/orchestrators and owned references naming management; active planning-delivery and sample-scenario fixtures, their directory name and parser test. Correct generic Worker-as-role/Sidekick-as-purpose descriptions and retain valid responsibility + form names. Keep historical/retired documents and protocol data historical/data, not new authorities.

Only terminology/reference/typed-packet integration corrections occur in those consumers. No phase procedure/controller rewrite, board/schema change, new role-* skills, universal driver, Jev runner, eval framework or Chief-of-Staff SOP changes. `practices-verification-routes` remains an unadmitted future method; Verifiers use commissioned existing project routes and owned apparatus. `practices-correct-to-structure` is separate.

Private devfiles global role/form and management-name edits use its approved separate PR and existing commit/publication boundary. Prepare both PRs before release. Delivery order is role package merge → explicitly authorized client refresh/verification → global-instruction PR merge/apply. The brief transition is a named delivery dependency, not claimed atomicity or permission to invoke a removed name. Resume agent work after both current package and global callers match. No compatibility delivery mechanism is added, and neither PR merge is authorized by this commission.

The owner-confirmed `docs/specs/<spec>/plans/` home, per-slice staffing and selected ticket creation remain separately owned planner/controller dependencies. All-five design coverage remains with the design controller.

## Proof and review

One behavior-changing run; target `practices-manage-agents`. Surface allocation: rewritten discovery description; role/form selection and assessment in the body; teaching/prompts/forms/provider mechanics in references; packet schema plus fitting structural validation.

Before runtime edits, independent `skill-review` spec review checks this spec and its companion. Preserve current reviewer relationships; verify each candidate at its current anchor and bind accepted semantic coverage. The author/Advisor check is not formal acceptance.

Implementation proof:
- meaningful schema rejection of missing Operator procedure, illegal fixed role/form pairing and missing observation target; valid corresponding packets accepted;
- typecheck/import/format and existing affected unit gates; active caller/metadata/source reachability and no old live owner;
- source review that each role actually teaches a move on its contrasting cases and read directions are complete;
- no new pressure, trigger, E1, property/mutation or paid inference runs under the current owner boundary.

Prepare later skill-routing true/near-miss and authority/adequacy prompts, but label them unrun. Static checks and good prose do not establish behavioral trust. Implementation may proceed from an accepted user-intent spec with the named evaluation gap; do not claim demonstrated improvement, trusted autonomy, merge readiness or released behavior from it. Before release, preserve the user's decision on that exact proof gap.

The Implementer executes its own changes/proof and hands back. The Lead reads decisive diff/evidence before independent implementation review. Changelog and plugin version accompany this change; user merge authority and explicit home-cache refresh boundary remain.

Run status: accepted-to-implement. Review records: `/private/tmp/2026-10-roles-practices-spec-review/v5-spec-review.md` plus `v5-verifier-and-craft-review.md`; all four independent checks complete, all required findings and exact corrections verified closed, source-only acceptance. The Lead read both reports and decisive current anchors. Earlier v1–v3 checks remain historical input. Implementation decision: **GO under commission.md and verifier-commission.md**. No runtime, behavioral trust, CI, PR readiness or release claim follows from spec acceptance. Role/default decisions below remain strikeable by the owner; none is a behavior-proof result.

## Current decisions

- Owner-confirmed: role/form split; Operator role with cheap Luna collection/execution; four roles always Sidekick; Researcher form by job; every Implementer has a Verifier; per-role prompts with appropriate full reads; typed Zod v4 described packets; new PR; no pressure testing now.
- Lead defaults: Operator may use either valid form with Worker default; route-required bounded Researcher Sidekicks keep bounded-job eligibility without automatic fan-out; seven role files; Reviewer Sidekick display; one owned TS schema; model rows above; product test fixes stay with Implementer while Verifier owns apparatus/checking.
- Latest owner clarification: the Verifier checks pyramid/TDD/proof principles and actually verifies the app. The prior apparatus grant covers assigned verification scripts/drivers against the real built or installed app. Product-suite repair authorship remains the labelled Lead default. These duties apply to the actual assignment surface; this skill-only run retains its fitting structural proof and deferred role behavior checks.
- Implementation evidence correction: normal single-pin pnpm resolution unifies the compatible eval Zod references at 4.6.5. The old unchanged-graph promise was a Lead-added assumption, not owner intent or an existing contract; it is withdrawn. Single pin, narrow test seam and existing proof strength remain. Offline harness proof is required; eval/model behavior remains unverified.
- Owner can strike a default; a strike revises the dependent contract before code consumes it.
- Explicitly deferred: test/mutation/property strategy, new practice bodies, planner/tracking/controller changes, behavior/E1 proof and final release/merge.

## Earlier decision rows, superseded where v5 says so

| Proposed default | Reason and cost |
|---|---|
| v0: one charter reference in the management home — superseded by the dated row below | One authority per role; proposed a shared file, which would also load unrelated charters. |
| 2026-10-13 v1: one file per role under the same management home; supersedes v0 placement | The role table supplies exact pointers; commissioner and recipient load only the charter they use. Costs small files, saves repeated unrelated reads. |
| Preserve existing packet and trace owners | Limits lossy paraphrase and duplicate state; requires reachable sources rather than self-contained repeated catalogs. |
| Current main as implementation base; adapt candidate duties selectively | Avoids importing the rejected design controller; requires explicit convergence with PR #122. |
| Verifier uses existing project procedures until a verification-routes practice is admitted | A current assignment can run an established route; missing capability remains a real gap rather than a promise supplied by an absent skill. |
| 2026-10-13 v2: quick bounded Workers and a continuing Researcher both use practices-research | Owner direct correction: choose by job; keeps one research method and preserves continuing evidence/synthesis without making every lookup a session. |
| 2026-10-13 v2: Luna-high Complete · Local Worker row | Owner relay explicitly names high for small contained jobs/research; supersedes the earlier unresolved row, not a new xhigh default. |
| 2026-10-13 v2: Verifier owns assigned harness/driver creation and upkeep | Owner relay part 2 authorizes verification apparatus work; feature code and regression-test authoring do not move with it. |
| v2 proposed Sol-or-Opus Researcher default — superseded below | This missed the owner's standing instruction to conserve Claude tokens for research. |
| 2026-10-13 v3: Sol Researcher with useful bounded Luna helpers | Supersedes v2's model default; follows the owner's existing research direction and today's job-based choice. |
| 2026-10-13 v4: retain the Sidekick postfix for separate sessions; withdraw complete removal | Typed owner correction: "Implementer Sidekick use sidekick postfix"; "workers are subagents, sidkicks are eperate sessions". The hierarchy marker helps the owner understand placement. |
| 2026-10-13 v4: one ready prompt per role, owned beside its charter | Owner requires the Lead to hand each helper the appropriate practices/principles; keeps that reusable opening in one home and its full-read direction explicit. |
| 2026-10-13 v4: shared TypeScript packets, Zod v4 with descriptions | Owner rejects informal text schemas; the schema's physical MD/TS home remains open. It constrains the packet, not engineering correctness. |
