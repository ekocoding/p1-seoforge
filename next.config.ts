import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
  },
  async redirects() {
    return [
      {
        source: "/seo/shop",
        destination: "/branchen/seo-fuer-online-shops",
        permanent: true,
      },
      {
        source: "/webdesign/landing-pages",
        destination: "/webdesign/landingpage-erstellen-lassen",
        permanent: true,
      },
      {
        source: "/webdesign/website-relaunch",
        destination: "/webdesign/website-relaunch-agentur",
        permanent: true,
      },
      {
        source: "/seo-texte-kaufen",
        destination: "/seo/texte",
        permanent: true,
      },
      {
        source: "/webdesign/mittelstand",
        destination: "/webdesign/firmenwebsite-erstellen-lassen",
        permanent: true,
      },
      {
        source: "/webdesign/website-erstellen-lassen-mittelstand",
        destination: "/webdesign/firmenwebsite-erstellen-lassen",
        permanent: true,
      },
      {
        source: "/wissen/ratgeber/in-chatgpt-erscheinen",
        destination: "/wissen/ratgeber/geo-ranking-faktoren",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
