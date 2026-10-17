# Context index

Read only relevant destinations. Source review: 2026-10-17. All ten source files were inspected. DEC-007/DEC-008 are accepted; Phase 1 is complete. The user approved the DEC-010 organization step and Phase 1 milestone; DEC-011 authorizes local Git initialization and the Phase 1 commit only. Phase 2 core data/domain (DEC-012) is complete and approved. DEC-013 authorizes its local commit and Phase 3; UI work awaits resolution of the verified-content prerequisite. See the architecture for current implementation status.

| Task | Load |
|---|---|
| Run and verify the foundation | [Setup instructions](../README.md) |
| Understand goals and requirements | [Summary](SUMMARY.md) |
| Module ownership and growth | [Feature organization](ARCHITECTURE.md#feature-organization-and-growth) |
| Components, stack, delivery stages | [Architecture](ARCHITECTURE.md) |
| Concepts and region identities | [Domain](areas/domain.md) |
| Review Phase 2 contracts and tests | [Data contracts](areas/data.md) |
| Entities, relationships, validation | [Data](areas/data.md) |
| Visitor journeys and maintenance | [Workflows](areas/workflows.md) |
| Authority and accepted choices | [Decisions](DECISIONS.md) |
| Missing facts and conflicts | [Open questions](OPEN_QUESTIONS.md) |
| Context and component relationships | [Mermaid graph](GRAPH.mmd) |

## Source manifest

`SRC-NN` identifies the corresponding unchanged source. Links resolve from this index. Section titles are primary locators; line references describe this baseline.

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

## Verification snapshot

Context-only audit, 2026-10-17: 20 expected files; all ten source SHA-256 fingerprints unchanged; inventory and topic citations cover 10/10 sources; 86 local links, six anchors and 45 stable IDs resolve; all 12 requirements map to architecture constraints. AGENTS.md is 197 words.

GRAPH.mmd passed static checks for its flowchart subset: three balanced subgraphs, declared references and 48 edges. Official Mermaid parsing, rendered layout and external-link availability were not verified. No Mermaid parser/CLI is installed; no dependencies were installed. Application tests are not applicable because no application was implemented. This snapshot describes this audit, not future freshness; use the maintenance procedure after changes.

## Current implementation verification

Phase 1, 2026-10-17: npm installation succeeded with 118 installed packages and zero audit findings at install time; npm ls reported compatible top-level dependencies. npm run check passed ESLint, strict TypeScript, client/SSR builds, static HTML rendering and all three Node smoke tests (development startup, readable production HTML and production JS/CSS serving). Test servers were closed.

The Sites install helper could not resolve npm correctly on this Windows host; npm.cmd install succeeded using the same pinned manifest. Browser rendering, client hydration, visual/accessibility QA and official Mermaid rendering remain unverified; no browser tooling was installed. No deployment occurred. Source-hash and context-link checks are recorded in the phase handoff.

## Organization verification

DEC-010, 2026-10-17: npm run check passed lint, strict types, client/static-render builds and all three existing smoke tests. The rendered React markup exactly matches the pre-extraction fingerprint. A static CSS comparison preserved all 29 original rules and 106 declaration values after resolving shared tokens, including responsive and forced-colors rules. package.json/package-lock.json are unchanged; no packages were installed. Browser visuals/hydration and official Mermaid rendering remain unverified. The user subsequently approved this milestone; wait for a separate instruction before Phase 2.

## Phase 2 verification

DEC-012, 2026-10-17: the final npm run check passed lint, strict TypeScript, 32 domain tests, client/static-render builds and all three foundation smoke tests. Tests cover unknown-input diagnostics, IDs/references, explicit order and overlapping labels, independent tags/presentation, publication review, safe links, add/remove/reorder behavior and immutable queries. The home markup, dependency versions and package-lock.json are unchanged. No packages, production data, UI workflow, database or remote service were added. Browser hydration/visual QA and official Mermaid rendering remain unverified. The user subsequently approved Phase 2 and requested its commit and Phase 3 (DEC-013). All ten source fingerprints were rechecked unchanged before commit; Phase 3 UI work awaits its content prerequisite.
