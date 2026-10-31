## Workflow

1. Inventory the local skill surface:
   - plugin README and manifests
   - `skills/*/SKILL.md`
   - `skills/*/agents/openai.yaml`
   - relevant repo `AGENTS.md` guidance

   Completion: every skill in scope is listed with its `SKILL.md` and `agents/openai.yaml` read.

2. Gather usage evidence:
   - memory summary already in context
   - targeted `MEMORY.md` hits for the repo, plugin, or workflow
   - the skill-failure log the standing instructions name, and other projects' memory notes, as candidates: check each against the owner's own words before using it, and label the note writer's own generalization a hypothesis
   - the 1-3 most relevant rollout summaries when exact evidence matters
   - raw sessions only when summaries do not contain the needed proof

   Completion: each source above was searched, or named as not needed with the reason, and says what it gave; every signal carries its source and date; and each inferred or single-sighting signal is labeled a hypothesis.

3. Review the flagged skills.

   MUST load `../skill-rules/references/running-rules.md`, run the rules over the skills in scope, and return its reading: the run's status, each finding with your call, each `uncertain` piece with your decision, and each gap. A skill in scope is flagged when a step 2 signal records its failure, when the reading holds an `error` finding in it, or when you confirm a finding there at its line, or decide an `uncertain` piece there is a breach of its standard. Each flag names its source, the dated signal or the rule and line, and a rule's flag sits beside the skill's session signals, never in place of them. The audit stays read-only, so a flag is its answer to a finding, not a fix. A rule is reported as run only when the engine's own report shows that it ran.

   IF any skill is flagged, use `skill-review`'s implementation stage as an evaluation of each flagged skill's existing files, and return each one's verdict and accepted findings; both feed that skill's action at step 5. IF the review can't run for a flagged skill (for example, the host can't start a second reviewer agent), return the reason beside that skill and mark its recommendation `awaiting review`: it stays incomplete until a review verdict exists, and its action at step 5 may be drafted from the session signal, labeled unreviewed. IF no skill is flagged, return `flagged skills: none` and go on to step 4.

   Completion: the rules' reading stands with what ran and every gap, each flagged skill names its flag's source, and each flagged skill has its review verdict and accepted findings, or is marked `awaiting review` with the reason its review couldn't run, its recommendation still incomplete; or the audit returned `flagged skills: none`.

4. Inspect upstream inspirations selectively:
   - open only the skills that map to the candidate workflow
   - extract mechanics, trigger wording, failure shields, and output shapes
   - avoid bulk-loading unrelated repositories

   Completion: each upstream skill opened maps to a named candidate workflow and names what was taken from it (a mechanic, trigger wording, a failure shield or an output shape), or the audit says why no upstream source was needed.

5. Classify candidates:
   - `update`: existing skill is the right bucket but stale or incomplete
   - `create`: missing distinct workflow with repeated evidence
   - `merge`: overlapping skills should become one clearer workflow
   - `skip`: one-off, vague, sensitive, or already covered

   MUST load `../domain-skill-crafting/SKILL.md` before choosing any action, and return the topics whose conditions hold for the candidates, with the standards each returns; each candidate's action keeps them.

   MUST load `../domain-skill-crafting/references/steering.md` and `../domain-skill-crafting/references/generalization.md` before choosing any action, and return, for each candidate, whether it keeps or breaks steering's standard on when a change is worth making and generalization's standard on task history; both results feed the candidate's action.

   Completion: every candidate carries exactly one action, with the evidence that selects it.

6. Shape every update/create recommendation:
   - trigger and ownership fit
   - `SKILL.md`: what stays in the compact core instructions
   - `references/`: what deeper detail, examples, rubrics, or templates move out of the core instructions
   - `scripts/`: what deterministic mechanics belong in scripts, or `not needed`
   - pressure coverage: exists (cite the run evidence), needed, or not needed with reason

   IF any candidate's action is `update` or `create`, load `../domain-skill-crafting/references/calls-and-placement.md` and return its placement standards that apply to each such recommendation; its `SKILL.md`, `references/` and `scripts/` slots keep them.

   Completion: every update/create recommendation fills all five slots, or the audit says no update/create recommendation is being made yet.

7. Produce the audit:
   - candidate name and action: update, create, merge, or skip
   - evidence: each signal with its source, date, and how often it recurred; label inferred or single-sighting signals as hypotheses
   - review verdict, for a flagged skill: its `skill-review` verdict and the accepted findings its action used, or `awaiting review` with the reason its review couldn't run
   - fix owner: skill prose, a code check, or the tool
   - source inspirations
   - why it helps
   - smallest useful change
   - progressive shape and proof recommendation for update/create items
   - priority

   Completion: every candidate has each field above, filled from the evidence of steps 1–6.
