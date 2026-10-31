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

   Completion: each field is filled from the evidence at hand, or marked unknown with the read or the one question that would fill it.

2. Create the debug artifact when appropriate:
   - Use `<repo-root>/tmp/debug-workflows/<yyyy-mm-dd>-<repo>-<branch>-<bug-slug>/debug-investigation.md`.
   - Keep it updated with evidence, hypotheses, proof steps, and commands.
   - Skip file creation only for chat-only/no-files requests or unclear debugging scope.

   Completion: the artifact exists at that path holding the bug packet, or the reason it wasn't written (chat-only output, or a scope still unclear) is stated.

3. IF the monitoring is file-backed and long-running, load `references/background-monitoring.md`, keep the watcher read-only, harness-visible, cancellable, stateful, and redacted, and return its launch surface, state files and stop path, or the blocker report. For chat-only/no-files monitoring, provide a visible non-persistent plan or report a blocker; do not create watcher files.

   Completion: monitoring that is file-backed and long-running has its watcher plan or blocker report, chat-only monitoring has its visible plan or blocker, and any other investigation skips this step.

4. Reproduce or bound the failure:
   - exact command, UI path, input, or event sequence
   - deterministic, flaky, environment-specific, or not yet reproduced
   - smallest known failing surface

   Completion: the failure is reproduced by a stated command, path, input or sequence, or bounded with its classification and the smallest failing surface known.

5. Trace the code path:
   - read the failing boundary and its callers in current code, with the logs, stack traces, and runtime state of the real run, and name the line or event where expected and actual behavior first diverge; mark each link in that path as seen or inferred, and record a read or run that the sandbox, credentials, or network blocked as a gap in access ([read ground truth first](../principle-read-ground-truth-first/SKILL.md))
   - separate source cause from downstream symptom

   Completion: the line or event where expected and actual behavior first diverge is named, each link in the path is marked seen or inferred, and each blocked read or run is recorded as an access gap.

6. Check recent changes and working examples:
   - git diff, recent commits, changed config, dependency or schema drift
   - nearby working code that follows the intended pattern

   Completion: each recent change or drift that touches the traced path is named or ruled out, and a nearby working example is named, or none was found.

7. Form ranked hypotheses:
   - state one concrete root-cause hypothesis at a time
   - list supporting evidence and missing evidence
   - label how far the evidence reaches: an unconfirmed hypothesis when no opened source, log, or run shows the mechanism itself; a mechanism confirmed in source when you read it in the code but have not observed it acting in this incident; or that mechanism observed causing this failure, claimed only with a reproduction, log, or trace that shows it
   - name the smallest proof step that would confirm the hypothesis or rule it out

   Completion: the hypotheses are ranked, and each carries its supporting and missing evidence, its evidence label and its smallest proof step.

8. Recommend next action:
   - prove now
   - fix next
   - follow up later

   Completion: one action is chosen, naming the ranked hypothesis it acts on, the proof step or fix it takes, and the uncertainty from step 7 it removes.
