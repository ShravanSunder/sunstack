# rule-making: every rule starts from a real, high-value mistake

**Reader:** the owner, deciding which rules exist; a rule's writer, starting one. **Question:** why does this rule exist, and is it worth anyone's attention? **Changes when:** the owner adds, reworks or drops a rule, or a new mistake is found.

A rule is worth running only if it catches something the owner has had to correct by hand, or checks a written standard by count or pattern. The inventory shows two areas where skill text itself shows the mistake: skills that don't teach judgment, and product details baked into general skills. The owner's most frequent corrections (checks not run for real, drifting from the ask, the wrong role) are about what an agent did, which no rule reading skill text can see.

### U9: A rule names the mistake it catches

`kind: requirement · capability: rule-making · status: authorized · was: R11`

Each rule records the real failure it exists for — a commit, a pull request, or an owner correction from the inventory — or the written standard it checks by count or pattern. The higher the owner's cost (how often, how strongly he reacted), the stronger the scenario for the rule. A judged rule with neither stays held (U17) until the owner decides it.

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
| `general-skill.overfits-to-product-workflow` | keep: the general-skill family's section check (was placement) |
| `general-skill.description-overfits-to-one-product` | keep: the family's description check (was product-loading); held until the kind filter and its tests exist |
| `general-skill.taught-rule-overfits-to-one-project` | keep: the family's taught-rule check (was generalization), redone with its filter ("we need to redo teh filter and teh rule"); merged into the family by owner, 4 Nov (reviews 08411599 and a42f545e), decision 2 "merge both" |
| `question.names-field` | drop ("ok iname fiels seem suelss") |
| `rule-question.asks-exactly-one-thing`, `rule-question.criteria-answer-the-same-question` | held until old rule files give tests (the Lead's call; they overlap and may merge) |

No rule flags a description for opening with "Always": `skill-description.starts-with-use-when` accepts "Always use when" and "Always trigger when", and with `description.always-earned` dropped no other rule judges the word. A new rule that would flag it needs the owner's decision first.

<details>
<summary>Authority</summary>

Review 842d1327 of `rule-decisions-2026-11-03.html`, q4 (per-rule), q3a–c (placement rows); 2 Nov review of `rules-spec-2026-11-02.html` (names-field; generalization "we need to redo teh filter and teh rule"; guidance.positive "this evicde problem not a problem with the rule").

</details>

### U12: The review skill is proven by two real evals

`kind: requirement · capability: rule-making · also serves: nudges, rule-tests · status: authorized`

Two evals run the review skill the way a Lead launches a review agent: a Luna agent on high effort gets a real commission and the real session data, reviews a real change, and writes its review. One change is #187's line 17 (AgentStudio's debug loop in a general skill); the other is PR166's storage rule. Jev judges each review; when Jev is undecided, a Terra judge on medium effort decides. The owner's other "what the agent did" mistakes (checks not run for real, drifting from the ask, the wrong role) stay listed with their sources for later evals; no text rule claims to catch them.

<details>
<summary>Authority</summary>

Owner, 4 Nov: "build behavior tests now" (decision 1), clarified as "yes real scneario real ksill real session input" and "teh review skill agent calls tehse rules -> taht is the trigger it ahs isntruciotns runnign it against the exapmle and getting review artifact can be 1-3 integriaotn ests we can sue luna models"; review 08411599: "ok this is a normal eval not integraiton test.  the eval passes with jev and judge model if jev is undecided and we use a terra medium / luna high is the subject"; B: "#187's line 17 and the PR166 storage blacklist"; A: "a review agent is lauched by lead, it definetly has intpus and sesison data" (confirmed in review a42f545e).

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

This change adds nothing skill-specific to `sunstack-tools`; the engine's existing skill-aware target loader is later work (owner, 4 Nov, decision 9: "Later work, logged"). Kinds, chunks, nudge kinds and related locations are declared by the caller's config and rules. An engine gap is fixed in the engine and released, never worked around in the skills, runner or rules.

<details>
<summary>Authority</summary>

Owner, 31 Oct: "our system was to be generic enokugh that any evidence and rules shoudl have been able to go in"; owner, 28 Oct (standing): no workarounds in sunstack or rules, fix the engine and release it.

</details>
