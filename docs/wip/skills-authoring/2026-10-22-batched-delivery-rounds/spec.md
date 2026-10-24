# Batched delivery rounds: build, verify and review once per batch

Status: **proposed**. Lead: 🦁 claude-local `68844339`. Work thread: Workflow improvements board, topic "Skill system: fixes and audits (successor Lead)", root `01a1635f-5d9d-70e4-bfc7-6d97cf0ee4ff`. Source revision read: `6c4809f6` (`origin/main`).

## Targets and runs

Owner plugins: `sunstack-dev` (2.96.0 → 2.97.0; main moved from 2.93.0 before implementation) and `skill-authoring` (0.4.0 → 0.5.0, run R9 only). Each run names one skill target; a shared reference rides with the named skill run that consumes it (review F4). All runs land in one PR and get one implementation review (D1).

| Run | Target skill | Sentences it changes |
| --- | --- | --- |
| R1 | `implement-plan` | `SKILL.md:32` (one finding at a time), `SKILL.md:40` (a completed slice routes to review), `references/execution-and-proof.md:64` (one corrective slice per finding) |
| R2 | `orchestrator-implementation-goal` | `SKILL.md:27` (relaying), `:34` and `:35` (correction, proof and review repeat with no batch); `references/goal-contract-and-routing.md:76-77` (an "accepted implementation finding" routes singly back to review) and `:97` ("After each accepted implementation correction, require fresh affected proof and fresh review coverage") |
| R3 | `role-lead` | `references/working-with-verifier.md:27` (rerun after each correction commit) and the case sentence at `:29` ("A correction then gets its own rerun packet at the new commit."), `references/working-with-implementer.md:9` (early-handback stop condition), `references/working-with-reviewer.md:21` (corrections sent back one at a time) |
| R4 | `role-implementer`, with supporting file `shared-references/implementer-verifier-pairing.md` | `references/working-with-verifier.md:33` (fix, prove and declare a new target per red); pairing `:32` (when a target is declared). The pairing file's other consumer, `role-verifier` (`references/working-with-implementer.md:9`), is read and checked; it needs no edit unless its wording repeats per-commit targets |
| R5 | `implementation-review` | `SKILL.md:64` ("After each correction … another review"), `references/finding-and-reduction.md:112` (undefined "correction pass"), `:126` (new review per accepted correction) |
| R6 | `practices-manage-agents` | `schemas/assignment-fields.ts:134` (`stopCondition` description, inherited by every role packet), `references/delegation-examples.md:44` (three-PR breakdown example) |
| R7 | `plan-implementation`, with supporting file `shared-references/canonical-implementation-plan.md` | `SKILL.md:28` (grouping and PR-topology choice); canonical plan `:53` (PR default); `references/slice-and-proof-design.md:45` gains where a batch boundary falls (F1) |
| R8 | `practices-show-me-your-work` | `SKILL.md:24` (where a workflow correction is recorded) |
| R9 | `skill-audit` (skill-authoring) | `SKILL.md:33` (memory evidence read for the repo only) |

The global prompt rendered by devfiles (`~/.claude/CLAUDE.md`, `~/.codex/AGENTS.md`) also needs changes. It is not a run here; the proposed wording is under "Proposed devfiles wording" for the owner to apply (D7).

## Problem and evidence

On 2026-10-22 a 🦁 Lead in the codex-router project lost a day. Its own account, pasted by the owner into this session: every handback got its own Verifier pass; every fix, and each library change in one PR, got the full check suite, a Verifier pass and a review; it used `gh stack` and rebuilt the stack after each lower-layer change; its packets carried long early-stop lists, so helpers asked about mechanism details; and it reacted to each message as it arrived.

Owner words, as recorded with quotes in the codex-router project's Claude memory (the memory author's generalizations are separate evidence and are not treated as owner policy; original transcripts were not read):

- 2026-09-30, `fewer-prs-consolidate.md`: "next time we can make better PR consolidation, we don't need so many worktrees and PRs, it's pedantic."
- 2026-09-30, `plan-for-milestone-speed.md`: the owner called an 8-PR layer split "negligence".
- 2026-10-16, `decide-mechanisms-dont-ask.md`: "we're getting stuck, we can continue, you can actually start implementing … hilarious you didn't ask me questions for a real architectural issue you asked me before."
- 2026-10-22, `batch-the-three-steps.md`: "make one fucking pr i dont need this … rebuilding it a waste of fucking time"; "the branches are fabricated i dont care how many prs there are"; "every change doesnt need to do this, you could have collated the process still have 3 steps".
- 2026-10-22, `no-relaying-to-owner.md`: "focus on your work i dont need you to be relayer".

The skill text produces that behavior. Each line below was read at `6c4809f6`:

| Behavior | Sentence that causes it |
| --- | --- |
| A review for every slice | `implement-plan/SKILL.md:40` "A completed slice routes to `implementation-review` for independent review." This contradicts the same file's `:33` (assessment and first review after all planned development), the orchestrator's step 4, and `practices-manage-agents`, whose Reviewer rows review "each Project and Milestone, never a single Task or Subtask". |
| A review for every fix | `implement-plan/SKILL.md:32` handles "an accepted implementation-owned review finding" singly, and its `references/execution-and-proof.md:64` selects "one bounded corrective slice" per finding. `implementation-review/SKILL.md:64` says "After each correction inside the accepted boundary, the caller invokes another review". The orchestrator's `references/goal-contract-and-routing.md:76-77` routes an "accepted implementation finding" singly back to the same Reviewer, and `:97` requires fresh review coverage "After each accepted implementation correction" (found by the implementation Worker on 2026-10-24, verified by the Lead). `implement-plan`'s description says "correcting one implementation-owned review finding". `finding-and-reduction.md:126` makes each accepted correction require "a new meaningful review". `:112` counts "after each correction pass", and "pass" is not defined. |
| A Verifier pass for every change | `role-implementer/references/working-with-verifier.md:33` "Fix it inside the slice, prove it again and declare a new target." `implementer-verifier-pairing.md:32` "A new build is a new target". `role-lead/references/working-with-verifier.md:27` "A correction waits for the report, lands as a new commit, and the Verifier reruns against that commit." No skill says when a target should be declared. |
| Stacked PRs | The global prompt: `:250` "stacked PRs are routine", `:327` "dependent slices use `gh stack`", `:420` the stack procedure. `canonical-implementation-plan.md:53` defaults only "one indivisible deliverable" to one PR. `plan-implementation/SKILL.md:28` invites a choice among PR topologies. The worked example at `delegation-examples.md:44` is "a breakdown with three PRs". |
| Helpers asking about mechanisms | `role-lead/references/working-with-implementer.md:9` and the `stopCondition` field (`assignment-fields.ts:134`) define only "when to hand back early". The general rule "Decide and record instead of asking" (global prompt `:168`) does reach Codex helpers, but the packet's specific list is newer and more concrete, so it wins. |
| Relaying and no pacing | `orchestrator-implementation-goal/SKILL.md:27` already says the Lead "does not relay every internal progress turn". The global "Provide inline progress updates" (`:185`) and the harness's narrate-each-chunk instruction push the other way. No skill says to act on handbacks at batch boundaries. |
| The corrections never reached the skills | The owner rules live only in codex-router's project memory. `~/dev/memory-logs/skills/log/` has no entry for batching, restacks or relaying (searched 2026-10-22). `skill-audit/SKILL.md:33` reads "targeted `MEMORY.md` hits for the repo, plugin, or workflow", so an ai-tools audit never sees another project's memory. |

`principle-verify-before-accepting` already permits the proportionate reuse that batching needs: "A newer commit does not by itself invalidate prior evidence" and "require the evidence that proves the claim, not ceremonial checks". The procedures above override it.

The 🦉 Advisor (codex-local `01a14e6a`, `advisor-second-look.md` in the board root's scratch) independently found the `implement-plan:33` versus `:40` contradiction and added two constraints this spec adopts: batch before declaring the target rather than weakening target immutability; and treat the memory author's "How to apply" as separate from the owner's quoted words.

## Success definition

When a Lead runs delivery, the expensive steps (Verifier observation, independent review, Lead assessment) happen once per batch, not once per change. Nothing is dropped: every required observation, review and proof still runs, and the proof a batch affects is refreshed.

- **A batch** is the work between two observation points. It ends at the first of three points: the end of the assigned set; a required independent observation the plan places before dependent work (a Verification Design row or an integration gate scheduled inside the assignment); or every accepted finding from one review result applied together at one head. One PR can hold several batches; local proof and integration gates keep their timing.
- **One deliverable is one PR by default.** Dependent work joins it by merge, not by restacking.
- **Helpers** make the reversible choices their role and assignment already delegate, record them, and hand back once per batch. For an Implementer that means mechanism details inside the plan; it stops early only for a design break, a public-contract change, a decision that belongs to the owner, or something destructive. An Operator still returns every exception its procedure does not prescribe, as its role says.
- **The Lead** acts on helper messages at batch boundaries and tells the owner only about milestones, owner decisions and blockers.
- **Owner corrections about how agents work** are recorded where skill audits look for them.

Situations a reader can check:

1. A review returns four accepted findings. The Implementer applies all four, builds once, declares one Verifier target, and the same Reviewer re-reviews once.
2. An Implementer meets three reds inside its slice. It fixes all three and declares one new target after the last fix, not three.
3. A feature plan has dependent parts. The plan picks one PR unless the owner asked for a split or one PR would be too big to review in one pass.
4. An Implementer's packet stop condition lists the four stop kinds and any contradictions the slice names, and tells it to decide and record the mechanism choices inside the plan. An Operator watching CI that meets an unprescribed failed check returns it to its commissioner rather than repairing it.
5. A Lead receives six progress messages from helpers. It relays none of them to the owner and acts when a batch completes or a helper is blocked.
6. An assignment holds slices A then B, and the plan schedules an independent observation of A before B starts. The Implementer closes a batch after A, declares one target for the observation, and starts B only when the gate allows. With no such gate, A and B form one batch and one target.

## Decisions

Defaults taken, each with its reason. The owner may strike any row.

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | One spec, nine runs (eleven before review F4 attached the two shared-reference runs to named skills), one PR, one spec review and one implementation review after all runs land | The owner's batch rule applied to this change itself: "every change doesnt need to do this" |
| D2 | Authoring basis is user-directed intent from the owner's quoted corrections, with the codex-router failure as evidence. No reproduction run | Owner, this session: "we arent doign pressutre testing" |
| D3 | One PR is a default, not a ban. Split when the owner asks, or when one PR would be too big for one review pass | The owner said "i dont care how many prs there are" and objected to fabricated branches and rebuild cost. The Advisor cautioned that the memory's "never restack" is its author's generalization |
| D4 | A batch is the assigned set at its handback head, or one review result's accepted findings at one head. A Verifier target is declared only at a batch boundary; intermediate commits are not targets. Target immutability stays | Advisor point 1; keeps the observation honest while removing per-commit reruns. Superseded by D11 |
| D5 | A stop condition has two halves: "stop for" (design break, public-contract change, owner decision, destructive action, plus slice-named contradictions) and "decide and record" (everything else) | Owner 2026-10-16; the packet is where helpers read their rules. Superseded by D12 |
| D6 | The Lead acts on helper messages at batch boundaries or on a blocker, and tells the owner only about milestones, owner decisions and blockers | Owner 2026-10-22: "focus on your work i dont need you to be relayer" |
| D7 | Global-prompt changes are proposed wording for devfiles, applied by the owner, not edited from here | The devfiles prompt belongs to its own checkout; standing rule to describe devfiles template changes in chat first |
| D8 | Each new rule is written as one clear, checkable sentence, but no `sunstack-rule` markers are added now | A later Router-side rule check can consume them. The skill-rules lint pilot owns markers and is mid-flight in another worktree |
| D9 | A correction about how agents work is recorded in the skill-failure log that standing instructions name, as well as in any project memory. `skill-audit` reads that log and other projects' memories as candidates, and checks the owner's own words before a candidate becomes skill text | The root cause: corrections stayed in one project's memory. The Advisor cautioned that sweeping is not promotion |
| D10 | No trigger or description changes in any run | The skills still load at the right moment; the defect is in their bodies |
| D11 | Supersedes D4 (2026-10-22, spec review F1). A batch ends at the first of: the end of the assigned set, a required independent observation the plan places before dependent work, or one review result's accepted findings at one head. Several batches may share one PR. The target is declared only at a batch boundary, and target immutability stays | Planning puts each Verification Design row in the slice where it can first pass (`slice-and-proof-design.md:45`), and integration gates run before dependent work (`execution-and-proof.md:58`). A batch that ran to the end of the set would skip or stall those gates |
| D12 | Supersedes D5 (2026-10-22, spec review F2). A stop condition has two halves: "stop for" (the cases the role returns: for an Implementer, a design break, public-contract change, owner decision, destructive action, plus slice-named contradictions) and "decide and record" (only the reversible choices that role and assignment already delegate). An Operator's exceptions still return to its commissioner | `stopCondition` lives on the shared `JobBase` that every role packet inherits, and `role-operator` returns unprescribed failures rather than repairing them |
| D13 | The devfiles stack-permission exception covers a stack chosen under D3 by either branch, owner request or review size (spec review F5) | Otherwise a Lead's permitted size split needs an owner interruption for routine stack maintenance |
| D14 | Narrows D10 (2026-10-24, implementation pre-read). `implement-plan`'s description changes "correcting one implementation-owned review finding" to "correcting the implementation-owned findings of one review result". The loading condition is the same work; only its unit changes | A trigger that says "one finding" invites the per-finding loop the spec removes. Its routing effect needs the trigger-routing check in re-review |
| D15 | 2026-10-24: the owner asked for specs for all improvements ("lets make all spec for imprvement"). S1 implementation waits until the full improvement spec set is written and reviewed together; S1 joins that set's single review round | One review round over the whole set, the owner's batch rule applied to the specs; S1 had not started editing (the Worker paused before its first edit). Superseded by D16 |
| D16 | Supersedes D15 (2026-10-24). The owner, on this spec's page: "i agre with this make worktres and sperate prs for this for devfiels and susntack". S1 proceeds now, ahead of the set: the skill runs R1–R9 in one sunstack PR (worktree `ai-tools.skills-batched-delivery-rounds`, branch `skills/batched-delivery-rounds`), and the proposed devfiles wording in a separate devfiles PR (worktree `devfiles.prompt-one-pr-default`, branch `prompt/one-pr-default`). The revision since round 2 gets a bounded round-3 check by the same review lead before any skill file is edited | The owner's explicit approval and delivery shape. The devfiles wording is unchanged since round 2's acceptance, so it doesn't wait |

## Per-run surface allocation

The trigger is unchanged in every run (D10), except R1's one description wording (D14).

One home for each new meaning: `finding-and-reduction.md` owns "correction pass" (R5); `implementer-verifier-pairing.md` owns when a target is declared (R4); `slice-and-proof-design.md` owns where a batch boundary falls in a plan (R7). Other runs use those terms and link to their home rather than restating them.

- **R1 `implement-plan`.**
  - Main path: step 7 applies all accepted implementation-owned findings from one review result as one correction pass, refreshes the affected proof once and returns once. Each finding keeps its admission, semantic routing and affected-proof mapping.
  - Boundaries `:40` changes to "completed planned development returns to the orchestrator's assessment before independent review", consistent with `:33`.
  - Step 5 gains one sentence: declare a Verifier target at a batch boundary (D11).
  - Depth: `references/execution-and-proof.md:64` selects one bounded corrective slice per correction pass, not per finding; its admission paragraph stays per finding.
  - Trigger (D14): the description's "correcting one implementation-owned review finding" becomes "correcting the implementation-owned findings of one review result".
  - Proof: static.
- **R2 `orchestrator-implementation-goal`.** Main path: steps 5 to 7 return one review result's accepted findings as one correction set, and the same Reviewer checks the corrected head once. Step 1 gains a pacing sentence (D6). Step 3 notes that one deliverable is one PR by default (D3). Depth: `references/goal-contract-and-routing.md:76-77` routes "accepted implementation findings from one review result" as one correction pass back to the same Reviewer once, and `:97` requires fresh proof and review coverage after each correction pass. Proof: static, including the routing reference in the per-finding source search.
- **R3 `role-lead`.** Depth only:
  - `working-with-verifier.md:27`: corrections accumulate until the batch closes (D11), then land at one head and get one rerun; the case at `:29` ends with one rerun packet for the batched corrections.
  - `working-with-implementer.md:9`: the two-part stop condition for an Implementer (D12).
  - `working-with-reviewer.md:21`: send the whole correction pass back once, with what changed.
  - Proof: static.
- **R4 `role-implementer`, with `implementer-verifier-pairing.md`.**
  - `working-with-verifier.md:33`: fix all reds the observation found, then declare one new target.
  - Pairing `:32` keeps "a new build is a new target" and adds when to declare one: at a batch boundary (D11).
  - The pairing file's consumers are `role-implementer` and `role-verifier`, exactly as its consumer list says. Read `role-verifier/references/working-with-implementer.md` and edit it only if it repeats per-commit targets; the consumer list stays as is.
  - Proof: static.
- **R5 `implementation-review`.**
  - `SKILL.md:64` changes "After each correction" to after each correction pass.
  - `references/finding-and-reduction.md` defines a correction pass once: all accepted implementation-owned findings of one review result, applied at one head. The new meaningful review at `:126` happens once per pass, and convergence counting at `:112` counts passes.
  - Proof: static, plus a source search of every active caller for a remaining per-finding review return.
- **R6 `practices-manage-agents`.**
  - The `stopCondition` description at `assignment-fields.ts:134` names two halves, "stop for" and "decide and record within what the role and assignment delegate". It is the shared field, so it stays role-neutral; each role's charter and reference supply its own list (D12). `role-operator` is unchanged and keeps returning exceptions.
  - The example at `delegation-examples.md:44` is rewritten so its main point shows one PR carrying dependent slices, with separate PRs kept for genuinely independent work.
  - Proof: the existing packet tests (`tests/skills/lib/agent-job-packet.test.ts` and the contract suite).
- **R7 `plan-implementation`, with `canonical-implementation-plan.md`.**
  - Main path `:28`: one deliverable is one PR; split only under D3's conditions and record why.
  - Canonical plan `:53` widens "one indivisible deliverable defaults to one PR" to "one deliverable defaults to one PR; dependent work joins it by merge".
  - `references/slice-and-proof-design.md` near `:45` names where a batch boundary falls: after the slice that earns a Verification Design row or integration gate that dependent work waits on (D11).
  - Proof: static.
- **R8 `practices-show-me-your-work`.** "Keep the owner's asks" gains one sentence: a correction about how agents work in general is also recorded in the skill-failure log that standing instructions name (D9). Proof: static.
- **R9 `skill-audit`.** `:33` adds the skill-failure log and other projects' memory notes as candidate evidence, verified against the owner's own words before use (D9). Proof: static.

## Authoring basis and proof plan

Basis: user-directed intent (D2). The success definition above needs the owner's approval before any skill file is drafted. Claim ceiling: "drafted from approved intent; behavior not yet evaluated". No run claims that a Lead now batches.

Static proof for the PR:

- `pnpm --dir tests/skills test` (existing contract tests), with pass and fail counts and exit code;
- `claude plugin validate .`;
- a link and anchor check over the changed files;
- a source search showing the replaced sentences are gone and that no surviving sentence sends a single slice or a single finding to independent review.

Named proof gap: no fresh-agent run shows a Lead batching. That stays open until the owner commissions behavior evaluation; pressure testing is excluded for now.

## Coordination

- **Base:** `skills/next-fixes-and-audits` at `6c4809f6` (equal to `origin/main` at writing). Re-checked 2026-10-24 before editing: fast-forwarded to `f61b35bc` (#156, #160, #161, #162 landed); every target line still matches.
- **Owner approval:** 2026-10-24, "yes thse are what we want to spec out … yes you are in charge in general", taken as approval of this spec's success definition and decisions.
- **Pending elsewhere:**
  - The lint pilot in `/Users/shravansunder/dev/ai-tools.feat-skill-rules-sunstack-lint` has dirty edits to `skill-authoring/skills/skill-creation`, rules files and CI, and will bump `skill-authoring` too. R9 touches a different skill; if both bump 0.4.0, whichever lands second takes the next version through a merge.
  - The AgentStudio plugin work in #156 does not overlap.
- **Contract-test strings to keep** (found by the implementation Worker in `tests/skills/lib/minimal-planning-delivery-contract.test.ts`): `plan-implementation/SKILL.md` "Choose the smallest coherent vertical grouping", "materially different groupings or PR topologies", "pick one and record the choice, the alternatives, and the reason in the plan"; `canonical-implementation-plan.md` "picks one, records the choice, the alternatives, and the reason in the plan, and returns `ready`" and "PR topology:"; `orchestrator-implementation-goal/SKILL.md` "A milestone, completed slice, or phase return is a checkpoint"; `implementation-review/SKILL.md` "The convergence rule and the accepted boundary live in `references/finding-and-reduction.md`"; and the convergence and accepted-boundary sentences of `finding-and-reduction.md` verbatim. A run that must change one of these updates the test in the same change and says so.
- **Implementation:** Opus native Workers write the skill text (standing owner rule for skill writing). The Lead assesses the whole diff once. One independent implementation review by `skill-review` on Sol xhigh, then PR wrap-up.
- **Version and changelog:** `sunstack-dev` 2.97.0 and `skill-authoring` 0.5.0 in all three plugin manifests each and in the three marketplace manifests that carry them. One dated entry, `docs/changelog/2026-10-24-batched-delivery-rounds.md`, indexed newest-first in `docs/changelog/README.md`. The cache refresh happens after merge.
- **Verifier pairing:** the Opus native Worker writes all nine runs as one batch (standing owner rule for skill writing). Per `role-lead`, the form override keeps the pairing, so one Sol Verifier Sidekick observes the batch once at its handback head: the static proof plus a test check of what the proof covers. A native Worker has no Router address, so the Lead relays between them; that contract gap is recorded in the trace. Then the Lead assesses the whole diff once, and the independent implementation review follows.

## Non-goals

- Dropping or narrowing any Verifier observation, review or proof obligation.
- Changing triggers or descriptions, except `implement-plan`'s one description wording (D14).
- Building Router-side rule checks, host hooks, or a lifecycle contract. That is a separate design; this spec only writes rules in checkable form (D8).
- The design-document presentation work, the pstack/Matt learning pass, and the meaning of "how the sessions use the design". These are parked owner questions.
- Pressure tests or behavior evaluations.
- Editing the devfiles prompt from this checkout.

## Proposed devfiles wording (owner applies)

| Location in the rendered global prompt | Today | Proposed |
| --- | --- | --- |
| `:327` (Agent Studio worktrees) | "Use worktrees for independent parallel tracks; dependent slices use `gh stack`." | "Use worktrees for independent parallel tracks. One deliverable is one PR by default; dependent work in it lands by merge. Use `gh stack` only when the owner asks for split PRs, or when one PR would be too big to review in one pass." |
| `:420` (Stacked PRs bullet) | "When designing branches for dependent work, use a linear `gh stack` …" | "When a split into stacked PRs has been chosen, use a linear `gh stack` …" (rest unchanged) |
| `:250` (Destructive operations) | "Exception: stacked PRs are routine. `gh stack` operations on your own stack … need no permission." | "Exception: on a stack chosen under the split rule (owner request, or one PR too big for one review pass), `gh stack` operations on your own stack … need no permission." (D13) |
| `:185` (Execution) | "Provide inline progress updates — brief notes on what you're doing and why …" | Keep the sentence, then add: "Don't relay or summarize helper messages; report finished milestones, owner decisions and blockers." |

## Run status

| Run | State | Evidence |
| --- | --- | --- |
| R1 | implemented | `plugins/sunstack-dev/skills/implement-plan/SKILL.md` (description, steps 5 and 7, Boundaries), `references/execution-and-proof.md` (Fix an Accepted Review Finding) |
| R2 | implemented | `plugins/sunstack-dev/skills/orchestrator-implementation-goal/SKILL.md` (delivery loop steps 1, 3, 5, 6, 7), `references/goal-contract-and-routing.md` (routing row for accepted implementation findings; Verify, Correct, and Recover) |
| R3 | implemented | `plugins/sunstack-dev/skills/role-lead/references/working-with-verifier.md` (While it observes, rule and clean case), `working-with-implementer.md` (Commission stop condition), `working-with-reviewer.md` (Reading findings) |
| R4 | implemented | `plugins/sunstack-dev/skills/role-implementer/references/working-with-verifier.md` (Act on what comes back), `plugins/sunstack-dev/shared-references/implementer-verifier-pairing.md` (One target per observation); `role-verifier/references/working-with-implementer.md` read, no per-commit target, unchanged |
| R5 | implemented | `plugins/sunstack-dev/skills/implementation-review/SKILL.md` (Remediation Boundary), `references/finding-and-reduction.md` (correction pass definition before Convergence; affected-coverage paragraph) |
| R6 | implemented | `plugins/sunstack-dev/skills/practices-manage-agents/schemas/assignment-fields.ts` (`stopCondition` description), `references/delegation-examples.md` (Implementation: dependent slices in one PR) |
| R7 | implemented | `plugins/sunstack-dev/skills/plan-implementation/SKILL.md` (Plan the Change step 3), `references/slice-and-proof-design.md` (Match Proof to Each Change, batch boundary paragraph), `plugins/sunstack-dev/shared-references/canonical-implementation-plan.md` (Delivery Intent and Grouping) |
| R8 | implemented | `plugins/sunstack-dev/skills/practices-show-me-your-work/SKILL.md` (Keep the owner's asks, first bullet) |
| R9 | implemented | `plugins/skill-authoring/skills/skill-audit/SKILL.md` (Workflow step 2) |

## Review record

Spec review round 1 (2026-10-22). Review lead: 🔎 Reviewer Sidekick codex-local `01a163c8-88f6-70e2-9b6a-3e7019d65778`, with two stage reviewers on Sol xhigh. Target revision: sha256 prefix `a4f693a7cfc85406`. All four required checks complete (mental-model-fit, depth-coverage, trigger-routing, rule-agreement). Verdict `targeted-revision`; implementation decision `revise-first`. Report: `/Users/shravansunder/.codex-router/scratch/01a1635f-5d9d-70e4-bfc7-6d97cf0ee4ff/batched-delivery-spec-review.md`.

Findings, each re-opened at its anchor by the Lead and accepted:

| Finding | Correction in this revision |
| --- | --- |
| F1 batches must end at required observation gates | Success definition batch bullet and situation 6; D11 supersedes D4; R7 names the boundary in `slice-and-proof-design.md` |
| F2 autonomy stays inside each role's authority | Helper bullet and situation 4; D12 supersedes D5; R6 keeps the shared field role-neutral; `role-operator` unchanged |
| F3 two more per-correction procedures | Problem table row; R1 adds `execution-and-proof.md:64`; R5 adds `implementation-review/SKILL.md:64`; "correction pass" has one home |
| F4 shared files need a named skill run | Runs renumbered to nine; pairing rides with R4, canonical plan with R7 |
| F5 stack permission must cover both split branches | Devfiles `:250` row; D13 |
| F6 pairing consumers are Implementer and Verifier | R4 names both consumers and leaves the consumer list unchanged |

Spec review round 2 (2026-10-22), same review lead, bounded verification of the corrected anchors at sha256 prefix `41825023b3421341`. F1–F6 verified closed; open findings 6 → 0; no recurrence, no new findings, no blocker overrides open. Verdict `great`; implementation decision `accepted-to-implement`. Report: `/Users/shravansunder/.codex-router/scratch/01a1635f-5d9d-70e4-bfc7-6d97cf0ee4ff/batched-delivery-spec-review-round-2.md`.

Accepted revision label: `41825023b3421341`. Later edits to this review record and run status are process-only and keep the acceptance; any change to meaning returns to spec review. Separate prerequisite: the owner's approval of the success definition and decisions, which review acceptance does not supply.

Revision after acceptance (2026-10-24). The implementation Worker's pre-edit read found two per-finding routes the spec missed (`goal-contract-and-routing.md:76-77`, `:97`) and a case sentence that would contradict R3 (`working-with-verifier.md:29`); the Lead verified all three. This revision adds them to R2 and R3, adds D14 (one trigger wording) and D15 (S1 waits for the full improvement spec set), and records the contract-test strings. These change meaning and scope, so the round-2 acceptance no longer covers the current text. D15 first held the spec for the improvement set; D16 (the owner's approval on 2026-10-24) superseded it with a bounded round-3 check before implementation. No skill file was edited.

Spec review round 3 (2026-10-24), same review lead, both stage reviewers refreshed, all four checks complete. The added R2 and R3 allocations pass, and D14's trigger routes correctly (singleton results and near misses checked). F1–F6 remain closed. One new minor finding, F7: lines 95 and 161 still said no trigger or description changes; both now name the D14 exception, and D10 keeps its history with the narrowing marked. Report: `/Users/shravansunder/.codex-router/scratch/01a1635f-5d9d-70e4-bfc7-6d97cf0ee4ff/batched-delivery-spec-review-round-3.md`. F7's corrected anchors go back to the same review lead for direct closure.

F7 closure (2026-10-24), same review lead, at sha256 prefix `7e14076cd35af01e`: F1–F7 all closed, four checks complete, no recurrence. Verdict `great`; implementation decision `accepted-to-implement`. Report: `/Users/shravansunder/.codex-router/scratch/01a1635f-5d9d-70e4-bfc7-6d97cf0ee4ff/batched-delivery-spec-review-f7-closure.md`. Accepted revision label: `7e14076cd35af01e`.
