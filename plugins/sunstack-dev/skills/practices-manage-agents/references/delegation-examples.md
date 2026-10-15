# Delegation examples

Most examples walk the six steps: direction, span, horizon, cut, role and form, catalog row; the last shows one isolation decision. The first three are the contrasts that matter most: who collects versus who interprets, a short research job versus a continuing one, and an implementation workstream with its Verifier.

### Collection versus interpretation: owner decisions in old sessions

Main point: an Operator collects candidates under supplied criteria; deciding what they mean belongs to a Researcher.

The Lead needs every decision the owner made about review rounds in the last month of session notes, about 70 files.

Job the Lead is tempted to hand off: "Read the notes and tell me what the owner decided about review rounds."

1. Direction: "what the owner decided" needs judgment about authorship and adoption. A pasted agent proposal looks like an owner line. Complete for the reading, but the meaning is interpretation.
2. Span: the notes folder. Local.
3. Horizon: one answer, checked by the Lead. Task.
4. Cut: two jobs. First, "run the extraction script over the notes; for each line that mentions review rounds, return the file, the line, the surrounding paragraph and a candidate label (owner line, agent proposal, unclear)". Then, "from those candidates, decide which are owner decisions, checking each decisive line in its source, and return the decisions with their anchors".
5. Role and form: the first job is guided collection, a 🔧 Operator Worker. The second is a checked answer, a 📚 Researcher Worker. Neither job needs context from earlier jobs.
6. Catalog row: the Operator's Complete · Local guided collection matches Luna high. The Researcher's Complete · Local matches Luna high. On a Claude host, where Luna isn't native, both run as Sidekicks through Router and keep those rows.

### Research: one question versus questions that keep coming

Main point: continuity changes a Researcher's form, never its role.

The Lead and the owner are redesigning how the sync engine stores state. First the Lead needs one answer: which code writes the `lastSyncedAt` field. Later, questions about the storage code come every few minutes: where a field is written, what reads it, what breaks if it moves.

Job one: "Trace every write to `lastSyncedAt` and answer with file:line; report uncertainty instead of choosing."

1. Direction: the method is named. Complete.
2. Span: the storage module and the contracts it uses. Local.
3. Horizon: one answer, checked by the Lead. Task.
4. Cut: none.
5. Role and form: a checked answer to one question, a 📚 Researcher Worker.
6. Catalog row: Researcher, Complete · Local, Luna high.

Job two: "For each question as it comes, trace the field's writes, reads and serialization boundary, and answer with file:line."

1. Direction: Complete, as before.
2. Span: Local.
3. Horizon: each answer is checked before the next question; related questions across the redesign.
4. Cut: none; the design choices stay with the Lead and the owner.
5. Role and form: still a 📚 Researcher. Each answer goes faster with what the last one found, so a Sidekick.
6. Catalog row: a continuing Researcher Sidekick, Sol high to xhigh, which may use Luna helpers for collection.

### Implementation: a breakdown with three PRs

Main point: each PR is a workstream with its own Implementer and Verifier pair, and a dependent PR waits for its prerequisite.

The Lead's plan for saved searches has three PRs. PR 1 adds storage and an API in the search module; PR 2 adds a settings screen that calls that API; PR 3 adds sharing. PR 2 needs PR 1 merged first, and PR 3 needs neither.

Job to hand off: "Implement PR 1: its four slices, in order, from the plan."

1. Direction: the plan names each slice. Complete.
2. Span: the search module and the storage it owns. Local.
3. Horizon: four slices make one PR, checked against the plan's proof. Milestone.
4. Cut: name where the workstream ends: "run the full suite, push, open the PR, then report".
5. Role and form: changes and their proof, so a 🐒 Implementer Sidekick, and the Lead pairs a 🔬 Verifier Sidekick with it. Create both sessions, fill both packets with each other's address, then dispatch both. PR 3 gets its own pair now; PR 2's pair starts once PR 1 lands.
6. Catalog row: the Implementer's Complete · Local matches a Luna Workhorse row. The Verifier is Sol or Opus, high to xhigh, from a different lineage than its Implementer when one is available.

### Implementation: a slice blocked by a missing seam

Main point: cut before escalating; the Lead makes the design choice, and helpers bring evidence.

The PR 1 Implementer stops at slice 4. The plan says the test waits for shutdown, but the service has no signal that shutdown finished, so the test could only sleep. It returns the gap to the Lead.

Job the Lead is tempted to hand off: "Make slice 4's test prove shutdown without sleeping."

1. Direction: the brief gives only the outcome, and how shutdown gets signalled is a choice other code will build on. Partial.
2. Span: the service's shutdown code and its test. Local.
3. Horizon: one slice, checked against its acceptance check. Task.
4. Cut: the Lead makes that choice and writes it into the plan: the service emits a shutdown-finished event, and the test waits on it. Slice 4a adds the event; slice 4 waits on it. Both are Complete · Local. If the Lead lacks the facts to choose, it first hands off "trace the service's shutdown sequence and report, with file:line, where it could signal completion", then decides.
5. Role and form: the new slices go to the same 🐒 Implementer Sidekick and its Verifier. The evidence job is a checked answer that stands alone, so a 📚 Researcher Worker.
6. Catalog row: Partial · Local matches no Implementer row, so the tempting job is not ready to hand off. After the cut, the slices stay on the Implementer's Luna Workhorse row, and the Researcher's Complete · Local matches Luna high. The design choice itself goes to no other agent, at any tier.

### Operations: PR wrap-up

Main point: a written procedure goes to a 🔧 Operator; judgment comes back to the Lead.

Review came back clean. The PR needs its branch pushed, CI watched until it finishes, and the verified description file published.

Job to hand off: "Push, watch CI until it finishes, publish the description file, then report each check."

1. Direction: every step is given. Exact.
2. Span: one repository's PR. Local.
3. Horizon: each step is checked against its expected result, with no judgment between them. Subtask.
4. Cut: judging failures and calling the PR ready stay with the Lead.
5. Role and form: an Exact procedure, a 🔧 Operator Worker.
6. Catalog row: Operator, Exact, Luna medium.

### Research: how other libraries handle retries

Main point: independent units fan out; the choice stays with the Lead.

The Lead is designing the sync client's retry policy with the owner and wants evidence from three libraries before proposing one.

Job the Lead is tempted to hand off: "Find how libraries A, B and C handle retries and tell me which to follow."

1. Direction: "which to follow" gives the outcome and leaves the design choice open. Partial.
2. Span: each library's retry code, read, not changed. Local.
3. Horizon: three findings and a recommendation, checked only at the end. Milestone.
4. Cut: the Lead keeps the choice and names the method. Three jobs: "in library A, trace the retry entry point through retryable-error classification, attempt limits, delay calculation, and the tests that cover them; report each with file:line", and the same for B and C. Each is Complete · Local, one Task checked against its report.
5. Role and form: three bounded questions that stand alone, three 📚 Researcher Workers fanned out.
6. Catalog row: Partial · Local matches no Researcher Worker row, so the tempting job is not ready to hand off. After the cut, each job is Researcher, Complete · Local, Luna high. The Lead compares the reports and proposes the policy.

### Cross-system: split at the system boundary

Main point: a written contract turns a cross-system change into Local work; work that can't be split goes to the owner.

The server returns prices as floats, and the mobile app rounds them wrong. The plan moves prices to integer cents and fixes the new response shape. Old app versions would break, so the server and the app release together.

Job the Lead is tempted to hand off: "Move the server and the app to integer cents; both ship together."

1. Direction: the plan names the new shape. Complete.
2. Span: the app is another system that consumes the server's contract. Cross-system.
3. Horizon: both sides, checked together at release. Milestone.
4. Cut: the contract is settled, so each side can be built against it. Two slices: "change the server to return integer cents per the plan" and "change the app to read integer cents per the plan", each Complete · Local. The Lead holds the release until both land.
5. Role and form: one workstream, so one 🐒 Implementer Sidekick builds both slices in order, paired with a 🔬 Verifier Sidekick that observes both sides against the contract.
6. Catalog row: each slice's Complete · Local matches an Implementer Luna Workhorse row. The tempting job's Complete · Cross-system matches no row. If neither side can be built or tested without the other changing at the same time, the Lead brings it to the owner, who can name a model for the pair.

### Independent topics, shared fixture

Two assigned probes ask different questions, but both reset the same database fixture and write `result.log`. Probe A can reset while B is observing, then B can overwrite A's output. Each may report green against state the other changed. What must hold: each probe's result comes from its own fixture and is still on disk when read.

Give independently checkable probes separate fixture instances and output paths through the existing setup. They can then run in parallel without adding locks or a scheduler. If B instead consumes the actual artifact A is still producing, isolation cannot remove that dependency: B waits for A's handback, checks the finished artifact, then proceeds. A prompt delivered to A is not that handback.
