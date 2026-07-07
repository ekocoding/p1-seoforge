import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-immobilienmakler")!;

export const metadata: Metadata = {
  title: "SEO für Makler: Eigentümer-Leads gewinnen",
  description:
    "Eigentümer erreichen, bevor sie beim Portal landen: lokale Marktautorität & Content für Immobilienmakler. Kostenlose Analyse anfordern.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-immobilienmakler" },
};

export default function SeoFuerImmobilienmaklerPage() {
  return <BranchenDetailClient branche={branche} />;
}
