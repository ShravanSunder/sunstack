# presentation-html nudges: decision-model versions in development; table nudge stops prescribing

Date: 2026-11-14. Version: sunstack-dev 3.3.6.

The long-table nudge (M004/M005) no longer tells the author to "split it or show it as a picture". It reports the row count and asks whether the table is optional detail that belongs one action away or content the reader needs in view, keeping a carried table's form. Which tables warn is unchanged.

`presentation-html/rules/development/` adds held Jev decision-model versions of M001 to M005 in their own config, so they warn nobody until proven: M001 asks whether a choice is an owner design decision and whether a preceding picture draws the current model; M002/M003 whether a section's prose explains a relationship that needs a view and whether its views show it; M004 whether a main-path table is long optional detail, and whether a table in a closed disclosure hides failure cases. Their state carries the actual picture source, the section's own prose and views, and a table's lead-in, heading and disclosure. New evidence rules sit in `evidence/rules/section-views.yml`. M005 waits for cross-language `enclosing` in the engine. Bars are provisional.

Proven: the development config checks with five asking rules; every owner-labelled development case (POC 4's 30 choice rulings and the rev.3/rev.4 Part 4 fix, 42 cases) prepares on sunstack 0.21.1 without sending, and reads to its label on the desk check. The active nudges' tests pass with the new message.

The nudges pin `@sunstack/cli@0.22.1`; M001 reads pictures from its governing h1/h2 section (`levels`), counting only those in the decision's own part.

Not proven: any model answer. Development and held-out runs, independent labels for the other candidates, and a pre-run review come first; the active rules stay the baseline.

Validation: `pnpm --dir tests/skills test` with the private picture inputs 33 files / 323 passed, exit 0 (one earlier full run hit the known shared-CLI flake in 4 unrelated skill-authoring tests); `tsc --noEmit`, oxfmt and oxlint clean; `claude plugin validate .` passed; both configs `--check` exit 0. Installed caches have not been refreshed.
