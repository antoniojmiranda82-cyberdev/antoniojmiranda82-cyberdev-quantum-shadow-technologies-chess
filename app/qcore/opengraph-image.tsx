import { ogSize, qcoreOgImage } from '../../components/qcore/ogImage';

export const alt = 'QCore — Intelligence for what’s next. Quantum Shadow Technologies.';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return qcoreOgImage({ eyebrow: 'QCore', headline: 'Intelligence for', accent: 'what’s next.' });
}
