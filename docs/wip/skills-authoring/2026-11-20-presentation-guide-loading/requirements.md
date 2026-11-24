## Requirements

An agent authoring a design or engineering PR should be able to choose a component from the reader's question, find the instructions for the binding it will use, and produce hand-written HTML with stable links that another agent can follow. A routine one-page change should avoid reading instructions for unrelated components.

This is a proposed update to presentation-html, reached directly by an author or from a design phase. The November 20 owner request supplies the authoring basis. The source audit found two things in the current route: overlapping component reads, including a Walkthrough reference for some pages without a tour, and a binding guide that describes hosted and source-preview use while leaving ordinary versioned local delivery implicit. The Demistify source audit counted about 38,600 tokens across its main guide and references, including about 4,390 for the entry guide and its mandatory content reference. Those are text counts.

The existing trigger, source ownership, component APIs, and visual verification responsibilities carry forward.
