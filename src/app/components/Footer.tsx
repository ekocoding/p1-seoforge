import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-offwhite">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.svg"
              alt="SeoForge Logo"
              width={140}
              height={35}
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              SeoForge ist Ihre SEO Agentur fuer nachhaltige Sichtbarkeit
              und messbare Ergebnisse in den Suchmaschinen.
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="text-sm font-semibold text-dark">Leistungen</h4>
            <ul className="mt-4 space-y-3">
              {[
                { label: "SEO Beratung", href: "/seo-beratung" },
                { label: "SEO Optimierung", href: "/seo-optimierung" },
                { label: "SEO Audit", href: "/seo-audit" },
                { label: "SEO Texte", href: "/seo-texte-kaufen" },
                { label: "On Page SEO", href: "/on-page-seo" },
                { label: "Shop SEO", href: "/shop-seo" },
                { label: "SEO Betreuung", href: "/seo-betreuung" },
              ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Agentur */}
          <div>
            <h4 className="text-sm font-semibold text-dark">Agentur</h4>
            <ul className="mt-4 space-y-3">
              {[
                { label: "SEO Agentur", href: "/seo-agentur" },
                { label: "GEO Agentur", href: "/geo-agentur" },
                { label: "Linkbuilding Agentur", href: "/linkbuilding-agentur" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h4 className="text-sm font-semibold text-dark">Unternehmen</h4>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Ueber uns", href: "/" },
                { label: "Referenzen", href: "/referenzen" },
                { label: "Wissen", href: "/wissen" },
                { label: "Kontakt", href: "/kontakt" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt & Rechtliches */}
          <div>
            <h4 className="text-sm font-semibold text-dark">Kontakt</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted">
                <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                info@seoforge.de
              </li>
              <li className="flex items-center gap-2 text-sm text-muted">
                <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                0152 03450695
              </li>
            </ul>

            <h4 className="mt-8 text-sm font-semibold text-dark">Rechtliches</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/impressum" className="text-sm text-muted transition-colors hover:text-primary">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-sm text-muted transition-colors hover:text-primary">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} SeoForge. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-muted">
            Mit Leidenschaft geschmiedet in Deutschland.
          </p>
        </div>
      </div>
    </footer>
  );
}
