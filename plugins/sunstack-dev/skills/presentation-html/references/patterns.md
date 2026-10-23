# Page patterns

This reference covers arranging a page with multiple pages, a guided path, three or more component kinds, or a compact-cell/meter comparison. It shows good and bad arrangements; the guide at the page's binding owns the exact markup.

Expected inputs: the reader's question, forms chosen in step 2, and any compact-cell/meter comparison being considered.

Return: the arrangement (what opens the page, where each form sits, which width it uses, and what sits one action away), plus the applicable pattern and example it follows.

## Open with the answer, then one slice

The first screen answers the reader's question in two or three sentences, then shows one view of the slice that matters most, such as the failure path or the changed boundary. Everything else is one action away. Good: two sentences, then the capability tree with each capability linking to its section. On a design-set page, `engineering-documents.md`'s opening governs instead: framing lines that link to the documents, and no page-written answer. Bad: a stat row, three cards and a diagram before the reader knows what the page is for.

## Reading text beside Canvas views

Keep prose, headings and short callouts at Reading width, and give a table, diagram or comparison Canvas width only when it needs the room. Put the wide view directly after the paragraph it explains. Good: a paragraph, then a Canvas table, then the next Reading paragraph. Bad: a whole section wrapped in a Canvas grid so its text runs 1,100 px wide.

## Disclosure or tabs

Use a disclosure for depth under the current point that most readers skip. Its summary names what is inside, including any failure cases. Use tabs for peer views of one thing when the reader picks one, such as current and proposed, or the sequence view and the state view. Good: "Retry and cancellation (3 failure cases)" as a disclosure. Bad: tabs named "Details", "More" and "Other".

## Pages and Walkthroughs

Pages are separate documents with ordinary links; the guide's `ex-nav` gives the Pages menu and the Walkthrough launcher. A Walkthrough is an optional path through existing targets and may cross pages; ordinary navigation stays available without it. For a design set, `engineering-documents.md` turns each reading path in `index.md` into a Walkthrough. Good: "Routing, end to end" stopping at the need, the contract, the call path and the proof journey. Bad: a Walkthrough whose narration restates thresholds the chunks own.

## Compact evidence in a table

Keep status, count and timing distinct: status is authored meaning, a fraction reports completed work, and timing values describe total duration or phase share. Exact supplied values stay visible. A complete count reports completion; the authored status communicates outcome.

Recommend C when rows have meaningful, comparable phase measurements: use a native table with one short authored status, exact count and total duration per row, plus named phase bars. Keep a timing cell to its bar and exact values; put the common phase names, order and scale beside the table once. Keep each named phase on the same identity across rows and views, and use the bound guide’s palette for phase color. Follow the [binding and guide retrieval steps](demistify.md) to obtain the matching component guide and its worked small-parts recipe; this reference owns selection and arrangement. When carrying a selected experiment into shared components, compare the same records and preserve its useful identity and metadata fields. A reduced dataset tests another example, not visual agreement with the selected one.

| Run | Status | Checks | Duration | Phase share |
| --- | --- | --- | --- | --- |
| Import | Complete | 6 / 6 | 228 ms | Connect 28 ms · Work 156 ms · Transfer 44 ms |
| Delivery | Queued | 0 / 6 | 0 ms | Not started |

Give the table's full wrapper Canvas width when the table needs room. Keep surrounding explanation at Reading width with the shared left edge. Put short facts and focused links in cells; put long code, explanations and a full Trace outside the table.

Label phase-share comparisons as shares. For absolute duration comparisons, use one common explicit scale. Show progress only with a meaningful denominator and keep missing, empty or inconsistent facts explicit. A progress ring is optional when the progress fraction is the reader's main comparison. Inspect the actual page at desktop and 390 CSS px in light and dark themes for wrapping, local scrolling and clipping.

When phase timing adds nothing, use ordinary text such as “6 / 6 checks in 228 ms” and omit the meter. A card in every cell obscures the row comparison.

## Framed or unframed

A card is one named thing: a component, an option or a finding, with depth inside it. Leave explanations in the flow. Good: three option cards inside a comparison, each holding a picture and its cost. Bad: a card around a whole section, or a card per paragraph.

Complete when the arrangement names what opens the page, where each form sits and at what width, what is one action away, and which pattern above it follows.
