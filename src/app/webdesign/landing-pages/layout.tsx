import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Pages | Conversion-optimierte Seiten",
  description:
    "Landing Pages von SeoForge: Conversion-optimierte Seiten die Besucher zu Kunden machen. SEO-freundlich, schnell ladend und auf den Punkt.",
  alternates: { canonical: "https://seoforge.de/webdesign/landing-pages" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
