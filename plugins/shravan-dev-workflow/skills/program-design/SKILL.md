---
name: program-design
description: "Use when designing or revising how a change is built: its parts and owners, interfaces, state, failure handling, and the seams where each rule can be tested and observed, or when Verification Design asks for an observation point. Not for what must be true (spec-design) or which tests to write (test-design)."
---

# Program Design

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

Program Design is the map of how it is built. Every rule has *one owner* and a *seam* where it can be tested and watched. A reader can walk the *call path* from entry to effect, find where each truth lives, and follow a failure to the part that recovers it. Delete anything no rule needs.

MUST load `../../shared-references/design-documents.md` and return the document boundaries this design must respect.

The Lead loads this skill and writes the design itself, with the owner. Helpers may bring evidence; they never choose structure or write the design. When bounded evidence help is worth delegating (tracing today's call paths, answering one platform question), use `manage-agents` to commission a 🛠️ Worker, and open its anchors yourself before relying on them.

## Workflow

1. **Read the Specification as fixed input.** List the rules, entities, and references this design must realize. Done when: each is listed, and any missing or conflicting meaning has been returned as `specification-gap` instead of being patched here.

2. **Model today's system.** MUST load `references/current-system.md` and return the current paths. Done when: each affected behavior has a current entry-to-effect path anchored in source, or is marked new with no current path.

3. **Choose the structure.** MUST load `references/choosing-structure.md` and return the choice. Done when: the chosen structure, what it costs, who pays, and what would reopen it are stated in plain words, and every new part names the rule it serves.

4. **Define the parts.** MUST load `references/parts-and-contracts.md` and return the bindings, parts, interfaces, state, and flows. Done when: every entity has an owner, a home, and a shape at each boundary it crosses; every part has one job; and every write path has one owner.

5. **Place the seams and build the trace table.** MUST load `references/seams-and-trace.md` and return the table. Done when: every rule has one row naming its owner, its seam, its observation point, and what is real and what may be replaced, or a stated gap.

6. **Show the owner, then hand on.** MUST load `references/views.md` and return the component view and one entry-to-effect path, each with its check result. Show them with the trace table, ask the owner to confirm the structure, and end the turn. After the reply, return a `PhaseReturn` of kind `phase-complete` with the Program Design pointer, its open items (any seam gaps), and its `designReview` value, naming no next skill. Done when: the owner confirmed this structure or explicitly waived the check, and the return carries the pointer, the open items, and `designReview`.

   ```ts
   // import type { PhaseReturn } from '../../schemas/design-returns.ts'
   ```

## Branches

- IF more than one actor, process, request, or retry can interact, or partial failure is possible, load `references/failure-and-concurrency.md` and return detection, containment, and the recovery owner for each case.
- IF the Specification carries security, privacy, performance, accessibility, or operational obligations, load `references/cross-cutting.md` and return each obligation's owner and seam.
- IF `test-design` or `verification-design` returned a `seam-request`, re-enter at step 5 for that rule only. Return the new seam or observation point, or the reason it cannot exist as an open item on that rule.
- IF another picture would help the owner confirm ownership, calls, state, or failure, load `references/views.md` and return the view and its check result.
- IF the structure needs a tolerance only the owner can set (cost, risk, downtime, compatibility) and the Requirements do not settle it, return kind `owner-decision` with the options and a recommendation, as an owner brief.
- IF evidence the structure depends on is missing or inaccessible, return kind `evidence-gap` with what would let the work continue.
- IF this call changed structure, a seam, or an observation point, set `designReview: owed`. Inside a design cycle, the cycle's review step discharges it; outside one, `design-review` runs before planning or delivery uses the design.

## Rules

- Program Design does not invent meaning. A missing rule or noun is a `specification-gap`.
- It offers seams and observation points. It does not choose test layers (`test-design`) or how each rule is proven (`verification-design`).
- A mechanism no rule needs is deleted. The rationalization to name: "it will be useful later."
- A revision keeps every trace row. A row goes only when the Specification removes its rule.

**Completion boundary.** Done when every rule has a trace row with an owner and a seam, every entity is bound, and the owner has confirmed the current structure or explicitly waived that check (silence is not a waiver). An unmade owner tolerance returns `owner-decision` instead.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return as a checkpoint through `practices-show-me-your-work`.
