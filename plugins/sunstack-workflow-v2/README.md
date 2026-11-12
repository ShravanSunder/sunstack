# Sunstack Workflow v2

Install from the Sunstack marketplace: `/plugin install sunstack-workflow-v2@sunstack` or `codex plugin add sunstack-workflow-v2@sunstack`. Version **0.1.0**. Requires `sunstack-dev`. Frozen v1 remains the default runtime workflow until base callbacks change.

The bottom layer supplies selected design skill copies. This upper layer adds management and four role charters, adapted from frozen v1; another agent owns design-content changes.

## Skill sources

| V1 source | V2 source |
| --- | --- |
| spec-design | [design-specification](skills/design-specification/SKILL.md) |
| program-design | [design-program](skills/design-program/SKILL.md) |
| verification-design | [design-verification](skills/design-verification/SKILL.md) |
| spec-program-review | [design-review](skills/design-review/SKILL.md) |

Copied from frozen v1 on main `133a3ace8b91611b65bf22f849d39ddf7cd6f3ac`. This layer changes names, source paths and dependency destinations; it does not select a new design-document layout.

## Dependency ownership

`sunstack-dev` remains the engineering base. Its shared references, principles, domains and practices are referenced in place; no base-owned files are copied here.
Locate the host-advertised `sunstack-dev:presentation-html` skill, then go up `../..` to its plugin root; resolve `sunstack-dev/shared-references/<file>` under that root and `sunstack-dev:<skill>` as `skills/<skill>/SKILL.md`. Independently versioned plugin caches need not be adjacent.
Skill-specific references stay under their owning v2 skill. The review-only proof-command procedure belongs under `design-review/references/`; it has no base copy.

## Management sources

- [practices-manage-agents](skills/practices-manage-agents/SKILL.md): classification, catalog, commissions and evidence.
- [role-lead](skills/role-lead/SKILL.md): design/workstreams/sequencing, inspected acceptance and outside review; no implementation changes.
- [role-implementer](skills/role-implementer/SKILL.md): assigned changes, product tests and associated proof.
- [role-operator](skills/role-operator/SKILL.md): prescribed work and guided collection.
- [role-checker](skills/role-checker/SKILL.md): explicit verification or independent review duty.

The packet union accepts only lead, implementer, operator and checker. Checker verification preserves four work modes and paired proof; review requires no author history and read-only access. Operator alone has a helper handback; other roles return their owned result. Management owns the selected model map: Terra high restores Local implementation; verification uses Terra/Sol, review uses Sol/Opus high, and Operator is always Luna high.

## Scope

Copied design source still uses the existing stage meanings pending its separately assigned redesign. Marketplace registration publishes the plugin for install; it does not switch the default runtime workflow or change frozen v1.

## Runtime activation blocker

Base preflight and verification practices still route delegation to v1. Installing this plugin does not close those callbacks. Trigger trials and live agent behavior have not been evaluated.

## Role and files commissioning

Delegated initial work, continuations and corrections contain only `role` (implementer, checker or operator) and nonempty `files`. Launch metadata remains separate. Recipients load their role, read current referenced governing files, resolve sourced assignment context and validate it with the retained rich role schemas. Existing documents need not be rewritten as full packet files. A missing grant, pair, duty or ending check returns an exact gap. Reports and direct pair exchanges keep their existing contracts.

The strict call schema checks source-level content shape; it does not intercept Router messages, enforce permissions or prove safe live file interpretation. Base callbacks still select v1; agent behavior and token savings have not been evaluated.

## Responsibility and completion

Lead supplies design docs and a workstream plan: contracts, dependencies, sequencing and completion conditions. Implementer receives a **Designed Outcome**, choosing detailed implementation steps, tests and subagent decomposition, integrating proof and working directly with its 🔬 Verifier. **Exact Steps** follows a supplied procedure; Operator always uses that route on Luna high.

Implementer and Verifier may use native subagents for separable tasks within their actual grants, choosing models from the shared catalog by each task's own span. Parent inspects changes/evidence and owns the combined result. Terra and Sol are preferred for fitting browser/computer-control work, particularly Terra high for UI/browser verification, without implying tool access. Formal Implementer and both Checker duties remain Sidekicks; native tasks add no role packet, trace or Verifier pair. Worker is only a search/provider synonym.

After required proof, the Lead authors a five-condition acceptance artifact in the existing work record: intent, ownership/contracts, deciding target evidence, integrated workstreams and resolved prerequisites/HOLDs. The outside 🔎 Checker admits delivery review only with that completed artifact and complete scoped original specifications/plan/proof and verification report. Missing Lead work returns review-not-started. Findings reopen affected acceptance/proof; a clean review is the last quality check and starts no second wholesale acceptance ceremony.

The Verifier's original actionable report goes directly to Lead with scoped outcomes/evidence, Needs Implementer tasks and rechecks, Needs Lead decisions/blockers and required unverified paths/HOLDs. Routine board-driven check-ins use one 55-minute Lead trigger, ending on completion/pause; material blockers are immediate. This source change configures no live trigger and establishes no cache savings or actual agent compliance. Relevant base logging/audits remain, with no automatic HTML/Story rendering or duplicate local packet/trace census.
