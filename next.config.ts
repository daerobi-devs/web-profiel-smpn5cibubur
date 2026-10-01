import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    localPatterns: [
      {
        pathname: '/uploads/**',
        search: '',
      },
      {
        pathname: '/assets/**',
        search: '',
      },
      {
        pathname: '/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bgyeqdyguuflljgzilzy.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  async redirects() {
    const adminUrl =
      process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'https://ekosistem.daeroom.my.id';
    return [
      {
        source: '/admin',
        destination: adminUrl,
        permanent: false,
      },
      {
        source: '/admin/:path*',
        destination: adminUrl,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
