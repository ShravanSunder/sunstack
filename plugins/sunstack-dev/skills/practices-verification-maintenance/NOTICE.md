# Notice

Parts of this skill are adapted from Pstack by Lauren Tan, under the MIT License below. The owner of this plugin gave permission to copy and adapt that material.

Source: `cursor/plugins` at commit `ecc249f1e306fc64ddf83c7bed16cacf7c2239db`, files `pstack/skills/create-verification-skill/SKILL.md`, `pstack/skills/create-verification-skill/references/feature-map-example/` and `pstack/skills/maintain-verification-skill/SKILL.md`.

Adapted parts:

- `SKILL.md`: the verification skill as a recipe read cold by an agent that has never seen the app; a recipe that never ran is a draft; cleanup that keeps the evidence; edits limited to the verification skill's own files; no commit or PR when nothing changed.
- `references/project-capability-generation.md`: the repository interview (surface, run, drive, observe, isolate); the launch, health check, drive, evidence, cleanup and helper rules; one run from launch to cleanup with the evidence checked afterward.
- `references/project-capability-maintenance.md`: index upkeep, the source pass for each feature, reconciliation and the sweep of recent changes, the live-pass rules, one retry after correcting drift, reporting an unreachable feature with its prerequisite, triage into skill drift, driver gap and product regression, the `clean`, `changed` and `blocked` outcomes, and run notes kept out of the skill.
- `references/project-skill-layout.md`: a project-local `verify-<app>` skill with registering frontmatter, and journey files written from the user's side, drawn from the feature-map example.

Local changes: the canonical home is `.agents/skills/verify-<app>/` with a relative `.claude/skills/` link in place of `.cursor/skills/`; the skill is a model-invocable practice run under the caller's grant; expected results come from adopted sources; it composes `practices-how` and `practices-verification`. It drops the read-only subagent for each feature, the required live pass over the whole map, the fixed feature-map headings and feature count, repairing the product build, and the authority to open a PR.

---

MIT License

Copyright (c) 2026 Lauren Tan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
