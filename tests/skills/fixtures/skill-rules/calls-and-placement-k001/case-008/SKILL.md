### 6. Prove each rule

MUST load `references/check-and-reports.md` and return the check outcome, the printed wording of each intended rule with your reading of it, and for each mechanical rule the selected good and bad occurrences with their completed results.

Completion: `check_rules` passes on the real binary; print (`check_rules` with `output: assembled_rules`) shows every intended rule ID, the count, and each question reading as its standard; for every mechanical rule, the intended good occurrence was selected and completed `pass` and the intended bad occurrence was selected and completed `fail`. An exit code, zero matches or partial coverage never closes calibration. Rules run locally, by the skills that use them, not in CI.
