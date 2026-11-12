# Accepting the implementation before delivery review

Expected inputs: original owner decisions, complete scoped requirements/specification/design/verification material, the workstream plan, actual integrated diff/target, original Verifier report and deciding proof, and unresolved prerequisites/HOLDs. Return the Lead-authored acceptance artifact in the existing work record, or affected work sent back with its evidence gap. Independent delivery review remains pending after this acceptance.

## Establish the five conditions

Open the governing originals and the actual changes and evidence yourself. Complete each condition with inspected support, not a forwarded helper verdict:

- Scoped outcomes match the owner's intent.
- The implementation respects the agreed ownership and contracts.
- Deciding evidence proves the required behavior on the declared target.
- Workstreams and dependencies work together, including their interactions.
- No required prerequisite, proof gap or HOLD remains unresolved without an explicit authorized scope decision.

For each capability, name its requirement/source, the change and evidence you inspected with the target, why that observation answers the requirement, and any limit or HOLD. A concise paragraph/table in the existing Lead acceptance record is enough; no separate document or new status/schema is required. Author the judgment yourself. A link, uninspected report or a test count is not that judgment. Reuse applicable Verifier evidence after reading it; obtain missing observations rather than rerunning adequate proof.

If a condition fails, keep the affected acceptance open and route implementation/product-test work to Implementer or observation/apparatus work to Verifier. Investigate your own engineering questions before involving the owner; only unsettled owner-controlled tradeoffs, changed authorized outcomes or authority/proof waivers go to the owner. Continue unrelated authorized work while a real dependency waits.

## Admit outside review last

The order is required proof, completed Lead acceptance, then independent delivery review as the last quality check. Record the accepted implementation scope and the still-pending independent review explicitly. Acceptance here grants neither merge/release authority nor whole-delivery completion.

Provide the Reviewer reachable originals, this Lead-authored acceptance artifact with all five conditions completed, current target/diff, original verification report/deciding proof, unresolved-items state and review scope. The acceptance artifact is a claim for the Reviewer to inspect, not a replacement source defining the outcome. The Reviewer refuses missing Lead work before full delivery review. An explicitly scoped design/proposal or partial source review keeps its narrower purpose and does not establish delivery acceptance.

## Findings and closure

Open each review finding's anchors, disposition it from evidence, and route repairs to the responsible Implementer/Verifier. A defect or false acceptance conclusion reopens only affected acceptance, proof and review coverage. Inspect the corrected result and affected evidence before returning it for the Checker's correction check; reuse valid unchanged evidence. A clean independent review requires no second wholesale acceptance ceremony. The Lead stays responsible for dispositions and unresolved obligations throughout.

**Missing proof:** component tests pass, but the required reconnect journey was not observed. Keep reconnect acceptance open, identify the missing observation and route it to the pair. The Reviewer is not commissioned to finish proving the delivery. **Complete proof:** a current real-path test exercises reconnect and rejects wrong delivery; inspect its run and changed boundary, explain its applicability and proceed to outside review without a duplicate journey.

**Post-review repair:** the Checker finds an original owner constraint absent from the accepted retry implementation. Open that source, route the product correction and affected proof, then recheck that capability's acceptance before the same Checker verifies the correction. Unrelated accepted capabilities stay closed.

Complete when the five conditions have inspected support or the exact open conditions are assigned with what closes them; only the fully established candidate enters independent delivery review. A deferred prerequisite stays open until its evidence or an authorized scope decision resolves it.
