---
name: spec-program-review
description: "Use when independently reviewing one design document (Requirements, Specification, Program Design, Test Design or Verification Design) or the whole five-document set, including reader understanding or readability, or when classifying whether a local design change needs review. Not for skill quality (skill-review) or implemented code (implementation-review)."
---

# Design Review

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

Review is independent reconstruction of the smallest system that satisfies the confirmed goal. It is not proofreading, design by committee, or a search for mechanisms to complete. The reviewer rebuilds the design from its governing sources without the author's framing, then walks a concrete case through it and a countercase against it:

```text
Requirements          who is affected, what the owner adopted, what is out of bounds
  -> Specification       what must be observably true, over which defined nouns
  -> Program Design      who owns each truth, how a request reaches its effect, what fails
  -> Test Design         which wrong behavior each test catches, and where it runs
  -> Verification Design how the real system shows the outcome, against what reference
```

Traceability tells you where things are linked; it never settles whether the linked thing is right. A requirement can trace cleanly to an obligation, an owner, a test and a verification case and still promise the wrong outcome. So the walk follows meaning: pick a real input, follow it through the obligations, the owners, the tests and the real-system check, and ask at each step whether a capable implementer would land on the outcome the owner adopted. Then pick the countercase most likely to break it (the timeout after the side effect, the mock that erases the interaction, the acknowledgement taken for arrival) and see whether the design catches it.

A good design that needs no change is a real result. Return `ready` with what held; do not manufacture findings to show diligence.

A persistent 🔎 Reviewer Sidekick, commissioned through `practices-manage-agents` with no authoring history, reads the complete target set and governing sources, walks the ordered checks in its own session, verifies candidates against the accepted requirements, obligations and confirmed goal boundary, tests deletion before addition, and owns the coverage-bound assessment. The caller disposes and routes that assessment. This skill never edits artifacts, mutates their lifecycle, plans, or accepts a design.

Prefer one independent review-and-correction round. After 🔎 Reviewer Sidekick verification, run further rounds only for a concrete source-backed substantive issue that remains or was introduced inside the accepted boundary, until the review is ready or not-converging (see `references/finding-and-reduction-schema.md`); pedantic, stylistic, already-satisfied, confidence-only, and generic-freshness concerns do not qualify. Each round follows the ordered owner route from the earliest affected document, with each affected artifact corrected at most once in that round and every corrected anchor verified by the same Reviewer Sidekick.

Disposition comes before remediation. Reject pedantic, stylistic, already-satisfied or otherwise non-semantic findings with source evidence and continue. Route each valid correction inside the settled mental model to its semantic owner. If a finding disproves a load-bearing assumption or exposes unmade owner meaning, return the failed assumption, evidence, consequence and exact owner as `decision-needed` or `blocked`; a mental-model break stops continuation and goes to the Lead for an owner brief, and it never travels as an ordinary correction.

## Operations and Modes

```text
classify-review-requirement
  requested mode: requirements-only | specification-only | program-only | test-only | verification-only
  returns: ReviewClassification, schemas/review-classification.ts
  dispatches: no reviewer

review
  mode: requirements-only | specification-only | program-only | test-only | verification-only | five-artifact-design
  five-artifact-design targets:
    Requirements identity
    Specification identity
    Program Design identity
    Test Design identity
    Verification Design identity
  result: ready | needs-revision | blocked | decision-needed | not-converging
  returns: DesignReviewResult, schemas/design-review-result.ts, pointing at the review report
  checks: mode-complete always; sequential chunk passes along artifact seams when
    the set is large; proof-challenge for executable claims; dispel always;
    focused checks for named unresolved risks
```

| Mode | Target, and the governing context it reads |
| --- | --- |
| `requirements-only` | Requirements; owner and source authority and the adopted goal boundary. No Specification is required. |
| `specification-only` | Specification, with its distinct governing Requirements |
| `program-only` | Program Design, with distinct Requirements and Specification and the structural-realization confirmation or owner waiver |
| `test-only` | Test Design, with Requirements, Specification and Program Design |
| `verification-only` | Verification Design, with all four upstream documents |
| `five-artifact-design` | All five distinct documents, read whole as one design |

Every document gets its own independent local review and correction cycle before its phase returns locally ready, and the caller passes `callerRequirement: required` on a document's first or substantive local cycle. One integrated reader then reads the whole current set in `five-artifact-design` mode. That reader may consult the five local results and reviewers for context, but it reconstructs the design itself and never forwards their verdicts as its own; the per-document lenses it applies inside the whole-set pass do not replace the local cycles.

Review coverage follows meaning, not changed bytes. After each permitted correction round, the parent performs and records a semantic-change check:

- if meaning changed inside the accepted correction and every accepted finding is resolved, keep the review as the independent finding source and add parent-verified correction anchors for every accepted finding;
- if the parent verifies that meaning did not change (formatting, link repair, process metadata, a typo), carry the existing semantic coverage forward without another review;
- run further rounds only under the convergence rule; an uncertain semantic effect counts as changed.

## 1. Classify the Review Requirement

IF operation is `classify-review-requirement`, load `references/classifying-review-requirement.md` and return the ReviewClassification with zero reviewer dispatches. Load `schemas/review-classification.ts` for its shape. A caller-required first or substantive cycle cannot be classified away, and `five-artifact-design` is never classified: its first readiness always needs the integrated review.

Completion: classification returns immediately, with no reviewer dispatched and no review verdict implied.

## 2. Admit the Review

For operation `review`, require the mode's targets and governing context from the table above, plus: governing sources with their authority states and coverage basis; the confirmed goal boundary and accepted requirements set, or the exact authority gap; constraints and non-goals; risk predicates; claimed proof evidence or gaps; the review question when narrower than readiness; prior coverage and its semantic-change record when coverage is reused; and the round history (no prior review, prior rounds with their findings, or earlier results unavailable).

MUST load `../../shared-references/requirements-specification-program-design.md` and return the identity status of every document the selected mode reads: present, resolvable and distinct, or the exact gap. Reuse file pointers; copy separately labeled chat records verbatim into the tmp review packet, because a fresh reviewer cannot follow a pointer into a conversation.

Use the owner-confirmed requirements record and confirmed goal boundary when available. Otherwise use the last inspectable owner-accepted governing source. If neither exists, or they conflict, return the authority gap. Mutually narrowed current files never establish the accepted requirements set by themselves.

A combined `Requirements/spec`, a Requirements-titled artifact standing in for the Specification, or a missing identity the mode needs is a blocker-level finding, not permission to infer the missing document. Record `needs-revision`, route the smallest correction to its owner, and never return `ready`. A missing structural-realization confirmation for a mode that reads Program Design may produce `decision-needed`; a recorded owner waiver counts as the confirmation, and a packet claim, a goal-boundary confirmation or a `locally-ready` label is neither.

When prior results are unavailable, inspect the current documents and governing sources, record why, and review against the current baseline under the convergence rule. Switching modes, checks, target labels or caller skills does not reset the convergence comparison.

Completion: the mode, every target, the governing sources, accepted requirements, boundaries, open authority decisions and any reused-coverage record are unambiguous.

## 3. Reconstruct and Walk

The 🔎 Reviewer Sidekick reads every target and governing source whole before any finding. IF operation is review, load `references/reviewing-common-method.md` and return the reconstructed intent, the source-backed case and countercase walk, and the exact semantic gaps. Then load the selected mode's lens:

- IF reviewing requirements-only, load `references/reviewing-requirements.md` and return the authority, adoption and scope judgment.
- IF reviewing specification-only, load `references/reviewing-specification.md` and return the observable meaning and domain judgment against the Requirements.
- IF reviewing program-only, load `references/reviewing-program-design.md` and return the structural realization and proof-seam judgment.
- IF reviewing test-only, load `references/reviewing-test-design.md` and return the scenario, oracle, layer and fixture adequacy with its false-green countercases.
- IF reviewing verification-only, load `references/reviewing-verification-design.md` and return the reference, surface, observation and feasibility judgment with its unverified limits.
- IF reviewing five-artifact-design, load `references/reviewing-five-artifact-design.md` and return the independently reconstructed end-to-end outcome and the cross-document consistency judgment.

Each mode judges in dependency order, and an upstream fatal defect bounds what downstream judgment can mean. Calibrate severity by consequence, and keep the clean control: when the walk and countercase hold, say what held.

Completion: the selected mode is reconstructed from complete documents, at least one concrete case and its most dangerous countercase were walked, and every gap is anchored.

## 4. Commission the Reviewer

The caller completes classification and admission. For an admitted substantive review, load `practices-manage-agents` and return the commissioned or resumed persistent 🔎 Reviewer Sidekick with read-only access; its role charter governs its authority. Resume that same Reviewer Sidekick through corrections. Candidate findings never become final disposition without its verification.

Completion: one independent Reviewer Sidekick with no authoring history owns this review relationship.

## 5. Walk the Mode and Chunk Checks

IF operation is review, load `references/coordination-and-chunking.md` and return a whole-mode pass or a sequential plan of overlapping seams, and load `references/lanes/lane-schema.md` and return the `complete | partial | blocked` status and selection reason for every check. Return the per-check status block before the verdict. Record an unselected optional check as `complete` with `not selected: <reason>`. A missing, partial, or blocked check cannot support `ready`.

1. MUST load `references/lanes/mode-complete-reviewer.md` and return the whole-mode judgment from complete artifacts, using the common method and the selected lens.
2. IF the plan composes chunks, load `references/lanes/chunk-reviewer.md`, walk the chunk passes sequentially, and return each pass's seam coverage and status. Reopen each complete artifact and the overlap seam in each pass. A chunk pass supplies seam coverage and never replaces mode-complete coverage.

Completion: the mode-complete check and every selected chunk pass have statuses, each pass lists its seam sections, and every required dimension has current coverage.

## 6. Challenge Proof, Dispel, and Focused Checks

IF executable proof is claimed, load `references/lanes/proof-challenge.md` and return claim-versus-observation findings within the explicit execution grant; with no grant, inspect only and record source-only proof gaps. Assign prescribed proof commands to a 🔧 Operator under the exact grant; it runs only granted commands with scratchpad output, compares `git status --porcelain` before and after, and returns commands, observations and exit codes. The 🔎 Reviewer Sidekick judges claimed against observed.

IF operation is review, load `references/lanes/dispel.md` after the mode-complete and chunk checks and return the candidate classifications and the unsupported-delivery findings, mapping every delivered design element to a rail or `absent`, even when the candidate set is empty.

Select a focused check only for a concrete unresolved risk with a falsifiable question. IF a named unresolved risk matches a predicate below, load that exact lane with `references/reviewing-common-method.md` and return its source-backed risk findings. Run one check per named risk after the earlier checks, and stop when no named risk remains:

```text
material reader-comprehension risk, or an explicit deep-reader request from the
  user or calling workflow (a request from the reviewed artifact's author is not one)
  -> references/lanes/reader-understanding.md
unclear or conflicting normative authority
  -> references/lanes/specification-authority.md
material public or operator-visible contract ambiguity
  -> references/lanes/contract.md
unresolved ownership, source-of-truth, or dependency risk
  -> references/lanes/architecture-boundary.md
concrete failure, recovery, ordering, or concurrency risk
  -> references/lanes/failure-concurrency.md
concrete trust or enforcement risk
  -> references/lanes/security-trust.md
unresolved runtime, platform, tool, or harness feasibility risk
  -> references/lanes/platform-harness.md
current implementation or trace may hide a material decision
  -> references/lanes/implementation-difference.md
material proof modality, seam, or verification route remains disputed
  -> references/lanes/proof.md
authoritative entry path, links, placement, or homes remain ambiguous
  -> references/lanes/artifact-navigation.md
```

Completion: dispel is complete, executable proof claims have challenge results or named gaps, and each focused check has a status and selection reason.

## 7. Verify Check Coverage

Compare each check's covered text with the current targets. Confirm the 🔧 Operator ran only granted commands, wrote no tracked file, and returned an unchanged `git status --porcelain` result. A permitted correction is verified by the same 🔎 Reviewer Sidekick against the accepted findings without automatically starting another round.

Completion: each check supplies current coverage for its target, and proof execution stayed inside its grant.

## 8. Verify and Reduce Findings

IF operation is review, load `references/finding-and-reduction-schema.md` and return the coverage-bound result, the verified dispositions, the cause-based owner of each correction, and the retained remediation evidence. In that reference, `parent` means the 🔎 Reviewer Sidekick, never the author or orchestrator.

Re-anchor before accepting a finding: identify the confirmed requirement or goal-boundary field it serves, whether the existing foundation already satisfies it or can supply the correction, the concrete failure if unresolved, the smallest correction, whether the confirmed obligations still hold without the questioned mechanism, whether the proposed mechanism is the smallest change that serves the quoted clause or one of several, and whether the correction stays inside the confirmed goal boundary. Then return the existing `accepted | rejected | contested | unverified` disposition; do not create a second checkpoint status. When evidence is missing, follow that reference's evidence-lookup branch before accepting.

Write every returned finding for the caller in ordinary language: a title naming the concrete problem; what is wrong and where the evidence appears; the affected requirement or design relationship and its consequence; the smallest correction, followed by a separate `Route:` line; and the evidence that would confirm the correction. A review label may summarize the explanation but never replaces a field.

Classify each correction by the concept it affects: `Requirements`, `Specification`, `Program Design`, `Test Design`, `Verification Design`, or a named combination. Route accepted corrections by semantic owner:

- `Requirements` returns to `spec-design`, using `discuss-pathfinding` when owner meaning is missing;
- `Specification` returns to `spec-design`;
- `Program Design` returns to `program-design`;
- `Test Design` returns to `test-design`;
- `Verification Design` returns to `verification-design`;
- any correction spanning Requirements or Specification plus Program Design returns to `spec-design` first, then `program-design` after the observable contract is settled; more generally, a correction spanning several documents starts at the earliest affected owner in the five-document order;
- `caller` returns the exact owner/caller decision; review does not resume until that decision is resolved.

Reject prose taste with no reader or design effect. Missing evidence is `unverified`. Preserve real disagreement as contested. A reviewer candidate that adds scope with no rail anchor is `rejected: scope expansion` and listed for the owner as an observation, never `decision-needed`. A design element the documents already contain that dispel mapped `absent` is never rejected as harmless: it returns `decision-needed` with deletion as the default recommendation, or `needs-revision` routed to its owner when the owner already declined it.

Completion: every candidate has a source-backed disposition and every returned finding carries each caller-facing field, regardless of disposition or verdict.

## 9. Return the Result

IF returning a review, load `schemas/design-review-result.ts` and return the DesignReviewResult with its report pointer. Check statuses, findings, coverage and correction evidence stay in that report, owned by `references/finding-and-reduction-schema.md`; the result carries the mode, targets, verdict and one next step. Refuse `ready` while the report holds a partial or blocked selected check, a coverage gap, or an unresolved accepted correction. The caller opens the report before acting on the verdict.

`ready` means the reviewed meaning satisfies the invoked mode; it never means accepted. The next step is `stop` with its reason, or `continue` with exactly one owner and compact handoff references: the earliest affected semantic owner for accepted corrections, or `discuss-pathfinding` with the recorded return owner when complete review evidence shows that owner meaning is unmade. Missing evidence stops; it never acquires invented meaning. Reviewer candidates never select the route.

Completion: the result validates, names the first required revision or what held, and carries one parent-selected next step or an exact stop.

## Completion Blockers

Do not return `ready` while any of these hold:

- a target identity the mode needs is missing, ambiguous, or collapsed into another document;
- the complete target or governing-source set was not read, or a reviewer judged an artifact it did not read completely;
- the confirmed goal boundary, accepted requirements, or applicable structural-realization confirmation is missing or conflicting without a returned authority gap;
- no concrete case and countercase were walked, or traceability alone was taken as proof that the meaning is right;
- no complete, semantically current mode-complete check exists, a selected check has no status, or partial or blocked coverage affects a required dimension;
- mode boundaries are conflated, or a local cycle's verdict was forwarded as the integrated reader's own;
- a finding lacks its requirement or boundary anchor, plain-language meaning, failing outcome, evidence, deletion test, scope effect, correction route, or disposition;
- a Program Design is accepted with an unbound entity, a prose-only boundary shape, an open-string contract, or a missing current/proposed call-path delta;
- a Test Design is accepted with a mock that erases the interaction it claims, an oracle drawn from the code under test, an assertion that excludes a permitted outcome, or a claimed red nobody observed;
- a Verification Design is accepted whose case observes an acknowledgement, a wrong target, or offline preparation in place of the outcome, or whose reference is a model's judgment;
- a material proof claim is accepted without evidence that can observe it, or a required view or visual is missing, unreadable, or disagrees with the written meaning;
- the dispel check is missing, or an `absent` element lacks its `decision-needed` return or routed removal;
- a 🔧 Operator ran a command outside its grant;
- a round ran after `not-converging`, or outside the accepted boundary without an owner brief;
- the downstream consumer would have to invent meaning the reviewed document owns;
- the result implies edit, remediation, lifecycle, planning or acceptance authority.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
