# Make the work understandable without another owner prompt

Revision: 1. Basis: user-directed intent, 13 November 2026.

The owner asks that a work account show the assumptions the work relies on, the decisions agents made without asking, and components used properly; the skills must teach agents to do this themselves.

This is an update of two existing skills in two runs, rather than a new component or another component catalogue.

| Run | Reusable behavior | Classification |
| --- | --- | --- |
| R1: presentation-show-worklog | When an owner requests a work-log page, explain the material choices and relied-on assumptions from the inspected record alongside progress and evidence. | Behavior-changing: evidence reconciliation, main-path obligations and its completion check change. |
| R2: presentation-html | When composing an account with several kinds of information, choose complementary documented views and preserve what each fact actually establishes. | Scoped: teaching in the existing patterns reference only; trigger, call sites, branch conditions, schema, ownership and check selection stay unchanged. |

## What success looks like

- U1: The owner can see what the agent decided, why, its cost and its authority, including consequential design choices, without first requesting a separate decision register.
- U2: The owner can see each material belief the work relies on, its dependent work, evidence and remaining uncertainty, with later settlements and withdrawals reflected accurately.
- U3: A fresh author can select and compose supported components from the skills and the matching API guide without a bespoke component-by-component rescue prompt.
- U4: A work account makes progress, actual verification and remaining work distinguishable, without treating markup validation as proof of understanding.

## Evidence and its limits

On 13 November the owner identified missing decisions and assumptions in a real storage-redesign account and a second remediation progress page. The local source inspection found consequential agent choices outside the original seven-call summary; a second account linked out to larger decision and assumption registers instead of explaining them in its main account. Later source updates changed which items were still open.

A coached Sol rewrite preserved the source and passed the matching HTML checker after corrections. It also needed Lead corrections for misleading progress composition, omitted governance information and invalid heading nesting. This establishes problems and repairs in named examples; it does not establish a failure caused by the current skills, or that changed skills will improve a fresh author's behavior. The original full authoring context is unavailable for a faithful incident reproduction. No RED-to-GREEN claim is planned from those examples.

Current source already teaches a component chooser, meaningful sections, selected evidence, native small parts and guide reads. The proposed change supplies the missing application example and explicit governance coverage, rather than repeating that catalogue. One current reconciliation sentence restricts an agent's own call to non-core changes; R1 separates who chose from what authority covered the choice so core agent-made decisions remain visible.

## Entry and boundaries

R1 is reached through the existing explicit-page request path; ordinary progress replies still create no HTML. R2 keeps its existing HTML invocation and the patterns reference's existing loading conditions. Neither trigger changes.

The original project pages and logs remain intact. Runtime components, retired viewers, call-stack embedding, design-document authoring, the frozen v1 workflow, release/deployment and installed caches are outside this change. Related PR #222 addresses design-document authority, not work-log presentation; this change neither duplicates its item schema nor depends on it.

The current commission produces this design and its review. No skill implementation, publication or merge is claimed by its completion.
