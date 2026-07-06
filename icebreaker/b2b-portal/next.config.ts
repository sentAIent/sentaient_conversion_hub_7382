import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/icebusiness',
  transpilePackages: ['@apollo/client'],
};

export default nextConfig;
