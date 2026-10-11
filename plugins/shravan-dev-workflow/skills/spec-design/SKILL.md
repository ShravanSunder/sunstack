---
name: spec-design
description: "Use when writing or revising the Requirements or Specification for a change: turning what the owner asked for into requirement lines they can read and confirm, or into checkable rules that building, testing and verification depend on. Not for wording-only cleanup of settled documents (docs-maintain), drawing out meaning the owner has not decided yet (discuss-pathfinding), or how the system is built (program-design)."
---

# Spec Design

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

Two documents, two readers. Requirements are *the owner's words*: the owner reads and confirms them, and every line shows *where it came from*. The Specification turns each confirmed line into *checkable* rules for whoever builds, tests, or verifies. An idea that did not come from the owner is a proposal until the owner adopts it.

MUST load `../../shared-references/design-documents.md` and return the document boundaries the two documents must respect.

The Lead loads this skill and writes both documents itself, with the owner. Helpers may bring evidence; they never write a requirement, a rule, or a view.

## Workflow

1. **Restate.** Say back what the owner asked for in your own words, including what is out of scope, and ask for a reply. Done when: the owner's reply confirms or corrects the restatement. When revising an already-confirmed Requirements document, its confirmation stands in.

2. **Write the Requirements card.** MUST load `references/requirements-card.md` and return the card. Done when: every line is in plain words and names a source the owner can check; every agent idea sits under Proposed; every undecided choice sits under Open; and the owner has confirmed the card in a reply of its own.

3. **Write the Specification.** MUST load `references/writing-rules.md` and return the rules, entities, and references. Done when: every rule names the confirmed line it serves; every confirmed line has a rule or a stated reason why not; every noun a rule uses is defined; and a tester could write a pass/fail check for each rule without asking.

4. **Hand on.** Return a `PhaseReturn` of kind `phase-complete` with both document pointers, every open item, and its `designReview` value, naming no next skill. Done when: the return carries both pointers, every open item, and `designReview`.

   ```ts
   // import type { PhaseReturn } from '../../schemas/design-returns.ts'
   ```

## Branches

- IF the owner's meaning for a line is not written anywhere and only the owner can give it, return a `PhaseReturn` of kind `requirements-gap`. The caller resolves it (`discuss-pathfinding`) and re-enters at step 2 with the confirmed record.
- IF a choice only the owner can make blocks a line or a rule, return kind `owner-decision` with the options and a recommendation, as an owner brief.
- IF evidence a rule depends on is missing or inaccessible, return kind `evidence-gap` with what would let the work continue.
- IF the request asks for Requirements only, stop after step 2. Return `phase-complete` with the Requirements pointer and its `scope`: what was done, what remains (the Specification), and when to come back. Write no Specification and make no claim that structure can start.
- IF revising existing documents, load `references/revising.md` and return the correction's class (Requirements, Specification, or Program Design) and the confirmed lines it keeps, checked against the complete confirmed set.
- IF a requirement changes a screen someone sees, or the change has two or more outside consumers, load `references/views.md` and return the picture or view and its check result.
- IF this call added, removed, or changed Specification rules, set `designReview: owed`. Inside a design cycle, the cycle's review step discharges it; outside one, `design-review` runs before planning or delivery uses the rules.

## Rules

- A document an agent wrote supplies proposals, not requirements, even an earlier spec or design. It becomes a requirement line only when the owner adopts that line. The rationalization to name: "it's in the existing design, so it's authoritative."
- Detailed rules a tester could check (counts, order, fields, timing) belong in the Specification. The confirmed need or constraint they come from stays a Requirements line with its identity, and its detailed rules sit beneath it in the Specification. Never move a confirmed line out of Requirements.
- Requirements and Specification are separate documents with separate homes.
- The Specification names no component, store, package, schema, or call path; that is `program-design`'s work.

**Completion boundary.** Done when the owner has confirmed the card, every rule traces to a confirmed line, and every noun is defined. A stop returns the matching `PhaseReturn` kind with exactly what it needs.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return as a checkpoint through `practices-show-me-your-work`.
