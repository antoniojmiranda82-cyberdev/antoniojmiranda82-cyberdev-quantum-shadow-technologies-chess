import { ogSize, qcoreOgImage } from '../../../components/qcore/ogImage';

export const alt = 'QCore Connect — Every customer inquiry, connected to the right next step.';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return qcoreOgImage({ eyebrow: 'QCore Connect', headline: 'Every customer inquiry, connected to the', accent: 'right next step.' });
}
