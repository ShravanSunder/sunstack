# Chunking a Large Review

This reference owns how the Reviewer splits a design set too large to hold whole into chunk passes, without cutting any requirement's chain.

Expected inputs: the Reviewer's own whole read of every target and governing source, and the tie table so far. Return: the chunk plan, with each chunk's seam, its sections, and its overlap with its neighbors; or the decision that one whole pass covers the set.

## When Not to Chunk

Most design reviews fit one whole pass. Chunk only when one reader cannot hold every material chain at once: as a working default, several material call-path groups or many outside contracts. A chunk pass adds depth on its seam; it never replaces the whole read, and the ties and findings still cover the whole set.

## Keep Each Chain Together

A chunk carries the complete text on both sides of its seam: the requirement and the rules beneath it, the Program Design rows, scenarios, and checks that realize them, and the governing sources whole. Never split across chunks, unless an overlap carries the full text:

- one requirement's chain from `U` to `R` to its trace row, `T`, and `V`;
- one call path with its owners, edges, and seam;
- one contract with its consumers and failure behavior.

## Each Pass

Reopen each complete document the chunk touches. Judge only the checks mapped to this chunk, and list what it deliberately did not judge. If judging the seam needs text outside the chunk and its overlap, stop and return `partial`: that is a chunking defect to fix in the plan, not a gap to fill with inference. Run the passes one after another.

Signs the plan is wrong: a pass cannot judge without outside text; a finding's evidence sits outside the chunk that reports it; two adjacent passes reach opposite conclusions about a seam neither fully holds.

## Complete When

Every material chain is covered by the whole pass or by exactly one chunk with its chain unsplit or carried by an overlap, every pass lists what it did not judge, and no chunk pass is counted as whole-set coverage.
