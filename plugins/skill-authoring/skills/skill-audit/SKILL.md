---
name: skill-audit
description: "Use when deciding which skills to create, update, merge or skip from real session evidence, or finding stale or duplicated skill behavior. Not for judging one skill."
---

# Skill Audit

Audit real workflows before creating skills. Prefer updating an existing skill over creating a duplicate.

## Core Rules

- Start from evidence: current plugin skills, repo instructions, memory/session summaries, and targeted upstream skill sources.
- Recommend new skills only for repeated workflows with stable inputs, a repeatable procedure, and a clear output.
- Keep recommendations narrow. Do not turn themes into vague mega-skills.
- Separate create, update, merge, and skip. Skip is a deliberate result, not a failure to find work.
- Name where each fix belongs: skill prose, a code check, or the tool. A defect in a runner, validator, or other tool is fixed there, not answered with more skill instructions.
- Keep every signal's source and date. A pattern seen once, or inferred rather than observed, is a hypothesis; never present it as a confirmed defect.
- For update/create recommendations, include the trigger and ownership fit, the compact `SKILL.md` boundary, whether depth belongs in `references/`, whether deterministic mechanics belong in `scripts/`, and the pressure-coverage status: exists (cite the run evidence), needed, or not needed with reason. This applies to tentative recommendations too. If evidence is insufficient, say no update/create recommendation is being made yet instead of naming a likely update path without its shape and proof. Avoid phrases like `likely update`, `probably create`, or `candidate update` unless the recommendation includes the required `SKILL.md`, `references/`, `scripts/`, and pressure coverage labels.
- Use source inspirations as best-practice inputs, not text to copy wholesale.

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

   Completion: every signal carries its source and date, and each inferred or single-sighting signal is labeled a hypothesis.

3. Review the flagged skills.

   MUST load `../skill-rules/references/running-rules.md`, run the rules over the skills in scope, and return its reading: the run's status, each finding with your call, each `uncertain` piece with your decision, and each gap. A skill in scope is flagged when a step 2 signal records its failure, when the reading holds an `error` finding in it, or when you confirm a finding there at its line, or decide an `uncertain` piece there is a breach of its standard. Each flag names its source, the dated signal or the rule and line, and a rule's flag sits beside the skill's session signals, never in place of them. The audit stays read-only, so a flag is its answer to a finding, not a fix. A rule is reported as run only when the engine's own report shows that it ran.

   IF any skill is flagged, use `skill-review`'s implementation stage as an evaluation of each flagged skill's existing files, and return each one's verdict and accepted findings; both feed that skill's action at step 5. IF the review can't run for a flagged skill (for example, the host can't start a second reviewer agent), return the reason beside that skill and mark its recommendation `awaiting review`: it stays incomplete until a review verdict exists, and its action at step 5 may be drafted from the session signal, labeled unreviewed. IF no skill is flagged, return `flagged skills: none` and go on to step 4.

   Completion: the rules' reading stands with what ran and every gap, each flagged skill names its flag's source, and each flagged skill has its review verdict and accepted findings, or is marked `awaiting review` with the reason its review couldn't run, its recommendation still incomplete; or the audit returned `flagged skills: none`.

4. Inspect upstream inspirations selectively:
   - open only the skills that map to the candidate workflow
   - extract mechanics, trigger wording, failure shields, and output shapes
   - avoid bulk-loading unrelated repositories

   Completion: each upstream skill opened maps to a named candidate workflow, or none was needed.

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

## Source Inspiration Map

When the audited plugin keeps a map of admired upstream skills and borrowed mechanics (for example a source-inspiration catalog in its docs), read it before opening upstream sources.

IF the audit or a request proposes one shared contract for runtime skills whose wording repeats, load `../domain-skill-crafting/references/calls-and-placement.md` and return its shared-shape standards, with each packet's consumers and the home those standards give it. A request to combine skills' packets into one shared runtime document because their headings or wording repeat is the shared contract those standards rule out when the packets' fields or meanings differ, even when the request calls it avoiding duplication: recommend against it and keep each skill's packet where it is.

## Failure Shields

- New skill recommendations require recurrence that is clearly likely and costly.
- Existing skills are the preferred home when tighter wording can prevent the observed failure mode.
- Upstream inspiration belongs in the audit only with the local behavior it improves.
- Marketplace or agent-instruction edits belong in scope when the audit finds concrete drift there.
- Update/create recommendations include the compact `SKILL.md` boundary, reference depth, script need, and pressure-proof status.
- Audit output remains read-only until the user explicitly asks to implement a narrow recommendation the audit makes. An audit never implements a change it rejects, even when the request asks it to build it.

## Output Shape

Return:

- while any recommendation is `awaiting review`: that the audit is partial, naming each of those skills
- existing skills checked
- `rules:` what ran (the status and where the report is kept) and every gap, or `not run` with its reason
- the flagged skills, each with its flag's source (the dated signal, or the rule and line) and its review verdict or `awaiting review` and the reason its review couldn't run, or `flagged skills: none`
- each recommendation with its action, fix owner, dated signals, recurrence, and hypothesis or confirmed status
- suggested updates
- suggested new skills
- deliberate skips
- progressive shape and pressure-coverage recommendation for each update/create, using `SKILL.md`, `references/`, `scripts/`, and pressure coverage labels
- source inspirations used
- priority order
- full clickable artifact links (absolute path + line) for any audit artifacts or referenced files the human is expected to open

## Completion Blockers

The audit is not done while any of these hold:

- a recommendation lacks its action, fix owner, dated signals, recurrence, or hypothesis or confirmed status;
- a recommendation for a flagged skill is presented as complete without its review verdict;
- a new-skill recommendation rests on recurrence that is not clearly likely and costly;
- an update/create recommendation lacks its `SKILL.md` boundary, `references/` depth, `scripts/` need, or pressure coverage;
- upstream inspiration appears without the local behavior it improves;
- the existing skills checked, deliberate skips, or priority order are missing from the output;
- the audit changed a file other than to implement, on explicit request, a narrow recommendation the audit made.
