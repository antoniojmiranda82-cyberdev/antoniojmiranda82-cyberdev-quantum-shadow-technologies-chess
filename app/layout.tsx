import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import './liquid-motion.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ChessRouteTransition } from '../components/navigation/ChessRouteTransition';

export const metadata: Metadata = {
  metadataBase: new URL('https://quantum-shadow-technologies.vercel.app'),
  title: { default: 'Quantum Shadow Technologies | Strategy in Motion', template: '%s | Quantum Shadow Technologies' },
  description: 'AI, cloud, cybersecurity, automation, and custom software designed as one strategic system.',
  openGraph: { title: 'Quantum Shadow Technologies', description: 'Strategy-led AI, cloud, cybersecurity, automation, and custom software.', type: 'website', siteName: 'Quantum Shadow Technologies' },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{children: ReactNode}>) {
  const organization = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Quantum Shadow Technologies LLC', telephone: '+1-941-419-8553', areaServed: 'United States', description: 'Strategy-led AI, cloud, cybersecurity, automation, and custom software services.' };
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Header/><ChessRouteTransition/><div id="main-content">{children}</div><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}/></body></html>;
}
