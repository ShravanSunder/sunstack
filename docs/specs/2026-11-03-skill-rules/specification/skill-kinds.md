# skill-kinds: which skills each rule judges

**Reader:** the owner and a rule's writer. **Question:** how is a skill's kind decided, which rules use it, and what does the general-skill rules do in each scenario? **Changes when:** the kinds, the filter, or the general-skill rules' scenarios change. Requirements: [skill-kinds](../requirements/skill-kinds.md). Entities: [E1 Skill](entities.md#e1-skill), [E5 Kind judgment](entities.md#e5-kind-judgment), [E3 Rule](entities.md#e3-rule).

### P3: Problem

Rules about general skills judge every skill. On 1 Nov placement gave 9 wrong nudges of 11, four on product skills' own text, and `general-skill.taught-rule-overfits-to-one-project` gave 45, all wrong. The engine can't today make one judgment per skill that every rule reads.

### O3: Outcome

A rule about general skills is silent on product skills and tool manuals, and the agent can see each skill's kind and how sure the judgment was.

### R13: One kind judgment per skill per run

`kind: obligation · capability: skill-kinds · links: U13, E1, E5, C2, V13 · status: authorized`

Each run judges each checked skill's kind once, from its description, as `general`, `role`, `domain`, `tool_manual` or `repo_specific` (U13 defines each), and the report shows each skill's kind and how sure. Two runs over the same description give the same kind.

### R14: A rule judges only its declared kinds

`kind: obligation · capability: skill-kinds · links: U13, E3, E5, C1, V14 · status: authorized`

Each rule that needs a kind declares the kinds it judges and reads the run's one kind judgment; no rule asks the kind question itself. A rule declared for `general`, `role` and `domain` gives no result on a skill judged `tool_manual` or `repo_specific`, and the report counts that as a gate exclusion with the kind, not a pass.

### R15: An unsure kind skips and is listed

`kind: obligation · capability: skill-kinds · also serves: nudges · links: U14, E5, E10, V15 · status: authorized`

If a skill's kind is `unsure`, then every rule that needs the kind skips that skill, and the run lists a `kind unsure` gap with the model's answers. Every unsure judgment is kept in the run's record.

### R16: Description rules judge every skill

`kind: obligation · capability: skill-kinds · links: U15, E1, V16 · status: authorized`

The description rules declare no kind restriction; they judge hidden skills as well.

### R17: What the general-skill rules answer in each scenario

`kind: obligation · capability: skill-kinds · also serves: rule-making, what-rules-read · links: U16, E3, E5, V17 · status: authorized`

Product-leak judges skills of kind `general`, `role` or `domain` only. On those it gives the answer in [U16's table](../requirements/skill-kinds.md#u16-the-general-skill-rules-judge-general-skills-only-and-know-an-example-from-a-leak): it nudges on scenarios 1, 2, 4, 5 and 11; stays quiet on scenarios 3, 6, 7, 8 and 9; does not judge scenario 10 (R14); and has no scenario 12 behavior until a real scenario exists. A product named in text labelled as an example ("for example, …") is quiet; an unlabelled made-up product-like example nudges.

*Settled (owner, 4 Nov (reviews 08411599 and a42f545e), decision 2 "merge both"):* one general-skill family, one standard and one set of scenarios, with three checks: `general-skill.overfits-to-product-workflow` (a section sending agents into one product's own commands, files or paths), `general-skill.description-overfits-to-one-product` (a description loading the skill for one product's work), and `general-skill.taught-rule-overfits-to-one-project` (a rule the skill teaches that fits one project's stack only, as in PR166). Each check has its own question and bars. **Every rule in the family declares the kind gate `only_when: { kind: [general, role, domain] }`, so none of them ever judges a product's own skill or a tool manual** (owner, 4 Nov: "make sure general skills are only invoked as rukles for genaearal skills").

### Proof obligations

| V | For | What decides pass and fail | Reference |
| --- | --- | --- | --- |
| V13 | R13 | on every current skill, the judged kind equals the labelled kind; repeat runs agree | blind agent labels of every skill's kind, disagreements decided by the owner |
| V14 | R14 | the general-skill rules give no result on the AgentStudio skill or Peekaboo, and the report shows them excluded by kind | the 1 Nov run's 4 wrong product-skill nudges |
| V15 | R15 | a skill whose kind is unsure gets no kind-needing results and appears as a gap | the kind scenarios' boundary skills (such as `ops-observability-stack`, E17's misleading description) |
| V16 | R16 | hidden skills get description results | the current hidden skills |
| V17 | R17 | each scenario row's real text gets the row's answer | the real texts named in U16's table, plus the mined general-skill negatives |
