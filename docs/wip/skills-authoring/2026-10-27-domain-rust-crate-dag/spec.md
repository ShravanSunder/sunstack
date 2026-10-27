# domain-rust: crates set the dependency direction

Target: only `plugins/sunstack-dev/skills/domain-rust/` in sunstack (one run). Classification: update, behavior-changing (main path, steering, completion signs, and the trigger description), user-directed intent. Run status: reviewed (implementation review great at 20b5d5d2).

## Promise and success

This skill helps agents reliably keep Rust dependencies pointing one way when they add or move crates, modules, components or test helpers.

Success: an agent doing Rust work under this skill
- treats a lower crate needing a higher crate as a design problem, and moves the item down, splits the type, or has the lower crate declare a small trait the higher one implements. It never adds the upward dependency;
- gives each constructor the named handles it uses, built at the composition point for their lifetime, never a services or context struct handed down for callers to pick from;
- keeps crate-local test helpers in `#[cfg(test)]` or `tests/`, and exports helpers other crates' tests need behind a `test-support` feature that no default feature or production dependency enables;
- keeps the repository's own layers, and splits a crate only when a boundary needs the compiler to hold it;
- updates every caller when an item moves crates, leaving no `pub use` at the old path;
- keeps an existing module-cycle check passing by breaking the new cycle, not by refreshing the baseline to absorb it.

## Problem and evidence

- Owner, 2026-10-26, codex-router session: "lets do this yes i want domain rust to have dag and dependency…" and "can we not add rules why no rules in the standard?" The current `domain-rust` (bffa9836) says nothing about crate layering, cycles or injection. Source: the current SKILL.md, read in full this run.
- Worked case, codex-router `docs/specs/2026-10-26-rust-crate-dag/program-design.md`: a 117-module application crate with legal module cycles, and a `ServiceIdentity` service locator that every family reached through. It was split into three layer crates, with composition in the host and per-family constructor injection; a `cargo-modules` strongly-connected-component ratchet guards the in-crate cycles. That design measured why many small crates were rejected: larger public surface, more cross-crate generic copies, churn.
- Hypothesis (not reproduced): without the rule, an agent adding a feature that crosses layers adds the upward dependency, or threads a shared services struct, because both compile and are the shortest path.

## Decisions (defaults; the owner may strike any row)

| Default | Rationale |
| --- | --- |
| A new `## Crates and dependencies` section in SKILL.md, between Names and Storage | Every Rust change can add a dependency, so this is all-run guidance at the decision it governs; it is short enough to stay inline (no new reference) |
| Show the layer shape as a four-row text block with generic names (contracts, runtime, service, host), labelled illustrative, not a link to the codex-router spec | Specs in codex-router are deleted after two months; the label keeps it from becoming a required topology (review F4) |
| The module-cycle ratchet is conditional on the repo having one; the skill does not prescribe cargo-modules | The tool and baseline are repo mechanisms; the rule is the behavior (break the cycle, refresh the baseline only for a shrink or rename) |
| Cite `principle-justify-the-complexity` at adding a crate and `principle-separate-the-concerns` at wiring a constructor; no separate trait bullet | Each changes how that action is done. When to inject or add an interface already lives in separate-the-concerns; the one Rust-specific trait move (the lower crate declares the port) stays in the direction bullet (review F3) |
| Add one "Signs you skipped it" bullet | The section's failure modes become reviewable symptoms |
| Description gains "crate boundaries, dependency direction and injection, module cycles" | `disable-model-invocation: true` stays; the description still tells a reader and a router when the skill governs, and the new topic must be named there |
| Next minor version 2.100.0 in the six version homes plus a dated changelog | Open PR #169 holds 2.99.1 and PR #167 holds 2.98.1; a new rule is a minor change |

## Surface allocation

- Trigger: description wording only (shown below). Invocation controls unchanged.
- Main path: the new section and one Signs bullet (exact text below).
- Depth: none; no new reference, no new load call.
- Proof: see the proof plan.

### Exact main-path text

```markdown
## Crates and dependencies

Dependencies point one way. Cargo rejects a cycle between crates through normal and build dependencies, and allows one between modules, so a boundary that must hold is a crate boundary. Keep the layers the repository already has. Before adding a crate, name the boundary that needs the compiler to hold it, and prefer a few large crates to many small ones, since each extra crate adds public surface, duplicated generic code and churn ([add complexity only when an outcome needs it now](../principle-justify-the-complexity/SKILL.md)).

One allowed shape, for an application whose execution and rules have grown apart (illustrative, not required):

```text
contracts   ids, ports, shared data            depends on nothing above it
runtime     stores, workers, adapters          depends on contracts
service     the application's rules            depends on contracts, runtime
host        startup: builds and injects        depends on all three
```

- When a lower crate needs something from a higher one, move the item down, split the type, or have the lower crate declare a small trait that the higher crate implements. Never add the upward dependency, and never move the caller up to dodge it.
- Inside a crate, module cycles compile and grow quietly. When the repo has a module-cycle check, keep it passing by breaking the new cycle; refresh its baseline only to record a cycle that shrank or a rename.
- When wiring a component, give its constructor the named handles it uses, built at the composition point for their lifetime ([wire each dependency where its lifetime starts, and hand each part only what it uses](../principle-separate-the-concerns/SKILL.md)). In Rust a service locator usually looks like a `Services` or `Context` struct passed down for callers to pick from, a global registry, or an `Arc<dyn Any>` map; replace it with the handles.
- Keep a test helper that only its own crate uses in a `#[cfg(test)]` module or under `tests/`. When other crates' tests need it, export it behind a `test-support` feature that no default feature and no production dependency enables, and check that the shipping package's production dependency view (`cargo tree -p <package> -e normal,build,features` with its release target and features) does not show the feature. Cargo merges features across a build, so a dev-dependency alone does not keep it out, and the tree is a diagnostic, not proof of what the release build compiled.
- When an item moves to another crate, update every caller in the same change; leave no `pub use` at the old path.
```

Signs bullet:

```markdown
- A lower crate's `Cargo.toml` naming a higher crate, a services struct handed to constructors, a `pub use` left at a moved item's old path, a module-cycle baseline that grew, or a `test-support` feature in the shipping package's normal/build feature tree.
```

Description:

```yaml
description: "Use when writing, changing or reviewing Rust code, especially domain enums and newtypes, Serde boundaries, error types, time, Tokio tasks, blocking work and locks, crate boundaries, dependency direction and injection, module cycles, module and function names, SQLx queries, migrations and pools, and which cargo commands to run."
```

## Authoring basis and proof plan

Authoring basis: user-directed intent (the owner's two quotes above) plus the read codex-router design as the worked case. No RED is claimed.

Proof posture (pattern skill: recognition, correct use, counter-example):
- Static: `pnpm --dir tests/skills exec vitest run lib --config vitest.config.ts`, `pnpm --dir tests/skills exec tsc --noEmit`, the link/JSON/version checks, `git diff --check`.
- Representative comparison with fresh Claude subagents (no authoring history). Each works in its own copy of a fixture workspace outside the repo, whose AGENTS.md tells it to read a given `domain-rust/SKILL.md` copy. The checks were frozen before any run, in a file outside every fixture, and each run is judged from the files it left, read by hand.
  - Scenario 1, direction where Cargo already forbids the edge (service depends on runtime): the worker must check admission and record decisions. Checks: (a) no upward dependency; (b) the constructor takes named handles, not a bag; (c) no shim; (d) a trait only at the seam; (e) functional: rejected runs are skipped and every decision is recorded through the wired worker.
  - Scenario 2, the same task, but service does not depend on runtime, so the upward edge compiles, and the task asks for speed. Same checks.
  - Scenario 3, ratchet pressure: CI's module-cycle check is red on a real cycle; the README offers a baseline refresh. Checks: (f) the baseline is unchanged; (g) the cycle is broken while the behaviour stays; (h) no shim.
  - Scenario 4, counter-example: a one-crate library task where splitting crates or adding traits is not warranted. Check: no new crate, and no trait without a seam.
  - **Results (2026-10-27, fresh Claude Opus subagents, each judged by hand from the files it left; checks frozen beforehand):**

    | Scenario | Prior revision | New revision |
    | --- | --- | --- |
    | 1 direction, Cargo already forbids | pass (a)–(e) | not run (no delta possible) |
    | 2 direction, upward edge compiles, time pressure | pass (a)–(e) | pass (a)–(e) |
    | 3 ratchet pressure | pass (f)–(h) | pass (f)–(h); cited the new rule, and flagged `AppContext` as a services struct |
    | 4 counter-example, one small crate | pass (i)–(k) | pass (i)–(k); no workspace, no trait |

  - **Loaded copy and actions (host records):** each run's host session record shows a Bash `cat` of its assigned copy before any edit: `skills-old/domain-rust/SKILL.md` for the four prior-revision runs, `skills-new/domain-rust/SKILL.md` (byte-identical to this branch's file) for the three new runs. Each matching tool result is not an error and returned the whole file: every result holds the title and the Storage and Signs sections, the three new-copy results hold `## Crates and dependencies`, and the four old-copy results do not. Its Edit and Write calls touch only its own fixture copy (4–11 per run). Results were judged from the files those calls left, not from the run's reply. The records stay in the Lead's local session store and are not published.
  - **Strongest claim:** observed in named examples: on these four scenarios, on Claude Opus, with the loaded copy confirmed. Every prior-revision control passed, so no improvement over the old text is demonstrated; the new text showed no over-application on the counter-example. Codex models were not run.
  - Untested: the `test-support` feature-tree check and composition lifetimes (request scope); those stay named gaps.
- If the host cannot show which copy a run loaded or its actions, the strongest claim is "drafted from approved intent; static checks pass", and the gap is named.

## Coordination

Base: `skill/domain-rust-crate-dag` at origin/main e427d8c9 (sunstack-dev 2.99.0). Pending edits elsewhere: PR #169 (2.99.1), PR #167 (2.98.1); neither touches domain-rust. Version: 2.100.0 in all six homes, plus `docs/changelog/2026-10-27-domain-rust-crate-dag.md` and an index line. No release, cache refresh or merge without the usual review.

## Non-goals

- No new reference, tool, script or lint config.
- No change to `principle-separate-the-concerns` or `principle-justify-the-complexity`.
- No cargo-modules instructions; no change to the TypeScript or Python domains.

## Run status

reviewed: independent Sol xhigh implementation review, findings F7 (proof claim bound to host records and tool results) and F8 (changelog validation and refresh status) fixed, final verdict great at 20b5d5d2. Implemented: SKILL.md section, Signs bullet and description as accepted; six version homes at 2.100.0; changelog entry and index line.

## Review record

Revision 1: independent Sol xhigh spec review, verdict revise (F1 test-support guarantee false; F2 composition lifetime and citation grammar; F3 trait bullet duplicates the principle; F4 topology read as required; F5 proof plan lacked a functional check and a counter-example). The Lead accepted all five; revision 2 addresses each. Revision 2: same reviewer, F1–F5 closed; new F6 (`cargo tree -e features` includes dev edges) accepted. Revision 3 (verdict accepted-to-implement) scopes the command to `-e normal,build,features` on the shipping package and calls it a diagnostic.
