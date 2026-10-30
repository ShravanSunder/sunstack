# Page patterns

This reference covers arranging a page with multiple pages, a guided path, three or more component kinds, a compact-cell/meter comparison, a capture-variation comparison or a response/feedback composition. It shows good and bad arrangements; the guide at the page's binding owns the exact markup.

Expected inputs: the reader's question, forms chosen in step 2, and any requested answers, feedback handoff, compact-cell/meter comparison or related-capture comparison.

Return: the arrangement (what opens the page, where each form sits, which width it uses, and what sits one action away), plus the applicable pattern and example it follows.

## Open with the answer, then one slice

The first screen answers the reader's question in two or three sentences, then shows one view of the slice that matters most, such as the failure path or the changed boundary. Everything else is one action away. Good: two sentences, then the capability tree with each capability linking to its section. On a design-set page, `engineering-documents.md`'s opening governs instead: framing lines that link to the documents, and no page-written answer. Bad: a stat row, three cards and a diagram before the reader knows what the page is for.

## Reading text beside Canvas views

Keep prose, headings and short callouts at Reading width, and give a table, diagram or comparison Canvas width only when it needs the room. Put the wide view directly after the paragraph it explains. Good: a paragraph, then a Canvas table, then the next Reading paragraph. Bad: a whole section wrapped in a Canvas grid so its text runs 1,100 px wide.

## Disclosure or tabs

Use a disclosure for depth under the current point that most readers skip. Its summary names what is inside. Failure cases and their thresholds stay in view; a disclosure holds only the rationale or evidence about them, and its summary names the cases it explains. Use tabs for peer views of one thing when the reader picks one, such as current and proposed, or the sequence view and the state view. Good: "Evidence for the retry and cancellation limits (3 failure cases)" as a disclosure. Bad: tabs named "Details", "More" and "Other".

Use layers when several optional views may be visible together, such as independently showing proposed ownership and failure paths on the same map. Tabs choose one peer view; a local disclosure opens detail under one point. Keep those reader choices distinct and retrieve their actual controls from the matching guide.

## Pages and Walkthroughs

Pages are separate documents with ordinary links; the guide's `ex-nav` gives the Pages menu and the Walkthrough launcher. A Walkthrough is an optional path through existing targets and may cross pages; ordinary navigation stays available without it. For a design set, `engineering-documents.md` turns each reading path in `index.md` into a Walkthrough. Good: "Routing, end to end" stopping at the need, the contract, the call path and the proof journey. Bad: a Walkthrough whose narration restates thresholds the chunks own.

## Related captures: items, variations and filters

Choose what the reader advances between and what they compare without leaving that item. Use separate items for different logical subjects or meaningful states, variations for alternate captures of the same subject/state, and filters to narrow the collection. A filterable list alone does not express a variation relationship. One capture needs only a figure; an ordered explanation over a collection can use a Gallery Journey.

For example, suppose the supplied evidence has these screen sizes:

| Logical item | Captured variations | Ordered explanation |
| --- | --- | --- |
| Cart, ready | Phone, Tablet, Desktop | One Cart stop |
| Payment, ready | Phone, Tablet, Desktop | One Payment stop |

This is two items with three variations each, not six unrelated screens or six journey stops. A reader can stay on Cart while comparing sizes, then advance to Payment. For a size-switching journey, use the matching guide's variation-enabled path; for an exact evidence sequence, address the specific captures instead. In a size-switching journey, a missing or ambiguous variation stays a disclosed gap, not invented evidence.

Screen size is an example of the judgment, not a fixed list of device names. Use categories the supplied evidence supports and keep them consistent. Different states are separate items in this gallery's screen/state model. A useful size facet may also filter the collection; it does not replace grouped navigation. Bad: naming the logical items “Cart — Phone” and “Cart — Desktop”, or showing only a Phone filter when the reader needs to compare sizes of Cart.

Retrieve `pictures.md` and, for a journey, `tours.md` from the matching Demistify guide before writing the declarations. They own actual grouping fields, supported variation categories, the flag's owner, one-step-per-item syntax, and the difference between ordinary browsing and guided missing/ambiguous variations. Keep a Gallery on its own page with normal document navigation; this pattern adds no component attribute or page-owned navigation.

## Readable diagrams

A node names an identity and its short responsibility; the surrounding document carries the full explanation. Good: **Review queue** followed by **Retain pending work** on a supported second line, with retry/retention rules in adjacent prose or a linked detail. Bad: placing that whole rule paragraph in one long node label, or deleting its constraints merely to shorten the drawing. Retrieve the matching guide's supported line-break syntax before writing source.

Use the direction that exposes the relationship. A short horizontal **Reader → Queue → Worker** can be clear; long responsibilities across several columns may read better top-down or as an overview with a linked detail view. Preserve every required identity, edge, branch and unknown when splitting. Fullscreen is useful depth, not a repair for an unreadable first view.

## Combined identity and timing row

Keep status, count and timing distinct: status is authored meaning, a fraction reports completed work, and timing values describe total duration or phase share. Exact supplied values stay visible. A complete count reports completion; the authored status communicates outcome.

When the user asks for identity, status, checks and phase comparison together, or both progress and phase comparisons are useful for the same records, choose one native table for the complete combination: supplied identity/avatar, a short status badge, exact checks centered in a ring with its subject beside it, total duration and compact named phase bars. Keep each named phase on the same identity across rows and views; put the common phase names, order and scale beside the table once. The [matching Demistify guide](demistify.md) owns the component API, shared classes and full worked recipe; retrieve it before writing markup. Preserve the same records and useful identity fields when carrying a selected experiment into shared components. A reduced dataset tests another example, not visual agreement with the selected one.

| Identity and run | Status | Checks | Duration | Phase comparison |
| --- | --- | --- | --- | --- |
| Asha Patel · North workspace; Document import · A-148 | Complete badge | 6 / 6 centered ring | 228 ms | Connect 28 ms · Work 156 ms · Transfer 44 ms bars |
| Noor Chen · West workspace; Delivery reconciliation · A-152 | Neutral queued badge | 0 / 6 neutral ring | 0 ms | Not started |

Give the table's full wrapper Canvas width when the table needs room. Keep surrounding explanation at Reading width with the shared left edge. Put short facts and focused links in cells; put long code, explanations and a full Trace outside the table.

Label phase-share comparisons as shares. For absolute duration comparisons, use one common explicit scale. Keep missing, empty or inconsistent facts explicit.

When no progress or phase visual was requested and the facts offer no useful comparison, use ordinary text such as “6 / 6 checks in 228 ms” and omit the meter; retain an explicitly requested visual even when its values do not offer a useful comparison. A card in every cell obscures the row comparison.

## Framed or unframed

A card is one named thing: a component, an option or a finding, with depth inside it. Leave explanations in the flow. Good: three option cards inside a comparison, each holding a picture and its cost. Bad: a card around a whole section, or a card per paragraph.

## A response with one feedback handoff

Open a review with the answer or proposal the supplied sources establish, then the question the reader must answer. Keep prose at Reading width. Use a short comparison first if the options share topics, then native choice cards; give a selectable table Canvas width only when its aligned rows help. Keep the compact title, quieter Markdown body and optional full extras distinct. Extras use the native sidebar by default; an inline disclosure is a deliberate local alternative.

For example, a rollout review first explains the proposed pilot and its cost, then asks **Where should rollout start?** with **Small pilot** and **All teams**. A full supporting diagram sits in the relevant option's details. If the task also asks for independent safeguards, put those in their own multiple-answer question. Use the matching guide's Comments controls for item/passage comments and the current-answer handoff. A binding that documents default Comments keeps those controls available on every ordinary page without a feedback request. Add extra questions or supporting details only when the task needs them.

Keep the normal document navigation, widths and library styling. Stable review/question/option/target identities come from the matching guide and supplied content; one page-owned response store or another comments editor would split authority. Local saved comments and current transient answers are different states. Copy/Export is an explicit reader handoff, not automatic agent submission.

Good: a reader selects the body of an option, opens its diagram without changing that answer, comments on the exact source passage, and carries the requested feedback from one place. Bad: a recommendation is preselected as the reader's answer, every paragraph becomes a choice, or a custom copy bar competes with Comments.

Use the main workflow's single static lint pass. Selection, feedback, state restoration and export regression journeys belong to library development; exercise them only when the user requests verification or reports a specific defect.

Complete when the arrangement names what opens the page, where each form sits and at what width, what is one action away, and which pattern above it follows.
