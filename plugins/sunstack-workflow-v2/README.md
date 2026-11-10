# Sunstack Workflow v2

This PR supplies the selected design skills as the starting point for v2. Management is a separate PR stacked above this copy; another agent owns the design-content changes.

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

## Scope

The management/role changes belong to the next PR in the stack. Copied design source still uses the existing stage meanings pending its separately assigned redesign. This source-copy PR does not register, install or activate v2, claim runtime readiness, or change the maintained base or frozen v1.
