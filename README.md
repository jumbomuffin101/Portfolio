# Aryan Rawat — Interactive Portfolio

React 19 / Create React App portfolio with a dark-first editorial design, a lazy-loaded React Three Fiber orbital scene, GSAP ScrollTrigger choreography, Lenis scrolling, magnetic links, and a keyboard-accessible technology relationship map.

## Local preview

Requires Node.js 20 or newer and npm.

```sh
npm ci
npm start
```

Open **http://localhost:3000/Portfolio/**. Create React App may choose a different port if 3000 is occupied.

```sh
npm test -- --watchAll=false --runInBand
npm run build
```

## Deployment

The existing GitHub Actions workflow in `.github/workflows/pages.yml` builds `build/` and deploys it to GitHub Pages on pushes to `main`. The package `homepage` stays `https://jumbomuffin101.github.io/Portfolio`; image paths use `process.env.PUBLIC_URL`. Internal navigation uses anchors and needs no server rewrites.

## Structure

- `src/data/portfolio.js`: profile, experience, featured projects, education, honors, skills, and certifications synchronized with the supplied resume. Additional existing projects remain in the secondary archive.
- `src/components/Hero.jsx`: cinematic layout and SVG fallback.
- `src/components/HeroScene.jsx`: procedural orbital sculpture. No external 3D models or textures.
- `src/components/InteractionSystem.jsx`: reusable magnetic links, cursor, GSAP and Lenis lifecycle.
- `src/components/ProjectShowcase.jsx`: four distinct project chapters, interactive engineering maps, a native screenshot dialog, engineering disclosures, and the original project archive.
- `src/components/TechnologyMap.jsx`: SVG relationship explorer derived directly from project stacks.
- `src/data/projectChapters.js`: resume-derived project presentation and engineering-map labels.
- `src/components/ProjectShowcase.css`: scoped project compositions and responsive layouts.
- `src/hooks/useProjectMotion.js`: scoped ScrollTrigger progress, depth, pointer tilt, and active chapter tracking.
- `src/hooks/useMotion.js`: responsive media subscriptions and shared animation preferences.
- `src/App.js`: navigation, timeline, education, contact and application composition.
- `src/App.css` / `src/index.css`: responsive visual system.

## Content and accessibility

The latest supplied resume is the source of truth for professional experience, the four featured projects, education, honors, skills, certifications, and contact information. Next Chapter's image was supplied by the portfolio owner; the other project images and all existing GitHub and live-demo destinations are preserved. Additional projects retain their existing content in the secondary archive. No achievements, metrics, screenshots, or URLs were invented.

The supplied PDF is copied unchanged to `public/resume.pdf`, and `profile.resumeUrl` is `"resume.pdf"`. Both **Download Resume** links use the shared resume action, which prefixes the GitHub Pages base path and downloads as `Aryan-Rawat-Resume.pdf`. During local development the file is served at `/Portfolio/resume.pdf`; builds include the same PDF for GitHub Pages. To update the resume later, replace `public/resume.pdf` and reconcile the portfolio data against it.

The original theme toggle and email-copy behavior remain available. Reduced-motion preferences disable choreography and use an SVG hero; a header pause control disables other animation. Touch/mobile devices use the lightweight fallback without downloading the 3D module. The desktop scene caps DPR at 1.5 and stops rendering when offscreen or the document is hidden. React Three Fiber disposes scene resources on unmount; effects clean up observers, tweens and listeners.

The technology ecosystem uses SVG and real HTML buttons, so it supports keyboard and touch input without requiring another WebGL context.

The refined hero has four discipline orbits (Backend, AI Systems, Full Stack, Cloud). Drag the desktop scene to rotate it, hover a satellite to inspect it, click to select a focus, and use **Reset view** to return to the initial camera. Equivalent HTML buttons support keyboard and touch selection, including in the mobile and reduced-motion SVG fallback. Selection links to existing projects or experience; it does not claim additional achievements. The scene uses four orbital paths, modest sphere geometry, a small Fresnel rim shader and no postprocessing or downloaded environment maps. Labels are projected into the existing React tree rather than separate React roots. OrbitControls disposes its input listeners; the scene also removes its context-loss listener and falls back to SVG if the WebGL context is lost.

## Reference

[awrs.me](https://awrs.me/en) informed the ambition and interaction polish. Layout, branding, visuals and animation composition are original to this implementation.

## Selected Work interactions

The chapter navigation follows the visible project without pinning or trapping scrolling. Each engineering map exposes three selectable stages; the original screenshot opens at full size in a native modal with Escape, focus containment, and focus restoration. Native image dimensions reserve space and retain the complete image. The Docling asset is the original PNG documentation screenshot at `/Portfolio/projects/ibm-docling.png`, accompanied by a separate contribution diagram about the merged Windows resource cleanup fix. Scroll effects and pointer tilt share the existing motion preferences and clean up on unmount, viewport changes, pause, or reduced motion. No new animation dependencies were added.

## Final polish and QA

`src/Polish.css` aligns supporting typography, touch targets, section spacing, and dark/light contrast with the cinematic foundation. On small phones the technology explorer provides a readable grid of 44px controls alongside the same relationship visualization. Native fragment navigation is handled once by Lenis and transfers keyboard focus to the destination; reduced-motion navigation stays native.

The shared motion context observes document visibility. The smooth-scroll ticker is detached in hidden tabs, the technology path pauses offscreen, and the hero stops WebGL rendering offscreen, hidden, or paused. Desktop Three.js loading is deferred until idle; touch and reduced-motion views keep the SVG fallback. Canvas configuration stays stable during hover, and project chapters are memoized so progress updates do not rebuild every preview.

Static HTML includes canonical, Open Graph, and Twitter metadata; `public/social-preview.svg` is the editable source for the 1200×630 PNG. Matching SVG/ICO and Apple touch icons replace the old generic favicon. `robots.txt` and `sitemap.xml` contain only crawler configuration, and the no-JavaScript fallback exposes the resume and contact links. Tests cover motion lifecycle, fragment navigation, and static metadata assets in addition to the recruiting flows.
