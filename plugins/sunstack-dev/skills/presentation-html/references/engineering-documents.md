# Present engineering design documents

Use this recipe to present an existing engineering design set. The page makes the sources easier for a person to read; it does not become another source of design truth or change what the design phases mean.

MUST load `../../../shared-references/design-documents.md` and return the four canonical document questions and owners, the actual source homes, and the reader task that should lead through them. Keep each document’s distinct meaning and current state; do not combine Requirements with Specification or present a planned Verification Design as an observed result.

## Match the view to the document question

Keep each document’s complete Markdown as its own island, whether it is one file or an ordered set of chunks. Use this mapping after reading the canonical meanings above:

| Existing document question | Useful view | Keep clear |
| --- | --- | --- |
| Requirements: whose need and desired experience are authorized? | A captioned storyboard or supplied UX image beside the need; use a Gallery Journey when the reader should follow several pictured moments. If an image is needed and none is supplied, use step 1’s existing generated-image route. | A generated illustration explains desired experience; it does not show a current UI or execution result. Keep the need and its limits in Requirements. |
| Specification: what observable behavior, states, failures and contract relationships must hold? | The source Markdown with a Mermaid diagram or other suitable relationship view for entities, state transitions, refusal outcomes and contract relationships. | Keep normative behavior in Specification. The view shows the contract; it does not assign implementation owners or call paths. |
| Program Design: which owners, boundaries and seams realize the behavior? | A board or flow for ownership and boundaries; a matching-topic comparison with rich Trace details for a source-derived before/after call path when useful. | Label calls, branches and unknown runtime edges distinctly. A source-derived call path does not show a runtime stack. |
| Verification Design: how will each requirement be shown to hold? | The existing mapping from each requirement to its reference, target, observation journey, evidence, passing condition and limit. Use a Tree when hierarchy, status and links are the reader’s task; use a Trace when ordered evidence steps need expandable attachments. | Label evidence as Planned, Observed or Unknown according to the source. A planned target or observation is not an observed result; keep the existing mapping and do not add a page-only proof schema. |

For a design-set page, apply step 1’s human-entry route and the already-required result from `../../../shared-references/diagram-rendering-and-fallbacks.md`. The set’s `index.md` remains the agent entry; its existing document entries and reading paths determine which source chunks each island and Walkthrough uses. Present each source once, then use the page for navigation, one reader-focused opening slice and views that make relationships easier to inspect. Keep every Mermaid source in its owning Markdown chunk and each view traceable to that chunk. The page adds no normative prose, obligation, owner, threshold, decision, phase rule or status field.

Use an existing `index.md` reading path as the input for a Walkthrough over source islands when a reader should move from need through behavior, ownership and proof. Keep the opening slice focused on that task and name important failure cases even when their details are collapsed. Load the matching component references through `demistify.md`; the public guide owns all markup and visual tokens.

Completion: the four source homes and their meanings are intact, each view answers its document’s reader question and is traceable to its owning source, and no view duplicates or invents design facts or turns planned evidence into an observation.
