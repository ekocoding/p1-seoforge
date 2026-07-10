import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-heilpraktiker")!;

export const metadata: Metadata = {
  title: "SEO für Heilpraktiker: Sichtbar & rechtssicher",
  description:
    "SEO für Heilpraktiker: rechtssichere Inhalte, lokales Vertrauensprofil, Sichtbarkeit in Google & KI-Antworten. Kostenlose Erstanalyse, monatlich kündbar.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-heilpraktiker" },
};

export default function SeoFuerHeilpraktikerPage() {
  return <BranchenDetailClient branche={branche} />;
}
