.result.outcome as $result |
if $result.kind != "completed" then "assessment_unavailable"
else
  $result.answers as $answers |
  if ([$answers.wait_required, $answers.finished, $answers.authorized_next_step] |
      all(.[]; .type == "noul" and (.yes_probability | type) == "number" and
          .yes_probability >= 0 and .yes_probability <= 1)) then
    if $answers.wait_required.yes_probability >= 0.8 then "wait_required"
    elif $answers.finished.yes_probability >= 0.8 then "finished"
    elif $answers.wait_required.yes_probability <= 0.2 and
         $answers.finished.yes_probability <= 0.2 and
         $answers.authorized_next_step.yes_probability >= 0.8 then "continue_work"
    else "uncertain" end
  else "invalid_assessment" end
end
