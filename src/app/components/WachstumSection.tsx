import Image from 'next/image'

const stufen = [
  {
    nr: 1,
    img: '/images/wachstum/stufe1.png',
    label: 'Stufe 1',
    title: 'Unsichtbar',
    desc: 'Deine Website existiert — aber Google findet sie kaum. Kunden kommen nur durch Empfehlungen.',
  },
  {
    nr: 2,
    img: '/images/wachstum/stufe2.png',
    label: 'Stufe 2',
    title: 'Erste Rankings',
    desc: 'Du tauchst in Suchergebnissen auf. Erste organische Anfragen kommen rein — noch nicht konstant.',
  },
  {
    nr: 3,
    img: '/images/wachstum/stufe3.png',
    label: 'Stufe 3',
    title: 'Wachstum',
    desc: 'Solide Rankings für relevante Keywords. Dein organischer Traffic wächst Monat für Monat.',
  },
  {
    nr: 4,
    img: '/images/wachstum/stufe4.png',
    label: 'Stufe 4',
    title: 'Marktführer',
    desc: 'Du dominierst deine Nische. Kunden finden dich zuerst — vor allen Mitbewerbern.',
  },
]

export default function WachstumSection() {
  return (
    <section className="bg-offwhite border-y border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Dein Wachstum
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-dark font-[family-name:var(--font-heading)] leading-tight mb-4">
            Wo wir dein Business <span className="text-primary">hinbringen.</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            SEO ist kein Trick — es ist der systematische Aufbau von Sichtbarkeit. Wir zeigen dir, auf welcher Stufe du gerade stehst und wo die Reise hingeht.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stufen.map((s, i) => (
            <div key={s.nr} className="relative flex flex-col items-center text-center">

              {/* Connector arrow (desktop) */}
              {i < 3 && (
                <div className="hidden lg:block absolute top-[72px] left-[calc(100%-8px)] z-10 text-border text-lg select-none pointer-events-none">
                  →
                </div>
              )}

              {/* Image */}
              <div className="relative w-[120px] h-[120px] lg:w-[140px] lg:h-[140px] mb-5">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="140px"
                />
                {/* Step badge */}
                <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {s.nr}
                </span>
              </div>

              {/* Divider */}
              <span className="block w-8 h-[2px] rounded bg-primary/30 mb-3" />

              {/* Label */}
              <span className="text-[10px] font-bold tracking-widest uppercase text-primary/60 mb-1">
                {s.label}
              </span>

              {/* Title */}
              <h3 className="font-bold text-dark text-sm lg:text-base mb-2 font-[family-name:var(--font-heading)]">
                {s.title}
              </h3>

              {/* Desc */}
              <p className="text-xs lg:text-sm text-muted leading-relaxed max-w-[160px]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
