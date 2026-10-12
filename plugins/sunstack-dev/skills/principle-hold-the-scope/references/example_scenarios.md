# Hold the Scope: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. They run from the simplest to the hardest. Find the one closest to your case and apply its move.

## The split for the builder's convenience

**What happened.** A delivery was split into eight pull requests, and the lead admitted the split mostly served the agents' convenience.

**The move.** Structure serves the owner's outcome, not the builder.

**Better.** Split only where review, risk, or dependency order needs it. Each pull request should be something the owner can judge on its own.

## The quiet softening

**What happened.** The owner said an import must never create duplicate contacts. The spec said the import "attempts to deduplicate by email".

**The move.** On every handback, check that nothing was weakened.

**Better.** Comparing line by line catches it. "Attempts" is a weaker promise, and contacts without an email are no longer covered. The spec goes back to "never creates duplicates", with what counts as a duplicate defined.

## The fix that broke scrolling

**What happened.** A rendering bug fix moved work onto the main thread, and scrolling stuttered in large files.

**The move.** Carry what must stay true alongside the outcome.

**Better.** The frame lists "keep smooth scrolling and main-thread responsiveness" next to the bug fix, so the fix is checked against both.

## The machine-wide lock

**What happened.** The approved request was one build slot and one test slot per worktree. The design that came back was a machine-wide lock coordinating every worktree on the host.

**The move.** Trace every line to its source, and keep mechanisms inside the approved scope.

**Better.** Build the per-worktree slots that were asked for. If machine-wide coordination looks necessary, raise it as a separate decision with its cost, rather than shipping it inside the approved change.

## The design that got smaller

**What happened.** A protocol design had accumulated steering, spooling, late-admission, and CLI machinery that no current requirement asked for.

**The move.** Narrow by tracing each part to an active requirement.

**Better.** The revision removed the unanchored machinery and kept live durability and overload disclosure, which requirements did ask for. A record shows every remaining requirement mapped to its owner and proof.

## The plan that grew a rewrite

**What happened.** A planning session treated a corrupted specification as authoritative. It sequenced a controller rewrite in another framework and added an unapproved prerequisite in a different package, pulling in security and database surfaces nobody had asked to touch.

**The move.** A document is not authority by itself; reconcile it against the owner's controlling constraints before planning.

**Better.** Compare the spec with the owner's latest instructions first. Anything the spec adds that the owner didn't ask for becomes a question, not a planned task.
