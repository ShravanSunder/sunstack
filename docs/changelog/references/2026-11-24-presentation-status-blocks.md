# Evidence: presentation-html status blocks (sunstack-dev 3.7.0)

## What the change rests on

The owner's stated intent: a "Where it stands" callout on a project hub had grown, by appending, from 63 words to about 550, holding a dozen pull requests, four decisions and the work in flight. The owner's accepted answer was a table under a callout cut to the answer, and the owner asked for the skill gap to be tracked. Which skill and session wrote that block is not known, so no causal fix is claimed. A scan of 788 callouts on the owner's pages (median 54 words, 90th percentile 164) found the same status-wall shape on plan, milestone and work-account pages from several sessions.

The accepted design set is `docs/wip/skills-authoring/2026-11-24-presentation-status-block/`. Its design review accepted it to implement at its second revision after fourteen corrections.

## Proof claim

Drafted from the owner's stated intent; behavior not yet evaluated. Four planned eval runs and a control on the prior revision wait for the owner. The 150-word limit is a starting value from the scan, not tuned on rated cases.

## Validation

| Check | Result |
| --- | --- |
| `pnpm --dir tests/skills test` | 33 files; 345 passed, 1 skipped |
| `pnpm --dir tests/skills typecheck` | passes |
| Skill-rules lint (`sunstack lint`, CLI 0.24.0, the repository's skill rulebook) on `SKILL.md`, `work-account-forms.md`, `demistify.md` | status `uncertain`: 0 errors, 0 warnings; one unsure load-call piece on an unchanged step 4 line, read and kept |
| presentation-html rulebook `--check` and `--rules` (CLI 0.21.1) | passes; six mechanical warn rules |
| Long-callout edge tests | count cases at 150 and 151 words, a list, a table, bare text and a title; island cases (`ex-markdown`, `src` island, bare Markdown script) end `uncertain`; no model request |
| Long-callout on seven real revisions of the page that prompted it | the status callout passes at 63, 137 and 22 words and fires at 172, 180, 419 and 554; a one-decision callout fires on all seven, a keep case |
| `claude plugin validate .` | passes, with two advice items about other plugins' READMEs |
| Manifests and marketplace JSON | all parse; six `sunstack-dev` entries at 3.7.0 |
| Codex marketplace listing | not applicable: it reads the installed marketplace, not this branch |

## Known limits

- Reviews ran on Claude Opus only, the author's own model family, by the Lead's instruction; no reviewer of a different lineage took part.
- Engine 0.21.1 counts a callout's title as its words plus one (`title:` is read as a word), and refuses a Markdown prose field on an HTML-element kind, so a callout holding a Markdown island is left `uncertain`. Both are routed to the engine's owner.
- Whether an agent asked to update a status page loads `presentation-html` or `docs-maintain` is unverified; the first planned eval checks it.
