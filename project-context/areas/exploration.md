# Exploration journey

Status: Phase 5 all-chapter procedural journey under DEC-017; Phase 4 is committed as 606cdb3. Phase 3 information pages remain the baseline. Geometry and character colors are proxies, not approved artwork or a likeness.

Evidence: [SRC-04, Travel Sequence](../../docs/theworldibuild-04.txt); [SRC-10, Career Continents / Project System](../../docs/theworldibuild-10.txt); accepted constraints DEC-003/DEC-004/DEC-007/DEC-008. Content permission/provenance stays in [data](data.md).

## Boundaries and data flow

| Owner under src/features/explore | Responsibility |
|---|---|
| world/types.ts, buildWorld.ts, presets.ts | React/Three-independent descriptors from validated content, authored order and importance |
| world/movement.ts, navigation.ts | Delta-clamped movement, bounds/collisions, authored neighbors and portal proximity |
| state/experience.ts, selection.ts | Pure travel reducer and validated query-state parsing |
| hooks/useExplorer.ts | Coordinate dynamic import, readiness, cancellation, history and selection |
| hooks/useMediaQuery.ts, usePageVisible.ts | SSR-safe preferences, desktop gating and background pause |
| components/PrototypeExplorer.tsx, ExplorerControls.tsx, PerformancePanel.tsx | Compose controls, active content, optional viewport and diagnostic counters |
| components/ChapterContent.tsx, ProjectPanel.tsx | HTML equivalents, detail depth, focus and Escape/close |
| components/ExplorerViewport.tsx, SceneBoundary.tsx | Lazy renderer, loading fallback and recoverable renderer errors |
| scene/ | Canvas, chapter geometry, proxy character, overview, readiness and counters |
| pages/ExplorePage.tsx | Feature entry and content/descriptor composition |

Validated content -> deterministic descriptors -> HTML controls and optional renderer. There is no scene-owned career copy, backend, global store, physics library or new asset service. Fiber's transitive dependencies do not replace the application's reducer.

## Prototype scope and invariants

- Include all authored phases in explicit order. The five approved chapters have authored visual presets; new themes use a generic fallback. IDs and content associations stay stable through reordering. navigation.ts connects only the previous/next neighbors, with no wrap at either end; direct nonadjacent choice remains available.
- Render a lightweight overview, Observatory proxy or one chapter. During staging, replace its geometry under the transition overlay; never retain two full chapter scenes.
- Sort projects by ID for stable slots; cap visible landmarks at eight per chapter while retaining complete project IDs and HTML access. Importance controls proxy scale; presentation kind controls color. Unknown themes receive a generic palette.
- Enable the desktop renderer only on explicit request. At widths up to 700px, keep complete information access and no canvas. Resize/background changes unmount or pause graphics. Core pages never preload the renderer.
- Scope WASD/arrows and portal E interaction to the focused viewport; blur clears held keys. Clamp frame movement, slide around simple boxes and keep the avatar inside the walkable bounds. No physics engine.
- Query parameters phase/project own career selection; view=observatory owns the separate hub view and browser history. Reject unknown chapters and cross-chapter projects. Direct project detail URLs remain ordinary static pages; the query state enhances the explorer after hydration.
- Travel: idle -> loading module -> transitioning/staging -> destination rendered -> arrival. Commit active chapter only after matching readiness; reject duplicate requests, stale results and callbacks canceled by overview/history navigation.
- Loading, renderer or context-loss failure retains the logical current chapter and HTML project access. Retry creates a fresh renderer boundary/context; reload remains available for blocked/cached module failures. GLB asset preloading is not implemented because there are no production assets in this phase.
- Opening is an optional overview with immediate skip. Reduced motion skips transition timing and decorative portal/camera animation; walking still works. Project panels pause walking, focus their heading, close with Escape and restore trigger focus.

## Provisional performance targets

User target: Chrome, average-spec desktop; exact GPU/device/network remain Q-007. These are engineering recommendations for measurement, not source requirements or final sign-off.

| Measurement | Provisional target |
|---|---|
| Review viewport | 1920 × 1080, DPR capped at 1.5 |
| Sustained walking frame rate | 55–60 FPS |
| Visible work | At most 100 draw calls / 100,000 triangles |
| Renderer allocations | At most 100 geometries / 16 textures |
| On-demand renderer JavaScript | At most 350 KiB gzip |
| First usable 3D frame after enable | At most 4 seconds on 10 Mbps |

Live counters sample rendering work approximately once per second and pause with graphics. They are diagnostics, not benchmark certification. No final-art, average-hardware GPU or throttled-network benchmark is established by unit tests or software-rendered browser checks.

## Validation and review

Existing Node tests cover deterministic layout, project caps, movement/collisions, reducer readiness/retry/cancellation and URL ownership. Build tests verify static information access and the lazy compressed-bundle budget.

scripts/browser-smoke.mjs uses an installed Chrome and its DevTools protocol, without browser packages or downloads. It creates an isolated temporary profile, checks UI behavior using software WebGL, then closes the browser/server and removes that profile. CHROME_PATH can select another installed executable. Software rendering is behavior QA, not a performance baseline. See [README](../../README.md) for execution and manual review steps.

All five chapter proxies and the Observatory are now implemented. Hub content/route ownership belongs in [observatory](observatory.md). Still deferred: real GLB/character rig, licensed art, rich memory tunnel/cinematics, final audio and production performance/accessibility sign-off. All five chapters remain required at public launch (DEC-002); Phase 5 is accepted and committed as 2fb2705. Phase 6 generated decorative art is separately recorded in ARCHITECTURE.md; interactive scenes remain unchanged.

## Phase 6 stalled-loading recovery

DEC-019 accepts the generated artwork and advances remaining quality work. state/loading.ts bounds each renderer import at 20 seconds, including first activation through React.lazy. This is a recovery ceiling, not a load-performance target. Settled imports clear their timers; late resolutions/rejections are handled. Dynamic imports are not aborted and a rejected module may still require the existing full-page reload link.

The controller also bounds destination readiness at 20 seconds while the page is visible. Hiding the page clears that readiness timer; returning starts a fresh window. Cancel travel restores the logical current view/chapter, clears pending travel and increments its request generation. It leaves URL/history unchanged. Late destination preparation/arrival/failure callbacks cannot commit canceled travel. Existing chapter/project information and retry/reload remain available on failure. No package, service or content-model changes are introduced.

The browser suite now intercepts the actual renderer request to exercise cancellation, late completion, deadline fallback and retry; pure tests cover deadline settlement and cancellation after destination staging. Human review and real-device performance remain separate.
