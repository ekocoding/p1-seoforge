import type { Metadata } from "next";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";

export const metadata: Metadata = {
  title: "Impressum | SeoForge",
  description: "Impressum und rechtliche Informationen von SeoForge",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ImpressumPage() {
  return (
    <SubpageLayout>
      <main className="bg-white pt-20">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-dark mb-12 font-[family-name:var(--font-heading)]">
            Impressum
          </h1>

          <div className="prose prose-sm sm:prose max-w-none">
            {/* Angaben gemäß § 5 TMG */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-dark mb-4 font-[family-name:var(--font-heading)]">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="text-base leading-relaxed text-dark">
                <p className="mb-2">
                  <strong>Webdev Ex – Inh. Joel Heuchert</strong>
                </p>
                <p className="mb-2">Kurpfalzstraße 16</p>
                <p className="mb-2">68542 Heddesheim</p>
                <p className="mb-4">Deutschland</p>
              </div>
            </section>

            {/* Kontakt */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-dark mb-4 font-[family-name:var(--font-heading)]">
                Kontakt
              </h2>
              <div className="text-base leading-relaxed text-dark">
                <p className="mb-2">
                  <strong>Telefon:</strong> <a href="tel:015203450695" className="text-primary hover:underline">0152 03450695</a>
                </p>
                <p className="mb-2">
                  <strong>E-Mail:</strong> <a href="mailto:info@seomannheim.com" className="text-primary hover:underline">info@seomannheim.com</a>
                </p>
              </div>
            </section>

            {/* Steuernummer */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-dark mb-4 font-[family-name:var(--font-heading)]">
                Steuernummer
              </h2>
              <div className="text-base leading-relaxed text-dark">
                <p className="mb-2">
                  <strong>Steuernummer:</strong> 47135/40928
                </p>
                <p className="mb-2">
                  <strong>Zuständiges Finanzamt:</strong> Finanzamt Weinheim
                </p>
              </div>
            </section>

            {/* Umsatzsteuer */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-dark mb-4 font-[family-name:var(--font-heading)]">
                Umsatzsteuer
              </h2>
              <div className="text-base leading-relaxed text-dark">
                <p>
                  Gemäß § 19 Abs. 1 UStG wird keine Umsatzsteuer ausgewiesen (Kleinunternehmerregelung).
                </p>
              </div>
            </section>

            {/* Haftungsausschluss */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-dark mb-8 font-[family-name:var(--font-heading)]">
                Haftungsausschluss (Disclaimer)
              </h2>

              {/* Haftung für Inhalte */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-dark mb-3">
                  Haftung für Inhalte
                </h3>
                <div className="text-base leading-relaxed text-muted space-y-3">
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                  <p>
                    Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                  </p>
                </div>
              </div>

              {/* Haftung für Links */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-dark mb-3">
                  Haftung für Links
                </h3>
                <div className="text-base leading-relaxed text-muted space-y-3">
                  <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                  </p>
                  <p>
                    Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                  </p>
                </div>
              </div>

              {/* Urheberrecht */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-dark mb-3">
                  Urheberrecht
                </h3>
                <div className="text-base leading-relaxed text-muted space-y-3">
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                  </p>
                  <p>
                    Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                  </p>
                </div>
              </div>
            </section>

            {/* EU-Streitschlichtung */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-dark mb-4 font-[family-name:var(--font-heading)]">
                EU-Streitschlichtung
              </h2>
              <div className="text-base leading-relaxed text-muted">
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                  . Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </div>
            </section>

            {/* Verbraucherstreitbeilegung */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-dark mb-4 font-[family-name:var(--font-heading)]">
                Verbraucherstreitbeilegung / Universalschlichtungsstelle
              </h2>
              <div className="text-base leading-relaxed text-muted">
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </section>
          </div>

          {/* Back Link */}
          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>
    </SubpageLayout>
  );
}
