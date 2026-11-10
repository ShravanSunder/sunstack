# Manage agents v2 — edited working draft

Draft behavior for discussion, not an installed skill. The owner's latest correction governs: the Lead does not make implementation changes. The Implementer writes code; the Lead owns the design, plan, integration decisions and acceptance, and inspects the work itself.

## Three classifications

| Classification | Question it answers | Keep |
| --- | --- | --- |
| Work level and horizon | How much may the helper finish before handing back? | Project → milestone → task → subtask; name the result and the check that ends the assigned level. A task's passing check does not close the whole deliverable. |
| Direction | How much has already been decided? | Exact: prescribed procedure; Complete: approach settled, local details remain; Partial: a consequential approach/design choice remains with the Lead. Missing intent is missing input, not permission to invent it. |
| Span | Which contracts must remain consistent? | Local: one owner's code and contracts; cross-domain: multiple owners in one system; cross-system: another system consumes the changed contract. Agree shared meaning and permitted changes before assigning either side. |

Form and model are subsequent practical choices, not extra classifications.

## Roles and models

| Responsibility | Owns | Model boundary |
| --- | --- | --- |
| Lead | Owner conversation, governing design and plan, commissions, integration judgment, inspecting evidence and accepting delivery. | Owner-selected model; does not edit implementation code or take over a repair to make the checks pass. |
| Implementer | Assigned code, product tests, integration edits, fixes and their evidence. | Sol or Opus, preserving the assigned model and effort; Luna excluded. |
| Checker: Verifier | Prebuild proof-feasibility challenge, checking test adequacy, independent observation of required behavior and remaining gaps. | Sol or Opus; Luna excluded. Does not fix product code. |
| Checker: Reviewer | Independent examination of original owner intent, design, code and evidence; anchored defects and verdict. | Sol or Opus; Luna excluded. Fresh author-independent context. |
| Operator | Prescribed steps, watches or collection under supplied criteria; observations and exceptions. | Luna only in this role; no code repair, design judgment or acceptance. |

Verifier and Reviewer are explicit Checker duties, not a vague observer stage or one agent checking its own repairs. Proposed session default: a continuing Verifier for the delivery and a separate Reviewer at a meaningful review boundary, reused through its corrections. Exact session policy and Router authority mapping still require settlement; no reviewer-of-reviewers or Terra delegator is added by default.
For model diversity, use a different lineage where the available budget and governing review requirements permit or require it; record unavailable required coverage rather than pretending another OpenAI model is another lineage. Do not wake Claude while the owner's token restriction remains in force.

## Assign, inspect and correct

1. **Cut the work.** Classify the result, its ending check, remaining choices and shared contract. Assign connected implementation to one Implementer; parallelize only genuinely separable work. The Lead keeps understanding and reads code, while the Implementer makes the changes.
2. **Choose an authorized form.** A bounded helper fits one parent-managed job when the host supports its required model and lifecycle; a separate session fits independent review, persistent follow-up or a model unavailable natively. If neither supported form meets the job, name the capability gap and hold only that assignment. Current owner transport rules still apply.
3. **Give a short handoff.** State the goal in the owner's words; boundary and authority; must-not-break conditions; ending check; sources and evidence to return. Include source revision/target and the exact communication identity where the task needs them. Check relevant access/capability prerequisites once and reuse them while unchanged; isolate or order overlapping writes.
4. **Check the result.** Implementer runs its product checks; Verifier establishes the required behavior on the declared target, reusing adequate real-path evidence rather than repeating it for ceremony; Reviewer challenges the candidate independently. Both checking duties return evidence and gaps directly to the Lead, with findings accessible to the Implementer for correction.
5. **Accept or return corrections.** The Lead opens the decisive diff, run output and checking findings before relying on the handback. The Implementer fixes code, the affected checker verifies its correction, and the Lead inspects the resulting evidence. A helper's completed turn, delivery receipt or passing component test cannot close a broader outcome.

## Changes and unknowns

| Discovery | Required response |
| --- | --- |
| Local detail inside the agreed contract | Implementer decides, checks and continues. |
| Unknown existing behavior | Gather bounded evidence; Operator may collect under supplied criteria, while the responsible judgment role interprets it. |
| Shared contract or governing design needs revision | Lead inspects the evidence and revises the affected design/plan; pause only implementation consuming that unsettled choice. |
| Proposed repair changes owner outcomes, scope, ownership or accepted risk | Lead brings the concrete decision to the owner before dependent changes. |
| Product or test defect against agreed behavior | Implementer repairs it; recheck the affected evidence without weakening the obligation. |
| Required behavior cannot be observed with the proposed proof | Verifier returns the exact proof/design gap; Lead resolves its owning design, rather than counting the unrun or inadequate check as success. |
| Delivery or execution outcome is uncertain | Inspect existing operation and effects before replay or replacement. |

Keep each unresolved finding attached to its dependent outcome; continue independent authorized work. A meaningful change reopens only the evidence that depends on it, including an integration check when the changed interaction matters.
The Lead cannot silently relabel a Verifier HOLD as passed. Hard enforcement and owner override are separate delivery-policy decisions; this prose does not implement them.

## What is removed from v1

The seven-role catalog becomes the four-role structure above, with explicit Verifier and Reviewer duties under Checker. There is no default Advisor/Researcher seat, nested reviewer hierarchy or delegation manager.
Replace the large tier matrix and per-role TypeScript packets with the small model boundary and short handoff; remove mandatory paired-session startup, repeated full preflight, automatic fan-out and helper-by-helper trace audits.
Retain inspection, write isolation, reuse of suitable sessions, reconciliation of uncertain work and honest evidence limits. Acceptance belongs to the Lead; implementation and correction stay with the Implementer. No cost or reliability improvement is claimed before it is observed.
