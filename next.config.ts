import type { NextConfig } from "next";

/**
 * GitHub Pages serves project sites from /<repo>/ (empty for *.github.io
 * user sites). The deploy workflow sets NEXT_PUBLIC_BASE_PATH accordingly;
 * local dev and default builds leave it unset (Constitution I: static-only).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
