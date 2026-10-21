# Agent Studio plugin

Provides the `agentstudio` skill for agents working in an Agent Studio pane: Agent Line messages, titles, notices, asks and pane context. Supports Claude Code, Codex and Cursor through the app's bundled CLI.

This draft targets the Agent Studio release with the message-only Agent Line CLI and relative age display. Its matching app revision and upstream source pin are pending.

## Install

From a configured sunstack marketplace:

```sh
codex plugin add agentstudio@sunstack
```

For Claude Code:

```text
/plugin install agentstudio --marketplace ShravanSunder/sunstack
```

In Cursor, add the sunstack repository as a Personal marketplace and select `agentstudio`.

This plugin contains skill instructions. Agent Studio supplies the CLI and pane environment; its provider package supplies lifecycle hooks. Installing the plugin does not install or configure those hooks. Missing tracking, hook trust or store access needs the provider package's setup, separately authorized by the user.

## Source and delivery

The canonical skill belongs to [Agent Studio](https://github.com/getagentstudio/agentstudio/tree/main/Sources/AgentStudio/Resources/AgentPackage/skills/agentstudio). This plugin carries a committed copy. The updated text is pending adoption in that repository; [`plugin-sources.json`](../../plugin-sources.json) records a null commit and the audited baseline, not a completed upstream pin.

Land the same `SKILL.md` upstream with the matching CLI, compare the two skill files byte for byte, then replace the pending provenance with the full upstream commit. Release the app and skill together. `agents/openai.yaml` is plugin presentation metadata. Keep runtime instructions self-contained because the app's provider installers copy only `SKILL.md`.

The app package installs the skill for all users; sunstack is the owner's plugin channel. Both channels carry the same pinned source text. Installing both can expose two copies, potentially with different revisions during an update. Client precedence between those copies has not been verified. This plugin does not change app-package delivery or remove an existing skill. Local installation and cache refresh remain separate operations.
