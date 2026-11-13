# Workflow progress and Map validation

## Scope

- Lead check-ins revisit open asks and advance authorized work within the Lead's role. A refused step or missing dependency holds only work that depends on it; a genuine wait names its dependency and resolver.
- Engineering Maps organize existing explanations by reader concern across documents. Mandatory four-document HTML review checks those connections, including relevant design and proof passages.
- Preserve the single check-in cadence, role and permission boundaries, one-page concerns, optional nesting, stable targets, singular fact ownership, and the existing renderer/schema.

## Validation

- Independent Opus 5.5 medium review inspected the actual runtime diffs, with a separate Sol structure review. Both changes were accepted as source-only local drafts with no remaining source correction.
- `claude plugin validate .`: passed, exit 0. Two pre-existing README installation-advice items remain outside this change.
- Version consistency: all twelve source-manifest and marketplace version fields agree across Codex, Claude and Cursor (`sunstack-dev` 3.2.3; `sunstack-workflow-v2` 0.2.2).
- `git diff --check`: passed, exit 0.
- Required `sunstack lint` self-checks could not run: executable unavailable, exit 127. No configured-rule coverage is claimed.
- The Codex quick validator was unavailable because PyYAML is missing. It was not rerun for subsequent reference-only edits with unchanged frontmatter.

## Limits

Source review and structural validation do not establish improved fresh-agent behavior. Repeated-wake behavior, concern-based authoring/review behavior and installed activation remain unverified. No installed cache refresh or live product Map rewrite was performed.

The versions coordinate one proposed changeset; they do not establish publication or release acceptance.
