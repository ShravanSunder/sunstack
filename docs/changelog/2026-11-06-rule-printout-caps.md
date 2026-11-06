# 2026-11-06 Rule phonebook output

- `skill-authoring` 0.10.3 prints a phonebook index: source span, rule, one-line reason and a pointer to an anchored section in the run's `details.md`.
- Answers, decision paths, cut fields, standard locations, loaded-file locations and same-rule locations move to that one details file; unresolved selections retain their probability or failure reason at dedicated anchors. Neither index nor details pastes section or standard bodies.
- Keep 10 warnings and 10 uncertain entries per rule per run, with omitted counts pointing to complete details; all error entries remain indexed. Current-account entries use the same details file and warning cap.
- `report.json` and `accounts.json` retain every record and evidence body; status, usage, totals and exit codes are unchanged. Rule questions, bars and adoption are unchanged.
- Updated renderer/CLI wiring, recorded-report/native CLI tests, three manifests and Claude/Cursor marketplaces; Codex marketplace availability is unchanged.
- Validation: review-correction focused tests pass; final gates follow integration with main. The owner chose one details file per run; draft #196 remains unmerged. Installed caches were not refreshed.
