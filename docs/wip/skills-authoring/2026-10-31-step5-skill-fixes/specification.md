# Step 5 skill fixes: specification

Draft 2, by the 🦁 Lead, 2026-10-31 (after the design review). Part two: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md).

## What must hold

- **C1** No description in a run's skill is over 225 characters. Each starts with `Use when`, `Trigger when`, `Always use when` or `Always trigger when`, and keeps its loading moment and its adjacent-skill boundary. A description says when to load the skill, not what the skill contains or how it works.
- **C2** Each real `completion.criterion` finding's step carries a completion (a `Completion:` line naming an observable done state and the legwork the step needs), or is merged into the step it serves. The 81 D4-held steps are not edited.
- **C3** Each real finding of these three rules is fixed as follows:
  - `branch.condition`: it names a condition the agent can see in the work (a file, a request, a returned result, a named artifact), not its own doubt, need or a sense of size. The new condition selects every case the old one was meant to select, in both directions where the decision has two.
  - `reference.teaching-depth`: the section gains whichever of what to inspect, what good and bad look like, or when to stop is missing.
  - `call.completeness`: the call says what comes back.
- **C4** Every finding in the run's list has a disposition at its line in the writer's receipt: fixed with the smallest repair, or explained as conforming, quoting the standard.
- **C5** No change alters what a skill is for, which skills it calls, what it returns or its route tokens, and no marked standard sentence or `rules/` file changes. A change to any of those returns to the Lead.
- **C6** Shipped text stays general: no repository command, machine path, run, session or pull request number is added.
- **C7** After each run, a complete keyed rules run over its skill, with no incomplete part and no skipped rule, gives 0 errors and no description warning there. Every remaining finding in the run's list has its disposition. The run is recorded with its identities. A batch's PR waits until each of its runs passes.
- **C8** Every edit to an existing sensitive surface keeps that surface's guards. The surfaces are listed in the skill design's security inventory; the guards are credential mode, child-only use, cleanup and redaction; the recorded process target and its authority; the scan, save and repair authority; and the effects of lifecycle and producer loops. No edit adds a command, credential, privileged action or operational effect.
