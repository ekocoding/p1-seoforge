"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { services, serviceCategories } from "../data/services";

/* ------------------------------------------------------------------ */
/*  NAV LINKS                                                          */
/* ------------------------------------------------------------------ */
const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Leistungen",
    href: "/#leistungen",
    dropdown: services.map((s) => ({ label: s.title, href: "/#leistungen" })),
  },
  { label: "Standorte", href: "/standorte" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Wissen", href: "/wissen" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState("seo");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route (anchor) click
  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_#E5E3DF]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.svg"
            alt="SeoForge Logo"
            width={160}
            height={40}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-offwhite hover:text-primary"
                  aria-expanded={dropdownOpen}
                >
                  {link.label}
                  <svg
                    className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Mega dropdown with invisible bridge (pt-2 creates hover zone) */}
                <div className={`dropdown-menu absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[800px] ${dropdownOpen ? 'open' : ''}`}>
                  <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
                    {/* Two-panel layout */}
                    <div className="flex">
                      {/* Left Panel: Categories */}
                      <div className="w-[200px] bg-offwhite/80 border-r border-border py-2">
                        {serviceCategories.map((category) => (
                          <button
                            key={category.id}
                            onMouseEnter={() => setHoveredCategory(category.id)}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all ${
                              hoveredCategory === category.id
                                ? 'bg-white border-l-2 border-l-primary text-primary'
                                : 'text-dark hover:bg-white/60'
                            }`}
                          >
                            <div className={`flex-shrink-0 ${hoveredCategory === category.id ? 'text-primary' : 'text-muted'}`}>
                              {category.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-semibold ${hoveredCategory === category.id ? 'text-primary' : 'text-dark'}`}>
                                {category.label}
                              </div>
                              <div className="text-xs text-muted">
                                {category.description}
                              </div>
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
                              {/* Services grid */}
                              <div className="grid grid-cols-2 gap-px bg-border p-6">
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

                              {/* CTA Footer */}
                              <div className="border-t border-border bg-offwhite/50 px-6 py-4">
                                <Link
                                  href="/#leistungen"
                                  onClick={handleNavClick}
                                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
                                >
                                  Alle Leistungen ansehen
                                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                      fillRule="evenodd"
                                      d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z"
                                      clipRule="evenodd"
                                    />
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
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="rounded-lg px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-offwhite hover:text-primary"
              >
                {link.label}
              </Link>
            )
          )}
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
            <span
              className={`absolute left-0 h-0.5 w-5 bg-dark transition-all duration-300 ${
                mobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-5 bg-dark transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-dark transition-all duration-300 ${
                mobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu lg:hidden absolute inset-x-0 top-full bg-white border-t border-border shadow-lg ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className="block rounded-lg px-4 py-3 text-base font-medium text-dark transition-colors hover:bg-offwhite hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
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
