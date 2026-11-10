# Workflow v2 design-skill source copy

- `sunstack-workflow-v2`: copy four design skill trees into normal `skills/` paths as design-specification, design-program, design-verification and design-review.
- Reference existing `sunstack-dev` shared files in place; remove the unrequested duplicate shared-reference directory and staging layout.
- Keep the proof-command procedure with its sole v2 consumer, design-review.
- Management, models, roles and schemas are a separate PR stacked above this source-copy layer.
- Design-content changes remain assigned separately; this copy does not select their new reading form.
- Validation: source dependency checks and unchanged base/frozen-v1 comparison; no runtime or effectiveness claim.
- No versioned runtime or marketplace entry; installation and installed-cache refresh not performed.
