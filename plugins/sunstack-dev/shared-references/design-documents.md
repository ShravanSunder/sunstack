# Design Documents

A design project has four authoritative documents. Each settles one question and owns one kind of truth:

| Document | Question it settles | Owns | Carries |
| --- | --- | --- | --- |
| Requirements | Whose need and outcome are authorized? | authorized needs, outcomes, priorities, and limits | stable `U` rows |
| Specification | What observable behavior, including failure, must hold, and against what reference? | entity meaning, observable obligations, and each obligation's thresholds, target constraints, and authoritative reference | `E`, `P`, `O`, `R`, `C`, and `V` identifiers |
| Program Design | Which owners, contracts and seams realize that behavior? | entity binding, components, interfaces, state, flows, failure, and observation seams | the entity binding table and one trace-table row per `R` |
| Verification Design | How will the requirements be shown to hold: against what reference, on which target, through which journey, and with which limits? | the proof strategy: evidence route, target, journey, passing condition, reused tests, and what stays unverified | one row per requirement, linked to its `R` and `V` |

The Lead authors all four, in that order. Verification Design comes after Program Design because it chooses among the seams Program Design exposes. It plans proof and never records an observation: a planned target property is not an observed one.

Nothing downstream may silently change the meaning owned upstream. A document returns what it finds upstream as a token:

- Specification finds unmade owner meaning: `requirements-gap`.
- Program Design or Verification Design finds a missing or changed observable obligation, threshold, or reference: `specification-gap`.
- Verification Design finds a seam that cannot decide a requirement: `program-design-gap`. The design is not ready until that seam is repaired.
- A consumer finds the proof strategy missing or stale: `verification-design-gap`.

Tokens and payloads are defined in `phase-return-tokens.md`.

## The Specification Owns the Nouns

Obligations are sentences about entities. The Specification defines each entity its obligations name — a stable `E` identifier, canonical term, identity rule (what makes two instances the same), relationships with cardinality, invariants, and observable states — without naming any type, schema, table, package, or wire shape. Requirements surfaces the owner's words; Program Design consumes the `E` identifiers as fixed input and owns their structural realization in its own workflow. A missing or wrong entity discovered downstream is returned as `specification-gap`, never patched in design. The identity chain is `U -> E -> P -> O -> R -> C -> V`.

## Keep The Identities Separate

For substantial file-backed work, each document has its own separately identifiable home:

```text
Requirements: one resolvable source or artifact pointer
Specification: one different resolvable artifact pointer
Program Design: one different resolvable artifact pointer
Verification Design: one different resolvable artifact pointer
```

Reuse one already-admitted Requirements identity. Do not copy its contents into a new Requirements artifact merely to satisfy the shape. The Requirements and Specification author owns source qualification, admission, and normalization when settled authoritative meaning has no qualifying Requirements home.

For chat-only work, documents may remain in chat, but each is a separately labeled record with its own content and role. Quick work changes the medium, not the semantic boundary.

The accepted requirements set is returned coverage state. It is not another document, a ledger, or an alias for the Requirements identity.

Valid:

```text
Requirements -> docs/requirements/job-submission.md
Specification -> docs/specs/job-submission.md
Program Design -> docs/design/job-submission.md
Verification Design -> docs/design/job-submission-verification.md
```

```text
Requirements -> separately labeled in-chat Requirements record
Specification -> separately labeled in-chat Specification record
```

Invalid:

```text
Requirements/spec -> one combined document
Program Design -> separate document
```

```text
Requirements -> one document containing the observable contract
Program Design -> separate document
```

```text
Program Design -> docs/design/job-submission.md, whose trace table's proof column stands in for Verification Design
```

The second form is invalid because a Requirements title does not make a separate Specification identity exist. The third is invalid because a proof seam says where behavior can be observed, not how each requirement will be shown to hold.

## Requirements And Normative Requirements Are Different

The Requirements artifact records authorized needs, outcomes, priorities, and boundaries. A Specification contains normative requirements such as `MUST` statements that define observable obligations. Those obligations trace to the Requirements identity; their name does not turn the Specification into a combined `Requirements/spec` artifact.

## Pathfinding Clarifies Missing Meaning

Pathfinding helps the user and agent clarify unmade owner meaning that blocks a design document. It inspects evidence, explains the ambiguity, groups related questions, challenges assumptions, and uses a diagram when that materially improves shared understanding.

Pathfinding returns clarified meaning to the recorded return owner. It does not replace or merge that owner's artifact. For Program Design or Verification Design, it may clarify an owner-controlled tolerance or constraint such as acceptable cost, risk, compatibility, policy, or a limit that may stay unverified; it does not invent components, interfaces, mechanisms, architecture, or proof routes.

## Downstream Handoffs

Program Design consumes distinct Requirements and Specification identities plus their current phase state, including the Specification's `E` entity identifiers. Verification Design consumes those plus the current Program Design identity and its trace table's seams. Design review and design-bearing planning consume all four current identities; the Verifier's commission carries the Verification Design. A handoff carries pointers or separately labeled chat records and the entity identifiers, not copied companion artifacts.
