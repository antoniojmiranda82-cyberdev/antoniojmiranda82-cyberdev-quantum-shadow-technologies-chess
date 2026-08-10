import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'components/motion/cinematicScroll.ts',
  'components/motion/useCinematicScroll.ts',
  'components/cinematic/CinematicTextScene.tsx',
  'components/cinematic/CinematicTextLine.tsx',
  'components/cinematic/cinematicText.ts',
  'components/pieces/PieceExperience.tsx',
  'components/three/PieceScene.tsx',
  'components/navigation/ChessRouteTransition.tsx',
  'app/liquid-motion.css',
];
const routes = [
  'app/page.tsx',
  'app/ai-automation/page.tsx',
  'app/cloud-strategy/page.tsx',
  'app/cybersecurity/page.tsx',
  'app/software/page.tsx',
  'app/process/page.tsx',
];
const missing = [...required, ...routes].filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error(`Missing cinematic files/routes:\n${missing.join('\n')}`);
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const forbidden = ['gsap', 'lenis', 'framer-motion', '@studio-freight/lenis'];
const dependencies = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
const foundForbidden = forbidden.filter((name) => dependencies[name]);
if (foundForbidden.length) {
  console.error(`Forbidden animation dependencies: ${foundForbidden.join(', ')}`);
  process.exit(1);
}

const css = fs.readFileSync(path.join(root, 'app/liquid-motion.css'), 'utf8');
if (!css.includes('prefers-reduced-motion:reduce')) {
  console.error('Reduced-motion rules are missing.');
  process.exit(1);
}
const experience = fs.readFileSync(path.join(root, 'components/pieces/PieceExperience.tsx'), 'utf8');
if (!experience.includes('useCinematicScroll')) {
  console.error('PieceExperience is not using the cinematic controller.');
  process.exit(1);
}
const scene = fs.readFileSync(path.join(root, 'components/three/PieceScene.tsx'), 'utf8');
if (!scene.includes('CinematicScrollState')) {
  console.error('PieceScene is not consuming CinematicScrollState.');
  process.exit(1);
}
const transition = fs.readFileSync(path.join(root, 'components/navigation/ChessRouteTransition.tsx'), 'utf8');
if (!transition.includes('is-route-leaving')) {
  console.error('Route transition handoff state is missing.');
  process.exit(1);
}

console.log('Cinematic architecture contract passed.');
