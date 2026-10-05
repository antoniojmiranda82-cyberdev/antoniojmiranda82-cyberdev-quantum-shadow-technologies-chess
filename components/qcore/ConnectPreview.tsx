import type { CSSProperties } from 'react';
import { Icon, type IconName } from './icons';

/*
 * Static, illustrative QCore Connect workspace. Every name and entry below is
 * example data for a fictional home-service business — not live data, not a
 * customer, and not a performance claim. The mock is aria-hidden; the
 * figcaption carries the accessible description.
 */

type Tone = 'gold' | 'coral' | 'blue' | 'teal' | 'neutral';

type Request = {
  id: string;
  title: string;
  contact: string;
  channel: IconName;
  channelLabel: string;
  status: string;
  tone: Tone;
  owner: string;
  time: string;
  selected?: boolean;
};

const requests: Request[] = [
  { id: 'storm', title: 'Storm-damage request', contact: 'J. Alvarez', channel: 'phone', channelLabel: 'Inbound call', status: 'High priority', tone: 'coral', owner: 'AR', time: 'Now', selected: true },
  { id: 'estimate', title: 'New roof estimate request', contact: 'D. Morgan', channel: 'form', channelLabel: 'Web form', status: 'Needs response', tone: 'gold', owner: '—', time: '2m' },
  { id: 'missed', title: 'Missed call from homeowner', contact: '(941) 555-0142', channel: 'phoneMissed', channelLabel: 'Missed call', status: 'Text-back sent', tone: 'blue', owner: 'Auto', time: '6m' },
  { id: 'inspection', title: 'Website inspection inquiry', contact: 'P. Chen', channel: 'chat', channelLabel: 'Website chat', status: 'Assigned to Alex', tone: 'neutral', owner: 'AR', time: '18m' },
  { id: 'booking', title: 'Roof inspection request', contact: 'S. Patel', channel: 'text', channelLabel: 'Text message', status: 'Booking proposed', tone: 'teal', owner: 'MK', time: '41m' },
  { id: 'followup', title: 'Estimate follow-up', contact: 'R. Lewis', channel: 'calendar', channelLabel: 'Scheduled follow-up', status: 'Follow-up due today', tone: 'gold', owner: 'MK', time: '1h' },
];

const stages = [
  { label: 'New Requests', count: 2 },
  { label: 'Active Conversations', count: 3 },
  { label: 'Ready to Book', count: 1 },
  { label: 'Booked', count: 4 },
];

const nav: { label: string; icon: IconName }[] = [
  { label: 'Overview', icon: 'overview' },
  { label: 'Connect', icon: 'connect' },
  { label: 'Conversations', icon: 'conversations' },
  { label: 'Automations', icon: 'automations' },
  { label: 'Insights', icon: 'insights' },
  { label: 'Integrations', icon: 'integrations' },
  { label: 'Settings', icon: 'settings' },
];

const timeline = [
  { time: '7:42 PM', title: 'Call received after hours', note: 'Inbound call · 2 min voicemail' },
  { time: '7:42 PM', title: 'Text-back sent', note: 'Automation · “Sorry we missed you…”' },
  { time: '7:44 PM', title: 'Routed to Alex R.', note: 'Rule · Storm damage → storm response' },
  { time: '7:51 PM', title: 'Customer replied', note: '“Water is coming through the ceiling.”' },
];

export function ConnectPreview({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const rows = variant === 'compact' ? requests.slice(0, 4) : requests;
  return (
    <figure className={`qc-preview qc-preview--${variant}`}>
      <div className="qc-app" aria-hidden="true">
        <div className="qc-app__bar">
          <span className="qc-app__mark"><QMark /> <b>QCore</b> Connect</span>
          <span className="qc-app__search"><Icon name="search" size={14} /> Search requests, contacts, conversations</span>
          <span className="qc-app__badge">Example workspace</span>
          <span className="qc-app__avatar">AR</span>
        </div>

        <div className="qc-app__body">
          {variant === 'full' && (
            <nav className="qc-app__nav">
              {nav.map((item) => (
                <span key={item.label} className={item.label === 'Connect' ? 'is-current' : undefined}>
                  <Icon name={item.icon} size={15} />{item.label}
                </span>
              ))}
            </nav>
          )}

          <div className="qc-app__main">
            <div className="qc-app__head">
              <strong>Connect</strong>
              <span>Ridgeline Roofing · Tuesday</span>
            </div>
            <div className="qc-app__stages">
              {stages.map((stage, i) => (
                <span key={stage.label} className={i === 0 ? 'is-current' : undefined}>
                  <small>{stage.label}</small>
                  <b>{stage.count}</b>
                </span>
              ))}
            </div>
            <ol className="qc-app__list">
              {rows.map((r) => (
                <li key={r.id} className={r.selected ? 'is-selected is-arriving' : undefined}>
                  <span className="qc-app__channel" data-tone={r.tone}><Icon name={r.channel} size={16} /></span>
                  <span className="qc-app__req">
                    <b>{r.title}</b>
                    <small>{r.contact} · {r.channelLabel}</small>
                  </span>
                  <span className="qc-pill" data-tone={r.tone}>{r.status}</span>
                  <span className="qc-app__owner">{r.owner}</span>
                  <span className="qc-app__time">{r.time}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="qc-app__detail">
            <div className="qc-app__detail-head">
              <span className="qc-pill" data-tone="coral">High priority</span>
              <b>Storm-damage request</b>
              <small>J. Alvarez · Inbound call · Owner: Alex R.</small>
            </div>
            <div className="qc-next">
              <small>Next action</small>
              <b>Propose an inspection window</b>
              <span><Icon name="calendar" size={14} /> Tomorrow · 9–11 AM</span>
            </div>
            {variant === 'full' && (
              <ol className="qc-app__timeline">
                {timeline.map((t, i) => (
                  <li key={t.title} style={{ '--step': i } as CSSProperties}>
                    <time>{t.time}</time>
                    <b>{t.title}</b>
                    <small>{t.note}</small>
                  </li>
                ))}
              </ol>
            )}
          </aside>
        </div>
      </div>
      <figcaption>
        Illustrative QCore Connect workspace with example data for a fictional roofing company. Requests from calls, texts,
        forms, and chat arrive in one list, each with a status, an owner, and a clear next action.
      </figcaption>
    </figure>
  );
}

export function QMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7.6" stroke="currentColor" strokeWidth="2.2" />
      <path d="m12.6 12.6 7.6 7.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
