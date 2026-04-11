"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const platforms = [
  {
    name: "AI Overviews",
    company: "Google",
    users: "Milliarden",
    description: "Generative Antworten direkt in der Google-Suche über den organischen Ergebnissen.",
    geoOpportunity: "Top-Position über allen organischen Ergebnissen",
    color: "#EA4335",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
      </svg>
    )
  },
  {
    name: "ChatGPT",
    company: "OpenAI",
    users: "200M+",
    description: "Der Marktführer unter den KI-Chatbots mit ausführlichen Antworten.",
    geoOpportunity: "Als empfohlene Lösung in Antworten erscheinen",
    color: "#10A37F",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    )
  },
  {
    name: "Gemini",
    company: "Google",
    users: "150M+",
    description: "Googles KI-Assistent, integriert in Search, Workspace und Android.",
    geoOpportunity: "Sichtbarkeit im gesamten Google-Ökosystem",
    color: "#4285F4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/>
      </svg>
    )
  },
  {
    name: "Copilot",
    company: "Microsoft",
    users: "100M+",
    description: "In Bing, Edge, Windows und Office 365 integrierter KI-Assistent.",
    geoOpportunity: "Präsenz im Microsoft-Ökosystem",
    color: "#0078D4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z"/>
      </svg>
    )
  },
  {
    name: "Perplexity",
    company: "Perplexity AI",
    users: "10M+",
    description: "KI-Suchmaschine mit Fokus auf Quellenangaben und Links.",
    geoOpportunity: "Direkte Verlinkung als Quelle",
    color: "#20808D",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/>
      </svg>
    )
  },
  {
    name: "Claude",
    company: "Anthropic",
    users: "Millionen",
    description: "Fokus auf sichere, hilfreiche KI-Antworten für komplexe Recherche.",
    geoOpportunity: "Als vertrauenswürdige Quelle für komplexe Themen",
    color: "#CC785C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/>
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

export default function PlatformsGrid() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);
  const [selectedPlatform, setSelectedPlatform] = useState<typeof platforms[0] | null>(platforms[0]);

  return (
    <section className="py-20 lg:py-28 bg-dark text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark to-[#0a0a0a]" />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-white/80">Multi-Plattform Strategie</span>
            </span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-heading)] mb-6">
              Wo Ihre Marke{" "}
              <span className="text-primary">sichtbar</span>{" "}
              werden muss
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              KI-Systeme beantworten Fragen direkt – ohne dass Nutzer Websites besuchen. 
              Wir helfen Ihnen, auf allen relevanten Plattformen sichtbar zu werden.
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Vertical Stack of Platform Cards */}
          <div className={`flex flex-col gap-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {platforms.map((platform, index) => (
              <button
                key={platform.name}
                onClick={() => setSelectedPlatform(platform)}
                className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group text-left ${
                  selectedPlatform?.name === platform.name
                    ? 'bg-white/10 border-primary/50 shadow-lg shadow-primary/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center p-2.5 flex-shrink-0"
                  style={{ backgroundColor: `${platform.color}15`, color: platform.color }}
                >
                  {platform.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-[family-name:var(--font-heading)] text-white text-base">
                    {platform.name}
                  </h3>
                  <p className="text-xs text-white/40">{platform.company} • {platform.users} Nutzer</p>
                </div>

                {/* Arrow */}
                <svg 
                  className={`w-5 h-5 transition-all duration-300 flex-shrink-0 ${
                    selectedPlatform?.name === platform.name 
                      ? 'text-primary translate-x-0 opacity-100' 
                      : 'text-white/20 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>

                {/* Selection Indicator */}
                {selectedPlatform?.name === platform.name && (
                  <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-0.5 h-10 bg-primary rounded-l-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Detail Panel */}
          <div className={`transition-all duration-500 delay-300 h-[420px] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {selectedPlatform ? (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10 flex-shrink-0">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center p-3 flex-shrink-0"
                    style={{ backgroundColor: `${selectedPlatform.color}15`, color: selectedPlatform.color }}
                  >
                    {selectedPlatform.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-[family-name:var(--font-heading)] text-white mb-0.5">
                      {selectedPlatform.name}
                    </h3>
                    <p className="text-xs text-white/40">{selectedPlatform.company} • {selectedPlatform.users} Nutzer</p>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                  <p className="text-sm text-white/80 leading-relaxed">
                    {selectedPlatform.description}
                  </p>

                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <h4 className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
                      GEO-Opportunität
                    </h4>
                    <p className="text-sm text-white/90">
                      {selectedPlatform.geoOpportunity}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">Warum wichtig?</h4>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Auf {selectedPlatform.name} suchen täglich Millionen Nutzer nach Antworten. 
                      GEO sorgt dafür, dass Ihre Marke in diesen Antworten erscheint.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs text-white/40">Aktive Nutzer</span>
                    <span 
                      className="text-xl font-[family-name:var(--font-heading)]"
                      style={{ color: selectedPlatform.color }}
                    >
                      {selectedPlatform.users}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </section>
  );
}
