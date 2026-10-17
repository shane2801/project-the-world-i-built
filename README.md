# The World I Built

A data-driven, browser-based career portfolio. **Current milestone: Phase 5 complete journey with procedural artwork.** Résumé and project pages use owner-supplied content; missing details remain explicit and all five chapters and the Observatory are available with procedural artwork.

## Prerequisites

- Node.js 24 LTS, at least 24.14.1; the verified version is recorded in [.node-version](.node-version).
- npm 11 (verified with 11.11.0).
- No environment variables, credentials or backend services are required for this phase.

## Install and run

Run these commands from this directory:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. The server binds to loopback only. Stop it with Ctrl+C. If a port is occupied, explicitly select another with `npm run dev -- --port 5174`.

On PowerShell, use `npm.cmd` instead of `npm` if script execution policy blocks npm.ps1.

## Verify and preview

```sh
npm run check
npm run preview
```

Open http://127.0.0.1:4173 for the production preview. `npm run check` runs linting, the production build (including strict TypeScript checking), the domain tests, and Node tests for routes, rendered portfolio pages, static links, development startup and production asset serving.

Individual commands: `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test:domain`, `npm run test:routes`, `npm run test:portfolio`, and `npm run test:smoke` (requires an existing build). `npm test` runs domain/route tests, then rebuilds before HTTP and rendered-page checks.

The build creates browser assets in `dist/`, a temporary build-time React renderer in `.prerender/`, and writes static HTML for `/`, `/resume/`, `/projects/`, `/explore/`, `/observatory/`, approved project details and `404.html`. Only `dist/` is a deployment artifact. No runtime server or client-side JavaScript is needed to read the production shell. Browser hydration and visual/accessibility behavior require browser QA beyond these HTTP smoke tests.

## Layout and scope

- `src/app/`: application composition; `main.tsx` and `entry-server.tsx` remain thin entry points.
- `src/components/layout/`: shared header, skip link and main landmark.
- `src/features/home/`: home page, decorative illustration and feature styles.
- `src/styles/`: shared design tokens and global/accessibility styles.
- `src/domain/career/`: pure contracts, unknown-input validation, queries and colocated tests; no React dependency.
- Domain `__fixtures__/` contains synthetic test content only. It is never imported by application/build entries.
- `src/features/resume/` and `projects/`: accessible pages and focused content components.
- `src/content/portfolio.ts`: owner-supplied résumé content; the loader rejects unapproved or invalid data.
- `src/app/routes.ts`: shared pathname resolution; ordinary links need no router package.
- `src/features/explore/`: pure world/movement/travel logic, HTML controls and an on-demand Three.js/Fiber renderer.
- `scripts/`: static rendering and foundation smoke tests.
- `docs/`: original design documents; preserve unchanged.
- [project-context/INDEX.md](project-context/INDEX.md): architecture, requirements, decisions, source fingerprints and the phased roadmap.

Dependencies are pinned in package.json and package-lock.json. Use `npm ci` for reproducible installs. Three.js/React Three Fiber are pinned for Phase 4; production artwork/GLB tooling remains deferred. Phase 1 is maintained in a local Git repository; no remote or publishing is configured.

The user approved Phases 1 and 2; Phase 2 is committed as cec5ae0. DEC-014 approves draft pages; DEC-015 authorizes content from the supplied résumé. Run `npm run test:domain` to review behavior and inspect [the data contract](project-context/areas/data.md). The dataset is owner-authorized, not independently fact-checked; publication validation cannot verify biography. Verified career content, later workflows, artwork and deployment remain separate milestones; nothing has been published.

## Phase 3 manual review

After `npm run check`, run `npm run preview` and visit:

- http://127.0.0.1:4173/ — existing visual direction, owner identity, draft notice and working navigation.
- http://127.0.0.1:4173/resume/ — career chapters, skills, education and approved contact links.
- http://127.0.0.1:4173/projects/ — four résumé projects with missing details clearly marked.
- http://127.0.0.1:4173/explore/ — all-chapter procedural exploration.
- http://127.0.0.1:4173/404.html — useful missing-page fallback.

Check direct reloads, back/forward navigation, narrow screens, Tab/Shift+Tab, visible focus and the skip link. Disable JavaScript and confirm the generated information pages remain readable. Test /projects/ev-charger-management/, /projects/accommodation-management/, /projects/ai-healthcare-analytics/ and /projects/java-multiplayer-game/ directly and after reload. Provisional chapter placements and missing details remain labeled. Empty states and fictional fixtures are exercised only by tests.

Maintain src/content/portfolio.ts using owner-reviewed data matching the [data contract](project-context/areas/data.md). The owner's permission is recorded in DEC-015; malformed or unapproved data fails the build. Keep contentIsDraft true until this phase's incomplete content and presentation are reviewed. Project IDs used in URLs must start with a letter/digit and contain only letters, digits, underscores or hyphens. Supply licensed accessible evidence, including captions/transcripts for any real video, before publication.

The eventual static host must serve generated directory index files and map missing paths to 404.html with a 404 status. Vite preview is a local test server, not the hosting configuration; it may fall back to the root for arbitrary missing paths. Verify this behavior when Q-005 is settled. Draft noindex metadata is not access control.

Phase 4 is committed as 606cdb3. The user authorized Phase 5 under DEC-017; it awaits manual review without an automatic commit.

## Phase 4 manual review (Chrome)

After `npm run check`, run `npm run preview` and open http://127.0.0.1:4173/explore/ on desktop.

1. Enable 3D. The renderer should load on demand and bring the scene into view. Choose a chapter from the overview or skip the introduction.
2. Walk with WASD/arrows while the scene has focus; Tab must leave it. Check bounds and collisions. Approach the ring and press E, or use the chapter buttons to travel between France and Abu Dhabi.
3. Click a landmark or Inspect project. Verify heading focus, paused walking, full detail links, Escape/close and return focus.
4. Check both directions of travel, overview, browser back/forward, direct reload and a shared URL such as /explore/?phase=france&project=ev-charger-management.
5. Toggle Reduce motion and try Chrome's emulated system preference. Skipping the opening must not change the motion preference.
6. Resize to phone width: no canvas should remain, and career/project links must still work. Disable JavaScript and confirm the static information remains readable.
7. Test recovery: use DevTools request blocking for *PrototypeScene-* after a fresh reload, then enable 3D. Information must remain usable. To test context loss after starting 3D, run `document.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext()` in DevTools. Retry must recreate graphics while retaining the logical chapter.
8. Open the performance counters and walk/travel repeatedly. Record desktop/GPU, Chrome version, resolution, network, FPS, calls, triangles and allocation growth. The [provisional targets](project-context/areas/exploration.md#provisional-performance-targets) still require real hardware measurements.

Optional automated browser check: `npm run test:browser` (requires an existing production build and installed Chrome; set CHROME_PATH if its location differs). It uses an isolated temporary profile and software WebGL, then closes its browser/server and removes the profile. No browser download or testing package is required. This verifies behavior, not average-hardware FPS or final artwork.

Phase 4 introduced two connected chapter proxies and was committed as 606cdb3. Phase 5 expands all five plus the Observatory; production GLB character/art, rich cinematics and final benchmarks remain later phases.

## Phase 5 manual review (Chrome)

Run `npm run preview` after a successful `npm run check`, then review:

- http://127.0.0.1:4173/explore/ — five chapter choices, distinct procedural themes, one active scene.
- http://127.0.0.1:4173/observatory/ — all four rooms without requiring 3D or JavaScript.
- http://127.0.0.1:4173/explore/?view=observatory — direct hub selection and reload; graphics still require explicit activation.

Visit Mauritius, Birmingham, Freelance, Abu Dhabi and France in both chronological and direct nonadjacent order. Check each chapter's first/last neighbor behavior: the left ring goes to the previous chapter, the right ring to the next, and neither end wraps. WASD/arrows, E, Tab, project focus/Escape, reduced motion and renderer retry should continue to work.

Open the Observatory from the overview or controls. Click room markers or HTML room links, then verify the complete timeline/gallery, authored skill-to-chapter links and explicitly empty Future Room. Confirm missing Mauritius/project details remain pending. Test history/back, shared URLs, phone width, no-JavaScript information access and graphics loss/retry while inside the hub.

`npm run test:browser` now exercises all five scenes, chronological navigation, hub routes/room anchors and hub graphics recovery. It uses software rendering, so record real desktop/GPU/network results separately against the [provisional targets](project-context/areas/exploration.md#provisional-performance-targets).

Phase 4 is committed as 606cdb3. Phase 5 is left uncommitted for your manual review; Phase 6, commissioning and deployment require separate instruction.

## Phase 6 artwork review

Run npm run dev and review the home illustration and Observatory banner on desktop and phone widths. Confirm the symbolic imagery fits the theme. In DevTools, block /assets/artwork/* and reload: the home CSS planet remains; all information links and Observatory rooms remain readable. Artwork has no essential text, is hidden from assistive technologies, and is hidden in forced-colors/print modes. Exact prompts, preserved originals, variants and maintenance instructions are in [asset provenance](assets/artwork/README.md).

Phase 5 is committed as 2fb2705. This is the first Phase 6 review step; interactive art/likeness, further quality work, real-device performance and release review remain pending. No deployment is included.

## Phase 6 recovery review

Generated artwork is accepted and committed as 46475a2. To review the next quality step, open /explore/ in desktop Chrome, enable 3D and change chapter. Cancel travel should retain the current chapter and URL. If a renderer request or destination readiness stalls, a 20-second recovery limit exposes retry/reload and keeps the information below accessible. Canceling does not abort the network download; late travel callbacks are ignored. Background tabs pause the destination-readiness guard. The existing Reload explorer link remains available if the browser caches a failed module import.

Run npm run check and npm run test:browser. The browser suite holds the real renderer response to verify stalled loading, cancellation, late completion and retry. This uses software WebGL for behavior checks; it does not certify average-hardware performance. Delivery documentation is the following phase after manual review; likeness/GLB and final performance remain open.
