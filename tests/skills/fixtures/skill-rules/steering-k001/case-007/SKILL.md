### 7. Return

Return the decision table, the diff, and the check output and evaluation reports its proof column cites:

```text
| standard (path:line, quoted) | outcome | reason | host | marker | rule ID | check | proxy for | proof |
```

One row per candidate from step 1. Unmarked outcomes leave host through proof empty. `proof` names the good and bad results for a mechanical rule and `printed` for a model-judged one. Name what stays unproven: check and print don't show how well a hosted judge answers a model-judged question.
