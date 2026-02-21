import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SeoForge | SEO Agentur fur nachhaltiges Wachstum",
  description:
    "SeoForge ist Ihre SEO Agentur fur nachhaltige Sichtbarkeit. Wir bieten SEO Beratung, Optimierung, Audits und Content-Strategien fur messbare Ergebnisse.",
  keywords: [
    "SEO Agentur",
    "SEO Beratung",
    "SEO Optimierung",
    "SEO Audit",
    "On Page SEO",
    "SEO Content Strategie",
    "Shop SEO",
    "SEO Texte",
  ],
  authors: [{ name: "SeoForge" }],
  openGraph: {
    title: "SeoForge | SEO Agentur fur nachhaltiges Wachstum",
    description:
      "Ihre SEO Agentur fur nachhaltige Sichtbarkeit und messbare Ergebnisse. Uber 200 zufriedene Kunden.",
    url: "https://seoforge.de",
    siteName: "SeoForge",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SeoForge",
  url: "https://seoforge.de",
  description:
    "SEO Agentur fur nachhaltiges Wachstum und messbare Ergebnisse",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Deutschland",
    addressCountry: "DE",
  },
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "German",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${playfair.variable} antialiased`}>{children}</body>
    </html>
  );
}
