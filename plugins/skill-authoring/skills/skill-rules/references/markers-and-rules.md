# Markers and Rules

This reference owns steps 3 to 5: where each marker goes, the rule entry behind it as a decision model over one evidence kind, pairing the rulebook in the rules config, and repairing what the check refuses. Expected input: the deterministic and model-judged standards from step 2, each with its `path:line`, evidence kind and gate. Return, per standard: its host and marker, its rule entry, and any change to the config's rulebook pairs or evidence kinds; for each refusal, its cause and the fix.

Everything below matches the engine's lint documentation and its refusal messages. When the working repository's engine docs say something different, they win.

## Two ends of a rule

The marker binds the standard's wording where the skill states it, and the judge receives those words beside every piece it is asked about. The entry's `evidence` names the kind of piece the standard judges, and the config's evidence project picks those pieces from the checked files, each with its named fields. Keep the two ends apart: choose the host for how the standard reads alone, and the evidence kind for what it must judge.

## Choose the host

The standard the judge sees is the host's visible words. Choose the narrowest host that carries the whole standard and nothing else:

- **list item:** a marker at the end of the item's first paragraph binds the whole item, nested items included;
- **paragraph:** a marker at the end of its last line binds the paragraph;
- **section:** a level 2 to 6 heading with the marker touching its text binds the section, which runs to the next heading of the same or higher level and includes code blocks and tables.

Mark a section only when the whole section is one standard and its visible words stay under the config's `max_question_words`. Count what the engine counts: headings, prose, list items, fenced code and table text.

Before marking, read the host as if it were the only text a judge will see. Good: it states one standard, with its subject. Bad: it starts mid-thought, leans on a lead-in outside the host, or carries several standards.

- `domain-skill-crafting`'s `## Standards` section in `references/calls-and-placement.md` holds dozens of standards. Mark the list item at `:26` for call completeness; the dispatch items and the citation items below it are separate candidates.
- An item such as "starts with `Use when` unless the platform requires another shape;" under the lead-in line "A good `description`:" reads as a fragment, because its subject sits in the lead-in. Return it for a rewrite that carries its subject, as a teaching change to the standard's home, designed with `skill-design` and written with `skill-creation`; or mark a complete host that carries exactly one standard. `domain-skill-crafting/references/descriptions-and-invocation.md:6` shows the complete form: "A description starts with `Use when`, `Trigger when`, `Always use when` or `Always trigger when`."
- A paragraph that carries five standards, like `skill-design/SKILL.md:77`, is no narrow host for any of them. Split it in the teaching first.

The engine forbids some hosts outright: a level 1 heading, a block quote, a table, HTML, a link reference definition and frontmatter. A marker inside fenced or indented code or an inline code span isn't a marker at all; it's ignored, and its entry turns up orphaned.

## Write the marker

```text
- A step's completion criterion lets the agent tell done from not done.<!-- K001 -->

A description of more than 300 characters fails.<!-- K002 -->

## Clear result<!-- K003 -->

The selected paragraph states a clear result.
```

The heading comes last on purpose: its section runs to the next heading of the same or higher level, so a section marked above the other two standards would swallow them into its standard.

- The shape is exact: `<!-- `, one uppercase letter and three digits, then ` -->`, with nothing after it on the line except whitespace.
- The letter is the config's `marker_prefix`. A marker with another letter is invisible to it.
- On a heading the marker touches the text: `## Clear result<!-- K003 -->`, never with a space before it.
- Each ID appears at most once per Markdown file, and one file carries as many distinct IDs as it has marked standards. The same ID in a different Markdown file is a different marker, because markers are qualified by their source, but entry names must stay unique across the whole rulebook.
- Take the next unused number in that file, and never renumber a marker that exists: its ID is the key of its entry.
- A backslash before `<!--` escapes the comment, so it binds nothing.

## Write the entry as a decision model

The rules file is one strict JSON object keyed by marker ID, paired with exactly one Markdown file. Each entry has:

- `name`, which becomes the rule ID: lowercase letters, digits, `.`, `_` and `-`;
- `evidence`, one kind the config defines;
- `questions`, the questions the decision may ask, keyed by name; a purely mechanical entry has none;
- `decision`, a `start` step and named `steps`;
- `severity`, `warn` or `error`. A mechanical limit the standard says must hold is `error`; a judged rule stays `warn` until its rule tests show it accurate and someone with the authority decides it may block.

**Questions.** Each names its `type` and its `instructions`: `check` (the field it reads), optionally `against` (a field to read it against) and `context` (a field that frames it), each naming the kind's fields, and a `task` that asks the question. A `noul` question answers yes with a probability and may define what yes and no mean in `criteria.true` and `criteria.false`. A `choice` question picks one of its labels, each defined in `criteria`. A `score` question picks a level from its `criteria` list, worst first. Write criteria from the development cases: the good piece's words in one, the bad piece's in the other, so the judge sees where the line falls.

**Steps.** Each step does one of four things and routes onward:

- `mechanical_check` with a `tool`: `regex` or `contains` on a text field, `max_chars` on a text field (yes at or under the limit), `file_exists` on a targets field, or `ast_grep` naming a rule in the evidence project (yes when that rule matches inside the piece), then `yes` and `no` routes;
- `ask` a `noul` or `score` question with `yes_at_or_above` and `no_at_or_below`; an answer between them ends `uncertain`;
- `ask` a `choice` question with `min_probability` and one route per label, exactly its labels; a pick below the minimum ends `uncertain`;
- `combine` weighted `noul` or `score` answers (weights summing to one) against the same two thresholds.

A route is another step's name, `pass`, `not_applicable`, `uncertain`, or a finding: `{"finding": "<message>", "at": "<field>"}`, which points the finding's line at that field.

**What the judge receives.** A piece whose walk reaches no question sends nothing. Once a walk reaches its first question, every question in the entry goes to the decision model in one request, with the standard's wording, the piece's location and every field of the piece, its longest text cut first when it is over the evidence limit. The walk then follows only the routes its answers lead to. So a question gate saves no request; what it buys is the outcome, because a piece it rejects never reaches the verdict, whatever the verdict's answer says.

### Worked case: a step's completion criterion

The standard, marked in `domain-skill-crafting/references/steering.md`: "Each completion criterion lets the agent tell done from not done, and demands the legwork the step needs." Its evidence is the `step` kind (a numbered step of a `SKILL.md`, with `heading`, `body` and `completion`).

```json
"K001": {
  "name": "completion.criterion",
  "evidence": "step",
  "questions": {
    "tells_done": { "type": "noul", "instructions": { "check": "completion", "against": "body", "task": "At the end of this step, could an agent tell from the completion criterion whether the step is done or not done?" }, "criteria": { "true": "...", "false": "..." } },
    "demands_legwork": { "type": "noul", "instructions": { "check": "completion", "against": "body", "task": "Can the criterion be met only by doing the work the step asks for, rather than by a thin or empty result?" }, "criteria": { "true": "...", "false": "..." } }
  },
  "decision": {
    "start": "has_completion",
    "steps": {
      "has_completion": { "mechanical_check": { "tool": "ast_grep", "rule": "completion" }, "yes": "tells_done", "no": { "finding": "Step has no completion criterion.", "at": "heading" } },
      "tells_done": { "ask": "tells_done", "yes_at_or_above": 0.7, "no_at_or_below": 0.3, "yes": "legwork", "no": { "finding": "Completion criterion doesn't let the agent tell done from not done.", "at": "completion" } },
      "legwork": { "ask": "demands_legwork", "yes_at_or_above": 0.7, "no_at_or_below": 0.3, "yes": "pass", "no": { "finding": "Completion criterion can be met without the step's legwork.", "at": "completion" } }
    }
  },
  "severity": "warn"
}
```

Read it as the decision it is:

- **No gate.** Every step falls under the standard; a step with no criterion breaks it.
- **The mechanical first step.** A step without a completion paragraph is itself the breach, so it ends in a finding at the step's heading and no question is asked. Routing it to `not_applicable` would hide the most common failure.
- **Two questions, in order.** The standard makes two demands, so the verdict asks them one at a time and each failure names its own message: "Understanding reached" fails the first; "Produce a change list" passes the first and fails the second.
- **Against the body.** A criterion such as "the return for its class is complete" points at returns the step's body spells out. Read alone it looks empty; read against the body it names them.
- **The band.** An answer between 0.3 and 0.7 is `uncertain` and goes back to the agent running the check, who decides it against the standard. The thresholds are a first setting until the rule's development cases run; change them only from those results.

The same shape, with a question gate in front, serves a standard whose kind holds pieces it doesn't govern: a guidance standard over the `sentence` kind asks first whether the piece is guidance or something else (an example, a fact, a quotation), sends the something-else to `not_applicable`, and asks the verdict only of guidance.

## Pair the rulebook in the config

A correct Markdown and rules pair proves nothing until the config the repository's rule runner uses includes it. Inspect, in order:

1. **The config.** Find it from the runner the repository's instructions name. Open that config, not a similarly named file.
2. **The pair.** Add `{"markdown": "<path>", "rules": "<path>"}` to `rulebook`, both paths relative to the config file. A path relative to the repository root resolves to a different place.
3. **The prefix.** The config's `marker_prefix` must be the letter your markers use.
4. **The evidence.** Each entry's `evidence` is a kind in the config's `evidence.kinds`, and every field its questions, mechanical checks and `at` routes name is one of that kind's fields; an `ast_grep` step names a rule the evidence project defines. A new kind or field is a change to the config and its evidence project, proved there with the evidence print before any entry relies on it.
5. **The cap.** Your hosts were sized against the config's `max_question_words`.

Then MUST load `check-and-reports.md` and return the check's outcome with its printed rules: the count and each intended rule with its marker, source line, evidence kind and severity, to judge against these signals.

- **Good signals:** every intended rule prints with its marker and source line, as `mechanical` or `asking` as you meant it, at the severity you chose; the count is the count before your change plus the entries you added.
- **Bad signals:** a clean check whose count didn't move, which means the runner uses another config or your pair isn't in it; an entry whose evidence or field the config doesn't define.

Stop when the printed rules list every intended rule and the count is right. A clean check that omits one is not paired.

## Repair a refusal

A refused check prints one line per refusal, `file:line:column:`, then for an entry refusal the path inside the entry (such as `decision.steps.has_completion`), then the message, and exits 2. Fix the cause the message names, in the host or the entry:

| message | cause | fix at the cause |
| --- | --- | --- |
| "Move the marker to an allowed heading, paragraph or list item outside forbidden containers." | marker on a level 1 heading, or in a block quote, table, HTML, link reference definition or frontmatter | move it to the paragraph, list item or level 2 to 6 heading that states the standard; if the standard lives only in a table or quote, return it for a restatement in prose, as a teaching change to the standard's home, designed with `skill-design` and written with `skill-creation` |
| "Place the marker directly against the heading text, without whitespace before it." | whitespace between the heading text and the marker | remove the whitespace |
| "Use each marker ID at most once in a Markdown source." | one ID twice in one Markdown file | keep the ID on the host its entry was written for; give the other standard a new ID and entry, or remove the stray copy; leave every other distinct ID alone |
| "Use a narrower host for this marker or increase max_question_words." | the host's visible words exceed the cap | mark a narrower host, such as a subsection, paragraph or list item, that carries the one standard |
| "rulebook marker has no entry" | a marker with no entry | write the entry, or remove the marker if step 2 didn't mark that standard |
| "entry has no rulebook marker" | an entry whose marker didn't bind | find out why: the marker was deleted or misspelt (`K0014`), uses another prefix letter, has text after it on the line, sits inside code, is escaped, or lives in a different Markdown file from the one the pair names; restore it at the standard's host, or remove the entry if the standard is gone |
| "undefined evidence kind" | `evidence` names a kind the config doesn't define | name a defined kind, or add the kind to the config and prove it there |
| "instruction must name defined fields", "finding at names an undefined field", "mechanical tool names an undefined or incompatible field" | a question's `check`, `against` or `context`, an `at`, or a tool's `field` names a field the kind lacks, or a tool reads a field of the wrong shape | name the kind's field the standard actually judges |
| "ast_grep names an unknown rule" | the step's `rule` isn't in the evidence project | name the evidence rule that marks the property, or add it to the evidence project and prove it there |
| "choice requires a defined choice question and exactly its option routes", "binary ask requires a defined noul or score question" | an `ask` step whose question is missing, the wrong type, or routed by labels that differ from its criteria | route a choice by exactly its labels; ask a `noul` or `score` with thresholds |
| "thresholds must satisfy 0 <= no_at_or_below < yes_at_or_above <= 1", "min_probability must be in (0, 1]", "combine weights must be positive and sum to one" | a threshold out of range or inverted, or weights that don't sum to one | set the values the development cases support |
| "start names a missing step", "route names a missing step", "decision graph contains a cycle" | the graph's shape | name existing steps, and route every path to an end |

Each of these repairs makes a refusal disappear by losing the standard; never use them:

- raising `max_question_words` so an oversized section binds: it merges several standards into one verdict and raises the cost of every question in the rulebook;
- deleting the standard, or its entry, to clear the refusal;
- moving the marker onto a neighbouring paragraph that binds but doesn't state the standard;
- renumbering valid IDs while fixing a duplicate.

Complete when: every marked standard has a bound marker on its narrowest host and exactly one entry whose decision routes every path to an end, the check's print lists every intended rule with the right count, and each refusal was fixed at the cause its message names.
