# Page patterns

This reference covers composing a substantial multi-section explanation and arranging multiple pages, a guided path, three or more component kinds or independently switchable content. It shows good and bad arrangements; the guide at the page's binding owns the exact markup.

Expected inputs: the reader's question, the questions and relationships of substantive sections, and any supplied or already selected forms. An early composition read does not require forms to have been selected yet.

Before form selection, return the section questions, explanation and diagram jobs, Map organization and Walkthrough decision when applicable. During composition, once forms are selected, use this same reference to return the arrangement (what opens the page, where each form sits, which width it uses, and what sits one action away), plus the pattern and example it follows. Do not invent a chosen form or its dimensions to complete the early return.

## Open with the answer, then one slice

The first screen answers the reader's question in two or three sentences, then shows one view of the slice that matters most, such as the failure path or the changed boundary. Continue the main explanation through its substantive sections in normal document flow; optional backing detail sits one action away. Good: two sentences, then the capability tree linking to sections that explain their parts. Keep the source mode selected in `SKILL.md` step 1. On an engineering design page, `engineering-documents.md` applies answer-first prose and useful views around the records; a v1 human view keeps its Markdown sources authoritative. A skill-change design set's page keeps its caller's answer, parts and walkthrough. Bad: a stat row, three cards and a diagram before the reader knows what the page is for.

## Compose sections a reader can follow

For a substantial work account or technical explanation, build each section around one meaningful question. Introduce the situation and the terms needed to understand it, compose the relevant diagram beside the explanation, and explain what the relationship means for the reader. A work account also makes the actual actions, decisions, corrections and results understandable. A paragraph-filled card is still a paragraph; a phase diagram alone does not explain a changed ownership boundary.

Give the forms complementary jobs. Text explains context and reasons; a diagram exposes the source-supported relationship; a comparison aligns corresponding facts; code shows exact technical material; a Trace opens the evidence behind ordered findings. Keep their meaning together without repeating the same explanation in every form. A short label needs enough adjacent explanation to be understood, not a whole paragraph packed into a node. Split a section when it starts answering an independent question, and link the shared content instead of copying it.

For example, an illustrative maintenance account might ask: why did a restart lose pending work, what changed the ownership of that work, and what did the rehearsal establish? The first section explains the observed loss beside the interrupted sequence; the second explains the recorded correction beside the changed owner and handoff; the third explains the rehearsal beside its exercised path and remaining boundary. These are example questions, not mandatory phases. An ordinary single fact or an empty status answer needs neither a manufactured diagram nor a new section to hold it.

## Map and Walkthrough

`SKILL.md` step 2 owns when a Map or a Walkthrough earns its place. For example, in the maintenance account a Map concern "Keep pending work through restart" reaches the failure sequence, the corrected owner and the rehearsal result, and a Walkthrough answers "Does a passing rehearsal mean the rollout is accepted?" by visiting the intended outcome, the old failure, the changed handoff, the rehearsal and its unproved boundary. Pages are separate documents with ordinary links; the guide's `ex-nav` gives the Pages menu and the Walkthrough launcher.

IF the page needs Map, load the matching guide's `navigation.md` and return its supported Map composition, labels and descriptions, stable destinations and opening method. Follow the selected binding's declaration and source rules; do not invent a navigation schema or substitute a spatial diagram for the reader's Map panel.

IF a Walkthrough is needed, load the matching guide's `navigation.md` and `tours.md` and return its supported launcher and path declarations, purposeful narration and resolving target identities. Keep ordinary Pages, headings and Map available beside that optional route; the guide owns the implemented controls and delivery constraints.

## Reading text beside Canvas views

Keep prose, headings and short callouts at Reading width, and give a table, diagram or comparison Canvas width only when it needs the room. Put the wide view directly after the paragraph it explains. Good: a paragraph, then a Canvas table, then the next Reading paragraph. Bad: a whole section wrapped in a Canvas grid so its text runs 1,100 px wide.

## Disclosure or tabs

Use a disclosure for depth under the current point that most readers skip. Its summary names what is inside. In content you compose, failure cases and their thresholds stay in view; a disclosure holds only the rationale or evidence about them, and its summary names the cases it explains. A disclosure carried from a source keeps its initial state, as `SKILL.md` step 4 teaches. Use tabs for peer views of one thing when the reader picks one, such as current and proposed, or the sequence view and the state view. Good: "Evidence for the retry and cancellation limits (3 failure cases)" as a disclosure. Bad: tabs named "Details", "More" and "Other".

Use layers when several optional views may be visible together, such as independently showing proposed ownership and failure paths on the same map. Tabs choose one peer view; a local disclosure opens detail under one point. Keep those reader choices distinct and retrieve their actual controls from the matching guide.

## Readable diagrams

A node names an identity and its short responsibility; the surrounding document carries the full explanation. Good: **Review queue** followed by **Retain pending work** on a supported second line, with retry/retention rules in adjacent prose or a linked detail. Bad: placing that whole rule paragraph in one long node label, or deleting its constraints merely to shorten the drawing. Retrieve the matching guide's supported line-break syntax before writing source.

Use the direction that exposes the relationship. A short horizontal **Reader → Queue → Worker** can be clear; long responsibilities across several columns may read better top-down or as an overview with a linked detail view. Preserve every required identity, edge, branch and unknown when splitting. Fullscreen is useful depth, not a repair for an unreadable first view.

## Framed or unframed

A card is one named thing: a component, an option or a finding, with depth inside it. Leave explanations in the flow. Good: three option cards inside a comparison, each holding a picture and its cost. Bad: a card around a whole section, or a card per paragraph.

Complete when the arrangement names what opens the page, where each form sits and at what width, what is one action away, and which pattern above it follows.
