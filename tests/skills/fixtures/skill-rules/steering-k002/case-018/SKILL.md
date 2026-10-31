## Workflow

1. Resolve scope:
   - repo path
   - requested docs
   - whether edits are allowed
   - whether stale-doc purge is in scope

   Completion: each of the four is stated, taken from the request or asked for.

2. Inventory doc roles:
   - `AGENTS.md`
   - `README.md`
   - `docs/architecture`
   - `docs/specs` or `docs/superpowers/specs`
   - `docs/plans` or `docs/superpowers/plans`
   - `docs/wip`
   - `tmp/*-workflows`
   - `docs/changelog`

   Completion: each location above is marked present in this repository, with its path, or absent.

3. Classify the job:
   - create new docs
   - update existing docs
   - clean up/purge stale docs
   - classify workflow artifacts as current, historical, disposable, or promotion candidates
   - reconcile discrepancies
   - add changelog/runbook references

   Completion: each doc the inventory put in scope has its class, with what in that doc selects it (missing, stale, superseded or contradicted), and each class names the docs it covers.

4. Verify source-of-truth:
   - code/config/test reality
   - accepted spec/plan
   - release or PR state
   - user decision

   Completion: each doc claim the change rests on is checked against one of these sources, named with its path or reference, or its driver is unclear and goes to the user as the core rules' brief.

5. Edit narrowly:
   - concise `AGENTS.md`
   - clear `README.md`
   - detailed docs under the appropriate docs folder
   - changelog entries when meta-instructions or workflows change
   - IF the edit rewrites human sentences in a README, architecture doc, runbook, or changelog, load `../../shared-references/humanizer.md` in file mode and return the rewritten prose plus the fences, YAML, commands, and paths left unchanged. Classifying, purging, linking, or promoting without a prose rewrite does not load it. Completion: claims, names, numbers, dates, and quotes match the source, or the missing fact is named instead of invented.
   - IF an edited Markdown file is included by an embedded page (an HTML file whose `data-ex-markdown-source` records name it), load `../../shared-references/diagram-rendering-and-fallbacks.md` and return its freshness-on-edit result: the comparison `identical` or `stale`, and each derived view and dependent row rechecked. Completion: the page is reported current only after an `identical` comparison with every rechecked view and row agreeing; otherwise it is reported stale with what differs.
6. Validate:
   - no broken obvious links
   - no stale source-of-truth claims
   - no embedded page left stale against a Markdown file this change edited
   - no duplicated long detail in `AGENTS.md` and README
   - no unrelated docs churn

   Completion: each check above names what it opened or compared on the changed docs (the links followed, the claims set against their sources, the pages set against their Markdown) and what it found, or that it found nothing.
