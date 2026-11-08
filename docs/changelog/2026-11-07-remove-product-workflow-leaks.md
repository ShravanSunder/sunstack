# Generic skills drop AgentStudio's own workflow

- sunstack-dev **2.107.1**: `practices-cleanup` no longer names AgentStudio's `clean-artifacts` task (its prose and its allow-list row) or Router's Cargo policy; it keeps the generic route: find the repository's own clean task in its AGENTS.md and task runner, honor its refusal, and never swap it for a blanket delete.
- `ops-observability-stack` drops `references/agentstudio-loop.md` and its load. One app's own debug or beta launch now goes to that app's repository for its launcher, and comes back with the fresh marker and state file for the query loop. Its description names no product: it loads for the shared OTLP stack and for proving a local debug or beta app emits to it (the owner's U16 row 11 ruling).
- Loss check: every instruction the removed loop held is owned by AgentStudio's own repository (its `.mise.toml` tasks, launcher scripts, `verify-agentstudio` debug-launch reference and observability architecture doc) or by the generic skill.
- skill-authoring **0.12.1**: the lessons that cite those lines as worked mistakes (`calls-and-placement.md`, `descriptions-and-invocation.md`, `decision-matrix.md`, `rule-design.md`, `running-rules.md`, `worked-trees.md`, `transfer.md`, `nudge-and-receiver.md`, `state-and-evidence.md`) now pin them to `89dc638e`, before the fix; the description adjudication records the owner's ruling.
- Claude and Cursor marketplace versions moved; Codex marketplace paths unchanged. Phase-composition map regenerated.
- Validation: suite, typecheck, `claude plugin validate .`, sunstack 0.9.0 `lint --check`; behavior and the changed description's trigger trial not yet evaluated.
- Codex/Claude installed-cache refresh: not performed.
