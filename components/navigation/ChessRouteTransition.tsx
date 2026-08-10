'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

export function ChessRouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const navigating = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { reduced.current = mq.matches; };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//') || href === pathname || anchor.hasAttribute('download')) return;
      if (reduced.current) return;
      event.preventDefault();
      if (navigating.current) return;
      navigating.current = true;
      setActive(true);
      window.setTimeout(() => router.push(href), 360);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname, router]);

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => {
      setActive(false);
      navigating.current = false;
    }, 760);
    return () => window.clearTimeout(id);
  }, [pathname, active]);

  return <div className={`route-wipe${active ? ' is-active' : ''}`} aria-hidden="true">
    <div className="route-particles">{Array.from({length: 24}, (_, i) => <b key={i} style={{ '--i': i } as CSSProperties}/>)}</div>
    <span/><span/><span/><span/>
  </div>;
}
