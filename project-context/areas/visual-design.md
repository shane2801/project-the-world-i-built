# Visual design and world interaction

Status: active development under DEC-021; delivery is deferred. The current checkpoint combines the interactive resume redesign with earlier procedural-world improvements. Source-backed design intent remains REQ-002/REQ-004/REQ-005/REQ-007/REQ-012 in [summary](../SUMMARY.md); these implementation choices are visual recommendations within the user-authorized redesign, not newly verified career facts.

## Resume-first static interface

DEC-023 supersedes the early DEC-022 chapter-style presentation. Both / and /resume/ render the light, minimal interactive resume. The preserved HomePage/atlas stays disconnected; world and Observatory chronology is unchanged. Current explicit owner messages govern these UI decisions and the content overrides in [data](data.md#owner-message-content-overrides).

| Owner | Responsibility |
|---|---|
| ResumePage | Compose identity, quote banner, Experience, Projects, Skills, Education; own ephemeral UI preferences |
| TypewriterName; content/greetings.ts | First-name greetings across 16 languages; grapheme-safe typing, hover/focus language hint, pause and English reset |
| ProfilePortrait; ProfessionalTags; WorkedAcross; ResumeBadges | Click-cycling pixel portrait, subtle hint, coloured professional tags, UK/UAE/Mauritius flags, two non-link institutional logo badges |
| ResumeAbout; ResumeEducation | Full biography initially visible with quiet minimize action; supplied education with institutional artwork |
| ResumeExperience; ProjectMarkers | Newest-first roles, ongoing consulting disclosure, fixed dates, project-star previews beside roles |
| ResumeProjects; ProjectPreview | Compact project cards with explicitly provisional mock previews and real detail-page links |
| ResumeSkills; SkillMarquee; SkillIcon; skillCategories | Category filters and local skill icons; three scrolling rows for All, unique static entries when filtered or motion blocked; search commented out |
| ResumeNavigation | Bottom-centre floating section dock; no sidebar |
| ResumeBackground; MotionOptions | Logo background spotlight inside the content area; bottom-left Options popover and page-local preferences |
| MoviePosterRail; MandalaRail | Decorative full-document side gutters, hidden at widths <=1100px and in print |
| QuoteBanner; content/bannerQuotes.ts | JSON-configured marquee quotes, 30-second cycling, pause/speed settings and decorative Sid/Diego cutouts |
| FloatingContactChat; ContactChat | Bottom-right local chat simulation, original profile photo, sample prior messages/read receipts, manual email/phone links |
| useResumeFragment | Reveal relevant enclosing disclosures for existing fragment links |

Experience, Projects, Skills and Education are native disclosures, initially open. Consulting is ongoing alongside other work and initially collapsed. Project-star links support hover/focus previews and direct navigation without mixing links into disclosure summaries. All resume biography text starts available; minimize is optional. No standalone Contact section remains: identity contact links and the floating chat supply access. The global visible draft notice is removed, but contentIsDraft/noindex metadata remain; this is not release approval.

Skill rows continue on hover. Block motion switches to a static, nonduplicated list; filtered categories are static without filling three rows. Quote speed/pause, skill speed/motion, greeting pause/reset and artwork controls live in Options. Preferences reset on reload; there is no persistence service, backend or extra dependency. Reduced-motion styles suppress decorative animation where implemented; full accessibility review remains pending.

### Side artwork and eye

Both gutters scroll with the document, rather than staying fixed. Their default artwork opacity is 0%. The right rail uses fixed 80 x 120px gapless cover-cropped posters; individual hover reveals full colour. Its 100-film catalog is an archived IMDb ranked snapshot dated 2022-11-03, not the current live chart. The shuffle control changes layout. Provenance is in [artwork](../../assets/artwork/README.md#resume-interface-artwork).

The left rail repeats varied tattoo ornament from a purple master rendered in grayscale. A 64 x 64px local hover reveal shows the same aligned artwork in black-and-white at full opacity, including when resting opacity is zero. No purple hover filter remains. The eye is centred at 50svh in the opening document view and scrolls away with the page. Click cycles brown, green and blue iris artwork. Eye display and opacity are independent controls; default opacity is 0%. Hover or keyboard focus reveals the eye at 100%. Above zero resting eye opacity, a white backing hides the mandala behind the eye; at zero the backing is transparent. The page's repeating Arsenal/Emirates/Red Bull background is clipped out of both gutters.

Bottom-left settings, bottom-centre dock and bottom-right chat stay viewport anchored; the chat has a local backdrop blur on desktop. Review overlap, edge hover behaviour and opacity combinations manually. The click-me portrait hint stays inside the main content above its arrow. Banner top margin is currently 8px.

The chat is explicitly a simulation: composing only updates local state, never sends a message. Older messages are examples, not evidence of previous communication. Manual email/WhatsApp links are the only real contact handoff. Original owner documents and downloaded reference photos are preserved.

## Authored procedural environments

ChapterTerrain owns the walkable floating-island presentation, cliff, paths and island water rim. The top radius covers every reachable corner of the existing square movement bounds; terrain does not expand movement or introduce a physics system. ChapterEnvironment places symbolic trees, campus structures, network pylons or towers outside walking bounds. These are imagined architecture, not claims about real schools/clients or final licensed GLB models.

ProjectLandmark owns a pedestal, kiosk, emissive panel, beacon and hover feedback. All visible parts fit within the existing conservative collision footprint. Importance still controls size/height and presentation kind controls color. The chapter still caps visible projects at eight and retains complete HTML access. All scenery is authored with Three primitives/materials; no new textures, models, remote assets, shadows or services are added.

Character remains a stylized stand-in: palette, backpack, facing direction and small walking bob. Reduced motion removes the bob; walking and existing camera/recovery semantics remain. It is not an approved likeness, shared rig or animation asset.

## Proximity interaction

world/interaction.ts is the pure shared nearest-target rule for both E-key intent and the DOM hint. Landmark descriptors now carry the source project title. Projects use a size-aware radius reachable outside their collision boundary; portals retain the existing 2.1-unit range. The nearest eligible target wins, preserving input order for equal distances. Invalid positions expose no action.

InteractionProbe samples player proximity approximately every 150 ms and only updates React when the target changes. The DOM HUD keeps text readable without a WebGL font dependency. Focused, unpaused chapter controls handle E for project inspection or portal travel; Tab leaves the scene. The existing panel owns focus/Escape/return focus. HTML buttons and direct project URLs remain equivalent access paths.

## Review and next work

Review the current resume against README.md; earlier browser assertions may still describe the superseded chapter UI. Full automated and manual regression review is pending under Q-018. In all five scenes, inspect terrain/scenery, walk bounds, read proximity prompts, inspect a project with E, travel and test context-loss/network recovery. Node tests cover nearest-target rules; installed Chrome exercises actual walking-to-hint, E inspection and focus restoration. Counters and budgets remain provisional under [exploration](exploration.md#provisional-performance-targets).

Still unfinished: richer overview/Observatory environments, final GLB/likeness/rig, deeper chapter-specific project assets, richer travel/cinematics and real-hardware performance/assistive-technology review. Choose the next development increment after manual review. Do not treat this visual increment as completing the full source vision or authorizing delivery.

Checkpoint 2026-10-20: user requested documentation and commit without running tests. No test suite, build, lint or browser validation was run for this checkpoint. Earlier passing TypeScript checks are historical, not full regression sign-off.
