# Application architecture and delivery plan

## Status and boundaries

**Approved design; Phase 1 foundation is complete. The DEC-010 organization step and Phase 1 milestone are approved by the user; Phase 2 core data/domain is complete under DEC-012 and approved by the user. DEC-013 authorizes its local commit and Phase 3, whose verified-content prerequisite remains unresolved.** Source-backed requirements are owned by [SUMMARY.md](SUMMARY.md). Accepted user choices are in [DECISIONS.md](DECISIONS.md). DEC-007/DEC-008 are accepted. Data-contract details and production inputs not covered by those decisions remain open; see OPEN_QUESTIONS.md.

At discovery the repository had only ten original design documents. Phase 1 adds the React/Vite shell, build-time HTML rendering, configuration, smoke checks and setup instructions. See [README.md](../README.md) for commands and [DEC-009](DECISIONS.md#dec-009--incremental-implementation-and-review-gate) for authorization. A local Git repository is initialized under DEC-011; no remote, push or deployment is authorized.

## Established constraints and rationale

The approved release choices and source-backed constraints below govern implementation. DEC-007 separately establishes the technology stack.

| Constraint | Basis | Rationale |
|---|---|---|
| Browser-delivered symbolic world with five chapters | REQ-001–REQ-003; DEC-002 | Complete initial career story without installation |
| Modular phases, character states and project representations | REQ-004, REQ-007, REQ-011 | Extend career content without redesigning the world |
| Planet/phase/project navigation and wormhole travel | REQ-002, REQ-005, REQ-006 | Make career progression spatial and recognizable |
| Three information depths and traditional resume | REQ-008, REQ-009, REQ-012 | Support both exploration and fast recruiter access |
| Observatory with history, projects and skills | REQ-010 | Give shared content a central destination |
| Adaptive devices and prototype-before-commission | DEC-003, DEC-004 | Validate usability and performance before artwork investment |
| Journal persistence and admin dashboard deferred | DEC-005 | Keep optional systems out of the initial release |

Requirement evidence is linked in SUMMARY.md; explicit user-choice provenance is in DECISIONS.md. Q-008 records acceptance of the stack and interaction rules. Detailed data contracts, publication content, dates and contact behavior remain subject to their own open questions.

## System approach

One statically deployable web application provides two views of the same validated content:

- Semantic HTML resume, project catalogue/details and contact.
- Planet overview, active chapter, character evolution, wormhole travel and Observatory.

Core information remains independent of 3D. Use build-generated HTML for index/resume/project content so reading does not wait for renderer startup. Loading or graphics failures must preserve information access.

See [GRAPH.mmd](GRAPH.mmd) for dependencies, [domain](areas/domain.md) for concepts, [data](areas/data.md) for contracts and [workflows](areas/workflows.md) for visitor behavior.

## Components and responsibilities

| Component | Owns | Boundary |
|---|---|---|
| Content layer | Career facts and associations | No rendering state or duplicated copy |
| Build validator | IDs, references, publication fields, media paths | Reject invalid content before publishing |
| World descriptor builder | Deterministic placements from order, theme and importance | Pure logic independent of React/Three.js |
| Experience controller | Intro, selected phase/project, loading and travel | Coordinates camera/character; no career facts |
| Scene renderer | Overview or active chapter, lighting, animation, spatial interaction | Consumes descriptors/assets and emits intent |
| Information UI | Accessible navigation, resume, projects, contact and focus | Works without successful 3D |
| Asset layer | Models, presets, animations, media and manifest | Authored art is distinct from generated layout |
| Build/publishing layer | Static HTML/assets and release package | Deployment remains separately authorized |

## Approved technologies and implementation alternatives

- TypeScript and React for typed shared content and UI.
- Vite for build tooling; generate static HTML for core information as a build step, rather than assuming a client-only Vite entry is sufficient.
- Three.js via React Three Fiber for reusable scene components. Pin compatible stable versions during implementation; no preview renderer dependency by default.
- GLB/glTF models, a shared character rig and authored phase presets.
- Static hosting without runtime database, authentication or CMS initially.
- Use bounded walkable areas and simple collision handling first; add a physics dependency only if the prototype demonstrates a need.

Official references checked during discovery: [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction), [Vite static deployment](https://vite.dev/guide/static-deploy.html), [Three.js documentation](https://threejs.org/docs/). Recheck compatible stable releases when dependencies are actually selected.

Alternatives: direct Three.js reduces the React renderer dependency but requires more manual scene lifecycle integration; a static-first framework is viable if content/prerendering needs justify replacing Vite; a full game engine or server application adds complexity unsupported by current requirements. No graph/vector database is justified for either context or application.

## Interfaces and data flow

Authored content -> validation -> shared content model -> static information pages and world descriptors -> browser navigation and lazy scene loading.

Public interfaces include stable URLs for resume, project details and selected chapter/project exploration. Direct links and reloads must work on static hosting; use generated pages/query state without depending on an undocumented server rewrite.

Internal interfaces: validate content, build world descriptors, select phase/project, travel, return to overview, change presentation, skip intro. They operate in process; no HTTP API is required.

Entity relationships and validation belong in [data.md](areas/data.md). Keep stable IDs independent of ordering and explicitly name the current phase. Phase 2 implements the career schema and pure queries; no runtime content API is introduced. Verified authored portfolio content is still missing.

## Rendering, accessibility and failure behavior

- Keep a lightweight planet overview and one active chapter; preload destinations as needed.
- Bound visible landmarks using grouping/curation and on-demand detail while keeping every project in the catalogue.
- Allow immediate intro skip and resume access. Use reduced-motion transitions and semantic HTML information equivalents.
- Desktop supports keyboard movement and pointer selection plus direct controls. Default phones to complete information access; optional lightweight overview follows benchmarking.
- Coordinate destination loading before committing travel. Recover to the current usable view on failure; preserve information if rendering fails entirely.
- Use existing templates/presets for data-driven expansion. New bespoke environments, likenesses and animations still require art production.
- Observatory aggregates shared content. Do not present hypothetical future phases as actual employment.

Risks: asset production effort, long initial loads, cinematic friction, rendering/memory limits, unverified content and project disclosure restrictions. Numeric performance budgets and representative devices remain Q-007, not invented requirements.

## Staged implementation and acceptance criteria

The context-system and Phase 1 foundation stages are complete. DEC-010's behavior-preserving organization step is complete and approved. DEC-011 completed the local Phase 1 Git milestone. Phase 2 is approved; DEC-013 authorizes its commit and Phase 3 subject to the documented content prerequisite. The current implementation roadmap below refines the original delivery stages without changing the five-chapter public-launch requirement.

| Phase | Dependency | Deliverable and acceptance |
|---|---|---|
| 1. Foundation | DEC-007 accepted | React/Vite startup, strict types, lint, static production build and HTTP smoke checks pass |
| 1a. Organization | DEC-010 accepted | Preserve markup/styles, hydration and static rendering; extract focused modules; existing checks pass, then manual review |
| 2. Core data/domain | Phase 1 and organization reviews | Content contracts/validation and meaningful ID/reference/order tests; examples never published as verified facts |
| 3. Accessible portfolio | Phase 2; verified publishable content | Resume, catalogue/details, direct URLs, keyboard/phone access and HTML independent of 3D |
| 4. Internal 3D prototype | Phase 3; DEC-008 accepted | Two connected chapters with walking, selection, travel, reduced motion, loading recovery and recorded performance budgets |
| 5. Complete journey | Phase 4 review | All five chapters and Observatory; data-driven add/reorder/remove without location-specific engine edits |
| 6. Quality/assets | Phase 5; approved art and benchmark targets | Approved licensed artwork; accessibility, browser, recovery and performance checks pass |
| 7. Delivery | Earlier phases reviewed | Reproducible setup/build, final context and release/rollback instructions; publishing separately approved |

The two-chapter prototype is internal; public launch still includes all five chapters (DEC-002). Stop after every phase for review.

## Foundation implementation

- `src/app/App.tsx` composes the shared layout and home page; it makes no verified biographical claims.
- `src/components/layout/SiteLayout.tsx` owns the header, skip link and single main landmark with typed content props.
- `src/features/home/pages/HomePage.tsx` owns home content and composes its decorative PlanetIllustration.
- `src/styles/tokens.css` and `global.css` own shared visual values and base/accessibility styles. Layout and home styles stay beside their owners.
- `src/main.tsx` mounts during development and hydrates production HTML.
- `src/entry-server.tsx` is compiled only for the static build, into ignored `.prerender/`.
- `scripts/prerender.mjs` injects rendered content into `dist/index.html`; deployable output is only `dist/`.
- The Vite configuration binds to loopback and denies serving original documents/context files. No runtime backend is introduced.
- Tool versions are pinned in package.json/package-lock.json. TypeScript 6.0.3 stays within typescript-eslint's supported range; npm reported TypeScript 7 as latest but unsupported by the selected linter.
- Three.js/React Three Fiber, verified career content, navigation workflows and art remain unimplemented. Phase 1 passed npm run check (lint, strict types, static build and three HTTP/static-content smoke tests); browser hydration and visual QA remain unverified. Phase 2 domain work is now approved; Phase 3 authorization and prerequisites are recorded in DEC-013.

## Feature organization and growth

Accepted under DEC-010. App, shared layout, home, shared styles and the Phase 2 career domain now exist; future feature directories are created when their owning phase starts. Verification passed npm run check, including all three smoke tests. Rendered React markup is byte-identical to the pre-extraction baseline; static comparison preserved 29 CSS rules and 106 declarations after resolving tokens. The user approved the resulting milestone; browser visuals and hydration were not automatically verified.

| Location | Responsibility |
|---|---|
| src/app | Composition and, later, shared route resolution/navigation |
| src/components/layout and ui | Shared layout; genuinely reused controls added when needed |
| src/features/home | Present landing content and decorative illustration |
| src/content | Future approved authored data, separate from test fixtures |
| src/domain/career | Implemented pure types, validation, queries and colocated tests; no React/Three.js dependencies |
| src/features/resume and projects | Future pages and feature-owned components |
| src/features/explore | Future page, scene, controls, hooks, world generation and travel state |
| public/assets | Future static model/media files |
| scripts | Existing build-time rendering and HTTP smoke tests |

Use direct imports, not speculative barrel exports. App coordinates features; domain/shared modules do not depend on features. Extract meaningful responsibilities, not trivial one-line wrappers.

Routing strategy: share route definitions between the browser and static build for /, /resume/, /projects/, /projects/<id>/ and /explore/. Ordinary links remain functional without JavaScript; add route modules with the page phase, not during this extraction. No routing package is required initially.

State strategy: URLs own shareable chapter/project selection; local React state owns local UI; an exploration reducer owns transient loading/travel. Add narrow context only for actual shared exploration consumers. Keep per-frame scene values outside React rendering state.

Styling strategy: plain CSS with shared color/spacing/type/layout tokens, base accessibility styles, and owner-scoped feature/layout styles. Preserve the current visual direction and breakpoints. No new CSS framework.

Testing strategy: preserve Node HTTP/static-build smoke tests. Phase 2 uses the same Node runner for colocated erasable-TypeScript domain tests without installing packages. Vitest and React Testing Library with a DOM environment are the proposed tooling for later React component behavior tests; no test dependencies are added in this step. Browser tests remain necessary for hydration, focus and 3D behavior.

## Phase 2 domain implementation

Implementation contract details are owned by [areas/data.md](areas/data.md). Pure types, field/entity/reference validation and queries are separate cohesive modules. validatePortfolio accepts unknown input and returns parsed content or path/code/message issues; an explicit forPublication option rejects drafts.

Dates remain authored labels; phase order is unique and independent of time or array position. Queries preserve IDs, association ownership and input immutability. Tags are independent from presentation kind. No database, network service, asset resolution, world generation or UI integration is added.

All synthetic data lives under domain __fixtures__ and is imported by tests only; no src/content/portfolio.ts exists until verified content is supplied. The home page and its rendered output remain unchanged.

Node 24 executes erasable TypeScript tests directly. tsconfig allows explicit .ts imports and disallows non-erasable constructs. npm run test:domain runs the unit suite; npm run check also runs lint, strict types, the static build and existing HTTP smoke tests. No dependency versions or lockfile change. Final npm run check passed 32 domain tests, three smoke tests, lint, strict types and both builds. Rendered home markup is unchanged; Phase 3 has not started.

## Validation strategy

For context changes: verify source hashes, local relative links, stable ID references, requirement provenance and Mermaid node/edge consistency. The historical documentation-only file count no longer applies once application files are added.

For later application work: test content validation, deterministic layout, stable identifiers through reordering, travel state/failure recovery, direct URLs, renderer-independent content and keyboard focus. Review character recognition, chapter identity, text legibility and reduced-motion behavior visually.

Do not add tests that merely mirror trivial implementation. Select device/network benchmarks before art commissioning, and sign off release against those recorded budgets.

## Open approvals and defaults

Production inputs and remaining interpretations are owned by [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md). The static baseline and DEC-008 interactions are accepted; timeline overlap/order and project tags/presentation semantics are accepted under DEC-012. Verified content, contact mechanism, performance targets and hosting remain open.
