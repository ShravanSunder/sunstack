# Design Documents

A design has up to five documents. Each has one job, one writer, named readers, and its own home.

| Document | Its job | Written by | Read by | Made with |
| --- | --- | --- | --- | --- |
| Requirements | What the owner wants, in their words: one line per need, each showing where it came from. Agent ideas sit apart until the owner adopts them. | Lead, with the owner | the owner; every later document | `spec-design` |
| Specification | What must be observably true: checkable rules over defined entities, each traced to a requirement, naming the reference whenever one defines correct. | Lead | Program, Test, and Verification Design; Reviewer | `spec-design` |
| Program Design | How it is built: parts, owners, interfaces, state, failure handling, and the seam and observation point for each rule. | Lead | Implementer; Test and Verification Design; Reviewer | `program-design` |
| Test Design | The Implementer's regression tests: for each scenario, its layer, what is real and what is replaced, and an assertion that goes red when the behavior is wrong. | Lead | Implementer; Reviewer | `test-design` |
| Verification Design | How each requirement is proven independently on the real thing: the declared reference, the core outcome first, observation points, what passes, and what stays unverified. | Lead | Verifier; the Lead when it decides; Reviewer; the owner, through one "proven by" line per requirement | `verification-design` |

## How Every Document Ties Back to the Owner

```text
U  Requirements line (the owner's)
└── R  Specification rule, written over E entities
    ├── Program Design trace row ── its seam and observation point
    ├── T  Test Design scenario  ── the Implementer's regression test
    └── V  Verification Design check ── the Verifier's proof
```

- **Down:** every `U` has at least one `R` or a stated reason. Every `R` has a Program Design row, at least one `T` or "not regression-tested: <why>", and is covered by a `V`. Every `U`'s core outcome has a `V` on the real surface.
- **Up:** every `R`, Program Design element, `T`, and `V` names the line above it. Anything with nothing above it was invented: it is removed, or brought to the owner as a proposal.

Nothing downstream silently changes the meaning owned above it. A downstream skill that finds missing or conflicting meaning returns it: `requirements-gap` for owner meaning, `specification-gap` for a rule or noun, `seam-request` for a seam or observation point.

## The Specification Owns the Nouns

Rules are sentences about entities. The Specification defines each entity a rule uses (a stable `E` identifier, its identity rule, relationships, invariants, and states) without naming any type, schema, table, package, or wire shape. Program Design binds each `E` to an owner, a home, and a shape, and never redefines it.

## Keep the Documents Separate

Each document has its own resolvable home: five different pointers for file-backed work. Reuse an existing confirmed Requirements document instead of copying it into a new one. For chat-only work, each document is a separately labeled record with its own content; quick work changes the medium, not the boundary.

Valid:

```text
Requirements        -> docs/specs/2026-10-11-job-submission/requirements.md
Specification       -> docs/specs/2026-10-11-job-submission/specification.md
Program Design      -> docs/specs/2026-10-11-job-submission/program-design.md
Test Design         -> docs/specs/2026-10-11-job-submission/test-design.md
Verification Design -> docs/specs/2026-10-11-job-submission/verification-design.md
```

Invalid:

```text
Requirements/spec -> one combined document
Requirements      -> one document that also holds the checkable rules
```

A Requirements title does not make a separate Specification exist.

Where a new document goes, in order: the artifact home the caller supplies (`orchestrator-design` supplies `<project-root>/docs/specs/`); otherwise the repository's documented spec location; otherwise `docs/specs/<yyyy-mm-dd-name>/`. An existing authoritative document stays where it is. Scratch for substantial work (source notes, alternatives, prototype views) goes in the repository's ignored scratch convention or `tmp/design-workflows/<date>-<slug>/`; scratch never holds meaning and never becomes required reading.

## Pathfinding Clarifies Missing Meaning

`discuss-pathfinding` draws out owner meaning that blocks a Requirements line, a Specification rule, or a Program Design choice. It returns the clarified meaning to the skill that owns that document and does not write the document. For structure, it may clarify an owner-controlled tolerance such as acceptable cost, risk, compatibility, or policy; it does not invent components, interfaces, or mechanisms.

## Handing Documents On

A handoff carries pointers (or separately labeled chat records) and the identifiers, never copies. Design skills return typed results: `PhaseReturn` from each phase, `DesignReviewResult` from `design-review`, and `CycleReturn` from `orchestrator-design`.

```ts
// import type { PhaseReturn, DesignReviewResult, CycleReturn } from '../schemas/design-returns.ts'
```
