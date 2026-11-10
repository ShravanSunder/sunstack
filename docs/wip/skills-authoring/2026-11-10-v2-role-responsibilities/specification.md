# Required responsibilities and boundaries

## Governing rules

S1. The Lead authors the governing design and plan, including workstreams, dependencies, sequencing, scope and completion conditions; the Implementer chooses execution steps within its assigned workstream.

S2. Each agent investigates discoverable questions within its grant before escalating and resolves ordinary choices inside its responsibility without asking for a new assignment.

S3. Implementer and Verifier exchange setup, source anchors, reproductions and repairs directly; neither their agreement nor current behavior can redefine the required outcome.

S4. Questions that would change a governing contract, behavior, ownership, authority or required proof go to the Lead; the Lead takes unsettled owner-controlled tradeoffs to the owner after investigating them.

S5. Required proof establishes that the scoped implementation works and the Lead completes its own acceptance against the governing design before commissioning independent delivery review, which is the last quality check.

S6. The independent Checker frames its checks from governing requirements and owner decisions without authoring history, then treats author/Lead conclusions and public claims as claims to inspect.

S7. A deferred prerequisite or unresolved hold remains open until its evidence or an authorized decision resolves it; only work depending on that condition waits.

S8. Before editing a file, its writer reads that current file in full and the relevant contracts; routine corrections do not require ceremonial rereads of unchanged role instructions or a complete trace.

S9. Standard role and practice reads are performed at their actual decision points, with applicable existing reads reused; concise results link to evidence and explicitly name remaining gaps.

S10. Role/files remains the content of delegated work-direction calls; routine pair exchanges continue inside the existing assignment and are not new commissions.

S11. The Lead records its own acceptance in the existing work record, connecting scoped outcomes to inspected changes and deciding evidence, and commissions delivery review only when all required outcomes and prerequisites are established or an explicit authorized scope decision settles them.

S12. The independent Checker derives criteria from the original governing requirements and decisions, checks the accepted candidate and the Lead's conclusions against them, and returns source-backed findings; the Lead owns their disposition and repairs, with only affected acceptance, proof and review coverage reopened.

S13. The Implementer Sidekick independently runs its workstream and may use parallel native helper subagents without per-child Lead permission, owns their changes and integration, and returns the proven workstream while the Verifier Sidekick reports its own critical observations to Lead.

S14. Sidekick means a separately managed persistent session and Subagent means a native child; Worker may appear as a search/provider synonym but is not a v2 form, role or accepted executionForm value.

S15. Implementer, Verifier and Reviewer always run as Sidekicks; coding subagents are helpers inside the Implementer's execution rather than separately appointed Implementer, Verifier or Reviewer seats.

S16. The Verifier critically checks the Implementer's work against governing outcomes, exchanges reproductions and repair results directly with it, and gives Lead a complete actionable report of scoped observations, missing proof, holds and owned tasks.

S17. The Reviewer remains outside the implementation loop and admits delivery review only after the Lead supplies its own completed acceptance artifact and the complete current governing specifications, scope, target and proof for that review.

S18. During active work, the Lead consumes routine board status on a 55-minute check-in cadence, checks progress and questions with Implementer and Verifier, and avoids shorter model-driven status polling or duplicate notification/wake loops.

## Lead check-ins without becoming a relay

Implementer and Verifier keep their actionable workstream status, decisions, evidence and blockers on the existing board/task/checklist surface. They continue their direct repair/reproduction work without Lead mediation. The Lead's 55-minute pass consumes queued board activity once, checks both sides' progress against the workstream plan, identifies stalled/dependent work or a changed assumption and acts on actual engineering questions. It does not turn every helper message into a task or owner update.

Use one existing supported timed wake for the same Lead session and routine board notifications as the status source; do not combine frequent push-wakes with a second periodic poll loop. A board-only quiet period does not prove work is progressing: the check-in can request missing status from the actual Implementer or Verifier. End the cadence when the work completes or is paused. Material blockers, HOLDs and mental-model breaks still reach Lead when action is needed; they are not silently deferred for 55 minutes. The cadence is selected operational policy, not proof of cache retention, savings or progress. No live timer is created by this design document.

## Reviewer refuses an incomplete handoff

The delivery-review procedure first checks its inputs: Lead-authored acceptance artifact with the completed five-condition checklist and inspected evidence; original owner decisions; complete governing requirements/specification/design/verification material and workstream plan for scope; declared current target/diff; original verification report and deciding proof; unresolved-items state; and review scope. “Full” means complete for the assigned scope and reachable in the existing governing files, not another paraphrase or a newly fabricated giant packet.

Missing acceptance, unchecked acceptance items, absent/stale governing documents, missing required proof or an unresolved required HOLD returns a short review-not-started result naming what Lead must supply. The Reviewer does not fill the Lead's acceptance artifact, obtain the missing basic proof or start the full delivery review to rescue the handoff. That admission check belongs to the Reviewer as well as the Lead's calling procedure. Once admitted, the Reviewer independently checks the candidate and can reject a false acceptance conclusion. Admission is a skill procedure, not newly implemented Router/CI enforcement.

This is the delivery-review gate. An explicitly scoped design/proposal review has its own artifact and proof boundary; it cannot be presented as acceptance of working software.

## Parallel implementation

The parent Implementer decides decomposition and concurrency; the skills impose no arbitrary child count. Actual host concurrency, approved models and access still apply. Each child receives a bounded part of the same agreed workstream and inherits no broader write/command/design authority. The parent inspects child changes, resolves ordinary execution questions, integrates and proves the combined result. It brings material design/contract changes to Lead with evidence. Child completion alone is not parent completion.

The workstream's Verifier stays paired with the parent Implementer and observes the integrated target. Native implementation children report through their host to the parent; they do not each need a separate Router session, trace or Verifier pair. The parent supplies the workstream's existing verification context without making a child responsible for commissioning or independently accepting that proof. Independent delivery review remains a separate Checker session without authoring history.

Keep the Implementer contract Sidekick-only, and Checker's verification/review duties Sidekick-only. Operator may retain its two supported forms with native worker renamed subagent consistently. Coding helpers use the parent workstream's approved model/access context; do not create a standalone Implementer packet, session, pair or catalog row per child. Keep the model catalog unchanged; R5's Local-row addition was an agent inference and is withdrawn. The Lead-to-role commission remains role/files; native helpers receive their bounded task and source context through the existing host interface inside the Implementer's grant. No new helper wire schema is introduced. Freeze v1 and preserve provider-owned API names.

## Verifier's critical work and actionable report

The Verifier checks whether offered tests exercise the required boundary and detect the wrong behavior, independently drives the required journeys on the declared target or reuses applicable real-path evidence, and challenges unsupported claims even when the suite is green. Product defects and missing regression tests go directly to Implementer; granted verification-driver defects stay with Verifier. Expected-outcome disputes and mental-model breaks go to Lead with evidence. The pair does not change the governing outcome by agreement.

After a batch, the Verifier reports directly to Lead: the observed target and scoped outcomes with supported/unsupported/unknown results and evidence; Needs Implementer repair/checklist items and their recheck status; Needs Lead decisions or blockers; and every required unverified path or HOLD. Each open task names its owner, the observed failure or missing fact, the next action and what closes it. Use the existing tasks/checklist surface or concise Markdown rather than a new tracker or schema. Material holds or blockers that require Lead action are reported when found, not hidden until the final batch. Routine pair exchanges do not become Lead check-ins. A full report can honestly be blocked; it is never shorthand for all green.

In that report, “Needs you” means the recipient Lead. The Lead resolves its own engineering questions and brings Shravan only the owner decisions; it does not forward every internal question to him.

## Which questions go where

| Agent | Resolves itself or with its peer | Escalates |
| --- | --- | --- |
| 🦁 Lead | Source investigation, workstream planning, integration decisions inside approved boundaries, evidence interpretation and finding disposition | Owner-controlled tradeoffs, changed authorized outcomes, destructive authority and proof waivers |
| 🐒 Implementer | Local execution steps, defects and product regression tests; direct reproduction/setup exchanges | Changed design/contract/ownership, unavailable authority, conflicting expected outcomes or an integration dependency outside the slice |
| 🔬 Verifier, Checker verification duty | Assigned verification apparatus, observation method inside agreed proof, target checks and source-settled expectations | Insufficient governing proof, unresolved expected-outcome dispute, missing grant or hold needing a Lead decision |
| 🔎 Checker, Checker review duty | Independent source inspection, candidate reduction and correction checking | Supported findings, conflicting governing decisions, missing required evidence or a design break |
| 🔧 Operator | Prescribed commands/collection and explicitly specified retries or branches | Exceptions and judgment to its commissioner, which need not be the Lead |

Missing authority blocks affected work; missing cosmetic packet detail is not permission to guess a grant or stop unrelated authorized work. A supported interpretation from a clear source settles a question; an agent-authored plan alone cannot override owner intent.

## Responsibilities that must stay separate

The Implementer owns product code, tests and associated repairs. The Verifier owns assigned independent verification drivers/journeys and observations. The Checker reviews without writing the target. The Lead owns integration judgment, assigns integration repairs to Implementers, inspects evidence and accepts; it does not write implementation code. The owner retains merge and one-way decisions.

The Lead has accepted the implementation before delivery review; the required independent review is still pending, so that acceptance alone is not merge/release authority or a claim the whole delivery is complete. A clean review leaves no further acceptance ceremony to perform. Corrections reopen affected acceptance, evidence and review coverage; applicable unchanged evidence is reused. The Lead remains responsible throughout. No blanket rerun follows solely from another commit.

## Proposed Lead acceptance procedure

The Lead opens the relevant owner decisions and governing design: required behavior, the planned owners/contracts and the proof obligations. It compares them to the real diff and the deciding observation at its target, including interactions between workstreams. It uses the existing Lead acceptance record with an explicit boundary: the implementation is accepted against the design, and independent delivery review remains pending. A capability-level paragraph or small table suffices; no new acceptance document, packet, status type or test-by-test recital is required.

Acceptance is complete only when the Lead establishes all five conditions: scoped outcomes match the owner's intent; the actual implementation respects the agreed ownership/contracts; deciding evidence proves the required behavior on its target; workstreams and dependencies work together; and no required prerequisite, proof gap or HOLD remains unresolved without an explicit authorized scope decision. Finding a gap sends work back to the pair. The reviewer is not the first person expected to establish these conditions.

The order is required proof passing, Lead acceptance, then independent delivery review. Reports that say tests passed do not replace the Lead's inspection of what those tests and observations prove. Known missing or failing proof returns to the pair; review is not commissioned to finish proving an allegedly complete delivery. A specifically limited source/proposal review stays labeled with its narrower purpose and is not delivery acceptance.

Each assessed outcome names the required behavior and source, the change and evidence inspected with its target, why that observation answers the requirement, and any limit or hold. An uninspected report or a link alone does not supply the Lead's judgment. The Lead does not assign another agent to author this assessment. When existing Verifier evidence establishes the outcome, inspecting it is sufficient; the Lead obtains a missing observation instead of rerunning everything or claiming it exists. A scoped source/partial review may still be commissioned explicitly as such, without pretending the delivery is ready.

The independent review targets both the artifact and this assessment. The Checker rebuilds its criteria from original requirements/decisions and treats the assessment as another claim, never as the authority that defines the desired outcome. It may encounter that claim in the initial files or mandatory history reads; this procedure makes no blind-first-reading claim and does not silently bypass the unchanged base practice. Independence means no authoring history, governing-source access and an independent judgment supported by anchors. The initial assignment must include or make reachable the original owner decisions and governing design, not just the Lead's account. If those originals are missing or contradictory, the Checker reports that input gap rather than accepting the Lead's framing.

A technically sound implementation can still carry an unsupported acceptance conclusion. If independent review exposes a missing proof obligation or false acceptance, the Lead reopens that part, assigns the needed implementation/observation, checks the changed result itself and returns the corrected candidate for affected review. The Checker does not become the author of acceptance. A clean review does not trigger a second wholesale Lead acceptance phase. Skill text does not technically prevent a Lead from skipping these steps; enforcement remains outside this proposal.

**Worked case:** component tests are green, but the required reconnect journey was never observed. The Lead records the components' supported results and the reconnect gap, assigns the missing proof and keeps delivery readiness open. “The reviewer will check it” is not an assessment. **Clean case:** a current real-path test already exercises reconnect and rejects wrong delivery; the Lead inspects that test/run and the changed boundary, explains why it proves the requirement, and proceeds to independent review without another identical run.

## Examples and transfer checks

| Rule | Different setting where it applies | Bad choice it must reject | Expected result |
| --- | --- | --- | --- |
| S1 | A Rust receiver workstream chooses functions/test order under a Lead-authored protocol plan | A skill writer independently changes which role owns acceptance | Execution stays local; governing ownership returns to Lead |
| S2–S4 | A TypeScript Verifier repairs a stale selector inside granted driver paths | Pair agrees to accept duplicate effects because current code produces them | Repair apparatus locally; expected outcome stays governed |
| S5–S7 | A document-only Lead checks changed instructions and evidence before independent skill review | Green component tests erase an unobserved migration prerequisite | Review follows Lead inspection; unmet prerequisite remains open |
| S8–S10 | A Swift Implementer rereads its changed source files and current correction source | A one-line fix triggers rereading every unchanged role/manual and a full-packet readback | Full current editing reads; concise continuation under existing authority |
| S11–S12 | A skill-change Lead connects the required role boundary to the exact changed instructions and their evidence before independent review | A release Lead forwards a packaging pass as proof of data continuity and lets the reviewer invent its acceptance judgment | Lead's own conclusion must match the required outcome and remains independently challengeable |
| S13–S14 | One Implementer uses native children for an independent Rust parser and TypeScript display inside its agreed workstream, then proves integration with its Verifier | The parent forwards three child success summaries while their combined interaction is untested, or creates a separate Verifier per child by default | Parent integrates/proves; workstream-level verification and Lead acceptance remain; two execution forms suffice |

These are design walkthroughs, not executed behavioral tests. References must include both a clean in-boundary case and an escalation case for each role, plus a missing-authority case, a peer disagreement, a changed observation target and a post-review repair.
