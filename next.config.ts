import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Desativa o overlay de erro no modo de desenvolvimento
      config.devServer = {
        overlay: false,
      };
    }
    return config;
  },
};

export default nextConfig;
