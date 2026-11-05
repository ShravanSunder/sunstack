# rule-tests: what a rule must pass before it nudges

**Reader:** the owner, deciding whether to trust a rule; a rule's writer, proving one. **Question:** which scenarios must a rule pass, where do they come from, and where did its bars come from? **Changes when:** a rule's scenarios or bars change, or the owner moves the floor. Requirements: [rule-tests](../requirements/rule-tests.md). Entities: [E8 Scenario](entities.md#e8-scenario), [E9 Bar](entities.md#e9-bar), [E3 Rule](entities.md#e3-rule).

### P4: Problem

Of 245 recorded scenarios, most check silence, four judged rules have no scenario that must fire, no fire scenario comes from a past mistake, and every bar is the untuned starting value.

### O4: Outcome

For any rule, the reader sees real mistakes it catches, good texts and near misses it stays quiet on, held-back results it was never tuned on, and the scenarios behind each bar.

### R18: A judged rule nudges only after its floor

`kind: obligation · capability: rule-tests · links: U17, E3, E8, C1, C5, V18 · status: authorized`

A judged rule is `nudging` only while: it has at least 3 real-mistake scenarios, 3 good scenarios and 3 near-miss scenarios in development, plus a held-back set frozen before any of its bars was recorded and never cited by a bar; and the owner adopted it after a complete scenario run of its current definition (its questions, bars, chunk, kind gate and scenarios, on the current engine and model) gave every development and held-back scenario its label, with none unsure. Scenario-run results are not kept in git; the adoption records the definition's fingerprint, so any change to the definition holds the rule until it passes and is adopted again. Scenarios that were already seen while designing a rule are development scenarios, however they were once labelled. Each real fix's before text is a `fire` scenario and its after text a `quiet` scenario, kept together in one set. Every wrong nudge the rule gave on a real skill is a must-pass scenario. If any of these fails, then the rule is `held` and the run lists what it lacks.

### R19: Labels say where they came from

`kind: obligation · capability: rule-tests · links: U17, E8, V19 · status: authorized`

Each scenario's label cites its basis: the owner's fix or words; blind labels from agents that agreed; or the owner's decision where they disagreed. A `disputed` scenario counts toward no floor until the owner decides it, and neither does a scenario whose label predates this policy (kept with its original history) until it is labelled again on one of these bases.

### R20: Bars are tuned per rule from its development scenarios

`kind: obligation · capability: rule-tests · links: U18, E9, C1, V20 · status: authorized`

Each decision step's current bar values are recorded together with the development scenarios that justified them; a value may equal the starting default if the scenarios support it. A bar not yet assessed is `starting`, and a judged rule with any `starting` bar, or a bar whose current value differs from its recorded one, is `held`. No config, skill or kind can change a rule's bars: there is no override mechanism.

### R21: Scenarios are real skill text

`kind: obligation · capability: rule-tests · links: U19, E8, V21 · status: authorized`

Every scenario cites a repository, path, commit and span of real skill text. No made-up text counts toward a floor. Copied text fixtures appear only in `sunstack-tools`' tests of its own mechanics.

### C5: The scenario set

`kind: contract · capability: rule-tests · links: R18–R21 · status: authorized`

For each rule a reader can see: its scenarios by kind (real mistake, good, near miss), by set (development, held-back), by label status (labelled, disputed), each with its source and label basis; its last results on both sets; and whether it meets the floor.

### Proof obligations

| V | For | What decides pass and fail | Reference |
| --- | --- | --- | --- |
| V18 | R18 | no `nudging` judged rule is short of its floor or fails a scenario; a fix pair never splits across sets | the scenario sets |
| V19 | R19 | every label cites its basis; no disputed scenario is counted | the scenario sets; owner decisions |
| V20 | R20 | every nudging rule's current bar values equal the values recorded with their development scenarios; a `starting` bar, or a value changed after it was recorded, keeps the rule held; no override setting exists | the rule files; the scenario files; the config schema |
| V21 | R21 | every scenario resolves at its cited commit and span | git |
