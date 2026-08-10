import { NextResponse } from 'next/server';
import { createRunwayImageToVideo, RunwayConfigurationError } from '../../../../lib/runway';

const allowedPieces = new Set(['king','queen','bishop','rook','knight','pawn']);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!allowedPieces.has(body?.piece)) return NextResponse.json({ error: 'Invalid chess piece.' }, { status: 400 });
    if (typeof body?.promptImage !== 'string' || !body.promptImage) return NextResponse.json({ error: 'promptImage is required.' }, { status: 400 });
    const result = await createRunwayImageToVideo({
      promptImage: body.promptImage,
      promptText: `${body.piece} page cinematic transition. ${typeof body?.note === 'string' ? body.note.slice(0, 240) : ''}`
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof RunwayConfigurationError ? 503 : 500;
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Runway generation failed.' }, { status });
  }
}
