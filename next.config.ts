const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maintaindev.id.vn",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;
