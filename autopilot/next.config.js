/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/autopilot',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
