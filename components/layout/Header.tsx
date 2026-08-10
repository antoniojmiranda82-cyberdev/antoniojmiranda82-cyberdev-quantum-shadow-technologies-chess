'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routeOrder, pieces } from '../pieces/pieceConfig';

export function Header(){
  const pathname = usePathname();
  return <header className="site-header">
    <Link href="/" className="brand" aria-label="Quantum Shadow Technologies home"><span className="brand-crown">♚</span><span><strong>Quantum Shadow</strong><small>Technologies</small></span></Link>
    <nav aria-label="Primary">
      {routeOrder.map((key) => {
        const p = pieces[key];
        const active = pathname === p.route;
        return <Link key={key} href={p.route} className={active ? 'is-active' : ''}><span>{p.label}</span></Link>;
      })}
      <a href="mailto:hello@quantumshadowtechnologies.com" className="nav-cta">Start a Project</a>
    </nav>
  </header>;
}
