import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-kieferorthopaeden")!;

export const metadata: Metadata = {
  title: "SEO für Kieferorthopäden: Mehr Patientenanfragen",
  description:
    "SEO für KFO-Praxen: sichtbar in der langen Eltern-Recherche und bei Aligner-Suchen Erwachsener — im ganzen Einzugsgebiet. Kostenlose Erstanalyse.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-kieferorthopaeden" },
};

export default function SeoFuerKieferorthopaedenPage() {
  return <BranchenDetailClient branche={branche} />;
}
