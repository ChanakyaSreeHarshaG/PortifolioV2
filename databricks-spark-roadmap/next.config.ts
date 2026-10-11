import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/guides/databricks-spark-roadmap',
        destination: '/',
      },
      {
        source: '/guides/powerbi-roadmap',
        destination: '/powerbi-roadmap',
      },
      {
        source: '/guides/sql-interview-master',
        destination: '/sql-interview-master',
      },
      {
        source: '/guides/de-vocabulary',
        destination: '/de-vocabulary',
      },
      {
        source: '/roadmaps',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
