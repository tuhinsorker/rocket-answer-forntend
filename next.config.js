/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "24.199.122.48",
      },
    ],
  },
};

module.exports = nextConfig;
