# Independent checking: validation and proof scope

This change preserves the existing four roles and Implementer–Verifier pair. It adds independent evidence/probe authority for review and prevents Lead or Implementer interpretations from silently replacing approved outcomes. It does not collapse product implementation into Lead.

## Source gates

- Permanent real-schema tests retain the baseline positive role/pair cases. Added review-investigation direct/union acceptance was observed failing twice before schema integration; the same targeted run then passed86/86,exit0, including malformed grant and unchanged non-review authority controls.
- Formatting, TypeScript, lint, packaging and final independent review results are recorded after the final source checks below.
- Model-backed skill-rule checks returned invalid/credential_missing,exit2,zero evaluations at the writer self-checks. This is NOT RUN, not a green rule result; no credential/model/endpoint substitution was attempted.
- Codex quick validation cannot run because the host lacks PyYAML; nothing is installed to satisfy that optional validator. Other actual platform checks remain separate.

## Conduct and limits

Current four-role conduct and its independent evidence assessment are pending while the source is being prepared. Earlier combined-topology examples are historical observations, not automatic proof of this change. Any fitting reuse must name unchanged dependencies; changed paired ownership needs current-source evidence.

Source/schema checks establish structure and their stated parser behavior. Named agent observations, actual host permissions and installed activation establish different claims. No general reliability, historical incident repair, default-route activation, release or merge is claimed. The base callbacks still select frozen v1. No installed cache or home configuration is changed.
