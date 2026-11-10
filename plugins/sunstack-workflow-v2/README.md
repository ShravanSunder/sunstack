# Sunstack Workflow v2

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
- [role-lead](skills/role-lead/SKILL.md): design, plans, inspection and acceptance; no implementation changes.
- [role-implementer](skills/role-implementer/SKILL.md): assigned changes, product tests and associated proof.
- [role-operator](skills/role-operator/SKILL.md): prescribed work and guided collection.
- [role-checker](skills/role-checker/SKILL.md): explicit verification or independent review duty.

The packet union accepts only lead, implementer, operator and checker. Checker verification preserves four work modes and paired proof; Checker review requires no author history and read-only access. Operator alone has a helper handback; other roles return their owned result. The original applicable model/effort rows remain, except Luna implementation rows are removed. Complete · Local implementation has no catalog row; return the gap rather than selecting a new model.

## Scope

 Copied design source still uses the existing stage meanings pending its separately assigned redesign. This source-copy PR does not register, install or activate v2, claim runtime readiness, or change the maintained base or frozen v1.

## Runtime activation blocker

Base preflight and verification practices still route delegation to v1. This source/schema layer does not close those callbacks. Installation and runtime activation remain blocked pending a separately scoped base compatibility change. Trigger trials and live agent behavior have not been evaluated; no manifests, marketplaces or installed caches change here.
