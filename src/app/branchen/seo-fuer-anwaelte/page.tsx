import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-anwaelte")!;

export const metadata: Metadata = {
  title: "SEO für Anwälte: Mandate statt Klickpreise",
  description:
    "Ratgeber-Content & Rankings statt teurer Google Ads: SEO für Kanzleien mit klarer Content-Strategie. Kostenlose Sichtbarkeitsanalyse anfordern.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-anwaelte" },
};

export default function SeoFuerAnwaeltePage() {
  return <BranchenDetailClient slug={branche.slug} />;
}
