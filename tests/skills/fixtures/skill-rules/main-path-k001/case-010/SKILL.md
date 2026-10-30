## Output Shape

Return:

- bug packet summary
- artifact path with a full clickable link (absolute path + line), or why no artifact was written
- reproduction/coverage evidence
- most likely root cause, labeled as an unconfirmed hypothesis, a source-confirmed mechanism, or an observed cause
- alternate hypotheses, if still plausible
- fastest proof step
- recommended fix path
- open questions or blockers

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
