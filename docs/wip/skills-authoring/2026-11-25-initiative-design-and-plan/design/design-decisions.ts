import type { DesignDecision } from './design-schema.d.ts';

export default [
  {
    "id": "Q9",
    "title": "How much of a step the plan fixes",
    "kind": "choice",
    "question": "How much of a step does the plan fix, and how much does the Implementer choose?",
    "options": [
      {
        "id": "surfaces-and-proof",
        "title": "The plan names each step’s files, proof and pull request; the Implementer works inside it"
      },
      {
        "id": "checks-only",
        "title": "The plan names steps, their checks and pull requests only"
      },
      {
        "id": "files-and-tests",
        "title": "The plan fixes files and tests per step"
      }
    ],
    "recommended": {
      "option": "surfaces-and-proof",
      "by": {
        "alias": "demistify-lead",
        "role": "lead"
      }
    },
    "authority": {
      "state": "owner-open"
    }
  },
  {
    "id": "Q8",
    "title": "What row work gets when no deliverable covers it",
    "kind": "choice",
    "question": "What row does work get when no deliverable covers it?",
    "options": [
      {
        "id": "core-in-typed-work",
        "title": "A core deliverable, and rows only inside an initiative or typed project"
      },
      {
        "id": "core-everywhere",
        "title": "A core deliverable for every piece of work"
      },
      {
        "id": "later-placeholder",
        "title": "A later deliverable as a placeholder, promoted when scoped"
      }
    ],
    "recommended": {
      "option": "core-in-typed-work",
      "by": {
        "alias": "demistify-lead",
        "role": "lead"
      }
    },
    "authority": {
      "state": "owner-open"
    }
  },
  {
    "id": "Q1",
    "title": "What “near” means for depth by number",
    "kind": "choice",
    "question": "What does “near” mean for depth by number?",
    "options": [
      {
        "id": "earlier-accepted",
        "title": "Every lower-numbered project is accepted"
      },
      {
        "id": "earlier-planned",
        "title": "Every lower-numbered project’s core deliverables have plans"
      },
      {
        "id": "per-project",
        "title": "The Lead proposes “near” per project and you confirm"
      }
    ],
    "recommended": {
      "option": "earlier-planned",
      "by": {
        "alias": "demistify-lead",
        "role": "lead"
      }
    },
    "authority": {
      "state": "owner-open"
    }
  },
  {
    "id": "Q6",
    "title": "Where initiatives live",
    "kind": "choice",
    "question": "Where do initiatives live?",
    "options": [
      {
        "id": "docs-initiatives",
        "title": "docs/initiatives/<initiative>/, and you add it to the design-mode write list"
      },
      {
        "id": "docs-specs",
        "title": "docs/specs/<initiative>/"
      }
    ],
    "recommended": {
      "option": "docs-initiatives",
      "by": {
        "alias": "demistify-lead",
        "role": "lead"
      }
    },
    "authority": {
      "state": "owner-open"
    }
  },
  {
    "id": "Q2",
    "title": "Who writes a deliverable’s scope",
    "kind": "ruling",
    "statement": "Each design phase writes its own records’ ids into the core deliverables’ scope; steps come with planning.",
    "authority": {
      "state": "agent-decided",
      "by": {
        "alias": "demistify-lead",
        "role": "lead"
      },
      "sourceKind": "author",
      "rationale": "The independent review found the design check’s gate passing on an empty report, because it gates only scoped rules and design init seeds no deliverable. Cost: every design phase gains a write step.",
      "decidedOn": "2026-11-24",
      "weight": "design"
    }
  },
  {
    "id": "Q3",
    "title": "Where a fact lives",
    "kind": "ruling",
    "statement": "A fact lives in one place, as design-documents.md already states; there is no v2 edit.",
    "authority": {
      "state": "agent-decided",
      "by": {
        "alias": "demistify-lead",
        "role": "lead"
      },
      "sourceKind": "author",
      "rationale": "design-documents.md states the Mac Lead’s one rule; the competing rule was v1’s own copy. Cost: none beyond dropping that copy.",
      "decidedOn": "2026-11-24",
      "weight": "design"
    }
  },
  {
    "id": "Q4",
    "title": "Entities with no typed record",
    "kind": "ruling",
    "statement": "An entity with no typed record is flagged, not given a new record kind.",
    "authority": {
      "state": "agent-decided",
      "by": {
        "alias": "demistify-lead",
        "role": "lead"
      },
      "sourceKind": "author",
      "rationale": "Your preference for a small tool, relayed by the Mac Lead. Cost: such entities stay prose until a record kind is justified.",
      "decidedOn": "2026-11-24",
      "weight": "design"
    }
  },
  {
    "id": "Q5",
    "title": "Two checkers",
    "kind": "ruling",
    "statement": "Both checkers stay, split by what each reads: the Demistify check owns records, links between records and deliverable states; the design rules own page-only properties.",
    "authority": {
      "state": "agent-decided",
      "by": {
        "alias": "demistify-lead",
        "role": "lead"
      },
      "sourceKind": "author",
      "rationale": "No v2 edit depends on merging them, and growing one tool goes against keeping it small. Cost: two tools to run, and the link rule learns record placements in a follow-up.",
      "decidedOn": "2026-11-25",
      "weight": "design"
    }
  },
  {
    "id": "Q7",
    "title": "The plan contract",
    "kind": "ruling",
    "statement": "plan-implementation loads canonical-implementation-plan.md as fixed in PR 239; a re-plan writes a superseding plan page and changes the deliverable’s step list in the same commit.",
    "authority": {
      "state": "agent-decided",
      "by": {
        "alias": "demistify-lead",
        "role": "lead"
      },
      "sourceKind": "author",
      "rationale": "One contract home: PR 239 removed the line that copied dependencies, and a one-deliverable plan admits only its own checks. Cost: a re-plan touches two files in one commit.",
      "decidedOn": "2026-11-25",
      "weight": "design"
    }
  }
] as const satisfies readonly DesignDecision[];
