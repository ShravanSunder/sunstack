# Agent Studio skill plugin

- `agentstudio@sunstack` `0.1.0` adds Codex, Claude Code and Cursor packaging for the `agentstudio` skill.
- The single-file skill covers own-pane messages, notices, asks, context, background refusal, token/binding fallback and refusal recovery with safe next actions.
- Targets the matching app release's message-only Agent Line: 200 UTF-8 bytes, relative age, no expiry, separate hook status and `ask` for "Needs you".
- Includes three plugin manifests and marketplace entries, Codex presentation metadata, a plugin README and catalog entry; no hooks or provider configuration changes.
- `plugin-sources.json` keeps the upstream pin pending until the matching CLI and identical skill text land.
- Cursor uses its `pluginRoot`-relative source path, matching the installed resolver and existing `agent-router` entry.
- Validation: [25 source checks](references/2026-10-21-agentstudio-plugin-validation.md), skill/Claude validators and whitespace checks passed; three advisory cases captured actual skill reads. Added exact-name and declared-root assertions after negative controls exposed gaps in the original 21.
- Disposable-home verification observed Claude install/discovery and Codex install with matching bytes. Codex discovery and Cursor remain authentication-blocked; automatic invocation and duplicate-copy precedence remain unverified.
- App CLI/age behavior and the upstream pin remain pending; this draft awaits the matching joint app/skill release.
- Owner installations/caches are unchanged; verification used disposable homes. App-package skill delivery is retained.
