import Link from 'next/link';
export default function NotFound(){ return <main className="not-found"><p>Position unavailable</p><h1>This square is not on the board.</h1><Link href="/">Return home ↗</Link></main>; }
