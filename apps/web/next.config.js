/** @type {import('next').NextConfig} */
const API_BASE = process.env.API_BASE || process.env.NEXT_PUBLIC_API_URL;

const nextConfig = {
  reactStrictMode: true,
  // Only set up rewrites when an API base is provided
  async rewrites() {
    if (!API_BASE) return [];
    return [
      {
        source: '/api/:path*',
        destination: `${API_BASE}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
