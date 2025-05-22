import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverExternalPackages: ['cassandra-driver'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'cassandra-driver'];
    return config;
  },
};

export default nextConfig;
