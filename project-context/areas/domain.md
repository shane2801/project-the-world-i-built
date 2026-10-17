# Domain context

Status: source-backed vocabulary with explicitly labeled modeling recommendations. Requirement IDs are owned by [SUMMARY.md](../SUMMARY.md).

## Concepts

| ID | Concept | Meaning and provenance |
|---|---|---|
| CON-001 | Planet | Symbolic complete career world, not Earth; REQ-002 |
| CON-002 | Phase / chapter / continent | Career segment with location, period, theme, character and content; [SRC-09, World Data Model/Phase System, 41–100](../../docs/theworldibuild-09.txt) |
| CON-003 | Experience / city | Role or experience represented within the world; [SRC-02, World Concept, 34–40](../../docs/theworldibuild-02.txt) |
| CON-004 | Project | Work explained through story, engineering and evidence; [SRC-07, Project Hierarchy/Detail View, 31–47, 195–229](../../docs/theworldibuild-07.txt) |
| CON-005 | Landmark / artifact | Physical representation of content; project importance affects scale; REQ-007 |
| CON-006 | Character state | Recognizable owner's appearance, posture, clothing, equipment and actions for a phase; REQ-004; [SRC-05, Character Concept/Face Evolution, 15–25 and 190–206](../../docs/theworldibuild-05.txt) |
| CON-007 | Wormhole / station | Chapter transition conveying time and transformation; REQ-005 |
| CON-008 | Observatory | Global headquarters for history, work, skills and future; REQ-010 |
| CON-009 | Skill / achievement | Career capabilities and evidence; [SRC-09, Achievement/Skill Systems, 204–249](../../docs/theworldibuild-09.txt) |

**Modeling recommendation:** keep a phase distinct from an experience so a chapter can contain multiple roles. A landmark references content rather than duplicating it. Projects may be software, AI, client work or open source, but these descriptions can overlap; exclusive category semantics are not source-confirmed.

## Initial region identities

Source-backed design direction: [SRC-10, Career Continents, lines 260–369](../../docs/theworldibuild-10.txt). More detailed environments: [SRC-06, Continents / Phase Worlds](../../docs/theworldibuild-06.txt).

| Phase | Identity | Environment | Character direction |
|---|---|---|---|
| Mauritius | Foundation Island; curiosity and ambition | Symbolic tropical school/knowledge environment | Teenager |
| Birmingham | Developer Valley; learning and building | University, labs, workshops | Student developer |
| Freelance | Connected World; building across borders | Connected floating client islands | Early professional |
| Abu Dhabi | Intelligence City; entering AI | Futuristic AI systems and machines | AI engineer |
| France | Enterprise Capital; scale and maturity | Modern European engineering city | Current engineer in source narrative |

Royal College Curepipe and the client-country examples occur in the narrative; their publication as biographical facts still requires verification. France being current is a source statement, not independently verified present-day status.

## Representation rules

Source-backed: major projects are landmarks, medium projects are buildings, and small projects are artifacts. Each includes problem, solution, architecture, technologies, contribution, impact, media and links. [SRC-10, Project System/Scaling, 371–421](../../docs/theworldibuild-10.txt).

Recommended: reuse templates with curated palettes and props. Generate arrangement from data; do not promise bespoke artwork automatically from career text. The technology tree and skills-as-artifacts are compatible presentation suggestions, not additional mandatory navigation systems.

Open naming and hierarchy tensions: [conflicts](../OPEN_QUESTIONS.md#design-tensions-and-conflicts).
