# Principle reading

This shared runtime reference owns how a skill reads a `principle-*` skill that its text calls. Consumers: `practices-research`, `practices-manage-agents`, `practices-collaboration`, `practices-show-me-your-work`, `presentation-webui`, `presentation-tui`, `ops-linear-tracking`, `ops-observability-stack`, `ops-security-review`, and the seven role skills: `role-lead`, `role-advisor`, `role-implementer`, `role-verifier`, `role-reviewer`, `role-researcher` and `role-operator`.

Expected inputs: the principle name at the call site, and whether the calling file sits in a skill folder or in `shared-references/`.

Return: the file read, whether its scenario reference was read, and the result the call site names.

## How to read a principle

1. `principle-*` skills are files, not invocable skills. They are hidden from model invocation on purpose, so read the file.
2. From a skill folder, `principle-<name>` is `../principle-<name>/SKILL.md`, a sibling folder in the same plugin. From `shared-references/` it is `../skills/principle-<name>/SKILL.md`.
3. Read the principle in full. Load its `references/example_scenarios.md`, in the principle's own folder, only when the principle's own IF holds.
4. A full read this same agent already made in this session, of an unchanged file, counts. Another agent's read never counts.
5. Use the principle's result in the calling method's next action. Don't recite it to the owner unless it explains an outcome, risk or decision the owner needs.

Complete when the call site's result comes from a full read this agent made in this session of the unchanged file.
