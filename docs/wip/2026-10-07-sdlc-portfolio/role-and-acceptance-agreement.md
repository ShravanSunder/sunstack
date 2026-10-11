# Role ownership and acceptance: working agreement

Recorded October 9, 2026 from the owner's clarification and the hierarchy discussion. This is the living record for setup: owner-confirmed intent, existing contracts, Lead-authored operational guidance and open choices have different authority. It does not replace active repository instructions or constitute a runtime skill-change specification or implementation plan.

**October 10 continuation:** the [topology mental-model sync](2026-10-10-topology-mental-model.md) records the newer owner-selected Sidekick–Verifier pair and later independent review. Start there for that direction; this document retains the earlier setup context and runtime contracts.

## The problem we are solving

A Lead or engineer can become a relay: delegate the task, receive a plausible “done” message, forward it to review, and never inspect whether the requested behavior exists. The owner expects the Lead to do substantial engineering work through understanding, design, planning, inspection, integration and acceptance. The implementation Sidekick owns writing the implementation and proving it.

The governing distinction is **delegating implementation while retaining an acceptance job**. Every delegated result has a named consumer and a check. Adding supervisor levels does not create that check by itself.

## Authority of this record

| Basis | What it establishes here |
| --- | --- |
| Owner-confirmed intent | The Lead checks and accepts rather than becoming a relay; implementation is expected from Sidekicks. The owner asked to write the discussion down during setup. That request does not select four tiers or individually approve every walkthrough step. |
| Owner's standing instructions and existing runtime contracts | Governing authorship, role/assignment boundaries, decisive-evidence inspection, independent-review cadence, whole-work ownership and external-action authority already apply. Their source anchors are retained below. |
| Lead-authored operational guidance | The handback description, scope comparison and seven-step walkthrough express those obligations for discussion. Their exact presentation is not a separately approved procedure. |
| Open source alternative | Pstack's written verification pattern is source evidence and an Advisor-raised discussion topic. It is not an accepted local change. |

## Current responsibilities and their basis

| Role | Owns and checks | Basis |
| --- | --- | --- |
| Owner | Desired outcomes, material tradeoffs, scope changes and merge authority; confirms or corrects the shared model | Owner's standing instructions |
| 🦁 Lead | Default owner conversation and governing artifacts; cuts assignments, checks dependencies/integration, opens decisive source and actual proof, and owns dispositions, acceptance and unfinished delivery | Owner-confirmed intent plus standing instructions and delivery contract |
| 🐒 Implementation Sidekick | Direct implementation, fitting proof, corrections and routine mechanics; checks its own work and permitted helper contributions before handback | Owner-confirmed intent plus implement-plan/manage-agents |
| 🛠️ Worker | One bounded result with proof, checked against its packet; returns evidence and gaps | Existing manage-agents contract |
| 🔧 Operator | A prescribed procedure; reports observations, exit codes and artifacts, returning judgment or repairs to the assigner | Existing manage-agents contract |
| 🔎 Review Sidekick | Independent findings and affected correction checks after Lead assessment; does not implement or accept on the Lead's behalf | Existing manage-agents and review contracts |
| 🦉 Advisor | Owner-requested guidance on the owner's question; challenges understanding, boundaries, tradeoffs and acceptance with evidence | Owner appointment and existing manage-agents contract |

The Sidekick is the implementation owner, rather than an automatic supervisor that hands every edit to another agent. Permitted helpers handle useful bounded work; their receipts still need inspection by the agent accepting their contribution. The Lead may assign evidence collection, but remains responsible for the material claims and overall verdict.

The appointed Advisor and Lead both discuss ideas with the owner, who vets proposed changes. The Advisor advises rather than choosing the design or authoring the governing document. Under manage-agents it may start Workers or Operators for its own work when permitted; a particular bounded assignment may narrow that authority.

## Verification authority and implementation authority

The Lead's implementation boundary preserves the assigned executor. It does not prevent the Lead from reading code, inspecting assertions and runtime evidence, tracing a call path, or running an authorized acceptance check when needed. Those actions are part of checking the work.

A blanket “supervisors never execute code” restriction would also prohibit useful verification. We have not adopted that restriction or changed tool permissions. Existing execution, filesystem, external-action and proof gates continue to apply. Missing implementation or proof returns to the responsible executor; a material design or plan question returns to its semantic owner.

## Downward assignment and upward acceptance

The downward check is already owned by the [agent-job-packet contract](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/manage-agents/references/agent-job-packet.md#L5): an assignment missing outcome, sources, limits or stop does not go out. The assigner also names the approach/check, allowed writes, result to return and work boundary. The recipient must be able to check its result against that packet. Pstack's sampled-brief audit is a source idea for later discussion, not an adopted extra gate.

There are different checks at different scopes:

| Scope | Question the check must answer | What is insufficient |
| --- | --- | --- |
| Executor's change | Does this change demonstrate the assigned behavior through the required observation seam? | A build alone, a mock of the interaction being changed, or a suite that never exercises the obligation |
| Contributions inside an assignment | Do these completed pieces fit together and satisfy the assignment? | Several individually green receipts with no proof of their required interaction |
| Lead's delivery assessment | Does the integrated work satisfy the original need and governing design/plan, within scope? | Forwarding the implementer's summary or counting reviewers |
| Independent review | Can the change or its proof be broken in a way earlier checks missed? | Cosmetic feedback alone, an author repairing its own review, or stale review of a different revision |
| Requested delivery terminal | Have all obligations for the authorized endpoint actually been reached? | Calling source closure PR readiness, readiness merge authority, or a queued request completed work |

These scopes do not require four persistent supervisor tiers. In the current model the Sidekick checks contributions inside its assignment and the Lead checks the combined delivery. A separate engineer supervisor would add another ownership and checking boundary; that hierarchy remains an option to discuss, not an adopted setup.

**Existing independent-review cadence:** [manage-agents](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/manage-agents/SKILL.md#L116) places independent implementation review at Project and Milestone scope, never a single Task or Subtask. Task handbacks still need fitting executor proof and Lead assessment. The cadence does not automatically supply another non-author reviewer for each Task. Design/proposal review follows its owning phase's contract.

## What an implementation handback contains

Use the existing assignment and handoff contracts. Keep the handback concise, with enough evidence for the recipient to inspect:

- The assigned outcome and what was changed, with the owning paths and current source/revision identity.
- The proof actually run: commands, outcomes and exit codes; assertions or runtime artifacts showing the required behavior. Red/green, integration and manual proof follow the governing plan and repository requirements.
- The integration result for separately changed pieces when the plan requires their interaction to be proved.
- Remaining assumptions, mocks, stand-ins, blocked checks, unrun work and material risks.
- The stage being handed back and the work still owned by the executor.

A handback starts assessment. It is not acceptance. A live agent, saved message, queue receipt or completed provider turn establishes only that reported stage.

## What the Lead does when walking the work

The sequence below is Lead-authored operational guidance drawn from existing source/proof obligations. The owner confirmed the need to walk and check the work; the seven-step expression is available to refine during setup.

1. **Recover the obligation.** Identify the original outcome, current design/plan and the exact scope being assessed. Distinguish one slice from the integrated delivery.
2. **Open the decisive source.** Inspect the changed owner and material entry/call path. Check that the behavior is reachable, boundaries match the design, and the work stays inside scope.
3. **Inspect the proof itself.** Open the results and relevant assertions. Determine which interaction they observe, what remains mocked or synthetic, and whether the evidence applies to the returned revision.
4. **Challenge a false green.** Ask whether the proof could still pass if the requested behavior were absent. Inspect the oracle, required effect and failure boundary that decide that question.
5. **Check integration.** Inspect the required interaction between separately completed pieces. Individually passing parts do not establish their combined behavior.
6. **Make a substantive disposition.** State what was established and what remains unverified. Return missing implementation/proof to the executor; route design or plan defects to the appropriate owner. At the Project/Milestone review boundary, commission independent implementation review only after fitting development/proof assessment. Task acceptance is not automatically that review boundary.
7. **Close the authorized scope.** After review and corrections, verify the requested delivery terminal against the original outcome and current gate evidence. Keep incomplete requirements visible and preserve owner merge authority.

Inspection depth follows the obligation and affected boundary. Governing plan/repository gates set the required proof; the Lead selects the source and observations needed to support its actual claim. A changed interface, state transition, concurrency or trust boundary can require wider caller/failure-path inspection than a document-only edit. File count or a green total cannot decide that depth. This is the existing proof-selection principle applied to the walkthrough, not a new numeric threshold. Repeat or broaden proof for a change, failure or specific unresolved concern. A statement that “the Lead inspected” is not proof by itself; the decisive source and observation must support the conclusion.

When an Advisor is present, it challenges the assessment too. The Lead still verifies the evidence and owns the disposition; Advisor agreement cannot replace that work.

## Unfinished or failed delegated work stays owned

The Lead remains responsible for the whole delivery when an executor fails, never starts or returns incomplete proof. A handoff, time elapsed or promised fallback does not close that responsibility. Reconcile an uncertain operation before repeating an effectful request, then identify the remaining work and its permitted owner or the concrete blocker.

Whole-work ownership follows the existing delivery contract; it is not a new owner decision made by this document. The exact failed-executor/reassignment procedure and its runtime enforcement still need to be designed and proved at the existing owning boundaries. The historical audit supplies a pressure case, not a new recovery controller or permission grant.

## How the four-tier image fits

The image makes a useful relationship visible: tasks travel down and checked results travel up. It distinguishes worker self-proof, supervision of returned work and delivery-level acceptance. Its “PR Architecture Signoff” label is narrower than the Lead's responsibility here, which also includes observable behavior, proof, scope and integration.

Its Chief of Staff “spec matches intent” check covers planning alignment. A complete delivery also needs someone to establish that the delivered result satisfies the original intent. Our current Lead retains whole-work acceptance and the owner retains material decisions. No separate Chief of Staff role has been selected in this setup.

The image is a reference model. The interview supports delegated execution, self-verification examples and bot review before some PRs. It does not establish those exact three universal gates, Matcha as every PR's reviewer, or an ephemeral cloud-worker lifetime. See the [source-qualified hierarchy investigation](hierarchy-and-acceptance.md#what-laurens-example-actually-establishes).

## Setup still to prove or decide

### Source alternative raised by the Advisor

Pstack's written large-program playbook supplies an alternative beyond what the interview captions establish. At the inspected pin, [orchestrate's queue/drain step](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/orchestrate.md#L70) routes a completion needing deep review into a verifier unit and forbids reviewing a diff inside a drain. That is a rule for the drain step, not evidence that a coordinator is prohibited from inspecting any source in every context.

Its [verification section](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/orchestrate.md#L87) scales the work: a cheap VERIFY command runs with the worker and the coordinator spot-checks receipts; expensive, judgment-laden or high-blast-radius units get a dedicated verifier from a different model family. Verdicts identify the PR/head being checked, and CI green is input to a verdict rather than a verdict by itself. The separate [shipping playbook](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/shipping.md#L7) requires independent real-surface verification and checks that the verdict still describes the patch before landing. These are particular written workflows, not proof of Matcha's universal protocol.

| Model under discussion | Who performs the deep inspection? | What the Lead/coordinator still owns | Tradeoff |
| --- | --- | --- | --- |
| Current local baseline | The Lead inspects decisive source/proof before commissioning independent review | Assessment, integration, dispositions, whole-work acceptance and delivery ownership | Keeps governing context close to the check; consumes Lead attention and can become a throughput bottleneck |
| Task verifier plus Lead-owned receipt: unselected local alternative | A non-author verifier walks a bounded Task; the Lead opens the source-tied receipt and checks its scope, freshness and integration consequences | Decisive-evidence duty, assessment, dispositions and whole-work acceptance | Adds another model lineage at Task scope and reduces bulk reading in Lead context; adds a verifier unit, depends on its brief/evidence, and may lose code-level integration understanding |

No choice between these models is made here. The narrower owner question is whether, at Task scope, a non-author verifier could perform the deep walk and its receipt could become sufficient decisive evidence for the Lead's particular acceptance claim, rather than the Lead personally opening that code. The owner's standing instruction remains that whoever makes a material claim inspects the decisive source evidence. A receipt-only substitute is not currently authorized; its sufficiency, integration cost and any required change to that instruction need explicit discussion. The Advisor challenges the interpretation and tradeoffs; the Lead authors the agreement, and the owner vets proposed changes. Adopting pstack's storage layout, retry policy, merge grants or verifier/controller mechanisms would be separate decisions.

### Remaining setup questions

| Item | Current position | What would settle it |
| --- | --- | --- |
| Written instructions versus reliable execution | The role split and Lead-assessment obligation already exist in source; live reliability is not established | A realistic handback/acceptance run with a tempting false-green receipt and observable source/proof inspection |
| Failed or unstarted executor | Whole-work ownership is clear; the explicit recovery recipe is not established | A bounded procedure and pressure proof at the existing role/delivery owners, including unknown-effect reconciliation |
| Reusable project verification | The audit recommends a maintained real-path harness and feature-to-proof map; it is unimplemented | A separately accepted proposal and one real pilot feature, followed by maintenance proof |
| Extra supervisor or Chief of Staff | The four-tier picture has not been selected | A demonstrated need, unique owned result and explicit owner decision about the added boundary |
| Deep inspection versus verdict ownership | The current local baseline keeps decisive inspection with the Lead; pstack supplies a different large-program pattern | Owner discussion of the named tradeoff, followed by a representative execution check for any proposed change |
| Tool restrictions and hard enforcement | No permissions or runtime gate changed | Establish actual host capabilities and required verification access before proposing enforcement |
| Skill changes and rollout | This document records the agreement only | Admit each named change through the existing authoring workflow, then implementation/proof, Lead assessment, independent review and the authorized delivery boundary |

## Source and document boundaries

The owner conversation drives the settled responsibility split. The existing [hierarchy investigation](hierarchy-and-acceptance.md#your-current-responsibility-split) and [learning coverage check](learning-coverage-check.md#lead-validation-remains-part-of-the-work) provide the source/evidence context. Active runtime contracts remain with their existing owners:

- [manage-agents: roles and result checking](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/manage-agents/SKILL.md#L84).
- [implement-plan: direct implementation and fitting proof](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implement-plan/SKILL.md#L14).
- [orchestrator-implementation-goal: Lead assessment before independent review](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/orchestrator-implementation-goal/SKILL.md#L29).

As setup proceeds, record owner decisions in this agreement and keep unresolved choices visibly unresolved. Store investigation history in the work trace and raw evidence in its existing private/local homes. This WIP record does not itself change skills, agent permissions, CI, merge policy or installed behavior.
