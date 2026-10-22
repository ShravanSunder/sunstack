# AI Tools

Local Codex and Claude Code plugins for AI-assisted development workflows.

## Core Plugins

Install through the local sunstack marketplaces.

```bash
codex plugin marketplace add ~/dev/ai-tools
/plugin marketplace add ShravanSunder/sunstack
```

The plugin IDs below are shared across Codex and Claude Code.

| Client | Scaffolding | Dev workflow | Dev tools |
|--------|-------------|--------------|-----------|
| Codex | `scaffold-project@sunstack` | `sunstack-dev@sunstack` | `dev-workflow-tools@sunstack` |
| Claude Code | `scaffold-project@sunstack` | `sunstack-dev@sunstack` | `dev-workflow-tools@sunstack` |

```bash
codex plugin add <name>@sunstack
/plugin install <name>@sunstack
```

| Plugin | Description |
|--------|-------------|
| [`sunstack-dev`](plugins/sunstack-dev/) | Codex-first spec, program design, pathfinding, plan, implementation, PR wrap-up, review, handoff, debugging, TUI presentation, and ops workflows |
| [`dev-workflow-tools`](plugins/dev-workflow-tools/) | Common development tool skills, including native macOS UI testing with Peekaboo CLI |
| [`scaffold-project`](plugins/ai-scaffold/) | AI Scaffold project scaffolding with standard dev configs (biome, ruff, vitest, pytest, cursor rules, claude hooks) |
| [`agent-router`](plugins/agent-router/) | Agent collaboration, shared message boards, wake-ups, and schedules; install as `agent-router@sunstack` (Cursor Personal marketplace too) |

See [`plugins/`](plugins/) for full details.

Release notes live in [`docs/changelog/`](docs/changelog/).

### Shravan Dev Workflow

The main workflow plugin is organized by namespace and phase boundary:

```mermaid
flowchart LR
    pathfinding["Discuss: Pathfinding<br/>unwritten requirements and decisions"]
    clarify["Discuss: Clarify Mental Models<br/>shared-model reconvergence"]
    spec["spec-*<br/>design, review, handoff"]
    plan["plan-handoff<br/>existing plan portability"]
    impl["implementation-*<br/>PR wrap-up, handoff"]

    pathfinding --> spec
    clarify --> spec
    clarify --> plan
```

Operations skills such as `ops-linear-tracking`, and audit skills such as
`audit-security-review`, sit outside the main phase path.

### Shared Observability

`observability/` owns the shared local OpenTelemetry collector plus the
VictoriaMetrics, VictoriaLogs, and VictoriaTraces stack. Use
`sunstack-dev:ops-observability-stack` for producer boundaries,
AgentStudio and Agent VM loops, resource naming, and Victoria query recipes.

Start with [`plugins/sunstack-dev/README.md`](plugins/sunstack-dev/)
for the full workflow map, phase diagrams, and skill boundaries.

---

## Repository Structure

```
ai-tools/
├── plugins/                     # Codex and Claude Code plugins
│   ├── sunstack-dev/             # Spec, plan, implementation, review, handoff workflows
│   ├── dev-workflow-tools/      # Common tool skills, including Peekaboo UI testing
│   └── ai-scaffold/             # Project scaffolding
├── observability/               # Shared local OTel/Victoria stack
├── AGENTS.md                    # Maintainer and agent instructions
└── CLAUDE.md                    # Claude Code alias for AGENTS.md
```

- [Agent Router plugin](plugins/agent-router/) — agent collaboration, shared message boards, wake-ups and schedules; canonical skill maintained in Router.
