# Plugins

AI tools distributed through the local marketplaces in this repository.

- Codex plugins: [`.agents/plugins/marketplace.json`](../.agents/plugins/marketplace.json)
- Claude Code plugins: [`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json)
- Cursor plugins: [`.cursor-plugin/marketplace.json`](../.cursor-plugin/marketplace.json)
- Release notes: [`../docs/changelog/`](../docs/changelog/)

## Installation

```bash
# Add the marketplace
/plugin marketplace add ShravanSunder/ai-tools

# Install a plugin (use the IDs in the client table below)
/plugin install <plugin-name>@ai-tools
```

Client install IDs:

```text
Codex       scaffold-project@ai-tools   dev-workflow-tools@ai-tools   shravan-dev-workflow@ai-tools   skill-authoring@ai-tools   agent-router@ai-tools
Claude Code scaffold-project@ai-tools   dev-workflow-tools@ai-tools   shravan-dev-workflow@ai-tools   skill-authoring@ai-tools   agent-router@ai-tools
Cursor      local plugins via `.cursor-plugin/` manifests, including agent-router
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

Install it as `scaffold-project@ai-tools` in both Codex and Claude Code. The directory remains `ai-scaffold` for source organization.

- `/scaffold-project` -- scaffold a new project or retrofit an existing one
- `/scaffold-project-update-templates` -- update templates with latest standards

### [dev-workflow-tools](dev-workflow-tools/)

Common development tool skills that work across Codex, Claude Code, and Cursor's explicit `--plugin-dir` loading path.
Currently includes `peekaboo`, an alternative to Playwright for native macOS
app automation via the Accessibility API. The Peekaboo skill uses live CLI
discovery, snapshot-scoped interaction, and progressive references for
troubleshooting and headless mode.

### [shravan-dev-workflow](shravan-dev-workflow/)

Shravan's Codex-first development workflow plugin. Provides:

- **spec-design** skill -- writes a Requirements card the owner confirms and a separate Specification of checkable rules over defined entities
- **program-design** skill -- turns settled rules into source-grounded structural How, including ownership, interfaces, calls, state, failure, and a seam and observation point for every rule
- **test-design** skill -- plans the Implementer's regression tests so each rule is protected at the cheapest layer by a test that goes red when the behavior is wrong
- **verification-design** skill -- plans independent proof for each requirement on the real surface against a declared reference, with the Verifier's challenge and report
- **design-review** skill -- independently reviews the design documents and the ties between them, flags anything invented, and routes each finding to its owning skill
- **discuss-clarify-mental-models** skill -- reconverges unstable shared mental models before artifact work without the old one-question grill shape
- **discuss-pathfinding** skill -- Extract unwritten understanding from the user — requirements, tacit process knowledge, domain terms, design decisions — via batched grilling with attached reads, live challenge, and decision/process/glossary records as they crystallize.
- **manage-agents** skill -- defines the roles (Lead, Implementer, Verifier, Reviewer, Advisor, Worker, Operator) with their charters, and coordinates them across model categories and native, agent-router, or ACPX runtimes, with ACP adapter implementation kept separate
- **docs-maintain** skill -- reconciles docs, AGENTS.md, README.md, specs, plans, changelogs, and architecture docs against code and current decisions
- **spec-handoff** skill -- packages spec/design context for another agent before an implementation plan exists
- **plan-handoff** skill -- packages an existing implementation plan for another agent without pretending design context is a plan
- **ops-security-review** skill -- routes explicit security scans to official Codex Security workflows instead of reimplementing audit-grade scanning
- **ops-observability-stack** skill -- guides shared local OpenTelemetry/Victoria stack use, producer boundaries, AgentStudio and Agent VM loops, resource naming, and Victoria proof queries
- **implementation-pr-wrapup** skill -- finishes the GitHub PR lifecycle with fresh checks, comments, review-thread, and mergeability gates without merging without authorization
- **debug-investigation** skill -- investigates bugs, failing tests, flaky behavior, crashes, regressions, and unexpected behavior before fixes
- **presentation-tui** skill -- presents design, architecture, comparison, flow, and multi-section output on monospace terminal surfaces with a hybrid Unicode TUI + markdown style: box-drawing skeleton, inline code and fences for every technical atom, GFM tables as the default comparison medium
- **presentation-webui** skill -- presents the same content on rendered proportional-font chat surfaces with a markdown-first style: headings and GFM tables as the skeleton, smallest-view media selection, and Mermaid only where the relationship earns it
- **ops-linear-tracking** skill -- organizes Linear projects, milestones, issues, and dependencies using docs as the source of truth and tickets as tracking artifacts
- Evidence-first reducer workflow -- treats all subagent and external outputs as candidate findings until verified against the repo
- Oracle exclusion -- this workflow never invokes or suggests Oracle

### [skill-authoring](skill-authoring/)

Skill authoring for any repository, standalone from the workflow plugin. Provides:

- **skill-orchestrator** skill -- carries one skill change from spec through review, implementation, proof, assessment, and release
- **skill-creation** skill -- the skill craft and the skill spec: designs and writes one named skill
- **skill-review** skill -- independent review of a skill spec or skill files by several reviewer agents
- **skill-audit** skill -- audits current skills, session evidence, and upstream inspirations before recommending create/update/merge/skip decisions

- [agent-router plugin](agent-router/) — agent collaboration, shared message boards, wake-ups and schedules; canonical skill maintained in codex-router.
