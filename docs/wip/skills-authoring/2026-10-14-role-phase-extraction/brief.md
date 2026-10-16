# Role and phase extraction: analysis brief

Status: saved scope, not an implementation spec. Owner-directed 2026-10-14. This is project 2; project 1 starts from #127 and has its own [spec](../2026-10-14-practices-principles/spec.md) and [project scopes](../2026-10-14-practices-principles/projects.md).

## Intended result

Find general teaching and reusable methods currently embedded in roles or L2 phases. Propose the right home and consumer changes, so roles and phases compose useful methods and judgment without re-teaching them in parallel. Keep local responsibility, authority, approved outcomes, fitting proof and short applied examples visible.

## Questions and evidence

1. What result does each role/phase own, and which decisions are unique to it?
2. Which repeated passages teach the same general rule, versus applying one rule to different results?
3. Does the right principle or practice already exist? If so, what precise call/application replaces duplicate teaching?
4. Is a stable subject-specific concept better taught by a caller-read `domain-*` leaf? What example, limits and source maintenance does it need?
5. Does an evaluation method belong under `audit-*` alongside practices? Analyze the security rename and retain its official scan routing and scope.
6. Which ordered recurring preparation/execution/interpretation method is missing? Investigate experimentation; do not infer a missing practice from a common word.
7. Does the proposed decomposition let an agent solve a new realistic case with less reconstruction, without losing local obligations?

Inspect each caller and receiving home. Evidence of existing teaching is not evidence it is applied well. Future proof needs a plausible failure, a materially different valid case, and observations from the selected loaded copy. Existing role schemas remain progressive typed support, not universal recipient reads.

## Initial candidates to reassess

Testing general judgment versus Test Design/Reviewer/Verifier applications; source evidence versus adopted authority; evidence applicability after changed targets; discriminating observations in Program Design/Debug; question-to-slice presentation; necessity/subtraction in review; security knowledge versus audit procedure. Several principles are strengthened by project 1, so do not copy or overwrite that teaching in project 2.

Verification Design from closed #128 deserves special scrutiny: its real-system method and role boundaries, useful engineering teaching, smallest fitting proof, and any procedural or schema machinery that has no consumer benefit. It does not exist on #127 and is not automatically restored. The closed branch is reference, not authority.

## Proposed deliverable

A readable extraction table: teaching, current source, proposed owner, condition/use, callers, retained local responsibility, gain/cost, failure and valid control. Mark keep/reuse/strengthen/extract/rename/skip separately. Update the explainer with proposals once their source claims are checked; do not turn candidates into installed graph nodes or report them implemented.

## Boundaries

Sunstack-dev only; orchestrators and skill-authoring runtime are excluded. Analyze active #127-based phases and roles, then selected #128 reference material where it helps test an idea. No runtime changes, security scans, global/cache writes, schema additions, role expansion, product repairs or wholesale phase migration are authorized by this brief. No Markdown schemas. New domain/audit names and their invocation policy remain proposals until designed and admitted.

## 2026-10-14 admitted named design: standalone role skills

The owner now explicitly selected role skills with normal model invocation and management-owned model/setup mapping. [Role-promotion spec](../2026-10-14-role-skills/spec.md) owns this particular design and its eight runs. It supersedes the reference-only recommendation, not the remaining analysis boundaries above. No role runtime move, schema literal change or live discovery claim is authorized by this brief itself; the named spec goes through its own review and implementation/proof path.

## 2026-10-15 owner follow-up: explanation method and `diagram-semantics.md` (separate PR)

Raised during the #131/#132 implementation review. These changes are deferred to their own follow-up PR, and #131/#132 do not change them.

1. Reference the principle. `shared-references/diagram-semantics.md` "From the question to the view" restates `principle-write-for-the-reader`, which both presentation skills already read before choosing a view. Keep its three worked examples ("what changed?" → before/after table; "who owns retries?" → topology; "what happens after approval is refused?" → flow), point to the principle for the rest, and delete the restated judgment.
2. Design skills load it. The owner expects the design-doc skills (`spec-design`, `program-design`) to load `diagram-semantics.md` for visual-family selection and staged disclosure. Today they choose views through their own predicates and render through `diagram-rendering-and-fallbacks.md`. Decide each one's call site and its observable predicate.
3. Possible skill. If design skills, handoffs, PR descriptions and `docs-maintain` all need the same "pick the view, reveal in stages" method, consider promoting it to one surface-independent explanation skill (working name `presentation-explain`), with `presentation-tui`/`presentation-webui` reduced to surface manuals. This needs `skill-audit` classification and a skill spec first.
