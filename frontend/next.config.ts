import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const laravel = process.env.LARAVEL_API_URL || "http://127.0.0.1:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${laravel}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
