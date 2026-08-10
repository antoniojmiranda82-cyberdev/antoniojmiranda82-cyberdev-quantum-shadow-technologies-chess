# Quantum Shadow Technologies — Chess Motion Site

Six-route Next.js / React Three Fiber experience built around the approved black-and-gold chess visual system.

## Routes

- `/` — King / Strategy
- `/ai-automation` — Queen / AI & Automation
- `/cloud-strategy` — Bishop / Cloud Strategy
- `/cybersecurity` — Rook / Cybersecurity
- `/software` — Knight / Custom Software
- `/process` — Pawn / Execution

## Visual system

- Pure black environment with no background grid.
- Metallic black-and-gold editorial typography.
- Transparent chess-piece artwork rendered inside React Three Fiber.
- Pointer parallax, damped float, scroll choreography, and route-specific motion profiles.
- Gold square particles peel away from each piece and return to their exact source coordinates on a closed motion loop.
- Reduced-motion fallback keeps all content readable and removes continuous motion.

## Optional Runway cinematic generation

The live site never depends on Runway. If cinematic transition assets are generated from the server, configure:

```env
RUNWAYML_API_SECRET=
```

The adapter is server-only and the public site does not expose the secret.

## Commands

```bash
npm install
npm run typecheck
npm run build
npm run start
npm run verify:routes
```

`verify:routes` checks all six public routes against `BASE_URL` or `http://localhost:3000`.

## Safety

This project is the isolated chess rebuild. It does not overwrite the protected Black Hole/main production deployment unless a separate preview is explicitly approved and promoted.
