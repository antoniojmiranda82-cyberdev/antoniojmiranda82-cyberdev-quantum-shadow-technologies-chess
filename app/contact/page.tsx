import type { Metadata } from 'next';
import Link from 'next/link';
import { EditorialPage } from '../../components/layout/EditorialPage';

export const metadata: Metadata = { title: 'Start a Project', description: 'Start a conversation with Quantum Shadow Technologies about AI, automation, cloud, cybersecurity, or custom software.' };

export default function ContactPage() {
  return <EditorialPage label="Start a project" title="Begin with the problem—not a sales pitch." intro="Tell us what you are trying to build, improve, automate, or protect. We will use the first conversation to understand fit, risk, and the cleanest next move." cta={false}>
    <section className="contact-layout">
      <div className="contact-primary"><p className="contact-status">Contact channel available now</p><h2>Call Quantum Shadow Technologies</h2><a className="phone-link" href="tel:+19414198553">(941) 419-8553</a><p>Florida-based · Remote engagements available across the United States</p><p className="muted">The branded email and custom domain are being finalized. We will not publish an unverified mailbox or collect form data until secure delivery is configured.</p></div>
      <div className="contact-brief"><h2>Prepare for the first conversation</h2><ul><li>Your name and organization</li><li>The business problem or desired outcome</li><li>The systems involved</li><li>Your ideal timeline</li><li>Known security or compliance constraints</li><li>The decision you need help making next</li></ul></div>
    </section>
    <section id="qcore-connect" className="contact-product" aria-labelledby="qcore-connect-access">
      <p className="contact-status">QCore Connect · Early access</p>
      <h2 id="qcore-connect-access">Get early access to QCore Connect</h2>
      <p>Call <a href="tel:+19414198553">(941) 419-8553</a> and ask for QCore Connect early access. We will walk through how your team handles calls, texts, forms, and follow-up today, and whether QCore Connect is a fit.</p>
      <p className="muted">Online sign-up will open once secure form delivery is configured. Until then, early access is arranged by phone. <Link href="/qcore/connect">Learn about QCore Connect</Link></p>
    </section>
  </EditorialPage>;
}
