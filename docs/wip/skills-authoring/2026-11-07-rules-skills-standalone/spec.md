# Rules skills: standalone, split and corrected

Design set for one change in six runs, written 7 November 2026 by the Opus skill writer for the 🦁 Lead (`claude-local/affa24ce`), from the Lead's [writer commission](/Users/shravansunder/dev/memory-logs/projects/2026/2026-10-skills-and-sessions/scratch-root-01a1635f/skill-rules/rules-skills-standalone-2026-11-07/writer-commission.md). Base: ai-tools `8244ef4d` (#199 merged), branch `skills/rules-skills-standalone`.

**The answer.** `skill-rules` splits by reason to change into `skill-rules-authoring` (which standards become rules, and how a rule or filter is designed and proven), `skill-rules-review` (independent review of one rule against the owner's requirements) and `skill-rules-config` (the shipped sunstack 0.8.3 rulebook and lint manual). `domain-decision-models` and `decision-model-review` move from `sunstack-dev` into `skill-authoring`, so skill authoring depends on nothing in `sunstack-dev`. The teaching is corrected for the four ways this week's rebuilt trees failed: examples taken from scored cases, a question whose meaning drew the owner's boundary wrong, no ruling check before a run, and no judgment about when a chunk needs a tree; the review gains the check that would have caught the first two. Still open: the design review runs after the files, in the Lead's sequence (D13), and no fresh-agent behavior run is in scope.

Parts: [1 Requirements](#part-1-requirements) · [2 Specification](#part-2-specification) · [3 Skill design](#part-3-skill-design) · [4 Skill verification](#part-4-skill-verification).

## Part 1: Requirements

### The change

- **Class:** behavior-changing. It alters main paths, reference allocation, review checks and three new triggers across six runs (Part 3).
- **Runs:** `create` for `skill-rules-config`, `skill-rules-authoring` and `skill-rules-review`; `update` (move and correct) for `domain-decision-models` and `decision-model-review`; retire `skill-rules` with every caller cut over, no forwarding stub.
- **Reusable behavior:** this skill set helps agents reliably turn a skill's standard into a judged rule whose questions draw the owner's boundaries and whose examples never leak its cases, and catch it before a paid run when they don't, whenever they design, review, encode or run a skill rule.

### The need

Development run #2 (`pr2/dev-run-2/development.json`, sha256 `6d14751f…`, engine 0.8.3, model `typesafe/jev-1.14-20261014`) failed both rebuilt trees, which were built by following our own skills. Both Advisors read the saved requests and found causes the skills taught or allowed:

| # | Failure | What the skill said | Source |
| --- | --- | --- | --- |
| 1 | The kind filter's `reference.examples` held the real descriptions of `domain-decision-models` (s018) and Agent Studio (s002) with their expected labels; both were scored. | `domain-decision-models/SKILL.md:33` forbids it, but `:41` teaches "the owner's rulings for the product-workflow rule sit in its `reference` as examples, each with its answer"; `skill-rules/references/rule-design.md:162,246` teach the same. | O1 (`pr2/review/review.md`), Jev Advisor F1, Program Advisor F2 |
| 2 | K002's first question called a public tool used as documented (Demistify CLI, security routing, a TypeScript toolchain) "product material" in all five of the owner's quiet cases (P .83–.93). | `domain-decision-models/SKILL.md:99` shows that exact question as **Good**. | Jev Advisor F3, Program Advisor F3, decision page |
| 3 | The kind filter labelled `decision-model-review` general (owner: domain) and `practices-verification-maintenance` general (owner: repo-specific). | Nothing tells an author to read every owner-ruled case against the questions, on the text Jev receives, before spending a run. | Jev Advisor F2, Program Advisor F1 |
| 4 | K002 judged every section of every general skill, including sections that teach no procedure. | Nothing teaches when a chunk needs a Jev tree and when its shape is the answer. | commission cause 4; owner: a chunk tree helps "in some situations, not all" |
| 5 | The O7 review passed both trees. | `decision-model-review/references/checks/questions.md:17` checks that "the standard's negative cases pass", read from question text; no check that examples aren't cases. | `pr2/o7/review.md` (U16 rows 6–7 mapped "boundary excludes it alone → pass" without a request) |
| 6 | Judgment was buried in mechanics. | `skill-rules` is one eight-step workflow, 182 lines plus about 770 lines of references; design judgment sits in step 3 between marker, JSON, config and report mechanics. | commission cause 6 |

### Success, in the owner's words

- Every Jev judgment is "a tree" of simple questions that each ask one thing, filters included; "are we using decision trees and jev standard practices or not" (U23, U24).
- Examples: "we need examples in config or rules so we provide that in state" (U25); the owner's settled decision for this change: examples are general, written from the standard, never taken from cases, and never carry a case's answer; the owner's rulings go in case files.
- "skill authoring should not depend on sunstack dev."
- "fix the skill"; "why you did not follow the skill" (U28): the skills teach this way.
- A Jev chunk tree helps "in some situations, not all."
- The Lead reviews this work, then the Advisors check "that skill rules is right."

### Who reaches each skill

| Skill | Reached by | When |
| --- | --- | --- |
| `skill-rules-authoring` | an agent unprompted; `skill-design` step 5 (its decision matrix); a person | deciding which standards become rules; designing or correcting a rule or filter |
| `skill-rules-review` | `skill-review` step 2 (a reviewer agent); `skill-rules-authoring` before the first paid run; a person | a rule or filter needs an independent read before a run or a switch-on |
| `skill-rules-config` | an agent unprompted; `skill-creation`, `skill-audit`, `skill-orchestrator`, `skill-review` (running the rules); `skill-rules-authoring`; a person | writing rulebook files, running lint, reading a report or a case run |
| `domain-decision-models` | loaded by path by `skill-rules-authoring`, `decision-model-review`; hidden | the decision-model work it governs |
| `decision-model-review` | `skill-rules-review`; `sunstack-dev`'s `implementation-review` (allowed direction); a person | any decision model needs an independent review |

### Evidence

- 6 Nov, owner messages, `owner-quotes-2026-11-06.txt` (U23–U28); owner rubric `owner-rubric/rubric.md`.
- 6–7 Nov, development run #2 report and replay, `pr2/dev-run-2/`.
- 7 Nov, `jev-usage-review/jev-advisor.md` and `jev-usage-review/program-advisor.md`: request-level evidence for every wrong label and false warning.
- 7 Nov 00:56, `pr2/o7/review.md`: the review that passed both trees.
- 7 Nov, `pr2/review/review.md` (O1: example and case overlap).
- 7 Nov, the decision page `decision-one-correction.html` (sunstack-tools docs worktree).
- 7 Nov, the commission's settled owner decisions (move, split, examples, chunk trees).
- Engine contract: sunstack-tools `origin/main` `26b316c` = `v0.8.3`, `crates/sunstack/README.md`.

All paths above under `…/skill-rules/decision-trees-everywhere-2026-11-06/` unless absolute. Held-out case contents were never opened; only the development export `pr2/review/development-cases.json` was read (96 cases: 67 filter, 29 rule; 18 owner-ruling).

### Authoring basis and proof posture

- **Basis:** observed failure (causes 1–5, recorded in a real run and two reviews of its saved requests) and user-directed intent (the move, the split, the example rule, the chunk-tree judgment).
- **Reproduction:** not attempted. The failing *rules* are recorded on the real engine; whether a fresh agent following the *old skills* reproduces causes 1–3 was not run, because model runs and pressure tests are out of this commission's scope. Open to the owner: a fresh-agent authoring task on a real standard with owner rulings, old skills against new.
- **Posture:** drafted from user intent and observed failure records; behavior not yet evaluated.

### Non-goals

Rebuilding either held tree; any engine change; any model run or pressure test; merging; renaming the rulebook's file names (`skill-rules.config.json`, `skill-rules.cases.json`), which name files, not the skill.

## Part 2: Specification

### What the skills must do

1. `skill-rules-authoring` routes each candidate standard to one outcome and designs each marked rule or filter as a decision model, from its cases, before any marker or entry is written.
2. It gathers each judged rule's and filter's cases first, the owner's rulings among them, into the case file and never into `reference`.
3. It teaches choosing the chunk: mechanical when a shape decides the piece; a chunk tree (a selection the decision model makes) when the shape finds candidates but which candidates are the right kind is a judgment.
4. It teaches that a question's meaning is the operational definition of the owner's boundary, and that one property is one question however many examples it covers.
5. It teaches `reference` examples written from the standard, and checks every example against every case before a run.
6. It requires a desk check before any paid run: every owner-ruled development case read against the questions on the state the model will receive, with each mismatch fixed in the meaning, never in the label.
7. It requires an independent `skill-rules-review` before the first paid run, and holds a rule that misses its floors.
8. `skill-rules-review` reviews one rule or filter by walking `decision-model-review`'s checks and its own three skill-rule checks, and returns a verdict that never reads "ready to switch on" from a source-only review.
9. `skill-rules-config` documents only the shipped engine: config, rulebook pairs, markers, entries, filters, evidence kinds including single-Noul `select` and `within`, `lint`, `--check`, `--rules`, `--evidence`, `--report`, `lint show`, `lint cases`, and the report; it says plainly that tree-shaped selection isn't shipped.
10. `skill-rules-config` keeps the procedure for running the rules on skill files and accounting for each nudge, for every skill that runs them.
11. `domain-decision-models` teaches the corrected example and question standards with this week's failures as its worked Bad cases, and names no `sunstack-dev` skill or principle.
12. `decision-model-review` checks examples against cases and the standard's negative cases on the state the model receives, and seats its reviewer the host's own way.
13. No skill in `skill-authoring` loads, names as a dependency, or links a `sunstack-dev` skill; `skill-rules` is gone with every caller cut over.

### Standards the skills state

- A reference example is written from the standard, is never a labelled case's text, and never carries a case's expected answer.
- An owner's ruling on a real piece is a case, kept in the case file with `label_from: owner-ruling`.
- A question's criteria define the owner's boundary for its property, and are read against the labelled cases on the state the model receives before any run.
- One property is one question; a wrong meaning is fixed by changing the meaning, not by adding questions.
- A chunk stays mechanical when its shape decides which pieces the standard governs; it becomes a decision-model selection only when the shape finds candidates and choosing among them takes reading.
- Before a paid run, every owner-ruled development case is read against the questions on the encoded state, and a mismatch goes back to the question's meaning.
- A source-only review returns at most "ready for its development run", never "ready to switch on".
- A rule's negative cases count as passing only when read on the state the model receives, or the check is partial with that state named as missing.

### Rules and their transfer cases

| Rule | Case one: where it should hold | Case two: a bad choice it never names | Verdict |
| --- | --- | --- | --- |
| Examples are written from the standard and are never a scored case or its answer. | A support-ticket intent classifier: its reference shows a refund request written from the intent policy, not a ticket from its evaluation set. Holds. | An essay grader whose rubric anchors are three essays from the batch being graded, with their grades. The rule names no rubric, and rejects it: those essays are cases carrying answers. | passes |
| A question's meaning is the operational definition of the owner's boundary. | A fraud screen's question "foreign card used?" against the owner's boundary "someone other than the holder used the card": a traveller's legitimate purchase fails the boundary. Holds. | A moderation rule asking "does the post name a person?" when the policy's boundary is "targets a person with abuse". Names no moderation, rejects it. | passes |
| Desk-check every owner-ruled case on the state the model receives before a paid run. | A medical-coding classifier with clinicians' rulings: read on the extracted note the model receives, before batch scoring. Holds. | Spending a run, then explaining its misses by reading only the question text. Rejected: the state was never read. | passes |
| Use a chunk tree only when the shape finds candidates but their kind is a judgment. | A code linter rule "public API handlers validate input": functions are found by shape; whether one is a public handler takes reading. Holds; "function length" stays mechanical. | Judging every paragraph of a README for install-step accuracy, because "a paragraph" was the only shape at hand. Rejected: most paragraphs aren't install steps, and a heading match can't decide which are. | passes |

## Part 3: Skill design

### Runs, in sequence

| Run | Target | Kind | Owner plugin | Consumers cut over in the same run |
| --- | --- | --- | --- | --- |
| R1 | `domain-decision-models` | move + correct | `skill-authoring` | `active-rulebook.test.ts` marked-line oracle path |
| R2 | `decision-model-review` | move + two check items + host-neutral seating | `skill-authoring` | `implementation-review/SKILL.md:39` (load by name, from `skill-authoring`, with a `skill unavailable` return); sunstack-dev README; phase-composition map regenerated |
| R3 | `skill-rules-config` | create | `skill-authoring` | `running-rules.md` callers: `skill-creation:48`, `skill-audit:42`, `skill-orchestrator:43`, `skill-review/references/implementation-review.md:9`; architecture linter page |
| R4 | `skill-rules-authoring` | create | `skill-authoring` | `skill-design:71` (decision matrix); `domain-skill-crafting/references/calls-and-placement.md:119`; AGENTS.md table; READMEs |
| R5 | `skill-rules-review` | create | `skill-authoring` | `skill-review/SKILL.md:33` routes rule entries to it |
| R6 | retire `skill-rules` | delete | `skill-authoring` | manifests' keywords and default prompts, versions, changelog, architecture docs |

### Surface allocation

| Run | Trigger | Main path | Depth | Proof |
| --- | --- | --- | --- | --- |
| R1 | unchanged, hidden | corrected Good/Bad at examples and questions; new question-meaning standard; driver section made engine-neutral; principle links replaced with inline judgments | `worked-trees.md` (K002 and kind trees re-taught as recorded failures); `proof-and-records.md` (examples vs cases; desk check); `sunstack-driver.md` removed, content to R3 | marked lines byte-identical (test) |
| R2 | unchanged | seating neutral; routing review named generically | `checks/state-and-evidence.md` (examples aren't cases); `checks/questions.md` (negative cases on the sent state); `checks/review-schema.md` (added check names) | static |
| R3 | new, model-invocable | the engine's object model and the task routes | `rule-entries.md`, `evidence-kinds.md`, `requests-and-reports.md`, `case-runs.md`, `running-rules.md` | `--check`/`--rules` unchanged; static |
| R4 | new, model-invocable | nine steps, judgment only; each mechanical action routed to R3 | `decision-matrix.md`, `rule-design.md`, `cases-and-proof.md` | static; behavior owed |
| R5 | new, model-invocable | admit, the model's checks, three skill-rule checks, reduce, verdict | `checks/owner-rulings.md`, `checks/chunk-and-coverage.md`, `checks/lint-contract.md` | static; behavior owed |
| R6 | — | — | — | `rg` shows no runtime `skill-rules` reference |

### Triggers

| Skill | Decision | Description |
| --- | --- | --- |
| `skill-rules-authoring` | model-invocable, user-invocable | "Use when deciding which of a skill's standards become checked rules, or designing or correcting a rule or filter: its chunk, questions, examples and cases. Not for rulebook syntax or lint runs." |
| `skill-rules-review` | model-invocable, user-invocable; reached by `skill-review` | "Use when independently reviewing a skill rule or filter before its development run or switch-on, or when its results look wrong. Not for authoring one, or a decision model outside a rulebook." |
| `skill-rules-config` | model-invocable, user-invocable; reached by five skills | "Use when writing or repairing a sunstack lint rulebook (markers, rule or filter entries, evidence kinds, config pairs) or running lint, lint show or lint cases and reading the report." |
| `domain-decision-models` | hidden (unchanged) | unchanged |
| `decision-model-review` | model-invocable (unchanged) | unchanged |

Boundaries name only the neighbour each is confused with: authoring ↔ config (design vs syntax), review ↔ authoring and ↔ `decision-model-review` (a rulebook rule vs any decision model).

### Main paths

**`skill-rules-authoring`.** Lens: a judged rule is a *measurement instrument* for one standard; its questions are the *operational definition* of the owner's boundary, and its cases are the only test of that definition, so cases come first and never *leak* into the instrument. Route:
1. List the candidate standards.
2. Classify each (MUST load `references/decision-matrix.md`).
3. Gather each judged rule's or filter's cases first (MUST load `references/cases-and-proof.md`).
4. Design each marked rule or filter (MUST load `references/rule-design.md`; MUST load `domain-decision-models`).
5. Write it (MUST load `skill-rules-config`).
6. Desk-check before any paid run (`cases-and-proof.md`'s desk check, already loaded at step 3).
7. Review before the first paid run (`skill-rules-review`, in an agent with no authoring history).
8. Prove and decide: development, frozen held-out, floors, on or held.
9. Return the decision table.

A mechanical rule skips steps 3 and 6 and is proven by edge tests at step 8.

**`skill-rules-review`.** Lens: review tries to make the rule fail *on the wire*: on the owner's own cases, read on the state Jev receives, never on the question text alone. Route: admit (stage, target, inputs, independence) → walk `decision-model-review`'s checks (MUST load it) → walk the three skill-rule checks → reduce in the shared schema → verdict, with a design- or source-stage `ready` meaning "ready for the development run" only.

**`skill-rules-config`.** Lens: the rulebook is a program for one engine version; this manual is that engine's contract and nothing else. Route by task: rulebook files (entries), evidence kinds, running the rules for a calling step, reading a report, case runs; the check is always run after a rulebook change; credentials named per command.

### Calls

- `skill-rules-authoring`: MUST load `../domain-decision-models/SKILL.md` at step 4 (hidden domain, by path); MUST load `../skill-rules-config/SKILL.md` at step 5 and return its check outcome and evidence print; step 7 starts a reviewer on `skill-rules-review`; step 8 IF a case run's results are read, uses the loaded `cases-and-proof.md`.
- `skill-rules-review`: MUST load `../decision-model-review/SKILL.md` and walk its checks; MUST load `../decision-model-review/references/checks/review-schema.md` for the record; each own check `MUST load references/checks/<check>.md`; IF reading entries, a report or a case file, load `../skill-rules-config/SKILL.md` for their meanings.
- `skill-rules-config`: IF branches to its five references by task.
- `decision-model-review`: MUST load `../domain-decision-models/SKILL.md` (same plugin now).
- Callers of the old `running-rules.md`: `MUST load ../skill-rules-config/references/running-rules.md` (paths change, results unchanged).
- `skill-design` step 5: `MUST load ../skill-rules-authoring/references/decision-matrix.md`.
- `skill-review` step 2: IF the target adds or edits a rules entry, a filter, the evidence or config, or a marked standard's wording, start a reviewer on `skill-rules-review`.
- `implementation-review` (sunstack-dev): load `decision-model-review` from `skill-authoring`; when unavailable, return `skill unavailable: decision-model-review` as a coverage gap.

### References: job, contract and source

| Reference | Job | Caller → return | Taught from |
| --- | --- | --- | --- |
| authoring `decision-matrix.md` | the six outcomes and their questions | authoring step 2, `skill-design` step 5 → outcome per candidate | `skill-rules/references/decision-matrix.md`, moved |
| authoring `rule-design.md` | judgment, chunk choice, tree with meanings, reference, nudge, proof plan; worked designs | step 4 → design per rule | old `rule-design.md`, corrected; Advisors' F1–F3; commission cause 4 |
| authoring `cases-and-proof.md` | case sources, label origins, sets, floors; examples vs cases; the desk check; reading development and held-out results; on or held | steps 3, 6, 8 → cases, desk-check record, proof reading | old `check-and-reports.md` proof half; O1; decision page; `development-cases.json` shape |
| review `checks/owner-rulings.md` | every ruling a case, on the wire, with the owner's answer | step 3 → check record | O7's U16 table vs the Advisors' request reads |
| review `checks/chunk-and-coverage.md` | chunk named with edges, the chunk choice, nothing unread, wrong reading fixed where collected | step 3 → check record | owner requirements U20–U22, U3; cause 4 |
| review `checks/lint-contract.md` | a nudge through plain lint: warn, pointers, one property per pass, no engine workaround | step 3 → check record | U1–U6, U11, U26, U27 |
| config `rule-entries.md` | hosts, markers, entries, nudge fields, filters, pairing, refusals | entries → files | old `markers-and-rules.md` |
| config `evidence-kinds.md` | kinds, field sources, `select`, `within`, caps, the evidence print | evidence → kind and print | engine README §Selected and contained evidence; old `check-and-reports.md` §Print |
| config `requests-and-reports.md` | what the judge receives, routing, result fields, statuses, records, `lint show`, credentials | reports → meanings | `domain-decision-models/references/sunstack-driver.md`; old `check-and-reports.md` §Read |
| config `case-runs.md` | case file shape, `lint cases`, outcomes | case runs → mechanics | engine README; old `check-and-reports.md` §case file |
| config `running-rules.md` | run the rules for a calling step, account for each nudge | five skills → reading | old `running-rules.md`, moved |
| dmr `checks/state-and-evidence.md` | + examples aren't cases | dmr → record | `domain-decision-models:33`; O1 |
| dmr `checks/questions.md` | negative cases on the sent state | dmr → record | O7 |
| ddm `worked-trees.md` | K002 and kind trees as recorded failures with diagnosed corrections untested | ddm → nearest tree | Advisors; decision page |
| ddm `proof-and-records.md` | examples vs cases; desk check | ddm → proof plan | as above |

Shared shape: `decision-model-review/references/checks/review-schema.md` stays the one schema; `skill-rules-review` fills it under its own check names (two consumers: both review skills).

### Root topics

descriptions-and-invocation (three new descriptions), main-path (three new bodies, two corrected), calls-and-placement (every moved call and the hard cutover), steering (leading words *measurement instrument*, *operational definition*, *leak*, *desk check*, *on the wire*; the bright line "never take an example from a case"), generalization (the four rules above), change-classes, platform (manifests, versions, changelog), worked-examples (shape of the review skill: checks only where the job needs them).

### Sensitive surfaces

None in scope: no script, network, credential handling or write outside the repository is added. `skill-rules-config` documents which commands need the model key and that the agent never supplies or replaces one; that text moves unchanged in meaning.

### Decisions

| # | Default taken | Rationale |
| --- | --- | --- |
| D1 | One `spec.md` holding the four parts, instead of four files. | The commission names this file; earlier skill-work specs in this folder use one file. |
| D2 | The page is the fallback self-contained `index.html` beside this file, not a Demistify page. | The Lead reviews first and decides whether an owner page is needed. |
| D3 | `running-rules.md` lives in `skill-rules-config`. | It is a `lint` + `--report` + `lint show` procedure; five skills load it. |
| D4 | `decision-matrix.md` lives in `skill-rules-authoring`. | It is the judgment of which standards become rules; `skill-design` loads it. |
| D5 | `skill-rules-config` is model-invocable. | Any agent running `sunstack lint` on skills must find it unprompted (U26). |
| D6 | `skill-rules-review` reuses `decision-model-review`'s review schema. | One shape, two consumers; no second schema. |
| D7 | `domain-decision-models` names no engine manual; driver facts move to `skill-rules-config`. | A domain skill never names a skill above it; driver facts aren't standards. |
| D8 | The three principle links in `domain-decision-models` become inline judgments. | Those principles ship in `sunstack-dev`; a cited principle ships in the citing plugin. |
| D9 | `decision-model-review` seats its reviewer "the host's own way". | It no longer may name `practices-manage-agents`. |
| D10 | Rulebook file names stay (`skill-rules.config.json`, `skill-rules.cases.json`). | They name files; renaming touches tests and docs outside this scope. |
| D11 | Versions: `skill-authoring` 0.12.0, `sunstack-dev` 2.107.0. | Minor bumps for added and removed skills; PR #198 also bumps `sunstack-dev`, so the merge order decides the final number. |
| D12 | `implementation-review` gets a `skill unavailable` return for its cross-plugin load. | The repository's rule for any skill that may not be installed. |
| D13 | The design review runs after the files, in the Lead's sequence (Lead, then the Jev Advisor and an independent `skill-review`). | The commission orders spec then files then review; `skill-design` requires the review before files, so this is recorded as owed, not skipped. |
| D14 | The held trees stay untouched; the skills describe them as recorded failures, with each diagnosed correction labelled untested. | Rebuilding is out of scope; the decision page calls the K002 fix a hypothesis. |
| D15 | The owner's requirement IDs (U1–U28) stay out of skill text; this spec maps them. | Skills are for any repository; the IDs are this owner's documents. |
| D16 | The generic halves of causes 1 and 5 are fixed in `decision-model-review`; `skill-rules-review` adds only skill-rule checks. | One home per check; no duplicated rule. |

### Coordination

Base `8244ef4d`; branch `skills/rules-skills-standalone`; two inherited untracked `docs/wip/skills-authoring/2026-09-*` folders are never staged. Open PR #198 bumps `sunstack-dev`; whichever merges second rebases its version. Changelog: one dated entry, `docs/changelog/2026-11-07-rules-skills-standalone.md`, plus the README index line.

### Run status

| Run | Status | Evidence |
| --- | --- | --- |
| R1–R6 | implemented | the branch diff from `8244ef4d`, 7 Nov 07:53 EST; proof in Part 4 |

### Review record

- **Spec:** the 🦁 Lead read obligations 1–13, the standards, the transfer cases and D1–D16 and accepted them, with D13's sequencing standing (Router push `01a1b5ff-9fc3-74e2-949f-6fd5ee876d8b`, 7 Nov).
- **Design review (`skill-review` design stage):** not run; owed in the Lead's sequence (D13).
- **Implementation review:** owed (the Lead, then the 🦉 Jev Advisor and an independent `skill-review`).

### Implementation record

Old to new:

| Old | New |
| --- | --- |
| `sunstack-dev/skills/domain-decision-models/` | `skill-authoring/skills/domain-decision-models/` (corrected) |
| `sunstack-dev/skills/domain-decision-models/references/sunstack-driver.md` | `skill-authoring/skills/skill-rules-config/references/requests-and-reports.md` (merged with the report half of `check-and-reports.md`) |
| `sunstack-dev/skills/decision-model-review/` | `skill-authoring/skills/decision-model-review/` (two check items, stage wording, host-neutral seating) |
| `skill-rules/SKILL.md`, `agents/openai.yaml` | `skill-rules-authoring/SKILL.md`, `agents/openai.yaml` (rewritten: judgment only) |
| `skill-rules/references/decision-matrix.md` | `skill-rules-authoring/references/decision-matrix.md` (unchanged) |
| `skill-rules/references/rule-design.md` | `skill-rules-authoring/references/rule-design.md` (chunk choice, meanings, examples, two worked failures) |
| `skill-rules/references/check-and-reports.md` | proof half → `skill-rules-authoring/references/cases-and-proof.md` (with the desk check and on-or-held); check, print and report half → `skill-rules-config/references/requests-and-reports.md` and `evidence-kinds.md`; case-file shape → `skill-rules-config/references/case-runs.md` |
| `skill-rules/references/markers-and-rules.md` | `skill-rules-config/references/rule-entries.md` (judgment pointers removed) |
| `skill-rules/references/running-rules.md` | `skill-rules-config/references/running-rules.md` (repointed) |
| — | new: `skill-rules-config/SKILL.md`, `references/evidence-kinds.md`, `references/case-runs.md`; `skill-rules-review/SKILL.md` and `references/checks/{owner-rulings,chunk-and-coverage,lint-contract}.md` |

### Corrections round 1

From the independent `skill-review` (F1–F3) and the 🦉 Jev Advisor (F1–F4), as the Lead's `corrections-1.md` sets them; each Advisor finding that repeats a Reviewer finding is fixed once.

| Finding | What changed |
| --- | --- |
| Reviewer F3 = Advisor F2: requests before the gates | Authoring now has ten steps. Steps 5–7 send nothing: step 5 prints only free evidence (a selected kind as its mechanical candidates); a selection is desk-checked and reviewed on its candidates before its first request; step 8 runs the selection as a paid development step, then desk-checks and reviews the downstream rule on the selected pieces before any rule case; blockers match. |
| Reviewer F2 = Advisor F4: held-out custody | The tuner's desk check and example comparison cover development cases only. A held-out holder (an independent agent) checks the held-out side and returns only an attestation, an overlap count or a coverage failure; a missing attestation is a named gap. Fixed at the domain root, its proof reference, authoring, and `decision-model-review`'s state-and-evidence item. |
| Reviewer F1 = Advisor F1: desk-check state | New `skill-rules-config/references/desk-check-state.md` is the one recipe: on 0.8.3 the state is a reconstruction built on the case-run overlay with selected kinds made mechanical in the overlay's config copy, assembled like the engine's `piece_state`, with the equivalence gap named; a saved request counts only when all its inputs still match; no-send preparation is planned, not shipped. Authoring's `cases-and-proof.md`, `decision-model-review` (one definition in its `SKILL.md`) and `skill-rules-review`'s `owner-rulings` consume it. |
| Advisor F3: K002 selection coverage | The selection's one property asks for procedural material in every form (instruction, worked example, table row, quotation); required inclusions are desk-checked like exclusions; a narrowed selection is an untested coverage hypothesis and the rule stays on the gated mechanical kind until a run keeps every required inclusion (control: `project-verification-selection.md:39–42`, owner-ruled warn). New `chunk-and-coverage` item. |
| Reviewer notes | K002's selection coverage marked untested in `rule-design.md`; the "a lookup table can't route work" claim removed (`calls-and-placement.md`'s own example is a command in a table row). |

Decisions added:

| # | Default taken | Rationale |
| --- | --- | --- |
| D17 | A selection's candidates are printed for free by removing `select` in the overlay's copy of the config. | The only credential-free route to candidate state on 0.8.3; the committed config is never edited for it. |
| D18 | A reconstruction's equivalence gap goes in the verdict's unavailable proof and doesn't make a review check `partial`. | On 0.8.3 the gap is always present; counting it as `partial` would make `ready` unreachable at every stage. |
| D19 | Exclusions a selection keeps are a cost, not a failure; only a dropped required inclusion fails. | Requiring every exclusion rejected pushes the question narrower, which is how it drops positives. |

### Corrections round 2

From the Reviewer's correction check (F1 and F3 still open at the recipe, F4 new) and the 🦉 Jev Advisor's (C1 = F3, C2 = F1), as the Lead's `corrections-2.md` sets them. **Lead decision:** drop the 0.8.3 reconstruction; the desk check reads sunstack 0.9.0 `--prepare` requests, whose contract is the engine commission (`engine-0.9-prepare-2026-11-07/commission.md`).

| Finding | What changed |
| --- | --- |
| Reviewer F1 = Advisor C2: the recipe didn't mirror the case-run inputs (project inputs, filter binding, budgets) | `desk-check-state.md` is replaced by `skill-rules-config/references/prepared-requests.md`: `lint cases --set development --prepare`, then `lint show` per case; the prepared request is the exact state, byte-equal by the engine's tests; gated requests carry `gate`; requests behind a selection sit under `needs_answer`; pending until 0.9.0, and blocked (never substituted) on an older engine. |
| Reviewer F3 = Advisor C1: a "free" print could dispatch another configured selection | Config states that any `select` anywhere makes `--evidence` and ordinary runs send; only `--check`, `--rules`, `--prepare` and `lint show` run before a selection's gate. Authoring step 5 now prepares instead of printing, with the sentence "never run a print or a run whose config can dispatch any selection before that selection's gate". Step 8 prepares the downstream rule again after the selection's run; if its requests still wait, the desk check is blocked on the engine. |
| Reviewer F4: two state definitions in `decision-model-review` | `SKILL.md` defines a case's state once, as the request the engine builds (prepared, or saved by a run from the same rulebook files); `state-and-evidence.md` inputs and its read rule use it; the D18 waiver is gone. |
| Callers | authoring step 6, `cases-and-proof.md`, `owner-rulings.md`, `questions.md` and `skill-rules-review` read the prepared request; the domain root and its proof reference say a state the engine can't build without sending is an engine gap, never a hand-built copy. |

| # | Default taken | Rationale |
| --- | --- | --- |
| D20 (7 Nov, supersedes D17 and D18) | No reconstruction: the desk check reads a prepared or saved request, and is blocked without one. | The Lead's round-2 decision under the owner's rule "fix the engine and release it; never bend skills, runner or rules around an engine gap"; 0.9.0 `--prepare` is the fix. |
| D21 (7 Nov) | Versions stay at skill-authoring 0.12.0 and sunstack-dev 2.107.0. | Neither has shipped from this branch; the corrections land in the same unreleased change. |
| D22 (7 Nov) | Text about `--prepare` is written from the engine commission and marked pending. | The PR waits for 0.9.0; the Lead will say when it ships, and this text is then checked against the released README. |

Deviations from Part 3, each inside the accepted obligations:
- `skill-rules-review` takes `decision-model-review`'s review schema through that skill's own step 3 load instead of a second load call; one load, same schema (D6).
- `decision-model-review` also says what a design-stage `ready` means and gains two completion blockers for it, and its step 2 names held-out cases as never an input. This is the generic half of obligation 8 and of the source-only standard, placed by D16.
- `domain-decision-models` keeps the `jev-latest`, replay and proof standards unchanged; its three principle citations became three standards in the proof list (D8).

## Part 4: Skill verification

### Routes

| Requirement or standard | Route | Decided on |
| --- | --- | --- |
| Examples written from the standard, never a case or its answer | review check (`decision-model-review` state-and-evidence item; `skill-rules-review` owner-rulings) | needs the case file beside the reference; no chunk holds both |
| Owner rulings are cases, not reference | review check (owner-rulings) | needs the case file and the requirements' rulings |
| Question meanings read against cases on the sent state | review check (questions item, owner-rulings) | needs the encoded state and the labels |
| Desk check before a paid run | eval (an author under time pressure skips it) | about what an agent does |
| Chunk choice: mechanical vs tree | review check (chunk-and-coverage) | needs the denominator and the evidence print |
| A source-only review never returns "ready to switch on" | eval | about what a reviewer agent returns |
| Skill-authoring names no sunstack-dev skill | mechanical (`rg` in proof) | a literal fact of the files |
| Every caller cut over, no stub | mechanical (`rg`; suite) | literal |
| Config matches the shipped engine | review check (`skill-review` claim-vs-evidence against the engine README) | needs the engine source |
| Marked lines in `domain-decision-models` unchanged | mechanical (existing test) | literal |
| Each skill's teaching | prose | no checkable claim |

No new rule routes; any future rule over these skills goes through `skill-rules-authoring` itself.

### Proof plan

- **Structural, this change:** `pnpm --dir tests/skills test` and `typecheck` (counts and exit codes); `claude plugin validate .`; the pinned `sunstack lint --check` and `--rules` on the active config (three mechanical rules, unchanged); `rg` for any runtime `skill-rules` reference and any `skill-authoring` load of a `sunstack-dev` skill; the phase-composition map regenerated and its contract test passing.
- **Behavior, owed:** (a) an authoring task: a fresh agent given a real standard, its owner rulings and the new skills writes a filter's design; checks: no ruling in `reference`, a desk-check record on the encoded state, a chunk decision with its reason. (b) a review task: a fresh reviewer given the held K002 entry, its saved requests and the development export; checks: finds the five quiet rulings misread on the wire and the kind examples that are cases. Both against the old skills as control. Not run: out of scope; the owner has said pressure tests are redone later.

### Trigger trials

| Skill | True prompt | Near miss | Status |
| --- | --- | --- | --- |
| `skill-rules-authoring` | "Which of the standards in calls-and-placement should become checked rules, and how should the product-workflow rule's questions be designed?" | "The rules config refuses with 'entry has no rulebook marker'; fix it." (config) | planned, not run |
| `skill-rules-review` | "Review the held K002 rule before we spend another development run on it." | "Review this skill's SKILL.md before it ships." (`skill-review`) | planned, not run |
| `skill-rules-config` | "Run sunstack lint on the skills I changed and tell me what the nudges mean." | "Decide whether this standard should be a judged rule." (authoring) | planned, not run |

Each runs in a fresh session that sees the descriptions beside their neighbours and nothing of this set, with the loaded skill read from the host's record.

### Structural proof

After corrections round 2, 7 Nov 08:34–08:35 EST: suite 26 files, 222/222, exit 0; typecheck exit 0; plugin validate passed; pinned `sunstack 0.8.3` `--check` and `--rules` exit 0, three mechanical rules; self-check over the five rules skills clean, 15 results, 0 requests; 120 load paths, none unresolved beyond the quoted example; no `desk-check-state`, reconstruction or equivalence-gap wording left in skill-authoring.

After corrections round 1, 7 Nov 08:16–08:20 EST: `pnpm --dir tests/skills test` 26 files, 222/222, exit 0; `typecheck` exit 0; `claude plugin validate .` passed; pinned `sunstack 0.8.3` `--check` and `--rules` exit 0, the same three mechanical rules; self-check `lint --report` over the five rules skills clean, 15 results, 0 requests, 0 findings; 120 load paths checked, the 7 misses all the quoted `agentstudio-loop.md` example.

First implementation, 7 Nov 07:51–07:53 EST:

| Check | Result |
| --- | --- |
| `pnpm --dir tests/skills test` | 26 files, 222/222 passed, exit 0 |
| `pnpm --dir tests/skills typecheck` | `tsc --noEmit`, exit 0 |
| `claude plugin validate .` | passed, exit 0; three install-line advisories on plugin READMEs, present before this change |
| pinned `sunstack 0.8.3` (signed, `dev.shravansunder.sunstack`) `lint --check` / `--rules` on the active config | exit 0 / exit 0; three rules, all mechanical, unchanged |
| writer's self-check: `sunstack lint --report` on the 12 changed skill folders | `clean`, exit 0: 36 results (3 description rules × 12 skills), 0 findings, 0 model requests; no gaps (references are outside these rules' denominator) |
| `rg` for a bare `skill-rules` outside `docs/specs`, `docs/wip`, `docs/changelog` and eval case data | only deleted-file names asserted absent by two tests; no runtime reference |
| `rg` for a load, dispatch or use of a `sunstack-dev` skill inside `skill-authoring` | none; remaining `sunstack-dev` mentions are citations of real lines in worked examples |
| every load path in the changed skills | 133 checked; the 8 that don't resolve are quoted example text (`agentstudio-loop.md` inside a quoted line, a `domain-<lang>` placeholder) |
| phase-composition map | regenerated; page re-embedded with Demistify `embed`; contract test passes in the suite |

### Unverified

- Whether the new teaching changes what an author or reviewer does (both behavior tasks above).
- The three descriptions' routing (trials above).
- Whether a corrected K002 meaning or kind boundary works: rebuilding is out of scope, and the skills label both as untested hypotheses.
- Codex and Claude installed caches: not refreshed (release not in scope).
