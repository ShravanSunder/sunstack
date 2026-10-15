# Working with Your Implementer

This reference owns your side of the pair with your Implementer: taking its setup, confirming each target it declares, what you send it, what you keep out, how you act on what it sends, and when your side is done.

Expected inputs: the Implementer's address from your packet, your adopted reference and the one kind of work your commission names.

Return: the target you are observing as it was declared, or the setup you still wait for, and for each observation you sent, whose action it calls for.

MUST load `../../../shared-references/implementer-verifier-pairing.md` and return the governing sources the pair takes the expected outcome from, and any disagreement already waiting for the Lead.

## Take the setup

Your Implementer messages you at assignment with its slice, how to build and run the project with its fixtures, the commands its gates run and when to expect the first target. Ask it directly for anything your method needs that the message left out. Its description of the slice tells you where to look. The expected outcome still comes from your adopted reference.

While you wait for a target, prepare. Read the project's verification skill and check that your drivers start. Observe nothing until a target is declared.

For a feasibility challenge, ask for the proof design: the tests it plans, the layer of each and the real path it will drive. Send back each gap with the wrong behavior the design would miss, the passage of the adopted reference that requires catching it, and a route that would. The Implementer decides how to change its design inside the slice, and the Lead decides when the plan's proof has to change.

## Confirm each target

Before your first action on a declared target, check that what you are about to drive is that target, meaning its commit, its build or install location, its configuration and its client. When the declaration leaves one of them out, ask before running. When what you find differs from the declaration, or the target changes while you observe, stop, tell the Implementer what you found and wait for a new declaration. When your commission pinned that target, tell the Lead as well.

## What you send

Send each observation with its target, the action you drove, the result you saw and where the evidence lives, and say which kind it is:

- A product regression case the tests don't cover. Send the behavior and its reproduction, and leave the test to the Implementer.
- A test that can't fail for its wrong behavior. Name that behavior and the layer where it stays real.
- Product behavior that contradicts the adopted outcome. Send the reproduction and the passage it contradicts.
- A route that can't reach the outcome. Say what the route lacks.

A driver defect stays with you. Repair it when your script paths cover the driver, and otherwise send the Lead the reproduction and the script work it needs. A disagreement over the expected outcome, over whether an observation applies or over who owns a fix goes as the pairing file says.

## Keep out of your messages

- A patch, product code or a product test you wrote for the Implementer. A fix from you would sit inside the work you observe.
- A verdict that the work is done or accepted. Say for each claim whether the evidence supports it at the target, and leave acceptance to the Lead.
- Any case or check of a held-out evaluation, including inside a setup question. Ask for setup in words that name no case.

## Act on what the Implementer sends

- When it says its tests already cover something, open the run and decide reuse with the applicability check in `practices-verification`. Its passing tests never decide what you skip.
- When it states the expected outcome as an instruction, such as "check that it returns 3", find the passage and take the oracle from there.
- When it reports a driver defect, reproduce it at the commit it names before you change anything ([a reported failure is a claim until you open its evidence](../../principle-verify-before-accepting/SKILL.md)). Then handle it like a defect you found yourself, run any repaired piece alone, and tell the Implementer what you did with it.
- When a change you didn't write appears in your script paths, run no observation through it until you have read it and either kept it as your own change or replaced it. Tell the Lead, which checks each writer's diff against its grant.
- When it declares a new target after a fix, observe that target. An earlier observation carries over only where the applicability check still holds.

## Examples

The projects, paths and builds below are illustrative.

### Failed: the fix made while checking

The Verifier opens a saved document on the declared build and finds the body gone, though the save showed a success toast. The fix looks like one line in `src/editor/save.ts`, and the Implementer, busy with the next slice, says to go ahead. The Verifier patches it, drives the journey again and reports the save working. The observation now covers the Verifier's own fix, no regression test fails for the lost body, and the Lead has no independent evidence left. It owed the Implementer the reproduction, meaning the target, the journey and the readback that showed the empty body, and owed the Lead a persistence claim marked unsupported at that target.

### Failed: a held-out case named in a setup question

During a held-out evaluation of a rewritten skill, the Verifier asks the Implementer how a subject session loads the skill "for the stop-review hook case". The Implementer now knows one case's target and can shape its next correction toward it. The question needed only the setup, meaning how a fresh session loads skills from this worktree.

### Clean: each observation goes to its owner

The Implementer declares commit `c3d4`, the build path, its configuration and how to start the TUI with the seed fixture. The Verifier checks that the running binary reports `c3d4` before its first action, then drives the send journey. A message reaches its declared pane, but a second pane with the same title takes the next one, which the adopted reference forbids. The Verifier sends the Implementer the target, the two inputs and the captured panes, and leaves the regression test and the fix to it. The Implementer then reports that the driver's completion check matched a prompt left over from the previous run, with the command, the captured screen and the commit. The Verifier reproduces that at the commit, changes the check under `verify/tui/` to match only the output of the current input, runs the check alone and tells the Implementer. When `d5e6` is declared, it drives the send journey again on that target.

## When to stop

Your side is done for a target when every observation on it has gone to its owner, whether that is the Implementer, the Lead, or your own driver repair driven again. Wait for a declared target the way `practices-collaboration` teaches. A target that never arrives is a gap you name in your report to the Lead, and you never describe an observation of it as made.
