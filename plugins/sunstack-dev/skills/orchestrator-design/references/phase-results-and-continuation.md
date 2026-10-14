# Phase Results and Continuation

This reference owns how the orchestrator reads a returned phase result and decides what happens next. Each phase owns its own result schema: `spec-design/schemas/spec-design-result.ts`, `program-design/schemas/program-design-result.ts`, `test-design/schemas/test-design-result.ts` and `verification-design/schemas/verification-design-result.ts`. This reference links them and never restates their fields.

Expected inputs: the returned result, the document it points at, its local review report, the governing sources, and the current state of the other documents.

Return: the interpreted result (what was assumed, what the evidence showed, what it means for the design), then the next unresolved dependency or the exact semantic gap with its owner.

## Read the Result, Then the Document

A result is a pointer and a summary. Before continuing on a `locally-ready` result:

- open the decisive sections of the produced document; the summary helps you read them and never replaces them;
- open the local review report the closure names, check that it covers this document, and read its accepted findings and their corrections;
- for Requirements and Program Design, check the owner's confirmation or explicit waiver is real and covers this version;
- for each newly authored or substantively revised Requirements, Specification and Program Design, inspect the phase's visual result: its reader question, medium, durable relative embed when generated, and readability. Requirements covers each changed screen; a text fence does not pass a picture-type view when Mermaid can render;
- note the evidence the phase leaves owed, so it can travel to the cycle's terminal.

Then say three things plainly: what the design assumed before this phase, what this phase showed, and what that means for the next decision. When nothing surprised you, saying so is the result.

A `blocked` or `decision-needed` result names a gap token. Route by the semantic owner the token names, not by the phase that found it: Test Design can discover a Program Design gap. A failed restriction that an agent added (rather than the owner) is dropped while the approved outcomes stay.

## Four Continuations

### The sound model holds

```text
Requirements, Specification and Program Design return locally ready with confirmations.
Test Design and Verification Design return locally ready; nothing in them contradicts upstream.
The integrated review returns ready.
```

Continue in order and ask for the final confirmation. Do not add a review round, an extra approval or a reconfirmation because the run went smoothly; a clean run needs no ceremony.

### Test feasibility disproves an ownership assumption

```text
Assumed:   Program Design gave the router ownership of delivery, observed at pane B's input.
Showed:    Test Design returns blocked with program-design-gap: the pane component keeps its
           input buffer private and emits no input event, so nothing outside the pane can see
           what arrived.
Means:     the structural choice rested on a false assumption about who can observe delivery.
           This is a structural correction, not a missing test.
```

Route to `program-design`. The corrected structure changes the realization the owner confirmed, so `program-design` brings the owner the new realization before review, and Test Design resumes on the corrected seam. Writing a test around the private buffer, or weakening the observation, would hide the break.

### A blocking decision only the owner can make

```text
Showed:    the Specification returns decision-needed: whether a hidden pane is addressable.
           "Yes" needs focus-independent routing; "no" needs a visible failure.
Means:     two different designs follow; no source settles it.
```

Bring the owner the brief and stop dependent work. Independent investigation may continue, but no document that depends on the answer is finalized.

### Evidence deliberately owed at delivery

```text
Test Design:          the executor's red run for focus-based routing is planned.
Verification Design:  pane B's visible input on the delivered build is planned.
```

These do not block design readiness. The cycle's `ready` result lists them under the evidence owed at delivery, and nothing in the result or the documents describes them as observed. Only the executor's run and the paired Verifier's delivered observation show them.

Complete when: the result was read against its document, review report and confirmations; the assumed, showed and means statements are written; and the next step is a named dependency, an owner decision, or a gap routed to its semantic owner.
