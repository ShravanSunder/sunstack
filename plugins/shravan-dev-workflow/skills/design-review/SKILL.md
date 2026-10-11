---
name: design-review
description: "Use when independently reviewing a design before planning or delivery uses it: Requirements, Specification, Program Design, Test Design or Verification Design, alone or together, including whether each requirement is carried all the way down and whether anything below was invented. Not for implemented code (implementation-review) or skill specs (skill-review)."
---

# Design Review

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

A review is *fresh eyes on the ties*. A Reviewer with no authoring history rebuilds what the owner wants from the Requirements, follows each requirement down to its rules, its structure, its tests, and its proof, and follows each downstream piece back up. A break in either direction is a finding. So is anything with nothing above it: it was *invented*.

The 🔎 Reviewer runs this skill. The Lead commissions it through `manage-agents` and resumes the same Reviewer to verify corrections. The Reviewer reads and reports: it never edits, plans, or accepts.

## Workflow

1. **Admit.** Name the review targets (the documents in front of you, from one to all five), the governing sources each target needs, the owner's confirmations that apply to them (the Requirements card when Requirements are a target, the structure when Program Design is), and the question. For a chat-only design, the commission carries each labeled record verbatim. Each target needs the documents above it: the Specification needs the Requirements; Program Design, Test Design, and Verification Design each need the Requirements and the Specification; and Test and Verification Design also need Program Design's seams. Done when: targets, governing sources, confirmations, and question are named; any unavailable source is named as a gap; and the Reviewer has no authoring history for them and runs on a different model lineage from the Lead.

2. **Read everything whole.** Done when: every available target, every governing source named at admission, and the owner sources the Requirements cite have been read in full. Unavailable sources stay named gaps.

3. **Check each document on its own.** MUST load `references/document-checks.md` and return each document's check status (`checked`, `partial`, or `blocked`, with what was not checked) and its findings. Done when: each document has `checked`, `partial`, or `blocked` with what was not checked, every section of it is covered or excluded with a reason, and its findings are listed.

4. **Walk the ties both ways.** MUST load `references/ties.md` and return the tie table. Done when: every Requirements line and Specification rule shows its downstream items among the targets, or a gap; every downstream item shows the line above it or is listed as an orphan with its missing parent; and every tie that depends on an unavailable source is marked "unchecked: <source> unavailable", never counted as complete or as invented.

5. **Report, then verify corrections.** MUST load `references/findings.md` and return the findings with their routes and one `DesignReviewResult`. Done when: every finding names what is wrong, where, which requirement it affects, the smallest correction, and its route; the result is set; and after corrections, each finding is verified closed or still open under the convergence rule.

   ```ts
   // import type { DesignReviewResult } from '../../schemas/design-returns.ts'
   ```

One result per review, read by the caller:

| Result | When | Caller action |
|---|---|---|
| `ready` | every reviewed document is `checked`, every finding is closed, no candidate is unverified or contested, and no tie is a gap or unchecked | continue |
| `corrections-routed` | open findings, each routed to its owning skill | owners correct; the same Reviewer verifies |
| `evidence-gap` | a governing source, a confirmation, or a required check (an image, a preview) is unavailable, so a document is `partial` or `blocked`; or a candidate is `unverified` | the Lead supplies it, or stops with the exact gap |
| `owner-decision` | a finding needs meaning only the owner has, or a candidate is `contested` | the Lead brings an owner brief |
| `not-converging` | the convergence rule tripped | the Lead brings an owner brief on what keeps failing |

When several hold, the first match wins: `not-converging`, then `owner-decision`, then `evidence-gap`, then `corrections-routed`. `ready` needs every reviewed document `checked`, no open finding, no unverified or contested candidate, no gap or unchecked tie, no missing source or confirmation, and no owner decision. Every result carries the full list of findings, so none hides behind a higher-priority result.

Prefer one independent review-and-correction round, with each affected document corrected at most once in that round. Further rounds run only for a concrete, source-backed finding that remains or was introduced inside the accepted boundary, until the review is `ready` or `not-converging` (see `references/findings.md`).

## Branches

- IF a document claims proof from commands or test runs, load `references/proof-claims.md` and return claimed versus observed for each claim. Commands run only through a 🔧 Operator under an exact grant.
- IF a named risk remains after steps 3 and 4 (trust or security, failure or concurrency, platform feasibility, a current implementation hiding a decision, or a design set that is hard to navigate), load `references/focused-checks.md`, run one check per named risk, and return each check's result with its findings added to step 5.
- IF the set is too large to hold whole, load `references/chunking.md` after step 2 and return a chunk plan that keeps each requirement's chain inside one chunk or an overlap.

## Rules

- The Reviewer reads and reports. It never edits, plans, or accepts. If it has authoring history for a target, or shares the Lead's model lineage, it stops and tells the Lead before reviewing.
- Routes: Requirements and Specification to `spec-design`; structure to `program-design`; tests to `test-design`; proof to `verification-design`; missing owner meaning to the Lead, for an owner brief.
- A candidate finding that adds a mechanism with nothing above it is rejected as scope expansion. A mechanism already in the design with nothing above it is a finding, by default a deletion.
- A Requirements line whose source does not say it is a finding, however clean its trace below. The rationalization to name: "it traces, so it's fine."
- A review covers the meaning it read. After a change, the changed documents and everything tied below them are reviewed again; a wording-only edit keeps the existing coverage.

**Completion boundary.** Done when every document has a status, the tie table covers every line and rule both ways (or marks a tie unchecked with its missing source), every finding has a route, and the result is set. Only `ready` lets the caller continue.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return as a checkpoint through `practices-show-me-your-work`.
