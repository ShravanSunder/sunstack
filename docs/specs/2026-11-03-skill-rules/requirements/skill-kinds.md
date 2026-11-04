# skill-kinds: a rule judges only the skills its standard is about

**Reader:** the owner and a rule's writer. **Question:** which skills does this rule judge, and what happens when we can't tell? **Changes when:** the kinds, the filter, or a rule's declared kinds change.

Not every rule applies to every skill. A rule that says "a general skill shouldn't send agents into one product's own workflow" is wrong on a product's own skill, where that workflow is the point. On 1 Nov, 4 of placement's 9 wrong nudges were product skills' own text (Peekaboo 3, AgentStudio 1). So each skill gets one judgment of what its work is for, and each rule judges only the kinds it is about.

### U13: The kind of a skill is what its work is for, judged once

`kind: requirement · capability: skill-kinds · also serves: rule-making · status: authorized · was: R12`

A model reads each skill's description once and answers what the work is for: **any repository**, **one named tool or platform**, or **one app's own procedures**. Each rule declares the kinds it judges and takes that one answer as input; no rule re-asks it. The run shows each skill's judged kind and how sure the model was. A product's own skill is never judged by a rule about general skills.

<details>
<summary>Authority and evidence</summary>

- Owner, 2 Nov: "we have domain -* but we can no thsi frorm diescripiton too? descripton is filter"; "shoukd valdiate if this is about a product or domain and ahve that as input no?". Owner, 3 Nov (q2a): picked "what the work is for" with these three answers. Owner, 3 Nov: "the skill shodu only trigger on gneeral skilsl how will you filter".
- Evidence note 17 (was E17): a description can mislead. `ops-observability-stack`'s description names AgentStudio, Agent VM and OpenClaw, yet the skill is this toolkit's shared stack.
- The Advisor's filter research (`scratch-root-01a1635f/skill-rules/rule-redesign/advisor/filter-research.md`): engine v0.6.0 can't make one judgment per skill and give it to every rule's pieces through config (`select` is noul-only; `as_kind` refuses selected kinds; 3 keyless probes). This needs an engine feature (U11), designed in Program Design.

</details>

### U14: An unsure kind is skipped and listed

`kind: requirement · capability: skill-kinds · also serves: nudges · status: authorized`

When the model isn't sure of a skill's kind, rules that need the kind skip that skill, and the run lists it among the gaps (U3) with the model's answer. The rule-tests' kind cases catch a filter that is often unsure, and each unsure answer is logged.

<details>
<summary>Authority</summary>

Owner, 3 Nov (q2b): picked "skip, and list it"; comment: "this shokudlo be caught in evals. we can log it too".

</details>

### U15: Description standards apply to every skill

`kind: requirement · capability: skill-kinds · status: authorized · was: R16`

The description rules judge every skill, hidden ones included. Descriptions are also the kind filter's input, so their quality carries every rule.

<details>
<summary>Authority</summary>

Owner, 2 Nov review of `rules-spec-2026-11-02.html`: picked "Yes, all of them, as today" (q-hidden-skills).

</details>

### U16: The general-skill rules judge general skills only, and know an example from a leak

`kind: requirement · capability: skill-kinds · also serves: rule-making, what-rules-read · status: authorized, except where marked`

Product-leak (the renamed placement rule) judges skills whose work is for any repository. It nudges when a general skill sends agents into one product's own commands, files or paths, because that work belongs in the product's repository. Every case the owner has seen, and his answer:

| # | Case | Real case | Answer |
| --- | --- | --- | --- |
| 1 | a general skill tells the agent to run one product's own command | `practices-cleanup` line 40 | nudge |
| 2 | a general skill loads a file that is one product's own workflow | `ops-observability-stack` line 17 | nudge |
| 3 | a product named as a labelled example ("for example, …") | none yet | quiet |
| 4 | a worked or made-up product-like example in teaching text | `verify-tui`, `verify-notes`, the fictional `ledger` | **nudge** (owner, overturning the Lead's "quiet") |
| 5 | teaching text that quotes a real product mistake | `domain-decision-models` worked tree | **nudge** (owner: "nudge is requriemmed ehre") |
| 6 | a language or domain skill naming its own subject's tool | `domain-typescript` on shadcn | quiet |
| 7 | a tool or platform used the way it's meant to be used | `claude plugin validate .` | quiet |
| 8 | this toolkit's own shared tools | the shared observability stack | quiet |
| 9 | a worked example of an ordinary command | `practices-cleanup` line 70 | quiet |
| 10 | a product's own skill talking about its own product | the AgentStudio skill; Peekaboo | not judged (U13) |
| 11 | a general skill's description naming products as its users | `ops-observability-stack`'s description | **nudge** (owner: "move product names out if its a generic skill") |
| 12 | a product's own skill sending agents into another product's workflow | none found | wait for a real case |

The line between rows 3 and 4 is whether the text labels the product as an example: only a labelled example stays quiet (owner, 4 Nov (review 00facfd0 of the design page), decision 3).

Its tests draw their quiet cases from general skills (rows 3, 6–9), as the owner asked: "lets find good negative exmapels in general skilsl".

<details>
<summary>Authority and evidence</summary>

- Owner, 3 Nov: "yes placement is alkso not good name come kup with better name"; review 842d1327, q3a–q3c. The owner chose `general-skill.product-workflow` and set the naming standard (4 Nov, decision 4: "namespace 2-3 words and rule 3-8 words"); the full name `general-skill.sends-agents-into-product-workflow` follows it and was approved ("2 names is good").
- Evidence note 12 (was E12): on 1 Nov placement made 11 nudges, 2 right (rows 1, 2) and 9 wrong (4 product skills' own text; 5 examples or a domain's own tool). `taught-rule.holds-beyond-one-project` made 45 nudges, all wrong.
- Inventory: SM017–SM019 (PR166's literal storage blacklist, "complelyt overfitted slop no generalzieable rules"), SM046 (PR187, "you see how that was a huge generlizaiotn faikure?").

</details>
