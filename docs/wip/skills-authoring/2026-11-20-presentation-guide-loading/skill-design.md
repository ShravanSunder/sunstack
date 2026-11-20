## Skill design

**Proposed run 1 — presentation-html.** Place a short question-to-view mapping in the existing chooser or its directly linked reference. Include a good and bad example for the recurring reader questions in a PR. Preserve the caller's semantic fields whichever representation the author chooses. For example, planned proof can use prose, cards or a table with the scenario, observable result and rejecting case. Represent a proposed call path as a proposal, and reserve prepared call stacks for actual supplied source frames.

Keep the binding procedure in the existing Demistify reference. Name the runtime, guide and matching checker once. Load the content reference when the author works with an external source, changes the delivery method or needs its data-carrier rules. Open the Walkthrough reference when the author chooses a Walkthrough. The optional worked handoff shows how another agent follows one record from need to verification and attaches an observed result to the exact revision.

**Proposed follow-up runs.** Each owning design skill points to the one presentation chooser by way of the existing shared rendering reference. Each still specifies what its requirements, program structure or verification view must show. Review reads the resulting page against those semantic fields. Demistify's own guide remains the source for the shell, the component markup and the checker.

### Delivery options

| Option | What it helps | Cost |
| --- | --- | --- |
| Fetch the guide for the selected binding | Works with the published CDN release and custom bindings | A cold read needs the network |
| Vendor matched Markdown and an index | Gives agents a local path to the sections they need | A release upgrade needs a source-controlled refresh |
| Render an HTML manual alongside Markdown | Gives people a browsable catalog with worked examples | Adds a rendering step. Agent context still depends on what they read |

Recommend the second option as the fast path, with the first as the fallback. Rendered examples can be a separate view over the same sources.

For the first refresh, take the authoring tree from a locally staged, verified Demistify release. Record the version, source commit and file digests. Review the changed Markdown and the retained link destinations. The next Demistify release can repeat the same comparison and propose a Sunstack source change. Keep the registry or CDN publish boundary separate from approval of that skill update. The initial proposal uses a manual handoff of an existing artifact. Any network-fetching updater or cross-repository workflow needs its own design and review.

A site bound to the moving public v1 path can use the matching copy if the current manifest confirms its identity. When an agent cannot establish a match, it uses that binding's own guide. A versioned local reader keeps its runtime, theme, lazy assets, guide and CLI together. Guide text and examples do not authorize tool calls, credentials or publication.

**Status** Proposed. Base is Sunstack 7adb3677 and a source audit of Demistify a86500d0. The implemented site-root checker belongs to [the separate CLI PR](https://github.com/ShravanSunder/sunstack-tools/pull/199). The guide-loading runs require design inspection before skill-source changes.
