# Verification Drivers

This reference owns building or repairing a verification driver when an absent or broken route blocks an observation and the assignment explicitly includes that driver work with named paths. A driver is the apparatus that launches, readies, drives, observes or cleans up the target for a verification run.

Expected inputs: the claim and its wrong behavior from step 1, the route from step 2, the target from step 3, the point where the run stopped from step 4, and the assignment's driver paths.

Return: the driver changes, each piece's own run, and the observation the composed driver made on its declared target; or the exact scope, seam or prerequisite gap, with nothing written.

## Confirm the work is yours

Read the assignment for driver work and the paths it names. Write access to product code or product tests is a different grant, and it doesn't cover verification apparatus. When the assignment doesn't name the driver work and paths, return the gap with what the driver would need. When a working driver needs a change outside those paths, such as a test hook in product code, return that seam to whoever owns it.

## Start from what exists

Read the project skill, the project's scripts and task runner entries, and the existing test harness before writing anything. Fix the existing driver at its owner when one exists. Write new code only for the piece that is missing, keep it the smallest reusable piece at the named paths, and use real commands, selectors and paths read from source, never ones recalled from another project.

## Choose the language and the owner on purpose

A driver uses the repository's own language and existing harness first, and a project rule wins over both, such as the Router repository's "TS, Rust, or ask". In a Rust-only repository the driver is Rust; proposing TypeScript there adds a runtime. Adding a new runtime, even TypeScript, or growing a lasting harness from an extension into its own subsystem, is a design tradeoff: return it to the Lead with its toolchain and upkeep cost, and the Lead brings it to the owner.

A harness built from several pieces has one integrating owner, and its composed route is rehearsed on the real target before anyone depends on it. Show each new journey or test file on the CI path that runs it, because adding a file doesn't add it to an explicit module list.

## Build it in pieces you can run alone

A driver usually has a launch, a readiness check, an action, an observation and a cleanup. Make each substantive piece runnable on its own and run it alone before composing the route. A readiness check that only sees a port answer, or a cleanup that kills by a broad process name, fails there instead of hiding inside a composed run. Use readiness and completion signals the target owns, with bounds; a fixed sleep or a hardcoded port is a guess about someone else's machine.

## Show it can tell the outcomes apart

Run the composed driver on its declared real target. Then show that its observation can fail for the wrong behavior from step 1, using a known-bad case your grant allows, such as an older build, a fixture in the wrong state or an input the contract rejects. When no known-bad case is reachable inside your grant, report the missing sensitivity as a gap, and leave product code and real faults alone. Driver code with logic in it gets deterministic checks that can fail, kept where the project keeps such checks. This reference is guidance, and following it proves nothing about your driver.

## Product findings go back

When the driver reaches working behavior and the product contradicts the adopted outcome, that is a product finding for whoever owns the implementation. Changing the driver's observation until the product looks correct is never a driver repair.

## Examples

The projects, scripts and signals below are illustrative.

### Failed: the probe that always passed

A driver greps the app's output for "ok" and exits 0 when it finds it. It passes every run, including against a build where the feature is broken, because the app prints "ok" in its startup banner. The repair makes the probe read the specific outcome the claim names, then runs it against the broken build to see it fail.

### Failed: the hook added under a product grant

The driver can't observe a queue's result, and the agent holds write access to the product code. It adds a test-only endpoint to the service to expose the queue and calls the driver fixed. The assignment named only `verify/` paths, so that endpoint is a product change nobody assigned. The agent should have returned the seam gap, naming the read route the observation needs and the product doesn't expose.

### Clean: one broken piece, repaired and shown

The assignment names `verify/desktop/` for driver upkeep, and the claim is that importing a contacts file adds every row. The existing launch works, and the readiness check reports ready as soon as the app's port answers, before migrations finish, so the first action fails half the time. The agent replaces the check with the ready state the app reports after migrations, runs the check alone against a starting and a ready app, composes the route again, drives the import journey on the built app, and runs it once against the previous build, which is known to drop the last row, to see the observation fail. It reports the change, each run and the build it used.

## When to stop

Stop when the change sits inside the named paths, its language follows the repository or a project rule or went to the Lead as a tradeoff, each substantive piece ran on its own, the composed driver made the claimed observation on its declared real target, and it was seen to fail on a known-bad case or the missing sensitivity is named; or when the scope, seam or prerequisite gap is returned without writing.
