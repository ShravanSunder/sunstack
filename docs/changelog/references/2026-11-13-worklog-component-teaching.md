# Work-log decisions and assumptions: validation and limits

Release: `sunstack-dev` 3.3.2. Design: `docs/wip/skills-authoring/2026-11-13-worklog-component-teaching/` (revision 1, correction 1, accepted to implement by independent design review).

## Changed surfaces

- `presentation-show-worklog/SKILL.md`: the evidence return includes material decisions and relied-on assumptions; heading 3 separates who chose from the authority that covered the choice; a main-account paragraph requires choice, actor, reason and material cost, authority or gap, and dependent work; the final reader check names them.
- `presentation-show-worklog/references/read-and-summarize.md`: the reconciliation rule no longer limits agent attribution to non-core calls; the interval check covers decisions and assumptions no summary mentions and names a coverage gap; the retry example adds one agent choice and one unproved dependency.
- `presentation-html/references/patterns.md`: one worked work account assigning each form a job and showing when to omit progress, comparison or sequence views. Component markup stays with the matching guide through the existing binding route.
- Version metadata in the plugin's three client manifests, three marketplace entries and README.

## Validation

- `sunstack lint` (0.9.0, skill-rules config) on the three changed skill files: clean, 8 of 8 applicable results passed; `patterns.md` contains no piece any active rule judges.
- `pnpm --dir tests/skills test`: 30 files, 310 tests passed.
- `claude plugin validate .`: passed; its two warnings concern other plugins' README install lines.
- Manifest and marketplace JSON parse; `git diff --check` clean.

## Application runs

Fresh Sol authors received the same ordinary page requests and illustrative records: two on the prior skills, one on the first-instruction-only revision, and two on the combined revision at each of its first three wording versions. The third version also served one explicit request for a native progress and status table, and the final wording, which narrows when an aggregate percentage overclaims, served one request for overall and per-suite check progress. Each run's loaded instruction copy and guide reads were taken from its host record, and every final page passed the matching Demistify static check. On the catalogue case the prior skills already explained the supplied decisions, costs and open assumption, so no added value was shown there. The revised runs additionally named missing rationale or cost evidence the record did not supply; their diagrams differed from the controls in density, not in the relationships shown. Some required guide and reference reads were truncated without full recovery, so full-read compliance is not established. On the explicit table request, the page used the documented live progress and status components in a native table, kept each count to its own subject and invented no values; on the final wording, the check-progress page summed two differently sized suites of the same unit into one overall count without averaging their percentages. These are named examples from single runs, not a reliability claim.

## Correction after implementation review

An independent implementation review found three source issues. The reconciliation rule now keeps authority as the logging skill records it, including an agent's own call for a reversible choice inside existing authority, while an uncovered commitment about stored data, ownership, a public contract, new technology or scope stays an open assumption. The worked handover example now states its illustrative requirement, a provider rehearsal before handover, and answers from that requirement. This entry's call-site wording is corrected. These corrections were checked by source-review counterexamples, not new author runs; the application runs above used the earlier wording.

## Not verified

Rendered readability and interaction in a browser; the official quick validator (its YAML dependency is not installed); Codex marketplace listing of this checkout; installed-cache activation. Installed caches are not refreshed.
