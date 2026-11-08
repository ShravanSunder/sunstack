# Check: Lint Contract

This check owns how the rule reaches the agents who run lint: as a nudge they read and decide on, through plain `sunstack lint` in any repository, short lines first and detail on request, with nothing in the rule or its repository bent around the engine. Whether each finding route gives the receiving agent what it needs (observation, standard, where to read, an honest basis, no can't-settle pass) is `decision-model-review`'s nudge-and-receiver check; this one reads the rule's place in the lint path.

**Inputs:** the entry's finding and pass routes, severities and `related` list; the repository's instructions for running lint (its `AGENTS.md` or contributor docs); any script, wrapper or CI step that reads lint's output; at development and later, a saved report's short lines and one `lint show` entry.

**Return:** a check record, in the review schema's shape.

**Complete when:** every finding and pass route, and every place the repository runs lint, was read against every item below.

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| a nudge never fails a run | the repository runs lint with `--max-warnings` over judged rules, or a script, test or CI step fails on a judged rule's warnings or on its case results | a repository gate that hid every judged rule until a separate tool adopted it, so no agent ever received a judged warning | remove the gate; run plain lint, where `warn` never fails a run |
| plain lint reaches any agent | agents are told to run a wrapper, or the rule works only through a script in this repository | "run `scripts/run-skill-rules.ts`" in the instructions | name `sunstack lint --config <config>` directly |
| pointers first, detail on request | a message quotes the judged text or restates the standard; the rule's detail is reachable only by rerunning | a finding whose message pastes the whole section | one-sentence observation; `related` places; detail through `--report` and `lint show` |
| a pass says one thing | a route reaches `pass` for a piece the gate dropped, or a pass is described as more than this rule's property holding | a gate's drop routed to `pass`, so an excluded piece reads as checked | route a drop to `not_applicable`, which keeps the gate's answer |
| the engine stays generic | the rule, its config or its repository works around an engine gap (a script that post-processes results, a field faked from another, a selection simulated by gates) instead of the gap going to the engine | three rules over one kind, each opening with the same two-question gate and its examples, simulating the tree-shaped selection the engine doesn't ship | file the gap with the engine, and hold the rule or keep it on what the engine ships |
