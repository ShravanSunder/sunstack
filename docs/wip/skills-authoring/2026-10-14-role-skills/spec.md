# Standalone role skills selected by agent management

Reviewed v1, 2026-10-14; accepted-to-implement at SPEC stage. Owner-directed behavior change. Seven role skills replace the seven current charter references; one management update performs the mapping and consumer cutover. This is an eight-run spec with one named skill target per run, not runtime implementation.

## Owner decision and intended result

The owner chose standalone, model-invocable role skills like practices. `practices-manage-agents` remains the mapping and setup owner: role, execution form, model/effort, execution route, commission, continuation and assessment. A role skill teaches how to fulfil that responsibility using its methods and principles. It does not duplicate the model catalog, choose its own model, create a session just because it loads, or expand an assignment.

Success: management selects exactly the role skill matching the result owned; commissioner and recipient read it in full; recipient uses its relevant practices/principles and returns the assigned result within its grant. Normal discovery can select a role when the current conversation/commission actually assigns it, without a user needing to name the skill. A research/review/verification topic alone must not silently change the main Lead into another role or create a claim of independent review.

The role skill is the charter's single teaching home. Remove the old reference copies in the same delivery; no forwarding stubs, alias skills, duplicated charters or management-owned copies of the full role tutorial. Existing short responsibility/form rows stay in management because they select the job, rather than teach it.

## Source, project boundary and delivery order

Read baseline: #127 content, `0bad422c38e4a047e10ae9d7107f182534d5a0af`, plus the saved project 1 design at `ab2f423a715f1a7c9e746d50545c3d072abcffea` on `skills/practices-principles`. All seven current charters, management body/packet, shared assignment fields, selected role contracts, current metadata, relevant tests and maintainer references were inspected. Runtime is unchanged at spec creation.

This is a newly admitted named part of project 2. It supersedes the earlier recommendation to retain role references, but does not change the accepted project 1 spec or authorize the remaining broad extraction/rename proposals. Delivery order: project 1's practice/principle implementation first, then role promotion as a dependent cutover; both change management, so concurrent runtime writers are excluded. Role promotion consumes the then-current improved methods/principles, not stale copies embedded in this draft.

The owner handles #127's merge. Closed #128 and its five-document/schema system remain reference only. No Verification Design/Test Design skill is restored here. Their words in an existing charter are supplied strategy/expectations, not a requirement to create absent phases.

## Concepts and ownership

| Concern | Owner | Role skill's use |
|---|---|---|
| Result responsibility, role stance and boundaries | `role-*` skill | Teach the recipient's judgment, methods, applied case and completion. |
| Role selection, execution form, model/effort, setup and continuation | `practices-manage-agents` | Supply an existing assignment; select/grant bounded help through this method when the role permits it. |
| Model rows and exact model identity policy | Management's catalog, including project 1's planned module | Read the selected policy only when commissioning; do not put models into the role skill. |
| Current outcome, sources, limits and closing condition | Existing commission | Consume them; role discovery is not a commission or permission grant. |
| Recurring engineering method | Selected practice/assigned phase or procedure | Call it; retain its result owner and completion boundary. |
| General engineering judgment | Selected principle | Apply at the role's decision; reuse a current same-agent full read. |
| Provider calls and mechanics | Existing execution/provider references and tool manuals | Keep them with management setup, not in each role. |
| Packet validation | Existing management-owned role schemas | Read own contract only when constructing/validating data. Valid shape is not proof of reads, authority or behavior. |

## Decisions

| ID | Default | Reason and cost |
|---|---|---|
| D1 | Create seven `role-<name>` skills | Makes responsibility teaching directly discoverable by the chosen name. Costs seven concise descriptions and metadata entries; no description repeats a full method. |
| D2 | Enable ordinary implicit discovery and explicit invocation | Owner requested model-invocable roles like practices. Descriptions select actual role assignment, not broad topic words. Loading preserves role/grant/independence boundaries. |
| D3 | Move the existing useful charter teaching; do not wrap it | Gives each role one maintained home. Cost: update all active pointers and typed literals together. |
| D4 | Management retains models and setup | These policies change independently of role judgment. One catalog/setup path avoids seven drifting model lists. |
| D5 | Preserve roles/forms, grants and responsibilities | Promotion changes the teaching home and discovery, not the authority model. Worker/Sidekick remain forms; no `role-worker` or `role-sidekick`. |
| D6 | Keep existing packet field `requiredReads.charter`; change its literal to the selected role skill name | The field still identifies the role's charter, now a skill. Avoid an unrelated field redesign. Hard cut over values/descriptions/tests; old reference-path values are rejected, not accepted through compatibility. |
| D7 | Typed role schemas stay with management | Setup/validation owns the machine contract. Role skills conditionally link their own existing contract; no new packet schema or Markdown schema. |
| D8 | Select only the active role and relevant methods | Role promotion must not become a seven-skill/all-principle preload. Same-session unchanged reads can be reused; no repeated public receipts. |
| D9 | Preserve short role-specific examples and distinctions | Removing every repeated word would erase how judgment applies to a role. General method extraction remains a separately analyzed project 2 question. |
| D10 | No automatic topology, model escalation or independence claim | Skill loading supplies teaching. It cannot prove a fresh reviewer session, appoint another Lead or obtain write/network authority. |
| D11 | Apply one complete cutover after all eight runs | Each run has one target, but intermediate role copies are not published as a partially migrated release. No split ownership ships. |
| D12 | No installed-cache mutation during design | Source/metadata checks cannot prove live client discovery. Refresh/readback remains an explicitly scoped post-push/release step. |

## Trigger and platform surfaces

Every new folder is `plugins/sunstack-dev/skills/role-<name>/`, with matching frontmatter `name`, a trigger-only description, and `agents/openai.yaml`. Do not add `disable-model-invocation: true`. Codex metadata explicitly uses `policy.allow_implicit_invocation: true`; no explicit-only policy is copied from principles. UI metadata names the role, gives a concise 25–64 character summary and a one-sentence default prompt using `$role-<name>`.

The descriptions below are the proposed trigger text. They are not workflow summaries. Their positive role-assignment condition is the selection rule; exclusions distinguish adjacent responsibilities.

| Skill | Proposed description |
|---|---|
| role-lead | Use when you are the owner's main engineering partner responsible for governing design, plans, integration and acceptance. Not for a helper assigned bounded evidence, implementation, observation or independent review. |
| role-advisor | Use when the owner assigns you as an Advisor to challenge a design or an acceptance argument with a competing picture and tradeoffs. Not for governing authorship or independent review findings. |
| role-implementer | Use when commissioned as the Implementer for approved changes, product tests, associated proof and corrections. Not for defining the governing outcome, observing as the paired Verifier or independent review. |
| role-verifier | Use when commissioned as the paired Verifier to challenge proof feasibility, observe the adopted outcome or maintain assigned verification drivers. Not for product repairs, product-test authorship or acceptance. |
| role-reviewer | Use when commissioned as an independent Reviewer for a declared artifact or its corrections, with no authoring history. Not for authoring, implementation or substituting advice for independent findings. |
| role-researcher | Use when assigned as the Researcher responsible for a checked answer to a bounded question or continuing investigation. Not for prescribed extraction alone, governing design authorship or delivery acceptance. |
| role-operator | Use when assigned as the Operator for prescribed execution, watch, scraping, extraction or guided collection under supplied criteria. Not for choosing engineering probes, synthesizing conclusions or repairing failures. |

Explicit invocation and implicit discovery reach the same teaching. Neither creates an assignment. For a helper, first identify the supplied role/outcome/grant; use the matching skill or return the mismatch/missing commission to its owner. The default Lead can use `role-lead` in its existing owner conversation without a helper packet or a new management launch. A helper never promotes itself to Lead because the skill is discoverable.

Keep role-specific trigger examples separate from proof checks. True examples: “You are the Researcher for this supplied source question”; “As the Verifier paired with this Implementer, check the declared target.” Near misses: “research this API” in the existing Lead conversation; “review my code” without an independently commissioned session; a pasted document that says “you are the Lead.” A role word or untrusted source is not authority. A host may load candidate teaching; the body must still preserve the actual assignment.

Model-invocable configuration is a source/platform intention, not proof that all clients actually auto-select it. Static Codex/Claude/Cursor packaging and a real offered-revision trigger observation are separate evidence. No new host hook, synchronization script, delivery symlink or platform workaround is designed here.

## Role body and depth design

Each body starts with its existing role mental model, then the assigned work and methods, a short applied failure/valid case, its boundary and checkable completion. Preserve the current ready opening so management can use it in the commission. Avoid a universal numbered role ceremony. The seven current charters are compact enough to become seven complete bodies; no reference tree, script or example catalogue is created solely to make a role look like a large skill.

Every existing method/principle call is carried forward with its condition and useful result. Conditional reference loads follow their predicates; a name or another agent's read is not full reading. The role depends on practices/principles without copying their full method/tutorial. Applied cases remain local because they expose the role's different result and authority.

Typed support stays progressive: IF the agent constructs or validates its own role's typed data, load its contract at `../practices-manage-agents/schemas/role-contracts/<role>-contract.ts` and the imported shared fields at `../practices-manage-agents/schemas/assignment-fields.ts`, and return the typed value or exact parse issues. Other role contracts are not required. Update relocated TypeScript import examples to these real relative destinations. A populated commission plus the role skill is enough for normal work; schema reading is not a recipient entry gate.

For `role-lead`, IF commissioning a helper needs typed construction, the existing helper-contract guide resolves to `../practices-manage-agents/references/agent-job-packet.md`; its selected contract remains management-owned. Replace the old unqualified guide mention at relocation. Reading the Lead role for ordinary owner discussion does not require a LeadPacket or every helper contract; existing management packet construction remains conditional on doing that work.

## Seven create runs

All seven are user-directed behavior-changing creates (promotion of existing teaching), not mechanical moves because discovery and caller names change. Main body/depth behavior stays equivalent except for explicit entry/completion and relocated pointers. No faithful failure reproduction or improved behavior is claimed by this draft. Each run adds one named role skill and its metadata; no other role is authored in that run.

| Run / target | Existing teaching to move and preserve | Methods and judgment retained | Success / failure / valid control |
|---|---|---|---|
| R1 role-lead | `references/roles/lead.md`: shared engineering picture, governing authorship, inspect/rebuild acceptance argument, wrong-owner green example | Qualifying collaboration/trace; source research and management when needed; shared-model and verification judgment | Accept only the supported result at the planned owner. Wrong-owner green proof is narrowed/rejected; adequate correct-owner evidence is accepted without another summary. No helper or skill load creates a second Lead. |
| R2 role-advisor | `advisor.md`: independent competing picture, load-bearing assumption, concrete gain/cost/payer, advice versus review/approval | Collaboration/trace; conditional research and granted collection; shared-model and tradeoffs | Challenge an unjustified isolation boundary with its actual cost, or preserve the necessary boundary and inspect its contract. Advice never authors or approves the governing design. |
| R3 role-implementer | `implementer.md`: approved model into code/types, real interaction tests, drift versus break, paired Verifier, existing receiver example | Collaboration/trace; unfamiliar-contract research; granted collection; proof and model-refinement judgment plus job-selected leaves | Implement the assigned outcome at its owner and prove it without mocking away the effect. Existing honest receiver regression is reused; governing meaning and proof strength remain with Lead. |
| R4 role-verifier | `verifier.md`: feasibility/adequacy, actual built target/config/client, assigned drivers, red limits, pane-arrival example | Collaboration/trace; project-supplied procedure; uncertainty research/granted collection; testing/prove/verify | Observe the adopted outcome or return its exact gap. IPC acknowledgement is not visible arrival. Applicable existing real-path evidence is reused; product tests/feature repairs/acceptance remain outside its grant. |
| R5 role-reviewer | `reviewer.md`: rebuild from governing sources, assertion path, false-green versus false-red, no taste-only defects | Authorized trace/posting; supplied review procedure; missing-source research and granted proof collection; verify/testing | Return anchored findings and check corrections independently. Preserve contract-permitted ordering. No authoring history is made independent by loading this skill; no source repair or acceptance follows. |
| R6 role-researcher | `researcher.md`: checked answer, source/history/inference, bounded/continuing forms, adopted-proposal example | Research required; Sidekick collaboration/trace; continuing granted management; ground truth/reader | Answer the assigned question with checked anchors and limits. Quoted proposal stays proposal, explicit adoption passes. Worker returns to parent without private trace/fan-out; continuing grant can use bounded collection. |
| R7 role-operator | `operator.md`: prescribed execution/collection, inspectable target/output/exit/candidate material, login-page example | Supplied procedure and conditional tool manual; ground-truth reporting discipline, no mandatory research practice | Report actual extraction or exception. Successful scraper exit with login page is not article extraction; expected content under the supplied procedure closes without a broader research audit. |

The existing role/form restrictions stay in management. The skill body consumes the assigned form; it does not duplicate a model/form catalogue. Operator and bounded Worker contribute to the commissioner's trace; helpers do not invent a second shared account.

## R8 — Management mapping and complete cutover

**Target:** update `practices-manage-agents`. Promise: choose the responsibility the job needs, map it to exactly one role skill and supported form/model, set up the actual session/commission, then assess the result without delegating authority by label.

Keep its existing classify → role/form → model → role teaching → route → commission → continue/assess spine. Project 1's catalog module and decision-local principles remain current; this run does not change their model rows, policies, provider encodings or proof semantics.

Replace the seven reference destinations in Roles and forms with `role-lead`, `role-advisor`, `role-implementer`, `role-verifier`, `role-reviewer`, `role-researcher`, `role-operator`. Step 4 MUST loads the selected role skill in full and consumes its ready opening, boundary and applicable reads. Commissioner and recipient each read that selected skill; an unchanged same-agent read may be reused. For qualifying Lead management, load `role-lead` rather than the old reference. Dynamic selection means one exact table entry, not all seven.

Setup and use remain concrete in management:

1. Cut a result with its closing check; identify actual responsibilities and grants.
2. Select role, valid execution form and the eligible model/effort policy row.
3. Read that role's skill; get its stance/opening and job-relevant practice/principle reads.
4. Use existing execution/provider references to create or reuse the session with host-enforced model/effort/history/access settings. Role text does not establish those settings.
5. Fill the existing typed commission using real addresses and reachable sources. Its charter value is now the selected role skill name. Keep Implementer–Verifier pairing and the existing create-before-dispatch order.
6. Recipient reads role skill plus the selected method and relevant leaves; performs the assigned job and returns its owned result/gap.
7. Continue in the same relationship, preserving commission/grant; commissioner checks evidence. Only Lead accepts delivery and owner retains merge authority.

This remains management's method, not seven repeated setup guides. Already-running valid work does not get a new session/model because a role skill became available. A role skill loading `practices-manage-agents` for granted helpers reuses the current relationship and reads; the Lead/self-read must not cause recursive launch or repeated commissioning.

### Exact active consumers and typed literals

Retarget these homes in the same R8 delivery:

- Management Roles and forms, Step 4 and its Lead conditional read.
- `references/agent-job-packet.md`: role skill entry, ready opening, selected full reads and typed construction guidance.
- `schemas/assignment-fields.ts`: describe `requiredReads.charter` as the exact selected role skill name. Keep the field/key and shared validation shape; change no unrelated grant or result field.
- All seven existing `schemas/role-contracts/*-contract.ts`: each charter literal becomes its own `role-<name>` value. Keep discriminated unions, form restrictions, pair addresses and payloads; no `any`, alias values, fallback parsing or duplicate schema.
- `tests/skills/lib/agent-job-packet.test.ts`: update valid role examples and foreign-role failures; add rejection of old charter-path values, with exact `requiredReads.charter` issue assertions.
- Plugin README namespace/role descriptions: role teaching now lives in named role skills, management retains selection/setup/model/commission/assessment. Root AGENTS ownership wording and Current Plugin Skills table update only where this cutover made them stale; do not copy seven tutorials there.
- Any additional ACTIVE consumer found by exact old-path/literal search before editing. Inspect the source before changing it; historical specs/changelogs/archives stay historical. A new active owner or public contract beyond the identified packet value change returns to the Lead.

Delete all seven `references/roles/*.md` after the corresponding teaching and references are carried into the seven skills and every active consumer is cut over. Keep old Git revisions and archived conversation packets read-only; do not silently convert an old live commission into a new grant. On the next assigned continuation under the new revision, issue the same bounded commission with the new role-skill value; old values fail current validation. No persistence migration or authority expansion is designed.

## Proof and review

Authoring basis is owner-directed intent: first-class invocable role teaching with management mapping/setup. Drafting does not require invented RED. All eight runs remain proposed. Skill-creation's spec review is required, with independent teaching and structure families and independent reduction. Same sessions may verify bounded corrections; a semantic scope change does not inherit project 1 acceptance.

Structural proof: all seven names/folders/descriptions and metadata are valid; implicit invocation is enabled; every management mapping resolves one skill; relocated schema imports and reference calls resolve; no active old charter destinations or duplicate teaching remain. All typed role contracts accept their own skill value, reject foreign-role and old-path values at the intended issue path, and preserve every existing grant/pair/form constraint. Run the existing skill suite/typecheck and fitting formatting/packaging checks, including new-skill quick validation when its existing dependencies are available. No dependency installation or validator skip is presented as a pass.

Behavior proof: fresh unannounced tasks with hidden checks and actual loaded-copy/action evidence, following existing skill-authoring proof guidance. Each role has the named failure/valid control above. Test management→selected role→practice/principle composition, not seven isolated summaries. Also test explicit role use with a complete commission, a missing/mismatched assignment, safe existing continuation, invalid scope expansion and false independence. Subjects never see criteria or a question asking which skills they loaded.

Discovery proof is distinct: a realistic assignment prompt does not name the role skill; the record identifies which role descriptions/revision the host actually offered and whether the matching skill loaded. An explicit file read proves body use, not implicit selection. The old default eval wrapper that announces a test/JSON self-report does not establish realistic-task behavior. Use a supported fresh subject route with action records; if no offered-revision or loaded-copy evidence is accessible, name that discovery proof gap rather than claim it works across clients.

Prior-revision controls on the same task/checks are needed for any improvement claim. Role promotion can improve naming/access without demonstrating stronger engineering judgment; label that result honestly. Static metadata, schema and pointer green do not establish model behavior, correct commissioned model or independence.

No Markdown schemas, new result taxonomy, universal role report, loader, hooks, provider changes, security scan, app run or global/cache mutation follows from this spec. Role runtime prose remains ordinary teaching. Existing management-owned typed contracts have real validators and remain the single machine-schema home.

## Platform, version and delivery

Owning plugin is sunstack-dev, shared across its supported clients. New role skills have shared ordinary frontmatter and Codex UI/invocation metadata; principles keep their separate invocation policy. Validate actual supported Codex/Claude/Cursor packaging rather than claiming live discovery from an empty manifest check. Marketplace entries change only if actual availability/path/policy needs them; adding skills to the existing plugin does not create a new plugin/cache key.

At implementation, select one current base after project 1, check pending writers, and use a dependent stack layer/worktree for this cutover. Keep all eight runs and active-consumer changes in one unpublished delivery until ownership is complete; no old/new charter paths ship together. Update the then-current sunstack-dev version consistently and one public-safe dated changelog under 20 lines with affected skill/mapping/contracts and validation/refresh status. Owner retains merge authority. Client refresh/readback is explicit after push/release and never substitutes for proof.

## Run and review record

R1–R7: proposed creates of seven role skills. R8: proposed management update plus its named typed/pointer/test support. No runtime, schema, role reference, manifest or client copy changed during this design.

Current SPEC review: independent teaching and structure sessions completed mental-model-fit, depth-coverage, trigger-routing and rule-agreement; independent reduction accepted the v1 meaning at `29db9cb6de1bdc7be4af3e528cd2e32ee8bec8e4` with verdict `great`, decision `accepted-to-implement` and zero open findings. Review used separate Sol/xhigh sessions; no cross-family assurance. This status update changes no reviewed design meaning. No implementation, executed validation, implicit-discovery, behavior or release result is established. Project 1's reviewed specification remains unchanged and accepted for its own 11 runs; its implementation is still the prerequisite. Broader project 2 extraction, domain/audit family content, security rename and disputed #128 phases remain outside this named implementation proposal. Review reports remain outside the design document under the existing temporary review home.

Highest risks: implicit discovery silently switching responsibility; role content becoming another model/setup owner; stale charter literals after the move; overloading every agent with all roles; and treating a loaded Reviewer skill as no-author-history independence. The trigger boundaries, one-role mapping, exact typed cutover and realistic controls are designed to expose those risks; no behavior improvement is claimed yet.
