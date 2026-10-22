# Alternatives and decisions

Start from the reader’s question and the supplied options. Choose a view that exposes the comparison the reader needs; the page author sets its layout, while reader controls choose content.

## Compare the same topics

Use the guide’s comparison when readers need to compare alternatives against corresponding topics. Give each topic the same `data-compare-row` key across alternatives; the matching key aligns the rows, and an omitted topic is shown as **Not supplied**. If topics are not corresponding, keep each alternative in its own flow instead of implying alignment.

Choose columns for two or three short alternatives that benefit from side-by-side reading. Use tabs when each option needs its full reading width. For a larger set, use `choose` when readers need to compare any pair; it selects two alternatives and does not change the page’s layout or column count. Content length and available width decide which form reads well, so two or three is a starting point rather than a maximum. Use `selected` only for the initial visible pair; that pair is not an owner decision.

Load the matching `comparisons.md` through `demistify.md` before writing comparison markup. That published guide owns the comparison API. Keep the picture slider for two same-size images.

## Present a decision without implying acceptance

For a consequential design choice, draw the current model first, then show the concrete options, what each improves, what it costs, who bears that cost, and one recommendation. Keep each decision distinct. When the owner-decision brief draws every option as a change to the current picture, give each option a "picture" topic row in the comparison, holding a figure or a small flow, so the pictures line up across options. IF an unresolved product or architecture choice needs the owner, load `../../../shared-references/owner-decision-brief.md` and return one brief with the current model, options and costs, recommendation, and effect of deferring.

Use an `ex-card` for one option, so that its subject icon, cost and chosen badge stay together. Use an `ex-callout` for a summary, proposal, decision, risk, open question or unverified outcome that the reader must not miss. Choose the icon for the subject, such as `database` for a storage option or `test-tube` for verification evidence; the concise title and documented tone carry status. Use only icon and tone values listed in the matching published guide. Make a proposal’s status explicit in concise text such as **Proposed**; a tone or decorative symbol alone does not say that the owner accepted it. Do not add attributes that the guide does not document, and leave ordinary explanatory prose in normal document flow.

Keep recommendation, preview and accepted choice separate. A comparison’s initial `selected` pair only controls what the reader sees. Use the card’s `pick` only when the supplied owner decision identifies that option as chosen; if the decision remains open, mark none as chosen and say **Not decided** in the summary. A recommendation is not owner acceptance.

Treat supplied source and runtime evidence as different states. Mark an unexecuted observation explicitly, such as **Not executed** or **Unverified**. Source excerpts and source-derived paths do not establish that the behavior ran.

Completion: the reader can tell which topics correspond, what is merely proposed or recommended, whether the owner has selected an option, and which claims remain unverified.
