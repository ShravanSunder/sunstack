// Recipient-resolved context; live work-direction content is delegated-agent-call.ts.
// The complete packet union, for validating an unknown or mixed-role packet.
// Constructing or reading one role's packet needs only ./assignment-fields.ts and that role's contract:
// ./role-contracts/{lead,implementer,operator,checker}-contract.ts.
// This file only composes them. Its parsed output is frozen at the top level; a role contract returns the same values unfrozen.
import * as z from "zod@4.6.5";
import { CheckerPacket } from "./role-contracts/checker-contract.ts";
import { ImplementerPacket } from "./role-contracts/implementer-contract.ts";
import { LeadPacket } from "./role-contracts/lead-contract.ts";
import { OperatorPacket } from "./role-contracts/operator-contract.ts";

export const AgentJobPacket = z
  .discriminatedUnion("role", [LeadPacket, CheckerPacket, ImplementerPacket, OperatorPacket])
  .readonly()
  .describe("Recipient-resolved assignment context: role and form, full reads and sourced grant");

export type AgentJobPacket = z.infer<typeof AgentJobPacket>;
