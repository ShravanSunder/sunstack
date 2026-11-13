# Held design-item authority evidence

This mechanical component checks authority, conditional source and direct-quote presence on marked native asides. Its source subject is the opening tag, so nested items cannot lend metadata to a parent. It reports missing source and quote together. `unknown` remains a visible nudge; no new block is introduced.

Only literal unencoded metadata/text is supported; other forms remain uncertain or explicitly unchecked. Pass means structural fields only. It does not establish exact quotation, owner authorship/acceptance, semantic support, complete marking, identifiers or dependencies. Exact contiguous quote/file checking needs generic decoded-text extraction and a substring predicate; existing whole-token `contains_field` is insufficient.

Use design-items.config.json explicitly with released CLI0.16.0. No active rulebook loads it. There are no model questions, selection or filters. Independent review precedes its first native run. Current real source cases are positive examples; absent-field paths have no supplied negative runtime case and remain unproven.
