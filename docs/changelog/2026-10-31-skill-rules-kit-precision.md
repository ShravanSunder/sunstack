# 2026-10-31 Skill rules: kit precision after the step-5 run

`skill-authoring` 0.7.0 → 0.8.0.

- The full rules run over every skill (31 Oct) found 300 findings. Blind labels and per-finding dispositions showed that 117 came from the kit asking the wrong question or seeing the wrong text. This change fixes those the current engine can express:
  - `completion.criterion`: the step selector leaves out summary lists that restate later steps; legwork credits a criterion whose named result can't exist without the step's work.
  - `reference.teaching-depth`: command lookups, catalogues and templates count as lookups. A section sees its file's heading outline and the first line of each opening paragraph, and is credited only for teaching it can see. A heading alone leaves the stage uncertain.
  - `guidance.positive`: a three-way gate sends field labels and value lists to not applicable and options paired with their conditions to pass; only guidance reaches the verdict.
  - `branch.condition`: a request or artifact the agent can see counts as observable; naming a thing doesn't make a doubt, need or size observable.
  - `rule.generalization`: a rule that names the scope it was adopted for passes, as the standard allows.
- 45 new cases were frozen before tuning. The 39 craft-rule cases are labelled by two blind labelers and a settler; the 6 generalization cases await the owner's labels.
- Validation (matched/missed/wrong/uncertain, against main's kit on the same cases): development 25/0/2/13 vs 17/2/16/5; held-out 16/0/6/16 vs 13/2/18/7. Six held-out cases share skill files with development cases, so transfer to new skills is unproven. The full-corpus rerun on the signed 0.4.0 engine finished complete: 3,506 requests, 0 incomplete, $0.20. Against the first run:
  - 96 of the 117 kit false positives cleared, and 10 of the 13 findings the labels call passing;
  - 5 of 89 real findings no longer flag. Three were later judged conforming at their lines; two are genuine misses, both fixed in the step-5 fix PRs;
  - 14 findings are new. A first read finds about half of them real, the size and doubt words the labels call findings, and four likely false positives. They are not yet labelled.

  `tests/skills`: tsc clean, vitest 268/268, `rules --check` 13 rules.
- Neighbouring-block evidence and an uncertain route need an engine release; 15 findings and about 196 uncertain outcomes wait on it.
- Codex and Claude caches: not refreshed.
