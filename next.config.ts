import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['docusign-esign'],
  // Remove the experimental wrapper and directly use serverExternalPackages
};

export default nextConfig;
