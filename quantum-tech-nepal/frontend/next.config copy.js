/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',   // for Docker multi-stage build

  // ─── Security Headers ────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control',  value: 'on' },
          { key: 'X-Frame-Options',          value: 'DENY' },
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  // ─── Redirects ───────────────────────────────────────────────
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
    ];
  },

  // ─── Images ──────────────────────────────────────────────────
  images: {
    domains: ['quantumtechnepal.com', 'localhost'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
  },

  // ─── Compiler ────────────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ─── Rewrites (API proxy for dev) ────────────────────────────
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [{ source: '/api/:path*', destination: 'http://localhost:8000/api/:path*' }]
      : [];
  },
};

module.exports = nextConfig;
