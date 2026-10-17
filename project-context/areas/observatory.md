# Observatory context

Status: Phase 5 procedural journey under DEC-017. CON-008 / REQ-010 comes from [SRC-10, Home Base, lines 463–491](../../docs/theworldibuild-10.txt). It is a global headquarters, separate from career phases.

## Routes and ownership

- /observatory/ is an independently prerendered HTML page, usable without 3D/JavaScript.
- /explore/?view=observatory selects the same hub inside exploration after hydration. It never creates an employer, phase or current-career claim.
- features/observatory owns rooms.ts, ObservatoryHub, SkillConstellation, ObservatoryPage and scoped styles. Both route and exploration reuse the same hub.
- App composes the static route; explore's controller owns the in-world view/history. ObservatoryScene is a procedural proxy with four room markers and chapter beacons; room intent focuses the corresponding HTML heading.
- Timeline/project components are reused from their owning features; all facts still come from validated portfolio content. ProjectCard supports nested h3 headings in the gallery.

## Four rooms

| Room | Data and behavior |
|---|---|
| Timeline Room | All ordered phases, experiences, achievements and skills via the existing CareerTimeline; authored periods may overlap |
| Project Gallery | Complete project catalogue independent of the visible landmark cap; ordinary static project links |
| Skill Constellation | Skill-to-chapter links from explicit phase/experience/project references; unassociated skills stay labeled, no inferred proficiency |
| Future Room | Aspirational empty state until the owner supplies goals; no invented employer or future role |

Known source-content gaps stay in [data](data.md#src-11-resume-provenance-and-remaining-detail) and Q-001/Q-017. New screenshots, future facts and real artwork need their own evidence/approval; supplied résumé permission does not manufacture them.

## Verification and maintenance

Build tests cover static room IDs, complete shared content, empty states, authored skill associations and all chapter links. Browser tests cover the hub scene, direct URL/reload, room navigation, return to chapters and graphics failure/retry without leaving the hub.

When approved content changes, validate it once and rebuild both presentations. New/reordered/removed chapters flow into the timeline, navigation and scene beacons automatically; no room-specific career copy or engine location checks are needed. Keep the hub as a view, not a synthetic phase. Production art, hardware/network benchmarks and publication remain later work.

The standalone page now includes a decorative responsive generated banner under DEC-018; [asset provenance](../../assets/artwork/README.md) owns its prompts and source files. The in-world hub continues to use procedural geometry. Readable room content does not depend on either illustration or graphics.
