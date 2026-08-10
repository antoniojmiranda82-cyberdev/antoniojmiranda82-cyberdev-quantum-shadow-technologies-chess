'use client';
import { useEffect, useRef } from 'react';

export type DampedPointer = { x: number; y: number; active: boolean; activity: number };

export function useDampedPointer() {
  const state = useRef<DampedPointer>({ x: 0, y: 0, active: false, activity: 0 });
  const target = useRef({ x: 0, y: 0, active: false, lastMove: 0 });

  useEffect(() => {
    let raf = 0;
    const move = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
      target.current.active = true;
      target.current.lastMove = performance.now();
    };
    const leave = () => { target.current.active = false; };
    const loop = () => {
      state.current.x += (target.current.x - state.current.x) * 0.055;
      state.current.y += (target.current.y - state.current.y) * 0.055;
      state.current.active = target.current.active;
      const alive = target.current.active && performance.now() - target.current.lastMove < 2600;
      state.current.activity += ((alive ? 1 : 0) - state.current.activity) * .06;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', leave, { passive: true });
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', leave);
    };
  }, []);

  return state;
}
