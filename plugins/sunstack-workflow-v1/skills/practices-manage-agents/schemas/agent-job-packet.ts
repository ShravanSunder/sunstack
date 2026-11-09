// The complete packet union, for validating an unknown or mixed-role packet.
// Constructing or reading one role's packet needs only ./assignment-fields.ts and that role's contract:
// ./role-contracts/{lead,advisor,implementer,verifier,reviewer,researcher,operator}-contract.ts.
// This file only composes them. Its parsed output is frozen at the top level; a role contract returns the same values unfrozen.
import * as z from "zod@4.6.5";
import { AdvisorPacket } from "./role-contracts/advisor-contract.ts";
import { ImplementerPacket } from "./role-contracts/implementer-contract.ts";
import { LeadPacket } from "./role-contracts/lead-contract.ts";
import { OperatorPacket } from "./role-contracts/operator-contract.ts";
import { ResearcherPacket } from "./role-contracts/researcher-contract.ts";
import { ReviewerPacket } from "./role-contracts/reviewer-contract.ts";
import { VerifierPacket } from "./role-contracts/verifier-contract.ts";

export const AgentJobPacket = z
  .discriminatedUnion("role", [
    LeadPacket,
    AdvisorPacket,
    ImplementerPacket,
    VerifierPacket,
    ReviewerPacket,
    ResearcherPacket,
    OperatorPacket,
  ])
  .readonly()
  .describe("One commission: role and form, the assignment, its full reads and its grant");

export type AgentJobPacket = z.infer<typeof AgentJobPacket>;
