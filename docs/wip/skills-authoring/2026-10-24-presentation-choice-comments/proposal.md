# Presentation response and feedback composition

Revision 1. One update run targets `presentation-html`, owned by `plugins/sunstack-dev/skills/presentation-html/` in sunstack. Root authors the proposal; the authorized skill Worker implements only after acceptance.

## Promise, source and success

This skill helps agents choose and compose an HTML explainer when the reader must also answer a question or leave feedback. The baseline is the complete current skill and references at `f61b35bcf1de6bb28010d8531baaa192620d80f3`.

Success: on a realistic new decision/review request, an agent distinguishes explaining/comparing/recommending from collecting a live response, retrieves the matching component guide, creates a normal Demistify document using the appropriate response view and one feedback surface, and looks at the actual desktop/phone artifact. An explanation-only request stays an explanation.

Authoring basis: **user-directed intent**, from the owner's explicit request for reusable choice/comments components, skill updates and fresh usability. This behavior-changing update alters the chooser, composition teaching and depth, not the trigger. It claims no reproduced historical failure, RED or measured improvement.

Authority: the owner's accepted card/details/comments UI and later click correction; the product's four-document design at sunstack-tools `docs/specs/2026-10-24-choice-comments/`; release-matched `demistify-explainer` remains the only API owner. Existing workflow references own comparisons, patterns, matching binding and delivered-artifact observation.

## Decisions

| ID | Default and rationale | Failure form addressed |
|---|---|---|
| D1 | Preserve the current description and model/user invocation capabilities. HTML artifact creation/revision already covers the feature. | Broader trigger would recruit response UI in chat-only work. |
| D2 | Preserve the answer-first mental model and six-step route. Add a chooser row for a reader answering/qualifying a question and a row for attaching feedback when requested. | A visual comparison can otherwise be mistaken for an answer collector. |
| D3 | Existing `references/options-and-decisions.md` owns deciding comparison versus live input; a compact `references/patterns.md` addition owns response-plus-feedback arrangement. No new generic workflow reference is needed. | Parallel reference trees would duplicate ownership and create extra reads. |
| D4 | Add an observable response/feedback predicate to the relevant reference calls. Their returns name the question, independent/exclusive answers, summary/extras and feedback handoff to compose; syntax is fetched from the bound guide. | An uncalled reference leaves new capability undiscovered; copied API prose drifts. |
| D5 | Prefer title/body hierarchy and optional native side details; offer table only for corresponding short topics and inline disclosure for local optional depth. Preserve native menu/chrome, two widths and one Comments action. | A custom app header, extra answer-copy strip or decorative frames fragment the document. |
| D6 | Preserve live response versus recommendation/owner-choice distinction; report local comments and transient answers honestly. | Authored recommendations must not silently become selected answers or imply submission. |
| D7 | Complete matching local source preview is acceptable before release; source/installed/public release claims stay separate. | Old published runtime cannot validate new API and a source PR is not deployment. |

## Surfaces and call contracts

- Trigger: unchanged. True cases create/revise standalone HTML review, decision or explanation pages; a whole-skill near miss is chat-only advice. An explanation page with no request for input is a near miss for the response/feedback branch, while still invoking the HTML workflow.
- Main path: keep understand/choose/bind/compose/check/return visible and retain their completion criteria. When response or feedback is requested, the chooser names that task. The current options call becomes conditional on readers comparing alternatives, an owner deciding **or a reader answering a question**; it loads `references/options-and-decisions.md` and returns the comparison/input form, corresponding topics, response semantics and decision state. The current patterns call additionally fires for a response/feedback composition and returns the arrangement and example. No API syntax is added to the workflow.
- Depth: `options-and-decisions.md` teaches explanation, recommendation, owner-chosen display and live-response distinctions, view tradeoffs and details hierarchy. `patterns.md` teaches one normal-reader response-plus-feedback composition and its observation points. `demistify.md` keeps matching guide/tool retrieval; adjust only if the source-preview path needs clarification. References start with the selected task, not their own invocation routes.
- Proof: fresh application of this candidate to a new decision/review artifact and an explanation-only recognition case, actual matching guide read and action records, emitted source and desktop/phone interactions. No blanket success or implicit installed routing claim.

Completion remains the existing actual-artifact boundary: checked source, rendered content, working requested controls, honest binding/opening-method limits. The new branch requires the choice and feedback affordances to serve the reader task, not be decorative.

## Proof and coordination

Hidden checks are written before fresh no-fork runs, outside the author's workspace. Prompts are realistic requests, omit the checks and never ask which files were loaded. Use actual host read/action records for candidate identity and actions; inspect every output manually. Record named-example application, not before/after improvement. A recognition exercise with offered candidate descriptions is not implicit installed host routing. If action-record access is absent, retain that exact gap rather than self-reporting proof.

Base `origin/main`, branch `feat/presentation-html-choice-comments`, `f61b35bcf1de6bb28010d8531baaa192620d80f3`. No skill edits pending at proposal time. This separate workflow PR coordinates with the product API/guide PR without copying it. Feature minor version 2.97.0 updates the existing six plugin metadata homes coherently, adds a dated changelog entry within the repository limit and updates its index. No installed-cache refresh, deployment or merge is authorized. The product skill has its own distinct proposal and review result.

Sensitive surface decision: **allowed** for prose guiding the existing release-matched local authoring/checking path; no new scripts, commands that grant network authority, third-party assets, hooks, secrets or home/cache writes. Existing public-safe and binding constraints stay intact. Metadata is platform coordination, not a new executable surface.

Non-goals: owning component syntax/schema, adding product runtime code here, designing a second comments interface, treating every comparison as input, changing other presentation mediums, publishing the artifact or collecting session transcripts.

## Status and review record

Run: **implemented**. Revision 1 is **accepted-to-implement** after independent teaching and structure reviews, all four checks complete/great. Root verified the distinction between whole-skill invocation and response/feedback-branch recognition; no open finding remains. Review records: `/private/tmp/2026-10-choice-components-delivery/skills-teaching-review/workflow-final.md` and `skills-structure-review/presentation-html-revision1.md`. Root accepts this one-skill proposal's current meaning. No skill file changed at acceptance. Fresh application proof and Lead assessment precede independent implementation review. PR-ready remains unmerged and unshipped.

Implementation evidence, 2026-10-24: the unchanged trigger/six-step route gains requested-answer/feedback forms, the accepted options/patterns calls and observation guidance; three existing references carry composition and matching-source-preview depth. No new workflow API/schema or reference tree was added. All six metadata homes are 2.97.0 with a dated <=20-line changelog/index. The diff matches D1–D7. Existing unit tests passed 169/169 across 18 files; typecheck, Claude packaging, local-reference/version checks and `git diff --check` passed. Root separately authorized a bounded existing test-config repair: the pinned Zod type alias now selects its actual `index.d.cts` export in NodeNext; schemas/runtime/package/lockfile are unchanged. Codex quick validation was not run because PyYAML is unavailable. Evidence: `/private/tmp/2026-10-choice-components-delivery/skill-implementation/`. U4 fresh application, actual reader observations, Lead assessment and independent implementation review remain open; source metadata does not establish installed/public availability.
