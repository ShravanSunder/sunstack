# Compose engineering design documents

An engineering page explains its subject in ordinary document flow. Requirements, Specification, Program Design and Verification Design retain their separate meanings; each owns its complete text and views. HTML is the source for new free-form design sets. The author chooses the order that makes the design understandable, using the documented Demistify components where a view helps.

IF the caller is presenting a `sunstack-workflow-v1` Markdown-source design, including a newly authored v1 set, load `../SKILL.md` and return its legacy-source route's authoritative Markdown identities, HTML reading view and delivery/check result. Stop this recipe there: the remaining HTML-source record/browser composition rules do not apply. This also handles direct calls from the archived rendering reference; source mode does not depend on when the documents were written.

MUST load `../../../shared-references/design-documents.md` and return the four document identities, the semantic owner of this page's facts, and its actual reading and trace links. A v1 Markdown-source human view takes the legacy route in the main skill instead; it does not become a new HTML-source design.

MUST load `engineering-document-examples.md` and return the examples relevant to this page's reader questions, the forms selected, and the placement of explanation, governing conditions and optional depth. Examples teach composition; the matching Demistify guide remains the authority for markup and component data.

IF authoring a new v2 HTML design collection using shared navigation, load the matching bound Demistify guide's `references/navigation.md` and `references/tours.md` before authoring, and return the collection descriptor and page identities, actual target identities used by the page, and the actual check and delivery result. The guide owns the JSON schema and URI rules; do not copy its field definitions into this recipe or another skill. If a selected component requires its own prepared data, retain the conditional call-stack preparation below.

## Write the explanation first

Open the page with a short answer-first account of who needs what outcome; follow it with the actual explanation, relevant picture and stable links. Treat “what question does this answer?” as a drafting check, not a printed label in place of the answer. Open each substantial section with its answer in the reader's words. Put its diagram or comparison beside that explanation. Keep the conditions, invariants, failure obligations, risks and unknowns a reader must act on visible. Optional evidence and derivations may fold under a label that predicts their contents.

A need or rule can be a paragraph, a headed section or a table row at a stable ID. Preserve its identity and authorizing links without forcing every need into the same visual container. Requirements groups follow the user's capabilities when that helps; Program Design may instead follow component ownership or lifecycle, and Verification may follow observable outcomes. The four documents need not have matching headings.

When Requirements covers several capabilities, name each group in normal reading order and state in a sentence what need it serves. Put each need once in its home group. A small table works when readers compare the same attributes; a headed need section works when its rationale, limit or failure context needs room. Keep each group's stable destination and links to actual need text so a reader arriving from navigation retains the surrounding purpose. For one concern, explain it directly without adding a decorative group hierarchy. The story-count or work-slot pattern of another component does not set a requirements count.

The shared Map expresses relationships among these homes. Target a group at its visible group context and a need at its own `U` text. A related rule, design passage or proof destination may appear as a child or ordinary link when it helps the reader follow that need; the need entry still lands on its own text. Keep stable IDs as addresses and compact trace labels, not as a prescribed reading order or a mechanical `U → R → V` substitute for the human explanation. Do not force the same four downstream stages under every need.

Shared source, authority or priority facts can be stated once for the needs they actually cover, with per-need links or an explicit local override where they differ. Preserve each phase's required fields, but do not repeat identical source and assignment boilerplate in every need body. A Why sentence explains a consequence, pain or tradeoff; a heading paraphrase adds no Why. If the source does not establish the reason, say what evidence is missing instead of inventing it.

For newly authored free-form designs, use ordinary HTML and the useful general components. Do not use `ex-requirements`, its stage/related-document projections, or a page-written replacement application to arrange the four documents. Those viewers do not decide how to explain a design. Carried legacy markup follows the main skill's preservation rule; this recipe does not silently migrate an existing collection or alter a selected component's public contract.

## Select a view for the question

| Reader asks | Useful form | Keep with it |
| --- | --- | --- |
| What do I need and why? | prose, a capability Tree or a supplied journey picture | affected user, outcome, limits and source |
| What are the things and what must hold? | entity map, rule prose or a comparison table | identity, cardinality, invariants, negative cases |
| Who owns what? | component tree, Board or ownership diagram | responsibilities and boundaries |
| What changes state, and what cannot happen? | state diagram or state table | triggers, guards and illegal transitions |
| What happens along this user or system journey? | sequence, state or flow diagram | why the journey matters, important transitions, outcomes and failure/recovery behavior |
| What calls what? | source-derived sequence/call view, or the retained call-stack component | inputs, boundary shapes, effects and error returns |
| How will we know? | plain proof explanation, a meaningful card or coverage table | reference, target, observation, pass condition and limit |
| What must I decide? | explained alternatives, `ex-compare` when topics correspond, then `ex-choice` | recommendation, tradeoffs, payer and consequence of waiting |
| What is still open? | an explicit open-question section with ordinary prose and Comments | exact unknown, decision/evidence owner and affected work |

The owning design phase decides which views are required and what they mean. This recipe chooses their presentation; the guide supplies the actual API. One view answers one question, and one component groups one thing the reader names. A decorative card around every paragraph adds no explanation.

## Choices, discussion and decisions

Explain the problem before offering options: what we know, what is uncertain, the credible alternatives and what each costs. Use a native choice only when the reader needs to answer a bounded question; a discussion asking for qualifications uses ordinary prose and Comments. Keep choices near the affected explanation, or on a linked decision page when the comparison deserves room. Link the question from the set's home so the owner can find it.

The recommended option is a recommendation, never a preselected answer or a claimed owner decision. An unanswered question stays open. Comments and selected answers are local reader state until explicitly handed back; do not claim that selecting an option notified an agent or confirmed the design. After an actual owner answer, reconcile the owning document and keep the unresolved remainder explicit. Do not invent a response store or duplicate an entire decision history in the design.

## Pages, links and reading paths

The set's home page links the four documents that exist and names any current owner decision. It can point to a shared concept's owning explanation and picture. A document page holds its design facts; a navigation page links those homes. Never manufacture a page or result for a phase not yet written.

Use ordinary links and stable section IDs alongside the page outline. For a new v2 HTML collection, use one shared `navigation.json` for Pages, the semantic Map and complete Walkthroughs. Load the matching `navigation.md` and `tours.md` first; follow their exact contract instead of recreating schema details here. Every peer uses the shared descriptor. Its page paths resolve beside that JSON file, and its page and target references lead only to authored pages and real content IDs. A Map group targets its visible explanatory context; a need entry targets the need itself. Use the bound guide's contract to place a related rule, design passage or proof target beneath a need when relevant, while keeping the need's own target on its actual `U` text. The worked fragment in `engineering-document-examples.md` shows this choice without redefining the schema or imposing the same child tree on every need. Keep shared rules at one normative HTML home and link to it from each relevant destination. Do not combine shared `src` navigation with competing page-local Pages, Map or Walkthrough declarations.

The HTML remains the source of design facts and stable IDs. The JSON is only navigation metadata and does not require a legacy need/rule/check corpus. An ordinary Tree can explain hierarchy inside content but cannot replace the shared semantic Map. A Walkthrough is a question-led reading route across existing explanations; a user or system journey is a behavioral model and still needs its own purpose and transitions explained beside the diagram. No route or page is invented to fill a gap in a partially authored set.

Shared JSON navigation is an unreleased source-preview contract until the matching binding and CLI are published. Candidate previews use the matching local guide and assets; if that matching preview is unavailable, name the exact gap and do not author from an invented API. The shared source fetch requires HTTP; do not substitute direct-file, standalone, or offline behavior. Preserve the v1 Markdown-source route in the main skill. When a material status changes, reconcile the owning passage, any dependent summary or diagram, the route metadata and the planned proof without turning navigation into approval state.

A Walkthrough earns its place for a named question whose answer crosses documents or needs an order the page does not give. Its stops reach the actual explanation, diagram, choice or proof section. Frame what to inspect in narration; keep governing facts in the destination. A path through one page's headings in their existing order is its outline. Preserve ordinary navigation alongside every guided path. For a new collection, author the complete route only in the shared descriptor so every page can offer the same path; a source-only preview does not prove released runtime support.

## Call stacks and component preparation

Keep the call-stack component where it explains an actual source-derived path. IF a page selects that component, load the matching guide's `references/design-documents.md` and return the actual owner pages, need/stack/frame data, prepared collection, supported reader markup and preparation/check results it requires. Its current need metadata is data for the selected component; it does not require a requirements viewer or specification/check records for the rest of the design. Do not fabricate frames or a need attribution merely to fill a field.

Honor the selected binding's limits, including how many readers it supports and how addresses work; retaining the component is not permission to invent independent embed attributes. Without a supplied source path, explain the proposed sequence or state model with the corresponding ordinary view and label it proposed.

A free-form page without component records needs no design-record preparation. When a selected component requires data, prepare that data through the documented route; do not impose its schema on unrelated paragraphs or documents. Read authored sections and required component inputs; let preparation tools process the full collection without repeatedly loading generated carriers into model context. After editing, check actual links/IDs and run the matching static checker; re-index a shared collection when its headings, paths or Walkthroughs change. Return the real descriptor, page and target identities with the result, and say whether the check and delivery used source preview or published support. The HTML owns domain facts, actual design decisions and tradeoffs, and visible proposals or open questions. Return the author's self-check, lint receipt, reviewer/readiness state, and Chief/agent routing in workflow state or the work account rather than durable design prose. Update any run-status statement from the actual result after preparation; do not carry a stale “not run” note forward. A static pass establishes markup, not human comprehension or observed product behavior.

Completion: each document has a distinct meaning and complete HTML source; the opening explains its subject; each view answers a reader question beside its owning text; governing conditions and unknowns are visible; choices and observations have honest status; stable links resolve to actual content; component-specific preparation runs only where required; and the final static check passes. No separate Markdown design corpus or specialized design viewer is required.
