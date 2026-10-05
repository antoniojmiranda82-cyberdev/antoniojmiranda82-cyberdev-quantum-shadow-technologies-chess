import type { ReactNode } from 'react';
import './qcore.css';
import { QCoreSubnav } from '../../components/qcore/QCoreSubnav';

export default function QCoreLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="qc"><QCoreSubnav />{children}</div>;
}
