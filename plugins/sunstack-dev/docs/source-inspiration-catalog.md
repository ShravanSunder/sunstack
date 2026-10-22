# Source Inspiration Catalog

Lite maintainer map for `sunstack-dev` design. It is not a runtime skill reference, so do not load it during normal spec, plan, review, or implementation.

## Full admired-source index (canonical)

Detailed per-skill provenance, upstream pins, and date-pinned From/To changelog compare live in the `ai-dev-skills` meta-repo:

`/Users/shravansunder/Documents/dev/open-source/agent-skills/ai-dev-skills/`

| Index | Path in ai-dev-skills | Use for |
|-------|----------------------|---------|
| Local skill → upstream | `docs/my-ai-tools/` | Which admired sources a plugin skill borrows |
| Upstream → local | `docs/repo-index/` | What we care about in each upstream tree |
| Date-pinned history | `docs/repo-index-changelog/` | Cheap compare between two submodule SHAs |
| Maintenance contract | `AGENTS.md` | How to bump submodules and keep indexes in sync |

Maintain both. Keep this file as a short in-plugin reminder; put durable path-level mappings, pin SHAs, and bump notes in `ai-dev-skills`. When they diverge, prefer updating `ai-dev-skills` first, then refresh the lite tables here if the high-level preserve/avoid story changed.

## Source Trees To Preserve (lite)

| Source tree | Preserve | Narrow / avoid |
| --- | --- | --- |
| Pstack / poteto | `show-me-your-work` for decision/action trails, `how` for architecture mental models, `why` for source coverage and confidence calibration, `poteto-mode` for playbook routing, verified iterations, and parent-owned subagents; `create-verification-skill` and `maintain-verification-skill` for a project's own verification skill and its upkeep (`practices-verification-maintenance`); `principle-*` leaves (one judgment each, user-invoked, name the decision a principle changed) | Do not copy Cursor-specific commands, model names, anti-planning stance, blanket autonomy, or style micro-rules |
| Matt Pocock skills | `grill-me`, `grill-with-docs`, domain modeling, codebase design, debugging/TDD, handoff patterns | Do not treat discussion prompts as a substitute for source-backed spec creation |
| Addy Osmani agent skills | lifecycle taxonomy, interview/idea/spec/doubt/source-driven development, ADR/docs and observability ideas | Use as taxonomy and selected source, not a wholesale workflow |
| Dimillian skills | review swarms, bug-hunt swarms, skill audit, batch refactor orchestration | Narrow Apple/UI-specific skills to macOS/iOS workflow contexts |
| Sentry skills | `agents-md`, skill writer/scanner, security review, GitHub Actions security review, PR iteration patterns | Avoid Sentry-domain-specific process unless the local workflow has the same domain |
| Steipete agent scripts | deep review, maintainer orchestration, skill cleanup, source-first debugging | Keep selected mechanics only; the full tree is personal/tool-specific |
| Curated PR/adversarial review materials | material finding bar, false-green and silent-failure review lenses, type/test/comment review lenses | Do not promote broad curated catalogs as general workflow sources |
| Codex curated security skills | threat modeling, security best practices, security ownership map | Route security-heavy work to `audit-security-review`; do not dilute normal review lanes |
| Vendor model prompting guidance: [GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra), [Opus 5.5](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/) | short trigger-only descriptions, a root skill that routes to references only when needed, contextual doc pointers, a stated finish line, keep going unless blocked, pre-authorized fan-out with evidence checks, specific UI avoid-lists, marking what could not be verified, asking for justification rather than reasoning | Do not treat one model's tuning as permanent; re-audit prompts and skills at each model release. Do not copy app-specific tips (fast mode, model picker, flag handling) into skills |
| OpenClaw ACPX / ACP (historical) | source material for typed cross-agent communication, queues and review transport | The active plugin removed its legacy ACPX route in 2.85.0; current native/Router mechanics belong to `practices-manage-agents` and `agent-collaboration` |

Explicitly narrowed sources: `cursor-agent-skills` appears to duplicate Addy's pack for this repo's purposes, so keep Addy as the named source unless provenance matters. Broad curated skill catalogs are low value here except for review and security subsets.

Upstream checkouts for the trees above are submodules under `ai-dev-skills` (for example `cursor-plugins`, `mattpocock-skills`, `obra-superpowers`).

## Work-log lineage

The September 26 source inspection used pstack `show-me-your-work` at `cursor-plugins` revision `ecc249f`. The current local owner is `practices-show-me-your-work`, with board discovery in `practices-collaboration`. The blameless session-improvement route is `practices-retrospective`. Those shipped skills own today's trace, evidence and correction behavior; the historical source pointer does not leave those capabilities deferred. Discover the configured `ai-dev-skills` checkout instead of relying on the former machine-specific Documents path.

## Current Local Mapping (lite)

| Workflow area | Useful sources | Local adaptation |
| --- | --- | --- |
| Discussion requirement capture | Pstack `show-me-your-work`, Matt Pocock discussion/domain modeling, Addy interview/spec/doubt patterns, Steipete owner briefs | Split discussion surfaces by job; capture material interjections and session requirements; avoid one ritual forcing question |
| Spec creation | Pstack `how`, Addy source/spec-driven patterns, Matt Pocock domain modeling | Preserve authorized needs before deriving observable obligations; keep current state separate from proposed behavior |
| Plan creation | Obra `writing-plans`, Pstack proof/boundary principles, Codex subagent guidance | Create DAG-shaped vertical slices with useful proof and subagent suitability |
| Implementation execution | Pstack `poteto-mode`, Obra `subagent-driven-development`, historical packet experiments | Lead-owned governing work, bounded executor assignments, inspected handbacks, integration and fitting proof |
| Review transport | Historical ACPX/ACP and local review-swarm experiments | Current native/agent-router execution and independent history boundaries are owned by `practices-manage-agents`; the receiving reviewer or Lead verifies findings rather than treating transport as acceptance |
| Security review | Codex curated security skills | Route to `audit-security-review`; keep normal review lanes lightweight |
| Engineering principles | Pstack `principle-*` leaves and `poteto-mode` index, the owner's own engineering instructions and corrections | `principle-*` skills named from the owner's own phrases; callable by name, not auto-invoked; leaf shape adapted, no upstream prose copied |

For per-skill borrowed/do-not-copy detail, open the matching file under `ai-dev-skills/docs/my-ai-tools/sunstack-dev/`.

## Maintenance Rules

- Keep this catalog selective and lite.
- Do not copy upstream skill prose into local skills.
- Do not cite source inspiration as proof that local behavior works.
- When a workflow change is implemented, prove that the local adaptation prevents the observed failure.
- Path-level provenance, submodule pins, and bump history: update `ai-dev-skills` (`docs/my-ai-tools/`, `docs/repo-index/`, `docs/repo-index-changelog/`).
