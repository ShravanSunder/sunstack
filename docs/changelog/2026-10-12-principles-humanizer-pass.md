# 2026-10-12 principles: humanizer pass

`shravan-dev-workflow` 2.74.0 → 2.74.1.

- All 17 `principle-*` cards and their `references/example_scenarios.md` were checked against `shared-references/humanizer.md`: the pattern-12 word list, dashes, contrast patterns, filler intensifiers, and stacked negatives.
- Cut 22 filler uses of "actually" and seven of "quietly". The two that remain are the owner's own wording. Also cut filler "really", "genuinely", "simply", and "just" where deleting the word changed nothing. Two lines were matched back to the owner's wording ("show it rather than ask it"; "a stale assumption is a hidden guess").
- Rewrote a stacked double negative in `principle-prove-it-works`, a not-just-X construction in `principle-write-for-the-reader`, and a passive measurement clause in `principle-experiment-before-proposing`. Cut one restating sentence in `principle-separate-the-concerns`.
- Kept every contrast whose negative half corrects a belief the reader would hold (82 ", not" contrasts reviewed one by one; 2 changed).
- Validation: `claude plugin validate .` passed. A scripted humanizer scan now finds no dashes and no list words except deliberate ones (the owner's "quietly", "robust" quoted as the bad adjective, and "highlighting" as a feature name). Behavior not evaluated (D19, D21).
