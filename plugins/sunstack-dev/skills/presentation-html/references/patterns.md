# Page patterns

This reference covers arranging a page with multiple pages, a guided path, three or more component kinds, a compact-cell/meter comparison or a response/feedback composition. It shows good and bad arrangements; the guide at the page's binding owns the exact markup.

Expected inputs: the reader's question, forms chosen in step 2, and any requested answers, feedback handoff or compact-cell/meter comparison.

Return: the arrangement (what opens the page, where each form sits, which width it uses, and what sits one action away), plus the applicable pattern and example it follows.

## Open with the answer, then one slice

The first screen answers the reader's question in two or three sentences, then shows one view of the slice that matters most, such as the failure path or the changed boundary. Everything else is one action away. Good: two sentences, then the capability tree with each capability linking to its section. On a design-set page, `engineering-documents.md`'s opening governs instead: framing lines that link to the documents, and no page-written answer. Bad: a stat row, three cards and a diagram before the reader knows what the page is for.

## Reading text beside Canvas views

Keep prose, headings and short callouts at Reading width, and give a table, diagram or comparison Canvas width only when it needs the room. Put the wide view directly after the paragraph it explains. Good: a paragraph, then a Canvas table, then the next Reading paragraph. Bad: a whole section wrapped in a Canvas grid so its text runs 1,100 px wide.

## Disclosure or tabs

Use a disclosure for depth under the current point that most readers skip. Its summary names what is inside, including any failure cases. Use tabs for peer views of one thing when the reader picks one, such as current and proposed, or the sequence view and the state view. Good: "Retry and cancellation (3 failure cases)" as a disclosure. Bad: tabs named "Details", "More" and "Other".

## Pages and Walkthroughs

Pages are separate documents with ordinary links; the guide's `ex-nav` gives the Pages menu and the Walkthrough launcher. A Walkthrough is an optional path through existing targets and may cross pages; ordinary navigation stays available without it. For a design set, `engineering-documents.md` turns each reading path in `index.md` into a Walkthrough. Good: "Routing, end to end" stopping at the need, the contract, the call path and the proof journey. Bad: a Walkthrough whose narration restates thresholds the chunks own.

## Combined identity and timing row

Keep status, count and timing distinct: status is authored meaning, a fraction reports completed work, and timing values describe total duration or phase share. Exact supplied values stay visible. A complete count reports completion; the authored status communicates outcome.

When the user asks for identity, status, checks and phase comparison together, or both progress and phase comparisons are useful for the same records, choose one native table for the complete combination: supplied identity/avatar, a short status badge, exact checks centered in a ring with its subject beside it, total duration and compact named phase bars. Recommend C for rows with meaningful, comparable phase measurements. Keep each named phase on the same identity across rows and views; put the common phase names, order and scale beside the table once. The [matching Demistify guide](demistify.md) owns the component API, shared classes and full worked recipe; retrieve it before writing markup. Preserve the same records and useful identity fields when carrying a selected experiment into shared components. A reduced dataset tests another example, not visual agreement with the selected one.

| Identity and run | Status | Checks | Duration | Phase comparison |
| --- | --- | --- | --- | --- |
| Asha Patel · North workspace; Document import · A-148 | Complete badge | 6 / 6 centered ring | 228 ms | Connect 28 ms · Work 156 ms · Transfer 44 ms bars |
| Noor Chen · West workspace; Delivery reconciliation · A-152 | Neutral queued badge | 0 / 6 neutral ring | 0 ms | Not started |

Give the table's full wrapper Canvas width when the table needs room. Keep surrounding explanation at Reading width with the shared left edge. Put short facts and focused links in cells; put long code, explanations and a full Trace outside the table.

Label phase-share comparisons as shares. For absolute duration comparisons, use one common explicit scale. Keep missing, empty or inconsistent facts explicit. Inspect the actual page at desktop and 390 CSS px in light and dark themes for wrapping, local scrolling and clipping.

When no progress or phase visual was requested and the facts offer no useful comparison, use ordinary text such as “6 / 6 checks in 228 ms” and omit the meter; retain an explicitly requested visual even when its values do not offer a useful comparison. A card in every cell obscures the row comparison.

## Framed or unframed

A card is one named thing: a component, an option or a finding, with depth inside it. Leave explanations in the flow. Good: three option cards inside a comparison, each holding a picture and its cost. Bad: a card around a whole section, or a card per paragraph.

## A response with one feedback handoff

Open a review with the answer or proposal the supplied sources establish, then the question the reader must answer. Keep prose at Reading width. Use a short comparison first if the options share topics, then native choice cards; give a selectable table Canvas width only when its aligned rows help. Keep the compact title, quieter Markdown body and optional full extras distinct. Extras use the native sidebar by default; an inline disclosure is a deliberate local alternative.

For example, a rollout review first explains the proposed pilot and its cost, then asks **Where should rollout start?** with **Small pilot** and **All teams**. A full supporting diagram sits in the relevant option's details. If the task also asks for independent safeguards, put those in their own multiple-answer question. Use the matching guide's Comments controls for item/passage comments and the current-answer handoff. A binding that documents default Comments keeps those controls available on an ordinary page without a feedback request. Add extra questions or supporting details only when the task needs them.

Keep the normal document navigation, widths and library styling. Stable review/question/option/target identities come from the matching guide and supplied content; one page-owned response store or another comments editor would split authority. Local saved comments and current transient answers are different states. Copy/Export is an explicit reader handoff, not automatic agent submission.

Good: a reader selects the body of an option, opens its diagram without changing that answer, comments on the exact source passage, and carries the requested feedback from one place. Bad: a recommendation is preselected as the reader's answer, every paragraph becomes a choice, or a custom copy bar competes with Comments.

Observe the actual requested interactions: answer selection versus link/detail/comment actions, rendered body and extras, native panel replacement and focus return, quote/source fidelity, and actual handed-off comments/current answers. Check desktop and 390 CSS px with the shared reader controls. Source and static checks cannot establish these interactions; keep unobserved outcomes explicit in the artifact return.

Complete when the arrangement names what opens the page, where each form sits and at what width, what is one action away, and which pattern above it follows.
