import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-handwerker")!;

export const metadata: Metadata = {
  title: "SEO für Handwerker: Aufträge ohne Portale",
  description:
    "Google Business, lokale Leistungsseiten & Bewertungen — gefunden werden ohne Portal-Provision. Kostenloser Sichtbarkeits-Check für Ihren Betrieb.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-handwerker" },
};

export default function SeoFuerHandwerkerPage() {
  return <BranchenDetailClient branche={branche} />;
}
