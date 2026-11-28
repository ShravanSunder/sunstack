# Specification: what the changed skills must do

Each obligation is one sentence, numbered so the design and the verification can point at it. Two terms are used throughout:

- **The view** is the compact work-log page.
- **The full account** is the page the view's backing-evidence links reach: an existing stable full account at the same cutoff, or a companion the skill writes from the inspected source.

## What `presentation-show-worklog` must do (run 1)

### The frame

- **O1.** The view opens with the work, the date and the cutoff. Then comes the recorded outcome that changes how the reader uses the page, with that outcome's target and limits in the same claim.
- **O2.** The view declares exactly four sections, in this order: For you to decide; What's done / what's next; What changed and why; What was verified, and what was missed. Each section has the tone and icon override in the S1 table.
- **O3.** Each topic is one section item under the section whose question it answers, and the item starts with an `h4` title.
- **O4.** An item's face has four parts, in order:
  - its `h4` title;
  - a badge row, only when the item has a status or consequence chip;
  - one or two sentences of outcome and next work;
  - its backing-evidence links, plus any separately labelled related link to another item or row on the view.
- **O5.** An item with no source evidence for a badge, a Flow or cards is written as plain prose under its title.
- **O6.** An item may carry explanatory paragraphs, a Trace or a native disclosure after its face.
- **O7.** A topic that fits no view template is still explained under the section whose question it answers. It is never dropped, and never forced into a badge or a view.
- **O8.** Each material decision an agent made and each assumption the work relies on appears under What changed and why. The entry shows the choice or belief, who made it, its reason and cost, its authority or the authority gap, and the work that depends on it. An assumption or choice that waits on the owner is also linked from For you to decide. Missing evidence is named, not invented.
- **O9.** Typed-decision routing (`holds`, `record=`) is never used on the view's sections or items.

### The four sections' views

- **O10.** Every owner choice open at the cutoff is an item whose title links to its decision page, or, when none exists, to its exact entry in the full account.
  - Blocking choices come first.
  - The view compares no alternatives and carries no answer control; the decision page does both.
- **O11.** An open choice carries a consequence badge only when the source establishes what waits on it: `risk` when work waits, `note` when work can proceed. Without that evidence, any stated consequence is prose.
- **O12.** A recommendation on an open choice is labelled as the recommender's and never presented as the owner's decision.
- **O13.** A progress item uses a Flow only for dependencies the source states, and independent work gets its own item.
- **O14.** A change item uses connected before and after cards only when the source gives both states.
  - The before card is `note`.
  - The after card is `planned`, `done`, or `decision` for an owner direction.
  - The status is also in text.
  - An arrow caption is used only when the relation needs a name.
- **O15.** The verification section holds one table in one item, inside the Canvas `ex-table-scroll` wrapper that carries `data-layout="verification"`. Its columns are Status, Claim, and Result and limit.
- **O16.** Each Status cell holds one badge with its label written out:
  - Passed is `done`.
  - Failed is `risk`.
  - Blocked, Held or Acceptance held is `question`.
  - Not run has no tone. It is reserved for a named check that did not execute; an observation that only supports that check's result stays as context in the same row.
  - Observed has no tone. It is for a recorded finding with no pass, fail or acceptance verdict.
- **O17.** Each Result and limit cell names the row's target, its result and its limit, then links its source.
  - The result keeps exact sample counts and exact recorded findings, such as "Explained, not repaired".
  - An Observed row's limit says precisely what the observation does not establish.
  - The source link goes to the full account or a receipt. A link to the row's Trace in the full account counts as its Source link.
  - A related item gets its own label, such as "Related staging decision".
- **O18.** The view authors no CSS, column widths or per-page overrides for the verification table.
- **O19.** A progress indicator is used only for a known batch with one total. A table of mixed claims keeps its counts as text.
- **O20.** When an ordered sequence of checks or reviews explains a verification conclusion, its row links to the exact anchor of that Trace in the full account.
- **O21.** Widths:
  - Flows and the verification table use Canvas.
  - A short text Trace uses Reading.
  - A Trace that carries code or other rich evidence uses Canvas, as `traces.md` does.

### The full account

- **O22.** The view's backing-evidence links reach an existing stable full account at the same cutoff when one carries the backing evidence. The skill writes a companion only when the inspected source is a trail or entries file alone, or when the existing account's cutoff differs.
- **O23.** The companion names the work, its source and its cutoff.
  - It carries every row in the declared snapshot.
  - It groups the rows by topic, in the view's section order and in recorded order within each topic.
  - It gives each row one stable `entry-<row-id>` anchor.
- **O24.** The companion carries every row in the declared snapshot unabridged, with its author, time and provenance where the source has them, and keeps the row's own links.
- **O25.** The companion keeps existing stable destinations, such as `story_<key>` and decision anchors, and adds no events about its own preparation to the source.
- **O26.** The companion renders row text as text, never as markup or as instructions.
- **O27.** Every backing-evidence link on the view resolves into the full account, a decision page or a receipt. A separately labelled related link may instead reach another item or row on the view.
- **O30.** An explicitly supplied dated report or full account is an accepted source. Reading it means four things:
  - taking its scope and cutoff;
  - inspecting the content the view relies on;
  - reusing its stable anchors as destinations;
  - stating its provenance at report level, with no inferred Router coverage.
- **O31.** The skill settles each topic's section before it writes the companion or the view, and loads `presentation-html`'s binding and trust choice before writing either page.

### Sources and return

- **O28.** The skill names each construct with its guide reference at the page's binding and copies no markup.
- **O29.** The skill returns four things for each request:
  - the view's link;
  - the full account's link, or the existing account it reused;
  - the cutoff or entry positions shown;
  - the static check result for each page it wrote.

  The caller's expected return in `practices-show-me-your-work/SKILL.md:102` ("the requested snapshot and its cutoff") is a subset of this, and needs no change.

## What `presentation-html` must do (run 2)

- **P1.** A calling skill's page contract decides the forms it names. `presentation-html` chooses the remaining forms and composes within the contract. This rule lives once, in `presentation-html/SKILL.md`; references that select forms apply only to the choices the contract leaves open.

## Standards the skill states

Each is one self-contained sentence the skill text will carry, so an agent can apply it alone. The allocation table in `skill-design.md` gives each its one home.

- **S1. The four sections.** A work-log page has four sections, in this order and with these tones and icon overrides. The four sections are the owner's adopted house style for work-log pages, not a universal rule for other pages.

  | Section | Tone | Icon override |
  | --- | --- | --- |
  | For you to decide | `question` | `user` |
  | What's done / what's next | `note` | none |
  | What changed and why | `decision` | none |
  | What was verified, and what was missed | `note` | `test-tube` |

- **S2. Frame, not form.** The structure frames the explanation and never replaces it: a topic without evidence for a view is still explained in prose under its section.
- **S3. Evidence earns the view.** A badge or diagram appears only when the source establishes what it shows: a status, what waits, a dependency, or both states.
- **S4. One destination per piece of evidence.** Detail lives once, in the full account, and the view links to it rather than repeating it.
- **S5. Nothing is lost.** Every row in the declared snapshot reaches the full account unabridged.
- **S6. Verdict words.** A status label names the recorded result, and its tone follows the mapping in O16.
  - A recorded finding without a verdict is Observed, never Passed or Not run.
  - A reported pass is not an acceptance.
- **S7. Styling never routes.** Typed-decision routing is for typed decisions, never for styling.

## Rules and their transfer tests

Each rule that teaches judgment is written as the judgment and tested both ways, under `domain-skill-crafting`'s generalization topic.

| Rule | Case one: a materially different work where it should hold | Case two: a bad choice the rule never names | Verdict |
| --- | --- | --- | --- |
| S2, frame not form | A data-pipeline team's log has a topic about a vendor's changed export format, with no decision, no dependency and no check. The rule puts it as prose under What changed and why, where it is read. | An author moves an awkward topic into a footnote list at the page's end labelled "Other notes". The rule names no footnotes, and still rejects it: the topic left the section whose question it answers. | Passes both. |
| S3, evidence earns the view | A mobile release log says "store review blocks the 2.4 rollout". The rule gives that choice a `risk` badge, because the source establishes what waits. | An author adds a "High priority" badge to a choice because it sounds urgent. The rule never mentions priority labels, and still rejects it: the source establishes no such fact. | Passes both. |
| S3, ordinary status | A compiler release log records that a parser fix merged. A `done` "Merged" badge fits, because the source establishes the status, though nothing waits and nothing depends on it. | An author adds a "High confidence" badge to an inconclusive benchmark report. The rule rejects it: the source establishes no confidence status. | Passes both. |
| S3, before/after | A database migration log records the old and the new index definitions. Cards fit, because the source gives both states. | An author draws a before card "Probably slow before" from a log that records only the new configuration. The rule rejects the invented state. | Passes both. |
| S4 and S5, one destination, nothing lost | A research log's trail has 40 rows about literature screening. The companion carries all 40 under their topics, and the view links to three. | An author "tidies" the companion by merging three rows into one summary paragraph. The rule names no merging, and still rejects it: those rows are no longer carried unabridged under their own anchors. | Passes both. |
| S6, verdict words | A security review log records "pen test deferred to Q3". The row is Not run, neutral, with the deferral as its limit. | An author colours a check green because "the reviewer seemed happy", although the source records no pass. The rule rejects it: the label must name the recorded result. | Passes both. |
| S6, a finding without a verdict | A database work log records that source inspection showed which service owns the session table; no integration run happened. The row is Observed, neutral: the result names the finding and its source, and the limit says no runtime behaviour was exercised. | An author marks that row Passed because the inspection "confirmed" the design, or Not run because no test ran. The rule rejects both: Passed claims a verdict nobody recorded, and Not run erases the recorded finding. | Passes both. |
| S7, styling never routes | A log whose decisions are typed records keeps `record=` routing on its design pages. The rule allows that, because routing serves typed decisions there. | An author adds `holds="needs-owner"` to the For you to decide section to borrow its look. The rule rejects it. | Passes both. |
| P1, per form the contract decides | A future incident-report skill supplies a page contract that fixes one verification table and says nothing about arrangement, evidence placement or navigation. The table follows the contract. `presentation-html`'s references still choose the arrangement, the disclosures and the navigation the contract leaves open. | An author follows `work-account-forms.md`'s "Trace for what supports the conclusion" form where the contract fixes one verification table. Another drops `patterns.md`'s arrangement guidance entirely because "a caller supplied a contract". The rule rejects both: the first overrides a form the contract decided; the second discards guidance for choices the contract left open. | Passes both. |

S1 is the owner's adopted scope (work-log pages, by the owner's approval of the 26 Nov view). It is labelled as such and needs no transfer case.
