# Deliverable 3 plan: one rule, end to end

Three steps in ai-tools, one PR on `skills/one-rule-end-to-end` from main `24fa3d92`. A fourth, small step joins only if you say yes to closing #190. You adopt the rule; the PR waits for that before its last proof.

Design: [deliverable 3](../../d3-design.html). Planned at ai-tools main `24fa3d92`, engine sunstack 0.7.0. The owner merges and adopts. Tracking: none.

## The steps

```mermaid
flowchart LR
  B1["1 · pin 0.7.0,<br/>filters.kind,<br/>gate the rule"] --> B2["2 · kind scenarios<br/>in the scenario run;<br/>adoption checks the gate"]
  B1 --> B3["3 · rule scenarios follow the gate;<br/>keyed run; you adopt;<br/>agent run proves line 17"]
  B2 --> B3
  B4["4 · (if you close #190)<br/>move 6 command-line tests<br/>to tests/integration"]
```

## At a glance

| Step | What it does | How we'll know it worked | Waits on |
| --- | --- | --- | --- |
| 1 · Filter and gate | pins `@sunstack/cli` 0.7.0; adds `filters.kind` (criteria from the round-3 result); gives the product-workflow rule `only_when: {kind: [general, role, domain]}` | `rules --check` passes on 0.7.0; a lint run over `ops-observability-stack` and `agentstudio` asks Jev twice and reports general / tool_manual; the gated rule is no longer held as `needs_engine` | round 3's criteria choice |
| 2 · Kind scenarios and adoption | adds the 78 kind scenarios; a gated rule's scenario run also scores them (kind right / wrong / unsure, gate run / exclude / skip); `evals:adopt` refuses a gated rule with any wrong gate decision | keyless tests: a recorded report with one wrong exclusion is refused, a clean one is accepted, an unsure folder is listed and never counted as right | step 1 |
| 3 · Rule end to end | re-expects the rule's scenarios in excluded folders as "not applicable"; the Lead runs `evals:scenarios` for the rule (keyed); you adopt; a normal `rules` run is the proof | 31 / 31 caught, none unsure, zero wrong gate decisions; after adoption the agent's printout nudges `ops-observability-stack/SKILL.md:17` and shows AgentStudio "not applicable: kind tool_manual" | steps 1 and 2, your adoption |
| 4 · Test layout (optional) | moves `tests/skills/lib/skill-rules/tests/*.test.ts` (6 files) to `tests/skills/tests/integration/`, the leftover of #190 | `pnpm --dir tests/skills test` passes with the same count | your yes on #190 |

## Detail for the agents: files, commands and proof for each step

### B1 · Filter and gate (vertical)

- **Reads:** this design; deliverable 1's design (config shape); engine 0.7.0 config reference (`sunstack lint --check` errors name the field); Jev Advisor rounds 2 and 3 reports (`memory-logs/…/jev-advisor/kind-experiment-round-{2,3}-2026-11-05.md`, `round-2-spec.json` / `round-3-spec.json` hold the exact question and criteria).
- **Writes:** `tests/skills/package.json` and lockfile (`@sunstack/cli` 0.7.0); `plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json` (`filters.kind`, criteria copied byte-for-byte from the chosen spec, `min_probability` 0.7); `general-skill.rules.json` K002 (`only_when`).
- **Earns:** U13·R (one question per folder), U14 (unsure skipped and listed) by `pnpm --dir tests/skills rules -- --check` and one keyed lint run over two folders (Lead runs it through the key wrapper).
- **Stop:** the engine refuses the config shape (route to an engine gap, never bend the config); the criteria choice is not settled by round 3 (owner decision page).

### B2 · Kind scenarios in the scenario run; adoption checks the gate (contract)

- **Reads:** `tests/skills/lib/skill-rules/{scenarios,scenario-run,scenario-scoring,scenario-adoption,report}.ts`; the experiment's `round-2-corpus.json` (78 skills, paths, labels and provenance) and `label-disagreements.md`.
- **Writes:** `tests/skills/evals/kind-filter/skill-kind.scenario.json` (78 records: pinned source `self@cbcaec0d` `SKILL.md`, `expect: {kind}` or `unknown`, label basis `owner_decided` for the three rulings, `agents_agreed` for the 71 agreed, `disputed` for `scaffold-project` and `audit-security-review`; `set` from the experiment's split); a kind-scenario schema and loader beside `scenarios.ts`; the scenario run, for a rule with `only_when`, runs the engine over the pinned kind-scenario `SKILL.md` files with the same config and scores `filter_answers` (exact kind; gate run / exclude / skip against the rule's `only_when`); the scenario report gains that section; `evals:adopt` refuses a gated rule unless the section is complete with zero wrong gate decisions over labelled scenarios.
- **Earns:** R18 (gated adoption) by `pnpm --dir tests/skills test` and `typecheck`: recorded reports (one wrong exclusion → refused; unsure folder → listed, not right, not wrong; disputed → unscored; complete and clean → accepted).
- **Oracle:** the experiment's analyzer replays the gate algebra over the same labels; the new scorer must give the same counts on round 3's receipts.

### B3 · Rule end to end (vertical; consumer of B1 and B2)

- **Writes:** `tests/skills/evals/rule-scenarios/general-skill/general-skill.overfits-to-product-workflow.scenario.json`: the three scenarios in excluded folders that still say `must_pass` (`agentstudio` case-010, `agent-collaboration` case-011, `practices-verification-maintenance` acct-a46) expect `not_applicable`, each with a label note quoting why (the gate's kind, or your repo_specific ruling); the six already expecting `not_applicable` (acct-a40 and the five `peekaboo` scenarios) stay; after your adoption, `adopted.json` gets the entry `evals:adopt` writes.
- **Proof:** the Lead runs `pnpm --dir tests/skills evals:scenarios general-skill.overfits-to-product-workflow` through the key wrapper; the report shows 31 / 31 caught and the kind section clean; you adopt; the Lead runs `pnpm --dir tests/skills rules` and reads the line-17 nudge and the AgentStudio exclusion in the printout.
- **Stop:** any scenario missed, false-nudged or unsure: bring the scenario and Jev's answers back, never edit an expectation to match a run.

### B4 · Test layout (repair; only with your yes on #190)

- Moves the six files with `git mv`, fixes imports, keeps `tests/skills/vitest.config.ts` globs covering `tests/integration`. Proof: the same test count before and after.

### Release bookkeeping

`skill-authoring` plugin version bump (the rules config ships in `domain-skill-crafting`), one changelog entry, README of `tests/skills` (new command behaviour). Codex/Claude cache refresh after merge.

## Canonical record

```text
plan path: docs/specs/2026-11-03-skill-rules/deliverables/3-one-rule-end-to-end/plan.md
originating planner: plan-implementation
planning result: ready once round 3 settles the criteria (B1 waits on it; B2 can start now)
governing planning basis:
  kind: reviewed-four-document-design
  ai-tools docs/specs/2026-11-03-skill-rules/ (reviewed to convergence, 0 open at 85ecf2c7/006e57e3), merged in #188 → main 24fa3d92; engine design sunstack-tools docs/specs/2026-11-04-owner-assessment/, released as 0.7.0 (00a0cad7)
delivery context:
  requested terminal: pr-ready-unmerged
  delivery grouping: single:one-rule-end-to-end
  PR topology: one PR on main (#188 merged, so nothing to stack on)
  repositories: ShravanSunder/sunstack (ai-tools)
```
