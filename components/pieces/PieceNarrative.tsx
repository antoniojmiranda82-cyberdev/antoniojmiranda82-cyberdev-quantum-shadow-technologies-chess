import type { PieceConfig } from './pieceConfig';

export function PieceNarrative({ config }: { config: PieceConfig }) {
  return <section className={`piece-narrative narrative-${config.key}`} aria-labelledby={`${config.key}-narrative`}>
    <p className="narrative-eyebrow">{config.narrative.eyebrow}</p>
    <h2 id={`${config.key}-narrative`}>{config.narrative.statement}</h2>
    <div className="narrative-lines">
      {config.narrative.details.map((detail, index) => <p key={detail}><span>0{index + 1}</span>{detail}</p>)}
    </div>
  </section>;
}
