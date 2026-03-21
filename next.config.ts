import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactCompiler: !dev,
  reactStrictMode: true,
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    webpackBuildWorker: true,
    esmExternals: true,
  },
};

export default nextConfig;