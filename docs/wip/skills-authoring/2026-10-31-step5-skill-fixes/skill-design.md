# Step 5 skill fixes: skill design

Draft 1, by the 🦁 Lead, 2026-10-31 04:29 EDT. Part three: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md). Base: `main` at `f747b37e`. Copy-on-write worktrees start at the stale `39957959` and are fast-forwarded to `origin/main` before any work.

## How each kind of finding is handled

| Finding | Reading at the line | Fix |
| --- | --- | --- |
| `description.length-limit` (8), `description.length-warning` (26) | over 300 or over 225 characters | rewrite to 100–200 where the trigger still holds, never over 225; keep the loading moment and the `Not for` boundary |
| `description.trigger-only` (7) | the description summarizes the workflow or lists the skill's contents | keep only when to load it and the boundary; move any content the description carried into the body if the body lacks it |
| `completion.criterion` (31) | a step with no completion in any wording, or a thin one | add a `Completion:` line naming what is observably true and the legwork that produces it, or merge a one-line mechanical step into the step it serves; walk the step's branches so the completion holds on each |
| `branch.condition` (13) | the condition is the agent's doubt, need or a size word | name what in the work selects the branch: a request, a file, a returned result, a named artifact; keep the branch's load target and return |
| `reference.teaching-depth` (2) | a section that owns a stage misses its stop, or good and bad | add the missing element from the file's own material |
| `call.completeness` (2) | a load that names no return | say what comes back, as the callee returns it |

The writer follows `skill-authoring:skill-creation` for each skill, one invocation and one commit per skill, and records each finding's disposition in the run's receipt.

## Runs

| Run | Target | Kind | Writer | Status |
| --- | --- | --- | --- | --- |
| 1 | domain-skill-crafting (f001, f111, f112, f113) | update | Opus 5.5 | proposed |
| 2 | the 7 phase skills in runs.json (11) | update | Opus 5.5 | proposed |
| 3 | practices-research (1) | update | Opus 5.5 | proposed |
| 4 | the 16 principle descriptions (24) | update | Opus 5.5 | proposed |
| 5 | the other 10 descriptions (16) | update | Opus 5.5 | proposed |
| 6 | step text in 9 skills (33) | update | Opus 5.5 | proposed |
| each | keyed rules over the run's skills after its writing | proof | the Lead | proposed |
| each | independent review (skill-review, implementation) | review | Sol xhigh | proposed |
| each | plugin version, changelog, PR body (Researcher) | documents | the Lead | proposed |

One run is one PR, built and reviewed one at a time, readiness-only: the owner reviews and merges each.

## Run 1's drafts (from the writer's reading, to be confirmed by skill-creation)

- **f001:** the description becomes "Use when writing, designing, reviewing or auditing a skill, or judging any part of a skill's text against the skill-writing standards." It keeps the loading moment and drops the inventory of standard areas.
- **f111:** "IF a citation's moment is a condition rather than a point in a step, …"
- **f112:** "IF the decision hides the skill from model invocation or limits who can invoke it, …"
- **f113:** "IF the lens rests on a coined term or a word the skill has to define, …"

Each keeps its load target and its return. None touches a marked line.

## Security

The change edits skill text only. It adds no command, script, network call, credential, file write outside the skills' existing outputs, or new trust boundary. Sensitive surfaces: none. Decision: allowed.

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| P1 | One design set, six runs, one PR per run, by family | The owner's "one at a time"; one owner per file across open PRs |
| P2 | Base `main`; this set travels in run 1's PR, and later runs cite it | Skill text only; no new stack layer (the owner decides stacking) |
| P3 | Judged findings are candidates, confirmed or explained at the line | Measured: threshold variance; blind labels overturned 13 "real" findings |
| P4 | Description trigger trials: `not applicable` for skills hidden from model invocation (domain-skill-crafting, the principles); for model-invocable skills, a named gap until the trial route is settled | As the 30 Oct cleanups recorded |
| P5 | D4-held steps untouched | The owner's decision is pending, and D4 changes their fix |
| P6 | Each added completion walks its step's branches | The 30 Oct phase cleanup's review found completions that broke a branch |
