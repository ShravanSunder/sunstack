# rule-tests: what a rule must pass before it nudges

**Reader:** the owner, deciding whether to trust a rule; a rule's writer, proving one. **Question:** which cases must a rule pass, where do they come from, and where did its bars come from? **Changes when:** a rule's cases or bars change, or the owner moves the floor. Requirements: [rule-tests](../requirements/rule-tests.md). Entities: [E8 Case](entities.md#e8), [E9 Bar](entities.md#e9), [E3 Rule](entities.md#e3).

<a id="p4"></a>**P4 · Problem.** Of 245 recorded cases, most check silence, four judged rules have no case that must fire, no fire case comes from a past mistake, and every bar is the untuned starting value.

<a id="o4"></a>**O4 · Outcome.** For any rule, the reader sees real mistakes it catches, good texts and near misses it stays quiet on, held-back results it was never tuned on, and the cases behind each bar.

<a id="r18"></a>
### R18 · A judged rule nudges only after its floor

`kind: obligation · capability: rule-tests · links: U17, E3, E8, C1, C5, V18 · status: authorized`

A judged rule is `nudging` only while: it has at least 3 real-mistake cases, 3 good cases and 3 near-miss cases in development, plus a held-back set; it gives every development case its label; and it gives every held-back case its label. Each real fix's before text is a `fire` case and its after text a `quiet` case, kept together in one set. Every wrong nudge the rule gave on a real skill is a must-pass case. If any of these fails, then the rule is `held` and the run lists what it lacks.

<a id="r19"></a>
### R19 · Labels say where they came from

`kind: obligation · capability: rule-tests · links: U17, E8, V19 · status: authorized`

Each case's label cites its basis: the owner's fix or words; blind labels from agents that agreed; or the owner's decision where they disagreed. A `disputed` case counts toward no floor until the owner decides it.

<a id="r20"></a>
### R20 · Bars are tuned per rule from its development cases

`kind: obligation · capability: rule-tests · links: U18, E9, C1, V20 · status: authorized`

Each decision step's bars are set from its rule's development cases and recorded with the cases that set them; a bar still at its starting value is shown as `starting`. No config, skill or kind can change a rule's bars: there is no override mechanism.

<a id="r21"></a>
### R21 · Cases are real skill text

`kind: obligation · capability: rule-tests · links: U19, E8, V21 · status: authorized`

Every case cites a repository, path, commit and span of real skill text. No made-up text counts toward a floor. Copied text fixtures appear only in `sunstack-tools`' tests of its own mechanics.

<a id="c5"></a>
### C5 · The case set

`kind: contract · capability: rule-tests · links: R18–R21 · status: authorized`

For each rule a reader can see: its cases by kind (real mistake, good, near miss), by set (development, held-back), by label status (labelled, disputed), each with its source and label basis; its last results on both sets; and whether it meets the floor.

### Proof obligations

| V | For | What decides pass and fail | Reference |
| --- | --- | --- | --- |
| <a id="v18"></a>V18 | R18 | no `nudging` judged rule is short of its floor or fails a case; a fix pair never splits across sets | the case sets |
| <a id="v19"></a>V19 | R19 | every label cites its basis; no disputed case is counted | the case sets; owner decisions |
| <a id="v20"></a>V20 | R20 | every bar is `starting` or cites its cases; no override setting exists | the rule files; the config schema |
| <a id="v21"></a>V21 | R21 | every case resolves at its cited commit and span | git |
