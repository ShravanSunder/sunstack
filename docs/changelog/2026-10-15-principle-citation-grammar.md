# 2026-10-15 Principle citation grammar

`skill-authoring` 0.1.1 → 0.2.0, authored source only.

- `skill-creation`: a third call form, the citation, joins load and dispatch. A skill cites a judgment card (a skill hidden from model invocation in the same plugin, such as sunstack-dev's `principle-*` cards) at the decision it informs: one plain sentence names an observable moment and the action, then a relative link to the card. The card's first body line is its read rule, so the caller writes no loader line. Cards are only cited, never loaded; a bare name or an action that restates the link text leaves the citation incomplete; cite only where the card's judgment changes the action; a citation never replaces a load call for the skill's own depth; one citation per card per decision, across the skills named or loaded at that step. `reference-design.md` and `glossary.md` agree.
- `skill-review`: `placement-and-calls` accepts a citation as a call site and checks its moment, action, link, the card's read rule, relevance, and duplicates; flags a card loaded instead of cited; routes a citation that changes no decision to `no-op-pruning`. `spec-review.md` blocks a vague or incomplete citation.
- Manifests: Codex, Claude and Cursor plugin manifests; Claude and Cursor marketplace entries (the Codex marketplace entry carries no version). Names, descriptions and invocation policy are unchanged.
- Spec: `docs/wip/skills-authoring/2026-10-15-principle-citation/spec.md`, accepted after independent spec review. sunstack-dev's principle callers still use load calls until their conversion runs.
- Validation: `claude plugin validate .` passed; `pnpm --dir tests/skills run test` 149/149; `pnpm --dir tests/skills run typecheck` exit 0; no live link added and every path named in the new text resolves; grammar text agrees across the five changed skill files; `git diff --check` clean. Codex `quick_validate.py`: not run, not available in this container.
- Behavior proof: not run; drafted from owner intent, behavior unverified. Runtime proof (B5) is owned by the sunstack-dev conversion.
- Codex, Claude and Cursor cache refresh: not run.
