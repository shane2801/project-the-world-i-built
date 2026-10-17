# The World I Built

A data-driven, browser-based career portfolio. **Current milestone: Phase 1 foundation and its approved organization step.** The shell has no verified career dataset, resume/project workflows or 3D exploration yet.

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

Open http://127.0.0.1:4173 for the production preview. `npm run check` runs linting, the production build (including strict TypeScript checking), and three Node-based smoke tests for static HTML, development startup and production asset serving.

Individual commands: `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:smoke` (requires an existing build). `npm test` rebuilds before running smoke tests.

The build creates browser assets in `dist/`, a temporary build-time React renderer in `.prerender/`, and injects rendered HTML into `dist/index.html`. Only `dist/` is a deployment artifact. No runtime server or client-side JavaScript is needed to read the production shell. Browser hydration and visual/accessibility behavior require browser QA beyond these HTTP smoke tests.

## Layout and scope

- `src/app/`: application composition; `main.tsx` and `entry-server.tsx` remain thin entry points.
- `src/components/layout/`: shared header, skip link and main landmark.
- `src/features/home/`: home page, decorative illustration and feature styles.
- `src/styles/`: shared design tokens and global/accessibility styles.
- Future career/domain, resume/projects and exploration modules are created only when their owning phase starts.
- `scripts/`: static rendering and foundation smoke tests.
- `docs/`: original design documents; preserve unchanged.
- [project-context/INDEX.md](project-context/INDEX.md): architecture, requirements, decisions, source fingerprints and the phased roadmap.

Dependencies are pinned in package.json and package-lock.json. Use `npm ci` for reproducible installs. Three.js/React Three Fiber and asset tooling are deferred until their implementation phase. Phase 1 is maintained in a local Git repository; no remote or publishing is configured.

The user approved the Phase 1 foundation and organization milestone. Phase 2 has not started and requires a separate instruction. Verified career content, later workflows, artwork and deployment remain separate milestones; nothing has been published.
