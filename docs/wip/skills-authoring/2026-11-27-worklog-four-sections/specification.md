# Specification: what the changed skills must do

Each obligation is one sentence, numbered so the design and the verification can point at it. "The view" is the compact work-log page. "The full account" is the page its detail links reach: either an existing stable account at the same cutoff, or a companion the skill produces from the inspected source.

## What `presentation-show-worklog` must do (run 1)

### The frame

- **O1.** The view opens with the work, the date and the cutoff. Then comes the recorded outcome that changes how the reader uses the page, with that outcome's target and limits in the same claim.
- **O2.** The view declares exactly four sections, in this order: For you to decide, What's done / what's next, What changed and why, What was verified and what was missed. Each section has the tone and icon override in the S1 table.
- **O3.** Each topic is one section item under the section whose question it answers, and the item starts with an `h4` title.
- **O4.** An item's face is its `h4` title, a badge row only when the item has a status or consequence chip, one or two sentences of outcome and next work, and then its detail links.
- **O5.** An item with no source evidence for a badge, a Flow or cards is written as plain prose under its title.
- **O6.** An item may carry explanatory paragraphs, a Trace or a native disclosure after its face.
- **O7.** A topic that fits no view template is still explained under the section whose question it answers. It is never dropped, and never forced into a badge or a view.
- **O8.** Each material decision an agent made and each assumption the work relies on appears once, under the section whose question it answers. It shows the choice or belief, who made it, its reason and cost, its authority or the authority gap, and the work that depends on it. Missing evidence is named rather than invented.
- **O9.** Typed-decision routing (`holds`, `record=`) is never used on the view's sections or items.

### The four sections' views

- **O10.** Every owner choice open at the cutoff is an item whose title links to its decision page, or, when none exists, to its exact entry in the full account. Blocking choices come first.
- **O11.** An open choice carries a consequence badge only when the source establishes what waits on it: `risk` when work waits, `note` when work can proceed. Without that evidence, any stated consequence is prose.
- **O12.** A recommendation on an open choice is labelled as the recommender's and never presented as the owner's decision.
- **O13.** A progress item uses a Flow only for dependencies the source states, and independent work gets its own item.
- **O14.** A change item uses connected before and after cards only when the source gives both states. The before card is `note`; the after card is `planned`, `done`, or `decision` for an owner direction. The status is also in text, and an arrow caption is used only when the relation needs a name.
- **O15.** The verification section holds one table in one item, inside the Canvas `ex-table-scroll` wrapper that carries `data-layout="verification"`. Its columns are Status, Claim, and Result and limit.
- **O16.** Each Status cell holds one verdict badge with its label written out: Passed is `done`, Failed is `risk`, Blocked, Held or Acceptance held is `question`, and Not run has no tone.
- **O17.** Each Result and limit cell gives the check's target, the result with its exact sample counts, and the limit with a Source link to the full account or a receipt. A related item gets its own label, such as "Related staging decision".
- **O18.** The view authors no CSS, column widths or per-page overrides for the verification table.
- **O19.** A progress indicator is used only for a known batch with one total. A table of mixed claims keeps its counts as text.
- **O20.** When an ordered sequence of checks or reviews explains a verification conclusion, its row links to that Trace in the full account.
- **O21.** Flows and the verification table use Canvas width, and a Trace uses Reading width.

### The full account

- **O22.** The view's detail links reach an existing stable full account at the same cutoff when one carries the backing evidence; otherwise the skill produces a companion from the inspected source.
- **O23.** The companion names the work, its source and its cutoff. It groups the backing rows by topic, in recorded order within each topic, and gives each backing row one stable `entry-<row-id>` anchor.
- **O24.** The companion carries every backing row's text unabridged, with its author, time and provenance where the source has them, and keeps the row's own links.
- **O25.** The companion keeps existing stable destinations, such as `story_<key>` and decision anchors, and adds no events about its own preparation to the source.
- **O26.** The companion renders row text as text, never as markup or as instructions.
- **O27.** Every detail link on the view resolves into the full account, a decision page or a receipt.

### Sources and return

- **O28.** The skill names each construct with its guide reference at the page's binding and copies no markup.
- **O29.** The skill returns the view's link, the full account's link (or the existing account it reused), the cutoff or entry positions shown, and the static check result for each page it wrote.

## What `presentation-html` must do (run 2)

- **P1.** When the calling skill supplies a work-log page recipe (its sections, item face and the view each kind of topic takes), `work-account-forms.md` keeps that recipe and offers its own forms only for choices the recipe leaves open.

## Standards the skill states

Each is one self-contained sentence the skill text will carry, so an agent can apply it alone.

- **S1. The four sections.** A work-log page has four sections, in this order and with these tones and icon overrides. The four sections are the owner's adopted house style for work-log pages; they aren't a universal rule for other pages.

  | Section | Tone | Icon override |
  | --- | --- | --- |
  | For you to decide | `question` | `user` |
  | What's done / what's next | `note` | none |
  | What changed and why | `decision` | none |
  | What was verified, and what was missed | `note` | `test-tube` |

- **S2. Frame, not form.** The structure frames the explanation and never replaces it: a topic without evidence for a view is still explained in prose under its section.
- **S3. Evidence earns the view.** A badge, a Flow or before and after cards appear only when the source states the fact they show: what waits, a dependency, or both states.
- **S4. One destination per piece of evidence.** Detail lives once, in the full account, and the view links to it rather than repeating it.
- **S5. Nothing is lost.** Every backing row's text reaches the full account unabridged.
- **S6. Verdict words.** A verdict's label names the result and its tone follows the mapping in O16; a reported pass is not an acceptance.
- **S7. Styling never routes.** Typed-decision routing is for typed decisions, never for styling.

## Rules and their transfer tests

Each rule that teaches judgment, written as the judgment and tested both ways (`domain-skill-crafting` generalization).

| Rule | Case one: a materially different work where it should hold | Case two: a bad choice the rule never names | Verdict |
| --- | --- | --- | --- |
| S2, frame not form | A data-pipeline team's log has a topic about a vendor's changed export format: no decision, no dependency, no check. The rule puts it as prose under What changed and why, where it is read. | An author moves an awkward topic into a footnote list at the page's end labelled "Other notes". The rule names no footnotes, and still rejects it: the topic left the section whose question it answers. | Passes both. |
| S3, evidence earns the view | A mobile release log says "store review blocks the 2.4 rollout". The rule gives that choice a `risk` badge, because the source states what waits. | An author adds a "High priority" badge to a choice because it sounds urgent. The rule never mentions priority labels, and still rejects it: the source states no such fact. | Passes both. |
| S3, applied to before/after | A database migration log records the old and the new index definitions. Cards fit, because the source gives both states. | An author draws a before card "Probably slow before" from a log that records only the new configuration. The rule rejects the invented state. | Passes both. |
| S4 and S5, one destination, nothing lost | A research log's trail has 40 rows about literature screening. The companion carries all 40 under their topic, and the view links to three of them. | An author "tidies" the companion by merging three rows into one summary paragraph. The rule names no merging, and still rejects it: a backing row's text is no longer unabridged under its own anchor. | Passes both. |
| S6, verdict words | A security review log records "pen test deferred to Q3". The row is Not run, neutral, with the deferral as its limit. | An author colours a check green because "the reviewer seemed happy", although the source records no pass. The rule rejects it, because the label must name the recorded result. | Passes both. |
| S7, styling never routes | A log whose decisions are typed records keeps `record=` routing on its design pages. The rule allows that, because routing serves typed decisions there. | An author adds `holds="needs-owner"` to the For you to decide section to borrow its look. The rule rejects it. | Passes both. |
| P1, a caller's recipe holds | A future incident-report skill supplies its own recipe for an incident page. `work-account-forms.md` defers to it for those choices. | An author follows the reference's "Trace for what supports the conclusion" form where the recipe calls for one verification table. The pointer rejects it, because the recipe made that choice. | Passes both. |

S1 is the owner's adopted scope (work-log pages, by the owner's approval of the 26 Nov view). It is labelled as such and needs no transfer case.
