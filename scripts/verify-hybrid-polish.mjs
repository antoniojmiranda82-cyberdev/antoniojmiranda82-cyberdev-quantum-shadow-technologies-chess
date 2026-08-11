import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const required = [
  'components/motion/cinematicScroll.ts',
  'components/motion/useCinematicScroll.ts',
  'components/cinematic/CinematicTextScene.tsx',
  'components/cinematic/CinematicTextLine.tsx',
  'components/pieces/PieceExperience.tsx',
  'components/three/PieceScene.tsx',
  'components/three/GoldPixelLoop.tsx',
  'components/navigation/ChessRouteTransition.tsx',
  'app/liquid-motion.css',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error(`Missing Hybrid + Cinematic files:\n${missing.join('\n')}`);
  process.exit(1);
}

const experience = fs.readFileSync(
  path.join(root, 'components/pieces/PieceExperience.tsx'),
  'utf8'
);
const scene = fs.readFileSync(
  path.join(root, 'components/three/PieceScene.tsx'),
  'utf8'
);
const css = fs.readFileSync(
  path.join(root, 'app/liquid-motion.css'),
  'utf8'
);

const assertions = [
  [experience.includes('useCinematicScroll'), 'PieceExperience must use useCinematicScroll'],
  [!experience.includes('useScrollProgress'), 'PieceExperience must not use the legacy useScrollProgress hook'],
  [experience.includes('CinematicTextScene'), 'PieceExperience must render CinematicTextScene'],
  [scene.includes('CinematicScrollState'), 'PieceScene must consume CinematicScrollState'],
  [scene.includes('readingCalm'), 'PieceScene must calm movement in the reading zone'],
  [scene.includes('transitionEnergy'), 'PieceScene must increase energy during exits'],
  [scene.includes('pixelActivity'), 'PieceScene must drive live pixel activity'],
  [css.includes('--cinematic-peak'), 'CSS must expose cinematic peak styling'],
  [css.includes('.is-route-leaving'), 'CSS must choreograph route-leaving state'],
  [css.includes('prefers-reduced-motion:reduce'), 'CSS must preserve reduced-motion behavior'],
];

const failed = assertions.filter(([pass]) => !pass);
if (failed.length) {
  for (const [, message] of failed) console.error(`FAIL: ${message}`);
  process.exit(1);
}

console.log('Hybrid + Cinematic polish contract passed.');
