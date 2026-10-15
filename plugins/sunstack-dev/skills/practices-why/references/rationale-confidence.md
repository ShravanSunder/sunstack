# Rationale Confidence

You arrive with the chronology from rationale reconstruction and the candidate explanation recorded at step 1. Write the explanation so a reader can tell what the record says, what you read into it, and what nobody knows. Return it with factual statements, supported interpretations, and hypotheses or unknowns kept distinct.

## Three kinds of statement

A fact is what a record says, with its anchor beside it: "PR #412's description says the page size is capped at 100 because the upstream API rejects larger pages." The fact is that someone gave this reason. Whether the reason was true, or was the only one, is a separate claim.

A supported interpretation is a reading that several anchors point to although none states it. Show the chain so the reader can check each link: "The commit landed the day after OPS-88 was opened, touches only the path OPS-88 names, and adds a test with OPS-88's input, so it was most likely the response to OPS-88."

A hypothesis is a plausible reading the evidence doesn't single out, because the record is thin or another reading fits as well. An unknown is a question the searched record can't settle. Both say what was searched and what would settle them.

These split research's labels more finely. A fact is a direct observation or a cited source summary. Supported interpretations and hypotheses are both inference, separated by how much the anchors carry. An unknown is unresolved.

## Calibrated language

Words that claim a reason or an intent ("because", "was designed to", "the team decided", "fixes") need a fact with its anchor next to them. For an interpretation, say what the evidence points to: "is consistent with", "most likely", "the record points to". For a hypothesis, say it is one possibility and that no record ties it down. Leave out "obviously", "clearly" and "just", which assert a confidence the evidence has to supply.

## What to check before writing

- Ask what you would expect to find if your reading were wrong. Evidence you would find either way doesn't favor your reading.
- A pattern repeated across the codebase may be copy-paste. Treat it as deliberate only when a record says so.
- For the asker's explanation, look for what would confirm it and what would refute it, and report which you found.

## Cases

**An unadopted performance proposal.** The question is why the export batch size is 500. Issue #88 proposes 2000, with benchmarks showing a threefold speedup. No change links #88, the value is still 500, and it arrived in `a1b2c3` "add batch exporter" with no stated reason.
Bad: "The batch size is tuned for performance (#88)."
Good: "#88 proposed 2000 for speed. Nothing shows it was adopted, and the value stayed 500. Why 500 was chosen is unknown. The introducing commit gives no reason, and tracker searches for 'batch size' and '500' found only #88."

**A compliance ticket against a cleanup PR.** A ticket says audit logs must be kept seven years for a customer's compliance review. The PR that changed retention is titled "cleanup: consolidate log retention config" and never mentions compliance.
Bad: picking one story, either "a compliance change" or "a cleanup".
Good: present both with their anchors, then what ties them. If the PR links the ticket, the compliance reason is the supported motive and the PR title is its author's framing. If nothing links them, say the timing fits and the connection isn't established.

**Defensive code with an unrelated nearby incident.** A null check on `account.region` landed three days after incident INC-204, and the asker assumes the incident prompted it. INC-204's report concerns the payments service's currency field, a different path, and the commit message says "guard region lookup".
Bad: "Added in response to INC-204."
Good: "The commit gives its reason as guarding the region lookup. INC-204 was close in time but concerned a different path, and nothing links the two, so the incident as the trigger is a hypothesis the record doesn't support."

**A hand-written threshold without rationale.** `REQUEST_TIMEOUT_MS = 4500` arrived in a commit titled "tune timeouts" with no ticket and no explanation. The metrics store that might show what it was tuned against wasn't reachable.
Bad: "4500 ms was chosen to stay under the gateway's 5 s limit."
Good: "Unknown. The introducing commit gives no reason and links nothing. Tracker and doc searches for 'timeout' and '4500' found nothing, and the latency metrics weren't reachable. One possibility is staying under the 5 s gateway limit in `gateway.yaml:12`, but no record ties the two." If a change is coming, add that the relationship to the gateway limit is not established and the next owner decides whether it matters.

**An explicit accepted design decision.** Decision record 0007, marked accepted, says the app uses SQLite because it must run offline on one machine, and the code matches.
Bad: hedging it into "it appears the team may have preferred SQLite".
Good: "SQLite was chosen because the app must run offline on one machine (decision record 0007, accepted 2024-05)." Say it plainly and briefly. If a change is coming, add whether the offline requirement still holds and the anchor for that.

## When to stop

Stop when the explanation meets the step 5 completion and each contradiction appears with both sides. Look again at an answer that names no gap, because historical records almost always have one unless the decision was recorded explicitly and adopted.
