import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ChessRouteTransition } from '../components/navigation/ChessRouteTransition';

export const metadata: Metadata = {
  title: 'Quantum Shadow Technologies | Strategy in Motion',
  description: 'AI, cloud, cybersecurity, automation, and custom software engineered as one strategic system.'
};

export default function RootLayout({ children }: Readonly<{children: ReactNode}>) {
  return <html lang="en"><body><Header/><ChessRouteTransition/>{children}<Footer/></body></html>;
}
