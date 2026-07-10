import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-zahnaerzte")!;

export const metadata: Metadata = {
  title: "SEO für Zahnärzte: Neue Patienten über Google",
  description:
    "Sichtbar bei Implantat-, Aligner- und Prophylaxe-Suchen: SEO für Zahnarztpraxen mit Kosten-Content, lokalem Profil & Bewertungen. Kostenlose Erstanalyse.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-zahnaerzte" },
};

export default function SeoFuerZahnaerztePage() {
  return <BranchenDetailClient branche={branche} />;
}
