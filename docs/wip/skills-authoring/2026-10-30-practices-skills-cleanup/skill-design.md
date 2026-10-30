# Practice skills cleanup: skill design

Draft 1, by the 🦁 Lead, 2026-10-30. Part three: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md).

## Security

Decided by the 🦁 Lead before the outline. The change edits skill text only. It adds no command, script, network call, credential, file write outside the skills' existing outputs, or trust boundary. Four of the nine skills govern sensitive actions, so their text is read for weakening, not just for new surfaces:

- `practices-cleanup` governs deleting files and worktrees. It has two authorized routes: allow-list actions after all their checks, and an outside-list action the owner granted explicitly for that exact action. Its allow list, its checks (exact path, evidence kept, no active writer or consumer) and the grant's exactness must not loosen. A completion that lets "done" pass with an unauthorized outside-list removal (no allow-list match and no exact-action grant) fails review. So does one that turns the grant branch into a blanket hold. Cleanup's branch walk covers the granted, ungranted, unknown-target and in-use cases.
- `practices-preflight` checks credentials and access. No completion may treat a missing credential or permission as satisfied, or suggest a way around a denial.
- `practices-manage-agents` and `practices-collaboration` decide who may act and what authority a helper has. No change may widen a helper's access, merge or publish authority.

The throwaway check harness lives in the ignored `tmp/` and is never committed. Sensitive surfaces: none new; three existing ones guarded as above. Decision: allowed.

## How each kind of finding is handled

| Finding | Reading at the line | Fix |
| --- | --- | --- |
| `description.length-limit` (5), `description.length-warning` (9) | over 300 or 225 characters | rewrite to 100–200 where it keeps every loading moment, never over 225. Keep the `Not for` boundary. Drop example phrases before moments. A moment that can't fit goes back to the Lead before commit |
| `description.opener` (2) | "Use at the start of a qualifying task ..." | open with an allowed phrase that keeps the moment, such as "Use when starting a qualifying task ..." |
| `completion.criterion`, missing | a workflow step with no completion | add a `Completion:` line naming what is observably true when the step is done and the legwork it demands, or merge a one-line mechanical step into the step it serves |
| `completion.criterion`, thin | a completion an agent could meet without the step's work | name the observable result and the work that produces it |
| every numbered workflow, flagged or not | the source, not the extractor (it selects no step in `practices-research`'s Ordered Workflow or `practices-manage-agents`' Hand off sequence) | inventory every numbered workflow in the nine skills. For each step, point to the line where its observable done state already stands, or make the smallest repair or merge and walk its branches. Classify a numbered list that isn't a workflow (a concept list, a table's rows) as not applicable. No `Completion:` boilerplate added only so a selector sees it, and no engine change |
| any completion added or changed | the step's existing branches | walk every branch the step already supports (read-only use, missing input, chat-only output, an intentionally new path, a narrow edit, a denial) and word the completion so each branch has its own done state. Record the walk in the receipt |
| `guidance.positive` | a prohibition | fix only when nothing near it says what to do. A prohibition beside its positive alternative is conforming (the rule over-flags these) |
| `reference.teaching-depth` | a reference section that owns a stage | add what to inspect, what good and bad look like, or when to stop, whichever is missing. A lookup section is conforming |
| `branch.condition`, `call.completeness` | the branch or call line | make the condition observable, or the call say when, where, what and what comes back. Read the adjacent action first: a line that opens the procedure right below it already names its work |

The writer follows `skill-authoring:skill-creation` for each skill, one invocation and one commit per skill. Order: the five over-limit descriptions first, in one commit per skill (`practices-retrospective`, `practices-manage-agents`, `practices-how`, `practices-why`, `practices-preflight`); then the other four skills (`practices-cleanup`, `practices-collaboration`, `practices-show-me-your-work`, `practices-research`). Reference and completion findings land in their skill's commit.

## Descriptions: what each must keep

The loading moments come from today's text. The writer keeps each one or returns it to the Lead.

| Skill (chars) | Moments to keep | Boundary |
| --- | --- | --- |
| `practices-retrospective` (434) | a blameless retrospective or look back; lessons from a finished or bounded session or delivery; a correction that keeps recurring across sessions | not current re-anchoring, diagnosis, evidence collection alone, skill portfolio choices, or verification-skill maintenance (group these by their owner if needed) |
| `practices-manage-agents` (414) | delegating to subagents, teams or parallel agents; choosing role, form and model; spawning, commissioning, continuing, steering, waiting for, verifying or assessing that work; fan-out | not performing the assigned phase itself |
| `practices-how` (382) | explaining how existing code works; tracing a behavior before changing it; locating what owns a state, effect or boundary | not why, incident cause, new architecture, or single-fact lookup |
| `practices-why` (336) | why code or a design took its shape; which decision or constraint motivated it; where a threshold or check came from; whether its reason still holds before a change | not how it works, incident cause, or a new design |
| `practices-preflight` (305) | about to start an orchestration, implement a plan or commission an agent; checking inputs, access, credentials, services, tools, assigned agents and disk | not checking a finished result or choosing who takes a job |
| `practices-cleanup` (292) | a slice, milestone, PR or investigation ends; your own merged worktree still on disk; disk runs low; removing your own task's large residue | not archiving documents or managing PR state |
| `practices-show-me-your-work` (272) | starting a qualifying task (open or resume the trace); recording an ask, correction, decision, evidence, blocker or outcome; handing off; the user asks for your work or a trail | not routine small edits |
| `practices-collaboration` (247) | starting a qualifying task (find the board project and work thread); agents coordinating: messaging or commissioning a session, seats, posts, waiting on another agent, no board | not tool syntax |
| `practices-research` (243) | a task needs source gathering, prior art, current docs or web evidence, or memory, session-log or saved-reader research before work can continue | not extracting unwritten owner meaning |

## Running the rules here

`main` doesn't carry the #171 kit. Each check runs the native engine (frozen C2) directly, with a throwaway config in this worktree's ignored `tmp/skill-rules-check/`. The config points at #171's frozen rulebook, rules files and evidence project (entries `188116d0`) by absolute path, and `check.files` resolve from this worktree's Git root. It was checked before any edit: `--check` assembles twelve rules, and `--evidence` returns 177 pieces from all nine skill homes. It is a check harness only; nothing of it is committed. Jev runs belong to the Lead, who holds the key; the writer runs `--evidence` and asks the Lead for each Jev run.

## Runs

| Run | Target | Kind | Writer | Status |
| --- | --- | --- | --- | --- |
| 1 | the nine skills, per the tables above | update | Opus 5.5 | proposed |
| 2 | rules over the nine skills on Jev after run 1 | proof | the Lead | proposed |
| 3 | independent review (skill-review, implementation) | review | Sol xhigh | proposed |
| 4 | changelog entry, sunstack-dev 2.100.4, PR | documents | the Lead | proposed |

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| P1 | Scope is the nine practice skills no open PR touches | One owner per file across open PRs; #172 rewrites the two verification practices |
| P2 | Base `main`, not #171, #172 or #176 | Skill text only; no new stack layer (the owner decides stacking). The version lines and changelog index conflict with #176 by one line each |
| P3 | Judged findings are candidates; the writer confirms or explains at the line | Measured tonight: run-to-run variance and `guidance.positive` over-flagging |
| P4 | Description trigger trials (G4) are a named gap | The Luna trial route waits on the owner's A/B/C decision |
| P5 | Every added completion walks its step's branches | The phase cleanup's review found four completions that broke an existing branch |
| P6 | Every numbered workflow is inventoried from source, not only the steps the rules select | The extractor selects no step in two of the nine skills' workflows (Advisor F1); the phase cleanup's F6 claimed every step from the rule run alone |
