import type { Metadata } from 'next';
import { PieceExperience } from '../../components/pieces/PieceExperience';
import { pieces } from '../../components/pieces/pieceConfig';
export const metadata: Metadata = { title: 'Cybersecurity', description: pieces.rook.summary };
export default function Page(){ return <PieceExperience config={pieces.rook}/>; }
