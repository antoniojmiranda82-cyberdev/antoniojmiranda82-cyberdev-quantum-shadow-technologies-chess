# Quantum Shadow Chess Premium Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the isolated Quantum Shadow Technologies copy as a premium chess-led technology site with fluid motion, interactive Three.js elements, and a Next.js architecture while leaving live Black Hole and main deployments untouched.

**Architecture:** Replace the Vite shell with Next.js App Router. Keep 3D concerns in focused client components, use React Three Fiber/Drei for the chess hero, Framer Motion for DOM transitions, and CSS tokens for the restrained black/ivory/gold visual system. Preserve static business content but recompose it into cinematic sections with progressive enhancement and reduced-motion fallbacks.

**Tech Stack:** Next.js, React, TypeScript, Three.js, @react-three/fiber, @react-three/drei, Framer Motion, CSS modules/global CSS.

## Global Constraints

- Do not modify or deploy over the existing live Black Hole or main Quantum Shadow deployments.
- Chess is the central visual metaphor; no black-hole visuals remain in the rebuilt copy.
- Motion must feel premium and purposeful, not decorative clutter.
- Respect prefers-reduced-motion and provide non-WebGL fallbacks.
- Keep page load viable by lazy-loading the 3D canvas and avoiding unnecessary large assets.

---

### Task 1: Next.js Foundation
**Files:** package.json, next.config.mjs, tsconfig.json, app/layout.tsx, app/page.tsx, app/globals.css
- [ ] Replace Vite scripts/dependencies with Next.js App Router equivalents.
- [ ] Add root layout, metadata, global styles, and page shell.
- [ ] Run `npm install` and `npm run build`.
- [ ] Commit foundation.

### Task 2: Premium Chess Hero
**Files:** components/hero/Hero.tsx, components/three/ChessScene.tsx, components/three/ChessFallback.tsx
- [ ] Build a procedural chessboard and stylized chess-piece composition in Three.js.
- [ ] Add pointer parallax, subtle piece float/rotation, lighting, reflections, and controlled camera motion.
- [ ] Add hero copy, CTAs, reduced-motion and WebGL fallback behavior.
- [ ] Build and commit.

### Task 3: Strategic Services Grid
**Files:** components/sections/Services.tsx, components/ui/SectionHeading.tsx
- [ ] Reframe service cards as strategic chess roles with restrained hover motion.
- [ ] Keep copy scannable and business-focused.
- [ ] Build and commit.

### Task 4: Capability / Process Sequence
**Files:** components/sections/StrategyBoard.tsx, components/sections/Process.tsx
- [ ] Add a board-inspired capabilities matrix and staged process sequence.
- [ ] Use scroll reveals without scroll-jacking.
- [ ] Build and commit.

### Task 5: Conversion Sections and Footer
**Files:** components/sections/CTA.tsx, components/layout/Header.tsx, components/layout/Footer.tsx
- [ ] Add premium sticky header, final CTA, and clean footer.
- [ ] Ensure keyboard focus states and responsive behavior.
- [ ] Build and commit.

### Task 6: Verification and Preview
**Files:** all touched files
- [ ] Run production build.
- [ ] Launch local server and capture desktop preview screenshot.
- [ ] Inspect mobile viewport and reduced-motion fallback.
- [ ] Package rebuilt source ZIP for handoff.
