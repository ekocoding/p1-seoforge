import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur für nachhaltige Sichtbarkeit | SeoForge",
  description:
    "SeoForge — SEO Agentur für nachhaltige Rankings, mehr organischen Traffic und messbare Ergebnisse. SEO, GEO & Webdesign aus einer Hand.",
  alternates: { canonical: "https://seoforge.de" },
};

export default function Page() {
  return <HomeClient />;
}
