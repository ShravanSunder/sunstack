# Desk-Check State

This reference owns preparing the state a rule, filter or selection will receive for one case, without sending a model request, so the case can be read against the questions before any paid run. Expected input: the case (its file or folder, its exact lines and its revision), the rule, filter or selection, and today's config, rules files and evidence project. Return: the reconstructed state for the case, the overlay and commands that built it, every cut, and the named equivalence gap; or the gap that stopped it.

## What 0.8.3 can and can't do

- No command builds a rule's, filter's or selection's request state without sending the request. A no-send request preparation is planned in the engine and not shipped; don't describe it as available.
- `--check` and `--rules` send nothing; they print each rule's standard as the judge will see it.
- `--evidence` sends nothing only when the kind printed, and every kind it lies `within`, has no `select`. A selected kind's print runs its selection.
- `lint show` reads a saved report and sends nothing.

So on 0.8.3 every desk-check state is a reconstruction. It is built the way the engine builds the state, from pieces the engine printed, and its equivalence to the bytes the engine would send is never shown: name that gap on every desk check. The reconstruction reads the same evidence the engine collects, the same bounded view and cuts, today's standard and reference, and the fields today's questions name; what it can't show is the encoding, the locator question added to a rule's request, and how a selection's requests are split.

## The recipe

1. **Build the case-run overlay,** as `lint cases` builds it: in a scratch directory outside the checkout, extract the repository at the case's revision (`git archive <revision> | tar -x -C <dir>`) and run `git init` there; copy today's config and every rulebook file it reads (each paired Markdown standard and its rules file) over their paths; then replace each evidence-rule directory today's ast-grep project declares with today's contents, whole (`crates/sunstack-lint/src/case_runs/snapshots.rs` at `v0.8.3`). The case's text and every file it loads are as they were; the instrument is today's.
2. **Make a selected kind mechanical, in the overlay only.** For a selection's candidates, or a rule on a kind that lies `within` a selected kind, remove `select` from that kind in the overlay's copy of the config. Every candidate then becomes a piece with the same fields. Never edit the committed config to do this.
3. **Print, and confirm nothing was sent:** `sunstack lint --config <overlay config> --all --evidence <kind> <the case's path>`. The print's usage shows no requests; if it shows any, stop: a kind you didn't make mechanical still selects.
4. **Find the case's piece:** the one whose first and last lines are the case's own. None, or several, is the same `no_matching_piece` or `more_than_one_matching_piece` the case run would list.
5. **Assemble the state the engine would assemble:**
   - **a rule:** `standard`, the marked sentence as `--rules` prints it; `reference`, the entry's, unchanged; `where`, only when a question names it; from the piece's `model_view`, only the fields the questions name; `cut-fields`, the model view's `cut` list; `unavailable-fields`, each named field the print shows unavailable, with why. A `model_view` of `too_large` means the request would end incomplete;
   - **a filter:** the fields its `reads` declare for the folder, and `reference`; never the folder's location;
   - **a selection:** each candidate's own bounded view, the fields in `shared` once, and its one question; no `reference` and no target field.
6. **Record it** with the overlay's revision and today's config, rules and evidence-project identity (their commit), the command, every cut, and the gap: "reconstructed; equivalence to the sent state not shown on 0.8.3".

## A saved request

A request from an earlier saved report (`lint show`) is the state that was sent then. It stands in for today's state only when every one of these still matches: the case's revision; the kind's evidence definitions and budgets (its rule, fields, `max_chars` and the config's limits); the standard's wording; the reference; and the questions and the fields they name. One changed input makes it history, not state: rebuild it with the recipe.

## Good and bad

- Good: a corrected product-workflow question is desk-checked on its owner-ruled cases from an overlay at each case's revision, with today's section kind and caps, the state assembled from each piece's model view, and the gap named.
- Bad: a checkout of the case's revision, printed with that revision's own config. When the kind's collector or cap changed since, the desk check reads an older instrument's fields than the case run will send.
- Bad: a request saved before the reference was rewritten, read as today's state.
- Bad: a selected kind printed "just to see" its pieces, which runs the selection before its desk check and review.

Complete when: each case has its reconstructed state, built on the overlay with nothing sent, every cut named and the equivalence gap recorded; or the case's gap is named (no matching piece, a field the kind can't collect, a print that would send requests).
