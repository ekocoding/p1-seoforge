import type { Metadata } from "next";
import WebsiteMittelstandClient from "./WebsiteMittelstandClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Firmenwebsite erstellen lassen | SEO-first für KMU",
  description:
    "Firmenwebsite erstellen lassen: klare Kundenwege, eigenständiges Design und SEO-fähige Technik für KMU. Planung, Entwicklung und Betrieb mit SeoForge.",
  alternates: {
    canonical: "https://seoforge.de/webdesign/firmenwebsite-erstellen-lassen",
  },
};

export default function Page() {
  return <WebsiteMittelstandClient />;
}
