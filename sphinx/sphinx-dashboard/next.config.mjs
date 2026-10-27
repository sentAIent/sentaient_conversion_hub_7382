/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig = {
  transpilePackages: ['react-map-gl', 'maplibre-gl'],
  ...(isExport ? {
    output: 'export',
    basePath: '/sphinx',
    trailingSlash: true,
    images: { unoptimized: true }
  } : {
    async rewrites() {
      return [
        { source: '/sphinx/:path*', destination: '/:path*' },
        { source: '/api/:path*', destination: 'http://127.0.0.1:3117/api/:path*' }
      ];
    }
  })
};

export default nextConfig;
