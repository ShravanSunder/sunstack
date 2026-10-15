---
name: ops-linear-tracking
description: Use when the user asks to create, organize, update, delete, or inspect Linear projects, milestones, issues, dependencies, ticket breakdowns, blocked/unblocked work, or tickets generated from architecture docs.
---

# Operations Linear Tracking Organization

Manage Linear projects, milestones, and issues following the **docs-are-truth, tickets-are-tracking** paradigm. Architecture documents in the repo are the source of truth for design and plans. Linear tickets track progress, dependencies, and what's blocked.

If a ticket states design that differs from its linked doc section, report the doc section and the ticket text that differ to the user or the agent that assigned this work before changing either.

## The Paradigm

**Why this split exists:**

- **Agents lose context between sessions.** Ticket descriptions live in an API — ephemeral. Architecture docs live in the repo — versioned, searchable, durable. A new session reads docs from the repo and has full context. If the spec lived only in tickets, continuity depends on fetching every ticket, which is fragile.
- **Two sources of truth always drift.** If a ticket duplicates a design doc, one becomes stale. Instead, tickets *link to* doc sections. One true place.
- **Different questions, different cadences.** Tickets answer "what's done and what's next." Docs answer "how does it work and why."

## Ticket Anatomy

A well-formed ticket contains:

| Field | Purpose |
|-------|---------|
| **Title** | Concept name — what this deliverable is, not an implementation step |
| **Scope description** | Rough scope, what's in and what's deferred |
| **Doc section references** | Links or section markers (e.g., `§5.2 Method Namespaces`) pointing to architecture docs |
| **Dependencies** | `blockedBy`/`blocks` relations to other issues |
| **Acceptance criteria** | How to verify this deliverable is complete |
| **Checklists** | Implementation steps within the ticket (replaces sub-tasks) |
| **Deferred items** | Explicitly called out: what is out of scope and why (with ticket refs if known) |

See `references/ticket-templates.md` for full examples.

## Structural Principles

1. **Two levels only: milestones and tasks.** Milestones are conceptual phases. Tasks are deliverables within them. No sub-tasks — checklists in the description carry that role.
2. **A task is a concept, not an implementation step.** "JSON-RPC command channel" is a task. "Add error code -32602" is a checklist item in the description.
3. **If two tasks always ship together, they're one task.** The test: can each be delivered and verified independently? If not, merge them.
4. **Dependencies are first-class.** Cross-project and cross-milestone dependencies use `blockedBy`/`blocks` relations. This is how agents determine what's unblocked; a plan can add a delivery check (see Find what's unblocked).
5. **Docs live in the repo, tickets reference them.** Architecture docs at `docs/architecture/` (or project-specific path). Tickets link to section numbers, not duplicate content.

## Tool Routing: MCP vs CLI

Use Linear MCP tools as the primary interface. Fall back to CLI for three specific gaps.

### MCP (primary — ~90% of operations)

| Operation | MCP Tool |
|-----------|----------|
| List/search issues | `list_issues` (filter by project, state, assignee, milestone, label) |
| Get issue details + relations | `get_issue` with `includeRelations: true` |
| Create issue (with deps) | `create_issue` with `blockedBy`/`blocks` arrays |
| Update issue fields | `update_issue` |
| List/get/create/update projects | `list_projects`, `get_project`, `save_project` |
| List/get/create/update milestones | `list_milestones`, `get_milestone`, `create_milestone`, `update_milestone` |
| List teams | `list_teams` |
| Comments | `list_comments`, `create_comment` |

All MCP tools are prefixed `mcp__plugin_linear_linear__`. See `references/mcp-tool-reference.md` for parameter details and usage patterns.

### CLI (gap operations)

| Operation | Command |
|-----------|---------|
| **Add single dependency** | `linear issue relation add <issueId> <relationType> <relatedId>` |
| **Remove single dependency** | `linear issue relation delete <issueId> <relationType> <relatedId>` |
| **List relations** | `linear issue relation list <issueId>` |
| **Delete issue** | `linear issue delete <issueId>` |
| **Delete milestone** | `linear milestone delete <id>` |
| **Start issue (branch + status)** | `linear issue start <issueId>` |

Relation types: `blocks`, `blocked-by`, `related`, `duplicate`.

See `references/cli-reference.md` for full CLI patterns.

### Critical: Dependency Management

**Adding a single dependency — use CLI, not MCP.** The MCP `update_issue` with `blockedBy`/`blocks` **replaces the entire relation list**. To add one dependency without clobbering existing ones, use:

```bash
linear issue relation add LUNA-336 blocked-by LUNA-335
```

**Setting all dependencies at creation time — use MCP.** When creating a new issue, pass `blockedBy`/`blocks` arrays directly — no existing relations to clobber.

**Reading dependencies — use MCP.** `get_issue` with `includeRelations: true` returns the full relation graph.

When the plan's dependencies and Linear's `blockedBy` relations disagree, compare, for each disputed dependency, the plan line that states it (or "inferred from order" when the plan only sequences the work) with the relation Linear lists, before changing either; an inferred dependency never overwrites a listed relation ([read ground truth first](../principle-read-ground-truth-first/SKILL.md)).

## Common Workflows

### Set up a new project

1. `list_teams` → identify the team
2. `save_project` → create project with name, team, description
3. `create_milestone` → create milestones for each phase
4. `create_issue` → create issues within milestones, with `blockedBy`/`blocks`

### Create issues from an architecture doc

1. Read the architecture doc from the repo
2. Identify deliverables (concepts, not implementation steps)
3. Group deliverables into milestones (conceptual phases)
4. Create milestones, then issues referencing doc sections
5. Set `blockedBy`/`blocks` relations based on the dependency graph

When you derive milestones or tickets from a design or plan, trace every scope line, acceptance criterion and Deferred item of each ticket to the doc or plan section it comes from; raise an untraced line, or a deferral of something the doc requires, with the user or the agent that assigned this work instead of writing it ([hold the scope](../principle-hold-the-scope/SKILL.md)).

When a create or relation call errored or timed out after sending, or a breakdown resumes in a project that already has milestones or issues, match each intended milestone, issue and relation to the Linear item it already exists as (adopt it) or mark it absent (create it), before any further create call ([design for failure](../principle-design-for-failure/SKILL.md)).

### Find what's unblocked

1. `list_issues` with project filter and `state: "Ready"` (repeat for `"Backlog"` if needed)
2. For each result, `get_issue` with `includeRelations: true`
3. Issues with empty `blockedBy` or only Done blockers are ready, with one exception: if the plan says the consuming work needs the blocker's artifact delivered (for example, an API deployed to staging), a Done blocker isn't enough: observe that delivery where it runs (the deployed version, the live endpoint, the published package) before calling the issue ready, or report its readiness as unverified and say where you looked ([read ground truth first](../principle-read-ground-truth-first/SKILL.md)).

### Update ticket after implementation

Tick only checklist items you saw completed. When the shipped code does something its linked doc section doesn't say, or leaves out something it says, name what the doc assumed and what the code showed, and decide drift or break: drift leaves the doc standing and the gap open as an implementation obligation that no ticket edit closes; a break means the doc's assumption failed, so name the doc section that must change ([refine mental models](../principle-refine-mental-models/SKILL.md)). Get a break corrected in the doc by its owner, through the user or the agent that assigned this work, before changing the ticket.

Done when each touched ticket links its doc section, its checklist matches what shipped, its blockers match the plan, and any doc conflict is reported rather than edited around.

## Reference Files (read on demand)

These files are not auto-loaded. Read them when you hit these situations:

- **`references/mcp-tool-reference.md`** — Read when you need exact parameter names, response shapes, or filter options for any MCP tool call.
- **`references/cli-reference.md`** — Read when using CLI for relation management, deletion, or `issue start`. Contains exact command syntax.
- **`references/ticket-templates.md`** — Read before creating your FIRST ticket in a session. Contains well-formed examples and anti-patterns to avoid.
