export type RunwayImageToVideoInput = {
  promptImage: string;
  promptText: string;
  duration?: number;
  ratio?: '1280:720' | '720:1280' | '960:960' | '1584:672' | '1104:832' | '832:1104' | '672:1584';
  model?: 'gen4.5' | 'gen4_turbo' | 'seedance2' | 'seedance2_fast' | 'seedance2_mini';
};

export class RunwayConfigurationError extends Error {}

export async function createRunwayImageToVideo(input: RunwayImageToVideoInput) {
  if (typeof window !== 'undefined') throw new Error('Runway adapter is server-only');
  const secret = process.env.RUNWAYML_API_SECRET;
  if (!secret) throw new RunwayConfigurationError('RUNWAYML_API_SECRET is not configured.');
  if (!input.promptImage) throw new Error('promptImage is required.');
  if (!input.promptText?.trim()) throw new Error('promptText is required.');

  const controlledPrompt = `Preserve the exact chess-piece geometry and black-and-gold material. Fixed camera. Subtle luxury product motion only. Gold digital pixels peel from the piece, travel in an elegant loop, and reconstruct seamlessly. No added objects, no environment changes. ${input.promptText.trim()}`;
  const response = await fetch('https://api.dev.runwayml.com/v1/image_to_video', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${secret}`,
      'X-Runway-Version': '2024-11-06'
    },
    body: JSON.stringify({
      model: input.model ?? 'gen4.5',
      promptImage: input.promptImage,
      promptText: controlledPrompt,
      ratio: input.ratio ?? '1280:720',
      duration: input.duration ?? 5
    }),
    signal: AbortSignal.timeout(30_000)
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error ?? payload?.message ?? `Runway request failed (${response.status}).`);
  return payload;
}
