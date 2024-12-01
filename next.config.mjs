/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_SHARP_PATH: "/node_modules/sharp",
    customKey: 'http://next-pizza.local',
  },
  experimental: { optimisticClientCache: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      {
        pathname: '/public/**',
        search: '',
      },
    ],
    minimumCacheTTL: 60,
    /*unoptimized: true,*/
    deviceSizes: [480, 768, 1024, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.dodostatic.net',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dodostatic.net',
        port: '',
        pathname: '/static/Img/**',
      }
    ],
  },
};

export default nextConfig;
