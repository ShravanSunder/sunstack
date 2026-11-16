# Agent Studio plugin

`agentstudio@sunstack` provides the AgentStudio CLI skill for Claude Code, Codex and Cursor. It covers worktrees, pane messages/context, existing PR links and showing web pages or local HTML in a drawer browser.

## Install

Codex:

```sh
codex plugin marketplace add ShravanSunder/sunstack
codex plugin add agentstudio@sunstack
```

Claude Code:

```sh
claude plugin install agentstudio --marketplace ShravanSunder/sunstack
```

For an existing install, refresh the marketplace and plugin explicitly. The Codex sequence uninstalls this marketplace plugin and its cache, then installs it from the refreshed snapshot; it does not claim repeated `plugin add` updates an existing install:

```sh
# Codex
codex plugin marketplace upgrade sunstack
codex plugin remove agentstudio@sunstack
codex plugin add agentstudio@sunstack

# Claude Code
claude plugin marketplace update sunstack
claude plugin update agentstudio@sunstack
```

In Cursor, add `ShravanSunder/sunstack` as a Personal marketplace and install or update `agentstudio`. Start a new agent session after updating so it can load the new instructions.

## Commands and app compatibility

AgentStudio supplies the executable and pane credentials; this plugin supplies instructions. The skill resolves the bundled helper, checks its compiled help and the selected app's live capabilities, then selects the requested operation. Installing the skill cannot add commands to an older application.

- `drawer browse PAGE --target PANE_ID` opens an HTTP/HTTPS page or an existing local HTML file in the intended main pane's drawer browser and posts a pane notice with an Open action; it preserves focus and does not expand the drawer. The v0.0.127 CLI path was exercised, with display confirmed by the owner.
- `pr add|remove PR --target PANE_ID` and `pr list --target PANE_ID` associate existing GitHub PRs with a pane and preserve authenticated attribution. They require an app/helper that exposes the matching PR methods; they are absent from the inspected v0.0.127 helper and present in the v0.0.128 release source. This plugin release does not establish publication of that app version.

Use `--target-env` only when the inherited pane is the intended one; daemon/server sessions use the task's explicit main-pane UUID. A browser open receipt does not prove rendering, and a PR association does not create or merge a GitHub PR.

## Source and delivery

The canonical skill lives in [AgentStudio's bundled package](https://github.com/getagentstudio/agentstudio/tree/main/Sources/AgentStudio/Resources/AgentPackage/skills/agentstudio). Sunstack carries a committed copy; `plugin-sources.json` records its exact upstream source revision. The runtime tree (`SKILL.md` and `references/**`) is compared byte for byte before publication. The app installer copies the full directory recursively; no reference-sync script is needed. This plugin version pins the published [instruction commit](https://github.com/getagentstudio/agentstudio/commit/3c897dcc63b0277830bd5af6ea72c3e00f07a555) on a documentation branch; inclusion in a future application bundle is separate.

The app's provider package also installs lifecycle hooks, while this plugin does not install or configure hooks. The skill explains the supported status/install/snippet workflow; actual provider-home changes require the user's go-ahead. An app-installed loose skill and a marketplace skill can coexist at different revisions; automatic precedence is unverified. This release does not remove either copy or change provider configuration.
