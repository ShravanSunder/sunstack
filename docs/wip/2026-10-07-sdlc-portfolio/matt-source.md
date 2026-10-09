# Matt source comparison

Question: What mechanics are present in Matt Pocock’s pinned skills, how do the exact guide claims compare with those sources, and which current local skills are nearest owners?

Mode: research-only.

Non-goals: no design or implementation decision, no skill edits, no source checkout update, no tests, and no recommendation to import material. This report supplies evidence and scope conflicts for the Lead.

## Source identity and freshness

- Matt source checkout: mattpocock/skills
- Checkout HEAD: c55ee46073ed923f86ce59a5eb3b6d895095d1b7, detached HEAD, clean working tree. Commit date: 2026-09-18.
- The inspected source checkout supplies the pin. Meta-repo index metadata was used for discovery and was not modified.
- Local consumer source snapshot: AI Tools `10ebacfb4ce72893196c87d51bc2271f72fe8922`. No named local skill source was changed.
- Freshness check: git ls-remote https://github.com/mattpocock/skills.git HEAD returned f3fc5632f401156837ee3872f14fe33ccf1024ea. I then read targeted public raw files at that exact SHA and the v1.3.0 tag commit; no checkout update or fetch occurred.
- Pinned package version is 1.2.3 at package.json:3. The public pinned source URL pattern is https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/.
- Matt AGENTS.md:1-9 says in-progress is beta, public for feedback, and not shipped in the plugin. The three focal skills implement-spec, pr, and retro are all under skills/in-progress/. Their presence proves source content at this pin, not that these flows shipped as stable plugin behavior.
- The pinned pr/SKILL.md:4-9 credits the PR body material to Dex Horthy / Humanlayer’s show-me skill. It is present in Matt’s checkout, but that file attributes the origin to Humanlayer.

## Source-class coverage

October 9 follow-up: the original inspection receipt below covers the named main files and extra files, not every supporting reference recursively. The follow-up read `tdd/tests.md` and `tdd/mocking.md` and expands testing/mocking depth and environment-versus-cache guidance in the [learning coverage check](learning-coverage-check.md#2-matts-testing-references-needed-their-own-read). Those two TDD files are references, not additional skills. The pinned inventory remains 38.

- Primary repository source: read all 38 SKILL.md files under skills/ at the pinned HEAD; each is marked full in the inventory below. The eight DeepWiki-pointer skills named in the assignment were read whole. Also read Matt AGENTS.md, .agents/invocation.md, skills/productivity/writing-for-agents/SKILL-MECHANICS.md, and the domain-modeling format file.
- Local source: read the current named planning, orchestration, implementation, PR, discussion, research, and skill-audit owners and the narrow plan/proof/PR references used below. Read the provided current local inventory at tmp/practices-research/2026-10-07-sdlc-portfolio/inventory.json: it lists 31 active skills. Local-quality workers own the broader local assessment.
- Fresh remote: exact observed public HEAD f3fc5632f401156837ee3872f14fe33ccf1024ea was read through public GitHub tree/raw endpoints for README, package/plugin versions, domain-modeling, implement-spec, pr, and retro. The complete 38-skill inventory below remains pinned to c55ee46.
- Not searched: the full current-head skill portfolio outside the targeted version-sensitive files; only the pinned c55ee46 inventory was read exhaustively.

## Claim matrix

| Claim | Pinned primary evidence | Status | Current local comparison |
|---|---|---|---|
| implement-spec is a nine-step spec-to-one-PR graph flow with an exploration subagent, per-ticket isolated worktrees, merger subagent, frontier advancement, code review, and cleanup | [implement-spec SKILL.md, lines 7-35](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/implement-spec/SKILL.md#L7); task graph/frontier at 11; background implementers at 15; numbered steps 19-35 | Supported for the named flow’s core sequence. “Unblocked” is expressed as a frontier of ready tickets, not repeated in every step. One branch and one PR are stated at 9 and 23-27. | Partial coverage across orchestrator-implementation-goal:8,12,29-36, implement-plan:27-33, and plan-implementation:10,28-33. Local plans define dependency DAGs, integration gates, ready frontier, proof, and optional parallel slices. The local model assigns a persistent Sidekick per planned PR assignment; it does not require one implementer subagent and merger subagent per ticket. There is no nine-step single-branch script. |
| The nine steps require TDD per ticket | implement-spec SKILL.md:19-35 has no TDD instruction at the c55ee46 pin. At current f3fc563, engineering/implement-spec/SKILL.md:27-30 explicitly calls tdd per ticket. The v1.3.0 tag and v1.3.1 HEAD are versioned separately from the older pin. | Supported at current 1.3.1; absent in pinned 1.2.3. The version split resolves the apparent contradiction. | Local root guidance requires scenario-first TDD for behavior changes; implement-plan/SKILL.md:29 and execution-and-proof.md:50 scope red/green by the plan or repo. |
| /pr requires a visual summary | [pr SKILL.md, lines 12-18, 39-41, 150-154](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/pr/SKILL.md#L12) | Supported with qualification: the Summary slot requires a view, but the listed forms include pseudocode, a tree, Mermaid, or a diff sketch; it need not be a diagram. | Partial. implementation-pr-wrapup/SKILL.md:35-49 requires a nonempty Change outline with an included view. pr-outline-views.md:8-12 picks the smallest changed shape and rejects file-path-only bullets. Its body contract has Why, Special things to note, and Change outline, not Matt’s Summary/Evidence/Merge Danger sections. |
| /pr forces hard before/after runtime proof | pr SKILL.md:19-22 and 156-162 requires before/after evidence and gives screenshots, output, or failing/passing test runs as examples. It says screenshots are S-tier when the environment is set up and the change is visual; execution evidence is A-tier. | Partial. Before/after evidence is explicit. “Runtime proof in every PR” is stronger than this file: it accepts test/output evidence and makes screenshots conditional. | Local implementation proof is obligation-based: execution-and-proof.md:43-54 maps proof to the smallest observation and requires runtime/manual proof when the obligation is only observable through a runnable surface. The PR body itself does not require before/after runtime evidence. |
| /pr classifies one-way/two-way doors and blast radius | [pr SKILL.md, lines 24-32, 164-168](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/pr/SKILL.md#L24) | Supported. It defines rollback cost as a reversibility signal and asks for a one-word blast-radius value plus optional ramifications. | No exact local field. implementation-pr-wrapup/SKILL.md:54 asks risks and the worst thing that could break; it does not require a door classification or one-word blast-radius field. Merge authorization remains user-controlled at lines 28 and 54. |
| /retro has seven categories: navigability, checks, standards, AGENTS health, tool economy, no-op instructions, compaction loss | [retro SKILL.md, lines 15-25](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/retro/SKILL.md#L15) | Partially supported and partly refuted. It has seven bullets: Navigation, Automated checks, Coding standards, Global AGENTS.md, Tool economy, No-ops, Information access. The seventh is information access, not compaction loss. “Global AGENTS.md” is a conditional category for large steering files, not a general health score. ask-matt separately discusses context compaction at lines 28-32, but not as a retro category. | No active local retro skill. skill-audit/SKILL.md:14-20,67-75 is a read-only portfolio audit from recurrence/evidence; docs-maintain handles settled doc upkeep. Neither owns this code-session retro taxonomy. |
| /retro keeps the human in the loop and never self-modifies | retro SKILL.md:7-13 defines a user-requested retrospective; 25 says present candidate improvements to the user in severity order. No edit step appears. | Partially supported. The procedure is proposal-only and user-started at this pin, but the file does not state a general prohibition worded “never auto self-modify.” | skill-audit/SKILL.md:74 explicitly keeps audit read-only until the user asks to implement a narrow recommendation; skills-creation owns accepted named-skill changes. Neither is a generic session retrospective. |
| domain-modeling renamed CONTEXT.md to GLOSSARY.md in v1.3 | c55ee46 package.json:3 and domain-modeling/SKILL.md:3,16,40,60-64 use CONTEXT.md. The peeled v1.3.0 tag commit 984a2c023c9fb42bb6ea40c70a652284a109dc05 has package.json:3 at 1.3.0 and domain-modeling/SKILL.md:3,16,40,60-64 plus GLOSSARY-FORMAT.md:34-58 using GLOSSARY.md/GLOSSARY-MAP.md. Current v1.3.1 at f3fc563 retains that convention. | Supported in v1.3.0 and current 1.3.1; absent at the inspected 1.2.3 pin. | Local pathfinding leaves a project glossary wherever the repo already keeps one (discuss-pathfinding/references/decisions-and-docs.md:45,59). spec-design/program-design own entity meaning and binding; local does not mandate either filename. |
| A user-invoked skill cannot invoke another user-invoked skill | [.agents/invocation.md, lines 3-10, 14-22](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/.agents/invocation.md#L3); writing-for-agents/SKILL-MECHANICS.md:5-22 | Supported explicitly: user-invoked is only human-reachable; other skills cannot call it, including through Skill tool. The front door may call a model-invoked primitive, as grill-me/SKILL.md:7 illustrates. | Partial. skills-creation/SKILL.md:33-43 models user-invocable/model-invocable reach; frontmatter-design.md:17-20 says to choose capabilities; platform-mechanics.md:12,21 provides host-specific encodings. The inspected local text does not state Matt’s explicit “no other skill can call user-invoked” invariant in the same terms. |
| The three focal mechanics are a stable shipped Matt workflow | At c55ee46 the three files are in skills/in-progress and Matt AGENTS.md:6-9 calls that bucket beta/not shipped. At current f3fc563, README.md:200-223 and .claude-plugin/plugin.json:33,39-40 list implement-spec, pr, retro in the promoted engineering plugin; package/plugin version is 1.3.1. pr/SKILL.md:4-9 still credits Humanlayer. | Refuted at pin; supported as promoted in current 1.3.1. The PR body mechanism is present in Matt’s package but attributed to Humanlayer. | Local stable owners remain distinct: Lead-authored plan/design, PR-ready-unmerged default, explicit merge authorization. |

## Local-owner comparison

These are nearest-owner matches, not equivalence claims. Every named local skill below is in the 31-skill current inventory. Parent local-quality workers own detailed local validation.

| Local skill | Nearest Matt source(s) | Relationship and local boundary |
|---|---|---|
| discuss-pathfinding | grill-me, grilling, grill-with-docs, domain-modeling | Partial: elicitation and terminology challenges are related; local pathfinding separates unwritten owner meaning from artifact authorship (SKILL.md:10-16,56-60,108-120). |
| discuss-clarify-mental-models | grilling, domain-modeling | Partial: reconvergence is related to challenge and terminology, but it repairs an already shared model rather than running Matt’s interview primitive. |
| spec-design | to-spec, domain-modeling | Partial/conflict: local Requirements and Specification are distinct and Lead-authored; Matt to-spec combines synthesis and tracker publication (spec-design/SKILL.md:10-30,49-62; to-spec/SKILL.md:7-19). |
| program-design | domain-modeling, codebase-design | Partial: both concern structural/domain language; local Program Design realizes fixed observable contracts and keeps entity meaning with Specification (program-design/SKILL.md:10-45). |
| orchestrator-design | ask-matt, grill-with-docs, to-spec | Partial: routes a bounded three-artifact design cycle, not a router for all Matt skills. It keeps design authorship with the Lead (orchestrator-design/SKILL.md:8-15,25-33). |
| plan-implementation | to-tickets, implement-spec | Partial: Lead authors a single repo-grounded proof route and PR boundaries; helpers return evidence, not plan prose (plan-implementation/SKILL.md:10,26-33). |
| implement-plan | implement, implement-spec, tdd | Partial: executes one immutable ready plan and selects proof-bearing slices; red/green is required by the plan or repo (implement-plan/SKILL.md:14,27-33). |
| orchestrator-implementation-goal | implement-spec, ask-matt | Partial/conflict: broad delivery scope overlaps, but Lead owns governing artifacts and plan, persistent Sidekicks execute assigned planned PRs, and default terminal is PR-ready-unmerged (SKILL.md:8,18-23,29-36,44). |
| manage-agents | implement-spec, code-review, research | Partial: agent assignment is present in both; local role, model, packet, and authority are governed by manage-agents and parent-owned execution boundaries, not per-ticket merger subagents. |
| implementation-review | code-review | Partial: both review code against governing meaning, but local review is sequential, rail-anchored, plan-aware, and independently owned; Matt code-review runs parallel Standards and Spec axes (implementation-review/SKILL.md:28,36,44-60; Matt code-review/SKILL.md:6-12,58-78). |
| implementation-pr-wrapup | pr | Partial/conflict: both own PR readiness mechanics, but local body is HEAD-tied and view-based, merge needs user authority, and current worktrees are preserved (SKILL.md:10,28,35-54; local-branch-state.md:26). |
| implementation-handoff | handoff, claude-handoff | Partial: local packet captures branch/diff/proof/risk and does not start a background agent; Matt handoff writes a temp file and claude-handoff launches one. |
| plan-handoff | handoff | Partial: packages an existing canonical plan; no identical source procedure. |
| spec-handoff | handoff | Partial: packages settled design context before a plan exists; no identical source procedure. |
| ops-linear-tracking | to-tickets, triage, wayfinder | Partial: Linear-specific tracking of docs, dependency relations, and blockers; Matt’s tracker-agnostic tickets and triage have different state models (ops-linear-tracking/SKILL.md:8-40). |
| debug-investigation | diagnosing-bugs | Partial: diagnosis is the shared responsibility; compare the distinct stop/proof rules before borrowing a mechanism. |
| practices-research | research | Partial/conflict: both prefer primary sources and cited findings, but local assigns the whole evidence walk to one researcher and a ledger; Matt asks a background agent to write the result (practices-research/SKILL.md:8-28; Matt research/SKILL.md:6-12). |
| plan-improve-repo | improve-codebase-architecture | Partial: both surface maintenance opportunities; local requires evidence admission and Lead-authored plans, not Matt’s HTML report-and-grill path. |
| skill-audit | retro | Partial/conflict: local is an evidence-backed portfolio decision, read-only until an explicit request to implement; Matt retro is a user-started coding-session improvement proposal. |
| skills-creation | writing-for-agents | Partial: local owns named-skill create/update/evaluate plus platform and pressure-proof mechanics; Matt writing-for-agents is a general agent-document writing reference (skills-creation/SKILL.md:90-112,114-140). |
| docs-maintain | writing-for-agents, retro | No same workflow: local reconciles settled docs; it is not a coding-session retrospective or a general writing method. |
| practices-show-me-your-work | handoff | No same procedure: local trace records decisions/evidence/outcomes, while Matt handoff packages a fresh-session prompt. |
| practices-collaboration | grill-with-docs, wayfinder | No same procedure: local discovers and tracks a work thread; Matt’s tracker/workflow calls do not establish this board/thread contract. |
| spec-program-review | code-review | Adjacent only: it reviews design artifacts, not implementation diffs or PR body state. |
| presentation-tui | pr | No direct owner: it presents decision/design comparisons on terminal surfaces, not a PR body outline. |
| presentation-webui | pr | No direct owner: it presents decision/design comparisons in rendered chat, not a PR body outline. |
| agent-collaboration | research, wayfinder | No same procedure: this is the Router tool manual; Matt’s background agents and issue tracker do not cover Router calls. |
| scaffold-project | setup-matt-pocock-skills, setup-ts-deep-modules, setup-pre-commit | Partial at generic setup level only; these source skills prescribe different repo-specific setup outputs. |
| peekaboo | prototype | No same workflow: native UI inspection/automation is distinct from throwaway logic/UI prototype design. |
| ops-observability-stack | none | No clear owner in the inspected Matt skills; this owns a shared local observability stack. |
| ops-security-review | none | No clear owner in the inspected Matt skills; this routes authorized security scans. |

## Pinned Matt-skill inventory

Every row below has a direct full read of its primary SKILL.md at c55ee46073ed923f86ce59a5eb3b6d895095d1b7. “Partial” names the nearest local responsibility, not behavioral equivalence. “No clear owner” means no active local skill owns the same workflow; an adjacent tool or skill is named when one exists.

### 1. Intake and discovery

| Matt skill and source anchor | Stage/mechanism | Nearest local skill(s) and fit | Read |
|---|---|---|---|
| [grill-me, SKILL.md#L1](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/grill-me/SKILL.md#L1) | User-invoked front door to grilling | discuss-pathfinding; partial, local extraction is scoped to owner meaning | Full |
| [grilling, SKILL.md#L6](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/grilling/SKILL.md#L6) | Decision tree, round-by-round questions, frontier, facts delegated and decisions left to user | discuss-pathfinding and discuss-clarify-mental-models; partial, different owner/repair boundaries | Full |
| [grill-with-docs, SKILL.md#L1](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/grill-with-docs/SKILL.md#L1) | Repo-anchored grilling wrapper that calls grilling and domain-modeling | discuss-pathfinding, spec-design; partial, no wrapper that automatically writes CONTEXT.md and ADRs | Full |
| [triage, SKILL.md#L7](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/triage/SKILL.md#L7) | Issue/PR intake state machine with category and status roles, verification, optional grilling | ops-linear-tracking is adjacent; no clear local triage owner | Full |
| [research, SKILL.md#L6](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/research/SKILL.md#L6) | Background agent reads primary sources and writes a cited Markdown artifact | practices-research; partial, local researcher owns the walk and evidence ledger | Full |
| [to-questionnaire, SKILL.md#L7](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/to-questionnaire/SKILL.md#L7) | Elicits what an external recipient knows and drafts them a questionnaire | no clear owner; discuss-pathfinding elicits from the owner, not a third-party send | Full |

### 2. Requirements and specification

| Matt skill and source anchor | Stage/mechanism | Nearest local skill(s) and fit | Read |
|---|---|---|---|
| [to-spec, SKILL.md#L7](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/to-spec/SKILL.md#L7) | Synthesizes current conversation into a spec and publishes it to a tracker | spec-design; partial/conflict, local separates Requirements from Specification and keeps authoring with Lead | Full |

### 3. Domain and architecture design

| Matt skill and source anchor | Stage/mechanism | Nearest local skill(s) and fit | Read |
|---|---|---|---|
| [domain-modeling, SKILL.md#L6](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/domain-modeling/SKILL.md#L6) | Active domain term/glossary and ADR maintenance, using CONTEXT.md | discuss-pathfinding, spec-design, program-design; partial, no fixed local glossary filename | Full |
| [codebase-design, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/codebase-design/SKILL.md#L8) | Deep-module vocabulary: interface, seam, depth, adapter, locality | program-design; partial, structural design overlaps but has a different domain model and artifact contract | Full |
| [prototype, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/prototype/SKILL.md#L8) | Throwaway HTML/UI artifact to answer one design question, later captured as a primary source | debug-investigation has throwaway harnesses only for diagnosis; no clear design-prototype owner | Full |

### 4. Planning and decomposition

| Matt skill and source anchor | Stage/mechanism | Nearest local skill(s) and fit | Read |
|---|---|---|---|
| [to-tickets, SKILL.md#L7](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/to-tickets/SKILL.md#L7) | User-approved tracer-bullet ticket graph with blocking edges, tracker publishing, ready frontier | plan-implementation and ops-linear-tracking; partial, local canonical plan is the truth and does not require one tracker ticket per slice | Full |
| [wayfinder, SKILL.md#L7](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/wayfinder/SKILL.md#L7) | Long-horizon shared decision map, distinct from build tasks, frontier advances as decisions resolve | plan-improve-repo, plan-implementation, ops-linear-tracking; no exact owner for the shared decision-map workflow | Full |

### 5. Implementation and testing

| Matt skill and source anchor | Stage/mechanism | Nearest local skill(s) and fit | Read |
|---|---|---|---|
| [implement, SKILL.md#L7](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/implement/SKILL.md#L7) | Implement a spec/tickets, use TDD where possible, typecheck/test regularly, review and commit | implement-plan; partial, local requires a ready canonical plan and keeps PR state separate | Full |
| [implement-spec, SKILL.md#L7](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/implement-spec/SKILL.md#L7) | Nine steps, one spec PR branch, per-ticket worktree branches, merger subagent, frontier expansion, review, cleanup | orchestrator-implementation-goal, plan-implementation, implement-plan, implementation-review, implementation-pr-wrapup; partial/conflict, local Lead-authored design/plan and explicit merge authorization differ | Full |
| [tdd, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/tdd/SKILL.md#L8) | Red-green loop at user-confirmed seams, vertical slices | implement-plan plus repo-wide testing rules; partial, no standalone local TDD skill | Full |
| [diagnosing-bugs, SKILL.md#L18](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/diagnosing-bugs/SKILL.md#L18) | Build and prove a tight red-capable bug loop before hypothesizing; minimize and regression-test | debug-investigation; partial, local is diagnosis-first but has different event, clock, runtime-proof rules | Full |

### 6. Review and delivery

| Matt skill and source anchor | Stage/mechanism | Nearest local skill(s) and fit | Read |
|---|---|---|---|
| [code-review, SKILL.md#L6](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/code-review/SKILL.md#L6) | Parallel Standards and Spec subagent reports against a fixed diff point | implementation-review; partial, local uses sequential rail/coverage passes and risk predicates | Full |
| [pr, SKILL.md#L12](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/pr/SKILL.md#L12) | Visual summary, before/after evidence, reversibility, blast radius | implementation-pr-wrapup; partial/conflict, different HEAD-tied body contract and merge authority | Full |
| [resolving-merge-conflicts, SKILL.md#L6](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/resolving-merge-conflicts/SKILL.md#L6) | Resolve intent per conflict hunk, run checks, finish operation | no clear active local skill owner for hunk-by-hunk merge conflict completion | Full |
| [setup-pre-commit, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/setup-pre-commit/SKILL.md#L8) | Installs Husky/lint-staged/typecheck/test pre-commit gate | scaffold-project is generic setup; no clear owner for this exact Husky contract | Full |

### 7. Retrospective and continuous improvement

| Matt skill and source anchor | Stage/mechanism | Nearest local skill(s) and fit | Read |
|---|---|---|---|
| [retro, SKILL.md#L7](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/retro/SKILL.md#L7) | User-requested coding-session improvement proposals across seven categories; no edit step | skill-audit and skills-creation; partial, neither is a general session retro | Full |
| [improve-codebase-architecture, SKILL.md#L9](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/improve-codebase-architecture/SKILL.md#L9) | Surfaces deep-module opportunities in a before/after HTML report, then grills the selected opportunity | plan-improve-repo; partial, local vets evidence and admits plans, no HTML report workflow | Full |

### Non-SDLC and support

| Matt skill and source anchor | Stage/mechanism / concise scope | Nearest local skill(s) and fit | Read |
|---|---|---|---|
| [ask-matt, SKILL.md#L11](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/ask-matt/SKILL.md#L11) | Global router for main flow, on-ramps, vocabulary, and standalone skills | orchestrator-design / orchestrator-implementation-goal are bounded routers only; no one local global skills router | Full |
| [wizard, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/wizard/SKILL.md#L8) | Interactive bash wizard for human-only setup/cutover steps | no clear local owner for generated human procedure scripts | Full |
| [setup-matt-pocock-skills, SKILL.md#L9](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/setup-matt-pocock-skills/SKILL.md#L9) | Configures repo issue tracker, triage labels, CONTEXT/ADR layout | scaffold-project is generic; no same per-repo workflow setup owner | Full |
| [setup-ts-deep-modules, SKILL.md#L9](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/setup-ts-deep-modules/SKILL.md#L9) | Wires dependency-cruiser rules for TS package boundaries and proves pass/fail/pass | scaffold-project is adjacent setup only; no local dependency-cruiser/deep-module owner | Full |
| [git-guardrails-claude-code, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/git-guardrails-claude-code/SKILL.md#L8) | Installs a Claude PreToolUse hook to block destructive Git commands | no active local skill owner for that Claude-specific hook | Full |
| [migrate-to-shoehorn, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/migrate-to-shoehorn/SKILL.md#L8) | Migrates TypeScript test assertions to the ShoeHorn package | no clear local owner; package-specific one-off migration | Full |
| [scaffold-exercises, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/scaffold-exercises/SKILL.md#L8) | Scaffolds course exercise folders and validates the course-specific lint | no clear local owner; course-content convention | Full |
| [claude-handoff, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/claude-handoff/SKILL.md#L8) | Summarizes context and launches a background Claude agent | implementation/spec/plan handoff skills are adjacent but do not launch sessions; partial | Full |
| [loop-me, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/loop-me/SKILL.md#L8) | Grills user to create workflow specs for personal recurring loops | no clear local owner; not software delivery | Full |
| [writing-beats, SKILL.md#L9](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-beats/SKILL.md#L9) | Builds article path one beat at a time from raw material | no clear local owner; writing workflow | Full |
| [writing-fragments, SKILL.md#L9](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-fragments/SKILL.md#L9) | Captures unstructured article fragments without imposing structure | no clear local owner; writing workflow | Full |
| [writing-shape, SKILL.md#L9](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-shape/SKILL.md#L9) | Shapes a raw-material file into a separate article | no clear local owner; writing workflow | Full |
| [handoff, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/handoff/SKILL.md#L8) | Writes a current-conversation handoff in OS temp | implementation/spec/plan-handoff skills; partial, local handoffs are phase-specific and preserve governing authority | Full |
| [teach, SKILL.md#L8](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/teach/SKILL.md#L8) | Stateful multi-session learning workspace, lesson/reference outputs | no clear local owner; teaching workflow | Full |
| [wait-what, SKILL.md#L7](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/wait-what/SKILL.md#L7) | User-invoked re-pitch using Simplified Technical English and CONTEXT.md vocabulary | discuss-clarify-mental-models is adjacent but reconciles an existing shared model; no same re-pitch owner | Full |
| [writing-for-agents, SKILL.md#L6](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/writing-for-agents/SKILL.md#L6) | General writing reference for agent-consumed docs, with leading words, information hierarchy, completion checks, and pruning | skills-creation; partial, local adapts this to named skill authoring and pressure proof | Full |

## Local active-skill correlation inventory

This is a one-row-per-local-skill relevance pass against the inspected Matt portfolio, not a full local implementation audit and not a 31-by-38 equivalence matrix.

| Active local skill | Nearest Matt source or no clear owner | Relationship |
|---|---|---|
| agent-collaboration | research, wayfinder | No same procedure; this is a Router tool manual. |
| scaffold-project | setup-matt-pocock-skills, setup-ts-deep-modules, setup-pre-commit | Partial only at generic project setup. |
| peekaboo | prototype | No same workflow; native UI testing/automation differs from design prototyping. |
| debug-investigation | diagnosing-bugs | Partial; both diagnose, with different proof and runtime rules. |
| discuss-clarify-mental-models | grilling, domain-modeling | Partial; repairs shared-model drift, not first-pass interrogation. |
| discuss-pathfinding | grill-me, grilling, grill-with-docs, domain-modeling | Partial; extracts owner meaning but keeps design authorship downstream. |
| docs-maintain | writing-for-agents, retro | No same workflow; reconciles settled docs. |
| implement-plan | implement, implement-spec, tdd | Partial; requires ready plan and slice-local proof. |
| implementation-handoff | handoff, claude-handoff | Partial; portable evidence packet vs temp file/background spawn. |
| implementation-pr-wrapup | pr | Partial/conflict; PR lifecycle and authorization differ. |
| implementation-review | code-review | Partial; local sequential rail-anchored review vs parallel two-axis review. |
| manage-agents | implement-spec, code-review, research | Partial; local authority and role model replaces generic per-ticket merger agents. |
| ops-linear-tracking | to-tickets, triage, wayfinder | Partial; Linear ticket management, not the same tracker-agnostic workflow. |
| ops-observability-stack | none | No clear owner; observability stack operations. |
| ops-security-review | none | No clear owner; authorized security scanning. |
| orchestrator-design | ask-matt, grill-with-docs, to-spec | Partial; bounded design-cycle router, not all-skill router. |
| orchestrator-implementation-goal | implement-spec, ask-matt | Partial/conflict; Lead owns design and plan, user owns material choices and merge authority. |
| plan-handoff | handoff | Partial; canonical plan packet. |
| plan-implementation | to-tickets, implement-spec | Partial; Lead-authored proof route and PR topology. |
| plan-improve-repo | improve-codebase-architecture | Partial; evidence-based findings and admission, no HTML deepening report. |
| practices-collaboration | grill-with-docs, wayfinder | No same procedure; work-thread discovery and board continuity. |
| practices-research | research | Partial; researcher owns the whole ledgered walk, not a background agent writing the result. |
| practices-show-me-your-work | handoff | No same procedure; work trace vs session handoff. |
| presentation-tui | pr | No direct PR-body owner; design-decision presentation only. |
| presentation-webui | pr | No direct PR-body owner; rendered-chat design-decision presentation only. |
| program-design | domain-modeling, codebase-design | Partial; structural How and entity binding have a stricter source boundary. |
| skill-audit | retro | Partial; portfolio audit is not session retro. |
| skills-creation | writing-for-agents | Partial; named skill authoring, platform, review, and pressure proof. |
| spec-design | to-spec, domain-modeling | Partial/conflict; distinct Requirements and Specification authorship. |
| spec-handoff | handoff | Partial; pre-plan design-context packet. |
| spec-program-review | code-review | Adjacent only; independent review of design artifacts, not implementation/PR state. |

## Version-sensitive current-head follow-up

This read-only follow-up supersedes the earlier pin-only “current remote unverified” labels for glossary naming, the implement-spec TDD step, and whether the three focal skills are promoted.

- Exact current public HEAD: f3fc5632f401156837ee3872f14fe33ccf1024ea, observed through git ls-remote. GitHub’s recursive tree at this SHA shows domain-modeling, implement-spec, pr, and retro under skills/engineering rather than the older skills/in-progress paths.
- Exact version check: current package.json:3 and .claude-plugin/plugin.json:3 both say 1.3.1. Current README.md:194 states that user-invoked skills cannot invoke another user-invoked skill; README.md:203,210,212,220,223 lists the renamed glossary and the three focal skills. Current plugin.json:33,39-40 includes implement-spec, pr, and retro.
- Exact v1.3.0 check: git ls-remote --tags returned peeled tag commit 984a2c023c9fb42bb6ea40c70a652284a109dc05. Raw package.json:3 says 1.3.0. Raw domain-modeling/SKILL.md:3,16,40,60-64 names GLOSSARY.md and GLOSSARY-MAP.md, and GLOSSARY-FORMAT.md:1,34-58 documents those paths. This verifies the rename in v1.3.0, not merely in a later unreleased guess.
- Current implement-spec/SKILL.md:11,13,21-40 explicitly names one integration branch, task graph/frontier, per-ticket worktrees, a tdd Skill call for each ticket, merger subagent, frontier expansion, code-review, and worktree cleanup. At the c55ee46 pin, the explicit TDD Skill call is absent.
- Current permalink anchors: [README invocation and promoted-skill map](https://github.com/mattpocock/skills/blob/f3fc5632f401156837ee3872f14fe33ccf1024ea/README.md#L194), [v1.3.1 plugin manifest](https://github.com/mattpocock/skills/blob/f3fc5632f401156837ee3872f14fe33ccf1024ea/.claude-plugin/plugin.json#L33), [current implement-spec](https://github.com/mattpocock/skills/blob/f3fc5632f401156837ee3872f14fe33ccf1024ea/skills/engineering/implement-spec/SKILL.md#L27), [current pr](https://github.com/mattpocock/skills/blob/f3fc5632f401156837ee3872f14fe33ccf1024ea/skills/engineering/pr/SKILL.md#L12), and [current retro](https://github.com/mattpocock/skills/blob/f3fc5632f401156837ee3872f14fe33ccf1024ea/skills/engineering/retro/SKILL.md#L15). The v1.3.0 proof is at [package version](https://github.com/mattpocock/skills/blob/984a2c023c9fb42bb6ea40c70a652284a109dc05/package.json#L3) and [domain-modeling](https://github.com/mattpocock/skills/blob/984a2c023c9fb42bb6ea40c70a652284a109dc05/skills/engineering/domain-modeling/SKILL.md#L3).
- Current pr/SKILL.md:12-33,160-170 still includes the visual summary, before/after evidence, one-way/two-way door, and blast radius. It remains credited to Dex Horthy / Humanlayer at lines 4-9.
- Current retro/SKILL.md:15-25 still has seven categories, ending in Information access. It presents candidate improvements at line 25 and contains no edit step; it does not name compaction loss as a category.
- Current README.md and plugin manifest promote the three focal skills. Therefore the pin-time beta/not-shipped finding remains true for c55ee46, while it is superseded for v1.3.1.

These targeted reads do not replace the full 38-skill pinned inventory above and do not establish coverage for the rest of the current portfolio.

## Evidence ledger

1. The pinned implement-spec flow has the described task graph, per-ticket worktrees, merger subagent, frontier refresh, PR branch review, and cleanup; TDD is not explicit in that skill.
   - state: investigated
   - class: direct observation
   - supports: core nine-step claim
   - source: pinned implement-spec/SKILL.md:7-35; implement/SKILL.md:7-15; tdd/SKILL.md:18-38
   - confidence: high

2. The PR skill has a required Summary view, before/after evidence, door field, and blast-radius field. The claim overstates runtime evidence and omits the source file’s Humanlayer credit.
   - state: investigated
   - class: direct observation
   - supports: PR-body mechanics claim
   - source: pinned pr/SKILL.md:4-9,12-33,156-168
   - confidence: high

3. The retro taxonomy is seven categories, but the seventh is information access. The file is a candidate presentation flow and has no edit step.
   - state: investigated
   - class: direct observation
   - supports: retro taxonomy and human-control claims
   - source: pinned retro/SKILL.md:7-25
   - confidence: high

4. The 1.2.3 pin uses CONTEXT.md; the exact v1.3.0 tag and current 1.3.1 HEAD use GLOSSARY.md and GLOSSARY-MAP.md.
   - state: investigated
   - class: direct observation
   - supports: the version split in the glossary-name claim
   - source: pinned domain-modeling/SKILL.md:2-3,10-40,60-64; package.json:3; git ls-tree result
   - confidence: high at both inspected versions

5. The upstream invocation invariant is explicit and the local skill-authoring surface has a close capability model, but the exact no-other-skill-calls-user-invoked rule was not found in the inspected local references.
   - state: investigated
   - class: direct observation
   - supports: invocation claim and local partial match
   - source: pinned .agents/invocation.md:3-10,14-22; local skills-creation/SKILL.md:33-43; references/frontmatter-design.md:17-20
   - confidence: high

6. Local implementation ownership is materially different from implement-spec’s delegated merge design.
   - state: investigated
   - class: direct observation
   - supports: scope/conflict comparison only
   - source: local orchestrator-implementation-goal/SKILL.md:8,18-23,29-36,44; plan-implementation/SKILL.md:10,26-33; implement-plan/SKILL.md:14,27-38; implementation-pr-wrapup/SKILL.md:28,54; references/local-branch-state.md:26
   - confidence: high

Synthesis:
- supported: current v1.3.1 implement-spec’s graph/worktree/TDD/merger/frontier/review/cleanup sequence; PR reversibility/blast-radius fields; v1.3.0 GLOSSARY rename; explicit upstream invocation boundary.
- partial: before/after evidence as universal runtime proof; human-control wording as a formal no-self-edit rule; local invocation and PR-body matches. TDD is absent from the c55ee46 pin but explicit at f3fc563.
- refuted: the retro’s seventh category is compaction loss; the source says information access at both c55ee46 and f3fc563.
- unresolved: unexamined behavior elsewhere in the current portfolio; targeted current reads establish the version-sensitive claims described above.

Do not import as local decisions: do not replace Lead-authored design and plans with the implement-spec worker/merger topology; do not infer automatic PR merge or worktree cleanup authority; do not add Matt’s body fields alongside the current local PR body contract without a separately accepted owner decision; do not turn the seven retro buckets into extra standing ceremony; do not choose a project glossary filename from this older pin. These are source/local contract comparisons for owner review, not recommendations to change the local skills.

Return Token: none: evidence complete, caller decides.
