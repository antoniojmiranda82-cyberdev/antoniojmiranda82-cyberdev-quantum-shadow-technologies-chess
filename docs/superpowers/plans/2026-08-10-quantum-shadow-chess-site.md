# Quantum Shadow Chess Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete a six-route cinematic Quantum Shadow Technologies website where every route has a unique interactive black-and-gold chess piece, flowing typography, and a seamless piece-attached gold-pixel motion loop.

**Architecture:** Keep the existing Next.js App Router route shell and centralize all per-piece choreography in typed configuration. React Three Fiber owns the live chess-piece plane, pointer parallax, floating motion, and GPU-friendly pixel loop; DOM/CSS owns accessible editorial typography and supporting copy. Runway remains an optional server-side cinematic asset generator and never blocks the live site.

**Tech Stack:** Next.js 15, React 19, TypeScript 5.9, Three.js 0.185, React Three Fiber 9, Drei 10, CSS, optional Runway image-to-video API.

## Global Constraints
- Pure near-black environment; remove all visible background grid/square patterns.
- Preserve the approved black-and-gold chess assets under `public/chess/`.
- King is the visual quality benchmark.
- King typography must use metallic black and polished gold, never plain white.
- Gold pixels must visibly peel from the piece and reconstruct in a seamless motion loop.
- Each route must have a distinct motion personality.
- No boxy feature-card grids or generic SaaS section layouts.
- Three.js owns live interaction; Runway is optional cinematic enhancement only.
- Respect `prefers-reduced-motion` and keep full information available without animation.
- Do not modify or deploy over the protected Black Hole/main production version until preview verification is approved.

---

## File Structure

### Shared motion and scene
- Modify: `components/three/PieceScene.tsx` — interactive piece plane, looped pixel field, quality tier, WebGL lifecycle.
- Create: `components/three/GoldPixelLoop.tsx` — GPU-friendly piece-attached pixel loop.
- Modify: `components/motion/useDampedPointer.ts` — pointer damping and pointer activity signal if needed.
- Modify: `components/motion/useScrollProgress.ts` — shared scroll progress, reduced-motion safe.

### Piece configuration and route shell
- Modify: `components/pieces/pieceConfig.ts` — typed choreography metadata for all six pieces.
- Modify: `components/pieces/PieceExperience.tsx` — route-specific word choreography and lower narrative structure.
- Create: `components/pieces/PieceNarrative.tsx` — non-boxy route-specific supporting narrative.

### Navigation and transitions
- Modify: `components/layout/Header.tsx` — six-route navigation, active state, accessible mobile behavior.
- Modify: `components/navigation/ChessRouteTransition.tsx` — pixel-led route transition and reduced-motion fallback.

### Visual system
- Modify: `app/globals.css` — remove grid, complete black/gold typography, route-specific DOM choreography, responsive/reduced-motion states.

### Runway
- Modify: `lib/runway.ts` — validated server-only adapter with timeout/errors.
- Create: `app/api/runway/image-to-video/route.ts` — optional authenticated server endpoint only if admin generation is required by the existing architecture.
- Modify: `.env.example` — document `RUNWAYML_API_SECRET` without real secrets.

### Verification
- Create: `scripts/verify-routes.mjs` — six-route HTTP smoke test against local production server.
- Modify: `package.json` — add `typecheck` and route verification scripts.

---

### Task 1: Lock the clean black visual environment

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing `.piece-atmosphere`, `.piece-page`, `.piece-stage`, `.flow-word` selectors.
- Produces: a grid-free visual foundation used by every route.

- [ ] **Step 1: Add a regression search command for grid declarations**

Run:
```bash
grep -nE 'linear-gradient\([^)]*1px|background-size:[^;]*92px|grid' app/globals.css
```
Expected before change: match in `.piece-atmosphere` for the 92px square grid.

- [ ] **Step 2: Remove the square grid layers from `.piece-atmosphere`**

Replace the atmosphere background with soft radial illumination only:
```css
.piece-atmosphere{
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    radial-gradient(circle at 62% 34%,color-mix(in srgb,var(--piece-accent) 7%,transparent),transparent 25%),
    radial-gradient(circle at 50% 36%,rgba(255,255,255,.022),transparent 34%);
  mask-image:linear-gradient(to bottom,black 0 62%,transparent 94%);
  opacity:.9;
  z-index:0;
}
```

- [ ] **Step 3: Ensure no page-level grid remains**

Run:
```bash
grep -n '92px 92px\|linear-gradient(rgba(255,255,255,.018) 1px' app/globals.css
```
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "style: remove chess page background grid"
```

---

### Task 2: Define typed choreography for all six chess pieces

**Files:**
- Modify: `components/pieces/pieceConfig.ts`

**Interfaces:**
- Consumes: `PieceKey`, route labels, existing image paths.
- Produces: `PieceMotionProfile` and `PixelLoopProfile` consumed by `PieceScene`, `GoldPixelLoop`, and `PieceExperience`.

- [ ] **Step 1: Add motion profile types**

Add:
```ts
export type PixelPathKind = 'orbit' | 'wide-orbit' | 'diagonal' | 'fortress' | 'angular' | 'rise';

export type PieceMotionProfile = {
  drift: number;
  tilt: number;
  float: number;
  spin: number;
  hoverScale: number;
  scrollX: number;
  scrollY: number;
  pixelPath: PixelPathKind;
  pixelCount: number;
  pixelSpread: number;
  pixelSpeed: number;
};
```

Extend `PieceConfig` with:
```ts
motion: PieceMotionProfile;
```

- [ ] **Step 2: Encode the six approved personalities**

Use these values as the initial tuning baseline:
```ts
king:   { drift:.72, tilt:.10, float:.55, spin:.26, hoverScale:1.025, scrollX:.24, scrollY:-.18, pixelPath:'orbit',      pixelCount:150, pixelSpread:1.00, pixelSpeed:.22 },
queen:  { drift:.98, tilt:.15, float:.74, spin:.40, hoverScale:1.035, scrollX:.38, scrollY:-.22, pixelPath:'wide-orbit', pixelCount:180, pixelSpread:1.22, pixelSpeed:.30 },
bishop: { drift:.62, tilt:.10, float:.50, spin:.25, hoverScale:1.025, scrollX:.30, scrollY:-.20, pixelPath:'diagonal',   pixelCount:145, pixelSpread:1.05, pixelSpeed:.24 },
rook:   { drift:.42, tilt:.065,float:.38, spin:.16, hoverScale:1.018, scrollX:.15, scrollY:-.14, pixelPath:'fortress',   pixelCount:135, pixelSpread:.82, pixelSpeed:.18 },
knight: { drift:1.04, tilt:.18, float:.80, spin:.46, hoverScale:1.04,  scrollX:.42, scrollY:-.24, pixelPath:'angular',    pixelCount:175, pixelSpread:1.18, pixelSpeed:.32 },
pawn:   { drift:.54, tilt:.08, float:.44, spin:.20, hoverScale:1.022, scrollX:.12, scrollY:-.30, pixelPath:'rise',       pixelCount:125, pixelSpread:.76, pixelSpeed:.20 },
```

- [ ] **Step 3: Type-check config**

Run:
```bash
npx tsc --noEmit
```
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add components/pieces/pieceConfig.ts
git commit -m "refactor: centralize chess motion profiles"
```

---

### Task 3: Build the seamless gold-pixel peel/reconstruct loop

**Files:**
- Create: `components/three/GoldPixelLoop.tsx`
- Modify: `components/three/PieceScene.tsx`

**Interfaces:**
- Consumes: `accent: string`, `profile: PieceMotionProfile`, `activity: number`, `scroll: number`.
- Produces: `GoldPixelLoop` React Three Fiber component with no React state updates inside the frame loop.

- [ ] **Step 1: Create deterministic particle seeds**

Use a seeded helper so particles do not jump after React remounts:
```ts
function seeded(index: number, salt: number) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}
```

- [ ] **Step 2: Build one `THREE.Points` geometry with per-particle attributes**

Create attributes for:
```ts
position     // base/source attachment point
phase        // 0..1 loop phase offset
radius       // path radius
height       // vertical spread
size         // pixel size
brightness   // individual pulse weight
```
Use `profile.pixelCount` as desktop target count.

- [ ] **Step 3: Implement continuous phase without reset**

In `useFrame`, calculate:
```ts
const phase = (seedPhase + elapsed * profile.pixelSpeed) % 1;
```
For each particle, movement must follow a closed path where phase `1` returns to the exact phase `0` source position. Never reset object position from an end point to a visibly different start point.

- [ ] **Step 4: Implement route-specific paths**

Use path functions with the same signature:
```ts
type PixelPath = (phase: number, radius: number, height: number) => THREE.Vector3;
```
Required behaviors:
- `orbit`: wide calm King orbit that peels primarily to the right.
- `wide-orbit`: Queen orbit with larger radius and secondary vertical wave.
- `diagonal`: Bishop diagonal sweep before returning.
- `fortress`: Rook compact edge-adjacent arcs.
- `angular`: Knight two-stage angular/S path with smoothed corners.
- `rise`: Pawn vertical lift and return.

- [ ] **Step 5: Keep particles attached to the piece coordinate space**

Render `GoldPixelLoop` inside the same `group` as the piece plane so pointer movement, float, scale, and scroll move both together.

- [ ] **Step 6: Add hover/pointer activity modulation**

Activity may change spread, brightness, and speed by at most:
```ts
spreadMultiplier = 1 + activity * 0.22;
speedMultiplier = 1 + activity * 0.18;
```
Do not create explosive particle bursts.

- [ ] **Step 7: Replace old `PixelField`**

Delete the existing random `PixelField` implementation from `PieceScene.tsx` and mount:
```tsx
<GoldPixelLoop
  accent={config.accent}
  profile={config.motion}
  activity={hovered ? 1 : 0}
  scroll={scrollProgress.current}
/>
```

- [ ] **Step 8: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add components/three/GoldPixelLoop.tsx components/three/PieceScene.tsx
git commit -m "feat: add seamless chess pixel motion loop"
```

---

### Task 4: Upgrade interactive piece motion and rendering quality

**Files:**
- Modify: `components/three/PieceScene.tsx`
- Modify: `components/motion/useDampedPointer.ts`

**Interfaces:**
- Consumes: `config.motion`, pointer NDC/activity, scroll ref.
- Produces: stable responsive piece motion without unnecessary React renders.

- [ ] **Step 1: Replace hardcoded `personality` object**

Use `config.motion` exclusively so the scene has one source of truth.

- [ ] **Step 2: Add damped piece position/rotation targets**

Calculate targets:
```ts
const targetX = pointer.x * (0.26 + motion.drift * 0.12) + scroll * motion.scrollX;
const targetY = pointer.y * 0.20 + Math.sin(t * motion.float) * 0.11 + scroll * motion.scrollY;
const targetRY = pointer.x * motion.tilt;
const targetRX = -pointer.y * motion.tilt * 0.62;
```
Use `THREE.MathUtils.damp` when frame delta is available to make movement frame-rate independent.

- [ ] **Step 3: Add quality-tier DPR**

Set Canvas DPR to:
```tsx
dpr={[1, 1.75]}
```
and use fewer particles on narrow/coarse-pointer devices.

- [ ] **Step 4: Pause motion when document is hidden**

Track `visibilitychange` in a small ref and skip nonessential animation updates while hidden.

- [ ] **Step 5: Preserve reduced motion**

When `prefers-reduced-motion` is true:
- no continuous float
- no rotating particle travel
- no pointer tilt
- static piece and restrained glow

- [ ] **Step 6: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components/three/PieceScene.tsx components/motion/useDampedPointer.ts
git commit -m "perf: refine interactive chess piece motion"
```

---

### Task 5: Finish black-and-gold flowing typography for all routes

**Files:**
- Modify: `app/globals.css`
- Modify: `components/pieces/PieceExperience.tsx`

**Interfaces:**
- Consumes: `--scroll`, `--piece-accent`, `piece-${config.key}` class.
- Produces: route-specific editorial word motion with King-grade metallic treatment.

- [ ] **Step 1: Keep King material as the master**

Preserve the existing black/gold `background-clip:text` treatment and tune it to remain legible on pure black without a grid.

- [ ] **Step 2: Add shared black/gold base for non-King pages**

Use a shared metallic gradient with route accent controlling gold emphasis:
```css
.piece-page:not(.piece-king) .flow-word{
  color:transparent;
  background:linear-gradient(110deg,#070809 5%,#191713 28%,var(--piece-accent) 46%,#f0d987 52%,#8d681f 61%,#090a0b 82%);
  background-size:190% 100%;
  -webkit-background-clip:text;
  background-clip:text;
  -webkit-text-fill-color:transparent;
}
```

- [ ] **Step 3: Give each route a distinct flow path**

Add route selectors:
```css
.piece-queen  .flow-two { /* quicker lateral rise */ }
.piece-bishop .flow-one { /* diagonal offset */ }
.piece-rook   .flow-three{ /* stable low lateral drift */ }
.piece-knight .flow-two { /* stronger directional shift */ }
.piece-pawn   .flow-three{ /* strongest vertical rise */ }
```
Each selector must use transform/opacity only during scroll choreography.

- [ ] **Step 4: Prevent entry keyframes from overwriting scroll transforms**

Move initial entry animation to nested spans or a CSS custom-property composition so keyframe `transform` does not compete with scroll `transform`.

- [ ] **Step 5: Validate reduced motion**

Ensure all words render in their final readable position under `prefers-reduced-motion`.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css components/pieces/PieceExperience.tsx
git commit -m "style: complete cinematic chess typography"
```

---

### Task 6: Make every route tell a different story without card grids

**Files:**
- Create: `components/pieces/PieceNarrative.tsx`
- Modify: `components/pieces/PieceExperience.tsx`
- Modify: `components/pieces/pieceConfig.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `PieceConfig`.
- Produces: route-specific narrative content using one semantic component and multiple layout modes.

- [ ] **Step 1: Add narrative data to config**

Extend `PieceConfig`:
```ts
narrative: {
  eyebrow: string;
  statement: string;
  details: [string, string, string];
};
```

- [ ] **Step 2: Populate route-specific content**

Use concise service-specific copy. Do not reuse the same three sentences across routes.

- [ ] **Step 3: Build `PieceNarrative` without cards**

Structure:
```tsx
<section className={`piece-narrative narrative-${config.key}`}>
  <p className="narrative-eyebrow">...</p>
  <h2>...</h2>
  <div className="narrative-lines">
    <p>...</p><p>...</p><p>...</p>
  </div>
</section>
```
No bordered rectangle around the section. Use spacing, rules, alignment, and typography for hierarchy.

- [ ] **Step 4: Give routes different narrative layouts**

- King: centered strategic statement.
- Queen: staggered fast-moving lines.
- Bishop: diagonal two-column alignment.
- Rook: left-aligned anchored stack with vertical rule.
- Knight: offset/alternating lines.
- Pawn: sequential vertical progression.

- [ ] **Step 5: Commit**

```bash
git add components/pieces/PieceNarrative.tsx components/pieces/PieceExperience.tsx components/pieces/pieceConfig.ts app/globals.css
git commit -m "feat: add route-specific chess narratives"
```

---

### Task 7: Complete six-route navigation and cinematic transitions

**Files:**
- Modify: `components/layout/Header.tsx`
- Modify: `components/navigation/ChessRouteTransition.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `routeOrder`, `pieces`, Next.js pathname/router.
- Produces: accessible active nav plus deterministic transition state.

- [ ] **Step 1: Render all six chess routes from config**

Avoid manually duplicating route labels in Header. Map `routeOrder` to `pieces[key]`.

- [ ] **Step 2: Preserve navigation semantics**

Use normal links for progressive enhancement. Do not trap keyboard navigation.

- [ ] **Step 3: Upgrade route transition visual**

Transition sequence:
1. 0–180ms: gold particle/glint intensity rises.
2. 180–420ms: black veil/wipe covers page.
3. Navigate at full cover.
4. 420–760ms: black veil opens and destination piece appears.

Use CSS/DOM overlay for reliability; do not require WebGL state to complete navigation.

- [ ] **Step 4: Reduced-motion fallback**

Navigate immediately or with a short opacity fade under reduced motion.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Header.tsx components/navigation/ChessRouteTransition.tsx app/globals.css
git commit -m "feat: complete chess route navigation transitions"
```

---

### Task 8: Harden optional Runway cinematic integration

**Files:**
- Modify: `lib/runway.ts`
- Create: `app/api/runway/image-to-video/route.ts` only if the site needs an in-project generation endpoint.
- Modify: `.env.example`

**Interfaces:**
- Consumes: server-only `RUNWAYML_API_SECRET`, approved source image URL/base64, controlled prompt.
- Produces: generation task ID/status while failing gracefully when unconfigured.

- [ ] **Step 1: Add explicit server guard**

In `lib/runway.ts`:
```ts
if (typeof window !== 'undefined') {
  throw new Error('Runway adapter is server-only');
}
```
Do not export secrets or env values.

- [ ] **Step 2: Validate required secret**

Return a clear typed configuration error when `RUNWAYML_API_SECRET` is absent.

- [ ] **Step 3: Add request timeout**

Use `AbortSignal.timeout(30_000)` or an `AbortController` equivalent.

- [ ] **Step 4: Use a controlled prompt template**

Prompts must preserve piece geometry and request fixed-camera, subtle motion. Never allow arbitrary public visitor prompts through this endpoint.

- [ ] **Step 5: Document environment variable**

Add to `.env.example`:
```env
RUNWAYML_API_SECRET=
```

- [ ] **Step 6: Confirm site has no runtime dependency on Runway**

Run:
```bash
grep -R "runway" -n app components | grep -v 'app/api/runway' || true
```
Expected: no client component directly calls Runway.

- [ ] **Step 7: Commit**

```bash
git add lib/runway.ts app/api/runway .env.example
git commit -m "feat: harden optional Runway cinematic adapter"
```

---

### Task 9: Add production verification commands

**Files:**
- Create: `scripts/verify-routes.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: running local production server at `BASE_URL` or `http://localhost:3000`.
- Produces: nonzero exit code when any chess route is unavailable.

- [ ] **Step 1: Add typecheck script**

Update `package.json`:
```json
"typecheck": "tsc --noEmit"
```

- [ ] **Step 2: Create route smoke script**

Use:
```js
const base = process.env.BASE_URL ?? 'http://localhost:3000';
const routes = ['/', '/ai-automation', '/cloud-strategy', '/cybersecurity', '/software', '/process'];
let failed = false;
for (const route of routes) {
  const response = await fetch(`${base}${route}`);
  console.log(response.status, route);
  if (!response.ok) failed = true;
}
if (failed) process.exit(1);
```

- [ ] **Step 3: Add script**

```json
"verify:routes": "node scripts/verify-routes.mjs"
```

- [ ] **Step 4: Run typecheck**

```bash
npm run typecheck
```
Expected: PASS.

- [ ] **Step 5: Run production build**

```bash
npm run build
```
Expected: PASS.

- [ ] **Step 6: Start production server**

```bash
npm run start
```
Expected: server listening on port 3000.

- [ ] **Step 7: Smoke-test all six routes**

In a second shell:
```bash
npm run verify:routes
```
Expected: six `200` responses and exit code 0.

- [ ] **Step 8: Commit**

```bash
git add scripts/verify-routes.mjs package.json package-lock.json
git commit -m "test: add chess route production verification"
```

---

### Task 10: Visual, responsive, and accessibility QA

**Files:**
- Modify as failures require: `app/globals.css`, `components/three/PieceScene.tsx`, `components/pieces/PieceExperience.tsx`, `components/layout/Header.tsx`.

**Interfaces:**
- Consumes: complete six-route build.
- Produces: review-ready Vercel preview.

- [ ] **Step 1: Desktop review at 1440×900**

Check every route for:
- piece fully visible
- no grid/square background
- no clipped headline
- pixel loop visibly connected to piece
- no obvious loop snap
- headline reads over black background
- no boxy feature-grid sections

- [ ] **Step 2: Mobile review at 390×844**

Check:
- no horizontal overflow
- chess piece remains visible without obscuring all copy
- nav remains usable
- CTAs remain reachable
- pixel count/effects are reduced enough to remain smooth

- [ ] **Step 3: Keyboard review**

Tab through header and CTAs. Expected: logical order and visible focus.

- [ ] **Step 4: Reduced-motion review**

Emulate `prefers-reduced-motion: reduce`. Expected:
- no continuous float
- no orbital pixel motion
- no route wipe animation
- all words/copy remain visible

- [ ] **Step 5: Console review**

Expected: no uncaught errors, no hydration warnings, no missing asset 404s.

- [ ] **Step 6: Commit QA fixes**

```bash
git add app components public
ngit_status=$(git status --short)
printf '%s\n' "$ngit_status"
git commit -m "fix: polish six-page chess experience"
```

---

### Task 11: Preview deployment and final approval gate

**Files:**
- No source changes unless Vercel verification exposes an issue.

**Interfaces:**
- Consumes: verified feature branch.
- Produces: isolated Vercel preview URL and final screenshot set.

- [ ] **Step 1: Confirm branch status**

```bash
git status --short --branch
```
Expected: clean feature branch.

- [ ] **Step 2: Deploy preview only**

Deploy the chess rebuild to an isolated preview target. Do not overwrite the protected Black Hole/main production deployment.

- [ ] **Step 3: Verify all routes on preview URL**

Run:
```bash
BASE_URL="<preview-url>" npm run verify:routes
```
Expected: six 200 responses.

- [ ] **Step 4: Capture final visual review**

Capture at minimum:
- King desktop
- Queen desktop
- Rook desktop
- Knight desktop
- King mobile

- [ ] **Step 5: User approval gate**

Present the preview in chat for approval before any production alias/domain promotion.

---

## Self-Review

### Spec coverage
- Six separate routes: covered by Tasks 2, 6, 7, 9, 10.
- Different motion per chess piece: Tasks 2–4.
- Black/gold King typography: Task 5.
- No square/grid background: Task 1 and QA Task 10.
- Seamless gold pixels peeling off/rebuilding: Task 3.
- Flowing non-boxy words/content: Tasks 5–6.
- Route transitions: Task 7.
- Runway optional integration: Task 8.
- Mobile/performance/reduced motion: Tasks 4 and 10.
- Production verification and safe preview deployment: Tasks 9–11.

### Placeholder scan
No TBD/TODO placeholders are present. `<preview-url>` appears only as a runtime value obtained during deployment, not an unspecified implementation requirement.

### Type consistency
`PieceMotionProfile`, `PixelPathKind`, `PieceConfig.motion`, and `GoldPixelLoop` inputs are defined before use and referenced consistently across tasks.
