# Prove It Works: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. Find the one closest to your case and apply its move.

## Enter, twice

**What happened.** A search-field change passed its component tests. In the real app, the user had to press Enter twice to submit.

**The move.** Drive the real surface and look where the user would.

**Better.** Open the app, type, and press Enter once. Watch the result appear. Then add the case the component test missed: here, the real app's focus handling consumed the first keypress.

## The share panel at a real size

**What happened.** A share panel passed its component tests. Opened in the real app at a laptop viewport, it overflowed the window, and closing it left keyboard focus on the page body.

**The move.** Observe at the target viewport.

**Better.** Fixing both took minutes; finding them took opening the app. The focus return is now covered by a test, and the layout was checked at two viewports with screenshots.

## The flag the installed binary didn't know

**What happened.** A new command-line flag passed tests that constructed the argument parser directly. The installed binary's entry point never registered it, and running the real command printed "unknown flag".

**The move.** The real path is what the user runs.

**Better.** Run the built or installed command with the new flag as part of the proof, because the parser test skipped the registration step that broke.

## Seven focused passes, one failing suite

**What happened.** A fix passed seven focused tests and several lanes. The full suite still failed four launch-restore tests.

**The move.** Keep the scoped result apart from the whole.

**Better.** Report it as "focused tests pass; the full suite fails four restore tests (listed)". The pull request isn't ready until the whole suite is green, or the remaining failures are explicitly out of scope.

## Tests on the wrong provider

**What happened.** Tests for a feature ran against a default provider profile, while production selected a different one. The tests passed, and production failed.

**The move.** The real path includes the configuration and provider production uses.

**Better.** Make the tests, or one real-path check, run the configured provider path, and record which profile the proof used.

## The transition that left something behind

**What happened.** Pressing Escape restored the right keyboard focus, but a held preview stayed active. A focused test of the focus restore passed.

**The move.** Prove the complete transition at the real boundary.

**Better.** A test at the real window boundary drives the whole Escape transition and asserts both the focus and the preview state. If that run doesn't reproduce the owner's original observation, check it once in the live app; if it does, the run is the proof.

## Saved, across a restart

**What happened.** A reply feature claimed messages were saved. The proof drove 18 real HTTP commands (one root annotation and five replies), restarted the backend, and read everything back from SQLite.

**The move.** A durability claim crosses the restart and compares exact identities.

**Better.** That was the right proof. All six messages came back with the same ids, order, and bodies, and no drafts were left behind. A "saved" response before the restart would have proven nothing about durability.
