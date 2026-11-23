# Bind the matching Demistify guide, check and return

This reference owns the page's library binding, its delivery contract, the check after the last edit and the return. Inputs: supplied content/privacy constraints, any existing binding, source carriers, the chosen components and intended opening method. Return at binding: trusted library base, matching guide, the guide references the chosen components need, required source/asset companions and the matching checker. Return at the end: the artifact link, the design check or preparation result, the static check result and the nudges' result. Demistify's guide owns current component syntax and CLI procedures; this reference does not copy them.

## Choose one matching binding

Keep an existing page's binding unless the requested change deliberately migrates it. A new ordinary page uses `https://demistify.getagentstudio.dev/v1/`; its guide is `authoring/SKILL.md` under that base. Runtime, theme, component references and checker must match the same binding. Use the guide's shell and source-carrier syntax rather than reconstructing them from another release. Return the binding's recorded release only when a version-specific problem is being diagnosed.

A supplied source preview uses its complete matching local build, local guide/references and source checker; call it a local preview, not a published release. A source PR or package version does not establish what the hosted runtime supports. Routine authoring needs no release-hash audit.

IF supplied content contains actual credentials/secrets, real personal/customer records or security-sensitive detail, or the owner/source policy classifies it private, use the matching guide's runtime-trust procedure and return the trusted complete local binding and opening method. Internal, unreleased or local content alone does not establish that classification. If no trusted complete copy is available where one is required, return that gap rather than executing a hosted library over the content. Copying only theme and runtime files is not a complete distribution.

## Load and use the guide

MUST load the full `authoring/SKILL.md` at the selected binding and return the documented shell, source carriers, selected views and their required component-reference reads, preparation route and checker. For a local preview, use the supplied matching local guide. A full prior read of the same guide in this run counts; a saved copy or filename listing without inspecting its contents does not.

Follow the guide's own conditional references for the content you actually display, including its section-level calls (such as `tours.md` for a Walkthrough), Trace, diagrams, navigation and layout. Read those contents before writing their constructs; a component name in a catalogue is not its API. If a required guide cannot be read, return the missing source rather than inventing attributes or silently reusing a different version.

IF the page presents source, executable commands, configuration, structured data or a diff for inspection or copying, load the guide's `references/code.md` and return the supported code/diff or short-excerpt carrier, language label when known, and exact source to display. Inline identifiers use inline code. Displaying historical commands does not authorize execution. Technical content stays technical even when its source record stored it as a string.

IF the page shows typed design records, load the guide's `references/typed-design.md` and return how a page places a record by id, a rule's cases, the Tree of a need's rules and checks, Map and Walkthrough targets by record id, a choice from an open decision record and the deliverables view, with the check, brief and open commands.

When the guide documents default Comments, every ordinary page keeps its Comments control and semantic targets automatically, without a manual feedback tag, document metadata or paragraph labels. Keep answer controls task-driven. Follow the guide for independent identity or revision overrides; an older binding keeps its own feedback contract.

## Make opening and updates concrete

Name the original authoring sources and the actual reader files. An inline page needs no Markdown embedding. Relative source/data fetches require HTTP serving or the guide's documented preparation; direct-file delivery must not depend on blocked sibling fetches. Offline/private delivery needs the complete matching local library, not merely embedded prose.

For a generated or embedded reader, retain its original source wrapper and referenced originals; update those and regenerate through the guide's procedure. A missing `src` in generated output is not proof of inline authorship. Never repair generated reader text in place while its owning source remains stale.

For a requested freshness comparison or a diagnosed stale-output defect, compare equivalent temporary prepared output before replacing the existing reader. Otherwise regenerate once from retained originals, with the same collection transforms where needed. Report unavailable originals or failed preparation as gaps rather than claiming freshness.

## Check after the last edit

Use the guide's documented operations and exact checker/CLI route for the selected delivery method, not an archive filename or flag guessed from the base URL. After the last edit, in this order:

1. IF the page shows typed design records, run the guide's read-only check (`demistify project check` for a project, `demistify design check` for a standalone milestone) and return its result; after it passes, run the same command once more with `--write` so the ignored generated files exist for the reader. A page that names an unknown record id fails; fix the record or the page, never generated data, and commit nothing the check builds. IF a selected component requires prepared data, apply its documented preparation to that actual data and return the observed result; missing required data is a gap, not a successful empty component.
2. Embed local sources and index page collections only when delivery or navigation needs them. Preserve supplied facts, relative links and stable IDs; readers should not need to run authoring commands, except that a typed design page's reader runs the write command once after a checkout or a record edit.
3. Run the matching CLI's static `check` once on the changed final HTML files.
4. MUST load `../rules/README.md`, run its nudges on the final page and return their brief result. Read each finding as worth checking, not as a failure, and decide: a long section may not need a picture, a long table may be the right view, and a decision may not need a picture or have a useful one under another heading; an `uncertain` result means the page's layout could not be read.

Fix reported errors in the authoring source and regenerate affected output when needed; rerun only after a correction. Warnings are advice, not a blanket zero-warning gate. Static checking does not establish rendered behavior or comprehension. Do not install browser tooling or create infrastructure for routine authoring.

## Return

Return the artifact link, the opening method and the files/assets that must travel together, with a brief result for each check above and the nudges. State a concrete failed check or delivery limitation; avoid a verification dossier. IF comparing efficiency, count authored content and shared library costs separately.
