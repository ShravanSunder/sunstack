# The Five Design Documents

A substantial adopted design unit has five documents. Each owns one responsibility, and each answers a question the one before it cannot:

```text
Requirements          WHY, for whom, and within what boundary?
                      Authorized needs, adopted outcomes, priorities, and limits.
                    |
                    v
Specification         WHAT must be observably true?
                      Domain entities and observable obligations traced to Requirements.
                    |
                    v
Program Design        HOW will the internal system satisfy it?
                      Owners, interfaces, states, failure handling, and proof seams.
                    |
                    v
Test Design           WHICH wrong behavior must the tests catch, and where?
                      Scenarios, independent oracles, layers, and what must stay real.
                    |
                    v
Verification Design   HOW will the real system show it works?
                      Declared reference, real surface, outcome observation, and limits.
```

Nothing downstream may silently change the meaning owned upstream. A downstream phase that finds missing or wrong upstream meaning returns a gap naming the document that owns it: `requirements-gap`, `specification-gap`, `program-design-gap`, `test-design-gap`, or `verification-design-gap`. Tokens and payloads are defined in `phase-return-tokens.md`; the typed gap is `DesignGapSchema` in `schemas/design-gap.ts`.

Test Design plans the regression strategy; it does not prove delivery, and a planned test is not an observed run. Verification Design plans proof against a declared reference on the real system; planned verification is not an observation either. The executor's actual runs and the paired Verifier's delivered observations prove delivery later.

## The Specification Owns the Nouns

Obligations are sentences about entities. The Specification defines each entity its obligations name (a stable `E` identifier, canonical term, identity rule, relationships with cardinality, invariants, and observable states) without naming any type, schema, table, package, or wire shape. Requirements surfaces the owner's words; Program Design consumes the `E` identifiers as fixed input and owns their structural realization. A missing or wrong entity discovered downstream is returned as `specification-gap`, never patched in design. The identity chain is `U -> E -> P -> O -> R -> C -> V`.

## Keep the Identities Separate

For substantial file-backed work, all five documents have separately identifiable homes:

```text
Requirements:        one resolvable source or artifact pointer
Specification:       one different resolvable artifact pointer
Program Design:      one different resolvable artifact pointer
Test Design:         one different resolvable artifact pointer
Verification Design: one different resolvable artifact pointer
```

`FiveDocumentSetSchema` in `schemas/design-document-references.ts` carries the five pointers. It rejects a missing document, a document of the wrong kind in a slot, and two slots at the same location. It cannot see aliases or contents: the caller opens the documents and checks that five different responsibilities live there.

Reuse one already-admitted Requirements identity. Do not copy its contents into a new Requirements artifact merely to satisfy the shape. The Requirements and Specification author owns source qualification, admission, and normalization when settled authoritative meaning has no qualifying Requirements home.

For chat-only work, each document may remain in chat as a separately labeled record with its own content and role. Quick work changes the medium and keeps the semantic boundary.

The accepted requirements set is returned coverage state. It is not another artifact, a ledger, or an alias for the Requirements identity.

Valid:

```text
Requirements        -> docs/specs/2026-10-13-job-submission/requirements.md
Specification       -> docs/specs/2026-10-13-job-submission/specification.md
Program Design      -> docs/specs/2026-10-13-job-submission/program-design.md
Test Design         -> docs/specs/2026-10-13-job-submission/test-design.md
Verification Design -> docs/specs/2026-10-13-job-submission/verification-design.md
```

Invalid:

```text
Requirements/spec -> one combined document
Program Design    -> separate document
```

```text
Requirements -> one document containing the observable contract
```

```text
Program Design -> one document whose last section is "Tests"
```

The second form is invalid because a Requirements title does not make a separate Specification identity exist. The third is invalid because a test section inside Program Design is not a Test Design: its scenarios, oracles and layers have no home of their own and no local review.

## Requirements and Normative Requirements Are Different

The Requirements artifact records authorized needs, outcomes, priorities, and boundaries. A Specification contains normative requirements such as `MUST` statements that define observable obligations. Those obligations trace to the Requirements identity; their name does not turn the Specification into a combined `Requirements/spec` artifact.

## Pathfinding Clarifies Missing Meaning

Pathfinding helps the user and agent clarify unmade owner meaning that blocks any of the five documents. It inspects evidence, explains the ambiguity, groups related questions, challenges assumptions, and uses a diagram when that materially improves shared understanding.

Pathfinding returns clarified meaning to the recorded return owner. It does not replace or merge that owner's artifact. For structural, test, or verification work, it may clarify an owner-controlled tolerance or constraint such as acceptable cost, risk, compatibility, or policy; it does not invent components, interfaces, mechanisms, or test cases.

## Downstream Handoffs

Each phase consumes the current identities of the documents above it, as pointers or separately labeled chat records, never as copied companion artifacts:

```text
Program Design       Requirements, Specification, and the Specification's E identifiers
Test Design          Requirements, Specification, Program Design
Verification Design  Requirements, Specification, Program Design, Test Design
five-artifact review all five current documents
```

Each document gets its own independent local review before its phase returns locally ready; one integrated review then reads the whole current set.
