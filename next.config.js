/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
