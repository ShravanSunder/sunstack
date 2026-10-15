# How and why practices: implementation plan

Lead-authored, 2026-10-15. Governing spec: [spec.md](spec.md), accepted to implement by independent spec review on 2026-10-15 (`/private/tmp/2026-10-how-why-practices-review/review-lead-v1.md`). Since acceptance, the spec changed only its delivery wording and run status, which are process changes that keep the acceptance. The owner keeps merge authority.

## Base

- Worktree `/Users/shravansunder/dev/ai-tools.skills-practices-principles`, branch `skills/practices-how-why`, a `gh stack` layer above #132 (`skills/role-skill-promotion`, `77bef11c`), above #131, above `main`.
- `sunstack-dev` starts at 2.78.0 and goes to 2.79.0 in this PR.
- `skill-authoring` 0.2.0 in this worktree carries the citation grammar (`plugins/skill-authoring/skills/skill-creation/SKILL.md`, Call Grammar). The installed 0.1.1 lacks it, so every writer reads the worktree source.
- The verification-practice spec folder stays untracked here. It belongs to the next stack layer.

## Runs and writers

Each run names one skill. Opus 5.5 native Workers write, per the owner's direction ("use opus 5.5 worker with all the skills to write instead of a sidekick"). Each Worker holds the Implementer role in Worker form. The management table admits only the Sidekick form for an Implementer; the owner's direction overrides that for skill writing. Workers don't commit, and none writes outside its run's paths.

| Run | Target and write scope | Starts after | Reads beyond the role skill, skill-creation and the spec |
| --- | --- | --- | --- |
| A1 | create `plugins/sunstack-dev/skills/practices-how/` (`SKILL.md`, `agents/openai.yaml`, `references/behavior-reconstruction.md`, `references/dynamic-path-evidence.md`) | spec commit | `practices-research` as the sibling practice shape; Program Design's `references/current-system-model.md` and `references/lanes/current-system-explorer.md` (the generic teaching A1 takes over); Pstack `how` and its two references at `ecc249f` |
| A2 | create `plugins/sunstack-dev/skills/practices-why/` (`SKILL.md`, `agents/openai.yaml`, `references/rationale-reconstruction.md`, `references/rationale-confidence.md`) | spec commit; runs alongside A1 | `practices-research` and its references (the evidence owner A2 composes); `role-researcher` (source, history and inference labels); Pstack `why`, `epistemics.md`, `source-playbook.md`, `synthesizer-prompt.md` and `investigator-prompt.md` at `ecc249f` |
| A3 | update `plugins/sunstack-dev/skills/program-design/` (`SKILL.md` step 2 and its Bounded Evidence Help lane line, `references/current-system-model.md`, `references/lanes/current-system-explorer.md`, any active caller of removed text) | A1 accepted by the Lead | accepted A1 files; every `program-design` file that names the current-system model; `tests/skills/lib/spec-program-design-user-requirements-contract.test.ts` |
| A4 | update `plugins/sunstack-dev/skills/role-researcher/SKILL.md` (Methods) | A1 and A2 accepted by the Lead; runs alongside A3 | accepted A1 and A2 files; `practices-manage-agents/schemas/role-contracts/researcher-contract.ts` (read only) |

A1 and A2 write disjoint directories. A3 and A4 write disjoint files. No run touches release metadata.

The Lead owns these shared homes and writes them after A1–A4: the `sunstack-dev` version in the Codex, Claude and Cursor manifests and the Claude and Cursor marketplace entries; `plugin.json` keywords; the plugin README namespace map and practice paragraph; the AGENTS.md layer sentence and skill table; the dated changelog entry and its index line; and the lite source-inspiration catalog when the how/why row changes.

## What every writer must hold

- **Meaning:** the spec's decisions H1–H8, the run's row and its proof posture. A writer that finds the spec contradicting current source stops and reports the contradiction instead of choosing.
- **Craft:** `skill-creation` steps 3–5 for the trigger, main path and depth: lens before route, a visible all-run spine, call sites in the load or citation form, completion criteria that demand legwork, references that teach (what to inspect, good and bad, when to stop).
- **Citations:** principle cards are cited, never loaded, in the form `<moment>, <action> ([<judgment>](<relative path>))`, once per decision, only where the card changes the action. From `SKILL.md` the path is `../principle-<name>/SKILL.md`; from `references/` it is `../../principle-<name>/SKILL.md`. Where `practices-research` already cites a card for the same decision, don't cite it again.
- **Layers:** a practice may name practices, `presentation-*`, `ops-*`, tool manuals and principle cards. It never names a phase, an orchestrator or a role skill.
- **Upstream:** Pstack is a source of method, not prose. Write original wording. Don't import Cursor model slugs, always-spawn explainers, fan-out by category, fixed output headings or confidence tiers.
- **Prose:** plain, direct sentences in the owner's register. Old wording in A3 and A4 may be rewritten freely as long as every obligation, return, contract, grant, gate, trigger and route survives. No stock phrases, no em-dash asides, no "not X but Y" framing, no colon reveals, no restating a heading as its first sentence.

## Proof

Static, run by each writer on its own files and by the Lead on the whole diff: `git diff --check`; every relative link in a changed file resolves; no changed practice names a phase, orchestrator or role skill; `pnpm --dir tests/skills run test` and `pnpm --dir tests/skills run typecheck`; `claude plugin validate .` after the Lead's metadata change.

Behavior, at the strength the spec sets. Before any run, the Lead writes the cases and pass checks in `/private/tmp/2026-10-how-why-practices-eval/cases.md`, outside every subject's context. Subjects are fresh Sonnet 5.5 native subagents with no authoring history. Each is told to read the new skill from this worktree and answer a real question, and the Lead judges the actions and anchors in its transcript as well as its final answer.

| Case | Skill | Real question | Passes when |
| --- | --- | --- | --- |
| H-async | how | an asynchronous path in a real owner repository, from entry through queue or event to the observable reply | entry, owners, state or effect and the return or error edge are anchored; inferred edges are labeled |
| H-small | how | one pure function in this repository | short answer, no subsystem survey |
| H-unwired | how | a retired skill in `plugins/sunstack-dev/retired-skills/` | says it is not wired into discovery, with the evidence, instead of explaining it as live behavior |
| W-adopted | why | why pressure scenarios were removed on 2026-10-09 | cites the recorded reason; separates the stated reason from what is still unknown |
| W-unadopted | why | a proposal recorded as open in the decisions history | reports it as proposed, not adopted |
| W-leading | why | the user asserts a wrong motive for the layer rule | tests the assertion against the record and corrects it |
| T-routing | both | five prompts (how-trace, why-history, incident cause, new architecture, a one-fact lookup) against the full `sunstack-dev` description set | how and why are chosen only for their own prompts |

T-routing simulates selection from descriptions. It is not client discovery, and the report says so. No improvement claim is made, so no prior-method control is owed. If a case fails, the owning run gets a correction and the case reruns once.

## Review and delivery

1. The Lead assesses each run's diff against the spec row, the plan and the craft list above before the next run starts on it, and sends corrections to the same Worker.
2. After A1–A4, the Lead writes the release metadata, runs the static proof, then the behavior cases.
3. Independent implementation review through `skill-review`, implementation stage: a review lead plus two reviewer agents with no authoring history, on OpenAI Sol at xhigh. The authors are Claude, so this review supplies the cross-family check the spec review lacked.
4. Commit in run order, push, `gh stack submit`, and leave the PR as a draft until the review returns ship. Then `implementation-pr-wrapup` takes it to merge readiness. No merge, release or cache refresh.

## Deferred and outside this PR

- The verification practice, its role and phase wiring, and `practices-verification-maintenance` are the next layers.
- `ai-dev-skills/docs/my-ai-tools/` provenance entries for the two practices. That repository has another session's staged, uncommitted changes, so the Lead adds the entries only after that work lands.
- Moving `docs/wip/skills-authoring/2026-10-15-principle-citation/handoff/` out of #132 into memory-logs, which is owed before #132 merges. Branch switches wait until no Worker is writing in this worktree.
- Possible later extraction from other phases and roles, recorded in the nine-run phase-composition proposal.
