## Workflow

1. **Name the destination.** State what the session must extract (decision, process, terms, or user requirements), the depth, and what is out of scope.

   IF the missing meaning blocks Requirements, Specification, or a Program Design or Verification Design choice, load `../../shared-references/design-documents.md` and return the boundary between the four design documents, the pathfinding boundary that applies to this destination, and the exact owner that must receive the clarified meaning.

   If a calling phase supplies a return destination, record that exact destination before questioning. It is a boundary: this session may return confirmed meaning only to that destination and may not replace it with another plausible phase.

   Name whether the missing owner meaning blocks Requirements, Specification, or a Program Design or Verification Design choice. Do not turn every destination into a user-requirements record. For a Program Design destination, name the owner-controlled tolerance or constraint to clarify and explicitly exclude components, interfaces, ownership allocation, and mechanisms. For a Verification Design destination, name the owner tolerance to clarify and explicitly exclude evidence routes, targets, and journeys. If the request contains only structural synthesis from settled obligations, return the `program-design` route without starting an interview.

   For a proposed change headed to specification work, establish the goal boundary before handoff:

   - affected people and desired outcomes;
   - existing behavior or foundation to preserve;
   - actual missing behavior or observable difference;
   - systems or packages that may change and those that must remain unchanged;
   - excluded work and acceptable complexity;
   - acceptable outcome-level evidence;
   - unresolved owner decisions.

   An owner-set package limit constrains implementation. It is not product behavior and does not authorize internal design.

   Preserve every explicit exclusion in the correctable boundary. Do not replace a named exclusion list with a summary such as "the old architecture."

   IF the destination includes user requirements for future specification or product work, load `references/user-requirements-extraction.md` and return its questions, classified rows, sequence inputs, record, confirmed goal boundary, refusal or fallback result, and exact gaps through steps 4-7.

   Completion: the destination, its owner when applicable, depth, and negative space are correctable by the user, with every explicit exclusion still visible. A product-change handoff carries a confirmed goal boundary or the exact owner decisions still needed. A Program Design destination carries only the exact owner-controlled tolerance or constraint being clarified. An orchestrated continuation also carries its exact caller-supplied return destination. Other destinations remain extraction-led.

2. **Classify before asking.** Sort each unknown in working state:

   - **Observable now:** inspect the bounded file, document, log, behavior, or available session history.
   - **Broad evidence:** use `practices-research` when prior art or multiple sources are required, and consume its evidence before asking the related question.
   - **Judgment or tacit knowledge:** ask the user because only they can answer.

   Mark each important claim separately as **observed**, **authorized**, **provisional**, or **unresolved**. A user's description of inspectable behavior is useful context, but remains provisional until checked.

   Completion: every known unknown is classified before questioning; each observable unknown has a bounded-read result and each broad-evidence unknown has returned evidence before its related question proceeds; no uninspected or agent-authored claim is promoted to fact or authority; the user sees only evidence that changes a question or conclusion.

3. **Hypothesize first.** Before the first question, state the current read, confidence, and reason.

   Completion: the hypothesis and confidence are on the record before questioning starts.

4. **Show the decision, then ask related questions.** Take decisions in order of leverage, not discovery order.

   - Ask one to three questions together when they share context and clarify one decision.
   - Ask a determining question first when its answer decides whether a later question applies.
   - Separate unrelated decisions and follow the branch opened by the current answer.

   MUST load `references/question-craft.md` and return its question form, material-ambiguity explanation, probes, and counters applied. Return the useful explanation and smallest answerable question group, not narration of the method.

   For a material ambiguity, make the choice understandable before asking: show the current model, strongest credible alternative, one discriminating countercase, and what changes downstream. IF a compact diagram materially clarifies boundaries, ownership, sequence, or competing interpretations, use the `presentation-*` skill matching the current surface to show the map; honor an exact user-requested format instead. IF the user requests a generated comparison or the selected durable destination benefits from one, load `../../shared-references/diagram-rendering-and-fallbacks.md` with a Lead-authored provisional brief and return its actual visual result or exact capability gap. Label every unresolved relationship and assumption as provisional. The image explains the choice; generation failure does not answer it, and no visual decides owner meaning or replaces downstream specification views.

   When the destination is Program Design, compare the consequences of owner-controlled tolerance choices without proposing competing architectures. Ask what cost, risk, downtime, compatibility, or policy the owner accepts; leave the component or mechanism that satisfies it to `program-design`.

   Completion: the user can understand and answer the current decision without reconstructing the method; dependent questions wait until they apply; a material ambiguity shows the current model, credible alternative, discriminating countercase, and downstream difference before asking; user-requirements answers map to the loaded row contract or an exact gap.

5. **Challenge as you go.** Challenge vague terms, glossary conflicts, claimed behavior, and fuzzy boundaries as natural follow-ups. Propose the canonical term, show the source conflict, or pose the edge case; keep the challenge label private.

   Completion: every challengeable answer receives the applicable natural follow-up and is tracked as resolved or open.

6. **Write the moment it crystallizes.** Use one home per kind of meaning: decisions use the decision record, processes use the process record, terms use glossary entries, and user requirements use classified rows plus the goal boundary.

   When the owner has already confirmed a choice, lead with a short ordinary-language explanation of what was selected, how it differs from the rejected/current alternatives, and the concrete gain, cost, urgency or downstream consequence. A bare boundary or decision label is not that explanation. If a compact visual materially helps, place it only after the comparison and consequence and before the concise record/handoff. Do not lead the user-facing response with a method, record or authoring label; the record shape remains internal structure rather than the explanation.

   The record shape follows the meaning, not a default Requirements destination. A clarified Specification decision remains a decision returned to `spec-design`. A clarified structural tolerance remains a decision returned to `program-design`; it does not become a pathfinding-authored component, interface, ownership allocation, or mechanism.

   For a user-requirements destination where extraction proceeds, return the classified inventory, draft rows, useful user-job sequence inputs, record identity and permitted home, confirmed goal boundary or exact owner decision still needed, and unresolved authority or evidence gaps. If extraction is declined, return the loaded reference's refusal or fallback result and exact gaps instead.

   MUST load `references/decisions-and-docs.md` and return the records plus the proportional confirmed/provisional/open summary. If a durable handoff could change implementation ownership, behavior, or proof when misunderstood, also return its reader-test receipt. When a generated visual was selected for a durable record or handoff, consume the shared rendering result, keep provisional labels visible, embed only an accepted project-local asset with a relative link, and preserve confirmed meaning plus open choices in text. Chat-only remains chat-only and does not invent an asset destination.

   Completion: every crystallized item has one record in the user's language; confirmed meaning and negative space remain separate from assumptions and open choices; every required reader test is complete.

7. **Validate the current understanding.** Reflect the result using `evidence_checked`, `inherited_frame`, `first_principles`, and `assumptions`, borrowed from `discuss-clarify-mental-models` without importing its wider drift-repair contract. Present the assumptions together so the user can correct them.

   Keep the four sources distinct:

   - `evidence_checked`: artifacts or behavior inspected in this session;
   - `inherited_frame`: prior artifacts, agent reports, analogy, names, habit, or convention;
   - `first_principles`: directly evidenced truths, hard constraints, and the user's stated goal;
   - `assumptions`: unproven beliefs carried knowingly, excluding inherited claims and direct evidence.

   For a user-requirements destination, show the following current model to the authorized owner:

   - goal, affected classes, and desired outcomes;
   - existing foundation and actual missing behavior;
   - permitted and protected systems or packages;
   - non-goals and acceptable complexity;
   - acceptable outcome-level evidence;
   - unresolved choices.

   Completion: every parked item is resolved or explicitly open. Specification handoff carries explicit confirmation or correction of this same goal boundary, or the exact owner decision still needed.

8. **Apply the stop test.** Stop when every in-scope judgment or tacit unknown is resolved and recorded, or explicitly carried as unresolved.

   Privately predict the next three questions and answers; surface only uncertainty that exposes a remaining material question. A quick session may stop provisionally with the model, decisions, unresolved items, and recommended next question. After three rounds that still cannot predict the path, name the foundational gap instead of grinding on.

   For an orchestrated continuation, inspect the caller-supplied destination's requested decision and declared input needs before returning. In one compact handoff, name the record identity or in-chat record and boundary status, state confirmed meaning separately from open items, then name the exact recorded return destination and why it owns the return. Keep examples separate from normative meaning. If confirmed meaning no longer fits the recorded destination, stop `decision-needed` with the exact mismatch instead of selecting another phase. No live user or unresolved meaning also stops `decision-needed` with the unanswered questions and no next skill. In either `decision-needed` case, the recorded return destination is frozen context only: do not return to it, recommend it, or put it in `next_action` until the owner decision is confirmed.

   Completion: the predictive check ran and the final restatement includes negative space and unresolved items. An unconfirmed product-change goal boundary returns the exact owner decision needed and is not presented as ready for `spec-design`. An orchestrated return contains one compact handoff to the exact recorded destination or an exact stop; it never chooses another phase.
