# Workflow progress and Map validation

## Scope

- Lead check-ins revisit open asks and advance authorized work within the Lead's role. A refused step or missing dependency holds only work that depends on it; a genuine wait names its dependency and resolver.
- Engineering Maps organize existing explanations by reader concern across documents. Mandatory four-document HTML review checks those connections, including relevant design and proof passages.
- Preserve the single check-in cadence, role and permission boundaries, one-page concerns, optional nesting, stable targets, singular fact ownership, and the existing renderer/schema.

## Validation

- Independent Opus 5.5 medium review inspected the actual runtime diffs, with a separate Sol structure review. Both changes were accepted as source-only local drafts with no remaining source correction.
- `claude plugin validate .`: passed, exit 0. Two pre-existing README installation-advice items remain outside this change.
- Version consistency: all twelve source-manifest and marketplace version fields agree across Codex, Claude and Cursor (`sunstack-dev` 3.3.1; `sunstack-workflow-v2` 0.3.1), retaining main's newer assumptions-and-decisions changes.
- `git diff --check`: passed, exit 0.
- Required `sunstack lint` self-checks could not run: executable unavailable, exit 127. No configured-rule coverage is claimed.
- The Codex quick validator was unavailable because PyYAML is missing. It was not rerun for subsequent reference-only edits with unchanged frontmatter.

## Limits

Source review and structural validation do not establish improved fresh-agent behavior. Repeated-wake behavior, concern-based authoring/review behavior and installed activation remain unverified. No installed cache refresh or live product Map rewrite was performed.

The versions coordinate one proposed changeset; they do not establish publication or release acceptance.

## HTML wording correction

At the owner's direction, generic workflow-generation qualifiers were removed from maintained HTML authoring, maintenance and review guidance. A source scan covers 290 maintained skill/reference Markdown files: no workflow-generation qualifier remains. Four necessary references remain: three Mermaid syntax names and the existing Codex native API-version label, which predates this workflow package. The frozen archive and actual plugin/schema identifiers are unchanged. Thirteen maintained Markdown files receive the HTML wording cleanup; the Codex provider reference is unchanged.

`pnpm --dir tests/skills typecheck` passed (exit 0). The first full test run reported 302 passed and 8 failed: those integration cases received empty native-engine output. A direct probe then returned valid JSON with exit 0, and the four affected files passed unchanged (14/14, exit 0). The initial empty-output cause remains unconfirmed; no test assertion or product code was changed to obtain that result. The complete unchanged suite then passed: 310 tests across 30 files, exit 0.

After test dependencies were installed, the repository-pinned native CLI became available. A scoped skill-rule run then exited 2 because its model credential was unavailable; no credential or model endpoint was overridden. Model-backed rule coverage remains not run, rather than passed. The earlier exit-127 attempts above are retained as their original receipts.

The rulebook's `sunstack lint --check` validation passed (exit 0). That checks definitions only and does not replace model-backed skill checking.
