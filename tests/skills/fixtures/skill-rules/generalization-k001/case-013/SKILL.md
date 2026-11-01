---
name: service-storage
description: "Use when adding storage to a TypeScript service."
---

# Service storage

Choose storage before writing the first query.

## Persistence

- Persist every TypeScript service with SQLite through Drizzle, with checked-in migrations.
- Keep each migration reversible, and test the rollback before the release.
