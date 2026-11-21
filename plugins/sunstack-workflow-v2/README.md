# Sunstack Workflow v2

Install from the Sunstack marketplace: `/plugin install sunstack-workflow-v2@sunstack` or `codex plugin add sunstack-workflow-v2@sunstack`. Version **0.5.2**. Agent management uses `practices-delegation` from `sunstack-dev`.

This source contains the v2 design skills and separately maintained management and role charters. The design skills preserve the original engineering guidance while teaching useful HTML composition.

## Skill sources

| V1 source | V2 source |
| --- | --- |
| spec-design | [design-specification](skills/design-specification/SKILL.md) |
| program-design | [design-program](skills/design-program/SKILL.md) |
| verification-design | [design-verification](skills/design-verification/SKILL.md) |
| spec-program-review | [design-review](skills/design-review/SKILL.md) |

The engineering baseline is the four design phases from before PR #205, at `b37419ca08dcde11bb8c72b810a4e91afec345f9`, with the v2 route names and installed-plugin dependency repairs retained. V2 changes their artifact presentation to complete free-form HTML through `sunstack-dev:presentation-html`; v1 separately keeps the historical Markdown contract.

## Dependency ownership

`sunstack-dev` remains the engineering base. Its shared references, principles, domains and practices are referenced in place; no base-owned files are copied here.
Locate the host-advertised `sunstack-dev:presentation-html` skill, then go up `../..` to its plugin root; resolve `sunstack-dev/shared-references/<file>` under that root and `sunstack-dev:<skill>` as `skills/<skill>/SKILL.md`. Independently versioned plugin caches need not be adjacent.
Skill-specific references stay under their owning v2 skill. The review-only proof-command procedure belongs under `design-review/references/`; it has no base copy.

## Management sources

- [practices-manage-agents](skills/practices-manage-agents/SKILL.md): v2's roles, model catalog and role commissions. Launching, continuing, waiting and checking come from `sunstack-dev:practices-delegation`.
- [role-lead](skills/role-lead/SKILL.md): design/workstreams/sequencing, inspected acceptance and outside review; no implementation changes.
- [role-implementer](skills/role-implementer/SKILL.md): assigned changes, product tests and associated proof.
- [role-operator](skills/role-operator/SKILL.md): prescribed work and guided collection.
- [role-checker](skills/role-checker/SKILL.md): explicit verification or independent review duty.

The packet union accepts only lead, implementer, operator and checker. Checker verification preserves four work modes and paired proof; review requires no author history and scope-fitting access: source-only inspection, explicitly listed checks, or independent investigation in isolated scratch. Operator alone has a helper handback; other roles return their owned result. Management owns the selected model map: Terra high restores Local implementation; verification uses Terra/Sol, review uses Sol/Opus high, and Operator is always Luna high.

## Scope

The four document meanings remain distinct. Their HTML can use prose, diagrams, tables, Trees, choices, comparisons, open discussion and call stacks where they explain the subject. New collections share Pages, semantic Map and complete question-led Walkthroughs through one navigation descriptor, while HTML owns the design facts. Worked examples live with the maintained presentation recipe. The matching bound guide owns syntax and component preparation. The published Demistify 1.22.0 guide documents shared navigation. Each selected binding needs its matching guide and checker, and source preview and publication have separate checks. The host chooses the active workflow through its skill index.

## Role and files commissioning

Delegated initial work, continuations and corrections contain only `role` (implementer, checker or operator) and nonempty `files`. Launch metadata remains separate. Recipients load their role, read current referenced governing files, resolve sourced assignment context and validate it with the retained rich role schemas. Existing documents need not be rewritten as full packet files. A missing grant, pair, duty or ending check returns an exact gap. Reports and direct pair exchanges keep their existing contracts.

The strict call schema checks source-level content shape; it does not intercept Router messages, enforce permissions or prove safe live file interpretation. Agent behavior and token savings have not been evaluated.

## Responsibility and completion

Lead supplies design docs and a workstream plan: contracts, dependencies, sequencing and completion conditions. Implementer receives a **Designed Outcome**, choosing detailed implementation steps, tests and subagent decomposition, integrating proof and working directly with its 🔬 Verifier. **Exact Steps** follows a supplied procedure; Operator always uses that route on Luna high.

Implementer and Verifier may use native subagents for separable tasks within their actual grants, choosing models from the shared catalog by each task's own span. Parent inspects changes/evidence and owns the combined result. Terra and Sol are preferred for fitting browser/computer-control work, particularly Terra high for UI/browser verification, without implying tool access. Formal Implementer and both Checker duties remain Sidekicks; native tasks add no role packet, trace or Verifier pair. Worker is only a search/provider synonym.

After required proof, the Lead authors a five-condition acceptance artifact in the existing work record: intent, ownership/contracts, deciding target evidence, integrated workstreams and resolved prerequisites/HOLDs. The outside 🔎 Checker admits delivery review only with that completed artifact and complete scoped original specifications/plan/proof and verification report. Missing Lead work returns review-not-started. Findings reopen affected acceptance/proof; a clean review is the last quality check and starts no second wholesale acceptance ceremony.

The Verifier sends the original actionable report directly to Lead. It includes scoped outcomes and evidence, product and test tasks for Implementer with affected rechecks, apparatus tasks for Verifier, decisions and blockers for Lead, and any required unverified paths or HOLDs. Put routine status on the existing board and surface material blockers immediately. Follow the base logging and audit procedures.

## Independent evidence and outcome authority

Reviewer reconstructs approved obligations from original sources, reads code and tests directly, chooses isolated probes and retains unresolved source-backed disputes. Full delivery review requires the Lead’s inspected acceptance plus original scoped proof and the original Verifier report; checked boxes and a runnable command cannot substitute for those inputs.

The review-only `review-investigation` grant names protected candidates and revisions plus reviewer scratch. It permits independent discovery and probes within actual capabilities, without changing the candidate, its oracle, credentials or global state. The narrower `inspect` and `inspect-and-execute` grants retain their narrower judgments. Schema validation supplies no OS isolation.

Both members of the Implementer–Verifier pair resolve disputed expected behavior against original approved sources. A Lead interpretation needs deciding authority and cannot silently waive an approved outcome. Implementer owns product and test repairs, Verifier owns apparatus and original observations, and Lead owns sourced dispositions and acceptance.
