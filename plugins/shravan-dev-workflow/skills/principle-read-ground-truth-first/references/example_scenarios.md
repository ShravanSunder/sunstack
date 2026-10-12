# Read Ground Truth First: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. Find the one closest to your case and apply its move.

## The cache that wasn't invalidated

**What happened.** A design relied on `invalidateOnWrite()` because of its name, assuming writes cleared the cache everywhere.

**The move.** Names describe intent, not behavior. Read the function.

**Better.** Reading it showed it cleared only the local process's cache, so with several instances the other readers stayed stale. The design changed before any code was written.

## The plugin that was never wired

**What happened.** A change reported "observability support added". The telemetry plugin was in the dependencies, but nothing registered it, so no telemetry was produced.

**The move.** Check that "it's there" means "it's wired".

**Better.** Find where the plugin is initialized and confirm a real request produces a span. Report support only after seeing that span.

## Counts passed, meaning wrong

**What happened.** An audit ledger passed exact-id checks for 115 files and 520 hunks, yet classified two all-new test suites as compile-only adaptations. Independent review later found more errors of the same kind.

**The move.** Read the whole artifact. Counts matching is not the content being right.

**Better.** Check each substantive hunk against what the source actually does, and keep inventory counts separate from semantic classification.

## The wrapper that dropped the filter

**What happened.** A single-scenario proof run went through a package-script wrapper. The wrapper inserted an option terminator before the test-name filter, and all 14 paid evaluation scenarios started.

**The move.** Read the real path before running something costly.

**Better.** Print or inspect the final argument list the wrapper produces, and confirm it selects the same cases discovery selected, before starting the run.

## "Who decided this?"

**What happened.** A plan carried a decision that shaped the whole design. When the owner asked "why? who decided this?", nobody could point to where it came from.

**The move.** Trace a consequential decision to its source the same way you trace code.

**Better.** Find the message, document, or contract that made the decision. If there isn't one, it's an assumption: label it as one, and take it to the owner.

## It failed after restart

**What happened.** A service worked, was restarted, and then failed in a way the code couldn't explain.

**The move.** Suspect stale persistent state before the code.

**Better.** Check the config files, caches, lock files, and saved state the service reads at startup. If clearing one restores the behavior, the fix is validating that state when it's loaded.

## The fix that wasn't deployed

**What happened.** An incident review credited newer resilience fixes on the main branch. A version inventory showed production still pinned three releases behind, with none of those fixes installed.

**The move.** For a claim about running behavior, check what is deployed and loaded.

**Better.** Read the running package version and the deployment pin first. Source changes are evidence about the source, not about production.

## The outage that was a sandbox

**What happened.** A helper's request from inside a sandbox failed, and it reported the observability collector as down and the logs as unrecoverable. A call from the host with proper authorization succeeded and recovered all 3,444 existing records, with no restart.

**The move.** A failed read is about your access until you've checked the instrument.

**Better.** Separate "I was denied" from "the service is unhealthy". Check reachability with the right access before declaring an outage or rerunning any work.
