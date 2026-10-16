# Project Capability Maintenance

This reference owns upkeep of an existing project verification skill: reconciling it with source, planning the live coverage and sorting out what fails.

Expected inputs: the canonical skill path, the journeys in the assigned coverage, the source map from `practices-how`, the adopted sources and the paths you may write.

Return: drift for each journey with its anchors, the corrections made, the journeys the live pass must drive and how, and at step 5 each failure's cause.

## Edit scope

Edit only the skill's canonical directory (its `SKILL.md`, journey files and owned helpers) and its Claude link. When the app no longer does what the skill describes, either the skill drifted and you correct it, or the product regressed and you report it. The adopted source decides which.

## Read the whole skill

Read `SKILL.md`, the journey index and every journey file in scope. Fix index entries that are missing, extra, duplicated or dead. Keep this pass light, because the index is the only inventory.

## Source pass for each journey

For each journey in coverage, use the `practices-how` map to say how the behavior works now, where the skill disagrees with the source (with anchors), and one recipe for driving it live. Keep this pass read-only, with no driving and no edits. When it is done, you carry on yourself into the corrections and the live pass.

Measure drift against the adopted source. When the source and the skill disagree, ask which one matches the adopted outcome. Source that carries out an adopted change means the skill went stale. Source that contradicts the adopted outcome is a candidate regression for the live pass to confirm.

## Reconcile

- Check that every journey in coverage has its summary from the source pass.
- Where recipes overlap, combine them so several journeys run from one app state. Keep the number of states as small as practical, so the live pass doesn't relaunch for each journey.
- Open the anchor behind each drift claim before acting on it. Claims the source pass found clean need no second proof.
- Look for user-facing surfaces the skill doesn't cover among the changes since the skill last changed. `git log -1 --format=%H -- .agents/skills/verify-<app>` gives that commit, and `git log --oneline <commit>..HEAD -- <app source paths>` lists the app changes after it. Call a surface missing only with a concrete source path. Add it when the request covers it, and otherwise report it as a candidate journey.

## Live pass

The live pass runs through `practices-verification` at step 4 and uses the launch model the project skill defines. A server or a UI gets one long-lived instance that the drives use in turn, and a short-lived CLI gets a new isolated session for every drive. One agent does all the driving. Hold these for the whole pass, whatever fails:

1. Run the health check before the first drive, on each fresh session and after any failed drive. When a failure doesn't show in the health check, as with a stuck UI whose process stays healthy, relaunch or restore a known state before the next drive.
2. Every cleanup leaves the evidence gathered so far intact. Open it at its named location to confirm.
3. Remove what a drive started once nothing needs it. Clean up after every failed attempt, including one whose session is stuck, has exited or is shared. On a shared instance, remove what the attempt left and keep the instance running.

When the health check fails because the skill drifted, the failure counts as drift. Correct the skill within the edit scope, restart only what the correction invalidated and retry once; if the retry fails too, the pass is `blocked`. Call a journey unreachable only when you can name the specific prerequisite that stops it, such as auth, an entitlement, an OS or external state, along with the route you tried. A prerequisite the skill doesn't mention is drift in the skill. Leave the final teardown until every drive in the run is done, including the drives that re-check corrections.

## Triage

| What the evidence shows | Cause | What to do |
| --- | --- | --- |
| The skill's account of the user path is wrong or missing, and the adopted source agrees with the app | drift in the skill | Correct the skill and drive it again |
| The behavior works, but the helper or recipe can't drive it | driver gap | Repair within the named helper paths, run the helper alone, then drive again |
| The app breaks an adopted outcome | product regression | Keep the journey and report the regression with its evidence |
| The adopted source is silent, disputed or contradicted by another adopted source | unsettled expectation | Return it to whoever owns that expectation |
| A prerequisite you can't reach blocks the journey | unreachable | Report the prerequisite and the route tried |
| The evidence shows none of these | unknown | Return the observation and the missing evidence that would decide it |

A repaired helper follows the helper rules in the layout reference.

## Outcomes

- `clean`: every journey in coverage has its source pass and a live observation or applicable reuse, and nothing needed changing. Nothing to commit.
- `changed`: corrections were made, and each was driven again.
- `blocked`: coverage stopped short, or a correction couldn't be proven. Name exactly what stopped it.

Write short run notes in scratch or the task's existing evidence home, outside the skill: the outcome, the journeys covered, the drift you confirmed and any unreachable prerequisites.

## Example

The case is fictional. The `search` journey says pressing Enter submits a query. The live pass shows Enter now inserts a newline and Ctrl+Enter submits. Two readings fit that observation.

If release notes the owner adopted moved submission to Ctrl+Enter, the skill went stale. Correct the journey, cite those notes and drive it again.

If the adopted spec still says Enter submits, the app regressed. Keep the journey as written, report the regression with the transcript and mark the journey failed. Editing the journey to Ctrl+Enter because that works today would hide the regression from every later run.

## When to stop

Stop when each journey in coverage has a source summary and either a live observation, an applicable reuse or a named gap; each failure has one cause from the triage table with its evidence, or is returned as unknown; each correction kept was driven again; the evidence is confirmed after the final teardown; and the outcome is `clean`, `changed` or `blocked`.
