# Check: Primitives and Statistics

This check owns whether each question's type fits what its answer means, whether computation stays in code, and whether each number keeps its own meaning. Its standards are `domain-decision-models`' Primitives and computation section, and its statistics reference.

**Inputs:** each question's type, its labels or levels, and its routes; each mechanical step; each claim of confidence, calibration or accuracy.

**Return:** a check record, in the schema's shape.

**Complete when:** every question, mechanical step and claim was read against every item below.

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| primitive by meaning | a Noul carries a category, a Choice carries coexisting properties, or a Score's levels mix dimensions | a "quality 1 to 5" Score mixing clarity, length and accuracy | pick the primitive the answer means; split mixed dimensions |
| exclusive labels | a Choice's labels can be true together | a "which gap?" Choice where two gaps coexist | separate Nouls with a declared first-failure order |
| fit where the menu may not cover | a candidate menu that may hold no acceptable match has no reject, fit or fallback path | acting on the top search result when none is the item meant | add a fit question or a fallback, judged against the actual candidates |
| no redundant fit | an exhaustive menu carries a fit gate that restates membership | a fit question on {refund, cancel, other} | remove the gate |
| coarsening isn't verification | a parent label returned under uncertainty is called verified | "low confidence, so return the verified parent division" | call it a coarser label; verify it separately if verification is needed |
| a mechanical step decides only what it captures | a lexical or label check decides a verdict the standard asks to be read | "no `Completion:` paragraph → finding" | judge the text; keep a mechanical step as a gate on an established fact |
| computation in code | a question asks the model to count, do arithmetic, convert encodings, compute dates or generate content | "is the total within 5% of the sum of the lines?" | compute in code; ask only the remaining semantic fact |
| statistic kept to its meaning | a Score position read as a percentage, a Noul probability as quality, or one statistic substituted for another | Score .5 read as "half done" | name the statistic and read it as what it is |
| calibration from labels | a claim of calibration or accuracy rests on model probabilities | "accurate, because its top probabilities average .9" | measure against independent labels over a full denominator |
