# Focus 2 coordination: allocation, security and release

One shared record for all four parts: which run changes which skill, which work is not a skill run and who does it, the security decisions made before any sensitive surface is written, and how the change is versioned and released. Every part's Coordination section points here.

## Skill runs

Each run changes exactly one skill. A skill's own references ride with its run; a shared reference rides with the run named for it.

| Part | Run | Skill | Rides with it |
| --- | --- | --- | --- |
| A | R1 | `orchestrator-design` | |
| A | R2 | `plan-implementation` | part B's R6 (the plan page reads slices) |
| A | R3 | `plan-update` (new) | `shared-references/canonical-implementation-plan.md` (A's R4) |
| A | R5 | `orchestrator-implementation-goal` | `references/goal-contract-and-routing.md`, `shared-references/phase-return-tokens.md` |
| A | R6 | `verification-design` | |
| A | R7 | `implement-plan` | `references/execution-and-proof.md` |
| A | R10 | `implementation-review` | `references/finding-and-reduction.md`, `README.md` |
| A | R9 | `program-design` (claim check) | waits for the owner |
| B | R1 | `spec-design` | `shared-references/diagram-rendering-and-fallbacks.md`, `shared-references/design-documents.md` (B's R5) |
| B | R2 | `presentation-html` | `references/engineering-documents.md`, `references/views.md`, `references/demistify.md`; part D's R5 (proof layers on the delivery map) |
| B | R3 | `program-design` | |
| B | R4 | `verification-design` | combined with A's R6 in the same commit, one skill |
| B | R7 | `skill-creation` (skill-authoring) | |
| B | R9 | `spec-program-review` | `references/lanes/artifact-navigation.md` |
| B | R10 | `discuss-pathfinding` | `references/user-requirements-extraction.md` |
| D | R1 | `verification-design` | `references/choosing-the-observation.md`; same commit as A's R6 and B's R4 |
| D | R2a | `practices-verification` | `references/verification-drivers.md` |
| D | R2b | `practices-verification-maintenance` | `references/project-capability-generation.md` |
| D | R3 | `practices-verification-maintenance` | same commit as D's R2b |
| D | R4 | `domain-python` | |
| E | R1 | `principle-write-for-the-reader` | its new `references/layered-detail.md` |
| E | R2 | `shared-references/design-documents.md` | rides with B's R5 |
| E | R3 | `presentation-html` | rides with B's R2 |
| Amendment | A·R11 | `plan-implementation` | `shared-references/canonical-implementation-plan.md` (stacking decided at plan review); rides with A's R2 |
| Amendment | A·R12 | `plan-update` | rides with A's R3 (a PR-shape change reaches the owner) |
| Amendment | A·R13 | `implement-plan` | rides with A's R7 (storage or a dependency the plan didn't name stops as a design gap) |
| Amendment | B·R3 | `program-design` | rides with B's R3: engine, driver and migration tool marked `existing` or `new`; the injected storage boundary across runtimes |
| Amendment | A·R2, A·R1 | `plan-implementation`, `orchestrator-design` | ride with A's R2 and R1: a first plan across repositories carries its orchestration section; B's R2 delivery map gains a repository level |
| Amendment | D·R6 | `practices-verification` | `references/native-observation.md`, `references/browser-observation.md` |
| Amendment | D·R7 | `role-lead` | `references/working-with-verifier.md` |

Focus 3 rows the amendments add (B·R1 `practices-owner-attention` raise lists; C·R1 `practices-show-me-your-work` page links and the decisions-made-alone view) are applied when focus 3 is implemented, not in focus 2's PR.

Batch 1's applied runs are listed in the superseded plan. Batch 2's superseding plan carries the rows above, B's runs, part D's remaining runs and the correction pass for the batch 1 Verifier observations (`focus2-batch1-verifier-30d9abf9.md`).

`verification-design` and `practices-verification-maintenance` are each touched by more than one run. Their runs land in one commit per skill, so a reviewer reads each skill's change whole. Focus 3 also changes `discuss-pathfinding`; whichever focus lands second rebases its runs onto the first.

## Ancillary work

Work that changes no skill's teaching. Each item has a delivery owner and a procedure.

| Item | What | Owner and procedure |
| --- | --- | --- |
| W1 | The composition generator (part C): a TypeScript script beside `tests/skills/` that writes `plugins/sunstack-dev/docs/phase-composition.md` | The focus 2 Implementer, in the focus 2 PR; deterministic test in W3 |
| W2 | The composition page, `plugins/sunstack-dev/docs/phase-composition.html`, composing W1's output | The focus 2 Implementer, built with `presentation-html` |
| W3 | The freshness contract test for W1 | The focus 2 Implementer, in `tests/skills/` |
| W4 | Maintainer index links: `docs/architecture/skill-system.md`, `plugins/sunstack-dev/README.md` | The focus 2 Implementer |
| W5 | `docs/diagram-vocabulary.md` adds the delivery map and the plan change view; the vocabulary contract test updates (was part B's R8) | The focus 2 Implementer, with B's R2 |
| W6 | The global prompt, devfiles `shared/my_agents.md` (was part A's R8) | A subagent, never the Lead, in its own devfiles PR, after the owner decides A·D7's timing; it asks the owner before committing |
| W7 | Caller cutover for `plan-update`: the `plugins/sunstack-dev/README.md` inventory, done in batch 1. The skill index row ("the AGENTS.md skill table") is the global prompt's table in devfiles `shared/my_agents.md`, so it rides with W6 | The focus 2 Implementer for the README; W6's subagent for the global index row |
| E·W1 | Rule checks for the standards focus 2 adds (part E): `skill-rules` classification, markers, rules-file entries, and good and bad proof on the real engine | The focus 2 Implementer, after the lint pilot (P6) lands, using its configuration and pin |

## Security classification

Decided before these surfaces are written, under `skill-creation`'s `references/security-gate.md`. One honest exception: the tool route in B (fast-forwarding `~/dev/sunstack-tools` to the Demistify 1.12.0 release commit and installing its dependencies) was done on 2026-10-24, before this classification, and recorded on the work thread as a reversible decision. It is classified here after the fact, not backdated.

### W1–W3, the composition generator

```text
sensitive surfaces: a TypeScript script run with Node; reads skill Markdown, writes one generated file
entry points: a maintainer runs it from the repository root; the freshness test runs it in memory
untrusted inputs: repository-owned skill Markdown only, parsed by pattern matching (no eval, no dynamic import)
privileged actions: none; writes only plugins/sunstack-dev/docs/phase-composition.md
third-party source: none (Node built-ins only)
license / permission state: not applicable
copy-vs-adapt decision: not applicable
decision: allowed
required proof: the freshness test fails on a scratch copy with one added load call and passes on the real tree; the script writes no path but its one output
public-safe constraints: output holds repository-relative paths and skill names only
review route: skill-review implementation stage
```

### B·R2 and W2, composed Demistify pages

```text
sensitive surfaces: network access (the reader's browser loads theme.css and runtime.js from the Demistify v1 host and runs the runtime); shell commands (demistify embed, check and index, run with Node from the canonical sunstack-tools checkout at the binding's release commit)
entry points: a reader opens the HTML file; the authoring agent runs embed and check
untrusted inputs: the hosted runtime (the owner's own published library); Markdown sources are repository-owned
privileged actions: none; the page runs in the browser sandbox and holds no credentials
third-party source: none copied; the owner's own Demistify, referenced by URL with release.json version and sourceCommit recorded
license / permission state: the owner's own library
copy-vs-adapt decision: reference only; no library code enters the repository
decision: allowed for public-safe design content in this public repository; sensitive or private content keeps presentation-html's existing rule (a complete local distribution)
required proof: demistify check with zero errors and warnings on every delivered file; byte comparison of the embedded copy with a fresh regeneration; a browser observation
public-safe constraints: no credentials, secret references, account identifiers or private machine configuration in page or Markdown
review route: skill-review spec and implementation stages
```

### E·W1, rule checks run locally

```text
sensitive surfaces: shell commands (the pinned sunstack CLI run through npx, which fetches the published @sunstack/cli package at its declared pin); repository rules files and markers
entry points: the authoring agent runs lint locally in skill-creation's step 7 check; a maintainer may run it by hand
untrusted inputs: repository-owned skill Markdown and rules files; the published package at its exact pin
privileged actions: none; lint reads files and writes reports only under the run's own output path
third-party source: none copied; the owner's own published @sunstack/cli, at an exact version
license / permission state: the owner's own package
copy-vs-adapt decision: reference only
decision: allowed for mechanical rules; judged rules stay off, so no model backend, API key or network call beyond the package fetch
required proof: each mechanical rule's good case passes and bad case fails on the real engine, with zero model requests recorded; a changed file the config doesn't select is reported not linted
public-safe constraints: reports and rules hold repository-relative paths and rule ids only
review route: skill-review spec and implementation stages
```

### W6, the global prompt

```text
sensitive surfaces: a home-level write: the owner's global agent instructions, in a private repository that also holds API keys and credentials
entry points: a subagent edits shared/my_agents.md in a devfiles worktree and opens a PR
untrusted inputs: none
privileged actions: a commit, push and PR in that private repository; after the owner merges and applies, every agent's instructions change
third-party source: none
license / permission state: the owner's own
copy-vs-adapt decision: not applicable
decision: deferred until the owner decides A·D7's timing. When allowed: a subagent only, never the Lead; the subagent asks the owner before committing (devfiles AGENTS.md: never commit without asking); PR only; the owner merges; no secret value read or printed
required proof: the diff touches only the named lines; a secret-pattern scan of the diff is clean; the owner reviews the PR
public-safe constraints: the PR and its description carry no credential, secret reference or account identifier
review route: the owner's PR review
```

## Release

- **Plugins:** `sunstack-dev` (parts A, B, D and W1–W5, W7) and `skill-authoring` (B's R7). Each takes one minor version bump in the focus 2 PR, resolved against the post-batched-delivery base (`sunstack-dev` above 2.97.0, `skill-authoring` above 0.5.0, or the next free number if the lint pilot lands first). The bump goes in every Codex, Claude Code and Cursor manifest and marketplace entry that carries the version.
- **Changelog:** one dated entry under `docs/changelog/`, indexed newest-first in `docs/changelog/README.md`, 20 lines or fewer, public-safe; longer evidence under `docs/changelog/references/`.
- **Packaging checks:** `claude plugin validate .` and `codex plugin list --marketplace sunstack --available --json`, plus the contract tests.
- **Installed caches:** refreshing the installed Codex and Claude caches is a separate release step after the owner merges, never part of PR readiness. The retrospective found sessions running an installed 2.80.0, so the refresh is named here and done on the owner's go.
- **PR shape:** one PR for focus 2 (one deliverable); W6 is its own devfiles PR.
