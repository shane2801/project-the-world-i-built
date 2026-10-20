# Project summary

## Goal and audience

**The World I Built** is a premium browser-based 3D portfolio that turns a software engineer's career into an explorable symbolic planet. Recruiters should understand the person's work quickly and may explore the story in depth.

**Inference from source wording:** “70% information, 30% magic” expresses a qualitative priority: animation supports useful career information. It is not a numerical layout or testing requirement. [SRC-10, Information System, lines 423–447](../docs/theworldibuild-10.txt); [SRC-01, Design Priority, lines 273–292](../docs/theworldibuild-01.txt).

## Source-backed requirements

These confirm documented design intent, not the accuracy of biographical examples.

| ID | Requirement | Provenance |
|---|---|---|
| REQ-001 | Open from a browser link without installation | [SRC-10, Platform, 22–35](../docs/theworldibuild-10.txt) |
| REQ-002 | Represent career phases as symbolic continents, not geographic Earth | [SRC-10, Planet Concept/Timeline System, 61–128](../docs/theworldibuild-10.txt) |
| REQ-003 | Initial journey contains Mauritius, Birmingham, Freelance, Abu Dhabi and France | [SRC-10, Career Continents, 260–369](../docs/theworldibuild-10.txt) |
| REQ-004 | Visitor controls the same recognizable person evolving across phases | [SRC-10, Character System/Evolution, 162–224](../docs/theworldibuild-10.txt) |
| REQ-005 | Wormholes connect phases with environment and character transformation | [SRC-10, Wormhole Travel System, 129–160](../docs/theworldibuild-10.txt) |
| REQ-006 | Cinematic opening starts in space and lands on the current chapter | [SRC-10, Opening Experience, 225–258](../docs/theworldibuild-10.txt) |
| REQ-007 | Projects appear as physical objects with importance-based scale and technical evidence | [SRC-10, Project System/Scaling, 371–421](../docs/theworldibuild-10.txt) |
| REQ-008 | Provide discovery, experience and deep-dive information layers | [SRC-10, Information System, 423–447](../docs/theworldibuild-10.txt) |
| REQ-009 | Traditional resume and direct information access remain available | [SRC-10, Resume Mode, 449–461](../docs/theworldibuild-10.txt); [SRC-07, Project Discovery, 157–193](../docs/theworldibuild-07.txt) |
| REQ-010 | Observatory offers career history, project gallery, skills and future chapters | [SRC-10, Home Base, 463–491](../docs/theworldibuild-10.txt) |
| REQ-011 | Structured content drives expansion without hardcoded location-specific stories | [SRC-10, Scalability, 493–512](../docs/theworldibuild-10.txt); [SRC-09, Core Principle/Phase Ordering, 26–39, 134–170](../docs/theworldibuild-09.txt) |
| REQ-012 | Every magical element has a clear information equivalent | [SRC-08, Accessibility Rule, 223–233](../docs/theworldibuild-08.txt) |

## Release boundary

Accepted scope is recorded in [DEC-002 through DEC-005](DECISIONS.md): all five chapters at launch; adaptive device support; prototype before commissioned art; no journal or admin dashboard initially.

Approved React/Vite/TypeScript/Three.js architecture now supports owner-authorized resume/project pages, all five procedural chapters, Observatory, generated decorative illustrations and recoverable graphics loading. Technology and content permissions come from accepted decisions, not from source examples.

DEC-021 keeps the project in development and defers delivery. The current static visual/world-interaction increment is owned by [visual design](areas/visual-design.md). Final likeness/rig, richer environments/cinematics, project evidence and hardware/accessibility review remain unfinished. Missing source facts and disputed figures stay labeled or omitted under Q-001/Q-017. See [architecture status](ARCHITECTURE.md#status-and-boundaries) and [open questions](OPEN_QUESTIONS.md).

DEC-023 refines the DEC-022 resume-first entry into an interactive resume with local motion/artwork preferences and a simulated chat. [Visual design](areas/visual-design.md#resume-first-static-interface) owns current behavior; [data](areas/data.md#owner-message-content-overrides) records explicit owner updates to identity, education and contacts. The disconnected home and world chronology are preserved. This development checkpoint has no fresh test-suite run; Q-018 tracks verification before release.
