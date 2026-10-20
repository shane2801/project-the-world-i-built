# The World I Built

A browser-based career portfolio with static resume/project pages, five symbolic career chapters and an optional desktop 3D explorer. The Observatory provides timeline, projects and skills without requiring graphics.

**In active development:** recovery milestone `bc56d6d` is committed. The resume-first interface is ready for manual review; previous UI/world development remains preserved and uncommitted. Delivery preparation is deferred; this is not a release candidate. Start architectural work at [the context index](project-context/INDEX.md).

## Requirements

- Node.js 24, at least 24.14.1 and below 25; [.node-version](.node-version) records the verified version.
- npm 11, below 12; verified with 11.11.0.
- Installed desktop Chrome for the optional browser checks.
- No runtime environment variables, API keys, database or backend are required.

## Install and run

From the repository root:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. Stop with Ctrl+C. Servers bind to loopback; choose another port explicitly if occupied, for example `npm run dev -- --port 5174`. On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

## Verify and preview

```sh
npm run check
npm run test:browser
npm run preview
```

Open http://127.0.0.1:4173. `check` runs lint, domain/routes/exploration tests, strict TypeScript, client/SSR builds, static prerendering and HTTP/content/asset tests. The browser suite requires the production build made by `check`. It uses isolated installed Chrome with software WebGL and removes its temporary profile/server afterward; it does not benchmark the physical GPU.

The default Windows Chrome path is `C:\Program Files\Google\Chrome\Application\chrome.exe`. Override only the executable path when needed:

```powershell
$env:CHROME_PATH = 'C:\path\to\chrome.exe'
npm.cmd run test:browser
```

For another shell, set its environment variable using that shell's syntax. No browser is downloaded.

| Command | Purpose |
|---|---|
| `npm run typecheck` | Strict TypeScript |
| `npm run lint` | ESLint, zero warnings |
| `npm run test:domain` | Content validation and pure queries |
| `npm run test:routes` | Route/publication contracts |
| `npm run test:explore` | Layout, movement, travel and loading recovery |
| `npm run build` | Typecheck, browser/SSR builds and static HTML |
| `npm run test:smoke` | HTTP/startup/assets; requires a build |
| `npm run test:portfolio` | Static portfolio content/links; requires a build |
| `npm run test:explore-build` | Explorer/Observatory HTML and lazy-renderer budget; requires a build |

`npm test` rebuilds before the build-dependent tests. The Vite warning about the large uncompressed lazy renderer remains visible; its gzip budget is tested. Hardware targets are [provisional](project-context/areas/exploration.md#provisional-performance-targets).

## Development build

The build generates readable pages and browser assets in `dist/`, plus a temporary build-time renderer in `.prerender/`. This remains a local development build. No hosting, remote, publishing or deployment is configured or authorized.

## Manual review

Use the production preview. Review the resume, projects, Observatory and explorer on desktop and phone widths, including direct URL reload, keyboard focus and information access without JavaScript. Review every chapter, portal, project inspection, reduced-motion mode, graphics fallback and phone information mode before advancing.

### Interactive resume review

1. Open / and /resume/: both render the interactive resume. The former home remains disconnected in src/features/home. Review Experience, Projects, Skills and Education disclosures and ongoing consulting.
2. Review the full biography/minimize control, first-name language animation and hover/focus language hint, click-cycling portrait, badges, role stars and draft project previews. Use direct fragment links and keyboard navigation.
3. Open bottom-left Options: check quote pause/speed, greeting pause/reset, skills speed/static mode and artwork settings. Quotes come from src/content/quotes.json; the default cycle is 30 seconds. Skill filters show each matching skill once.
4. Both side artworks and the eye start at 0% opacity. On desktop, hover reveals poster tiles in colour and 64px mandala tiles in grayscale; hover/focus reveals the eye fully. Check independent eye display/opacity and brown/green/blue click cycling. Side gutters scroll with the document and disappear at <=1100px. Logo background stays inside the central content.
5. Open bottom-right chat: sample history/read receipts are simulated; composing sends nothing. Actual email/phone links remain manual handoffs. Check chat/settings/dock overlap on phone and desktop.
6. The unfinished world stays at /explore/. Review movement, nearest-project/portal hints, E inspection, travel, reduced motion and recovery; the world keeps chronological order.

See [current UI contracts](project-context/areas/visual-design.md#resume-first-static-interface) and [asset provenance](assets/artwork/README.md#resume-interface-artwork). Delivery remains deferred.

**Checkpoint 2026-10-20:** documentation and accumulated changes committed at the owner's request without running tests. Earlier targeted TypeScript checks passed during UI iteration; no fresh lint, build, test suite or browser pass is claimed. Existing automated expectations may still reflect the earlier UI and require reconciliation before the deferred full verification (Q-018).

### Phase 6 recovery review

Enable desktop 3D and start chapter travel. Cancel travel must preserve the logical current chapter and URL. Block or stall renderer loading and check accessible information, retry/reload and the 20-second recovery guard. See [recovery semantics](project-context/areas/exploration.md#phase-6-stalled-loading-recovery); canceling does not abort the download.

## Maintenance

- Use [architecture](project-context/ARCHITECTURE.md) for module boundaries and [data contracts](project-context/areas/data.md) for reviewed content updates.
- Preserve original `docs/` files. Keep career content in `src/content/portfolio.ts`; source examples and test fixtures are not publishable biography.
- Keep `contentIsDraft` true until content/presentation release review; `reviewStatus` records owner permission, not independent factual verification. Draft `noindex,nofollow` is a crawler directive, not access control.
- Follow [context maintenance](project-context/areas/workflows.md#context-maintenance) when approved decisions/interfaces change. [Artwork provenance](assets/artwork/README.md) owns source images, exact prompts and derivative sizes.
- Update dependency declarations and lockfile together only for an authorized requirement; use `npm ci` to reproduce the recorded dependency graph.

No remote, hosting account or deployment is configured. Remaining content, art and hardware questions are tracked in [open questions](project-context/OPEN_QUESTIONS.md).
