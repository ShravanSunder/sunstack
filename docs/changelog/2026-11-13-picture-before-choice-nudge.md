# HTML authors run the picture-before-choice nudge

Date: 2026-11-13. Version: sunstack-dev 3.3.4 (released together with the picture widening).

`presentation-html` step 5 (Prepare and lint once) gains one instruction: when a page asks the reader to answer a question with a native choice, the author also runs the picture-before-choice nudge from `rules/README.md` on the final page. Each finding is worth checking, not a failure: the decision may not need a picture, a useful picture may sit under another heading, and the author decides. An `uncertain` result means the page's layout could not be read.

The instruction sits in the main path, not in `references/options-and-decisions.md`, because the command needs the finished HTML, and step 5 is where the author already runs the one static check on the final file; the reference is read mid-composition.

This is a nudge, not a gate: no completion condition, blocker or pass requirement is added, and no automatic trigger, hook or schedule exists or is implied. `owner-decision-brief.md` is unchanged.

Proven: the mechanical rule's development and unseen-page results recorded in `rules/development-observation.json` and its integration test. The rule checks only that a diagram, figure, image or Mermaid block comes before the control in its section; it does not judge relevance, rendering or a complete decision brief.

Not proven: whether authors actually run the command and act well on its findings; receiver behaviour is untested.

Validation: `pnpm --dir tests/skills test` passed 312/312 when an independent review supplied the external development inputs, and 311 passed with 1 skipped (the private regression) without them; `claude plugin validate .` passed. Both exited 0.

Client manifests and the Codex, Claude and Cursor marketplace mirrors are updated. Installed caches have not been refreshed.
