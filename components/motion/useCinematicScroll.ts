'use client';

import { useEffect, useRef, type RefObject } from 'react';
import type { PieceKey } from '../pieces/pieceConfig';
import { cinematicPresets } from '../cinematic/cinematicText';
import {
  damp,
  getScenePhase,
  normalizeVelocity,
  type CinematicScrollState,
  type ScrollDirection,
} from './cinematicScroll';

const initialState: CinematicScrollState = {
  progress: 0,
  targetProgress: 0,
  velocity: 0,
  direction: 0,
  phase: { entry: 0, read: 0, exit: 0 },
  reducedMotion: false,
  coarsePointer: false,
};

export function useCinematicScroll(root: RefObject<HTMLElement | null>, piece: PieceKey) {
  const state = useRef<CinematicScrollState>({ ...initialState, phase: { ...initialState.phase } });

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const preset = cinematicPresets[piece];
    let target = 0;
    let previousY = window.scrollY;
    let previousTime = performance.now();
    let previousFrame = performance.now();
    let rawVelocity = 0;
    let raf = 0;

    const syncMedia = () => {
      state.current.reducedMotion = reducedQuery.matches;
      state.current.coarsePointer = coarseQuery.matches;
    };

    const updateTarget = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      target = Math.min(1, Math.max(0, window.scrollY / max));
      const now = performance.now();
      const dy = window.scrollY - previousY;
      const dt = Math.max(1, now - previousTime);
      rawVelocity = dy / dt;
      previousY = window.scrollY;
      previousTime = now;
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - previousFrame) / 1000));
      previousFrame = now;
      const current = state.current;
      current.targetProgress = target;
      current.progress = current.reducedMotion ? target : damp(current.progress, target, 9.2, dt);
      current.velocity = current.reducedMotion ? 0 : damp(current.velocity, normalizeVelocity(rawVelocity), 7.8, dt);
      const direction: ScrollDirection = Math.abs(rawVelocity) < 0.005 ? 0 : rawVelocity > 0 ? 1 : -1;
      current.direction = direction;
      current.phase = getScenePhase(current.progress);
      rawVelocity *= 0.86;

      const node = root.current;
      if (node) {
        const mobileStrength = current.coarsePointer || window.innerWidth < 720 ? 0.58 : 1;
        const velocityEnergy = current.velocity * 0.22;
        node.style.setProperty('--scroll', current.progress.toFixed(4));
        node.style.setProperty('--scene-entry', current.phase.entry.toFixed(4));
        node.style.setProperty('--scene-read', current.phase.read.toFixed(4));
        node.style.setProperty('--scene-exit', current.phase.exit.toFixed(4));
        node.style.setProperty('--scene-velocity', current.velocity.toFixed(4));
        node.style.setProperty('--scene-direction', String(current.direction));
        node.style.setProperty('--scene-rise', `${(preset.rise * mobileStrength).toFixed(2)}vh`);
        node.style.setProperty('--scene-exit-distance', `${(preset.exit * mobileStrength).toFixed(2)}vh`);
        node.style.setProperty('--scene-wave', `${(preset.wave * mobileStrength).toFixed(2)}px`);
        node.style.setProperty('--scene-stretch', (preset.stretch * mobileStrength).toFixed(4));
        node.style.setProperty('--scene-blur', `${(preset.blur * mobileStrength).toFixed(2)}px`);
        node.style.setProperty('--scene-stagger', preset.stagger.toFixed(3));
        node.style.setProperty('--gold-position', `${(35 + current.progress * 28).toFixed(2)}%`);
        node.style.setProperty('--copy-y', `${(-current.progress * 17).toFixed(2)}vh`);
        node.style.setProperty('--copy-opacity', Math.max(.24, 1 - current.progress * .74).toFixed(4));
        node.style.setProperty('--copy-blur', `${(current.phase.exit * .7).toFixed(2)}px`);

        preset.lateral.forEach((lateral, index) => {
          const phase = index * 0.86;
          const wave = Math.sin(current.progress * Math.PI * 3.2 + phase) * preset.wave * mobileStrength * (1 - current.phase.read * .92);
          const stretch = 1 + Math.sin(current.progress * Math.PI * 2.15 + phase) * preset.stretch * mobileStrength * (1 - current.phase.read * .9);
          const blur = Math.max(0, (1 - current.phase.read) * preset.blur * mobileStrength * .42 + current.phase.exit * .75);
          const x = lateral * current.progress * mobileStrength + wave * .11 * (index === 1 ? 1 : -1);
          const exitFactor = [.84, 1.0, 1.13][index];
          const y = -current.phase.exit * preset.exit * exitFactor * mobileStrength + wave * .12;
          const opacity = Math.max(.12, 1 - current.phase.exit * (.58 + index * .07));
          node.style.setProperty(`--scene-wave-${index + 1}`, `${wave.toFixed(2)}px`);
          node.style.setProperty(`--scene-stretch-${index + 1}`, (stretch + velocityEnergy * .012).toFixed(4));
          node.style.setProperty(`--scene-blur-${index + 1}`, `${blur.toFixed(2)}px`);
          node.style.setProperty(`--scene-x-${index + 1}`, `${x.toFixed(2)}vw`);
          node.style.setProperty(`--scene-y-${index + 1}`, `${y.toFixed(2)}vh`);
          node.style.setProperty(`--scene-opacity-${index + 1}`, opacity.toFixed(4));
        });
      }

      raf = requestAnimationFrame(loop);
    };

    syncMedia();
    updateTarget();
    reducedQuery.addEventListener('change', syncMedia);
    coarseQuery.addEventListener('change', syncMedia);
    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      reducedQuery.removeEventListener('change', syncMedia);
      coarseQuery.removeEventListener('change', syncMedia);
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
    };
  }, [piece, root]);

  return state;
}
