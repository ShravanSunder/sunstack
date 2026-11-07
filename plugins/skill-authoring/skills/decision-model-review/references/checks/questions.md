# Check: Questions

This check owns whether each question asks one proposition the model can judge, with criteria that define it and routes that say what yes means. Its standards are `domain-decision-models`' Questions section.

**Inputs:** each question's type, task, criteria and evaluated field; the routes from it; the standard's own good and bad examples.

**Return:** a check record, in the schema's shape.

**Complete when:** every question was read against every item below, and the inverted-pair control was rejected locally.

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| one proposition | a question or its criteria pack two requirements | "Does the branch have a clear condition and a concrete action?" | split into one question per proposition, asked in the same request |
| criteria define the same proposition | the criteria define something other than the task, or add a requirement | task "is the post safe?", criteria "yes = contains a threat" | rewrite the criteria to define the task's own yes and no |
| route direction stated | a route doesn't say whether yes means pass or finding, or reads high probability as "compliant" | a "carries extra" question whose yes is routed to pass | route each answer by what yes to that proposition means |
| direct references | the task points at its evidence indirectly, through a hop the state doesn't resolve | "judge it against the rule above", with no rule in the state | name the state field directly |
| the standard's negative cases pass | the question accepts a bad example the standard itself rejects | a condition question that accepts "IF the skill needs more depth" because it names a skill | ask whether the predicate states a checkable fact; recheck against every bad example |
| bounded judgment survives | a shortened question rejects a judgment the standard accepts | a predicate question that rejects every value judgment | keep the standard's accepted bounded cases passing |
| bounded by stated obligations | the question imports an obligation the evidence doesn't state | "is this step's work enough?" for a step that asks only for a glance | ask whether the end requires the result the step itself names |
| a model can judge it | the question asks for something the model can't judge from the evidence | "will the agent follow this step?" | ask for a property of the supplied text |

**The inverted-pair control.** Before any paid test, give the check a question whose criteria invert its task. It must fail locally. A check that passes the inverted pair is broken, and its other results don't count.

**Broad counterfactual questions** ("would the skill still work without this?", "does this rule transfer?") aren't failures by themselves. Flag each for a probe, naming what would decide it.
