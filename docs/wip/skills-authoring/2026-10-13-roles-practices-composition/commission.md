# Implementation commission: practices-manage-agents

2026-10-13 · **GO: accepted v5 with the owner Verifier clarification and approved craft fixes.** The existing independent review team completed all four checks and verified every required correction closed. This commission implements one named user-intent skill change, not the broader design-controller replan.

## Assignment

You are the 🐒 Implementer Sidekick. Translate the accepted engineering picture into useful guidance and its narrow typed interface. The role text must help an agent reason about a new case: what matters, what could fool it, which boundary it owns, what to inspect, and why the contrasting example succeeds or fails. Tables and packets support that teaching; they do not replace it.

- Recipient: Claude `67681626-30db-4807-ad65-ce8845d5e2c2`, owner-assigned Main Implementer. Keep its existing model/effort.
- Paired 🔬 Verifier Sidekick: Codex `01a13539-feb2-7df0-ac64-0ef2c6db50b6`, model `gpt-6.1-sol`, effort `xhigh`, fresh history, inspect + granted structural execution. Its assignment is [verifier-commission.md](verifier-commission.md).
- 🦁 Lead: Codex `01a118ee-7a7a-7720-93a9-224143877b04`; governing design, plan, cross-assignment decisions and acceptance stay here.
- 🦉 Advisor: Claude `a6321a2f-3344-435a-bf5e-2283663096e2`; live challenge, no governing authorship or acceptance.
- All use Router service `0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89`, with endpoint `claude-local` or `codex-local` as named above.
- Workstream: this single management-skill update and new PR, closed at implemented/proven handback for Lead assessment. No merge or release is granted.

Both paired sessions already exist. Fill their actual pair references before dispatching work. Share source facts, setup and reproductions directly, and send design/reference breaks to the Lead. An address or prompt-delivery receipt is not evidence of a correct result.

## Governing sources and full reads

Read the whole accepted [spec.md](spec.md), [role-teaching-and-prompts.md](role-teaching-and-prompts.md) and [packet-contract.md](packet-contract.md). Those three form the target accepted by the formal reviewer. The commission sequences their implementation; it adds no role or authority.

Load `skill-creation` for writing and its called references; `practices-collaboration` and `practices-show-me-your-work` for the existing account. Read the full applicable leaves: `principle-build-the-shared-model-first`, `principle-read-ground-truth-first`, `principle-write-for-the-reader`, `principle-types-are-communication`, `principle-separate-the-concerns`, `principle-write-tests-that-can-fail`, `principle-prove-it-works`, `principle-refine-mental-models` and `principle-hold-the-scope`, including conditional depth when the condition holds. Use research or bounded helper management when needed, preserving the assigned approach and responsibilities.

Read current source and local instructions at the implementation worktree, plus the user's TypeScript rules in `~/dev/devfiles/shared/language-rules/ts-rules.md`. Current main/installed baseline is `54a075aa6d873e67953c3456b16beeb835c58eaa` / sunstack-dev 2.75.1. Candidate #122 `e2adb45a535645f4563e778800f397059a7a7974` is selective source evidence, not an approved controller/schema import.

## Worktree and writes

Use `/Users/shravansunder/dev/ai-tools.skills-practices-manage-agents`, branch `skills/practices-manage-agents`. Actual setup was independently inspected at baseline `54a075aa`, with only the two pre-existing untracked owner WIP folders. Recheck cwd, branch, HEAD and dirty state before writing; preserve those folders and never stage them. Do not create another worktree or write on main.

Allowed source writes:

- Rename `plugins/sunstack-dev/skills/manage-agents/` to `practices-manage-agents/`; author its body, seven role teaching/prompt files, execution-forms reference, job-packet teaching, single `schemas/agent-job-packet.ts`, examples, and bounded retained provider/ACP manual corrections.
- Mechanical management-name and responsibility/form corrections in live callers identified by the caller inventory: repo/plugin AGENTS/READMEs, relevant plugin metadata, active skills and their owned references, affected fixtures/directories and their parser test. Re-inventory; preserve procedures and unrelated wording.
- Narrow schema integration in `tests/skills`: matching Zod 4.6.5 dependency/lock/resolution, fitting permanent schema tests, and required TypeScript/Vitest configuration. Keep runtime schema import usable directly on Bun's shared cache, with no package/install tree beside the skill.
- The required version metadata and bounded dated changelog/index entry; requested authoring artifacts in this folder. Local disposable proof output stays in your worktree's `tmp/` or system temporary storage.

The old skill disappears from live discovery with its callers cut over in the same changeset. Historical/retired names remain historical. There are seven roles; Worker and Sidekick are forms. No new `role-*` skills, practice bodies, phase/controller/planner/Router/Jev/eval/Chief-of-Staff redesign, compatibility layer, shared index or runtime sync mechanism.

Private devfiles role/form and naming edits belong to the already approved separate PR lane under that repo's own instructions and commit/publication boundary. Prepare the bounded patch/PR material when authorized there; this commission supplies no new cross-repo commit, push, apply or merge grant. Public delivery must wait for the coordinated release boundary described in the spec.

## Implementation sequence

1. Confirm spec acceptance covers the three current files and that this commission is marked GO. Read current ownership and re-inventory live callers; send any material mismatch to the Lead before consuming it.
2. Rename management and author its visible model and main path. Encode responsibility/form selection, Complete/Cross-domain executor eligibility, guided Operator candidate collection, and charter-granted bounded Luna helper routes exactly as specified. Keep design and acceptance Lead-owned.
3. Write all seven role files from the teaching prototypes, with examples, conditions and ready prompt full reads. Write execution-form detail and meaningful delegation contrasts. Keep the main route visible and the tool manuals at their existing owner.
4. Author one described Zod v4 packet schema with inferred types and real discriminants/payloads. Build object variants before readonly wrapping. Preserve phase-owned returns. Integrate only the existing test seam; use one direct schema/test Zod 4.6.5 resolution. Normal pnpm deduplication of the existing compatible eval core/peer/optional Zod references to 4.6.5 is allowed; inspect and record that bounded lock effect. No alias, override or unrelated dependency bump. Run existing fitting offline lib/typecheck/import proof; eval/model execution stays unrun and explicitly unverified.
5. Cut over live callers/metadata and add fitting permanent structural tests. Update required changelog/version metadata. Provide the paired Verifier the actual diff/source and proof output as soon as there is something concrete to inspect.
6. Run appropriate structural proof, read the resulting diff against the accepted need, and fix bounded defects. Return proof and gaps. After the Lead's substantive assessment, independent implementation review follows; a draft PR may be prepared through the existing wrap-up route when appropriate, with no merge or home-cache refresh.

## Proof and stops

Meaningful schema tests cover a valid Operator procedure vs missing procedure; a valid Implementer Sidekick vs illegal Worker form; a pre-build Verifier challenge without a build vs delivery observation missing its target; and completed helper handback missing evidence vs valid blocked handback. These test interface failures, not the prose word-for-word.

Run fitting affected unit tests, shared TypeScript typecheck, import/Bun smoke, applicable formatter/linter and live caller/metadata/reachability checks. Use repository-root commands targeting `tests/skills`; preserve logs with command, exit code and pass/fail counts. The Verifier judges sensitivity/adequacy against actual source and may use those same established structural commands. Do not manufacture broader runtime proof or duplicate an already adequate run without a specific concern.

No new pressure, trigger-evaluation, E1/compaction, mutation/property or paid inference runs. Prepare any later scenarios only as unrun. Structural success cannot establish trusted role behavior. Name that gap before handback/release and preserve the owner's later release decision.

Stop dependent writing for a governing contract/ownership/scope break; return assumed, found and consequence with decisive anchors. Fix ordinary bounded implementation defects inside the accepted scope. Keep the same session through corrections. Do not replace design intent or weaken required proof to get green.

## Return and coordination

Record consequential work on existing root `01a118f1-aa7e-74cc-9785-b01f77b10a48`, using your own identity and assigned seat. Return a path-first handback with actual branch/HEAD, complete scoped diff, checks and raw output paths, Verifier observations, deviations and unverified limits. The Lead reads that evidence and accepts; Reviewer findings and Advisor agreement do not replace acceptance. No shared index, auto-merge, cache refresh or installed behavior claim.

Current release state: source/spec accepted and execution authorized for the named pair; implementation/proof are not yet established. No merge, release or home-cache refresh grant.
