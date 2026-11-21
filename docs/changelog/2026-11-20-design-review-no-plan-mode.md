# 2026-11-20: Design review does not set host Plan mode

- `sunstack-workflow-v2` 0.4.1; all six plugin/marketplace version entries agree.
- `design-review` step 4 no longer says to commission the 🔎 Reviewer Sidekick "with read-only workspace access." That phrase was being read as Claude Plan mode (`--mode plan` / `--permission-mode plan`) and caused an Approve Plan popup.
- The line now tells the caller to commission the Reviewer Sidekick through `practices-manage-agents` and tell it not to write code or design files. Host conversation mode is left alone.
- Frozen v1 `spec-program-review` still has the old phrase; it was not edited.
- Validation: `pnpm dlx @sunstack/cli@0.11.0 lint --check` on the skill-authoring rulebook (exit 0). Model-backed `sunstack lint` on the skill file was not run: `OPENROUTER_API_KEY` unset.
- No hooks, commands or README sections change. Codex/Claude caches are not refreshed.
