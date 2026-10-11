---
name: manage-agents
description: "Always use when delegating to subagents, agent teams, or parallel agents: choosing which role, agent and model take a job, or spawning, assigning, steering, resuming, waiting for, or checking an Implementer, Verifier, Reviewer, Advisor, Worker or Operator, including a fan-out across many units."
---

# Manage Agents

A role is a job with one result. Pick the role by the job; the role table says how it runs, and the catalog row gives its model. Every handoff carries the role's charter, and every result is checked against its evidence, never forwarded.

The 🦁 Lead is the agent the owner talks to. It designs, plans, cuts the work, and decides acceptance. The owner decides tradeoffs, merges, and can override any pick. Every other role takes a job and hands back evidence, findings, or changes; none writes the design or the plan.

## Roles

| Role | Job | Runs as |
|---|---|---|
| 🦁 Lead | designs with the owner, writes every design document, plans, sequences workstreams, checks the evidence, and decides acceptance | the session the owner talks to |
| 🐒 Implementer | builds from Program Design and Test Design, with its own proof | Sidekick session, one per workstream |
| 🔬 Verifier | proves the delivered behavior independently from Verification Design, on the real surface, and reports | Sidekick session, paired with the Implementer for the workstream |
| 🔎 Reviewer | independent findings: design review, or implementation review of code and test quality | fresh Sidekick session with no author history |
| 🦉 Advisor | challenges framing, assumptions, references, and interpretation, only when the owner asks | Sidekick session |
| 🛠️ Worker | one bounded result with its proof, including research | native subagent |
| 🔧 Operator | one prescribed procedure, with its observations and exit codes | native subagent |

A Sidekick session is how a role runs when it needs its own continuing context; it is not a role.

- Only the Lead starts a role that runs as its own session: Implementer, Verifier, Reviewer, and Advisor. Any role may start Workers and Operators for its own job.
- Workers and Operators are always native subagents. When the host has no native model for their catalog row, pick another native row or return the capability gap.
- The Implementer and Verifier are peers on one workstream. They share facts directly: how to run it, where to observe, what changed, a failing case. A change to expected results or to the reference goes to the Lead.
- The Verifier runs on a different model lineage from its Implementer when the catalog has a row for it.
- Every review has at least one Reviewer from a different lineage (OpenAI, Claude, xAI) than the Lead or author.

## Workflow

1. **Classify the job** (below). Done when: direction, span, and horizon are named, and so is the check that ends the job.
2. **Pick the role by its job.** The result the job must produce picks the role, and the role table then gives its runtime. Done when: one role is named, or the workstream's Implementer–Verifier pair, and its job matches what is being asked.
3. **Pick the model** from that role's catalog. Done when: the runtime the role table gives and the catalog row are named, with the recorded reason when a Daily-driver row is used.
4. **Launch and hand off with the charter.** MUST load `references/role-charters.md` and return the charter text for the role. MUST load `references/agent-job-packet.md` and return the packet with that charter at the top, plus the session row when the role runs in its own session. Done when: the packet has its charter, outcome, sources, limits, stop, and return. The same charter opens every correction and resume of that role.
5. **Check the result against its evidence.** Open the files, exit codes, and diff scope the result claims. Done when: each claim is matched to evidence you opened, or sent back with the gap. For the Lead, a report is input to its decision, never the decision.

MUST load `references/delegation-examples.md` and return the six steps (direction, span, horizon, cut, role, catalog row) written for this job.

**Completion boundary.** A delegation is done when the role, runtime, model, charter, and packet are named; the result has been checked against evidence the checker opened; and anything unproven has gone back to its owner with the gap.

## Classify

### Work levels

Work nests like a project plan. At every level the agent works in a loop: do one piece, check it against that level's check, then do the next piece or hand back. An agent can drive only as far as there is a check to verify against; if the Lead cannot name the check for a level, the job is cut smaller.

| Level | Made of | Checked against |
|---|---|---|
| Project: one Lead, its design and plan | workstreams | the owner's definition of done |
| Workstream: one PR or a PR stack, one Implementer–Verifier pair | tasks | the Verifier's report and the plan's proof, then review |
| Task: one PR | subtasks | its acceptance check |
| Subtask: one step, or one written procedure with no judgment between its steps | edits or commands | its expected result |

### Horizon

The highest work level the agent closes before handing back. Name the check that ends each job.

| Answer | The agent closes | Before handing back at |
|---|---|---|
| Subtask | one step, or one written procedure | its expected result |
| Task | one PR made of subtasks | its acceptance check |
| Workstream | one PR or PR stack made of tasks | the Verifier's report and the plan's proof |

| Role | Horizons it can take |
|---|---|
| 🦁 Lead | Project |
| 🐒 Implementer, 🔬 Verifier | Workstream, through its Tasks |
| 🛠️ Worker | Subtask, or a Task when that Task is one bounded result |
| 🔧 Operator | Subtask, only an Exact one |

The 🔎 Reviewer reviews a workstream's delivery or a design set; the 🦉 Advisor answers the owner's question.

### Direction

How much of the job the brief decides.

| Answer | The brief | Test | Then |
|---|---|---|---|
| Exact | is a procedure; nothing is left to judge | could a script run it? | only an Exact job can go to a 🔧 Operator |
| Complete | names the approach; the agent decides only details nothing else depends on | can you name the approach in one sentence? | ready to hand off |
| Partial | gives only the outcome, so the agent would choose the approach | does the job hide a design choice? | the Lead writes any design choice into the plan, since a design choice never goes to another agent; what stays Partial after that, an approach inside choices nothing else builds on, takes the Partial row of the 🐒 Implementer catalog when it crosses domains or systems |

Missing intent or a missing plan is missing input, not Partial.

### Span

What the agent must hold in its head to get the job right. Size and module count don't change it.

| Answer | The agent must hold | Test | Then |
|---|---|---|---|
| Local | one owner's code and the contracts it uses | is reading that owner and its contracts enough? | ready to hand off |
| Cross-domain | two or more owners in one system whose shared contract must stay in step | would the change break another owner's code in this system? | write the shared contract into the plan |
| Cross-system | a contract another system consumes: an API, a wire format, stored data another system reads | does another system read what changes? | split at the system boundary if you can; once the contract is written into the plan, each side built against it is Local |

Horizon caps the role. Direction decides whether an Operator can take the job and picks its catalog row. Direction and span pick that role's catalog row.

## Model Catalog

### Tiers

| Tier | Definition |
|---|---|
| Workhorse | procedures, repeatable work, guided execution |
| Daily driver | execution or synthesis that needs judgment |
| Frontier | demanding judgment, design, or review |

A Daily-driver row needs one recorded reason: the owner recommends it, the Lead says what the Workhorse lacks, or the Workhorse failed after corrections. Rows marked `User must authorize` are used only when the owner names them. Thinking Effort lists the allowed range for the row. A job that matches no row is not ready: cut it until it matches one, or bring it to the owner, who can name a model.

### 🔧 Operator

| Tier | Model | Thinking Effort | Direction |
|---|---|---|---|
| Workhorse | OpenAI Luna | medium | Exact |
| Workhorse | Claude Haiku | medium | Exact |

### 🛠️ Worker

| Tier | Model | Thinking Effort | Direction | Span |
|---|---|---|---|---|
| Workhorse | OpenAI Luna | high | Exact | Local |
| Workhorse | Claude Haiku | high | Exact | Local |
| Daily driver | OpenAI Sol | medium | Complete | Cross-domain |
| Daily driver | Claude Opus | medium | Complete | Cross-domain |

No Worker row covers Complete · Local work, the usual shape of code-reading research. Until the owner adds one, the Lead reads it itself or the owner names a model.

### 🐒 Implementer

| Tier | Model | Thinking Effort | Direction | Span |
|---|---|---|---|---|
| Workhorse | OpenAI Luna | xhigh | Exact, Complete | Local |
| Workhorse | OpenAI Luna | high | Exact, Complete | Local |
| Daily driver | OpenAI Sol | high to xhigh | Partial | Cross-domain, Cross-system |
| Daily driver | Claude Opus | high to xhigh | Partial | Cross-domain, Cross-system |

### 🔬 Verifier

| Tier | Model | Thinking Effort | Use |
|---|---|---|---|
| Daily driver | OpenAI Sol | high to xhigh | when the Implementer is not OpenAI |
| Daily driver | Claude Opus | high to xhigh | when the Implementer is not Claude |

### 🔎 Reviewer

Implementation review comes after the 🦁 Lead has checked the work against the plan and its proof, asking the 🦉 Advisor to check it too when one exists. Reviewers then review a workstream's delivery, never a lone Task or Subtask outside it; a one-PR workstream is reviewed as that workstream. Design and proposal reviews happen where their owning phase says and use the same reviewers.

| Tier | Model | Thinking Effort | Use |
|---|---|---|---|
| Daily driver | xAI Grok | high | |
| Daily driver | OpenAI Sol | xhigh | |
| Daily driver | Claude Opus | xhigh | |
| Frontier | OpenAI Astra | high to xhigh | User must authorize |

Beyond the rows above, another reviewer joins only when the owner asks for one and names its model.

### 🦉 Advisor

| Tier | Model | Thinking Effort | Use |
|---|---|---|---|
| Daily driver | OpenAI Sol | xhigh | |
| Daily driver | Claude Opus | xhigh | |
| Frontier | OpenAI Astra | xhigh | User must authorize |
| Frontier | Claude Fable | high | User must authorize |

## Launch

Workers and Operators run as native subagents. Implementers, Verifiers, Reviewers, and Advisors run in their own sessions; reuse a session by its address, and keep the model and effort it was created with.

Exact id: the host's row in `~/.config/agent-context/model-map.md`; otherwise the host's current-generation id for the catalog row, never an older generation or a `-fast` variant; otherwise report the gap.

- IF the role runs in its own session, load `agent-collaboration` and return the session address, whichever route below started it.
- IF Codex spawns it, load `references/native-providers-codex.md` and return the spawn encoding.
- IF Claude spawns it, load `references/native-providers-claude.md` and return the spawn encoding.
- IF Cursor spawns it, load `references/native-providers-cursor.md` and return the spawn encoding.
- IF the host has no native model for a session role's row, run it through agent-router instead. This fallback never applies to Workers or Operators.
- IF agent-router cannot meet a session role's model, effort, access, or title, load `references/acpx-legacy.md` and return the route. An access denial needs the grant, not a route switch.
- IF building or wrapping an ACP adapter, load `references/building-acp-adapters.md` and return its checklist.

Title every non-Lead thread `<emoji> <role> · <purpose>`. A Reviewer gets no author history: no fork, no resume; its packet carries the sources. When an agent drifts, send it a correction with its charter; don't restart it.

Delegate only independent work that costs less to hand off than to do. Work that splits into independent units (an audit, a migration, a review across files) fans out: one Worker per unit, one table at the end.
