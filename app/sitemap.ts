import type { MetadataRoute } from 'next';
const routes = ['', '/ai-automation', '/cloud-strategy', '/cybersecurity', '/software', '/process', '/company', '/contact', '/privacy', '/terms', '/security', '/accessibility'];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map(route => ({ url: `https://quantum-shadow-technologies.vercel.app${route}`, lastModified: new Date(), changeFrequency: route === '' ? 'weekly' : 'monthly', priority: route === '' ? 1 : route === '/contact' ? .9 : .7 })); }
