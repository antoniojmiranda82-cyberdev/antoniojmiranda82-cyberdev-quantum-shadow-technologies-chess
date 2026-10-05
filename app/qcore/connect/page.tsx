import type { Metadata } from 'next';
import Link from 'next/link';
import { ConnectPreview } from '../../../components/qcore/ConnectPreview';
import { Icon, type IconName } from '../../../components/qcore/icons';

const title = 'QCore Connect | Customer Inquiry & Follow-Up Automation';
const description = 'Capture customer calls, texts, forms, and messages in one workspace. QCore Connect helps teams respond faster, route requests, and turn more conversations into booked work.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/qcore/connect' },
  openGraph: { title, description, url: '/qcore/connect', type: 'website', siteName: 'Quantum Shadow Technologies' },
  twitter: { card: 'summary_large_image', title, description },
};

const channels: { label: string; icon: IconName }[] = [
  { label: 'Phone calls', icon: 'phone' },
  { label: 'Missed calls', icon: 'phoneMissed' },
  { label: 'Texts', icon: 'text' },
  { label: 'Web forms', icon: 'form' },
  { label: 'Website chat', icon: 'chat' },
  { label: 'Social messages', icon: 'social' },
  { label: 'Service & estimate requests', icon: 'service' },
];

const flow: { stage: string; example: string; icon: IconName }[] = [
  { stage: 'Request comes in', example: 'A homeowner calls at 7:42 PM. No one picks up.', icon: 'phoneMissed' },
  { stage: 'Response goes out', example: 'A text-back is sent automatically, asking for the address.', icon: 'bolt' },
  { stage: 'Routed to an owner', example: 'Storm damage goes straight to Alex, with an alert.', icon: 'route' },
  { stage: 'Booking or follow-up', example: 'An inspection window is proposed for tomorrow morning.', icon: 'calendar' },
  { stage: 'Work is booked', example: 'The request closes with a scheduled appointment.', icon: 'check' },
];

const audiences = [
  'Roofing and restoration',
  'Home services',
  'Field-service businesses',
  'Appointment-driven teams',
  'Local businesses with high-value inbound calls and requests',
];

export default function QCoreConnectPage() {
  return (
    <main className="qc-page">
      <section className="qc-hero qc-hero--connect" aria-labelledby="qc-connect-title">
        <div className="qc-hero__copy">
          <p className="qc-eyebrow">QCore Connect</p>
          <h1 id="qc-connect-title" className="qc-display qc-display--wide">Every customer inquiry, connected to the <em>right next step.</em></h1>
          <p className="qc-lede">Capture calls, texts, forms, and messages in one intelligent workspace. Respond faster, route requests automatically, and make sure no opportunity is left waiting.</p>
          <div className="qc-actions">
            <Link href="/contact#qcore-connect" className="qc-btn qc-btn--primary">Get Early Access <Icon name="arrow" size={16} /></Link>
            <a href="#how-it-works" className="qc-btn qc-btn--ghost">See How It Works</a>
          </div>
        </div>
        <ul className="qc-channels" aria-label="What QCore Connect captures">
          {channels.map((c) => <li key={c.label}><Icon name={c.icon} size={16} />{c.label}</li>)}
        </ul>
        <ConnectPreview />
      </section>

      <section className="qc-section qc-problem" aria-labelledby="qc-problem-title">
        <div className="qc-section__head qc-section__head--split">
          <h2 id="qc-problem-title" className="qc-h2">Missed calls should not become missed work.</h2>
          <p className="qc-body">When a customer calls after hours, submits a form, or sends a message, the best time to respond is now—not tomorrow. QCore Connect brings new requests into one place and helps your team keep every conversation moving.</p>
        </div>
        <ol className="qc-flow" aria-label="What happens when a customer reaches out">
          {flow.map((f, i) => (
            <li key={f.stage} className={i === flow.length - 1 ? 'is-done' : undefined}>
              <span className="qc-flow__icon"><Icon name={f.icon} size={18} /></span>
              <h3>{f.stage}</h3>
              <p>{f.example}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="qc-section" aria-labelledby="qc-features-title">
        <div className="qc-section__head">
          <h2 id="qc-features-title" className="qc-h2">One workspace for the front door of your business.</h2>
        </div>
        <div className="qc-features">
          <article>
            <div className="qc-vignette" aria-hidden="true">
              <div className="qc-stack">
                <span><Icon name="phoneMissed" size={14} />Missed call · (941) 555-0142</span>
                <span><Icon name="form" size={14} />Web form · New roof estimate</span>
                <span><Icon name="text" size={14} />Text · “Can someone come Thursday?”</span>
              </div>
            </div>
            <h3>Capture Every Inquiry</h3>
            <p>Bring calls, missed calls, texts, forms, and messages into one organized workspace.</p>
          </article>
          <article>
            <div className="qc-vignette" aria-hidden="true">
              <div className="qc-bubble">
                <p>Thanks for calling Ridgeline Roofing—sorry we missed you. What’s the address, and when is a good time for an inspection?</p>
                <small><Icon name="bolt" size={12} />Text-back · sent automatically</small>
              </div>
            </div>
            <h3>Respond While Interest Is High</h3>
            <p>Trigger fast replies, alerts, and follow-up while the customer is still ready to talk.</p>
          </article>
          <article>
            <div className="qc-vignette" aria-hidden="true">
              <div className="qc-rule">
                <span className="qc-pill" data-tone="coral">Storm damage</span>
                <Icon name="arrow" size={14} />
                <span className="qc-rule__owner">AR</span><b>Alex R.</b>
                <small>Notify by text · Create inspection task</small>
              </div>
            </div>
            <h3>Route Work Automatically</h3>
            <p>Assign requests, notify the right person, and create the next action without manual chasing.</p>
          </article>
          <article>
            <div className="qc-vignette" aria-hidden="true">
              <ul className="qc-attention">
                <li><span className="qc-pill" data-tone="gold">Needs response</span><b>New roof estimate</b></li>
                <li><span className="qc-pill" data-tone="gold">Due today</span><b>Estimate follow-up</b></li>
                <li><span className="qc-pill" data-tone="teal">Ready to book</span><b>Roof inspection</b></li>
              </ul>
            </div>
            <h3>See What Needs Attention</h3>
            <p>Give owners and teams a clear view of what needs a response, a follow-up, or a booking next.</p>
          </article>
        </div>
        <p className="qc-note">Product examples use illustrative data for a fictional roofing company.</p>
      </section>

      <section id="how-it-works" className="qc-section" aria-labelledby="qc-how-title">
        <div className="qc-section__head">
          <h2 id="qc-how-title" className="qc-h2">From first contact to next action.</h2>
        </div>
        <ol className="qc-steps">
          <li><span className="qc-steps__node"><Icon name="layers" size={20} /></span><h3>Capture</h3><p>Calls, texts, forms, and messages arrive in one organized place.</p></li>
          <li><span className="qc-steps__node"><Icon name="route" size={20} /></span><h3>Connect</h3><p>Respond, assign, and route every customer request to the right next step.</p></li>
          <li><span className="qc-steps__node"><Icon name="calendar" size={20} /></span><h3>Convert</h3><p>Follow through faster and keep more conversations moving toward booked work.</p></li>
        </ol>
      </section>

      <section className="qc-section qc-audience" aria-labelledby="qc-audience-title">
        <div className="qc-section__head qc-section__head--split">
          <h2 id="qc-audience-title" className="qc-h2">Built for teams that cannot afford to miss the next request.</h2>
          <p className="qc-body">QCore Connect is designed for businesses where one missed call can mean one missed job.</p>
        </div>
        <ul className="qc-audience__list">
          {audiences.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </section>

      <section className="qc-closing" aria-labelledby="qc-close-title">
        <h2 id="qc-close-title" className="qc-display qc-display--sm">No inquiry left waiting.</h2>
        <p className="qc-lede">Give every customer request a clear next step with QCore Connect.</p>
        <div className="qc-actions">
          <Link href="/contact#qcore-connect" className="qc-btn qc-btn--primary">Get Early Access <Icon name="arrow" size={16} /></Link>
          <a href="tel:+19414198553" className="qc-btn qc-btn--ghost"><Icon name="phone" size={16} />Call (941) 419-8553</a>
        </div>
        <p className="qc-note">Early access is arranged by phone while secure online sign-up is being finalized.</p>
      </section>
    </main>
  );
}
