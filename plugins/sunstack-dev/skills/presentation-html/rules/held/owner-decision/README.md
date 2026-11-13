# Owner-decision rules: development only

These two warning rules are held. No active skill or rulebook invokes this config, and no automatic trigger is provided.

- `owner-decision.native-choice` looks for a reader answer request in a section that contains no native choice.
- `owner-decision.brief-before-choice` checks seven properties of the explanation before an open design choice's control. It reads enclosing sections so a brief can span headings.

The standards remain in [options-and-decisions.md](../../../references/options-and-decisions.md) and [owner-decision-brief.md](../../../../../shared-references/owner-decision-brief.md). The markers add no new prose obligations.

From the repository root, using released CLI 0.16.0:

```sh
pnpm dlx @sunstack/cli@0.16.0 lint --config plugins/sunstack-dev/skills/presentation-html/rules/held/owner-decision/owner-decision.dev.config.json --check
pnpm dlx @sunstack/cli@0.16.0 lint --config plugins/sunstack-dev/skills/presentation-html/rules/held/owner-decision/owner-decision.dev.config.json --rules
```

For a document collection, use that config with `--root <document-root> --all --evidence`, then `--root <document-root> --all --prepare <report.json>`. There are no model selections, so those operations send no inference. An actual asking run requires its own authorized credential route.

The current driver sends whole enclosing sections, including text after the control. It does not mechanically cut a prefix before the selected control; the questions identify that control by id/title and ask about preceding content. A complete check detects size cuts, not semantic selection mistakes. A source drawing is not proof of rendered readability.

Native element presence is narrower than guide/API conformance, matching every question to its control, or interactive behavior. The brief rule checks the stated decision, current picture, option pictures, gains, costs, cost bearers and recommendation; it does not certify the rest of the full brief contract or the author's authority.

Before activation, independent labels, development and held-out results must meet the rule-authoring floors. Provisional probability bars do not establish accuracy. No installed plugin refresh or release is part of this development run.
