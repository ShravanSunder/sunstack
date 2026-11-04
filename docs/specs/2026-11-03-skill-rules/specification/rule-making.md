# rule-making: what must be true of every rule

**Reader:** the owner and a rule's writer. **Question:** what does every rule have to show about why it exists, and what does the rule set look like? **Changes when:** the owner decides a rule, or the inventory grows. Requirements: [rule-making](../requirements/rule-making.md). Entities: [E3 Rule](entities.md#e3-rule), [E4 Mistake](entities.md#e4-mistake), [E11](entities.md#e11-behavior-test-candidate).

### P1: Problem

9 of 18 rules exist because a model could judge them, not because they catch a mistake the owner corrected; meanwhile the owner corrects the same mistakes by hand across sessions (56 records in 3 months).

### O1: Outcome

Every rule a reader opens says which real mistake or written standard it exists for, and the reader can follow that to its source. The owner's behavior-only mistakes are listed for the later evals, not disguised as text rules.

### R1: A nudging rule names its reason

`kind: obligation · capability: rule-making · links: U9, E3, E4, C1, V1 · status: authorized`

While a rule is `nudging`, its entry names at least one mistake (an inventory record, a commit or a pull request) or exactly one written standard it checks by count or pattern. If a judged rule names neither, then it is `held`, and the run lists it as held for that reason.

### R2: The rule set matches what the owner decided

`kind: obligation · capability: rule-making · links: U10, E3, C1, V2 · status: authorized`

Each rule's state is the one [U10](../requirements/rule-making.md#u10-the-rule-list-follows-what-the-owner-decided-rule-by-rule) gives it: kept rules nudge once R18 holds; rework-first rules are `held` until reworked and re-tested; `question.names-field` is `dropped` and gives no result; `general-skill.sends-agents-into-product-workflow` is renamed `general-skill.sends-agents-into-product-workflow` and keeps its standard. A rule the owner hasn't decided stays `held`.

### R3: Behavior-only mistakes are listed, and no text rule claims them

`kind: obligation · capability: rule-making · links: U12, E4, E11, V3 · status: proposed`

Each `behavior-only` mistake episode in the inventory appears once in the behavior-test candidate list with its records and sources. If a text rule checks that a skill teaches one of those behaviors, then its nudge says it judged the teaching, never that an agent did or didn't do the behavior.

### R4: Rule files get nudges

`kind: obligation · capability: rule-making · also serves: nudges · links: U8, E3, E7, V4 · status: authorized`

When a question in a rule file asks two things, or its yes and no explanations answer a different question from the one it asks, a run over the rule files gives a nudge at that question to the rule's writer and reviewer. A rule file whose questions pass gets no nudge.

### R5: The engine knows nothing about skills

`kind: obligation · capability: rule-making · also serves: skill-kinds, what-rules-read · links: U11, V5 · status: authorized; scope narrowed by owner decision 9`

The engine changes this design needs add no skill-specific word, kind, or path. The engine's existing skill-aware target loader (`SKILL.md` and skill names) is later work, logged (owner, 4 Nov (review 00facfd0 of the design page), decision 9: "Later work, logged"), which supersedes the earlier "the release carries nothing skill-specific". The kinds, the kind question, chunks and edges are declared in this repository's config and rules. If the engine can't express something this design needs, then the engine gains a generic feature and a release; the rules and runner carry no workaround.

### C1: What a rule entry shows its reader

`kind: contract · capability: rule-making · links: R1, R2, R13, R18, R19, R22 · status: authorized`

Opening any rule shows, without running it: its name and state; the mistake(s) or written standard it exists for, with locators; its standard's marker; the kinds it judges; the chunk and edges it reads; where its cases are and how many of each kind; and each decision step's bars with the cases that set them. A held rule also shows what it lacks.

### Proof obligations

| V | For | What decides pass and fail | Reference |
| --- | --- | --- | --- |
| V1 | R1 | every `nudging` judged rule cites a mistake that exists at its locator; a judged rule with no citation is `held` and listed | the inventory, git history, GitHub PRs |
| V2 | R2 | each rule's state equals U10's table; `question.names-field` gives no result in a run | U10 and the owner's review records |
| V3 | R3 | every inventory episode marked text-checkable `no` is in the list exactly once; no nudge message claims an agent behavior | the inventory |
| V4 | R4 | real rule-file questions that ask two things or mismatch their criteria get a nudge; real ones that don't, don't | real rule files, current and in history |
| V5 | R5 | no skill-specific word in the engine change; the kind judgment is declared in this repository's config | the `sunstack-tools` diff and release |
