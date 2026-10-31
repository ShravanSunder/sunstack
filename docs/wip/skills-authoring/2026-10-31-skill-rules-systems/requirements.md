# skill-rules systems: requirements

Draft 3, by the 🐒 Implementer Sidekick (Opus 5.5, `claude-local/c6a9871a`), 31 Oct 2026, revised after 10:27 EDT (from `date`), with the 🦉 Advisor Sidekick · Jev best practices (`codex-local/01a1920b`) as the source on Jev practice. Part one of the design set: requirements, [specification](specification.md), [skill design](skill-design.md), [skill verification](skill-verification.md). The [orchestration design](orchestration.md) fixes how the three skills work together and governs where this part differs. The 🦁 Lead accepts this design before any skill file changes.

Draft 2 reconciled draft 1 with the owner's later decisions: three skills, not two, and model versions handled as the owner decided O1 (orchestration §9), not by a pinning standard. Draft 3 adds what Phase 5's adopted points require of the success definition.

## The change

- **Class:** behavior-changing (`change-classes.md`: "An edit to `SKILL.md` prose, a reference's rules or a description is behavior-changing, whatever its size").
- **Runs, in order (the owner's structure decisions, 31 Oct, relayed by the Lead):**
  1. `create` **`sunstack-dev/domain-decision-models`**: a hidden domain skill beside `domain-rust`. It holds Part A, the decision-model practice: how to design and prove anything Jev answers. That covers:
     - state, evidence and question writing;
     - every step type, and the computation boundary;
     - composition and a per-node policy from labelled costs, with the uncertain route;
     - development and held-out proof, the probe contract and claim language;
     - diagnostics, and model-version recording.

     `skill-rules` and `decision-model-review` load it, and so do authors of engine evidence selection and `run_judgments` callers.
  2. `update` **`skill-authoring/skill-rules`**: Part B, the workflow. It covers which standard becomes a rule, markers, the kit files, the runner, rule tests and reading results. It loads `domain-decision-models` at its question-design step and again at its proof step, and loses the teaching that a mechanical label check can stand in for reading. One trigger phrase is added.
  3. `create` **`sunstack-dev/decision-model-review`**, written last: Part C, an independent review procedure for a decision model, whose checks can fail. It loads `domain-decision-models` as its checklist source.
  4. and 5. `update` **`skill-authoring/skill-review`** and **`sunstack-dev/implementation-review`**: a routing line each, sending a change that adds or edits a decision tree to `decision-model-review`, written after it (O2, decided option a; orchestration §9). Run 4's line names `decision-model-review` as a `sunstack-dev` skill (O4, decided option a).
- **Reusable behavior:**
  - `domain-decision-models` helps agents reliably design and prove a decision model whenever they ask a model typed questions. The system has five parts: the evidence it needs, one observable proposition per question, a tree that code walks, a costed policy with an uncertain route, and held-out proof against a baseline.
  - `skill-rules` helps agents reliably turn a skill's standard into a checked rule built that way.
  - `decision-model-review` helps a reviewer reliably find where a decision model departs from that practice, with checks that can fail.

## The need, in the owner's words (31 Oct)

- "what we ask jev to decie the deiciosn tree shokdul be simple queitson in a tree that lead to the right answer"
- "your deicion rules are not well done. so how do we make this rules proeprly?"
- "the skill rules ksill need to bekupdated then, we are writign bad rules"
- "skikll rules shodul ahve better systems. get a opus worker to work with advisor to write better ksills rules skill"
- On #183's appended `Completion:` lines: "i think the skil lmake this pendantic no? we discussed how we shoukd do this". The owner chose D4 = A: the model judges a step's own words, and no step needs a label.
- On the three skills working together: "i think we need to make a okrchestration design spec for the rule ksil land review skill" and "and advsior to fuklly valdiate it".
- On model versions (O1): "yes to jev latest as defautl. override acceptable".
- On routing review to the new skill (O2, 13:37Z): "yes a is gotod".
- On skill-authoring's dependency (O4, 11:17 EDT), answering "How should skill-authoring reach them?": "a: name the dependency (Recommended)".

**Success definition.** Given a standard to turn into a rule, an agent using the rewritten skills designs it as a system:

1. **The standard and its rule:** whether it becomes a checked rule and its marker, as today.
2. **The evidence:** what the questions must see, with enough context to judge it (antecedents, siblings, the opening), or the named evidence gap.
3. **The questions and the tree:**
   - one observable proposition per Noul, with instruction and criteria defining that same proposition;
   - a Choice only for mutually exclusive labels, with a fit check or fallback where its menu may not cover the input;
   - a Score only for one ordered dimension;
   - questions over the same evidence asked together, with code walking the tree;
   - no literal or lexical check standing in for the reading the standard asks for, and no counting, arithmetic or date computation asked of the model.
4. **The policy:** per node, the quantity thresholded, its thresholds with their inequalities, the intended route for an in-between answer, and declared route precedence, with mandatory obligations and vetoes decided before any weighted score. All of it is chosen from labelled costs: a false finding, a missed violation, a review.
5. **The proof:**
   - refine on development cases, then freeze;
   - score held-out good, bad and near-miss cases against the current rule as the baseline, within one resolved model version;
   - keep diagnostics that reproduce any error, and name what the records can't yet show.
6. **The review:** an independent reviewer using `decision-model-review` finds a model that breaks any of 2–5, at the line or node that breaks it, and says what proof is still unavailable rather than passing it.

## Who reaches the skills, and when

- **`domain-decision-models` (hidden, loaded by callers):**
  - `skill-rules` at its question-design and proof steps;
  - `decision-model-review` as its checklist source;
  - engine or `run_judgments` work in sunstack-tools, by its agents loading the domain skill by name, as they load `domain-rust`.
  - Hidden like the other domains, so a person or a caller names it.
- **`skill-rules` (model-invocable):** agents writing or repairing a rule, such as the Lead, a skill writer, or the next stage's rule rebuilds. They reach it through its description, or through `skill-orchestrator` and `skill-design`.
- **`decision-model-review` (model-invocable):** a Reviewer the Lead commissions for a change that adds or edits a decision tree, by name, or through the routing lines runs 4 and 5 add to `skill-review` and `implementation-review`.
- **Callers of `skill-rules`' references by path, unchanged:**
  - `skill-design` step 5 loads `references/decision-matrix.md`;
  - `skill-creation` step 4 and `skill-orchestrator` step 4 load `references/running-rules.md`.
  - Their paths and return contracts stay fixed.

## Evidence

| Signal | Date | Source | What it shows |
| --- | --- | --- | --- |
| `branch.condition` asks one three-way Choice whose criteria pack several propositions, acting on the top probability at 0.6. 13 of its 28 findings settled between 0.60 and 0.69. | 31 Oct | step-5 run 1, `step5/work/findings.jsonl`; the Lead's commission | multi-proposition Choice, one unexplained bar |
| The completion rule gates on a literal `Completion:` paragraph before the model reads the step (`skill-steps.yml`, `ast_grep` `completion`). That produced 81 findings on steps whose done state is phrased another way, and writers appended padding lines to satisfy it. | 31 Oct | `step5/dispositions.*`; PR #183 rework | a lexical label check standing in for the reading; the owner rejected the padding |
| `skill-rules`' own worked case teaches that pattern: "A step without a completion paragraph is itself the breach, so it ends in a finding … and no question is asked." | current | `skill-rules/references/markers-and-rules.md`, worked case | the skill taught the failure |
| One provisional policy within each question type, never evaluated per node. The 7 Choice nodes act on the selected label's probability ≥ 0.6, and the 8 Noul nodes (plus the selection Noul) use yes ≥ 0.7 / no ≤ 0.3. There are no Score or combine nodes and no authored uncertain edges. *(Corrected: an earlier draft said one 0.6 bar applied across types.)* | 31 Oct | `domain-skill-crafting/rules/*.rules.json` at d58e60ac; the Advisor's Audit Point 5 inventory | no costed per-node policy |
| The kit-precision PR (#181): pass vs `not_applicable` scored as different outcomes; a gate rerouting labelled-pass pieces; a heading credited without its text; first-line-only `same_file` evidence; held-out cases sharing skills with development cases | 31 Oct | `step5/pr181-review.md`, `pr181-lead-check-1.md` | evidence sufficiency, gate design and proof isolation all matter |
| f109's sent state holds the branch's lead-in without its attached actions, plus span, hash and byte metadata | 31 Oct | the morning run's `report.json` `evidence_seen`; the Advisor's `phase-4-jaggedness.md` Point 1 | missing decisive content, and irrelevant metadata in the state |
| The lint report keeps the sent state of every dispatched request, but no answers or path for passes and no resolved model for any result | 31 Oct | engine `outcome.rs:18–51`; the Advisor's `orchestration-validation-1.md` V1 | full-denominator replay and version records are unavailable on the rules path |
| Jev practice: twelve principles from TypeSafe's documentation; Phase 4's jaggedness points; Phase 5's pattern verification | 31 Oct | the Advisor's `phase-1-practice.md` (accepted reference), `phase-4-jaggedness.md`, `phase-5-patterns.md`; the Lead's dispositions | the standard the rewrite teaches |
| The owner's direction, quoted above | 31 Oct | the Lead's commission `skill-rules-rewrite-commission.md` and later relays | the basis |

## Authoring basis

- **Basis:** observed failure, plus user-directed intent.
- **The failure:** the kit's rules show the defects above, written by agents following the current `skill-rules`.
- **Reproduction:** reproduced (static). The rule entries, the run's findings and the dispositions show each defect. No fresh-agent run has yet shown that an agent following the current skill designs a rule this way. The proof plan makes that run with the current skill as the baseline arm (orchestration §10).
- **The intent:** the owner's direction to write "better systems" with the Advisor, and to design the rule and review skills as one system.

## Non-goals

- No edit to the kit's rules, evidence, config, the engine, or any skill besides these three and the two routing lines. `plugins/skill-authoring/README.md:15` changes only to name the one dependency (O4). Rebuilding the rules is the next stage.
- No keyed model runs by this writer; the Lead runs them, including evidence prints over a selected kind.
- No measurement of rebuilt rules on held-out labels. That is the next stage; this change's proof is the teaching-transfer comparison.
- No decision-model tooling, such as a policy-replay script, and no public report or storage design. The rules CLI's capture route is the Lead's engine design cycle (orchestration §9, O3), and any report-format addition goes to the owner first.
- No pinning standard. Model versions follow the owner's O1 decision: `jev-latest` by default, an explicit, recorded pinned override where one is needed.
- No Box, image or generic-runtime work; the Sunstack driver's text primitives stay the scope.
- No rewrite of the existing domains (`domain-rust`, `domain-typescript`, `domain-python`), beyond adding the two new skills to the plugin README's inventory.
- No change to the five outcomes, markers, the config, the check or the report reading, beyond what the design stage requires of them.
