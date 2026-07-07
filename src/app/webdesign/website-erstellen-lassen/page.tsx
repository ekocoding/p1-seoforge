import type { Metadata } from "next";
import WebsiteErstellenLassenClient from "./WebsiteErstellenLassenClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Website erstellen lassen — SEO-ready & modern",
  description:
    "Professionelle Website-Erstellung von SeoForge: individuelle Gestaltung, technisch sauber, SEO-ready und schnell. Ihr kompletter Webauftritt aus einer Hand.",
  alternates: {
    canonical: "https://seoforge.de/webdesign/website-erstellen-lassen",
  },
};

export default function Page() {
  return <WebsiteErstellenLassenClient />;
}
