# AI Tools: Agent Instructions

This repository contains personal Codex and Claude Code plugins.

## Repository Overview

**Purpose**: AI development tools distributed through local plugin marketplaces.

## Repository Structure

```
ai-tools/
├── .agents/plugins/marketplace.json  # Codex plugin marketplace manifest
├── .claude-plugin/marketplace.json   # Claude Code plugin marketplace manifest
├── .cursor-plugin/marketplace.json   # Cursor plugin marketplace manifest
├── plugins/                          # Plugin sources
│   ├── ai-scaffold/                  # Project scaffolding (biome, ruff, vitest, pytest)
│   ├── dev-workflow-tools/           # Common tool skills, including Peekaboo UI testing
│   ├── sunstack-dev/                 # Engineering roles, phases, practices, domains and principles
│   └── skill-authoring/              # Skill creation, rules, review, and audit
├── observability/                    # Shared local OpenTelemetry and Victoria stack
├── agent-scripts/                    # Host agent scripts (not plugin skills)
│   ├── stop-review/                  # Luna Stop-review; deploy-home-hook.sh copies runtime to ~/.agents/stop-review
│   └── lint-changed/                 # Changed-file lint/format Stop hook; nested Stop fails open
├── AGENTS.md                         # Agent instructions (this file)
└── CLAUDE.md → AGENTS.md             # Symlink for Claude Code
```

## Plugin Skills

Codex skills are delivered by installed Codex plugins. Do not add runtime sync scripts or symlink-based delivery into consumer projects. Plugin installation remains the delivery mechanism.

Claude Code can load the same skill tree when a plugin also has `.claude-plugin/plugin.json`. Keep shared workflow skills under the plugin that owns them.

## Architecture and source owners

Read [docs/architecture/README.md](docs/architecture/README.md) for the current system model, [skill-system.md](docs/architecture/skill-system.md) for layers, roles and the four-document workflow, and [skill-standards-linter.md](docs/architecture/skill-standards-linter.md) for executable standards and their proof limits. Runtime instructions stay in their owning skills and shared references.

Keep the current inventories in [sunstack-dev/README.md](plugins/sunstack-dev/README.md) and [skill-authoring/README.md](plugins/skill-authoring/README.md). Historical proposals do not override shipped source.

## Agent Delegation

For helpers, sessions and their models, use `practices-manage-agents`; for Router sessions, boards and messages, use `agent-collaboration`.

## Skill work

`AGENTS.md` is the repo operating map for skill work. It should tell agents how to work here, which skill owns the next decision, and where deeper instructions live. It should not duplicate the full manuals from meta-skills.

Home: `~/dev/memory-logs/skills/` (clone of https://github.com/ShravanSunder/memory-logs)

| Need | Write here |
| --- | --- |
| Recurring skill/agent failure | `log/` (follow `FORMAT.md`, reuse matching entries) |
| One session went wrong | `investigation/` |
| Lessons mined from transcripts | `lessons/` |
| Evidence for a named skill-change | `authoring/<yyyy-mm-dd-name>/` |
| What to do next | `backlog/` |

In this repo, only the design set for a skill change belongs under `docs/wip/skills-authoring/<yyyy-mm-dd-name>/`. When a signal is ready to change a named skill, `skill-audit` classifies, `skill-design` writes the design set, and `skill-creation` writes the skill's files from its accepted design.

Skill work in this repo uses the `skill-authoring` plugin (`plugins/skill-authoring/`):

| Need | Skill |
| --- | --- |
| Carry one skill change from design to release | `skill-authoring:skill-orchestrator` |
| Design one skill change and write its design set before its files change | `skill-authoring:skill-design` |
| Write one skill's files from its accepted design, or make a mechanical edit | `skill-authoring:skill-creation` |
| Decide which of a skill's standards become checked `sunstack-rule` rules, mark them, and prove them | `skill-authoring:skill-rules` |
| Independent review of a skill change's design set or skill files, with several reviewer agents | `skill-authoring:skill-review` |
| Which skills to create, update, merge, or skip | `skill-authoring:skill-audit` |

When doing skill work in this repo:

1. Start from a concrete need, repeated failure mode, or user-approved workflow change.
2. If the target is not named, use `skill-audit` for broad portfolio classification or ask for a named target.
3. Use `skill-orchestrator` to carry a named create or update through design, review, writing, proof, and release; `skill-design` for design only and `skill-creation` for writing files from the accepted design or a mechanical edit.
4. Keep `SKILL.md` compact and progressive. Put depth in `references/` and deterministic mechanics in `scripts/`.
5. `domain-skill-crafting`'s `references/proof-claims.md` owns what a behavior-proof claim may say; `skill-design`'s `references/proof-runs.md` owns how a run is carried out.
6. For user-visible plugin behavior changes, update `docs/changelog/`, bump plugin version metadata, and record refresh / reinstall status.
7. After implementation, run fitting proof and assess the current diff and evidence against the accepted need, spec, ownership, complexity, and integration before independent review. Use `sunstack-dev:implementation-pr-wrapup` for push / PR / checks / review-thread / merge-readiness proof. Refresh installed Codex/Claude caches only as an explicit post-push or release proof step; it is a home-level mutation and not a substitute for PR readiness.

For execution ownership, load `practices-manage-agents` and follow it decisively. The Lead remains the default user conversation, and always authors governing Requirements, Specification, Program Design, diagrams, and implementation plans. After a ready Lead-authored plan, the assigned persistent Implementer Sidekick executes the bounded implementation and associated proof directly by default; direct contact with it is available only when the user chooses it. Material design/plan or integration questions return to the Lead with evidence, while the Lead does not relay every internal progress turn. Implementation-associated proof stays with its executor. PR wrap-up may stay with the assigned Implementer Sidekick or run as a prescribed Operator procedure; the Lead retains acceptance and the user retains merge authority.

Other sources:

- `superpowers:writing-skills` is source inspiration for pressure proof and rationalization traps; Matt-style great-skill vocabulary is source inspiration for invocation, hierarchy, steering, and pruning. Normal repo skill authoring routes through `skill-authoring`.
- `skill-creator` (bundled with Codex) owns Codex skill anatomy and generated metadata as platform support loaded through `domain-skill-crafting/references/platform.md`.
- `docs-maintain` owns cleanup, archival, promotion, and durable docs reconciliation after artifacts exist.

## Admired-source provenance (ai-dev-skills)

Upstream skill collections are tracked in a separate meta-repo so this plugin can keep a lite inspiration map while durable provenance lives next to the actual upstream checkouts.

- **Meta-repo:** the separate `ai-dev-skills` checkout; discover its configured location rather than relying on a machine-specific path.
- **Lite in-plugin map:** `plugins/sunstack-dev/docs/source-inspiration-catalog.md` (preserve/avoid + workflow-area overview; not a runtime skill reference)

| Need | Open |
|------|------|
| Quick preserve/avoid reminder | lite catalog above |
| Per-skill borrowed / do-not-copy detail | `ai-dev-skills/docs/my-ai-tools/` |
| What we care about in an upstream tree | `ai-dev-skills/docs/repo-index/` |
| Cheap compare between two pinned SHAs | `ai-dev-skills/docs/repo-index-changelog/` |
| How to bump submodules / keep indexes synced | `ai-dev-skills/AGENTS.md` |

Maintain both. Update `ai-dev-skills` for path-level mappings, pin SHAs, and bump notes. Refresh the lite catalog here only when the high-level preserve/avoid or workflow-area story changes. Do not copy upstream skill prose into plugin skills; do not treat inspiration as proof that local behavior works.

## Shared Runtime References

`plugins/sunstack-dev/shared-references/` contains model-readable runtime procedures loaded by two or more active skills for the same cross-skill behavior. Name each file for the specific domain and action it owns, such as `code-review-feedback-handling.md`; do not use generic names such as `common.md`, `workflow.md`, or `shared-rules.md`.

Keep this directory small. Skill-specific stages, lane contracts, packet shapes, schemas, route-backs, proof rules, and examples remain under the owning skill's `references/`. Maintainer documentation belongs in `plugins/sunstack-dev/docs/`; repository tests and evals belong under `tests/`. Do not preserve forwarding stubs when moving a runtime reference: update every active caller in the same hard cutover and let historical artifacts retain their original paths.

Design-view ownership follows the same split: `shared-references/diagram-rendering-and-fallbacks.md` owns runtime medium selection, fallback, semantic preservation, and visual checks; `shared-references/generated-document-visuals.md` owns conditional Image Gen capability, durable asset/embed and pixel/preview procedure; each design skill's `SKILL.md` owns its view predicates, required semantic fields and Lead-authored visual meaning; `docs/diagram-vocabulary.md` is the maintainer index of tokens, altitude, owners, and consumers.

## System Observability Ownership

`observability/` owns the shared local OpenTelemetry and Victoria stack. `sunstack-dev:ops-observability-stack` owns agent-facing query and debugging guidance. Do not move this stack into `devfiles`, and do not duplicate Docker Compose, collector, or generic Victoria query docs into app repos.

### Skill layers

Orchestrators route whole jobs; phases own individual steps. Roles own assigned responsibility and use practices. Practices, operations, audits, presentation and tool manuals do not call upward into phases, orchestrators or roles; role tables and charter values are data exceptions. Phases and orchestrators commission roles through `practices-manage-agents`. Same-layer references and cycles are allowed. Upward work returns the token and payload from `shared-references/phase-return-tokens.md`; the caller selects the next owner within the existing scope.

Principles are the bottom layer: one judgment each, hidden from model invocation and read in full at their citing decision. Domains sit just above them, are hidden from model invocation and are loaded when the subject applies. The [architecture](docs/architecture/skill-system.md#layers-and-calls) explains call forms, role/form/model separation and the dependency rules. Session-level instructions remain outside this graph.

The current design cycle has four distinct documents: Requirements, Specification, Program Design and Verification Design. `shared-references/design-documents.md` owns their meanings, capabilities, chunk boundaries and reading paths. The old five-document drafts are historical. The current trace-storage and reconciliation owner is `practices-show-me-your-work`.

Retired skill source is preserved under `plugins/sunstack-dev/retired-skills/` and is not runtime-discoverable. The old `orchestrator-goal`, `plan-creation-swarm`, `plan-review-swarm`, `implementation-execute-plan`, and `implementation-review-swarm` trees remain there as provenance and never become runtime entrypoints. The active `orchestrator-implementation-goal`, `plan-implementation`, `implement-plan`, and `implementation-review` are new minimal implementations, not aliases or revivals of the retired goal controller, planning swarm, execution controller, or review swarm. The current runtime surface is exactly the active skills enumerated above.

### Changelog Expectations

When a plugin or sidecar change is user-visible, update `docs/changelog/` in the same changeset.

For plugin changes, record:

- marketplace-facing plugin name and new version
- affected skills, commands, hooks, manifests, marketplace entries, and README sections
- user-visible behavior change
- validation commands and results
- refresh/reinstall status for Codex and Claude when applicable

Keep each dated changelog entry to 20 lines or less. Keep entries public-safe: `~/dev/ai-tools` is public; do not include credentials, private machine config, work-fork details, or local cache hashes. Put evidence snippets and longer validation notes under `docs/changelog/references/`.

Use the changelog system as the durable release memory:

- add one dated entry under `docs/changelog/`
- add that entry to `docs/changelog/README.md` newest-first
- use `docs/changelog/references/` only for longer evidence, excerpts, or validation notes
- do not bury release behavior only in chat, commits, or plugin README text

### Adding a New Skill

1. Choose the owning plugin under `plugins/<plugin-name>/`.
2. Create `plugins/<plugin-name>/skills/{skill-name}/SKILL.md` with YAML frontmatter (`name`, `description`).
3. Add references, scripts, or README files inside that skill directory as needed.
4. Bump the owning plugin version.
5. Update `.agents/plugins/marketplace.json` for Codex availability when adding a new plugin.
6. Update `.claude-plugin/marketplace.json` and add `.claude-plugin/plugin.json` only if Claude Code should load the same plugin. Add `.cursor-plugin/` manifests if Cursor should load it.

### Skill Authoring Discipline

Skills encode judgment, house style, and repeatable failure prevention. Prefer improving an existing skill over adding a near-duplicate.

- Treat this section as repo-local guardrails. Use `Skill Work SOP` above and the `skill-authoring` skills before relying on these bullets.
- When creating, editing, evaluating, or pressure-testing one named skill, use the `skill-authoring` skills. `domain-skill-crafting`'s references adapt Matt-style great-skill vocabulary, pressure-proof lessons from `superpowers:writing-skills`, and platform mechanics from `skill-creator`. For broad portfolio questions, use `skill-audit` instead.
- Name skills namespace-first in hyphen-case: lead with the domain family, then the searchable action or role (`implementation-review`, `spec-design`, `plan-handoff`). The namespace table in `plugins/sunstack-dev/README.md` owns the family list.
- Write the frontmatter `description` as a trigger: start with `Use when...`, name concrete situations and symptoms, and do not summarize the workflow.
- Keep `SKILL.md` concise and progressive. Move heavy examples, rubrics, templates, and long prompt packets into `references/`; use `scripts/` for deterministic mechanics.
- Human-facing workflow README files may live inside skill folders when the user explicitly requests them. Keep them concise and non-authoritative: link to `SKILL.md` and its references instead of duplicating the runtime contract.
- Cross-reference other skills by skill name, not fragile installed-cache paths.
- Treat skill writing like TDD for process documentation: first identify the failure the agent shows without the skill (or, for a change drafted from the user's intent, its approved success definition), then write the smallest wording that prevents it or meets it, then retest and close loopholes.
- Capture the rationalizations the agent used to go wrong, especially "I already know this", "this is obvious", "I'll verify later", and "the user probably meant..."; turn those into explicit red flags or gates in the skill.
- For skill behavior changes, record the proof and any named proof gap before rollout.
- Validate each changed skill independently before broad rollout. For workflow skills, include at least one realistic trigger evaluation or copy-paste pressure prompt that proves when the skill should and should not load.
- Keep artifact ownership explicit: spec, plan, research, and debug skills create their lane artifacts for clear substantial work unless the user asks for chat-only/no-files; `docs-maintain` owns cleanup, archival, promotion, and source-of-truth reconciliation after artifacts exist.
- Keep parent/subagent ownership explicit: subagents produce bounded evidence or candidate findings; the parent agent verifies, reduces, and owns the final claim.

Additional standards:
- We use word wrap, you dont have to split lines.

## Plugin Development

### Marketplace

Plugins are distributed through both marketplace manifests when they support both tools:

- Codex: `.agents/plugins/marketplace.json`
- Claude Code: `.claude-plugin/marketplace.json`
- Cursor: `.cursor-plugin/marketplace.json`

```bash
# Validate Claude marketplace manifest
claude plugin validate .

# Inspect Codex marketplace state
codex plugin list --marketplace sunstack --available --json
```

### Plugin Structure

Each plugin lives under `plugins/` and follows the standard Claude Code plugin layout:

```
plugins/<plugin-name>/
├── .codex-plugin/plugin.json     # Codex plugin manifest (when supported)
├── .claude-plugin/plugin.json    # Plugin manifest (name, version, description)
├── .cursor-plugin/plugin.json    # Cursor plugin manifest (when supported)
├── commands/                     # Slash commands (*.md files)
├── agents/                       # Agent definitions (*.md with YAML frontmatter)
├── skills/                       # Skills (subdirs with SKILL.md)
│   └── <skill-name>/
│       ├── SKILL.md
│       └── references/           # Supporting docs for the skill
├── hooks/                        # Hook definitions (hooks.json + scripts)
└── README.md
```

### Key Rules

- Codex local `source.path` and Claude plugin `source` use `./plugins/<name>`. Cursor entries use the directory name relative to `metadata.pluginRoot: "plugins"`; preserve that shipped resolution rather than adding `plugins/` twice.
- `${CLAUDE_PLUGIN_ROOT}` resolves to the cached install path at runtime; use it in hooks and scripts
- Path traversal (`..`) is not allowed in source paths
- Plugin `name` is the cache key for consumers, so changing it breaks existing installs
- Run `claude plugin validate .` after Claude marketplace changes and `codex plugin list --marketplace sunstack --available --json` after Codex marketplace changes

### Hook Development Gotchas

- The `transcript_path` JSONL file uses Anthropic API format: tool usage is `{"type": "tool_use", "name": "Write", "input": {...}}` inside a `content` array. The field is `"name"`, not `"tool_name"`; `"tool_name"` exists only in hook stdin input. Do not grep the transcript for `"tool_name"`.
- Display names differ from tool names. The terminal shows `Create(file)` but the transcript stores `"name": "Write"`, and `MultiEdit` is a separate tool name.
- Plugin files are cached by `version` in `plugin.json`. Changing hook scripts or config without bumping the version means Claude Code uses stale cached files. Always bump version after changes.
- Stop hooks require `"matcher": "*"` in `hooks.json`. Use `bash ${CLAUDE_PLUGIN_ROOT}/hooks/script.sh` (with `bash` prefix) to ensure execution even if permissions are stripped during caching. Check `stop_hook_active` and exit 0 when true to prevent infinite loops. Exit code 2 blocks the stop; stderr is fed back to Claude as the reason.
- To debug hooks, run `claude --debug`, check logs at `~/.claude/debug/`, and grep for `Hook Stop` to see hook output and exit codes.

### Adding a New Plugin

1. Create `plugins/<name>/` with `.codex-plugin/plugin.json` for Codex, `.claude-plugin/plugin.json` for Claude Code, and `.cursor-plugin/plugin.json` for Cursor if needed
2. Add commands, agents, skills, or hooks as needed
3. Add an entry to the matching marketplace manifest
4. Add a `README.md` in the plugin directory
5. Update `plugins/README.md` with the new plugin listing
6. Validate with the relevant plugin CLI
