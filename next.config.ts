import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /playground folded into /lab — the builds and the games are the same
      // argument, so they live on one page. (docs/BRIEF.md §Information architecture)
      { source: "/playground", destination: "/lab", permanent: true },
    ];
  },
};

export default nextConfig;
