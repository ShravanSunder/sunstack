# Scenario/adoption cutover: proof and limits

The owner’s A6 direction replaces the original sibling scenario/run files with eval-owned definitions, ignored run output and explicit owner adoption. It changes where proof lives and how admission is recorded; it adds no engine feature and adopts no actual judged rule.

## Storage and ownership

- Runtime skill `rules/` holds only config, `*.rules.json` and `evidence/`. There is no compatibility reader for old sibling files or committed run records.
- Active definitions use `tests/skills/evals/rule-scenarios/<rulebook>/<rule-name>.scenario.json`; dropped-rule history uses `retired/<rulebook>.scenario.json`. A separate `adopted.json` is empty in this change.
- Run reports and raw engine artifacts live under Git-ignored `tests/skills/tmp/scenario-runs/<UTC>/`. Sunstack 0.6.0 exposes no provider wire capture; the retained raw artifacts are engine JSON (including evidence seen and answers), stderr, selected rules and config. HTTP envelopes are unavailable; no recording proxy was added.
- Adoption records the explicit owner action, date, passing counts, current conservative fingerprint and report pointer. A report pointer may be absent on another machine; ordinary lint reads only the adoption and current source, never the local report. Missing adoption or a changed fingerprint holds the rule; floors, bar provenance and independent held-back requirements still apply.

## Permanent proof

The storage contract first failed on the old sibling files. The migration then compares all 245 scenario identities against independent `1bdec8db` Git blobs, preserving source/context, selectors, expected behavior, exact note/who provenance and status; it checks 180 active and 65 retired scenarios, all rule records, renamed bar-source fields and per-rule paths. The older 245-expectation and 173-coordinate checks remain independent historical oracles.

The real scenario CLI, installed 0.6.0 engine and controlled local provider produce a complete report over pinned real skill bytes. Running scenarios leaves adoption empty; explicit adoption records its fingerprint; the ordinary CLI then nudges in both main output and current accounts. Restored question, standard, bar, scenario, AST, config and missing-adoption mutations each hold the rule and suppress both outputs while retaining the raw finding. A prior report cannot adopt a changed definition.

Actual controlled unsure, malformed-provider and failing scenario runs are refused by the adoption CLI. A partial run produces an incomplete report and cannot adopt. Rejection probes also cover omitted/duplicate populations, stale fingerprints, an unknown adoption rule and a retired rule that is never sent to the engine; disputed/unknown labels still earn no floor in state tests. These records and replies test admission mechanics, not semantic quality or permission to adopt a real rule. No real `adopted.json` entry is written.

Keyless tests, typecheck, lint, rule assembly and scenario validation are the fitting local gates. The new scenario command’s real keyed observation is recorded separately; running it is not a successful-adoption or accuracy claim. Receiving-agent behavior, fresh independent labels/floors/tuning and real kind gating remain outside A6. No installed-cache, CI, release or merge proof is inferred.

The final local suite passes 41 test files and 300 tests, with one explicitly gated live-provider test skipped; typecheck, changed-file oxlint, 12-rule assembly, 245-scenario validation and plugin packaging validation pass. The keyless suite's explicit adoption occurs only in disposable test repositories. A post-implementation sensitivity run bypassed the incomplete-report refusal and was caught by an adoption CLI assertion; restoring the guard returned the integration test to passing. This is sensitivity evidence, not a pre-fix defect claim. The runtime-folder inventory and ignored-run directory checks pass; no generated scenario report is tracked.

## Keyed new-command observation

The Lead ran `evals:scenarios skill-branch.names-an-observable-condition` through the existing credential wrapper. All 21 scenarios ran; the ignored report is incomplete, exit 1: 15 caught, two false nudges (014/021), four unsure (001/005/006/007). Both prior fire controls, 002 and 019, fire with matching locators. The two raw engine runs exit 5/5 and report 98 requests, 132,572 input tokens, 6,697 output tokens and $0.005568024. Requested model is `jev-latest`; resolved version remains unavailable.

The saved rule fingerprint recomputes equal to current canonical inputs. Report/raw artifacts exist only in ignored run storage; the skill’s runtime folder and tracked adoption file are untouched by the run. `adopted.json` remains `{}`. This is the expected mixed regression result, not semantic acceptance or a reason to adopt the rule. The named-criterion/semantic question remains D3 work under the prior explicit scope update.
