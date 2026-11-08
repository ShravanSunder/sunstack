# Skill verification: the four-document design workflow as an HTML system

Draft, 7 Nov 2026; revised that night around the owner's lab components. How each requirement and standard will be shown to hold, routed by `skill-rules-authoring`'s decision matrix (skill-authoring 0.12.0); and what stays unverified. Nothing here has been observed.

## Routes

The standards in the specification govern design documents an agent writes, not the text of a skill, so the skill-rules engine (which reads skill text) has nothing to mark for them: whether an agent writes a design as linked pages is behavior, observed only in a run (matrix question 2). What the changed skill text must say is checked at review. Preparation's own checks are deterministic and run on every produced set.

| Requirement or standard | Route | The property it was decided on |
| --- | --- | --- |
| S1, standard 1: a design's text lives on its pages | eval, on the next real design; review check that runs 1–4 teach it | what an agent writes under the skills is behavior; that the skill text says it is visible to a reader |
| S2: the owner reads it through his components (O5, O5a) | eval, on the next real design: the set opens in the released browsers in the decided form, each need showing its Specification, Program Design and Verification views; review check on runs 2–3, 5–6 | behavior; text property |
| S3, standard 6: links written once and derived, growing by phase (O6, O6a) | eval at three states of the next design: Requirements only (each downstream document reads as not yet written, nothing invented), Requirements and Specification (each need shows its obligations), the complete set (every need served in each document); review check on runs 1, 3, 5–7 | behavior; text property |
| S4: pages, an overall design and per-deliverable pages (O7, O7a–O7c) | eval, on the next design with two deliverables sharing a boundary: the cut on the overall home page as the Lead's call, shown with the first plan under the existing plan gate, the first deliverable's page linking into the browser and stating no fact of its own, its scoped plan page, links both ways; review check on runs 1, 7 and 9 | behavior; text property |
| S5: agents read and check without a second copy (O8, O9) | eval: the next design has no Markdown copy, and an agent finds a named record and its body from the home page; mechanical: preparation passes on every produced set | behavior; preparation's own result |
| S6, standard 4: only released parts (O11, O13) | review check on every run: no demo-app private element or attribute appears in skill text; admission check before run 1 that the binding's guide documents the browsers, records and preparation | a text property; a release fact |
| standard 2: one home per fact | review check (run 7's navigation lane checks it on every design review from then on) | a property of a produced page that the reviewer reads |
| standard 3: a view per fact, never a whole document as one block | eval, on the produced pages; review check on runs 2–3 | behavior; text property |
| standard 5: the owner answers on the page | eval, on the next design that needs his confirmation | behavior |
| the page passes the checker | mechanical, at the page's binding, every page | the checker's own result |
| the contract test for plan paths (run 9) | mechanical: `pnpm --dir tests/skills test` | a test that asserts the plan record |

## Proof plan

- **Basis and posture:** user-directed intent, so the change is drafted from approved intent; until a real design is written under it, the claim is "drafted from user intent; behavior not yet evaluated".
- **Before run 1:** the admission check: the released guide at the binding documents the browsers, the record contract and preparation, and O13b–d are settled or named as gaps.
- **Per run:** static validation (the skills test suite, `claude plugin validate .`, the native lint on the changed skills), the Lead's assessment against this design set, then `skill-review`'s implementation stage.
- **Behavior:** the next real design cycle written under the changed skills, read against S1–S5, with preparation and the checker run on its pages; fresh-agent pressure runs are a later step, as the owner has set for skills work.

## Trigger trial

Not applicable: no description changes.

## What stays unverified

- The release itself: the browsers, record contract and preparation are not yet public; their names, fields and checks may differ from the lab's, and the runs teach the released ones.
- Whether a set with needs only prepares (O13b), whether facts with no record kind have a home beside the browser (O13c) and whether a body may hold a Markdown island (O13d), until the Demistify Lead answers.
- Agent authoring ease beyond the bounded probe: one fresh Luna wrote a 20-record set that passed after one guided correction (its first attempt had 8 duplicate IDs); unaided authoring and authoring under the skills are not observed.
- Agent behavior under the changed skills, until the next real design is written with them.
- Checks of the Markdown inside islands: sunstack's rule engine doesn't read islands in HTML yet (a dependency owned in sunstack-tools).
- The reading cost for agents beyond the measured file shares (24–29% markup in real HTML design pages, 39–41% in component-heavy ones); no agent token counts were taken.
