# Quantum Shadow Hybrid + Cinematic Final Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the live chess experience to one cinematic scroll source and apply a restrained luxury base with selective cinematic peaks.

**Architecture:** `useCinematicScroll` owns hero-local progress, velocity, direction, route-specific motion variables, and cinematic peak intensity. `PieceExperience` renders semantic/visual text through reusable cinematic primitives, while `PieceScene` consumes the same mutable scroll state to calm during reading and intensify during handoffs. CSS provides luxury chrome, route arrival, route-leaving choreography, mobile restraint, and reduced-motion fallbacks.

**Tech Stack:** Next.js 15.5, React 19.1, TypeScript 5.9, React Three Fiber 9.7, Drei 10.7.8, Three.js 0.185.1, CSS custom properties, requestAnimationFrame.

## Global Constraints
- Preserve all six existing routes and copy.
- Keep native scroll. No scroll hijacking.
- Keep real DOM text.
- Keep one shared scroll RAF for the hero experience.
- Add no animation dependency.
- Keep mobile calmer than desktop.
- Preserve reduced-motion usability.
- Do not modify the protected Black Hole/main production project.

---

### Task 1: Cinematic timing source
- [ ] Replace global-page timing with hero-local progress.
- [ ] Publish scene/read/exit/velocity/cinematic-peak CSS variables.
- [ ] Preserve six route-specific motion presets.
- [ ] Verify `node scripts/verify-hybrid-polish.mjs`.

### Task 2: Live hero wiring
- [ ] Replace `useScrollProgress` in `PieceExperience`.
- [ ] Render hero words with `CinematicTextScene` and `CinematicTextLine`.
- [ ] Pass shared cinematic state to `PieceScene`.
- [ ] Verify no legacy hook import remains in live experience.

### Task 3: Three.js synchronization
- [ ] Consume `CinematicScrollState`.
- [ ] Reduce pointer/float/rotation while `phase.read` is high.
- [ ] Increase glow, rim, molten ring, and pixel energy during `phase.exit`/velocity.
- [ ] Preserve route motion profiles.

### Task 4: Hybrid + Cinematic visual polish
- [ ] Make header/footer quieter and more premium.
- [ ] Add arrival animation and stable reading state.
- [ ] Add cinematic route-leaving burst.
- [ ] Add mobile restraint.
- [ ] Add reduced-motion fallback.

### Task 5: Verification and handoff
- [ ] Run static contract verification.
- [ ] Run TypeScript/build if dependencies are available locally.
- [ ] Package only changed files plus README.
- [ ] User copies package into existing chess repository and pushes through GitHub Desktop.
- [ ] Verify resulting Vercel deployment before calling work complete.
