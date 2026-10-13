# 2026-10-13 practices-manage-agents: roles, forms and typed packets

`sunstack-dev` 2.75.1 → 2.76.0; `agent-router` 0.17.0 → 0.17.1.

- `manage-agents` is now `practices-manage-agents`, a hard cutover: the old skill and folder are gone, and every live caller, manifest keyword and the `sample-scenarios` fixture folder use the new name. History keeps the old name.
- Seven roles (Lead, Advisor, Implementer, Verifier, Reviewer, Researcher, Operator), each with its own charter under `references/roles/`, composed of practices and principles and carrying a ready opening. Worker and Sidekick are execution forms; Advisor, Implementer, Verifier and Reviewer always run as Sidekicks, and every Implementer gets a paired Verifier.
- New `references/execution-forms.md` owns form mechanics and route selection. `agent-job-packet.md` teaches commissioning against Zod 4 schemas split for progressive reading: shared `assignment-fields.ts`, one contract per role under `schemas/role-contracts/`, and thin `agent-job-packet.ts` and `role-handback.ts` unions for mixed-role validation.
- Catalog: Claude Haiku rows removed; Operator gains guided Complete · Local collection on Luna high; Researcher rows added; the Implementer Sidekick keeps the Complete · Cross-domain Sol/Opus medium rows.
- Live callers now say Reviewer Sidekick, Implementer Sidekick, Researcher Worker and the like. `agent-collaboration`'s example title follows the new display convention.
- `tests/skills` pins `zod` 4.6.5; normal pnpm resolution also moves the eval runner's in-range Zod from 4.4.3 to 4.6.5.
- Validation: typecheck exit 0; `pnpm --dir tests/skills run test` 18 files, 149 tests passed; Bun schema import smoke exit 0; `claude plugin validate .` passed; `git diff --check` clean; no live old-name callers, 33 pointers resolve. Codex `quick_validate.py` not run: PyYAML unavailable, nothing installed.
- Behavior proof: drafted from approved user intent; role behavior is not yet evaluated. Behavior prompts are prepared and unrun. No cache refresh was performed.
