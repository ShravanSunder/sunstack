# Hierarchy, execution, and verified acceptance

**The owner's clarified model:** the Lead plans, verifies, and accepts; the implementation Sidekick writes the implementation and proves it. The concern is a Lead or engineer becoming a relay that advances work without checking it. No recommendation here asks the Lead to take over product implementation.

The [working agreement](role-and-acceptance-agreement.md) records the October 9 discussion as setup proceeds, separating settled responsibilities from the four-tier reference and remaining proof/design questions. This investigation retains its original historical evidence scope.

## What Lauren's example actually establishes

The primary source is [Peter Yang's interview with Peng Zheng and Lauren Tan](https://www.youtube.com/watch?v=xZ5TEaleUdg). Public YouTube auto-captions were obtained without login or cookies, and the relevant windows were read. Auto-caption wording can contain recognition errors. The full source/access ledger is [here](evidence-access.md#local-evidence-004).

| Question | Direct interview support | Remaining limit |
| --- | --- | --- |
| What is the hierarchy? | At [25:33–27:57](https://www.youtube.com/watch?v=xZ5TEaleUdg&t=1533s), Chief of Staff passes work to the engineering lead, which decomposes/delegates to engineering bots; those bots spawn cloud coding agents. Large work can start as phased Notion planning. | No general cloud-agent lifetime contract is shown. The “ephemeral” wording concerns disposable design chats elsewhere. |
| Do supervisors code? | Lauren describes an engineering-lead instruction to “never do work on your own and always delegate”; engineer bots are also described as supervisors. | This is an instruction and described practice. It does not demonstrate technical removal of editing tools. |
| Do the bots check PRs? | At [27:58–28:40](https://www.youtube.com/watch?v=xZ5TEaleUdg&t=1678s), Peter asks whether the bots review returned PRs first; Lauren answers “yeah, essentially.” | It does not identify Matcha as every PR's reviewer, show what it opens, or define cross-ticket integration acceptance. |
| How do they verify behavior? | At [14:49–16:45](https://www.youtube.com/watch?v=xZ5TEaleUdg&t=889s), she describes a Linux VM and local execution daemon enabling own-work verification on her computer. | This is an example, not proof that every change follows one universal test protocol. |
| What is the multi-model eval loop? | At [17:07–17:50](https://www.youtube.com/watch?v=xZ5TEaleUdg&t=1027s), her pstack playbook spawns different-model subagents and checks the intended goal before the PR lands. | The example is a prompt/skill change; a mandatory gate for every engineering PR is not established. |
| Can changes merge before human reading? | Lauren says some PRs auto-merge and she sometimes reads a PR after it lands. | Her exact authorization/controller is not shown. This grants no local merge authority. |
| Do leaf agents lack delegation tools? | No such tool-inventory statement was found in the inspected captions. | Treat it as an unverified proposal, not a fact from the video. |
| How is trust increased? | At [39:34–41:18](https://www.youtube.com/watch?v=xZ5TEaleUdg&t=2374s), observe and correct the task, codify a reusable skill, then promote reliable one-shot behavior to a routine. | This is a gradual trust practice, not evidence of an enforced product state machine. |

The source supports delegated execution **and** bot checking. It does not support the inference that the engineering lead has no checking responsibility, nor does it identify the precise checking owner for every edge. For your workflow, that ownership must come from your own contract and observed execution.

## Your current responsibility split

| Actor | Owns | What cannot substitute for its work |
| --- | --- | --- |
| Lead | Governing design/plan, assignment cut, integration, inspection of current diff and actual proof, disposition and acceptance | Forwarding “done,” counting reviewers, or commissioning independent review before its own assessment |
| Implementation Sidekick | Assigned implementation, fitting proof, corrections, checking any permitted helper contributions | A helper's summary, a green package total for absent scenarios, or a handoff with required proof still missing |
| Bounded Worker | Its assigned task and evidence within the packet | Inventing governing design or passing its task down when it lacks that authority |
| Operator | Exact assigned procedure, observations, exit codes and artifacts | Diagnosing/fixing outside the procedure, interpreting a hook as a fresh scope grant, or treating a nonterminal status as done |
| Independent reviewer | Source-bound challenge, finding reduction, affected review coverage | Repairing the implementation itself or replacing the Lead's acceptance responsibility |
| PR wrap-up executor | Current GitHub gate evidence and authorized publication mechanics | Treating readiness as merge permission |

These are supported by [manage-agents](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/manage-agents/SKILL.md#L84), [implement-plan](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implement-plan/SKILL.md#L14), and [Lead assessment before review](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/orchestrator-implementation-goal/SKILL.md#L30). They are instructions; their presence does not establish live enforcement.

## What “walking the work” should mean here

The Lead should be able to trace one claimed outcome through the changed code and the evidence that observes it. This is useful verification work even while the Sidekick remains the implementation owner.

1. Recover the agreed outcome and current source identity. Determine exactly which slice or integrated result is being accepted.
2. Open the changed owning code and the material call path. Check the boundaries, preserved behavior, and necessary integration against the plan.
3. Open the actual proof artifact and the assertions. Establish what interaction they observe, at which source/head, and what remains mocked, synthetic, blocked, or unrun.
4. Try a concrete false-green countercase: could this still pass if the claimed behavior were absent? Inspect the decisive event, oracle, and failure boundary.
5. Make a stage-limited disposition. Return missing implementation/proof to the same Sidekick; route a design/plan break to its owner; commission independent review only after fitting development/proof assessment.

This does not require the Lead to rewrite code, repeat every green test, or narrate every line. It requires actual inspection at the decisive seam. A record that merely says “Lead inspected” is a claim until the underlying read/action or other direct source evidence is checked.

## What went right and wrong in the inspected records

| Source and episode | What worked | What failed or remained open |
| --- | --- | --- |
| Codex credit-routing pair | Actual diff/source read calls precede the Lead's correction: the notifier signal must be read before a later request can create the same rejection. The Sidekick corrected the proof. | Earlier partial terminal captures and a focused-green fixture could overstate behavior. Full-gate acceptance remained separate. |
| Codex OAuth pair | Lead identified a blank replacement-token parser gap; the Sidekick produced red/green and the historical commit retains the rejection. | Full workspace proof was blocked by disk/linking; reported focused evidence was not promoted to PR readiness. |
| Claude AI Tools #105 pair | Lead inspected returned source and the pre-branch base, decided material rule corrections, submitted its resulting head to independent review, and returned review corrections to the Sidekick. | The Lead also applied two runtime wording edits. Exact historical instructions, the accepted-run spec and the owner's pre-compaction wording were rechecked: Sidekick implementation was expected, but no explicit typing exception was identified. This is a role-fit question, not a proved unauthorized action; current owner intent is Sidekick implementation. |
| Claude Worktree Fork chain | Exact-commit source/fixture inspection and focused real Git integration proof were recorded before bounded acceptance. | The actual writer was a native Claude child, separate from the earlier Router-created storyboard actor. Executor-route authorization is ambiguous. |
| Claude coordination lane | Leads eventually de-duplicated owner questions and distinguished the permission problem from question ownership. | Several sessions asked overlapping questions; message delivery did not complete the underlying task. |
| Sunclaw PR #474 | One exact-head aggregate produced a valid clean receipt; the raw remote log matches the imported artifact, and later local Lead acceptance is separately recorded. | A synthetic Stop-review hook was interpreted as continuation authority. Automated Guardian records allow the path/escalated commands and classify user authorization as high; they are distinct from a fresh human/Lead scope instruction. Test validity and task/role authority remain different claims. |
| Sunclaw PR #463 | Through 2026-10-07 23:34Z the checkpoint said NOT RUN; native failed Operator history contains no tools/results, and the Liaison found no gate artifact. | The fallback was still unstarted at that cutoff. A 2026-10-08 09:09Z checkpoint later claims a start; another status note reports the continuation ended with test_swift_exit=1. Those claims are not a matching-head aggregate receipt; current readiness is unverified here. |

Full evidence and sampling limits: [Codex](evidence-access.md#local-evidence-005), [Claude Code](evidence-access.md#local-evidence-006), [Sunclaw](evidence-access.md#local-evidence-007), and [earlier session cards](evidence-access.md#local-evidence-008). The Codex examples include two episodes under one assignment plus a separate pair; they are not three independent Lead sessions. The Sunclaw native sample has Operator and Liaison histories, not a remote Lead/Sidekick acceptance transcript. Those gate examples record local accepting Leads, separate from the remote execution histories.

The #463 source was updated after the original audit reads. Its [09:09Z start section](evidence-access.md#local-evidence-009) is a later producer claim. A [10:32:55Z status note](evidence-access.md#local-evidence-010) reports that the continuation ended with `test_swift_exit=1`, but does not supply a matching-head aggregate receipt. The named bridge-gate.log, bridge-gate-setup.log and bridge-gate-meta.txt were not found in the local historical-log inventory; the current remote receipt was not reread. The historical pressure case uses the fixed 2026-10-07 cutoff, not a claim that the gate is still unstarted now.

## Hierarchy options and who pays the cost

| Model | Useful property | Cost and risk | Fit for this evidence |
| --- | --- | --- | --- |
| Lead → direct implementation Sidekick, with bounded helpers as allowed | Existing local model; the implementation owner stays close to code and proof, and the Lead owns acceptance | Requires disciplined source/proof inspection and a complete handback; text alone can still be skipped | Retain as the baseline and test its acceptance transitions |
| Lead → engineer supervisor → cloud coding workers | Separates long-lived coordination from isolated execution, as Lauren describes | Adds another handoff/checking boundary; each supervisor needs a concrete verification job or becomes a relay | Consider only for a demonstrated context/execution need and an explicit owner contract |
| Lead → bounded ephemeral coding Workers | Fewer persistent supervisors for small independent tasks | More continuity and integration burden reaches the Lead; a Worker cannot close an unbounded milestone | Fits genuinely bounded independent slices, not an automatic replacement for Sidekicks |

Recommendation: preserve the baseline while proving the acceptance transition. Layer count is not an acceptance check. A supervisor earns its role through a concrete result it alone owns: integrated evidence inspection, an independent oracle challenge, or a bounded QA outcome. It must not be added simply to forward messages.

## Narrow improvement admission

Add a **role/acceptance pressure case** to the existing owning workflows before proposing another hierarchy. The scenario should return plausible “done” receipts while the actual source omits the required behavior, the proof is stale or at a mocked seam, or a completion hook pressures continuation outside an Operator's exact procedure. Observe whether the assigned implementer finishes its own work and whether the Lead opens the decisive source/proof and refuses premature acceptance.

- **Owners and triggers:** `manage-agents` for assignment/executor role fit, failed-executor/reassignment, and hook-versus-grant boundaries; `orchestrator-implementation-goal` for Lead assessment before independent review and whole-work completion when a commission fails or never starts; `implement-plan` for implementer proof completion. Each named skill change is a separate admitted run.
- **`SKILL.md`:** retain the existing responsibility split; place the action/result at the handback and acceptance transition only if a current-baseline run demonstrates a skipped rule.
- **`references/`:** realistic source/receipt/permission examples and the semantic proof challenge belong with their current owner. Do not add a new shared lane-packet or lifecycle store.
- **`scripts/`:** reuse the existing recorded-action harness for observable reads, writes, commands and source identity. Code can check these facts; it cannot certify that the reviewer understood the code or that the intended behavior works merely because a path appeared in a log.
- **Pressure coverage:** existing assessment, false-green, role, authority and completion scenarios provide controls; new multi-turn handback/acceptance, synthetic-hook/no-grant, and commissioned-executor-failed-or-never-started cases are needed. The #463 case through 2026-10-07 23:34Z supplies a concrete scenario: failed execution, a promised but unstarted fallback, unanswered status, and no receipt. Later producer start/end claims belong to a separate recovery observation. Observe whether the Lead reconciles the failure, retains ownership, and commissions a permitted recovery or records a real blocker. Unknown effects must be reconciled before any replay; a queue receipt or turn-end marker cannot satisfy execution. Separate faithful historical reproduction from an explicitly admitted representative hypothesis. A passing self-report is insufficient.

A runtime gate or removal of delegation tools is a separate design choice. Establish what the current host can enforce and which role needs those tools before proposing it. The native helper assignment here is a contract, not demonstrated physical removal of tools. Do not change tool permissions, the Router's state/authority model, or persistent storage through a prose-only audit recommendation.

The intended outcome is a Lead that checks and accepts, a Sidekick that implements and proves, and commissioned work that stays owned through a real execution result or blocker. Current written rules demand the first two and whole-work completion. The inspected instructions do not establish an explicit failed-executor/reassignment recipe. Prove those transitions before deciding whether their existing owners need tighter wording; no recovery controller or new supervisor is admitted here.
