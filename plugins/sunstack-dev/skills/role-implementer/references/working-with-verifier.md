# Working with Your Verifier

This reference owns your side of the pair with your Verifier: starting it, what you send, what you keep out, how you act on what comes back, and when your side is done.

Expected inputs: the Verifier's address from your packet, your plan slice, and the governing sources your commission names.

Return: the setup and target you sent your Verifier, and for each observation it returns, whose action it calls for.

MUST load `../../../shared-references/implementer-verifier-pairing.md` and return the governing sources the pair takes the expected outcome from, and any disagreement already waiting for the Lead.

## Start the pair

Message your Verifier at assignment, before your first build. Send what it needs to begin: the slice and where your changes will live, how to build and run the project with the fixtures your tests use, the commands your gates run, and when you expect the first target.

When your Verifier challenges the proof before the build, send your proof design: the tests you plan, the layer each one sits at, and the real path you will drive. Change the design inside your slice when its challenge holds, or take it to the Lead when the plan's proof itself has to change.

## Declare each target

When a build is ready to observe, declare it as the pairing file describes and say how to start it. Put further work on another branch, worktree or install, where it can't touch that target until the Verifier reports on it.

## Keep out of your messages

- Your reading of the expected outcome, phrased as an instruction such as "check that it returns 3". Point to the source passage and let the Verifier take its oracle from there.
- A request to skip or narrow an observation because your own tests pass. Say where your evidence lives, and the Verifier decides what it can reuse.
- A request to fix product code, write product tests or accept the work.

## Act on what comes back

Before you change code for an observation, open the evidence it rests on and check that it ran on the target you declared ([a reported failure is a claim until you open its evidence](../../principle-verify-before-accepting/SKILL.md)). Then act by kind:

- A missing product regression case is yours. Write it, see it fail for its reason, then fix the code.
- A test that can't fail for its wrong behavior is yours. Fix it at the layer where that behavior stays real.
- Product behavior that contradicts the adopted outcome is your red. Fix it inside the slice, prove it again and declare a new target.
- A route that can't reach the outcome calls for a change to your proof design inside the slice, or goes to the Lead when the plan's proof has to change.
- A disagreement about the expected outcome, about whether an observation applies, or about who owns a fix is settled from the sources or sent to the Lead, as the pairing file says.

When the Verifier's observation fails again after your second fix, apply the second-fix rule in The work before you write a third.

## Report driver defects to the Verifier

When a verification script or driver fails, reads stale output or can't see the outcome, send your Verifier the command, the output that shows the defect and the commit you ran it against. Keep proving with your own tests meanwhile. Leave the driver alone even when the fix looks like one line, because a fix from you would sit inside the check that observes your work.

## Examples

The projects, paths and builds below are illustrative.

### Failed: the driver fixed under a product grant

The Verifier's TUI driver reports no completion because it reads a prompt left over from the previous run. The Implementer holds writes to `src/` and `tests/`, edits `verify/tui/driver.ts` to clear the screen first, and tells the Verifier the driver is fixed. That path belongs to the Verifier, and the observation of the Implementer's work now runs through the Implementer's own edit. It owed the Verifier the reproduction instead, meaning the command, the captured screen with the stale prompt, and the commit.

### Failed: the target that moved during the observation

The Implementer declares commit `a1b2` and its build ready, then pushes a fix to the same branch and reinstalls the app while the Verifier is halfway through its journey. The Verifier's report names `a1b2`, but the second half of the journey ran on the new install. The observation matches no single build, so the Lead can't use it, and the Verifier has to run it again.

### Clean: each finding goes to its owner

Before the build, the Verifier points out that the planned send test stubs the IPC call while the outcome is arrival in a declared pane. The Implementer replies with a real-path journey that checks arrival and keeps the stubbed test only for the routing rule. After the build it declares the commit, the install path, the configuration and how to start the app with the fixture, then starts the next slice in another worktree. The Verifier reports a missing case, two panes with the same title. The Implementer writes it as a regression test, sees it fail for that reason and fixes the code. It finds the driver's readiness check flaky, sends the Verifier the reproduction and leaves the driver alone.

## When to stop

Your side is done for a handback when every observation your Verifier returned has had its action from Act on what comes back, or has gone to the Lead. Wait for your Verifier the way `practices-collaboration` teaches. A Verifier that stays silent past that wait is a gap you name in the handback, and you never describe its observation as made.
