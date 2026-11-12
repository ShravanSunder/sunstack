// Work-direction content only. Launch metadata and recipient-resolved context have separate owners.
// This source contract does not intercept Router messages or grant file/command access.
import * as z from "zod@4.6.5";

export const DelegatedAgentCall = z.strictObject({
  role: z
    .enum(["implementer", "checker", "operator"])
    .describe("The recipient role selected by the live call"),
  files: z
    .array(z.string().min(1))
    .min(1)
    .readonly()
    .describe(
      "Files the recipient actually opens to find governing assignment sources and supporting evidence",
    ),
});

export type DelegatedAgentCall = z.infer<typeof DelegatedAgentCall>;
