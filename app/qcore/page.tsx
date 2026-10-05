import type { Metadata } from 'next';
import Link from 'next/link';
import { ConnectPreview } from '../../components/qcore/ConnectPreview';
import { SignalCore } from '../../components/qcore/SignalCore';
import { Icon, type IconName } from '../../components/qcore/icons';

const title = 'QCore | Intelligence for What’s Next | Quantum Shadow Technologies';
const description = 'QCore is an intelligent operations platform that connects customer activity, people, data, and workflows so businesses can respond faster and keep work moving.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/qcore' },
  openGraph: { title, description, url: '/qcore', type: 'website', siteName: 'Quantum Shadow Technologies' },
  twitter: { card: 'summary_large_image', title, description },
};

const pillars: { title: string; body: string; icon: IconName }[] = [
  { title: 'Connected Customer Activity', body: 'Bring calls, messages, forms, and requests into a clearer view.', icon: 'connect' },
  { title: 'Intelligent Workflows', body: 'Turn incoming activity into organized next steps.', icon: 'route' },
  { title: 'Clearer Operations', body: 'Give teams visibility into what needs attention now.', icon: 'attention' },
  { title: 'Built to Grow', body: 'Start with customer connection today and expand into smarter business operations over time.', icon: 'grow' },
];

const roadmap: { title: string; body: string; status: 'available' | 'planned' }[] = [
  { title: 'QCore Connect', body: 'Capture, respond to, route, and follow up on every customer inquiry.', status: 'available' },
  { title: 'Workflow coordination', body: 'Hand work between people and systems without losing the thread.', status: 'planned' },
  { title: 'Operational insights', body: 'Signals about what is moving, what is stuck, and why.', status: 'planned' },
  { title: 'Knowledge and business context', body: 'The policies, pricing, and history your team relies on, in reach.', status: 'planned' },
  { title: 'Automation and AI-assisted tasks', body: 'Routine steps handled with human review where it matters.', status: 'planned' },
];

export default function QCorePage() {
  return (
    <main className="qc-page">
      <section className="qc-hero qc-hero--platform" aria-labelledby="qc-hero-title">
        <div className="qc-hero__copy">
          <p className="qc-eyebrow">QCore</p>
          <h1 id="qc-hero-title" className="qc-display">Intelligence for <em>what’s next.</em></h1>
          <p className="qc-lede">QCore brings customer activity, people, data, and workflows into one intelligent operating system—so businesses can respond faster, operate smarter, and keep work moving.</p>
          <div className="qc-actions">
            <Link href="/qcore/connect" className="qc-btn qc-btn--primary">Explore QCore Connect <Icon name="arrow" size={16} /></Link>
            <a href="#platform" className="qc-btn qc-btn--ghost">See How It Works</a>
          </div>
        </div>
        <div className="qc-hero__visual"><SignalCore /></div>

        <ol className="qc-lineage" aria-label="How QCore fits">
          <li><small>Company</small><b>Quantum Shadow Technologies</b></li>
          <li><small>Platform</small><b>QCore</b></li>
          <li className="is-current"><small>First solution · Early access</small><b><Link href="/qcore/connect">QCore Connect</Link></b></li>
        </ol>
      </section>

      <section id="platform" className="qc-section" aria-labelledby="qc-pillars-title">
        <div className="qc-section__head">
          <h2 id="qc-pillars-title" className="qc-h2">A calmer way to run the work that comes in.</h2>
          <p className="qc-body">QCore connects the moments where business actually happens—a call, a message, a request—to the people and steps that move them forward.</p>
        </div>
        <ul className="qc-pillars">
          {pillars.map((p) => (
            <li key={p.title}>
              <span className="qc-pillars__icon"><Icon name={p.icon} size={22} /></span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="qc-feature" aria-labelledby="qc-feature-title">
        <div className="qc-feature__copy">
          <p className="qc-eyebrow">Introducing QCore Connect</p>
          <h2 id="qc-feature-title" className="qc-h2">Every customer inquiry, connected to the right next step.</h2>
          <p className="qc-body">Capture calls, texts, forms, and messages in one workspace. QCore Connect helps teams respond quickly, route every request, and automate the follow-through that turns conversations into booked work.</p>
          <ul className="qc-checks">
            <li><Icon name="check" size={16} />Missed calls get a text-back while interest is high</li>
            <li><Icon name="check" size={16} />Every request has an owner and a status</li>
            <li><Icon name="check" size={16} />Follow-ups are scheduled, not remembered</li>
          </ul>
          <Link href="/qcore/connect" className="qc-btn qc-btn--primary">Explore QCore Connect <Icon name="arrow" size={16} /></Link>
        </div>
        <ConnectPreview variant="compact" />
      </section>

      <section className="qc-section qc-vision" aria-labelledby="qc-vision-title">
        <div className="qc-section__head">
          <h2 id="qc-vision-title" className="qc-h2">One connected core for the work ahead.</h2>
          <p className="qc-body">QCore begins by helping businesses handle customer inquiries with clarity and speed. Over time, it is designed to connect more of the workflows, information, and operational signals that keep a business moving.</p>
        </div>
        <ol className="qc-roadmap">
          {roadmap.map((r) => (
            <li key={r.title} className={r.status === 'available' ? 'is-available' : undefined}>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
              <span className="qc-status">{r.status === 'available' ? 'Early access' : 'Designed to expand into'}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="qc-closing" aria-labelledby="qc-closing-title">
        <h2 id="qc-closing-title" className="qc-display qc-display--sm">Start with every customer request.</h2>
        <p className="qc-lede">See how QCore Connect helps your team respond faster, stay organized, and keep new work moving.</p>
        <div className="qc-actions">
          <Link href="/qcore/connect" className="qc-btn qc-btn--primary">Explore QCore Connect <Icon name="arrow" size={16} /></Link>
          <Link href="/contact#qcore-connect" className="qc-btn qc-btn--ghost">Get Early Access</Link>
        </div>
      </section>
    </main>
  );
}
