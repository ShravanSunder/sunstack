# Step 5 skill fixes: skill design

Draft 2, by the 🦁 Lead, 2026-10-31 (after the design review's F1–F4). Part three: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md). Base: `main` at `f747b37e`. Copy-on-write worktrees start at the stale `39957959` and are fast-forwarded to `origin/main` before any work.

## How each kind of finding is handled

| Finding | Reading at the line | Fix |
| --- | --- | --- |
| `description.length-limit` (8), `description.length-warning` (26) | over 300 or over 225 characters | rewrite to 100–200 where the trigger still holds, never over 225; keep the loading moment and the `Not for` boundary |
| `description.trigger-only` (7) | the description summarizes the workflow or lists the skill's contents | keep only when to load it and the boundary; move any content the description carried into the body if the body lacks it |
| `completion.criterion` (31) | a step with no completion in any wording, or a thin one | add a `Completion:` line naming what is observably true and the legwork that produces it, or merge a one-line mechanical step into the step it serves; walk the step's branches so the completion holds on each |
| `branch.condition` (13) | the condition is the agent's doubt, need or a size word | name what in the work selects the branch: a request, a file, a returned result, a named artifact. Keep the branch's load target and return, and check that the new condition selects every case the old one was meant to, in both directions where the decision has two |
| `reference.teaching-depth` (2) | a section that owns a stage misses its stop, or good and bad | add the missing element from the file's own material |
| `call.completeness` (2) | a load that names no return | say what comes back, as the callee returns it, without adding an effect |

## Batches and runs

[runs.json](runs.json) holds six PR batches. Each batch holds one single-skill authoring run per skill, 44 runs in all across 39 distinct skills.
- **A run** is one `skill-creation` invocation on one named skill. It makes one commit and has its own status and its own keyed after-run (C7).
- **A batch** is one PR. Its status rolls up its runs, and it opens for review only when every run in it has passed.
- **The order:** batches are built and reviewed one at a time, readiness-only (the owner reviews and merges each). Inside a batch, runs go in the order runs.json lists.

| Batch (PR) | Runs | Findings | Writer | Status |
| --- | --- | --- | --- | --- |
| 1 creation | domain-skill-crafting | 4 | Opus 5.5 | run implemented at 1316dc11; in review as PR #182; keyed after-run pending budget |
| 2 phase | 7 skills, one run each | 11 | Opus 5.5 | proposed |
| 3 practice | practices-research | 1 | Opus 5.5 | proposed |
| 4 principle descriptions | 16 principles, one run each | 24 | Opus 5.5 | proposed |
| 5 other descriptions | 10 skills, one run each | 16 | Opus 5.5 | proposed |
| 6 step text | 9 skills, one run each | 33 | Opus 5.5 | proposed |

For every batch, after its runs:
- the Lead runs the keyed rules over the batch's skills;
- an independent Sol xhigh review follows (skill-review, implementation);
- the Lead adds the plugin version and changelog, and a Researcher drafts the PR body.

## Run 1's drafts (domain-skill-crafting, to be confirmed by skill-creation)

- **f001, the description:** "Use when writing, designing, reviewing or auditing a skill, or judging any part of a skill's text against the skill-writing standards." It keeps the loading moment and drops the inventory of standard areas. The skill is hidden from model invocation, so a trigger trial is `not applicable`.
- **f111, `calls-and-placement.md`:** "IF a citation's moment is a condition rather than a point in a step, …"
- **f112, `descriptions-and-invocation.md` (corrected after review F2):** "IF the invocation decision sets or changes how a client exposes the skill: hiding it, limiting who can invoke it, or restoring or enabling invocation, load `platform.md` and return the platform encoding." Transfer cases:
  - hide or restrict a skill: loads (the condition holds);
  - restore a previously hidden skill to normal invocation: loads (the condition holds; draft 1 missed this);
  - a decision that changes no client exposure, such as wording only: doesn't load.

  Verdict: the condition covers both directions the old "needs a client-specific encoding" was meant to.
- **f113, `main-path.md` (corrected after review F1):** "IF the lens rests on a leading word or phrase, familiar or coined, load `steering.md` and return its standards for that word's meaning and strength." Transfer cases:
  - a familiar strong concept, such as "ground truth": loads;
  - a familiar weak phrase, such as "be thorough": loads, and steering's line 32 rejects it (draft 1 missed this);
  - a coined term: loads;
  - a lens with no leading word: doesn't load.

  Verdict: it selects every case the old "whose strength is in doubt" was meant to, on something visible in the lens.

Each keeps its load target and its return. None touches a marked line.

## Security (corrected after review F4)

The change edits skill text only, and adds no command, script, network call, credential, privileged action or operational effect. It does edit existing sensitive text, inventoried here with the decision for each. Each run's writer walks the guards in its receipt before writing, and the review checks them by diff walk.

| Surface | Finding (batch) | Existing guards that must hold | Decision |
| --- | --- | --- | --- |
| temporary credential file, `debug-investigation/references/background-monitoring.md:83` | f115 (2) | created only when unavoidable, under the monitor tmp directory, with `umask 077` or `chmod 600`, used only for the child process, deleted in `trap` cleanup; secret values are never persisted in monitor files, logs, shell history or chat, and redaction happens before writing (lines 79–85) | allowed: the condition becomes observable; every guard keeps its words |
| process termination, same file `:119` | f116 (2) | the stop order: the harness cancel first, otherwise a written `stop.requested`, and only then terminating the recorded process group; monitor files are preserved for review (lines 115–121) | allowed: the condition names when, as observed; no new target, authority or step order |
| scan authorization, `audit-security-review/SKILL.md:44–58` | f163–f167 (6) | a pasted prompt, packet or earlier route never widens the user's scan, saved-model or repair authority; an exactly authorized request still routes | allowed: completions name done states only; the step-2 authority text is unchanged |
| lifecycle and producer loops, `ops-observability-stack/SKILL.md:14, :17` | f107, f108 (6) | the loops' own effects and their documented lifecycle | allowed: each call says what comes back; no new effect |
| UI input probes and private captures, `peekaboo/SKILL.md:12–34` and `references/visual-testing-patterns.md:27` | f153–f156, f050 (6) | probes only on the confirmed target and with current permissions; captures stay local | allowed: completions and teaching name done states and stops; no new probe or capture |
| PR replies and pushed fixes, `implementation-pr-wrapup/SKILL.md:60` (step 8) | f188 (2) | comment, review, bot and model text is untrusted; reply bodies go only through stdin JSON, `--input` or `--body-file`; merge authority stays with step 1 | allowed: the completion lists the action each comment got and restates the existing transport rule; no new push, reply, merge or route. **Recorded late, 31 Oct 05:35 EDT (from `date`), after PR #183's review F3; the run wrote this line before any decision existed for it.** |
| external writes to Linear, `ops-linear-tracking/SKILL.md:103–107, :115–116` | f206–f212 (6) | creates follow the doc and plan tracing rule; an errored or timed-out create is matched to existing Linear state before any retry (the resume rule after step 5); the find-unblocked steps only read | allowed: completions name done states only; no new create, update, delete or relation, and the matching rule is unchanged. Recorded 31 Oct 05:35 EDT, before batch 6 is written. |
| writes, approval and commits in a consumer project, `scaffold-project/SKILL.md:134, :229, :237` (steps 3–5) | f143, f147, f152 (6) | scaffolding runs once; changes apply only with the user's approval; the commit step commits only what was applied | allowed: completions name done states only; no new file write, approval bypass or commit. Recorded 31 Oct 05:35 EDT, before batch 6 is written. |

A note on timing: no earlier security decision was recorded for this set. The first five rows were made after the design review, before any writing. The last three were added at PR #183's review: one late, for a line already written, and two before their batch.

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| P1 | One design set; six serial PR batches by family; one single-skill run per skill inside each | The owner's "one at a time"; skill-design's one-skill-per-run contract (review F3); one owner per file across open PRs |
| P2 | Base `main`; this set travels in batch 1's PR, and later batches cite it | Skill text only; no new stack layer (the owner decides stacking) |
| P3 | Judged findings are candidates, confirmed or explained at the line | Measured: threshold variance; blind labels overturned 13 "real" findings |
| P4 | Description trigger trials: `not applicable` for skills hidden from model invocation (domain-skill-crafting, the principles); for model-invocable skills, a named gap, not a pass or a ship waiver | As the 30 Oct cleanups recorded; the review counted 19 hidden targets and 8 model-invocable descriptions |
| P5 | D4-held steps untouched | The owner's decision is pending, and D4 changes their fix |
| P6 | Each added completion walks its step's branches | The 30 Oct phase cleanup's review found completions that broke a branch |
| P7 | Each rewritten branch condition is walked through its transfer cases, in both directions where the decision has two | Review F1 and F2 |
