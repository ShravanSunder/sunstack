---
name: practices-manage-agents
description: "Use when delegating to subagents, agent teams or parallel agents: the Lead or an authorized helper chooses an Advisor, Implementer, Verifier, Reviewer, Researcher or Operator, its valid Worker or Sidekick form, and model; or spawns, commissions, continues, steers, waits for, monitors, verifies or assesses that work, including a fan-out across many units. Not for performing the assigned engineering phase itself."
---

# Practices: Manage Agents

Every helper is described by four things, and each answers a different question. Its **role** says which result it owns and which decisions it may make. Its **execution form** says how its conversation is managed. Its **assignment**, a typed job packet, says what it is doing now, from which sources and under which grant. Its **model** is the capacity the job needs. Keeping them apart lets one charter teach a role however it runs, and lets the Lead tell implementation, observation, review and advice apart when the evidence comes back.

The 🦁 Lead is the agent the owner talks to. It designs, plans, cuts the work, commissions the roles below, and accepts results. The owner decides one-way-door tradeoffs and merges and can override any pick. No helper writes the governing design or plan, and no form, title or board seat grants that authority.

A role composes methods; it doesn't choose a lifecycle. The caller selects the phase or procedure, and the packet carries it. Practices teach how to do recurring work, principles sharpen judgment at a decision, and each role's charter names the ones its decisions depend on.

## Roles and forms

A **Worker** is a native subagent its parent manages, kept through the bounded job's corrections. A **Sidekick** is a separately managed session, addressed and reused across related work. A native Worker may have its own thread id; the difference is who manages it and how long it lives. In a title, "Sidekick" names the form and the role names the responsibility.

| Role | Owns | Form | Charter |
|---|---|---|---|
| 🦁 Lead | governing design and plan, integration, acceptance | the owner's main conversation | `references/roles/lead.md` |
| 🦉 Advisor | a competing picture, its evidence and tradeoffs, when the owner asks for one | always Sidekick | `references/roles/advisor.md` |
| 🐒 Implementer | assigned changes, their product tests and associated proof | always Sidekick | `references/roles/implementer.md` |
| 🔬 Verifier | independent observation of the adopted outcome, paired with each Implementer | always Sidekick | `references/roles/verifier.md` |
| 🔎 Reviewer | independent findings on a declared artifact, and correction checks | always Sidekick, with no author history | `references/roles/reviewer.md` |
| 📚 Researcher | a checked answer to a supplied question | Worker for one bounded question; Sidekick for a continuing investigation, or a bounded one whose model needs Router | `references/roles/researcher.md` |
| 🔧 Operator | observations from a prescribed procedure or a guided collection | Worker by default; Sidekick when the job needs a separately managed session | `references/roles/operator.md` |

Title a session `<emoji> <Role> Sidekick · <purpose>`, such as `🔬 Verifier Sidekick · packet schema`. Label a native helper by its role too, such as `📚 Researcher Worker · retry policy`. An existing correct name needs no rewrite.

The fixed forms above win over convenience. Feature code and its proof stay with the Implementer Sidekick. A native Worker collects evidence, answers one bounded research question, or runs a prescribed operation; being cheap gives it no implementation, architecture or acceptance authority.

A **workstream** is the bounded implementation assignment the Lead's plan or commission names, closed by its declared proof; usually a Milestone made of Tasks. The Lead pairs one Verifier with each Implementer for its workstream. A collection subtask inside the workstream gets no pair of its own.

## Main path

1. **Cut and classify the job.** When you can't state the owner's result in one sentence from the plan or commission, settle that sentence and its assumption, or name the owner question that blocks it, before cutting ([build the shared model first](../principle-build-the-shared-model-first/SKILL.md)). Name the bounded result, its closing check, and its direction, span and horizon from Classify. If one job would both build its own result and review or accept it, or both collect and interpret evidence, split it and give each job the check that closes it. Missing intent, contract, plan or grant is a gap to fill, not a Partial direction. MUST load `references/delegation-examples.md` and return the closest example's cut applied to this job. Report the cut to the owner, not the classification.
   Completion: the bounded result, its closing check, direction, span, horizon and the cut are named, or the blocking gap is reported.
2. **Choose the role, then the form.** Pick the role by the result it owns in the table. The Lead commissions Advisor, Implementer, Verifier and Reviewer Sidekicks. A Sidekick whose charter grants management may commission bounded Operator or Researcher help for its own job. A native Worker returns further decomposition to its parent.
   Completion: the role and form are named, and the form is one the table admits.
3. **Resolve an eligible model** from the catalog for that role, form and classified job, with any recorded reason the tier requires.
   Completion: one row matches. If none does, cut the job until one matches or report the capability or policy gap; never improvise a frontier pick or change the Lead's model.
4. **Load the role prompt.** MUST load the selected role's charter from the table and return its ready opening and default reads. The commissioner and the recipient each read that charter in full. IF you are the Lead starting qualifying management work, load `references/roles/lead.md` and return its acceptance stance and the reads it applies.
   Completion: the charter has been read in full, and its opening and default reads are in hand.
5. **Choose the route for the form.** MUST load `references/execution-forms.md` and return the supported route, lifecycle and history boundary for the chosen form, before creating, reusing or dispatching any helper.
   Completion: the route, lifecycle and history boundary are chosen, and for a Sidekick an existing session was looked for and reused if found.
6. **Write the commission.** MUST load `references/agent-job-packet.md` and return the filled commission for the selected role. When two jobs would write the same file, fixture, branch or service state, or one needs the other's unfinished output, name the shared resource and the ordering that breaks it, and write the isolation or wait into each packet's limits ([design for concurrency](../principle-design-for-concurrency/SKILL.md)). For an Implementer and Verifier pair, create or reuse both Sidekick sessions without dispatching work, get their real addresses, fill both packets so each references the other, then dispatch both. Host settings go in the tool's own arguments; packet text grants nothing.
   Completion: the packet is complete and went to a real address. A packet missing its outcome, sources, limits or closing condition doesn't go out.
7. **Continue and assess.** At assignment, after a correction that changes the job and on resume, the helper rereads its charter, commission, trace and the sources they name, and checks its role boundary before handing back. Send a drifting agent a correction instead of restarting it. When a helper repeats a gap after a correction, or its result contradicts the plan's premise, find the premise the attempts shared and decide drift (correct the packet) or break (back to the plan or owner) before another correction or a higher tier ([refine mental models](../principle-refine-mental-models/SKILL.md)). Before using a handback claim, match it to the commit, target and output you opened, or name it as a gap ([verify before accepting](../principle-verify-before-accepting/SKILL.md)). A green run that exercised a different component, or another helper's checkout, doesn't close the job. When a handback returns a change, mark each outcome and limit line of the commission carried, weakened or dropped, and trace each addition to the plan or return it as an owner question ([hold the scope](../principle-hold-the-scope/SKILL.md)). Return a specific gap or a scoped result to whoever commissioned it.
   Completion: every claim used is matched to evidence or returned as a gap. Only the Lead accepts delivery.

Delegate only independent work that costs less to hand off than to do. Units that each have their own fixture and output and wait on no other unit (an audit, a migration, a review across files) fan out: one helper per unit, one table at the end.

## Classify

### Work levels

Work nests like a project plan. At every level the agent works in a loop: do one piece, check it against that level's check, then do the next piece or hand back. An agent can drive only as far as there is a check to verify against; if the Lead can't name the check for a level, the job is cut smaller.

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

Horizon limits the role; it doesn't pick it.

| Role | Horizons it can take |
|---|---|
| 🦁 Lead | Project |
| 🐒 Implementer Sidekick | Milestone, Task, Subtask |
| 🔬 Verifier Sidekick | its paired Implementer's workstream |
| 🔎 Reviewer Sidekick | a Project or a Milestone, through its corrections |
| 📚 Researcher | Task or Subtask as a Worker; related questions across a Milestone as a Sidekick |
| 🔧 Operator | Subtask: one procedure or one bounded collection |
| 🦉 Advisor | the owner's question |

### Direction

How much of the job the brief decides.

| Answer | The brief | Test | Then |
|---|---|---|---|
| Exact | is a procedure; nothing is left to judge | could a script run it? | an Operator can take it |
| Complete | names the approach; the agent decides only details nothing else depends on | can you name the approach in one sentence? | ready to hand off; an Operator can take Complete · Local collection under supplied criteria, returning candidates |
| Partial | gives only the outcome, so the agent would choose the approach | does the job hide a design choice? | the Lead writes any design choice into the plan, since a design choice never goes to another agent; what stays Partial after that, an approach inside choices nothing else builds on, takes the Partial row of the 🐒 Implementer Sidekick catalog when it crosses domains or systems |

Missing intent or a missing plan is missing input, not Partial.

An Operator makes no engineering judgment: it doesn't decide what to run, what a result means, or how to fix it. It runs the suite and reports failures, watches CI until it finishes, publishes a verified file, applies a codemod, collects logs, or extracts excerpts and labels under the criteria it was given. What it labels stays a candidate; the Researcher or the commissioning role decides what it means. Tests and proof for an agent's own change stay with that agent; an Operator takes only a procedure assigned on its own, such as a suite run or a CI watch.

### Span

What the agent must hold in its head to get the job right. Size and module count don't change it.

| Answer | The agent must hold | Test | Then |
|---|---|---|---|
| Local | one owner's code and the contracts it uses | is reading that owner and its contracts enough? | ready to hand off |
| Cross-domain | two or more owners in one system whose shared contract must stay in step | would the change break another owner's code in this system? | write the shared contract into the plan |
| Cross-system | a contract another system consumes: an API, a wire format, stored data another system reads | does another system read what changes? | split at the system boundary if you can; once the contract is written into the plan, each side built against it is Local |

### How they fit

Horizon caps the role. Direction decides whether an Operator can take the job. Direction and span pick the role's catalog row.

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

### 📚 Researcher

| Tier | Form | Model | Thinking Effort | Direction | Span |
|---|---|---|---|---|---|
| Workhorse | Worker, or a Sidekick when the model needs Router | OpenAI Luna | high | Complete | Local |
| Daily driver | Worker | OpenAI Sol | medium | Complete | Cross-domain |
| Daily driver | Sidekick, continuing investigation | OpenAI Sol | high to xhigh | Complete, Partial | Local, Cross-domain, Cross-system |

A Researcher Sidekick started only because its model needs Router keeps the bounded job's row and closing check, with no fan-out of its own. A continuing Researcher Sidekick may use Luna Operators or Researcher Workers for collection. Opus is not a research row; it needs the owner's override.

### 🐒 Implementer Sidekick

| Tier | Model | Thinking Effort | Direction | Span |
|---|---|---|---|---|
| Workhorse | OpenAI Luna | xhigh | Exact, Complete | Local |
| Workhorse | OpenAI Luna | high | Exact, Complete | Local |
| Daily driver | OpenAI Sol | medium | Complete | Cross-domain |
| Daily driver | Claude Opus | medium | Complete | Cross-domain |
| Daily driver | OpenAI Sol | high to xhigh | Partial | Cross-domain, Cross-system |
| Daily driver | Claude Opus | high to xhigh | Partial | Cross-domain, Cross-system |

### 🔬 Verifier Sidekick

| Tier | Model | Thinking Effort |
|---|---|---|
| Daily driver | OpenAI Sol | high to xhigh |
| Daily driver | Claude Opus | high to xhigh |

Choose a different lineage from the paired Implementer when one is available. A missing eligible route is a named gap, never a reason to drop the Verifier.

### 🔎 Reviewer Sidekick

Implementation review comes after the 🦁 Lead has assessed the work against the plan and its proof, asking the 🦉 Advisor to check it too when one exists. Reviewer Sidekicks then review each Project and Milestone, never a single Task or Subtask. Design and proposal reviews happen where their owning phase says and use the same reviewers. Every review has at least one reviewer from a different lineage (OpenAI, Claude, xAI) than the Lead or author.

| Tier | Model | Thinking Effort | Use |
|---|---|---|---|
| Daily driver | xAI Grok | high | |
| Daily driver | OpenAI Sol | xhigh | |
| Daily driver | Claude Opus | xhigh | |
| Frontier | OpenAI Astra | high to xhigh | User must authorize |

Beyond the rows above, another reviewer joins only when the owner asks for one and names its model.

### 🦉 Advisor Sidekick

| Tier | Model | Thinking Effort | Use |
|---|---|---|---|
| Daily driver | OpenAI Sol | xhigh | |
| Daily driver | Claude Opus | xhigh | |
| Frontier | OpenAI Astra | xhigh | User must authorize |
| Frontier | Claude Fable | high | User must authorize |

### 🦁 Lead

The owner chooses the Lead's model. Nothing here escalates it.

## Completion

Managing a helper is done when its role, form and model are chosen with the reasons their rows require; its charter was read in full by the commissioner and the recipient; its packet went to a real address; and its handback was matched to evidence and returned as a scoped result or a named gap. A delivered prompt, a created session, a filled packet or a green check is a stage on the way. The typed packet constrains the assignment's shape; it doesn't prove the reads happened, the grant exists, or the work is right.
