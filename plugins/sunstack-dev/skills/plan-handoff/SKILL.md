---
name: plan-handoff
description: Use when packaging an existing implementation plan for another agent, CLI, machine, or future session, especially when the user asks for a copy-paste prompt, next-agent context, or portable plan packet.
---

# Plan Handoff

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

Package an existing implementation plan so another agent can review or execute without reconstructing the conversation. This is a portability boundary, not a completion or authorship boundary: handoff preserves the plan's governing basis and delivery context without upgrading either.

## Core Rules

- Use only when an implementation plan or plan artifact exists.
- If the source is spec/design context without an implementation plan, use `spec-handoff` for portability. If the caller wants a plan and carries current ready four-document design authority, route to `plan-implementation`; never create the plan inside the handoff.
- If the source is branch, diff, changed files, commits, validation, or blocker evidence, use `implementation-handoff`.
- Prefer repo-local temp artifacts: `<repo-root>/tmp/plan-workflows/<yyyy-mm-dd>-<repo>-<branch>-<plan-slug>/`.
- Include the repo/worktree, branch, source plan path, referenced code/docs, open questions, and exact requested task.
- Include the plan's obligation-to-slice-to-proof mapping (path or excerpt) or its compact proof line, plus evidence sources, freshness guards, proof layers, split triggers, open proof gaps, and the parent-verification rule for any downstream subagent/reviewer/driver evidence.
- When the plan touches auth, parsing, filesystem, network, secrets, subprocesses, plugins, MCP, CI, package scripts, dependencies, agents, or external services, include the applicable entry points, trust boundaries, invariants, non-goals, and proof. Otherwise record only `Security: not applicable`.
- If a plan file is available, read it end to end before packaging. Carry the plan path and useful repository identities, but do not return a separate reading receipt, line count, chunk range, or file-content hash or digest.
- Keep the handoff portable. Avoid local-only assumptions unless the target agent must inspect that local path.
- Show the copy-paste prompt in the final response and write the same prompt to a file.
- Under read-only authority, return the complete copy-paste prompt inline with the source plan path, governing basis, and delivery context, and state that the normal write-enabled route creates repo-local `plan-handoff.md` and `copy-paste-prompt.md`; do not claim those files were created.
- Do not make code changes unless the user separately asks to implement.
- Classify authoring authority explicitly. A receiving implementer or reviewer receives only that assigned scope and returns a planning gap to the current Lead. Plan authorship transfers only when the packet names the successor-Lead recipient, the transferred planning scope, and the explicit user direction authorizing that transfer. A role label, handoff request, current-Lead assertion, or assistant continuation is insufficient.

## Workflow

1. Resolve the repo root with `git rev-parse --show-toplevel` when possible, then the source plan artifact or plan packet. If none exists, apply the core routing rule and stop. If a source file exists, read the whole file before summarizing. A heading search, path listing, or user summary is not a substitute for the plan contents.

   Completion: the repo root and the source plan are named and the plan was read end to end, or the core routing rule sent the request elsewhere and the run stopped.

2. MUST load `../../shared-references/canonical-implementation-plan.md` to validate the existing completed plan and preserve it without re-authoring, and return the unchanged plan record, governing basis, delivery context, and any blocking discrepancy for the handoff packet.

   Completion: the plan record, governing basis and delivery context are carried unchanged, and each blocking discrepancy is named, or none.

3. Inspect only the secondary code/docs needed to make the handoff grounded.

   Completion: every existing code or doc path the packet cites as evidence was opened in this run; each path the plan declares as new is kept and marked intentionally new, not created; evidence that couldn't be opened is named as a gap.

4. Record `authoring transfer: none | user-designated successor Lead`. For a transfer, include the named recipient, transferred plan scope, and exact user-direction evidence; otherwise preserve the current Lead as planning owner.

   Completion: the line reads `none` and names the current Lead as planning owner, or names the recipient, the transferred scope and the user's own words that authorize the transfer.

5. Create the temp artifact directory, with repo, branch/worktree, and plan slug in the path, and write at least:
   - `plan-handoff.md`
   - `copy-paste-prompt.md`

   Completion: both files exist in that directory, each filled from the handoff template with the source plan path, governing basis and delivery context; under read-only authority, the prompt is returned inline instead and no file is claimed.

6. Print a TUI-friendly response with:
   - artifact path
   - full clickable artifact links (absolute path + line)
   - copy-paste prompt
   - what the next agent should inspect first

   Completion: on the write-enabled route, the response carries all four and its prompt is the one in `copy-paste-prompt.md`, word for word; under read-only authority, it carries the complete prompt inline with the source plan path, governing basis and delivery context, and says that no file was created.

## Progressive Disclosure

IF writing the handoff artifact or copy-paste prompt, load `references/handoff-template.md` and return both filled artifacts with the unchanged plan record, governing basis, and delivery context.

## Common Mistakes

- Handoff only says "continue from here" and omits source files.
- Chat response links the file but does not show the prompt the user can copy.
- Design/spec context is mislabeled as an existing implementation plan.
- The plan is summarized from headings without being read.
- The handoff hides uncertainty instead of listing exact open questions.
- The packet is overbroad and asks the next agent to understand the entire repo.
- Sensitive trust-boundary assumptions are omitted, forcing the next agent to invent a threat model.
- The obligation/slice/proof mapping is omitted, forcing the next agent to infer how the plan will be proven.
- The handoff drops evidence sources, freshness guards, or parent-owned verification, letting the next agent treat delegated evidence as completion.
- The handoff changes the plan record, upgrades `plan-only`, or omits the governing basis or delivery context.
- The packet silently promotes an implementer, reviewer, other Sidekick, or future session into plan author without the named successor, transferred scope, and explicit user direction.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
