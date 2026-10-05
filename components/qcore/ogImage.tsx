import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

/* Shared social card for QCore routes: brand-true, text-only, no claims. */
export function qcoreOgImage({ eyebrow, headline, accent }: { eyebrow: string; headline: string; accent: string }) {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', backgroundColor: '#04070d', backgroundImage: 'radial-gradient(circle at 85% 0%, rgba(79,140,255,.34), rgba(4,7,13,0) 60%)', color: '#eef1f6', fontFamily: 'Georgia, serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, letterSpacing: 6, color: '#8db6ff', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
          <div style={{ width: 34, height: 34, borderRadius: 999, border: '5px solid #8db6ff' }} />
          {eyebrow}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 78, lineHeight: 1.04, letterSpacing: -2, maxWidth: 980 }}>
          <span>{headline}</span>
          <span style={{ color: '#8db6ff', fontStyle: 'italic' }}>{accent}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#8794a8', fontFamily: 'sans-serif', letterSpacing: 2 }}>
          <span>QUANTUM SHADOW TECHNOLOGIES</span>
          <span style={{ color: '#efd37d' }}>QCore</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
