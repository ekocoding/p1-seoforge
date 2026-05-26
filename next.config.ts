import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
  },
  async redirects() {
    return [
      {
        source: "/seo-texte-kaufen",
        destination: "/seo/texte",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
