import type { Metadata } from 'next';
import { PieceExperience } from '../../components/pieces/PieceExperience';
import { pieces } from '../../components/pieces/pieceConfig';
export const metadata: Metadata = { title: 'AI & Automation', description: pieces.queen.summary };
export default function Page(){ return <PieceExperience config={pieces.queen}/>; }
