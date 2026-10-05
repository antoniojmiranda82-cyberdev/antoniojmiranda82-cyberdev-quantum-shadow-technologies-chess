import type { ReactNode, SVGProps } from 'react';

export type IconName =
  | 'phone' | 'phoneMissed' | 'text' | 'form' | 'chat' | 'social' | 'service'
  | 'overview' | 'connect' | 'conversations' | 'automations' | 'insights' | 'integrations' | 'settings'
  | 'search' | 'arrow' | 'bolt' | 'route' | 'attention' | 'calendar' | 'check' | 'layers' | 'grow' | 'pulse';

const paths: Record<IconName, ReactNode> = {
  phone: <path d="M6.6 3.5h2.6l1.4 4-1.9 1.3a10.5 10.5 0 0 0 6.5 6.5l1.3-1.9 4 1.4v2.6a1.8 1.8 0 0 1-1.9 1.8A15.7 15.7 0 0 1 4.8 5.4a1.8 1.8 0 0 1 1.8-1.9Z"/>,
  phoneMissed: <><path d="M6.6 3.5h2.6l1.4 4-1.9 1.3a10.5 10.5 0 0 0 6.5 6.5l1.3-1.9 4 1.4v2.6a1.8 1.8 0 0 1-1.9 1.8A15.7 15.7 0 0 1 4.8 5.4a1.8 1.8 0 0 1 1.8-1.9Z"/><path d="m15 3.5 5 5m0-5-5 5"/></>,
  text: <><path d="M4 5.5h16v10H9.5L5.5 19v-3.5H4z"/><path d="M8 9.5h8M8 12.5h5"/></>,
  form: <><path d="M6 3.5h9l3.5 3.5v13.5H6z"/><path d="M9 10h6.5M9 13.5h6.5M9 17h4"/></>,
  chat: <><path d="M12 4.5c4.4 0 8 2.9 8 6.5s-3.6 6.5-8 6.5c-1 0-2-.1-2.9-.4L5 19l1-3.3A6.1 6.1 0 0 1 4 11c0-3.6 3.6-6.5 8-6.5Z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></>,
  social: <><circle cx="12" cy="12" r="3.5"/><path d="M15.5 12v1.5a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.4 6.8"/></>,
  service: <><path d="M3.5 11 12 4l8.5 7"/><path d="M6 9.5v10h12v-10"/><path d="M10 19.5v-5h4v5"/></>,
  overview: <><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></>,
  connect: <><path d="M4 13.5h4.5l1.5 2.5h4l1.5-2.5H20"/><path d="M5.5 5h13L20 13.5V19H4v-5.5z"/></>,
  conversations: <><path d="M3.5 5h11v8H8l-3 2.5V13H3.5z"/><path d="M17 9h3.5v8H19v2.5L16 17h-5.5v-1.5"/></>,
  automations: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>,
  insights: <><path d="M4 20h16"/><path d="M7 16v-4M12 16V7M17 16v-6"/></>,
  integrations: <><path d="M9 3.5v4M15 3.5v4"/><path d="M6.5 7.5h11V11a5.5 5.5 0 0 1-11 0z"/><path d="M12 16.5v4"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/></>,
  search: <><circle cx="11" cy="11" r="6"/><path d="m15.5 15.5 4 4"/></>,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
  bolt: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>,
  route: <><circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8.2 6h7.6M6 8.2V12a4 4 0 0 0 4 4h5.8"/></>,
  attention: <><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".6" fill="currentColor"/></>,
  calendar: <><rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5"/>,
  layers: <><path d="m12 4 8.5 4.5L12 13 3.5 8.5z"/><path d="m3.5 12.5 8.5 4.5 8.5-4.5"/><path d="m3.5 16.5 8.5 4.5 8.5-4.5"/></>,
  grow: <><path d="M4 19.5h16"/><path d="m5 15 4.5-4.5 3.5 3.5L19.5 7.5"/><path d="M15 7.5h4.5V12"/></>,
  pulse: <path d="M3 12h4l2.5-6 5 12L17 12h4"/>,
};

export function Icon({ name, size = 18, ...props }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {paths[name]}
    </svg>
  );
}
