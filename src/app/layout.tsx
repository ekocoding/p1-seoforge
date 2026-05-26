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
  title: {
    default: "SeoForge | SEO Agentur für nachhaltige Sichtbarkeit",
    template: "%s | SeoForge",
  },
  description:
    "SeoForge ist Ihre SEO Agentur für nachhaltige Rankings und organischen Traffic. SEO Beratung, Audits, On-Page Optimierung und Content-Strategie aus einer Hand.",
  authors: [{ name: "SeoForge" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "SeoForge | SEO Agentur für nachhaltige Sichtbarkeit",
    description:
      "SeoForge ist Ihre SEO Agentur für nachhaltige Rankings und organischen Traffic. SEO Beratung, Audits, On-Page Optimierung und Content-Strategie aus einer Hand.",
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
  "@type": "ProfessionalService",
  name: "SeoForge",
  url: "https://seoforge.de",
  logo: "https://seoforge.de/logo.png",
  description:
    "SeoForge ist eine SEO-Agentur für nachhaltige Rankings, Webdesign und Generative Engine Optimization (GEO).",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kurpfalzstraße 16",
    postalCode: "68542",
    addressLocality: "Heddesheim",
    addressCountry: "DE",
  },
  telephone: "+4915203450695",
  email: "info@seoforge.de",
  areaServed: "DE",
  priceRange: "€€",
  openingHours: "Mo-Fr 09:00-18:00",
  sameAs: [
    "https://www.linkedin.com/company/seoforge",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+4915203450695",
    contactType: "customer service",
    availableLanguage: "German",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "SEO & Webdesign Leistungen",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Beratung" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Optimierung" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Audit" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webdesign" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "GEO" } },
    ],
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
        {/* SEO-Fallback: Inhalte sichtbar wenn JS deaktiviert */}
        <noscript>
          <style>{`.scroll-hidden,.animate-fade-up,.animate-fade-in,.animate-scale-in,.animate-slide-up,.animate-slide-left,.animate-slide-right,.hero-title,.hero-description,.hero-cta,.hero-dashboard{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${dmSans.variable} ${playfair.variable} antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}
