import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-immobilienmakler")!;

export const metadata: Metadata = {
  title: "SEO für Immobilienmakler — Eigentümer-Leads | SeoForge",
  description:
    "Eigentümer googeln „Was ist meine Immobilie wert“, nicht Ihren Namen. Wir sorgen dafür, dass diese Anfragen bei Ihnen ankommen — nicht nur bei ImmoScout24.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-immobilienmakler" },
};

export default function SeoFuerImmobilienmaklerPage() {
  return <BranchenDetailClient branche={branche} />;
}
