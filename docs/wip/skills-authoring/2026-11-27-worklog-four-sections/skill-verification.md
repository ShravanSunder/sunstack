# Skill verification: how the change will be shown to work

## Routes, from `skill-rules-authoring`'s decision matrix

Questions asked in order: requirement or stance; about what an agent does, or a property of a text; does a chunk hold the judgment; one field; comprehension; gate.

| Item | Outcome | Property it was decided on | Route |
| --- | --- | --- | --- |
| O1–O7 (frame, item face, free text) | eval | what an author produces while working from the skill; only a fresh run shows it | fresh-author runs, checks C1–C3, C8 |
| O8 (decisions and assumptions) | eval | the same; judging that each material decision appears with actor, reason, cost and authority needs the source beside the page | C8b, read by hand against the topic list |
| O9, S7 (no typed routing for styling) | eval | a property of the produced page, set by the author's choice | C2 (scripted) |
| O10–O12, S3 (open choices, consequence badges) | eval | whether a badge is earned depends on the source; only a run on a known source shows the choice | C3 (scripted link check plus a hand-read badge list) |
| O13, O14, S3 (Flow, before/after cards) | eval | the same | C4, C5 |
| O15–O19, S6 (verification table, verdict tones, no authored CSS) | eval | the same | C6 (scripted) |
| O20, O21 (Trace link, widths) | eval | the same | C6, C2 |
| O22 (reuse or produce) | eval | whether the author recognizes a stable full account | C7 on I1 (no companion expected), C8c on I2 (companion expected) |
| O23–O26, S4, S5 (the companion) | eval | the same | C8c, C8d on I2 |
| O27 (links resolve) | eval | the same | C7 (scripted) |
| O28 (the skill copies no markup) | model-judged on the changed skill text; routed to a review check with a scripted proxy, not a standing rule (D7) | Whether a passage copies markup or only names a construct takes reading. A scan for element tags (`<ex-`, `<div`, `<table`) and fenced HTML in the changed files is a proxy: it misses markup in inline code, and naming the marker is required. This is one change's requirement, not a recurring standard, so it gets no rulebook entry. | the design and implementation review's check; proxy scan at step 4 |
| O29 (return) | eval | what the author returns | run record |
| P1 (run 2's pointer holds) | eval | whether the recipe wins over the reference's forms when both are loaded | C3–C6 pass with run 2's sentence present |
| S1 (four sections) | eval | the same | C1 |
| S2 (frame, not form) | eval | an author's choice under the recipe's pull | C8a, C8b |
| The changed skill text against `domain-skill-crafting`'s standards | the existing rules, run on the changed files (skill-creation's self-check, then orchestrator step 4) | call completeness, placement and main-path rules already exist | the rules run |
| The lens and the leading phrase ("a frame, not a form") | prose | stance; no text keeps or breaks it | no proof needed |

No worth-checking rule is planned, so none needs a judgment, a nudge and a keep case.

## Proof plan

**Posture:** drafted from user intent; behavior not yet evaluated. The planned evidence reaches the rung "observed in named examples": two fresh authors on each of two inputs, four runs in all. It makes no difference or improvement claim, because no control run is planned. A run of the current skill (origin/main `09f07b80`) on I1 would support "a difference shown for that case"; the 🦁 Lead may add it.

**Skill type:** pattern, applied as a technique. The proof shows the pattern used where the evidence supports it, and withheld on the counterexamples the inputs already hold:

- a choice with no stated consequence;
- independent merged work;
- a topic with no view.

### Inputs (frozen before any run)

- **I1, a stable full account.** The original 26 Nov report, `worklog-2026-11-26.html` in `snapshot-verification-columns/`, sha256 `b0f0dbfe…4c73c`. The expected view is `worklog-2026-11-26-shared-sections.html`, sha256 `0f4e69da…239a9c`. This is a report, not a Router cursor: the historical cursor's completeness is not verified, and that distinction stays in the claim. A correct author links into the report's own anchors and produces no companion.
- **I2, a trail slice with no full account** (D16). `rows-2026-11-26.jsonl`: 72 work-trail rows as JSON lines, from the project trail tag `lean-records-demistify`, Eastern day 26 Nov, positions epoch 2 3873–4016, sha256 `f5dfa5ca…19a76cf`. The 🦁 Lead exported and froze it.
  - It spans several streams: data-model, demistify-and-presentation-html, router-direction, worklog-skill and others.
  - It holds 24 decisions, 15 proofs, 14 actions, 3 owner asks (one open), 1 shortcut, 1 Missed row, and 10 rows tagged `resolves` or `supersedes` (exported without their links). One row's text contains literal angle brackets.
  - No full account exists for it, so a correct author must produce the companion. It exercises O22–O26 and S5.

  The wider 222-row file beside it is not a proof input.

### Authors

Four runs in all: on each input, two fresh sessions with no authoring history: OpenAI Terra (high) and Claude Opus (high), per the owner's 27 Nov direction. Each sees only the installed changed skill and the released guide at `https://demistify.getagentstudio.dev/v1/` (1.41.1).

The request is realistic. It names the page and the source and gives a permitted output folder, and it never mentions checks, tests or this design. For example, for I1: "Build me the work-log page for the 26 November Central and Mac work, through 08:15 Eastern, with presentation-show-worklog. The work log is <path>; put the page in <folder>." For I2: "Build me the work-log page for the lean-records-demistify work on 26 November with presentation-show-worklog. The trail rows are exported in <path>; put the page in <folder>." The skill is hidden from model invocation, so the request names it; this is not a trigger run.

### Checks

Written before the runs, and kept outside every folder an author works in.

- **C1. Sections.** Exactly four `ex-section` declarations, in order. Their titles carry the four questions; their tones are `question`, `note`, `decision`, `note`; their icons are `user`, none, none, `test-tube`.
- **C2. Items and routing.**
  - Every `ex-section-item` targets one of the four ids with `section=`, and its first element is an `h4`.
  - No `holds` or `record=` appears anywhere on the view.
  - Flows and the verification wrapper carry `data-width="canvas"`, and any Trace on the view is Reading width.
- **C3. Open choices.**
  - Every open choice in the source is an item whose `h4` holds a link that resolves to a decision page or a full-account anchor.
  - A consequence badge appears only where the source states what waits. For I1, the expected badges, from a list written before the runs: the staging sign-in choice gets `risk`, the success-answer choice gets `note`, and the design-branch hook choice gets no badge, with its consequence in prose. For I2, the checker writes the expected list from the slice before the runs.
- **C4. Before/after cards.**
  - Every before/after pair maps to a source passage that gives both states, listed by hand.
  - The before card is `note`, and the after card is `planned`, `done` or `decision`.
  - A change with only one state is prose.
- **C5. Flows.** Every arrow maps to a dependency or change the source states. Independent work, such as I1's merged PRs, is its own item, not a Flow branch.
- **C6. Verification.**
  - Exactly one `ex-table-scroll` with `data-width="canvas"` and `data-layout="verification"`. Its headers are Status, Claim, and Result and limit.
  - Each status cell has one `ex-badge`, and its tone matches its label: Passed is `done`, Failed is `risk`, Blocked, Held or Acceptance held is `question`, and Not run has no tone.
  - Each claim is `th scope="row"`.
  - Each result cell has a Source link that resolves.
  - No `style` attribute, `<style>`, `width` or `col` sizing touches the table.
  - Exact counts from the source appear in the result text; for I1, "ten of ten" and "2,269".
- **C7. Links.**
  - Every `href` with a fragment resolves to an existing `id` in the view, the full account or a named decision page.
  - On I1, the full account is the original report, and no companion file exists.
  - On I2, a companion file exists beside the view, inside the permitted folder.
- **C8. Free text survives.**
  - **a.** At least one item with no badge, Flow or cards is plain prose: on I1, the design-branch hook choice.
  - **b.** Every topic on a source topic list, written before the runs, appears as an item, or as an explanation inside an item, under the section whose question it answers. A topic missing from the view is a failure even when the full account holds it. This is read by hand.
  - **c.** On I2: the companion has exactly 72 `entry-<row-id>` anchors, one per row id in the slice. Each anchored row's text, normalized for whitespace only, equals the source text. Rows are in recorded order within each group. Each of the 17 rows with links shows them, and a link to a row in the slice reaches that row's anchor. The slice's 10 `resolves`/`supersedes` rows have no links, so their closures show only in their text.
  - **d.** On I2: the companion contains no element or script that came from row text. The row with literal angle brackets shows them as text.
- **C9. Static check.** The released CLI's `check` reports zero errors on every page written.
- **C10. Phone width.** Each view at 390 CSS px, in light and dark: the page body never scrolls sideways, and the verification table scrolls inside its own frame. Screenshots are kept. A narrow desktop viewport is not physical iPhone or Safari proof.
- **C11. Run record.** The host's session record shows which `SKILL.md` copy loaded, and that `section-views.md` was read (on I2, also `full-account.md`). It also shows the run's actions, read from the host record, never from the agent's reply.

### Repetitions and reading

One run per author per input to start. Every run is read by hand.

- A run that broke before doing the work (a permission stop, an unavailable tool) is rerun, not counted.
- A disagreement between the two authors is variance, and variance is a proof gap: the wording isn't binding at the claimed strength until a fix and a fresh run of both agree.
- Rationalizations seen in a run are recorded in the root's form. The three to watch:
  - a badge added to fill an empty face;
  - an awkward topic left to the full account only;
  - a Flow drawn for a dependency the source never states.

## Trigger trial

`not applicable` for both runs. `presentation-show-worklog` is hidden from model invocation, and neither run writes or alters a description.

## What stays unverified

- Physical iPhone or Safari rendering (C10 uses a 390 CSS px viewport).
- The historical Router cursor behind I1. The source is a report.
- The companion branch on trails other than one project's single day (I2 is 72 rows from one trail tag).
- Behavior with guide releases after 1.41.1. The skill cites anchors at the page's binding, so a renamed anchor would surface only in a later run.
- Lineages and effort levels other than Terra (high) and Opus (high).
- Component rendering itself: Section tint, rail and column sizing belong to Demistify's own verification. The Sol Lead measured the columns at 94, 247 and 648 px on desktop; that is their report, not this proof's observation.
