import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Custom property for server-only packages - this may not be in the TypeScript types yet
    // @ts-ignore - serverExternalPackages is a valid experimental option
    serverExternalPackages: ['cassandra-driver', 'dns', 'net', 'tls', 'fs'],
  },
  webpack: (config, { isServer }) => {
    // Add Node.js modules as empty objects on the client side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Add empty implementations for Node.js modules
        dns: false,
        net: false,
        tls: false,
        fs: false,
        // ... other Node.js modules used by cassandra-driver
        util: false,
        stream: false,
        crypto: false,
        events: false,
      };
    }
    
    // Add cassandra-driver to external modules
    config.externals = [...(config.externals || []), 'cassandra-driver'];
    return config;
  },
};

export default nextConfig;
