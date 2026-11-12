# Explain the design; use Map to find its meaning

Behavior-changing update from the owner's direction on 2026-11-10. This is the remaining v2 change after the v1 restoration in PR #212. The engineering method starts from the pre-#205 design phases, with current v2 names and plugin dependency repairs. V1 remains Markdown and is outside this change.

The owner wants rich HTML explanations and drawings, appropriate normal Demistify components, choices and open discussions, retained source-derived call stacks, and shared JSON navigation instead of the forced requirements/stage viewers. Requirements must be broken into understandable groups in the content as well as the Map. Journeys need diagrams and explanations. Agents, including Luna, should be able to write and revise the set; a reader should be able to explain its important behavior.

Success means four distinct HTML documents with their engineering meanings intact, visible capability grouping, complete explanations at stable destinations, and one shared navigation source for Pages, Map and Walkthroughs. A Map entry reaches the actual group, requirement or related explanation without extracting a need into an isolated viewer. Important conditions, failures, unresolved decisions and proof limits remain visible.

Basis: user-directed intent; no claim that these instructions caused or repair the historical Router incident. Existing content observations illustrate the success gap: a grouped Map beside a flat requirements table; sequences without enough outcome explanation; inconsistent approval/timing summaries. These observations support the content review questions, not a causal claim about skill effectiveness.

Sources: Sunstack PRs #205, #208 and merged #212; the accepted restoration design; Demistify PR #149, committed contract at 302409abe3f018d08a4af6cda4811d1cb9b481be, especially navigation.md, tours.md and shared-navigation.ts. The same navigation contract is now published in Demistify 1.22.0, source/version merge 13b7fcefd61f6e305c00f04abf1284dd902dbd8c; retained public downloads and consumer checks establish that bounded integration. Existing call-stack data/preparation remains its separate documented contract.

Consumers are agents authoring or revising the four design documents, agents reviewing them, and the owner reading and discussing them. Non-goals: v1 changes, management/topology, new library APIs or viewer removal, a new renderer/server, plugin activation, installed-cache changes, merge or release. No token-saving, visual-quality or general reliability improvement is claimed.
