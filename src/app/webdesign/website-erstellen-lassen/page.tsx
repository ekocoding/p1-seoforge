import type { Metadata } from "next";
import WebsiteErstellenLassenClient from "./WebsiteErstellenLassenClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Website erstellen lassen | Individuell & SEO-first",
  description:
    "Website erstellen lassen: individuelle Seitenarchitektur, eigenständiges Design, sauberer Code und SEO von Anfang an. Planung und Entwicklung mit SeoForge.",
  alternates: {
    canonical: "https://seoforge.de/webdesign/website-erstellen-lassen",
  },
};

export default function Page() {
  return <WebsiteErstellenLassenClient />;
}
