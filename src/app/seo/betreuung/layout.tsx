import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Betreuung | Monatliche SEO-Optimierung",
  description:
    "Laufende SEO Betreuung von SeoForge: Monitoring, Technik, Content und Links — monatlich individuell priorisiert. Adaptiv, transparent, ohne Vertragsbindung.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
