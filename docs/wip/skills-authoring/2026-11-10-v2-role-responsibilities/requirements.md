# Responsibility and acceptance changes for workflow v2

Status: responsibility amendment for draft PR #209. The owner has requested implementation ("get the work done"); source writing follows the current design-review binding, without another owner confirmation. Merge, installation and activation remain out of scope.

## The change

Five update runs target `practices-manage-agents`, `role-lead`, `role-implementer`, `role-checker` and `role-operator` in `sunstack-workflow-v2`. This is behavior-changing: it changes planning responsibility, question routing, startup/reporting obligations and acceptance sequencing. Each run changes one named skill and its owned references.

Reusable behavior: agents resolve questions within their responsibility, collaborate directly on ordinary implementation and verification, and return design decisions and acceptance to an accountable Lead.

## Owner direction

The owner clarified on 2026-11-10: the Lead writes the plan, including workstreams and sequencing, rather than implementation steps; Implementers figure out the rest. The owner requested boundaries and examples for all agents, full reads before file edits, relevant practices and principles as before, Implementer/Verifier collaboration followed by the Lead's assessment and independent Checker review, and explicit Lead responsibility. The owner requested a plan, full independent skill review and actual Sunstack CLI rules, then directed getting the changes done. The chronological proposals below are superseded where the later explicit decisions say so.

Success means an ordinary implementation or driver defect is investigated and repaired by its responsible agent without a new Lead-directed microtask; a material design question reaches the Lead with evidence; the Lead inspects the integrated outcome before review and remains responsible after review. Reports preserve unresolved proof and holds without repeating every internal step.

The owner then challenged the bare “Lead inspects” diagram: when the Lead merely routes to a reviewer, it does not do its job well. Revision r2 proposes an inspectable pre-review assessment, authored by the Lead, and independent checking of its conclusions. The ordering and Lead responsibility come from the owner; the exact assessment procedure below is a proposal awaiting owner selection, not proven compliance or an external enforcement gate.

Latest clarification: this failure has happened before; “review is the last thing” and “review is after it is proven to work.” R4 therefore requires passing scoped proof and completed Lead acceptance before independent delivery review, rather than a weak handoff followed by a separate acceptance ceremony. The Lead remains responsible for dispositions and repairs; a clean review does not restart acceptance. This remains a proposed skill implementation of the clarified boundary, not a claim that agent compliance is proven.

R5 adds the owner's explicit delegation/naming direction: the Implementer may spin up and parallelize with as many subagents as it needs within its workstream, without per-child Lead approval. Use Sidekick for a separately managed persistent session and Subagent for a native child. Worker is only a search synonym, not a third execution form. Descriptions may mention sidekicks, subagents, workers/helpers and implementers; implementation remains a role. Parent Implementer owns integration/proof and one workstream handback, with its existing Verifier covering the workstream rather than one new pair per child.

R6 corrects the agent's mistaken interpretation of that direction: the Implementer, Verifier and Reviewer are always Sidekicks. Native subagents are the Implementer's helpers, not an alternate form of those named roles. The Implementer works independently and brings the Lead mental-model breaks and questions the sources/assignment do not settle. The Verifier talks directly to Implementer, critically checks its work and returns a full actionable verification report to Lead, using tasks/checklists with explicit owners and Needs Lead/Needs Implementer sections. The owner requests the HTML as the current shared picture and asks to compare early review versus review after Lead acceptance; the latter remains the recommendation under discussion.

R7 settles that timing: the owner selects the Reviewer outside the implementation loop. The Reviewer must receive the Lead-authored acceptance artifact and complete governing specifications/details before starting. The owner also selects routine board-driven Lead check-ins every 55 minutes with Implementer and Verifier. Cache warming is the owner's intent for the cadence, not an established effect. Routine status is batched; the existing immediate path for material HOLDs, blockers and mental-model breaks remains the working interpretation of that routine cadence.

## Basis and evidence

Authoring basis: user-directed intent. The saved investigation motivates the design but is not a reproduced failing baseline. It records known prerequisites losing force during readiness, reviewers inheriting an author's framing, and useful verification not controlling acceptance; it does not establish that hierarchy or token volume caused those decisions.

Current source was read before this proposal: the four role entrypoints and their relationship/duty references, management main path, recipient startup, lifecycle and pairing procedure. The existing source already supports direct pair exchanges and Lead evidence inspection. Its conflicting obligations include repeated role/commission/trace rereads on correction, absolute wording that helpers never write a plan, and management's per-helper trace-row reconciliation.

Who reaches the skills: the owner-facing Lead during planning and acceptance; commissioned Implementers, Checkers and Operators during their assignments; management callers during assignment and continuation.

## Preserve

- Four role identities: Lead, Implementer, Checker and Operator; verification and review remain explicit Checker duties. Display the duties as 🔬 Verifier and 🔎 Checker, and retain 🦁 Lead, 🐒 Implementer and 🔧 Operator.
- Existing model names/efforts/catalog rows and the three classifications; lineage restrictions, workstream-level verification, grants, tool permissions and owner merge authority remain. R5's new Local coding eligibility is withdrawn with its mistaken standalone-subagent Implementer assumption; helpers operate within their parent workstream's approved context.
- Relevant base practices, principles and domains at their decision points; base owns its files and shared references.
- Required product tests, independent observations, review, actual evidence inspection, stable observation targets and unresolved limits.
- The existing role/files constraint on delegated work direction, including corrections; peer setup, observations and reports keep their existing exception.

## Exclusions and limits

No base or frozen-v1 edits, copied shared references, new role/schema identities, delegator layer, automatic blocker service, message interception, new runtime loader, design-layout changes, install/cache refresh, merge or release. Another agent owns the copied design skills' content. The base's v1 delegation callbacks still block runtime activation. Removing duplicated local ceremony does not remove obligations independently owned by an unchanged base practice.

Draft posture: proposed from owner intent; behavior not yet evaluated. No token-saving or multi-day reliability claim follows from this plan, structural tests or an independent design verdict.
