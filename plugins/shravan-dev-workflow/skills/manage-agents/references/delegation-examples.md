# Delegation Examples

Each example applies the Work levels and role table in `SKILL.md`; when they disagree, `SKILL.md` wins.

### Orchestration: a workstream that is a stack of PRs

Main point: one Implementer–Verifier pair per workstream, kept through every PR in its stack; independent workstreams get their own pairs.

The Lead's plan for saved searches has three PRs. PR 1 adds storage and an API in the search module; PR 2 adds saved-search filters in the same module, on top of that API; PR 3 adds sharing, owned by another module. PR 2 builds on PR 1, so the two form one stacked workstream. PR 3 needs neither, so it is a second workstream.

Job to hand off: "Implement workstream A, PRs 1 and 2, from the plan, and prove each PR."

1. Direction: the plan names each PR's changes, and Test Design names the tests. Complete.
2. Span: the search module, its storage, and its own API. Local.
3. Horizon: two PRs make one workstream, checked against the Verifier's report and the plan's proof. Workstream.
4. Cut: name where it ends: "both PRs pass their checks and the Verifier's report covers the stack's head; then report".
5. Role: a 🐒 Implementer carries the workstream, and a 🔬 Verifier is paired with it. Workstream B (PR 3) gets its own pair now, because nothing ties it to A.
6. Model: in the 🐒 Implementer table, Complete · Local matches the Workhorse row. The 🔬 Verifier takes the row whose lineage differs from the Implementer's: OpenAI Luna for the Implementer, so Claude Opus for the Verifier.

### Orchestration: a step blocked by a missing seam

Main point: cut before escalating; the Lead makes the design choice, and other agents bring evidence.

The workstream A Implementer stops partway through PR 1. Test Design says a test waits for shutdown, but the service has no signal that shutdown finished, so the test could only sleep. It returns the gap to the Lead.

Job the Lead is tempted to hand off: "Make the test prove shutdown without sleeping."

1. Direction: the brief gives only the outcome, and how shutdown gets signalled is a choice other code will build on. Partial.
2. Span: the service's shutdown code and its test. Local.
3. Horizon: one part of PR 1's Task. Subtask.
4. Cut: the Lead makes the choice and writes it into Program Design and Test Design: the service emits a shutdown-finished event, and the test waits on it. If the Lead lacks the facts to choose, it first hands off "trace the service's shutdown sequence and report, with file:line, where it could signal completion".
5. Role: the design change goes back to the same 🐒 Implementer as part of PR 1. The evidence job stands alone and has one result, so a 🛠️ Worker.
6. Model: the tempting job is Partial and not ready to hand off. The evidence job is Complete · Local: tracing the shutdown sequence means reading code, so it is not Exact however its steps are written. That matches no 🛠️ Worker row (Workhorse is Exact · Local; Daily driver is Complete · Cross-domain), so it is not ready as a Worker job. One trace costs less to read than to hand off, so the Lead reads it itself; otherwise the Lead brings the owner the gap, and the owner names a model. The design choice itself goes to no other agent, at any tier.

### Orchestration: PR wrap-up

Main point: a written procedure goes to a 🔧 Operator; judgment comes back to the Lead.

Review came back clean. The PR needs its branch pushed, CI watched until it finishes, and the verified description file published.

Job to hand off: "Push, watch CI until it finishes, publish the description file, then report each check."

1. Direction: every step is given. Exact.
2. Span: one repository's PR. Local.
3. Horizon: each step is checked against its expected result, with no judgment between them. Subtask.
4. Cut: judging failures and calling the PR ready stay with the Lead.
5. Role: an Exact Subtask. 🔧 Operator.
6. Model: in the 🔧 Operator table, Exact matches its Workhorse row.

### Research: how other libraries handle retries

Main point: independent units fan out to Workers; the choice stays with the Lead.

The Lead is designing the sync client's retry policy with the owner and wants evidence from three libraries before proposing one.

Job the Lead is tempted to hand off: "Find how libraries A, B, and C handle retries and tell me which to follow."

1. Direction: "which to follow" gives the outcome and leaves the design choice open. Partial.
2. Span: each library's retry code, read, not changed. Local.
3. Horizon: three findings and a recommendation, checked at the end. Task.
4. Cut: the Lead keeps the choice and names the method. Three jobs: "in library A, trace the retry entry point through retryable-error classification, attempt limits, delay calculation, and the tests that cover them; report each with file:line", and the same for B and C. Each is one bounded result.
5. Role: three results that stand alone. Three 🛠️ Workers, fanned out as native subagents.
6. Model: each job is Complete · Local. Reading retry code is judgment, so numbering the method's steps does not make it Exact. That matches no 🛠️ Worker row (Workhorse is Exact · Local; Daily driver is Complete · Cross-domain), so the jobs are not ready to hand off as written: the Lead brings the owner the gap with a recommended model, and the owner names one, or the Lead reads the three libraries itself. Either way, the Lead compares the findings and proposes the policy.

### Research: questions that keep coming

Main point: a Worker is one job; continuity comes from the brief, not from keeping a Worker session.

The Lead and the owner are redesigning how the sync engine stores state. Questions about the current storage code come up every few minutes: where a field is written, what reads it, what breaks if it moves.

Job to hand off: "For this question, trace the field's writes, reads, and serialization boundary, and answer with file:line; report uncertainty instead of choosing."

1. Direction: the method is named for every question, and following it means reading code. Complete.
2. Span: the sync engine's storage module and the contracts it uses. Local.
3. Horizon: each answer is one bounded result, checked by the Lead before the next question. Task.
4. Cut: none; the design choices stay with the Lead and the owner.
5. Role: a 🛠️ Worker per question, as a native subagent. The next Worker's brief carries the earlier answers it needs, so nothing depends on a Worker remembering.
6. Model: Complete · Local matches no 🛠️ Worker row, so each question needs a model the owner names; until then the Lead answers it itself. Numbering the steps does not make reading code Exact.

### Cross-system: split at the system boundary

Main point: split a cross-system change at the boundary into workstreams; work that cannot be split goes to the owner.

The server returns prices as floats, and the mobile app rounds them wrong. The plan moves prices to integer cents and fixes the new response shape. Old app versions would break, so the server and the app release together.

Job the Lead is tempted to hand off: "Move the server and the app to integer cents; both ship together."

1. Direction: the plan names the new shape. Complete.
2. Span: the app is another system that consumes the server's contract. Cross-system.
3. Horizon: after the cut, each side is a Workstream checked by its own Verifier; releasing both together is a gate the Lead holds.
4. Cut: the contract is settled, so each side can be built against it. Two workstreams: "change the server to return integer cents per the plan" and "change the app to read integer cents per the plan", each one PR. Releasing together is a gate the Lead holds after both land, not a reason to keep one pair.
5. Role: two workstreams, so two Implementer–Verifier pairs.
6. Model: each side is Complete · Local, which matches the 🐒 Implementer Workhorse row; each Verifier takes the other lineage. If neither side can be built or tested without the other changing at the same time, the Lead brings it to the owner, who can name a model for one Implementer to hold both sides.
