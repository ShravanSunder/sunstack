## Progressive Disclosure

- Before deciding where content belongs, MUST load `references/doc-roles.md` and return the file or folder it belongs in.
- IF the job is a create, update, cleanup, or discrepancy workflow, load `references/workflows.md` to follow that workflow and return the changes made or proposed.
- Before deleting, archiving, or rewriting stale plans/specs, MUST load `references/staleness-and-purge.md` and return its Proposal Shape filled for each candidate.
- IF adding `docs/changelog` or reference excerpts, load `references/changelog-runbooks.md` and return the changes made and the links updated.
- IF auditing or updating workflow skills against admired upstream sources, load `../../docs/source-inspiration-catalog.md` and return the changes made or proposed.
