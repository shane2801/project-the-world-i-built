# Data and content contracts

Status: **Phase 2 implemented under DEC-012**, with approved overlap/order and tag/presentation semantics. No verified production dataset is supplied or imported into the application.

Evidence: [SRC-01, Timeline/Project Systems, 20–65 and 152–199](../../docs/theworldibuild-01.txt); [SRC-09, World Data Model/Phase Ordering/Project Scalability](../../docs/theworldibuild-09.txt); [SRC-10, Project System/Scalability](../../docs/theworldibuild-10.txt). Source-backed requirements are REQ-003–REQ-011. Exact interface and validation details below are implementation contracts, not facts about the owner.

## Ownership and modules

| Module under src/domain/career | Responsibility |
|---|---|
| types.ts | Readonly Portfolio, Phase, Experience, Project, Skill, Achievement, Link, Media and validation results |
| validate.ts | Unknown-input boundary; parsed result or structured path/code/message issues |
| validation/fields.ts | Primitive/collection checks and permitted URL forms |
| validation/entities.ts | Explicit entity parsing |
| validation/references.ts | ID/order uniqueness and relationship checks |
| queries.ts | Pure ordering, lookups, joins and neighboring phases |
| *.test.ts and __fixtures__/portfolio.ts | Colocated unit tests and explicitly synthetic draft fixtures |

The domain imports no React, browser UI, Three.js, network client or persistence service. URL parsing uses the standard URL API available in Node and browsers.

## Entity contract

| Entity | Fields and relationships |
|---|---|
| Portfolio | reviewStatus, name, headline, introduction, currentPhaseId, contacts, phases, experiences, projects, skills, achievements |
| Phase | id, title, location, period, order, description, themeId, characterStateId, skillIds |
| Experience | id, phaseId, role, organization, period, responsibilities, skillIds |
| Project | id, phaseId, optional experienceId, title, description, tags, presentationKind, importance, problem, solution, architecture, contribution, technologies, impact, media, links, skillIds |
| Skill | id, name |
| Achievement | id, phaseId, optional experienceId, title, description, links |
| Link / Media | label + href; kind + src + alt respectively |

All listed fields are required except experienceId. Collections may be empty, but currentPhaseId must reference a phase. Text fields require nonempty strings; unknown fields are rejected to catch typos. IDs/references reject surrounding whitespace. Parsers construct new values and do not mutate authored input.

CharacterState, WorldTemplate and AssetManifest implementations remain with the later world/asset phase. Phase visual identifiers are checked as strings now; no nonexistent production artwork is fabricated.

## Approved semantics and validation

- Overlapping periods are allowed. period is an authored label, not parsed or used to infer age, chronological sorting, grouping or date precision.
- Unique nonnegative safe-integer phase order determines sequencing. Gaps are allowed. IDs are independent of order/array position; current phase is explicit.
- IDs are unique within each entity collection. References must resolve; repeated skill references are rejected.
- Experience, project and achievement phase references must exist. Optional experience associations must exist in the same owning phase.
- Tags are multiple descriptive labels. Exact tag queries do not normalize case or infer presentation. presentationKind independently selects software, ai, client or open-source; importance is small, medium or major.
- Media kinds are image, video or diagram, with nonempty alternative text.
- Links permit HTTP(S), safe root-relative paths and mailto contacts. Media excludes mailto. Active-content schemes, protocol-relative paths, backslashes, controls, whitespace and unresolved relative URLs are rejected.

Landmarks will reference these entity IDs instead of copying content. Structural validation does not establish whether an employer, outcome, image or date is true or permitted to publish.

## Validation and publication interface

`validatePortfolio(input: unknown, { forPublication?: boolean })` returns either `{ ok: true, value: Portfolio }` or `{ ok: false, issues }`. Each issue has a stable path, code and human-readable message. Shape errors block relationship checks; invalid partial values are never returned as valid content.

Default validation accepts structurally valid drafts for local authoring/testing. With `forPublication: true`, reviewStatus must be approved. That marker records a human decision; it cannot verify biography or disclosure rights. A future publishing build must invoke this guard when real content is introduced.

No src/content/portfolio.ts exists yet. Synthetic fixtures are draft and imported only by tests, never application or prerender entries. Q-001/Q-002 still block publishing actual content.

## Queries and expansion

getOrderedPhases returns a sorted copy; getCurrentPhase resolves the explicit ID. getProjectById, getProjectsForPhase and getProjectsByTag preserve authored associations/order. Unknown lookups return undefined or an empty result, without inventing entities.

getPhaseContent joins experiences, projects and achievements and deduplicates skills referenced by the phase or its experiences/projects. getAdjacentPhases follows explicit order and handles first/last/unknown phases.

Adding/reordering content requires no location-specific engine edits. Deleting a referenced phase is invalid until dependent content and current selection are resolved explicitly. Tests cover these invariants using fictional data, including a sixth chapter.

## Verification boundaries

npm run test:domain uses Node 24's existing test runner for erasable TypeScript. npm run check includes unit tests, lint, strict type checking, production builds and foundation smoke checks.

Physical asset existence, character/template registries, generated routes, public content, schema migrations and UI/world integration are not implemented in this phase. Later components must consume validated content through this boundary.
