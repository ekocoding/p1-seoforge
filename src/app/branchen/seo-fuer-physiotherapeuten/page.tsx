import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-physiotherapeuten")!;

export const metadata: Metadata = {
  title: "SEO für Physiotherapeuten: Lokal sichtbar werden",
  description:
    "SEO für Physiotherapie-Praxen: lokale Sichtbarkeit, Selbstzahler-Angebote und volle Kurse statt Besetztzeichen. Kostenlose Erstanalyse, Antwort < 24 h.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-physiotherapeuten" },
};

export default function SeoFuerPhysiotherapeutenPage() {
  return <BranchenDetailClient branche={branche} />;
}
