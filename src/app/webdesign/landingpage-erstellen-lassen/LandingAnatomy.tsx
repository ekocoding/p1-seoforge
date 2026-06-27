import Image from "next/image";

const PRINCIPLES = [
  { nr: "01", title: "Message Match", desc: "Headline = Versprechen der Anzeige. Wer klickt, bleibt." },
  { nr: "02", title: "Ein Ziel, ein CTA", desc: "Keine Navigation, keine Ablenkung — eine Handlung." },
  { nr: "03", title: "Social Proof am Zweifelpunkt", desc: "Bewertungen genau dort, wo Skepsis entsteht." },
  { nr: "04", title: "Formular: so kurz wie möglich", desc: "Nur abfragen, was das Sales-Team wirklich braucht." },
  { nr: "05", title: "Ladezeit unter 2 Sekunden", desc: "Custom Code statt Pagebuilder — messbar schneller." },
  { nr: "06", title: "Tracking ab Tag 1", desc: "GA4, Ads-Conversion & Meta Pixel ab dem ersten Klick." },
];

export default function LandingAnatomy() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,430px)_1fr] gap-8 lg:gap-16 items-center">
      {/* ── 3D-Landingpage (rahmenlos, eigener Schatten) ──────────────────── */}
      <div className="scroll-hidden mx-auto w-full max-w-[430px]">
        <Image
          src="/images/landingpage-anatomie.webp"
          alt="Aufbau einer conversion-optimierten Landingpage: Hero, Benefit-Blöcke, Social Proof und klarer Call-to-Action"
          width={1100}
          height={1100}
          className="h-auto w-full"
        />
      </div>

      {/* ── Prinzipien-Liste (Nummer + Titel + knapper Einzeiler) ─────────── */}
      <ul className="scroll-hidden divide-y divide-border border-y border-border">
        {PRINCIPLES.map((p) => (
          <li key={p.nr} className="group flex items-start gap-4 py-3.5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/[0.08] font-mono text-xs font-bold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              {p.nr.replace("0", "")}
            </span>
            <div>
              <h3 className="text-[15px] font-bold leading-snug text-dark transition-colors duration-300 group-hover:text-primary">
                {p.title}
              </h3>
              <p className="mt-0.5 text-[13px] leading-snug text-muted">{p.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
