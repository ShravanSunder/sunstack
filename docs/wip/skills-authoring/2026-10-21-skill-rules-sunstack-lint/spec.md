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
| D6-r2 (2026-10-21, supersedes D6) | D6 stands, and its rewrite boundary also covers hosts the engine cannot mark. `frontmatter-design.md`'s "Required Shape" (`:9–15`) states the `name` charset, the 64-character limit, the folder-name match and the 1024-character `description` limit inside one fenced block. A fence can't host a marker, and marking the section would bundle several standards into one rule. So R2 restates that block as one list item per standard, each item carrying its own subject, in the same reference, and removes the fence, so each standard is still stated once. The folder-name match stays unmarked (review-only: it needs the file path, which no selected unit holds). | The Implementer's preparation found this (push 01a15c18). These are the most deterministic standards `skill-creation` owns; leaving them fenced would keep the best checks out of reach. The restatement keeps one home per standard and changes no rule's meaning. |
| D8 | A mechanical rule that current skills already violate starts at `warn`, and rules every current skill passes start at `error`. R2 fixes no other skill's text; violations are listed for follow-up. | Fixing another skill's description changes its trigger surface, which is a behavior change to that skill and needs its own run. `warn` keeps CI useful without failing on day one. |
| D2-r2 (2026-10-21, supersedes D2; spec review SR1, SR2) | D2's split stands, and gains two conditions. **(a) The lint front door applies only when lint can run the RuleSet:** the RuleSet declares exactly one `document` input and a `sunstack.lint.json` names it. Under that condition, `lint --check` validates wiring, `lint --rules` gives the inventory, and the CI job runs lint. Any other RuleSet shape the engine supports (for example a separate `calibration` context input) stays on `exec check_rules`, and no lint pass is claimed for it. Native print (`exec check_rules` with `assembled_rules`) is required for every RuleSet. **(b) Native calibration runs a mechanical-only view.** Build the `exec evaluate_rules` request from the assembled mechanical definitions alone: the same rule ID, target, predicate or `ast_grep` rule, and severity, compared field by field against the print. Judged definitions are left out, so no backend or credential is reachable. Calibration closes only when the intended good occurrence is `completed/pass`, the intended bad occurrence is `completed/fail`, and the report shows zero model requests and inference attempts. Setting judged rules `off` in a lint config is not the same thing: native input has no lint-off policy. | `lint` rejects anything but exactly one document input (`config_validation.rs:122–145`, research report :195), while `markers-and-rules.md:80–95` permits and requires a bound calibration input. Native `RuleInvocationInput` carries no lint-off policy, and the research succeeded through a separate mechanical-only view. |
| D9 (2026-10-21, spec review SR4) | **Sensitive surfaces, classified before any outline.** **(1) Running the pinned CLI** (`npx --yes @sunstack/cli@0.1.0`): *allowed*. It's an exact-version package with npm SLSA provenance, and on first run it fetches the release binary from GitHub. Local and CI execution read only the repository's files, use no credential, make no model call (D2-r2b, judged rules off), and write only npm and package caches. **(2) The new repository CI workflow** (R2): *allowed*, bounded to `on: pull_request` and `push` to `main`; `permissions: contents: read`; no secrets or environment variables holding credentials; actions pinned to full commit SHAs; network limited to the npm registry and GitHub release downloads; and nothing written beyond the runner workspace. Proof: the workflow's YAML is `actionlint`-clean, and its first PR run is observed. **(3) The post-merge Codex/Claude cache refresh:** *deferred*. It's a home-level mutation outside this PR, done only when the owner scopes it as usual. Public-safety: no paths, accounts or credentials go into the workflow, README or changelog. | `skill-creation` `security-gate.md:3–25` requires the decision before outlining a sensitive surface, and spec-review blocks acceptance while surfaces are unclassified. These classifications carry existing authority accurately and widen none. |

## Amendment, 2026-10-24: R3, the agent runs the linter while creating a skill

Lead-authored by 🦁 claude-local `68844339`. To be added verbatim to `docs/wip/skills-authoring/2026-10-21-skill-rules-sunstack-lint/spec.md`, after the Decisions table, and reviewed before R3 is implemented. R1 and R2 are unchanged.

### Requirement

- "we dont need a claude opus for htis. and we gonan run that as lint for what? shodu lwe not have runes that trigger in skill creaiton as alitner and aks teh agent to run it when creating a skill?" (owner, 2026-10-24)
- "isnt atha tmore improtant to actually do that for skillc reation?" and "it shoudl run locally isntead of pukllign ci inti thos first" (owner, 2026-10-24)
- Earlier: "i think we cant ahve auto checks we nee3d to ahve mechnism with router and baord and statemachiens as a afte rpoject" (owner, 2026-10-24). Until that mechanism exists, skills tell agents when to run checks themselves.

### Situations

1. **An agent creates or changes a skill with `skill-creation`.** Before it hands back, it runs the repository's pinned linter on the `SKILL.md` and reference files it changed, and reports each command with its exit code and findings.
2. **A finding is an `error`.** The agent fixes it before handing back. A fix that would change another skill's trigger or meaning is out of scope and is listed instead (D8).
3. **A finding is a `warn`.** The agent fixes it when it's in a file the agent changed; otherwise it lists it.
4. **The repository has no lint configuration.** The agent says so and skips the step. It never invents a config.
5. **No CI job.** The rollout is local: the check runs in the agent's own loop, where the skill is written (D11).

### Run

| Run | Skill target | Owner plugin | Class |
| --- | --- | --- | --- |
| R3 | `skill-creation` (step 7, Implement: its completion check) | `skill-authoring` | update, behavior-changing |

**Surface allocation.**

- **Trigger:** no change.
- **Main path (`SKILL.md`):** step 7's completion check gains one sentence. IF the repository has a `sunstack.lint.json`, run its pinned `sunstack lint --check`, then `lint` over the changed skill files, and return each command, its exit code and every finding, with errors fixed. The commands and the version come from the repository's config and `skill-rules`' front-door table (R1), not from this sentence.
- **Depth:** none new; `skill-rules`' `references/check-and-reports.md` already owns the front doors.
- **`skill-orchestrator`:** none. Its proof step consumes `skill-creation`'s return.

**Proof.** A changed `SKILL.md` with a description that doesn't start with "Use when…" makes the step report a finding with a nonzero exit, and fixing it makes the step clean. This is static plus one real lint run on the engine. Fresh-agent behavior is not claimed.

### Decision

| # | Decision | Reason |
| --- | --- | --- |
| D10 | The agent runs the linter locally during skill creation, as `skill-creation`'s step 7 check | Owner direction, 2026-10-24: catch a broken standard where it's made, in the agent's own run |
| D11 | Supersedes D7's CI workflow, D5's CI recommendation and D9 item 2. R2 keeps the repository `sunstack.lint.json` and the RuleSet, which the local run needs, and adds no CI workflow. `skill-rules` teaches the local run, not a CI job | Owner, 2026-10-24: "it shoudl run locally isntead of pukllign ci inti thos first", "why we nee dci now? it amke no snese to start with ci" and "it snot a good loop, we shoudl roll it out to not put it in ci". With no workflow, D9's CI classification no longer applies. D9 item 1 (running the pinned CLI) still governs the local run |

## Surface allocation

**R1**
- **Trigger.** In the description, `sunstack-rule` becomes the `sunstack` CLI, and the `check_rules` refusals clause is kept, since the operation name is unchanged. Update the `agents/openai.yaml` default prompt to match.
- **Main path (`SKILL.md`).**
  - `:22` names the `sunstack` CLI README and schemas and the pinned install.
  - Step 5 completion: when D2-r2(a)'s condition holds, `sunstack lint --check` plus `exec check_rules` print; otherwise `exec check_rules` print alone.
  - Step 6 completion keeps the outcome criteria and names `exec evaluate_rules` on the mechanical-only view (D2-r2b), with zero model requests.
  - The completion blockers say "the real `sunstack` binary".
- **Depth.**
  - `references/check-and-reports.md`:
    - the "Run the engine" section names `sunstack exec` (request on stdin);
    - a new short "Front doors" passage maps `lint --check`, `lint --rules`, `exec check_rules` and `exec evaluate_rules` to what each shows, with the two lint limits (no wording; passing mechanical results dropped) and the exactly-one-document-input condition (D2-r2a);
    - the calibration section teaches building the mechanical-only `evaluate_rules` request from the print, with the equivalence check and the zero-model-request requirement (D2-r2b);
    - the CI section names the concrete command (D5);
    - lint's exit codes are added beside exec's.
  - `references/markers-and-rules.md`:
    - the entry examples use `error`, and the severity paragraph uses `warn`/`error`/`error_at_or_below`;
    - wiring step 1 says the invocation is `sunstack.lint.json` (`rule_sets.<entry> = {path, files}`) for lint, or the `exec` request for native calls.
  - `references/decision-matrix.md`: no change.
- **Proof.** As planned below.

**R2**
- **Trigger and main path.** No change to `skill-creation`'s description or route.
- **Depth.** Markers on the `skill-creation` hosts that pass the matrix, plus host repairs only where D6-r2 allows them: a fragment whose subject sits in a lead-in, or a standard held in a host the engine cannot mark (the fenced Required Shape block). Each repair goes inside the reference that owns it, and each standard keeps one home. A rules file is paired with each marked Markdown file.
- **Repository.** `sunstack.lint.json`, `rules/skill-standards.ruleset.json` (or the nearest repository convention), the CI workflow, a README note, and a changelog entry.
- **Proof.** As planned below.

## Authoring basis and proof plan

- **Authoring basis:** `user-directed intent`. The owner (2026-10-20, verbatim): "start makign pr for creating skills as rules", plus the earlier S2 direction recorded in the owner-asks ledger ("skill-rules is separate", "we can put stuff in ci as well to make sure they pass"). Evidence comes from the Researcher's released-binary report above. No RED is claimed.
- **R1 proof (a reference skill: retrieval and correct use).**
  1. Every command block in the updated skill runs as written against the Researcher's fixture with `npx --yes @sunstack/cli@0.1.0`, with outputs kept. The recorded exits and fields are the expectations.
  2. A static grep shows no `sunstack-rule`, `block`, `nudge` or `block_at_or_below` left in the skill's files, apart from a deliberate "the old word is refused" mention.
  2a. **Two-input control (SR1).** A valid RuleSet with `skill` and `calibration` document inputs keeps both bindings, completes `exec check_rules` print, and is not claimed as a lint pass. Lint's refusal of it is recorded as the reason.
  2b. **Mixed-RuleSet control (SR2).** On a RuleSet holding one mechanical and one judged rule, the mechanical-only `evaluate_rules` request matches the print field by field, closes good `pass` and bad `fail`, and reports zero model requests and inference attempts. Lint's `off` setting alone is not accepted as closing it.
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
  4. Negative controls make the CI command exit 2 locally: an orphaned marker, a missing entry, and an over-cap host.
  5. **Coverage against an independent inventory (SR3).** List the shipped skill files independently with `git ls-files 'plugins/*/skills/*/SKILL.md'` (70 at `e34ad3f8`: 62 sunstack-dev, 5 skill-authoring, and one each in agent-router, ai-scaffold and dev-workflow-tools). Then capture the files lint actually resolves with a **canary control**: a control-only copy of the repository config keeps the same `rule_sets.<entry>.files` glob, the same `ignore_patterns` and the same RuleSet, and adds one control-only mechanical rule that fails on every target. Running `lint --all --format json` on that copy then reports one finding, or one incomplete part, per resolved file. Because it uses lint's own target resolution (`targets.rs:83–111`) and binding (`invocation.rs:221–224`), that file set is the resolved target set. It must equal the git inventory. A second control copy whose glob drops one plugin subtree must fail the comparison. The canary rule and both control copies live in the proof fixtures, never in the shipped config. `lint --rules <file>` is used only for severity and settings, never as evidence of target membership, because it lists every rule for any named path (`config_validation.rs:266–284`).
  6. **Expected findings.** Every rule that starts at `warn` under D8 has its current violations listed by rule and file before the CI run. The CI report must show exactly those findings at those locations, which proves the rules ran on those files. Equality of two possibly incomplete runs isn't enough.
  7. The CI job runs on the PR; its conclusion and findings are read from the run.

  Judged rules are proven as check plus print only; hosted judging is unproven.

## Coordination

- **Base.** `ShravanSunder/sunstack` (this repository, formerly ai-tools), `main` at `e34ad3f8`. Branch `feat/skill-rules-sunstack-lint`, worktree `/Users/shravansunder/dev/ai-tools.feat-skill-rules-sunstack-lint`.
- **Pending edits.** None on these skills on `main` (checked 2026-10-21).
- **Version and changelog.** skill-authoring `0.4.0` → `0.5.0` once, in the PR, covering both runs. One dated changelog entry under `docs/changelog/` plus its README row. The Codex and Claude cache refresh is deferred until the owner scopes it (D9.3).
- **Engine pin.** `@sunstack/cli@0.1.0`. A later engine release that changes these surfaces reopens D2.

## Non-goals

- Code targets (Swift, Rust, TypeScript) in the engine. That's a separate sunstack-tools design.
- Hosted calibration of judged rules, or enabling judged rules in CI.
- Changing any skill's teaching other than R2's D6-r2 host repairs in `skill-creation` (fragments and unmarkable hosts), and fixing other skills' violations (D8).
- A uv/PyPI channel; renumbering existing markers; the TS port of verification fixtures.

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| R1 `skill-rules` | reviewed | Implemented in `38d83f0e`, with the D4 correction in `069ca0a3` (the isolated fresh run showed consumer repositories don't hold the engine schemas, so the skill now indexes the tagged public engine docs). Proof: 22/22 released-CLI cases; HTTP 200 on 11 of 11 tagged URLs; one isolated fresh Luna xhigh example meeting 5/5 frozen checks (Verifier `verification/r1-observation-069ca0a3.md`). `skill-review` implementation stage: **great**, 0 findings, ship decision source-only for R1 (`skill-rules-r1-impl-review.md`). |
| R2 `skill-creation` + wiring | proposed | — |

## Review record

- **Spec stage** (`skill-review`, retained Sol xhigh review lead with independent structure and teaching reviewers). Report: `/private/tmp/2026-10-sunstack-runner/skill-spec-review/skill-rules-cli-spec-review.md`.
- **Revisions reviewed:** initial `c55736d3`; D6-r2 at `8870b856`; SR1–SR5 corrections at `398cc1fc`; SR3 canary refinement at `44bc8db3`.
- **Findings:** SR1 (the lint single-document-input condition), SR2 (mechanical-only native calibration), SR3 (independent all-skill coverage), SR4 (sensitive-surface decisions) and SR5 (scope summaries). All closed, 5 → 1 → 0, with no recurrence.
- **Verdict:** great. **Implementation decision:** `accepted-to-implement` for the whole two-run spec at `44bc8db3`. R1 may implement; R2 waits until R1 is `reviewed`. Acceptance is not implementation proof, a CI result, hosted judging, a release or a cache refresh.
