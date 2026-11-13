# Two focused changes, using existing components

Revision: 1, correction 1 (material-cost coverage). Owner plugin: sunstack-dev. Both source runs are implemented; proof and review limits remain below.

The skills keep a single division of responsibility: the work-log skill selects and explains recorded meaning, the HTML skill composes the views, and the bound Demistify guide owns component syntax. The logging skill continues to own recorded events and authority; no new event format or parallel log is introduced.

## R1: presentation-show-worklog

- Trigger: preserve the existing description and hidden invocation setting unchanged.
- Main path: make material decisions and assumptions an explicit part of evidence selection and of the final reader check, including agent-made core decisions; retain the existing four headings and page-request boundary.
- Depth: revise the existing `references/read-and-summarize.md` reconciliation sentence that excludes core agent choices, and extend its source-to-episode example with one agent choice and one unproved dependency.
- Completion: the page explains those material items once, or names the source gap; it preserves who chose, authority, actual settlements and proof limits.
- Proof: a fresh realistic page request exercises the whole account, including a later withdrawal and an unresolved assumption, without explicitly requesting a decision register.

Proposed main-path wording: “Explain the material decisions agents made and the assumptions the work relies on in the main account: the actual choice or belief, who made it, its reason and material cost or consequence, its authority or evidence gap, and the work that depends on it. Name missing rationale or cost evidence rather than inventing it. Keep later corrections and settlements current; incomplete source coverage is a named gap.”

Proposed reconciliation meaning: an agent-made decision remains agent-made whether core or routine; authority determines whether it was covered, and a departure retains its actual consequence. This changes attribution in the page, not the authority to proceed with work.

## R2: presentation-html

- Trigger and main path: unchanged; the existing substantial-explanation and multi-component routes already load `references/patterns.md`.
- Depth: add one compact worked account to that reference, showing the selection, arrangement and omission decisions rather than another catalogue.
- Completion: use the existing composition and static-check boundaries; the example supplies concrete good and bad signals for those checks.
- Proof: a fresh author chooses forms on a different account and withholds progress and sequence views where the source cannot support them.

The worked account asks “Can this staged import be handed over?” Its supplied facts include three of four stages locally verified, no release, an agent-chosen retry delay that was not measured, an unobserved real provider and a later withdrawal of a proposed deletion. This illustrative source requires a real-provider rehearsal before handover; its answer follows that condition, while another source's authorized partial handover would retain its own answer and the same proof limits. Explain that answer first, then compose:

| Reader's question | Selected form and its job | What stays in view |
| --- | --- | --- |
| Which stages are ready and what blocks handover? | One native table; a documented progress part only for the supplied three-of-four count. | Separate authored state, actual proof, next dependency and no-release limit. |
| What did the author decide or assume? | Short readable entries or a table of corresponding facts. | Actual choice or belief, reason, authority, dependency and uncertainty. |
| What changed for the consumer? | A keyed comparison only for corresponding supplied before/after topics. | Interpretation of the change and its cost. |
| What supports the conclusion? | Trace only for the supplied ordered finding/correction/check sequence. | Each claim's decisive excerpt, attribution and proof scope. |
| Where can I inspect the full receipt? | Native disclosure beside its claim. | The governing failure limit remains outside the disclosure. |

The example sends authors to the matching small-parts, comparison, Trace, content and code references for actual markup; it introduces no copied component API. It explicitly uses a native HTML table when cells contain live components, and a proper technical-source carrier when displaying literal markup. The current published guide already documents those carriers and wrappers.

## Calls and ownership

Existing `MUST load references/read-and-summarize.md` returns snapshot, scope, reconciled meaning and gaps to R1. Its existing record-entries load interprets event kinds and closure without writing. R1's existing `MUST load presentation-html` returns composition and the selected binding. R2's existing conditional patterns load returns the arrangement; its existing bound-guide loads return the actual constructs. No call site is added, moved or renamed. The existing retry episode remains a meaning-selection example; the new composition example serves the distinct view-selection job.

The governing skill-crafting topics are main path (visible obligations and completion), placement and calls (one owner per meaning), steering (positive slots for omissions), generalization (the specification's transfer tests), proof claims (fresh application and explicit limits), and descriptions (unchanged invocation). The proposed additions replace the non-core attribution restriction and do not add a prohibition list. Each new sentence must change selection, composition or checking under the deletion test.

## Decisions and coordination

| Default taken by the Lead | Why and cost |
| --- | --- |
| One delivery PR, two ordered skill runs. | One reader outcome crosses two existing teaching owners; each run stays attributable. |
| Use the owner's current success definition as the authoring basis. | The old full prompt/context is unavailable; the change can be tested without claiming an incident reproduction. |
| Keep the current components and chooser. | Source inspection found substantial API and selection teaching already; another renderer or catalogue has no demonstrated need. |
| Keep the original private pages unchanged. | Experiments can be reviewed without disturbing concurrent project authors. |
| Keep descriptions unchanged. | The defect concerns application and coverage, not demonstrated invocation failure. |

Base: `main` at `9dc59ac2fe0a5f771475ecdcdd67b2f2840585b5`. No pending skill edits in this worktree. PR #221 touches another HTML reference and PR #222 touches design-document authority; neither changes these target homes. Before implementation and shipping, recheck current main and these paths. At shipping, take the next patch version after the then-current sunstack-dev version, update all its supported client manifests and marketplace mirrors together, and add one dated changelog entry. The choice is a patch because this sharpens existing behavior without a new public capability. No cache refresh or merge is authorized by this design.

Sensitive surfaces: none added to shipped skills; no script, subprocess, credential, privileged action, cache write or new network procedure. The existing documented guide/checker workflow remains in force. Experiment and proof files stay local; public examples are explicitly illustrative and carry no private source records or machine paths.

Run status: R1 and R2 implemented and self-checked on 13 November 2026. Independent design review accepted revision 1, correction 1. Implementation review required three bounded corrections: preserve recorded own-call authority, supply the illustrative handover criterion, and describe the changed evidence return accurately. Those corrections are written at C4 with source-counterexample checks, which do not establish author following. Named earlier author artifacts establish selected application, with no measured semantic improvement, complete required-read compliance or rendered-readability claim. Shipping remains blocked by the proof limits in the verification part. Review history stays in the local review record under `tmp/`.

Coordination readback: implementation incorporates `e5516f5d7d19c98d70689037e409f3148190cef0` from #221, retaining its concern-based navigation wording, and preserves #222's separate design-document authority changes. The source remains in the accepted work-log teaching homes. Version metadata is `sunstack-dev` 3.3.2; caches remain unchanged. Named application evidence and its limits are recorded in the verification part; no merge or activation is authorized by this design.
