## Workflow

1. Build the bug packet:
   - symptom
   - target
   - expected behavior
   - actual behavior
   - reproduction steps or why reproduction is not yet proven
   - scope of impact
   - evidence already available
   - artifact path, or why no artifact is being written yet
2. Create the debug artifact when appropriate:
   - Use `<repo-root>/tmp/debug-workflows/<yyyy-mm-dd>-<repo>-<branch>-<bug-slug>/debug-investigation.md`.
   - Keep it updated with evidence, hypotheses, proof steps, and commands.
   - Skip file creation only for chat-only/no-files requests or unclear debugging scope.
3. IF the monitoring is file-backed and long-running, load `references/background-monitoring.md` and keep the watcher read-only, harness-visible, cancellable, stateful, and redacted. For chat-only/no-files monitoring, provide a visible non-persistent plan or report a blocker; do not create watcher files.
4. Reproduce or bound the failure:
   - exact command, UI path, input, or event sequence
   - deterministic, flaky, environment-specific, or not yet reproduced
   - smallest known failing surface
5. Trace the code path:
   - read the failing boundary and its callers in current code, with the logs, stack traces, and runtime state of the real run, and name the line or event where expected and actual behavior first diverge; mark each link in that path as seen or inferred, and record a read or run that the sandbox, credentials, or network blocked as a gap in access ([read ground truth first](../principle-read-ground-truth-first/SKILL.md))
   - separate source cause from downstream symptom
6. Check recent changes and working examples:
   - git diff, recent commits, changed config, dependency or schema drift
   - nearby working code that follows the intended pattern
7. Form ranked hypotheses:
   - state one concrete root-cause hypothesis at a time
   - list supporting evidence and missing evidence
   - label how far the evidence reaches: an unconfirmed hypothesis when no opened source, log, or run shows the mechanism itself; a mechanism confirmed in source when you read it in the code but have not observed it acting in this incident; or that mechanism observed causing this failure, claimed only with a reproduction, log, or trace that shows it
   - name the smallest proof step that would confirm the hypothesis or rule it out
8. Recommend next action:
   - prove now
   - fix next
   - follow up later
