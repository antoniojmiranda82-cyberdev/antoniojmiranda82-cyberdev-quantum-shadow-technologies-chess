/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Retired public name: QCore Leads is now QCore Connect.
    return [
      { source: '/qcore-leads', destination: '/qcore/connect', permanent: true },
      { source: '/qcore/leads', destination: '/qcore/connect', permanent: true }
    ];
  },
  async headers() {
    return [{ source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'X-Frame-Options', value: 'DENY' }
    ] }];
  }
};
export default nextConfig;
