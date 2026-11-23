# Compose engineering design pages

An engineering design is typed records plus one page per milestone. The records hold the text of each need, rule, realization, planned check, decision and assumption; the page explains them in ordinary document flow, in the order why, what, how, proof, and shows each record by id where the explanation needs it. Requirements, Specification, Program Design and Verification Design keep their separate meanings through their record kinds. The author chooses the order that makes the design understandable, using the documented Demistify components where a view helps.

IF the caller is presenting a `sunstack-workflow-v1` Markdown-source design, including a newly authored v1 set, load `../SKILL.md` and return its legacy-source route's authoritative Markdown identities, HTML reading view and delivery/check result. Stop this recipe there: the remaining engineering-design rules do not apply. This also handles direct calls from the archived rendering reference; source mode does not depend on when the documents were written.

MUST load `../../../shared-references/design-documents.md` and return the four kinds of meaning, the records this page shows, and which sections explain them. A v1 Markdown-source human view takes the legacy route in the main skill instead.

MUST load `engineering-document-examples.md` and return the examples relevant to this page's reader questions, the components selected, and the placement of explanation, governing conditions and optional depth. Examples teach composition; the matching Demistify guide remains the authority for markup and record syntax.

## Write the explanation around the records

Open the page with a short answer-first account of who needs what outcome; follow it with the explanation, the relevant picture and the records it rests on. Treat "what question does this answer?" as a drafting check, not a printed label in place of the answer. Open each substantial section with its answer in the reader's words and put its diagram or comparison beside that explanation. Keep the conditions, invariants, failure obligations, risks and unknowns a reader must act on visible. Optional evidence and derivations may fold under a label that predicts their contents.

A section's prose says why its records matter and how they relate; it never restates what a record says. Show the record by id beside the prose that interprets it. For each substantive section, let one reader question set the size of the explanation and pair its answer with a guide-supported relational diagram or native drawn view. Use the diagram to expose the actual owners, movement, alternatives, states, outcomes or failure paths. A card or paragraph alone does not do the diagram's job. If the important relationship is not readable at the intended size, adjust a supported form, direction, label or decomposition while keeping its meaning complete. A tiny independent fact needs no manufactured diagram.

Introduce a needed technical term through the action or distinction it names before relying on the short label. Keep the engineering source's canonical term, and state an exact meaning gap when the sources do not establish the distinction.

When the needs span several capabilities, name each group in reading order, say in a sentence what it serves, and show each need once in its home group. For one concern, explain it directly without a decorative group hierarchy. Program Design sections may follow component ownership or lifecycle, and proof sections may follow observable outcomes.

A Why sentence explains a consequence, pain or tradeoff; a heading paraphrase adds no Why. If the source does not establish the reason, say what evidence is missing instead of inventing it.

## Select a view for the question

| Reader asks | Useful form | Keep with it |
| --- | --- | --- |
| What do I need and why? | prose with the need records, a capability Tree or a supplied journey picture | affected user, outcome, limits and source |
| What are the things and what must hold? | entity map, the rule records with their cases | identity, cardinality, invariants, negative cases |
| Who owns what? | component tree, Board or ownership diagram | responsibilities and boundaries |
| What changes state, and what cannot happen? | state diagram or state table | triggers, guards and illegal transitions |
| What happens along this user or system journey? | sequence, state or flow diagram | why the journey matters, important transitions, outcomes and failure/recovery behavior |
| What calls what? | source-derived sequence/call view, or the retained call-stack component | inputs, boundary shapes, effects and error returns |
| How will we know? | the planned check records, a Tree of need, rules and checks from the records, and an observation-path diagram when the route is not obvious | what stays unverified |
| What must I decide? | explained alternatives, `ex-compare` when topics correspond, then a choice from the open decision record | recommendation, tradeoffs, payer and consequence of waiting |
| What is still open? | an explicit open-question section with ordinary prose and Comments | exact unknown, decision/evidence owner and affected work |

The owning design phase decides which views are required and what they mean. This recipe chooses their presentation; the guide supplies the actual API. One view answers one question, and one component groups one thing the reader names.

## Choices, discussion and decisions

Explain the problem before offering options: what we know, what is uncertain, the credible alternatives and what each costs. Use a native choice only when the reader needs to answer a bounded question; a discussion asking for qualifications uses ordinary prose and Comments. Keep choices near the affected explanation.

The recommended option is a recommendation, never a preselected answer or a claimed owner decision. An unanswered question stays open. Comments and selected answers are local reader state until explicitly handed back; do not claim that selecting an option notified an agent or confirmed the design. After an actual owner answer, the decision record carries it and the sections it governs are reconciled.

## Navigation

Use ordinary links and stable section IDs alongside the page outline. Pages, the Map and Walkthroughs are declared with the records, a node or stop targeting a record by id, as the guide's `typed-design.md` shows; load it, and the guide's `navigation.md` and `tours.md` for their reader behavior, before authoring navigation, and return the actual targets used. `SKILL.md` step 2 owns when a Map or a Walkthrough earns its place. Never manufacture a page, route or record to fill a gap in a partially authored design. An unreleased candidate uses its matching local guide and assets and is reported as source preview.

## Call stacks and component preparation

Keep the call-stack component where it explains an actual source-derived path. IF a page selects that component, load the matching guide's `references/design-documents.md` and return the actual owner pages, need/stack/frame data, supported reader markup and preparation/check results it requires. Do not fabricate frames or a need attribution merely to fill a field. Honor the selected binding's limits; without a supplied source path, explain the proposed sequence with the corresponding ordinary view and label it proposed.

The page owns explanation, tradeoffs and visible open questions. The author's self-check, check receipt, reviewer/readiness state and agent routing belong in workflow state or the work account rather than on the page. A static pass establishes markup, not human comprehension or observed product behavior.

Completion: the page explains each kind of meaning it covers; the opening answers its question; each record is shown by id beside the explanation that needs it and is never restated; each view answers a reader question beside its explanation; governing conditions and unknowns are visible; choices and planned checks have honest status; links resolve to actual records and sections; and the design check and static check pass.
