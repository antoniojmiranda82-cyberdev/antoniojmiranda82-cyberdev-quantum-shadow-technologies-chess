import type { Metadata } from 'next';
import { ContentSection, EditorialPage } from '../../components/layout/EditorialPage';
export const metadata: Metadata = { title: 'Website Terms', description: 'Website terms for Quantum Shadow Technologies LLC.' };
export default function TermsPage(){ return <EditorialPage label="Legal · Updated August 22, 2026" title="Website Terms" intro="These terms govern use of this informational website. Separate signed agreements govern paid services and deliverables." cta={false}>
  <ContentSection title="Informational use"><p>Website content is general information and does not create a client, legal, security, or professional-services relationship. Capabilities and development initiatives described here are not guarantees of availability or results.</p></ContentSection>
  <ContentSection title="Authorized use"><p>Do not misuse the website, attempt unauthorized access, interfere with availability, introduce malicious material, or use our name or content deceptively. Cybersecurity work is performed only within an agreed written scope and with proper authorization.</p></ContentSection>
  <ContentSection title="Intellectual property"><p>Quantum Shadow Technologies branding and original website content are protected by applicable law. Third-party names and marks belong to their respective owners.</p></ContentSection>
  <ContentSection title="Limitations"><p>The website is provided as available without warranties to the extent permitted by law. We are not responsible for decisions made solely from general website information. Florida law governs these terms unless a signed agreement states otherwise.</p></ContentSection>
</EditorialPage>; }
