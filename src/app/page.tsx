import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SeoForge — SEO, GEO & Webdesign",
  description:
    "SeoForge verbindet SEO, GEO und Webdesign: klare Strategien, direkte Umsetzung und nachvollziehbare Arbeit für organische Sichtbarkeit.",
  alternates: { canonical: "https://seoforge.de" },
};

export default function Page() {
  return <HomeClient />;
}
