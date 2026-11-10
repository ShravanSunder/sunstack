# Restore the v1 Markdown design baseline

- `sunstack-workflow-v1` **1.1.0** restores the four pre-#205 design phases and references from `b37419ca`, retaining installed-plugin path repairs.
- Restores the corresponding Markdown design/rendering/plan references and necessary design-orchestrator/planner artifact expectations.
- Unselected archived role, management and execution source is unchanged; the archive remains frozen under its explicit-owner boundary.
- `sunstack-dev` **3.1.1** lets `presentation-html` render newly authored v1 Markdown-source designs without imposing the newer document-viewer contract.
- The selected source mode also reaches view/pattern/direct-recipe calls; ordinary HTML-source behavior is unchanged and v2 is separate.
- Updates affected plugin manifests, marketplace versions and the archive README.
- Validation: 180 unit tests, TypeScript, marketplace validation and generated-map HTML check pass; 55 restored files match the historical source after calibrated path repairs.
- A fresh Luna run produced four Markdown sources and an exact embedded HTML reader; behavior is characterized for that example only.
- Judged rules: not run (OpenRouter credential unavailable, zero model requests); independent implementation review pending.
- Codex/Claude/Cursor caches: not refreshed; no installation, activation, merge or release is claimed.
