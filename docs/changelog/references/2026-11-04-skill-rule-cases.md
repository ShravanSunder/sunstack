# Skill-rule scenario foundation: evidence and limits

**Current layout after A6 (5 Nov):** definitions live under `tests/skills/evals/rule-scenarios/<rulebook>/<rule-name>.scenario.json`, retired history under `retired/`. Owner decisions live in the root `adopted.json` (currently `{}`). Scenario runs write only ignored `tests/skills/tmp/scenario-runs/<UTC>/report.json` and `raw/`; `evals:scenarios` never adopts a rule, and explicit `evals:adopt` refuses an incomplete, failed, unsure, partial or stale report. All old committed run records below were removed by A6. See [A6 proof and limits](2026-11-05-scenario-adoption.md).

## Historical D2 observations through 1bdec8db

The following observations predate the owner’s scenario/adoption cutover. Their original IDs remain unchanged. They are regression evidence, not current adoption or a claim that an old generated record still controls admission.

This changes the rule-admission foundation, not whether a judged rule deserves trust. Legacy labels remain `legacy_independent`; unclassified scenarios count toward no floor. Actual judged rules remain held pending their reasons, independent labels, floors, held-back sets and tuned bars. Engine kind filters and their live boundary proof are later work.

## Structural and runtime proof

- `pnpm --dir tests/skills rules --check` on sunstack 0.6.0 assembles the independently specified twelve rule names and five rulebooks. The config declares exactly five evidence kinds.
- The migration comparison reads the old expectations independently from Git at `a815d170`, compares all 245 identities, source/context, expected outcomes, original kind, selector coordinates, finding lines and original note/who/added, and preserves the older 173 coordinate contracts at `74e18127`.
- Real collection comparison over all kept scenarios compares exact subject bytes/spans and unchanged followed fields before/after the trim: 173 self scenarios plus seven external scenarios. The target kind name changes from `skill_target` to `skill`; enclosing headings and colon blocks are intentional added context.
- The pinned `a815d170` tree has 28 colon-ended branches, including the two language-toolchain blocks added after the scratch proof's 26 (`domain-python:94`, `domain-swift:61`). Their collected blocks match their source bytes and spans; list, table and fenced examples and headings are checked independently. A following block on a non-colon line is ignored by the question's explicit instruction, not by the collection.
- Admission integration runs the real scenario writer, source archive, engine and ordinary CLI with a controlled provider. A positive eligible baseline nudges in both output paths; each question/bar/scenario/AST/config/receipt change holds the rule while retaining a raw finding. A retired-only or partial run cannot mint an admitting receipt. Deliberately bypassing either output filter is caught. These are policy records and controlled answers, not semantic proof of their labels.

## Keyed branch observation

The Lead ran the real scenario writer on all 21 active branch scenarios through Jev. Result: 15 caught (10 expected passes, two expected findings with matching locators, three exclusions), two false nudges (`main-path-k001-case-014`, `-021`), and four unsure (`-001`, `-005`, `-007`, and `-006`, whose observed exclusion differed from its expected pass). Runner exit 1; both engine subruns exited 5 because uncertainty also occurred elsewhere in their source files. The committed receipt is incomplete and retains failures and unsure ids.

The two subruns reported 98 model requests, 124,830 input tokens, 6,706 output tokens and $0.00524286. Requested model: `jev-latest`; the engine report does not expose the resolved model version, so a fixed-version comparison remains unverified. These exposed regression scenarios are not a fresh holdout or an accuracy estimate. Questions and labels were not tuned to this run; the Lead explicitly accepted its mixed receipt as D2 evidence, with semantic tuning deferred.

No receiving-agent behavior, actual general-skill kind gate, full-tree judged-rule readiness or installed-cache delivery is proven here. Source/plugin validation and tests establish only their stated layers.

## Final local gates

After the rendering, standards-fingerprint and branch-input corrections, `pnpm --dir tests/skills test` with both external source roots configured reports 39 test files passing, 298 tests passing and one explicitly gated live-provider test skipped (exit 0). Typecheck, oxlint over all 26 changed TypeScript files, `git diff --check`, the twelve-rule assembly and all 245 scenario schemas pass. Claude plugin validation passes; its unrelated existing README advice is deferred.

The runner's invented sample and completion skill directories are removed. Real historical descriptions exercise 225/230/308 character outcomes, the owner's actual `Always use when` description, and a rejected historical `Always load` opener. A real-engine serialization test renders pinned line 17, the actual standard's wording/line, the loaded AgentStudio loop, answers, path and cut state, joins the same rule at line 40 and excludes a quiet control for that rule. A separate real-section cut test checks collected bytes, the bounded view and the provider request apart. These use controlled answers and prove rendering/transport, not the semantic judgment.

The initial formatter matched the first containing result range. Real sections nest, so line 40 could print its enclosing section's pass answers and path. A real-engine regression first failed on that mismatch, alongside a focused cut-attribution scenario. The corrected formatter reads `judgment.answers` and `judgment.path_taken` from the finding itself, as the 0.6.0 wire contract defines, and uses the closest matching finding result for cut state. Both regressions and the full suite pass after the fix.

## Standards fingerprint correction

The initial fingerprint omitted the paired standards Markdown even though the engine puts its wording in the model state. An added producer-to-ordinary-CLI mutation first reproduced an old receipt still admitting a nudge after only the standard line changed. The corrected producer and consumer resolve the pair from the canonical config and hash the entire Markdown file. The same test now retains a raw finding, reports the rule held and suppresses the nudge in both output paths. Old receipts become stale. The final keyed run rewrote all five receipts, whose twelve fingerprints match the corrected producer/consumer; they remain incomplete and cannot admit a judged rule.

## Branch question correction and scoped result

The block was already present and uncut in the first keyed run. The question nevertheless declared only `line` as its checked field, and its work criterion still asked what the line named. The correction declares `[line, block]` in both questions and makes the task and criteria consistently judge their combined branch text when the line ends in a colon; otherwise the block is ignored. Predicates, bars and labels are unchanged.

A second keyed run again produced 15 caught, two false nudges and four unsure, runner exit 1 and engine exits 5/5. It reported 98 requests, 132,572 input tokens, 6,693 output tokens and $0.005568024. Scenario 001 still lacked a semantic pass: its top probabilities changed from none 0.53 to a condition/none tie at 0.38, below the unchanged 0.6 bar. The report does not establish why the model answered that way. Its branch names “the core's security condition”; the definition of that criterion is outside this chunk. Deciding what such a reference must show is a general standard/evidence question, not a case-specific exception.

The D2 scope update at `070ec74b` requires exact block delivery and both questions checking line plus block, with a real no-condition IF still firing; scenario 001's semantic pass and the named-criterion question move to D3. Scenarios 002 and 019 still fire with matching locators. No further wording guesses were made. Both samples are exposed regression observations, not a holdout or fixed-version comparison.

All rows below are `main-path-k001-case-<number>`; `finding` on a must-pass row is a false nudge. No observed result below is rounded up to a pass.

| Scenario | Expected | First run | Corrected question |
| --- | --- | --- | --- |
| 001 | must_pass | uncertain | uncertain |
| 002 | must_fire | finding, locator hit | finding, locator hit |
| 003 | not_applicable | not_applicable | not_applicable |
| 004 | must_pass | pass | pass |
| 005 | must_pass | uncertain | uncertain |
| 006 | must_pass | not_applicable | uncertain |
| 007 | must_fire | uncertain | uncertain |
| 008 | not_applicable | not_applicable | not_applicable |
| 009 | not_applicable | not_applicable | not_applicable |
| 010 | must_pass | pass | pass |
| 011 | must_pass | pass | pass |
| 012 | must_pass | pass | pass |
| 013 | must_pass | pass | pass |
| 014 | must_pass | finding | finding |
| 015 | must_pass | pass | pass |
| 016 | must_pass | pass | pass |
| 017 | must_pass | pass | pass |
| 018 | must_pass | pass | pass |
| 019 | must_fire | finding, locator hit | finding, locator hit |
| 020 | must_pass | pass | pass |
| 021 | must_pass | finding | finding |

The final run under the corrected fingerprint repeats the same 15/2/4 totals, with scenario 006 again excluded instead of uncertain; every other row above is unchanged. Both positive controls still fire with matching locators. It reported 98 requests, 132,572 input tokens, 6,697 output tokens and $0.005568024, runner exit 1 and engine exits 5/5. All twelve stored fingerprints across the five rulebooks were recomputed and match. The receipts still say `complete: false`; fresh fingerprints do not turn mixed semantic outcomes into admission.
