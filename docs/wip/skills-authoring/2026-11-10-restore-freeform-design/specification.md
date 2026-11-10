# Obligations

1. Restore the pre-#205 spec-design, program-design, verification-design and spec-program-review trees, including their skill-specific references, into v1 and the corresponding renamed v2 homes; apply only current plugin dependency and namespace repairs before v2-specific changes.
2. Preserve engineering guidance on authority, domain entities and identity, invariants, observable contracts, ownership, interfaces, state machines, failure/concurrency, traceability and meaningful proof.
3. Preserve four separately identifiable documents and one authoritative home per fact.
4. V2 authors HTML through presentation-html; its design text lives in readable HTML sections at stable IDs, without separate Markdown source documents or mandatory need/rule/check viewer packaging.
5. V2 uses normal documented Demistify components where they answer a reader question; presentation-html owns component selection and the released guide owns syntax.
6. Prose gives the answer; diagrams expose relationships; tables compare corresponding facts; trees show hierarchy; call stacks explain actual call paths; optional evidence may fold while conditions, failure obligations and risks stay visible.
7. Remove unconditional browser-record, marked-body-part and prepared-collection requirements from free-form document authoring; apply a component's documented data/preparation requirements only when that component is selected, including the retained call stack.
8. Preserve planned-versus-observed distinctions, normative identifiers, requirement-to-design/proof relationships, and meaningful content checks without tying them to the removed viewer schema.
9. Reconcile active base presentation/shared-reference callers and the four v2 phases so no loaded default silently reintroduces the specialized viewers.
10. Preserve unrelated v1 behavior and v2 management work; restore the necessary v1 design-caller artifact expectations to the old Markdown contract under the owner-approved scope extension, without changing roles or topology.
11. Teach choices, open questions and discussion feedback with small worked examples: explain the actual uncertainty and affected boundary, compare material alternatives, distinguish recommendation from an owner decision, use native choices only when an answer is needed, and use ordinary discussion prose plus Comments for feedback.
12. Deliver independent v1 and v2 PRs from the same base; v1 contains no v2 changes and includes only its necessary maintained-base renderer compatibility correction, so it can proceed first.

Transfer: the composition judgment applies both to a Rust service's state/ownership design and a Swift UI's user journey. It rejects a decorative hierarchy for a temporal race, and also rejects hiding a rollback condition behind an optional disclosure. Demistify/HTML is the owner's adopted medium, not a universal requirement for other toolkits.
