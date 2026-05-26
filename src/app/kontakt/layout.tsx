import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | Kostenloses Erstgespräch buchen",
  description:
    "Kontaktieren Sie SeoForge für ein kostenloses SEO-Erstgespräch. Wir analysieren Ihre Website und zeigen, wo die größten Wachstumspotenziale liegen.",
  alternates: { canonical: "https://seoforge.de/kontakt" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
