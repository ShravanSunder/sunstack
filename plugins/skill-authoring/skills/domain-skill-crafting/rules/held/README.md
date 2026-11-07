# Kind filter and held judged rules

The active config declares the frozen `kind` filter and only three mechanical description rules. The filter gates nothing yet, so ordinary lint adds no filter requests or judged warnings. `general-skill.overfits-to-product-workflow` (K002) remains held.

The original rejected kind filter and K002 from development run 2 remain archived exactly at commit `437632d42610bdbe8365d4938e4098cd660b4f4a`, using Sunstack 0.8.3 and resolved model `typesafe/jev-1.14-20261014`. The Lead retains the saved development report (SHA-256 `6d14751fb156258727ed055c0322bb7c52a7bce15461bb17e9e22c86d8f06e8d`).

## Rejected run 2 evidence

- K002: 29 development cases yielded 12 right, 12 unsure, 5 false warnings and no misses. Three false warnings are explicit owner U16 row-7 rulings. Their answers overlap real mistakes: Q1 .83–.93 and Q2 .07–.19. Bar replay could not satisfy the switch-on conditions.
- Kind: 65 development cases yielded 53 right, 6 unsure and 6 wrong labels. Wrong labels were confident (.73–.98); a .9 bar removed wrong labels only by leaving 31 of 65 unsure. This does not meet the switch-on conditions.

The entries, kind fragment, marker identities, questions, reference and bars are retained exactly as evaluated: K002 is in `general-skill.json`, and the filter is in `kind.filter.json`. Neither is declared by the active config. Older held entries keep their original source locations and markers.

Case entries, labels and splits remain unchanged; the frozen kind cutoffs record their development provenance in the case file's bars. Run 2 had no held-out run. The old-rulebook quality comparison is deferred. Reproducing the rejected candidate means checking out the source commit above, not adding these trees back to ordinary lint.

## Frozen kind filter active; K002 held

`rebuild-kind.filter.json` retains the frozen filter now copied into the active config. `rebuild-general-skill.json` retains the failed K002 candidate outside the active rulebook. The evaluated originals above remain unchanged. The rebuilt instruments remove scored examples, distinguish supported public interfaces from application procedures, and keep explicit applicability and incomplete-evidence routes.

The active config pins `typesafe/jev-1.14-20261014` and gives the `skill` evidence kind `max_chars: 20000`, matching the developed and tested profile. The default 6000-character view cut several development openings. A remaining cut or unavailable filter field ends `unsure`. No asking rule is active, including K002.

Development run 3 evaluated commit `73b5ff02` on Sunstack 0.9.0; every request resolved to `typesafe/jev-1.14-20261014`. At the starting cutoffs, kind returned 55 right, 4 wrong labels and 6 unsure across 65 cases. Replaying the same answers with both Choice cutoffs at `.85` gives 45 right, no wrong labels and 20 unsure. Both bars record all 65 development filter cases as their source. Unsure folders are skipped and listed; this is abstention, not a correct label for all 65 cases.

The frozen `.85` filter at commit `280321ac` returned 13 right, 2 unsure and no wrong labels on 15 held-out kind cases. That meets the adopted no-wrong-kind switch-on condition; the two abstentions remain visible. The filter is active and gates no rule yet. Its held-out result is separate from K002, whose held-out cases were never run.

K002 returned 7 right, 19 unsure, 2 misses and 1 false warning across 29 cases. Its product-material readings overlap the required outcomes: warning cases read `.24` and `.20`, while a quiet case reads `.71`. It lacks a question the model reads reliably for application-private material versus supported public-tool use. The diagnosed correction failed development; K002 stays held without rewording, with its questions, reference and bars unchanged. Its held-out cases remain unused.

K002 stays outside the active config with no passing development result. Its failed correction is retained as evidence. The same-version old-rulebook quality comparison remains deferred, and receiving-agent behavior remains unproven for both instruments.
