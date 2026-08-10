import Link from 'next/link';
import { pieces, routeOrder } from '../pieces/pieceConfig';

export function Footer(){
  return <footer className="site-footer">
    <div className="footer-brand"><span className="brand-crown">♚</span><div><strong>Quantum Shadow Technologies</strong><small>Strategy in motion</small></div></div>
    <nav aria-label="Footer navigation">{routeOrder.map(key => <Link key={key} href={pieces[key].route}>{pieces[key].label}</Link>)}</nav>
    <div className="footer-meta"><p>AI · Cloud · Cybersecurity · Automation · Custom Software</p><small>© 2026 Quantum Shadow Technologies. Built with strategy, not templates.</small></div>
  </footer>;
}
