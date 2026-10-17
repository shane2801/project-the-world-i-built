# Decisions and rationale

Status vocabulary: **accepted** = explicit user choice; **proposed** = recommendation awaiting acceptance; **superseded** = retained history with replacement ID. Source requirements remain in [SUMMARY.md](SUMMARY.md), rather than being relabeled as user decisions.

## DEC-001 — Source authority

**Accepted, 2026-10-17.** Current explicit user decisions override documents; otherwise SRC-10 takes precedence over conflicting earlier sources. Compatible earlier detail remains useful.

Provenance: user selected “File 10 takes precedence” during architecture discovery. Filenames alone do not establish historical approval.

## DEC-002 — Launch breadth

**Accepted, 2026-10-17.** Public launch includes all five chapters. A two-chapter internal prototype is a validation milestone, not a reduced public release.

Provenance: user selected “All five chapters.” Rationale: deliver the complete initial journey.

## DEC-003 — Device support

**Accepted, 2026-10-17.** Desktop 3D is primary; complete accessible resume information works on all devices. Add mobile 3D where performance permits.

Provenance: user selected “Adaptive experience.” Full mobile walking/touch exploration is not a launch requirement.

## DEC-004 — Asset strategy

**Accepted, 2026-10-17.** Prototype interactions using simple assets, then commission polished artwork.

Provenance: user selected “Prototype then commission.” Commissioning budget and likeness approval are still open.

## DEC-005 — Optional systems deferred

**Accepted, 2026-10-17.** Defer visitor progress/journal persistence and the private editing dashboard.

Provenance: user selected “Defer both.” Sources describe these as additions/future capabilities: [SRC-08, Explorer Journal, 235–265](../docs/theworldibuild-08.txt); [SRC-09, World Memory/Admin, 271–300](../docs/theworldibuild-09.txt).

## DEC-006 — Context structure and authorized work

**Accepted, 2026-10-17.** Use root AGENTS.md, unchanged originals under docs/, and project-context/ with INDEX, SUMMARY, ARCHITECTURE, GRAPH, DECISIONS, OPEN_QUESTIONS and areas/domain,data,workflows.

Provenance: user supplied this directory structure, then requested “Implement the plan.” This initially authorized documentation creation and source organization only. The later explicit implementation request and approval of DEC-007/DEC-008 extend scope to the Phase 1 work recorded in DEC-009; original documents remain protected.

## DEC-007 — Application baseline

**Accepted, 2026-10-17.** Use a statically deployable application, shared content for HTML and 3D, and a pure world descriptor builder. Approved stack: TypeScript, React, Vite, Three.js/React Three Fiber, GLB assets.

Rationale, alternatives and interfaces: [ARCHITECTURE.md](ARCHITECTURE.md). Provenance: after the two proposals were restated explicitly, the user replied “approve both.” This approves static delivery, renderer-independent HTML, and no initial backend/CMS/authentication. It does not approve additional infrastructure.

## DEC-008 — Resolve experience tensions

**Accepted, 2026-10-17.** Make the opening immediately skippable, provide direct project URLs, bound visible scene complexity, separate generated layout from authored art, use Observatory as the global hub, and permit direct nonadjacent chapter selection.

Provenance: the same explicit “approve both” reply accepted these interaction rules. Conflict evidence and impacts are owned by [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md#design-tensions-and-conflicts).

## DEC-009 — Incremental implementation and review gate

**Accepted, 2026-10-17.** Implement Phase 1 foundation now; verify it and stop for review before Phase 2. Preserve existing documents and work. No deployment or commissioned artwork is authorized.

Provenance: the user requested one independently verifiable implementation phase at a time, then approved DEC-007/DEC-008 so foundation work could begin.

Implementation details: npm with a pinned lockfile, Node 24 LTS, strict TypeScript, ESLint and Node's built-in test runner. Vite emits browser assets and a build-only React renderer; prerendering produces readable HTML without a runtime server. Three.js/React Three Fiber are approved but installation waits until needed.

## DEC-010 — Feature-oriented organization and readable implementation

**Accepted, 2026-10-17.** The user approved the feature-oriented folder proposal and its first behavior-preserving organization step. Keep app composition, shared layout, feature pages/components, domain logic and build operations separate. Create modules only when working code needs them; do not generate empty future scaffolding.

Provenance: after requesting architecture before edits, concise persistent rules and human-readable comments, the user replied “approved” to the concrete structure proposal. This step does not authorize Phase 2, new packages, feature workflows or deployment.

Current extraction: app/App composes SiteLayout and HomePage; HomePage owns PlanetIllustration. Shared tokens/global styles and layout/home styles replace the single stylesheet. Client and build-time entry points use the same composition.

Approved growth direction: career domain types/validation/queries remain React-independent; authored content stays separate; resume/projects/explore own their pages, components and logic. URL state owns shareable selection; exploration owns transient travel state. Shared code must not import features; app composition coordinates feature boundaries.

Keep the Node smoke tests. Introduce unit/component test tooling only with the phase that needs it, verifying compatibility before installation. Comment intent, invariants and trade-offs rather than restating code. Run checks and wait for manual review after each authorized step.

## DEC-011 — Local Phase 1 Git milestone

**Accepted, 2026-10-17.** The user approved the completed Phase 1 foundation and organization step and requested a local Git repository and Phase 1 commit with an appropriate description.

Use the existing configured Git identity and default branch. Track source, context, configuration, lockfile, tests and the supplied Mermaid editor recommendation. Exclude installed dependencies, generated builds and local secrets. Git attributes preserve original docs/ text bytes so source fingerprints survive checkout.

This authorizes initialization and a local commit only: no remote, push, deployment or Phase 2 work. Prior phase verification is recorded in INDEX.md; this repository operation does not imply new browser testing.

## DEC-012 — Phase 2 domain contracts and timeline/project semantics

**Accepted, 2026-10-17.** The user requested “begin phase 2” and explicitly approved both recommendations: overlapping periods with explicit display order, and multiple descriptive project tags plus one independent presentation kind.

Period values are authored display labels, not chronology or age calculations. Unique explicit phase order drives sequencing without changing stable IDs or associations. Current phase is an explicit reference. Projects retain one owning phase and optional experience association; the association must agree with that phase.

Implementation: pure career types, unknown-input validation and queries under src/domain/career; synthetic fixtures live only under __fixtures__. A root draft/approved review marker supports an explicit publication validation option. This marker represents human review, never automated factual verification. Asset file resolution and character/template registries belong to later phases.

Use the existing Node test runner for erasable TypeScript domain tests; no packages or persistence infrastructure are added. This phase changes no user interface and does not authorize Phase 3, a Git commit, remote operations or deployment. Verify and stop for manual review.

## DEC-013 — Phase 2 acceptance and Phase 3 authorization

**Accepted, 2026-10-17.** The user reviewed Phase 2 and instructed “ok commit and begin next phase.” Commit the domain/data milestone locally; begin Phase 3 accessible portfolio under the existing architecture. No remote, deployment or later phase is authorized.

The Phase 3 prerequisite remains verified publishable content (Q-001/Q-002). No production dataset exists; synthetic test fixtures remain test-only. Ask for verified content or explicit approval of clearly labeled draft pages/empty states before UI implementation. This records a prerequisite, not approval of a draft-content alternative. Contact behavior remains Q-006.

Scope after that prerequisite is resolved: shared static/browser routes, accessible resume and project catalogue/details, renderer-independent HTML and direct-URL checks. Preserve the approved feature boundaries and styling; stop for manual review after verification. Existing Phase 2 check results are recorded in INDEX.md; this acceptance does not imply browser verification.

## DEC-014 — Draft accessible portfolio before real content

**Accepted, 2026-10-17.** The user instructed “build drafts first then we will replace with actual content later.” This explicitly permits Phase 3 UI implementation before Q-001/Q-002 are resolved, superseding the verified-content prerequisite for draft page construction only.

Use clearly labeled draft pages with empty states, no invented career facts and no synthetic fixture imports in application/build entries. An absent content dataset is null; supplied content must pass the existing publication validation guard. Draft static pages carry noindex,nofollow metadata; this is a crawler request, not access control.

Implement the approved ordinary-link/static-route strategy, resume, project catalogue and project detail components. Generate only known project URLs; with no data, there are no placeholder project entities. Explore is a status page until its later phase. Keep plain CSS, existing dependencies and static delivery. Contact stays pending, without a form or fabricated address. URL-safe project IDs are checked at static-route generation.

Replace the null dataset with reviewed content only after facts and disclosure permissions are supplied. No deployment, new service or later phase is authorized. Verify this phase and wait for manual review; leave it uncommitted.

## DEC-015 — Use the owner-supplied résumé

**Accepted, 2026-10-17.** The user supplied the DOCX location, asked to use it to fill content, and confirmed “these are my details you can use anything.” This authorizes the supplied career facts, employer/client names and contact details. It does not authorize deployment or newly invented project facts.

Preserve an unchanged DOCX copy as SRC-11 under docs/ for reproducible provenance. It governs supplied biographical facts; SRC-10 continues to govern compatible design requirements. Paragraph locators, fingerprint, normalization and inferred associations are recorded in areas/data.md and INDEX.md.

Use direct email, telephone, LinkedIn and portfolio links; add no contact form or service. Telephone URLs extend the existing contact boundary with number validation and focused tests. Omit the contradictory 39/23 platform count (Q-017). Missing project/early-career details remain visibly pending. EV/Java-game chapter assignments are explicitly provisional; the France chapter represents banking work while Mauritius remains the supplied base.

The dataset's approved marker records this owner permission, not independent fact checking. Keep presentation contentIsDraft true and noindex metadata until manual review and remaining content work. Do not treat this approval as review of the resulting Phase 3 UI; stop after verification.

## DEC-016 — Phase 4 internal 3D prototype

**Accepted, 2026-10-17.** After the Phase 3 handoff, the user instructed “ok begin phase 4.” This accepts advancing past Phase 3; it does not establish that previously unperformed browser checks passed. The user selected Chrome on average-spec hardware for review.

Implement the approved two-connected-chapter prototype: pure descriptors, bounded movement/collisions, project selection, wormhole travel with readiness/cancellation/recovery, reduced motion and independent HTML access. Select current/previous chapters by authored order (currently France/Abu Dhabi). Use procedural geometry and a proxy character before commissioned GLB/likeness assets.

Install pinned Three.js 0.186.1, React Three Fiber 9.8.2 and matching @types/three 0.186.0; Fiber's peer range supports existing React 19.3.1. Keep the renderer on demand. No Drei, physics engine, application state library, backend or asset service is added. Official compatibility: [Fiber installation](https://r3f.docs.pmnd.rs/getting-started/installation).

Module ownership, provisional budgets and verification strategy belong in [exploration](areas/exploration.md). Numeric targets are recommendations awaiting real hardware measurements under Q-007, not newly approved release requirements. Installed Chrome may be used for isolated headless behavior tests without downloads.

Preserve all source documents and existing Phase 3 work. Verify, leave changes uncommitted and wait for manual review. No Phase 5, commissioning, remote operation or deployment is authorized.

## DEC-017 — Phase 4 acceptance, local milestone and Phase 5

**Accepted, 2026-10-17.** The user instructed “good commit and being phase 5” after the Phase 4 handoff. Commit the reviewed work locally, including the preserved Phase 3 changes that had not received a separate commit. Do not rewrite the earlier Phase 2 milestone or configure a remote.

Proceed with the approved Phase 5 complete journey: all five authored chapters, chronological connections plus direct chapter choice, and Observatory as the global history/project/skills hub. Reuse validated content, pure descriptors and the existing renderer/controller boundaries. Prove add/reorder/remove behavior without location-specific engine edits.

Continue using clearly identified procedural stand-ins and owner-authorized content. Do not invent missing biography or future employment; future content stays explicitly pending. Licensed final art, GLB likeness/rig, commissioning, production performance sign-off and deployment remain later approvals. No new dependency or infrastructure is required by this step.

Verify Phase 5 and stop for manual review. This authorizes the current Phase 4 milestone commit, not an automatic Phase 5 commit.

## Change rule

Never silently replace a decision. Add rationale/provenance and a replacement ID when superseding one; update affected requirements, architecture, questions and graph together. Conversation provenance above is summarized because no chat transcript file exists in this repository.
