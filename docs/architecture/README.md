# Skill system architecture

Start with [how the skill system fits together](skill-system.md). It explains the layers, role boundaries, design documents and delivery paths. Follow [skill standards and the linter](skill-standards-linter.md) for the path from a written standard to an executable check, and [source inspiration and evolution](skill-system-provenance.md) for the pstack, Matt Pocock and Addy Osmani background.

These documents explain the current source. The linked `SKILL.md` files, shared references, manifests and engine contracts own the runtime instructions. A source description establishes neither installed-client behavior nor the effectiveness of a model following a skill.

| Reader question | Start here |
| --- | --- |
| Which skill should handle this work? | [Repository operating map](../../AGENTS.md#skill-work) |
| How do phases, practices, roles, domains and principles compose? | [Layers and calls](skill-system.md#layers-and-calls) |
| Who designs, builds, verifies and accepts? | [Roles and execution forms](skill-system.md#roles-and-execution-forms) |
| What does a complete design contain? | [The four-document design](skill-system.md#the-four-document-design) |
| How do we audit or change skills? | [Skill authoring](skill-system.md#skill-authoring) |
| What can static rules prove? | [Proof boundaries](skill-standards-linter.md#proof-boundaries) |
| Which upstream ideas did we adapt? | [Source inspiration](skill-system-provenance.md#source-inspiration) |

Update these views when their source owners change. Keep source inventories in the owning plugin README, exact execution mechanics in the skill or tool manual, and session-specific status in the work trace or handoff. Architecture is the maintained explanation; old proposals are historical inputs.
