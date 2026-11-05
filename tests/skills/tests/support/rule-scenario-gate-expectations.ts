// Independent oracle: the three expectation changes named by the Lead's D3 B3 plan,5 Nov.
const gateNotes: Readonly<Record<string, string>> = {
  "calls-and-placement-k003-case-010":
    "D3 owner-directed gate, 5 Nov: AgentStudio is tool_manual, outside only_when.kind [general, role, domain]; this rule is not applicable to its own tool manual.",
  "calls-and-placement-k003-case-011":
    "D3 owner-directed gate, 5 Nov: agent-collaboration is tool_manual, outside only_when.kind [general, role, domain]; this rule is not applicable to its own tool manual.",
  "acct-a46-placement-product-workflow":
    "D3 owner ruling, 5 Nov: practices-verification-maintenance is repo_specific, outside only_when.kind [general, role, domain]; this rule is not applicable.",
};
export function expectedAfterKindGate(
  id: string,
  original: { readonly expect: string; readonly note: string },
): { expect: string; note: string } {
  const reason = gateNotes[id];
  return reason
    ? { expect: "not_applicable", note: `${original.note} ${reason}` }
    : { ...original };
}
