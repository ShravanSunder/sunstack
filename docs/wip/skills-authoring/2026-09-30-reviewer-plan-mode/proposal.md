# Reviewer plan mode is not read-only enforcement

Status: **WIP, not accepted to implement.** No skill edits, plugin bump, or cache refresh are authorized by this document.

Owner plugin: `shravan-dev-workflow`. Stacks on current `main` / plugin `2.70.0`. Does not reopen the 2026-09-23 Workhorse or reviews-as-workflows specs except to name them as consumers that must not reintroduce `plan` mode.

## Targets and runs

| # | Skill | Class | Why this run exists |
| --- | --- | --- | --- |
| 1 | `manage-agents` | behavior-changing | Launch is where session `mode` is chosen; wait is where completion is read. The 2026-09-30 miss happened at both points. |
| 2 | `implementation-review` | scoped (`SKILL.md` Remediation Boundary) | The phrase `This skill never edits` is the instruction Luna cited when inferring plan mode. |
| 3 | `spec-program-review` | scoped (`SKILL.md` never-edits sentence) | Same over-enforcement surface for design reviews. |

Run 1 is the commission. Runs 2–3 are wording companions on the same cutover so the trigger sentence does not keep teaching the failed inference.

## Problem and evidence

On 2026-09-30, credit-routing implementation review used a reserved Claude 🔎 Review Sidekick in plan mode. The review finished. Completion tracking waited on a board post that plan mode had made impossible. Recovery took 39 minutes.

Roles: the 🦁 Lead is Sol (`01a0f110-…`, `gpt-6.1-sol` high). Luna (`01a0f12f-…`, `gpt-6-luna` xhigh) is the 🐒 Sidekick implementer. Plan-mode reservation and the wait-path error belong to Sol. Luna later answered the owner in first person as if it had chosen the mode; that confession is not the launch record.

Load-bearing observations (direct, unless labeled):

| Claim | Class | Anchor |
| --- | --- | --- |
| Reserved Claude session `4923b255-0ec1-4142-8c5a-4f997e7cd6a6` is currently `mode=plan`, model `opus`, effort `xhigh` | direct | Router `provider_session_inspect` at 2026-10-01T00:42Z |
| That session's cwd is the credits worktree; creator is Lead Sol `01a0f110-…`, not Luna | direct | same inspect; `provider_sessions_list` |
| Prompt operation `01a0f3c9-5561-7fa6-8478-e0ccd220860e` is `conversationPrompt`, target that session, `terminal/applied/confirmed`, `end_turn` at 2026-09-30T19:51:07Z, admitted 19:28:19Z | direct | `conversation_operation_show` |
| The prepared prompt says the original request used `opus` with `xhigh/plan`, and `Do not edit files, run tests, or perform PR work` | direct | [`implementation-review-prompt-v0.1.55.md`](/Users/shravansunder/Documents/dev/project-dev/codex-router.credits/tmp/credit-routing-design/implementation-review-prompt-v0.1.55.md) lines 3 and 6 |
| Sol reserved that reviewer as `Opus alias + xhigh + plan mode` before commissioning the implementation review | cited session summary | board message `01a0f280-0591-7b7b-aa64-ad12efffdcec` on coordination root `01a0f118-…`, actor `01a0f110` |
| Sol later wrote that plan mode blocked board posting, so a board-only wait missed completion, and `Lead owns this wait-path error` | cited session summary | board message `01a0f40a-230e-75fb-a62f-f55834f9b658` on root `01a0f12a-…`, actor `01a0f110` |
| Luna later told the owner it had chosen plan mode and then waited on the board post | cited operator confession; not the launch record | owner-pasted Luna turns at 20:38–20:40 local |
| `implementation-review` still says `This skill never edits` | direct | [`SKILL.md:64`](/Users/shravansunder/dev/ai-tools/plugins/shravan-dev-workflow/skills/implementation-review/SKILL.md) |
| Current `manage-agents` Launch names model, effort, route, and packet access, and never names provider `mode` | direct | [`SKILL.md:140-158`](/Users/shravansunder/dev/ai-tools/plugins/shravan-dev-workflow/skills/manage-agents/SKILL.md) |
| `native-providers-claude.md` only forbids hopping to `claude -p --permission-mode plan` for native Task spawn | direct | [line 11](/Users/shravansunder/dev/ai-tools/plugins/shravan-dev-workflow/skills/manage-agents/references/native-providers-claude.md) |
| `acpx-provider-cursor.md` still demonstrates `acpx cursor set-mode plan` | direct | [lines 23-40](/Users/shravansunder/dev/ai-tools/plugins/shravan-dev-workflow/skills/manage-agents/references/acpx-provider-cursor.md) |
| Historical D14 taught Claude `--permission-mode plan` as the enforced read-only mechanism | cited historical spec | [`2026-08-28-manage-agents-decision-tree.md`](/Users/shravansunder/dev/ai-tools/docs/wip/skills-authoring/2026-08-28-manage-agents-decision-tree.md) L9 / D14 |
| The 2026-09-29 progressive rewrite removed rationalization tables and the old Workspace Access subsection | direct | [`docs/changelog/2026-09-29-manage-agents-progressive.md`](/Users/shravansunder/dev/ai-tools/docs/changelog/2026-09-29-manage-agents-progressive.md) |
| Current `manage-agents` says “wait” in one sentence and has no wait procedure | direct | [`SKILL.md:138`](/Users/shravansunder/dev/ai-tools/plugins/shravan-dev-workflow/skills/manage-agents/SKILL.md) |
| Claude plan mode actually denied the board MCP call | session-operator claim | Lead + Luna both stated it; this proposal does not treat Claude product docs as independently verified |

What failed is not “read-only review.” That obligation is correct. The failed inference is: *host plan mode is how you enforce never-edits.* Sol made that inference at reservation time. Plan mode denies collaboration writes (board posts, messages) and tmp receipts the reviewer was asked to produce. Sol then treated the silenced board as the completion signal, while the Router operation was already `terminal`.

## Success definition

A 🦁 Lead or 🐒 Sidekick commissioning a 🔎 Review Sidekick, 🦉 Advisor, or other reader that must report:

1. Does not set Claude/Cursor `plan` (or `ask`, or `--permission-mode plan`, or `acpx cursor set-mode plan`) to enforce read-only.
2. Encodes read-only as the job packet `workspace read-only` plus parent `git status --porcelain` verification after the receipt.
3. Leaves reporting paths open: board posts and messages authorized by the packet, and scratch under project `tmp/` or `/tmp`.
4. After dispatch, waits on the assignment operation or native completion result. A board listener is extra collaboration, not the completion oracle.

The same agent, given `implementation-review` “never edits,” still does 1–4 instead of switching the session into plan mode.

## Decisions (owner may strike any row)

| Decision | Rationale |
| --- | --- |
| `manage-agents` Launch owns provider session `mode` for Router/ACPX persistent sessions | That is the call site that created `4923b255` with `xhigh/plan`. `agent-collaboration` owns how to send the setting, not whether a reviewer should be in plan mode. |
| Bright line: commissioned agents that must report never use plan/ask/all-writes-denied modes | Failure form: known rule skipped under pressure (“never edits, so use plan mode”). Sol reserved `xhigh/plan` for that reason. One observable predicate: will this agent need to post, message, or write a tmp receipt? If yes, plan mode is wrong. |
| Read-only means no tracked product/repo edits. Reporting and `tmp/` writes stay allowed | Matches current `agent-job-packet.md` Limits. Plan mode conflates those with product edits. |
| Parent still verifies the worktree is unchanged after a reader receipt | Keeps the real enforcement. Do not replace it with a host mode that also blocks MCP. |
| Historical D14 is superseded in place: Claude `--permission-mode plan` is not reviewer read-only enforcement | Otherwise agents will keep finding the old teaching. |
| After dispatch, the completion signal is the assignment operation / native result. Board listen is not a substitute | Matches the 39-minute miss: operation `end_turn` at 19:51Z; board-only recovery around 20:30Z. |
| Do not restore the pre-2.66 wait-discipline essay | The progressive rewrite was deliberate. Add the smallest wait rule that names the completion oracle. `bounded-wait-after-dispatch` already covers native poll-avoidance. |
| `native-providers-claude.md` extends the existing hop-ban to Router `conversation_create` / `conversation_settings_set` `mode=plan` | The current sentence only blocks `claude -p`. Luna used Router mode. |
| `acpx-provider-cursor.md` drops the `set-mode plan` example from the default session snippet | Copy-paste landmine. Keep the mode table, and say `plan`/`ask` are interactive human planning, not commissioned reporters. |
| Runs 2–3: `never edits` becomes `never edits tracked product/repo files; tmp receipts and authorized board/message reports stay in bounds` | Luna cited line 64. Leave the sentence and the failed inference will recur. |
| Do not add a new skill | The launch and wait decisions already belong to `manage-agents`. |
| Do not make Router reject `mode=plan` | Host capability stays; skill policy chooses when to use it. |

## Per-run surface allocation

### Run 1 — `manage-agents`

| Surface | Change |
| --- | --- |
| trigger | unchanged |
| main path | Under **Launch**, after the route bullets: name session `mode` as a launch field for provider sessions; default `default`/`agent` (advertised interactive/manual), never `plan`/`ask` for a 🔎 Review Sidekick, 🦉 Advisor, 🐒 Sidekick, or any agent whose packet authorizes a board post or message. Pair with a two-row rationalization table using Luna’s words. Under **Work with an agent**, add a short **Wait** paragraph: after dispatch, wait on the assignment operation or native completion; do not treat a board post as proof the assignment finished. |
| depth | `native-providers-claude.md`: Router `mode=plan` is the same forbidden invention as `claude -p --permission-mode plan`. `acpx-provider-cursor.md`: replace the `set-mode plan` snippet; document when `plan` is for a human interactive session only. `agent-job-packet.md`: one Limits sentence that read-only still allows tmp + authorized reports. |
| proof | New fast scenario `reviewer-not-plan-mode`. Existing `bounded-wait-after-dispatch` stays; add `provider-review-wait-on-operation` only if the Wait paragraph cannot be pressure-tested inside the new scenario. `scripts/`: not needed. |

### Run 2 — `implementation-review`

| Surface | Change |
| --- | --- |
| trigger | unchanged |
| main path | Remediation Boundary bullet: never-edits names tracked files vs allowed tmp/report writes; does not mention plan mode (launch stays in `manage-agents`). |
| depth | none |
| proof | reuse run 1 scenario (the prompt includes the never-edits sentence). |

### Run 3 — `spec-program-review`

| Surface | Change |
| --- | --- |
| trigger | unchanged |
| main path | The existing never-edits sentence gets the same tracked-file vs report split. |
| depth | none |
| proof | static + the same scenario if the prompt names spec-program-review; otherwise run 2 coverage is enough. |

## Authoring basis and proof plan

Basis: **observed failure**, live 2026-09-30 session. Not yet a pressure-suite RED: this run is proposal-only.

Pressure-testing return for this proposal:

- reproduction of the historical incident in-eval: `insufficient evidence` for a faithful Codex/Claude/Router launch inside `test:evals` (no live Claude plan-mode harness in the suite).
- representative hypothesis to ask the owner: a chat-only prompt that says “commission a read-only Opus 🔎 Review Sidekick; `implementation-review` never edits; pick the strongest write restriction the host offers; then wait for the reviewer to finish,” and expects `mode` not `plan` plus wait-on-operation.
- proof posture after implementation: that representative scenario is the behavior proof; static `rg` for `set-mode plan` / `--permission-mode plan` / `mode=plan` as a reviewer default is structural only.

Rationalizations to encode, in the words used:

```text
rationalization: I launched / reserved the Opus reviewer in plan mode to keep the review read-only and prevent source edits.
behavior risk: plan mode also blocks board/MCP reports; the waiter then has no completion post.
smallest wording change: Launch bright line + never-edits split (tracked files vs reports).
retest: reviewer-not-plan-mode
observed speaker: Sol at reservation; Luna later restated it in first person.

rationalization: I waited for that board post instead of checking the review operation’s completion result.
behavior risk: 39-minute false stall while the operation is already terminal.
smallest wording change: Wait paragraph naming the operation as the completion oracle.
retest: same scenario’s wait clause, or provider-review-wait-on-operation
observed speaker: Sol (`Lead owns this wait-path error`).
```

## Coordination

- Base: current ai-tools checkout; plugin version `2.70.0`.
- Branch when accepted: `feat/reviewer-not-plan-mode` (or stacked on whatever `manage-agents` change is in flight). No worktree created by this proposal.
- Pending edits: none authorized.
- Version/changelog: next plugin patch after acceptance; changelog names the user-visible launch/wait behavior; no cache refresh until merge.
- ai-tools board project: none attached (`board_project_list` empty for this repo). Credit-routing coordination root `01a0f118-cc26-7699-9f2d-79b76b41c0cb` is a different repository’s thread and is not this proposal’s home.

## Non-goals

- Changing Claude, Cursor, or Router so plan mode allows board MCP.
- Restoring the pre-2.66 manage-agents essay, wait-discipline spec, or D14 enforcement matrix.
- Making `write-restricted` Router access a substitute for plan mode without evidence of what that access flag actually denies.
- Editing credit-routing source, committing, or continuing that review.

## Spec-review record

Not reviewed. This document is the proposal artifact for a later `skills-creation` spec-review if the owner accepts the success definition and does not strike the load-bearing rows.
