# Quantum Shadow King/Home Motion Design

## Goal
Build the King/Home route as the master visual system for the separate-page Quantum Shadow Technologies chess website.

## Experience
The page is cinematic rather than card-based. One isolated black/gold King dominates the composition. It floats in open space with no visible container, follows pointer/touch with damped parallax, tilts subtly, breathes vertically, and emits restrained gold pixel fragments. Typography rises through the page in staggered layers and may pass behind/in front of the piece, rather than appearing in boxed copy blocks.

## Route Architecture
- `/` King / Home
- `/ai-automation` Queen
- `/cloud-strategy` Bishop
- `/cybersecurity` Rook
- `/software` Knight
- `/process` Pawn

This implementation builds `/` and the shared route-transition/motion primitives first. The other routes will reuse the same shell later with piece-specific assets and choreography.

## King Visual System
- Use the isolated King artwork as the hero visual identity.
- Render the artwork in a transparent Three.js/R3F plane/sprite-like composition so DOM remains accessible while Three.js handles depth and interaction.
- No chess board and no boxed hero card.
- Idle motion: slow vertical float, tiny yaw/roll, slow lighting sweep.
- Pointer motion: damped X/Y parallax and tilt, never snapping directly to cursor.
- Hover proximity: gold pixel particles gently separate and orbit, then settle back.
- Scroll motion: piece drifts deeper/right while typography rises and crosses depth layers.
- Respect `prefers-reduced-motion` with static composition and no particle drift.

## Typography
- Large editorial phrases instead of card stacks.
- Intro sequence: `STRATEGY` → `IS` → `THE ADVANTAGE.` rising at different speeds.
- Supporting copy stays in normal semantic HTML and is visually integrated into the composition.
- Use masks/z-index layers so some words pass behind the King.
- Keep line lengths short, spacing generous, and no repeated boxed component pattern.

## Navigation and Page Transitions
- Shared navigation links to the six separate routes.
- Route transition visual language: current piece scales toward camera, gold pixels scatter, next route resolves from dark.
- First implementation provides a reusable transition overlay and navigation hooks; later routes supply their own piece assets.

## Runway Integration
- Three.js/R3F owns all live interaction.
- Runway is optional cinematic media generation only.
- Add a server-only adapter that can submit an image-to-video request using `RUNWAYML_API_SECRET`.
- Do not call Runway automatically on visitor page load.
- The website can use pre-generated/cached motion clips later as masked overlays or transition textures.
- If no API key or generated media exists, the site must remain fully functional.

## Accessibility and Performance
- Hero copy is real HTML.
- Interactive visuals are decorative and do not block keyboard navigation.
- Use responsive image sizing and cap device pixel ratio.
- Pause/reduce animation when the tab is hidden or reduced-motion is enabled.
- No autoplay AI generation, no external API call from client.

## Testing
- `next build` must pass.
- Home route must render without Runway environment variables.
- Reduced-motion mode must disable continuous animation.
- Navigation must remain usable without WebGL.
- Runway adapter must reject missing source image and missing API key with clear server errors.
