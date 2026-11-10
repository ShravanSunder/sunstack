---
name: practices-manage-agents
description: "Use when delegating to or coordinating sidekicks or subagents (workers, helpers or implementers), including their role, form, model, handoff or return. Not for doing the assigned job."
---

# Practices: Manage Agents

Base dependency: locate `sunstack-dev:presentation-html` using the host's listed skill path; from its skill directory go up `../..` to the base plugin root. Resolve every `sunstack-dev:<name>` there as `skills/<name>/SKILL.md`, including hidden principles and domains; append reference suffixes beneath that skill. Resolve `sunstack-dev/shared-references/...` beneath that same root. Never assume the two plugin caches are adjacent.

Collaborate with other agents through a fixed structure: each job is classified, each agent has a role and a model, each work-direction call contains only role and file pointers, and each result is checked against its evidence.

The 🦁 Lead is the agent the owner talks to. It designs, plans, cuts the work, inspects, and accepts results; implementation changes belong to the Implementer. The owner decides tradeoffs, merges, and can override any pick. Other agents take jobs from the Lead, or from a Sidekick whose role skill and commission let it start helpers, and return evidence, findings, or changes; governing design and workstream sequencing stay with the Lead, while the Implementer chooses execution steps within its workstream.

## Classify

### Work levels

Work nests like a project plan. At every level the agent works in a loop: do one piece, check it against that level's check, then do the next piece or hand back. An agent can drive only as far as there is a check to verify against; if the Lead cannot name the check for a level, the job is cut smaller.

| Level | Made of | Checked against |
|---|---|---|
| Project | milestones | the owner's definition of done |
| Milestone, such as one PR | tasks | the plan's proof, then review |
| Task, such as one slice | subtasks | its acceptance check |
| Subtask, one step or one written procedure with no judgment between its steps | edits or commands | its expected result |

### Horizon

The highest work level the agent closes before handing back. Name the check that ends each job.

| Answer | The agent closes | Before handing back at |
|---|---|---|
| Subtask | one step, or one written procedure | its expected result |
| Task | one result made of subtasks | its acceptance check |
| Milestone | one deliverable made of tasks | the plan's proof |

### Direction

How much of the job the brief decides.

| Answer | The brief | Test | Then |
|---|---|---|---|
| Exact | is a procedure; nothing is left to judge | could a script run it? | only an Exact job can go to a 🔧 Operator |
| Complete | names the approach; the agent decides only details nothing else depends on | can you name the approach in one sentence? | ready to hand off |
| Partial | gives only the outcome, so the agent would choose the approach | does the job hide a design choice? | the Lead writes any design choice into the plan, since a design choice never goes to another agent; what stays Partial after that takes a Partial row in the catalog |

Missing intent or a missing plan is missing input, not Partial.

### Span

What the agent must hold in its head to get the job right. Size and module count don't change it.

| Answer | The agent must hold | Test | Then |
|---|---|---|---|
| Local | one owner's code and the contracts it uses | is reading that owner and its contracts enough? | ready to hand off |
| Cross-domain | two or more owners in one system whose shared contract must stay in step | would the change break another owner's code in this system? | write the shared contract into the plan |
| Cross-system | a contract another system consumes: an API, a wire format, stored data another system reads | does another system read what changes? | split at the system boundary if you can; once the contract is written into the plan, each side built against it is Local |

### How they fit

Horizon caps the role, direction decides whether an Operator can take the job, and direction and span pick the catalog row.

## Roles

| Role | Takes | Returns | Form | Commissioned by | Role skill |
|---|---|---|---|---|---|
| 🦁 Lead | the Project | governing design and plan, integration, acceptance | the owner's main conversation | never commissioned | `role-lead` |
| 🐒 Implementer | one planned workstream, a Milestone or Task: changes, product tests, proof and corrections | the change and its proof | Sidekick | the Lead, one per workstream | `role-implementer` |
| 🔬 Verifier / 🔎 Checker | verification: the paired Implementer’s workstream, proof challenge, verification tooling and target observation; review: an independent declared artifact and its corrections | verification observations and gaps, or independent review findings | Sidekick; review has no author history | the Lead; a review lead may commission stage Checkers for review | `role-checker` |
| 🔧 Operator | an Exact Subtask: a written procedure, a watch, a mechanical transform or a guided collection | what it observed | Subagent; Sidekick when the job needs its own session | the Lead, or a Sidekick allowed to start helpers | `role-operator` |

A **Sidekick** is a separately managed persistent session. A **Subagent** is a native child managed by its parent. Worker is a search synonym or provider-owned API term, not another v2 form. Implementer and both Checker duties always run as Sidekicks; coding subagents are helpers inside the Implementer's workstream, not alternate role seats.

An Operator makes no judgment calls: it never decides what to run, what a result means, or how to fix it. It runs the suite and reports failures, watches CI until it finishes, pushes and publishes a verified file, applies a codemod, or collects logs; it does not fix a failing test or decide whether a failure matters. Judgment it meets goes back to whoever assigned it. Tests and proof for an agent's own change stay with that agent; an Operator takes only a procedure assigned on its own, such as a suite run or a CI watch.

- **Implementer and Checker verification:** create both sessions without starting work, make each pair's address available in its governing assignment sources, then send each its role/files call. A collection subtask inside a workstream gets no pair.
- **Checker review:** never fork or resume the author's conversation; the referenced files supply the governing sources.

Delegate only independent work that costs less to hand off than to do. Work that splits into independent units (an audit, a migration, a review across files) fans out: one helper per unit, one table at the end.

Title a session `<emoji> <Role> Sidekick · <purpose>`, such as `🔬 Verifier Sidekick · packet schema`, and label a native helper by its role, such as `🔧 Operator Subagent · retry logs`.

## Model catalog

| Tier | Definition |
|---|---|
| Workhorse | procedures, repeatable work, guided execution |
| Daily driver | execution or synthesis that needs judgment |
| Frontier | demanding judgment, design, or review |

A Daily-driver row needs one recorded reason: the owner recommends it, the commissioner says what the Workhorse lacks, or the Workhorse failed after corrections. Rows marked `User must authorize` are used only when the owner names them. Thinking Effort lists the allowed range for the row. A job that matches no row is not ready: cut it until it matches one, or bring it to the owner, who can name a model. An executor the owner assigned keeps its model and effort.

Exact id: the host's row in `~/.config/agent-context/model-map.md`; otherwise the host's current-generation id for the catalog row, never an older generation or a `-fast` variant; otherwise report the gap.

### 🔧 Operator

| Tier | Model | Thinking Effort | Direction | Span |
|---|---|---|---|---|
| Workhorse | OpenAI Luna | medium | Exact | any |
| Workhorse | OpenAI Luna | high | Complete, guided collection under supplied criteria | Local |

### 🐒 Implementer Sidekick

| Tier | Model | Thinking Effort | Direction | Span |
|---|---|---|---|---|
| Daily driver | OpenAI Sol | medium | Complete | Cross-domain |
| Daily driver | Claude Opus | medium | Complete | Cross-domain |
| Daily driver | OpenAI Sol | high to xhigh | Partial | Cross-domain, Cross-system |
| Daily driver | Claude Opus | high to xhigh | Partial | Cross-domain, Cross-system |

### 🔬 Verifier Sidekick: verification

| Tier | Model | Thinking Effort |
|---|---|---|
| Daily driver | OpenAI Sol | high to xhigh |
| Daily driver | Claude Opus | high to xhigh |

Choose a different lineage from the paired Implementer when one is available. A missing eligible route is a named gap, never a reason to drop the Verifier.

### 🔎 Checker Sidekick: review

Checkers review each Project and Milestone, never a single Task or Subtask. Design and proposal reviews happen where their owning phase says and use the same reviewers. Every review has at least one reviewer from a different lineage (OpenAI, Claude, xAI) than the Lead or author.

| Tier | Model | Thinking Effort | Use |
|---|---|---|---|
| Daily driver | xAI Grok | high | |
| Daily driver | OpenAI Sol | xhigh | |
| Daily driver | Claude Opus | xhigh | |
| Frontier | OpenAI Astra | high to xhigh | User must authorize |

Beyond the rows above, another Checker joins only when the owner asks for one and names its model.

### 🦁 Lead

The owner chooses the Lead's model. Nothing here escalates it.

## Work with an agent

Classify the job (the Examples show how), pick its role and model rows, then launch, hand off, wait, and check the result's evidence against its claim. The Lead gives the overall verdict.

### Launch

MUST load `references/execution-forms.md` and return the route, lifecycle and history boundary for the chosen form.

### Hand off

The commissioner selects the role and reachable governing files. The recipient loads its own preamble and resolves its assignment; no newly fabricated full-packet file is required.

1. MUST load `schemas/delegated-agent-call.ts` and return a valid `DelegatedAgentCall`: exactly `role` (implementer, checker or operator) and `files` (nonempty file pointers). Send only that object as work-direction content, for initial work, continuations and corrections. No appended preamble, inline packet, expected answer or task paraphrase. Use the transport's documented encoding; model, effort, identity, access configuration and correlation remain separate launch/tool metadata.
2. MUST load `sunstack-dev:practices-preflight` for launch access/capability checks and return `ready` or launch gaps. A current preflight for the same context counts. Preserve its evidence in the governing sources; role-specific startup reads and resolved-context validation belong to the recipient. Hold work blocked by a launch gap.
3. The Lead establishes workstreams, dependencies, sequencing, scope and completion conditions; the Implementer decides execution steps. Ensure existing governing files establish task scope, permissions, pair addresses, Checker duty and ending checks. When two jobs could write the same file, branch or service state, place their isolation or ordering in the governing plan/assignment source. Do not infer missing authority or reconstruct the old full packet merely to satisfy this call format.
4. Send the two-field content to the selected real address. Each recipient loads `role-<role>` in full and its role entry loads `references/recipient-startup.md` under this skill; the recipient resolves and validates the rich context with the existing role schema. Lead's own entry/continuation is not a delegated Lead appointment.

Native coding helpers receive a bounded task/source context through the host interface under their parent Implementer, not a separate role/files commission or standalone role packet. For delegated role drift or correction, update or select the governing correction/review file and send the same role/files shape to the same agent; do not restart it or append inline directions. Helper reports and direct pair setup/observations retain their existing result and exchange contracts. A local schema is a source contract, not Router interception or permission enforcement.

### Check the result

Before using a handback, open the decisive diff and evidence, match them to its scope and target, and return unsupported claims as gaps. The parent Implementer inspects native helper changes and owns integration and proof; child completion alone is not a proven workstream. Use the existing work record without adding another helper-by-helper row audit here; unchanged base logging/audit duties still apply. Only the Lead accepts the implementation, after required proof, through `role-lead`'s acceptance procedure and before independent delivery review.

## Examples

MUST load `references/delegation-examples.md` and return the six steps (direction, span, horizon, cut, role and form, catalog row) written for this job.

## Completion

Done when the helper's role, form and model rows are chosen with any reason their rows require, its role/files call points to current governing and preflight sources at a real address, the recipient resolved its concrete context or returned exact gaps, and its handback was matched to evidence, with unresolved proof, prerequisites and HOLDs carried to their owners.

## Source integration limit

Base preflight and verification practices still contain v1 delegation callbacks. Referencing those practices does not close v2 runtime integration. Installation and runtime activation wait for a separately scoped base compatibility change.
