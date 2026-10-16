# Agent prompt

```text
Use the implemented presentation-html skill now, then review and integrate it into Sunstack.

Repo: https://github.com/ShravanSunder/sunstack
Branch: feat/presentation-html-cloudflare (draft PR #137, stacked on PR #136, skills/preflight-cleanup-domain)
Current integration: the branch head (cd20df72 was the first stack merge); sunstack-dev 2.82.0
Implementation commit: f18980581a009e8f985ce927105e66b564275a4f (skill source changed since by the I1 citations, 78e3e185, and the shared presentation-reference loads, 4f158d59)

Read these branch files first:
- docs/wip/skills-authoring/2026-10-16-presentation-html/implementation-handoff.md, starting with its Current integration section
- plugins/sunstack-dev/skills/presentation-html/SKILL.md
- plugins/sunstack-dev/skills/presentation-html/references/demistify.md

First apply the skill directly from source: read its mandatory delivery reference and matching public component guide. Create a separate standalone HTML engineering explainer using the live Cloudflare assets. Open it in the supported browser, exercise navigation, narrow layout, sidebar/fullscreen, and capture screenshots. Run the matching source checker if available; report its absence honestly. Do not wait for plugin installation to try the skill.

Then review/integrate through skill-authoring:skill-review and the repository's PR/release workflow. The Advisor's integration review returned targeted-revision with I1 (principle citations in SKILL.md) and I2 (current integration in the handoff and this prompt); check that both corrections are on the branch.Accepted S2 and the original implementation review of f1898058 returned great; preserve that evidence and focus fresh review on the two current diffs: the presentation increment `git diff origin/skills/preflight-cleanup-domain...HEAD` and the integration reconciliation `git log --merges origin/skills/preflight-cleanup-domain..HEAD`. No canonical implementation plan exists: use the named-skill request and S2, not a fabricated plan. The handoff's fc86a941 base and version 2.81.0 are historical; recheck all six version homes against the #136 base and current main. Complete applicable checks and report the integration commit/PR and actual installed availability separately.

Keep the skill workflow in Sunstack and the component API in sunstack-tools. Do not deploy infrastructure, discover credentials, rewrite sibling skills, or claim automatic plugin discovery before verifying it. The public asset pin is experimental. Read the handoff for exact proof and limits; no prior chat is required.
```
