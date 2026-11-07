# Check: Proof and Claims

This check owns whether each claim about the model's behavior rests on proof that can support it. Its standards are `domain-decision-models`' Proof, records and claims section, and its proof-and-records reference.

**Inputs:** the cases and their labels; the run reports and records; each claim of improvement, accuracy, stability or order sensitivity, with the model versions behind it.

**Return:** a check record in the schema's shape, with each claim the records can't support listed as unavailable.

**Complete when:** every claim was read against every item below, and each is supported, a finding, or unavailable.

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| independent labels | labels came from the rule's author, or from the rule's own answers | labels copied from the run's findings | relabel with labelers independent of the rule, before any run |
| all three kinds | a set lacks good, bad or near-miss cases, and claims something about the missing kind | "no false findings" from a set with no near misses | name the gap; claim nothing about the missing kind |
| full denominator | results count issued findings only | an error rate from findings alone | count passes, `not_applicable`, uncertain, incomplete and misses |
| measures apart | errors, coverage, review load, invalid replies and instability are merged into one number | "92% good" | report each apart |
| frozen before held-out | the questions, evidence or policy changed after held-out cases were first scored | rewording until the held-out failures pass | freeze, rescore, and treat already-seen cases as regression cases |
| baseline | an improvement claim has no comparison against the current model | "the new rule finds 20 defects" | score the current rule on the same cases |
| version recorded | a result doesn't record the model requested and the version that answered; a pinned override isn't recorded as one; or the model requested isn't the `jev-latest` default and isn't a recorded override | results on `jev-latest` with no answering version kept | record both, mark the override, or name the record gap |
| one version group | a comparison spans model versions, or names no version | last month's tuning compared with today's alias result | compare within one version group, or name the missing comparator |
| one changed variable | a comparison changed two things at once | evidence cut and question rewording in one probe | change one variable per comparison: evidence, then question, then policy |
| replay valid | a threshold comparison replays answers over changed questions or evidence, or over findings only | a new bar applied to answers from a reworded question | replay only over the same questions with frozen evidence and coverage; otherwise run fresh and say so |
| records enough to reproduce | a reported error can't be reproduced from what was kept | a finding kept with no state or answers | keep the record the domain lists, or name what's missing |
| unavailable isn't passed | proof the records can't support is reported as passed | "versions match" when no record keeps the answering version | mark it unavailable |
| order claims | an option-order claim rests on a source-key shuffle that never changed the bytes sent | keys reordered in a rules file, with the driver re-sorting them on the wire | perturb the on-wire order, confirm the bytes, align results by label |
