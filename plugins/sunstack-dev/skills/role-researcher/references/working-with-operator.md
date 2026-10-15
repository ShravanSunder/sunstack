# Working with an Operator

This file covers what you put into a 🔧 Operator's procedure when you commission one, what you keep out, how you read its handback and when you stop. `practices-manage-agents` owns the packet, form, model and route, so write the commission there and fill its procedure from this file. When someone else commissioned the Operator and you only interpret its candidates, get its roots, criteria and pre-run expected observations from your commissioner before you read the handback, because the handback doesn't carry them, or name the exact input that's missing as a gap. As a Worker, return any further collection to your parent instead of commissioning it.

Return the procedure or criteria used with their expected observations, or the exact input gap, what the run check showed, each candidate you adopted with the anchor you opened and its `basis`, and every exception or miss as a gap.

## Before you write it

The job is ready for an Operator once you can write its criteria and expected observations before anything runs. If you can't yet say what a match looks like, open a few sources yourself until you can. Give bulk reading to a script and an Operator first, and reduce what comes back yourself.

Cut the procedure where a choice depends on what an earlier step showed. That choice is yours, so commission the next part after you read the first.

## What to send

- The exact roots: the folder or file list, the URLs, and the commit or dependency version, so you can reopen what it read.
- The script or commands to run, written or read by you. For guided collection, the criteria in the words the sources use, with their variants, and candidate labels defined by what is visible in the text, `unclear` among them.
- What each candidate carries: a pointer you can reopen (path and line, URL with anchor, commit), the excerpt, and enough surrounding text to tell whether it's worth opening. Large output goes to a file at a path you name.
- A `stopCondition` that hands back on the first failed step, an unreachable source, or a count far outside your estimate.

Before you send it, write into the packet's expected observations what the run should show when the criteria work, with one control (a source you know matches and expect in the output) and a rough count, so the handback can't set its own bar ([verify before accepting](../../principle-verify-before-accepting/SKILL.md)). When you only interpret, the bar is the expectations written before the run, never ones you write after reading the output.

## What to keep out

- The answer you expect. Labels should come from the criteria, and a stated hypothesis hands the labeler a second criterion you never wrote down.
- Any request for meaning, such as which items matter, what was decided, what the effective value is, a summary or a ranking. Ask for the material that would let you decide.
- Room to improvise. Say that a failed step stops the run and comes back as an exception, and never ask it to work around a failure.
- Your ledger, your trace and your other questions. The Operator needs the procedure, the sources and its grant.

## Reading the handback

Check the run before the content. Compare each step's output and exit code with the observation expected before the run. A zero exit says the script ran. When the control is missing or the count is far off, the criteria or the run went wrong, and the rest of the output can't stand in for the sources.

Resolve each exception yourself. Correct the criteria or script and send the re-run to whoever commissioned the Operator (your parent, if you're a Worker), open the source yourself, or carry it into `gaps` with what would settle it.

Open the source of every candidate your answer rests on, read the passage around it, and only then tag the claim `source` or `history` as your method maps it. An inventory you take from the digest, such as a count of notes marked active, names the digest as its anchor and says the labels weren't checked one by one.

Look for what the criteria missed. Open a few items labeled `unclear` and a few sources in the roots that returned nothing. An empty result means the criteria matched nothing in the roots the commission named, and it goes in your null results with the criteria as its query.

Record the digest path, counts and exceptions in your trace. The Operator opens no trace of its own.

## When to stop

Stop collecting when the anchors you opened settle the question, or when what's left is judgment about meaning, which is yours.

Send another round to whoever commissioned the Operator (your parent, if you're a Worker) only when you can name what changes in the criteria or roots and which observation from the last run calls for it. Rerunning the same extraction adds no evidence.

When a corrected round misses its control again, stop commissioning and read a sample of sources yourself until you can say what a match looks like.

Your commissioner gets your claims with the anchors you opened. The Operator's handback stays your input and never goes up as your answer.

You're done with this file when every candidate your answer uses has an anchor you opened, the control's result or the missing pre-run expectations are recorded, and every exception is resolved or carried as a gap.

## Cases

### Failed: the effective retry limit

A Researcher asked an Operator for the effective retry limit in a sync client. The Operator found `maxRetries = 3` in the defaults file and returned 3. The config loaded at startup sets 5. The commission asked for a conclusion that only tracing the real path could reach. Done well, it asks for every assignment to `maxRetries` and every config key that sets it, each with path, line and five lines of context, and the Researcher traces which one runs.

### Failed: the search that found nothing

A Researcher's criteria searched incident notes for "rollback". The Operator returned zero matches with exit 0, and the Researcher wrote that no incident involved a rollback. The notes say "revert" and "rolled back". Done well, the criteria list the words the notes use, one note known to describe a rollback rides along as the control, and the empty result is recorded as a null result for the words searched.

### Clean: seventy design notes

A Researcher needs the current status of about 70 design notes. It writes a script that pulls each note's title, date, status line and open-item lines into one digest file, names the folder, and expects one row per note, with a note it already knows as the control. The Operator runs it and returns the digest path, one row per file, the control row and exit 0. The Researcher reads the digest, opens the six notes whose status lines decide the question, and returns its answer anchored on those six, with the digest as the anchor for the inventory. It stops there, because reading the other notes in full would add no claim the answer uses.
