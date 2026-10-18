# Present engineering design documents

Use this recipe to present an existing engineering design set. The page makes the sources easier for a person to read; it does not become another source of design truth or change what the design phases mean.

MUST load `../../../shared-references/design-documents.md` and return the four canonical document questions and owners, the actual source homes, and the reader task that should lead through them. Keep each document’s distinct meaning and current state; do not combine Requirements with Specification or present a planned Verification Design as an observed result.

For a design-set page, apply step 1’s human-entry route and the already-required result from `../../../shared-references/diagram-rendering-and-fallbacks.md`. Keep normative facts in their owning Markdown documents. Present those sources once, then use the page for navigation, a selected reading slice and views that make relationships easier to inspect. The agent entry remains the set’s `index.md`; the page is its human entry. A page view may project a source fact but must remain traceable to that source and must not introduce a new obligation, owner, threshold or decision.

Use an `index.md` reading path as the input for a Walkthrough over existing source islands when a reader should move from need through behavior, ownership and proof. Keep the page’s opening slice focused on one reader task and name important failure cases even when their details are collapsed. Use matching-topic comparisons for alternatives, and expandable traces for ordered evidence when those forms help the reader follow the source. Load the corresponding guide references through `demistify.md`; these presentation choices do not replace the Markdown source.

When explaining a Program Design call path, label it as source-derived and keep calls, branches and unknown runtime edges distinct. When explaining Verification Design, describe the planned target and observation separately from any result actually observed. Do not turn an authored page, source excerpt or verifier plan into runtime proof.

Completion: the four source homes and their meanings are intact, the page’s reading path leads to those sources, and each view is traceable to its owning source without duplicated or newly invented design facts.
