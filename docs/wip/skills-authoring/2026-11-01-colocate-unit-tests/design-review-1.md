# Design review 1: colocate unit tests

**Implementation decision: revise-first.** Two bounded corrections are needed: make the pressure oracle enforce asking before writing, and reconcile the allowed test-helper folder with TypeScript's existing naming prohibition. The colocation rule, language-specific filenames and domain ownership carry the owner's intent.

review target: the four Markdown parts and `index.html` in this folder at `1db08216b76d2a67d1b48827268b5bc9186e1282`, branch `skills/colocate-unit-tests`.

Requester: 🦁 Lead `claude-local/68844339-00d7-476c-910a-24cba89d8758`, commission `01a196d6-f88f-7cc2-bc3a-3e84d53ec9db`. Reviewer: 🔎 Reviewer Sidekick `codex-local/01a196d6-e5db-7713-b95e-51b150b843fa`, with no authoring history for this target. The later correction `01a196d9-8920-7ef3-8fcc-b2360b695b63` supersedes the commission's assertion of an automated Rust module gate.

## Per-check statuses

| Check | Status | Selection and coverage |
| --- | --- | --- |
| `rule-agreement` | complete | Required; compared the proposal with both current domain files, the owner's supplied requirements, proof scoring, Python consistency, the Implementer loading route and the cited Rust convention. F1 and F2 below. |
| `transfer` | complete | Required for the stated rules; independently walked the four standards, with the cases below. No transfer finding. |
| `mental-model-fit` | complete | Not selected: the language skills' lenses and jobs do not change. The whole-set rubric still examines the added layout teaching. |
| `depth-coverage` | complete | Not selected: no promised stage or reference owner changes; both Tests sections teach the decision inline. |
| `trigger-routing` | complete | Not selected: descriptions and hidden invocation remain unchanged. Checked reachability separately below. |

These are this reviewer's checks. The commission and design record specify one Sol reviewer; `skill-review` normally requires two independent stage reviewers. That procedural coverage is unfulfilled, was reported to the commissioner, and is not represented here as a completed two-reviewer review. Stop condition for this scoped inspection: met. A clean full-procedure verdict remains unavailable.

## Ranked findings

### F1 — blocker: the pressure oracle passes a write made before the required owner decision

- **Check / property:** `rule-agreement` / rule agreement; proof consequence also belongs to `claim-vs-evidence`.
- **State:** candidate → verified-at-anchor → accepted.
- **Evidence:** [specification.md:16](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/specification.md:16) requires asking **before adding the test**. Both proposed bodies retain that ordering, at [skill-design.md:35](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:35) and [skill-design.md:74](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:74). But [skill-verification.md:29](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-verification.md:29) passes a newly written colocated file when the conflicting convention is merely flagged to the owner. It requires neither a question before the write nor an owner answer.
- **Failure:** a run writes `report.test.ts`, then says “the old tests are elsewhere; is this location okay?” and passes despite violating standard 4. Even a flag that asks nothing satisfies the written pass row. The plan's own claim that it proves “colocated and asked” is therefore too strong.
- **Smallest fix:** keep standard 4 as the authority. In this known-conflict fixture, pass a question naming the proposed layout with no test write before an owner answer; writing first and flagging later must fail that requirement. If a continued run receives an owner answer, score its subsequent action separately. Read action order from the host record, not the final response. This matches the conditional-mistake repair in `steering.md`: observable conflict → ask → await the decision before adding the test.
- **Retest:** use the same corrected oracle for both fresh runs. It must reject write-then-ask and accept ask-before-write. This is an oracle correction before execution, not a demand for more repetitions.

### F2 — important: the proposed helper option disagrees with the retained TypeScript naming rule

- **Check / property:** `rule-agreement` / rule agreement.
- **State:** candidate → verified-at-anchor → accepted.
- **Evidence:** [skill-design.md:33](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:33) explicitly allows `tests/utils/`. The retained [domain-typescript/SKILL.md:119](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/plugins/sunstack-dev/skills/domain-typescript/SKILL.md:119) governs creating a file **or folder** and says “never … `utils/`”. The set says no other surface changes, so both instructions would ship together.
- **Failure:** an agent creating the expressly permitted `tests/utils/` must guess whether the Tests section overrides the unconditional naming prohibition. The owner allowed helpers there; choosing `lib/` every time to avoid the contradiction silently narrows that choice.
- **Smallest fix:** make the existing naming sentence's test-helper exception explicit and include that bounded edit in run 1. Keep the Tests section as the home of the helper layout; retain the responsibility-based naming rule for production modules. Do not remove the owner-authorized `tests/utils/` option.
- **Retest:** implementation review reopens both anchors and checks that creating a shared test helper under `tests/utils/` is allowed while a production catch-all `utils/` folder remains rejected. A static wording search alone does not establish that distinction.

## Answers to the commissioned checks

**Owner's rule.** The proposed text names colocated `.test.ts` and `_test.rs` files, reserves the package/crate `tests/` area for integration/e2e tests and helpers, and explicitly asks before following or converting a conflicting layout. The existing-folder rationalization is present in both signs lists. F1 concerns the proof oracle, not an omission of the ask in the teaching.

**Rust D1.** There is no demonstrated automated gate to break. I read [PR #110](https://github.com/ShravanSunder/sunstack-tools/pull/110), whose body records the one remaining source `#[path]` as the test-only fixture import. That is evidence of the accepted refactor outcome, not by itself a permanent machine-enforced ban. At sunstack-tools `c2531e7`, direct source inspection finds two source path attributes: the fixture import and `decision_walking/tests.rs:6` loading `tests/locator_answers.rs`. The historical count is not the current count.

The current Rust skill has no blanket `#[path]` prohibition or corresponding signs-list item: see [domain-rust/SKILL.md:100](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/plugins/sunstack-dev/skills/domain-rust/SKILL.md:100), [its crate rules:117](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/plugins/sunstack-dev/skills/domain-rust/SKILL.md:117), and [its signs:133](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/plugins/sunstack-dev/skills/domain-rust/SKILL.md:133). D1 therefore has no intrinsic conflict with those rules. The [Rust module reference](https://doc.rust-lang.org/reference/items/modules.html#the-path-attribute) supports a non-inline module's path relative to its containing source file; [privacy rules](https://doc.rust-lang.org/reference/visibility-and-privacy.html) allow a child test module to access its parent's private items.

`#[cfg(test)] mod report_test;` beside `mod report;` in the parent is an alternative for APIs already visible to that sibling. It cannot test D1's private `count_words` without changing visibility. With visibility widening ruled out by the corrected commission, it is not a substitute for this example. D1 trades conventional file discovery for a sibling file that remains a logical child. For the sunstack-tools migration, carry that convention conflict to the owner as required; this review grants no repository migration or exception. The reported scratch-crate test counts were not rerun or independently verified here.

**Pressure proof.** The fixture is real: `git ls-tree` at `74e18127` shows `report.ts` and exactly eight test files in the stated folder. The existing [test fixture](https://github.com/ShravanSunder/ai-tools/blob/74e18127/tests/skills/lib/skill-rules/tests/skill-rules-report-gaps.test.ts#L201) already exercises a report with no findings and asserts `Gaps: none` at line 215. Consequently, a run may legitimately discover existing coverage and make no edit. Treat that outcome as placement not exercised, not as a failure or a pass; choose a genuinely missing case from the same real module if needed.

The prompt applies urgency, existing-convention pressure and owner absence to actual file placement. It can expose copying the old layout or converting it unasked, so it tests steering rather than recall of wording. Naming the hidden skill is appropriate for this body test; it does not test discovery. Keep the stated one-run-per-text smoke boundary. A passing control shows no demonstrated added value on this case, not a reliability rate. Preserve the loaded skill path/revision, host action record, checks outside both run workspaces, and manual reading required by [proof-claims.md:28](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/plugins/skill-authoring/skills/domain-skill-crafting/references/proof-claims.md:28). No pressure run has been performed by this review. Rust steering remains the plan's named proof gap; review and compilation cannot close it.

**Placement and reachability.** Domain-only ownership is sufficient for the declared callers. In addition to the global instruction supplied with this commission, [role-implementer/SKILL.md:29](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/plugins/sunstack-dev/skills/role-implementer/SKILL.md:29) requires its working reference, whose [line 36](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/plugins/sunstack-dev/skills/role-implementer/references/working-with-lead.md:36) loads each touched language's domain skill. The claim that no role/phase/practice points at the domain standards overlooks this existing route. No extra copy of the layout rule is needed. These source routes establish reachability under the instructions, not observed compliance by every implementer.

## Whole-set disposition

verdict: `targeted-revision`.

blocker overrides: all four required parts and the page exist; each run names one skill; proposed guidance has a declared proof route with Rust behavior explicitly unverified; no new reference, dispatch, shared shape or sensitive execution surface is proposed. An independent read-only Node comparison found all four embedded page parts equal to their Markdown sources. The page's source consistency is checked; its rendered UI was not observed. F1 prevents accepting the proof route as currently scored. Default two-reviewer coverage also remains unfulfilled.

rubric evidence:

- **Promise / classification:** the repeated placement problem and owner direction earn durable language teaching; `behavior-changing` is correctly identified in requirements, with one target per run.
- **Transfer:** standard 1 holds for a separate TypeScript CLI using `__tests__` by requiring an owner question, and rejects a new unit test under an unnamed `spec/` directory. Standard 2 holds for a nested Rust module by keeping the test a logical child, and rejects a sibling file named `<module>_spec.rs`. Standard 3 separates tests and helpers in a different workspace package and rejects integration fixtures in a root `test-data.ts`. Standard 4 asks before using a different existing convention and rejects an unrequested bulk conversion. The author's recorded cases agree. “The owner's test layout” supplies the adopted scope.
- **Steering / body / depth:** the positive file examples and conflict condition teach the intended choice inline. The rationalization answers the reported drift. F2 is the retained-text contradiction. No new stage, completion machinery or reference tree is needed.
- **Invocation / ownership:** hidden invocation is unchanged and has an existing caller, as above. No ownership cutover or new output/tool shape is proposed. Python's colocated unit tests and integration location agree with the checked scope; its missing ask/e2e sentences are explicitly outside this change.
- **Platform / safety:** the design names the owning plugin, three manifest bumps, changelog and owner-owned merge. These are future implementation obligations; no release, cache refresh or platform validation is claimed by this review.
- **Proof:** the real fixture and fresh baseline comparison are appropriate for a bounded TypeScript smoke claim after F1's correction. Existing coverage, Rust steering and rate claims retain the limits above.

highest risk: a green pressure result could bless writing through a convention conflict without the owner's answer.

accepted findings: F1 and F2, each verified at its cited anchors. No duplicate findings or conflicting reviewer candidates were reduced.

rejected findings: “D1 breaks an automated module gate” is superseded by the commissioner's correction and unsupported by the inspected sources. “The Rust skill bans D1” is not present in that file. “A parent-declared sibling preserves private access” conflicts with Rust privacy. “A new phase/practice pointer is required” is already satisfied through the Implementer route. These are dispositions of the commissioned hypotheses, not additional accepted defects.

first required revision: correct the oracle's write-before-ask pass row, then reconcile TypeScript's helper-folder exception; update the embedded page with the Markdown changes.

proof or retest implication: use the corrected oracle before the planned baseline/change runs; classify existing-coverage/no-action as unexercised; keep Rust steering unverified unless separately evaluated. No test suite, build or migration was run, and no product or skill source was changed.

implementation decision: `revise-first` (requested verdict: **revise**). Ship decision: `blocked`; this is design source review only.

Trace handback: the commissioner has the initial commission, correction and this report through Router. Workspace/board discovery found the workflow workspace and its threads, but no supplied or uniquely matching colocate-unit-tests root; no posting grant was supplied. Exact gap: `no-home: this assignment's work root not identified`. No new trace or board mutation was made. The commissioner owns recording this checkpoint and arranging the missing review coverage. All four commissioned questions are answered above; no stand-ins were used.
