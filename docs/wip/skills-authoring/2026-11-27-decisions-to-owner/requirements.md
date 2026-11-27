# Requirements: self-raised decisions go to the owner, not a Chief of Staff

- **Class:** behavior-changing. It alters who receives a decision an agent raises itself, in one shared reference and two skills that restate its routing. No trigger changes.
- **Run kind:** `update`; three named runs over four active files: `practices-show-me-your-work` (its `stop-treatments.md`, with the shared `owner-decision-brief.md` as companion), `design-program`, `domain-code-standards`.
- **Reusable behavior:** This change helps agents reliably sort a decision they raise by whether it can be undone: a two-way door they decide and record, a one-way door they bring up the chain to the owner with its options intact.

## Need and success definition

The principles-use audit (26 Nov) found `owner-decision-brief.md:17` routing self-raised decisions to a "Chief of Staff role, never directly to the owner", and, when none is named and the commissioner is the owner, keeping the brief unsent and replying "with only the recipient gap … never its options or recommendation". The owner's `CLAUDE.md` says "The 🦁 Lead raises things with me. Helpers bring their questions to the Lead." (`devfiles/shared/my_agents.md:113`).

Owner's words, 27 Nov 2026 (typos fixed): "For now I don't want to have a Chief of Staff in the core AGENTS.md file."

Owner's ruling, 27 Nov 2026 (typos fixed), answering review round 4's F2: "If there is a one-way door and a two-way door … a two-way door, we can reverse it, it's fine. You write it down. … If it's a one-way door, yes, you have to ask. And you ask up the chain; if there's no Lead you ask me."

Success:
1. A self-raised decision is first checked for authority: a choice on a line the owner owns, or outside the agent's delegated authority, goes up the chain however reversible it is. Inside that authority, a two-way door is the agent's call: it decides, records the decision and its reason in the trace, and keeps going.
2. A self-raised one-way door goes up the chain as the full brief: the Lead briefs the owner; a helper returns it to the agent that commissioned it; a helper the owner assigned directly returns it to the work's Lead, or briefs the owner when the work has no Lead or delivery to its Lead failed, and says which (owner's ruling above). A Lead that hasn't answered yet is pending, not unreachable.
3. No active skill or shared reference routes a decision through a Chief of Staff or withholds a brief's options from the owner.
4. The owner-asked-directly rule and the PR-shape rule keep their meaning, minus the Chief of Staff.

## Who reaches it

Any agent that loads `owner-decision-brief.md` (every v2 design phase, `role-lead`, `practices-show-me-your-work` stop treatments, `docs-maintain`, `presentation-html` options pages), and agents running `design-program` or `domain-code-standards`.

## Evidence

| Signal | Date | Source |
|---|---|---|
| The conflict between the brief and `CLAUDE.md` | 2026-11-26 | `~/.codex-router/scratch/01a1635f-5d9d-70e4-bfc7-6d97cf0ee4ff/2026-11-principles-audit/report.html`, decision 2 |
| Owner decision | 2026-11-27 | Owner, in the Lead session |
| Owner ruling: one-way vs two-way doors; no Lead → owner | 2026-11-27 | Owner, in the Lead session, answering round 4 F2 |

## Authoring basis

`user-directed intent`.

## Non-goals

- `CLAUDE.md` (`devfiles/shared/my_agents.md`): not changed by this PR. The same door rule is proposed for it in a separate devfiles worktree and PR, so the owner can review each on its own.
- Frozen v1 copies.
- The brief's shape (items 1–7). Which lines the owner owns stays as the brief and `CLAUDE.md` define them; the door rule only sorts self-raised decisions by whether they can be undone.
