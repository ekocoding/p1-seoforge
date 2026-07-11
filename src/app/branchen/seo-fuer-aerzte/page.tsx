import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-aerzte")!;

export const metadata: Metadata = {
  title: "SEO für Ärzte: Mehr Patienten über Google",
  description:
    "Behandlungsseiten, lokale Sichtbarkeit & Vertrauenssignale statt Portal-Abhängigkeit. SEO für Praxen — kostenlose Erstanalyse, Antwort < 24 h.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-aerzte" },
};

export default function SeoFuerAerztePage() {
  return <BranchenDetailClient slug={branche.slug} />;
}
