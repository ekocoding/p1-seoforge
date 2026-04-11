"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    question: "Was ist GEO genau und wie funktioniert es?",
    answer: "GEO (Generative Engine Optimization) optimiert Ihre digitale Präsenz für KI-Systeme wie ChatGPT, Gemini und Perplexity. Im Gegensatz zu SEO, das auf Rankings in Suchmaschinen abzielt, positioniert GEO Ihre Marke direkt in den von KI generierten Antworten. Das bedeutet: Wenn Nutzer Fragen stellen, wird Ihre Marke als Quelle genannt, empfohlen oder zitiert.",
    category: "Grundlagen",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>
      </svg>
    )
  },
  {
    question: "Was ist der Unterschied zwischen GEO und traditionellem SEO?",
    answer: "Während SEO auf Platzierungen in den Suchergebnissen (Position 1-10) abzielt, optimiert GEO für Erwähnungen in KI-Antworten. SEO fokussiert auf Keywords, Backlinks und technische Faktoren. GEO konzentriert sich auf Brand Mentions, Citation Building, Entity Optimization und Authority Signals. Beide ergänzen sich ideal - GEO ist die natürliche Evolution für die KI-Ära.",
    category: "Vergleich",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
      </svg>
    )
  },
  {
    question: "Warum wird GEO für Unternehmen immer wichtiger?",
    answer: "Laut Gartner werden bis 2026 traditionelle Suchanfragen um 25% zurückgehen, während KI-gestützte Suche exponentiell wächst. McKinsey prognostiziert, dass bis 2028 die Hälfte aller Suchanfragen über KI-Systeme laufen wird. Wer jetzt nicht optimiert, verliert Sichtbarkeit dort, wo die Nutzer künftig Antworten suchen - nicht in Google, sondern in ChatGPT, Gemini und Perplexity.",
    category: "Relevanz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
      </svg>
    )
  },
  {
    question: "Auf welchen KI-Plattformen kann GEO helfen?",
    answer: "GEO optimiert für alle relevanten KI-Systeme: ChatGPT (mit 200M+ Nutzern), Google Gemini (integriert in Search und Workspace), Perplexity (KI-Suchmaschine mit Quellenangaben), Microsoft Copilot (in Bing und Office), Claude (Anthropic) und Googles AI Overviews (generative Antworten direkt in der Suche). Je nach Zielgruppe priorisieren wir die Plattformen strategisch.",
    category: "Plattformen",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.072 0 2.003.514 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7"/>
      </svg>
    )
  },
  {
    question: "Welche Strategien werden in GEO eingesetzt?",
    answer: "GEO kombiniert mehrere Disziplinen: Entity Optimization (Ihre Marke als erkennbare Entität etablieren), Citation Building (Vertrauenswürdige Quellen-Positionierung), strukturierte Daten (Schema.org für KI-Verständnis), Content-Architektur (answer-first Struktur), PR & Authority (Markenbekanntheit aufbauen) und technische Optimierung (llms.txt, Crawlbarkeit für KI).",
    category: "Strategie",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 002.484 2.246l1.973-.074a6.001 6.001 0 0011.35-.058 2.25 2.25 0 002.452-2.034l.4-4.622a2.25 2.25 0 00-2.244-2.445l-2.318.068a6 6 0 01-7.182-4.067 2.25 2.25 0 00-2.452-2.034l-4.622.4z"/>
      </svg>
    )
  },
  {
    question: "Wie lange dauert es, bis man GEO-Ergebnisse sieht?",
    answer: "Erste messbare Verbesserungen sind typischerweise nach 3-6 Wochen sichtbar - das sind Erwähnungen in KI-Antworten, verbesserte Zitationsraten oder höhere Brand Mention Frequency. Vollständige KI-Sichtbarkeit entwickelt sich über 3-6 Monate. GEO ist wie SEO ein kontinuierlicher Prozess, kein einmaliges Projekt. Je nach bestehender Authority und Content-Qualität können sich Zeiten variieren.",
    category: "Zeitplan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )
  },
  {
    question: "Wie misst man den Erfolg von GEO?",
    answer: "GEO-Erfolg wird anders gemessen als SEO: Anzahl der Erwähnungen in KI-Antworten, Citation Rate (wie oft als Quelle genannt), Brand Mention Frequency, Sentiment der Erwähnungen (positiv/neutral/negativ), Positionierung gegenüber Wettbewerbern, und Traffic aus KI-Quellen. Wir nutzen spezialisierte Tools und manuelle Audits über 50+ Prompts, um Ihre KI-Sichtbarkeit kontinuierlich zu tracken.",
    category: "Messung",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
      </svg>
    )
  },
  {
    question: "Ist GEO nur für große Unternehmen sinnvoll?",
    answer: "Nein - GEO lohnt sich für Unternehmen aller Größen. KI-Systeme bewerten Inhalte unabhängig von Unternehmensgröße nach Relevanz, Qualität und Authority. Gerade KMUs können von einer frühen GEO-Strategie besonders profitieren und sich Wettbewerbsvorteile sichern, bevor Großkonzerne nachziehen. Die Eintrittsbarrieren sind niedrig, die langfristigen Vorteile signifikant.",
    category: "Zielgruppe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
      </svg>
    )
  },
  {
    question: "Wie läuft die Zusammenarbeit mit einer GEO Agentur ab?",
    answer: "Typischer Ablauf: 1) KI-Sichtbarkeits-Audit - Analyse Ihrer aktuellen Präsenz in KI-Systemen, 2) Strategie-Entwicklung - maßgeschneiderte GEO-Strategie mit klaren Zielen, 3) Umsetzung - Content-Optimierung, technische Implementierung, Entity Building, 4) Monitoring & Reporting - kontinuierliches Tracking Ihrer KI-Sichtbarkeit. Wir arbeiten transparent, mit regelmäßigen Updates und messbaren Zwischenzielen.",
    category: "Prozess",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
      </svg>
    )
  },
  {
    question: "Welche Kosten entstehen bei GEO?",
    answer: "GEO-Investitionen variieren je nach Ausgangssituation und Zielen. Ein initiales GEO-Audit ist der ideale Startpunkt, um Potenziale zu identifizieren. Laufende GEO-Betreuung umfasst Content-Optimierung, technische Umsetzung und Monitoring. Wir bieten flexible Modelle - von projektbasierten Audits bis zu kontinuierlicher Betreuung. Wichtig: GEO ist eine langfristige Investition in zukünftige Sichtbarkeit, keine schnelle Marketing-Taktik.",
    category: "Investition",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )
  }
];



function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [threshold]);

  return { ref, isVisible };
}

export default function GeoFAQ() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-offwhite relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/[0.02] to-transparent" />
      
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
            Häufige Fragen
          </span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-heading)] text-dark mb-6">
            GEO{" "}
            <span className="text-primary">verstehen</span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Antworten auf die wichtigsten Fragen zu Generative Engine Optimization.
          </p>
        </div>

        {/* Search Bar */}
        <div className={`relative max-w-2xl mx-auto mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-muted" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Frage suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-border text-dark placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const originalIndex = faqs.indexOf(faq);
            const isOpen = openIndex === originalIndex;
            
            return (
              <div
                key={originalIndex}
                className={`bg-white rounded-2xl border transition-all duration-500 ${
                  isOpen ? 'border-primary/30 shadow-xl shadow-primary/5' : 'border-border hover:border-primary/20'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 50 + 300}ms` }}
              >
                <button
                  onClick={() => toggleQuestion(originalIndex)}
                  className="w-full p-6 lg:p-8 text-left flex items-start gap-4"
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-primary text-white' : 'bg-offwhite text-muted'
                  }`}>
                    {faq.icon}
                  </div>
                  
                  {/* Question */}
                  <div className="flex-1">

                    <h3 className={`text-lg lg:text-xl font-[family-name:var(--font-heading)] transition-colors ${
                      isOpen ? 'text-primary' : 'text-dark'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  
                  {/* Toggle Icon */}
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen 
                      ? 'border-primary bg-primary text-white rotate-180' 
                      : 'border-border text-muted hover:border-primary/30'
                  }`}>
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </button>
                
                {/* Answer */}
                <div className={`overflow-hidden transition-all duration-500 ease-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
                    <div className="pl-16 border-l-2 border-primary/20">
                      <p className="text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-offwhite flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-muted">Keine Fragen gefunden. Probieren Sie einen anderen Suchbegriff.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-muted mb-6">Noch Fragen offen? Wir beraten Sie gerne persönlich.</p>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-dark text-white rounded-full font-semibold hover:bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            Kostenlose Beratung anfragen
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
