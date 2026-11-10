# Workflow v2 source ownership

This is the editable v2 source, separate from the frozen v1 archive. Skill sources belong directly under `skills/`.
`sunstack-dev` owns the engineering base and its shared references; use the base dependency lookup in each skill instead of copying base files or assuming adjacent installed caches. Keep skill-specific references with their owning skill.
This stack's bottom layer owns the four selected design-skill copies, names and dependency destinations only. The separately assigned design agent owns design-content changes. Management and its selected four-role schema/model changes belong to the upper PR.
Preserve unselected v1 behavior; do not restore removed roles through examples, schemas or helper imports. Do not wake Claude agents while the owner's token restriction remains in force.
Plugin installation, runtime activation and design-layout changes are not authorized by the source-copy step.

Management has exactly four roles: Lead, Implementer, Operator and Checker. Checker commissions select verification or review duty explicitly; review is independent and read-only. Preserve the catalog rows and return missing-row gaps, including Local implementation after Luna removal.

Base preflight/verification delegation callbacks still select v1. Keep installation and runtime activation blocked until the base owner closes that compatibility work; v2 source checks do not establish runtime integration.
