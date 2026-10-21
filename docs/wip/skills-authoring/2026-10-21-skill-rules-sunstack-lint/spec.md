# skill-rules on the released sunstack CLI, and the first checked skill rules

## Targets and runs

| Run | Skill target | Owner plugin | Class |
| --- | --- | --- | --- |
| R1 | `skill-rules` | `skill-authoring` | update, behavior-changing |
| R2 | `skill-creation` (its own standards become checked rules over every `SKILL.md`), plus the repository wiring that runs them | `skill-authoring` | update, behavior-changing |

R2 starts only after R1 is `reviewed`, because R2 follows R1's updated workflow.

## Problem and evidence

- sunstack v0.1.0 shipped on 2026-10-21: one binary, `sunstack`, with `sunstack lint` (config `sunstack.lint.json`) and `sunstack exec` (the native JSON protocol). It installs through npx, pnpm dlx, npm, Homebrew and a shell installer (sunstack-tools `f35e8dc`, tag `v0.1.0`; public smoke 39/39 on two Macs).
- `skill-rules` (shipped in skill-authoring 0.4.0, #148) still names the pre-release binary `sunstack-rule` in its description (`SKILL.md:3`), its schema pointer (`SKILL.md:22`), its default prompt (`agents/openai.yaml`), its run instructions (`references/check-and-reports.md:7`) and its wiring step (`references/markers-and-rules.md:92`). It also teaches the retired severity words `block`/`nudge` and `block_at_or_below` (`markers-and-rules.md:56,68`). v0.1.0 refuses these words: "Use severity error; the old severity word is refused."
- Researcher report `/private/tmp/2026-10-sunstack-runner/research/skill-rules-cli/report.md` maps every step onto v0.1.0 and runs each command with the released binary on a fixture (19 commands, expected exits, no model calls). Its findings:
  - **The native operations are unchanged.** `check_rules` with `output: "assembled_rules"` (print) and `evaluate_rules` keep their names, framing and exit meanings. They are now reached through `sunstack exec`; the request goes on stdin.
  - **`sunstack lint --check` accepts Markdown `rule_sources`**, with no credential. It refuses an orphaned marker, a marker with no entry and an over-cap host, each with exit 2. It prints only `Config and rule sets are valid.`, with no count.
  - **`sunstack lint --rules` lists rule IDs, settings and the rules-entry file and line**, but not the marker ID, the Markdown provenance or the wording. Print still needs `exec check_rules`.
  - **`sunstack lint --all --format json` shows a bad example's finding but drops passing mechanical results.** A clean good-example run therefore cannot prove the intended unit was selected, and calibration still needs `exec evaluate_rules`, which reports `completed/pass` and `completed/fail` per occurrence.
- **No checked rule runs on any skill in this repository today.** There's no `sunstack.lint.json` or RuleSet, and no CI workflow under `.github/workflows/`. 70 `SKILL.md` files sit under `plugins/`.

## Success definition

- **R1:** an agent using `skill-rules` with the released `sunstack` binary validates, prints and calibrates rules with commands that actually run on v0.1.0, and writes entries the engine accepts. Concretely:
  - `lint --check` for wiring and CI;
  - `lint --rules` for inventory;
  - `exec check_rules` with `assembled_rules` for the printed wording;
  - `exec evaluate_rules` for the good and bad occurrence verdicts;
  - only `error` and `warn` as severities.

  Nothing in the skill names `sunstack-rule` or a retired severity word.
- **R2:** this repository runs checked rules from `skill-creation`'s own standards over every `SKILL.md` it ships. A credential-free CI job fails when a marker loses its entry or a host overflows. Each mechanical rule has a recorded good `pass` and bad `fail`, and violations in current skills show as findings.

## Decisions (defaults taken; the owner may strike any row)

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | R1 keeps the skill's lens and workflow (the five-outcome matrix, mark only the standard's own wording, narrowest host, calibration examples in `context`, outcome-based proof) and changes only the engine surface it names: the binary, how to install and invoke it, the severity words, and the front-door commands. | The research shows every step still applies; only the invocation, the vocabulary and the available front doors changed. Prior decisions D1–D7, D2-r2, D4-r2 and D6-r2 (`2026-10-18-skill-rules/spec.md`) stay in force. |
| D2 | Use each command for what it shows. `sunstack lint --check` validates wiring and runs in CI. `sunstack lint --rules` gives the inventory (IDs and count from the array). `sunstack exec` with `check_rules` and `output: "assembled_rules"` prints wording and provenance. `sunstack exec` with `evaluate_rules` gives per-occurrence calibration. | Research table rows 3–6c and the two "what lint doesn't show" findings. One command can't carry the proof: lint drops passing mechanical results and omits wording. |
| D3 | Severities are `error` and `warn`; a threshold band is `error_at_or_below`; the old words are refused. The skill's examples use the new words. | v0.1.0 refuses `block`/`nudge` (report row 4; `definition_contracts.rs:107–127`). |
| D4 | The skill stays engine-generic. It names the `sunstack` CLI, says to run the repository's pinned version (`npx --yes @sunstack/cli@<version>`, or a Homebrew or shell-installed `sunstack`), and points to the engine README and schemas for exact shapes. It carries no ai-tools paths. | Prior D7. Skills cross repositories, and the engine docs own the schema. |
| D5 | The CI recommendation names the concrete command: one credential-free `sunstack lint --config <file> --check` per config. Whether to add the job stays the repository's decision. | Report CI row: the check catches orphaned markers, missing entries and over-cap hosts with exit 2 and no credential. |
| D6 | R2 applies `skill-rules` to **`skill-creation`** first, because its frontmatter and call-grammar standards judge every `SKILL.md`. Only standards that survive the decision matrix are marked. A standard whose host reads as a fragment (for example, `frontmatter-design.md:25`, whose subject sits in a lead-in) is rewritten in `skill-creation` first, as `skill-rules` D3 requires. | The owner asked for "creating skills as rules". `skill-creation` owns the standards all skills share, so its rules give the widest check per rule. |
| D7 | R2 adds a repository `sunstack.lint.json` at the root with one RuleSet whose target input binds `plugins/**/SKILL.md`. It also adds a CI workflow that runs `npx --yes @sunstack/cli@0.1.0 lint --check`, then `lint --all` for the mechanical rules. Judged rules are `off` in CI: no key, no cost. | A credential-free CI is the safe default. Judged rules need a key and cost money per selected unit; enabling them later is the owner's choice. |
| D8 | A mechanical rule that current skills already violate starts at `warn`, and rules every current skill passes start at `error`. R2 fixes no other skill's text; violations are listed for follow-up. | Fixing another skill's description changes its trigger surface, which is a behavior change to that skill and needs its own run. `warn` keeps CI useful without failing on day one. |

## Surface allocation

**R1**
- **Trigger.** In the description, `sunstack-rule` becomes the `sunstack` CLI, and the `check_rules` refusals clause is kept, since the operation name is unchanged. Update the `agents/openai.yaml` default prompt to match.
- **Main path (`SKILL.md`).**
  - `:22` names the `sunstack` CLI README and schemas and the pinned install.
  - Step 5 completion uses `sunstack lint --check` plus `exec check_rules` print.
  - Step 6 completion keeps the outcome criteria and names `exec evaluate_rules` for calibration.
  - The completion blockers say "the real `sunstack` binary".
- **Depth.**
  - `references/check-and-reports.md`:
    - the "Run the engine" section names `sunstack exec` (request on stdin);
    - a new short "Front doors" passage maps `lint --check`, `lint --rules`, `exec check_rules` and `exec evaluate_rules` to what each shows, with the two lint limits (no wording; passing mechanical results dropped);
    - the CI section names the concrete command (D5);
    - lint's exit codes are added beside exec's.
  - `references/markers-and-rules.md`:
    - the entry examples use `error`, and the severity paragraph uses `warn`/`error`/`error_at_or_below`;
    - wiring step 1 says the invocation is `sunstack.lint.json` (`rule_sets.<entry> = {path, files}`) for lint, or the `exec` request for native calls.
  - `references/decision-matrix.md`: no change.
- **Proof.** As planned below.

**R2**
- **Trigger and main path.** No change to `skill-creation`'s description or route.
- **Depth.** Markers on the `skill-creation` hosts that pass the matrix, and wording rewrites only where a host is a fragment (D6), each rewrite inside the reference that owns it. A rules file is paired with each marked Markdown file.
- **Repository.** `sunstack.lint.json`, `rules/skill-standards.ruleset.json` (or the nearest repository convention), the CI workflow, a README note, and a changelog entry.
- **Proof.** As planned below.

## Authoring basis and proof plan

- **Authoring basis:** `user-directed intent`. The owner (2026-10-20, verbatim): "start makign pr for creating skills as rules", plus the earlier S2 direction recorded in the owner-asks ledger ("skill-rules is separate", "we can put stuff in ci as well to make sure they pass"). Evidence comes from the Researcher's released-binary report above. No RED is claimed.
- **R1 proof (a reference skill: retrieval and correct use).**
  1. Every command block in the updated skill runs as written against the Researcher's fixture with `npx --yes @sunstack/cli@0.1.0`, with outputs kept. The recorded exits and fields are the expectations.
  2. A static grep shows no `sunstack-rule`, `block`, `nudge` or `block_at_or_below` left in the skill's files, apart from a deliberate "the old word is refused" mention.
  3. One fresh agent with no authoring history gets a realistic request ("make these two standards in this skill checked rules and prove them") on a copy of the fixture skill, with no hint of the checks. The checks, written beforehand and kept outside its directory:
     - it validates with `lint --check`;
     - it prints with `exec check_rules` and `assembled_rules`;
     - it calibrates the mechanical rule with `exec evaluate_rules`, reporting the intended good `pass` and bad `fail`;
     - it writes `error`/`warn`;
     - it names the judged rule's hosted effectiveness as unproven.

  The strongest claim this supports: "observed in named examples" for one fresh run. Repeated runs aren't claimed.
- **R2 proof.**
  1. `lint --check` passes on the repository config.
  2. `exec check_rules` print lists every intended rule ID, the count and each question's wording, read against its standard.
  3. Every mechanical rule records a good `completed/pass` and a bad `completed/fail` through `exec evaluate_rules`, on fixtures copied from real `SKILL.md` files with one edit.
  4. A negative control (an orphaned marker and a missing entry) makes the CI command exit 2 locally.
  5. The CI job runs green on the PR, and its findings list matches a local `lint --all` run.

  Judged rules are proven as check plus print only; hosted judging is unproven.

## Coordination

- **Base.** `ShravanSunder/sunstack` (this repository, formerly ai-tools), `main` at `e34ad3f8`. Branch `feat/skill-rules-sunstack-lint`, worktree `/Users/shravansunder/dev/ai-tools.feat-skill-rules-sunstack-lint`.
- **Pending edits.** None on these skills on `main` (checked 2026-10-21).
- **Version and changelog.** skill-authoring `0.4.0` → `0.5.0` once, in the PR, covering both runs. One dated changelog entry under `docs/changelog/` plus its README row. Codex and Claude caches refresh after merge, as a post-merge step.
- **Engine pin.** `@sunstack/cli@0.1.0`. A later engine release that changes these surfaces reopens D2.

## Non-goals

- Code targets (Swift, Rust, TypeScript) in the engine. That's a separate sunstack-tools design.
- Hosted calibration of judged rules, or enabling judged rules in CI.
- Changing any skill's teaching other than R2's fragment rewrites in `skill-creation`, and fixing other skills' violations (D8).
- A uv/PyPI channel; renumbering existing markers; the TS port of verification fixtures.

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| R1 `skill-rules` | proposed | — |
| R2 `skill-creation` + wiring | proposed | — |

## Review record

Not yet reviewed. The spec stage is `skill-review`'s spec stage, run on this doc before any skill file changes.
