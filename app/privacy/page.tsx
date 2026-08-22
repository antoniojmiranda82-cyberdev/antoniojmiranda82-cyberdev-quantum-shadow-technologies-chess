import type { Metadata } from 'next';
import { ContentSection, EditorialPage } from '../../components/layout/EditorialPage';
export const metadata: Metadata = { title: 'Privacy Policy', description: 'Privacy information for the Quantum Shadow Technologies website.' };
export default function PrivacyPage(){ return <EditorialPage label="Legal · Updated August 22, 2026" title="Privacy Policy" intro="This policy explains the limited information this website handles before our full contact and account systems are launched." cta={false}>
  <ContentSection title="Information collected"><p>This public website does not currently provide user accounts, payments, or a contact form. If you call us, we may retain the information you voluntarily provide so we can respond and manage the business relationship.</p></ContentSection>
  <ContentSection title="Technical information"><p>Our hosting provider may process basic request, device, IP-address, and security-log information to deliver and protect the website. We do not currently use advertising trackers or sell personal information.</p></ContentSection>
  <ContentSection title="Use and sharing"><p>Information is used to respond to requests, provide services, protect systems, satisfy legal obligations, and maintain business records. It is shared only with service providers or authorities when necessary and lawful.</p></ContentSection>
  <ContentSection title="Your choices"><p>You may request access, correction, or deletion of information associated with you, subject to legal retention duties, by calling (941) 419-8553. This policy will be updated before analytics, forms, accounts, or payment processing are activated.</p></ContentSection>
</EditorialPage>; }
