# Local and Integrated Review

This reference owns the review stages of a design cycle: each document's own local review, then one integrated reader of the whole set, and the corrections between them.

Expected inputs: the five current documents, each phase's returned local closure, the governing sources and goal boundary, and any prior review results.

Return: the five current local closures and the integrated review state, or the exact next review or correction owner.

## Local Reviews

Each phase obtains its own independent local review through `spec-program-review` in its mode (`requirements-only`, `specification-only`, `program-only`, `test-only`, `verification-only`), passing `callerRequirement: required` on the document's first or substantive cycle. The phase corrects accepted findings, and the same review relationship checks the corrected anchors. No owner approval is added for a review cycle.

When a phase returns locally ready, inspect its closure:

- the review report exists and its result is `ready`;
- the closure covers the document this phase produced, at its current location and meaning;
- every accepted finding has a verified correction anchor;
- a later edit to the document either changed no meaning (carried coverage, with the parent's semantic-change record) or went back through review.

A closure that fails any of these is not a closure; return the document to its phase.

## The Integrated Reader

After all five local closures hold, load `practices-manage-agents` and return the assigned or resumed persistent 🔎 Reviewer Sidekick for `five-artifact-design` mode, with read-only access and no authoring history. Give it the five identities, governing sources, confirmed goal boundary, accepted requirements set, the three confirmation states, and the five local review reports as context. It reconstructs the whole design itself; the local results are context it may consult, never verdicts it forwards.

Reduce its findings against the sources:

- `ready` -> the final owner confirmation;
- a non-semantic or unsupported finding -> reject with evidence;
- a mental-model break or unmade owner meaning -> the owner brief with the failed assumption, evidence and consequence; dependent work stops;
- accepted bounded findings -> correct through their semantic owners in order, starting at the earliest affected document, each affected document corrected at most once in the round. The integrated Reviewer Sidekick verifies the corrected anchors in the same review relationship; that verification is not another round.

A bounded correction verified at its anchors keeps the other documents' closures. A correction that changes a document's meaning beyond its finding sends that document back through its local cycle.

## Missing Review Evidence

When prior review results are unavailable, verify the current documents and governing sources, record why, and run an ordinary review; the current review sets the convergence baseline.

Complete when: five ready local closures cover the current documents, the integrated review is ready with its corrections verified, or the exact next owner, decision or stop is named.
