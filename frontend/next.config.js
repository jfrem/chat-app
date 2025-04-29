/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['localhost'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    webpack: (config, { isServer }) => {
      // Custom webpack configuration if needed
      return config;
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
        },
      ];
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;