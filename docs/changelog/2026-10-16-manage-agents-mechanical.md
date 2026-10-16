# 2026-10-16 practices-manage-agents back to mechanical

`sunstack-dev` 2.84.0 → 2.85.0.

- `practices-manage-agents`: the 7-step prose main path is reverted to the mechanical structure: classify tables, one Roles table (what each role takes, returns, its form, who commissions it, its role skill), the model catalog, then launch, hand off and check. `SKILL.md` goes from 3,271 to 2,185 words. Planning and acceptance judgment stays with the commissioner's role skill.
- Hand off keeps the typed packet (schema plus role contract), the preflight call, the shared-resource ordering and the role prompt.
- Removed the legacy ACPX route and ACP adapter guidance: `references/acpx-legacy.md`, `acpx-provider-{claude,codex,cursor}.md` and `building-acp-adapters.md` are deleted, with no stubs. `execution-forms.md` reports an unmet agent-router route as a gap, and the native provider references no longer mention ACPX.
- Docs: plugin README, plugins README, the skill's `openai.yaml` prompt and the plugin keywords no longer advertise ACPX.
- Unchanged: the `tests/skills` harness and AGENTS.md's Standing ACPX Authority.
- Validation: `git diff --check` clean; `pnpm --dir tests/skills run test` 166/166; `typecheck` exit 0; citation check PASS; `claude plugin validate .` passed.
- Codex, Claude and Cursor cache refresh: not run.
