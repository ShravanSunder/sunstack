# Reviewing a Specification

This reference owns `specification-only` mode judgment.

MUST load `sunstack-dev/shared-references/design-documents.md` and return the need and rule records and the page's why and what sections before judging their meaning.

Review the needs and the rules separately:

- The needs answer why the work matters, for whom, and within which authorized boundary.
- The rules answer what must be observably true; each rule names the needs it serves.

Judge whether the Specification's What is authoritative, coherent, observable, testable, and sufficient to constrain Program Design without silently changing its governing Requirements.

Inspect:

- consumer/problem/outcome authority;
- current/desired observable gap;
- goals, non-goals, and negative space;
- source classification and conflicts;
- outcome-to-requirement coverage;
- requirement pass/fail observability;
- public/external contracts and failure/partial-success behavior;
- cross-cutting obligations;
- each material rule is one sentence whose cases name its expected behavior, threshold, target constraints, and reference; choosing the evidence, target, or journey belongs to Verification Design;
- hidden structural How or unresolved product meaning;
- each record placed on the page is explained beside it and never restated;
- each entity two readers could read differently is defined.

A `core` slice with no need or rule records is a blocker-level finding. Return `needs-revision` with the smallest correction routed to `design-specification`. Do not write or edit records during review. Other findings are bounded by the sources that actually exist, and the result cannot be `ready`.

Good: every rule names the needs it serves, every rule has observable behavior and cases a wrong build would fail, and Program Design can proceed without inventing meaning.

Bad: a rule's text copied onto the page, a rule that runs to several sentences instead of carrying its detail in cases, feature slogans, code behavior treated as desired authority, implementation tasks disguised as requirements, undefined failures, or self-check substituted for review.

Route need and rule corrections to `design-specification`, identifying which kind is affected; caller/input issues return to the caller.

Complete when: every material Specification dimension is judged or named as a coverage gap, and the strongest divergent-implementer risk is explicit.
