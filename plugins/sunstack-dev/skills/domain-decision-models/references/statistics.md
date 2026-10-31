# Statistics

This reference owns what each number a decision model returns means, and what a threshold on it can and can't claim.

**Expected input:** each threshold in the policy, or each claim of confidence, calibration or accuracy, with its question type and label count.

**Return:** for each, the statistic it reads, its inequality, and what the number does and doesn't show.

**Complete when:** every threshold and claim is matched to one row below, and no claim of correctness rests on a model probability.

## The table

| statistic | what it is | what it isn't | source and limits |
| --- | --- | --- | --- |
| **Noul probability** | P(yes) to the proposition asked | a quality score: .65 is a leaning yes, not "65% good". A confident no is near 0, not near 1 | TypeSafe's Noul and Confidence pages. A Noul has no separate confidence output; `abs(2p − 1)` is an optional transform, not a returned field |
| **Choice probability** | the distribution over the supplied labels | proof any label fits, when the menu may hold no acceptable match | Choice page. A Choice ranks; fit is a separate question |
| **Choice confidence** | C = (p_max − 1/n) / (1 − 1/n): the top probability rescaled against an even split over n labels | accuracy. It depends only on p_max and n | TypeSafe's confidence page. The same p_max means a different confidence at a different n: .6 is C = .40 at n = 3 and C = .50 at n = 5; three labels at p_max .62 give .43 |
| **Score position** | the probability-weighted place on the ordered levels | a count, a percentage or a magnitude. Different distributions can share a mean | Score page |
| **Score confidence** | a separate formula that also accounts for distance between levels | interchangeable with Choice confidence | Confidence page |
| **Combine value** | a weighted average of Noul probabilities and normalized Score positions | a joint or calibrated probability | a policy value, chosen in code |
| **Measured correctness** | how often outcomes match independent labels, over a full denominator, within one model version | anything a single answer's probability shows | only labelled runs establish it. Calibration is a property of groups of cases, not of one answer |

Batched questions are evaluated independently; that doesn't make their errors independent. Similar wording can repeat one mistake across several answers.

## Thresholds

- **Name the statistic and the inequality,** for example "Noul P(yes) ≥ .7 is yes, ≤ .3 is no, between is uncertain, both ends inclusive". Two bands with the same printed numbers but different equality behave differently at the edge.
- **Choose a Choice bar per label count.** A bar on a Choice's top probability means a different confidence as n changes, so a per-node policy accounts for n.
- **Keep confidence out of the route where the driver can't read it.** A driver that routes on top probability can't branch on a returned confidence field; a policy on confidence is caller code.
- **Take bars from labelled costs.** A cookbook's band is an illustration, never a default.

## The documentation discrepancy

An older classification cookbook says Choice confidence separates two .45 winners whose runner-up probabilities are spread differently. The current confidence formula uses only the top probability and the label count, so that explanation doesn't hold under the current formula. Teach the current formula, name the older sentence as a discrepancy, and infer no date for an API change.

## Coarsening and calibration

Returning the parent label when the child is uncertain changes specificity. One cookbook maps a low-confidence group to its parent in code without asking the model to verify the parent. Its reported improvement, on a filtered 60-filing sample on model 1.12, is a historical observation, not a guarantee that a parent is right.

A calibration claim needs labelled outcomes across many cases. A model returning a high probability on one case shows nothing about how often it is right.
