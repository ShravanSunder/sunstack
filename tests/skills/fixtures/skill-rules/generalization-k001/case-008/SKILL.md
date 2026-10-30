### 4. Self-check

MUST load `../skill-rules/references/running-rules.md`, run the rules on the folder of the skill this run changed, and return its report beside the diff. Fix each `fail`, and each refusal the report traces to this change, then run the self-check again on the fixed files; leave an item only for a reason, such as a fix the boundary doesn't admit, and step 5 names it with that reason. Any other gap, or `rules: not run`, stays as the report states it, with its reason, and the run goes on to step 5.

Completion: the report from the self-check's last run, made after the last edit, stands beside the diff, and each `fail` and each refusal traced to this change is fixed or left for step 5 with its reason.
