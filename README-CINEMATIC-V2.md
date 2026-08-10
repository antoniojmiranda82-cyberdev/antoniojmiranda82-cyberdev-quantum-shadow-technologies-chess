# Quantum Shadow Cinematic Scroll V2

This is the drop-in upgrade for the working Next.js chess repository.

## What changed
- One shared cinematic scroll controller
- Movie-style upward headline choreography
- Stable reading zone before words exit
- Route-specific King / Queen / Bishop / Rook / Knight / Pawn pacing
- Three.js chess motion calms while text is being read
- Chess glow/pixels gain subtle energy on scene exits
- Navigation feels like the next film scene instead of a hard page cut
- Narrative copy uses cinematic entry/read/exit motion
- Mobile and reduced-motion fallbacks

## Install
Copy the folders/files in this ZIP into the root of the existing chess repository and choose Replace when prompted.

Do NOT delete or replace the repository's existing package-lock.json. This upgrade adds no dependency.

Then:
1. Save.
2. GitHub Desktop: commit `Upgrade cinematic scroll system`.
3. Push origin.
4. Vercel will build automatically.

## Verification
The included package.json adds:
`npm run verify:cinematic`

The code was checked with the cinematic contract verifier and a TypeScript syntax/type-shape pass in the build sandbox. A full npm/Next.js build could not be completed in the sandbox because dependency installation timed out, so Vercel remains the final production build gate.
