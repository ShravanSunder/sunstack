# 2026-11-25: Workflow v2 designs by deliverable and plans each one

- `sunstack-workflow-v2` 0.8.0; all three plugin manifests and three marketplace entries agree. The skills read `initiative status`'s project-number order and its "Needs a plan" list, which need Demistify 1.34.1 or later; 1.38.1 is hosted.
- New skill `plan-implementation`: plans one deliverable of a reviewed project. It reads the deliverable's `brief` (and `initiative status` in an initiative), takes its steps from the deliverable record, gives each planned check to exactly one step, and writes the record's step list and a plan page in the project's `plans/` folder in one edit. A re-plan writes a superseding page with "Changed from". Its `references/steps-and-proof.md` is ported from v1's slice-and-proof reference, with "slice" renamed to "step".
- Each step names its write surfaces, the proof it must produce and its pull request boundary; the Implementer chooses the code and tests inside the step.
- Dependencies run only between deliverables and are kept in their records. A real prerequisite in a higher-numbered project returns `blocked` to the owner; agents never renumber projects or move deliverables.
- `design-specification` creates a project inside its initiative's `projects/` folder (`docs/initiatives/<initiative>/`) or a standalone one in `docs/specs/<project>/`. It reads the initiative first, holds a project to its need records until every lower-numbered project's `core` deliverables have plans, and cuts the project into deliverables in build order. The design phases add their own record ids to each `core` deliverable's scope.
- `design-review` refuses a project held to its needs, raises a rule no `core` deliverable scopes, and has its pretend planner read each deliverable's brief.
- `role-lead` creates initiatives from the owner's numbers and words, builds in number order from `initiative status`, names a deliverable before any build commission, and records steps, outcomes and acceptance on the deliverable.
- `sunstack-dev`'s `design-documents.md` lets a project held by its number keep need records (landed separately, before this change).
- "`core` slice" becomes "`core` deliverable" throughout the design skills.
- Behavior has not been evaluated; the trigger trial and the eval are still to run. Codex and Claude caches are not refreshed.
