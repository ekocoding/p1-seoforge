"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { services, serviceCategories } from "../data/services";

const wissenFormate = [
  {
    label: "Ratgeber",
    href: "/wissen/ratgeber",
    description: "Praxisnahe Anleitungen & Guides",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: "Glossar",
    href: "/wissen/glossar",
    description: "SEO-Begriffe einfach erklärt",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h10M4 18h6" />
      </svg>
    ),
  },
  {
    label: "Case Studies",
    href: "/wissen/case-study",
    description: "Echte Projekte & Ergebnisse",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "News",
    href: "/wissen/news",
    description: "Google-Updates & Branchennews",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
];

const branchen = [
  {
    label: "Ärzte & Praxen",
    href: "/branchen/seo-fuer-aerzte",
    description: "Patienten suchen Symptome, nicht Namen",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 4.5v5a5.5 5.5 0 0011 0v-5M4.5 4.5H3m1.5 0H6m9.5 0H14m1.5 0H17m-7 10.5v2a4.5 4.5 0 009 0v-1m0 0a2 2 0 10.001-3.999A2 2 0 0019 16z" />
      </svg>
    ),
  },
  {
    label: "Anwälte & Kanzleien",
    href: "/branchen/seo-fuer-anwaelte",
    description: "Mandanten googeln Probleme, nicht Paragrafen",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18m-7-3h14M5 18l2-11m-2 11h4m-2-11L5 9.5M7 7l2 2.5M17 7l2 11m-4 0h4m-2-11l-2 2.5M19 9.5L17 7M12 3c-1 1-3 1.5-5 1.5M12 3c1 1 3 1.5 5 1.5" />
      </svg>
    ),
  },
  {
    label: "Online-Shops",
    href: "/branchen/seo-fuer-online-shops",
    description: "Kategorieseiten statt steigender Ads-Kosten",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: "Handwerker",
    href: "/branchen/seo-fuer-handwerker",
    description: "Gefunden werden ohne Portal-Provision",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
      </svg>
    ),
  },
  {
    label: "Immobilienmakler",
    href: "/branchen/seo-fuer-immobilienmakler",
    description: "Eigentümer erreichen, bevor Portale es tun",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
      </svg>
    ),
  },
  {
    label: "SaaS & Software",
    href: "/branchen/saas-seo",
    description: "Sichtbar in Google und in ChatGPT-Antworten",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
];

const wissenThemen = [
  {
    label: "SEO Grundlagen",
    href: "/wissen/seo",
    dot: "bg-primary",
    color: "text-primary",
  },
  {
    label: "GEO & KI-Suche",
    href: "/wissen/geo",
    dot: "bg-violet-500",
    color: "text-violet-600",
  },
  {
    label: "On-Page SEO",
    href: "/wissen/on-page",
    dot: "bg-secondary",
    color: "text-secondary",
  },
  {
    label: "Technisches SEO",
    href: "/wissen/technical-seo",
    dot: "bg-blue-500",
    color: "text-blue-600",
  },
  {
    label: "Local SEO",
    href: "/wissen/local-seo",
    dot: "bg-emerald-500",
    color: "text-emerald-600",
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState("seo");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_#E5E3DF]"
          : "bg-white shadow-[0_1px_0_0_#E5E3DF]"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.svg"
            alt="SeoForge Logo"
            width={260}
            height={52}
            priority
            className="h-[52px] w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">

          {/* Home */}
          <Link href="/" onClick={handleNavClick} className="rounded-lg px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-offwhite hover:text-primary">
            Home
          </Link>

          {/* Leistungen — mega dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("leistungen")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-offwhite hover:text-primary"
              aria-expanded={activeDropdown === "leistungen"}
            >
              Leistungen
              <svg
                className={`h-4 w-4 transition-transform ${activeDropdown === "leistungen" ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            <div className={`dropdown-menu absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[800px] ${activeDropdown === "leistungen" ? "open" : ""}`}>
              <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
                <div className="flex">
                  {/* Left Panel: Categories */}
                  <div className="w-[200px] bg-white border-r border-border py-2">
                    {serviceCategories.map((category) => (
                      <button
                        key={category.id}
                        onMouseEnter={() => setHoveredCategory(category.id)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all ${
                          hoveredCategory === category.id
                            ? "bg-white border-l-2 border-l-primary text-primary"
                            : "text-dark hover:bg-white/60"
                        }`}
                      >
                        <div className={`flex-shrink-0 ${hoveredCategory === category.id ? "text-primary" : "text-muted"}`}>
                          {category.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-semibold ${hoveredCategory === category.id ? "text-primary" : "text-dark"}`}>
                            {category.label}
                          </div>
                          <div className="text-xs text-muted">{category.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Right Panel: Services */}
                  <div className="flex-1 bg-white">
                    {serviceCategories
                      .filter((cat) => cat.id === hoveredCategory)
                      .map((category) => (
                        <div key={category.id}>
                          <div className="grid grid-cols-2 gap-px bg-white p-6">
                            {category.services.map((service) => (
                              <Link
                                key={service.title}
                                href={service.href || "/#leistungen"}
                                onClick={handleNavClick}
                                className="group flex gap-4 rounded-xl p-5 transition-all hover:bg-primary/[0.04]"
                              >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                  {service.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-semibold text-dark mb-1 group-hover:text-primary transition-colors">
                                    {service.title}
                                  </h3>
                                  <p className="text-xs leading-relaxed text-muted line-clamp-2">
                                    {service.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="border-t border-border bg-white px-6 py-4">
                            <Link
                              href="/leistungen"
                              onClick={handleNavClick}
                              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
                            >
                              Alle Leistungen ansehen
                              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Branchen — grid dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("branchen")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-offwhite hover:text-primary"
              aria-expanded={activeDropdown === "branchen"}
            >
              Branchen
              <svg
                className={`h-4 w-4 transition-transform ${activeDropdown === "branchen" ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            <div className={`dropdown-menu absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[560px] ${activeDropdown === "branchen" ? "open" : ""}`}>
              <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
                <div className="p-4">
                  <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    SEO nach Branche
                  </p>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                    {branchen.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleNavClick}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-primary/[0.05]"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">
                            {item.label}
                          </div>
                          <div className="text-xs text-muted truncate">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border bg-offwhite/60 px-6 py-3">
                  <Link
                    href="/branchen"
                    onClick={handleNavClick}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
                  >
                    Alle Branchen im Überblick
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Standorte */}
          <Link href="/standorte" onClick={handleNavClick} className="rounded-lg px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-offwhite hover:text-primary">
            Standorte
          </Link>

          {/* Referenzen */}
          <Link href="/referenzen" onClick={handleNavClick} className="rounded-lg px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-offwhite hover:text-primary">
            Referenzen
          </Link>

          {/* Wissen — two-column dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("wissen")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-offwhite hover:text-primary"
              aria-expanded={activeDropdown === "wissen"}
            >
              Wissen
              <svg
                className={`h-4 w-4 transition-transform ${activeDropdown === "wissen" ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            <div className={`dropdown-menu absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[480px] ${activeDropdown === "wissen" ? "open" : ""}`}>
              <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">

                {/* Two-column grid */}
                <div className="grid grid-cols-2 divide-x divide-border">

                  {/* Left: Formate */}
                  <div className="p-4">
                    <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Content-Formate
                    </p>
                    <div className="space-y-0.5">
                      {wissenFormate.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleNavClick}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-primary/[0.05]"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">
                              {item.label}
                            </div>
                            <div className="text-xs text-muted">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right: Themen */}
                  <div className="p-4">
                    <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Themenbereiche
                    </p>
                    <div className="space-y-0.5">
                      {wissenThemen.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleNavClick}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-offwhite"
                        >
                          <span className={`h-2 w-2 shrink-0 rounded-full ${item.dot} transition-transform group-hover:scale-125`} />
                          <span className="text-sm font-medium text-dark group-hover:text-dark transition-colors">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-border bg-offwhite/60 px-6 py-3">
                  <Link
                    href="/wissen"
                    onClick={handleNavClick}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
                  >
                    Alle Wissensbeiträge ansehen
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>

              </div>
            </div>
          </div>

          {/* Kontakt */}
          <Link href="/kontakt" onClick={handleNavClick} className="rounded-lg px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-offwhite hover:text-primary">
            Kontakt
          </Link>

        </div>

        {/* Desktop CTA */}
        <Link
          href="/kontakt"
          className="hidden lg:inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
        >
          Kostenlose Beratung
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-dark transition-colors hover:bg-offwhite"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Navigation umschalten"
        >
          <div className="relative w-5 h-4">
            <span className={`absolute left-0 h-0.5 w-5 bg-dark transition-all duration-300 ${mobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-5 bg-dark transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-dark transition-all duration-300 ${mobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu lg:hidden absolute inset-x-0 top-full bg-white border-t border-border shadow-lg ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mx-auto max-w-7xl px-6 py-4 space-y-1">
          {[
            { label: "Home", href: "/" },
            { label: "Leistungen", href: "/leistungen" },
            { label: "Branchen", href: "/branchen" },
            { label: "Standorte", href: "/standorte" },
            { label: "Referenzen", href: "/referenzen" },
            { label: "Wissen", href: "/wissen" },
            { label: "Kontakt", href: "/kontakt" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className="block rounded-lg px-4 py-3 text-base font-medium text-dark transition-colors hover:bg-offwhite hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Branchen sub-links */}
          <div className="pt-1 pb-2 px-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">SEO nach Branche</p>
            <div className="grid grid-cols-2 gap-2">
              {branchen.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-dark hover:bg-offwhite hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Wissen sub-links */}
          <div className="pt-1 pb-2 px-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">Wissen nach Format</p>
            <div className="grid grid-cols-2 gap-2">
              {wissenFormate.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-dark hover:bg-offwhite hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/kontakt"
            onClick={handleNavClick}
            className="mt-4 block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Kostenlose Beratung
          </Link>
        </div>
      </div>
    </header>
  );
}
