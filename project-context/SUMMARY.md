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

DEC-007 and DEC-008 are now accepted by explicit user approval. Phase 1 established the foundation. Phase 3 provides information workflows; Phase 4 prototyped two connected 3D chapters; Phase 5 extends all five and Observatory under DEC-017. DEC-012 adds pure domain contracts/validation/queries and synthetic tests in Phase 2. DEC-014 adds accessible draft resume/project pages; DEC-015 supplies owner-authorized résumé content while detailed gaps remain labeled. Technology choices come from user approval, not the original source documents. See [architecture status](ARCHITECTURE.md#status-and-boundaries).

SRC-11 now supplies owner-authorized career content. Complete project evidence/details, disputed banking figures, assets, budget and deployment details remain pending. Source examples must not be published as facts; see [Q-001](OPEN_QUESTIONS.md#q-001--verified-content).
