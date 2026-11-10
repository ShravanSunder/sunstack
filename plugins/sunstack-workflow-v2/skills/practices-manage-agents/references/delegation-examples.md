# Delegation examples

Most examples walk the six steps: direction, span, horizon, cut, role and form, catalog row; the last shows one isolation decision. The first three are the contrasts that matter most: who collects versus who interprets, a short research job versus a continuing one, and an implementation workstream with its Verifier.

### Collection versus interpretation: owner decisions in old sessions

Main point: an Operator collects candidates under supplied criteria; deciding what they mean belongs to the Lead.

The Lead needs every decision the owner made about review rounds in the last month of session notes, about 70 files.

Job the Lead is tempted to hand off: "Read the notes and tell me what the owner decided about review rounds."

1. Direction: "what the owner decided" needs judgment about authorship and adoption. A pasted agent proposal looks like an owner line. Complete for the reading, but the meaning is interpretation.
2. Span: the notes folder. Local.
3. Horizon: one answer, checked by the Lead. Task.
4. Cut: two jobs. First, "run the extraction script over the notes; for each line that mentions review rounds, return the file, the line, the surrounding paragraph and a candidate label (owner line, agent proposal, unclear)". Then, "from those candidates, decide which are owner decisions, checking each decisive line in its source, and return the decisions with their anchors".
5. Role and form: the first job is guided collection, a 🔧 Operator Subagent. The Lead checks the decisive sources and interprets the candidates itself.
6. Catalog row: the Operator's Complete · Local guided collection matches Luna high. On a Claude host, where Luna isn't native, the Operator runs as a Sidekick through Router and keeps that row. Interpretation stays with the Lead.

### Research: one question versus questions that keep coming

Main point: the Lead owns interpretation across related questions; an Operator can collect under supplied criteria.

The Lead and the owner are redesigning how the sync engine stores state. First the Lead needs one answer: which code writes the `lastSyncedAt` field. Later, questions about the storage code come every few minutes: where a field is written, what reads it, what breaks if it moves.

Job one: "Trace every write to `lastSyncedAt` and answer with file:line; report uncertainty instead of choosing."

1. Direction: the method is named. Complete.
2. Span: the storage module and the contracts it uses. Local.
3. Horizon: one answer, checked by the Lead. Task.
4. Cut: none.
5. Role and form: the Lead traces the writes and checks its answer. An exact extraction procedure may go to an Operator Subagent.
6. Catalog row: no helper model is selected for the Lead. An Operator follows its own Exact procedure or Complete · Local guided-collection row.

Job two: "For each question as it comes, trace the field's writes, reads and serialization boundary, and answer with file:line."

1. Direction: Complete, as before.
2. Span: Local.
3. Horizon: each answer is checked before the next question; related questions across the redesign.
4. Cut: none; the design choices stay with the Lead and the owner.
5. Role and form: the Lead keeps the related investigation; any collection helper remains an Operator under supplied criteria.
6. Catalog row: no continuing-investigation helper row is available. The Lead interprets; an Operator may collect on its existing catalog row.

### Implementation: dependent slices in one PR

Main point: dependent work joins one PR as ordered slices under one Implementer and Verifier pair; a separate PR, with its own pair, is for work that is genuinely independent.

The Lead's plan for saved searches has three parts: storage and an API in the search module, a settings screen that calls that API, and sharing. The settings screen needs the API, and sharing needs neither. The plan writes the API contract down, puts storage, the API and the settings screen into PR 1 as six ordered slices, and puts sharing into PR 2.

Job to hand off: "Implement PR 1: its six slices, in order, from the plan."

1. Direction: the plan names each slice. Complete.
2. Span: each slice touches one owner, the search module or the settings screen, and the screen's slices build against the API contract the plan wrote down. Local.
3. Horizon: six slices make one PR, checked against the plan's proof. Milestone.
4. Cut: name where the workstream ends: "run the full suite, push, open the PR, then report". The settings-screen slices follow the API slices in the same workstream, so nothing waits on another PR's merge.
5. Role and form: changes and their proof, so a 🐒 Implementer Sidekick, and the Lead pairs a 🔬 Verifier Sidekick with it. Create both sessions, make each address available in its pair's governing assignment sources, then send each only role/files. PR 2 gets its own pair now, because sharing needs nothing from PR 1.
6. Catalog row: the Implementer's Complete · Local has no remaining catalog row. Return that gap to the owner, who can name a model; do not launch or broaden a row. The Verifier is Sol or Opus, high to xhigh, from a different lineage than its Implementer when one is available.

### Implementation: a slice blocked by a missing seam

Main point: cut before escalating; the Lead makes the design choice, and helpers bring evidence.

The PR 1 Implementer stops at slice 4. The plan says the test waits for shutdown, but the service has no signal that shutdown finished, so the test could only sleep. It returns the gap to the Lead.

Job the Lead is tempted to hand off: "Make slice 4's test prove shutdown without sleeping."

1. Direction: the brief gives only the outcome, and how shutdown gets signalled is a choice other code will build on. Partial.
2. Span: the service's shutdown code and its test. Local.
3. Horizon: one slice, checked against its acceptance check. Task.
4. Cut: the Lead makes that choice and writes it into the plan: the service emits a shutdown-finished event, and the test waits on it. Slice 4a adds the event; slice 4 waits on it. Both are Complete · Local. If the Lead lacks the facts to choose, it first hands off "trace the service's shutdown sequence and report, with file:line, where it could signal completion", then decides.
5. Role and form: the new slices go to the same 🐒 Implementer Sidekick and its Verifier. The Lead inspects the shutdown sequence; an Operator may collect the specified source excerpts under supplied criteria.
6. Catalog row: Partial · Local matches no Implementer row, so the tempting job is not ready to hand off. After the cut, Complete · Local still has no Implementer row after Luna removal. Return the missing-row gap to the owner, who can name a model; do not broaden a retained row. Any guided Operator collection uses Complete · Local, Luna high. The design choice itself goes to no other agent, at any tier.

### Operations: PR wrap-up

Main point: a written procedure goes to a 🔧 Operator; judgment comes back to the Lead.

Review came back clean. The PR needs its branch pushed, CI watched until it finishes, and the verified description file published.

Job to hand off: "Push, watch CI until it finishes, publish the description file, then report each check."

1. Direction: every step is given. Exact.
2. Span: one repository's PR. Local.
3. Horizon: each step is checked against its expected result, with no judgment between them. Subtask.
4. Cut: judging failures and calling the PR ready stay with the Lead.
5. Role and form: an Exact procedure, a 🔧 Operator Subagent.
6. Catalog row: Operator, Exact, Luna medium.

### Research: how other libraries handle retries

Main point: independent units fan out; the choice stays with the Lead.

The Lead is designing the sync client's retry policy with the owner and wants evidence from three libraries before proposing one.

Job the Lead is tempted to hand off: "Find how libraries A, B and C handle retries and tell me which to follow."

1. Direction: "which to follow" gives the outcome and leaves the design choice open. Partial.
2. Span: each library's retry code, read, not changed. Local.
3. Horizon: three findings and a recommendation, checked only at the end. Milestone.
4. Cut: the Lead keeps the choice and names the method. Three jobs: "in library A, trace the retry entry point through retryable-error classification, attempt limits, delay calculation, and the tests that cover them; report each with file:line", and the same for B and C. Each is Complete · Local, one Task checked against its report.
5. Role and form: the Lead interprets the three libraries. Three independent prescribed or guided collections can go to Operator Subagents; they return source excerpts and uncertainty.
6. Catalog row: the design choice remains with the Lead. Each guided collection is Operator, Complete · Local, Luna high; the Lead checks the sources, compares the results and proposes the policy.

### Cross-system: split at the system boundary

Main point: a written contract turns a cross-system change into Local work; work that can't be split goes to the owner.

The server returns prices as floats, and the mobile app rounds them wrong. The plan moves prices to integer cents and fixes the new response shape. Old app versions would break, so the server and the app release together.

Job the Lead is tempted to hand off: "Move the server and the app to integer cents; both ship together."

1. Direction: the plan names the new shape. Complete.
2. Span: the app is another system that consumes the server's contract. Cross-system.
3. Horizon: both sides, checked together at release. Milestone.
4. Cut: the contract is settled, so each side can be built against it. Two slices: "change the server to return integer cents per the plan" and "change the app to read integer cents per the plan", each Complete · Local. The Lead holds the release until both land.
5. Role and form: one workstream, so one 🐒 Implementer Sidekick builds both slices in order, paired with a 🔬 Verifier Sidekick that observes both sides against the contract.
6. Catalog row: each slice's Complete · Local has no remaining Implementer row. Return the missing-row gap to the owner, who can name a model, before launching. The tempting job's Complete · Cross-system matches no row. If neither side can be built or tested without the other changing at the same time, the Lead brings it to the owner, who can name a model for the pair.

### Independent topics, shared fixture

Two assigned probes ask different questions, but both reset the same database fixture and write `result.log`. Probe A can reset while B is observing, then B can overwrite A's output. Each may report green against state the other changed. Each probe's result must come from its own fixture and still be on disk when read.

Give independently checkable probes separate fixture instances and output paths through the existing setup. They can then run in parallel without adding locks or a scheduler. If B instead consumes the actual artifact A is still producing, isolation cannot remove that dependency: B waits for A's handback, checks the finished artifact, then proceeds. A prompt delivered to A is not that handback.

## Live calls and recipient startup

The quoted jobs above describe what the governing plan or procedure must establish; they are not inline message bodies. For example, the implementation plan and existing assignment source carry the slice, grant, pair and ending check. The live content is:

```json
{"role":"implementer","files":["docs/specs/saved-search/plan.md","docs/wip/saved-search-assignment.md"]}
```

The Implementer loads `role-implementer`, opens those files at the current revision, resolves the source-backed context and validates it with `ImplementerPacket`. The sources need not serialize a full packet. If the pair address or write scope is absent, it returns that exact gap. A Checker call uses `role: checker`; its governing files must select verification or review duty explicitly, even when source code is also referenced.

A prescribed CI procedure is sent as:

```json
{"role":"operator","files":["docs/wip/pr-wrapup-procedure.md"]}
```

For a correction, update or select the governing review/correction file, then send:

```json
{"role":"implementer","files":["docs/specs/saved-search/plan.md","docs/wip/saved-search-review-corrections.md"]}
```

The recipient reopens the current files before resolving the correction; a prior completed effect is not replayed merely because a call repeats. Reports and direct setup/reproduction exchanges between the Implementer and paired Checker keep their own shapes.

## Parent execution and outside review

A Lead plan names parser and display workstreams, their shared event contract, dependencies and completion proof. The Implementer Sidekick chooses internal function/test order and native helper concurrency under disjoint writes, inspects results and proves the integrated target with its existing 🔬 Verifier. Neither helper needs a role packet, separate trace or Verifier pair. Moving event ownership or changing the contract is a material question for Lead; ordinary test/implementation repairs stay with the pair. Formal Complete · Local role commissions still have the catalog gap above; helper use creates no new row.

After required proof, the Lead writes its own evidence-backed five-condition acceptance in the existing record, with independent review pending. The outside 🔎 Checker receives the complete scoped originals, current candidate, Lead acceptance artifact and original verification report/proof. Missing acceptance or an unresolved required HOLD returns review-not-started; the Reviewer does not fill that Lead work. A finding returns for affected repair, proof and Lead acceptance recheck, then affected review. Clean review starts no second acceptance ceremony.
