# Open questions and conflicts

Entries are **open** unless explicitly marked resolved by an accepted decision. Do not turn example data or proposed resolutions into facts.

## Q-001 — Verified content

**Blocks publication.** Obtain the actual resume, project catalogue, dates, contributions, outcomes, skills and contact links. Verify whether France remains current.

Examples are not evidence: [SRC-01, Phase Example, 41–65](../docs/theworldibuild-01.txt); [SRC-08, Discovery Example/Information Density Example, 25–37 and 207–222](../docs/theworldibuild-08.txt); [SRC-07, Project Scaling Examples, 230–243](../docs/theworldibuild-07.txt). Sample dates, counts and the 40% metric must not be published without verification.

## Q-002 — Publication permissions

**Blocks publishing affected content.** Which employers, clients, names, screenshots, systems diagrams and results may be public? Use approved descriptions/evidence only; do not assume source examples authorize disclosure.

## Q-003 — Art production

**Blocks commissioning.** Need likeness references, approved visual direction, budget, artist/pipeline ownership and asset licenses. DEC-004 already establishes prototype before commission.

## Q-004 — Schedule and ownership

**Blocks production commitment.** Delivery date, available effort, ongoing content/asset maintenance owner and budget are unspecified.

## Q-005 — Hosting and domain

**Blocks deployment.** Choose domain and static hosting account; confirm deployment access and rollback ownership. Architecture recommendation does not select a vendor.

## Q-006 — Contact behavior

Direct email/social links or a form? Recommend direct links initially. A form requires an additional service/backend and separate data-handling decisions.

## Q-007 — Performance baseline

**Blocks final performance sign-off.** Select representative desktop/device and network conditions. Record measurable load/frame/memory budgets during the prototype before commissioning final assets. No source establishes numeric budgets.

## Q-008 — Architecture acceptance

**Resolved, 2026-10-17:** the user explicitly approved DEC-007 and DEC-008 by replying “approve both.” This unblocks Phase 1 (DEC-009); other production/content questions remain open.

## Q-009 — Timeline semantics

How should overlapping education, employment and freelance work be represented? Recommend explicit display order independent of dates; preserve actual date overlap. Exact date granularity and phase/role grouping require verified content.

## Q-010 — Project classification

Software, AI, client and open-source categories overlap. Decide after examining actual projects whether tags plus a presentation kind are needed. Do not enforce an exclusive category taxonomy prematurely.

## Design tensions and conflicts

| ID | Evidence | Accepted resolution under DEC-008 |
|---|---|---|
| Q-011 | First minute cinematic: [SRC-03, 20–140](../docs/theworldibuild-03.txt); rapid resume access: [SRC-08, 145–171](../docs/theworldibuild-08.txt) | Immediately skippable intro and permanent information access |
| Q-012 | Projects not separate pages: [SRC-01, 152–158](../docs/theworldibuild-01.txt); direct project access: [SRC-07, 177–193](../docs/theworldibuild-07.txt) | In-world detail plus independent readable project URLs |
| Q-013 | “Unlimited projects”: [SRC-10, 405–421](../docs/theworldibuild-10.txt) | Uncapped content model with bounded visible scene complexity; not infinite rendering |
| Q-014 | Automatic growth/character evolution: [SRC-09, 101–133 and 251–269](../docs/theworldibuild-09.txt) | Generate layout and select authored presets; bespoke artwork still needs authorship |
| Q-015 | Planet Museum: [SRC-07, 300–316](../docs/theworldibuild-07.txt); Observatory: [SRC-10, 463–491](../docs/theworldibuild-10.txt) | S10 governs global hub name; treat regional museums as compatible optional content, not duplicate global hubs |
| Q-016 | Sequential station diagram and direct-jump example: [SRC-04, 19–37 and 133–144](../docs/theworldibuild-04.txt) | Chronological connections with direct chapter choice |

Q-011 through Q-016 are resolved by DEC-008. They include tensions and terminology ambiguity, not only logical contradictions. Keep their evidence for traceability; do not reopen without new conflicting information. Authority is settled by DEC-001.
