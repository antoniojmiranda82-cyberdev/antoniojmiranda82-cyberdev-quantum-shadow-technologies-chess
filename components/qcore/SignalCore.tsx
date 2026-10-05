import { Icon, type IconName } from './icons';

const inputs: { label: string; icon: IconName; y: number }[] = [
  { label: 'Calls', icon: 'phone', y: 104 },
  { label: 'Texts', icon: 'text', y: 216 },
  { label: 'Forms', icon: 'form', y: 328 },
  { label: 'Messages', icon: 'chat', y: 440 },
];

const outputs: { label: string; icon: IconName; y: number; next?: boolean }[] = [
  { label: 'Respond', icon: 'bolt', y: 160 },
  { label: 'Route', icon: 'route', y: 272 },
  { label: 'Next action', icon: 'calendar', y: 384, next: true },
];

const CX = 330;
const CY = 272;

/* Abstract QCore visual: customer activity flows into one core and leaves as clear next steps. */
export function SignalCore() {
  return (
    <svg className="qc-signal" viewBox="0 0 640 544" role="img" aria-labelledby="qc-signal-title">
      <title id="qc-signal-title">Diagram: calls, texts, forms, and messages flow into QCore and leave as a response, a route, and a next action.</title>
      <defs>
        <radialGradient id="qc-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4f8cff" stopOpacity=".42" />
          <stop offset="60%" stopColor="#1d3a78" stopOpacity=".12" />
          <stop offset="100%" stopColor="#04070d" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CX} cy={CY} r="190" fill="url(#qc-core-glow)" />
      <circle className="qc-signal__ring" cx={CX} cy={CY} r="150" />
      <circle className="qc-signal__ring qc-signal__ring--dash" cx={CX} cy={CY} r="112" />

      {inputs.map((n) => {
        const d = `M152 ${n.y} C 230 ${n.y}, 236 ${CY}, ${CX - 66} ${CY}`;
        return (
          <g key={n.label}>
            <path className="qc-signal__path" d={d} />
            <path className="qc-signal__pulse" d={d} pathLength={100} style={{ animationDelay: `${(n.y / 112) * -0.55}s` }} />
            <rect className="qc-signal__node" x="20" y={n.y - 21} width="132" height="42" rx="10" />
            <Icon name={n.icon} size={18} x={36} y={n.y - 9} className="qc-signal__icon" />
            <text className="qc-signal__label" x="64" y={n.y + 5}>{n.label}</text>
          </g>
        );
      })}

      {outputs.map((n) => {
        const d = `M${CX + 66} ${CY} C 440 ${CY}, 440 ${n.y}, 488 ${n.y}`;
        return (
          <g key={n.label} className={n.next ? 'is-next' : undefined}>
            <path className="qc-signal__path" d={d} />
            <path className="qc-signal__pulse qc-signal__pulse--out" d={d} pathLength={100} style={{ animationDelay: `${(n.y / 112) * -0.4}s` }} />
            <rect className="qc-signal__node" x="488" y={n.y - 21} width="150" height="42" rx="10" />
            <Icon name={n.icon} size={18} x={504} y={n.y - 9} className="qc-signal__icon" />
            <text className="qc-signal__label" x="532" y={n.y + 5}>{n.label}</text>
          </g>
        );
      })}

      <circle className="qc-signal__core" cx={CX} cy={CY} r="66" />
      <text className="qc-signal__q" x={CX} y={CY + 25} textAnchor="middle">Q</text>
      <text className="qc-signal__core-label" x={CX} y={CY + 104} textAnchor="middle">QCORE</text>
    </svg>
  );
}
