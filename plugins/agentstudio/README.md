# Agent Studio plugin

Provides the `agentstudio` skill for Agent Studio CLI work: local Git worktrees, pane messages and context, terminal operations, and discovered App commands. A compact main path loads seven references for the requested work and its recovery. Supports Claude Code, Codex and Cursor through the app's bundled CLI.

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

This plugin contains skill instructions. Agent Studio supplies the CLI and pane environment; its provider package supplies lifecycle hooks. Installing the plugin does not install or configure those hooks. Missing tracking or hook trust belongs to separately authorized provider setup. Report store/access refusals to their owner; plugin installation does not repair them.

## Source and delivery

The canonical skill belongs to [Agent Studio](https://github.com/getagentstudio/agentstudio/tree/main/Sources/AgentStudio/Resources/AgentPackage/skills/agentstudio). This plugin carries a committed copy. The updated text is pending adoption in that repository; [`plugin-sources.json`](../../plugin-sources.json) records a null commit and the audited baseline, not a completed upstream pin.

Land the same runtime tree (`SKILL.md` and `references/**`) upstream with the matching CLI and recursive app installer, compare that complete tree byte for byte, then replace the pending provenance with the full upstream commit. Release the app and skill together. `agents/openai.yaml` is plugin presentation metadata. The plugin packages the whole skill directory; the app's existing file-only installers require a separate app-side correction before joint release.

The app package serves all users; sunstack is the owner's plugin channel. Both channels must carry the same pinned runtime tree. Installing both can expose two copies, potentially with different revisions during an update. Claude was observed displaying loose and plugin-qualified copies; automatic choice and precedence remain unverified. This plugin does not remove an existing skill. Local installation and cache refresh remain separate operations.
