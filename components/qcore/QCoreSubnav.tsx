'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { QMark } from './ConnectPreview';

const links = [
  { href: '/qcore', label: 'Platform' },
  { href: '/qcore/connect', label: 'QCore Connect' },
];

export function QCoreSubnav() {
  const pathname = usePathname();
  return (
    <nav className="qc-subnav" aria-label="QCore">
      <Link href="/qcore" className="qc-subnav__brand"><QMark size={15} /><span>QCore</span></Link>
      <div className="qc-subnav__links">
        {links.map((link) => {
          const active = pathname === link.href;
          return <Link key={link.href} href={link.href} aria-current={active ? 'page' : undefined}>{link.label}</Link>;
        })}
      </div>
      <Link href="/contact#qcore-connect" className="qc-subnav__cta">Get Early Access</Link>
    </nav>
  );
}
