import Link from "next/link";
import type { ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BRANCHEN-DATEN — 6 Branchen, ein gemeinsames Detail-Template.
   Content nahezu wortgetreu aus dem Branchen-Briefing; je Branche genau
   EIN interner Pflicht-Link im zweiten WARUM-Absatz.
═══════════════════════════════════════════════════════════════════════════ */

/* Layout-Varianten: gleiches Design-System, je Branche eigener Section-Mix */
export type HeroVariant = "split" | "zentriert" | "suchfeld";
export type HebelVariant = "tafel" | "editorial" | "stack";

/* Daten für das branchenspezifische Signature-Mockup (statisches Beispiel-Panel) */
export type Signature =
  | {
      variant: "serp";
      panelTitle: string;
      query: string;
      mapsRows: { name: string; eigene?: boolean }[];
      /** Maps-Pack im Zustand „Ohne SEO“: drei fremde Praxen, die eigene fehlt */
      fremdRows: string[];
    }
  | {
      variant: "klickpreise";
      panelTitle: string;
      hinweis: string;
      rows: { gebiet: string; breite: number; wert: string }[];
      fazit: string;
      fazitWert: string;
    }
  | {
      variant: "strukturbaum";
      panelTitle: string;
      rows: { pfad: string; tiefe: 0 | 1 | 2; status: "INDEX" | "NOINDEX" | "CANONICAL" }[];
      fussnote: string;
      /** Zustand „Vorher“: chaotische Filter-URLs, alle im Index (ok = Kategorieseite) */
      rowsVorher: { pfad: string; tiefe: 0 | 1 | 2; ok?: boolean }[];
      fussnoteVorher: string;
    }
  | {
      variant: "businessprofil";
      panelTitle: string;
      betrieb: string;
      bewertung: string;
      anzahl: string;
      kategorie: string;
      ort: string;
      status: string;
      chips: string[];
    }
  | {
      variant: "funnel";
      panelTitle: string;
      stufen: { query: string; satz: string; detail: string; highlight?: boolean }[];
    }
  | {
      variant: "kichat";
      panelTitle: string;
      fragen: { chip: string; frage: string }[];
      marke: string;
      quellen: string;
    };

export type Branche = {
  slug: string;
  name: string;
  kurzName: string;
  keyword: string;
  heroVariant: HeroVariant;
  hebelVariant: HebelVariant;
  /** Beispiel-Query für die Suchfeld-Zeile im „suchfeld“-Hero */
  heroQuery?: string;
  h1: { pre: string; grad: string; post?: string };
  subline: string;
  ctaLabel: string;
  warumTitle: { pre: string; grad: string };
  warumAbsaetze: ReactNode[];
  /** Signature-Modul: bei heroVariant "split" im Hero, sonst eigene Section nach WARUM */
  signature: Signature;
  /** H2 der eigenständigen Signature-Section (entfällt bei heroVariant "split") */
  signatureTitle?: { pre: string; grad: string };
  /** Zwei kurze Begleitsätze der Signature-Section (entfällt bei heroVariant "split") */
  signatureCopy?: string[];
  hebel: { titel: string; text: string }[];
  /** SPLIT-Section: 16:10-Bild + Vertiefungs-Content mit genau einem internen Link */
  split: {
    bild: string;
    bildAlt: string;
    caption: string;
    /** Bildseite links (true) oder rechts (false) — je Seite abwechselnd */
    bildLinks: boolean;
    titel: { pre: string; grad: string };
    absaetze: ReactNode[];
  };
  /** VORGEHEN-Section: Editorial-Liste mit Ghost-Serif-Ziffern */
  vorgehenTitle: { pre: string; grad: string };
  vorgehen: { titel: string; text: string }[];
  /** FEHLER-Section: Tafel-Panel oder 2-spaltige Editorial-Liste */
  fehlerVariant: "tafel" | "editorial";
  fehler: { titel: string; text: string }[];
  faq: { q: string; a: string }[];
  ctaSatz: { pre: string; grad: string };
  ctaButtonLabel: string;
  icon: ReactNode;
  accent: string;
};

const linkCls = "text-primary font-semibold hover:underline";

/* Inline-SVG im Stroke-Stil der Navbar-Icons (24×24, strokeWidth 1.8) */
const brancheIcon = (paths: ReactNode) => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths}
  </svg>
);

export const branchen: Branche[] = [
  /* ── 01 · Ärzte ────────────────────────────────────────────────────────── */
  {
    slug: "seo-fuer-aerzte",
    name: "SEO für Ärzte",
    kurzName: "Ärzte",
    keyword: "SEO für Ärzte",
    heroVariant: "zentriert",
    hebelVariant: "editorial",
    signature: {
      variant: "serp",
      panelTitle: "Lokale Suche",
      query: "zahnarzt köln ehrenfeld",
      mapsRows: [
        { name: "Zahnarztpraxis Dr. Mustermann", eigene: true },
        { name: "Zahnzentrum am Beispielring" },
        { name: "Praxis Dr. Beispielmann" },
      ],
      fremdRows: ["Zahnzentrum am Beispielring", "Praxis Dr. Beispielmann", "Dentalklinik an der Musterallee"],
    },
    signatureTitle: { pre: "Das Ziel: Ihre Praxis ", grad: "im lokalen Suchergebnis." },
    signatureCopy: [
      "Bei lokalen Behandlungssuchen entscheidet der Kartenausschnitt mit den ersten drei Einträgen, welche Praxen ein Patient überhaupt wahrnimmt.",
      "Wir richten Unternehmensprofil, Bewertungssignale und Behandlungsseiten so aus, dass Ihre Praxis dort mit der eigenen Website vertreten ist — nicht nur über Portalprofile.",
    ],
    h1: {
      pre: "SEO für Ärzte: Sichtbar sein, wenn Patienten ",
      grad: "nach Symptomen und Behandlungen suchen",
    },
    subline:
      "Patienten googeln „Zahnarzt Implantat Kosten“ oder „Hautarzt Akne Berlin“ — nicht Ihren Praxisnamen. Wir sorgen dafür, dass Ihre Praxis in Google und in KI-Suchen wie ChatGPT bei genau diesen Anfragen erscheint.",
    ctaLabel: "Kostenlose SEO-Analyse für Ihre Praxis anfragen",
    warumTitle: { pre: "Warum SEO ", grad: "für Ärzte" },
    warumAbsaetze: [
      <>
        Wer einen Arzttermin braucht, öffnet zuerst Google und tippt ein Symptom, eine Behandlung oder eine
        Fachrichtung ein, meist kombiniert mit dem Ort: „Kieferorthopäde Kosten Kinder Köln“, „Krampfadern OP
        ambulant Hamburg“. Kaum jemand sucht direkt nach dem Namen einer Praxis, die er noch nicht kennt. Genau
        bei diesen Suchanfragen entscheidet sich, ob ein neuer Patient überhaupt von Ihrer Praxis erfährt. Auf
        den ersten Ergebnisseiten stehen jedoch meistens Jameda, Doctolib oder große Portale, nicht die eigene
        Praxis-Website. Ohne gezielte SEO-Arbeit gehen Praxen in diesem Wettbewerb um Sichtbarkeit fast
        automatisch unter.
      </>,
      <>
        Bleibt die eigene Website unsichtbar, hängt die gesamte Neupatienten-Gewinnung von Portalprofilen ab,
        deren Darstellung, Bewertungssystem und Ranking-Logik Sie nicht kontrollieren. Gleichzeitig bewertet
        Google medizinische Inhalte besonders streng als YMYL-Thema („Your Money or Your Life“) und verlangt
        klare Nachweise fachlicher Kompetenz und Vertrauenswürdigkeit. Eine statische Website mit nur einer
        Leistungsseite reicht dafür in der Regel nicht aus. Wer heute volle Terminbücher hat, merkt das
        Sichtbarkeitsproblem oft erst, wenn Stammpatienten wegziehen oder in Rente gehen und der Nachschub
        ausbleibt. Deshalb verstehen wir SEO für Praxen nicht als einmaliges Projekt, sondern als{" "}
        <Link href="/seo/betreuung" className={linkCls}>laufende SEO-Betreuung</Link>, die mit neuen
        Suchtrends, Google-Updates und KI-Suchmaschinen mitwächst.
      </>,
    ],
    split: {
      bild: "/images/branchen-split/aerzte.png",
      bildAlt: "Patientin sucht auf dem Smartphone nach einer Behandlung in ihrer Nähe",
      caption: "Symptom-Suche auf dem Smartphone — der häufigste Erstkontakt mit einer Praxis",
      bildLinks: true,
      titel: { pre: "Gefunden werden, ", grad: "bevor der Patient anruft." },
      absaetze: [
        <>
          Patienten googeln Symptome, bevor sie einen Termin buchen — meistens auf dem Handy, oft mit einer
          gewissen Dringlichkeit. Wer bei „Zahnschmerzen Wochenende“ oder „Hautarzt Termin heute“ nicht auf der
          ersten Seite auftaucht, verliert den Patienten häufig an die Praxis nebenan. Google und zunehmend
          auch KI-Assistenten wie ChatGPT beantworten medizinische Fragen heute direkt und nennen dabei
          Quellen — wer dort nicht als vertrauenswürdige Praxis erscheint, bleibt für einen wachsenden Teil
          der Suchenden unsichtbar.
        </>,
        <>
          Vertrauen entscheidet in der Medizin stärker über die Praxiswahl als in den meisten anderen
          Branchen — Bewertungen, erkennbare Spezialisierung und verständlich erklärte Behandlungen wiegen
          mehr als ein gutes Praxisfoto. Eine bloße Aufzählung von Leistungen reicht weder Patienten noch
          Google. Wir erstellen{" "}
          <Link href="/seo/texte" className={linkCls}>medizinische SEO-Texte</Link>, die Behandlungsabläufe
          präzise erklären und gleichzeitig die Fachkompetenz Ihrer Praxis sichtbar machen.
        </>,
      ],
    },
    vorgehenTitle: { pre: "So gehen wir ", grad: "bei Ärzten vor." },
    vorgehen: [
      {
        titel: "Leistungen und Standorte analysieren",
        text: "Wir prüfen, welche Behandlungen und Standorte welches Suchvolumen haben und wo Wettbewerber bereits stark ranken. Daraus leiten wir ab, welche Leistungsseiten zuerst ausgebaut werden sollten, statt jede Seite gleich zu behandeln.",
      },
      {
        titel: "Medizinische Fachtexte",
        text: "Wir schreiben Texte zu Behandlungen und Krankheitsbildern, die medizinisch korrekt, verständlich und werberechtlich vorsichtig formuliert sind. Dabei achten wir darauf, dass Aussagen zu Wirksamkeit und Erfolgsraten nicht gegen das Heilmittelwerbegesetz verstoßen.",
      },
      {
        titel: "Google-Unternehmensprofil optimieren",
        text: "Für Arztpraxen ist das Google-Unternehmensprofil oft die erste Kontaktfläche — wir pflegen Kategorien, Sprechzeiten, Fotos und Praxis-Attribute vollständig. Bei mehreren Standorten legen wir für jede Praxis ein eigenes, sauber getrenntes Profil an, statt alle Standorte zu vermischen.",
      },
      {
        titel: "Bewertungen aufbauen",
        text: "Wir richten einen Prozess ein, mit dem zufriedene Patienten unaufdringlich um eine Bewertung gebeten werden, ohne gegen Wettbewerbs- oder Standesrecht zu verstoßen. Technische Umsetzung, Texte und Sichtbarkeit laufen dabei parallel, sodass erste Effekte meist nach drei bis sechs Monaten sichtbar werden.",
      },
    ],
    fehlerVariant: "tafel",
    fehler: [
      {
        titel: "Werberechtliche Übertreibungen",
        text: "Viele Praxis-Websites werben mit Formulierungen wie „schmerzfreie Behandlung garantiert“ oder Erfolgsversprechen, die gegen das Heilmittelwerbegesetz verstoßen und im schlimmsten Fall abgemahnt werden. Stattdessen sollten Leistungen sachlich beschrieben werden — Kompetenz zeigt sich über verständliche Erklärungen, nicht über Versprechen.",
      },
      {
        titel: "Standorte werden vermischt",
        text: "Bei mehreren Praxen oder einem MVZ werden Standorte häufig auf einer einzigen Kontaktseite zusammengefasst, wodurch keiner der Standorte in der lokalen Suche gut rankt. Jeder Standort braucht stattdessen eine eigene Seite mit eigener Adresse, eigenem Google-Profil und individuellen Inhalten.",
      },
      {
        titel: "Leistungsseiten ohne Substanz",
        text: "Viele Praxisseiten listen Leistungen nur stichpunktartig auf, ohne Behandlung, Ablauf oder häufige Patientenfragen zu erklären. Google und Patienten honorieren ausführliche, verständliche Inhalte deutlich stärker als reine Aufzählungen.",
      },
      {
        titel: "Bewertungen werden ignoriert",
        text: "Negative Bewertungen bleiben oft unkommentiert stehen, oder Praxen bitten aus Sorge vor rechtlichen Konsequenzen gar nicht erst aktiv um Feedback. Mit einer rechtssicheren, sachlichen Reaktion auf jede Bewertung und einem klaren Prozess für positives Feedback lässt sich die Sternebewertung über Zeit gezielt verbessern.",
      },
    ],
    hebel: [
      {
        titel: "Behandlungsseiten statt Sammelseite",
        text: "Für jede Behandlung, jedes Symptom und jede Fachrichtung entsteht eine eigene Seite, die konkrete Suchanfragen wie „Wurzelbehandlung Ablauf“ oder „Rotlichttherapie Rücken“ beantwortet. Das erhöht die Trefferquote bei spezifischen Patientenfragen deutlich gegenüber einer einzigen allgemeinen Leistungsseite.",
      },
      {
        titel: "Google Business Profil",
        text: "Ihr Google-Unternehmensprofil, konsistente Adress- und Kontaktdaten sowie strukturierte Bewertungsprozesse entscheiden bei „Arzt in meiner Nähe“-Suchen mit. Wir richten diese Signale so aus, dass Ihre Praxis in der lokalen Suche und auf Google Maps zuverlässig auftaucht.",
      },
      {
        titel: "Vertrauenssignale für YMYL",
        text: "Qualifikationen, Werdegang und fachliche Autorität der Ärzte werden strukturiert auf der Website sichtbar gemacht, ergänzt durch technisches Markup wie Physician- oder MedicalOrganization-Schema. Das stärkt genau die E-E-A-T-Signale, die Google bei medizinischen Themen verlangt.",
      },
      {
        titel: "Unabhängigkeit von Portalen",
        text: "Wir bauen die Domain-Autorität Ihrer eigenen Praxis-Website auf, damit Sie bei Symptom- und Behandlungssuchen unabhängig von Jameda oder Doctolib gefunden werden. Das reduziert langfristig die Abhängigkeit von kostenpflichtigen Portal-Premiumprofilen.",
      },
    ],
    faq: [
      {
        q: "Wie lange dauert es, bis unsere Praxis bei Google besser sichtbar ist?",
        a: "Technische Anpassungen und das Google Business Profil zeigen oft innerhalb weniger Wochen erste Wirkung. Inhaltliche Themen- und Vertrauensarbeit für YMYL-Bereiche baut sich über mehrere Monate auf. Seriöse Prognosen für exakte Rankings gibt es nicht — wir arbeiten mit Google Search Console und Semrush an messbaren Zwischenzielen statt Versprechen.",
      },
      {
        q: "Lohnt sich SEO neben einem Jameda-Premiumprofil überhaupt?",
        a: "Jameda-Premium ist eine laufende Miete für Sichtbarkeit auf fremdem Terrain. Eine wachsende eigene Website ist ein Vermögenswert, der Ihnen gehört und über Jahre Reichweite aufbaut. Beides kann parallel laufen — SEO reduziert aber schrittweise die Abhängigkeit vom Portal.",
      },
      {
        q: "Bieten Sie auch Google Ads für Praxen an?",
        a: "Unser Kerngeschäft ist organische Sichtbarkeit in Google und in KI-Suchen. Ads bringen sofortige, aber kostenpflichtige Reichweite ohne bleibenden Wert nach Kampagnenende. Wir beraten Sie ehrlich dazu, wann Ads sinnvoll ergänzen und wann SEO allein die bessere Investition ist.",
      },
      {
        q: "Wie weit dürfen wir bei medizinischen SEO-Texten inhaltlich gehen, ohne rechtliche Risiken einzugehen?",
        a: "Das Heilmittelwerbegesetz setzt klare Grenzen — keine Erfolgsversprechen, keine Vorher-Nachher-Vergleiche bei bestimmten Eingriffen und keine Angstmache. Wir formulieren Texte sachlich und beschreiben Behandlungen, Abläufe und Indikationen, statt Wirkung zu versprechen. Eine Rechtsberatung ersetzt das nicht — bei heiklen Fachgebieten wie Ästhetik oder Zahnmedizin empfehlen wir, Texte vor Veröffentlichung zusätzlich von Ihrer Kanzlei gegenprüfen zu lassen.",
      },
      {
        q: "Wir betreiben mehrere Standorte oder ein MVZ — wie gehen Sie damit um?",
        a: "Jeder Standort erhält eine eigene Seite mit eigener Adresse, eigenen Ansprechpartnern und einem eigenen Google-Unternehmensprofil, statt alle Standorte auf einer zentralen Seite zu bündeln. So kann jede Praxis in ihrer eigenen Stadt oder ihrem Stadtteil eigenständig ranken. Zusätzlich verlinken wir die Standorte sinnvoll untereinander, damit Patienten bei Bedarf auch andere Fachbereiche im MVZ finden.",
      },
      {
        q: "Können Sie uns beim Aufbau von mehr Google-Bewertungen unterstützen?",
        a: "Ja, wir entwickeln einen Prozess, mit dem Patienten nach dem Termin unaufdringlich und im Einklang mit dem Standesrecht um eine Bewertung gebeten werden, etwa per QR-Code oder Follow-up-Nachricht. Wichtig ist die Abgrenzung zu unzulässigen Anreizen für Bewertungen. Auf negative Bewertungen reagieren wir gemeinsam mit Ihnen sachlich, um Vertrauen zu erhalten statt Konflikte öffentlich auszutragen.",
      },
    ],
    ctaSatz: {
      pre: "Sprechen Sie mit uns darüber, wie Patienten Sie finden, ",
      grad: "bevor sie überhaupt nach Ihrem Praxisnamen suchen.",
    },
    ctaButtonLabel: "Praxis-Sichtbarkeit jetzt analysieren lassen",
    icon: brancheIcon(
      <>
        <path d="M11 3v2" />
        <path d="M5 3v2" />
        <path d="M5 4H4a2 2 0 0 0-2 2v3.5a6 6 0 0 0 12 0V6a2 2 0 0 0-2-2h-1" />
        <path d="M8 15.5a6 6 0 0 0 12 0V12" />
        <circle cx="20" cy="10" r="2" />
      </>
    ),
    accent: "Patienten suchen Symptome und Behandlungen — Ihre Praxis erscheint bei genau diesen Anfragen.",
  },

  /* ── 02 · Anwälte ──────────────────────────────────────────────────────── */
  {
    slug: "seo-fuer-anwaelte",
    name: "SEO für Anwälte",
    kurzName: "Anwälte",
    keyword: "SEO für Anwälte",
    heroVariant: "split",
    hebelVariant: "tafel",
    signature: {
      variant: "klickpreise",
      panelTitle: "Klickkosten je Rechtsgebiet",
      hinweis: "Google Ads — Klickpreis-Niveau, illustrativ",
      rows: [
        { gebiet: "Verkehrsrecht", breite: 92, wert: "€€€€" },
        { gebiet: "Familienrecht", breite: 76, wert: "€€€" },
        { gebiet: "Arbeitsrecht", breite: 62, wert: "€€€" },
        { gebiet: "Mietrecht", breite: 48, wert: "€€" },
      ],
      fazit: "Organisches Ranking",
      fazitWert: "0 € pro Klick",
    },
    h1: {
      pre: "SEO für Anwälte: Mandanten finden Sie über ihr Problem, ",
      grad: "nicht über den Paragrafen",
    },
    subline:
      "Mandanten googeln „Kündigung Abfindung Chancen“ oder „Scheidung Kosten Anwalt“, nie einen Gesetzesparagrafen. Wir bauen Ihre Kanzlei-Sichtbarkeit dort auf, wo Google Ads pro Klick am teuersten sind und organische Rankings am meisten wert sind.",
    ctaLabel: "Kanzlei-Sichtbarkeit kostenlos prüfen lassen",
    warumTitle: { pre: "Warum SEO ", grad: "für Anwälte" },
    warumAbsaetze: [
      <>
        Kaum ein Markt hat so hohe Cost-per-Click-Preise bei Google Ads wie der Kanzleimarkt — bei Fachgebieten
        wie Verkehrsrecht, Mietrecht oder Familienrecht kosten einzelne Klicks schnell zweistellige
        Euro-Beträge, ohne dass daraus ein Mandat wird. Mandanten formulieren ihre Suche zudem selten
        juristisch: Sie googeln „Fristlose Kündigung Wohnung was tun“ statt „§ 543 BGB“, „Abfindung Höhe
        berechnen“ statt „Kündigungsschutzklage“. Wer als Kanzlei nur seine Rechtsgebiete auf einer Seite
        auflistet, trifft diese Suchanfragen nicht. Ratgeber-Inhalte, die typische Laienfragen beantworten,
        entscheiden hier über Sichtbarkeit — nicht die juristische Fachsprache aus dem Aktenschrank.
      </>,
      <>
        Ohne aufgebaute organische Sichtbarkeit bleibt einer Kanzlei fast nur der Weg über teure Ads oder
        Anwaltsportale, bei denen mehrere Wettbewerber auf derselben Seite um denselben Mandanten werben. Jede
        Rechtsgebiets-Seite konkurriert zudem gegen etablierte Ratgeberportale und andere Kanzleien, die längst
        mit Content arbeiten. Deshalb setzen wir bei Kanzleien konsequent auf eine{" "}
        <Link href="/seo/content-strategie" className={linkCls}>Content-Strategie</Link>, die Mandantenfragen
        entlang des gesamten Rechtsfalls beantwortet — von der ersten Unsicherheit bis zur Entscheidung für
        eine Kanzlei. So sinkt die Abhängigkeit von Klickpreisen, die in umkämpften Rechtsgebieten jedes Jahr
        weiter steigen.
      </>,
    ],
    split: {
      bild: "/images/branchen-split/anwaelte.png",
      bildAlt: "Mandant recherchiert eine Rechtsfrage am Laptop, bevor er eine Kanzlei kontaktiert",
      caption: "Die Recherche beginnt beim Rechtsproblem — nicht beim Kanzleinamen",
      bildLinks: false,
      titel: { pre: "Mandanten informieren sich, ", grad: "bevor sie anrufen." },
      absaetze: [
        <>
          Mandanten googeln ihr Problem oft lange, bevor sie eine Kanzlei kontaktieren — „Kündigung erhalten
          was tun“ oder „Abmahnung Unterlassungserklärung“ sind typische Sucheinstiege, nicht der Name eines
          Anwalts. Wer in diesem Moment mit einem verständlichen Ratgebertext erscheint, wird als Experte
          wahrgenommen und erhält häufig die Anfrage. Auch KI-Suchassistenten greifen inzwischen auf gut
          strukturierte Rechtsratgeber zurück, wenn sie Nutzerfragen beantworten.
        </>,
        <>
          Vertrauen ist in der Rechtsberatung entscheidend, und dieses Vertrauen entsteht online über
          nachvollziehbare Fachkompetenz statt über Werbeversprechen. Wir setzen deshalb auf ein{" "}
          <Link href="/seo/audit" className={linkCls}>SEO-Audit</Link>, das zunächst zeigt, welche
          Rechtsgebiete Ihrer Kanzlei bereits Sichtbarkeit haben und wo Wettbewerbskanzleien oder
          Rechtsportale Ihnen den Rang ablaufen. Darauf aufbauend priorisieren wir Themen, bei denen sich
          Sichtbarkeit tatsächlich in Mandate übersetzt, statt reinen Traffic zu erzeugen.
        </>,
      ],
    },
    vorgehenTitle: { pre: "So gehen wir ", grad: "bei Anwälten vor." },
    vorgehen: [
      {
        titel: "Analyse der Fachgebiete",
        text: "Wir analysieren, in welchen Rechtsgebieten Ihrer Kanzlei bereits Suchanfragen mit Mandatspotenzial vorhanden sind und wie stark spezialisierte Wettbewerber oder große Rechtsportale dort vertreten sind. Daraus entsteht eine Priorität — Fachgebiete mit erreichbarem Ranking und echtem Mandatswert zuerst, Nischenthemen später.",
      },
      {
        titel: "Ratgeber-Content erstellen",
        text: "Wir schreiben Ratgebertexte zu konkreten Rechtsfragen, die Laien verständlich erklären, ohne in eine individuelle Rechtsberatung abzurutschen, die im Text unzulässig wäre. Jeder Text endet mit einer klaren, aber nicht aufdringlichen Überleitung zur Kontaktaufnahme, sobald der individuelle Fall komplexer wird.",
      },
      {
        titel: "Lokale und überregionale Struktur",
        text: "Je nach Rechtsgebiet unterscheiden wir, ob eine Seite lokal (etwa Familienrecht, Verkehrsrecht) oder überregional (etwa IT-Recht, Gesellschaftsrecht) ausgerichtet werden sollte. Diese Struktur entscheidet, ob wir auf lokale Signale wie das Google-Unternehmensprofil setzen oder auf bundesweite Fachautorität durch Fachbeiträge und Verlinkungen.",
      },
      {
        titel: "Sichtbarkeit und Autorität",
        text: "Parallel bauen wir die fachliche Autorität der Kanzlei auf, etwa durch Autorenprofile der Anwälte mit Qualifikationen, Fachanwaltstiteln und Veröffentlichungen. Diese Signale wirken sich sowohl auf klassische Rankings als auch auf die Nennung in KI-generierten Antworten aus und zeigen erste Effekte meist nach drei bis sechs Monaten.",
      },
    ],
    fehlerVariant: "editorial",
    fehler: [
      {
        titel: "Rechtsberatung im Blogtext",
        text: "Ratgebertexte formulieren Rechtsfragen häufig so konkret, dass sie faktisch eine individuelle Rechtsberatung darstellen — inklusive Haftungsrisiko für die Kanzlei. Besser sind allgemein gehaltene Erklärungen zur Rechtslage mit einem klaren Hinweis, dass der Einzelfall geprüft werden muss.",
      },
      {
        titel: "Generalist ohne erkennbares Profil",
        text: "Kanzleien listen oft zehn oder mehr Rechtsgebiete gleichrangig auf, wodurch weder Google noch Mandanten erkennen, worauf die Kanzlei tatsächlich spezialisiert ist. Zwei bis drei klar priorisierte Schwerpunkte mit ausführlichem Content ranken deutlich besser als eine lange, flache Liste.",
      },
      {
        titel: "Fachanwaltstitel bleiben ungenutzt",
        text: "Fachanwaltstitel und Spezialisierungen werden auf der Website oft nur in einem Nebensatz erwähnt, obwohl sie ein starkes Vertrauens- und Rankingsignal sind. Wir platzieren diese Qualifikationen sichtbar auf den passenden Fachgebietsseiten und im Autorenprofil.",
      },
      {
        titel: "Konkurrenz durch Rechtsportale unterschätzt",
        text: "Viele Kanzleien betrachten nur andere Kanzleien als Wettbewerber und übersehen, dass Rechtsportale wie anwalt.de oder ähnliche Vergleichsportale oft die eigentliche Konkurrenz um vordere Plätze sind. Dagegen hilft vor allem spezifischerer, tieferer Content zu einzelnen Fallkonstellationen, den ein Portal in dieser Tiefe nicht bietet.",
      },
    ],
    hebel: [
      {
        titel: "Ratgeber-Content nach Mandantenfrage",
        text: "Statt einer Seite pro Rechtsgebiet entstehen Inhalte zu konkreten Laienfragen wie „Abmahnung erhalten was tun“ oder „Erbe ausschlagen Frist“. Diese Seiten holen Mandanten in dem Moment ab, in dem das Problem entsteht, nicht erst bei der Anwaltssuche.",
      },
      {
        titel: "Starke Fachgebiets-Seiten",
        text: "Jedes Rechtsgebiet erhält eine eigene, tiefgehende Seite mit Zuständigkeiten, typischem Ablauf und Kostenrahmen, statt einer kurzen Aufzählung. Das verbessert die Relevanz für Suchanfragen mit klarer Rechtsgebiets-Absicht deutlich.",
      },
      {
        titel: "Lokale und überregionale Sichtbarkeit",
        text: "Manche Mandate sind ortsgebunden, etwa Familienrecht oder Mietrecht, andere sind überregional möglich, etwa IT-Recht oder Gesellschaftsrecht. Wir stimmen die SEO-Struktur je Fachgebiet darauf ab, statt alle Rechtsgebiete gleich zu behandeln.",
      },
      {
        titel: "Datenbasierte Konkurrenzanalyse",
        text: "Mit Ahrefs und Semrush prüfen wir, für welche Begriffe konkurrierende Kanzleien und Ratgeberportale tatsächlich ranken und wo Lücken entstehen. Das verhindert, dass Budget in aussichtslos umkämpfte Begriffe fließt.",
      },
    ],
    faq: [
      {
        q: "Wie schnell zeigt SEO für eine Kanzlei erste Ergebnisse?",
        a: "Strukturelle und technische Anpassungen setzen wir über unsere CI/CD-Umgebung innerhalb von Minuten live, sichtbare Verbesserungen bei Rankings brauchen aber je nach Rechtsgebiet mehrere Monate. Stark umkämpfte Gebiete wie Verkehrsrecht dauern länger als Nischenfelder. Wir berichten Zwischenstände über Search Console und Semrush statt pauschale Versprechen zu machen.",
      },
      {
        q: "Was kostet SEO im Vergleich zu Google Ads für Anwälte?",
        a: "Ads kosten pro Klick sofort und dauerhaft, ohne dass danach etwas bleibt. SEO ist eine Investition in Inhalte und Struktur, die über Jahre weiter Anfragen bringt, auch wenn kein Cent Klickbudget mehr fließt. Der konkrete Aufwand hängt von Rechtsgebiet und Wettbewerb ab und wird individuell kalkuliert.",
      },
      {
        q: "Warum reicht ein Eintrag auf Anwalt.de oder anwaltauskunft.de nicht aus?",
        a: "Auf Portalen stehen Sie direkt neben Wettbewerbern derselben Fachrichtung auf einer Seite, die Sie nicht gestalten. Eine eigene, gut auffindbare Kanzlei-Website zeigt Ihre Positionierung ungestört und baut echte Reichweite auf, die dem Portal nicht gehört, sondern Ihnen.",
      },
      {
        q: "Sollten wir uns auf ein Fachgebiet spezialisieren oder als Generalist auftreten?",
        a: "Für die Sichtbarkeit in der Suche ist eine erkennbare Spezialisierung fast immer im Vorteil, weil Google und Mandanten Fachautorität in einem klar umrissenen Rechtsgebiet stärker gewichten als eine breite Liste von Leistungen. Das schließt weitere Rechtsgebiete nicht aus — wir empfehlen, zwei bis drei Schwerpunkte prominent auszubauen und übrige Bereiche schlanker zu halten, statt alle gleich zu behandeln.",
      },
      {
        q: "Wie schreiben Sie Ratgebertexte, ohne dass daraus eine unzulässige Rechtsberatung wird?",
        a: "Wir erklären die allgemeine Rechtslage, typische Fallkonstellationen und mögliche Handlungsoptionen, ohne eine Empfehlung für den konkreten Einzelfall des Lesers auszusprechen. Jeder Text macht deutlich, dass die individuelle Prüfung eine anwaltliche Beratung erfordert. Diese Abgrenzung schützt die Kanzlei rechtlich und lenkt gleichzeitig genau die Mandanten zur Kontaktaufnahme, deren Fall tatsächlich komplex genug für ein Mandat ist.",
      },
      {
        q: "Lohnt sich SEO für lokale Mandate genauso wie für überregionale?",
        a: "Das hängt stark vom Rechtsgebiet ab — Familienrecht oder Verkehrsrecht laufen meist über lokale Suche und ein starkes Google-Unternehmensprofil, während IT-Recht oder Gesellschaftsrecht überregional über Fachautorität und Content funktionieren. Wir legen die Strategie deshalb pro Fachgebiet fest, statt Ihre gesamte Kanzlei-Website nach einem einzigen Schema auszurichten.",
      },
    ],
    ctaSatz: {
      pre: "Lassen Sie uns prüfen, für welche Mandantenfragen ",
      grad: "Ihre Kanzlei heute unsichtbar ist.",
    },
    ctaButtonLabel: "Kostenlose Sichtbarkeitsanalyse anfragen",
    icon: brancheIcon(
      <>
        <path d="M12 3.5v17" />
        <path d="M7.5 20.5h9" />
        <path d="M3.5 7h1.8c2 0 4.6-.9 6.7-1.9 2.1 1 4.7 1.9 6.7 1.9h1.8" />
        <path d="m4.8 9.5-2.3 6a4.3 4.3 0 0 0 5.4 0l-2.3-6Z" />
        <path d="m18.4 9.5-2.3 6a4.3 4.3 0 0 0 5.4 0l-2.3-6Z" />
      </>
    ),
    accent: "Mandanten suchen ihr Problem, nicht den Paragrafen — sichtbar, wo Klicks am teuersten sind.",
  },

  /* ── 03 · Online-Shops ─────────────────────────────────────────────────── */
  {
    slug: "seo-fuer-online-shops",
    name: "SEO für Online-Shops",
    kurzName: "Online-Shops",
    keyword: "SEO für Online-Shops",
    heroVariant: "suchfeld",
    hebelVariant: "stack",
    heroQuery: "laufschuhe damen neutral größe 39",
    signature: {
      variant: "strukturbaum",
      panelTitle: "Indexierung im Shop",
      rows: [
        { pfad: "/laufschuhe", tiefe: 0, status: "INDEX" },
        { pfad: "/laufschuhe/damen", tiefe: 1, status: "INDEX" },
        { pfad: "?farbe=blau&groesse=39", tiefe: 2, status: "CANONICAL" },
        { pfad: "?sort=preis-aufsteigend", tiefe: 2, status: "NOINDEX" },
        { pfad: "/laufschuhe/herren", tiefe: 1, status: "INDEX" },
        { pfad: "?farbe=schwarz", tiefe: 2, status: "CANONICAL" },
      ],
      fussnote: "Crawling-Budget fließt in Kategorien — nicht in Filter-Varianten",
      rowsVorher: [
        { pfad: "/laufschuhe", tiefe: 0, ok: true },
        { pfad: "?farbe=blau&groesse=39", tiefe: 1 },
        { pfad: "?farbe=blau&sort=preis", tiefe: 1 },
        { pfad: "?groesse=39&verfuegbar=1", tiefe: 1 },
        { pfad: "?sort=beliebtheit&seite=2", tiefe: 1 },
        { pfad: "?farbe=schwarz&farbe=blau", tiefe: 1 },
        { pfad: "?marke=beispiel&farbe=blau", tiefe: 1 },
      ],
      fussnoteVorher: "Jede Filter-Kombination landet als eigene URL im Index — Kopien konkurrieren gegeneinander",
    },
    signatureTitle: { pre: "Eine Shop-Struktur, ", grad: "die Google versteht." },
    signatureCopy: [
      "Jede Filter- und Sortierkombination kann eine eigene URL erzeugen — für Google sind das konkurrierende Kopien derselben Kategorie.",
      "Die Tafel zeigt das Prinzip der Bereinigung: Kategorieseiten bleiben im Index, Parameter-Varianten werden per Canonical gebündelt oder gezielt ausgeschlossen.",
    ],
    h1: {
      pre: "SEO für Online-Shops: Kategorieseiten, die verkaufen, ",
      grad: "statt nur Ads, die kosten",
    },
    subline:
      "Jeder Klick auf Google Ads oder Amazon kostet Marge — jede organische Position bei einer Kategorie- oder Produktseite bringt Anfragen ohne laufende Klickkosten. Wir bringen Struktur in Ihren Shop, damit Google ihn versteht und Kunden das passende Produkt finden.",
    ctaLabel: "Shop kostenlos auf SEO-Potenzial prüfen lassen",
    warumTitle: { pre: "Warum SEO ", grad: "für Online-Shops" },
    warumAbsaetze: [
      <>
        Kunden suchen in zwei sehr unterschiedlichen Modi: breit nach einer Produktkategorie („Laufschuhe
        Damen“) oder gezielt nach einem konkreten Artikel mit Merkmalen („Laufschuhe Damen Neutral Größe 39“).
        Kategorie- und Produktseiten müssen deshalb unterschiedlich aufgebaut sein und unterschiedliche
        Suchintentionen bedienen, was in vielen Shopsystemen von Haus aus nicht sauber getrennt ist. Filter-
        und Sortierfunktionen erzeugen zudem oft Hunderte technisch fast identischer URLs, die Google als
        Duplicate Content einstuft und im schlimmsten Fall gar nicht mehr crawlt. Ohne bereinigte
        Seitenstruktur verpufft ein großer Teil des Sortiments für die organische Suche komplett.
      </>,
      <>
        Parallel dominiert Amazon bei vielen Produktsuchen die ersten Ergebnisse, und Werbebudget auf Google
        oder Meta frisst bei knappen Handelsmargen einen wachsenden Anteil des Umsatzes. Ein Shop, der
        ausschließlich über bezahlten Traffic wächst, bleibt bei jeder Anzeigenpreis-Erhöhung verwundbar.
        Organische Sichtbarkeit bei Kategorieseiten kostet dagegen keinen Cent pro Klick, sobald sie einmal
        aufgebaut ist. Genau deshalb ist{" "}
        <Link href="/seo/shop" className={linkCls}>Shop-SEO</Link> bei uns kein Zusatzmodul, sondern eine
        eigene Disziplin mit Fokus auf technische Sauberkeit, Kategoriestruktur und Produktdaten.
      </>,
    ],
    split: {
      bild: "/images/branchen-split/online-shops.png",
      bildAlt: "Kundin vergleicht Produkte in einem Online-Shop am Laptop",
      caption: "Suchanfragen mit Kaufabsicht treffen zuerst auf Kategorieseiten",
      bildLinks: true,
      titel: { pre: "Kaufbereite Kunden erreichen, ", grad: "bevor sie vergleichen." },
      absaetze: [
        <>
          Käufer suchen heute gezielt nach Produkteigenschaften, Vergleichen und Problemlösungen —
          „wasserdichte Wanderschuhe Damen“ oder „Kaffeemaschine für 2 Personen“ sind typische Sucheinstiege
          mit klarer Kaufabsicht. Wer in diesem Moment mit einer gut aufgebauten Kategorie- oder Produktseite
          erscheint, gewinnt den Kauf, ohne dafür pro Klick zu bezahlen. Amazon und große Marktplätze holen
          sich einen Großteil dieser Suchanfragen von selbst — ein eigener Shop muss mit spezifischeren,
          besseren Inhalten dagegenhalten.
        </>,
        <>
          Die größte Hürde für Shop-Betreiber ist meist die Seitenstruktur, nicht der fehlende Wille zu gutem
          Content — Kategorieseiten ohne Text, doppelte Inhalte durch Filter und Varianten oder dünne
          Produktbeschreibungen aus dem Hersteller-Feed bremsen jede Kategorie aus. Wir entwickeln eine{" "}
          <Link href="/seo/content-strategie" className={linkCls}>Content-Strategie</Link>, die
          Kategorieseiten, Ratgeber und Produktbeschreibungen so aufeinander abstimmt, dass sie sich
          gegenseitig stützen statt zu kannibalisieren. So entsteht aus dem Shop eine Fläche, die sowohl bei
          Marken- als auch bei Long-Tail-Suchen sichtbar wird.
        </>,
      ],
    },
    vorgehenTitle: { pre: "So gehen wir ", grad: "bei Online-Shops vor." },
    vorgehen: [
      {
        titel: "Struktur- und Kategorieanalyse",
        text: "Wir prüfen, wie Kategorien, Filter und Facetten aktuell angelegt sind und wo dadurch doppelter Content oder unnötig viele indexierte URLs entstehen. Darauf aufbauend legen wir eine Struktur fest, die Kategorien klar voneinander abgrenzt und Filterseiten gezielt von der Indexierung ausschließt.",
      },
      {
        titel: "Kategorietexte und Produktdaten",
        text: "Kategorieseiten erhalten einleitende Texte, die tatsächlich nach den Suchbegriffen der Zielgruppe formuliert sind, statt generische Marketingtexte über das Sortiment zu wiederholen. Bei Produktdaten prüfen wir, ob Herstellertexte eins zu eins von zahlreichen anderen Shops übernommen wurden, und ersetzen sie durch eigenständige Beschreibungen.",
      },
      {
        titel: "Content jenseits der Produktseite",
        text: "Ratgeber, Vergleiche und Kaufberatungen holen Suchanfragen ab, die noch vor der eigentlichen Kaufentscheidung stattfinden, und leiten von dort gezielt auf passende Kategorien weiter. Diese Inhalte binden wir eng an bestehende Kategorie- und Produktseiten, statt sie isoliert im Blog zu belassen.",
      },
      {
        titel: "Technisches Fundament sichern",
        text: "Ladezeiten, mobile Darstellung und strukturierte Daten für Produkte — Preis, Verfügbarkeit, Bewertungen — sichern wir technisch ab, da sie bei Shops direkten Einfluss auf Rankings und Klickrate haben. Über die CI/CD-Anbindung setzen wir Änderungen an Kategorien oder Templates in Minuten live, was bei saisonalen Sortimentswechseln ein klarer Vorteil ist.",
      },
    ],
    fehlerVariant: "tafel",
    fehler: [
      {
        titel: "Herstellertexte unverändert übernommen",
        text: "Produktbeschreibungen werden oft eins zu eins aus dem Hersteller-Feed übernommen, wodurch identischer Content auf Dutzenden anderer Shops entsteht und Google keine der Seiten bevorzugt. Eigenständig formulierte Beschreibungen mit Details zur eigenen Verfügbarkeit oder Beratung schaffen echte Differenzierung.",
      },
      {
        titel: "Kategorieseiten ohne Text",
        text: "Viele Shops zeigen auf Kategorieseiten nur eine Produktliste ohne einleitenden Text, wodurch die Seite für Google inhaltlich kaum einzuordnen ist. Ein kurzer, an der Suchintention orientierter Text oberhalb oder unterhalb der Produktliste gibt der Seite thematische Tiefe.",
      },
      {
        titel: "Filterseiten fluten den Index",
        text: "Kombinationen aus Farbe, Größe und weiteren Filtern erzeugen oft tausende automatisch generierte URLs, die alle in den Google-Index gelangen und dort ähnliche Inhalte gegeneinander ausspielen. Indexiert werden sollten gezielt nur Filterkombinationen mit echtem Suchvolumen, der Rest bleibt ausgeschlossen.",
      },
      {
        titel: "Relaunch ohne Weiterleitungsplan",
        text: "Bei einem Shopsystem-Wechsel gehen URLs häufig ohne sauberen Weiterleitungsplan verloren, was über Nacht spürbare Rankingverluste auslöst. Vor jedem Relaunch erstellen wir eine vollständige URL-Zuordnung, damit jede alte Seite gezielt auf ihr neues Pendant weiterleitet.",
      },
    ],
    hebel: [
      {
        titel: "Kategorieseiten als Sichtbarkeits-Anker",
        text: "Kategorieseiten erhalten eigenständigen Text, klare interne Verlinkung und eine Struktur, die zur jeweiligen Suchintention passt, statt nur eine Produktliste zu sein. Sie tragen im Ranking meist mehr als einzelne Produktseiten mit geringem Suchvolumen.",
      },
      {
        titel: "Duplicate Content beheben",
        text: "Wir legen fest, welche Filter- und Sortier-URLs indexiert werden dürfen und welche über Canonical-Tags oder Parameter-Handling ausgeschlossen werden. Das lenkt das Crawling-Budget auf die Seiten, die tatsächlich ranken sollen.",
      },
      {
        titel: "Strukturierte Produktdaten",
        text: "Vollständige Produktbeschreibungen, saubere Attribute und Schema-Markup wie Product- und Review-Daten verbessern sowohl die Relevanz für Google als auch die Darstellung mit Sternen und Preis direkt in den Suchergebnissen.",
      },
      {
        titel: "Abgrenzung zu Amazon",
        text: "Wir positionieren Ihren eigenen Shop dort, wo Amazon schwächer ist: bei beratungsintensiven Suchanfragen, Marken-Content und Themen rund ums Produkt. So entsteht Sichtbarkeit, die nicht direkt gegen die Marktplatz-Übermacht antreten muss.",
      },
    ],
    faq: [
      {
        q: "Wie lange dauert es, bis sich Shop-SEO im Umsatz bemerkbar macht?",
        a: "Technische Korrekturen wie die Bereinigung von Duplicate Content wirken oft innerhalb weniger Wochen auf die Crawling-Effizienz. Rankings für umkämpfte Kategoriebegriffe brauchen mehrere Monate kontinuierlicher Arbeit. Über Search Console und Semrush verfolgen wir Zwischenschritte, statt feste Umsatzzahlen zu versprechen.",
      },
      {
        q: "Was kostet Shop-SEO im Vergleich zum laufenden Ads-Budget?",
        a: "Ads-Budget ist ein Dauerposten, der bei steigenden Klickpreisen die Marge weiter drückt. SEO-Aufwand fließt in Struktur und Inhalte, die auch ohne tägliches Klickbudget weiter Besucher bringen. Der konkrete Umfang hängt von Sortimentsgröße und Wettbewerbsdichte in Ihrer Kategorie ab.",
      },
      {
        q: "Lohnt sich SEO, wenn wir sowieso auch auf Amazon verkaufen?",
        a: "Ja, beide Kanäle bedienen unterschiedliche Kundentypen. Der eigene Shop erlaubt Markenaufbau, höhere Margen ohne Marktplatzgebühr und Kundendaten, die Ihnen gehören. SEO macht diesen Kanal zusätzlich zu Amazon planbar, statt komplett von einer Plattform abhängig zu sein.",
      },
      {
        q: "Wir planen einen Wechsel des Shopsystems — wie verhindern wir Rankingverluste?",
        a: "Der kritische Punkt bei jedem Relaunch ist die Weiterleitung — wir erstellen vor dem Umzug eine vollständige Zuordnung aller alten URLs zu ihren neuen Entsprechungen und testen diese auf der Staging-Umgebung, bevor der Shop live geht. Zusätzlich sichern wir Metadaten, strukturierte Daten und Inhalte, die häufig beim Wechsel verloren gehen. So bleiben Rankings nach dem Umzug weitgehend stabil statt einzubrechen.",
      },
      {
        q: "Unsere Produktbeschreibungen kommen aus dem Hersteller-Feed — ist das ein Problem?",
        a: "Ja, identische Herstellertexte tauchen oft auf vielen Shops gleichzeitig auf, wodurch Google kaum einen Grund hat, ausgerechnet Ihre Seite auszuspielen. Wir priorisieren die Produkte mit dem höchsten Suchvolumen oder der besten Marge für eigenständige Beschreibungen, statt den gesamten Katalog auf einmal umzuschreiben. So verbessert sich die Sichtbarkeit dort zuerst, wo es wirtschaftlich am meisten bringt.",
      },
      {
        q: "Sollten wir eher auf unsere Markennamen oder auf allgemeine Produktbegriffe setzen?",
        a: "Beides hat eine Funktion — Markensuchen bringen meist die höchste Kaufwahrscheinlichkeit, während allgemeine Produktbegriffe deutlich mehr Volumen, aber auch mehr Wettbewerb bedeuten. Wir bauen zunächst Markenbegriffe und bereits vorhandene Stärken aus und erweitern danach gezielt um Long-Tail-Suchen mit konkreter Kaufabsicht, statt beides gleichzeitig anzugehen.",
      },
    ],
    ctaSatz: {
      pre: "Zeigen wir Ihnen, welche Kategorieseiten in Ihrem Shop ",
      grad: "das größte ungenutzte Sichtbarkeitspotenzial haben.",
    },
    ctaButtonLabel: "Kostenlosen Shop-Check anfordern",
    icon: brancheIcon(
      <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    ),
    accent: "Kategorie- und Produktseiten, die organisch ranken — statt Marge an Ads abzugeben.",
  },

  /* ── 04 · Handwerker ───────────────────────────────────────────────────── */
  {
    slug: "seo-fuer-handwerker",
    name: "SEO für Handwerker",
    kurzName: "Handwerker",
    keyword: "SEO für Handwerker",
    heroVariant: "suchfeld",
    hebelVariant: "tafel",
    heroQuery: "heizung notdienst wochenende",
    signature: {
      variant: "businessprofil",
      panelTitle: "Google Business Profil",
      betrieb: "Mustermann Haustechnik",
      bewertung: "4,9",
      anzahl: "127",
      kategorie: "SHK-Betrieb",
      ort: "Musterstadt",
      status: "Jetzt geöffnet",
      chips: ["Anrufen", "Route", "Website"],
    },
    signatureTitle: { pre: "Das Profil, das Kunden ", grad: "zuerst sehen." },
    signatureCopy: [
      "Bei „in meiner Nähe“-Suchen erscheint Ihr Unternehmensprofil mit Bewertungen, Öffnungszeiten und Route, noch bevor Ihre Website eine Rolle spielt.",
      "Wir pflegen dieses Profil als festen Bestandteil der SEO-Arbeit, damit Anrufe und Routenanfragen direkt bei Ihrem Betrieb ankommen.",
    ],
    h1: {
      pre: "SEO für Handwerker: ",
      grad: "Volle Auftragsbücher von morgen",
      post: " sichern, nicht nur die von heute",
    },
    subline:
      "Wer heute nach einem Elektriker oder Dachdecker sucht, tippt meist „[Gewerk] in meiner Nähe“ oder greift direkt zu MyHammer und Check24. Wir sorgen dafür, dass Ihr eigener Betrieb in Google und auf Google Maps gefunden wird, ohne Provisionen an Vermittlungsportale zahlen zu müssen.",
    ctaLabel: "Kostenlosen Sichtbarkeits-Check für Ihren Betrieb anfragen",
    warumTitle: { pre: "Warum SEO ", grad: "für Handwerker" },
    warumAbsaetze: [
      <>
        Handwerkersuche ist fast immer lokal und akut: „Heizung Notdienst Wochenende“, „Dachdecker Sturmschaden
        in der Nähe“, „Elektriker Zählerschrank Kosten“. Wer bei diesen Suchen nicht mit einem gepflegten
        Google Business Profil und einer auffindbaren Website erscheint, überlässt die Anfrage automatisch
        Portalen wie MyHammer oder Check24, die zwischen mehreren Betrieben vermitteln und dafür Gebühren
        verlangen. Diese Portale ranken bei vielen Suchanfragen besser als einzelne Handwerksbetriebe, weil sie
        systematisch an SEO arbeiten — der einzelne Betrieb tut das in der Regel nicht.
      </>,
      <>
        Volle Auftragsbücher fühlen sich heute gut an, sagen aber nichts über die Auslastung in sechs oder
        zwölf Monaten aus. Wer erst dann mit Sichtbarkeitsarbeit beginnt, wenn Anfragen spürbar zurückgehen,
        verliert wertvolle Zeit, denn Rankings bauen sich nicht über Nacht auf. Gleichzeitig fehlt im
        Tagesgeschäft zwischen Baustelle, Notdiensten und Angeboten schlicht die Zeit für Website-Pflege. Genau
        deshalb übernehmen wir die komplette{" "}
        <Link href="/seo/optimierung" className={linkCls}>SEO-Optimierung</Link> für Handwerksbetriebe als
        laufenden Prozess im Hintergrund, während Sie sich auf Ihre Aufträge konzentrieren.
      </>,
    ],
    split: {
      bild: "/images/branchen-split/handwerker.png",
      bildAlt: "Handwerker im Einsatz — gefunden über die lokale Google-Suche",
      caption: "Lokale Suche: Unternehmensprofil und Maps erscheinen vor der Website",
      bildLinks: false,
      titel: { pre: "Aufträge aus der ", grad: "eigenen Region sichern." },
      absaetze: [
        <>
          Wer einen Handwerker sucht, tippt selten einen Firmennamen, sondern „Elektriker Notdienst“ oder
          „Dachdecker in der Nähe“ — meist mit der Erwartung einer schnellen Antwort. Diese Suchen sind lokal
          begrenzt und laufen zu einem großen Teil über Google Maps und das Google-Unternehmensprofil, nicht
          über die klassische Trefferliste. Betriebe, die dort nicht vollständig gepflegt sind, verlieren
          Aufträge an Wettbewerber mit weniger Erfahrung, aber einem besseren Profil.
        </>,
        <>
          Viele Handwerker-Websites stammen noch aus einer Zeit vor der Smartphone-Suche — langsam, nicht
          mobil optimiert und ohne erkennbares Einzugsgebiet. Google bewertet solche Seiten bei lokalen
          Suchen schlechter, unabhängig davon, wie gut der Betrieb tatsächlich arbeitet. Deshalb gehört bei
          uns oft{" "}
          <Link href="/webdesign" className={linkCls}>professionelles Webdesign</Link> zur SEO-Arbeit dazu,
          damit die technische Basis stimmt, bevor Inhalte und lokale Signale überhaupt greifen können.
        </>,
      ],
    },
    vorgehenTitle: { pre: "So gehen wir ", grad: "bei Handwerkern vor." },
    vorgehen: [
      {
        titel: "Einzugsgebiet festlegen",
        text: "Wir legen gemeinsam mit Ihnen fest, welche Orte, Stadtteile oder Postleitzahlen tatsächlich wirtschaftlich sinnvoll bedient werden können, statt pauschal auf „in der Nähe“ zu setzen. Für größere Einzugsgebiete bauen wir eigene Seiten pro Ort oder Region auf, statt eine einzige Kontaktseite für das gesamte Gebiet zu nutzen.",
      },
      {
        titel: "Google-Unternehmensprofil pflegen",
        text: "Kategorien, Leistungen, Fotos vom Team und von abgeschlossenen Projekten sowie Öffnungszeiten pflegen wir vollständig, weil das Profil bei lokalen Suchen oft vor der eigentlichen Website erscheint. Regelmäßige Beiträge und aktuelle Fotos im Profil signalisieren Google zusätzlich, dass der Betrieb aktiv ist.",
      },
      {
        titel: "Leistungsseiten je Gewerk",
        text: "Statt einer allgemeinen „Leistungen“-Seite bauen wir für jedes Gewerk oder jede Hauptleistung eine eigene Seite mit konkreten Beispielen, Ablauf und typischen Kundenfragen auf. Das erhöht die Trefferquote bei spezifischen Suchen deutlich, etwa „Bad sanieren Kosten“ statt nur „Sanitär“.",
      },
      {
        titel: "Bewertungen aufbauen",
        text: "Wir richten einen einfachen Prozess ein, mit dem Kunden nach Auftragsabschluss über eine Nachricht oder einen QR-Code auf der Rechnung um eine Bewertung gebeten werden. Wichtig ist dabei, keine Bewertungen zu kaufen oder zu incentivieren, sondern echtes Feedback zu sammeln — das zahlt sich meist über drei bis sechs Monate spürbar auf die Sichtbarkeit ein.",
      },
    ],
    fehlerVariant: "editorial",
    fehler: [
      {
        titel: "Ein Standort, mehrere Orte",
        text: "Betriebe, die mehrere Orte oder Landkreise bedienen, pflegen häufig nur eine einzige Adresse und Kontaktseite, wodurch sie in den umliegenden Orten in der lokalen Suche kaum auftauchen. Eigene, inhaltlich unterschiedliche Seiten je Ort oder Region verbessern die Sichtbarkeit dort deutlich, wo tatsächlich Aufträge herkommen sollen.",
      },
      {
        titel: "Google-Profil unvollständig gepflegt",
        text: "Öffnungszeiten, Kategorien oder Fotos im Google-Unternehmensprofil bleiben oft seit der Ersteinrichtung unverändert, obwohl sich Leistungen oder Erreichbarkeit längst geändert haben. Ein aktuell gepflegtes Profil mit echten Projektfotos verbessert sowohl die Sichtbarkeit als auch die Kontaktrate spürbar.",
      },
      {
        titel: "Veraltete, langsame Website",
        text: "Viele Handwerker-Websites laden auf dem Smartphone langsam oder lassen sich kaum bedienen, was potenzielle Kunden vor der Kontaktaufnahme abschreckt, unabhängig vom Ranking. Eine technisch saubere, mobil optimierte Seite ist die Voraussetzung dafür, dass SEO-Maßnahmen überhaupt wirken können.",
      },
      {
        titel: "Bewertungen dem Zufall überlassen",
        text: "Ohne aktives Nachfragen kommen Bewertungen meist nur von besonders zufriedenen oder besonders unzufriedenen Kunden, was den Durchschnitt verzerrt. Ein einfacher, immer gleicher Bitte-um-Bewertung-Prozess nach Auftragsabschluss sorgt für ein realistischeres und meist besseres Bild.",
      },
    ],
    hebel: [
      {
        titel: "Google Business Profil",
        text: "Aktuelle Öffnungszeiten, Fotos abgeschlossener Arbeiten, Leistungsbeschreibungen und ein strukturierter Umgang mit Bewertungen entscheiden bei „in meiner Nähe“-Suchen mit über Sichtbarkeit auf Google Maps. Wir richten und pflegen dieses Profil kontinuierlich.",
      },
      {
        titel: "Leistungsseiten je Gewerk",
        text: "Statt einer allgemeinen Leistungsseite entstehen einzelne Seiten für Kernleistungen wie Bad-Sanierung, Wärmepumpen-Einbau oder Dachsanierung, kombiniert mit den Orten, in denen Sie tatsächlich tätig sind. Das trifft konkrete lokale Suchanfragen viel genauer.",
      },
      {
        titel: "Weg von Vermittlungsportalen",
        text: "Wir bauen die eigene Website als Sichtbarkeits-Kanal auf, damit Anfragen direkt bei Ihnen landen statt über MyHammer oder Check24 verteilt zu werden, wo Sie mit mehreren Betrieben um denselben Auftrag konkurrieren.",
      },
      {
        titel: "Bewertungen sichtbar machen",
        text: "Abgeschlossene Projekte, Kundenstimmen und Zertifizierungen werden strukturiert auf der Website eingebunden. Das stärkt Vertrauen bei potenziellen Kunden und liefert Google zusätzliche Relevanzsignale für lokale Suchanfragen.",
      },
    ],
    faq: [
      {
        q: "Wie lange dauert es, bis wir über Google statt über Portale Anfragen bekommen?",
        a: "Das Google Business Profil zeigt oft nach wenigen Wochen erste Wirkung, da es kein klassisches Ranking-Rennen ist. Der Aufbau von Website-Sichtbarkeit für Leistungsseiten braucht mehrere Monate. Änderungen setzen wir technisch über unsere CI/CD-Umgebung innerhalb von Minuten um, das Ranking selbst braucht trotzdem Zeit.",
      },
      {
        q: "Was kostet SEO im Vergleich zu MyHammer- oder Check24-Gebühren?",
        a: "Portale verlangen laufende Provisionen oder Abo-Gebühren pro vermitteltem Kontakt, unabhängig vom Auftragswert. SEO ist eine Investition in die eigene Sichtbarkeit, die keine Provision pro Auftrag kostet. Der Umfang richtet sich nach Gewerk, Einzugsgebiet und Wettbewerb vor Ort.",
      },
      {
        q: "Brauchen wir SEO überhaupt, wenn wir schon bei MyHammer gelistet sind?",
        a: "Ein Portal-Eintrag allein macht Sie von dessen Konditionen und Sichtbarkeitslogik abhängig. Eine eigene, gut auffindbare Website ergänzt das, indem Anfragen direkt und ohne Vermittlungsgebühr bei Ihnen eingehen und Sie sich von anderen gelisteten Betrieben abheben.",
      },
      {
        q: "Wir bedienen mehrere Orte im Umkreis — wie bilden wir das auf der Website ab?",
        a: "Wir legen für jeden wirtschaftlich relevanten Ort oder jede Region eine eigene Seite mit spezifischen Inhalten an, statt alle Orte auf einer einzigen Kontaktseite aufzulisten. Jede dieser Seiten benötigt eigenständigen Text statt einer bloßen Namensänderung der Vorlage, sonst wertet Google die Seiten als nahezu identisch. Für sehr große Einzugsgebiete ergänzen wir das um ein zusätzliches Google-Unternehmensprofil am jeweiligen Zweitstandort.",
      },
      {
        q: "Wie sammeln wir mehr Bewertungen, ohne gegen Wettbewerbsrecht zu verstoßen?",
        a: "Erlaubt ist die neutrale Bitte um eine Bewertung nach Auftragsabschluss, etwa per QR-Code auf der Rechnung oder einer kurzen Nachfrage vor Ort. Nicht erlaubt sind Belohnungen für eine Bewertung oder das gezielte Filtern, wer gefragt wird und wer nicht. Wir richten einen Prozess ein, der bei jedem Kunden gleich abläuft, damit das Ergebnis rechtssicher und über Zeit belastbar bleibt.",
      },
      {
        q: "Reicht SEO allein, oder brauchen wir eine neue Website?",
        a: "Das hängt vom technischen Zustand der aktuellen Seite ab — ist sie langsam, nicht mobil optimiert oder inhaltlich stark veraltet, wirken SEO-Maßnahmen nur eingeschränkt, weil die Grundlage fehlt. In solchen Fällen empfehlen wir vorab ein Redesign, das wir direkt SEO-gerecht aufbauen, statt später nachzubessern. Ist die technische Basis bereits solide, reichen inhaltliche und lokale Optimierungen meist aus.",
      },
    ],
    ctaSatz: {
      pre: "Sprechen Sie mit uns darüber, wie Ihr Betrieb ",
      grad: "auch ohne Portal-Umweg gefunden wird.",
    },
    ctaButtonLabel: "Jetzt Sichtbarkeit prüfen lassen",
    icon: brancheIcon(
      <path d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
    ),
    accent: "Gefunden in Google und auf Google Maps — ohne Provisionen an Vermittlungsportale.",
  },

  /* ── 05 · Immobilienmakler ─────────────────────────────────────────────── */
  {
    slug: "seo-fuer-immobilienmakler",
    name: "SEO für Immobilienmakler",
    kurzName: "Immobilienmakler",
    keyword: "SEO für Immobilienmakler",
    heroVariant: "zentriert",
    hebelVariant: "stack",
    signature: {
      variant: "funnel",
      panelTitle: "Eigentümer-Suchen",
      stufen: [
        {
          query: "was ist meine wohnung wert",
          satz: "Der erste Impuls — lange bevor ein Makler oder ein Portal eine Rolle spielt.",
          detail:
            "Die Suchintention ist rein informativ: Eigentümer wollen eine erste Orientierung zum Wert, ohne sich an einen Makler zu binden. Hier gewinnt eine Bewertungsseite, die das Vorgehen verständlich erklärt und den Einstieg über ein einfaches Formular anbietet.",
        },
        {
          query: "immobilie verkaufen ablauf",
          satz: "Die konkrete Planung: Eigentümer vergleichen jetzt Wege mit und ohne Makler.",
          detail:
            "Gesucht wird eine Schritt-für-Schritt-Orientierung — inklusive der Frage, ob sich ein Makler überhaupt lohnt. Hier gewinnt ein Ratgeber zum Verkaufsprozess, der Ablauf, Unterlagen und typische Stolperfallen nüchtern erklärt.",
        },
        {
          query: "makler [stadt]",
          satz: "Hier gewinnt Ihre Website — nicht das Portal.",
          detail:
            "Jetzt wird aktiv verglichen: Die Suche zielt auf ein konkretes Büro im eigenen Ort. Hier gewinnt eine Standortseite mit lokalen Referenzen und erkennbarer Marktkenntnis — nicht das Portal-Listing.",
          highlight: true,
        },
      ],
    },
    signatureTitle: { pre: "Drei Suchen — ", grad: "alle vor dem Portal." },
    signatureCopy: [
      "Vom ersten Wertgefühl bis zur Maklerwahl arbeiten sich Eigentümer über mehrere Suchanfragen an die Verkaufsentscheidung heran.",
      "Wer jede dieser Suchen mit eigenen Inhalten besetzt, führt das Erstgespräch, bevor das Objekt auf einem Portal erscheint — genau dort setzen wir an.",
    ],
    h1: {
      pre: "SEO für Immobilienmakler: Eigentümer finden, ",
      grad: "bevor sie beim Portal landen",
    },
    subline:
      "Verkaufswillige Eigentümer googeln zuerst „Was ist meine Immobilie wert“, nicht den Namen eines Maklerbüros. Wir sorgen dafür, dass genau diese Eigentümer-Anfragen bei Ihnen ankommen, nicht nur bei ImmoScout24.",
    ctaLabel: "Kostenlose SEO-Analyse für Ihr Maklerbüro anfragen",
    warumTitle: { pre: "Warum SEO ", grad: "für Immobilienmakler" },
    warumAbsaetze: [
      <>
        Bei Immobiliensuchen dominieren Portale wie ImmoScout24 oder Immowelt die Suchergebnisse fast
        vollständig, sobald jemand nach einem konkreten Objekt sucht. Die wirklich wertvolle Suchanfrage liegt
        aber woanders: Eigentümer, die über einen Verkauf nachdenken, googeln „Immobilie verkaufen ohne Makler“
        oder „Was ist meine Wohnung wert“, lange bevor sie ein Exposé einstellen. Wer bei diesen Anfragen
        sichtbar ist, bekommt Eigentümer-Leads, die deutlich seltener und wertvoller sind als reine
        Interessenten-Anfragen auf ein bereits eingestelltes Objekt. Genau hier entscheidet SEO, nicht die
        Portal-Präsenz.
      </>,
      <>
        Objektseiten veralten zudem automatisch, sobald eine Immobilie verkauft ist, und hinterlassen tote
        Links oder inhaltsleere Seiten, wenn niemand sie pflegt. Ohne aufgebaute lokale Autorität rund um Ihr
        Vertriebsgebiet bleibt einem Maklerbüro nur, auf Portalen mitzubieten und für Premium-Platzierungen zu
        zahlen, während der eigentliche Erstkontakt zum Eigentümer meist schon vorher stattgefunden hat.
        Deshalb setzen wir bei Maklern gezielt auf{" "}
        <Link href="/seo/beratung" className={linkCls}>SEO-Beratung</Link>, die Eigentümer-Suchanfragen, lokale
        Marktkompetenz und eine saubere Objektseiten-Struktur zusammenbringt.
      </>,
    ],
    split: {
      bild: "/images/branchen-split/immobilienmakler.png",
      bildAlt: "Eigentümer informiert sich über den Wert seiner Immobilie",
      caption: "Eigentümer recherchieren lange vor dem ersten Maklerkontakt",
      bildLinks: true,
      titel: { pre: "Verkäufer finden Sie ", grad: "vor der Konkurrenz." },
      absaetze: [
        <>
          Bevor sich jemand für einen Makler entscheidet, sucht er meist nach einer kostenlosen Bewertung,
          nach „Haus verkaufen [Ort]“ oder nach dem aktuellen Marktwert in seiner Straße. Wer zu diesem
          frühen Zeitpunkt mit einer hilfreichen, lokal konkreten Seite erscheint, gewinnt das Vertrauen des
          Verkäufers, bevor überhaupt weitere Makler kontaktiert werden. Objektportale wie Immoscout24
          dominieren zwar die Suche nach konkreten Angeboten, bei der Maklersuche selbst haben eigene
          Inhalte aber echte Chancen.
        </>,
        <>
          Die meisten Makler-Websites bestehen fast ausschließlich aus aktuellen Objekten, die nach dem
          Verkauf spurlos verschwinden und damit jede aufgebaute Sichtbarkeit mit sich nehmen. Wir entwickeln
          eine{" "}
          <Link href="/seo/content-strategie" className={linkCls}>Content-Strategie</Link>, die auf
          dauerhaften Seiten zu Stadtteilen, Marktentwicklung und dem Verkaufsprozess aufbaut, statt sich nur
          auf wechselnde Objektseiten zu verlassen. So bleibt Sichtbarkeit auch dann bestehen, wenn ein
          Objekt längst verkauft ist.
        </>,
      ],
    },
    vorgehenTitle: { pre: "So gehen wir ", grad: "bei Immobilienmaklern vor." },
    vorgehen: [
      {
        titel: "Farming-Gebiete festlegen",
        text: "Wir grenzen gemeinsam mit Ihnen die Stadtteile oder Orte ein, in denen Sie tatsächlich aktiv Objekte akquirieren möchten, und bauen die Website entlang dieser Gebiete auf. Für jedes Farming-Gebiet entsteht eine eigene Seite mit lokalen Marktdaten statt einer allgemeinen „Wir sind für Sie da“-Formulierung.",
      },
      {
        titel: "Dauerhafte Inhalte statt Objekte",
        text: "Neben den aktuellen Objektseiten bauen wir Inhalte auf, die unabhängig vom einzelnen Verkauf bestehen bleiben, etwa Marktberichte, Stadtteilporträts oder Ratgeber zum Verkaufsprozess. Diese Seiten sichern Sichtbarkeit dauerhaft ab, während einzelne Objektseiten kommen und gehen.",
      },
      {
        titel: "Bewertungsanfragen gezielt abholen",
        text: "Seiten rund um „Immobilie bewerten“ oder „Haus verkaufen“ richten wir gezielt auf Eigentümer aus, die noch am Anfang ihrer Entscheidung stehen, nicht erst auf Käufer eines konkreten Objekts. Ein einfaches Bewertungsformular auf dieser Seite senkt die Hürde für die erste Kontaktaufnahme spürbar.",
      },
      {
        titel: "Objektseiten nach Verkauf",
        text: "Statt verkaufte Objekte einfach zu löschen, wandeln wir die Seite in eine dauerhafte Referenz um, ergänzt um Verkaufsdauer und erzielten Marktpreis, sofern der Verkäufer zustimmt. So bleibt die aufgebaute Sichtbarkeit erhalten, und die Seite dient gleichzeitig als Referenz für künftige Verkäufer im selben Gebiet.",
      },
    ],
    fehlerVariant: "tafel",
    fehler: [
      {
        titel: "Objektseiten werden gelöscht",
        text: "Nach einem Verkauf wird die Objektseite meist sofort entfernt, wodurch jede dort aufgebaute Sichtbarkeit und alle eingehenden Links ins Leere laufen. Eine Weiterleitung auf eine passende Stadtteil- oder Kategorieseite oder eine Umwandlung in eine Referenzseite erhält den Wert der Seite.",
      },
      {
        titel: "Farming-Gebiet unklar definiert",
        text: "Viele Makler-Websites sprechen vage von „Ihrer Region“, ohne konkrete Orte oder Stadtteile zu benennen, wodurch weder Google noch Eigentümer erkennen, wo der Makler tatsächlich aktiv ist. Eigene Seiten mit dem Namen des Stadtteils oder Ortes im Titel schaffen hier klare Zuordnung.",
      },
      {
        titel: "Nur Objekte, keine Marktinformation",
        text: "Reine Objektlisten ohne begleitende Marktberichte oder Preisentwicklungen liefern Eigentümern keinen Grund, die Seite ein zweites Mal zu besuchen, bevor sie verkaufsbereit sind. Regelmäßige, lokal konkrete Marktinformationen bauen genau die Wiederkehr und Autorität auf, die bei der späteren Maklerwahl den Ausschlag gibt.",
      },
      {
        titel: "Abhängigkeit von Portalen",
        text: "Manche Makler verlassen sich vollständig auf Immoscout24 und vergleichbare Portale und vernachlässigen die eigene Website, wodurch sie bei jeder Portal-Preiserhöhung ausgeliefert sind. Eine eigene, sichtbare Website macht unabhängiger von Portalkosten und bringt zusätzlich Eigentümeranfragen, die nie über ein Portal gelaufen wären.",
      },
    ],
    hebel: [
      {
        titel: "Eigentümer-Content als Lead-Quelle",
        text: "Seiten zu Themen wie Immobilienbewertung, Verkaufsablauf oder Erbimmobilie verkaufen sprechen gezielt Eigentümer statt Käufer an. Diese Suchanfragen haben geringeren Wettbewerbsdruck durch Portale und deutlich höheren Wert pro Anfrage.",
      },
      {
        titel: "Lokale Marktautorität aufbauen",
        text: "Inhalte zu Stadtteilen, Preisentwicklungen und lokalen Besonderheiten positionieren Ihr Büro als Marktkenner vor Ort. Das stärkt sowohl Google-Rankings als auch das Vertrauen von Eigentümern, die einen ortskundigen Makler suchen.",
      },
      {
        titel: "Objektseiten technisch pflegen",
        text: "Verkaufte oder vermietete Objekte werden strukturiert umgeleitet oder archiviert statt als tote Seiten stehen zu bleiben. Das verhindert Qualitätsverluste im Google-Index durch veraltete oder leere Inhalte.",
      },
      {
        titel: "Google Business Profil",
        text: "Ein gepflegtes Profil je Standort, konsistente Kontaktdaten und lokale Verlinkung verbessern die Sichtbarkeit bei „Makler in meiner Nähe“-Suchen, unabhängig von der Portal-Präsenz.",
      },
    ],
    faq: [
      {
        q: "Wie lange dauert es, bis wir eigene Eigentümer-Leads über Google bekommen?",
        a: "Lokale Signale wie das Google Business Profil wirken oft innerhalb weniger Wochen. Content zu Eigentümerthemen wie Immobilienbewertung braucht mehrere Monate, um gegen etablierte Portale und Ratgeberseiten zu ranken. Zwischenstände verfolgen wir über Search Console und Semrush.",
      },
      {
        q: "Was kostet SEO im Vergleich zu Premium-Platzierungen auf ImmoScout24?",
        a: "Premium-Platzierungen sind laufende Ausgaben pro Objekt oder Zeitraum, ohne dass danach etwas bleibt. SEO baut eine eigene Sichtbarkeit auf, die auch zwischen zwei Objekten weiter Eigentümer-Anfragen bringt. Der Aufwand richtet sich nach Vertriebsgebiet und Wettbewerbsdichte.",
      },
      {
        q: "Ersetzt eine eigene Website die Präsenz auf ImmoScout24?",
        a: "Nein, beide ergänzen sich. Das Portal bringt Käufer zu bereits eingestellten Objekten, die eigene Website erreicht Eigentümer, bevor überhaupt ein Objekt existiert. SEO verschafft Ihnen damit einen Kanal, den kein Wettbewerber über dasselbe Portal-Listing erreichen kann.",
      },
      {
        q: "Was passiert mit einer Objektseite, nachdem die Immobilie verkauft wurde?",
        a: "Statt die Seite zu löschen, wandeln wir sie meist in eine Referenzseite um oder leiten sie gezielt auf eine passende Stadtteilseite weiter, damit aufgebaute Sichtbarkeit und Backlinks erhalten bleiben. Mit Zustimmung des Verkäufers ergänzen wir teils Informationen zur Verkaufsdauer als Referenz für künftige Auftraggeber. Eine ersatzlose Löschung ist SEO-technisch fast immer die schlechteste Option.",
      },
      {
        q: "Können lokale Marktberichte wirklich neue Aufträge bringen?",
        a: "Ja, Eigentümer informieren sich häufig Monate vor einem tatsächlichen Verkauf über die Preisentwicklung in ihrer Straße oder ihrem Stadtteil. Ein Makler, der zu diesem Zeitpunkt mit konkreten, aktuellen Marktzahlen auffindbar ist, baut Vertrauen auf, bevor überhaupt ein Bewertungstermin im Raum steht. Wir bauen solche Marktberichte deshalb als festen Bestandteil der Content-Strategie ein.",
      },
      {
        q: "Wie gehen Sie mit unseren Farming-Gebieten um, wenn wir mehrere Orte bearbeiten?",
        a: "Jedes Farming-Gebiet erhält eine eigene Seite mit spezifischen Marktdaten, Referenzobjekten und lokalem Bezug, statt eines einzigen allgemeinen Textes für das gesamte Tätigkeitsgebiet. Diese Trennung ist wichtig, damit jede Seite bei Suchanfragen aus dem jeweiligen Ort einzeln ranken kann. Bei stark wechselnden Gebieten passen wir die Struktur regelmäßig an Ihre tatsächliche Akquisetätigkeit an.",
      },
    ],
    ctaSatz: {
      pre: "Lassen Sie uns gemeinsam prüfen, ",
      grad: "wie viele Eigentümer-Anfragen Ihnen aktuell entgehen.",
    },
    ctaButtonLabel: "Jetzt Maklerbüro-Sichtbarkeit analysieren",
    icon: brancheIcon(
      <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
    ),
    accent: "Eigentümer-Anfragen erreichen Ihr Büro, bevor sie beim Portal landen.",
  },

  /* ── 06 · SaaS ─────────────────────────────────────────────────────────── */
  {
    slug: "saas-seo",
    name: "SaaS SEO",
    kurzName: "SaaS",
    keyword: "SaaS SEO",
    heroVariant: "split",
    hebelVariant: "editorial",
    signature: {
      variant: "kichat",
      panelTitle: "KI-Suche",
      fragen: [
        { chip: "Rechnungstool DSGVO?", frage: "Welches Tool für automatische Rechnungsbuchung, DSGVO-konform?" },
        { chip: "Projekttool kleines Team?", frage: "Welches Projektmanagement-Tool passt für ein kleines Team?" },
        { chip: "CRM-Alternative?", frage: "Gibt es eine schlanke Alternative zu den großen CRM-Anbietern?" },
      ],
      marke: "ihre-software.de",
      quellen: "Quellen: 3 Vergleichsseiten",
    },
    h1: {
      pre: "SaaS SEO: Sichtbar sein, ",
      grad: "wenn ChatGPT und Google Ihre Software empfehlen",
    },
    subline:
      "B2B-Einkäufer vergleichen Software heute über Google-Suchen wie „[Tool] Alternative“ und fragen zunehmend direkt ChatGPT oder Perplexity nach einer Empfehlung. Wir bauen Sichtbarkeit auf, die in beiden Suchwelten funktioniert.",
    ctaLabel: "Kostenlose GEO- und SEO-Analyse für Ihr SaaS anfragen",
    warumTitle: { pre: "Warum SEO ", grad: "für SaaS" },
    warumAbsaetze: [
      <>
        Deutsche B2B-Software-Nischen haben oft ein kleines Suchvolumen, aber Nutzer mit hoher Kaufkraft und
        klarer Kaufabsicht — wer „[Kategorie] Software DSGVO-konform“ oder „[Tool A] vs [Tool B]“ sucht, steht
        kurz vor einer Kaufentscheidung, nicht am Anfang einer allgemeinen Recherche. Gleichzeitig suchen viele
        Einkäufer eher nach ihrem Problem als nach einer Produktkategorie: „Rechnungen automatisch buchen“
        statt „Buchhaltungssoftware Feature XY“. Wer nur Feature-Listen und Produktseiten hat, verpasst genau
        diese Problem-Suchen, obwohl sie oft mehr Volumen bringen als reine Markenbegriffe.
      </>,
      <>
        Vergleichs- und Alternative-Seiten entscheiden bei Software-Käufen zunehmend über die Vorauswahl, und
        wer hier keine eigene, ehrliche Seite hat, überlässt diese Kaufphase vollständig Bewertungsportalen
        oder der Konkurrenz. Gegen VC-finanzierte Wettbewerber mit großen Content-Teams hilft dabei kein
        einzelner Blogartikel, sondern ein aufgebauter Content-Moat aus Problem-, Vergleichs- und
        Anwendungsfall-Seiten. Parallel verändert sich gerade, wie Software überhaupt gefunden wird: Immer mehr
        Einkäufer fragen ChatGPT oder Perplexity direkt nach einer Tool-Empfehlung, statt zehn Tabs mit
        Google-Ergebnissen zu öffnen. Genau darauf zielt unsere{" "}
        <Link href="/geo/optimierung" className={linkCls}>GEO-Optimierung</Link> — Inhalte so aufzubauen, dass
        KI-Systeme Ihre Software überhaupt als Antwort kennen und nennen.
      </>,
    ],
    split: {
      bild: "/images/branchen-split/saas.png",
      bildAlt: "SaaS-Team prüft die Sichtbarkeit seiner Software in Google und KI-Suche",
      caption: "Gesucht wird das Problem — nicht der Produktname",
      bildLinks: false,
      titel: { pre: "Sichtbar vom ersten Suchbegriff ", grad: "bis zum Trial." },
      absaetze: [
        <>
          SaaS-Kunden googeln selten den Produktnamen, sondern das Problem, das die Software lösen soll —
          „Projektmanagement-Tool für kleine Teams“ oder „CRM-Alternative zu Salesforce“ sind typische
          Sucheinstiege. Diese Suchanfragen kommen aus jeder Phase der Kaufentscheidung, von der ersten
          Recherche bis zum konkreten Vergleich vor dem Trial. Wer hier nur mit der eigenen Startseite
          sichtbar ist, überlässt den größten Teil dieser Anfragen Vergleichsportalen und Wettbewerbern mit
          eigenem Content.
        </>,
        <>
          SaaS-Produkte verändern sich schneller als die meisten anderen Produkte, und Content muss diesem
          Tempo folgen können, ohne bei jedem Feature-Release wochenlang auf eine neue Veröffentlichung zu
          warten. Wir schreiben{" "}
          <Link href="/seo/texte" className={linkCls}>SEO-Texte</Link>, die Funktionen, Integrationen und
          Anwendungsfälle so aufbereiten, dass sie sowohl bei klassischen Suchanfragen als auch bei Fragen an
          KI-Assistenten wie ChatGPT als Antwort auftauchen. Über unsere CI/CD-Anbindung geht eine
          aktualisierte Seite dabei in Minuten live, nicht erst nach tagelanger Wartezeit.
        </>,
      ],
    },
    vorgehenTitle: { pre: "So gehen wir ", grad: "bei SaaS-Unternehmen vor." },
    vorgehen: [
      {
        titel: "Suchintention nach Funnel-Phase",
        text: "Wir ordnen relevante Suchanfragen den Phasen der Kaufentscheidung zu — von allgemeinen Problemfragen über konkrete Tool-Vergleiche bis zu Suchen mit Trial- oder Preis-Absicht. Daraus entsteht eine Content-Priorität, die gezielt an den Stellen ansetzt, an denen aus Besuchern Trial-Nutzer werden, statt wahllos Traffic zu erzeugen.",
      },
      {
        titel: "Vergleichs- und Alternativen-Seiten",
        text: "Seiten wie „[Ihr Produkt] vs. [Wettbewerber]“ oder „Alternative zu [bekanntes Tool]“ holen Suchanfragen kurz vor der Kaufentscheidung ab, die sonst vollständig an Vergleichsportale gehen. Diese Seiten bauen wir sachlich und mit echten Unterschieden auf, da überzogene Vergleiche bei dieser Zielgruppe schnell an Glaubwürdigkeit verlieren.",
      },
      {
        titel: "Feature- und Use-Case-Seiten",
        text: "Statt einer einzigen Feature-Übersicht bauen wir eigene Seiten zu einzelnen Funktionen und Anwendungsfällen auf, die jeweils auf die Suchsprache einer bestimmten Zielgruppe im Unternehmen zugeschnitten sind. Das trennt zusätzlich Content für Entscheider von Content für die tatsächlichen Nutzer der Software, die häufig andere Suchbegriffe verwenden.",
      },
      {
        titel: "Internationalisierung planen",
        text: "Bei Expansion über den deutschsprachigen Raum hinaus legen wir die technische Struktur für mehrere Sprachversionen früh fest, statt Inhalte später mühsam auf ein gewachsenes System aufzusetzen. Deutsche und englische Inhalte behandeln wir dabei als eigenständige Suchintentionen, nicht als reine Übersetzung derselben Seite — erste spürbare Effekte zeigen sich meist nach drei bis sechs Monaten.",
      },
    ],
    fehlerVariant: "editorial",
    fehler: [
      {
        titel: "Nur eigene Terminologie verwendet",
        text: "SaaS-Anbieter benennen Funktionen häufig nach eigenen Produktbegriffen, während potenzielle Kunden nach dem eigentlichen Problem oder gängigen Marktbegriffen suchen. Ein Abgleich zwischen interner Terminologie und tatsächlicher Suchsprache der Zielgruppe schließt diese Lücke.",
      },
      {
        titel: "Vergleichsseiten den Portalen überlassen",
        text: "Ohne eigene Vergleichs- oder Alternativen-Seiten überlässt man diese besonders kaufnahen Suchanfragen vollständig Vergleichsportalen und Wettbewerbern. Eigene, ehrliche Vergleichsseiten holen einen Teil dieser Anfragen zurück auf die eigene Domain.",
      },
      {
        titel: "Content-Struktur wächst unkontrolliert",
        text: "Bei schnellem Wachstum entstehen oft parallel Blog, Hilfe-Center und Landingpages ohne gemeinsame Struktur, wodurch ähnliche Inhalte gegeneinander konkurrieren. Eine klare Aufteilung nach Suchintention — Marketing-Content, Produkt-Content, Support-Content — verhindert, dass sich der eigene Content selbst Konkurrenz macht.",
      },
      {
        titel: "Internationale Inhalte falsch übersetzt",
        text: "Englische Inhalte entstehen oft als reine Übersetzung der deutschen Seiten, obwohl sich Suchbegriffe und Wettbewerb zwischen den Märkten deutlich unterscheiden. Eigenständige Keyword-Recherche je Sprachversion liefert deutlich bessere Ergebnisse als eine Eins-zu-eins-Übersetzung.",
      },
    ],
    hebel: [
      {
        titel: "Problem- statt Feature-Seiten",
        text: "Inhalte orientieren sich an konkreten Aufgaben Ihrer Zielgruppe statt an internen Feature-Namen. Das trifft Suchanfragen, die potenzielle Kunden tatsächlich eingeben, lange bevor sie Ihren Produktnamen kennen.",
      },
      {
        titel: "Vergleichs- und Alternative-Seiten",
        text: "Eigene, faire Vergleichsseiten zu direkten Wettbewerbern und „Alternative zu“-Seiten besetzen genau die Suchphase kurz vor der Kaufentscheidung. Ohne eigene Version dieser Seiten übernehmen das Bewertungsportale oder Wettbewerber.",
      },
      {
        titel: "Content-Moat gegen Konkurrenz",
        text: "Statt einzelner Artikel bauen wir zusammenhängende Themencluster auf, die ein Suchfeld strukturell besetzen. Das ist schwerer zu kopieren als einzelne Blogbeiträge und schwerer mit reinem Ads-Budget zu verdrängen.",
      },
      {
        titel: "KI-Sichtbarkeit durch GEO",
        text: "Wir strukturieren Inhalte so, dass KI-Suchsysteme sie als Quelle für Empfehlungen nutzen können, etwa durch klare Fakten, Vergleichsstrukturen und eindeutige Aussagen statt vager Marketingtexte. Das wirkt zusätzlich zu klassischen Google-Rankings.",
      },
    ],
    faq: [
      {
        q: "Lohnt sich SEO bei so kleinem Suchvolumen in unserer Nische?",
        a: "Ja, gerade bei B2B-Software zählt weniger die Suchmenge als die Kaufkraft und Kaufnähe der Suchenden. Wenige, aber hochrelevante Anfragen mit klarer Kaufabsicht bringen oft mehr Umsatz als große Volumina im Consumer-Bereich. Wir priorisieren deshalb gezielt nach Abschlusswahrscheinlichkeit statt nach reinem Suchvolumen.",
      },
      {
        q: "Was ist der Unterschied zwischen klassischem SEO und GEO für uns?",
        a: "SEO sorgt für Sichtbarkeit in klassischen Google-Ergebnissen, GEO dafür, dass KI-Systeme wie ChatGPT oder Perplexity Ihre Software überhaupt kennen und als Antwort nennen. Beide Disziplinen nutzen teils dieselben Inhalte, brauchen aber unterschiedliche Struktur und Aufbereitung, die wir aus einer Hand umsetzen.",
      },
      {
        q: "Wie schnell können wir mit Vergleichsseiten gegen größere Wettbewerber bestehen?",
        a: "Einzelne Seiten können über unsere CI/CD-Umgebung innerhalb von Minuten live gehen, Rankings gegen etablierte, gut verlinkte Wettbewerber brauchen aber kontinuierliche Arbeit über mehrere Monate. Mit Ahrefs und Semrush identifizieren wir Lücken, die auch mit kleinerem Content-Team realistisch zu besetzen sind.",
      },
      {
        q: "Wie gehen Sie mit unserem Freemium- oder Trial-Modell in der SEO-Strategie um?",
        a: "Wir ordnen Content danach ein, wie nah er am Trial-Start liegt — informative Inhalte zu Beginn der Recherche, konkrete Vergleiche und Preisseiten kurz davor. Ziel ist, dass organischer Traffic gezielt an den Stellen ansetzt, an denen Nutzer typischerweise einen Trial starten, statt nur die Besucherzahl zu erhöhen. Landingpages für einzelne Anwendungsfälle richten wir dabei direkt auf eine Trial-Anmeldung statt auf eine allgemeine Kontaktanfrage aus.",
      },
      {
        q: "Wir expandieren von DACH ins englischsprachige Ausland — was bedeutet das für SEO?",
        a: "Wir behandeln die englische Version nicht als Übersetzung, sondern führen eine eigenständige Keyword-Recherche für den neuen Markt durch, da sich Suchbegriffe, Wettbewerber und Suchvolumen deutlich unterscheiden können. Technisch legen wir die Struktur früh über saubere Sprachkennzeichnung fest, damit Google beide Versionen korrekt zuordnet. So vermeiden wir, dass die neue Sprachversion der bestehenden deutschen Version Sichtbarkeit wegnimmt, statt eigene aufzubauen.",
      },
      {
        q: "Sollten wir eher für Entwickler oder für Entscheider im Unternehmen schreiben?",
        a: "Meist braucht es beides, aber getrennt voneinander — Entwickler suchen nach technischen Begriffen wie API-Dokumentation oder Integrationen, während Entscheider nach Kosten, Sicherheit oder Anwendungsfällen für ihr Team suchen. Wir bauen für beide Zielgruppen eigene Content-Bereiche auf, statt beide Sprachebenen auf denselben Seiten zu vermischen. So findet jede Zielgruppe genau die Inhalte, die zu ihrer Suchintention passen.",
      },
    ],
    ctaSatz: {
      pre: "Lassen Sie uns gemeinsam prüfen, ob Ihre Software heute ",
      grad: "in ChatGPT-Antworten und Google-Rankings überhaupt vorkommt.",
    },
    ctaButtonLabel: "Jetzt GEO-Potenzial analysieren",
    icon: brancheIcon(
      <path d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
    ),
    accent: "Sichtbarkeit, die in Google-Rankings und in KI-Empfehlungen zugleich funktioniert.",
  },
];
