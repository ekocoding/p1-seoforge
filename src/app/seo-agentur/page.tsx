import { Metadata } from "next";
import SeoAgenturClient from "./SeoAgenturClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur für Google & KI-Suche — SEO + GEO",
  description:
    "SEO Agentur für Sichtbarkeit in Google und KI-Suche: SEO und GEO aus einer Hand — datenbasierte Methodik statt Versprechen, monatlich kündbar.",
  alternates: { canonical: "https://seoforge.de/seo-agentur" },
};

export default function SeoAgenturPage() {
  return <SeoAgenturClient />;
}
