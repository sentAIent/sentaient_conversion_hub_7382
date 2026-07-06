import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/icebusiness',
  transpilePackages: ['@apollo/client'],
  output: 'export',
};

export default nextConfig;
