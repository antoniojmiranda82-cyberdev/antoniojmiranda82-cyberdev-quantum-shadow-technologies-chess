import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: 'https://quantum-shadow-technologies.vercel.app/sitemap.xml' }; }
