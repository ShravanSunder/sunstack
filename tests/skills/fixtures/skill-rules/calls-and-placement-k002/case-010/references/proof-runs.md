## Reproducing An Observed Failure

Attempt faithful reproduction when the available evidence can preserve the load-bearing prompt, inputs, environment, context, and expected behavior. Return one result:

- `reproduced`: the targeted failure occurred;
- `not reproduced`: a credible attempt did not show the targeted failure;
- `insufficient evidence`: missing information prevents a faithful attempt;
- `inconclusive`: execution or interpretation cannot support a result.

For any result other than `reproduced`, ask the user whether to supply evidence and retry, approve a representative hypothesis, author from the approved success definition with a named proof gap, or defer.

To offer a representative hypothesis, build a deliberately simplified or synthetic case that preserves the suspected mechanism, and have the user approve it as preserving that mechanism before any run uses it.
