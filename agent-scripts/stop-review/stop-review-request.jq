def block_text:
  if type == "array" then [ .[] | .text // empty ] | join("\n")
  else "" end;

def tool_receipt:
  {
    tool: .tool_name,
    outcome: .outcome,
    capture: .result.kind,
    exit_code: (
      .result.text // "" |
      [capture("(?:^|\\n)Process exited with code (?<code>-?[0-9]+)(?:\\n|$)")?] |
      if length == 0 then null else .[0].code | tonumber end
    )
  };

def bounded_text:
  if length <= 4000 then {text: ., clipped: false}
  else {text: (.[0:2000] + "\n[clipped]\n" + .[-2000:]), clipped: true} end;

.result.outcome |
select(.kind == "prepared") |
.selections[0].readiness |
select(.kind == "ready") as $selected |
[
  $selected.content.records[] |
  if .body.kind == "tool_use" then
    {role: "tool", receipt: (.body | tool_receipt)}
  elif .body.kind == "user_message" or .body.kind == "assistant_message" then
    {role: (if .body.kind == "user_message" then "user" else "assistant" end),
     source: .provenance} + (.body.blocks | block_text | bounded_text)
  else empty end
] as $records |
([$records[] | select(.role == "user") | .text] | last) as $latest_user |
([$records[] | select(.role == "assistant") | .text] | last) as $last_assistant |
select(($latest_user // "") != "" and ($last_assistant // "") != "") |
$options[0].judgment |
.input.request.state.session = {
  latest_user: $latest_user,
  final_reply: $last_assistant,
  records: $records,
  coverage: {bounded_transcript: $truncated, selection_omissions: $selected.omissions}
}
