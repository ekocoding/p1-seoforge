import { Metadata } from "next";
import SeoAgenturClient from "./SeoAgenturClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SeoForge — SEO Agentur für nachhaltige Sichtbarkeit",
  description:
    
    "SeoForge schmiedet Rankings: datengetriebenes SEO, Webdesign und GEO ohne lange Verträge. Direkt mit dem Experten — keine Agentur-Maschinerie, nur Ergebnisse.",
  alternates: { canonical: "https://seoforge.de/seo-agentur" },
};

export default function SeoAgenturPage() {
  return <SeoAgenturClient />;
}
