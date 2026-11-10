# Manage agents v2 — selective edits to v1

The canonical working draft is [practices-manage-agents/SKILL.md](skills/practices-manage-agents/SKILL.md). Its [model catalog](skills/practices-manage-agents/SKILL.md#model-catalog) retains the concrete v1 models, efforts, tiers and selection conditions.

The owner's editing rule: preserve v1 unless a change is explicitly selected. The earlier condensed replacement is superseded; it removed machinery the owner had not agreed to remove.

## Selected changes

- Four roles: Lead, Implementer, Operator and Checker.
- Checker preserves explicit Verifier and Reviewer duties; their model/effort rows remain separate.
- Luna is Operator-only; remove Luna's Implementer assignments.
- Lead owns governing design, plan, code inspection, integration judgment and acceptance; Implementer makes code and repair changes.
- Remove standalone Advisor/Researcher catalog sections because those are outside the selected four roles; do not transfer their model rows to another role without a decision.

## Preserved from v1

Work levels, horizon, direction, span; Workhorse/Daily driver/Frontier definitions; concrete model and effort rows for retained responsibilities; model-selection reasons, authorization and exact-ID lookup; Worker/Sidekick lifecycle; packet schemas; preflight; write isolation; paired verification commissioning; review independence and lineage requirements; session reuse; handback evidence and trace checks; examples and completion rules.

The copied reference/schema tree remains unchanged reference material. Its old role names are visible; they do not create active v2 roles. Checker charter, packet-role mapping and any further simplification remain future explicit design work. No runtime plugin is activated.

## Model rows retained

- Operator: Luna medium for Exact work, Luna high for Complete guided local collection.
- Implementer: Sol or Opus medium for Complete cross-domain work; Sol or Opus high to xhigh for Partial cross-domain/cross-system work.
- Checker / verification: Sol or Opus high to xhigh.
- Checker / review: Grok high, Sol xhigh, Opus xhigh; Astra high to xhigh only when the owner authorizes it.
- Lead: the owner's chosen model and effort.

The v1 Luna/Local Implementer rows are removed; no replacement was selected by this edit. Do not invent a new row or quietly broaden another row's span. Host model-ID resolution remains separate from this role/effort catalog.
