import Link from 'next/link';
import type { ReactNode } from 'react';

export function EditorialPage({ label, title, intro, children, cta = true }: { label: string; title: string; intro: string; children: ReactNode; cta?: boolean }) {
  return <main className="editorial-page">
    <section className="editorial-hero">
      <p>{label}</p>
      <h1>{title}</h1>
      <div className="editorial-intro">{intro}</div>
    </section>
    <div className="editorial-content">{children}</div>
    {cta && <section className="conversion-band compact"><p>Ready when you are</p><h2>Tell us what you are building, fixing, or protecting.</h2><Link href="/contact" className="conversion-link">Start a project <span aria-hidden="true">↗</span></Link></section>}
  </main>;
}

export function ContentSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="content-section"><h2>{title}</h2><div>{children}</div></section>;
}
