import type { Metadata } from 'next';
import { ContentSection, EditorialPage } from '../../components/layout/EditorialPage';
export const metadata: Metadata = { title: 'Security & Responsible Use', description: 'Security and vulnerability reporting principles for Quantum Shadow Technologies.' };
export default function SecurityPage(){ return <EditorialPage label="Trust center" title="Security and responsible use" intro="Security work must be authorized, proportionate, traceable, and designed to protect people and systems." cta={false}>
  <ContentSection title="Vulnerability reporting"><p>If you believe this website has a vulnerability, call (941) 419-8553 and request the security contact channel. Do not access, modify, retain, or disclose data beyond what is necessary to demonstrate the issue. Avoid denial-of-service, social engineering, automated high-volume testing, and testing third-party systems.</p></ContentSection>
  <ContentSection title="Cybersecurity engagements"><p>Testing and remediation are performed only with explicit authorization, a defined scope, rules of engagement, data-handling requirements, and rollback procedures. We do not offer unlawful access, evasion, credential theft, or unsanctioned surveillance.</p></ContentSection>
  <ContentSection title="AI and automation"><p>Sensitive actions should use least privilege, auditable tools, human approval, limited data access, and verification after execution. Product and agent claims are evaluated before production use.</p></ContentSection>
</EditorialPage>; }
