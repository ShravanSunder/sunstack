# 2026-11-27: The decision brief explains one-way and two-way doors

- `sunstack-dev` 3.9.2; all plugin manifests and the three marketplaces agree.
- `owner-decision-brief.md` used "two-way door" and "one-way door" without saying what they are. It now says what each is, with examples, and ties the picture to the action: a two-way door can be walked back (undone cheaply, nothing else breaks), so the agent walks through it, records it and keeps going; a one-way door can't (data, other work or people depend on it), so the agent stops at it and sends it up the chain. The authority check still comes first.
- `owner-decision-routing-contract.test.ts` asserts the explanation.
- Basis: owner review of #242, 27 Nov ("you need to explain what a one-way and two-way door is, then chain that latent word with what I want"). `pnpm --dir tests/skills test`: 349 passed / 2 skipped, exit 0, twice. Codex and Claude caches are refreshed after merge.
