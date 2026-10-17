# Working with the Lead

This reference owns your side of the relationship with the Lead who commissioned you: reading the commission, what you send while you work, your report, and what you do with the Lead's answers. Packet fields, forms and models are defined in `practices-manage-agents`.

Expected inputs: your commission from the Lead's own message, with its packet, after the Assignment check in your role skill.

Return: the commission gaps you sent back before you began, or none, and what your report must carry for this job.

## Read the commission

Your oracle comes from the packet's `adoptedReference`. When it holds the Implementer's account of what it built, or a summary with no governing source behind it, return that gap before observing.

Read the Verification Design your packet carries, with the rows it names. Before the build, challenge whether each row's observation can decide its requirement on the planned target. At delivery, observe from those rows and their passing conditions.

`work.mode` names your one kind of work. When the job turns out to need another kind, return that gap with what the other kind would need, and do only the kind you were given. A driver repair during an observation with no script paths is one such gap. A `verify-<app>` skill that is missing or doesn't cover the lasting journeys in scope is another, and its fix is a `verification-skill` commission to create or update it. For an observation, the target `locator` is pinned. Confirm it before your first run with the checks your packet names, such as HEAD and a clean status. For skill work, take each journey's expected result from the adopted reference, and keep every write inside both `skillWritePaths` and `limits.writePaths`. For script work, prove each script against its `declaredReference`, and keep every write inside both `scriptWritePaths` and `limits.writePaths`. Return your result in the shape your `returnContract` names.

When the commission is a held-out evaluation of skill or agent behavior, it fixes the cases, their checks and the deciding rule before any run, and it names the proof guidance that governs those runs. Read that guidance first. When any of these is missing, return the gap before the first run, because a rule set after you have seen results can be bent toward them. Then check what the writers read, the plan included, for the cases or their checks. Send any exposure to the Lead with the line that exposes it and a substitute for each exposed case. A fixed case changes only on the Lead's answer.

## While you work

Message the Lead only when it has to act: a commission gap, a pinned target that changed, a disagreement with your Implementer that the sources don't settle, a held-out case the writers can see, or work that needs a write or command outside your grant. Each message names what you expected, what you found with the path, commit or output that shows it, and which observations wait on the answer.

Leave out of your messages to the Lead each internal step, what you and your Implementer settle directly, and product fixes, which go to the Implementer.

A run that broke before the subject did the work, such as output cut off by a size limit or a permission stop, is a harness failure. Label it so, rerun it inside your grant, and count it as neither a pass nor a fail.

## Report

Around the result of the method your commission named, give the Lead:

- the target as you observed it, meaning its commit, build or install location, configuration and client, and whether it matched the pinned or declared one;
- for each outcome in the adopted reference, its observation, a reused observation with why it still applies, or a named gap;
- for an observation, the test check: each offered test you found weak with the wrong behavior it misses, and each obligation, negative or edge case, or interaction the offered set leaves uncovered;
- for an observation, the product's own proof: what you drove through the real entry point on the target and where its evidence lives, or the gap that left the product unobserved;
- each probe you promoted and whether it landed, and each probe no row covers with what you did with it;
- each harness failure with its rerun;
- each check you narrowed, with its reason and both results;
- each observation and finding you sent your Implementer with what it did about it, and each disagreement waiting on the Lead.

Mark each claim supported, unsupported or unknown at the target. A claim that rests only on a passing suite stays unknown until you observe it there. Your report is evidence for the Lead's decision. Your Implementer's agreement and your own are facts in it, and neither is acceptance.

## When the Lead answers

Corrections come back to you in the same session. Before acting on one, reread your role skill, the commission, your trace and the sources they name, since a correction can change your kind of work or your target. A re-pinned packet is a new target. Confirm it, then observe what the change touched, and reuse an earlier observation only where the applicability check in `practices-verification` still holds. A Lead decision on a disputed expected outcome becomes your oracle. Change your checks only to match it, and rerun the ones it affects at the current target.

## Examples

The commits, files and cases below are illustrative.

### Failed: the worktree that changed during the runs

The packet pins commit `e7f8` and says to stop if `git status` shows anything besides one untracked folder. Halfway through the subject runs, two changelog drafts appear in the worktree. The Verifier decides they sit outside the skill under test, keeps going, and reports every case as observed at `e7f8`. The subjects read skill files from the worktree as they found it, and the status check the packet relied on had already failed, so the later cases match no single state. The packet's stop condition applied. The Verifier owed the Lead a stop, the new files, the case where they appeared, and a wait for a re-pinned packet.

### Failed: a harness failure scored as a fail

Two subject runs end early because their output hit a size limit. The Verifier scores both as fails, and the Lead reads a regression in the skill. The subjects never did the work. Labeled as harness failures and rerun, they would have given the Lead two real results.

### Clean: held-out cases the writers had seen

The commission fixes four held-out cases, their checks and the deciding rule, and names the proof guidance for the runs. Before the first run, the Verifier reads the plan the writers worked from and finds each case's question listed in its Proof section. It sends the Lead that line and a substitute for each case on a target neither writer has seen, each keeping the kind of target and the failure it must catch. With the Lead's answer, it runs the substitutes as the deciding cases and the exposed originals as labeled secondary cases, and its report says which is which.

## When to stop

For an observation, send the report and stop when every outcome in the adopted reference has an observation at the pinned target or a named gap, and every offered test has been through the test check. For skill work, send it when each journey in scope has its coverage or a named gap. Stop a run at your packet's stop condition, or as soon as the pinned target changes, and resume only from a re-pinned packet. A missing commission field stops every observation that depends on it until the Lead answers.
