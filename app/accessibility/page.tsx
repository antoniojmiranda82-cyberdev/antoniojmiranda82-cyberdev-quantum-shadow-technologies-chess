import type { Metadata } from 'next';
import { ContentSection, EditorialPage } from '../../components/layout/EditorialPage';
export const metadata: Metadata = { title: 'Accessibility', description: 'Accessibility commitment for the Quantum Shadow Technologies website.' };
export default function AccessibilityPage(){ return <EditorialPage label="Accessibility" title="Technology should remain usable." intro="We aim to make this website understandable and operable across devices, input methods, and motion preferences." cta={false}>
  <ContentSection title="Our approach"><p>The site includes keyboard focus indicators, semantic headings, a skip link, reduced-motion support, responsive navigation, readable contrast, and text alternatives for meaningful controls.</p></ContentSection>
  <ContentSection title="Feedback"><p>If something prevents you from accessing information or contacting us, call (941) 419-8553. Tell us the page, the problem, and the format that would work better. We will make a reasonable effort to provide the information another way and correct the barrier.</p></ContentSection>
</EditorialPage>; }
