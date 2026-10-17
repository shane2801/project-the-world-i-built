# Context index

Read only relevant destinations. Source review: 2026-10-17. All ten design texts and the supplied résumé were inspected. DEC-007/DEC-008 are accepted; Phase 1 is complete. The user approved the DEC-010 organization step and Phase 1 milestone; DEC-011 authorizes local Git initialization and the Phase 1 commit only. Phase 2 core data/domain (DEC-012) is complete and approved. DEC-013 authorized its local commit (cec5ae0). DEC-014 approved draft pages; DEC-015 authorizes the owner-supplied résumé content. The user approved the Phase 4 milestone and authorized its local commit and Phase 5 under DEC-017. See the architecture for current implementation status.

| Task | Load |
|---|---|
| Run, test and manually review the application | [Setup instructions](../README.md) |
| Understand goals and requirements | [Summary](SUMMARY.md) |
| Module ownership and growth | [Feature organization](ARCHITECTURE.md#feature-organization-and-growth) |
| Components, stack, delivery stages | [Architecture](ARCHITECTURE.md) |
| Concepts and region identities | [Domain](areas/domain.md) |
| Review Phase 2 contracts and tests | [Data contracts](areas/data.md) |
| Entities, relationships, validation | [Data](areas/data.md) |
| Two-chapter prototype, travel and performance | [Exploration](areas/exploration.md) |
| Visitor journeys and maintenance | [Workflows](areas/workflows.md) |
| Authority and accepted choices | [Decisions](DECISIONS.md) |
| Missing facts and conflicts | [Open questions](OPEN_QUESTIONS.md) |
| Context and component relationships | [Mermaid graph](GRAPH.mmd) |

## Source manifest

`SRC-NN` identifies each preserved source. Links resolve from this index. Section titles are primary locators; line references describe this baseline.

| ID | Source | Lines | Subject |
|---|---|---:|---|
| SRC-01 | [01](../docs/theworldibuild-01.txt) | 340 | Core principles and initial structures |
| SRC-02 | [02](../docs/theworldibuild-02.txt) | 599 | Expanded world vision |
| SRC-03 | [03](../docs/theworldibuild-03.txt) | 214 | Opening minute |
| SRC-04 | [04](../docs/theworldibuild-04.txt) | 236 | Wormhole travel |
| SRC-05 | [05](../docs/theworldibuild-05.txt) | 262 | Character design |
| SRC-06 | [06](../docs/theworldibuild-06.txt) | 344 | Phase environments |
| SRC-07 | [07](../docs/theworldibuild-07.txt) | 329 | Projects |
| SRC-08 | [08](../docs/theworldibuild-08.txt) | 275 | Information and accessibility |
| SRC-09 | [09](../docs/theworldibuild-09.txt) | 328 | Scalability |
| SRC-10 | [10](../docs/theworldibuild-10.txt) | 529 | Master specification |
| SRC-11 | [Owner résumé](../docs/KAVISH%20MUTHOORA.docx) | 123 XML paragraphs | Career facts supplied and authorized by owner |

SHA-256, keyed by source number:

```text
01 26CC2ED646253540A9FFBCE0162C2995AB6BA153309EB742E2342F5AB8DDA499
02 2AF7FC357FD86797BB086D35A4E6395CB9263FCF381A99D7F9C368686FB4468A
03 AFC8641A470FBB0A53FDA8F958BF56924191DF8E17D4BAF9867CB3B7BACCCC1A
04 19EB315466700F0A5C55A57BBAFA2D12A87633091FF719E496BAFF5BFE35BDE9
05 59D974117BA9E60EB01341B0F1D554B2725BD4551B9E37E47298CAECF2259842
06 618A36CC99603AB1ABE7B43A5DF50A8F50AD9895B112FD0DD9694D06BB8A4CAD
07 7779F52C11B475D5C12CCFE341BD9EBA64FE228BC2590E62953E95C374E5E634
08 9DED2FAD3AF329C17467D8A283404935CC23220DC378B548814FA818467DF9C7
09 78589DE601C5A6C401C9D308E749E74A08F43199E2BDBFB8C52E590C8BC9099B
10 6047EE2F6081F64CB852674EC1F481E1510E8C10514C30F1828EC205D614D1CF
```

Use identifiers `REQ-NNN`, `DEC-NNN`, `Q-NNN`, and `CON-NNN` without renumbering existing entries. Accepted authority is [DEC-001](DECISIONS.md#dec-001--source-authority). Drift procedure: [maintenance](areas/workflows.md#context-maintenance).

Baseline reconciliation: during creation, SRC-01 gained a leading CRLF outside the documentation-writing operations (4,553 -> 4,555 bytes). Hashing bytes after that leading CRLF reproduces its original discovery fingerprint, proving no other byte changed. The current file is preserved; its fingerprint and line locators above reflect the reviewed 340-line version. Other sources retain their discovery fingerprints.

## Supplied résumé source

SRC-11 is an unchanged copy of the user-selected C:/Users/kavish.muthoora/Downloads/stuff/KAVISH MUTHOORA.docx, preserved under docs/ with SHA-256 E1346E0DCD050409B91B7A551B7E7593ED941C533E006E0B7DBCAA5B2B81735D. It adds one DOCX to the original ten design texts; it does not replace or modify them. Check its fingerprint alongside the ten text fingerprints above. DEC-015 records use permission; paragraph locators and field provenance belong in [data](areas/data.md#src-11-resume-provenance-and-remaining-detail). Original external source and repository copy have identical bytes.

## Phase 4 handoff

DEC-016 delivered the internal two-chapter prototype; Phase 3 work is preserved. DEC-017 accepts this milestone, authorizes its local commit and advances to Phase 5. Commissioning and deployment remain unauthorized. The user selected Chrome on average-spec hardware; exact GPU/network and final budgets remain Q-007.

Final verification, 2026-10-17: npm run check passed lint, strict TypeScript, client/SSR builds and 58 tests (33 domain, four routes, 12 world/movement/travel/URL, three HTTP, four portfolio, two explorer-build). Nine static pages remain readable without WebGL. npm ls --depth=0 passed; installation reported zero audit findings. Three.js/Fiber/type declarations and lockfile were updated under DEC-016.

Installed Chrome 155.0.8059.84 passed isolated headless software-WebGL checks for hydration, lazy activation, introduction skip, movement key events, project focus/Escape, travel/history, reduced motion, context loss/retry, phone layout and blocked-renderer fallback. Test-owned browsers, servers and temporary profiles were closed/removed. One chapter screenshot was inspected.

The renderer is about 244 kB gzip, within the provisional 350 KiB budget. Vite warns about its approximately 918 kB uncompressed chunk; it is deliberately loaded on demand and not preloaded by the home page. Real GPU/network benchmarks, exhaustive visual/assistive-technology QA and official Mermaid rendering remain unverified. See the prototype's [review procedure](areas/exploration.md#validation-and-review) and [provisional targets](areas/exploration.md#provisional-performance-targets).

Context audit: all eleven source fingerprints match; local links/anchors and stable IDs resolve; production imports contain no synthetic fixtures; module imports are acyclic; Mermaid passed static structure/edge checks. AGENTS.md remains below 200 words. Historical milestone implementation details remain in ARCHITECTURE.md/DECISIONS.md and Git history; this index records the current handoff to stay compact.
