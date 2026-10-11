/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/dashboard/demo',
        destination: '/demo',
        permanent: false,
      },
      {
        source: '/dashboard/demo/:path*',
        destination: '/demo/:path*',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
