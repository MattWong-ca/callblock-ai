import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static1.howtogeekimages.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
