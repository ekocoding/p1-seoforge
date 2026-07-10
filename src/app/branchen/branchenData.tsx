import Link from "next/link";
import type { ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BRANCHEN-DATEN — 6 Branchen, ein gemeinsames Detail-Template.
   Content nahezu wortgetreu aus dem Branchen-Briefing; je Branche genau
   EIN interner Pflicht-Link im zweiten WARUM-Absatz.
═══════════════════════════════════════════════════════════════════════════ */

/* Layout-Variante der HEBEL-Section: gleiches Design-System, je Branche eigene Form */
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
  hebelVariant: HebelVariant;
  /** Beispiel-Query für die kompakte Suchfeld-Mockup-Zeile im Hero (Online-Shops, Handwerker) */
  heroQuery?: string;
  /** Alt-Text des Magazine-Cover-Hero-Fotos (/images/branchen-hero/<key>.jpg) */
  heroBildAlt: string;
  h1: { pre: string; grad: string; post?: string };
  subline: string;
  ctaLabel: string;
  warumTitle: { pre: string; grad: string };
  warumAbsaetze: ReactNode[];
  /** Optionales Begleitfoto am Ende der WARUM-Absätze (nicht jede Branche braucht das) */
  warumBild?: { src: string; alt: string };
  /** Signature-Modul: eigene Section direkt nach WARUM */
  signature: Signature;
  /** H2 der Signature-Section */
  signatureTitle: { pre: string; grad: string };
  /** Zwei kurze Begleitsätze der Signature-Section */
  signatureCopy: string[];
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
  /** ARBEITSWEISE-Section: Säulen-Expander links (K1–K4), Deploy-Terminal rechts */
  arbeitsweise: {
    titel: { pre: string; grad: string };
    intro: string;
    /** Vier Säulen als Expander-Zeilen — sichtbar nur Index + Titel, Klick öffnet die zwei Sätze */
    saeulen: { titel: string; text: string }[];
    /** Branchenspezifisches Beispiel der ersten Terminal-Zeile („$ änderung erfasst — …“) */
    deployBeispiel: string;
  };
  /** TIEFE-Section: Magazin-Dossier — Editorial-Lead, Pull-Quote (wortgetreu), zwei Spalten-Absätze */
  tiefe: {
    titel: { pre: string; grad: string };
    lead: string;
    quote: string;
    spalten: [string, string];
    /** Optionales Begleitfoto zwischen Lead und Pull-Quote (nicht jede Branche braucht das) */
    bild?: { src: string; alt: string };
  };
  ctaSatz: { pre: string; grad: string };
  ctaButtonLabel: string;
  icon: ReactNode;
  accent: string;
  /** Optionaler Verlinkungs-Strip „Nach Praxis-Typ“: Slugs verwandter Branchen-Seiten (Icon + Name werden aus dem branchen-Array aufgelöst) */
  praxisTypen?: { slug: string; teaser: string }[];
  /** true = Praxis-Typ-Spoke (Zahnärzte, KFO, …): erscheint NICHT im 6er-Hub-Grid, nur als Textzeile darunter */
  praxisTyp?: boolean;
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
    hebelVariant: "editorial",
    heroBildAlt: "Ärztin mit Tablet in ihrer Praxis — lokale Sichtbarkeit für Arztpraxen in Google und KI-Suche",
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
    warumBild: {
      src: "/images/branchen-editorial/aerzte-warum.webp",
      alt: "Ärztin erklärt einem Kollegen im Praxisflur etwas auf dem Tablet",
    },
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
      {
        q: "Wie viel Zeit muss unser Praxisteam für die Zusammenarbeit einplanen?",
        a: "Wenig. Die meiste Abstimmung läuft über kurze schriftliche Freigaben, die Sie zwischen zwei Terminen erledigen können, statt über feste Meeting-Termine. Medizinisch heikle Inhalte wie Leistungsbeschreibungen oder Aussagen zu Behandlungen legen wir vor Veröffentlichung vor, alles andere setzen wir eigenständig um. Im Schnitt reichen wenige Minuten pro Woche, damit Ihre Praxis-Website aktuell und fachlich korrekt bleibt.",
      },
      {
        q: "Dürfen wir auf unserer Website überhaupt über Symptome schreiben, ohne dass es wie eine Diagnose wirkt?",
        a: "Ja, wenn die Inhalte sauber formuliert sind. Wir schreiben Symptom-Texte so, dass sie Orientierung geben und erklären, wann ein Arztbesuch sinnvoll ist, ohne selbst zu diagnostizieren oder Behandlungsversprechen zu machen. Diese Abgrenzung prüfen wir bei jedem medizinisch relevanten Text gemeinsam mit Ihnen, bevor er online geht, damit die Seite fachlich auf der sicheren Seite bleibt.",
      },
    ],
    arbeitsweise: {
      titel: { pre: "Arbeiten im Takt ", grad: "Ihrer Sprechstunden." },
      intro:
        "Eine Arztpraxis hat keine Zeit für stundenlange Agentur-Termine zwischen zwei Patienten. Rückfragen zu Inhalten oder Freigaben müssen warten können, bis zwischen Sprechstunde und Dokumentation fünf Minuten Luft bleiben. Genau deshalb ist unsere Arbeitsweise auf kurze, asynchrone Abstimmung ausgelegt statt auf feste Meeting-Termine, die den Praxisablauf stören. Wer den ganzen Tag Patienten behandelt, braucht einen Partner, der im Hintergrund arbeitet und sich nur meldet, wenn wirklich eine Entscheidung gefragt ist.",
      saeulen: [
        {
          titel: "KI übernimmt Routinearbeit",
          text: "Bei der Auswertung von Praxis-Keywords wie Leistungsseiten, Fachbegriffen und Symptom-Suchen setzen wir KI-Systeme für die Vorab-Analyse ein, damit unsere Zeit in die medizinisch korrekte Content-Prüfung fließt. Die frei werdenden Stunden stecken wir in die sorgfältige Abstimmung, bevor ein Text zu Diagnosen oder Behandlungen online geht, statt in administrative Fleißarbeit.",
        },
        {
          titel: "Änderungen ohne Wartezeit",
          text: "Wenn ein neuer Facharzt in der Praxis anfängt oder sich Sprechzeiten ändern, geht die aktualisierte Seite über unsere CI/CD-Infrastruktur innerhalb von Minuten live, nicht erst nach dem nächsten Agentur-Termin. Gerade bei medizinischen Inhalten, die schnell korrigiert werden müssen, wenn sich Leistungen oder Angaben ändern, zahlt sich das aus.",
        },
        {
          titel: "Ein fester Ansprechpartner",
          text: "Sie sprechen bei uns immer mit derselben Person und nicht mit einer wechselnden Hotline, die erst Ihren Praxisnamen nachschlagen muss. Fragen zur Sichtbarkeit Ihrer Praxis beantworten wir innerhalb von 24 Stunden, auch wenn die E-Mail erst nach Praxisschluss rausgeht.",
        },
        {
          titel: "Ergebnisse statt Vertragsbindung",
          text: "Wir binden Praxen nicht über lange Vertragslaufzeiten, sondern über sichtbare monatliche Fortschritte bei Rankings und Anfragen. Wenn Terminanfragen über die Website spürbar steigen, bleiben Sie aus Überzeugung bei uns, nicht weil eine Kündigungsfrist dazu zwingt.",
        },
      ],
      deployBeispiel: "neue behandlungsseite: implantologie",
    },
    tiefe: {
      titel: { pre: "Von der Symptom-Suche ", grad: "bis zur Terminbuchung." },
      lead: "Ein Patient mit Rückenschmerzen sucht selten direkt nach dem Namen einer Praxis. Er sucht zuerst nach dem Symptom, etwa „Rückenschmerzen was tun“ oder „Stechen im Kreuz beim Bücken“, lange bevor er überhaupt an einen Arztbesuch denkt. Erst in einer zweiten Suchphase, oft Stunden oder Tage später, wird aus dem Symptom eine konkrete Leistungssuche wie „Orthopäde Termin“ oder „Rückenschmerzen Facharzt in der Nähe“. Praxen, die nur ihre Leistungsseite optimieren, tauchen in dieser ersten, viel größeren Suchphase gar nicht auf und verpassen den Moment, in dem sich der Patient noch orientiert statt schon entschieden hat.",
      quote: "Diese Übergänge entscheiden oft darüber, ob aus einem Website-Besucher ein Anruf oder eine Online-Terminbuchung wird.",
      bild: {
        src: "/images/branchen-editorial/aerzte-tiefe.webp",
        alt: "Ärztin erklärt einem Patienten im Praxisflur etwas auf dem Tablet",
      },
      spalten: [
        "Der größte Bruch in dieser Reise passiert häufig auf der eigenen Website: Der Patient landet über eine Symptom-Suche auf einer allgemeinen Startseite ohne Bezug zu seinem Anliegen und muss sich selbst durchklicken, um zu verstehen, ob die Praxis überhaupt zuständig ist. Fehlt an dieser Stelle ein klarer nächster Schritt, etwa ein sichtbarer Termin-Button direkt im ersten Blickfeld, bricht ein spürbarer Teil der Besucher wieder ab. Aus unserer Erfahrung verlieren Praxen genau hier mehr potenzielle Patienten als durch schlechte Rankings, weil die Seite zwar gefunden wird, die Unsicherheit des Patienten aber nicht auffängt. Ein Symptom-Text, der sachlich erklärt, was das Anliegen bedeuten kann und wann ein Arztbesuch sinnvoll ist, überbrückt genau diese Lücke, ohne in Diagnosen abzurutschen, die auf eine Praxis-Website nicht gehören.",
        "Wir bauen deshalb bewusst eine Content-Ebene zwischen Symptom und Leistung: Seiten, die die Suchintention des unsicheren Patienten aufgreifen und von dort gezielt zur passenden Facharzt-Leistung verlinken. Diese Übergänge entscheiden oft darüber, ob aus einem Website-Besucher ein Anruf oder eine Online-Terminbuchung wird. Genauso wichtig ist die technische Seite: Ist die Terminbuchung von einer Symptom-Seite aus in zwei Klicks erreichbar, oder muss der Patient erst durch mehrere Untermenüs navigieren? Praxen, die diesen Weg verkürzen, gewinnen häufiger Patienten, die eigentlich schon fast wieder abgesprungen wären.",
      ],
    },
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
    praxisTypen: [
      { slug: "seo-fuer-zahnaerzte", teaser: "Implantate, Aligner & Prophylaxe" },
      { slug: "seo-fuer-kieferorthopaeden", teaser: "Eltern-Recherche & Aligner-Suchen" },
      { slug: "seo-fuer-physiotherapeuten", teaser: "Selbstzahler, Kurse & lokale Suche" },
      { slug: "seo-fuer-heilpraktiker", teaser: "Vertrauensaufbau, rechtssicher" },
    ],
  },

  /* ── 02 · Anwälte ──────────────────────────────────────────────────────── */
  {
    slug: "seo-fuer-anwaelte",
    name: "SEO für Anwälte",
    kurzName: "Anwälte",
    keyword: "SEO für Anwälte",
    hebelVariant: "tafel",
    heroBildAlt: "Rechtsanwalt in seiner Kanzlei — organische Sichtbarkeit statt steigender Klickpreise",
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
    signatureTitle: { pre: "Jeder Klick kostet — ", grad: "außer dem organischen." },
    signatureCopy: [
      "In kaum einem Markt sind Google-Ads-Klicks so teuer wie im Kanzleimarkt: Je nach Rechtsgebiet kosten einzelne Klicks zweistellige Euro-Beträge — ohne Garantie, dass daraus ein Mandat wird.",
      "Organische Rankings holen dieselben Suchanfragen ohne laufende Klickkosten ab. Wir bauen Ihre Sichtbarkeit genau in den Rechtsgebieten auf, in denen sich das für Ihre Kanzlei am schnellsten rechnet.",
    ],
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
      {
        q: "Wie stellen Sie sicher, dass vertrauliche Informationen zu unserer Kanzlei nicht nach außen dringen?",
        a: "Wir arbeiten mit einem festen Ansprechpartner, der alle Absprachen zu Ihrer Kanzlei kennt, statt mit wechselnden Teammitgliedern ohne Kontext. Interne Unterlagen, Mandatszahlen oder strategische Überlegungen bleiben innerhalb dieses engen Kreises und werden nicht in größeren Team-Runden geteilt. Diese Vertraulichkeit gilt genauso für Zugänge zu Ihren Analyse-Tools, die nur die notwendigen Personen einsehen.",
      },
      {
        q: "Können Sie unterscheiden, ob eine Anfrage über die Website tatsächlich zu einem Mandat wird?",
        a: "Direkt nicht, das liegt in Ihrer Kanzlei-Software. Gemeinsam mit Ihnen lässt sich aber über die Herkunftsseite und das Such-Keyword nachvollziehen, welche Inhalte eher zu informativen Anfragen und welche eher zu konkreten Mandatsanfragen führen. Diese Rückmeldung aus Ihrer Praxis fließt in die weitere Content-Planung ein, damit wir die Themen priorisieren, die tatsächlich Mandate bringen.",
      },
    ],
    arbeitsweise: {
      titel: { pre: "Vertraulichkeit und Tempo ", grad: "als Prinzip." },
      intro:
        "Mandanten kontaktieren eine Kanzlei oft in einer Drucksituation, etwa nach einer Kündigung oder einer Abmahnung, bei der jeder Tag zählt. Laufen interne Abstimmungen zu Website-Inhalten wochenlang über eine Agentur-Warteschleife, gehen genau die dringendsten Anfragen verloren. Zugleich verlangt anwaltliche Arbeit einen Umgang mit Informationen, der keine Umwege über wechselnde Ansprechpartner verträgt. Unsere Arbeitsweise ist deshalb auf kurze Wege und feste Zuständigkeiten ausgelegt statt auf ein anonymes Ticketsystem.",
      saeulen: [
        {
          titel: "Recherche statt Fleißarbeit",
          text: "Für die Auswertung von Rechtsgebieten, Suchvolumen einzelner Fachbegriffe und Wettbewerbs-Kanzleien nutzen wir KI-gestützte Systeme, damit die Vorarbeit nicht Tage kostet. Die gewonnene Zeit fließt in die inhaltliche Prüfung jedes Rechtstextes, damit Formulierungen zu Leistungen und Rechtsgebieten sauber und nicht angreifbar sind.",
        },
        {
          titel: "Änderungen sofort online",
          text: "Ändert sich eine Rechtsprechung oder kommt ein neues Tätigkeitsfeld in der Kanzlei hinzu, muss die entsprechende Seite nicht erst die nächste Agentur-Runde abwarten. Über unsere CI/CD-Infrastruktur ist eine aktualisierte oder neue Rechtsgebiets-Seite innerhalb von Minuten live, was bei aktuellen rechtlichen Entwicklungen entscheidet, ob Sie die Anfragen dazu bekommen oder ein Wettbewerber.",
        },
        {
          titel: "Ein Ansprechpartner, keine Hotline",
          text: "Sie erreichen bei uns immer dieselbe Person, die Ihre Kanzlei und Ihre Rechtsgebiete kennt, nicht einen wechselnden Support-Mitarbeiter. Anfragen beantworten wir innerhalb von 24 Stunden, und Sie sehen dieselben Zahlen aus Google Search Console oder Semrush wie wir, ohne dass Kennzahlen erst aufbereitet werden müssen.",
        },
        {
          titel: "Bindung durch Ergebnisse",
          text: "Wir setzen keine langen Vertragslaufzeiten als Druckmittel ein, sondern zeigen jeden Monat nachvollziehbar, welche Rechtsgebiets-Seiten an Sichtbarkeit gewinnen. Kanzleien bleiben bei uns, weil die Mandatsanfragen spürbar werden, nicht weil ein Vertrag sie zur Fortsetzung zwingt.",
        },
      ],
      deployBeispiel: "neue rechtsgebiets-seite: arbeitsrecht",
    },
    tiefe: {
      titel: { pre: "Was das Such-Keyword ", grad: "über Mandanten verrät." },
      lead: "Nicht jede Anfrage, die über die Website hereinkommt, hat denselben Wert für eine Kanzlei. Ein Nutzer, der nach „Kündigung Muster Widerspruch“ sucht, will in den meisten Fällen ein kostenloses Dokument und ist noch nicht bereit, ein Mandat zu vergeben. Ein Nutzer, der dagegen nach „Fachanwalt Arbeitsrecht Kündigungsschutzklage Kosten“ sucht, hat sein Problem bereits eingeordnet und sucht konkret anwaltliche Vertretung. Beide Suchanfragen betreffen dasselbe Rechtsgebiet, führen aber zu völlig unterschiedlichen Anfragen, wenn sie auf der Website ankommen.",
      quote: "Eine Seite mit wenig Traffic, aber hoher Anfragequalität, ist für eine Kanzlei oft wertvoller als eine stark besuchte Seite, die nur Musterdokumente abruft.",
      spalten: [
        "Aus unserer Erfahrung lohnt es sich, beide Suchintentionen bewusst mit unterschiedlichen Seiten zu bedienen, statt alles auf eine allgemeine Rechtsgebiets-Seite zu lenken. Informative Inhalte zu Mustern, Fristen und Abläufen holen Mandanten früh ab und bauen Vertrauen auf, auch wenn daraus nicht sofort ein Mandat entsteht. Seiten, die konkret auf Kosten, Ablauf eines Verfahrens und die Rolle eines Fachanwalts eingehen, sprechen dagegen Nutzer an, die kurz vor der Entscheidung stehen, jemanden zu beauftragen. Wer beide Ebenen sauber trennt, kann auch das Kontaktformular und die Ansprache je nach Herkunftsseite unterschiedlich gestalten.",
        "Deshalb schauen wir nicht nur auf Rankings und Klickzahlen, sondern gemeinsam mit Ihnen darauf, welche Seiten tatsächlich zu Mandatsanfragen führen. Eine Seite mit wenig Traffic, aber hoher Anfragequalität, ist für eine Kanzlei oft wertvoller als eine stark besuchte Seite, die nur Musterdokumente abruft. Über die Zeit lässt sich so erkennen, welche Rechtsgebiete und welche Formulierungen tatsächlich zahlende Mandate bringen, statt nur Sichtbarkeit zu erzeugen. Diese Einordnung nehmen wir monatlich mit Ihnen vor, damit sich der redaktionelle Aufwand auf die Themen konzentriert, die sich für die Kanzlei auszahlen.",
      ],
    },
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
    hebelVariant: "stack",
    heroQuery: "laufschuhe damen neutral größe 39",
    heroBildAlt: "Shop-Betreiberin bereitet Bestellungen im Lager vor — mehr organische Bestellungen durch Shop-SEO",
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
        <Link href="/seo/optimierung" className={linkCls}>Shop-SEO</Link> bei uns kein Zusatzmodul, sondern eine
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
      {
        q: "Wie schnell können neue Produktkategorien auf unserer Website live gehen?",
        a: "Sobald die Struktur der Kategorie und die passenden Keywords feststehen, dauert die technische Umsetzung über unsere CI/CD-Infrastruktur meist nur wenige Tage, nicht Wochen. Bei kurzfristigen Aktionen mit knappem Zeitfenster stimmen wir direkt ab, welche Inhalte zuerst stehen müssen, damit die Seite zum Aktionsstart nutzbar ist. Die inhaltliche Feinarbeit an Texten und internen Verlinkungen folgt dann im laufenden Betrieb.",
      },
      {
        q: "Wie weit im Voraus sollten wir eine Saison wie Weihnachten oder den Sommerschlussverkauf planen?",
        a: "Aus unserer Erfahrung sollten bestehende Kategorie-Seiten mehrere Wochen vor Saisonbeginn überarbeitet werden, damit Google genug Zeit hat, die Änderungen einzustufen. Wer erst kurz vor dem eigentlichen Verkaufszeitraum beginnt, verschenkt organische Sichtbarkeit, die dann nur noch über bezahlte Anzeigen aufgefangen werden kann. Wir planen diesen Vorlauf gemeinsam mit Ihnen in den allgemeinen Content-Kalender ein.",
      },
    ],
    arbeitsweise: {
      titel: { pre: "SEO im Tempo ", grad: "Ihres Tagesgeschäfts." },
      intro:
        "Ein Online-Shop ändert sein Sortiment nicht einmal im Quartal, sondern oft mehrmals pro Woche: neue Produkte, auslaufende Varianten, kurzfristige Aktionen. Eine Agentur, die für jede neue Kategorie-Seite erst ein Ticket braucht und zwei Wochen auf Umsetzung, verpasst genau die Verkaufsfenster, die für Shops zählen. Deshalb ist unsere Arbeitsweise darauf ausgelegt, dass Änderungen am Shop so schnell umgesetzt werden, wie sich Ihr Sortiment tatsächlich bewegt.",
      saeulen: [
        {
          titel: "KI-gestützte Datenauswertung",
          text: "Bei hunderten oder tausenden Produkten übernehmen KI-Systeme die Voranalyse von Kategorie-Strukturen, Duplicate-Content-Risiken und Suchvolumen einzelner Produktgruppen, statt dass wir das händisch durchgehen. Die frei werdende Zeit investieren wir in die Feinarbeit an den Kategorie-Seiten, die den größten Umsatz bringen, statt in Tabellen-Pflege.",
        },
        {
          titel: "Neue Kategorie in Tagen",
          text: "Wird am Freitag eine neue Produktkategorie besprochen, kann die dazugehörige SEO-optimierte Seite über unsere CI/CD-Infrastruktur schon am Montag live sein, nicht erst nach der nächsten Sprint-Planung. Bei kurzfristigen Aktionen, etwa einem Restposten-Abverkauf, entscheidet dieser Unterschied direkt im Umsatz mit, ob die Seite zum Start der Aktion steht oder erst danach.",
        },
        {
          titel: "Direkter Draht ins Tagesgeschäft",
          text: "Bei uns betreut Sie durchgehend dieselbe Person, die Ihren Shop und Ihre Kategorie-Struktur kennt, statt ein Ticketsystem, das jede Anfrage neu einordnen muss. Rückfragen beantworten wir innerhalb von 24 Stunden, und Sie sehen in Search Console, Semrush oder Ahrefs dieselben Zahlen wie wir, ohne auf einen aufbereiteten Report zu warten.",
        },
        {
          titel: "Kein Lock-in, nur Zahlen",
          text: "Statt Shops über lange Vertragslaufzeiten zu binden, zeigen wir monatlich, welche Kategorie- und Produktseiten an organischem Traffic gewinnen. Shops bleiben bei uns, weil sich die Zahlen im Umsatz zeigen, nicht weil eine Kündigungsfrist im Weg steht.",
        },
      ],
      deployBeispiel: "neue kategorie: trailrunning-schuhe",
    },
    tiefe: {
      titel: { pre: "Saisonale Peaks ", grad: "organisch vorbereiten." },
      lead: "Die umsatzstärksten Wochen im Jahr, etwa vor Weihnachten oder beim Saisonwechsel, stehen bei den meisten Shops lange im Voraus fest. Trotzdem wird die organische Vorbereitung darauf oft vernachlässigt, weil sich Marketing-Budgets kurzfristig auf bezahlte Kampagnen konzentrieren. Google braucht für eine neue oder überarbeitete Seite aber Zeit, um sie ausreichend zu crawlen und einzustufen, bevor sie in der eigentlichen Saison noch Wirkung zeigt.",
      quote: "Wer erst Anfang Dezember an die Weihnachts-Kategorie denkt, kommt für die organische Sichtbarkeit in diesem Jahr meist zu spät.",
      spalten: [
        "Aus unserer Erfahrung lohnt sich ein fester Vorlauf von mehreren Wochen, oft zwei bis drei Monaten, vor jeder Saison, in dem bestehende Kategorie-Seiten inhaltlich aufgefrischt und um saisonale Suchbegriffe ergänzt werden, statt eine komplett neue Seite aus dem Nichts zu bauen. Eine bereits gut rankende Kategorie-Seite, die um saisonale Absätze erweitert wird, behält ihre bestehende Autorität bei Google und gewinnt zusätzlich die Saison-Suchen dazu. Neue Seiten kurz vor dem Peak aufzusetzen, ist dagegen riskant, weil ihnen die Zeit fehlt, sich zu etablieren. Diesen Rhythmus planen wir gemeinsam mit Ihnen über das Jahr, damit die Vorbereitung nicht mit dem laufenden Tagesgeschäft kollidiert.",
        "Nach der Saison lassen viele Shops die Aktionsseiten einfach online stehen, ohne sie zu pflegen, wodurch Google mit der Zeit veraltete oder leere Seiten indexiert, die dem Ranking eher schaden als nutzen. Wir legen deshalb vorher fest, welche Seiten nach der Saison archiviert, welche dauerhaft mit reduziertem Inhalt bestehen bleiben und welche im nächsten Jahr wiederverwendet werden. Diese Struktur sauber zu halten, ist genauso wichtig wie der Aufbau vor der Saison, weil sich sonst über mehrere Jahre ein Friedhof toter Aktionsseiten ansammelt. So bleibt die Seitenstruktur auch nach mehreren Saisons noch nachvollziehbar für Google und für Ihr eigenes Team.",
      ],
    },
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
    hebelVariant: "tafel",
    heroQuery: "heizung notdienst wochenende",
    heroBildAlt: "Handwerker mit Werkzeug im Einsatz — gefunden werden, wenn Kunden lokal nach einem Betrieb suchen",
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
      {
        q: "Lohnt sich eine eigene Karriere-Seite für einen kleinen Handwerksbetrieb überhaupt?",
        a: "Ja, gerade weil viele kleine Betriebe darauf verzichten und damit eine Lücke lassen, die Sie besetzen können. Schon eine einfache Unterseite mit echten Einblicken in Ihren Betrieb reicht oft aus, um bei lokalen Ausbildungs- oder Stellensuchen aufzutauchen. Der Aufwand ist gering, weil wir dafür dieselbe lokale SEO-Struktur nutzen, die für Ihre Kundenseiten ohnehin aufgebaut wird.",
      },
      {
        q: "Müssen wir für neue Inhalte extra Fotos oder Texte liefern, obwohl wir kaum Zeit dafür haben?",
        a: "Ein wenig Material von Ihnen brauchen wir immer, etwa ein paar Baustellenfotos oder zwei, drei Sätze zu einem abgeschlossenen Projekt. Den Rest, also Aufbereitung, Formulierung und technische Umsetzung, übernehmen wir eigenständig, damit der Aufwand für Sie minimal bleibt. In der Regel reicht ein kurzer Austausch alle paar Wochen, um genug Substanz für neue Inhalte zu haben.",
      },
    ],
    arbeitsweise: {
      titel: { pre: "SEO, das ", grad: "zur Baustelle passt." },
      intro:
        "Ein Handwerksbetrieb sitzt selten im Büro vor dem Rechner, sondern auf der Baustelle, im Kundentermin oder im Lieferwagen zwischen zwei Einsätzen. Lange Abstimmungs-Calls oder mehrseitige Freigabe-Dokumente passen nicht in diesen Alltag, weil dafür schlicht die Zeit fehlt. Unsere Arbeitsweise ist deshalb auf kurze, klare Rückfragen ausgelegt, die auch abends nach Feierabend in wenigen Minuten zu beantworten sind. Ein eigenes Marketing-Team gibt es in den seltensten Fällen, also übernehmen wir die laufende Pflege eigenständig und melden uns nur, wenn wirklich eine Entscheidung gefragt ist.",
      saeulen: [
        {
          titel: "Weniger Papierkram, mehr Substanz",
          text: "Die Auswertung von lokalen Suchbegriffen nach Gewerk und Einzugsgebiet sowie die Vorbereitung von Referenz-Texten übernehmen bei uns KI-gestützte Systeme, damit nicht jede Fleißarbeit manuell erledigt werden muss. Die gewonnene Zeit fließt in handfeste Inhalte wie echte Projektbeschreibungen und Vorher-Nachher-Vergleiche, die bei Handwerksbetrieben tatsächlich Vertrauen schaffen.",
        },
        {
          titel: "Neue Leistung schnell sichtbar",
          text: "Nehmen Sie ein neues Gewerk ins Programm auf, etwa Wärmepumpen-Installation neben der klassischen Heizungswartung, geht die entsprechende Seite über unsere CI/CD-Infrastruktur innerhalb von Minuten live. Sie warten damit nicht erst auf den nächsten Agentur-Termin, während die Anfragen für die neue Leistung schon bei der Konkurrenz landen.",
        },
        {
          titel: "Erreichbar, wann es passt",
          text: "Bei uns haben Sie eine feste Ansprechperson, die Ihren Betrieb und Ihre Region kennt, statt eine wechselnde Hotline-Nummer. Wir antworten innerhalb von 24 Stunden, auch wenn die Nachricht erst abends nach Feierabend rausgeht, und Sie sehen dieselben Zahlen aus Google Search Console wie wir.",
        },
        {
          titel: "Bleiben, weil es funktioniert",
          text: "Wir setzen bei Handwerksbetrieben nicht auf lange Vertragsbindung, sondern zeigen jeden Monat, wie sich Anfragen und Sichtbarkeit für Ihr Gewerk entwickeln. Betriebe bleiben bei uns, weil das Telefon klingelt, nicht weil eine Kündigungsfrist sie festhält.",
        },
      ],
      deployBeispiel: "neue leistungsseite: wärmepumpen-installation",
    },
    tiefe: {
      titel: { pre: "Warum die Website ", grad: "auch Bewerber überzeugt." },
      lead: "Der Fachkräftemangel trifft kaum eine Branche so unmittelbar wie das Handwerk: Wer heute einen Gesellen oder Auszubildenden sucht, konkurriert mit jedem anderen Betrieb im Umkreis um dieselbe kleine Zahl an Bewerbern. Bewerber informieren sich dabei genauso über Google wie Kunden, oft mit Suchen wie „Ausbildung Elektriker“ oder „Zimmerer Stellenangebote“ in Kombination mit dem eigenen Ort. Eine Website, die nur auf Kundenanfragen ausgelegt ist und keine erkennbare Karriere-Seite hat, taucht in diesen Suchen gar nicht auf.",
      quote: "Damit verschenkt ein Betrieb einen Kanal, der ohnehin schon vorhanden ist, nur eben ungenutzt.",
      spalten: [
        "Der praktische Vorteil dabei ist, dass Recruiting-Inhalte denselben lokalen Unterbau nutzen können, der ohnehin für die Kundengewinnung aufgebaut wird. Eine Seite, die Ihren Betrieb, Ihr Team und Ihre Region beschreibt, lässt sich mit wenig Zusatzaufwand um eine Karriere-Unterseite erweitern, die dieselben lokalen Signale mitnutzt. Fotos von echten Baustellen, kurze Statements aktueller Mitarbeiter oder ein ehrlicher Einblick in den Arbeitsalltag wirken bei Bewerbern glaubwürdiger als eine austauschbare Stellenanzeige auf einem Jobportal. Wir bauen diese Seiten deshalb bewusst mit denselben redaktionellen Mitteln wie die Kunden-Leistungsseiten, nur mit einer anderen Zielgruppe vor Augen.",
        "Für Betriebe, die bisher jede offene Stelle über kostenpflichtige Jobportale ausschreiben, ist eine gut auffindbare Karriere-Seite auf Dauer der günstigere Weg, weil Bewerbungen direkt und ohne Portal-Gebühr hereinkommen. Wir behandeln diesen Recruiting-Effekt nicht als separates Projekt, sondern als Nebeneffekt derselben lokalen SEO-Arbeit, die für Kundenanfragen ohnehin läuft. In der monatlichen Auswertung schauen wir deshalb neben Kundenanfragen auch darauf, wie sich Zugriffe auf die Karriere-Seite entwickeln, sofern das für Ihren Betrieb relevant ist. So wird aus einer Investition in Sichtbarkeit ein doppelter Nutzen, ohne zusätzlichen Aufwand auf Ihrer Seite.",
      ],
    },
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
    hebelVariant: "stack",
    heroBildAlt: "Immobilienmakler bei der Objektbesichtigung — Eigentümer-Anfragen über die eigene Website statt über Portale",
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
      {
        q: "Bringen Stadtteilseiten wirklich mehr als nur einzelne Objektseiten?",
        a: "Objektseiten bringen kurzfristig Anfragen zu einem bestimmten Objekt, verschwinden danach aber wieder. Stadtteilseiten bleiben dauerhaft bestehen und bauen über die Zeit eine Position als lokaler Ansprechpartner für eine Region auf, was besonders dem Empfehlungsgeschäft zugutekommt. Aus unserer Erfahrung wirken beide Seitentypen am besten in Kombination, nicht als Ersatz füreinander.",
      },
    ],
    arbeitsweise: {
      titel: { pre: "So schnell wie ", grad: "Ihr Objektbestand." },
      intro:
        "Ein Objekt ist manchmal innerhalb weniger Tage verkauft oder vermietet, während ein anderes wochenlang online bleibt und aktiv beworben werden muss. Diese Geschwindigkeit verträgt sich schlecht mit einer Agentur, die für jede Änderung an der Website erst ein Ticket eröffnet und auf den nächsten Sprint wartet. Unsere Arbeitsweise ist deshalb darauf ausgelegt, dass Exposés und Objektseiten genauso schnell online oder wieder offline gehen, wie sich Ihr Bestand tatsächlich verändert.",
      saeulen: [
        {
          titel: "Objektdaten automatisch aufbereitet",
          text: "Die Vorbereitung von Objektbeschreibungen für die Suchmaschinen-Optimierung, etwa die Einordnung nach Lage, Objekttyp und Preissegment, übernehmen bei uns KI-Systeme in einem ersten Schritt. Die frei werdende Zeit investieren wir in die inhaltliche Feinarbeit an Ihren stärksten Objekten und in lokale Inhalte, die über einzelne Exposés hinaus wirken.",
        },
        {
          titel: "Schnell online, schnell offline",
          text: "Ist ein Objekt verkauft, muss die Seite dazu nicht tagelang online bleiben und falsche Erwartungen wecken. Über unsere CI/CD-Infrastruktur ist eine Objektseite innerhalb von Minuten offline oder ein neues Exposé live, was bei einem schnelllebigen Bestand über eine aktuelle oder eine veraltete Website entscheidet.",
        },
        {
          titel: "Direkter Draht statt Hotline",
          text: "Auch hier begleitet Sie durchgehend eine feste Ansprechperson, die Ihr Portfolio und Ihre Zielregionen kennt, statt eine wechselnde Support-Warteschleife. Anfragen beantworten wir innerhalb von 24 Stunden, und Sie sehen in Search Console oder Semrush dieselben Zahlen wie wir, ohne auf einen aufbereiteten Bericht zu warten.",
        },
        {
          titel: "Ergebnisse statt Vertragsdruck",
          text: "Statt langer Laufzeiten zählen bei uns die monatlichen Ergebnisse: wie sich Sichtbarkeit für einzelne Objekte und für Ihre Region insgesamt entwickelt. Makler bleiben bei uns, weil sich mehr qualifizierte Anfragen zeigen, nicht weil ein Vertrag sie zur Fortsetzung zwingt.",
        },
      ],
      deployBeispiel: "neues exposé: 3-zimmer-wohnung altbau",
    },
    tiefe: {
      titel: { pre: "Lokaler Content ", grad: "und das Empfehlungsgeschäft." },
      lead: "Ein großer Teil neuer Mandate im Maklergeschäft kommt über Empfehlungen zustande, oft von früheren Kunden oder aus dem persönlichen Umfeld. Was dabei häufig übersehen wird: Bevor jemand eine Empfehlung tatsächlich anruft, sucht er den empfohlenen Makler in aller Regel zuerst bei Google, um sich einen Eindruck zu verschaffen. Findet die empfohlene Person dabei nur eine dünne Kontaktseite ohne echten Bezug zur Region, entsteht Unsicherheit, selbst wenn die persönliche Empfehlung eigentlich schon überzeugt hätte. Lokaler Content wirkt hier also nicht nur für die eigene Auffindbarkeit in Google, sondern auch als Bestätigung für bereits vorhandenes Vertrauen aus dem Empfehlungsgeschäft.",
      quote: "Wer als Makler in einer Region regelmäßig zu Marktentwicklungen sichtbar ist, wird von Empfehlungen häufiger bestätigt als jemand, der nur über einzelne Exposés auffindbar ist.",
      spalten: [
        "Objektseiten allein reichen dafür nicht aus, weil sie naturgemäß verschwinden, sobald das Objekt verkauft ist. Wirksamer sind dauerhafte Seiten zu einzelnen Stadtteilen oder Ortschaften, die zeigen, dass Sie den lokalen Markt tatsächlich kennen, etwa Preisentwicklungen, Besonderheiten einzelner Lagen oder Infrastruktur-Themen, die für Käufer und Verkäufer relevant sind. Diese Seiten bleiben bestehen, unabhängig davon, welches konkrete Objekt gerade im Angebot ist, und bauen über die Zeit eine Position als lokaler Experte auf. Wer als Makler in einer Region regelmäßig zu Marktentwicklungen sichtbar ist, wird von Empfehlungen häufiger bestätigt als jemand, der nur über einzelne Exposés auffindbar ist.",
        "Aus unserer Erfahrung lohnt sich deshalb eine klare Aufteilung: Objektseiten für das aktuelle Geschäft und stadtteilbezogene Inhalte für die langfristige Positionierung als Ansprechpartner in der Region. Beide Ebenen ergänzen sich, weil Objektseiten kurzfristig Anfragen bringen, während die stadtteilbezogenen Seiten über Monate hinweg Vertrauen aufbauen, das Empfehlungen erst wirksam werden lässt. Wir planen deshalb von Anfang an beide Content-Ebenen ein, statt uns ausschließlich auf den aktuellen Objektbestand zu konzentrieren. Über ein Jahr betrachtet zahlt genau diese Kombination am stärksten auf das Empfehlungsgeschäft ein.",
      ],
    },
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
    hebelVariant: "editorial",
    heroBildAlt: "SaaS-Gründerin am Laptop — Software-Sichtbarkeit in Google und in KI-Suchen wie ChatGPT",
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
    signatureTitle: { pre: "Wenn die KI antwortet, ", grad: "muss Ihre Software vorkommen." },
    signatureCopy: [
      "Immer mehr B2B-Einkäufer fragen ChatGPT oder Perplexity direkt nach einer Tool-Empfehlung, statt zehn Google-Tabs zu vergleichen. Die KI nennt dabei nur Anbieter, deren Inhalte sie kennt und einordnen kann.",
      "Wir bereiten Problem-, Vergleichs- und Use-Case-Seiten so auf, dass Ihre Software in diesen Antworten auftaucht — und in der klassischen Google-Suche gleich mit.",
    ],
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
      {
        q: "Wie stimmen Sie Content-Themen mit unserer Produkt-Roadmap ab, wenn sich Features wöchentlich ändern?",
        a: "Wir richten uns nach Ihrem Release-Kalender, nicht nach einem starren Redaktionsplan. Vor einem größeren Feature-Release bereiten wir die passende Seite so vor, dass sie zeitgleich mit der Ankündigung live gehen kann, statt erst Wochen später nachzuziehen. Kleinere Anpassungen bestehender Seiten laufen fortlaufend mit, ohne dass jedes Mal ein komplettes Abstimmungs-Meeting notwendig ist.",
      },
      {
        q: "Ab welchem Punkt lohnt sich SEO als Hauptkanal für ein SaaS-Produkt?",
        a: "Am ehesten dann, wenn Ihr Produkt sein Kernproblem und seine Zielgruppe bereits klar definiert hat, weil Content sonst an den falschen Suchanfragen vorbeigeht. Vor diesem Punkt ergänzt SEO meist bezahlte Kanäle, statt sie zu ersetzen, weil der Aufbau von Rankings Zeit braucht. Wir schauen uns das gemeinsam mit Ihnen an, bevor wir SEO als zentralen Wachstumskanal einplanen.",
      },
    ],
    arbeitsweise: {
      titel: { pre: "Im Rhythmus ", grad: "Ihrer Feature-Releases." },
      intro:
        "Ein SaaS-Produkt verändert sich in Wochenzyklen: neue Features, veränderte Preismodelle, manchmal ein komplettes Rebranding einzelner Funktionen. Eine Website-Betreuung, die in Quartalsplänen denkt, hält mit diesem Tempo nicht mit und lässt Content-Seiten veraltet aussehen, noch bevor sie richtig gewirkt haben. Teams, die selbst in Sprints arbeiten, erwarten zu Recht, dass auch die SEO-Arbeit iterativ und schnell reagierend läuft, statt in starren Abstimmungsrunden steckenzubleiben. Unsere Arbeitsweise orientiert sich deshalb an Ihrem Produkt-Rhythmus statt an einem festen Agentur-Kalender.",
      saeulen: [
        {
          titel: "Skalierbare Content-Vorarbeit",
          text: "Bei der Auswertung von Feature-bezogenen Keywords, Wettbewerbs-Vergleichsseiten und Nutzer-Fragen aus Foren oder Reviews setzen wir KI-Systeme für die erste Sichtung ein, damit die Recherche nicht zum Flaschenhals wird. Die gewonnene Zeit fließt in die strategische Einordnung, welche Inhalte tatsächlich zur Produkt-Roadmap passen und welche nur kurzfristig Traffic ohne echten Nutzen bringen würden.",
        },
        {
          titel: "Feature-Seite sofort live",
          text: "Bringen Sie ein neues Feature oder eine neue Integration heraus, muss die dazugehörige Landingpage nicht erst durch einen mehrwöchigen Agentur-Prozess. Über unsere CI/CD-Infrastruktur geht eine vorbereitete Seite innerhalb von Minuten live, synchron zum Produkt-Release statt Wochen danach, wenn das Momentum aus Ankündigung und Presse bereits verpufft ist.",
        },
        {
          titel: "Direkte Abstimmung mit Ihnen",
          text: "Sie haben bei uns eine feste Ansprechperson, die sich in Ihr Produkt einarbeitet, statt ein Support-Ticket-System, das jede Anfrage neu erklären lässt. Wir antworten innerhalb von 24 Stunden, und Sie sehen in Search Console, Semrush oder Ahrefs dieselben Daten wie wir, was die Abstimmung mit Ihrem eigenen Marketing- oder Produktteam direkt vereinfacht.",
        },
        {
          titel: "Ergebnisse statt Laufzeitbindung",
          text: "Wir binden SaaS-Kunden nicht über lange Vertragslaufzeiten, sondern zeigen monatlich nachvollziehbar, welche Seiten organischen Traffic und qualifizierte Signups bringen. Teams bleiben bei uns, weil sich der Kanal sichtbar entwickelt, nicht weil ein Vertrag sie zum Bleiben zwingt.",
        },
      ],
      deployBeispiel: "neue feature-seite: slack-integration",
    },
    tiefe: {
      titel: { pre: "SEO als günstigster Kanal ", grad: "auf Dauer." },
      lead: "Bei bezahlten Kanälen wie Google Ads oder Paid Social steigen die Kosten in etwa proportional zur Zahl der gewonnenen Nutzer: Jeder zusätzliche Klick, jeder zusätzliche Trial-Signup kostet erneut Budget, unabhängig davon, wie lange die Kampagne schon läuft. Bei einer einmal gut rankenden Seite sieht dieser Zusammenhang anders aus, weil die laufenden Kosten für einen bestehenden Rang nicht automatisch mit steigendem Traffic mitwachsen. Dieser Unterschied macht sich besonders bemerkbar, sobald ein SaaS-Produkt über die frühe Wachstumsphase hinaus ist und Volumen wichtiger wird als reine Geschwindigkeit.",
      quote: "Eine Feature-Vergleichsseite, die einmal für ein relevantes Keyword oben steht, bringt in der Regel weiterhin Besucher, ohne dass für jeden einzelnen Besucher erneut bezahlt werden muss.",
      spalten: [
        "Dieser Effekt stellt sich nicht sofort ein, sondern erst, nachdem eine Seite genug Zeit hatte, sich in den Suchergebnissen zu etablieren, was bei SaaS-relevanten Keywords oft mehrere Monate dauert. Deshalb eignet sich SEO als Hauptkanal vor allem für Produkte, die ihre Zielgruppe und ihr Kernproblem bereits verstanden haben, weil sonst Aufwand in Inhalte fließt, die am eigentlichen Käufer vorbeigehen. Wichtig ist außerdem, welche Keywords bedient werden: Eine Seite zu einem generischen Begriff mit hohem Suchvolumen bringt oft viele Besucher, aber wenige mit echter Kaufabsicht, während eine Seite zu einem spezifischen Vergleich oder Anwendungsfall weniger, aber deutlich passendere Besucher bringt. Für SaaS-Produkte lohnt sich deshalb meist die spezifischere Variante zuerst, auch wenn das Suchvolumen kleiner aussieht.",
        "In der Praxis ergänzt SEO deshalb zunächst die bezahlten Kanäle, statt sie zu ersetzen, weil der Aufbau organischer Rankings Zeit braucht, die ein Launch oft nicht hat. Mit der Zeit verschiebt sich der Anteil neuer Signups aber zunehmend in Richtung organischer Kanäle, ohne dass das Marketing-Budget im gleichen Tempo mitwachsen muss. Diese Verschiebung schafft Spielraum, das freiwerdende Budget gezielt in andere Kanäle oder in tiefere Produktentwicklung zu stecken, statt es weiter in denselben bezahlten Kanal zu stecken, der mit dem Wachstum automatisch teurer wird. Wir planen deshalb von Anfang an mit Ihrem Team, wie sich dieser Übergang über die Zeit gestalten lässt, statt SEO isoliert von der übrigen Marketing-Strategie zu betrachten.",
      ],
    },
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

  /* ── 07 · Zahnärzte (Praxis-Typ-Spoke unter Ärzte) ─────────────────────── */
  {
    slug: "seo-fuer-zahnaerzte",
    praxisTyp: true,
    name: "SEO für Zahnärzte",
    kurzName: "Zahnärzte",
    keyword: "SEO für Zahnärzte",
    hebelVariant: "tafel",
    heroQuery: "zahnarzt implantat kosten",
    heroBildAlt: "Zahnärztin bespricht eine Behandlung mit einer Patientin am Behandlungsstuhl — Sichtbarkeit für Zahnarztpraxen",
    signature: {
      variant: "klickpreise",
      panelTitle: "Klickkosten je Behandlung",
      hinweis: "Google Ads — Klickpreis-Niveau, illustrativ",
      rows: [
        { gebiet: "Implantologie", breite: 94, wert: "€€€€" },
        { gebiet: "Aligner / Zahnspange", breite: 78, wert: "€€€" },
        { gebiet: "Zahnersatz", breite: 60, wert: "€€€" },
        { gebiet: "Prophylaxe / PZR", breite: 42, wert: "€€" },
      ],
      fazit: "Organisches Ranking",
      fazitWert: "0 € pro Klick",
    },
    signatureTitle: { pre: "Die teuersten Klicks der Medizin — ", grad: "oder organische Sichtbarkeit." },
    signatureCopy: [
      "Kaum ein medizinischer Bereich ist bei Google Ads so teuer umkämpft wie die Zahnmedizin: Bei Implantat- und Aligner-Suchen bieten Praxen, Zahnkliniken und Ketten gleichzeitig auf dieselben Klicks.",
      "Organische Rankings holen dieselben Patienten ohne laufende Klickkosten ab. Wir bauen Ihre Sichtbarkeit gezielt bei den Behandlungen auf, die für Ihre Praxis wirtschaftlich am meisten zählen.",
    ],
    h1: {
      pre: "SEO für Zahnärzte: Gefunden werden bei ",
      grad: "Implantat, Aligner und Prophylaxe",
    },
    subline:
      "Patienten vergleichen Zahnärzte so aktiv wie in kaum einem anderen Fach: Sie googeln Kosten, Abläufe und Erfahrungen, lange bevor sie anrufen. Wir sorgen dafür, dass Ihre Praxis genau in dieser Recherche auftaucht — in Google, auf Maps und in KI-Antworten.",
    ctaLabel: "Kostenlose SEO-Analyse für Ihre Zahnarztpraxis",
    warumTitle: { pre: "Warum SEO ", grad: "für Zahnärzte" },
    warumAbsaetze: [
      <>
        Die Zahnmedizin ist die am stärksten privatwirtschaftlich geprägte Fachrichtung: Implantate,
        Aligner-Behandlungen, Bleaching und professionelle Zahnreinigung sind Leistungen, die Patienten selbst
        bezahlen — und genau deshalb vergleichen sie vorher gründlich. Gesucht wird „Implantat Kosten pro
        Zahn“, „unsichtbare Zahnspange Erfahrungen“ oder „Zahnarzt Angstpatienten“, fast nie ein Praxisname.
        In den Suchergebnissen konkurrieren Sie dabei nicht nur mit der Praxis nebenan, sondern mit
        Zahnkliniken, Praxisketten, Dental-Start-ups und großen Portalen, die alle in dieselben Suchbegriffe
        investieren. Wer dort nicht sichtbar ist, findet in der Recherchephase der Patienten schlicht nicht
        statt.
      </>,
      <>
        Dazu kommt: Bei kaum einer Arztwahl wiegen Bewertungen und der erste Eindruck der Website so schwer
        wie beim Zahnarzt — viele Patienten bringen eine gewisse Anspannung mit und suchen aktiv nach
        Signalen, dass sie in guten Händen sind. Eine Praxis-Website, die Behandlungen verständlich erklärt,
        Kostenfragen offen beantwortet und moderne Abläufe zeigt, baut genau dieses Vertrauen auf, bevor der
        erste Kontakt entsteht. Weil sich Behandlungsspektrum, Google-Anforderungen und Wettbewerb laufend
        verschieben, verstehen wir Zahnarzt-SEO nicht als einmaliges Projekt, sondern als{" "}
        <Link href="/seo/betreuung" className={linkCls}>laufende SEO-Betreuung</Link>, die Ihre Sichtbarkeit
        Monat für Monat ausbaut.
      </>,
    ],
    split: {
      bild: "/images/branchen-split/zahnaerzte.jpg",
      bildAlt: "Patientin recherchiert Zahnbehandlungs-Kosten auf dem Smartphone",
      caption: "Kosten-Recherche am Abend — hier entscheidet sich, welche Praxis angerufen wird",
      bildLinks: false,
      titel: { pre: "Sichtbar in der Recherche, ", grad: "nicht erst beim Anruf." },
      absaetze: [
        <>
          Ein Implantat-Patient recherchiert oft über Wochen: Was kostet ein Implantat? Was zahlt die Kasse?
          Wie läuft die Behandlung ab, welche Risiken gibt es? Wer in dieser Phase mit verständlichen,
          ehrlichen Antworten präsent ist, steht auf der inneren Liste des Patienten — lange bevor er zum
          Telefon greift. Praxen, die nur eine knappe Leistungsübersicht online haben, überlassen diese
          entscheidende Phase den Portalen und Ketten.
        </>,
        <>
          Genau dafür bauen wir Behandlungsseiten, die Kosten, Ablauf und häufige Patientenfragen sauber
          beantworten — medizinisch korrekt und werberechtlich auf der sicheren Seite. Die Texte schreiben wir
          als{" "}
          <Link href="/seo/texte" className={linkCls}>medizinische SEO-Texte</Link>, die Fachkompetenz zeigen,
          ohne Heilversprechen zu machen.
        </>,
      ],
    },
    vorgehenTitle: { pre: "So gehen wir ", grad: "bei Zahnärzten vor." },
    vorgehen: [
      {
        titel: "Behandlungs-Portfolio und Wettbewerb analysieren",
        text: "Wir prüfen, welche Ihrer Behandlungen das größte Suchvolumen und die stärkste wirtschaftliche Bedeutung haben — und wer in Ihrem Einzugsgebiet dafür bereits rankt. Daraus entsteht eine klare Reihenfolge, welche Behandlungsseiten zuerst gebaut werden, statt alles gleichzeitig anzufangen.",
      },
      {
        titel: "Behandlungsseiten mit Kosten-Transparenz",
        text: "Für Implantate, Aligner, Zahnersatz und Prophylaxe entstehen eigene Seiten, die auch die Kostenfrage offen behandeln — denn genau danach suchen Patienten. Preisspannen und Abrechnungslogik lassen sich seriös erklären, ohne verbindliche Heilkostenzusagen zu machen.",
      },
      {
        titel: "Lokales Profil und Bewertungen ausbauen",
        text: "Ihr Google-Unternehmensprofil wird vollständig gepflegt und mit den Behandlungsseiten verzahnt, damit Ihre Praxis bei „Zahnarzt in meiner Nähe“-Suchen im Kartenausschnitt erscheint. Parallel richten wir einen unaufdringlichen, standesrechtlich sauberen Bewertungsprozess ein.",
      },
      {
        titel: "Ausbauen, messen, nachschärfen",
        text: "Rankings, Anfragen und Suchtrends werden monatlich ausgewertet: Welche Behandlungsseite zieht, wo lohnt eine Vertiefung, welche neue Leistung verdient eine eigene Seite? So wächst die Sichtbarkeit Schritt für Schritt mit Ihrer Praxis mit.",
      },
    ],
    fehlerVariant: "editorial",
    fehler: [
      {
        titel: "Eine Sammelseite für zwanzig Behandlungen",
        text: "Viele Praxis-Websites listen das komplette Spektrum auf einer einzigen „Leistungen“-Seite. Für Google ist das ein einziges schwaches Signal statt zwanzig starker — und für Patienten, die nach einer konkreten Behandlung suchen, ein Grund weiterzuklicken.",
      },
      {
        titel: "Die Kostenfrage wird gemieden",
        text: "Aus Sorge, sich festzulegen, schweigen viele Praxen online komplett zu Preisen. Patienten suchen aber genau danach — und landen dann bei Portalen, Ketten und Aligner-Anbietern, die Preisspannen offen kommunizieren. Seriöse Kosten-Orientierung ist möglich, ohne verbindliche Zusagen zu machen.",
      },
      {
        titel: "Das Bewertungsprofil bleibt sich selbst überlassen",
        text: "Wenige, alte oder unbeantwortete Bewertungen wirken bei einer Vertrauensentscheidung wie der Zahnarztwahl schwerer als in fast jeder anderen Branche. Ein stiller, sauberer Prozess, der zufriedene Patienten um Feedback bittet, verändert das Profil über Monate grundlegend.",
      },
      {
        titel: "Die Website begrüßt, statt zu beantworten",
        text: "„Herzlich willkommen in unserer Praxis“ beantwortet keine einzige Suchanfrage. Wer stattdessen die echten Fragen der Patienten aufgreift — Kosten, Ablauf, Schmerzen, Alternativen — wird gefunden und beweist Kompetenz im selben Schritt.",
      },
    ],
    hebel: [
      {
        titel: "Eigene Seite je Privatleistung",
        text: "Implantologie, Aligner, Bleaching, PZR: Jede wirtschaftlich relevante Behandlung bekommt eine eigene, ausführliche Seite mit Ablauf, Kosten-Orientierung und häufigen Fragen. Das trifft die konkreten Suchanfragen der Patienten deutlich besser als jede Sammelübersicht.",
      },
      {
        titel: "Kosten-Content als Vertrauenshebel",
        text: "Suchanfragen rund um Behandlungskosten gehören zu den häufigsten im Dentalbereich. Wer sie offen und seriös beantwortet, gewinnt genau die Patienten, die gerade vergleichen — und nimmt den Ketten und Portalen ihren größten Vorteil.",
      },
      {
        titel: "Lokale Dominanz im Kartenausschnitt",
        text: "Google-Unternehmensprofil, konsistente Praxisdaten und ein lebendiges Bewertungsprofil entscheiden darüber, ob Ihre Praxis bei lokalen Suchen im Maps-Pack erscheint. Wir richten diese Signale systematisch aus, statt sie dem Zufall zu überlassen.",
      },
      {
        titel: "Fachautorität sichtbar machen",
        text: "Qualifikationen, Tätigkeitsschwerpunkte und Fortbildungen der Behandler werden strukturiert auf der Website und im technischen Markup hinterlegt. Das stärkt die E-E-A-T-Signale, die Google bei medizinischen Inhalten verlangt — und beruhigt unsichere Patienten.",
      },
    ],
    faq: [
      {
        q: "Wie schnell wird unsere Zahnarztpraxis bei Google sichtbarer?",
        a: "Technische Korrekturen und das Google-Unternehmensprofil wirken oft innerhalb weniger Wochen, neue Behandlungsseiten brauchen je nach Wettbewerb einige Monate, bis sie stabil ranken. Seriöse Ranking-Garantien gibt es nicht — wir arbeiten mit messbaren Zwischenzielen und zeigen Ihnen monatlich, was sich bewegt hat.",
      },
      {
        q: "Lohnt sich SEO neben Doctolib und Jameda überhaupt noch?",
        a: "Gerade deshalb: Buchungsportale sind praktisch für die Terminvergabe, aber die Sichtbarkeit dort gehört dem Portal, nicht Ihnen. Eine eigene Website, die bei Behandlungssuchen rankt, ist ein Vermögenswert Ihrer Praxis — und reduziert Schritt für Schritt die Abhängigkeit von Premiumprofilen und Portal-Logik.",
      },
      {
        q: "Dürfen wir Behandlungskosten auf der Website nennen?",
        a: "Preisspannen und die Logik der Abrechnung lassen sich seriös darstellen, solange keine pauschalen Festpreise für heilkundliche Leistungen versprochen werden, die individuell kalkuliert werden müssen. Genau diese Orientierung suchen Patienten — wir formulieren das so, dass es informativ bleibt und werberechtlich sauber ist.",
      },
      {
        q: "Was ist mit Werbebeschränkungen — was dürfen wir überhaupt sagen?",
        a: "Das Heilmittelwerbegesetz und das zahnärztliche Berufsrecht setzen klare Grenzen: keine Erfolgsversprechen, keine Angstwerbung, Zurückhaltung bei Vorher-Nachher-Darstellungen. Wir beschreiben Behandlungen sachlich über Ablauf, Nutzen und Indikation. Bei heiklen Themen empfehlen wir zusätzlich eine kurze Prüfung durch Ihre Rechtsberatung.",
      },
      {
        q: "Wir konkurrieren mit Aligner-Start-ups und Zahnklinik-Ketten. Hat eine einzelne Praxis da eine Chance?",
        a: "Ja — gerade lokal. Ketten und Start-ups ranken für generische Begriffe, aber bei „Behandlung + Stadt“-Suchen und in der Kartensuche gewinnt die Praxis mit starkem lokalem Profil, echten Bewertungen und spezifischen Behandlungsseiten. Genau dort setzen wir an, statt den Ketten auf ihrem Feld hinterherzulaufen.",
      },
      {
        q: "Können Sie uns beim Aufbau von Google-Bewertungen helfen?",
        a: "Ja. Wir richten einen Prozess ein, mit dem zufriedene Patienten nach dem Termin unaufdringlich um eine Bewertung gebeten werden — per QR-Karte an der Rezeption oder Follow-up-Nachricht, im Einklang mit dem Standesrecht. Auf kritische Bewertungen reagieren wir gemeinsam sachlich, statt sie stehen zu lassen.",
      },
      {
        q: "Was kostet SEO für eine Zahnarztpraxis?",
        a: "Das hängt von Ausgangslage, Einzugsgebiet und Behandlungsspektrum ab — eine Praxis in einer Großstadt mit Implantologie-Schwerpunkt braucht mehr als eine Landpraxis. Nach der kostenlosen Erstanalyse erhalten Sie ein konkretes Angebot mit klarem Leistungsumfang. Unsere Betreuung ist monatlich kündbar — wir binden über Ergebnisse, nicht über Laufzeiten.",
      },
      {
        q: "Wie viel Zeit kostet das unser Praxisteam?",
        a: "Wenig. Die Abstimmung läuft über kurze schriftliche Freigaben, die sich zwischen zwei Behandlungen erledigen lassen. Medizinische Inhalte legen wir Ihnen vor der Veröffentlichung vor, alles andere setzen wir eigenständig um — im Schnitt reichen wenige Minuten pro Woche.",
      },
    ],
    arbeitsweise: {
      titel: { pre: "Arbeiten im Takt ", grad: "eines vollen Behandlungsplans." },
      intro:
        "Eine Zahnarztpraxis taktet in Behandlungsterminen, nicht in Meetings. Zwischen Prophylaxe, Beratung und OP bleibt keine Stunde für Agentur-Calls — und das muss auch nicht sein. Unsere Zusammenarbeit läuft asynchron: kurze schriftliche Abstimmungen, klare Vorlagen zur Freigabe, und wir melden uns nur, wenn wirklich eine Entscheidung von Ihnen gebraucht wird. Alles andere passiert im Hintergrund.",
      saeulen: [
        {
          titel: "KI übernimmt Routinearbeit",
          text: "Keyword-Analysen über Ihr Behandlungsspektrum, Wettbewerbs-Monitoring und die Vorbereitung neuer Seiten laufen bei uns KI-gestützt — dadurch fließt unsere Zeit in die medizinisch und werberechtlich saubere Prüfung der Inhalte statt in Fleißarbeit. Das macht die Betreuung schneller und günstiger als klassische Agenturprozesse.",
        },
        {
          titel: "Änderungen ohne Wartezeit",
          text: "Neue Behandlung, geänderte Sprechzeiten, ein neuer Behandler im Team: Über unsere CI/CD-Infrastruktur sind solche Änderungen in Minuten live, nicht erst nach dem nächsten Agentur-Termin. Gerade bei Leistungs- und Kostenangaben zählt diese Aktualität doppelt.",
        },
        {
          titel: "Ein fester Ansprechpartner",
          text: "Sie schreiben immer derselben Person, die Ihre Praxis und Ihr Behandlungsspektrum kennt — keine Hotline, kein Ticketsystem. Antworten kommen innerhalb von 24 Stunden, auch wenn die Nachricht erst nach dem letzten Patienten rausgeht.",
        },
        {
          titel: "Ergebnisse statt Vertragsbindung",
          text: "Unsere Betreuung ist monatlich kündbar. Sie sehen in jedem Report, welche Behandlungsseiten ranken und welche Anfragen darüber kommen — und bleiben, weil es sich rechnet, nicht weil ein Vertrag es verlangt.",
        },
      ],
      deployBeispiel: "neue behandlungsseite: invisalign",
    },
    tiefe: {
      titel: { pre: "Von der Kosten-Frage ", grad: "zur Terminanfrage." },
      lead: "Kaum eine Behandlung wird so gründlich recherchiert wie ein Implantat: Patienten vergleichen über Wochen Kosten, Materialien, Abläufe und Erfahrungsberichte, bevor sie eine Praxis kontaktieren. In dieser Phase entscheidet sich, welche drei Praxen überhaupt in die engere Wahl kommen — und wer nur eine knappe Leistungsliste online hat, kommt darin nicht vor. Die Recherche gewinnt, wer die unbequemen Fragen zuerst beantwortet: Was kostet es wirklich? Was zahlt die Kasse? Was passiert, wenn etwas schiefgeht?",
      quote: "Die Praxis, die die Kostenfrage zuerst ehrlich beantwortet, führt die Vergleichsliste des Patienten an.",
      bild: {
        src: "/images/branchen-editorial/zahnaerzte-tiefe.webp",
        alt: "Zahnärztin erklärt einer Patientin die Behandlungsplanung am Bildschirm",
      },
      spalten: [
        "Der Umweg über die Kostenfrage ist dabei kein Makel, sondern der wirksamste Vertrauensaufbau: Wer Preisspannen, Kassenanteile und Finanzierungswege nüchtern erklärt, signalisiert Souveränität — und filtert gleichzeitig die Anfragen vor. Patienten, die mit realistischen Erwartungen in die Beratung kommen, entscheiden schneller und verbindlicher. Praxen berichten uns immer wieder, dass gut informierte Patienten die angenehmeren Erstgespräche führen. Genau deshalb bauen wir Kosten- und Ablauf-Inhalte nicht als Pflichtübung, sondern als Kernstück der Behandlungsseiten.",
        "Die zweite Ebene ist der Vergleich mit den neuen Wettbewerbern: Aligner-Anbieter und Zahnklinik-Ketten investieren massiv in generische Suchbegriffe — aber sie können keine lokale Vertrauensbeziehung abbilden. Eine Praxis, die in ihrer Stadt bei „Implantat + Ort“ rankt, im Kartenausschnitt mit starken Bewertungen erscheint und auf der eigenen Website erkennbar macht, wer dort behandelt, spielt einen Vorteil aus, den kein Start-up kopieren kann. Unsere Aufgabe ist, diesen Vorteil sichtbar zu machen, bevor die Kette es tut.",
      ],
    },
    ctaSatz: {
      pre: "Sprechen Sie mit uns darüber, wie Patienten Ihre Praxis finden — ",
      grad: "mitten in ihrer Kosten-Recherche.",
    },
    ctaButtonLabel: "Praxis-Sichtbarkeit jetzt analysieren lassen",
    icon: brancheIcon(
      <>
        <path d="M7 3c-2.2 0-4 1.9-4 4.6 0 4.1 1.9 5.9 2.4 8.9C5.9 19.6 6.5 21 7.6 21c1.4 0 1.5-2.4 2-4.4.4-1.6 1.2-2.6 2.4-2.6s2 1 2.4 2.6c.5 2 .6 4.4 2 4.4 1.1 0 1.7-1.4 2.2-4.5.5-3 2.4-4.8 2.4-8.9C21 4.9 19.2 3 17 3c-1.9 0-2.7 1-5 1S8.9 3 7 3Z" />
      </>
    ),
    accent: "Implantat, Aligner, Prophylaxe — gefunden bei der Behandlung, nicht beim Praxisnamen.",
    praxisTypen: [
      { slug: "seo-fuer-aerzte", teaser: "Der Überblick für alle Praxen" },
      { slug: "seo-fuer-kieferorthopaeden", teaser: "Eltern-Recherche & Aligner-Suchen" },
      { slug: "seo-fuer-physiotherapeuten", teaser: "Selbstzahler, Kurse & lokale Suche" },
      { slug: "seo-fuer-heilpraktiker", teaser: "Vertrauensaufbau, rechtssicher" },
    ],
  },

  /* ── 08 · Kieferorthopäden (Praxis-Typ-Spoke unter Ärzte) ──────────────── */
  {
    slug: "seo-fuer-kieferorthopaeden",
    praxisTyp: true,
    name: "SEO für Kieferorthopäden",
    kurzName: "Kieferorthopäden",
    keyword: "SEO für Kieferorthopäden",
    hebelVariant: "stack",
    heroQuery: "unsichtbare zahnspange erwachsene kosten",
    heroBildAlt: "Kieferorthopädin zeigt einer Jugendlichen und ihrer Mutter eine Aligner-Schiene — Sichtbarkeit für KFO-Praxen",
    signature: {
      variant: "funnel",
      panelTitle: "Eltern-Recherche",
      stufen: [
        {
          query: "zahnspange kind ab wann",
          satz: "Der erste Impuls — meist Monate vor der Überweisung.",
          detail:
            "Eltern recherchieren früh und grundsätzlich: Ab welchem Alter ist eine Behandlung sinnvoll, was ist normal, was nicht? Hier gewinnt ein verständlicher Ratgeber, der Orientierung gibt, ohne zu drängen — und die Praxis als erste Anlaufstelle verankert.",
        },
        {
          query: "was zahlt die krankenkasse zahnspange",
          satz: "Die Kostenfrage: KIG-Einstufung, Eigenanteil, Zusatzleistungen.",
          detail:
            "Kaum ein KFO-Thema wird häufiger gesucht. Wer die KIG-Logik, den Eigenanteil und sinnvolle Zusatzleistungen nüchtern erklärt, beantwortet die Frage, die Eltern wirklich beschäftigt — und wird als ehrliche Quelle wahrgenommen.",
        },
        {
          query: "kieferorthopäde [stadt] erfahrungen",
          satz: "Hier fällt die Praxiswahl — auf Ihre Website, nicht aufs Portal.",
          detail:
            "Jetzt wird konkret verglichen: Bewertungen, Behandlungsspektrum, Atmosphäre. Hier gewinnt eine Praxis-Website mit erkennbarem Team, klaren Abläufen und einem starken lokalen Profil — nicht das anonyme Verzeichnis.",
          highlight: true,
        },
      ],
    },
    signatureTitle: { pre: "Eine Behandlung, ", grad: "zwei Entscheider, ein langer Weg." },
    signatureCopy: [
      "Kieferorthopädie hat den längsten Entscheidungsweg der Zahnmedizin: Eltern recherchieren für ihre Kinder über Monate, Erwachsene vergleichen Aligner-Optionen oft ebenso lange.",
      "Wir bauen Sichtbarkeit entlang dieser gesamten Recherche auf — von der ersten Orientierungsfrage bis zur lokalen Praxiswahl.",
    ],
    h1: {
      pre: "SEO für Kieferorthopäden: Präsent von der ersten Frage ",
      grad: "bis zur Praxiswahl",
    },
    subline:
      "Eltern googeln „Zahnspange Kind ab wann“, Erwachsene „unsichtbare Zahnspange Kosten“ — beide Monate vor dem ersten Termin. Wir machen Ihre Praxis in dieser langen Recherchephase sichtbar, in Google und in KI-Antworten.",
    ctaLabel: "Kostenlose SEO-Analyse für Ihre KFO-Praxis",
    warumTitle: { pre: "Warum SEO ", grad: "für Kieferorthopäden" },
    warumAbsaetze: [
      <>
        Kieferorthopädie ist ein Empfehlungs- und Recherchegeschäft mit zwei völlig unterschiedlichen
        Zielgruppen: Eltern, die für ihr Kind die richtige Praxis suchen und dabei Kostenfragen,
        KIG-Einstufung und Behandlungsdauer abwägen — und Erwachsene, die diskrete Aligner-Lösungen
        vergleichen und dabei auf die aggressiv beworbenen Angebote der Schienen-Start-ups stoßen. Beide
        Gruppen googeln lange, bevor sie eine Praxis kontaktieren, und beide entscheiden sich auf Basis
        dessen, was sie in dieser Recherche finden. Die Überweisung vom Hauszahnarzt bestimmt längst nicht
        mehr allein, wo behandelt wird.
      </>,
      <>
        Gleichzeitig ist das Einzugsgebiet einer KFO-Praxis deutlich größer als das einer allgemeinen
        Zahnarztpraxis — Familien fahren für eine mehrjährige Behandlung auch in die Nachbarstadt, wenn
        Vertrauen und Verfügbarkeit stimmen. Genau das macht durchdachte Inhalte so wertvoll: Ein Ratgeber,
        der die Kassenlogik erklärt, oder eine Seite, die Aligner-Optionen ehrlich vergleicht, zieht Anfragen
        aus dem gesamten Umkreis. Wir planen diese Inhalte als{" "}
        <Link href="/seo/content-strategie" className={linkCls}>durchdachte Content-Strategie</Link>, die
        Orientierungssuchen und Praxiswahl-Suchen systematisch abdeckt, statt einzelne Seiten auf gut Glück
        zu veröffentlichen.
      </>,
    ],
    split: {
      bild: "/images/branchen-split/kieferorthopaeden.jpg",
      bildAlt: "Mutter und Tochter recherchieren gemeinsam am Smartphone zur Zahnspange",
      caption: "Die Recherche beginnt am Küchentisch — Monate vor dem ersten Termin",
      bildLinks: true,
      titel: { pre: "Zwei Zielgruppen, ", grad: "zwei Suchlogiken." },
      absaetze: [
        <>
          Eltern suchen Sicherheit: Ist die Behandlung nötig, was kommt auf das Kind zu, was übernimmt die
          Kasse? Erwachsene suchen Diskretion und Vergleichbarkeit: Aligner oder feste Spange, welche Kosten,
          wie lange? Eine Website, die beide Wege ernst nimmt — statt beide Gruppen auf dieselbe
          „Leistungen“-Seite zu schicken — holt doppelt so viele Suchanfragen ab und führt jede Gruppe zu
          ihrer passenden Antwort.
        </>,
        <>
          Fachlich ist Kieferorthopädie dabei ein Spezialfall der Zahnmedizin — viele Grundprinzipien der
          Sichtbarkeit teilen sich beide Bereiche. Wie wir allgemeine Zahnarztpraxen positionieren, zeigt
          unsere Seite zu{" "}
          <Link href="/branchen/seo-fuer-zahnaerzte" className={linkCls}>SEO für Zahnärzte</Link> — für
          KFO-Praxen kommt die lange Eltern-Recherche als eigene Disziplin hinzu.
        </>,
      ],
    },
    vorgehenTitle: { pre: "So gehen wir ", grad: "bei KFO-Praxen vor." },
    vorgehen: [
      {
        titel: "Zielgruppen und Einzugsgebiet klären",
        text: "Kinder- und Jugendbehandlung, Erwachsenen-Aligner oder beides — und aus welchem Umkreis kommen Ihre Patienten heute? Daraus leiten wir ab, welche Suchbegriffe und Städte-Kombinationen Ihre Sichtbarkeit tragen sollen.",
      },
      {
        titel: "Ratgeber-Inhalte für die Eltern-Recherche",
        text: "KIG-Einstufung, Kassenanteil, Behandlungsablauf, lose oder feste Spange: Wir bauen die Inhalte, die Eltern in der Orientierungsphase suchen — verständlich, ehrlich und ohne Verkaufsdruck. Diese Seiten verankern Ihre Praxis, bevor die Praxiswahl überhaupt beginnt.",
      },
      {
        titel: "Aligner-Seiten für Erwachsene",
        text: "Für die wachsende Gruppe erwachsener Patienten entstehen eigene Seiten, die unsichtbare Zahnkorrektur, Kosten und Ablauf erklären — und sachlich einordnen, wo eine fachärztlich begleitete Behandlung sich von reinen Versand-Schienen unterscheidet.",
      },
      {
        titel: "Lokales Profil über das ganze Einzugsgebiet",
        text: "Google-Unternehmensprofil, Bewertungsaufbau und lokale Seiten decken nicht nur Ihren Standort ab, sondern das reale Einzugsgebiet — damit auch Familien aus den Nachbarorten Ihre Praxis finden, bevor sie beim erstbesten Treffer landen.",
      },
    ],
    fehlerVariant: "tafel",
    fehler: [
      {
        titel: "Eltern und Erwachsene landen auf derselben Seite",
        text: "Eine generische Behandlungsübersicht zwingt beide Zielgruppen, sich ihre Antworten selbst zusammenzusuchen. Wer die Wege trennt — Kinderbehandlung hier, Erwachsenen-Aligner dort — beantwortet beide Suchintentionen präzise und rankt für beide.",
      },
      {
        titel: "Die Kassenfrage bleibt unbeantwortet",
        text: "KIG-Einstufung und Eigenanteil gehören zu den meistgesuchten KFO-Themen überhaupt. Praxen, die dazu schweigen, überlassen die Antwort Foren und Portalen — und verschenken die vertrauensbildendste Content-Chance des Fachs.",
      },
      {
        titel: "Das Einzugsgebiet endet an der Stadtgrenze",
        text: "Wer nur für den eigenen Standort sichtbar ist, ignoriert, dass Familien für eine mehrjährige Behandlung auch 20 Minuten fahren. Lokale Sichtbarkeit in den umliegenden Orten kostet wenig und erweitert den Patientenstamm spürbar.",
      },
      {
        titel: "Versand-Aligner werden totgeschwiegen",
        text: "Erwachsene Patienten kennen die Werbung der Schienen-Anbieter längst. Eine Praxis, die den Unterschied zur fachärztlich begleiteten Behandlung sachlich erklärt, statt das Thema zu meiden, gewinnt genau die Patienten, die gerade vergleichen.",
      },
    ],
    hebel: [
      {
        titel: "Eltern-Ratgeber als Frühkontakt",
        text: "Inhalte zu „ab wann“, „was zahlt die Kasse“ und „wie läuft das ab“ erreichen Familien Monate vor der Praxiswahl. Wer hier hilfreich ist, steht auf der Liste, wenn es konkret wird — dieser Vorsprung ist mit Anzeigen kaum aufzuholen.",
      },
      {
        titel: "Aligner-Sichtbarkeit für Erwachsene",
        text: "Suchen rund um unsichtbare Zahnkorrektur wachsen seit Jahren. Eigene Seiten für Erwachsene holen diese Nachfrage ab und positionieren die Praxis als fachärztliche Alternative zu Versand-Schienen.",
      },
      {
        titel: "Einzugsgebiets-SEO statt Standort-SEO",
        text: "Lokale Sichtbarkeit in allen Orten, aus denen Ihre Patienten real kommen — über lokale Inhalte, sauberes Unternehmensprofil und gezielte Erwähnungen, nicht über Duplikat-Seiten.",
      },
      {
        titel: "Vertrauenssignale für lange Behandlungen",
        text: "Eine mehrjährige Behandlung ist eine Vertrauensentscheidung: sichtbares Team, klare Abläufe, echte Bewertungen und nachvollziehbare Qualifikationen — strukturiert aufbereitet für Google und Patienten zugleich.",
      },
    ],
    faq: [
      {
        q: "Lohnt sich SEO, wenn die meisten Patienten per Überweisung kommen?",
        a: "Die Überweisung bestimmt immer seltener allein, wo behandelt wird — Eltern vergleichen auch mit Überweisungsschein in der Hand, und erwachsene Aligner-Patienten kommen fast nie über eine Überweisung. SEO erschließt genau die Patientengruppen, die der Überweisungsweg nicht abdeckt.",
      },
      {
        q: "Dürfen wir die KIG-Einstufung und Kassenleistungen öffentlich erklären?",
        a: "Ja — sachliche Information über die Einstufungslogik und typische Eigenanteile ist zulässig und aus Patientensicht dringend gewünscht. Wichtig ist die Abgrenzung: erklären, wie das System funktioniert, ohne für den Einzelfall verbindliche Zusagen zu machen. Genau so formulieren wir diese Inhalte.",
      },
      {
        q: "Wie gehen wir mit der Konkurrenz durch Aligner-Start-ups um?",
        a: "Nicht ignorieren, sondern einordnen: Viele Erwachsene recherchieren zuerst die Versand-Anbieter und suchen dann nach einer fachärztlichen Einschätzung. Eine sachliche Vergleichsseite — was leistet die begleitete Behandlung, wo liegen die Grenzen der Fernbehandlung — fängt diese Suchen auf, ohne Wettbewerber schlechtzureden.",
      },
      {
        q: "Unser Einzugsgebiet umfasst mehrere Städte — wie bilden wir das ab?",
        a: "Über lokal zugeschnittene Inhalte und ein sauber gepflegtes Unternehmensprofil, nicht über kopierte Stadt-Seiten. Google erkennt Duplikate — wir bauen stattdessen wenige, substanzielle lokale Signale auf, die das reale Einzugsgebiet abdecken.",
      },
      {
        q: "Wie lange dauert es, bis wir Ergebnisse sehen?",
        a: "Ratgeber-Inhalte mit wenig Wettbewerb ranken oft nach wenigen Wochen, umkämpfte lokale Suchen brauchen mehrere Monate. Weil KFO-Entscheidungen lange Vorlaufzeiten haben, zahlt sich früh aufgebaute Sichtbarkeit doppelt aus: Wer heute rankt, füllt die Beratungstermine des nächsten Halbjahrs.",
      },
      {
        q: "Was unterscheidet KFO-SEO von SEO für allgemeine Zahnarztpraxen?",
        a: "Der Entscheidungsweg: Zahnarzt-Suchen sind oft akut und lokal, KFO-Suchen beginnen Monate früher mit Orientierungsfragen und laufen über zwei Zielgruppen. Entsprechend liegt der Schwerpunkt stärker auf Ratgeber-Inhalten und Einzugsgebiets-Sichtbarkeit als auf Akut-Suchen.",
      },
      {
        q: "Was kostet SEO für eine KFO-Praxis?",
        a: "Abhängig von Einzugsgebiet, Wettbewerb und Zielgruppen-Fokus. Nach der kostenlosen Erstanalyse bekommen Sie ein konkretes Angebot mit klarem Umfang — monatlich kündbar, ohne Mindestlaufzeit. Wir binden über sichtbare Fortschritte, nicht über Verträge.",
      },
      {
        q: "Wie viel Aufwand entsteht für unser Praxisteam?",
        a: "Kaum welcher: Fachliche Inhalte legen wir zur kurzen Freigabe vor, alles andere setzen wir eigenständig um. Die Abstimmung läuft schriftlich und asynchron — es gibt keine Pflicht-Termine, die zwischen Ihre Behandlungen geschoben werden müssen.",
      },
    ],
    arbeitsweise: {
      titel: { pre: "Arbeiten im Rhythmus ", grad: "einer Bestellpraxis." },
      intro:
        "KFO-Praxen takten eng: kurze Kontrolltermine, volle Wartezimmer nach Schulschluss, Beratungen dazwischen. Für klassische Agentur-Meetings ist da kein Platz — und wir brauchen sie auch nicht. Unsere Zusammenarbeit läuft asynchron über kurze schriftliche Freigaben, und Änderungen an der Website sind live, bevor der nächste Kontrolltermin beginnt.",
      saeulen: [
        {
          titel: "KI übernimmt Routinearbeit",
          text: "Die Auswertung von Suchtrends rund um Zahnspangen, Aligner und Kassenfragen läuft bei uns KI-gestützt. Unsere Zeit fließt in die fachlich saubere Aufbereitung der Inhalte — das hält die Betreuung effizient und den Preis fair.",
        },
        {
          titel: "Änderungen ohne Wartezeit",
          text: "Neue Sprechzeiten zum Schuljahresbeginn, ein zusätzliches Beratungsangebot, aktualisierte Kasseninfos: Über unsere CI/CD-Infrastruktur sind solche Anpassungen in Minuten live — wichtig bei Inhalten, auf die sich Eltern verlassen.",
        },
        {
          titel: "Ein fester Ansprechpartner",
          text: "Sie schreiben immer derselben Person, die Ihre Praxis kennt. Fragen beantworten wir innerhalb von 24 Stunden — auch die, die erst nach dem letzten Patienten des Tages entstehen.",
        },
        {
          titel: "Ergebnisse statt Vertragsbindung",
          text: "Monatlich kündbar, monatlich nachvollziehbar: Sie sehen in jedem Report, welche Inhalte ranken und welche Beratungsanfragen darüber entstehen. Die Zusammenarbeit trägt sich über Ergebnisse.",
        },
      ],
      deployBeispiel: "neue ratgeber-seite: lose zahnspange",
    },
    tiefe: {
      titel: { pre: "Die längste Patientenreise ", grad: "der Zahnmedizin." },
      lead: "Zwischen der ersten Google-Suche einer Mutter und dem unterschriebenen Behandlungsplan liegen oft sechs Monate und Dutzende Suchanfragen: erst Orientierung, dann Kassenfragen, dann Erfahrungsberichte, dann die lokale Praxiswahl. Jede dieser Phasen hat eigene Suchbegriffe, eigene Sorgen und eigene Gewinner. Praxen, die nur am Ende dieser Reise sichtbar sind — bei „Kieferorthopäde + Stadt“ —, konkurrieren dort mit allen. Praxen, die schon bei den Orientierungsfragen präsent sind, haben den Vertrauensvorsprung, wenn die Entscheidung fällt.",
      quote: "Wer die Fragen der ersten Monate beantwortet, wird am Ende seltener mit anderen verglichen.",
      bild: {
        src: "/images/branchen-editorial/kieferorthopaeden-tiefe.webp",
        alt: "Kieferorthopädin bespricht den Behandlungsplan mit einer Familie",
      },
      spalten: [
        "Der unterschätzte Teil dieser Reise ist die Kassenfrage. „Was zahlt die Krankenkasse bei einer Zahnspange“ gehört zu den häufigsten KFO-Suchen überhaupt — und wird von den meisten Praxis-Websites gar nicht beantwortet, aus Sorge, sich in der Einstufungslogik festzulegen. Dabei lässt sich das System sachlich erklären, ohne Einzelfall-Zusagen zu machen: Wie funktionieren die KIG-Stufen, was bedeutet der Eigenanteil, welche Zusatzleistungen sind sinnvoll und welche verzichtbar. Eine Praxis, die diese Fragen offen beantwortet, wird in Foren und Elterngruppen weiterempfohlen — Sichtbarkeit, die keine Anzeige kaufen kann.",
        "Bei erwachsenen Patienten verläuft die Reise anders, aber genauso lang: Sie beginnt fast immer bei den Versand-Aligner-Anbietern, deren Werbung allgegenwärtig ist. Irgendwann kommt die Frage nach der fachlichen Begleitung — spätestens, wenn die ersten kritischen Erfahrungsberichte auftauchen. Genau an dieser Stelle gehört Ihre Praxis in die Suchergebnisse: mit einer ehrlichen Einordnung, was eine fachärztlich begleitete Aligner-Behandlung leistet, was sie kostet und für wen die Versandlösung tatsächlich reicht. Diese Ehrlichkeit konvertiert besser als jedes Werbeversprechen.",
      ],
    },
    ctaSatz: {
      pre: "Sprechen Sie mit uns darüber, wie Familien Ihre Praxis finden — ",
      grad: "Monate bevor die Praxiswahl fällt.",
    },
    ctaButtonLabel: "KFO-Sichtbarkeit jetzt analysieren lassen",
    icon: brancheIcon(
      <>
        <path d="M7 3c-2.2 0-4 1.9-4 4.6 0 4.1 1.9 5.9 2.4 8.9C5.9 19.6 6.5 21 7.6 21c1.4 0 1.5-2.4 2-4.4.4-1.6 1.2-2.6 2.4-2.6s2 1 2.4 2.6c.5 2 .6 4.4 2 4.4 1.1 0 1.7-1.4 2.2-4.5.5-3 2.4-4.8 2.4-8.9C21 4.9 19.2 3 17 3c-1.9 0-2.7 1-5 1S8.9 3 7 3Z" />
        <path d="M5.5 10.5h13" />
        <path d="M8.5 9.5v2M12 9.5v2M15.5 9.5v2" />
      </>
    ),
    accent: "Präsent von der ersten Eltern-Frage bis zur Praxiswahl — im ganzen Einzugsgebiet.",
    praxisTypen: [
      { slug: "seo-fuer-aerzte", teaser: "Der Überblick für alle Praxen" },
      { slug: "seo-fuer-zahnaerzte", teaser: "Implantate, Aligner & Prophylaxe" },
      { slug: "seo-fuer-physiotherapeuten", teaser: "Selbstzahler, Kurse & lokale Suche" },
      { slug: "seo-fuer-heilpraktiker", teaser: "Vertrauensaufbau, rechtssicher" },
    ],
  },

  /* ── 09 · Physiotherapeuten (Praxis-Typ-Spoke unter Ärzte) ─────────────── */
  {
    slug: "seo-fuer-physiotherapeuten",
    praxisTyp: true,
    name: "SEO für Physiotherapeuten",
    kurzName: "Physiotherapeuten",
    keyword: "SEO für Physiotherapeuten",
    hebelVariant: "editorial",
    heroQuery: "physiotherapie termin in der nähe",
    heroBildAlt: "Physiotherapeut leitet eine Patientin bei einer Übung an — Sichtbarkeit für Physiotherapie-Praxen",
    signature: {
      variant: "businessprofil",
      panelTitle: "Google Business Profil",
      betrieb: "Physiotherapie am Stadtpark",
      bewertung: "4,9",
      anzahl: "94",
      kategorie: "Physiotherapeut",
      ort: "Musterstadt",
      status: "Jetzt geöffnet",
      chips: ["Anrufen", "Route", "Website"],
    },
    signatureTitle: { pre: "Das Profil entscheidet, ", grad: "wo angerufen wird." },
    signatureCopy: [
      "Bei „Physiotherapie in meiner Nähe“ vergleichen Patienten drei Karteneinträge: Bewertung, Entfernung, Öffnungszeiten. Wer dort nicht auftaucht, bekommt den Anruf nicht — egal wie gut die Praxis ist.",
      "Wir pflegen Ihr Unternehmensprofil als festen Teil der SEO-Arbeit und verzahnen es mit einer Website, die Ihre Leistungen und freie Kapazitäten sichtbar macht.",
    ],
    h1: {
      pre: "SEO für Physiotherapeuten: Die Patienten erreichen, ",
      grad: "die zu Ihrer Praxis passen",
    },
    subline:
      "Rezept-Patienten füllen den Kalender, aber Selbstzahler-Angebote, Privatpatienten und neue Kursplätze wachsen über Sichtbarkeit. Wir sorgen dafür, dass Ihre Praxis bei „Physiotherapie + Ort“, bei Beschwerde-Suchen und in KI-Antworten gefunden wird.",
    ctaLabel: "Kostenlose SEO-Analyse für Ihre Physiotherapie-Praxis",
    warumTitle: { pre: "Warum SEO ", grad: "für Physiotherapeuten" },
    warumAbsaetze: [
      <>
        Viele Physiotherapie-Praxen sind auf Wochen ausgebucht — und trotzdem lohnt sich Sichtbarkeit, denn
        volle Terminbücher sind nicht dasselbe wie eine gesunde Praxisstruktur. Rezept-Behandlungen mit
        knapper Vergütung füllen den Kalender, während die wirtschaftlich interessanten Bereiche —
        Selbstzahler-Leistungen, Präventionskurse, Privatpatienten — genau dort entschieden werden, wo
        Menschen suchen: „Physiotherapie in der Nähe“, „Rückenschmerzen was hilft wirklich“,
        „Manuelle Therapie Termin“. Wer online unsichtbar ist, bekommt den Kalender gefüllt, den andere
        übrig lassen — nicht den, den er sich aussucht.
      </>,
      <>
        Dazu kommt eine Besonderheit der Branche: Ein erheblicher Teil der Praxen hat gar keine oder eine
        technisch veraltete Website — Terminvergabe läuft über das Telefon, das im Behandlungsalltag niemand
        abnehmen kann. Genau das macht den Einstieg so lohnend: Schon eine schlanke, schnelle Website mit
        klaren Leistungsseiten und Online-Terminanfrage hebt eine Praxis vom lokalen Wettbewerb ab. Wir bauen
        solche Auftritte als{" "}
        <Link href="/webdesign/website-erstellen-lassen" className={linkCls}>professionelle Praxis-Websites</Link>{" "}
        — custom entwickelt, in Rekordzeit live und von Anfang an auf Sichtbarkeit ausgelegt.
      </>,
    ],
    split: {
      bild: "/images/branchen-split/physiotherapeuten.jpg",
      bildAlt: "Mann mit Nackenverspannung sucht am Smartphone nach einer Physiotherapie-Praxis",
      caption: "Akute Beschwerden, sofortige Suche — wer jetzt sichtbar ist, bekommt den Anruf",
      bildLinks: false,
      titel: { pre: "Gefunden, wenn es ", grad: "wehtut." },
      absaetze: [
        <>
          Physiotherapie wird selten auf Vorrat gesucht: Der Anlass ist eine Verspannung, ein Hexenschuss,
          eine OP-Nachsorge — und die Suche passiert in dem Moment, in dem das Problem da ist. Bei diesen
          Suchen zählt lokale Präsenz: der Kartenausschnitt, die Bewertungen, die Information, ob kurzfristig
          Termine frei sind. Praxen, die diese Signale sauber pflegen, gewinnen die Patienten mit der
          höchsten Dringlichkeit.
        </>,
        <>
          Die zweite Ebene sind Beschwerde-Suchen: Wer „Übungen bei Nackenverspannung“ oder „Physiotherapie
          nach Knie-OP“ sucht, ist noch nicht auf eine Praxis festgelegt — aber offen für die, die ihm
          weiterhilft. Solche Inhalte bauen Reichweite auf, die bleibt. Damit die Sichtbarkeit dauerhaft
          wächst statt einmalig zu verpuffen, begleiten wir Praxen in der{" "}
          <Link href="/seo/betreuung" className={linkCls}>laufenden SEO-Betreuung</Link>.
        </>,
      ],
    },
    vorgehenTitle: { pre: "So gehen wir bei ", grad: "Physio-Praxen vor." },
    vorgehen: [
      {
        titel: "Praxisstruktur und Wunsch-Auslastung klären",
        text: "Mehr Privatpatienten, volle Kurse, ein zweiter Standort oder gezielt Selbstzahler-Angebote? Wir klären zuerst, welche Patienten Sie eigentlich gewinnen wollen — daran richtet sich aus, welche Suchbegriffe und Inhalte Priorität haben.",
      },
      {
        titel: "Leistungsseiten statt Leistungsliste",
        text: "Manuelle Therapie, Lymphdrainage, Krankengymnastik am Gerät, Präventionskurse: Jede relevante Leistung bekommt eine eigene Seite mit Ablauf, Nutzen und Terminmöglichkeit — auffindbar für genau die Patienten, die danach suchen.",
      },
      {
        titel: "Lokales Profil und Bewertungen aufbauen",
        text: "Ihr Google-Unternehmensprofil wird vollständig gepflegt — Kategorien, Leistungen, Fotos, Öffnungszeiten — und mit einem unaufdringlichen Bewertungsprozess unterlegt. Bei lokalen Suchen entscheidet dieses Profil über den Anruf.",
      },
      {
        titel: "Terminanfragen entlasten das Telefon",
        text: "Eine klare Online-Terminanfrage auf der Website fängt Anfragen ab, die sonst im Besetztzeichen enden. Das entlastet die Rezeption und sorgt dafür, dass Anfragen auch außerhalb der Öffnungszeiten ankommen.",
      },
    ],
    fehlerVariant: "editorial",
    fehler: [
      {
        titel: "„Wir sind eh voll“ als Strategie",
        text: "Volle Terminbücher heute sagen nichts über die Struktur der Auslastung: Wer nur über Rezepte und Laufkundschaft wächst, kann sich seine Patienten nicht aussuchen. Sichtbarkeit schafft die Wahlfreiheit, den Kalender mit den wirtschaftlich sinnvollen Behandlungen zu füllen.",
      },
      {
        titel: "Keine oder eine verwaiste Website",
        text: "Ein Facebook-Profil oder eine seit Jahren unveränderte Ein-Seiten-Website beantwortet weder Patientenfragen noch Suchanfragen. In kaum einer Branche ist der Abstand zwischen „digital unsichtbar“ und „lokal führend“ so schnell aufzuholen wie hier.",
      },
      {
        titel: "Das Unternehmensprofil pflegt sich nicht selbst",
        text: "Falsche Öffnungszeiten, fehlende Leistungen, unbeantwortete Bewertungen: Das Google-Profil ist für viele Patienten der erste und einzige Kontaktpunkt. Wer es vernachlässigt, verliert Anrufe an die Praxis mit dem gepflegteren Eintrag.",
      },
      {
        titel: "Kurse und Selbstzahler-Angebote bleiben unsichtbar",
        text: "Rückbildung, Rehasport, Präventionskurse und Personal Training werden aktiv gesucht — aber selten auf Praxis-Websites gefunden. Eigene Kursseiten mit Terminen und Anmeldemöglichkeit füllen Kurse ohne Zettelaushang.",
      },
    ],
    hebel: [
      {
        titel: "Lokale Suche dominieren",
        text: "„Physiotherapie + Stadtteil“ ist die wichtigste Suchanfrage der Branche. Unternehmensprofil, Website-Signale und Bewertungen greifen ineinander, damit Ihre Praxis im Kartenausschnitt erscheint — dort, wo angerufen wird.",
      },
      {
        titel: "Selbstzahler-Leistungen sichtbar machen",
        text: "Eigene Seiten für Kurse, Massage und Präventionsangebote erschließen die Nachfrage jenseits des Rezepts — die Bereiche, in denen Ihre Praxis Preise und Auslastung selbst bestimmt.",
      },
      {
        titel: "Beschwerde-Content als Frühkontakt",
        text: "Inhalte zu häufigen Beschwerdebildern erreichen Patienten vor der Praxiswahl und bauen Vertrauen auf, bevor der erste Termin entsteht — sachlich formuliert, ohne Diagnose- oder Heilversprechen.",
      },
      {
        titel: "Digitale Terminanfrage",
        text: "Ein schlanker Anfrageweg auf der Website macht aus Sichtbarkeit tatsächlich Termine — und entlastet das Praxistelefon, das während der Behandlungen niemand bedienen kann.",
      },
    ],
    faq: [
      {
        q: "Unsere Praxis ist auf Wochen ausgebucht — wozu dann SEO?",
        a: "Ausgebucht heißt selten: mit den richtigen Behandlungen ausgebucht. Sichtbarkeit verschiebt den Mix — mehr Privatpatienten, mehr Selbstzahler-Leistungen, volle Kurse — und sichert die Praxis ab, wenn sich die Lage ändert: Ein Therapeutenwechsel oder eine neue Praxis nebenan kann volle Bücher schneller leeren, als neue Sichtbarkeit aufgebaut ist.",
      },
      {
        q: "Reicht nicht einfach ein gepflegtes Google-Profil?",
        a: "Das Profil ist der wichtigste einzelne Hebel, aber es verweist auf Ihre Website — und dort entscheidet sich, ob aus dem Klick eine Terminanfrage wird. Profil ohne überzeugende Website verliert Anfragen; Website ohne gepflegtes Profil wird lokal nicht gefunden. Beides zusammen wirkt.",
      },
      {
        q: "Dürfen wir über Beschwerdebilder wie Rückenschmerzen schreiben?",
        a: "Ja, sachlich informierend: Was hilft bei bestimmten Beschwerden, wann ist ärztliche Abklärung nötig, wie läuft die Behandlung ab. Wichtig ist die Grenze zu Diagnose und Heilversprechen — genau darauf achten wir bei jedem Text, damit die Inhalte hilfreich und rechtlich sauber bleiben.",
      },
      {
        q: "Können wir auch unsere Kurse über die Website füllen?",
        a: "Ja — Kursseiten mit Terminen, Preisen und Anmeldeformular gehören zu den dankbarsten Inhalten überhaupt, weil die Nachfrage nach Prävention und Rückbildung stetig sucht und das Angebot online dünn ist. Zertifizierte Präventionskurse mit Kassenzuschuss sind ein zusätzliches Suchargument.",
      },
      {
        q: "Wir haben kein großes Budget — lohnt sich das für eine kleine Praxis?",
        a: "Gerade für kleine Praxen: Der lokale Wettbewerb ist digital oft schwach aufgestellt, sodass schon fokussierte Maßnahmen sichtbar wirken. Wir starten mit den Hebeln mit dem besten Aufwand-Nutzen-Verhältnis, und die Betreuung ist monatlich kündbar — Sie sehen jeden Monat, was Sie dafür bekommen.",
      },
      {
        q: "Wie schnell merken wir etwas?",
        a: "Ein sauber aufgesetztes Unternehmensprofil wirkt oft innerhalb weniger Wochen auf Anrufe und Routenanfragen. Website-Rankings für Leistungs- und Beschwerde-Suchen bauen sich über einige Monate auf. Wir zeigen Ihnen monatlich die Entwicklung — ehrlich, ohne geschönte Kurven.",
      },
      {
        q: "Funktioniert das auch mit mehreren Standorten oder einem Team aus Selbstständigen?",
        a: "Ja. Jeder Standort bekommt ein eigenes Profil und eine eigene Seite mit Team und Leistungen, statt alles zentral zu vermischen. Bei Praxisgemeinschaften klären wir vorab, wer wie sichtbar sein will — das verhindert spätere Konflikte um Zuständigkeiten und Bewertungen.",
      },
      {
        q: "Wie viel Zeit müssen wir selbst investieren?",
        a: "Sehr wenig: kurze schriftliche Freigaben, gelegentlich ein Foto aus der Praxis, fertig. Wir wissen, dass zwischen zwei Behandlungen keine halbe Stunde für Abstimmungen liegt — deshalb ist der gesamte Prozess darauf ausgelegt, ohne Termine auszukommen.",
      },
    ],
    arbeitsweise: {
      titel: { pre: "Arbeiten im 20-Minuten-Takt ", grad: "Ihrer Behandlungen." },
      intro:
        "Eine Physiotherapie-Praxis hat den dichtesten Terminkalender im Gesundheitswesen: Behandlungen im 20- bis 30-Minuten-Takt, dazwischen Dokumentation, und das Telefon klingelt durchgehend. Abstimmungen mit einer Agentur dürfen davon nichts blockieren. Deshalb läuft bei uns alles asynchron: kurze Nachrichten statt Meetings, fertige Vorlagen zur Freigabe, Änderungen live in Minuten.",
      saeulen: [
        {
          titel: "KI übernimmt Routinearbeit",
          text: "Suchtrend-Analysen zu Beschwerdebildern, Leistungen und lokalen Suchen laufen KI-gestützt im Hintergrund. Unsere Zeit fließt in die fachlich saubere Formulierung — das hält die Betreuung auch für kleinere Praxen bezahlbar.",
        },
        {
          titel: "Änderungen ohne Wartezeit",
          text: "Neue Kurstermine, geänderte Öffnungszeiten, ein neues Teammitglied: Über unsere CI/CD-Infrastruktur ist das in Minuten online. Kursstarts warten nicht auf den nächsten Agentur-Slot.",
        },
        {
          titel: "Ein fester Ansprechpartner",
          text: "Immer dieselbe Person, die Ihre Praxis kennt — erreichbar per Nachricht, Antwort innerhalb von 24 Stunden. Auch wenn Ihre Frage erst nach Feierabend um 21 Uhr entsteht.",
        },
        {
          titel: "Ergebnisse statt Vertragsbindung",
          text: "Monatlich kündbar, jeden Monat ein klarer Blick auf Anrufe, Anfragen und Rankings. Die Zusammenarbeit trägt sich darüber, dass sie sich rechnet — nicht über eine Laufzeitklausel.",
        },
      ],
      deployBeispiel: "neue kursseite: rückbildung herbst",
    },
    tiefe: {
      titel: { pre: "Vom vollen Kalender ", grad: "zur gesunden Auslastung." },
      lead: "Das Paradox der Physiotherapie: Die Nachfrage übersteigt das Angebot fast überall — und trotzdem kämpfen viele Praxen wirtschaftlich. Der Grund liegt in der Struktur der Auslastung: Rezept-Behandlungen mit festen Sätzen füllen den Tag, während planbare, fair vergütete Bereiche — Selbstzahler-Angebote, Privatpatienten, Kurse — unbesetzt bleiben, weil niemand von ihnen erfährt. Sichtbarkeit ist hier kein Marketing-Luxus, sondern das Steuerungsinstrument, mit dem eine Praxis ihren eigenen Kalender gestaltet.",
      quote: "Sichtbarkeit entscheidet nicht, ob der Kalender voll ist — sondern womit.",
      bild: {
        src: "/images/branchen-editorial/physiotherapeuten-tiefe.webp",
        alt: "Physiotherapeutin bespricht einen Behandlungsplan mit einem Patienten am Empfang",
      },
      spalten: [
        "Der erste Hebel ist banal und wird trotzdem fast überall ausgelassen: die Leistungen sichtbar machen, die die Praxis eigentlich ausbauen will. Wer Rückbildungskurse anbietet, aber online nur „Krankengymnastik“ kommuniziert, bekommt Rezepte statt Kursanmeldungen. Wer Personal Training oder Präventionskurse mit Kassenzuschuss im Programm hat, aber keine eigene Seite dafür, überlässt diese Nachfrage den Fitnessstudios. Die Suchanfragen existieren — sie laufen nur an der Praxis vorbei, solange die Website sie nicht auffängt.",
        "Der zweite Hebel ist das Zusammenspiel von Profil und Website: Das Google-Unternehmensprofil gewinnt den ersten Blick, die Website macht daraus eine Anfrage. Praxen unterschätzen regelmäßig, wie viele Anrufe im Besetztzeichen enden, weil während der Behandlung niemand ans Telefon geht — eine schlichte Online-Terminanfrage fängt genau diese Anfragen auf und verschiebt sie in die Randzeiten, in denen das Team tatsächlich Zeit hat. So wird aus Sichtbarkeit nicht nur Reichweite, sondern spürbar weniger Chaos an der Rezeption.",
      ],
    },
    ctaSatz: {
      pre: "Sprechen Sie mit uns darüber, wie Ihre Praxis die Patienten erreicht, ",
      grad: "die wirklich zu ihr passen.",
    },
    ctaButtonLabel: "Praxis-Sichtbarkeit jetzt analysieren lassen",
    icon: brancheIcon(
      <>
        <path d="M22 12h-3l-2.5 7L10 4l-2.5 8H2" />
      </>
    ),
    accent: "Volle Kurse, mehr Selbstzahler, weniger Besetztzeichen — Sichtbarkeit, die den Kalender steuert.",
    praxisTypen: [
      { slug: "seo-fuer-aerzte", teaser: "Der Überblick für alle Praxen" },
      { slug: "seo-fuer-zahnaerzte", teaser: "Implantate, Aligner & Prophylaxe" },
      { slug: "seo-fuer-kieferorthopaeden", teaser: "Eltern-Recherche & Aligner-Suchen" },
      { slug: "seo-fuer-heilpraktiker", teaser: "Vertrauensaufbau, rechtssicher" },
    ],
  },

  /* ── 10 · Heilpraktiker (Praxis-Typ-Spoke unter Ärzte) ─────────────────── */
  {
    slug: "seo-fuer-heilpraktiker",
    praxisTyp: true,
    name: "SEO für Heilpraktiker",
    kurzName: "Heilpraktiker",
    keyword: "SEO für Heilpraktiker",
    hebelVariant: "tafel",
    heroQuery: "heilpraktiker in der nähe erfahrungen",
    heroBildAlt: "Heilpraktikerin im Beratungsgespräch mit einer Klientin in ihrer Naturheilpraxis",
    signature: {
      variant: "kichat",
      panelTitle: "KI-Suche",
      fragen: [
        { chip: "Naturheilkunde bei Erschöpfung?", frage: "Welche naturheilkundlichen Ansätze gibt es bei anhaltender Erschöpfung?" },
        { chip: "Heilpraktiker in der Nähe?", frage: "Wie finde ich einen seriösen Heilpraktiker in meiner Stadt?" },
        { chip: "Was kostet eine Sitzung?", frage: "Was kostet eine Erstanamnese beim Heilpraktiker ungefähr?" },
      ],
      marke: "ihre-naturheilpraxis.de",
      quellen: "Quellen: 2 Praxis-Websites, 1 Ratgeber",
    },
    signatureTitle: { pre: "Wenn Suchende die KI fragen, ", grad: "zählt, wen sie zitiert." },
    signatureCopy: [
      "Gesundheitsfragen wandern zunehmend in KI-Assistenten: Menschen beschreiben ChatGPT ihre Beschwerden und fragen nach Ansätzen und Anlaufstellen. Zitiert werden Praxen, deren Inhalte sauber strukturiert und fachlich einzuordnen sind.",
      "Wir bereiten Ihre Leistungen, Ihre Person und Ihre Schwerpunkte so auf, dass Google und KI-Systeme sie verstehen — und Suchende bei Ihnen ankommen statt bei anonymen Portalen.",
    ],
    h1: {
      pre: "SEO für Heilpraktiker: Vertrauen aufbauen, ",
      grad: "bevor der erste Termin entsteht",
    },
    subline:
      "Wer einen Heilpraktiker sucht, sucht Vertrauen: Erfahrungen, Schwerpunkte, Kosten, die Person dahinter. Wir machen Ihre Praxis bei genau diesen Suchen sichtbar — rechtssicher formuliert, in Google und in KI-Antworten.",
    ctaLabel: "Kostenlose SEO-Analyse für Ihre Naturheilpraxis",
    warumTitle: { pre: "Warum SEO ", grad: "für Heilpraktiker" },
    warumAbsaetze: [
      <>
        Kaum eine Berufsgruppe lebt so sehr von Vertrauen und Empfehlung wie Heilpraktiker — und kaum eine
        wird online so kritisch geprüft. Wer eine Naturheilpraxis sucht, googelt Erfahrungen, vergleicht
        Schwerpunkte, will wissen, wer die Person hinter der Praxis ist und was eine Behandlung kostet.
        Gleichzeitig bewertet Google Gesundheitsinhalte als YMYL-Thema besonders streng, und für
        Alternativmedizin gelten dabei die höchsten Anforderungen an Sachlichkeit und Einordnung. Praxen, die
        mit vagen Wirkversprechen arbeiten, verlieren doppelt: rechtlich angreifbar und von Google
        aussortiert. Praxen, die sachlich, transparent und persönlich auftreten, gewinnen doppelt.
      </>,
      <>
        Genau hier liegt die Chance: Die meisten Heilpraktiker-Websites bestehen aus einer Methodenliste
        ohne Substanz — wer stattdessen erklärt, wie eine Erstanamnese abläuft, was eine Behandlung kostet
        und für welche Anliegen die eigenen Schwerpunkte geeignet sind, hebt sich sofort ab. Die Grenze
        zieht das Heilmittelwerbegesetz: keine Heilversprechen, keine Erfolgsgarantien, keine
        Krankheitswerbung. Wir schreiben deshalb{" "}
        <Link href="/seo/texte" className={linkCls}>rechtssichere SEO-Texte</Link>, die Kompetenz und
        Menschlichkeit zeigen, ohne eine einzige unhaltbare Aussage zu treffen.
      </>,
    ],
    split: {
      bild: "/images/branchen-split/heilpraktiker.jpg",
      bildAlt: "Frau recherchiert mit einer Tasse Tee am Laptop nach einer Naturheilpraxis",
      caption: "Die Suche nach der passenden Praxis ist eine Vertrauensrecherche — oft über Tage",
      bildLinks: true,
      titel: { pre: "Sichtbar auch dort, ", grad: "wo die KI antwortet." },
      absaetze: [
        <>
          Gesundheitssuchen verschieben sich spürbar in KI-Assistenten: Statt zehn Suchergebnisse zu
          vergleichen, beschreiben Menschen ChatGPT oder Perplexity ihr Anliegen und lassen sich Ansätze und
          Anlaufstellen nennen. Für Naturheilpraxen ist das Chance und Risiko zugleich — zitiert wird, wessen
          Inhalte die KI versteht und als seriös einordnet. Anonyme Methodenlisten schaffen das nicht;
          strukturierte, sachliche Praxis-Inhalte schon.
        </>,
        <>
          Diese doppelte Sichtbarkeit — klassische Google-Suche und KI-Antworten — bauen wir systematisch
          auf: verständliche Leistungsseiten, eine erkennbare Person mit nachvollziehbarer Qualifikation und
          technisch sauber strukturierte Daten. Wie wir Marken gezielt in KI-Antworten bringen, zeigt unsere
          Arbeit als{" "}
          <Link href="/geo-agentur" className={linkCls}>GEO-Agentur</Link> — für Heilpraktiker kombinieren
          wir beides von Anfang an.
        </>,
      ],
    },
    vorgehenTitle: { pre: "So gehen wir bei ", grad: "Naturheilpraxen vor." },
    vorgehen: [
      {
        titel: "Schwerpunkte und Positionierung schärfen",
        text: "„Heilpraktiker“ allein ist kein Suchbegriff, der trägt — Ihre Schwerpunkte sind es. Wir klären, welche Anliegen und Methoden Ihre Praxis prägen und für welche davon echte lokale Nachfrage existiert, statt alles für alle anzubieten.",
      },
      {
        titel: "Rechtssichere Leistungs- und Ablaufseiten",
        text: "Für jeden Schwerpunkt entsteht eine eigene Seite, die Ablauf, Kosten und Grenzen der Methode sachlich erklärt — formuliert im Rahmen des Heilmittelwerbegesetzes, ohne Wirkversprechen. Diese Ehrlichkeit ist zugleich das stärkste Vertrauenssignal.",
      },
      {
        titel: "Person und Qualifikation sichtbar machen",
        text: "Bei einer so persönlichen Dienstleistung entscheidet die Person: Werdegang, Ausbildung, Praxisphilosophie werden erkennbar aufbereitet und technisch strukturiert hinterlegt — die Basis dafür, dass Google und KI-Systeme Ihre Praxis als vertrauenswürdige Quelle einordnen.",
      },
      {
        titel: "Lokale Sichtbarkeit und Bewertungen pflegen",
        text: "Google-Unternehmensprofil, konsistente Praxisdaten und ein behutsamer Bewertungsaufbau sorgen dafür, dass Ihre Praxis bei lokalen Suchen erscheint. Behutsam deshalb, weil im Gesundheitsbereich jede Bewertungsbitte wettbewerbsrechtlich sauber ablaufen muss.",
      },
    ],
    fehlerVariant: "editorial",
    fehler: [
      {
        titel: "Wirkversprechen statt Sachlichkeit",
        text: "„Erfolgreiche Behandlung von …“ oder Heilungsberichte verstoßen schnell gegen das Heilmittelwerbegesetz — und werden von Google bei Gesundheitsthemen zusätzlich abgestraft. Sachliche Beschreibung von Ablauf und Ansatz wirkt seriöser und rankt besser.",
      },
      {
        titel: "Methodenliste ohne Kontext",
        text: "Zwanzig Verfahren in einer Aufzählung beantworten keine einzige Suchanfrage. Suchende wollen wissen, was ein Verfahren ist, wie es abläuft und was es kostet — jede Methode mit eigener, verständlicher Seite schlägt jede Liste.",
      },
      {
        titel: "Die Person bleibt unsichtbar",
        text: "Anonyme Praxis-Websites verschenken das wichtigste Argument: Menschen wählen bei Heilpraktikern die Person, nicht das Verfahren. Ohne erkennbaren Werdegang und Philosophie fehlt der Website genau das, was Vertrauen und E-E-A-T-Signale aufbaut.",
      },
      {
        titel: "Die Kostenfrage wird umgangen",
        text: "Heilpraktiker-Leistungen sind Selbstzahler-Leistungen — die Kostenfrage kommt garantiert. Wer Honorarrahmen und Abrechnungslogik offen erklärt, filtert unpassende Anfragen heraus und gewinnt die Klienten, die bewusst investieren wollen.",
      },
    ],
    hebel: [
      {
        titel: "Schwerpunkt-Seiten statt Bauchladen",
        text: "Eigene Seiten für Ihre tatsächlichen Schwerpunkte treffen die konkreten Suchanfragen der Menschen — und positionieren die Praxis als spezialisierte Anlaufstelle statt als beliebiges Gemischtwarenangebot.",
      },
      {
        titel: "E-E-A-T für Alternativmedizin",
        text: "Sichtbare Qualifikationen, sauber strukturierte Praxisdaten und sachliche Sprache sind bei YMYL-Themen die Eintrittskarte in gute Rankings — für Naturheilpraxen strenger geprüft als fast überall sonst. Wir bauen genau diese Signale systematisch auf.",
      },
      {
        titel: "KI-Sichtbarkeit von Anfang an",
        text: "Strukturierte Inhalte, klare Entitäten und zitierfähige Aussagen sorgen dafür, dass Ihre Praxis auch in ChatGPT- und Perplexity-Antworten auftaucht — ein Kanal, den im Naturheilbereich bisher kaum jemand besetzt.",
      },
      {
        titel: "Lokales Vertrauensprofil",
        text: "Gepflegtes Unternehmensprofil, echte Bewertungen und konsistente Daten entscheiden die lokale Suche. Gerade bei einer Vertrauensentscheidung wie dieser wird das Profil mit den glaubwürdigen Stimmen gewählt.",
      },
    ],
    faq: [
      {
        q: "Was dürfen wir auf der Website überhaupt versprechen?",
        a: "Keine Heilung, keine Erfolgsquoten, keine Linderungsversprechen — das Heilmittelwerbegesetz gilt für Heilpraktiker in vollem Umfang. Zulässig und wirksam ist die sachliche Ebene: welche Methode Sie einsetzen, wie eine Behandlung abläuft, was sie kostet, wofür Klienten zu Ihnen kommen. Wir formulieren jeden Text in diesem Rahmen — das schützt rechtlich und wirkt seriöser.",
      },
      {
        q: "Rankt Google Alternativmedizin nicht grundsätzlich schlechter?",
        a: "Google bewertet Gesundheitsinhalte streng und stuft unbelegte Heilsversprechen ab — das trifft unsaubere Seiten, nicht die Kategorie an sich. Praxen mit sachlichen, transparenten Inhalten und erkennbarer Qualifikation ranken auch im Naturheilbereich stabil, gerade weil viele Wettbewerber diese Standards nicht erfüllen.",
      },
      {
        q: "Lohnt sich SEO für eine Einzelpraxis mit kleinem Budget?",
        a: "Ja, weil der Wettbewerb digital dünn ist: Die meisten Naturheilpraxen haben schwache Websites und kein gepflegtes Profil. Schon fokussierte Maßnahmen — Schwerpunkt-Seiten, Unternehmensprofil, saubere Struktur — bewirken hier mehr als in umkämpften Branchen. Die Betreuung ist monatlich kündbar, Sie sehen jeden Monat den Gegenwert.",
      },
      {
        q: "Wie hebt sich meine Praxis von Portalen und Verzeichnissen ab?",
        a: "Verzeichnisse listen, aber sie erzählen nichts: keine Person, keine Philosophie, kein Ablauf. Ihre eigene Website kann genau das leisten — und rankt mit substanziellen Inhalten bei spezifischen Suchen häufig vor den generischen Verzeichnisprofilen. Zusätzlich gehört Ihr dortiger Eintrag konsistent gepflegt, damit alle Signale zusammenpassen.",
      },
      {
        q: "Können wir mit Bewertungen arbeiten?",
        a: "Ja, mit Augenmaß: Zufriedene Klienten dürfen um eine ehrliche Google-Bewertung gebeten werden, solange keine Anreize dafür geboten werden und keine Bewertungen gekauft oder gesteuert werden. Wir richten einen zurückhaltenden, sauberen Prozess ein und helfen beim sachlichen Umgang mit kritischen Stimmen.",
      },
      {
        q: "Erscheine ich wirklich in ChatGPT-Antworten?",
        a: "KI-Assistenten zitieren bei Gesundheits- und Anbietersuchen zunehmend konkrete Quellen — bevorzugt solche mit klarer Struktur, erkennbarer Person und sachlicher Sprache. Eine Garantie für einzelne Antworten gibt es nicht, aber die Voraussetzungen dafür lassen sich gezielt schaffen. Genau das ist Teil unserer Arbeit.",
      },
      {
        q: "Wie lange dauert es bis zu sichtbaren Ergebnissen?",
        a: "Lokale Signale und das Unternehmensprofil wirken oft nach wenigen Wochen, Schwerpunkt-Seiten bauen ihre Rankings über einige Monate auf. Bei Gesundheitsthemen bewertet Google Vertrauen langsamer, aber dafür stabiler — einmal aufgebaute Autorität trägt lange.",
      },
      {
        q: "Wie viel Zeit kostet mich die Zusammenarbeit?",
        a: "Wenige Minuten pro Woche: Sie geben Inhalte per kurzer Nachricht frei und liefern gelegentlich fachlichen Input zu Ihren Methoden. Alles Übrige — Recherche, Texte, Technik, Profil-Pflege — übernehmen wir im Hintergrund.",
      },
    ],
    arbeitsweise: {
      titel: { pre: "Arbeiten im Takt ", grad: "einer Ein-Personen-Praxis." },
      intro:
        "Die meisten Naturheilpraxen sind Ein-Personen-Betriebe: Wer gerade behandelt, kann nicht telefonieren, und die Website-Pflege bleibt am Abend hängen — oder ganz liegen. Unsere Zusammenarbeit ist genau dafür gebaut: keine festen Termine, kurze schriftliche Abstimmungen, wenn es Ihnen passt, und eine Agentur, die im Hintergrund weiterarbeitet, während Sie in der Praxis stehen.",
      saeulen: [
        {
          titel: "KI übernimmt Routinearbeit",
          text: "Recherche zu Suchtrends, Wettbewerb und lokalen Anfragen läuft bei uns KI-gestützt — unsere Zeit fließt in die rechtssichere, menschliche Formulierung Ihrer Inhalte. Das hält die Betreuung auch für Einzelpraxen bezahlbar.",
        },
        {
          titel: "Änderungen ohne Wartezeit",
          text: "Ein neues Angebot, geänderte Sprechzeiten, ein zusätzlicher Schwerpunkt: Über unsere CI/CD-Infrastruktur ist die Änderung in Minuten live — nicht erst, wenn irgendwann der nächste Website-Termin stattfindet.",
        },
        {
          titel: "Ein fester Ansprechpartner",
          text: "Sie schreiben immer derselben Person, die Ihre Praxis und Ihre Grenzen kennt — auch die rechtlichen. Antwort innerhalb von 24 Stunden, gern auch auf die Nachricht, die abends nach dem letzten Klienten entsteht.",
        },
        {
          titel: "Ergebnisse statt Vertragsbindung",
          text: "Monatlich kündbar, jeden Monat nachvollziehbar: Welche Seiten ranken, welche Anfragen kommen, was als Nächstes ansteht. Sie bleiben, weil sich die Praxis füllt — nicht, weil ein Vertrag läuft.",
        },
      ],
      deployBeispiel: "neue schwerpunkt-seite: ohrakupunktur",
    },
    tiefe: {
      titel: { pre: "Vertrauen ist hier ", grad: "die ganze Währung." },
      lead: "Niemand wählt einen Heilpraktiker über eine Preisliste. Die Entscheidung fällt über eine Kette von Vertrauenssignalen: Wie spricht die Praxis über ihre Methoden — vollmundig oder ehrlich? Ist erkennbar, wer dort arbeitet und mit welcher Ausbildung? Sagen andere Menschen glaubwürdige Dinge über die Praxis? Und hält die Website dem kritischen Blick stand, den Gesundheitsentscheidungen heute begleiten? Jedes dieser Signale ist gestaltbar — und zusammen entscheiden sie, ob aus einer Suche ein Erstgespräch wird.",
      quote: "Im Naturheilbereich gewinnt nicht, wer am meisten verspricht — sondern wer am wenigsten verspricht und am meisten erklärt.",
      bild: {
        src: "/images/branchen-editorial/heilpraktiker-tiefe.webp",
        alt: "Heilpraktikerin erklärt einer Klientin den Ablauf einer Erstanamnese",
      },
      spalten: [
        "Die rechtliche Strenge des Heilmittelwerbegesetzes ist dabei kein Hindernis, sondern ein verstecktes Geschenk: Sie zwingt zu einer Sprache, die auch Google und KI-Systeme belohnen. Eine Seite, die nüchtern erklärt, wie eine Erstanamnese abläuft, welche Fragen gestellt werden und was eine Sitzung kostet, erfüllt gleichzeitig drei Anforderungen — sie ist rechtssicher, sie beantwortet echte Suchanfragen, und sie signalisiert genau die Seriosität, nach der Menschen im Naturheilbereich aktiv suchen. Die Praxen, die das verstanden haben, ranken vor denen, die mit Versprechen arbeiten.",
        "Die zweite Dimension ist die Person: Bei kaum einer Dienstleistung ist die Bindung an einen Menschen so stark. Ein erkennbarer Werdegang, eine nachvollziehbare Praxisphilosophie und ein Foto, das Nähe zulässt, wirken stärker als jede Methodenbeschreibung — und sie sind zugleich die E-E-A-T-Signale, die Google bei Gesundheitsthemen explizit sucht. Technisch hinterlegen wir das strukturiert, damit auch KI-Assistenten die Praxis als konkrete, qualifizierte Anlaufstelle erkennen statt als anonyme Website unter vielen.",
      ],
    },
    ctaSatz: {
      pre: "Sprechen Sie mit uns darüber, wie Ihre Praxis gefunden wird — ",
      grad: "von den Menschen, die genau Sie suchen.",
    },
    ctaButtonLabel: "Praxis-Sichtbarkeit jetzt analysieren lassen",
    icon: brancheIcon(
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </>
    ),
    accent: "Sachlich, persönlich, rechtssicher — die Sichtbarkeit, die Vertrauensentscheidungen gewinnt.",
    praxisTypen: [
      { slug: "seo-fuer-aerzte", teaser: "Der Überblick für alle Praxen" },
      { slug: "seo-fuer-zahnaerzte", teaser: "Implantate, Aligner & Prophylaxe" },
      { slug: "seo-fuer-kieferorthopaeden", teaser: "Eltern-Recherche & Aligner-Suchen" },
      { slug: "seo-fuer-physiotherapeuten", teaser: "Selbstzahler, Kurse & lokale Suche" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   KEYWORD-POTENZIAL — echte Semrush-Daten (Datenbank Deutschland, Juli 2026).
   Werte exakt aus dem Semrush-Export übernommen — nicht runden, nicht ändern.
═══════════════════════════════════════════════════════════════════════════ */
export type KeywordRow = { kw: string; vol: number; kd: number };
export type KeywordPotenzial = { thema: string; rows: KeywordRow[] };

export const KEYWORDS: Record<string, KeywordPotenzial> = {
  "seo-fuer-aerzte": {
    thema: "SEO für Ärzte und Praxismarketing",
    rows: [
      { kw: "seo für ärzte", vol: 1300, kd: 14 },
      { kw: "praxismarketing", vol: 720, kd: 50 },
      { kw: "seo für zahnärzte", vol: 590, kd: 7 },
      { kw: "seo agentur für ärzte", vol: 260, kd: 15 },
      { kw: "arzt marketing", vol: 260, kd: 22 },
      { kw: "zahnarzt seo", vol: 140, kd: 8 },
    ],
  },
  "seo-fuer-anwaelte": {
    thema: "SEO für Anwälte und Kanzleimarketing",
    rows: [
      { kw: "seo für anwälte", vol: 1000, kd: 11 },
      { kw: "kanzleimarketing", vol: 390, kd: 5 },
      { kw: "kanzlei marketing", vol: 140, kd: 27 },
      { kw: "anwalt seo", vol: 70, kd: 22 },
      { kw: "seo agentur für anwälte", vol: 50, kd: 0 },
      { kw: "legal marketing", vol: 40, kd: 0 },
    ],
  },
  "seo-fuer-online-shops": {
    thema: "E-Commerce- und Shop-SEO",
    rows: [
      { kw: "ecommerce seo", vol: 1000, kd: 30 },
      { kw: "shop seo", vol: 590, kd: 22 },
      { kw: "seo agentur für online shops", vol: 480, kd: 9 },
      { kw: "e-commerce seo", vol: 320, kd: 25 },
      { kw: "seo für online shop", vol: 210, kd: 20 },
      { kw: "online shop marketing", vol: 90, kd: 18 },
    ],
  },
  "seo-fuer-handwerker": {
    thema: "SEO und Marketing für Handwerker",
    rows: [
      { kw: "seo für handwerker", vol: 590, kd: 10 },
      { kw: "marketing für handwerker", vol: 320, kd: 10 },
      { kw: "handwerker marketing", vol: 260, kd: 15 },
      { kw: "seo agentur für handwerker", vol: 70, kd: 7 },
      { kw: "handwerker werbung", vol: 70, kd: 17 },
      { kw: "werbung handwerksbetrieb", vol: 40, kd: 0 },
    ],
  },
  "seo-fuer-immobilienmakler": {
    thema: "SEO und Marketing für Immobilienmakler",
    rows: [
      { kw: "seo für immobilienmakler", vol: 590, kd: 9 },
      { kw: "immobilienmarketing", vol: 320, kd: 40 },
      { kw: "immobilien marketing", vol: 260, kd: 21 },
      { kw: "makler werbung", vol: 70, kd: 1 },
      { kw: "immobilien seo", vol: 50, kd: 0 },
      { kw: "makler marketing", vol: 50, kd: 0 },
    ],
  },
  "saas-seo": {
    thema: "B2B- und SaaS-SEO",
    rows: [
      { kw: "b2b seo", vol: 720, kd: 23 },
      { kw: "b2b seo agentur", vol: 720, kd: 9 },
      { kw: "saas marketing", vol: 140, kd: 19 },
      { kw: "saas seo", vol: 110, kd: 10 },
      { kw: "software marketing", vol: 90, kd: 25 },
      { kw: "seo für saas", vol: 20, kd: 0 },
    ],
  },
  /* KFO + Physiotherapeuten bewusst OHNE Keyword-Tabelle: reale Suchvolumina
     dort zu klein für eine ehrliche Potenzial-Darstellung (Semrush 2026-07). */
  "seo-fuer-zahnaerzte": {
    thema: "SEO und Marketing für Zahnärzte",
    rows: [
      { kw: "zahnarzt marketing", vol: 1000, kd: 16 },
      { kw: "seo für zahnärzte", vol: 590, kd: 7 },
      { kw: "webdesign für zahnärzte", vol: 590, kd: 10 },
      { kw: "marketing zahnarztpraxis", vol: 390, kd: 14 },
      { kw: "zahnarztmarketing", vol: 320, kd: 15 },
      { kw: "zahnarztpraxis marketing", vol: 260, kd: 11 },
    ],
  },
  "seo-fuer-heilpraktiker": {
    thema: "SEO und Marketing für Heilpraktiker",
    rows: [
      { kw: "heilpraktiker marketing", vol: 210, kd: 5 },
      { kw: "marketing heilpraktiker", vol: 170, kd: 10 },
      { kw: "webdesign für heilpraktiker", vol: 90, kd: 0 },
      { kw: "seo für heilpraktiker", vol: 70, kd: 1 },
      { kw: "heilpraktiker seo", vol: 30, kd: 0 },
      { kw: "heilpraktiker website", vol: 20, kd: 0 },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   FOTO-THEMEN-BAND — Statement + Bild-Alt je Branche. 21:9-Fotos liegen unter
   /images/branchen-photo/<key>.jpg (key = Slug ohne „seo-fuer-“-Präfix).
═══════════════════════════════════════════════════════════════════════════ */
export type FotoBand = { statement: string; alt: string };

export const FOTO_BAND: Record<string, FotoBand> = {
  "seo-fuer-aerzte": {
    statement: "Patienten suchen Symptome — nicht Ihren Praxisnamen.",
    alt: "Ärztin im Patientengespräch in einer modernen Praxis",
  },
  "seo-fuer-anwaelte": {
    statement: "Mandate entstehen dort, wo Fragen gestellt werden.",
    alt: "Anwalt bei der Fallbesprechung in einer Kanzlei",
  },
  "seo-fuer-online-shops": {
    statement: "Jede organische Kategorie-Position spart Werbebudget.",
    alt: "Mitarbeiterin bereitet Pakete für den Versand in einem Online-Shop vor",
  },
  "seo-fuer-handwerker": {
    statement: "Ihr nächster Auftrag sucht gerade in Ihrer Nähe.",
    alt: "Handwerker bei der Arbeit im Einsatz vor Ort",
  },
  "seo-fuer-immobilienmakler": {
    statement: "Eigentümer entscheiden früher, als Portale es sehen.",
    alt: "Immobilienmakler bei einer Objektbesichtigung mit Eigentümern",
  },
  "saas-seo": {
    statement: "Software wird heute auch von KI empfohlen.",
    alt: "SaaS-Team bespricht die Weiterentwicklung der Software im Büro",
  },
  "seo-fuer-zahnaerzte": {
    statement: "Gesucht wird die Behandlung — nicht Ihr Praxisname.",
    alt: "Modernes Behandlungszimmer einer Zahnarztpraxis mit Zahnärztin und Patientin",
  },
  "seo-fuer-kieferorthopaeden": {
    statement: "Die Praxiswahl fällt Monate vor dem ersten Termin.",
    alt: "Kieferorthopädische Beratung mit Zahnmodell für eine Familie",
  },
  "seo-fuer-physiotherapeuten": {
    statement: "Sichtbarkeit entscheidet, womit Ihr Kalender voll ist.",
    alt: "Physiotherapeut behandelt eine Patientin auf der Behandlungsliege",
  },
  "seo-fuer-heilpraktiker": {
    statement: "Vertrauen entsteht, bevor der erste Termin gebucht wird.",
    alt: "Warmes Beratungsgespräch in einer Naturheilpraxis mit vielen Pflanzen",
  },
};
