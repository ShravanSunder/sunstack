## The 18 rules, one by one

- **Held** means the rule stays silent until it passes its tests; every run lists it with what it's missing.
- **You** in the last column is one of your 2 Nov decisions. **Me** is my call; strike it if it's wrong.
- **"None named yet"** means no real mistake is recorded behind the rule. Those nine are the rules we go through together, one at a time.

### What each rule checks

| # | Rule | What it checks | The mistake behind it |
| --- | --- | --- | --- |
| 1 | `description.opener` | the description starts "Use when", "Trigger when", "Always use when" or "Always trigger when" | written standard |
| 2 | `description.length-warning` | the description is over 225 characters | written standard |
| 3 | `description.length-limit` | the description is over 300 characters; this one blocks | written standard |
| 4 | `description.loading-moment` | the description names the moment that should load the skill | none named yet |
| 5 | `description.trigger-only` | no workflow steps or tool lists in the description | none named yet; 7 real catches on 30 Oct |
| 6 | `description.always-earned` | "Always" only when skipping the skill breaks the work | none named yet; no description on main opens with "Always" |
| 7 | `description.product-loading` | a general skill doesn't load for one product's own work | #187 |
| 8 | `call.completeness` | each "load this file" line says when, where, what to do and what to bring back | none named yet; its nudge pushed #187's narrow fix |
| 9 | `reference.teaching-depth` | a reference that owns a step says what to look at, what good and bad look like, and when to stop | none named yet; related, not the same: principle cards that didn't teach passed review (PR #123) |
| 10 | `placement.product-workflow` | a general skill doesn't send its steps into one product's own commands or paths | #187; `practices-cleanup` line 40 |
| 11 | `rule.generalization` | a rule a skill teaches holds across projects, with products only as examples | #166 |
| 12 | `branch.condition` | an "IF" names something the agent can see, and the work it causes | none named yet; 18 real catches on 30 Oct |
| 13 | `main-path.spine` | `SKILL.md` shows the whole route from start to done in one scan | none named yet |
| 14 | `completion.criterion` | each step's "done when" tells done from not done | none named yet; 35 real catches on 30 Oct. Its literal `Completion:` check caused the padding you rejected in #183 |
| 15 | `guidance.positive` | guidance mostly says what to do, with what to avoid as caveats | none named yet |
| 16 | `question.names-field` | a rule's question names the field it judges | your ask to check rule files |
| 17 | `question.one-proposition` | a yes/no question in a rule asks one thing | your ask; no failing case found anywhere |
| 18 | `question.criteria-match` | a question's "yes" and "no" explanations answer the same question it asks | your ask; no failing case found anywhere |

### What happens to each rule

| # | Rule | Which skills | What happens now | Decided |
| --- | --- | --- | --- | --- |
| 1 | `description.opener` | every skill | keep (a pattern check) | you |
| 2 | `description.length-warning` | every skill | keep (a count) | you |
| 3 | `description.length-limit` | every skill | keep (a count) | you |
| 4 | `description.loading-moment` | every skill | held until tested on old descriptions | me |
| 5 | `description.trigger-only` | every skill | held until tested on old descriptions | me |
| 6 | `description.always-earned` | every skill | held until tested | me |
| 7 | `description.product-loading` | general skills | held until the filter and its tests exist | both |
| 8 | `call.completeness` | skills with load lines | held until tested | me |
| 9 | `reference.teaching-depth` | workflow skills' references | fix what it reads, then held until tested | me |
| 10 | `placement.product-workflow` | general skills | open: its scenarios, with you; never fires on an example | you |
| 11 | `rule.generalization` | every skill; product skills only against their own scope | redo the filter and the rule | you |
| 12 | `branch.condition` | workflow skills | held until tested | me |
| 13 | `main-path.spine` | workflow skills | held until tested | me |
| 14 | `completion.criterion` | workflow skills | fix what it reads, then held until tested | me |
| 15 | `guidance.positive` | every skill with guidance | keep; fix what it reads, then held until tested | you |
| 16 | `question.names-field` | rule files | dropped | you |
| 17 | `question.one-proposition` | rule files | held until old rule files give tests | me |
| 18 | `question.criteria-match` | rule files | held until old rule files give tests | me |

Rules 17 and 18 overlap. The Advisor's plainer wording for 18 is: "would the explanations count an answer as right when the question itself would count it as wrong?" Merging them into one readable check is part of the one-by-one talk.

The "Which skills" column is my proposal until the filter's answers are settled. Each rule's question, its bars and its real results are on the rules page from 2 Nov (`rules-spec-2026-11-02.html`, in your memory-logs).
