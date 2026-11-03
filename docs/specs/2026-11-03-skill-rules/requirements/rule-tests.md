# rule-tests: a rule earns its nudges by passing real tests

**Reader:** the owner, deciding whether to trust a rule; a rule's writer, proving one. **Question:** has this rule been shown to catch the mistake and stay quiet on good text, and where did its bars come from? **Changes when:** a rule's cases or bars change, or the owner changes the floor.

Today the tests mostly check silence: of 245 recorded cases, 0 to 7 per rule must fire, four judged rules have none, and no fire case comes from a past mistake. Meanwhile the repository's history holds 125 commits that changed a skill's description. This capability makes a rule's tests come from real history and real skill text, and keeps a rule from nudging anyone until it passes them.

<a id="u17"></a>
### U17 · Real cases come before any nudge

`kind: requirement · capability: rule-tests · status: authorized · was: R14`

Each judged rule has, before it nudges anyone, at least **3 real mistakes** (it must fire), **3 good texts** (it must stay quiet), and **3 near misses** (the boundary cases it once got wrong or could), plus a **held-back set** it is never tuned on. The text before a real fix must fire and the text after must stay quiet; every wrong nudge it gave on real skills becomes a must-pass case. Where the owner made the fix, the fix is the label; otherwise agents label blind and their disagreements go to the owner. A rule short of its cases is listed as held, with what it lacks.

<details>
<summary>Authority and evidence</summary>

- Owner, 3 Nov (q5): picked the starting floor 3 real mistakes, 3 good texts, 3 near misses plus a held-back set; "we defiently have 3 real msitakes of all thigns i care about".
- Owner, 2 Nov: "it seems liek we3 need to do better for evals now it doesnt look liek we did a good job"; "did we use descripition for prior bad descriptiosn to test as evasl?".
- Evidence notes 13 and 14 (were E13, E14): 245 cases, mostly silence; 125 description-changing commits (`git log -G'^description:' -- 'plugins/*/skills/*/SKILL.md'`).

</details>

<a id="u18"></a>
### U18 · Each rule's bars are its own

`kind: requirement · capability: rule-tests · status: authorized · was: R13`

Every decision step's bars are set from that rule's own cases and recorded beside the cases that set them. Each rule configures its own; a sensible starting value is where tuning begins, not where it ends. Nothing overrides a rule's bars: not a skill, a kind or a config.

<details>
<summary>Authority and evidence</summary>

- Owner, 2 Nov: "1. yes then eveyr rkule shoud configure it no"; "6. no override wierd stuff"; earlier the same day: "thresholds shodul be configured per skill weiht a sesionble rdeualt per rule sorry", then corrected to per rule.
- Evidence note 15 (was E15): the engine already requires every decision step to state its own bars (`sunstack-tools` `crates/sunstack-rules/src/rulebook_planning/decision_graph_contracts.rs:121-122` at `1a87fd7`, equal to release v0.6.0); every value in use is the untuned 0.7/0.3, or 0.6 for a choice.
- Evidence note 11 (was E11): of 195 wrong nudges on 30 Oct, none came from a bar; they came from what the rule read (117), the question's wording (62) and the selected piece (16).

</details>

<a id="u19"></a>
### U19 · Cases are real skill text, never made up

`kind: requirement · capability: rule-tests · status: authorized`

A rule's cases come from real skill text: current skills, their git history, other repositories' skills, and upstream collections, each case citing its source and commit. Synthetic text never counts as proof. Copied fixtures belong only where `sunstack-tools` tests its own mechanics; rule cases point at snapshots of real skills.

<details>
<summary>Authority</summary>

Owner, 1 Nov (standing): rule and eval cases come from real skill text; synthetic toys never count as proof. Inventory SM052: "Only susntack-toosl needs fixtures because its testing mechncial apsect of the thool / not sunstack".

</details>
