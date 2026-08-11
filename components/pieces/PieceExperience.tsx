'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef, type CSSProperties } from 'react';
import type { PieceConfig } from './pieceConfig';
import { useCinematicScroll } from '../motion/useCinematicScroll';
import { CinematicTextScene } from '../cinematic/CinematicTextScene';
import { CinematicTextLine } from '../cinematic/CinematicTextLine';
import { PieceNarrative } from './PieceNarrative';

const PieceScene = dynamic(
  () => import('../three/PieceScene').then((m) => m.PieceScene),
  { ssr: false }
);

export function PieceExperience({ config }: { config: PieceConfig }) {
  const root = useRef<HTMLElement>(null);
  const scroll = useCinematicScroll(root, config.key);

  return (
    <main
      ref={root}
      className={`piece-page piece-${config.key}`}
      style={{ '--piece-accent': config.accent } as CSSProperties}
    >
      <section className="piece-hero" aria-labelledby={`${config.key}-title`}>
        <div className="piece-atmosphere" aria-hidden="true" />

        <CinematicTextScene className="piece-wordflow" >
          <CinematicTextLine index={0} className="flow-word flow-back flow-one">
            {config.lines[0]}
          </CinematicTextLine>
          <CinematicTextLine index={1} className="flow-word flow-front flow-two">
            {config.lines[1]}
          </CinematicTextLine>
          <CinematicTextLine index={2} className="flow-word flow-back flow-three">
            {config.lines[2]}
          </CinematicTextLine>
        </CinematicTextScene>

        <div className="piece-stage" aria-hidden="true">
          <PieceScene config={config} scroll={scroll} />
        </div>

        <div className="piece-copy hybrid-copy">
          <p className="piece-kicker">{config.label} · {config.kicker}</p>
          <h1 id={`${config.key}-title`} className="sr-only">
            {config.lines.join(' ')}
          </h1>
          <p className="piece-summary">{config.summary}</p>
          <div className="piece-actions">
            <Link className="text-link" href={config.nextRoute}>
              {config.nextLabel} <span aria-hidden="true">↗</span>
            </Link>
            <a
              className="text-link secondary"
              href="mailto:hello@quantumshadowtechnologies.com"
            >
              Start a Project
            </a>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>SCROLL</span>
          <i />
        </div>
      </section>

      <PieceNarrative config={config} />
    </main>
  );
}
