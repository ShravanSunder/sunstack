# Check: Patterns and Capability

This check owns whether the model's pattern and capability claims carry their evidence, and whether a model that composes several assessments passes the pattern-fit checklist. Its standards are `domain-decision-models`' Patterns and evidence section and its caller-workflows and pattern-evidence references.

**Inputs:** the patterns and published results the model cites; its execution profile; for a caller workflow, its loops, menus, state and stop records.

**Return:** a check record, in the schema's shape.

**Complete when:** every cited pattern and capability was read against the items below, and every composed model was walked through the whole checklist.

## Evidence and capability

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| evidence label | a pattern or result is cited without its label: primary implemented, historical observation, our synthesis, or untested extension | "TypeSafe recommends twelve patterns" | label it, using the corrected summary |
| capability profile | a provider-only capability is claimed for a client that lacks it | Box image questions planned on a text-only driver | use what the driver implements, or name the capability gap |
| historical numbers kept historical | a reported metric is used as a current benchmark | a cookbook's 70% on a 60-filing 1.12 sample cited as expected accuracy | cite it as an observation, with its sample and version |

## Caller workflows

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| bounded loop | a loop has no call or iteration bound | "keep narrowing until the model agrees" | add a bound and a recorded stop reason |
| cap exits recorded | a stop at the cap is reported as exhaustive | "all items extracted" after hitting a six-request cap | record "cap reached" |
| shortlist denominator | candidates dropped before verification aren't measured | a top-3 recheck reporting accuracy over the three | measure candidates lost at the shortlist |
| memory evidence not circular | a model's inference is admitted as a source fact, then fed back | a guessed preference saved and later cited as the customer's | admit only source-stated facts |
| native steps supported | the model asks a static graph to build menus, loop or hold state | a rule entry expected to retry with a new menu | move that work to caller code |

## The pattern-fit checklist

Walk every model that composes several assessments through each item:

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| claimed operator and execution profile | the operator isn't one the profile supports | top-K inside a rule graph | move it to the profile that supports it |
| state sufficiency | a composed decision reads assessments over state that lacks its decisive content | a cascade verifying fields against a truncated source | supply the decisive content, or name the gap |
| true alternatives versus coexisting properties | coexisting properties are forced into one exclusive choice | overlapping hazards forced into a single category | ask each property as its own Noul |
| mandatory and veto versus compensatory | an obligation or veto is weighted | a severe hazard averaged into an overall score | route it before the weighting |
| fit versus coarsening | a coarser label is treated as a verified fit | a parent division called verified | call it coarser, or verify it separately |
| bounded caller state and loops | caller state or a loop has no bound or stop reason | an unbounded extraction loop | add the bound and record the stop |
| typed records and selection coverage | the record can't show which pieces were selected and which assessed | replay claimed over pieces an old gate never asked | keep coverage in the record, or run fresh |
| labels, version and comparator | the claim lacks labels, a version group or its comparator | a pattern's gain claimed across model versions | label it, and compare within one version group |

Each failing item becomes a finding with its anchor, the standard it breaks, and its smallest correction.
