---
name: skill-rules-config
description: "Use when writing or repairing a sunstack lint rulebook (markers, rule or filter entries, evidence kinds, config pairs), or running lint, lint show or lint cases and reading the report."
---

# Skill Rules: Config

A rulebook is a program for one engine, `sunstack lint`, and this skill is that engine's manual at version 0.8.3: how a config pairs Markdown standards with rule entries, how evidence kinds pick pieces, how a rule or a filter is written, what each command does and what a report means. It changes when the engine changes. Which standards deserve a rule, what a rule should ask, and whether a rule is any good are design questions, never answered by the syntax.

Check the engine you have before leaning on a fact here: `sunstack --version`. Where the engine's own `crates/sunstack/README.md`, in `sunstack-tools` at that version's tag, says something different, the README wins and this manual is stale.

## The objects

```text
config            the file the repository's instructions name for `sunstack lint --config`
├─ rulebook       [{markdown, rules}]: each Markdown file of standards paired with one rules file
│    markdown     standards, each bound by an end-of-line marker such as <!-- K001 -->
│    rules        one JSON object keyed by marker ID; one entry per marker:
│                 name · evidence · questions · reference · decision · related · severity
├─ evidence       an ast-grep project and its kinds; each kind picks pieces from checked files,
│                 with named fields; a kind may `select` (one Noul per candidate) or lie `within` others
├─ filters        optional; one label per folder, decided by a tree; a rule gates on one with `only_when`
├─ check.files    the files lint reads
├─ decision_model {model}: `jev-latest` unless overridden
└─ limits         request size and count, concurrency, match count
```

A rule judges one piece at a time and ends in `pass`, a finding, `uncertain` or `not_applicable`. A filter judges one folder at a time and ends in one of its declared labels or `unsure`. Both are static trees: every question about a piece or folder goes in one request, and code walks only the routes its answers lead to.

## Not shipped in 0.8.3

**Tree-shaped selection.** A kind's `select` asks exactly one Noul of each candidate, against `yes_at_or_above` and `no_at_or_below`, and carries no `reference`. Choosing pieces by a small tree with its own reference is planned and not shipped. Until it ships, a selection that needs more than one question can't be written as a kind; don't simulate it with a gate copied into every rule that reads the kind, and don't describe it as available.

## Tasks

Load the reference for the task in front of you; one piece of work often needs several.

- IF writing, repairing or pairing a marker, a rule entry or a filter, load `references/rule-entries.md` and return each marker's host, each entry or filter as written, any pair added to the config, and each refusal's cause and fix.
- IF defining or changing an evidence kind, a field, a `select` or a `within`, or printing evidence, load `references/evidence-kinds.md` and return the kind as written and what its print shows: the intended pieces with their fields, every cut, and the file counts.
- IF running the rules on skill files for a step that checks them (a writer's self-check, a review's rule pass, a release's prove step, an audit), load `references/running-rules.md` and return its reading.
- IF reading a check's print, a run's report, a saved request or `lint show` output, load `references/requests-and-reports.md` and return what each status and field means for the result in hand.
- IF writing a case file or running `lint cases`, load `references/case-runs.md` and return the cases as written, or the run's outcome for every case with the counts per rule and per filter.

## After every rulebook change

Run `sunstack lint --config <config> --check`, then `--rules`, from the repository root. The check reads the config, the rulebook, every entry and filter and the evidence project; it reads no checked file and sends no model request.

Completion: the check exits 0, and the printed rules are the count before the change plus the entries added, minus those removed, each with its marker, source line, evidence kind, `mechanical` or `asking`, and severity. A clean check whose count didn't move means the command read another config, or the pair isn't in it.

## The model key

- **Send model requests:** an ordinary run with any asking rule or any selected kind, even when a later mechanical branch would avoid the ask; `--evidence` over a selected kind or a kind `within` one; `lint cases`.
- **Send none:** `--check`, `--rules`, `lint show`, and `--evidence` with no selected kind.

The engine finds its own key. Never supply, replace or remove a key or a model endpoint to get a run through. Without the grant to send requests, prepare the exact command with its config, hand it to whoever holds the grant, and read the report it keeps.

## Completion Blockers

- a rulebook change without a passing check whose printed rules have the expected count;
- an engine fact stated from this manual without checking the installed version, or against the engine's README;
- a command that sends model requests run without the grant, or with a stand-in key or endpoint;
- tree-shaped selection written, simulated or described as shipped;
- a refusal cleared by raising a cap, deleting a standard or its entry, or moving a marker onto text that doesn't state it.
