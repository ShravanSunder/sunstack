## 1. Classify Review Requirement

IF operation is `classify-review-requirement`, load `references/classifying-review-requirement.md` and return its `review-required | non-substantial` result or blocked missing-input result.

Dispatch no reviewer, select no checks, and return no review verdict. `review-required` instructs the caller to make a separate fresh review invocation.

Completion: classification returns immediately with zero reviewer dispatches.
