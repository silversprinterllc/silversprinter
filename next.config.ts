import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'spokebnb.com' }],
        destination: '/course',
        permanent: false,
      },
      {
        source: '/',
        has: [{ type: 'host', value: 'www.spokebnb.com' }],
        destination: '/course',
        permanent: false,
      },
      {
        source: '/',
        has: [{ type: 'host', value: 'spokebnb.vercel.app' }],
        destination: '/course',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
