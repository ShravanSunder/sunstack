# Check: Nudge and Receiver

This check owns whether a lint rule's findings would help the agent who receives them make the right broader call. That is judged apart from whether the tree classifies its pieces correctly, which the other checks own: a tree can classify every piece right and still hand the agent a nudge it can't act on. Its standards are `domain-decision-models`' opening paragraph on who reads the outcome and its Policy section's rules for an outcome an agent reads.

**Inputs:**
- **the rule's own artifacts,** for the route part: the entry's questions, decision graph and finding routes (message, `at`, any locator and route severity), its `related` list and severity, the evidence kind's fields, and a kept report's findings and rows where one exists;
- **the receiving reading or commission built from the rule's nudges,** for the receiving part, when one is supplied: a writer's or reviewer's account of the nudges, or a commission a Lead wrote from them. It's an optional input.

**Return:** a check record, in the schema's shape, with each part's result.

**Complete when:** every finding route, and every route ending `pass`, was read against the route items below, and the receiving part either read the supplied reading or commission against its items or recorded itself as blocked, naming the missing input.

## The route part

It runs on every lint rule, from the rule's own artifacts.

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| observation stated | a finding's message doesn't say what the rule noticed, or restates the standard in its place | "Breaks the placement standard." | say what was observed, in one sentence; the report adds the standard's line itself |
| where to read | `related` names no field the agent must open to decide, and the design doesn't say why the standard's line is enough | a placement rule over loads whose finding never lists the loaded file | add the field, such as `targets`, to `related` |
| the line it's about | a section-sized subject's finding has no locator and the design doesn't say why the field's first line is enough, or a locator's task asks something other than where the route's observation sits | the line-17 nudge landing on line 7, the section's first line | add a locator whose task asks for the observed line |
| can't settle never passes | a route whose evidence can't settle its proposition ends `pass`, or an in-between answer is routed to `pass` | "belongs in this repository?" asked of a chunk holding no other repository, with its in-between answer routed to `pass` | route it to a nudge or `uncertain` |
| no breach beyond the evidence | a worth-checking route's message claims a breach the chunk can't show | "This workflow is in the wrong repository." | say what to check and where to read |
| honest basis | a path that reads a model's answer, a gate included, reaches an `error` finding, by the entry's severity or a route's override; or the rule's design presents such a path as established | a judged gate followed by a mechanical length check, authored `error` and described as mechanical | author `warn`; the report's `basis` will say `judged` either way |
| direction, not evidence | a place the run didn't collect is presented as a related place or as something the rule saw | a message citing another repository's path as where the loop "is" | word it as a direction to check |

## The receiving part

It runs only when the receiving reading or commission is supplied. It reads that artifact, never an agent's behavior.

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| carries the nudge | the reading or commission drops the line, the observation, the standard or the read-next places | "Fix call completeness at line 17." | carry where, what, why and read next |
| carries the broader question | it narrows the nudge into "make the rule pass", or asks only for the property to hold | #187's commission, below | name the broader question the nudge raises |
| an account, not a quieted nudge | a reading records a nudge as fixed when only the rule's property changed, or says "no gaps" while gaps stand | "fixed: return added" with the loaded file never opened | record what was checked and one of fixed, kept, routed or open |

Without the artifact, the receiving part is `blocked`, naming the missing input (the receiving reading or commission, restored by the commissioner), and the route part still runs. The check's status is then `partial`. How that bears on a delivery-stage verdict is `SKILL.md` step 6's.

Neither part judges what an agent does with a nudge. Whether a writer given the line-17 nudge makes a justified placement call is an eval; name it as unavailable proof.

## The controls, on #187's line

`sunstack-dev`'s `ops-observability-stack/SKILL.md:17`: "IF the work is AgentStudio debug or beta, load `references/agentstudio-loop.md` and follow that loop." This is the review stage of the example every skill in this change teaches.

- **Bad control, the receiving part.** #187's commission assigned line 17's `call.completeness` nudge as "call completeness": it dropped the read-next place, `agentstudio-loop.md`, and never asked whether a generic skill should route into AgentStudio's loop. Walk it against the same valid rule artifacts as a commission that carries the nudge: line 17, the observation (the call names no return), the standard, `agentstudio-loop.md` to read, and that broader question. Only the narrowing commission fails the receiving part. The route part's result is the same for both, because the rule didn't change.
- **Good control, the route part.** `call.completeness` itself: its finding on line 17 observed a real missing return, its message says so, and it sits at `warn` on a judged path. It passes. A narrow rule that rightly finds its property is not a defect because a bigger question stands on its line.
- **Composition.** With the return added, the same line passes `call.completeness` while the placement rule nudges about it. Two rules, each about its own property: neither fails this check for lacking the other's question, and the receiving reading puts them together.
- **The placement rule under review.** Its route part passes when its finding's message says what to check, its `related` lists `targets`, its locator asks for the line that routes into the product's workflow, its finding is `warn`, and its in-between answers end `uncertain`. Whether its chunk holds the loaded file's opening is the state-and-evidence check's; whether its countercases pass is the proof-and-claims check's.
