# rule-making: every rule starts from a real, high-value mistake

**Reader:** the owner, deciding which rules exist; a rule's writer, starting one. **Question:** why does this rule exist, and is it worth anyone's attention? **Changes when:** the owner adds, reworks or drops a rule, or a new mistake is found.

A rule is worth running only if it catches something the owner has had to correct by hand, or checks a written standard by count or pattern. The inventory shows two areas where skill text itself shows the mistake: skills that don't teach judgment, and product details baked into general skills. The owner's most frequent corrections (checks not run for real, drifting from the ask, the wrong role) are about what an agent did, which no rule reading skill text can see.

### U9: A rule names the mistake it catches

`kind: requirement · capability: rule-making · status: authorized · was: R11`

Each rule records the real failure it exists for — a commit, a pull request, or an owner correction from the inventory — or the written standard it checks by count or pattern. The higher the owner's cost (how often, how strongly he reacted), the stronger the case for the rule. A judged rule with neither stays held (U17) until the owner decides it.

<details>
<summary>Authority and evidence</summary>

- Owner, 2 Nov: "none of the rkules seem kuseufl? kor how you set them kup so now i htink i n eed fkull escrpiton of each rule you feel confident in and hwy".
- Owner, 3 Nov: "Partailly rules also start with high value behaviour i want to test. its about using the high value mistacts and providign nudges too"; "we defiently have 3 real msitakes of all thigns i care about".
- Evidence note 16 (was E16): 3 of the 18 rules trace to real failures (#187, #166), 3 are written standards, 3 came from the owner's ask to check rule files, 9 were picked because a model could judge them. The owner approved the first six on 26 Oct; their usefulness was never measured.
- Mistake inventory: teaching (SM005–SM015, 6 episodes) and the general-skill rules (SM017–SM019, SM046, 3 episodes) are text-checkable with real before/after pairs (PR123; PR166 → PR171; PR187 `4eb1bd02`).

</details>

### U10: The rule list follows what the owner decided, rule by rule

`kind: requirement · capability: rule-making · links: U9, U16, U17 · status: authorized · was: R17`

The rules that exist, and what happens to each, are the owner's decisions of 2 and 3 Nov:

| Rule | Owner's decision |
| --- | --- |
| `skill-description.starts-with-use-when`, `skill-description.longer-than-225-characters`, `skill-description.longer-than-300-characters` | keep (written standards, checked by pattern and count) |
| `skill-description.names-the-loading-moment`, `skill-description.states-triggers-not-workflow-steps`, `load-call.names-when-where-and-result`, `skill-branch.names-an-observable-condition` | keep; test on history first |
| `description.always-earned` | drop (owner, 3 Nov: "also remvoe it, i just want to make sure always is not flagged by rules if i ask an agent to use it") |
| `completion.criterion` | drop for now, with a follow-up to rethink it (owner, 4 Nov (review 00facfd0 of the design page), decision 7: "listen we can do better what the fuck does this rule do ... can be follow up to focus on this") |
| `reference.teaching-depth`, `guidance.positive` | drop for now (owner, 3 Nov: "we can remove teachign depth for now. and guidance positive") |
| `main-path.spine` | drop for now (owner, 3 Nov: "ah lets drop it for now") |
| `general-skill.sends-agents-into-product-workflow` | rename (now the general-skill rules, U16) and keep, nudging per U16 |
| `general-skill.description-loads-for-one-product` | keep, as the general-skill standard's description check (owner, 4 Nov (review 00facfd0 of the design page), decision 2); held until the kind filter and its tests exist |
| `taught-rule.holds-beyond-one-project` | keep as its own rule; redo the filter and the rule ("we need to redo teh filter and teh rule"; owner, 4 Nov (review 00facfd0 of the design page), decision 2) |
| `question.names-field` | drop ("ok iname fiels seem suelss") |
| `rule-question.asks-exactly-one-thing`, `rule-question.criteria-answer-the-same-question` | held until old rule files give tests (the Lead's call; they overlap and may merge) |

No rule flags a description for opening with "Always": `skill-description.starts-with-use-when` accepts "Always use when" and "Always trigger when", and with `description.always-earned` dropped no other rule judges the word. A new rule that would flag it needs the owner's decision first.

<details>
<summary>Authority</summary>

Review 842d1327 of `rule-decisions-2026-11-03.html`, q4 (per-rule), q3a–c (placement rows); 2 Nov review of `rules-spec-2026-11-02.html` (names-field; generalization "we need to redo teh filter and teh rule"; guidance.positive "this evicde problem not a problem with the rule").

</details>

### U12: Behavior that skill text cannot show is listed, not made into a text rule

`kind: requirement · capability: rule-making · links: U9 · status: proposed (the Lead's reading of the inventory; for the owner to confirm)`

Where the owner's mistake is about what an agent did (it didn't run the check for real, it drifted from the ask, it used the wrong role), a rule over skill text can at most check that the skill teaches the behavior. The episode itself is recorded as a behavior-test candidate, with its source, for the later evals work. It is not built in this change (see the Boundary's first non-goal), and a text rule never claims to have caught the behavior.

<details>
<summary>Why this is proposed, not authorized</summary>

The owner wants high-value behavior tested (3 Nov comment under U9), and also put pressure tests and behavior comparisons after evals (31 Oct). Splitting "text rule that the skill teaches it" from "behavior test that the agent does it" reconciles both; it is the Lead's call and is put to the owner. The inventory's top behavior, "run the intended checks through their real path", has 7 episodes and 0 text-checkable records.

</details>

### U8: Rule files get rules

`kind: requirement · capability: rule-making · also serves: nudges · status: authorized · was: R8`

The JSON rule files are checked by rules whose nudges go to the rule's writer and the rule's reviewer: a question that asks two things, or whose criteria answer a different question from the one it asks.

<details>
<summary>Authority and evidence</summary>

Owner, 31 Oct: "we have rules that need to check json to amek srue its doen well thesrar eall nduges to agesnt". Evidence note 9 (was E9): lint's evidence projects are Markdown-only today, while `sunstack exec prepare_evidence` already parses JSON. `question.names-field` is dropped (U10), so it is no longer one of these rules.

</details>

### U11: The engine stays generic

`kind: requirement · capability: rule-making · also serves: skill-kinds, what-rules-read · status: authorized · was: R9`

Nothing in `sunstack-tools` knows about skills. Kinds, chunks, nudge kinds and related locations are declared by the caller's config and rules. An engine gap is fixed in the engine and released, never worked around in the skills, runner or rules.

<details>
<summary>Authority</summary>

Owner, 31 Oct: "our system was to be generic enokugh that any evidence and rules shoudl have been able to go in"; owner, 28 Oct (standing): no workarounds in sunstack or rules, fix the engine and release it.

</details>
