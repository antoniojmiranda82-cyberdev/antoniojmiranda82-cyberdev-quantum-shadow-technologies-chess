# Quantum Shadow Hybrid + Cinematic Final Polish

Safe drop-in upgrade for the existing Quantum Shadow Technologies chess repository.

## What this upgrade does

- Wires the live `PieceExperience` to `useCinematicScroll`
- Removes the legacy scroll hook from the live hero path
- Makes hero timing relative to the hero section instead of the full page
- Synchronizes Three.js chess movement with the text reading zone
- Calms chess movement while visitors read
- Briefly increases glow, molten-ring energy, and gold pixel activity during transitions
- Adds Hybrid luxury styling as the normal state
- Adds Cinematic intensity only at route arrivals, hero exits, and route handoffs
- Refines header, footer, hover language, mobile motion, and reduced-motion behavior
- Preserves all six routes and existing copy
- Adds no package dependency

## Files in this package

- `app/liquid-motion.css`
- `components/motion/cinematicScroll.ts`
- `components/motion/useCinematicScroll.ts`
- `components/cinematic/cinematicText.ts`
- `components/cinematic/CinematicTextScene.tsx`
- `components/cinematic/CinematicTextLine.tsx`
- `components/pieces/PieceExperience.tsx`
- `components/three/PieceScene.tsx`
- `components/three/GoldPixelLoop.tsx`
- `components/navigation/ChessRouteTransition.tsx`
- `scripts/verify-hybrid-polish.mjs`
- `docs/superpowers/plans/2026-08-10-hybrid-cinematic-final-polish.md`

## Install

1. Extract this ZIP.
2. Copy its contents into the ROOT of the existing chess repository.
3. Choose **Replace files** when Windows asks.
4. Do not delete or replace `package-lock.json`.
5. In GitHub Desktop confirm the changed files appear.
6. Commit with:
   `Apply Hybrid cinematic final polish`
7. Push origin.
8. Vercel will automatically build the new version.

## Optional local verification

From the repository root:

`node scripts/verify-hybrid-polish.mjs`

Then, if dependencies are installed:

`npm run typecheck`

`npm run build`

## Verification completed before packaging

- Hybrid + Cinematic static contract: PASS
- TS/TSX syntax transpile check across all modified source files: PASS

The final Next.js production build remains Vercel's deployment gate after you push.

## Safety

This package is for the isolated chess repository only. It does not modify the protected Black Hole/main production project.
