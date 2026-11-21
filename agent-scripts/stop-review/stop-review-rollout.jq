def harness_message:
  .payload.internal_chat_message_metadata_passthrough.content_item_metadata[0].provenance as $source |
  if $source.type == "harness" then true
  else
    [.payload.content[]? | .text // empty] | join("\n") |
    test("^\\s*(<skill>|# AGENTS\\.md instructions for |<environment_context>|<hook_prompt\\b|✉️.*Load full message)"; "s")
  end;

fromjson? |
select(.type != "response_item" or .payload.type != "message" or
       .payload.role != "user" or (harness_message | not))
