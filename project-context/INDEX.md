# Context index

Load only the task-relevant destinations below. All ten design texts and the supplied résumé were reviewed on 2026-10-17; verify fingerprints before trusting freshness. Phase 5 is committed as 2fb2705; approved artwork as 46475a2. DEC-019 advances Phase 6 recovery/quality. Authority and content permissions remain DEC-001/DEC-015.

| Task | Load |
|---|---|
| Run, test and manually review the application | [Setup instructions](../README.md) |
| Understand goals and requirements | [Summary](SUMMARY.md) |
| Module ownership and growth | [Feature organization](ARCHITECTURE.md#feature-organization-and-growth) |
| Components, stack, delivery stages | [Architecture](ARCHITECTURE.md) |
| Concepts and region identities | [Domain](areas/domain.md) |
| Review Phase 2 contracts and tests | [Data contracts](areas/data.md) |
| Entities, relationships, validation | [Data](areas/data.md) |
| Full journey, travel and performance | [Exploration](areas/exploration.md) |
| Generated artwork, prompts and derivatives | [Asset provenance](../assets/artwork/README.md) |
| Observatory rooms, shared content and hub view | [Observatory](areas/observatory.md) |
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

## Current handoff - Phase 6 recovery review

Artwork is accepted and committed as 46475a2 under DEC-019; Phase 5 is 2fb2705. The next Phase 6 quality step bounds renderer import and destination readiness, and adds explicit travel cancellation. [Exploration recovery](areas/exploration.md#phase-6-stalled-loading-recovery) owns the behavior. Changes remain uncommitted for manual review.

Verification, 2026-10-17: npm run check passed lint, strict TypeScript, client/SSR builds and 71 tests (33 domain, four routes, 20 exploration/recovery, four HTTP/assets, four portfolio, six explorer/Observatory build). Ten static pages generated. Installed-Chrome software-WebGL checks passed the existing artwork, all-chapter, history, focus, reduced-motion, phone and failure scenarios, plus actual stalled-request cancellation, late completion, 20-second timeout fallback and retry. Final lint was rerun after browser/reducer test edits.

No dependencies, source documents, artwork or career facts changed in this quality step. Real GPU/network performance, exhaustive assistive-technology QA and likeness/GLB remain Q-003/Q-007. Known content gaps remain Q-001/Q-017. The existing lazy renderer remains about 244 kB gzip with a Vite uncompressed-chunk warning.

Source/hash, context link/ID, import-cycle and static Mermaid audits are recorded at this checkpoint. Official Mermaid rendering remains unperformed. Run npm run dev and use the [recovery review](../README.md#phase-6-recovery-review). Delivery documentation follows this manual review; no deployment is authorized.
