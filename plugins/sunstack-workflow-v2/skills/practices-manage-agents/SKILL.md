---
name: practices-manage-agents
description: "Use when delegating to or coordinating sidekicks or subagents (workers, helpers or implementers), including their role, form, model, handoff or return. Not for doing the assigned job."
---

# Practices: Manage Agents

Base dependency: locate `sunstack-dev:presentation-html` using the host's listed skill path; from its skill directory go up `../..` to the base plugin root. Resolve every `sunstack-dev:<name>` there as `skills/<name>/SKILL.md`, including hidden principles and domains; append reference suffixes beneath that skill. Resolve `sunstack-dev/shared-references/...` beneath that same root. Never assume the two plugin caches are adjacent.

One accountable parent owns each result. Lead supplies design docs and a plan of workstreams, contracts, dependencies, sequencing and completion conditions. Implementer chooses implementation steps and integrates the changes; Verifier owns critical verification. Both may use bounded native subagents and must inspect their results. Lead accepts only after required proof, before outside review.

Choose the assignment and model, launch through the formal or native route, then inspect the evidence. Role defines responsibility; form defines conversation lifecycle; neither widens a grant.

## Bound the assignment

### Work levels and horizon

Horizon is the highest level closed before handback. Name its ending check; when no check can be named, cut the job smaller.

| Level                     | Made of                      | Ending check               |
| ------------------------- | ---------------------------- | -------------------------- |
| Project                   | milestones                   | owner's definition of done |
| Milestone, such as one PR | tasks                        | plan's proof, then review  |
| Task                      | subtasks                     | assigned acceptance check  |
| Subtask                   | edits or prescribed commands | expected result            |

### Task guidance

| Value            | What the agent does                                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exact Steps      | Follow the supplied procedure or collection criteria and allowed branches; return observations and exceptions.                                     |
| Designed Outcome | Implement the governing design docs within agreed contracts, constraints and grant; choose detailed implementation steps, tests and decomposition. |

Missing requirements or a design contradiction return to Lead with evidence. Designed Outcome grants implementation judgment, not permission to change agreed behavior, ownership or contracts. Implementation assignments use Designed Outcome; Operator always uses Exact Steps. Verification and review have no task-guidance selector.

### Span

| Span         | What must be understood together                            |
| ------------ | ----------------------------------------------------------- |
| Local        | one owner's code and the contracts it uses                  |
| Cross-domain | multiple owners and their shared contract inside one system |
| Cross-system | a contract or interaction consumed across systems           |

Classify the actual assignment. A Cross-system parent may give a helper a Local piece, but still owns cross-system integration and proof. Read catalog spans literally, not as maximum-scope ceilings. Size, file count and a written contract alone do not make integrated work Local.

## Roles and forms

| Role                     | Responsibility                                                                                                                | Form                           | Role skill         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------ |
| 🦁 Lead                  | design, workstream plan, integration judgment and acceptance                                                                  | owner's main conversation      | `role-lead`        |
| 🐒 Implementer           | one planned workstream's changes, product tests, repairs and combined proof                                                   | Sidekick                       | `role-implementer` |
| 🔬 Verifier / 🔎 Checker | verification: paired proof challenge, apparatus and target observation; review: independent declared artifact and corrections | Sidekick                       | `role-checker`     |
| 🔧 Operator              | Exact Steps: prescribed execution, watch, transform or collection                                                             | Subagent; Sidekick when needed | `role-operator`    |

A **Sidekick** is a persistent separately managed session. A **Subagent** is a native child managed by its parent. Worker is only a search/provider synonym. Implementer and both Checker duties remain Sidekick-only; their native tasks do not appoint extra role seats or require standalone role packets, traces or Verifier pairs.

Lead commissions the owning pair. Create both sessions before starting work, make their addresses available in the governing sources, then send each its role/files call. They exchange setup, reproductions, repairs and rechecks directly. Review stays outside that loop and uses a session with no target-authoring history. A review lead may commission stage Checkers under its review procedure.

An Operator reports observations; its actual commissioner interprets them and owns any repair. Supplied collection criteria may label candidates with uncertainty, but deciding owner intent or product correctness is not collection. Delegate prescribed support when the inexpensive execution is worth the handoff. Proof associated with an agent's own changes remains that agent's responsibility.

Title formal sessions `<emoji> <Role> Sidekick · <purpose>` and Operator native tasks `🔧 Operator Subagent · <purpose>`. Name other native children for their bounded task, without appointing them Implementer/Checker roles.

## Model catalog

Use these owner-selected model/effort rows for both owning Sidekicks and bounded native tasks. Select by the task's responsibility and actual span, within the parent grant and host capability. An already assigned Sidekick retains its model/effort. If no row or supported route fits, return the gap instead of silently substituting or creating another primary session. The owner may name an override; Lead's model remains owner-chosen.

Workhorse means prescribed or bounded execution; Daily driver means execution requiring judgment; Frontier is demanding judgment and grants no additional model eligibility. The owner's selections below supply the reason for using these rows.

Resolve the exact id through the host's row in `~/.config/agent-context/model-map.md`, otherwise its advertised current-generation id; never pick an older generation or a `-fast` variant. Report an unavailable id or effort.

### 🔧 Operator

Always **Exact Steps**. No span selector.

| Model       | Thinking effort |
| ----------- | --------------- |
| OpenAI Luna | high            |

### 🐒 Implementation

Every row takes a **Designed Outcome**. A child uses its own task's span, not the whole parent's deliverable.

| Model        | Thinking effort | Span                       |
| ------------ | --------------- | -------------------------- |
| OpenAI Terra | high            | Local                      |
| OpenAI Sol   | medium          | Cross-domain               |
| OpenAI Sol   | high            | Cross-domain, Cross-system |
| Claude Opus  | medium          | Cross-domain               |
| Claude Opus  | high            | Cross-domain, Cross-system |

### 🔬 Verification

Route by system span, without task-guidance classification.

| Model        | Thinking effort | System span         |
| ------------ | --------------- | ------------------- |
| OpenAI Terra | high            | Local, Cross-domain |
| OpenAI Sol   | medium          | Cross-domain        |
| OpenAI Sol   | high            | Cross-system        |

Prefer a different lineage from Implementer when an eligible route is available; name its absence without dropping verification. The owner currently selects no Opus verification row.

**Browser and computer control:** Terra and Sol are preferred for this work when the listed scope, effort and actual tools fit; Terra high is particularly useful for UI/browser verification. This routing preference grants no browser, desktop or write access.

### 🔎 Independent review

Review Project/Milestone artifacts and affected corrections, not every private implementation task. Design/proposal review follows its owning procedure. Every review needs at least one different-lineage reviewer from Lead/author; report unavailable coverage instead of claiming it.

| Model       | Thinking effort |
| ----------- | --------------- |
| OpenAI Sol  | high            |
| Claude Opus | high            |

## Launch and hand off

MUST load `references/execution-forms.md` and return the supported route, lifecycle and history boundary, with the formal role/model or native task/model/grant. Use its host-specific instructions; an unavailable model, tool or isolation is a capability gap, not authority to widen access.

### Formal role commissions

1. MUST load `schemas/delegated-agent-call.ts` and return a valid `DelegatedAgentCall`: only `role` (implementer, checker or operator) and nonempty `files`. Send this shape for initial work, continuations and corrections. Keep model, effort, identity, access and correlation in launch/tool metadata; append no preamble, task paraphrase or expected answer.
2. MUST load `sunstack-dev:practices-preflight` and return launch readiness or exact gaps before starting dependent work; an unchanged current preflight counts. Existing governing sources establish scope, actual grants, pair addresses, Checker duty, stop condition and ending checks. Record isolation or ordering when jobs share writes or service state; no new serialized full-packet file is required.
3. Send role/files to the actual address. Each recipient reads its role and current files, then resolves/validates context through `references/recipient-startup.md` and its existing schema. Missing or conflicting authority is returned, not inferred. Correct the current governing files and continue the same session; do not replay completed effects merely because a call repeats.

Reports and direct pair exchanges retain their contracts; they are not replacement work-direction calls. Schemas validate shape, not permissions or Router interception.

### Parent-owned native tasks

Implementer and Verifier may decompose independent work without per-child Lead approval or an arbitrary child count. Use a child when its task can be checked independently and the handoff is worthwhile; keep tightly coupled edits with the parent. Give relevant sources, task guidance where applicable, allowed paths/commands, isolation or ordering and an ending check. Choose the model/effort from the relevant catalog and supported host controls; do not paste the catalog or manufacture a formal role packet for the child.

The parent's grant bounds every child. Implementer owns product changes/tests and combined integration proof; Verifier owns permitted observations/apparatus, never product repairs, an altered oracle or independent proof of its own implementation. Keep held-out cases from implementation authors. Parallel checks need isolated fixtures/evidence when they mutate the same state. Host limits still apply; Luna remains Operator-only.

## Check the result

Open decisive changes and evidence, match them to the assigned scope and actual target, and return unsupported claims as gaps. Each parent inspects its children's results and proves or assesses the combined outcome; a child completion never closes the workstream. Use the existing work record and base logging duties, without a second helper census. Lead authors its own acceptance after required proof and before independent delivery review; a Reviewer never fills missing Lead acceptance.

IF uncertainty remains about a task cut, model fit or responsibility boundary, load `references/delegation-examples.md` and return the matching case and what it changes for this assignment.

## Completion

A formal commission has an eligible role/form/model, current governing/preflight sources at the actual address, recipient-resolved context or exact gaps, and an evidence-checked handback. A native task has a bounded assignment, eligible model/effort, supported history/access route and a parent-inspected integrated result or owned gap. No standalone native role packet, trace or Verifier pair is required. Carry unresolved proof, prerequisites and HOLDs to their responsible owners.

## Source integration limit

Base preflight and verification still route delegation to v1. This source update does not establish runtime integration; installation and activation remain blocked pending the separately scoped base compatibility change.
