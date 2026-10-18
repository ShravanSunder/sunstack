# skill-rules: turn a skill's standards into checked rules

Skill spec for one new skill. Author: 🦁 Lead (Claude a6321a2f). Base: `origin/main` at `5fd04c9f`, branch `skills/skill-rules`.

## Target and run

| Run | Skill target | Owner plugin | Classification |
| --- | --- | --- | --- |
| 1 | `skill-rules` (new) | `skill-authoring` | create |

## Problem and evidence

- **Owner's words**, 2026-10-17, quoted from the session: "im guess we dont want everything in a skill to become a rule ... so we have a decision matrix for this?"; "seems like we need a skill inc skill creation plugin to help with this"; "skills-rules is separate i think". Earlier: "if we have 2 sources of truth the actual skill and rule file, we might as well handcraft the jsonl"; "i would want things to be more deterministic"; "we can put stuff in ci as well to make sure they pass".
- **The engine is merged** (sunstack-tools `main` at `6939b8c4`, PRs #27–#30). A rule's wording now lives once, in the skill's own Markdown. An end-of-line `<!-- K014 -->` marker binds a section, paragraph or list item. A strict rules file keyed by `K014` carries the rest: name, target, then exactly one of a judgment threshold, an `expect` check or an `ast_grep` rule. `check_rules` validates every rule without a backend, and print shows the assembled question. Source: `crates/sunstack-rule-cli/README.md` (rule sources, `markdown_units`, `frontmatter_field`, `expect`, `ast_grep`, `check_rules`), and the examples `docs/specs/2026-10-12-rust-rule-engine/examples/{marked-standards,mechanical}.*`.
- **What's missing:** nothing teaches an author *which* standards deserve a rule and of what kind, where to put the marker so the question reads well and stays under the cap, or how to prove it. Without that, an author either marks everything (noisy, model-cost-heavy rules from prose that isn't a standard) or nothing.
- **Measured constraint:** a real `skill-creation` section rendered to 467 visible words, over the default 400-word question cap (S1 Verifier observation, `/private/tmp/2026-10-msr-verifier/s1-combined-observation/report.md`). Narrow hosts matter.

## Success definition

When an agent authors or updates a skill in a repository that runs `sunstack-rule`, it decides for each standard whether it becomes a deterministic rule, a model-judged rule, review-only, an eval, or stays prose, and can say why. It marks only standards whose own wording is the check, on the narrowest host that carries the whole standard. It writes a rules entry that `check_rules` accepts, confirms the printed question reads as the standard on its own, and leaves review-only, eval and prose standards unmarked. It names any lexical check that only approximates a semantic standard as a proxy, and proves each mechanical rule by the outcome it selects on a good and a bad example.

## Decisions (defaults taken; the owner may strike any row)

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | New skill `skill-rules` in the `skill-authoring` plugin, separate from `skill-creation` and `skill-audit`. | Owner: "skills-rules is separate". `skill-creation` writes the teaching; `skill-rules` makes parts of it checkable; `skill-audit` decides which skills to change. |
| D2 | **The lens is a five-outcome decision matrix**, applied per standard. **Deterministic** (`expect` or `ast_grep`): the property is visible in text or structure. **Model-judged** (judgment threshold): it needs reading comprehension, and the marked wording alone is a good question. **Review-only**: it needs cross-file or intent judgment the engine can't target, so it's left to `skill-review`. **Eval**: it is about agent behavior under pressure, so it belongs in evals or pressure scenarios. **Prose**: teaching or guidance with no checkable claim. Prefer deterministic when it fully captures the standard. | Owner: "we dont want everything in a skill to become a rule", "more deterministic". The five outcomes are the matrix drafted with the owner on 2026-10-17. |
| D3 | **Mark only text whose own wording is the standard.** If the question would need rewording to be checkable, the text is prose or the standard needs rewriting first (in `skill-creation`), not a marker. | Owner: the wording lives once, in the skill; "2 sources of truth" is what the design removed. |
| D4 | **Narrowest host first:** a paragraph or list item before a section, and a section only when the whole section is one standard and stays under `max_question_words`. Mind the marker syntax: at the end of the line, touching heading text with no space, one ID per file, the RuleSet's prefix letter. | The engine's host rules and cap; the 467-word evidence. |
| D5 | **Calibration examples go in the rule's `context`** (native evidence declarations), never into the marked question. | The engine has no examples field; `context` is the native carrier. The owner's open item "the job of a standard's good and bad examples" leans to calibration (the Lead's earlier recommendation). Owner may strike. |
| D6 | **Proof is the engine's own:** `check_rules` must pass, print must show the question reading as the standard, and every mechanical rule is run against one good and one bad example. Recommend `check_rules` per RuleSet in CI. | Owner: "we can put stuff in ci as well to make sure they pass". |
| D7 | **Engine-generic:** the skill names the `sunstack-rule` CLI contracts and points to the repository's own engine docs and verify skill; it carries no ai-tools-specific RuleSet paths. | Skills cross repositories; the engine's docs own the exact schema. |
| D2-r2 (2026-10-18, supersedes D2) | D2's five outcomes and its preference for deterministic checks stay, with one addition. **A proxy isn't the standard.** A lexical or structural check that only approximates a semantic standard (for example, "a `MUST load` paragraph contains the word `return`" against "a mandatory load names its returned result") doesn't capture it, so the standard is model-judged. The proxy may also be marked, but only as its own narrower standard whose wording says exactly what it checks, and the decision table records it as a proxy. | Spec review R1: `MUST load reference.md and return.` passes the shipped K015 regex (`examples/mechanical.rules.json:8`) yet names no result, so the regex is a proxy for the Call Grammar standard. |
| D4-r2 (2026-10-18, supersedes D4) | D4's narrowest-host rule stays, and the marker syntax is restated exactly. A marker sits at the end of the line, touching the heading text with no space. **Each marker ID appears at most once per Markdown file, and one file may carry many distinct IDs.** It uses the RuleSet's prefix letter. | Spec review R2; engine `markdown_contracts.rs:83` ("Use each marker ID at most once in a Markdown source") and `mechanical-standards.md`, which carries K014 and K015 in one file. |
| D6-r2 (2026-10-18, supersedes D6) | Proof is the engine's own, judged by outcomes rather than exits. Requirements: `check_rules` passes; print (`check_rules` with `output: assembled_rules`) shows every intended rule ID, the count, and each question reading as its standard; and every mechanical rule runs on one good and one bad example. In those runs the intended good occurrence is selected and completes `pass`, and the intended bad occurrence is selected and completes `fail`. Zero matches, an unresolved or skipped intended occurrence, or partial coverage doesn't close calibration, whatever the exit code. Recommend `check_rules` per RuleSet in CI. | Spec review R4: check and print never read the reviewed document (README:54); zero matches complete but never pass (:115); a failed local verdict and partial coverage can exit 0 (:147, :75). The engine's own process tests assert the occurrence verdict (`process_mechanical_rules.rs:85`). |

## Surface allocation

| Surface | Content |
| --- | --- |
| Trigger | Model-invocable. Description: "Use when deciding which standards in a skill should become checked rules, placing `<!-- K014 -->` markers in skill Markdown, writing or fixing a rules-file entry or a RuleSet's `rule_sources`, or reading `check_rules` refusals. Not for writing a skill's teaching (skill-creation) or deciding which skills to change (skill-audit)." Final wording is owned by `skill-creation`'s frontmatter reference. |
| Main path (`SKILL.md`) | Lens: D2 plus D3. Route: (1) read the skill and list its candidate standards; (2) classify each with the matrix, giving the reason; (3) mark the deterministic and model-judged standards on the narrowest host; (4) write each rules entry; (5) wire the RuleSet and confirm the intended rule IDs and count appear in the assembled output; (6) prove with check, print and the good and bad examples, judged by the selected outcomes (D6-r2); (7) return a per-standard decision table, the diff and the check output. Each step has a completion check. |
| Depth | `references/decision-matrix.md` (MUST load at step 2): the matrix with worked examples from real skills, each showing the standard, the outcome and why, plus near-misses. `references/markers-and-rules.md` (MUST load at steps 3–5): marker syntax and hosts (D4-r2); refusal causes and fixes (forbidden host, spaced heading, duplicate ID, oversize, missing or orphaned entry); entry shapes for judgment, `expect` and `ast_grep`, `markdown_units` versus `frontmatter_field` targets, and `context`. **Wiring** (review R3): inspect the actual RuleSet and the invocation that runs it, add the Markdown and rules pair to `rule_sources` with RuleSet-relative paths and the matching prefix, align each entry's target input and context with the RuleSet's input declarations and the invocation's bindings, and stop only when the assembled output lists the intended rule IDs and count. A clean check that omits them is not wired. `references/check-and-reports.md` (MUST load at step 6): the commands, exit codes, refusal locations, coverage `full`/`partial`/`none`, and skipped rules, plus the **calibration decision** (D6-r2): how to read the selected occurrence and its completed verdict for the good and bad example, and why an exit code, zero matches or partial coverage never closes it. |
| Proof | Behavior runs P1–P3 below. |

Worked examples for the matrix, drawn from current sunstack-dev skills and the engine examples:

- frontmatter `description` starts with "Use when": **deterministic** (`frontmatter_field` plus `expect starts_with`);
- "a mandatory load instruction names its returned result": **model-judged** (deciding that a result is named needs comprehension); the shipped regex "a `MUST load` paragraph contains `return`" is a **proxy** (D2-r2) that `MUST load reference.md and return.` passes, so it is marked only as its own narrower standard, if at all;
- `skill-creation`'s Call Grammar section: **model-judged** (judging a call site needs comprehension), marked on its paragraphs rather than the over-cap section;
- "Whoever writes a change never reviews it": **review-only** (cross-agent fact);
- "stops only for a real open decision": **eval** (behavior under pressure);
- "be direct": **prose**.

## Authoring basis and proof plan

Basis: **user-directed intent** (the owner's words above). There's no observed-failure RED; the skill doesn't exist yet. Proof posture: **example evidence for the new skill**, with no prior-revision control because there is no prior revision. Optionally, a no-skill baseline characterizes native behavior; a passing baseline would show no delta. Runs are fresh Sol agents with no authoring history; checks are written before running and kept outside their directories; every record is read by hand.

- **P1, classification.** Give the agent a copy of a real skill with 8–10 standards, pre-labelled privately by the Lead with outcomes. Ask it to add checked rules. Checks: every standard gets one of the five outcomes with a reason; deterministic is chosen where it fully captures the standard; a lexical proxy is never recorded as capturing a semantic standard (the set includes the load-result standard and a concrete-result near miss); prose, review-only and eval standards stay unmarked; at most one disagreement with the private labels, with a defensible reason. The private labels follow D2-r2.
- **P2, marking and rules.** Same run. Checks: every marker is on an allowed, narrowest host with valid syntax; the rules file is strict and keyed correctly; **`check_rules` actually passes** (run the real `sunstack-rule` binary, built from sunstack-tools `main`); print lists the intended rule IDs and count and shows each question reading as its standard; the subject starts from marked Markdown and entries not yet wired into the RuleSet, and an invocation that omits them doesn't close the case; for each mechanical rule the native report shows the good occurrence selected and `pass` and the bad occurrence selected and `fail`, and a selector that misses the bad case or a predicate that passes both fails the check.
- **P3, refusal repair.** Give a skill with four planted marker and rules defects (a spaced heading marker, an orphaned entry, an oversize section, a repeated ID) and the check output; the same file also carries two distinct valid IDs, which must stay. Checks: each defect is fixed at its cause (moved, narrowed or removed), not by loosening the cap or deleting the standard.

Repetitions: two fresh runs per case. Static: `claude plugin validate .`; the skill-authoring test suite if present; frontmatter and trigger checks per `skill-creation`.

## Coordination

- Branch `skills/skill-rules` from `origin/main` `5fd04c9f`; worktree `/Users/shravansunder/dev/ai-tools.skills-skill-rules`. The gate-fix branch `skills/real-decision-stops` (draft #147) touches only sunstack-dev, so there's no overlap.
- Version: `skill-authoring` 0.3.1 → 0.4.0 in every manifest and marketplace entry, plus one changelog entry.
- Implementation by an Opus skill Worker; spec and implementation review by Sol reviewers under `skill-review`; proof by fresh Sol agents.

## Non-goals

- Placing real markers in sunstack-dev skills and wiring a RuleSet and CI check in ai-tools: that's the next run (the pilot), once this skill exists.
- Reworking `skill-audit` to run rules across skills (backlog item 13), and the evals harness (item 12).
- Engine changes.

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| 1 `skill-rules` | proposed | — |

## Review record

- **Revision 1** (`83c060ae`): `skill-review` spec stage, review lead codex-local `01a14cd8-f020` with two Sol xhigh reviewers. Verdict `targeted-revision`, implementation decision `revise-first`; findings R1–R4 (important), all accepted. Report: `/private/tmp/2026-10-skill-rules/spec-review/spec-review.md`.
- **Revision 2**: R1 → D2-r2 and the worked example; R2 → D4-r2; R3 → the wiring responsibility in `markers-and-rules.md` and step 5; R4 → D6-r2, `check-and-reports.md` made MUST at step 6, and the P2 checks; the success definition now uses the five outcome names. Original rows kept. Same review lead: R1–R4 verified closed, 4 → 0 findings, no recurrence. **Verdict `great`, implementation decision `accepted-to-implement`** at `9abfa4f7` (`/private/tmp/2026-10-skill-rules/spec-review/spec-review-r2.md`).
