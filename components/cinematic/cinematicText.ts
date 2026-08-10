import type { PieceKey } from '../pieces/pieceConfig';

export type CinematicPreset = {
  rise: number;
  exit: number;
  wave: number;
  stretch: number;
  stagger: number;
  blur: number;
  lateral: readonly [number, number, number];
};

export const cinematicPresets: Record<PieceKey, CinematicPreset> = {
  king:   { rise: 38, exit: 60, wave: 7,  stretch: .022, stagger: .09, blur: 5, lateral: [0, 2.5, -2] },
  queen:  { rise: 46, exit: 72, wave: 11, stretch: .030, stagger: .07, blur: 6, lateral: [-2, 7, -7] },
  bishop: { rise: 42, exit: 66, wave: 8,  stretch: .024, stagger: .10, blur: 5, lateral: [4, -5, 3] },
  rook:   { rise: 32, exit: 54, wave: 4,  stretch: .016, stagger: .11, blur: 4, lateral: [1, 0, -1] },
  knight: { rise: 48, exit: 74, wave: 10, stretch: .028, stagger: .08, blur: 6, lateral: [-6, 9, -5] },
  pawn:   { rise: 36, exit: 64, wave: 5,  stretch: .018, stagger: .11, blur: 4, lateral: [0, 0, 0] },
};
