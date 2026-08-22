'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { routeOrder, pieces } from '../pieces/pieceConfig';

export function Header(){
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link href="/" className="brand" aria-label="Quantum Shadow Technologies home" onClick={() => setOpen(false)}><span className="brand-crown">♚</span><span><strong>Quantum Shadow</strong><small>Technologies</small></span></Link>
    <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(value => !value)}><span/><span/><span/><span className="sr-only">Menu</span></button>
    <nav id="primary-navigation" aria-label="Primary" className={open ? 'is-open' : ''}>
      {routeOrder.map((key) => {
        const p = pieces[key];
        const active = pathname === p.route;
        return <Link key={key} href={p.route} onClick={() => setOpen(false)} aria-current={active ? 'page' : undefined} className={active ? 'is-active' : ''}><span>{p.navLabel}</span></Link>;
      })}
      <Link href="/company" onClick={() => setOpen(false)} aria-current={pathname === '/company' ? 'page' : undefined}>Company</Link>
      <Link href="/contact" onClick={() => setOpen(false)} className="nav-cta">Start a Project</Link>
    </nav>
  </header>;
}
