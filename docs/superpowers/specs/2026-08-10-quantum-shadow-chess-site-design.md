# Quantum Shadow Chess Website Design

## Goal
Build Quantum Shadow Technologies as a six-page cinematic Next.js website where each page is owned by a single black-and-gold chess piece. The site must feel like one continuous luxury technology film, not six duplicated templates.

## Locked Visual Direction
- Pure near-black environment. No visible square/grid background pattern.
- Black metal and polished gold are the core materials.
- The King page sets the quality bar for the entire site.
- Large editorial typography flows vertically through the composition instead of sitting inside boxes or cards.
- King hero typography uses metallic black plus polished gold, not plain white.
- Gold digital pixels visibly peel away from the chess piece, travel through space, and reconstruct in a seamless repeating loop.
- Pixel motion must feel attached to the piece, not like a generic particle background.
- Avoid boxy sections, repetitive feature cards, generic SaaS layouts, and copy-paste page structures.
- Keep the composition spacious, cinematic, and restrained.

## Routes and Chess Roles
1. `/` — King — Home / leadership / brand strategy
2. `/ai-automation` — Queen — AI and automation
3. `/cloud-strategy` — Bishop — cloud strategy and advisory
4. `/cybersecurity` — Rook — cybersecurity and infrastructure
5. `/software` — Knight — custom software and innovation
6. `/process` — Pawn — process, execution, deployment, iteration

## Shared Page Anatomy
Each route uses the same underlying motion engine but receives a distinct choreography profile.

### Hero
- One transparent chess-piece asset is the dominant object.
- Piece floats continuously in open space with no card/background rectangle.
- Pointer movement produces damped parallax, shallow tilt, light depth shift, and subtle piece translation.
- Hover/touch increases pixel activity and light response without causing abrupt scale jumps.
- Scroll moves the piece, copy, and typography at different speeds.
- Typography can move behind and in front of the piece to create real depth.

### Copy
- Main words are large, editorial, and animated upward through the page.
- Supporting copy remains concise and readable.
- Copy should enter as part of the scene, not as a conventional left-column content block.
- CTAs are text-led and minimal.

### Lower Story Section
- Continue the page story without switching to a tiled card grid.
- Use oversized statements, thin rules, staggered labels, timelines, or flowing text depending on the route.
- The page should remain visually related to its chess piece.

## Piece Motion Personalities
### King
- Slowest and most authoritative.
- Very controlled float and rotation.
- Pixel loop peels from the right side, makes a wide orbital sweep, and rejoins the piece.
- Typography is black metal with gold highlights and shifting gold edge light.

### Queen
- Most energetic and multidirectional.
- Faster orbital pixel paths with slightly wider spread.
- Pointer response is more agile than King.
- Copy movement can cross horizontally while still rising vertically.

### Bishop
- Diagonal and sweeping.
- Pixel trails travel on diagonal arcs.
- Camera/parallax response is calm and precise.
- Typography enters along diagonal offsets while maintaining readability.

### Rook
- Heavy and anchored.
- Minimal tilt, lower float amplitude.
- Pixel loop breaks from strong vertical edges and returns in compact defensive arcs.
- Copy movement is deliberate and stable.

### Knight
- Most unexpected.
- Slightly stronger pointer offset and non-linear directional motion.
- Pixel loop uses angular or S-shaped paths rather than a simple orbit.
- Typography can make sharper directional changes while remaining smooth.

### Pawn
- Forward/upward progression.
- Smallest motion amplitude but strongest vertical narrative.
- Pixel loop rises from the base and rebuilds higher along the piece.
- Typography reinforces progress and execution.

## Gold Pixel Motion System
The gold pixels are a first-class visual system shared across all routes.

### Behavior
- Pixels originate from configurable anchor regions attached to the piece image.
- They leave the piece gradually, not all at once.
- Particles move through a route-specific flow field or spline path.
- Scale and opacity change along the path.
- A subset glows brighter near the midpoint of travel.
- Particles return/reconstruct at the source to make a seamless loop.
- Hover increases activity and path spread.
- Scroll can temporarily bias path direction without restarting the loop.
- The loop must not visibly snap when it repeats.

### Rendering
- Three.js / React Three Fiber owns all live interaction.
- Use GPU-friendly Points or instancing rather than a large number of React nodes.
- Keep pixel count quality-tiered for desktop/mobile.
- No large full-screen particle background. The effect remains spatially tied to the piece.

## Typography Motion
- Use transform/opacity/filter only for main animation paths to avoid layout thrash.
- Scroll progress is shared through a lightweight mutable/ref-based motion source.
- Entry animations and scroll choreography must not fight each other.
- Words should rise at different velocities and depths.
- King words use black/gold metallic clipping; other routes inherit matching black/gold treatment with route-specific emphasis.
- No visible background grid or square pattern behind the text.

## Navigation and Route Transitions
- Fixed premium header with active route state.
- All six chess roles remain discoverable.
- Route changes use a cinematic transition rather than an abrupt hard cut.
- Preferred transition: current piece intensifies pixel breakup, black briefly takes the screen, next piece reconstructs from gold fragments.
- Transition must not delay navigation unnecessarily; use a short deterministic duration and respect reduced motion.

## Runway Integration
Runway is an optional cinematic enhancement, not the interactive runtime.

### Responsibilities
- Three.js controls live pointer, hover, scroll, and page interaction.
- Runway can generate short cinematic image-to-video clips for page intros, transition masks, or optional atmospheric overlays.
- Runway calls happen server-side only.
- API key must never be exposed to the browser.
- The website must remain fully functional when no Runway key or generated clip exists.
- Generated video assets should be cached/stored and reused rather than generated for each visitor.

## Architecture
- Next.js App Router + TypeScript.
- Shared `PieceExperience` route shell.
- Shared `PieceScene` WebGL component.
- `pieceConfig` contains route/content/choreography metadata.
- Piece-specific motion values live in a typed choreography config rather than scattered conditionals.
- Shared particle system accepts the active choreography profile.
- Shared route transition provider coordinates navigation animation.
- Runway code remains isolated in server-side library/API code.

## Performance
- Dynamically import WebGL scene client-side.
- Cap DPR on high-density screens.
- Reduce particle count and effects on mobile or low-power devices.
- Pause/simplify WebGL when page is hidden.
- Use `prefers-reduced-motion` to disable continuous float/particle travel and route wipes.
- Avoid unnecessary postprocessing.
- Keep transparent chess assets optimized.

## Accessibility
- Hero has a real semantic H1 even when visual words are aria-hidden.
- Keyboard navigation remains normal.
- Interactive links/buttons have visible focus states.
- Piece artwork is decorative when duplicate semantic content exists.
- Reduced-motion users receive a static premium composition with no information loss.

## Verification
- TypeScript compile check.
- Production Next.js build.
- Route smoke test for all six pages.
- Desktop and mobile visual verification.
- Keyboard navigation check.
- Reduced-motion check.
- No visible grid/square background.
- Pixel loop has no obvious reset/jump.
- No runtime console errors.
- Final Vercel preview deployment before production promotion.
