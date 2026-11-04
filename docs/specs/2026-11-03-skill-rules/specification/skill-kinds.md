# skill-kinds: which skills each rule judges

**Reader:** the owner and a rule's writer. **Question:** how is a skill's kind decided, which rules use it, and what does the general-skill rules do in each case? **Changes when:** the kinds, the filter, or the general-skill rules' cases change. Requirements: [skill-kinds](../requirements/skill-kinds.md). Entities: [E1 Skill](entities.md#e1-skill), [E5 Kind judgment](entities.md#e5-kind-judgment), [E3 Rule](entities.md#e3-rule).

### P3: Problem

Rules about general skills judge every skill. On 1 Nov placement gave 9 wrong nudges of 11, four on product skills' own text, and `taught-rule.holds-beyond-one-project` gave 45, all wrong. The engine can't today make one judgment per skill that every rule reads.

### O3: Outcome

A rule about general skills is silent on product skills and tool manuals, and the agent can see each skill's kind and how sure the judgment was.

### R13: One kind judgment per skill per run

`kind: obligation · capability: skill-kinds · links: U13, E1, E5, C2, V13 · status: authorized`

Each run judges each checked skill's kind once, from its description, as **any repository**, **one named tool or platform**, or **one app's own procedures**, and the report shows each skill's kind and how sure. Two runs over the same description give the same kind.

### R14: A rule judges only its declared kinds

`kind: obligation · capability: skill-kinds · links: U13, E3, E5, C1, V14 · status: authorized`

Each rule that needs a kind declares the kinds it judges and reads the run's one kind judgment; no rule asks the kind question itself. A rule declared for **any repository** gives no result on a skill judged **one named tool or platform** or **one app's own procedures**, and the report counts that as a gate exclusion with the kind, not a pass.

### R15: An unsure kind skips and is listed

`kind: obligation · capability: skill-kinds · also serves: nudges · links: U14, E5, E10, V15 · status: authorized`

If a skill's kind is `unsure`, then every rule that needs the kind skips that skill, and the run lists a `kind unsure` gap with the model's answers. Every unsure judgment is kept in the run's record.

### R16: Description rules judge every skill

`kind: obligation · capability: skill-kinds · links: U15, E1, V16 · status: authorized`

The description rules declare no kind restriction; they judge hidden skills as well.

### R17: What the general-skill rules answer in each case

`kind: obligation · capability: skill-kinds · also serves: rule-making, what-rules-read · links: U16, E3, E5, V17 · status: authorized, except the row-3/row-4 line, proposed`

Product-leak judges skills of kind **any repository** only. On those it gives the answer in [U16's table](../requirements/skill-kinds.md#u16-the-general-skill-rules-judge-general-skills-only-and-know-an-example-from-a-leak): it nudges on cases 1, 2, 4, 5 and 11; stays quiet on cases 3, 6, 7, 8 and 9; does not judge case 10 (R14); and has no case 12 behavior until a real case exists. A product named in text labelled as an example ("for example, …") is quiet; an unlabelled made-up product-like example nudges.

*Settled (owner, 4 Nov (review 00facfd0 of the design page), decision 2):* `general-skill.description-loads-for-one-product` is the general-skill standard's description check, beside the section check; one standard, one set of cases, each check with its own question and bars. `taught-rule.holds-beyond-one-project` stays its own rule with its own standard.

### Proof obligations

| V | For | What decides pass and fail | Reference |
| --- | --- | --- | --- |
| V13 | R13 | on every current skill, the judged kind equals the labelled kind; repeat runs agree | blind agent labels of every skill's kind, disagreements decided by the owner |
| V14 | R14 | the general-skill rules give no result on the AgentStudio skill or Peekaboo, and the report shows them excluded by kind | the 1 Nov run's 4 wrong product-skill nudges |
| V15 | R15 | a skill whose kind is unsure gets no kind-needing results and appears as a gap | the kind cases' boundary skills (such as `ops-observability-stack`, E17's misleading description) |
| V16 | R16 | hidden skills get description results | the current hidden skills |
| V17 | R17 | each case row's real text gets the row's answer | the real texts named in U16's table, plus the mined general-skill negatives |
