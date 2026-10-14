---
name: practices-manage-agents
description: "Use when delegating to subagents, agent teams or parallel agents: the Lead or an authorized helper chooses an Advisor, Implementer, Verifier, Reviewer, Researcher or Operator, its valid Worker or Sidekick form, and model; or spawns, commissions, continues, steers, waits for, monitors, verifies or assesses that work, including a fan-out across many units. Not for performing the assigned engineering phase itself."
---

# Practices: Manage Agents

Every helper is described by four things, and each answers a different question. Its **role** says which result it owns and which decisions it may make. Its **execution form** says how its conversation is managed. Its **assignment**, a typed job packet, says what it is doing now, from which sources and under which grant. Its **model** is the capacity the job needs. Keeping them apart lets one charter teach a role however it runs, and lets the Lead tell implementation, observation, review and advice apart when the evidence comes back.

The 🦁 Lead is the agent the owner talks to. It designs, plans, cuts the work, commissions the roles below, and accepts results. The owner decides tradeoffs and merges and can override any pick. No helper writes the governing design or plan, and no form, title or board seat grants that authority.

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

1. **Cut and classify the job.** Name the bounded result and the check that closes it, then direction, span and horizon using Classify. IF the inherited outcome or owner picture is unsettled, materially changed or ambiguous, load `principle-build-the-shared-model-first` and return the understood outcome, boundary and unsettled premise before cutting work. IF independently checkable responsibilities are mixed or a proposed split changes their boundary, load `principle-separate-the-concerns` and return the distinct jobs and reason for the cut. Missing intent, contract, plan or grant is a gap to fill before handing off, not a Partial direction. MUST load `references/delegation-examples.md` and return the relevant worked cut applied to this job. Keep classification in working state; the owner needs the decision and consequential limits, not six answers recited for every assignment.
   Completion: each of the four answers is named, or the gap that blocks it is reported.
2. **Choose the role, then the form.** The result the job needs picks the role: changes and their proof go to an Implementer, observation of an outcome to its paired Verifier, findings to a Reviewer, a checked answer to a Researcher, a procedure's observations to an Operator. Then apply the form column. Continuity changes a Researcher's form, never its role. The Lead commissions Advisor, Implementer, Verifier and Reviewer Sidekicks. A Sidekick whose charter grants management may commission bounded Operator or Researcher help for its own job, as native Workers or, when the route requires it, as separate sessions (Luna through Router from a Claude host, for example). It keeps their exact addresses, corrections and handbacks. Creating a session never grants leadership or wider work. A native Worker returns further decomposition to its parent; it doesn't fan out or open sessions.
   Completion: the role and form are named, and the form is one the table admits.
3. **Resolve an eligible model.** MUST load `references/model-catalog.md` and return one eligible row for the role, form and classified job, with the reason that row requires. Preserve an owner-assigned model and effort; the owner can override a pick and nothing here escalates the Lead.
   Completion: one row matches. If none does, cut the job until one matches or report the capability or policy gap; never improvise a frontier pick or change the Lead's model.
4. **Load the role prompt.** MUST load the selected role's charter from the table and return its ready opening and default reads. The commissioner and the recipient each read that charter in full. IF you are the Lead starting qualifying management work, load `references/roles/lead.md` and return its acceptance stance and the reads it applies.
   Completion: the charter has been read in full, and its opening and default reads are in hand.
5. **Choose the route for the form.** MUST load `references/execution-forms.md` and return the supported route, lifecycle and history boundary for the chosen form, before creating, reusing or dispatching any helper. It owns the form mechanics and selects the provider and ACP manuals. Keep exact target identities, observed creation and delivery stages, and recovery from uncertain operations.
   Completion: the route, lifecycle and history boundary are chosen. For a Sidekick, a suitable existing session was looked for and reused if found; only when none exists is a new one created through the chosen route, and a failed lookup is not proof that none exists. A native Worker is spawned through the host's own tool, with no existing session to find.
6. **Write the commission.** MUST load `references/agent-job-packet.md` and return the typed commission: role, form, supplied method, required full reads, reachable sources, limits, closing condition and declared return owner. It names the selected role's contract under `schemas/role-contracts/`; read that contract with the shared fields, not the other roles' contracts. For an Implementer and Verifier pair, create or reuse both Sidekick sessions without dispatching work, get their real addresses, fill both packets so each references the other, then dispatch both. Host settings go in the tool's own arguments; packet text establishes no confinement or authorization.
   IF jobs can touch shared mutable resources or consume unfinished work, load `principle-design-for-concurrency` and return the invariant, harmful ordering and existing isolation or prerequisite before parallel dispatch. Independent topics are not resource isolation: two probes resetting one fixture can destroy each other's evidence. Separate fixtures and outputs can stay parallel; a consumer of unfinished work waits for its owning completion through collaboration's existing waiting path.
   Completion: the packet is complete and went to a real address. A packet missing its outcome, sources, limits or closing condition doesn't go out.
7. **Continue and assess.** At assignment, after a material correction and on resume, the helper reacquires its charter, commission and trace, then the governing sources they point to, and checks its role boundary before handing back. Send a drifting agent a correction instead of restarting it. Before relying on a handback, MUST load `principle-verify-before-accepting` and return the exact supported claim, observed scope and remaining gap. A green run at the wrong owner cannot close the assigned result; adequate current proof at the correct owner needs no extra summary or equivalent run. Return a specific gap or a scoped result to whoever commissioned it.
   Completion: every claim used is matched to evidence or returned as a gap. Only the Lead accepts delivery.

Delegate only independent work that costs less to hand off than to do. Work that splits into independent units (an audit, a migration, a review across files) can fan out within the grant after resource isolation and prerequisites are settled. Integrate the results at their owning boundary.

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

## Completion

Managing a helper is done when its role, form and model are chosen with the reasons their rows require; its charter was read in full by the commissioner and the recipient; its packet went to a real address; and its handback was matched to evidence and returned as a scoped result or a named gap. A delivered prompt, a created session, a filled packet or a green check is a stage on the way. The typed packet constrains the assignment's shape; it doesn't prove the reads happened, the grant exists, or the work is right.
