# Skill verification: the four-document design workflow as an HTML system

Draft, 7 Nov 2026. How each requirement and standard will be shown to hold, routed by `skill-rules`' decision matrix; and what stays unverified. Nothing here has been observed.

## Routes

The standards in the specification govern design documents an agent writes, not the text of a skill, so the skill-rules engine (which reads skill text) has nothing to mark for them: whether an agent writes a design as composed pages is behavior, observed only in a run (matrix question 2). What the changed skill text must say is checked at review.

| Requirement or standard | Route | The property it was decided on |
| --- | --- | --- |
| S1, standard 1: a design's text lives on its pages | eval, on the next real design; review check that runs 1–4 teach it | what an agent writes under the skills is behavior; that the skill text says it is visible to a reader |
| S2: pages, an overall design and per-deliverable pages (O7, O7a–O7c) | eval, on the next design with two deliverables sharing a boundary: the cut on the overall home page as the Lead's call, shown with the first plan under the existing plan gate, the first deliverable's page derived with only run 1's procedure and stating no fact of its own, its scoped plan page, links both ways; review check on runs 1, 7 and 9 | behavior; text property |
| S3, standard 3: composed in sections, a view per fact, never a whole document as one island | eval, on the produced pages; review check on runs 2–3 | behavior; text property |
| S4: the standard forward and back links, growing by phase (O6, O6a) | eval at three states of the next design: Requirements only (every downstream link reads "not yet written", none invented), Requirements and Specification (need-to-obligation links resolve both ways), the complete set (every need forward, every row back); review check on runs 1–3, 5–7 | behavior; text property |
| S5: agents read and check without a second copy | eval: the next design has no Markdown copy and an agent finds a named section by its ID from the home page | behavior |
| S6, standard 4: only released parts | review check on run 2 and, when admitted, runs 10–11 | a text property; the existing binding rule in `demistify.md` holds |
| standard 2: one home per fact | review check (run 7's navigation lane checks it on every design review from then on) | a property of a produced page that the reviewer reads |
| standard 5: the owner answers on the page | eval, on the next design that needs his confirmation | behavior |
| the page passes the checker | mechanical, at the page's binding, every page | the checker's own result |
| the contract test for plan paths (run 9) | mechanical: `pnpm --dir tests/skills test` | a test that asserts the plan record |

## Proof plan

- **Basis and posture:** user-directed intent, so the change is drafted from approved intent; until a real design is written under it, the claim is "drafted from user intent; behavior not yet evaluated".
- **Per run:** static validation (the skills test suite, `claude plugin validate .`, the native lint on the changed skills), the Lead's assessment against this design set, then `skill-review`'s implementation stage.
- **Behavior:** the next real design cycle written under the changed skills, read against S1–S5 and its pages checked; fresh-agent pressure runs are a later step, as the owner has set for skills work.

## Trigger trial

Not applicable: no description changes.

## What stays unverified

- Agent behavior under the changed skills, until the next real design is written with them.
- Checks of the Markdown inside islands: sunstack's rule engine doesn't read islands in HTML yet (a dependency owned in sunstack-tools).
- The reading cost for agents beyond the measured file shares (24–29% markup in real HTML design pages, 39–41% in component-heavy ones); no agent token counts were taken.
- Sections and stories on design pages (deferred runs 10–11), until Demistify releases a section that doesn't count stories; the Map is released (1.20.0) and comes in with run 2.
