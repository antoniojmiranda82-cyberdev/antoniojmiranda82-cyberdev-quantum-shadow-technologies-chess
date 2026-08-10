'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { PieceConfig } from './pieceConfig';
import { useScrollProgress } from '../motion/useScrollProgress';
import { useEffect, useRef, type CSSProperties } from 'react';
import { PieceNarrative } from './PieceNarrative';

const PieceScene = dynamic(() => import('../three/PieceScene').then((m) => m.PieceScene), { ssr: false });

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function PieceExperience({ config }: { config: PieceConfig }) {
  const scroll = useScrollProgress();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const element = root.current;
      if (element) {
        const p = clamp(scroll.current);
        const entrance = clamp(p / 0.34);
        const exit = clamp((p - 0.46) / 0.42);
        const focus = clamp(1 - Math.abs(p - 0.30) * 2.05);
        const mobileStrength = window.innerWidth < 720 ? 0.46 : 1;
        const baseWave = Math.sin(p * Math.PI * 2.15) * (1 - exit) * mobileStrength;

        element.style.setProperty('--scroll', p.toFixed(4));
        element.style.setProperty('--liquid-focus', focus.toFixed(4));
        element.style.setProperty('--liquid-exit', exit.toFixed(4));
        element.style.setProperty('--liquid-entrance', entrance.toFixed(4));

        [0.78, 1.08, 1.34].forEach((factor, index) => {
          const phase = index * 0.82;
          const wave = (baseWave * 14 * factor) + Math.sin((p * 8.4) + phase) * 3.4 * (1 - exit);
          const stretch = 1 + Math.sin((p * Math.PI * 1.8) + phase) * 0.032 * factor * (1 - exit) * mobileStrength;
          const blur = Math.max(0, ((1 - focus) * (3.2 + index * 0.7) + exit * 1.8) * mobileStrength);
          const opacity = clamp(0.98 - exit * (0.30 + index * 0.06));

          element.style.setProperty(`--liquid-wave-${index + 1}`, `${wave.toFixed(2)}px`);
          element.style.setProperty(`--liquid-stretch-${index + 1}`, stretch.toFixed(4));
          element.style.setProperty(`--liquid-blur-${index + 1}`, `${blur.toFixed(2)}px`);
          element.style.setProperty(`--liquid-opacity-${index + 1}`, opacity.toFixed(4));
        });
      }

      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(raf);
  }, [scroll]);

  return <main
    ref={root}
    className={`piece-page piece-${config.key}`}
    style={{ '--piece-accent': config.accent } as CSSProperties}
  >
    <section className="piece-hero" aria-labelledby={`${config.key}-title`}>
      <div className="piece-atmosphere" aria-hidden="true" />
      <div className="piece-wordflow" aria-hidden="true">
        <span className="flow-word flow-back flow-one liquid-word" data-liquid-word="1"><i>{config.lines[0]}</i></span>
        <span className="flow-word flow-front flow-two liquid-word" data-liquid-word="2"><i>{config.lines[1]}</i></span>
        <span className="flow-word flow-back flow-three liquid-word" data-liquid-word="3"><i>{config.lines[2]}</i></span>
      </div>
      <div className="piece-stage" aria-hidden="true"><PieceScene config={config} scrollProgress={scroll}/></div>
      <div className="piece-copy liquid-copy">
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
