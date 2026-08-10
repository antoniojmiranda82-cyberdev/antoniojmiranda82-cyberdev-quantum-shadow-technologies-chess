export type PieceKey = 'king' | 'queen' | 'bishop' | 'rook' | 'knight' | 'pawn';
export type PixelPathKind = 'orbit' | 'wide-orbit' | 'diagonal' | 'fortress' | 'angular' | 'rise';

export type PieceMotionProfile = {
  drift: number;
  tilt: number;
  float: number;
  spin: number;
  hoverScale: number;
  scrollX: number;
  scrollY: number;
  pixelPath: PixelPathKind;
  pixelCount: number;
  pixelSpread: number;
  pixelSpeed: number;
};

export type PieceNarrative = {
  eyebrow: string;
  statement: string;
  details: [string, string, string];
};

export type PieceConfig = {
  key: PieceKey;
  route: string;
  label: string;
  kicker: string;
  lines: [string, string, string];
  summary: string;
  image: string;
  accent: string;
  nextRoute: string;
  nextLabel: string;
  motion: PieceMotionProfile;
  narrative: PieceNarrative;
};

export const pieces: Record<PieceKey, PieceConfig> = {
  king: {
    key: 'king', route: '/', label: 'King', kicker: 'Command the board',
    lines: ['STRATEGY', 'IS', 'THE ADVANTAGE.'],
    summary: 'Quantum Shadow Technologies engineers AI, cloud, cybersecurity, automation, and custom software as one coordinated system.',
    image: '/chess/king.png', accent: '#d7ae55', nextRoute: '/ai-automation', nextLabel: 'Queen · AI & Automation',
    motion: { drift:.72, tilt:.10, float:.55, spin:.26, hoverScale:1.025, scrollX:.24, scrollY:-.18, pixelPath:'orbit', pixelCount:150, pixelSpread:1.00, pixelSpeed:.22 },
    narrative: {
      eyebrow: 'The command layer',
      statement: 'Technology becomes an advantage when every move serves the same strategy.',
      details: ['One accountable architecture from concept to deployment.', 'Security, automation, and product decisions designed together.', 'A system built to create leverage before complexity creates drag.']
    }
  },
  queen: {
    key: 'queen', route: '/ai-automation', label: 'Queen', kicker: 'Move everywhere at once',
    lines: ['AUTOMATE', 'WHAT', 'SHOULD MOVE.'],
    summary: 'AI agents, workflows, integrations, and intelligent operations designed to create leverage without creating chaos.',
    image: '/chess/queen.png', accent: '#e1c878', nextRoute: '/cloud-strategy', nextLabel: 'Bishop · Cloud Strategy',
    motion: { drift:.98, tilt:.15, float:.74, spin:.40, hoverScale:1.035, scrollX:.38, scrollY:-.22, pixelPath:'wide-orbit', pixelCount:180, pixelSpread:1.22, pixelSpeed:.30 },
    narrative: {
      eyebrow: 'AI & automation',
      statement: 'The best automation removes friction without removing judgment.',
      details: ['Agents coordinate repeatable work across tools and teams.', 'Integrations move data where decisions actually happen.', 'Human control stays visible while routine execution accelerates.']
    }
  },
  bishop: {
    key: 'bishop', route: '/cloud-strategy', label: 'Bishop', kicker: 'See the angle others miss',
    lines: ['DESIGN', 'THE', 'RIGHT ANGLE.'],
    summary: 'Cloud architecture, Microsoft 365, advisory, governance, and systems strategy aligned before expensive decisions get locked in.',
    image: '/chess/bishop.png', accent: '#d9b45f', nextRoute: '/cybersecurity', nextLabel: 'Rook · Cybersecurity',
    motion: { drift:.62, tilt:.10, float:.50, spin:.25, hoverScale:1.025, scrollX:.30, scrollY:-.20, pixelPath:'diagonal', pixelCount:145, pixelSpread:1.05, pixelSpeed:.24 },
    narrative: {
      eyebrow: 'Cloud strategy',
      statement: 'Architecture should reveal the path before infrastructure makes it expensive to change direction.',
      details: ['Cloud and Microsoft 365 decisions mapped to business reality.', 'Governance designed before access and sprawl become liabilities.', 'Modernization sequenced around risk, cost, and operational continuity.']
    }
  },
  rook: {
    key: 'rook', route: '/cybersecurity', label: 'Rook', kicker: 'Hold the line',
    lines: ['SECURE', 'THE', 'FOUNDATION.'],
    summary: 'Cybersecurity, infrastructure hardening, identity, monitoring, and resilient architecture built into the system from the start.',
    image: '/chess/rook.png', accent: '#d7b75f', nextRoute: '/software', nextLabel: 'Knight · Custom Software',
    motion: { drift:.42, tilt:.065, float:.38, spin:.16, hoverScale:1.018, scrollX:.15, scrollY:-.14, pixelPath:'fortress', pixelCount:135, pixelSpread:.82, pixelSpeed:.18 },
    narrative: {
      eyebrow: 'Cybersecurity',
      statement: 'Resilience is not a layer added at the end. It is the shape of the foundation.',
      details: ['Identity and access designed around least privilege.', 'Infrastructure hardened without making normal work impossible.', 'Monitoring and response focused on signals that change decisions.']
    }
  },
  knight: {
    key: 'knight', route: '/software', label: 'Knight', kicker: 'Take the route nobody expects',
    lines: ['BUILD', 'BEYOND', 'THE OBVIOUS.'],
    summary: 'Custom software, SaaS, mobile experiences, and experimental product work engineered around the problem instead of a template.',
    image: '/chess/knight.png', accent: '#d6ad51', nextRoute: '/process', nextLabel: 'Pawn · Execution',
    motion: { drift:1.04, tilt:.18, float:.80, spin:.46, hoverScale:1.04, scrollX:.42, scrollY:-.24, pixelPath:'angular', pixelCount:175, pixelSpread:1.18, pixelSpeed:.32 },
    narrative: {
      eyebrow: 'Custom software',
      statement: 'Original problems deserve software shaped around the problem, not around a template.',
      details: ['SaaS, mobile, and internal systems built for the actual workflow.', 'Experiments validated quickly before architecture hardens.', 'Interfaces designed to make sophisticated systems feel direct.']
    }
  },
  pawn: {
    key: 'pawn', route: '/process', label: 'Pawn', kicker: 'Execution wins territory',
    lines: ['MOVE', 'WITH', 'DISCIPLINE.'],
    summary: 'Discovery, architecture, build, deployment, automation, observation, and iteration. Progress comes from clean moves made consistently.',
    image: '/chess/pawn.png', accent: '#d6b158', nextRoute: '/', nextLabel: 'King · Return Home',
    motion: { drift:.54, tilt:.08, float:.44, spin:.20, hoverScale:1.022, scrollX:.12, scrollY:-.30, pixelPath:'rise', pixelCount:125, pixelSpread:.76, pixelSpeed:.20 },
    narrative: {
      eyebrow: 'Execution',
      statement: 'Momentum compounds when every move is small enough to verify and strong enough to matter.',
      details: ['Discover the constraint before designing the solution.', 'Build in visible increments with verification at every handoff.', 'Deploy, observe, and improve instead of treating launch as the finish line.']
    }
  }
};

export const routeOrder: PieceKey[] = ['king', 'queen', 'bishop', 'rook', 'knight', 'pawn'];
