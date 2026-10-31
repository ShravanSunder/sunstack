# Policy algebra

This reference owns how code composes several answers into one outcome: the operators, their order, and how an unknown combines.

**Expected input:** the answers the tree has (each with its statistic and its in-between route), the standard's obligations, and the execution profile: a static rule graph, or caller code.

**Return:** the selected composition, with its mandatory, veto and unknown routes, and where weighting applies.

**Complete when:** every answer the outcome depends on has its operator, and every unknown has an intended route.

These are ordinary code semantics, our synthesis from TypeSafe's pattern pages and cookbooks, not native engine operators. Batching questions together makes their evaluation independent; it doesn't make their events or errors independent. Multiplying model probabilities doesn't yield a calibrated AND or OR.

## The operators

| operator | good form | bad form |
| --- | --- | --- |
| **AND** for jointly required predicates | both known yes are needed to pass; a known no on either decides failure | a weighted mean lets one strong yes cover a required no or unknown |
| **OR** for sufficient alternatives | one known trigger selects the action; every diagnostic is kept | probabilities multiplied, or every unknown treated as false with no adopted policy |
| **veto** for a non-negotiable failure | routes first and ends its route before normal routing | a severe hazard disappears inside an overall mean |
| **priority** among conflicting outcomes | ordered routes with explicit precedence | whichever check was written first silently wins |
| **weighted aggregation** for compensatory preferences | positive weights that reflect a declared ranking policy, applied after mandatory facts and disqualifiers pass | called a joint probability, or used to implement a mandatory AND |
| **threshold** and **relative Choice** | each bar names its statistic and inequality | one bar across statistics |
| **any risk over its bar** | an OR of the per-risk threshold tests | described as the engine computing a numeric maximum |
| **top-K and sorting** | the caller sorts a distribution and keeps semantic labels | a single greedy winner described as top-K |

## Order

1. Mandatory evidence and vetoes route first.
2. Disqualifiers next.
3. Weighted preference only over pieces that survived both.

```text
Good: [required parts present] → no: finding
      yes → hazard? → yes: finding (veto)
      no  → weighted preference → pass / finding / uncertain by its bars
Bad:  (.99 + .50) / 2 = .745 ≥ .7 → pass, as if two obligations held
```

## Three-way logic

An unknown is an answer between its bars. It's a successful assessment with too little separation, and it doesn't become a yes or a no by being combined.

| A | B | A AND B | A OR B |
| --- | --- | --- | --- |
| unknown | false | false | unknown |
| unknown | true | unknown | true |
| unknown | unknown | unknown | unknown |

A static graph can express this over answers already batched. A's uncertain edge routes to a step that reads B. That is neither a second request nor new certainty about A.

Policy can be stricter: "any needed unknown goes to review" is a valid explicit choice, with its cost named (more review load). An invalid or unavailable reply is neither true, false nor unknown: it is incomplete, and it is never masked as a truth value.

## What the static graph can and can't do

On a static graph, AND, OR, veto, priority, thresholds and relative Choice are routes. A weighted aggregation is a native Combine (positive weights summing to one, over Noul probabilities and normalized Scores) where the engine offers one. Sorting, top-K, a numeric maximum, negative weights and arbitrary formulas are caller code.
