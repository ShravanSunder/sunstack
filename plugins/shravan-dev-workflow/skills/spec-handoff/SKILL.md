---
name: spec-handoff
description: Use when packaging spec, design, architecture, or product-decision context for another agent, CLI, machine, or future session before an implementation plan exists.
---

# Spec Handoff

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

Package spec/design context so another agent can continue without reconstructing the conversation. This is a portability boundary, not a completion boundary: handoff means the context is transferable, not that the spec is approved or the next phase is complete.

## Core Rules

- Use this only before an implementation plan exists.
- Package decisions, non-goals, open questions, source evidence, contracts, tradeoffs, security context, and proof expectations.
- Always name proof expectations in the handoff response: validation strategy, proof assumptions, explicit planning deferral, or open proof gaps.
- Preserve uncertainty. Do not hide open questions to make the packet feel done.
- Do not create an implementation plan here. Recommend exactly `plan-implementation` only when the packet carries a `ready` `DesignReviewResult` from `design-review` covering the current meaning of all five design documents, or a `ready-for-planning` `CycleReturn`. Otherwise the packet carries the exact gap, the current Lead stays the author, nothing routes to planning, and the gap names its next owner: missing Why/What -> `spec-design`; missing structural How -> `program-design`; missing Test Design -> `test-design`; missing Verification Design -> `verification-design`; all five present but unreviewed, or reviewed before their current meaning -> `design-review`. When several are missing, the earliest in that order comes first, since each later document is built on the ones before it.

  ```ts
  // import type { DesignReviewResult, CycleReturn } from '../../schemas/design-returns.ts'
  ```
- Do not review the design documents here. Use `design-review`.
- Do not package code, branch, diff, commits, or test state. Use `implementation-handoff` when implementation state exists.
- Always write a file artifact and also print the copy-paste prompt in the response unless the user explicitly asks for chat-only output.
- Preserve governing authorship by default. A receiving researcher, Implementer, Verifier, Reviewer, or future assistant receives only its assigned scope and returns design gaps to the current Lead. Design authorship transfers only when the packet names the successor-Lead recipient, the transferred design-document scope, and the explicit user direction authorizing that transfer. A role label, handoff request, current-Lead assertion, or assistant continuation is insufficient.

## Workflow

1. Resolve the source context:
   - spec/design/architecture artifact
   - chat decision
   - current repo evidence
2. If a source file exists, count lines and read the whole file in chunks before summarizing.
3. Inspect only the code/docs needed to make claims grounded.
4. Record `authoring transfer: none | user-designated successor Lead`. For a transfer, include the named recipient, transferred design scope, and exact user-direction evidence; otherwise preserve the current Lead as design owner.
5. Create a repo-local artifact under:
   - `<repo-root>/tmp/spec-workflows/<yyyy-mm-dd>-<repo>-<branch>-<spec-slug>/`
6. Write:
   - `spec-handoff.md`
   - `copy-paste-prompt.md`
7. Report:
   - artifact paths
   - source coverage
   - decisions and non-goals
   - open questions
   - proof expectations or proof gaps
   - recommended next skill: `spec-design` for missing Why/What, `program-design` for missing How, `test-design` for missing Test Design, `verification-design` for missing Verification Design, `design-review` for five documents that are unreviewed or reviewed before their current meaning, `plan-implementation` for a current `ready` review of all five, or `docs-maintain` for artifact lifecycle work
   - full clickable artifact links (absolute path + line) for handoff artifacts the human is expected to open

## Packet Contents

- Goal and audience
- Decisions already made
- Non-goals and rejected options
- Contracts, interfaces, data flow, and ownership boundaries
- Tradeoffs and who pays their cost
- Security context or reason it is not security-sensitive
- Proof expectations: validation strategy, proof assumptions, explicit planning deferrals, or open proof gaps
- Planning-admission evidence: the five design document paths, the current review result (its `result`, the `reviewed` documents with their status, and its `ties`) or a pointer to it, evidence that it covers all five documents' current meaning, or the exact missing or stale prerequisite
- Source evidence inspected
- Open questions and why they matter
- Exact next task for the receiving agent
- Authoring-transfer classification and, only when present, named successor recipient, transferred design scope, and explicit user-direction evidence

## Common Mistakes

- Treating handoff as spec approval or phase completion.
- Routing a handoff to planning without a `ready` review covering all five current design documents.
- Turning design context into an implementation plan inside the handoff.
- Hiding open questions.
- Asking the next agent to infer source files from chat history.
- Packaging branch/diff/test state that belongs in `implementation-handoff`.
- Inferring design-author authority from portability, a role label, or an implementation/review assignment.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
