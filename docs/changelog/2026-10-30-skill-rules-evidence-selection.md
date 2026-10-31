# 2026-10-30 Skill rules: workflow sections chosen by the decision model

`skill-authoring` 0.6.0 → 0.7.0. `tests/skills` pins `@sunstack/cli` 0.4.0 (from 0.2.0).

- The `domain-skill-crafting` rules kit finds a skill's steps by asking the decision model, once per candidate section, whether it is the skill's workflow. It no longer matches heading names. Candidates are sections that directly hold a top-level numbered list, and numbered or `Step N:` headings at any level; steps come only from sections answered yes. No heading-name list remains in the kit.
- Over all 74 skills, 116 of 126 candidate sections were selected, 6 were not and 4 were uncertain. Against the prototype's frozen labels, precision is 100% and recall 96.7%. Steps go from 201 to 298, and the skills that had none now have steps (for example `implement-plan` 11, `plan-implementation` 11, `orchestrator-implementation-goal` 14).
- The guidance rules (`rule.generalization`, `guidance.positive`) read sentences inside a selected step or a `## Standards` section. This needs sunstack 0.4.0 (`"within": ["step", "standards_section"]`).
- The branch rule now also counts paragraph openers `If`, `if` and `when`, alongside `IF` and `When`: 65 more branch pieces. Mid-sentence conditions and `Otherwise` and `Unless` stay out.
- New warning rule `main-path.spine`: for a skill whose numbered lists hold no workflow, it asks whether `SKILL.md` shows the all-run spine. It applies to 2 skills today. Both passed on its earlier evidence; a live check on the corrected evidence is pending.
- Unchanged, and held for the owner's decision: whether the call rule covers "read" and "open", branch openers beyond these five, whether sentence rules read a step's own text, and whether "Stop when…" counts as a completion.
- Validation:
  - a full keyed run over the corpus on the 0.4.0 candidate engine, complete with nothing incomplete (later engine changes touched only error locations);
  - development rule evals: 32 matched, 2 missed, 7 uncertain, 0 wrong, none of them new against the last evals before this change;
  - `tests/skills` on the installed 0.4.0: tsc clean, vitest 259/259, `rules --check` 13 rules and 3 kinds.
- Codex and Claude caches: not refreshed.
