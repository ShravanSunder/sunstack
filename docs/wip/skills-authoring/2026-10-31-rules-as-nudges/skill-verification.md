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
| R1 a result is a nudge (observed vs standard, basis, severity, related locations; collected vs direction) | engine tests in `sunstack-tools` for the report fields; here, the placement rule's run on line 17 shows each part | the parts are report fields (mechanical); their content on line 17 is the tree's |
| R2 a rule names its chunk and edges | an evidence print per new or rebuilt rule, over real sources, each intended piece's fields read; review check that each rule's design states subject, denominator, edges, fields, budget | collection is observable without a model; the design statement is text |
| R3 a rule can nudge without deciding | the placement rule's labelled cases nudge on line 17 as worth checking; review check of the decision matrix's "worth checking" outcome | the tree's outcome on cases; the classification's text |
| R4 generalization and placement read every section | an evidence print with the denominator (every checked skill file, every section from the H1 down, tables included), compared with the file list | collection; the Advisor's focused print reached 76 of 76 skill files and 1,877 section pieces on 0.5.0 |
| R5 gaps shown apart from decided exclusions | runner tests in `tests/skills` on fixture reports holding each gap kind and an exclusion; two denominator cases: (a) a description rule over a `SKILL.md`, a reference and a JSON file gives no unread gap for the reference or the JSON file; (b) a generalization rule over an eligible section that produced no piece gives an unread gap | mechanical: the printout's sections |
| R5a, the engine: a nudge (`warn`) never fails our runs; `uncertain` keeps its status; the engine keeps each rule's authored severity and reports basis by path | engine tests: a rule authored `error` whose path runs a judged gate and then a mechanical finding keeps its `error` and its blocking exit, and reports basis `judged`; an all-mechanical path reports basis `mechanical` | mechanical |
| R5a, our policy: this repository authors judged paths as `warn` and keeps `error` for mechanical rules | a mechanical check over the rule files: no entry, and no route-level severity override, that a path reading a model's answer can reach is authored `error` | mechanical |
| R5a, the exits | runner test: a run with only `warn` nudges exits 0, because our runner sets no warning limit; invalid, incomplete and uncertain runs keep their exits | mechanical |
| R5b answers on every judged result | engine test: pass and `not_applicable` results carry answers | mechanical |
| R6 a pass says one thing | review check of `running-rules.md` and `check-and-reports.md` | text |
| R7 nudges are read, not obeyed | review check that `running-rules.md`, `skill-creation` step 4, `implementation-review.md`, `skill-orchestrator` and `skill-audit` teach the account (fixed, kept, routed, or open naming the missing evidence) and the commission rule; the behavior is an eval | text now; behavior later |
| R8 rule files get rules | the rule-file rules' labelled cases: real entries plus planted bad ones (a question asking two things; a route whose message says nothing) | the tree on cases |
| R9 the engine stays generic | engine design review; review check that the engine diff names no skill concept | text and diff |
| R10 each skill makes its path extremely clear | review check, per skill: a self-contained procedure, the shared example at its stage, a completion check; the behavior is an eval | text now; behavior later |

## Routes, per standard

| Standard (specification) | Route | Decided on |
| --- | --- | --- |
| 1 every nudge route says what the agent receives | `decision-model-review`'s new check; a rule-file rule once JSON lands | text of the routes |
| 2 a rule that can't settle nudges, never `pass` | `decision-model-review`'s new check; a rule-file rule | the tree's routes |
| 3 the agent decides the broader question first | eval | behavior |
| 4 a rule names the chunk its questions need, and only that | `decision-model-review`'s state check | the chunk against the questions |
| 5 "no gaps" only when there are none | runner tests; review check of written readings | the printout; the text |
| the placement standard | judged rule, severity `warn` | the tree on cases |
| the description loading-scope standard (D22) | judged rule, severity `warn` | the tree on cases |
| `rule.generalization`, rebuilt | judged rule | the tree on cases, against today's rule |

## Proof plan

1. **The spike (D10, D10a), before the engine contract freezes.**
   - A keyed run on a scratch config with the signed 0.5.0 engine:
     - the Advisor's `section` kind, whose own body is proven; its targets come from the raw section text, so a child's loads also reach its parent;
     - the placement tree's two Nouls;
     - `warn`, which is the nudge itself (D21).
   - 49 section pieces from real copies of `ops-observability-stack` (with its references), `practices-cleanup` and `platform.md`, plus one synthetic labelled-example skill.
   - The cases:
     - line 17's section;
     - `practices-cleanup`'s allow-list table;
     - the AgentStudio and Agent VM loop references;
     - countercases: the labelled example, the toolkit's own observability references, and the platform contracts.
   - The description case is out: section bodies omit frontmatter.
   - Expectations are frozen in `expectations.md` beside the run, written before any result was read.
   - Records the answers. It tests the decide stage only, and ships nothing.
   - **Ran 31 Oct, 16:05 to about 16:20,** in two runs: 78 requests, reported cost $0.0024 (28 requests reported no cost, so the full bill isn't verified). The first run lost 28 pieces to transient connection failures, and the re-run completed them. Results against the frozen expectations:
     - line 17's section: nudged, anchored at line 7 (the start of the section's own text);
     - the cleanup allow-list table: nudged;
     - a cleanup section I'd expected to pass: nudged, and correctly (it routes into AgentStudio's and Router's own clean tasks);
     - the loop references: mostly passed section by section, the scope gap D18 answers;
     - the labelled example and `platform.md`: no nudge;
     - two false nudges on the toolkit's own VictoriaMetrics queries, the criteria gap D19 answers;
     - 8 of 49 pieces uncertain.

     A follow-up 2x2 probe through native `run_judgments`, with hand-built state standing in for the collector: H2 (the owned tool exemption removes the false nudges) confirmed; H1 (declared context helps) refuted, since the skill's description suppressed the AgentStudio nudges; H1b (the description is the cause) confirmed; line 17's load chunk nudged in all six conditions. 36 requests, reported $0.0023. Folded in as D18b, D18c and D19b. The line-17 result covers the whole intro section with all its loads, not an isolated load; a per-load unit, if built, must also pass a near-negative: the generic `producer-contract.md` load in the same section isn't blamed. Kept under `skill-rules/rules-purpose/probe-2x2/`.

     Kept with its definitions and expectations in the owner's memory-logs under `skill-rules/rules-purpose/spike-1/`.
2. **The engine pull request.** Its own design's verification, with the engine tests named above.
3. **This pull request, per run:**
   - **runs 1 to 6, 8 and 9:** static checks, which are the repository's skill lint, `pnpm --dir tests/skills rules --check`, the rule run on the changed files read with the new reading, and the runner tests;
   - **run 7:** both placement rules (section and description, D22) and the rebuilt `rule.generalization`:
     - an evidence print over the full denominator: every section from the H1 down, tables included, sections with no loads among them, each with its exact own-text spans and own-load targets and no nested section's loads; and every description in the generic plugins;
     - development cases, labelled before the run and reported per stratum:
       - inline routes in sections with no loads, such as `practices-cleanup`'s AgentStudio rows;
       - load routes, such as line 17's section, with a multi-load near-negative: the generic `producer-contract.md` load beside an application loop isn't the anchor;
       - descriptions: a positive (a generic skill that loads for one application's private debug procedure); negatives (a supported platform CLI, domain vocabulary, a labelled example, this toolkit's infrastructure, a product named only in a "Not for…" boundary); one mixed description; and `ops-observability-stack`'s description, which names AgentStudio, Agent VM and OpenClaw beside the shared stack, as an adjudication case;
       - cut and missing-target cases, which stay gaps, never a clean pass;
     - S4's controls (D23): `practices-cleanup` line 70 and the VictoriaMetrics line 47 nudge as negative or adjudication cases;
     - the locator: each case's acceptable labels written before its bar is chosen from labelled development cases; S4's exact line-17 result stays as recorded;
     - after the freeze, held-out cases from other plugins, labelled by agents independent of the rules; none of S4's inspected cases counts as held out;
     - today's `rule.generalization` as the baseline.
   - **rule-file rules:** development cases on real and planted entries, once the engine admits JSON.
4. **The design review.** `skill-review` at its design stage, on this folder.

## Trigger trial

Not applicable: no description changes.

## What stays unverified

- **The receiving agent's call:** whether a writer, review lead or Lead, given the line-17 nudge, makes a justified placement call. Waits for evals.
- **"Extremely clear" as behavior:** whether a fresh agent follows each skill without this history. The review can show the procedure and example are there, not that an agent succeeds.
- **Recall across the corpus:** named cases test the trees on chosen pieces. They don't show how many real placement or generalization problems the rules miss.
- **Merged section input (D22):** that adding loads' openings to a section leaves its own-text judgment unchanged. The 2x2 never varied openings, and no with-and-without comparison is planned; the per-stratum results carry the delivery claim.
- **Cross-repository homes:** where a product's workflow should live is named as a direction; no run reads another repository.
