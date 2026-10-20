# Generated artwork provenance

ASSET-001 (planet) and ASSET-002 (Observatory) are AI-generated decorative illustrations, authorized by the owner under DEC-018 and generated with the built-in image_gen tool on 2026-10-17 using the imagegen skill. They depict imagined symbolic environments, not verified buildings, geography, project screenshots or the owner's likeness. No third-party reference images were supplied. No external stock license or exclusivity claim is asserted; public-release suitability remains a human review item.

| ID | Preserved original | Runtime derivatives | Consumer |
|---|---|---|---|
| ASSET-001 | [planet-v1.png](originals/planet-v1.png) | [620px](../../public/assets/artwork/planet-620.jpg), [1160px](../../public/assets/artwork/planet-1160.jpg) | Home PlanetIllustration; empty alt/decorative |
| ASSET-002 | [observatory-v1.png](originals/observatory-v1.png) | [720px](../../public/assets/artwork/observatory-720.jpg), [1440px](../../public/assets/artwork/observatory-1440.jpg) | Observatory information page; empty alt/decorative |

Runtime derivatives use JPEG quality 82 and proportional resizing via Windows System.Drawing, without extra packages. Originals stay outside public/ so Vite does not publish multi-megabyte source files. Image dimensions and srcset reserve layout and reduce phone transfer. Existing CSS planet is retained as the image-failure fallback. Art never supplies essential information; forced-colors/print hide it. Interactive Three.js scenes remain procedural, not generated models.

## Prompt ASSET-001

Use case: stylized-concept. Asset type: decorative square home illustration for The World I Built, a personal career exploration portfolio. Create one beautiful small spherical world floating in deep teal space (#10252a), with five subtly distinct symbolic regions wrapping its curved surface: tropical green island and tiny mountains, muted rose university-like workshops, lavender network structures, cyan futuristic intelligence district, slate blue enterprise towers. A tiny elegant observatory dome at the north pole. Regions are imagined places, not maps or depictions of actual institutions. Style: sophisticated handcrafted miniature 3D diorama, tactile matte ceramic and paper, restrained detail, soft atmospheric light, muted sage and teal with fine warm gold (#dfbb75) orbit arcs. Composition: one centered complete planet occupying about 65 percent of a square canvas, generous uncluttered dark teal margins blending to uniform #10252a at all edges, no frame. Warm sidelight upper left; quiet, thoughtful, premium editorial mood. No text, labels, logos, faces, people, UI, borders or watermarks. Not a screenshot, not a sprite sheet, no photorealistic geography.

## Prompt ASSET-002

Use case: stylized-concept. Asset type: wide decorative Observatory banner illustration for The World I Built career portfolio. A small elegant ivory observatory dome on a floating rocky sage-green terrace, slender warm gold telescope details and paths connecting four quiet abstract pavilions, with a distant tiny green-blue planet. Handcrafted miniature architectural diorama, matte ceramic and paper textures, soft cinematic lighting, deep teal space (#10252a), sage green, slate blue and restrained warm gold (#dfbb75). Composition: panoramic 3:1 landscape, observatory centered slightly right, all main structures within central two-thirds, generous dark teal outer margins, subtle stars only, no clutter. Match a sophisticated muted miniature planet aesthetic. These are symbolic imagined places rather than real buildings. No people, faces, words, symbols resembling text, logos, interface, frames or watermark. Deliver one cohesive panoramic illustration, no panels or sprite sheet.

## Maintenance

Preserve originals and prompts; create versioned siblings for replacements. Review theme, artifacts, factual ambiguity and release suitability. Regenerate derivatives at the documented widths/quality, update this manifest and owning components together, and run npm run check plus npm run test:browser. Keep each planet derivative below 250 KiB and each banner below 200 KiB; these are local image-transfer safeguards, not a validated hardware benchmark. Record approval before treating a variant as final art. Likeness references, GLB rigs, audio and production benchmark sign-off remain open (Q-003/Q-007).

## Original fingerprints (SHA-256)

- observatory-v1.png: d96cad0935b04413358941e1f91dc58f55d4705be7a287a3ae659a7c74ef9f25
- planet-v1.png: ed090cb4ae10060aa03cbd0e2de1deaa4576f7dad3281dbf7749dcef7f354330

DEC-022 disconnects the home page: ASSET-001 and its original/derivatives stay preserved, but are no longer displayed on a public route. The Observatory illustration remains active. No image bytes changed.

## Resume interface artwork

DEC-023 records authorization for the local decorative UI assets under public/images. These are a development checkpoint, not final publication/licensing or transfer-budget approval. No new asset service/dependency is used.

| Group | Runtime location | Provenance / status |
|---|---|---|
| Owner portrait and pixel variants | public/images/profile | Owner's Downloads/shanelogo.jpg; generated pixel/dissolve and bald-smile variants; [pixel prompt](profile-pixel-portrait.prompt.txt), [coarse variant](profile-pixel-portrait-v2.prompt.txt), [bald/smile prompt](profile-bald-smile.prompt.txt) |
| Institutional badges | public/images/badges | Accenture and Birmingham marks; RCC original supplied as Downloads/rcclogo.jpg with owner-directed modernized artwork; decorative identification, not external links |
| Project previews | public/images/project-previews | Provisional invented interface illustrations for later replacement; not screenshots or verified delivered UI |
| Skill icons | public/images/skills | Local Devicon and custom concept marks; [sources](skill-icons.sources.txt), license retained with icons |
| Interest background | public/images/backgrounds | Arsenal, Emirates, Red Bull monochrome tile; [source files and provenance](background-logo-sources/); earlier draft tiles preserved |
| Banner mascots | public/images/mascots | Sid/Diego artwork generated from owner-provided Downloads/sid.jpg and diego.jpg; [prompt](sid-diego-tag.prompt.txt). Earlier unused cowboy/explorer asset retained |
| Posters | public/images/movie-posters | 100 downloaded third-party film posters; [sources](movie-posters.sources.txt); per-film URLs and archived rank metadata in src/content/movie-posters.json. Ranked snapshot 2022-11-03, not verified current IMDb chart |
| Tattoo ornament and eye variants | public/images/mandala | Built-in imagegen; [eye prompts](mandala-eye.prompts.json), [ornament prompt](mandala-pattern.prompt.txt), [purple-master prompt](mandala-purple.prompt.txt). Colored master is displayed grayscale; no purple hover remains |

All runtime assets are served locally. Third-party logos/posters/character references are not owned by the project; saved source URLs and generated transformations do not establish publication rights. Original source documents and user download files are unchanged. Multiple large PNGs and an oversized poster remain optimization/review work (Q-018); earlier JPEG safeguards do not describe these new files.

Keep prompts and source records with replacements; preserve versions until the owner selects final assets. Review real project media, institutional artwork, poster snapshot freshness, transfer sizes, hover/focus/reduced-motion and narrow-screen presentation before release. Tests were not run for the 2026-10-20 checkpoint at the owner's request.
