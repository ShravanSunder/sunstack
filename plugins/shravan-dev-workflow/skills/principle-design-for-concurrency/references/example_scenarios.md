# Design for Concurrency: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. Find the one closest to your case and apply its move.

## Two workers, one state file

**What happened.** An indexer and a metrics collector each wrote their own `lastRun` field into one shared `state.json`. Occasionally one overwrote the other's update.

**The move.** Remove the sharing before serializing it.

**Better.** Give each its own file (`indexer-state.json`, `metrics-state.json`) and merge them only when a report reads both. No lock is needed, because nothing is shared anymore.

## The reservation the scan ignored

**What happened.** A scan waited for a slot, then published results that restored a hidden location, even though another task still held a reservation on it.

**The move.** After waiting, recheck the condition before acting.

**Better.** The scan rechecks the reservation after its wait and publishes only if nothing still holds it. A permanent regression test reproduces the overlap by holding the reservation during the scan.

## Refresh once per worktree

**What happened.** Each open tab started its own refresh of the same worktree's file list, so five tabs meant five identical refreshes racing to write the same cache.

**The move.** Deduplicate identical work, and give it one owner.

**Better.** One refresh per worktree, owned by the worktree's model. Tabs subscribe to its result instead of starting their own.

## The test that could only sleep

**What happened.** A test had to prove that a service shut down cleanly, but the service gave no signal when shutdown finished, so the only option was to sleep and hope.

**The move.** Order by causal signals; if there is no signal, add one.

**Better.** The service emits a shutdown-finished event, and the test waits on that event with a timeout. The test is fast when it passes and gives a clear error when it doesn't.

## The blocking lump

**What happened.** An async service wrapped a whole sync "open the store, then resolve credentials" sequence in one blocking task. The store open, which could have been async, held a blocking thread for its full duration.

**The move.** Keep blocking work to the smallest blocking unit.

**Better.** Load the account through the async store on the runtime, and send only the secret read itself to the blocking pool.

## The background write nobody waited for

**What happened.** A request handler spawned a task to record an audit row and returned. On shutdown, the process exited before the task ran, and in tests the runtime ended with the write still pending.

**The move.** Every task has an owner that tracks it and drains it.

**Better.** Spawn audit writes through a tracker owned by the service. Shutdown drains the tracker before exiting, and tests await it before asserting.
