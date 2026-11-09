# Plugins

AI tools distributed through the local marketplaces in this repository.

- Codex plugins: [`.agents/plugins/marketplace.json`](../.agents/plugins/marketplace.json)
- Claude Code plugins: [`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json)
- Cursor plugins: [`.cursor-plugin/marketplace.json`](../.cursor-plugin/marketplace.json)
- Release notes: [`../docs/changelog/`](../docs/changelog/)

## Installation

```bash
# Add the marketplace
/plugin marketplace add ShravanSunder/sunstack

# Install a plugin (use the IDs in the client table below)
/plugin install <plugin-name>@sunstack
```

Client install IDs:

```text
Codex       scaffold-project@sunstack   dev-workflow-tools@sunstack   sunstack-dev@sunstack   sunstack-workflow-v1@sunstack   skill-authoring@sunstack   agent-router@sunstack   agentstudio@sunstack
Claude Code scaffold-project@sunstack   dev-workflow-tools@sunstack   sunstack-dev@sunstack   sunstack-workflow-v1@sunstack   skill-authoring@sunstack   agent-router@sunstack   agentstudio@sunstack
Cursor      local plugins via `.cursor-plugin/` manifests, including agent-router and agentstudio
```

Cursor can load these plugins from `.cursor-plugin/marketplace.json` plus each
plugin's `.cursor-plugin/plugin.json`, or via an explicit `--plugin-dir` path.

### Managing Plugins

```bash
/plugin                    # List installed plugins
/plugin disable <name>     # Temporarily disable
/plugin enable <name>      # Re-enable
/plugin uninstall <name>   # Remove completely
```

## Available Plugins

### [scaffold-project](ai-scaffold/)

AI Scaffold (`scaffold-project`) provides project scaffolding with standard dev configs. Supports TypeScript (biome, vitest, Playwright), Python (ruff, basedpyright, pytest), and Swift (swiftlint, swiftformat). Includes cursor rules and Claude hooks.

Install it as `scaffold-project@sunstack` in both Codex and Claude Code. The directory remains `ai-scaffold` for source organization.

- `/scaffold-project` -- scaffold a new project or retrofit an existing one
- `/scaffold-project-update-templates` -- update templates with latest standards

### [dev-workflow-tools](dev-workflow-tools/)

Common development tool skills that work across Codex, Claude Code, and Cursor's explicit `--plugin-dir` loading path.
Currently includes `peekaboo`, an alternative to Playwright for native macOS
app automation via the Accessibility API. The Peekaboo skill uses live CLI
discovery, snapshot-scoped interaction, and progressive references for
troubleshooting and headless mode.

### [sunstack-dev](sunstack-dev/)

The maintained engineering base: 42 skills for principles, language standards, research, debugging, verification, discussion, docs, operations and presentation. Version 3.0.0 extracts the legacy roles and phases; see its README for remaining v1 delegation dependencies.

### [sunstack-workflow-v1](sunstack-workflow-v1/)

Frozen legacy workflow, independently versioned at 1.0.0: 23 roles, orchestrators, design/planning/delivery skills and handoffs. Requires sunstack-dev. Do not edit without explicit owner instruction; its nested AGENTS.md owns the freeze boundary.

### [skill-authoring](skill-authoring/)

Skill authoring for any repository, standalone from the workflow plugin. Provides:

- **skill-orchestrator** skill -- carries one skill change from design through review, writing, proof, assessment, and release
- **skill-design** skill -- designs one skill change and writes its design set before its files change
- **skill-creation** skill -- writes one skill's files from its accepted design, or makes a mechanical edit
- **domain-skill-crafting** skill -- hidden; holds every standard a skill's text must meet; loaded by the other skills
- **skill-rules-authoring** skill -- decides which skill standards become checked rules, designs each rule or filter from its cases, desk-checks the owner's rulings before any run, and proves it on or held
- **skill-rules-review** skill -- independent review of one skill rule or filter, on the owner's rulings as the model receives them
- **skill-rules-config** skill -- the shipped sunstack lint manual: rulebook files, evidence kinds, lint runs, reports and case runs
- **domain-decision-models** skill -- hidden; the standards for any decision model, loaded by the rules and review skills
- **decision-model-review** skill -- independent review of any decision model
- **skill-review** skill -- independent review of a skill change's design set or skill files by several reviewer agents
- **skill-audit** skill -- audits current skills, session evidence, and upstream inspirations; sends each flagged skill to skill-review and uses its verdict and accepted findings in create/update/merge/skip decisions

- [agent-router plugin](agent-router/) — agent collaboration, shared message boards, wake-ups and schedules; canonical skill maintained in codex-router.

### [agentstudio](agentstudio/)

Agent Studio CLI worktrees, own-pane messages/context, terminal operations and discovered App commands, with conditional references and recovery guidance. Install as `agentstudio@sunstack` in Codex and Claude Code, or select `agentstudio` in Cursor's sunstack marketplace.

This draft targets the matching message-only Agent Studio release; its upstream pin remains pending. See the [plugin README](agentstudio/README.md) for setup, canonical source and delivery limits.
