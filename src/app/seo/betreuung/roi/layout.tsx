import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO ROI Rechner | Lohnt sich SEO für mich?",
  description:
    "Berechnen Sie den ROI Ihrer SEO-Investition: Interaktiver SeoForge Rechner mit Break-Even-Analyse und direktem Vergleich SEO vs. Google Ads. Kostenlos & anonym.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung/roi" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
