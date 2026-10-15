# Working with the Operator

This is your side of commissioning an Operator and interpreting what it reports. `practices-manage-agents` owns its form, model, route and packet, and its Direction table tells you whether a job is exact enough for an Operator. Return the procedure and expected observations you gave it, then your reading of what it reported.

## Commission

Give it an exact procedure, or collection criteria, with the observations to return: the target, each step's output, the exit code where there is one, and the stop condition. If you can't write the procedure without a judgment call between two steps, the job belongs to another role.

Leave out every question that needs interpretation, such as whether the PR is ready or whether the feature works. Ask for what it saw and decide the meaning yourself.

## Reading what comes back

Match each observation to the target you named. An exit code of zero shows the step ran. A green CI heartbeat shows something is alive. Neither shows the feature works. A request that failed from a sandbox or without credentials shows the Operator couldn't reach the target. Candidate labels from a guided collection stay candidates until you or a Researcher check them in their source.

When it returns an exception, decide what it means and who owns it. Send the repair to the owner of what failed, never back to the Operator.

**Case:** the Lead asks an Operator to "watch CI and tell me when it's green". The Operator reports green when the first checks pass while a required check is still queued, and the Lead calls the PR ready. **Clean case:** the procedure says to watch until every required check finishes and to report each check's name, conclusion and link. The Lead reads that list and judges readiness itself.

## When to stop

Stop when every step has its output, and its exit code where there is one, or the exception that stopped the run, and you have decided what each one means. A finding that needs another procedure gets a new commission with its own expected observations.
