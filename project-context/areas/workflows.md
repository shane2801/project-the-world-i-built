# Workflows

DEC-008 accepts the visitor interaction direction below. Detailed controller mechanics remain implementation guidance for later phases; none of the exploration workflows are implemented in Phase 1.

## Entry and information access

Sources: [SRC-10, Opening Experience/Resume Mode](../../docs/theworldibuild-10.txt); [SRC-08, Resume Mode/Accessibility Rule](../../docs/theworldibuild-08.txt).

1. Serve readable identity and immediate Resume, Projects and Contact controls.
2. Offer exploration and load 3D separately from core information.
3. Run the space-to-current-chapter opening only with an immediately available skip option.
4. Honor reduced motion; information-only viewing never depends on cinematics.
5. Open direct resume/project URLs without requiring walking or visiting a station.

Under DEC-008, the documented 60-second sequence is creative direction, not a mandatory delay. Default phone experience is complete information access; optional lightweight 3D may be enabled after benchmarking.

## Explore and inspect

Sources: [SRC-07, Project Discovery/Detail View](../../docs/theworldibuild-07.txt); [SRC-08, Three Information Layers/Navigation UI](../../docs/theworldibuild-08.txt).

- Show planet overview and direct chapter choices with current position.
- In a chapter, support keyboard movement and pointer selection; provide HTML controls equivalent to spatial actions.
- Show concise discovery labels, an experience panel, then requested technical/evidence detail.
- Pause walking input while a panel owns focus; support Escape/close and restore focus.
- In exploration, preserve the world around details. Direct information pages remain independently usable.
- Observatory aggregates shared timeline, projects and skills; future content is labeled aspirational.

## Travel

Source: [SRC-04, Travel Sequence, lines 81–160](../../docs/theworldibuild-04.txt).

Recommended controller states: idle -> loading destination -> transitioning -> idle, with a recoverable loading failure.

1. Resolve destination and preload its assets before committing active phase.
2. Disable duplicate travel requests while travel is pending.
3. Coordinate activation, memories, character preset changes and arrival.
4. Commit destination and restore controls only when usable.
5. If loading fails, retain the current usable view and offer retry/direct content.
6. If rendering fails entirely, preserve accessible information access.

Accepted under DEC-008: permit direct nonadjacent chapter selection while showing chronological connections. Reduced-motion travel skips decorative transformations. Do not keep five full chapter scenes resident solely to imply continuity.

## Implementation discipline

Accepted under DEC-009/DEC-010.

1. Read AGENTS.md and the index, then load only the phase-relevant context.
2. Inspect code/tooling and completed work; identify blockers and maintain a dependency-ordered roadmap.
3. Before edits, state objective, scope, affected files and acceptance criteria. Ask before unresolved material architectural choices.
4. Keep changes coherent and feature-owned. Preserve originals, reuse working code, and justify dependencies/abstractions.
5. Comment non-obvious intent, invariants and trade-offs for human readers. Prefer clear names over comments describing obvious statements.
6. Run relevant lint/type/build/tests; distinguish executed results from manual/browser checks still needed.
7. Update context/graph for material approved changes, leave a usable state, and stop for manual review before the next phase.

Current step: organization only. Do not begin career data/domain work or install future test/rendering libraries without the next authorized phase.

## Content maintenance

Sources: [SRC-09, Core Principle/Phase Ordering](../../docs/theworldibuild-09.txt).

- Edit structured career content; validate IDs, references, publication state and media.
- Rebuild information pages and world descriptors from the same model.
- Add/reorder/remove a sample phase and project to prove the engine is data-driven.
- Follow DEC-009: implement one authorized phase, verify it, and wait for review before the next phase. Publishing requires separate approval.

## Context maintenance

This is the context-system operating procedure authorized by DEC-006.

1. Start with [INDEX.md](../INDEX.md); load only relevant topic files.
2. Compare the docs/ file inventory and SHA-256 fingerprints with the manifest. This is a filesystem check, not a model-context reread.
3. For drift, identify changed/added/deleted sources. Mark affected context stale and read changed sources plus necessary related excerpts.
4. Apply authority from DEC-001. Record competing claims with both source locators and affected IDs; do not silently reconcile.
5. Update the owning summary/topic, decision record and question status. Update [GRAPH.mmd](../GRAPH.mmd) if relationships changed: reuse stable concept IDs, preserve source-backed versus proposed group labels, and check each edge against its owning topic. Do not imply that unresolved decisions are accepted.
6. Refresh fingerprints only after reconciliation. Preserve stable IDs and record supersession.
7. Check relative links, source references, ID definitions and source inventory coverage. Check Mermaid syntax with an already available parser/renderer; if unavailable, perform a static structure/edge review and disclose that rendering was not verified. Confirm graph components and decision statuses agree with the architecture. Never copy complete source documents into summaries.

If drift cannot be checked, disclose that limitation rather than claiming freshness. Split growing topics only when repeated task loading warrants it; link moved material instead of retaining duplicate prose.
