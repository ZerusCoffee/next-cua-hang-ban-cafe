const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maintaindev.id.vn',
        pathname: '/storage/**',
      },
    ],
  },
};

module.exports = nextConfig;