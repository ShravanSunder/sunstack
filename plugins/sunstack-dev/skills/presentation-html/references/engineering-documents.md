# Present engineering design documents

Use this recipe to present an existing engineering design set. The page makes the sources easier for a person to read. It does not become another source of design truth, and it does not change what the design phases mean.

MUST load `../../../shared-references/design-documents.md` and return the four canonical document questions and their owners, the actual source homes, and the reader task that should lead through them. Keep each document's distinct meaning and current state. Do not combine Requirements with Specification, and do not present a planned Verification Design as an observed result.

## Compose the set

Keep the complete Markdown of each source chunk in its own island; a single-file document uses one island. Do not concatenate chunks into a page-owned replacement.

When a design view is named, load `views.md` and take its page form from there. The table below gives each document's reader question and its usual views; the owning skills supply each view's fields.

| Existing document question | Usual views on the page | Keep clear |
| --- | --- | --- |
| Requirements: whose need and desired experience are authorized? | The capability map as a tree. A captioned storyboard or a supplied UX image beside the need, or a Gallery Journey when the reader should follow several pictured moments. If an image is needed and none is supplied, use step 1's existing generated-image route. | A generated illustration explains the desired experience. It does not show a current UI or an execution result. Keep the need and its limits in Requirements. |
| Specification: what observable behavior, states, failures and contract relationships must hold? | The source Markdown with its entity map, state view or context diagram. | Keep normative behavior in Specification. A view shows the contract; it does not assign implementation owners or call paths. |
| Program Design: which owners, boundaries and seams realize the behavior? | A board or flow for ownership and boundaries. A component tree. A source-derived call path, with current and proposed paths compared on matching topics. | Label calls, branches and unknown runtime edges distinctly. A source-derived call path does not show a runtime stack. |
| Verification Design: how will each requirement be shown to hold? | "Proven by" cards for the owner and coverage rows for review, from the existing mapping of each requirement to its reference, target, journey, evidence, passing condition and limit. | Label evidence as Planned, Observed or Unknown, according to the source. A planned target or observation is not an observed result. Keep the existing mapping, and add no page-only proof schema. |

Follow step 1's human-entry route and the result already required from `../../../shared-references/diagram-rendering-and-fallbacks.md`. The set's `index.md` remains the agent entry. Its document entries and reading paths decide which source chunks each island and Walkthrough uses. Present each source once. The page adds navigation, one reader-focused opening slice, and views that make relationships easier to inspect. Keep every Mermaid source in its owning Markdown chunk, and keep each view traceable to that chunk. The page adds no normative prose, obligation, owner, threshold, decision, phase rule or status field.

## Open with the answer and one slice

The first screen tells the reader where each part of the answer lives. For each part of the question, write one framing line that states no rule and links to the document or heading that answers it. Then open on the slice that matters most, through a link to the owning chunk's diagram or a Walkthrough stop on that chunk's heading. Do not restate a requirement, obligation, threshold or decision in the page's own words, even in a card. Never show a second copy of a diagram or an island smaller than a chunk. Keep the important failure cases named even when their details are collapsed. Good: "What we are building: the runner's capabilities and their rows, in Requirements →". Bad: a card that rewrites the install channels or the severity words the Specification owns.

## Lenses over the islands

Two lenses help a person move through the set. Neither adds a fact.

- **Reading paths.** Each through-line or task path already in `index.md` becomes a Walkthrough over the islands, in the same order. A stop carries at most one line of narration that frames it and states no rule. Good: "Routing, end to end" stopping at the need, the contract, the call path and the proof. Bad: narration that restates a threshold a chunk owns.
- **Concept sections.** Give an idea its own section when obligations in two or more capabilities name it, or when the owner names it: authorization, identity, retries. Open with a link to its meaning in its owning entry, and link to its picture: the view its owning skill already requires, such as the trust-boundary view for authorization or the entity map for identity. If that view does not exist yet, return the missing picture to the caller as a gap; show it to readers only when the design itself records it. Then list links grouped by document: the needs, the rules, who enforces them, and how they are proven. When the set's Markdown already carries a section for the idea, render that section and build none of your own. Good: a reader learns what authorization is and where each part of it lives. Bad: an "auth" column of ticks, which says where the idea appears but never what it is.

Open each document section with at most one framing line that states no rule and links into its island. Beyond the opening slice, whole islands sit one action away: give each document its own tab (or disclosure), and never stack whole documents in one scroll. A tab keeps the document's short name, and its framing line names the failure cases inside; a disclosure's title names them. Folding inside an island follows its source Markdown.

## When the set is incomplete

- **No `index.md`.** Build the page with one island per document, in the canonical four-document order. Add no Walkthrough and no reading path, and return the missing `index.md` to the caller as a gap. The canonical order originates no fact.
- **Extra documents** beyond the four, such as an alternatives study. Give each its own island outside the four questions, and do not fold it into one of them.

Load the matching component references through `demistify.md`. The public guide owns all markup and visual tokens.

Completion: the four source homes and their meanings are intact. Each view answers its document's reader question and is traceable to its owning source. Every reading path and concept section links into the islands without restating them, and no view duplicates or invents design facts or turns planned evidence into an observation.
