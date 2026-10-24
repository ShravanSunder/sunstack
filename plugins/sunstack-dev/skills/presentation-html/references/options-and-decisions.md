# Alternatives and decisions

Start from the reader’s question and the supplied options. Choose a view that exposes the comparison the reader needs; the page author sets its layout, while reader controls choose content.

## Compare the same topics

Use the guide’s comparison when readers need to compare alternatives against corresponding topics. Give each topic the same `data-compare-row` key across alternatives; the matching key aligns the rows, and an omitted topic is shown as **Not supplied**. If topics are not corresponding, keep each alternative in its own flow instead of implying alignment.

Choose columns for two or three short alternatives that benefit from side-by-side reading. Use tabs when each option needs its full reading width. For a larger set, use `choose` when readers need to compare any pair; it selects two alternatives and does not change the page’s layout or column count. Content length and available width decide which form reads well, so two or three is a starting point rather than a maximum. Use `selected` only for the initial visible pair; that pair is not an owner decision.

Load the matching `comparisons.md` through `demistify.md` before writing comparison markup. That published guide owns the comparison API. Keep the picture slider for two same-size images.

## Collect a reader's answer

Explain and compare when the reader needs to understand. Add a native choice when the task asks the reader to answer a question. Keep a recommendation, an already supplied owner decision, the comparison's visible pair and the reader's current answer distinct. A response does not rewrite the source's decision state. An explanation-only HTML page still follows this workflow; it simply has no response controls.

Name what the reader is answering and whether answers are exclusive or independent. Use the matching guide's native single or multiple choice rather than a page-specific form. A choice needs no Comments surface unless feedback or a combined review handoff is requested; feedback alone needs no choice. The binding pass retrieves the guide's response/feedback reference, which owns syntax, required identities, current response values and local-saving boundaries.

Give each option a compact title and a quieter Markdown explanation. Keep full diagrams, long evidence and tables in optional supporting details. Prefer the native sidebar when the reader should keep the question in view while inspecting extras. Use a selectable table when short corresponding topics benefit from aligned rows; use inline detail when expanding beneath one option is useful, accepting that later options move down. A choice without extra material needs no Details action.

Use a comparison before the choice when full corresponding topics matter. Keep their source content in its owning view and link to it; the answer control need not repeat the complete comparison. Keep selection separate from opening details, following a link, selecting text or commenting. Preserve the normal reader navigation and shared controls instead of adding an application header, another detail viewer or a separate answer-copy strip.

## Present a decision without implying acceptance

For a consequential design choice, draw the current model first, then show the concrete options, what each improves, what it costs, who bears that cost, and one recommendation. Keep each decision distinct. When the owner-decision brief draws every option as a change to the current picture, give each option a "picture" topic row in the comparison, holding a figure or a small flow, so the pictures line up across options. IF an unresolved product or architecture choice needs the owner, load `../../../shared-references/owner-decision-brief.md` and return one brief with the current model, options and costs, recommendation, and effect of deferring.

Use an `ex-card` for one option, so that its subject icon, cost and chosen badge stay together. Use an `ex-callout` for a summary, proposal, decision, risk, open question or unverified outcome that the reader must not miss. Choose the icon for the subject, such as `database` for a storage option or `test-tube` for verification evidence; the concise title and documented tone carry status. Use only icon and tone values listed in the matching published guide. Make a proposal’s status explicit in concise text such as **Proposed**; a tone or decorative symbol alone does not say that the owner accepted it. Do not add attributes that the guide does not document, and leave ordinary explanatory prose in normal document flow.

Keep recommendation, preview and accepted choice separate. A comparison’s initial `selected` pair only controls what the reader sees. Use the card’s `pick` only when the supplied owner decision identifies that option as chosen; if the decision remains open, mark none as chosen and say **Not decided** in the summary. A recommendation is not owner acceptance.

Treat supplied source and runtime evidence as different states. Mark an unexecuted observation explicitly, such as **Not executed** or **Unverified**. Source excerpts and source-derived paths do not establish that the behavior ran.

Completion: the reader can tell which topics correspond, what is merely proposed or recommended, whether the owner has selected an option, what response is requested and which claims remain unverified. Requested answer controls work without conflating selection with inspection or feedback; ordinary explanation remains in document flow.
