import type { PieceKey } from '../pieces/pieceConfig';

export type CinematicPreset = {
  rise: number;
  exit: number;
  wave: number;
  stretch: number;
  stagger: number;
  blur: number;
  lateral: readonly [number, number, number];
  peak: number;
};

export const cinematicPresets: Record<PieceKey, CinematicPreset> = {
  king:   { rise: 34, exit: 62, wave: 5.5, stretch: .018, stagger: .105, blur: 4.2, lateral: [0, 2.0, -1.5], peak: .78 },
  queen:  { rise: 42, exit: 74, wave: 9.5, stretch: .026, stagger: .072, blur: 5.4, lateral: [-1.5, 6.2, -6.5], peak: 1.00 },
  bishop: { rise: 38, exit: 68, wave: 7.0, stretch: .021, stagger: .098, blur: 4.8, lateral: [3.6, -4.6, 2.8], peak: .76 },
  rook:   { rise: 30, exit: 56, wave: 3.5, stretch: .014, stagger: .115, blur: 3.8, lateral: [.8, 0, -.8], peak: .68 },
  knight: { rise: 44, exit: 76, wave: 9.0, stretch: .025, stagger: .078, blur: 5.5, lateral: [-5.2, 8.2, -4.6], peak: .96 },
  pawn:   { rise: 32, exit: 60, wave: 4.0, stretch: .015, stagger: .112, blur: 3.8, lateral: [0, 0, 0], peak: .62 },
};
