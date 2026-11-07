# Held judged rules

Only the three mechanical description checks are active. The `kind` filter and `general-skill.overfits-to-product-workflow` (K002) are held after authorized development run 2 at commit `437632d42610bdbe8365d4938e4098cd660b4f4a`, using Sunstack 0.8.3 and resolved model `typesafe/jev-1.14-20261014`. The Lead retains the saved development report (SHA-256 `6d14751fb156258727ed055c0322bb7c52a7bce15461bb17e9e22c86d8f06e8d`).

## What they lack

- K002: 29 development cases yielded 12 right, 12 unsure, 5 false warnings and no misses. Three false warnings are explicit owner U16 row-7 rulings. Their answers overlap real mistakes: Q1 .83–.93 and Q2 .07–.19. Bar replay could not satisfy the switch-on conditions.
- Kind: 65 development cases yielded 53 right, 6 unsure and 6 wrong labels. Wrong labels were confident (.73–.98); a .9 bar removed wrong labels only by leaving 31 of 65 unsure. This does not meet the switch-on conditions.

The entries, kind fragment, marker identities, questions, reference and bars are retained exactly as evaluated: K002 is in `general-skill.json`, and the filter is in `kind.filter.json`. Neither is declared by the active config. Older held entries keep their original source locations and markers.

Real case files, labels and splits are unchanged. No held-out run was made; held-out evidence remains unseen for a corrected attempt. The old-rulebook quality comparison is deferred. Reproducing the rejected candidate means checking out the source commit above, not adding these trees back to ordinary lint. A future corrected attempt needs its own development evidence and activation decision.

## Rebuilt candidates, not activated

`rebuild-kind.filter.json` and `rebuild-general-skill.json` hold the corrected kind filter and K002 candidate. The evaluated files above remain unchanged. The candidates remove scored examples, distinguish supported public interfaces from application procedures, and keep explicit applicability and incomplete-evidence routes. Their bars are provisional; no new model-quality or receiving-agent result is claimed.

For a candidate run, pair only its K002 record with the retained standard, declare the rebuilt filter, pin `typesafe/jev-1.14-20261014`, and give the `skill` evidence kind `max_chars: 20000` to retain the full declared opening. The default 6000-character view cuts several development openings. A remaining cut or unavailable filter field ends `unsure`; no change to the active config is implied.

Independent pre-run review, development results, assessed bars, the holder's example-separation attestation, frozen held-out results and a same-version baseline comparison are still required. Keep both candidates outside the active config until the switch-on conditions are met.
