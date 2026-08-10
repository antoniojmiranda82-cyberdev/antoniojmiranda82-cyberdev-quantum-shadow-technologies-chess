# King Home Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Home route into the master interactive King experience with flowing typography, separate-page navigation, and a server-side Runway-ready cinematic adapter.

**Architecture:** Keep accessible copy in React/HTML while rendering the King and pixel field in React Three Fiber. Share pointer/scroll state through small client hooks and use CSS masks/z-index for type-depth choreography. Runway integration lives in a Next.js route handler so secrets never reach the browser and the site works when Runway is absent.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Three.js, React Three Fiber, Drei, CSS, Runway REST API.

## Global Constraints
- Separate routes for King, Queen, Bishop, Rook, Knight, Pawn.
- No card-grid visual language in the hero.
- The King artwork stays visually isolated with no board/background container.
- Live interaction must not depend on Runway.
- Runway API key is server-only.
- Reduced-motion and no-WebGL fallbacks remain usable.

---

### Task 1: Add King visual asset and motion primitives

**Files:**
- Create: `public/chess/king.png`
- Create: `components/motion/useDampedPointer.ts`
- Create: `components/motion/useScrollProgress.ts`
- Create: `components/three/KingScene.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces `useDampedPointer()` returning `{ x, y, active }`.
- Produces `useScrollProgress()` returning a normalized `0..1` progress value.
- Produces `<KingScene scrollProgress={number} />`.

- [ ] Copy isolated King PNG into `public/chess/king.png`.
- [ ] Implement pointer damping using requestAnimationFrame and lerp.
- [ ] Implement normalized document scroll progress with passive listeners.
- [ ] Build transparent R3F King plane with float/tilt/parallax and gold pixel particles.
- [ ] Add reduced-motion detection and freeze continuous motion when enabled.
- [ ] Run TypeScript/build verification.
- [ ] Commit.

### Task 2: Recompose Home hero with flowing typography

**Files:**
- Modify: `components/hero/Hero.tsx`
- Modify: `app/globals.css`
- Modify: `app/page.tsx`

**Interfaces:**
- Hero consumes `KingScene`.
- Typography depth layers use `.flow-word`, `.flow-front`, `.flow-back` classes.

- [ ] Replace board/copy split hero with a full-bleed editorial composition.
- [ ] Add `STRATEGY`, `IS`, `THE ADVANTAGE.` as independently animated lines.
- [ ] Keep semantic supporting copy and CTAs without card shells.
- [ ] Add scroll-linked CSS transforms via custom properties/client state.
- [ ] Add responsive rules for mobile and reduced-motion.
- [ ] Verify keyboard and no-WebGL fallback behavior.
- [ ] Commit.

### Task 3: Add separate-route navigation and transition overlay

**Files:**
- Create: `components/navigation/ChessRouteTransition.tsx`
- Modify: `components/layout/Header.tsx`
- Modify: `app/layout.tsx`
- Create: placeholder route pages under `app/ai-automation`, `app/cloud-strategy`, `app/cybersecurity`, `app/software`, `app/process`.

**Interfaces:**
- Header route map contains all six routes.
- Transition overlay exposes navigation without blocking native links.

- [ ] Add six-route navigation map.
- [ ] Add visual transition overlay triggered on internal route clicks.
- [ ] Add minimal placeholder pages that identify their assigned piece without fake content.
- [ ] Verify direct route access and browser back/forward navigation.
- [ ] Commit.

### Task 4: Add server-side Runway adapter

**Files:**
- Create: `lib/runway.ts`
- Create: `app/api/runway/image-to-video/route.ts`
- Create: `.env.example`

**Interfaces:**
- `createRunwayImageToVideo({ promptImage, promptText, duration, ratio })` returns Runway task JSON.
- API route accepts POST JSON and never exposes `RUNWAYML_API_SECRET`.

- [ ] Validate required environment variable and request body.
- [ ] POST to `https://api.dev.runwayml.com/v1/image_to_video` with `X-Runway-Version: 2024-11-06`.
- [ ] Default model to `gen4.5`, duration to 5, ratio to `1280:720`.
- [ ] Return upstream task ID/error cleanly.
- [ ] Document that generations are admin/build-time assets, not visitor-load actions.
- [ ] Commit.

### Task 5: Verification and artifact packaging

**Files:**
- Modify as required by verification only.

- [ ] Install dependencies.
- [ ] Run `npm run build`.
- [ ] Run local server and capture Home preview if environment supports it.
- [ ] Inspect responsive layout and reduced-motion CSS.
- [ ] Zip the isolated rebuild.
- [ ] Report any remaining blocker explicitly.
