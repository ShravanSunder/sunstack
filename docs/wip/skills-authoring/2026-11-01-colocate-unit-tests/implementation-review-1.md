# Implementation review 1: colocate unit tests

**Source result: the two skills implement the accepted design verbatim. Overall verdict: targeted-revision for one minor stale proof-status item in the PR description.** Pressure behavior remains unverified/deferred; this review does not authorize shipping or claim PR readiness.

review target: [PR #189](https://github.com/ShravanSunder/sunstack/pull/189), branch `skills/colocate-unit-tests`, head `93e00845c4012c74fef4650caee750a53570340c`, base `3511b587edf6576ef34e6e7985cb434b0217010e`. Local HEAD and GitHub's head matched on both reads during this review. Governing design: `24eea1b3`, with the version deviation explicitly authorized in the current commission and recorded in the design.

Requester: 🦁 Lead `claude-local/68844339-00d7-476c-910a-24cba89d8758`, commission `01a196ee-6e0b-7ff3-87f3-f3f8a7b085d1`. Reviewer: 🔎 Reviewer Sidekick `codex-local/01a196d6-e5db-7713-b95e-51b150b843fa`. I authored neither implemented skill nor the metadata/changelog. My two earlier design-review reports are historical evidence in this PR; I do not claim an independent review of my own reports. The recorded single-reviewer exception remains a limit, not usual two-family coverage.

## Ranked finding

### I1 — minor: the PR description still presents the keyed self-check as pending

- **Check / property / route:** `claim-vs-evidence` / claim strength / PR publication through `implementation-pr-wrapup`.
- **State:** candidate → verified-at-anchor → accepted.
- **Evidence:** under **Planned, and still unverified**, the live [PR description](https://github.com/ShravanSunder/sunstack/pull/189) says the keyed self-check was not run from the writer's session and the command is with the Lead. The latter is stale pending-status context: the commission supplies the completed Lead run, and I opened its [raw report](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/tests/skills/tmp/rules-Qnz6Cl/report.json). It contains actual results for the two current skills. The statement about the writer's session can remain literally true while the section leaves reviewers with the wrong overall status.
- **Risk:** a reader cannot tell the completed keyed rule pass from the still-unrun pressure evaluation, and may treat the former as outstanding.
- **Smallest fix:** move the keyed result to **Proof**: `uncertain`, zero findings, 14 pass, 16 not applicable, two uncertain pieces independently dispositioned below. Retain pressure behavior and cache refresh under their actual unverified/not-refreshed statuses. Do not relabel the engine run clean.
- **Retest:** reread the live PR body at this head; no source edit or suite rerun is needed for this publication-only correction.

No skill-source or changed-version defect was found.

## Rule pass reading

rules: **ran**, supplied Lead run reused after checking its captured text against current files; no duplicate paid run was made.

runner: `pnpm --dir tests/skills rules` on `domain-typescript` and `domain-rust`, as named by the repository and commission. Report: [tests/skills/tmp/rules-Qnz6Cl/report.json](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/tests/skills/tmp/rules-Qnz6Cl/report.json).

status: `uncertain` (contract exit 5; the original process exit was not independently observed). Report counts: 0 error, 0 warn; 14 pass, 16 not applicable, 2 uncertain. Usage: 22 model requests, reported cost about $0.001052. Findings, incomplete parts, skipped rules, diagnostics and selection candidates are empty. The report records eight zero-match exclusions; these are not positive coverage. I compared all 22 captured line/description texts with the current files and found no mismatch.

| Uncertain piece | Independent disposition |
| --- | --- |
| `description.trigger-only`, TypeScript frontmatter, `carries_extra` yes .33 | **Meets the standard.** [Description:3](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/plugins/sunstack-dev/skills/domain-typescript/SKILL.md:3) lists situations that should load the domain: writing/reviewing TypeScript, naming files and choosing gates. It prescribes no workflow sequence, tool invocation or implementation technique, and adds no generic virtue. Its being unchanged limits remediation scope; the actual wording, rather than unchanged status alone, supports this disposition. |
| `branch.condition`, Rust:154, `when_kind` guidance .57 / branch .43 | **Meets the standard even read as a branch.** [The paragraph](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/plugins/sunstack-dev/skills/domain-rust/SKILL.md:154) gives an observable predicate, editing a module whose own unit tests have another form, and the different work it causes, moving those tests to its sibling `_test.rs` in the same change. It bounds the move to that module and names the instructions/checks conflict that triggers an owner question. |

These are human review dispositions of uncertain pieces; the engine's saved status remains `uncertain`. Neither becomes an engine-generated pass. I agree with the Lead's conclusions for the source reasons above.

## Checks and design comparison

| Check | Status | Evidence/result |
| --- | --- | --- |
| `placement-and-calls` | complete | The new teaching is inline in the existing domains. No reference, dispatch, citation or ownership cutover was added. The existing Implementer-to-domain route was established in the design review. |
| `steering-strength` | complete, source-only | Positive sibling-file examples, fixed forms, any-module-change conversion, bounded migration and the narrow ask are explicit. Signs lines name the existing-folder rationalization. Binding behavior under pressure is unobserved. |
| `mental-model-fit` | complete | Existing language lenses remain unchanged; the new Tests sections add language standards without introducing another workflow or invented vocabulary. |
| `no-op-pruning` | complete within accepted wording | The added statements carry the adopted layout, conversion boundary or known rationalization. The implementation adds no extra teaching beyond the accepted text. This is not a reopening of the design's wording choices. |
| `rule-agreement` | complete | Read both current skill files whole. A read-only extraction/comparison found both Tests blocks and both signs lines **verbatim** from `24eea1b3`. The Rust async-test paragraph remains. `tests/support/` avoids the retained TypeScript `utils/` prohibition. |
| `depth-coverage` | complete | The inline Tests sections own the added decisions and give positive examples, observable conditions and actions. No shape-only reference stands in for teaching. |
| `transfer` | complete, source-only | Different existing conventions do not override the fixed form; explicit repository instructions/checks trigger a question. Production-only changes convert that module's own old-form tests; unrelated modules stay outside the move. These are source walkthroughs, not pressure runs. |
| `claim-vs-evidence` | complete with I1 | The PR and changelog correctly name pressure behavior unverified. I1 is the stale keyed-pass status. Reported suite/validation totals remain attributed as below. |
| `trigger-routing` | complete, not selected | Both descriptions and hide settings are unchanged. The TypeScript uncertain piece was nevertheless read independently. |
| `sensitive-surface` | complete, not selected | No executable script, asset, credential, third-party dependency or network behavior is changed by this PR. Metadata is covered separately. |

Applicable root topics: `main-path`, `calls-and-placement`, `steering`, `generalization`, `proof-claims`, `change-classes` and `platform`; `descriptions-and-invocation` also governs the uncertain description. The change is behavior-changing. Positive guidance, observable branches, inline ownership and the owner's adopted scope are retained; static proof is not behavior proof. No shared output/tool shape or new invocation contract is introduced.

## Version, changelog and changed-file coverage

- The Codex, Claude and Cursor plugin manifests and the Claude/Cursor marketplace entries all move **2.102.1 → 2.102.2**. JSON parsing and comparison against `24eea1b3` confirmed that each of these five files changes only its version. Source paths and other metadata are preserved. [Skill design:132](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:132) records the authorized deviation from planned `2.103.0` and the additional Cursor marketplace entry.
- The [changelog entry](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/changelog/2026-11-01-colocate-unit-tests.md:1) is 18 lines, names the skills and resulting behavior, reports validation and absent pressure proof, and records no Codex/Claude cache refresh. Its [index link](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/changelog/README.md:3) is newest-first. No changed command, hook or README behavior needs a separate entry.
- Existing Codex `agents/openai.yaml` files keep `allow_implicit_invocation: false`; no frontmatter/invocation change is made. The root Codex marketplace entry's retained `2.101.3` is also present at base `3511b587`, and that file is unchanged. It is a pre-existing metadata observation, not a defect introduced by this PR; this review claims no installed-client delivery result from it.

| Changed paths | Coverage |
| --- | --- |
| `plugins/sunstack-dev/skills/domain-typescript/SKILL.md`; `plugins/sunstack-dev/skills/domain-rust/SKILL.md` | Reviewed semantically and against the accepted design. Behavior unverified/deferred. |
| `plugins/sunstack-dev/.codex-plugin/plugin.json`; `.claude-plugin/plugin.json`; `.cursor-plugin/plugin.json` | Reviewed as version-only metadata changes. |
| Root `.claude-plugin/marketplace.json`; `.cursor-plugin/marketplace.json` | Reviewed as version-only changes; source resolution preserved. |
| `docs/changelog/2026-11-01-colocate-unit-tests.md`; `docs/changelog/README.md` | Reviewed for current behavior, proof boundaries, version and index placement. |
| Design `requirements.md`; `specification.md`; `skill-verification.md`; `index.source.html` | Unchanged since accepted `24eea1b3`; prior semantic coverage retained. |
| Design `skill-design.md`; `index.html` | Read the post-acceptance changes: recorded version deviation and implemented/pending-proof status. All four embedded parts equal their current Markdown in an independent Node comparison. Rendered UI unobserved. |
| `design-review-1.md`; `design-review-1-recheck.md` | Historical reviewer-authored records, outside independent implementation authorship review. Their existence does not substitute for implementation or behavior proof. |

## Evidence and disposition

The commission and PR report these checks at `93e00845`: Vitest 25 files / 268 tests, exit 0; typecheck exit 0; `rules --check` 13 rules, exit 0; Claude plugin validation passed. I requested retained raw logs, and found no matching logs in the supplied `tests/skills/tmp` area. These totals are attributed, not independently rerun or observed by this review. The keyed JSON report above was directly inspected. My own `git diff --check 3511b587..93e00845`, JSON/version comparison, accepted-wording comparison and page/source comparison all completed successfully. No build, suite, pressure run, cache refresh, PR mutation or commit was performed by this reviewer.

The Rust example's path/privacy mechanics retain the source/reference coverage from design review. Its reported scratch-crate counts are still attributed. The planned Luna comparison is deferred to the pressure-tasks work (task #88, as supplied by the Lead); no result or acceptance for that task was inspected. Rust pressure behavior, reliability rates, the conflict-question branch and production-only conversion steering remain unobserved here. A tool-using agent's source access and actual loaded skill copy still need proof at the eventual run.

verdict: `targeted-revision` overall for I1; the implemented source matches the design and has no accepted source finding.

accepted findings: I1 only, minor and routed to PR publication. No duplicate or conflicting candidates. Both rule uncertainties were verified at their anchors and dispositioned as conforming, not accepted findings.

rejected findings: no version mismatch introduced by this PR; no new Rust path/privacy defect; no `utils/` collision remains; the two unsure outputs do not establish breaches. The older root Codex marketplace version is pre-existing.

unverified findings: none asserted. The behavior and evidence gaps above remain gaps, not invented failures.

smallest edits / first required revision: refresh only the keyed-self-check status in the PR body, preserving the `uncertain` result and independent dispositions. No skill edit is indicated by this review.

targeted retest: live PR-body reread after that update. No repeat suite or paid rule run is justified by a description-only correction.

highest risk / worst plausible failure if merged today: untested steering could still copy the old test layout or mishandle a required conversion/discovery constraint. The source and structural evidence do not establish prevention under pressure. This is why the review cannot claim delivered behavior or PR readiness.

ship decision: **source-only**. The record supports the source comparison and next proof step, not shipping authorization. Required behavior proof and PR-readiness disposition stay with the Lead under the declared deferral and delivery boundary; the owner retains merge authority.

Checkpoint: this uncommitted report is returned to the commissioning Lead through Router. No work root or posting grant was supplied, so the prior trace gap remains; no board mutation or stand-in was used.

## Publication follow-up

A subsequent live reread found PR #189 still open at `93e00845` with I1 unchanged. The reviewer has no PR-write grant. The exact replacement for the pending keyed-self-check bullet, placed under **Proof**, is:

> **Keyed rules self-check:** the Lead ran the repository runner on both changed skills. The raw report is `uncertain`: 0 findings, 14 pass, 16 not applicable and 2 uncertain pieces. Independent review found the TypeScript description to contain loading situations only, and the Rust conversion paragraph to satisfy the observable-condition/action standard even when read as a branch. These human dispositions do not change the engine's saved status. Pressure behavior remains unverified.

This is a proposed publication correction, not a posted PR edit. The Lead owns that correction and can return its saved result for the narrow reread. No further source review or new suite run is needed for I1. The separately assigned pressure-task work remains outside this review commission.

## I1 closure

**I1 is closed. Effective source-review verdict: `great`; ship decision remains `source-only`.**

I reread the live PR description at head `8dbedca5d7ba1d61b6ab10ed49e23445598be78a`. The keyed self-check is now under **Proof**, with 0 findings, 14 pass, 16 not applicable and 2 unsure, and with the Lead's and independent reviewer's conforming dispositions. The stale pending keyed-check bullet is removed. Pressure behavior remains explicitly unverified, assigned to task #88, and caches remain not refreshed. The description does not claim the engine returned clean or that pressure proof ran.

The only committed change from `93e00845` to `8dbedca5` is this review record; the implemented skills, versions, changelog and accepted design text are unchanged. Their existing source coverage therefore remains current without another suite or paid rule run. Original implementation-review findings: `1 → 0`, no recurrence. No open finding remains in the commissioned review. This closure does not promote the attributed suite receipts, deferred behavior proof or single-reviewer coverage to a stronger claim.

Closure checkpoint: report and closure returned to the Lead through Router. The reviewer made no PR edit or commit. The earlier targeted-revision verdict above records the original review; this section supplies its final disposition.
