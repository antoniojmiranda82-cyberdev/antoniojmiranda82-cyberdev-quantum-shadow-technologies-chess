import type { Metadata } from 'next';
import { PieceExperience } from '../components/pieces/PieceExperience';
import { pieces } from '../components/pieces/pieceConfig';
export const metadata: Metadata = { title: 'AI, Cloud, Cybersecurity & Software', description: pieces.king.summary };
export default function Home(){ return <PieceExperience config={pieces.king}/>; }
