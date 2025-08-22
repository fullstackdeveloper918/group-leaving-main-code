/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'http',           // allow HTTP
        hostname: 'localhost',      // your local backend
        port: '3002',               // optional: restrict to port 3002
        pathname: '/**',            // allow all paths
      },
      {
        protocol: 'https',          // allow all HTTPS images
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
