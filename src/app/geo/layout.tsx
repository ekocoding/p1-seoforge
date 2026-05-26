import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GEO | Generative Engine Optimization",
  description:
    "Generative Engine Optimization von SeoForge: Sichtbarkeit in ChatGPT, Gemini, Perplexity und Claude. Die neue Dimension der Suche — strategisch erschlossen.",
  alternates: { canonical: "https://seoforge.de/geo" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
