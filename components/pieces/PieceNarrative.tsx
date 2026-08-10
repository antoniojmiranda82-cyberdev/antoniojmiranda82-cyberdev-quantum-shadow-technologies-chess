import type { CSSProperties } from 'react';
import type { PieceConfig } from './pieceConfig';

export function PieceNarrative({ config }: { config: PieceConfig }) {
  return <section className={`piece-narrative narrative-${config.key}`} aria-labelledby={`${config.key}-narrative`}>
    <p className="narrative-eyebrow liquid-reveal liquid-reveal-soft">{config.narrative.eyebrow}</p>
    <h2 id={`${config.key}-narrative`} className="liquid-reveal liquid-reveal-title">
      <span>{config.narrative.statement}</span>
    </h2>
    <div className="narrative-lines">
      {config.narrative.details.map((detail, index) =>
        <p className="liquid-reveal liquid-reveal-detail" style={{ '--liquid-delay': `${index * 8}%` } as CSSProperties} key={detail}>
          <span>0{index + 1}</span>{detail}
        </p>
      )}
    </div>
  </section>;
}
