# Data and content contracts

Status: **recommended model**, derived from REQ-003–REQ-011. The repository contains no production dataset or schema implementation.

Sources: [SRC-01, Timeline/Project Systems, 20–65 and 152–199](../../docs/theworldibuild-01.txt); [SRC-09, World Data Model/Project Scalability, 41–100 and 172–202](../../docs/theworldibuild-09.txt); [SRC-10, Project System/Scalability](../../docs/theworldibuild-10.txt).

## Entities

| Entity | Minimum responsibilities |
|---|---|
| Portfolio | Identity, introduction, contact references, explicit currentPhaseId |
| Phase | Stable id, explicit order, title, dates, location, narrative, themeId, characterStateId |
| Experience | Stable id, phaseId, organization/role, responsibilities, skill/achievement associations |
| Project | Stable id, phaseId, optional experience association, title, type, importance, story/problem/solution, architecture, contribution, technologies, impact, media, links |
| Skill | Stable id, name and associations with phases/experiences/projects |
| Achievement | Stable id, description, supporting evidence and associations |
| CharacterState | Stable id and authored appearance, clothing, prop and animation references |
| WorldTemplate | Stable id, palette, walkable area, placement rules, station/camera anchors |
| AssetManifest | Stable asset identifiers mapped to model, animation, image and audio resources |

Do not infer dates, metrics or age from sample values. Exact date granularity and overlapping role behavior remain Q-009. Importance uses small/medium/major, as documented; project classification semantics remain Q-010.

## Relationships and interfaces

Portfolio references its current Phase. Each Phase has experiences, projects, achievements and skills. Projects link to evidence and optional experience context. Theme and character-state references resolve through the template/asset registries.

Recommended internal interfaces:

- Content validator: authored content -> validated model or actionable errors.
- World builder: validated model + template registry -> deterministic world descriptors.
- Experience controller: navigation intent -> loading/selection/transition state.
- Renderer: world descriptors + state + assets -> visible world; emits interaction events.
- Information UI: validated content + selection -> semantic HTML.

Landmark descriptors reference entity IDs; they never contain a second authoritative copy of resume/project prose. These are in-process contracts, not HTTP APIs.

## Build and data flow

Authored career content -> validation -> shared model -> static information pages and world descriptors -> browser scene loading.

Recommend source-controlled structured content initially. No runtime database, CMS or authentication is required by the approved release scope. A future editor would produce the same validated content contract rather than a second model.

Recommended validation checks:

- Unique stable IDs; valid references and explicit current phase.
- Unambiguous display order independent of ID and date strings.
- Required published content, known importance values and valid asset references.
- Media paths and generated internal URLs resolve.
- Draft examples cannot silently become published claims.

## Expansion and compatibility

Add/reorder/remove content without location-specific engine edits. Reordering preserves IDs and URLs. Deleting a phase must explicitly resolve its dependent content; do not silently reassign projects.

Keep runtime-selected IDs separate from array positions. New themes may reuse existing templates; new bespoke art requires production work. Visible content is bounded even when the catalogue grows.

A schema version should be introduced when persisted content contracts are implemented; exact wire shapes and migration policies are deferred until there is an actual dataset to migrate.
