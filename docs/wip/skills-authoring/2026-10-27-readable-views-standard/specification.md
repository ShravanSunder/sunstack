# Readable views standard: specification

Part two of four: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md). What the rendering reference must do, and the standards it will state. Every standard here is **Proposed** until you confirm it (settled decision 2: standards are talked through and confirmed by you, so you aren't asked again). Draft 2 repairs standards 2 and 3 and adds the label obligation, after the design review's findings F1 to F3.

## The seven standards

1. Each view's heading or caption states the question the view answers.
2. Each view answers one question: everything it shows, including any annotation, serves that question, and nothing in it answers a different one.
3. Each view that belongs to a durable document stays at that document's level of detail, leaving to a later document what that document owns.
4. Each view names its parts in its reader's own words: the names the reader has used, or plain names where the reader has used none.
5. Each view is the smallest view that answers its question.
6. Each view sits beside the text it explains.
7. Each view changes what its reader concludes, rather than restating a sentence beside it or decorating the page.

Standard 2 holds for every kind of view: a drawing of a relationship, a picture of a screen, or a table that compares or covers items. Standard 3 applies only where there is a durable document; a view in a chat, terminal or read-only answer (`document medium: none`) has no document level to keep.

Two standards that already exist in the reference stay where they are, with the same meaning:

- **Every required field is shown:** "Render every field supplied by the consuming skill's predicate contract." (`diagram-rendering-and-fallbacks.md:79`)
- **It reads where it's shown:** "labels and edges are readable at the destination", with the rest of the rendered check (`:87-93`).

Where a technical name goes when it would sit in a label stays with `markdown-presentation-baseline.md` ("Labels Versus Atoms", `:50-54`), which the reference now reaches (obligation 4).

## What the reference must do

1. It states the seven standards once, one self-contained sentence each, and every view it renders meets each standard that applies to it, whatever it shows and whatever its medium.
2. When a view request is a relationship view, it loads `diagram-semantics.md` with the view's question and draws the view in the kind of diagram that returns.
3. When the choice of diagram finds no kind for a view the consuming skill requires, it returns an exact gap to that skill and never draws the view as prose or a table marked as passing.
4. When a label on a view would carry a technical form (a command, path, expression, identifier or other code-shaped text), it loads `markdown-presentation-baseline.md` and follows its label-versus-atom decision: a short label stays on the view and the formatted technical form goes in the text beside it.
5. A view's result is `pass` only when it meets each standard that applies, every technical form in its labels follows the baseline's decision, it shows every required field, and it passes the visual check.
6. Focusing a view never removes a field the consuming skill requires, or an annotation its question needs: those are part of the view's answer.
7. Its standards name no product, tool, repository or incident; worked cases may come from real views, written without their project's names.
8. Each meaning the new section states has one home: the lines it replaces in this reference go in the same change, and the baseline keeps its own teaching.
9. Its own opening, and the repository's descriptions of what it owns, say that it owns the standards.

## From the spec's seven to these seven

The spec proposed seven standards (section 1). Three of them held two claims each, and a rule judges one claim, so they're re-cut:

- Spec 1 (question, in the reader's words) → standard 1. The reader's-words half joins standard 4, because one section of a document can't show a judge what words its reader uses.
- Spec 2 (one relationship) → standard 2, widened in draft 2 from "one relationship" to "one question", so it fits pictures of screens and tables too, and keeps the annotations a question needs.
- Spec 3 (every required field; nothing from the next document) → the fields half stays in Preserve Semantics (`:79`), where it already is; the other half becomes standard 3, which applies where there is a durable document.
- Spec 4 (the reader's nouns; commands, paths and identifiers beside the view) → standard 4 for the words. Commands, paths and identifiers reach the baseline's existing teaching through obligation 4, rather than being restated (decision D9, which supersedes D4).
- Spec 5 (smallest; beside its text) → standards 5 and 6.
- Spec 6 (changes what the reader concludes) → standard 7, unchanged.
- Spec 7 (reads on your screens) → stays with the rendered check (`:87-93`); phone width waits for your pick on focus 2's I5.

## Each standard, tested on cases it never names

Each rule passes the transfer test both ways: it holds in a materially different repository, and it rejects a bad choice built from something it never mentions.

- **1. The question in the heading or caption.**
  - Holds elsewhere: a billing service's state view headed "Can a paid invoice be reopened?" passes in a codebase that shares nothing with these skills.
  - Rejects what it never names: a heading that names the drawing's type ("Sequence diagram") or a figure number states no question, so it fails.
  - Verdict: passes.
- **2. One question.** Three cases separate it, from the design review:
  - A required picture of a changed checkout screen, under "What will this screen show?", shows the screen's controls and labels. It draws no relationship and needs none: everything in it serves its question. Passes.
  - A sequence for "What happens when checkout times out, and who retries?" labels each participant's owner and shows the error returning to the caller. Ownership and the error path are what the question asks, and the consuming skill requires both (`program-design/SKILL.md:302`: the owning component and result/error propagation). Passes.
  - A deployment diagram for "Who owns retrying a failed delivery?" also overlays which box contains which, team reporting lines, the path packets take and release dependencies. None of those answers who retries; they bury the answer. Fails.
  - The count of edge kinds or colors doesn't decide any of these; whether each element serves the one question does.
  - Verdict: passes.
- **3. The level of detail of a durable document.**
  - Holds elsewhere: a mobile app's Requirements capability map shows what users get, not screens or stores, and passes.
  - Rejects what it never names: a Specification entity map that labels each entity with its table name and ORM type shows what the Program Design owns, so it fails.
  - No durable document: a conversational map of who owns what, drawn in a chat answer with `document medium: none` (the existing consumer, `discuss-clarify-mental-models/SKILL.md:68`), has no document level to keep, so standard 3 doesn't apply and the map can pass on the others. Nothing in that skill changes.
  - Verdict: passes.
- **4. The reader's own words.**
  - Holds elsewhere: an operations runbook's topology labeled "the queue that retries" in a team that calls it that passes.
  - Rejects what it never names: nodes labeled with bare ticket numbers or internal acronyms the reader never used fail, though the standard names neither.
  - Verdict: passes. A technical name the reader uses is handled by obligation 4, traced below.
- **5. The smallest view that answers.**
  - Holds elsewhere: a checkout journey drawn as its four steps, not every screen, passes.
  - Rejects what it never names: a drawing of all thirty services when the question is about two of them fails.
  - Verdict: passes. Smallest never means dropping a required field (obligation 6).
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

## A technical name in a label, on both routes

The reader calls a worker by its code name, `retry_worker`, and calls a queue "the queue that retries". Both appear in a call graph.

- **On a page** (a design set's HTML page, built by `presentation-html`): the node for the worker would carry `retry_worker`, so the condition holds and the reference loads the baseline. Its decision: the node keeps a short label, "retry worker", and `retry_worker` goes in backticks in the chunk's text beside the diagram. `presentation-html` already loads the baseline for the page's Markdown (its step 4); now the view's own labels get the same decision before the view can pass. The queue's node keeps "the queue that retries": no technical form, no load, nothing moves.
- **In Markdown alone** (an artifact only agents read, such as a handoff note, or a chat answer with `document medium: none`): the same view in a Mermaid fence. Before this change nothing on this route reached the baseline, so `retry_worker` could sit on the node and pass. Now the reference's own call reaches it and gives the same decision: "retry worker" on the node, `retry_worker` beside it. The plain label stays as it is.

The baseline already lists this reference as a consumer (`markdown-presentation-baseline.md:3`), so no metadata run is needed.

## Where each standard shows up in your past views

From the requirements' evidence; only what your words were about is labeled.

- Bad 1 (containment and references in one picture): standard 2 broken.
- Bad 2 (four kinds of edge, three dashed): the rendered check broken; standard 2 unknown.
- Bad 3 (requirements as one big table): standard 5 broken; bears on standard 2.
- Good 1 (the decision tree): standard 2 kept.
- Good 2 (the four-level ladder): standard 2 kept for the whole; standard 4 unknown and unscored for the Operator's row.

Standards 1, 3, 4, 6 and 7 have no view tied to your words yet. They come from your general words and the spec, and their eval cases (U10) will need labels from you or from the Luna mining.
