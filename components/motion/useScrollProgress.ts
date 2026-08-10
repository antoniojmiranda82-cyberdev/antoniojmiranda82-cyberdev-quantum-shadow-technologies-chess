'use client';
import { useEffect, useRef } from 'react';

export function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    let target = 0;
    let smooth = 0;
    let raf = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      target = Math.max(0, Math.min(1, window.scrollY / max));
      if (reduced.matches) progress.current = target;
    };
    const loop = () => {
      if (!reduced.matches) {
        smooth += (target - smooth) * 0.08;
        progress.current += (smooth - progress.current) * 0.055;
      }
      raf = requestAnimationFrame(loop);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return progress;
}
