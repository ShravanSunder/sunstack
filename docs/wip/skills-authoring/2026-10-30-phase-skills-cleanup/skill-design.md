# Phase skills cleanup: skill design

Draft 1, by the 🦁 Lead, 2026-10-30. Part three: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md). Base: `main` at `2b64a7ea` (the copy-on-write worktree started at the stale `39957959` and is fast-forwarded to `origin/main` before any work; the seven skill trees match at both).

## How each kind of finding is handled

| Finding | Reading at the line | Fix |
| --- | --- | --- |
| `description.length-warning` (3) | over 225 characters | rewrite to 100-200 where it keeps the trigger, never over 225; keep the loading moment and the `Not for` boundary |
| `completion.criterion`, missing | a workflow step with no completion | add a `Completion:` line naming what is observably true when the step is done and the legwork it demands; or merge a one-line mechanical step into the step it serves |
| `completion.criterion`, thin | a completion an agent could meet without the step's work | name the observable result and the work that produces it |
| `guidance.positive` | a prohibition | fix only when nothing near it says what to do; a prohibition beside its positive alternative is conforming (the rule over-flags these) |
| `reference.teaching-depth` | a reference section that owns a stage | add what to inspect, what good and bad look like, or when to stop, whichever is missing; a lookup section is conforming |
| `branch.condition`, `call.completeness` | the branch or call line | make the condition observable, or the call say when, where, what and what comes back |

The writer follows `skill-authoring:skill-creation` for each skill, one invocation and one commit per skill, in this order: the three handoff skills (`plan-handoff`, `spec-handoff`, `implementation-handoff`), then `debug-investigation`, `docs-maintain`, `implementation-pr-wrapup`, `plan-improve-repo`.

## Security

Decided by the Lead after the first review named its absence (it belonged before the outline; recorded late): the change edits skill text only. It adds no command, script, network call, credential, file write outside the skills' existing outputs, or new trust boundary; the throwaway check harness lives in the ignored `tmp/` and is never committed. Sensitive surfaces: none new. Decision: allowed.

## Running the rules here

`main` doesn't carry the #171 kit, and #171's runner always uses its own config and root, so it can't be pointed here. Each check runs the native engine (frozen C2) directly with a throwaway config in this worktree's ignored `tmp/` that points at #171's frozen rulebook, rules files and evidence project (entries `188116d0`) by absolute path, with `check.files` anchored at this worktree's root. It is checked with `--check` (twelve rules) and `--evidence` (pieces from all seven skill homes) before any Jev run. It is a check harness only; nothing of it is committed. Jev runs belong to the Lead, who holds the key; the writer runs `--evidence` and asks the Lead for each Jev run.

## Runs

| Run | Target | Kind | Writer | Status |
| --- | --- | --- | --- | --- |
| 1 | the seven skills, per the table above | update | Opus 5.5 | proposed |
| 2 | rules over the seven skills on Jev after run 1 | proof | the Lead | proposed |
| 3 | independent review (skill-review, implementation) | review | Sol xhigh | proposed |
| 4 | changelog entry, sunstack-dev version bump, PR | documents | the Lead | proposed |

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| P1 | Scope is the seven phase skills #172 doesn't touch | One owner per file across open PRs; #172 rewrites the other seven |
| P2 | Base `main`, not #171 or #172 | Skill text only; no new stack layer (the owner decides stacking) |
| P3 | Judged findings are candidates; the writer confirms or explains at the line | Tonight's measurements: run-to-run variance and `guidance.positive` over-flagging |
| P4 | Description trigger trials (G4) are a named gap | The Luna trial route waits on the owner's A/B/C decision |
