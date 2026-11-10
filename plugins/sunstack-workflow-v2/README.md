# Sunstack Workflow v2 — working draft

The owner commissioned this fresh workflow on 2026-11-09. It is not registered in a marketplace or exposed as an active plugin yet.

## Starting material

Copied from the frozen v1 archive on merged main `133a3ace8b91611b65bf22f849d39ddf7cd6f3ac`, equivalent to the reviewed migration snapshot `8fc411e5`:

| V1 source | V2 draft name |
| --- | --- |
| spec-design | design-specification |
| program-design | design-program |
| verification-design | design-verification |
| spec-program-review | design-review |

The four complete source trees and their required shared-reference closure are under `drafts/`. `drafts/copy-map.json` records the exact source and permitted rename transformations.
The copied skill names, display/default-prompt names and relative paths between the four copied skills are updated. The inherited prose, phase routing, role rules and document-layout rules are starting material to rewrite, not adopted v2 behavior.
Six shared references came across to keep the copied local source dependencies together; their legacy workflow content is likewise not adopted policy.

## Decisions from the owner's latest message

Four roles: Lead; Checker with explicit Verifier and Reviewer duties; Implementer writes code; Operator.
**Luna may be used only as Operator.** Preserve v1's concrete model/effort catalog, selection conditions and remaining machinery unless the owner selects a change.
Keep three classifications from manage-agents: work level with horizon, direction, and span.
Management source: [drafts/skills/practices-manage-agents/SKILL.md](drafts/skills/practices-manage-agents/SKILL.md), including its [model catalog](drafts/skills/practices-manage-agents/SKILL.md#model-catalog). The source is copied from v1 with selective edits; all sixteen companion reference/schema/metadata files are retained unchanged. [drafts/manage-agents.md](drafts/manage-agents.md) records the edit boundary; [drafts/roles.md](drafts/roles.md) describes responsibilities.

The owner subsequently settled the implementation boundary: the Lead does not make implementation changes; the Implementer owns code and repairs. The Lead still reads code, inspects evidence and owns integration judgment. A Checker's two duties do not yet define its session lifecycle, Router authority or enforcement.

## What Opus handed over

Its proposal was a hands-on Lead by default, an independent Checker doing observation and review, and bounded helpers only where work separates cleanly. It recommended no mandatory Implementer–Verifier pairing, no separate reviewer hierarchy, no seven-role catalog, short handoffs and evidence before acceptance.
It kept a Chief of Staff for awareness, status and routing only, outside the project execution roles; it did not settle all topology details with the owner.
The present four-role direction and Lead/Implementer boundary supersede the older hands-on-implementation proposal. The owner's later clarification also supersedes the initial broad simplification proposal: preserve v1 by default and apply only selected changes. No Claude agent was woken for this work.

## Boundary

Everything under `drafts/` is editable design material, not frozen and not runtime policy. There is deliberately no active `skills/` root, plugin manifest, marketplace entry, installed-cache change or activation instruction in this initial copy.
Do not invoke the copied v1 instructions as the new workflow. The design skills still need their capability-based reading form, role references, routing and proof boundaries rewritten against the accepted v2 design.
The v1 archive and maintained base are unchanged by this starting copy.
