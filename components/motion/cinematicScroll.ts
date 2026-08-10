export type ScrollDirection = -1 | 0 | 1;

export type ScenePhase = {
  entry: number;
  read: number;
  exit: number;
};

export type CinematicScrollState = {
  progress: number;
  targetProgress: number;
  velocity: number;
  direction: ScrollDirection;
  phase: ScenePhase;
  reducedMotion: boolean;
  coarsePointer: boolean;
};

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export function segment(progress: number, start: number, end: number) {
  if (end <= start) return progress >= end ? 1 : 0;
  return clamp01((progress - start) / (end - start));
}

export function getScenePhase(progress: number): ScenePhase {
  const p = clamp01(progress);
  return {
    entry: 1,
    read: 1 - segment(p, 0.12, 0.34),
    exit: segment(p, 0.04, 0.46),
  };
}

export function normalizeVelocity(pxPerMs: number) {
  return Math.min(1, Math.abs(pxPerMs) / 2.4);
}
