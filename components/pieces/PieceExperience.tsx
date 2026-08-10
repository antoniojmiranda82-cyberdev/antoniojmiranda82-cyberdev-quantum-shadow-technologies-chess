'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { PieceConfig } from './pieceConfig';
import { useScrollProgress } from '../motion/useScrollProgress';
import { useEffect, useRef, type CSSProperties } from 'react';
import { PieceNarrative } from './PieceNarrative';

const PieceScene = dynamic(() => import('../three/PieceScene').then((m) => m.PieceScene), { ssr: false });

export function PieceExperience({ config }: { config: PieceConfig }) {
  const scroll = useScrollProgress();
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      root.current?.style.setProperty('--scroll', scroll.current.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [scroll]);
  return <main ref={root} className={`piece-page piece-${config.key}`} style={{ '--piece-accent': config.accent } as CSSProperties}>
    <section className="piece-hero" aria-labelledby={`${config.key}-title`}>
      <div className="piece-atmosphere" aria-hidden="true" />
      <div className="piece-wordflow" aria-hidden="true">
        <span className="flow-word flow-back flow-one"><i>{config.lines[0]}</i></span>
        <span className="flow-word flow-front flow-two"><i>{config.lines[1]}</i></span>
        <span className="flow-word flow-back flow-three"><i>{config.lines[2]}</i></span>
      </div>
      <div className="piece-stage" aria-hidden="true"><PieceScene config={config} scrollProgress={scroll}/></div>
      <div className="piece-copy">
        <p className="piece-kicker">{config.label} · {config.kicker}</p>
        <h1 id={`${config.key}-title`} className="sr-only">{config.lines.join(' ')}</h1>
        <p className="piece-summary">{config.summary}</p>
        <div className="piece-actions">
          <Link className="text-link" href={config.nextRoute}>{config.nextLabel} <span aria-hidden="true">↗</span></Link>
          <a className="text-link secondary" href="mailto:hello@quantumshadowtechnologies.com">Start a Project</a>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span>SCROLL</span><i/></div>
    </section>
    <PieceNarrative config={config} />
  </main>;
}
