# Page patterns

This reference covers composing a substantial multi-section explanation and arranging multiple pages, a guided path, three or more component kinds, a compact-cell/meter comparison, a capture-variation comparison or a response/feedback composition. It shows good and bad arrangements; the guide at the page's binding owns the exact markup.

Expected inputs: the reader's question, the questions and relationships of substantive sections, any supplied or already selected forms, and any requested answers, feedback handoff, compact-cell/meter comparison or related-capture comparison. An early composition read does not require forms to have been selected yet.

Before form selection, return the section questions, explanation and diagram jobs, Map organization and Walkthrough decision when applicable. During composition, once forms are selected, use this same reference to return the arrangement (what opens the page, where each form sits, which width it uses, and what sits one action away), plus the pattern and example it follows. Do not invent a chosen form or its dimensions to complete the early return.

## Open with the answer, then one slice

The first screen answers the reader's question in two or three sentences, then shows one view of the slice that matters most, such as the failure path or the changed boundary. Continue the main explanation through its substantive sections in normal document flow; optional backing detail sits one action away. Good: two sentences, then the capability tree linking to sections that explain their parts. Keep the source mode selected in `SKILL.md` step 1. On a new HTML-source engineering page, `engineering-documents.md` applies answer-first prose and useful views within each document's natural organization; a v1 human view keeps its Markdown sources authoritative. A skill-change design set's page keeps its caller's answer, parts and walkthrough. Bad: a stat row, three cards and a diagram before the reader knows what the page is for.

## Compose sections a reader can follow

For a substantial work account or technical explanation, build each section around one meaningful question. Introduce the situation and the terms needed to understand it, compose the relevant diagram beside the explanation, and explain what the relationship means for the reader. A work account also makes the actual actions, decisions, corrections and results understandable. A paragraph-filled card is still a paragraph; a phase diagram alone does not explain a changed ownership boundary.

Give the forms complementary jobs. Text explains context and reasons; a diagram exposes the source-supported relationship; a comparison aligns corresponding facts; code shows exact technical material; a Trace opens the evidence behind ordered findings. Keep their meaning together without repeating the same explanation in every form. A short label needs enough adjacent explanation to be understood, not a whole paragraph packed into a node. Split a section when it starts answering an independent question, and link the shared content instead of copying it.

For example, an illustrative maintenance account might ask: why did a restart lose pending work, what changed the ownership of that work, and what did the rehearsal establish? The first section explains the observed loss beside the interrupted sequence; the second explains the recorded correction beside the changed owner and handoff; the third explains the rehearsal beside its exercised path and remaining boundary. These are example questions, not mandatory phases. An ordinary single fact or an empty status answer needs neither a manufactured diagram nor a new section to hold it.

## Map connects related content; the outline follows headings

For a substantial account with related chunks, organize Map around the reader's concerns or the work's subjects and connect each to its relevant explanatory locations. Give destinations useful names and descriptions: the reader should know what they will find. One concern may reach several sections and one section may serve several concerns. Keep those associations source-supported; Map points to facts in the document rather than storing another copy of them.

In the maintenance example, “Keep pending work through restart” can reach the failure sequence, corrected owner and rehearsal result. The left outline still follows where those sections sit in the page. Copying that outline into Map gives the reader no additional way to understand the relationships. A small page with no useful cross-cutting association can keep ordinary heading navigation.

IF the page needs Map, load the matching guide's `navigation.md` and return its supported Map composition, labels and descriptions, stable destinations and opening method. Follow the selected binding's declaration and source rules; do not invent a navigation schema or substitute a spatial diagram for the reader's Map panel.

## Walkthroughs answer an ordered question

Add a Walkthrough when understanding a question or journey requires visiting several existing chunks in a particular order. Name the question, choose the targets that explain its progression, and use narration to direct attention to each target. The content stays at those targets and remains readable without starting the route. A route through every heading is not evidence that a guided explanation was needed.

For the maintenance example, “Does a passing rehearsal mean the rollout is accepted?” could visit the intended outcome, the old failure, the changed handoff, the actual rehearsal and its unproved boundary. That order follows the question, not the page's table of contents. A reader looking up one independent result needs a link, not a guided route.

IF a Walkthrough is needed, load the matching guide's `navigation.md` and `tours.md` and return its supported launcher and path declarations, purposeful narration and resolving target identities. Keep ordinary Pages, headings and Map available beside that optional route; the guide owns the implemented controls and delivery constraints.

## Reading text beside Canvas views

Keep prose, headings and short callouts at Reading width, and give a table, diagram or comparison Canvas width only when it needs the room. Put the wide view directly after the paragraph it explains. Good: a paragraph, then a Canvas table, then the next Reading paragraph. Bad: a whole section wrapped in a Canvas grid so its text runs 1,100 px wide.

## Disclosure or tabs

Use a disclosure for depth under the current point that most readers skip. Its summary names what is inside. In content you compose, failure cases and their thresholds stay in view; a disclosure holds only the rationale or evidence about them, and its summary names the cases it explains. A disclosure carried from a source keeps its initial state, as `SKILL.md` step 4 teaches. Use tabs for peer views of one thing when the reader picks one, such as current and proposed, or the sequence view and the state view. Good: "Evidence for the retry and cancellation limits (3 failure cases)" as a disclosure. Bad: tabs named "Details", "More" and "Other".

Use layers when several optional views may be visible together, such as independently showing proposed ownership and failure paths on the same map. Tabs choose one peer view; a local disclosure opens detail under one point. Keep those reader choices distinct and retrieve their actual controls from the matching guide.

## Pages and Walkthroughs

Pages are separate documents with ordinary links; the guide's `ex-nav` gives the Pages menu and the Walkthrough launcher. A Walkthrough is an optional path through existing targets and may cross pages; ordinary navigation stays available without it. For a new HTML design collection, `engineering-documents.md` uses one shared navigation descriptor for Pages, Map and complete Walkthroughs; consult the matching navigation and tours guides for syntax and keep all routes aimed at real HTML content. A Walkthrough is a reading route, not a behavioral journey diagram. Good: "Routing, end to end" stopping at the need, the contract, the call path and the proof journey. Bad: a Walkthrough whose narration restates a threshold the owning section states.

## Related captures: items, variations and filters

Choose what the reader advances between and what they compare without leaving that item. Use separate items for different logical subjects or meaningful states, variations for alternate captures of the same subject/state, and filters to narrow the collection. A filterable list alone does not express a variation relationship. One capture needs only a figure; an ordered explanation over a collection can use a Gallery Journey.

For example, suppose the supplied evidence has these screen sizes:

| Logical item | Captured variations | Ordered explanation |
| --- | --- | --- |
| Cart, ready | Phone, Tablet, Desktop | One Cart stop |
| Payment, ready | Phone, Tablet, Desktop | One Payment stop |

This is two items with three variations each, not six unrelated screens or six journey stops. A reader can stay on Cart while comparing sizes, then advance to Payment. For a size-switching journey, use the matching guide's variation-enabled path; for an exact evidence sequence, address the specific captures instead. In a size-switching journey, a missing or ambiguous variation stays a disclosed gap, not invented evidence.

Screen size is an example of the judgment, not a fixed list of device names. Use categories the supplied evidence supports and keep them consistent. Different states are separate items in this gallery's screen/state model. A useful size facet may also filter the collection; it does not replace grouped navigation. Bad: naming the logical items “Cart — Phone” and “Cart — Desktop”, or showing only a Phone filter when the reader needs to compare sizes of Cart.

IF the page compares related captures, load the matching guide's `pictures.md` before writing the declarations and return its grouping fields, supported variation categories and the flag's owner. IF the gallery has a guided journey, load the guide's `tours.md` and return its one-step-per-item syntax and how guided missing or ambiguous variations differ from ordinary browsing. Keep a Gallery on its own page with normal document navigation; this pattern adds no component attribute or page-owned navigation.

## Readable diagrams

A node names an identity and its short responsibility; the surrounding document carries the full explanation. Good: **Review queue** followed by **Retain pending work** on a supported second line, with retry/retention rules in adjacent prose or a linked detail. Bad: placing that whole rule paragraph in one long node label, or deleting its constraints merely to shorten the drawing. Retrieve the matching guide's supported line-break syntax before writing source.

Use the direction that exposes the relationship. A short horizontal **Reader → Queue → Worker** can be clear; long responsibilities across several columns may read better top-down or as an overview with a linked detail view. Preserve every required identity, edge, branch and unknown when splitting. Fullscreen is useful depth, not a repair for an unreadable first view.

## Combined identity and timing row

Keep status, count and timing distinct: status is authored meaning, a fraction reports completed work, and timing values describe total duration or phase share. Exact supplied values stay visible. A complete count reports completion; the authored status communicates outcome.

When the user asks for identity, status, checks and phase comparison together, or both progress and phase comparisons are useful for the same records, choose one native table for the complete combination: supplied identity/avatar, a short status badge, exact checks centered in a ring with its subject beside it, total duration and compact named phase bars. Keep each named phase on the same identity across rows and views; put the common phase names, order and scale beside the table once. The [matching Demistify guide](demistify.md) owns the component API, shared classes and full worked recipe; retrieve it before writing markup.

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
