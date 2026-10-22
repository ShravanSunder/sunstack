# Page patterns

This reference covers arranging a page that has more than one page, a guided path, or three or more kinds of component. It shows good and bad arrangements; the guide at the page's binding owns the exact markup.

Expected inputs: the reader's question and the forms chosen in step 2.

Return: the arrangement (what opens the page, where each form sits, which width it uses, and what sits one action away), plus the pattern below that it follows.

## Open with the answer, then one slice

The first screen answers the reader's question in two or three sentences, then shows one view of the slice that matters most, such as the failure path or the changed boundary. Everything else is one action away. Good: two sentences, then the capability tree with each capability linking to its section. On a design-set page, `engineering-documents.md`'s opening governs instead: framing lines that link to the documents, and no page-written answer. Bad: a stat row, three cards and a diagram before the reader knows what the page is for.

## Reading text beside Canvas views

Keep prose, headings and short callouts at Reading width, and give a table, diagram or comparison Canvas width only when it needs the room. Put the wide view directly after the paragraph it explains. Good: a paragraph, then a Canvas table, then the next Reading paragraph. Bad: a whole section wrapped in a Canvas grid so its text runs 1,100 px wide.

## Disclosure or tabs

Use a disclosure for depth under the current point that most readers skip. Its summary names what is inside, including any failure cases. Use tabs for peer views of one thing when the reader picks one, such as current and proposed, or the sequence view and the state view. Good: "Retry and cancellation (3 failure cases)" as a disclosure. Bad: tabs named "Details", "More" and "Other".

## Pages and Walkthroughs

Pages are separate documents with ordinary links; the guide's `ex-nav` gives the Pages menu and the Walkthrough launcher. A Walkthrough is an optional path through existing targets and may cross pages; ordinary navigation stays available without it. For a design set, `engineering-documents.md` turns each reading path in `index.md` into a Walkthrough. Good: "Routing, end to end" stopping at the need, the contract, the call path and the proof journey. Bad: a Walkthrough whose narration restates thresholds the chunks own.

## Framed or unframed

A card is one named thing: a component, an option or a finding, with depth inside it. Leave explanations in the flow. Good: three option cards inside a comparison, each holding a picture and its cost. Bad: a card around a whole section, or a card per paragraph.

Complete when the arrangement names what opens the page, where each form sits and at what width, what is one action away, and which pattern above it follows.
