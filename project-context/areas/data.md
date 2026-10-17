# Data and content contracts

Status: **Phase 2 implemented under DEC-012**, with approved overlap/order and tag/presentation semantics. Phase 3 imports owner-authorized SRC-11 résumé content under DEC-015; missing details remain labeled.

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
- Links permit HTTP(S), safe root-relative paths and email/telephone contact links. Telephone numbers permit an optional leading plus, digits, parentheses, dots and hyphens; media excludes telephone links. Media excludes mailto. Active-content schemes, protocol-relative paths, backslashes, controls, whitespace and unresolved relative URLs are rejected.

Landmarks will reference these entity IDs instead of copying content. Structural validation does not establish whether an employer, outcome, image or date is true or permitted to publish.

## Validation and publication interface

`validatePortfolio(input: unknown, { forPublication?: boolean })` returns either `{ ok: true, value: Portfolio }` or `{ ok: false, issues }`. Each issue has a stable path, code and human-readable message. Shape errors block relationship checks; invalid partial values are never returned as valid content.

Default validation accepts structurally valid drafts for local authoring/testing. With `forPublication: true`, reviewStatus must be approved. That marker records a human decision; it cannot verify biography or disclosure rights. The Phase 3 content loader invokes this guard whenever real content is supplied.

src/content/portfolio.ts now supplies SRC-11 data authorized by the owner (DEC-015); contentIsDraft remains true for presentation/incomplete-detail review. loadPortfolio returns null for explicit draft empty states or validated approved content; malformed/unapproved content throws and fails the build. Synthetic fixtures remain test-only, including SSR test injection; no application or prerender entry imports them. Q-002 is resolved for this supplied résumé. Q-001/Q-017 track missing/contradictory facts; no site deployment is authorized.

## Queries and expansion

getOrderedPhases returns a sorted copy; getCurrentPhase resolves the explicit ID. getProjectById, getProjectsForPhase and getProjectsByTag preserve authored associations/order. Unknown lookups return undefined or an empty result, without inventing entities.

getPhaseContent joins experiences, projects and achievements and deduplicates skills referenced by the phase or its experiences/projects. getAdjacentPhases follows explicit order and handles first/last/unknown phases.

Adding/reordering content requires no location-specific engine edits. Deleting a referenced phase is invalid until dependent content and current selection are resolved explicitly. Tests cover these invariants using fictional data, including a sixth chapter.

## Verification boundaries

npm run test:domain uses Node 24's existing test runner for erasable TypeScript. npm run check includes unit tests, lint, strict type checking, production builds and foundation smoke checks.

Phase 3 implements static routes and information UI integration through this boundary. Project route IDs use letters, digits, underscores and hyphens (leading letter/digit), checked by features/projects/paths.ts before static output. This URL constraint is distinct from the general domain ID contract. Physical asset existence, character/template registries, approved project evidence, schema migrations and world integration remain pending.

## SRC-11 resume provenance and remaining detail

The unchanged supplied source is [docs/KAVISH MUTHOORA.docx](../../docs/KAVISH%20MUTHOORA.docx), authorized under DEC-015. Locators P001–P123 count every w:p element in word/document.xml in document order, including blank paragraphs. Extracted text is evidence, not a second source copy. Formatting/typography are normalized in structured data; no dates or metrics are inferred from examples in SRC-01–SRC-10.

| Content IDs / fields | SRC-11 paragraphs | Treatment |
|---|---|---|
| Identity, base, contacts, introduction | P001–P009, P114–P116 | Owner-authorized; email, phone and explicit HTTPS contact links |
| accenture-architect / france | P011–P026 | February 2025–Present; banking context, not a claimed relocation |
| energy-solutions-lead / abu-dhabi | P028–P037 | September 2024–February 2025 |
| koryos-consultant / freelance | P039–P050 | July 2022–Present; preserve Kóryos spelling |
| birmingham-research / birmingham | P052–P058 | April 2022–January 2023 |
| Skills | P008, P022–P024, P035–P036, P045, P056–P058, P059–P098 | Flat shared skill list; no invented proficiency levels |
| first-class-degree | P099–P101 | Education rendered as a chapter achievement; no new education schema |
| ev-charger-management / ev-hackathon-award | P104–P105 | 2026 second place; France chapter provisional; no invented tech/contribution |
| accommodation-management | P033, P106–P107 | Abu Dhabi role association inferred from matching platform description |
| ai-healthcare-analytics | P054–P058, P108–P109 | Birmingham association inferred from matching research description |
| java-multiplayer-game | P110–P111 | Java/game modes confirmed; Birmingham chapter provisional |
| consultancy-delivery | P043 | 10+ platforms retained as an owner-supplied claim |

The five chapter IDs/order are approved design structure, not dates supplied by the résumé. Mauritius early-career details are pending. Phase themes, character IDs, project importance and presentation kinds are authored layout choices, not verified career facts.

The 39 versus 23 banking-entity contradiction is tracked in Q-017; neither count is rendered. France/EV and Birmingham/game mappings remain explicitly provisional. Missing architecture, contribution, impact, evidence links and media stay labeled pending rather than extrapolated. The broad permission covers supplied text, not absent screenshots or diagrams. Q-001 tracks the remaining content work.
