# Requirement coverage standards

These state, at each document, the chain that [reviewing-four-document-design.md](../references/reviewing-four-document-design.md#requirement-to-observation) walks from a requirement to its observation. A model reads the documents' own passages for each; every result is worth checking, not a verdict on the design.

- Each requirement defined on the Requirements page has Specification obligations whose behavior delivers every outcome and limit it asks for. <!-- C001 -->
- Each Specification obligation has a Program Design realization: an owner and an interface or flow that carry out its behavior. <!-- C002 -->
- Each requirement's Verification Design rows account for every obligation it links, by an observation that keeps its V's threshold, reference and target at the proof seam Program Design names, or by an explicit unverified disposition. <!-- C003 -->
- A design set's Requirements page has its Specification page beside it, or the Specification is named once as not yet written. <!-- C004 -->
- A design set's Requirements page has its Program Design page beside it, or the Program Design is named once as not yet written. <!-- C005 -->
- A design set's Requirements page has its Verification Design page beside it, or the Verification Design is named once as not yet written. <!-- C006 -->
