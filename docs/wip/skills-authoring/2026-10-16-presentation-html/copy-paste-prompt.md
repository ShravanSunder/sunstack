# Agent prompt

```text
Use the implemented presentation-html skill now, then review and integrate it into Sunstack.

Repo: https://github.com/ShravanSunder/sunstack
Branch: feat/presentation-html-cloudflare
Implementation commit: f18980581a009e8f985ce927105e66b564275a4f

Read these branch files first:
- docs/wip/skills-authoring/2026-10-16-presentation-html/implementation-handoff.md
- plugins/sunstack-dev/skills/presentation-html/SKILL.md
- plugins/sunstack-dev/skills/presentation-html/references/demistify.md

First apply the skill directly from source: read its mandatory delivery reference and matching public component guide. Create a separate standalone HTML engineering explainer using the live Cloudflare assets. Open it in the supported browser, exercise navigation, narrow layout, sidebar/fullscreen, and capture screenshots. Run the matching source checker if available; report its absence honestly. Do not wait for plugin installation to try the skill.

Then review/integrate through skill-authoring:skill-review and the repository's PR/release workflow. Accepted S2 and independent implementation review already returned great; preserve that evidence and focus fresh review on current changes/integration. No canonical implementation plan exists: use the named-skill request and S2, not a fabricated plan. Recheck all six version homes against current main. Complete applicable checks and report the integration commit/PR and actual installed availability separately.

Keep the skill workflow in Sunstack and the component API in sunstack-tools. Do not deploy infrastructure, discover credentials, rewrite sibling skills, or claim automatic plugin discovery before verifying it. The public asset pin is experimental. Read the handoff for exact proof and limits; no prior chat is required.
```
