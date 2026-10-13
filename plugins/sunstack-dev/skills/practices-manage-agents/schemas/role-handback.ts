// The complete helper-handback union, for validating a handback whose role isn't known in advance.
// Returning one role's handback needs only that role's contract and ./assignment-fields.ts:
// ./role-contracts/{advisor,researcher,operator}-contract.ts. Other roles return their phase's own result.
// This file only composes them. Its parsed output is frozen at the top level; a role contract returns the same values unfrozen.
import * as z from "zod@4.6.5";
import { AdvisorHandback } from "./role-contracts/advisor-contract.ts";
import { OperatorHandback } from "./role-contracts/operator-contract.ts";
import { ResearcherHandback } from "./role-contracts/researcher-contract.ts";

export const RoleHandback = z
  .discriminatedUnion("role", [OperatorHandback, ResearcherHandback, AdvisorHandback])
  .readonly()
  .describe(
    "A helper result with no owning phase or method; completed or blocked, and never an acceptance",
  );

export type RoleHandback = z.infer<typeof RoleHandback>;
