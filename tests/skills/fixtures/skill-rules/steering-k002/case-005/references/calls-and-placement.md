## Standards

Placement:

- Material only some runs need lives in a reference loaded with `IF <condition>, load`.
- All-run detail moves to a `MUST load` reference only when it forms one coherent procedure, is dense enough to obscure the main path, or changes for its own reason; line count alone never justifies the split.
- Moving all-run procedure behind `MUST load` leaves its obligation, order, decision, required return, invariant and completion visible in `SKILL.md`.
- Long examples, provider mechanics, branch-only rubrics and exceptional procedure live in references, unless the user explicitly asked for one file.
- Each review check lives in its own reference, and the status fields shared by review checks live in one review schema.
- A skill that defines review checks has a schema for the statuses, verdicts, finding fields and reduction its review uses.
- Deterministic executable mechanics live in `scripts/`.
- Term meanings live in the glossary and nowhere else, including the coined terms a skill needs.
- Each defined term is concrete and matches how `SKILL.md` and the references use it.
- Each meaning has exactly one home.
- Every reference exists because a named call site asks for it.
- A reference section that owns a stage says what to inspect, what good and bad look like, and when to stop.<!-- R001 -->
- Every stage or branch a skill promises has a teaching owner: an inline section of `SKILL.md` or a teaching reference.
- A runtime skill loads only the references its own phase needs.
- Shared authoring lessons live in authoring skills or their references, never in runtime workflow skills.
- A skill has no per-skill provenance document unless it needs a task-specific reference for progressive disclosure.

Calls:

- Each load or dispatch call says when to go, where, what to do there, and what to bring back.<!-- K001 -->
- Every call site uses exactly one form: a load, a dispatch or a citation.
- A reference call opens with exactly one literal load form, `MUST load` or `IF <observable condition>, load`.
- A dispatch is only for a prescribed procedure: a command, a watch or a mechanical transform with an observed result; review checks, research and every other judgment are loaded and performed by the current agent.
- A dispatch names its exact steps, its allowed commands or transformation, its execution boundary and the observation to return.
- A dispatched helper reports observations and exceptions, and the calling agent judges them.
- Independent review is not dispatch: a review skill may start reviewer agents with no authoring history to walk its checks, and its lead verifies their findings.
- The caller, not the reference, owns the entry route: the load mode and the condition that selects the reference.
- An opened reference owns its decision or detail, its expected inputs, its local procedure and examples, its result, and a checkable stop when it asks for work.
- A reference holds one coherent kind of detail, with its local rules, examples, caveats and templates kept together.

Citations of principles:

- A principle is only cited, never loaded; a reference or procedure is loaded or dispatched, never cited.
- A citation is one sentence naming an observable moment and the action to take there, followed by a relative link to the principle.
- A citation's action says what to produce or check, in words other than the link text; "apply X", "(see X)", or an action that restates the link text is incomplete.
- A principle is cited only where its judgment changes how this action is done.
- A principle is cited once per decision; when a skill used at that step already cites it for that decision, the citation isn't repeated.
- A citation's path resolves from the file that holds it.
- A citation never replaces a load call for the skill's own procedure.
- A cited principle ships in the same plugin as the file that cites it.
- The citing skill writes no loader line for a principle, because the principle's first body line is its own read rule.

Shared shapes:

- A model-readable output shape gets its own home only when two or more real consumers need the same fields and meanings; a shape with one consumer stays with it.
- A tool shape gets its own home when a tool, test, CI check or runtime validates the structure, and it names that validator; a readable example is not a machine contract.
- A shared shape defines each field, value and ordering constraint once.
- A shared shape leaves the judgment, selection and completion that produce it with the calling workflow; a schema owns fields and labels, not the workflow.
- A reference that only pins an output shape is justified by a named consumer.
- A reference that only pins an output shape never owns a stage.
- Each skill's packet layout, source rules, security context, receipts, reducer rules, check names, route-backs, proof details, statuses and examples stay in that skill's own references; no runtime contract is imported by every skill.
- When a shape or rule changes home, every consumer links to the new home and the old definitions go in the same change, with no forwarding stub or alias.
