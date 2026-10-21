# Agent Studio skill plugin

- `agentstudio@sunstack` `0.1.0` adds Codex, Claude Code and Cursor packaging for the `agentstudio` skill.
- The single-file skill covers own-pane messages, notices, asks, context, background refusal, token/binding fallback and refusal recovery with safe next actions.
- Targets the matching app release's message-only Agent Line: 200 UTF-8 bytes, relative age, no expiry, separate hook status and `ask` for "Needs you".
- Includes three plugin manifests and marketplace entries, Codex presentation metadata, a plugin README and catalog entry; no hooks or provider configuration changes.
- `plugin-sources.json` keeps the upstream pin pending until the matching CLI and identical skill text land.
- Cursor uses its `pluginRoot`-relative source path, matching the installed resolver and existing `agent-router` entry.
- Validation: 21 static invariants, skill validator, Claude plugin/marketplace validation and whitespace checks passed; three fresh advisory cases captured actual skill reads.
- New app CLI/age behavior, installed discovery and duplicate-skill precedence remain unverified; this is a draft awaiting the matching app release.
- Refresh/reinstall: not performed for Codex, Claude Code or Cursor; app-package delivery is retained; app and skill release together.
