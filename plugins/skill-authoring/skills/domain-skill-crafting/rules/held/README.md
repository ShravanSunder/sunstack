# Held judged rules

Only the three mechanical description checks are active. The `kind` filter and `general-skill.overfits-to-product-workflow` (K002) are held after authorized development run 2 at commit `437632d42610bdbe8365d4938e4098cd660b4f4a`, using Sunstack 0.8.3 and resolved model `typesafe/jev-1.14-20261014`. The Lead retains the saved development report (SHA-256 `6d14751fb156258727ed055c0322bb7c52a7bce15461bb17e9e22c86d8f06e8d`).

## What they lack

- K002: 29 development cases yielded 12 right, 12 unsure, 5 false warnings and no misses. Three false warnings are explicit owner U16 row-7 rulings. Their answers overlap real mistakes: Q1 .83–.93 and Q2 .07–.19. Bar replay could not satisfy the switch-on conditions.
- Kind: 65 development cases yielded 53 right, 6 unsure and 6 wrong labels. Wrong labels were confident (.73–.98); a .9 bar removed wrong labels only by leaving 31 of 65 unsure. This does not meet the switch-on conditions.

The entries, kind fragment, marker identities, questions, reference and bars are retained exactly as evaluated: K002 is in `general-skill.json`, and the filter is in `kind.filter.json`. Neither is declared by the active config. Older held entries keep their original source locations and markers.

Real case files, labels and splits are unchanged. No held-out run was made; held-out evidence remains unseen for a corrected attempt. The old-rulebook quality comparison is deferred. Reproducing the rejected candidate means checking out the source commit above, not adding these trees back to ordinary lint. A future corrected attempt needs its own development evidence and activation decision.


## R02 pre-run candidate

`call-completeness.rules.json` rebuilds call completeness as separate operative-call, moment, destination, work and result questions, with explicit uncertain routes. It is not paired by the active config. The original one-Choice entry in `../calls-and-placement.rules.json` remains unchanged.

The mechanical load kind now retains the complete matched paragraph and enclosing caller instructions. This preserves wrapped calls and explicit shared returns; two real-source integration regressions passed after failing on the old collection. Active description-rule outputs are unchanged. The 50,000-character load view leaves 23 current pieces uncertain at completeness guards, with 408 requests prepared and no provider call.

The separate development case file has 21 real source cases, including the ten legacy cases, quiet shared-return/quoted/metadata cases and an actual before/after watcher fix. Its 21 request subjects prepare without gaps; the case command's exit 1 retains unrelated historical description-length findings. Independent review, development outcomes, bar assessment, held-out proof and receiving-agent observation are still required. A clean desk check is not model-quality proof.

R02 development run 1 returned 16 right, 3 unsure and 2 incomplete provider responses, with no false warning or miss. A first-failure walk stopped on unknown work before reading known missing results. The corrected policy is an OR over known missing elements: an unknown on another element cannot hide a known gap; pass requires all four known present. `result_named` uses a development no-cutoff of `.2`, between warning readings up to `.13` and the nearest quiet reading `.26`; both result-reading step records cite the 21 development ids. Questions, reference, evidence and other cutoffs are unchanged.

Saved-answer replay under that policy gives 18 right, 1 unsure and 2 incomplete, with all four warning cases firing and no false warning or miss. The wrapped quiet case remains unsure and the two provider errors remain incomplete. Replay is not a new model run; independent correction review, complete development/held-out results and receiving-agent proof remain required before activation.
