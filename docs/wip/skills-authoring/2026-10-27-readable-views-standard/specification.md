# Readable views standard: specification

Part two of four: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md). What the rendering reference must do, and the standards it will state. Every standard here is **Proposed** until you confirm it (settled decision 2: standards are talked through and confirmed by you, so you aren't asked again).

## The seven standards

1. Each view's heading or caption states the question the view answers.
2. Each view shows one relationship, the one its question asks about.
3. Each view stays at the level of detail of the document that holds it, leaving to a later document what that document owns.
4. Each view names its parts in its reader's own words: the names the reader has used, or plain names where the reader has used none.
5. Each view is the smallest view that answers its question.
6. Each view sits beside the text it explains.
7. Each view changes what its reader concludes, rather than restating a sentence beside it or decorating the page.

Two standards that already exist in the reference stay where they are, with the same meaning:

- **Every required field is shown:** "Render every field supplied by the consuming skill's predicate contract." (`diagram-rendering-and-fallbacks.md:79`)
- **It reads where it's shown:** "labels and edges are readable at the destination", with the rest of the rendered check (`:87-93`).

## What the reference must do

1. It states the seven standards once, one self-contained sentence each, and every view it renders meets them, whatever its medium.
2. When a view request is a relationship view, it loads `diagram-semantics.md` with the view's question and draws the view in the kind of diagram that returns.
3. When the choice of diagram finds no kind for a view the consuming skill requires, it returns an exact gap to that skill and never draws the view as prose or a table marked as passing.
4. A view's result is `pass` only when the view meets the seven standards, shows every required field and passes the visual check.
5. Its standards name no product, tool, repository or incident; worked cases may come from real views, written without their project's names.
6. Each meaning the new section states has one home: the lines it replaces in this reference go in the same change.
7. Its own opening, and the repository's descriptions of what it owns, say that it owns the standards.

## From the spec's seven to these seven

The spec proposed seven standards (section 1). Three of them held two claims each, and a rule judges one claim, so they're re-cut:

- Spec 1 (question, in the reader's words) → standard 1. The reader's-words half joins standard 4, because one section of a document can't show a judge what words its reader uses.
- Spec 2 (one relationship) → standard 2, unchanged.
- Spec 3 (every required field; nothing from the next document) → the fields half stays in Preserve Semantics (`:79`), where it already is; the other half becomes standard 3.
- Spec 4 (the reader's nouns; commands, paths and identifiers beside the view) → standard 4. Where commands, paths and identifiers go stays with `markdown-presentation-baseline.md:54`, which already says it (decision D4 in the skill design).
- Spec 5 (smallest; beside its text) → standards 5 and 6.
- Spec 6 (changes what the reader concludes) → standard 7, unchanged.
- Spec 7 (reads on your screens) → stays with the rendered check (`:87-93`); phone width waits for your pick on focus 2's I5.

## Each standard, tested on cases it never names

Each rule passes the transfer test both ways: it holds in a materially different repository, and it rejects a bad choice built from something it never mentions.

- **1. The question in the heading or caption.**
  - Holds elsewhere: a billing service's state view headed "Can a paid invoice be reopened?" passes in a codebase that shares nothing with these skills.
  - Rejects what it never names: a heading that names the drawing's type ("Sequence diagram") or a figure number states no question, so it fails.
  - Verdict: passes.
- **2. One relationship.**
  - Holds elsewhere: a data pipeline's flow for "Where can an upload stop?" shows ordered steps with their branches and passes.
  - Rejects what it never names: a sequence diagram with owner colors painted on its participants shows two relationships (who sends what, and who owns what), so it fails.
  - Verdict: passes.
- **3. The document's level of detail.**
  - Holds elsewhere: a mobile app's Requirements capability map shows what users get, not screens or stores, and passes.
  - Rejects what it never names: a Specification entity map that labels each entity with its table name and ORM type shows what the Program Design owns, so it fails.
  - Verdict: passes.
- **4. The reader's own words.**
  - Holds elsewhere: an operations runbook's topology labeled "the queue that retries" in a team that calls it that passes.
  - Rejects what it never names: nodes labeled with bare ticket numbers or internal acronyms the reader never used fail, though the standard names neither.
  - Verdict: passes.
- **5. The smallest view that answers.**
  - Holds elsewhere: a checkout journey drawn as its four steps, not every screen, passes.
  - Rejects what it never names: a drawing of all thirty services when the question is about two of them fails.
  - Verdict: passes.
- **6. Beside its text.**
  - Holds elsewhere: a flow placed right after the paragraph that introduces it passes, in any document format.
  - Rejects what it never names: every diagram gathered into an appendix at the end fails.
  - Verdict: passes.
- **7. It changes what the reader concludes.**
  - Holds elsewhere: a before-and-after table that shows which three steps changed passes.
  - Rejects what it never names: two boxes with one arrow ("User → System") under a sentence that already says the user calls the system fails.
  - Verdict: passes.
- **The gap rule (obligation 3).**
  - Holds elsewhere: in a chat answer where an optional picture finds no kind of diagram, no picture is drawn, which is right, because nothing required it.
  - Rejects what it never names: a required entity map turned into a bulleted list and marked as passing fails; the skill gets the gap instead.
  - Verdict: passes.

## Where each standard shows up in your past views

From the requirements' evidence; only what your words were about is labeled.

- Bad 1 (two relationships in one picture): standard 2 broken.
- Bad 2 (four kinds of edge, three dashed): standard 2 broken, and the rendered check.
- Bad 3 (requirements as one big table): standard 5 broken; bears on standard 2.
- Good 1 (the decision tree): standard 2 kept.
- Good 2 (the four-level ladder): standard 2 kept for the whole; standard 4 broken for one row.

Standards 1, 3, 6 and 7 have no view tied to your words yet. They come from your general words and the spec, and their eval cases (U10) will need labels from you or from the Luna mining.
