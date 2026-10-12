# Justify the Complexity: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. They run from the simplest to the hardest. Find the one closest to your case and apply its move.

## The lease nobody asked for

**What happened.** A pull request for a small UI fix also added cross-tab Web Locks and a database lease "to be safe". The owner asked why the fix needed a lease at all, and had never wanted Web Locks in the project.

**The move.** Map every piece to the outcome that needs it.

**Better.** No requirement asked for cross-tab coordination, so both mechanisms come out. If a real cross-tab race appears later, it arrives with evidence and gets designed then.

## The flag kept "in case"

**What happened.** A config flag was added in case a second storage backend appeared. Two years later nobody had set it to the other value, nothing tested that path, and it was broken.

**The move.** "We might need it" is not an outcome.

**Better.** Delete the flag and the dead path. When a second backend is needed, add it then, with its own tests.

## The home-grown container

**What happened.** To wire a handful of services, a design proposed building its own dependency-injection container and service locator.

**The move.** Prefer the boring shape.

**Better.** Pass the few real dependencies as constructor arguments at one composition point. The container would have been a framework to maintain with no outcome asking for it.

## The cutover that missed a consumer

**What happened.** An IPC interface was replaced in a hard cutover. The old exposure switch survived in the dispatcher, and migrated tests used the wrong response types and helpers that no longer existed. Lint passed; compilation failed.

**The move.** Inventory every consumer before the cutover, and prove it compiles and runs.

**Better.** List every caller, conformance, and test that touches the old interface before switching. Repair only the owning defects, without adding a compatibility API. Treat compilation and the real run as the proof, not lint.

## The removal that took shared tests with it

**What happened.** Removing an obsolete product also deleted backup, scaffold, and secret-resolution tests that still covered shared code, and cut shared reference docs down to summaries.

**The move.** Subtraction has its own failure: find what still uses a thing before deleting it.

**Better.** Classify each removed test, helper, and doc by its surviving consumers. Delete what served only the removed product, and keep or move what still serves anything else.

## The engine rewrite that wasn't needed

**What happened.** A storage layer looked slow, and the plan was to rewrite the engine. Measurement showed normal commits near stock speed; a lock-wait spin was burning 2.9 seconds of CPU per 2-second wait.

**The move.** Look for the smallest fix at the owning boundary before building something new.

**Better.** Turn off the spin and retry with a timer at the driver boundary. That cost about 18 ms of CPU and left the engine untouched.
