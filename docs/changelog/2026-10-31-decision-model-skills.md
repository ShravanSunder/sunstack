# 2026-10-31 Decision-model skills: domain, rule design and review

`sunstack-dev` 2.101.6 → 2.102.0 and `skill-authoring` 0.8.1 → 0.9.0. A rule, or any set of questions a model answers for code, is now designed and reviewed as a decision model.

- New hidden `domain-decision-models` (`sunstack-dev`): the practice for state and evidence, single-proposition questions, primitives, batching, per-node policy from labelled costs, held-out proof and records, with seven conditional references.
- `skill-rules` gains a design step (3) that loads the domain and designs each rule by its outcome and node types; proof loads the domain for judged rules. A new `rule-design.md` holds the completion case without a label gate; criteria are no longer fitted to development cases.
- New `decision-model-review` (`sunstack-dev`): checks that can fail, admitted by execution profile and stage, with its own schema. `skill-review` and `implementation-review` route decision-model changes to it.
- `skill-authoring` now names one dependency on `sunstack-dev` (its README); without it, the two steps report `skill unavailable`.
- The design set lives in `docs/wip/skills-authoring/2026-10-31-skill-rules-systems/`.
- Validation:
  - `tests/skills`: vitest 268/268 and tsc clean; `rules --check` exit 0; `claude plugin validate .` passed;
  - the keyed rules self-check, the teaching-transfer and seeded-defect comparisons, and the trigger trials are pending.
- Codex and Claude caches: not refreshed.
