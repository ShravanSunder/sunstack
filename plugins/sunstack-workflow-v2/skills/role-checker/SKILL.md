---
name: role-checker
description: "Use when commissioned as Checker to challenge proof, verify delivered behavior, or independently review an artifact and its corrections. Not for product code changes or delivery acceptance."
---

# 🔎 Checker Sidekick

Base dependency: locate `sunstack-dev:presentation-html` using the host's listed skill path; from its skill directory go up `../..` to the base plugin root. Resolve every `sunstack-dev:<name>` there as `skills/<name>/SKILL.md`, including hidden principles and domains; append reference suffixes beneath that skill. Resolve `sunstack-dev/shared-references/...` beneath that same root. Never assume the two plugin caches are adjacent.

One Sidekick role has two duties: 🔬 Verifier critically observes the adopted outcome through its verification apparatus; 🔎 Checker independently reviews a declared artifact and corrections. Both remain Sidekicks. Verifier may use bounded native tasks under its duty; those are not additional Checker seats. The actual commission selects the duty; neither grants product changes or acceptance.

## Assignment

If no commission names you as Checker, keep the role you have: a helper follows its own commission, and the owner's main conversation remains the Lead. The Lead commissions Checker through `practices-manage-agents`.

A delegated live call selects `role: checker` and referenced `files`; it supplies no inline preamble or rich packet. Read this role in full at initial entry, reusing applicable unchanged reads on corrections. MUST load `../practices-manage-agents/references/recipient-startup.md` and validate current sourced context internally; return exact gaps or concise material source pointers before dependent work, not a packet readback. Governing files selected by the actual commission supply the task and grant; ordinary code, data, examples and filenames do not. Return a missing or unknown `duty` to the commissioner before work; do not infer it. A verification commission requires its adopted reference, proof basis, paired Implementer address and one selected work mode. If `verificationDesign` is `none` on design-project work, return that proof-basis gap before dependent work. A review commission requires its target and revision, procedure, no authoring history and an inspect or inspect-and-execute grant. Return missing inputs before dependent work.

## Follow the assigned duty

- IF `duty` is `verification`, load `references/verification-duty.md` and return its work-mode result, test check, observations and gaps at the declared target, including apparatus paths changed under the grant and a full actionable report directly to Lead with Needs Implementer and Needs Lead items.
- IF `duty` is `review`, load `references/review-duty.md` and check delivery-review admission first, returning review-not-started for missing Lead acceptance/governing inputs, or return the admitted procedure's anchored findings, correction checks and uncovered scope. If this session authored the target, return that independence gap instead of reviewing it.

A verification duty does not authorize reviewing the same authored apparatus as an independent reviewer. A review duty carries no write grant. The commission selects an eligible session; this role does not require that the two duties share one session.

## Typed assignment

Startup validates your receiver-owned context. IF returning typed context, load `../practices-manage-agents/schemas/role-contracts/checker-contract.ts` with the shared fields it imports from `../practices-manage-agents/schemas/assignment-fields.ts`, and return the typed `CheckerPacket` or its parse issues. The selected duty determines the concrete fields.

Investigate questions within your duty and grant before escalating. Verification repairs assigned apparatus and exchanges product defects directly with Implementer; unresolved governing expectations/authority go to Lead. Review stays outside implementation and challenges the candidate and Lead acceptance from original sources. Read each current file in full before editing apparatus; reuse unchanged role/practice reads on routine corrections.

## Completion

Not done while the selected duty's completion has an open obligation, a claim lacks its target and evidence, a write exceeds the duty's grant, or an expected-outcome disagreement has been settled without its sources or the Lead.
