# Check: Policy and Composition

This check owns whether each node's policy is complete, and whether the composition decides obligations and vetoes before any weighting. Its standards are `domain-decision-models`' Policy section and its policy-algebra reference.

**Inputs:** the tree; the policy table, per node: statistic, thresholds with their inequalities, in-between route, precedence and costs; the execution profile.

**Return:** a check record, in the schema's shape.

**Complete when:** every node and every composition of answers was read against every item below.

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| statistic named | a threshold doesn't name the quantity it reads | "≥ .6 is confident enough" for a Noul and a Choice alike | name each node's statistic |
| inequality stated | a band doesn't say whether its ends are included | ".3 to .7 is uncertain", copied with no equality stated | state each end's inequality |
| bar per label count | a Choice's top-probability bar ignores its label count | one .6 bar for a 3-label and a 5-label Choice | set each bar for its n |
| in-between route intended | an in-between answer has no intended route, or is conflated with a failed reply or missing evidence | a .5 answer, a timeout and a missing source all routed to pass | route each of the three to its own outcome |
| costs named | a threshold or precedence rests on no named cost of a false finding, a miss and a review | a bar moved "until the report looks quieter" | name the costs; choose from development results |
| veto before compensation | a score can compensate for a mandatory obligation or a veto | averaging .99 and .50 into .745 and passing | route obligations and vetoes first; weight only preferences |
| unknowns intended | an unknown is cast to true or false without an adopted policy | "uncertain counts as no" with no reason | use three-way logic or an explicit review policy |
| precedence declared | conflicting outcomes are resolved by the order checks were written | the first-added check silently wins | declare the precedence |
| operator supported | the composition uses an operator the execution profile lacks | a static rule graph asked to sort, take top-K or compute a maximum | move that operator to caller code, or use an OR of thresholds |
| no authority from a score | a route grants a permission on a score alone | an account change granted because a request scored "safe" | decide the permission in code |
