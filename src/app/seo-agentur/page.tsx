import { Metadata } from "next";
import SeoAgenturClient from "./SeoAgenturClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur: Rankings, die Anfragen bringen",
  description:
    "SEO Agentur mit System: Technik, Content und Autorität für messbar mehr Rankings und Anfragen. Kostenlose Erstanalyse, Antwort in unter 24 Stunden.",
  alternates: { canonical: "https://seoforge.de/seo-agentur" },
};

export default function SeoAgenturPage() {
  return <SeoAgenturClient />;
}
