import { Metadata } from "next";
import SeoAgenturClient from "./SeoAgenturClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur – Mehr Rankings & Traffic | SeoForge",
  description:
    "SeoForge ist Ihre SEO Agentur für nachhaltige Rankings, mehr organischen Traffic und messbare Ergebnisse. Jetzt kostenloses Erstgespräch sichern.",
  alternates: { canonical: "https://seoforge.de/seo-agentur" },
};

export default function SeoAgenturPage() {
  return <SeoAgenturClient />;
}
