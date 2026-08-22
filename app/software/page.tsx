import type { Metadata } from 'next';
import { PieceExperience } from '../../components/pieces/PieceExperience';
import { pieces } from '../../components/pieces/pieceConfig';
export const metadata: Metadata = { title: 'Custom Software', description: pieces.knight.summary };
export default function Page(){ return <PieceExperience config={pieces.knight}/>; }
