"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";

export default function SEOAgenturPage() {
  const [typedText, setTypedText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("technical");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fullText = "seo agentur";

  // Scroll reveal observer
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    reveals.forEach(el => revealObserver.observe(el));
    
    return () => reveals.forEach(el => revealObserver.unobserve(el));
  }, []);

  // Typing animation
  useEffect(() => {
    const startDelay = setTimeout(() => {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCursorVisible(false);
            setShowResults(true);
          }, 300);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }, 800);

    return () => clearTimeout(startDelay);
  }, []);

  const searchResults = [
    {
      isAd: true,
      url: "www.seoforge.de",
      title: "SEO Agentur Deutschland - SeoForge | Kostenlose Analyse",
      description: "✓ 10+ Jahre Erfahrung ✓ 200+ erfolgreiche Projekte ✓ Transparente Prozesse. Bringen Sie Ihre Website auf Seite 1 bei Google.",
      delay: 0,
    },
    {
      isAd: false,
      url: "www.competitor-seo.de",
      title: "SEO Agentur - Professionelle Suchmaschinenoptimierung",
      description: "Wir sind Ihre SEO Agentur für bessere Rankings. Mit über 5 Jahren Erfahrung...",
      delay: 200,
    },
    {
      isAd: false,
      url: "www.seo-experts.com",
      title: "Top SEO Agentur Deutschland | Online Marketing Experten",
      description: "Steigern Sie Ihre Sichtbarkeit mit unserer SEO Agentur...",
      delay: 400,
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const tabData = {
    technical: {
      title: "Technical SEO",
      description: "Die technische Basis Ihrer Website entscheidet darüber, wie gut Suchmaschinen Ihre Inhalte crawlen, indexieren und bewerten können. Wir optimieren alle technischen Faktoren, die für Top-Rankings erforderlich sind.",
      description2: "Unsere Technical SEO Audits decken Probleme auf, die Rankings verhindern – von langsamen Ladezeiten über fehlerhafte Weiterleitungen bis zu strukturellen Problemen in der Website-Architektur.",
      items: [
        "Core Web Vitals Optimierung",
        "Page Speed & Performance",
        "Crawlability & Indexierung",
        "Mobile-First Optimierung",
        "Structured Data & Schema Markup",
        "XML Sitemaps & Robots.txt",
        "Duplicate Content Bereinigung",
        "Internationale SEO (hreflang)",
      ],
    },
    content: {
      title: "Content SEO",
      description: "Content ist nach wie vor König im SEO. Aber nicht irgendein Content – sondern strategisch geplante, perfekt optimierte Inhalte, die Nutzerbedürfnisse erfüllen und Suchmaschinen überzeugen.",
      description2: "Als erfahrene SEO Agentur entwickeln wir Content-Strategien, die auf fundierter Keyword-Recherche, Wettbewerbsanalyse und Suchintention basieren. Jeder Text wird für Rankings und Conversions optimiert.",
      items: [
        "Keyword-Recherche & Strategie",
        "Content-Planung & Redaktionsplan",
        "SEO-Texte & Landingpages",
        "Blogartikel & Ratgeber",
        "Content-Optimierung bestehender Seiten",
        "Meta-Daten Optimierung",
        "Content-Gap-Analyse",
        "Suchintention-Analyse",
      ],
    },
    offpage: {
      title: "Offpage SEO",
      description: "Backlinks sind nach wie vor einer der wichtigsten Rankingfaktoren. Doch qualitativ hochwertige Links aufzubauen ist zeitaufwändig und erfordert Beziehungen, Kreativität und strategisches Vorgehen.",
      description2: "Als SEO Agentur setzen wir auf nachhaltigen, white-hat Linkaufbau durch Content-Marketing, digitale PR und strategische Partnerschaften. Keine risikoreichen PBNs oder Linkkauf – nur Backlinks, die Google belohnt.",
      items: [
        "Linkaufbau-Strategie",
        "Digitale PR & Outreach",
        "Content-Seeding & Promotion",
        "Broken-Link-Building",
        "Backlink-Analyse & Monitoring",
        "Disavow-Audits & Bereinigung",
        "Brand-Mentions & Unlinked Citations",
        "Competitor-Backlink-Analyse",
      ],
    },
    local: {
      title: "Local SEO",
      description: "Für Unternehmen mit lokalem Fokus ist Local SEO essentiell. Über 46% aller Google-Suchen haben lokalen Bezug – und diese Nutzer sind oft kurz vor einer Kaufentscheidung.",
      description2: "Als SEO Agentur optimieren wir Ihre lokale Präsenz über alle relevanten Kanäle: von Google Business Profile über lokale Verzeichnisse bis zu standortspezifischen Landingpages. So werden Sie in Ihrer Region gefunden.",
      items: [
        "Google Business Profile Optimierung",
        "Local Citations & NAP-Konsistenz",
        "Lokale Keyword-Strategie",
        "Standort-Landingpages",
        "Review-Management & Reputation",
        "Lokale Verzeichnisse & Branchenportale",
        "Local Pack Optimierung",
        "Multi-Location SEO",
      ],
    },
    shop: {
      title: "Shop SEO (E-Commerce)",
      description: "E-Commerce SEO ist eine eigene Disziplin mit spezifischen Herausforderungen: Tausende Produktseiten, dünner Content, technische Komplexität und harter Wettbewerb. Hier ist spezialisierte Expertise gefragt.",
      description2: "Als SEO Agentur mit E-Commerce-Fokus optimieren wir Ihre Kategorie- und Produktseiten, entwickeln Content-Strategien für Commercial Keywords und sorgen dafür, dass Ihr Shop bei kaufbereiten Nutzern gefunden wird.",
      items: [
        "Kategorie- & Produktseiten-Optimierung",
        "E-Commerce Keyword-Strategie",
        "Product Schema Markup",
        "Facettierte Navigation & Filter",
        "Interne Verlinkungsstruktur",
        "Duplicate Content Handling",
        "Ratgeber- & Vergleichsseiten",
        "Conversion-Rate-Optimierung",
      ],
    },
  };

  const faqData = [
    {
      question: "Was genau macht eine SEO Agentur?",
      answer: "Eine SEO Agentur optimiert Websites, damit sie in Suchmaschinen wie Google besser gefunden werden. Das umfasst technische Optimierungen (Ladezeiten, Crawlability, Mobile-Optimierung), strategische Content-Erstellung, Backlink-Aufbau und kontinuierliches Monitoring. Ziel ist es, mehr qualifizierten Traffic zu generieren, der zu Anfragen und Verkäufen führt.",
    },
    {
      question: "Was kostet professionelle Suchmaschinenoptimierung?",
      answer: "Die Kosten einer SEO Agentur variieren je nach Projektumfang, Wettbewerbsintensität und gewünschten Zielen. Bei SeoForge beginnen monatliche SEO-Betreuungen ab 1.500 Euro für kleine Projekte. Mittelständische Unternehmen investieren typischerweise 3.000-8.000 Euro monatlich. Wichtig: SEO ist eine Investition, kein Kostenfaktor. Mit einem durchschnittlichen ROI von 748% zahlt sich professionelle Suchmaschinenoptimierung schnell aus. Wir bieten eine kostenlose Erstanalyse an, um Ihr individuelles Potenzial und die zu erwartenden Kosten zu ermitteln.",
    },
    {
      question: "Wie lange dauert es, bis SEO wirkt?",
      answer: "Erste messbare Ergebnisse zeigen sich in der Regel nach 3-6 Monaten. Nachhaltige Top-Rankings und signifikanter Traffic-Zuwachs erfordern typischerweise 6-12 Monate kontinuierlicher Arbeit. Der genaue Zeitrahmen hängt von vielen Faktoren ab: Ihrer Ausgangssituation, der Wettbewerbsintensität in Ihrer Branche und der Konsequenz der Umsetzung. Schnelle \"Quick Wins\" (z.B. technische Fixes, Low-Hanging-Fruit-Keywords) können bereits nach wenigen Wochen Wirkung zeigen. Für hart umkämpfte Keywords braucht es jedoch Geduld und strategische Arbeit über mehrere Monate.",
    },
    {
      question: "Was ist der Unterschied zwischen SEO und SEA?",
      answer: "SEO (Search Engine Optimization) optimiert Ihre Website für die organischen, also unbezahlten Suchergebnisse. Die Wirkung ist nachhaltig: Einmal erreichte Rankings bleiben oft über Monate stabil – ohne laufende Klickkosten. SEA (Search Engine Advertising) sind bezahlte Anzeigen (z.B. Google Ads), die sofort sichtbar sind, aber nur solange laufen, wie Sie dafür bezahlen. Sobald das Budget aufgebraucht ist, verschwindet die Sichtbarkeit. Beide Kanäle haben ihre Berechtigung und ergänzen sich idealerweise.",
    },
    {
      question: "Braucht mein Unternehmen wirklich eine SEO Agentur?",
      answer: "Das hängt von Ihren Ressourcen und Zielen ab. SEO inhouse umzusetzen ist theoretisch möglich, erfordert aber spezialisiertes Know-how, teure Tools (oft 500-2.000€/Monat) und viel Zeit. Die meisten Unternehmen unterschätzen den Aufwand massiv. Eine SEO Agentur bringt Expertise aus Hunderten Projekten mit, hat Zugang zu allen wichtigen Tools und kann sich voll auf Ihre Optimierung konzentrieren. Besonders wenn SEO ein wichtiger Kanal für Ihr Geschäft ist, lohnt sich die Investition in eine professionelle Agentur schnell.",
    },
    {
      question: "Wie messe ich den Erfolg von SEO-Maßnahmen?",
      answer: "Erfolgreiche SEO-Arbeit zeigt sich in mehreren KPIs: Organischer Traffic (Besucher über Google), Rankings für wichtige Keywords, Sichtbarkeitsindex, Conversion-Rate (Anfragen, Käufe), und letztlich Umsatz aus organischem Traffic. Bei SeoForge tracken wir all diese Metriken und bereiten sie in monatlichen Reports transparent auf. So sehen Sie jederzeit, was Ihre Investition bringt und wo wir stehen.",
    },
    {
      question: "Welche SEO-Tools werden eingesetzt?",
      answer: "Als professionelle SEO Agentur arbeiten wir mit dem gesamten Spektrum führender Tools: Ahrefs für Backlink- und Keyword-Analysen, Screaming Frog für Technical Audits, Google Search Console und Analytics für Performance-Tracking, Sistrix für Sichtbarkeitsanalysen, und viele weitere spezialisierte Tools. Diese Tool-Suite kostet mehrere tausend Euro pro Monat – als Kunde profitieren Sie von diesem Zugang ohne eigene Investition.",
    },
    {
      question: "Was ist technisches SEO?",
      answer: "Technical SEO umfasst alle technischen Optimierungen, die sicherstellen, dass Suchmaschinen Ihre Website effizient crawlen, indexieren und bewerten können. Dazu gehören: Ladezeiten-Optimierung (Core Web Vitals), Mobile-Optimierung, korrekte Weiterleitungen, XML-Sitemaps, Robots.txt, strukturierte Daten (Schema Markup), und vieles mehr. Technische Probleme können selbst den besten Content unsichtbar machen – deshalb ist Technical SEO die Grundlage jeder erfolgreichen Strategie.",
    },
    {
      question: "Wie wichtig sind Backlinks noch?",
      answer: "Backlinks sind nach wie vor einer der wichtigsten Rankingfaktoren – aber Qualität zählt mehr als Quantität. Ein Link von einer vertrauenswürdigen, thematisch relevanten Website ist mehr wert als hundert Spam-Links. Als SEO Agentur setzen wir auf nachhaltigen, natürlichen Linkaufbau durch digitale PR, Content-Marketing und strategische Partnerschaften. Billige Linkpakete oder Private Blog Networks (PBNs) sind riskant und führen oft zu Google-Strafen.",
    },
    {
      question: "Was passiert bei einem Google Core Update?",
      answer: "Google rollt mehrmals im Jahr sogenannte Core Updates aus – größere Änderungen am Ranking-Algorithmus. Diese können zu Schwankungen in den Rankings führen. Als erfahrene SEO Agentur verfolgen wir alle Updates in Echtzeit, analysieren die Auswirkungen auf Ihre Website und passen die Strategie bei Bedarf an. Websites, die auf nachhaltige White-Hat-SEO setzen (wie wir), sind in der Regel weniger von negativen Update-Effekten betroffen.",
    },
    {
      question: "Bietet SeoForge auch lokale SEO an?",
      answer: "Ja, Local SEO ist einer unserer Schwerpunkte. Wir optimieren Ihr Google Business Profile, sorgen für konsistente NAP-Daten (Name, Address, Phone) in allen Verzeichnissen, erstellen standortspezifische Landingpages und bauen lokale Citations auf. Besonders für Dienstleister, Einzelhändler und Unternehmen mit mehreren Standorten ist Local SEO oft der schnellste Weg zu mehr Anfragen.",
    },
    {
      question: "Wie sieht das monatliche Reporting aus?",
      answer: "Sie erhalten monatlich einen übersichtlichen Report mit allen wichtigen KPIs: Entwicklung der Rankings, organischer Traffic, Sichtbarkeitsindex, neu gewonnene Backlinks, und umgesetzte Maßnahmen. Zusätzlich führen wir regelmäßige Strategiegespräche, in denen wir Fortschritte besprechen und die nächsten Schritte planen. Transparenz ist uns wichtig – Sie sollen jederzeit wissen, woran wir arbeiten und welche Ergebnisse wir erzielen.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-offwhite" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/[0.04] via-secondary/[0.03] to-transparent rounded-full blur-3xl" />
        <div className="deco-ring" style={{width: "350px", height: "350px", top: "10%", right: "-80px"}} />
        <div className="deco-ring" style={{width: "220px", height: "220px", bottom: "15%", right: "12%"}} />
        <div className="deco-circle" style={{width: "70px", height: "70px", top: "30%", right: "35%"}} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div>
              <div className="hero-el inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary border border-primary/20 shadow-sm mb-6">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
                SEO Agentur aus Deutschland
              </div>

              <h1 className="hero-el font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] text-dark mb-6">
                Ihre SEO Agentur für nachhaltige Sichtbarkeit bei Google
              </h1>

              <p className="hero-el text-lg text-muted leading-relaxed mb-4">
                Als erfahrene SEO Agentur entwickeln wir datengetriebene Strategien, die Ihre Website in den organischen Suchergebnissen nach oben bringen. Wir optimieren nicht nur für Rankings, sondern für messbare Geschäftsergebnisse.
              </p>

              <p className="hero-el text-base text-muted/80 leading-relaxed mb-8">
                Seit über 10 Jahren betreuen wir Unternehmen jeder Größe. Mit einem durchschnittlichen ROI von 748% und über 2.500 Top-10-Platzierungen wissen wir, was funktioniert.
              </p>

              <div className="hero-el flex flex-wrap items-center gap-3 mb-8">
                {["Google Partner", "10+ Jahre Erfahrung", "200+ Kunden"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-dark/80 border border-border shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>

              <div className="hero-el flex flex-wrap items-center gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white hover:bg-primary-dark"
                >
                  Kostenlose SEO-Analyse
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="tel:+496912345678"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +49 69 123 456 78
                </a>
              </div>
            </div>

            {/* Animated SERP Banner */}
            <div className="hidden lg:block" style={{ perspective: "1000px" }}>
              <div
                className="relative transition-all duration-500"
                style={{
                  transform: "rotateX(2deg) rotateY(-2deg)",
                  animation: "serpFloat 6s ease-in-out infinite",
                }}
              >
                <div className="rounded-xl border border-border bg-white shadow-2xl overflow-hidden">
                  {/* Browser Chrome */}
                  <div className="flex items-center gap-2 bg-[#F8F7F5] px-4 py-3 border-b border-border">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400 hover:scale-125 transition-transform cursor-pointer" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400 hover:scale-125 transition-transform cursor-pointer" />
                      <div className="h-3 w-3 rounded-full bg-green-400 hover:scale-125 transition-transform cursor-pointer" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded px-3 py-1.5 text-sm text-muted flex items-center gap-2 border border-border">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>www.google.de/search?q=seo+agentur</span>
                      </div>
                    </div>
                  </div>

                  {/* Google Search Interface */}
                  <div className="p-5 bg-white">
                    {/* Google Logo + Search Bar */}
                    <div className="mb-5">
                      <div className="flex items-center gap-4 mb-3">
                        <svg className="w-16 h-6" viewBox="0 0 272 92" fill="none">
                          <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
                          <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
                          <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
                          <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
                          <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
                          <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4" />
                        </svg>
                      </div>
                      <div className="flex items-center gap-3 bg-[#F8F7F5] rounded-full px-4 py-2 border border-border">
                        <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-dark font-medium min-h-[20px]">
                          {typedText}
                          <span
                            className={`inline-block w-[2px] h-4 bg-primary ml-0.5 align-middle ${cursorVisible ? "animate-blink" : "opacity-0"}`}
                          />
                        </span>
                      </div>
                    </div>

                    {/* Search Results */}
                    <div className="space-y-4">
                      {showResults &&
                        searchResults.map((result, idx) => (
                          <div
                            key={idx}
                            className={`result-item opacity-0 cursor-pointer transition-transform duration-300 hover:translate-x-2 ${
                              result.isAd
                                ? "border-l-4 border-primary pl-3 bg-gradient-to-r from-primary/5 to-transparent py-2 pr-2 rounded-r"
                                : "pl-2"
                            }`}
                            style={{
                              animation: `slideInResult 0.5s ease-out ${result.delay}ms forwards`,
                            }}
                          >
                            <div className="flex items-start gap-2 mb-1">
                              {result.isAd && (
                                <div className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse shrink-0">
                                  ANZEIGE
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <div
                                    className="w-3.5 h-3.5 rounded-full shrink-0"
                                    style={{ backgroundColor: result.isAd ? "#C2722A" : "#6B6B6B" }}
                                  />
                                  <span className="text-xs text-dark font-medium truncate">{result.url}</span>
                                </div>
                                <h3 className="text-base text-blue-700 font-medium mb-0.5 hover:underline cursor-pointer leading-tight">
                                  {result.title}
                                </h3>
                                <p className="text-xs text-muted leading-relaxed">{result.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAS MACHT EINE SEO AGENTUR */}
      <section className="relative py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 reveal">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Grundlagen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-6 leading-tight">
                Was macht eine SEO Agentur?
              </h2>
              <p className="text-muted text-base lg:text-lg leading-relaxed mb-5">
                Eine <strong className="text-dark font-semibold">SEO Agentur</strong> ist ein spezialisierter Dienstleister, der Unternehmen dabei unterstützt, in den organischen Suchergebnissen von Google und anderen Suchmaschinen besser gefunden zu werden. Im Gegensatz zu bezahlter Werbung (SEA) setzt eine professionelle SEO Agentur auf nachhaltige Strategien, die langfristig wirken und kontinuierlich qualifizierten Traffic generieren.
              </p>
              <p className="text-muted text-base lg:text-lg leading-relaxed mb-5">
                Die Arbeit einer SEO Agentur umfasst weit mehr als nur die Platzierung einzelner Keywords. Moderne Suchmaschinenoptimierung ist ein ganzheitlicher Prozess, der technische Website-Optimierung, strategische Content-Erstellung, Linkaufbau und kontinuierliches Performance-Monitoring miteinander verbindet. Jede dieser Disziplinen erfordert tiefgreifendes Fachwissen und jahrelange Erfahrung.
              </p>
              <p className="text-muted text-base lg:text-lg leading-relaxed mb-5">
                Bei SeoForge verstehen wir SEO nicht als isolierte Maßnahme, sondern als integralen Bestandteil Ihrer digitalen Wachstumsstrategie. Wir analysieren nicht nur Ihre Website, sondern auch Ihren Markt, Ihre Wettbewerber und das Suchverhalten Ihrer Zielgruppe, um eine maßgeschneiderte Strategie zu entwickeln, die messbare Ergebnisse liefert.
              </p>
              <p className="text-muted text-base lg:text-lg leading-relaxed mb-8">
                Eine erfolgreiche SEO Agentur arbeitet transparent, datenbasiert und mit einem klaren Fokus auf ROI. Unsere Kunden wissen jederzeit, welche Maßnahmen wir umsetzen, welche Fortschritte erzielt wurden und wie sich diese auf ihr Geschäft auswirken.
              </p>
            </div>

            <div className="lg:col-span-5 reveal">
              <div className="bg-offwhite rounded-2xl p-8 lg:p-10 border border-border/60">
                <div className="pull-quote mb-8">
                  <p className="text-dark font-[family-name:var(--font-heading)] text-xl lg:text-2xl italic leading-relaxed mb-4">
                    „SEO ist kein Sprint, sondern ein Marathon. Aber mit der richtigen Strategie gewinnen Sie nicht nur das Rennen – Sie bauen eine Überholspur."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">MK</div>
                    <div>
                      <p className="text-sm font-semibold text-dark">Joel Heuchert</p>
                      <p className="text-xs text-muted">CEO & Gründer</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-6">
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted mb-4">Was wir abdecken</p>
                  <ul className="flex flex-col gap-3">
                    {[
                      "Technical SEO (Core Web Vitals, Crawlability)",
                      "Content-Strategie & SEO-Texte",
                      "Backlink-Aufbau & Digitale PR",
                      "Local SEO & Google Business Profile",
                      "Monitoring & Performance Reporting",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-dark/80">
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Separator */}
      <div className="relative bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="border-t border-border" />
        </div>
      </div>

      {/* WARUM PROFESSIONELLE SEO AGENTUR */}
      <section className="relative py-20 lg:py-32 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="reveal mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Unterschied</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-8 leading-tight">
              Warum eine professionelle SEO Agentur beauftragen?
            </h2>
          </div>

          <div className="reveal prose-custom max-w-none">
            <p className="text-muted text-base lg:text-lg leading-relaxed mb-6">
              In einer Zeit, in der über 90% aller Online-Erlebnisse mit einer Suchmaschine beginnen, ist die Sichtbarkeit bei Google nicht mehr optional – sie ist geschäftskritisch. Doch Suchmaschinenoptimierung hat sich in den letzten Jahren dramatisch verändert. Was vor fünf Jahren funktionierte, kann heute zu Abstrafungen führen. Was heute Best Practice ist, kann morgen überholt sein.
            </p>

            <p className="text-muted text-base lg:text-lg leading-relaxed mb-6">
              Eine professionelle <strong className="text-dark font-semibold">SEO Agentur</strong> bringt genau das mit, was inhouse oft fehlt: kontinuierlich aktualisiertes Fachwissen, Erfahrung aus Hunderten von Projekten, Zugang zu professionellen Tools und die Kapazität, SEO-Maßnahmen konsequent umzusetzen. Während Ihre internen Teams sich auf Ihr Kerngeschäft konzentrieren, optimieren wir Ihre digitale Präsenz mit bewährten Strategien und modernsten Methoden.
            </p>

            <div className="my-10 bg-offwhite rounded-2xl p-8 border border-border/60">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-primary mb-4">Die Hauptgründe</p>
              <ul className="flex flex-col gap-4">
                {[
                  { title: "Spezialisiertes Know-how", desc: "SEO ist ein komplexes Fachgebiet mit über 200 Rankingfaktoren. Eine spezialisierte Agentur kennt die Zusammenhänge und weiß, welche Hebel den größten Impact haben." },
                  { title: "Zeit- und Ressourcenersparnis", desc: "Effektives SEO erfordert kontinuierlichen Aufwand. Eine Agentur übernimmt diese Arbeit, während sich Ihr Team auf Kernkompetenzen konzentrieren kann." },
                  { title: "Zugang zu Premium-Tools", desc: "Professionelle SEO-Tools kosten schnell mehrere tausend Euro pro Monat. Als Agentur haben wir Zugriff auf das gesamte Tool-Spektrum." },
                  { title: "Erfahrung aus vielen Projekten", desc: "Was in Ihrer Branche funktioniert, haben wir oft schon in ähnlichen Projekten getestet. Wir bringen Best Practices aus über 200 Kundenprojekten mit." },
                  { title: "Objektiver Blick von außen", desc: "Als externe Partner sehen wir Potenziale und Probleme, die intern oft übersehen werden. Wir sprechen unbequeme Wahrheiten aus." },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">{idx + 1}</span>
                    <div>
                      <p className="font-semibold text-dark mb-1">{item.title}</p>
                      <p className="text-sm text-muted">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-muted text-base lg:text-lg leading-relaxed mb-6">
              Besonders wichtig ist die strategische Perspektive, die eine erfahrene <strong className="text-dark font-semibold">SEO Agentur</strong> mitbringt. Wir optimieren nicht blind für Rankings, sondern denken vom Geschäftsziel her: Welche Keywords bringen qualifizierte Leads? Welche Content-Strategie unterstützt den Sales-Funnel? Wie können wir SEO mit anderen Marketing-Kanälen verzahnen?
            </p>

            <div className="pull-quote my-10 pl-6">
              <p className="text-dark font-[family-name:var(--font-heading)] text-xl lg:text-2xl italic leading-relaxed mb-4">
                „Der größte Fehler, den Unternehmen machen, ist SEO als einmaliges Projekt zu behandeln. SEO ist ein kontinuierlicher Prozess – und genau dabei unterstützt eine gute Agentur."
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white text-sm font-bold">JH</div>
                <div>
                  <p className="text-sm font-semibold text-dark">Joel Heuchert</p>
                  <p className="text-xs text-muted">CEO & Gründer</p>
                </div>
              </div>
            </div>

            <p className="text-muted text-base lg:text-lg leading-relaxed mb-6">
              Ein weiterer entscheidender Vorteil: Als <strong className="text-dark font-semibold">SEO Agentur</strong> beobachten wir täglich Algorithmus-Updates, neue Rankingfaktoren und sich verändernde Nutzerverhalten. Wir passen Strategien proaktiv an, bevor negative Auswirkungen spürbar werden. Wenn Google ein Core Update ausrollt, sind wir vorbereitet – unsere Kunden nicht davon überrascht.
            </p>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN (Tab Interface) */}
      <section id="leistungen" className="relative py-20 lg:py-28 bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Unser Angebot</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-6">
              Unsere SEO-Leistungen im Überblick
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Als Full-Service SEO Agentur decken wir alle Bereiche der Suchmaschinenoptimierung ab – von der technischen Basis bis zur strategischen Content-Planung.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 reveal">
            {[
              { id: "technical", label: "Technical SEO" },
              { id: "content", label: "Content SEO" },
              { id: "offpage", label: "Offpage SEO" },
              { id: "local", label: "Local SEO" },
              { id: "shop", label: "Shop SEO" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn px-6 py-3 text-sm font-semibold text-dark/70 hover:text-primary transition-colors ${activeTab === tab.id ? "active text-primary" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-border/60 shadow-sm reveal">
            {Object.entries(tabData).map(([key, data]) => (
              <div key={key} className={`tab-content ${activeTab === key ? "active" : ""}`}>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">{data.title}</h3>
                <p className="text-muted text-base lg:text-lg leading-relaxed mb-4">{data.description}</p>
                <p className="text-muted text-base lg:text-lg leading-relaxed mb-6">{data.description2}</p>
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted mb-3">Leistungen:</p>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {data.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-dark/80">
                      <svg className="w-4 h-4 mt-0.5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SO ARBEITEN WIR (Geometric Process Visualization) */}
      <section id="prozess" className="relative py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Unser Vorgehen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-6">
              So arbeiten wir als SEO Agentur
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Transparenz und Struktur sind die Grundlage unserer Zusammenarbeit. So läuft ein typisches SEO-Projekt bei SeoForge ab.
            </p>
          </div>

          {/* 6 Process Steps */}
          <div className="space-y-12 lg:space-y-16">

            {/* Step 01 - Analyse & Audit */}
            <div className="reveal">
              <div className="bg-offwhite border border-border/60 rounded-xl p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* SVG LEFT (odd step) */}
                  <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                    <svg className="process-svg" width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                      {/* Hexagonal radar chart */}
                      <g transform="translate(120, 120)">
                        {/* Concentric hexagons (background grid) */}
                        <polygon points="0,-90 77.9,-45 77.9,45 0,90 -77.9,45 -77.9,-45"
                                 fill="none" stroke="#E5E3DF" strokeWidth="1.5" opacity="0.4"/>
                        <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30"
                                 fill="none" stroke="#E5E3DF" strokeWidth="1.5" opacity="0.4"/>
                        <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15"
                                 fill="none" stroke="#E5E3DF" strokeWidth="1.5" opacity="0.4"/>

                        {/* Radar axes */}
                        <line x1="0" y1="0" x2="0" y2="-90" stroke="#C2722A" strokeWidth="1.5" opacity="0.3"/>
                        <line x1="0" y1="0" x2="77.9" y2="-45" stroke="#C2722A" strokeWidth="1.5" opacity="0.3"/>
                        <line x1="0" y1="0" x2="77.9" y2="45" stroke="#C2722A" strokeWidth="1.5" opacity="0.3"/>
                        <line x1="0" y1="0" x2="0" y2="90" stroke="#C2722A" strokeWidth="1.5" opacity="0.3"/>
                        <line x1="0" y1="0" x2="-77.9" y2="45" stroke="#C2722A" strokeWidth="1.5" opacity="0.3"/>
                        <line x1="0" y1="0" x2="-77.9" y2="-45" stroke="#C2722A" strokeWidth="1.5" opacity="0.3"/>

                        {/* Data polygon */}
                        <polygon points="0,-70 58,-28 62,38 0,55 -48,28 -52,-35"
                                 fill="#C2722A" fillOpacity="0.15" stroke="#C2722A" strokeWidth="2"/>

                        {/* Data points */}
                        <circle cx="0" cy="-70" r="5" fill="#C2722A" className="pulse-dot"/>
                        <circle cx="58" cy="-28" r="5" fill="#D4A853" className="pulse-dot" style={{ animationDelay: '0.3s' }}/>
                        <circle cx="62" cy="38" r="5" fill="#C2722A" className="pulse-dot" style={{ animationDelay: '0.6s' }}/>
                        <circle cx="0" cy="55" r="5" fill="#D4A853" className="pulse-dot" style={{ animationDelay: '0.9s' }}/>
                        <circle cx="-48" cy="28" r="5" fill="#C2722A" className="pulse-dot" style={{ animationDelay: '1.2s' }}/>
                        <circle cx="-52" cy="-35" r="5" fill="#D4A853" className="pulse-dot" style={{ animationDelay: '1.5s' }}/>
                      </g>
                    </svg>
                  </div>

                  {/* Text RIGHT (odd step) */}
                  <div className="order-1 lg:order-2">
                    <div className="text-5xl lg:text-6xl font-bold text-primary/20 mb-2">01</div>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">
                      Analyse & Audit
                    </h3>
                    <p className="text-base lg:text-lg text-muted leading-relaxed">
                      Der erste Schritt jeder SEO-Kampagne ist eine umfassende Bestandsaufnahme. Wir analysieren Ihre Website auf über 200 technische Faktoren, untersuchen Ihre aktuelle Keyword-Positionierung und bewerten die Stärken und Schwächen Ihrer Wettbewerber. Diese datengetriebene Grundlage bestimmt alle weiteren Maßnahmen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Connecting chevron */}
              <div className="flex justify-center my-6 float-chevron">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#C2722A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Step 02 - Strategie & Roadmap */}
            <div className="reveal">
              <div className="bg-offwhite border border-border/60 rounded-xl p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Text LEFT (even step) */}
                  <div className="order-1">
                    <div className="text-5xl lg:text-6xl font-bold text-secondary/20 mb-2">02</div>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">
                      Strategie & Roadmap
                    </h3>
                    <p className="text-base lg:text-lg text-muted leading-relaxed">
                      Aus den Analyseergebnissen entwickeln wir eine maßgeschneiderte SEO-Strategie mit klaren Meilensteinen und Prioritäten. Die Roadmap definiert, welche Maßnahmen in welcher Reihenfolge umgesetzt werden – von Quick Wins bis zu langfristigen Wachstumshebeln. Jeder Schritt ist messbar und nachvollziehbar.
                    </p>
                  </div>

                  {/* SVG RIGHT (even step) */}
                  <div className="flex justify-center lg:justify-end order-2">
                    <svg className="process-svg" width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                      {/* Decision tree / flowchart */}
                      <g transform="translate(120, 30)">
                        {/* Root node */}
                        <circle cx="0" cy="0" r="20" fill="#C2722A" stroke="#C2722A" strokeWidth="2"/>

                        {/* Level 1 connections */}
                        <line x1="0" y1="20" x2="-50" y2="65" stroke="#C2722A" strokeWidth="2"/>
                        <line x1="0" y1="20" x2="50" y2="65" stroke="#C2722A" strokeWidth="2"/>

                        {/* Level 1 nodes */}
                        <circle cx="-50" cy="70" r="14" fill="none" stroke="#D4A853" strokeWidth="2"/>
                        <circle cx="50" cy="70" r="14" fill="none" stroke="#D4A853" strokeWidth="2"/>

                        {/* Level 2 connections */}
                        <line x1="-50" y1="84" x2="-75" y2="120" stroke="#D4A853" strokeWidth="1.8"/>
                        <line x1="-50" y1="84" x2="-25" y2="120" stroke="#D4A853" strokeWidth="1.8"/>
                        <line x1="50" y1="84" x2="25" y2="120" stroke="#D4A853" strokeWidth="1.8"/>
                        <line x1="50" y1="84" x2="75" y2="120" stroke="#D4A853" strokeWidth="1.8"/>

                        {/* Level 2 nodes */}
                        <circle cx="-75" cy="125" r="10" fill="#C2722A"/>
                        <circle cx="-25" cy="125" r="10" fill="#C2722A"/>
                        <circle cx="25" cy="125" r="10" fill="#C2722A"/>
                        <circle cx="75" cy="125" r="10" fill="#C2722A"/>

                        {/* Level 3 connections */}
                        <line x1="-75" y1="135" x2="-87" y2="165" stroke="#C2722A" strokeWidth="1.5" opacity="0.6"/>
                        <line x1="-75" y1="135" x2="-63" y2="165" stroke="#C2722A" strokeWidth="1.5" opacity="0.6"/>
                        <line x1="-25" y1="135" x2="-37" y2="165" stroke="#C2722A" strokeWidth="1.5" opacity="0.6"/>
                        <line x1="-25" y1="135" x2="-13" y2="165" stroke="#C2722A" strokeWidth="1.5" opacity="0.6"/>
                        <line x1="25" y1="135" x2="13" y2="165" stroke="#C2722A" strokeWidth="1.5" opacity="0.6"/>
                        <line x1="25" y1="135" x2="37" y2="165" stroke="#C2722A" strokeWidth="1.5" opacity="0.6"/>
                        <line x1="75" y1="135" x2="63" y2="165" stroke="#C2722A" strokeWidth="1.5" opacity="0.6"/>
                        <line x1="75" y1="135" x2="87" y2="165" stroke="#C2722A" strokeWidth="1.5" opacity="0.6"/>

                        {/* Terminal nodes (squares) */}
                        <rect x="-92" y="165" width="10" height="10" fill="#D4A853" opacity="0.7"/>
                        <rect x="-68" y="165" width="10" height="10" fill="#D4A853" opacity="0.7"/>
                        <rect x="-42" y="165" width="10" height="10" fill="#D4A853" opacity="0.7"/>
                        <rect x="-18" y="165" width="10" height="10" fill="#D4A853" opacity="0.7"/>
                        <rect x="8" y="165" width="10" height="10" fill="#D4A853" opacity="0.7"/>
                        <rect x="32" y="165" width="10" height="10" fill="#D4A853" opacity="0.7"/>
                        <rect x="58" y="165" width="10" height="10" fill="#D4A853" opacity="0.7"/>
                        <rect x="82" y="165" width="10" height="10" fill="#D4A853" opacity="0.7"/>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Connecting chevron */}
              <div className="flex justify-center my-6 float-chevron" style={{ animationDelay: '0.2s' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Step 03 - Technische Optimierung */}
            <div className="reveal">
              <div className="bg-offwhite border border-border/60 rounded-xl p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* SVG LEFT (odd step) */}
                  <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                    <svg className="process-svg" width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                      {/* Honeycomb hexagonal grid */}
                      <g transform="translate(120, 120)">
                        {/* Center hexagon (filled) */}
                        <polygon points="0,-28 24.2,-14 24.2,14 0,28 -24.2,14 -24.2,-14"
                                 fill="#C2722A" stroke="#C2722A" strokeWidth="2"/>

                        {/* Ring 1 (6 hexagons around center) */}
                        <polygon points="0,-56 24.2,-70 48.4,-56 48.4,-28 24.2,-14 0,-28"
                                 fill="none" stroke="#D4A853" strokeWidth="2"/>
                        <polygon points="48.4,-28 72.6,-14 72.6,14 48.4,28 24.2,14 24.2,-14"
                                 fill="none" stroke="#D4A853" strokeWidth="2"/>
                        <polygon points="24.2,14 48.4,28 48.4,56 24.2,70 0,56 0,28"
                                 fill="none" stroke="#D4A853" strokeWidth="2"/>
                        <polygon points="-24.2,14 0,28 0,56 -24.2,70 -48.4,56 -48.4,28"
                                 fill="none" stroke="#D4A853" strokeWidth="2"/>
                        <polygon points="-48.4,-28 -24.2,-14 -24.2,14 -48.4,28 -72.6,14 -72.6,-14"
                                 fill="none" stroke="#D4A853" strokeWidth="2"/>
                        <polygon points="-24.2,-70 0,-56 0,-28 -24.2,-14 -48.4,-28 -48.4,-56"
                                 fill="none" stroke="#D4A853" strokeWidth="2"/>

                        {/* Ring 2 (partial outer ring) */}
                        <polygon points="0,-84 24.2,-98 48.4,-84 48.4,-56 24.2,-42 0,-56"
                                 fill="none" stroke="#C2722A" strokeWidth="1.5" opacity="0.4"/>
                        <polygon points="72.6,-42 96.8,-28 96.8,0 72.6,14 48.4,0 48.4,-28"
                                 fill="none" stroke="#C2722A" strokeWidth="1.5" opacity="0.4"/>
                        <polygon points="72.6,14 96.8,28 96.8,56 72.6,70 48.4,56 48.4,28"
                                 fill="none" stroke="#C2722A" strokeWidth="1.5" opacity="0.4"/>
                        <polygon points="24.2,70 48.4,84 48.4,112 24.2,126 0,112 0,84"
                                 fill="none" stroke="#C2722A" strokeWidth="1.5" opacity="0.4"/>
                        <polygon points="-24.2,70 0,84 0,112 -24.2,126 -48.4,112 -48.4,84"
                                 fill="none" stroke="#C2722A" strokeWidth="1.5" opacity="0.4"/>
                        <polygon points="-72.6,-42 -48.4,-56 -48.4,-28 -72.6,0 -96.8,0 -96.8,-28"
                                 fill="none" stroke="#C2722A" strokeWidth="1.5" opacity="0.4"/>

                        {/* Accent dots */}
                        <circle cx="0" cy="0" r="3" fill="white" className="pulse-dot"/>
                        <circle cx="0" cy="-42" r="2.5" fill="#C2722A" opacity="0.7"/>
                        <circle cx="48.4" cy="-42" r="2.5" fill="#C2722A" opacity="0.7"/>
                        <circle cx="60.5" cy="0" r="2.5" fill="#C2722A" opacity="0.7"/>
                        <circle cx="36.3" cy="42" r="2.5" fill="#C2722A" opacity="0.7"/>
                        <circle cx="-36.3" cy="42" r="2.5" fill="#C2722A" opacity="0.7"/>
                        <circle cx="-60.5" cy="0" r="2.5" fill="#C2722A" opacity="0.7"/>
                      </g>
                    </svg>
                  </div>

                  {/* Text RIGHT (odd step) */}
                  <div className="order-1 lg:order-2">
                    <div className="text-5xl lg:text-6xl font-bold text-primary/20 mb-2">03</div>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">
                      Technische Optimierung
                    </h3>
                    <p className="text-base lg:text-lg text-muted leading-relaxed">
                      Die technische Basis Ihrer Website muss stimmen, damit Google Ihre Inhalte optimal crawlen und indexieren kann. Wir optimieren Ladezeiten, Core Web Vitals, URL-Strukturen, interne Verlinkung und Schema Markup – die unsichtbare Architektur, die Ihre Rankings trägt.
                    </p>
                  </div>
                </div>
              </div>

              {/* Connecting chevron */}
              <div className="flex justify-center my-6 float-chevron" style={{ animationDelay: '0.4s' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#C2722A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Step 04 - Content-Erstellung */}
            <div className="reveal">
              <div className="bg-offwhite border border-border/60 rounded-xl p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Text LEFT (even step) */}
                  <div className="order-1">
                    <div className="text-5xl lg:text-6xl font-bold text-secondary/20 mb-2">04</div>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">
                      Content-Erstellung
                    </h3>
                    <p className="text-base lg:text-lg text-muted leading-relaxed">
                      Hochwertiger Content ist der Treibstoff jeder SEO-Strategie. Wir erstellen suchmaschinenoptimierte Texte, die sowohl für Google als auch für Ihre Zielgruppe geschrieben sind – von Pillar Pages über Blog-Artikel bis zu optimierten Produktbeschreibungen. Jeder Text folgt einer fundierten Keyword-Strategie.
                    </p>
                  </div>

                  {/* SVG RIGHT (even step) */}
                  <div className="flex justify-center lg:justify-end order-2">
                    <svg className="process-svg" width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                      {/* Stacked document cards */}
                      <g transform="translate(120, 120)">
                        {/* Back card (rotated, faded) */}
                        <g transform="rotate(-4) translate(-14, -20)">
                          <rect x="-80" y="-55" width="160" height="110" rx="4"
                                fill="none" stroke="#C2722A" strokeWidth="1.5" opacity="0.25"/>
                          <line x1="-65" y1="-35" x2="-20" y2="-35" stroke="#C2722A" strokeWidth="1.2" opacity="0.2"/>
                          <line x1="-65" y1="-20" x2="30" y2="-20" stroke="#C2722A" strokeWidth="1.2" opacity="0.2"/>
                          <line x1="-65" y1="-5" x2="40" y2="-5" stroke="#C2722A" strokeWidth="1.2" opacity="0.2"/>
                        </g>

                        {/* Middle card (slight rotation) */}
                        <g transform="rotate(-2) translate(-7, -10)">
                          <rect x="-80" y="-55" width="160" height="110" rx="4"
                                fill="none" stroke="#D4A853" strokeWidth="2" opacity="0.5"/>
                          <line x1="-65" y1="-35" x2="-20" y2="-35" stroke="#D4A853" strokeWidth="1.5" opacity="0.4"/>
                          <line x1="-65" y1="-20" x2="35" y2="-20" stroke="#D4A853" strokeWidth="1.5" opacity="0.4"/>
                          <line x1="-65" y1="-5" x2="45" y2="-5" stroke="#D4A853" strokeWidth="1.5" opacity="0.4"/>
                          <line x1="-65" y1="10" x2="50" y2="10" stroke="#D4A853" strokeWidth="1.5" opacity="0.4"/>
                        </g>

                        {/* Front card (prominent, filled) */}
                        <rect x="-80" y="-55" width="160" height="110" rx="4"
                              fill="#C2722A" fillOpacity="0.08" stroke="#C2722A" strokeWidth="2.5"/>

                        {/* Title line */}
                        <line x1="-65" y1="-35" x2="-15" y2="-35" stroke="#C2722A" strokeWidth="2.5" opacity="0.8"/>

                        {/* Text lines with bullet points */}
                        <circle cx="-69" cy="-15" r="2" fill="#D4A853"/>
                        <line x1="-62" y1="-15" x2="40" y2="-15" stroke="#C2722A" strokeWidth="1.5" opacity="0.5"/>

                        <circle cx="-69" cy="-2" r="2" fill="#D4A853"/>
                        <line x1="-62" y1="-2" x2="55" y2="-2" stroke="#C2722A" strokeWidth="1.5" opacity="0.5"/>

                        <circle cx="-69" cy="11" r="2" fill="#D4A853"/>
                        <line x1="-62" y1="11" x2="48" y2="11" stroke="#C2722A" strokeWidth="1.5" opacity="0.5"/>

                        <circle cx="-69" cy="24" r="2" fill="#D4A853"/>
                        <line x1="-62" y1="24" x2="60" y2="24" stroke="#C2722A" strokeWidth="1.5" opacity="0.5"/>

                        <line x1="-65" y1="37" x2="35" y2="37" stroke="#C2722A" strokeWidth="1.5" opacity="0.5"/>

                        {/* Decorative accent bar */}
                        <rect x="48" y="-60" width="32" height="5" rx="2.5" fill="#D4A853" opacity="0.8"/>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Connecting chevron */}
              <div className="flex justify-center my-6 float-chevron" style={{ animationDelay: '0.6s' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Step 05 - Offpage & Linkaufbau */}
            <div className="reveal">
              <div className="bg-offwhite border border-border/60 rounded-xl p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* SVG LEFT (odd step) */}
                  <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                    <svg className="process-svg" width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                      {/* Network graph */}
                      <g transform="translate(120, 120)">
                        {/* Central node */}
                        <circle cx="0" cy="0" r="24" fill="#C2722A" stroke="#C2722A" strokeWidth="3"/>
                        <circle cx="0" cy="0" r="17" fill="white" opacity="0.3"/>

                        {/* Ring 1: 6 medium nodes */}
                        <circle cx="0" cy="-85" r="14" fill="none" stroke="#D4A853" strokeWidth="2"/>
                        <circle cx="73.6" cy="-42.5" r="14" fill="none" stroke="#D4A853" strokeWidth="2"/>
                        <circle cx="73.6" cy="42.5" r="14" fill="none" stroke="#D4A853" strokeWidth="2"/>
                        <circle cx="0" cy="85" r="14" fill="none" stroke="#D4A853" strokeWidth="2"/>
                        <circle cx="-73.6" cy="42.5" r="14" fill="none" stroke="#D4A853" strokeWidth="2"/>
                        <circle cx="-73.6" cy="-42.5" r="14" fill="none" stroke="#D4A853" strokeWidth="2"/>

                        {/* Ring 2: 6 smaller nodes */}
                        <circle cx="45" cy="-78" r="8" fill="#C2722A" opacity="0.6"/>
                        <circle cx="90" cy="0" r="8" fill="#C2722A" opacity="0.6"/>
                        <circle cx="45" cy="78" r="8" fill="#C2722A" opacity="0.6"/>
                        <circle cx="-45" cy="78" r="8" fill="#C2722A" opacity="0.6"/>
                        <circle cx="-90" cy="0" r="8" fill="#C2722A" opacity="0.6"/>
                        <circle cx="-45" cy="-78" r="8" fill="#C2722A" opacity="0.6"/>

                        {/* Primary connections (curved paths) */}
                        <path d="M 0 -24 Q 8 -52 0 -71" fill="none" stroke="#C2722A" strokeWidth="2.5" opacity="0.7"/>
                        <path d="M 20.8 -12 Q 43 -20 59.6 -35" fill="none" stroke="#C2722A" strokeWidth="2.5" opacity="0.7"/>
                        <path d="M 20.8 12 Q 43 20 59.6 35" fill="none" stroke="#C2722A" strokeWidth="2.5" opacity="0.7"/>
                        <path d="M 0 24 Q -8 52 0 71" fill="none" stroke="#C2722A" strokeWidth="2.5" opacity="0.7"/>
                        <path d="M -20.8 12 Q -43 20 -59.6 35" fill="none" stroke="#C2722A" strokeWidth="2.5" opacity="0.7"/>
                        <path d="M -20.8 -12 Q -43 -20 -59.6 -35" fill="none" stroke="#C2722A" strokeWidth="2.5" opacity="0.7"/>

                        {/* Secondary connections */}
                        <path d="M 14 -19 Q 28 -45 37 -70" fill="none" stroke="#D4A853" strokeWidth="1.8" opacity="0.5"/>
                        <path d="M 22 -7 Q 52 -12 82 -7" fill="none" stroke="#D4A853" strokeWidth="1.8" opacity="0.5"/>
                        <path d="M 17 15 Q 30 42 37 70" fill="none" stroke="#D4A853" strokeWidth="1.8" opacity="0.5"/>
                        <path d="M -14 19 Q -28 45 -37 70" fill="none" stroke="#D4A853" strokeWidth="1.8" opacity="0.5"/>
                        <path d="M -22 7 Q -52 12 -82 7" fill="none" stroke="#D4A853" strokeWidth="1.8" opacity="0.5"/>
                        <path d="M -17 -15 Q -30 -42 -37 -70" fill="none" stroke="#D4A853" strokeWidth="1.8" opacity="0.5"/>

                        {/* Pulse effect on central node */}
                        <circle cx="0" cy="0" r="24" fill="none" stroke="#C2722A" strokeWidth="2" opacity="0.4" className="pulse-dot"/>
                      </g>
                    </svg>
                  </div>

                  {/* Text RIGHT (odd step) */}
                  <div className="order-1 lg:order-2">
                    <div className="text-5xl lg:text-6xl font-bold text-primary/20 mb-2">05</div>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">
                      Offpage & Linkaufbau
                    </h3>
                    <p className="text-base lg:text-lg text-muted leading-relaxed">
                      Backlinks von relevanten, vertrauenswürdigen Websites signalisieren Google die Autorität Ihrer Domain. Durch strategische Digitale PR, Gastbeiträge und Branchenverzeichnisse bauen wir ein natürliches Linkprofil auf, das Ihre Domain Authority nachhaltig steigert.
                    </p>
                  </div>
                </div>
              </div>

              {/* Connecting chevron */}
              <div className="flex justify-center my-6 float-chevron" style={{ animationDelay: '0.8s' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#C2722A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Step 06 - Monitoring & Reporting */}
            <div className="reveal">
              <div className="bg-offwhite border border-border/60 rounded-xl p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Text LEFT (even step) */}
                  <div className="order-1">
                    <div className="text-5xl lg:text-6xl font-bold text-secondary/20 mb-2">06</div>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">
                      Monitoring & Reporting
                    </h3>
                    <p className="text-base lg:text-lg text-muted leading-relaxed">
                      SEO ist ein kontinuierlicher Prozess. Mit monatlichen Reports und Echtzeit-Dashboards verfolgen wir Ihre Rankings, den organischen Traffic und die wichtigsten KPIs. Wir identifizieren neue Chancen, reagieren auf Algorithmus-Updates und passen die Strategie datenbasiert an.
                    </p>
                  </div>

                  {/* SVG RIGHT (even step) */}
                  <div className="flex justify-center lg:justify-end order-2">
                    <svg className="process-svg" width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                      {/* Dashboard with charts */}
                      <g transform="translate(120, 120)">
                        {/* Dashboard frame */}
                        <rect x="-90" y="-80" width="180" height="140" rx="6"
                              fill="none" stroke="#C2722A" strokeWidth="2.5"/>

                        {/* Horizontal divider */}
                        <line x1="-90" y1="-20" x2="90" y2="-20" stroke="#E5E3DF" strokeWidth="2"/>

                        {/* Top section: Line graph */}
                        <g transform="translate(-75, -60)">
                          <polyline points="0,20 25,17 50,13 75,11 100,7 125,4 150,0"
                                    fill="none" stroke="#C2722A" strokeWidth="2.5"/>

                          {/* Data points */}
                          <circle cx="0" cy="20" r="3" fill="#C2722A" opacity="0.7"/>
                          <circle cx="25" cy="17" r="3" fill="#D4A853" opacity="0.7"/>
                          <circle cx="50" cy="13" r="3" fill="#C2722A" opacity="0.7"/>
                          <circle cx="75" cy="11" r="3" fill="#D4A853" opacity="0.7"/>
                          <circle cx="100" cy="7" r="3" fill="#C2722A" opacity="0.7"/>
                          <circle cx="125" cy="4" r="3" fill="#D4A853" opacity="0.7"/>
                          <circle cx="150" cy="0" r="4" fill="#C2722A" className="pulse-dot"/>

                          {/* Grid lines */}
                          <line x1="0" y1="25" x2="150" y2="25" stroke="#E5E3DF" strokeWidth="0.8" opacity="0.4"/>
                        </g>

                        {/* Bottom section: Bar chart */}
                        <g transform="translate(-65, 45)">
                          {/* Bars */}
                          <rect x="0" y="-22" width="16" height="22" fill="#D4A853" opacity="0.7"/>
                          <rect x="21" y="-32" width="16" height="32" fill="#D4A853" opacity="0.7"/>
                          <rect x="42" y="-18" width="16" height="18" fill="#D4A853" opacity="0.7"/>
                          <rect x="63" y="-40" width="16" height="40" fill="#C2722A" opacity="0.8"/>
                          <rect x="84" y="-28" width="16" height="28" fill="#D4A853" opacity="0.7"/>
                          <rect x="105" y="-48" width="16" height="48" fill="#C2722A"/>

                          {/* Baseline */}
                          <line x1="-5" y1="0" x2="126" y2="0" stroke="#E5E3DF" strokeWidth="1.5"/>
                        </g>

                        {/* Decorative legend indicators */}
                        <g transform="translate(-80, -73)">
                          <circle cx="0" cy="0" r="2.5" fill="#C2722A"/>
                          <circle cx="10" cy="0" r="2.5" fill="#D4A853"/>
                          <rect x="20" y="-2" width="5" height="4" fill="#C2722A" opacity="0.6"/>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FUER WEN IST SEO GEEIGNET */}
      <section className="relative py-20 lg:py-28 bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Zielgruppen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-6">
              Für wen ist SEO geeignet?
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Suchmaschinenoptimierung funktioniert in fast jeder Branche – wenn die Strategie stimmt. Diese Unternehmenstypen profitieren besonders.
            </p>
          </div>

          {/* E-Commerce */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center reveal">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
                E-Commerce
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">Online-Shops</h3>
              <p className="text-muted text-base lg:text-lg leading-relaxed mb-4">
                Für E-Commerce-Unternehmen ist SEO oft der profitabelste Kanal. Während Google Ads teuer werden, bringt gutes SEO kontinuierlich kaufbereite Nutzer – ohne Klickkosten.
              </p>
              <p className="text-muted text-base leading-relaxed">
                Ob Fashion, Elektronik, Möbel oder Nischenprodukte: Mit der richtigen Optimierung von Kategorie- und Produktseiten erreichen Sie Nutzer genau dann, wenn sie kaufbereit sind.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-border/60">
              <p className="text-sm font-semibold text-dark mb-2">Typische Ziele:</p>
              <ul className="flex flex-col gap-2 text-sm text-muted">
                {["Mehr Traffic auf Produktseiten", "Höhere Conversion-Rate", "Geringere Akquisekosten", "Bessere Rankings für Commercial Keywords"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dienstleister */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center reveal">
            <div className="order-2 lg:order-1 bg-white rounded-2xl p-8 border border-border/60">
              <p className="text-sm font-semibold text-dark mb-2">Typische Ziele:</p>
              <ul className="flex flex-col gap-2 text-sm text-muted">
                {["Qualifizierte Anfragen generieren", "Expertise & Vertrauen aufbauen", "Lokale Sichtbarkeit erhöhen", "Unabhängigkeit von bezahlter Werbung"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-dark mb-4">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                </svg>
                Dienstleister
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">Agenturen & B2B-Services</h3>
              <p className="text-muted text-base lg:text-lg leading-relaxed mb-4">
                Ob Rechtsanwalt, Steuerberater, Unternehmensberater oder Marketingagentur: Dienstleister profitieren enorm von SEO, da die Customer Lifetime Value oft hoch ist und eine Anfrage viel wert sein kann.
              </p>
              <p className="text-muted text-base leading-relaxed">
                Mit strategischem Content-Marketing und lokaler Optimierung positionieren Sie sich als Experte in Ihrer Nische.
              </p>
            </div>
          </div>

          {/* SaaS / B2B */}
          <div className="grid lg:grid-cols-2 gap-12 items-center reveal">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"/>
                  <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"/>
                  <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"/>
                </svg>
                SaaS & B2B
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">Software & B2B-Unternehmen</h3>
              <p className="text-muted text-base lg:text-lg leading-relaxed mb-4">
                SaaS-Anbieter und B2B-Unternehmen haben oft lange Sales-Cycles. SEO ermöglicht es, potenzielle Kunden früh in der Buyer Journey abzuholen und über Monate hinweg zu begleiten.
              </p>
              <p className="text-muted text-base leading-relaxed">
                Mit einer Kombination aus Informational Content (Ratgeber, Glossare) und Commercial Content (Produktseiten, Vergleiche) bauen Sie einen Sales-Funnel auf, der kontinuierlich Leads generiert.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-border/60">
              <p className="text-sm font-semibold text-dark mb-2">Typische Ziele:</p>
              <ul className="flex flex-col gap-2 text-sm text-muted">
                {["Marketing-Qualified-Leads (MQLs)", "Thought Leadership aufbauen", "Langfristige Sichtbarkeit", "Demo-Anfragen & Testregistrierungen"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INLINE CTA (Copper Background) */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2), transparent 60%)"}} />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-4">
            Bereit für bessere Rankings?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam Ihre SEO-Strategie entwickeln. In einem kostenlosen Erstgespräch analysieren wir Ihr Potenzial.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/kontakt" className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-primary hover:bg-offwhite">
              Kostenlose SEO-Analyse
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
            <a href="tel:+496912345678" className="inline-flex items-center gap-2 text-white hover:text-white/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +49 69 123 456 78
            </a>
          </div>
        </div>
      </section>

      {/* FAQ (12 Items) */}
      <section id="faq" className="relative py-20 lg:py-28 bg-offwhite">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Häufige Fragen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-6">
              Häufige Fragen zur SEO Agentur
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqData.map((faq, idx) => (
              <div key={idx} className={`faq-item bg-white rounded-xl border border-border/60 overflow-hidden reveal ${openFaq === idx ? "open" : ""}`}>
                <button 
                  onClick={() => toggleFaq(idx)} 
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-dark text-base lg:text-lg pr-4">{faq.question}</span>
                  <span className={`faq-icon flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg transition-transform duration-300 ${openFaq === idx ? "rotate-45" : ""}`}>+</span>
                </button>
                <div 
                  className="faq-answer px-6 overflow-hidden transition-all duration-400"
                  style={{ maxHeight: openFaq === idx ? "500px" : "0", paddingTop: openFaq === idx ? "1rem" : "0", paddingBottom: openFaq === idx ? "1rem" : "0" }}
                >
                  <p className="text-muted text-base leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD MAGNET FORM */}
      <section id="kontakt" className="relative py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Kostenlos & unverbindlich</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-6">
              Kostenlose SEO-Analyse für Ihre Website
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Erfahren Sie, wo Ihre Website aktuell steht und welche Quick Wins wir für Sie identifizieren können. Keine Verkaufspflicht, keine versteckten Kosten.
            </p>
          </div>

          <div className="bg-offwhite rounded-2xl p-8 lg:p-12 border border-border/60 reveal">
            <form className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Ihr Name *</label>
                <input type="text" required className="w-full rounded-lg border border-border bg-white px-4 py-3 text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Max Mustermann" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">E-Mail-Adresse *</label>
                <input type="email" required className="w-full rounded-lg border border-border bg-white px-4 py-3 text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="max@beispiel.de" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-dark mb-2">Ihre Website *</label>
                <input type="url" required className="w-full rounded-lg border border-border bg-white px-4 py-3 text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="https://www.ihre-website.de" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="w-full rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary-dark transition-colors">
                  Jetzt kostenlose Analyse anfordern
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-8 border-t border-border/60">
              {["100% kostenlos", "Keine Verkaufspflicht", "DSGVO-konform"].map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                  <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA (Split Layout) */}
      <section className="relative py-20 lg:py-28 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 20% 50%, rgba(194,114,42,0.3), transparent 50%), radial-gradient(circle at 80% 50%, rgba(212,168,83,0.2), transparent 50%)"}} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: CTA */}
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Jetzt Ihre SEO-Strategie starten
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Lassen Sie uns gemeinsam analysieren, wie wir Ihre Sichtbarkeit bei Google steigern können. Buchen Sie jetzt Ihr kostenloses Erstgespräch mit unseren SEO-Experten.
              </p>
              <Link href="/kontakt" className="inline-flex items-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary-light transition-colors">
                Kostenlose Erstberatung
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>

            {/* Right: Contact Info */}
            <div className="reveal">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/60 mb-6">Kontakt</p>
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-sm text-white/60 mb-1">E-Mail</p>
                    <a href="mailto:info@seoforge.de" className="text-white text-lg font-semibold hover:text-secondary transition-colors">info@seoforge.de</a>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Telefon</p>
                    <a href="tel:+496912345678" className="text-white text-lg font-semibold hover:text-secondary transition-colors">+49 69 123 456 78</a>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Adresse</p>
                    <p className="text-white text-base">
                      Mainzer Landstraße 123<br />
                      60327 Frankfurt am Main
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Erreichbarkeit</p>
                    <p className="text-white text-base">
                      Mo-Fr: 9:00 - 18:00 Uhr<br />
                      Sa: Nach Vereinbarung
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keyframe Animations & Additional Styles */}
      <style jsx>{`
        @keyframes serpFloat {
          0%, 100% { transform: rotateX(2deg) rotateY(-2deg) translateY(0); }
          50% { transform: rotateX(2deg) rotateY(-2deg) translateY(-12px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slideInResult {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-blink {
          animation: blink 0.7s infinite;
        }
        .hero-el {
          opacity: 0;
          transform: translateY(20px);
          animation: heroIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-el:nth-child(1) { animation-delay: 0.1s; }
        .hero-el:nth-child(2) { animation-delay: 0.2s; }
        .hero-el:nth-child(3) { animation-delay: 0.3s; }
        .hero-el:nth-child(4) { animation-delay: 0.4s; }
        .hero-el:nth-child(5) { animation-delay: 0.5s; }
        .hero-el:nth-child(6) { animation-delay: 0.6s; }
        @keyframes heroIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .pull-quote {
          position: relative;
          padding-left: 1.5rem;
        }
        .pull-quote::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #C2722A, #D4A853);
          border-radius: 2px;
        }
        .tab-btn {
          position: relative;
        }
        .tab-btn::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #C2722A;
          transition: width 0.3s ease;
        }
        .tab-btn.active::after {
          width: 100%;
        }
        .tab-content {
          display: none;
        }
        .tab-content.active {
          display: block;
          animation: tabFade 0.4s ease forwards;
        }
        @keyframes tabFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .process-line {
          position: absolute;
          left: 23px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #C2722A, #D4A853, #C2722A);
        }
        .deco-circle {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(194,114,42,0.12);
          pointer-events: none;
        }
        .deco-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(212,168,83,0.18);
          pointer-events: none;
          animation: spin 40s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </SubpageLayout>
  );
}
