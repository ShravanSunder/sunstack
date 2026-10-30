# Practice skills cleanup: specification

Draft 1, by the 🦁 Lead, 2026-10-30. Part two: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md).

## What must hold

- **C1** No description of the nine skills is over 225 characters; each starts with `Use when`, `Trigger when`, `Always use when` or `Always trigger when`; each keeps every loading moment it has today (the situations and phrases that make an agent load it) and its adjacent-skill boundary (`Not for ...`). Where 225 characters can't hold every moment, the writer keeps the moments an agent can't infer from the skill's name and returns the dropped ones to the Lead before committing.
- **C2** Every numbered step in a workflow section either carries a completion (a `Completion:` line naming an observable done state and the legwork the step needs) or is merged into the step it serves. A step left as it is gets a one-line explanation in the writer's receipt. A completion added or changed must hold on every branch the step already supports (read-only use, missing input, chat-only output, an intentionally new path, a narrow edit); the writer walks those branches and records them.
- **C3** Every other finding the rules raise (positive guidance, teaching depth, branch condition, call completeness) has a disposition at its line: fixed with the minimal repair when the writer, reading the standard there, finds a real failure, and otherwise explained as conforming or a false positive, quoting the standard. A finding that disappears from a later run without a disposition isn't settled. Every `uncertain` piece is decided by the writer and recorded.
- **C4** No change alters what a skill is for, which skills it calls, what it returns or its route tokens. A change to any of those is out of scope and returns to the Lead.
- **C5** Shipped skill text stays general: no repository command, machine path, run, session or pull request number added.
- **C6** After the fixes, a complete run of the twelve rules over all nine skills (no incomplete part, no skipped rule) gives 0 errors and no description warning, and every remaining warning and uncertain piece has its disposition; the run is recorded with its usage and identities. Any later run over changed skills is attributed separately, by its own scope.
