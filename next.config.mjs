/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.minimize = false;
    }
    return config;
  },
};