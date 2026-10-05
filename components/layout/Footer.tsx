import Link from 'next/link';
import { pieces, routeOrder } from '../pieces/pieceConfig';

export function Footer(){
  return <footer className="site-footer">
    <div className="footer-brand"><span className="brand-crown">♚</span><div><strong>Quantum Shadow Technologies</strong><small>Strategy in motion</small></div></div>
    <nav aria-label="Footer navigation">{routeOrder.map(key => <Link key={key} href={pieces[key].route}>{pieces[key].navLabel}</Link>)}<Link href="/qcore">QCore</Link><Link href="/qcore/connect">QCore Connect</Link><Link href="/company">Company</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/security">Security</Link><Link href="/accessibility">Accessibility</Link></nav>
    <div className="footer-meta"><p>AI · Cloud · Cybersecurity · Automation · Custom Software</p><p><a href="tel:+19414198553">(941) 419-8553</a><br/>Florida · Serving clients remotely</p><small>© 2026 Quantum Shadow Technologies LLC. All rights reserved.</small></div>
  </footer>;
}
