# nudges: what a run gives the agent

**Reader:** any agent running rules or acting on a nudge. **Question:** what is in a nudge, what isn't a nudge, and what do I record about it? **Changes when:** the nudge's parts or the agent's duty change. Requirements: [nudges](../requirements/nudges.md). Entities: [E7 Nudge](entities.md#e7-nudge), [E10 Gap](entities.md#e10-gap), [E12 Disposition](entities.md#e12-disposition), [E13 Run](entities.md#e13-run). Revision 1 accepted this contract on 31 Oct; it is restated here under the new ids without changing its meaning.

### P2: Problem

In #187 every layer answered only the narrow question it was given: a rule flagged line 17's missing return, the writer added an AgentStudio return, the review passed it, and nobody saw that the content belonged to AgentStudio. Passes and unread files were silent, and a finding had one location.

### O2: Outcome

The agent who runs a rule on line 17 sees what was noticed, why it matters, where else to read and what wasn't read, and records a decision about the broader question.

### R6: A nudge carries its parts

`kind: obligation · capability: nudges · links: U1, E7, E2, C2, V6 · status: authorized`

Every nudge shows: where (file and line inside the chunk it judged); what the rule observed, in one sentence; why (its standard's wording and line); its basis (`mechanical` when every step on the path was a check, `judged` when any step read a model's answer); its severity and outcome; read-next places in three labelled kinds (read, with a line; never read, as a pointer; the same rule's same nudge elsewhere, only where it really nudged); its answers and path; and whether the model's view was cut.

### R7: A nudge may point without deciding

`kind: obligation · capability: nudges · links: U2, E7, V7 · status: authorized`

Where a rule's standard can't be settled from its chunk, its nudge says what to check and where to read, and its message never claims a breach.

### R8: Gaps are shown, apart from exclusions

`kind: obligation · capability: nudges · also serves: what-rules-read · links: U3, E10, E13, C2, V8 · status: authorized`

Every run lists its gaps (E10's kinds) per rule, and separately lists each gate exclusion with the gate's answer. Every judged result, passes and exclusions included, keeps its answers. No gap appears as a pass.

### R9: A nudge never fails a run

`kind: obligation · capability: nudges · links: U4, E13, V9 · status: authorized`

A run whose only findings are `warn` exits clean under this repository's runner. A run with `uncertain` results exits with its own status, distinct from clean and from failed. If a run is invalid, cancelled or incomplete, then it says so whatever its nudges. Every model-judged path in our rules has severity `warn`.

### R10: A pass says one property held

`kind: obligation · capability: nudges · links: U5, V10 · status: authorized`

Every skill that teaches reading a run says a pass means one property held, never that the skill meets the standard as a whole.

### R11: Every nudge gets a disposition

`kind: obligation · capability: nudges · links: U6, E12, C3, V11 · status: authorized`

An agent that acts on a nudge records a disposition (fixed, kept with reason, routed, open with the evidence lacked) after reading its places. If the only change makes the rule's own property hold, then the disposition is not `fixed` until the broader question is answered. A commission built from a nudge carries the nudge itself.

### R12: Each skill teaches its part with a worked example

`kind: obligation · capability: nudges · also serves: rule-making · links: U7, V12 · status: authorized`

`skill-rules`, the rule-running reference, `skill-creation`, `skill-review`, `skill-orchestrator`, `skill-audit` and `decision-model-review` each teach their part with a worked example (#187's line among them) and a completion check that names what must be true. When an agent brings a rule decision to the owner, it first shows the rule's behavior on one simple and one harder real scenario.

### C2: The run report

`kind: contract · capability: nudges · links: R6, R8, R9, R14, R15, R17 · status: authorized`

A run's report shows, per run: its status (E13); each nudge with R6's parts; the gaps per rule; the gate exclusions with answers; each skill's kind judgment with how sure; and the held rules with what each lacks. Passes are counted per rule and each keeps its answers on request.

### C3: The disposition record

`kind: contract · capability: nudges · links: R11 · status: authorized`

Wherever an agent reports its work on skill text (a self-check, a review, a Lead's acceptance), each nudge it received appears with its disposition and what was checked.

### Proof obligations

| V | For | What decides pass and fail | Reference |
| --- | --- | --- | --- |
| V6 | R6 | on `ops-observability-stack/SKILL.md:17` at a pinned commit, the nudge shows every part, with `agentstudio-loop.md` as a read place and AgentStudio's repository as a pointer, never a link | revision 1's anchor scenario |
| V7 | R7 | a point-only rule's messages never state a breach | each such rule's routes |
| V8 | R8 | a run where a rule reads nothing in an in-scope file lists that gap; a gate exclusion appears with its answer, not as a gap | revision 1's silent-coverage scenario (`ops-observability-stack`, 0 pieces read) |
| V9 | R9 | warn-only run exits clean; uncertain run exits with its own status; no judged path is `error` | engine exit statuses; the rule files |
| V10 | R10 | no teaching skill reads a pass as meeting the standard | the skills' text |
| V11 | R11 | a fix that only makes the property hold is not recorded `fixed` without the broader answer | the skills' teaching; #187's chain as the failing example |
| V12 | R12 | each named skill has a worked example and checkable completion | the skills' text |
