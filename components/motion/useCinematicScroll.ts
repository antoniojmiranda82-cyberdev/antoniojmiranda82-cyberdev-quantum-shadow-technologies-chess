'use client';

import { useEffect, useRef, type RefObject } from 'react';
import type { PieceKey } from '../pieces/pieceConfig';
import { cinematicPresets } from '../cinematic/cinematicText';
import {
  clamp01,
  damp,
  getScenePhase,
  normalizeVelocity,
  segment,
  type CinematicScrollState,
  type ScrollDirection,
} from './cinematicScroll';

const initialState: CinematicScrollState = {
  progress: 0,
  targetProgress: 0,
  velocity: 0,
  direction: 0,
  phase: { entry: 1, read: 1, exit: 0 },
  reducedMotion: false,
  coarsePointer: false,
};

export function useCinematicScroll(root: RefObject<HTMLElement | null>, piece: PieceKey) {
  const state = useRef<CinematicScrollState>({
    ...initialState,
    phase: { ...initialState.phase },
  });

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
      const hero = root.current?.querySelector<HTMLElement>('.piece-hero');
      if (hero) {
        const heroTop = window.scrollY + hero.getBoundingClientRect().top;
        const travel = Math.max(window.innerHeight * .9, hero.offsetHeight - window.innerHeight * .55);
        target = clamp01((window.scrollY - heroTop) / travel);
      } else {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        target = clamp01(window.scrollY / max);
      }

      const now = performance.now();
      const dy = window.scrollY - previousY;
      const dt = Math.max(1, now - previousTime);
      rawVelocity = dy / dt;
      previousY = window.scrollY;
      previousTime = now;
    };

    const loop = (now: number) => {
      const dt = Math.min(.05, Math.max(.001, (now - previousFrame) / 1000));
      previousFrame = now;

      const current = state.current;
      current.targetProgress = target;
      current.progress = current.reducedMotion
        ? target
        : damp(current.progress, target, 9.4, dt);
      current.velocity = current.reducedMotion
        ? 0
        : damp(current.velocity, normalizeVelocity(rawVelocity), 7.8, dt);

      const direction: ScrollDirection =
        Math.abs(rawVelocity) < .005 ? 0 : rawVelocity > 0 ? 1 : -1;

      current.direction = direction;
      current.phase = getScenePhase(current.progress);
      rawVelocity *= .86;

      const node = root.current;
      if (node) {
        const mobileStrength =
          current.coarsePointer || window.innerWidth < 720 ? .56 : 1;

        const cinematicPeak = clamp01(
          (current.phase.exit * .72 + current.velocity * .52) *
          preset.peak *
          (1 - current.phase.read * .42)
        );

        node.style.setProperty('--scroll', current.progress.toFixed(4));
        node.style.setProperty('--scene-entry', current.phase.entry.toFixed(4));
        node.style.setProperty('--scene-read', current.phase.read.toFixed(4));
        node.style.setProperty('--scene-exit', current.phase.exit.toFixed(4));
        node.style.setProperty('--scene-velocity', current.velocity.toFixed(4));
        node.style.setProperty('--scene-direction', String(current.direction));
        node.style.setProperty('--cinematic-peak', cinematicPeak.toFixed(4));
        node.style.setProperty('--scene-rise', `${(preset.rise * mobileStrength).toFixed(2)}vh`);
        node.style.setProperty('--scene-exit-distance', `${(preset.exit * mobileStrength).toFixed(2)}vh`);
        node.style.setProperty('--scene-wave', `${(preset.wave * mobileStrength).toFixed(2)}px`);
        node.style.setProperty('--scene-stretch', (preset.stretch * mobileStrength).toFixed(4));
        node.style.setProperty('--scene-blur', `${(preset.blur * mobileStrength).toFixed(2)}px`);
        node.style.setProperty('--scene-stagger', preset.stagger.toFixed(3));
        node.style.setProperty('--gold-position', `${(34 + current.progress * 34 + cinematicPeak * 9).toFixed(2)}%`);

        const copyExit = segment(current.progress, .24, .70);
        node.style.setProperty('--copy-y', `${(-copyExit * 16 * mobileStrength).toFixed(2)}vh`);
        node.style.setProperty('--copy-opacity', Math.max(.22, 1 - copyExit * .78).toFixed(4));
        node.style.setProperty('--copy-blur', `${(copyExit * .9 * mobileStrength).toFixed(2)}px`);

        preset.lateral.forEach((lateral, index) => {
          const lineStart = .14 + index * preset.stagger * .20;
          const lineExit = segment(current.progress, lineStart, .72 + index * .025);
          const phase = index * .86;
          const wave = Math.sin(current.progress * Math.PI * 3.1 + phase) *
            preset.wave *
            mobileStrength *
            (1 - current.phase.read * .94);

          const stretch = 1 +
            Math.sin(current.progress * Math.PI * 2.0 + phase) *
            preset.stretch *
            mobileStrength *
            (1 - current.phase.read * .92);

          const blur =
            Math.max(0, lineExit * preset.blur * .28 + cinematicPeak * .45) *
            mobileStrength;

          const x = lateral * lineExit * mobileStrength +
            wave * .08 * (index === 1 ? 1 : -1);

          const exitFactor = [.84, 1.0, 1.12][index];
          const y = -lineExit * preset.exit * exitFactor * mobileStrength +
            wave * .09;

          const opacity = Math.max(.10, 1 - lineExit * (.58 + index * .08));

          node.style.setProperty(`--scene-wave-${index + 1}`, `${wave.toFixed(2)}px`);
          node.style.setProperty(`--scene-stretch-${index + 1}`, stretch.toFixed(4));
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
