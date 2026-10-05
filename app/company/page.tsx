import Link from 'next/link';
import type { Metadata } from 'next';
import { ContentSection, EditorialPage } from '../../components/layout/EditorialPage';

export const metadata: Metadata = { title: 'Company', description: 'Meet Quantum Shadow Technologies LLC, a Florida-based veteran-led technology company.' };

export default function CompanyPage() {
  return <EditorialPage label="Company · The command layer" title="Built to turn ambitious technology into controlled execution." intro="Quantum Shadow Technologies LLC is a Florida-based, veteran-led technology company focused on AI, automation, cloud strategy, cybersecurity, and custom software.">
    <ContentSection title="Mission"><p>We help organizations make deliberate technology decisions, build useful systems, and protect the foundations those systems depend on. The goal is not more software. It is clearer operations, stronger control, and measurable progress.</p></ContentSection>
    <ContentSection title="Leadership"><p>Founder Antonio Miranda brings more than a decade of U.S. Army leadership experience into the company: plan carefully, communicate clearly, protect the mission, and verify every handoff. Quantum Shadow Technologies is being built with that same operational discipline.</p></ContentSection>
    <ContentSection title="How we work"><ul><li>Understand the business constraint before recommending technology.</li><li>Design security, automation, and usability together.</li><li>Build in visible increments with testing and human review.</li><li>Document ownership, access, recovery, and next steps.</li></ul></ContentSection>
    <ContentSection title="Current stage"><p>Quantum Shadow Technologies is developing its service practice and product portfolio. <Link href="/qcore">QCore</Link> is our intelligent operations platform, and <Link href="/qcore/connect">QCore Connect</Link>—its first solution for capturing, routing, and following up on customer inquiries—is opening through early access. Q‑Core Shield remains an active development initiative, not a finished commercial product. Availability, scope, and production readiness are stated clearly during every engagement.</p></ContentSection>
  </EditorialPage>;
}
