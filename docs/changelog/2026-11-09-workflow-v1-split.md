# Separate the maintained base from frozen workflow v1

- `sunstack-dev` **3.0.0** keeps 42 engineering skills; `sunstack-workflow-v1` **1.0.0** preserves 23 legacy role/workflow skills.
- Moves full skill subtrees and three v1-owned shared references; six shared references receive frozen v1 copies.
- Keeps base principles, domains, presentation, discussion, operations, audits, debugging and docs skills.
- Updates Codex, Claude and Cursor manifests/marketplaces, plugin inventories, active source references and test paths.
- Root and nested `AGENTS.md` mark the whole v1 plugin frozen; ordinary development must not edit or synchronize it.
- Portable base-file lookup covers hidden principles/domains and non-skill shared references; retained base delegation branches still require v1.
- Validation: 236/236 tests, typecheck and Claude validation pass; structural reference/manifest checks pass. [Evidence and limits](references/2026-11-09-workflow-v1-split.md).
- Installed Codex/Claude/Cursor caches: not refreshed. No new topology, behavior-improvement claim or release/merge is included.
