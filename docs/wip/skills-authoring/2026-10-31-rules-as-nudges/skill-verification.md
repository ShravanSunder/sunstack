# Skill verification: rules as nudges

31 Oct 2026. Author: 🦁 Lead. Answers to [skill-design.md](skill-design.md). Draft.

Proof keeps three observations apart (D9):
- **collection:** what the evidence module gathered;
- **the tree:** what the decision gave on labelled cases;
- **the receiving agent's call:** what an agent does with the nudge.

The third is an eval and waits for the owner's evals. Nothing below claims it.

## Routes, per requirement

| Requirement | Route | Decided on |
| --- | --- | --- |
| R1 a result is a nudge (observed vs standard, basis, claim, related locations; collected vs direction) | engine tests in `sunstack-tools` for the report fields; here, the placement rule's run on line 17 shows each part | the parts are report fields (mechanical); their content on line 17 is the tree's |
| R2 a rule names its chunk and edges | an evidence print per new or rebuilt rule, over real sources, each intended piece's fields read; review check that each rule's design states subject, denominator, edges, fields, budget | collection is observable without a model; the design statement is text |
| R3 a rule can nudge without deciding | the placement rule's labelled cases give `check` on line 17 and never `breach`; review check of the decision-matrix's `check` outcome | the tree's claim on cases; the classification's text |
| R4 generalization and placement read every section | an evidence print with the denominator (every checked skill file, every section from the H1 down, tables included), compared with the file list | collection; the Advisor's focused print reached 76 of 76 skill files and 1,877 section pieces on 0.5.0 |
| R5 gaps shown apart from decided exclusions | runner tests in `tests/skills` on fixture reports holding each gap kind and an exclusion | mechanical: the printout's sections |
| R5a `check` never fails a run | engine test: a run with only `check` nudges exits 0 under a zero warning limit; invalid and incomplete runs keep their exits | mechanical |
| R5b answers on every judged result | engine test: pass and `not_applicable` results carry answers | mechanical |
| R6 a pass says one thing | review check of `running-rules.md` and `check-and-reports.md` | text |
| R7 nudges are read, not obeyed | review check that `running-rules.md`, `skill-creation` step 4 and `implementation-review.md` teach the account (fixed, kept, routed) and the commission rule; the behavior is an eval | text now; behavior later |
| R8 rule files get rules | the rule-file rules' labelled cases: real entries plus planted bad ones (a question asking two things; a route whose message says nothing) | the tree on cases |
| R9 the engine stays generic | engine design review; review check that the engine diff names no skill concept | text and diff |
| R10 each skill makes its path extremely clear | review check, per skill: a self-contained procedure, the shared example at its stage, a completion check; the behavior is an eval | text now; behavior later |

## Routes, per standard

| Standard (specification) | Route | Decided on |
| --- | --- | --- |
| 1 every nudge route says what the agent receives | `decision-model-review`'s new check; a rule-file rule once JSON lands | text of the routes |
| 2 a rule that can't settle nudges `check`, never `pass` | `decision-model-review`'s new check; a rule-file rule | the tree's routes |
| 3 the agent decides the broader question first | eval | behavior |
| 4 a rule names the chunk its questions need, and only that | `decision-model-review`'s state check | the chunk against the questions |
| 5 "no gaps" only when there are none | runner tests; review check of written readings | the printout; the text |
| the placement standard | judged rule, claim `check` | the tree on cases |
| `rule.generalization`, rebuilt | judged rule | the tree on cases, against today's rule |

## Proof plan

1. **The spike (D10), before the engine contract freezes.**
   - A keyed run on a scratch config with the signed 0.5.0 engine: a `section` kind with its own loads, and the placement tree's two Nouls.
   - Cases:
     - line 17;
     - `practices-cleanup/SKILL.md:40`;
     - `ops-observability-stack`'s description;
     - countercases: a labelled product example, this toolkit's own observability stack, platform vocabulary.
   - Record the answers. This tests the decide stage only, and ships nothing. It costs about $0.02, inside the $5 budget.
2. **The engine pull request.** Its own design's verification, with the engine tests named above.
3. **This pull request, per run:**
   - **runs 1 to 6:** static checks, which are the repository's skill lint, `pnpm --dir tests/skills rules --check`, the rule run on the changed files read with the new reading, and the runner tests;
   - **run 7:** the placement rule and the rebuilt `rule.generalization`:
     - an evidence print over the full denominator;
     - development cases (the anchor cases and countercases);
     - after the freeze, held-out cases from other plugins, labelled by agents independent of the rules;
     - today's `rule.generalization` as the baseline.
   - **rule-file rules:** development cases on real and planted entries, once the engine admits JSON.
4. **The design review.** `skill-review` at its design stage, on this folder.

## Trigger trial

Not applicable: no description changes.

## What stays unverified

- **The receiving agent's call:** whether a writer, review lead or Lead, given the line-17 nudge, makes a justified placement call. Waits for evals.
- **"Extremely clear" as behavior:** whether a fresh agent follows each skill without this history. The review can show the procedure and example are there, not that an agent succeeds.
- **Recall across the corpus:** named cases test the trees on chosen pieces. They don't show how many real placement or generalization problems the rules miss.
- **Cross-repository homes:** where a product's workflow should live is named as a direction; no run reads another repository.
