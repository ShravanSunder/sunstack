# Artifact Navigation

Mission: verify that a reader can find the authoritative specification/program-design model and trace distributed normative claims without reading process debris.

Predicate: normative claims are distributed or the artifact/design set is hard to navigate.

Expected inputs: review context, the set's phase state (which documents are written so far), and one complete navigation medium: for a design set written as pages, the set's folder, its home page and every page in it; for an older file-backed set, the enumerable artifact tree and links; for chat-only work, the separately labeled records with their entry order and authority homes.

Prerequisites: the complete target/source set exists, and its navigation medium is inspectable. File-backed work has enumerable artifact files: for a page set, its folder with every page. Chat-only work has complete separately labeled records, explicit entry order or the exact entry-order ambiguity, and identifiable authority homes.

Check boundary: read-only.

## Inspection

For a design set written as pages, as `design-documents.md` lays it out, read it by its phase state, from the home page, as a fresh program designer or planner:

- run the static check on the set's pages, by the route `presentation-html`'s `demistify.md` teaches, and read the author's preparation result for the reviewed revision; a missing or refused result is a finding at the record, body or link it names. Only a reviewer whose grant allows writes in the set's own folder prepares it again: preparation on unchanged inputs is idempotent, so a page it changes shows the author didn't prepare after the last edit;
- find one home for each fact: a fact restated in a second section, body, home page line or deliverable page is a duplicate home;
- find no page carrying a whole document as one block or one island;
- find each link written once: a record names only what it serves, and a back link or "related" list written on a need or obligation is a second copy of a derived link;
- match unwritten documents to the phase state: a page is absent only for a document the phase state says isn't written yet, and nothing invented stands in for it; a page missing for a written phase is a broken route;
- at a four-document review, find every need served in each document, by the capability walk in `../reviewing-four-document-design.md`;
- read each deliverable page: it links each of its needs on its owning document page with the need's ID in the link text, links its plan, and states no fact of its own; a deep link into one need's view waits for an address the released guide documents, so its absence is no finding.

For an older file-backed set or chat-only work, read from the entry artifact or labeled record as a fresh program designer or planner:

- identify the one authoritative entry point;
- reconstruct the spine without opening review/process evidence;
- follow every normative link or chat-record reference and confirm its target exists;
- resolve every relative document-image link to a project-local asset and report cache-only, external-expiring, missing or broken targets;
- identify one authoritative home for each repeated claim;
- verify deeper files correspond to real capability, ownership, protocol, domain, or consumer/change boundaries;
- trace requirements to realization and proof without path guessing.

Good: one readable entry, explicit routes to deeper contracts, optional evidence, and no duplicated authority; for a page set, preparation passes and every reverse link is derived.

Bad: an entry that lists pages or files without the question each answers; review notes required for meaning; a whole document pasted into one block; a hand-written back link; a deliverable page that restates an obligation; tiny-file sprawl; duplicated normative prose; stale or circular links.

Calibration: more files are not automatically clearer. Recommend the smallest merge, split, link, or authority move that restores a readable spine. A page set has one page per document by design, so a long document page is not a defect; its records and sections are the units. In an older file-backed set, sprawl is a split no reader question or reason to change earns, such as one file per requirement or files that each need all the others to make sense.

Overlap boundary: this check owns entry paths, link targets, placement, and authoritative homes. `reader-understanding` owns disclosure order, human reconstruction, attention cost, process leakage, and redundant content. Other checks own semantic quality after the claim is found.

Return: check result with entry-path walk, broken/ambiguous routes, duplicate homes, reader consequence, and smallest navigation correction.

Stop when: a fresh reader can identify the authoritative model and trace every selected normative claim, or the exact navigation defect is proven.
