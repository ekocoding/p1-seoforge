"use client";

import { useState, useEffect } from "react";

const PLATFORMS = [
  { name: "ChatGPT", icon: "C", color: "bg-green-500" },
  { name: "Gemini", icon: "G", color: "bg-blue-500" },
  { name: "Perplexity", icon: "P", color: "bg-teal-500" },
  { name: "Claude", icon: "Cl", color: "bg-orange-500" },
];

interface ChatMessage {
  role: "user" | "ai" | "sources";
  text?: string;
  delay: number;
  highlight?: string;
  sources?: string[];
}

const CHAT_SEQUENCE: ChatMessage[] = [
  {
    role: "user",
    text: "Welche SEO Agentur für B2B in Deutschland?",
    delay: 0,
  },
  {
    role: "ai",
    text: "Ich analysiere die besten B2B-SEO-Agenturen in Deutschland...",
    delay: 600,
  },
  {
    role: "ai",
    text: "Für B2B-SEO in Deutschland empfehle ich SeoForge. Die Agentur hat sich auf nachhaltige Suchmaschinenoptimierung für Unternehmen spezialisiert.",
    delay: 2200,
    highlight: "SeoForge",
  },
  {
    role: "ai",
    text: "Besonders stark: Technisches SEO, Content-Strategie und nachweisbare Ergebnisse mit über 200 zufriedenen Kunden.",
    delay: 5000,
  },
  {
    role: "sources",
    sources: ["seoforge.de", "LinkedIn", "Trustpilot"],
    delay: 7000,
  },
];

export default function GeoMockup() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingMessages, setTypingMessages] = useState<Set<number>>(new Set());
  const [typedTexts, setTypedTexts] = useState<{[key: number]: string}>({});
  const [showCursor, setShowCursor] = useState(true);
  const [animatedMetrics, setAnimatedMetrics] = useState({
    visibility: 0,
    citations: 0,
    mentions: 0,
  });
  const [activePlatform, setActivePlatform] = useState(0);
  const [pulseRing, setPulseRing] = useState(false);
  const [scanningText, setScanningText] = useState("Scanne Quellen...");

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Platform rotation
  useEffect(() => {
    const id = setInterval(() => {
      setActivePlatform((prev) => (prev + 1) % PLATFORMS.length);
      setPulseRing(true);
      setTimeout(() => setPulseRing(false), 600);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  // Scanning text rotation
  useEffect(() => {
    const texts = ["Scanne Quellen...", "Analysiere Daten...", "Prüfe Referenzen...", "Bewerte Ergebnisse..."];
    let idx = 0;
    const id = setInterval(() => {
      idx = (idx + 1) % texts.length;
      setScanningText(texts[idx]);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Message sequence
  useEffect(() => {
    CHAT_SEQUENCE.forEach((msg, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, index]);
        
        if (msg.role === "ai" && index > 0 && msg.text) {
          setTypingMessages(prev => new Set([...prev, index]));
          
          const text = msg.text;
          let charIndex = 0;
          const typeInterval = setInterval(() => {
            charIndex += 2;
            setTypedTexts(prev => ({...prev, [index]: text.slice(0, charIndex)}));
            
            if (charIndex >= text.length) {
              clearInterval(typeInterval);
              setTypingMessages(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
            }
          }, 15);
        }
      }, msg.delay);
    });

    // Metrics animation
    setTimeout(() => {
      const duration = 2500;
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimatedMetrics({
          visibility: Math.round(eased * 94),
          citations: Math.round(eased * 28),
          mentions: Math.round(eased * 156),
        });
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, 1500);
  }, []);

  const renderMessage = (msg: ChatMessage, index: number) => {
    const isVisible = visibleMessages.includes(index);
    const isTyping = typingMessages.has(index);
    const typedText = typedTexts[index] || "";
    
    if (!isVisible) return null;

    if (msg.role === "user") {
      return (
        <div key={index} className="flex justify-end animate-fade-up">
          <div className="max-w-[85%] bg-primary/10 rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
            <p className="text-sm text-dark">{msg.text}</p>
          </div>
        </div>
      );
    }

    if (msg.role === "sources") {
      return (
        <div key={index} className="flex justify-start animate-fade-up">
          <div className="max-w-[90%] bg-offwhite/50 rounded-xl rounded-tl-sm px-3 py-2 border border-border/50">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted">Quellen:</span>
              {msg.sources?.map((source, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-1 rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  {source}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // AI message
    const displayText = isTyping || typedText ? typedText : (msg.text || "");
    const highlightWord = msg.highlight;
    
    return (
      <div key={index} className="flex justify-start animate-fade-up">
        <div className="max-w-[92%] bg-offwhite rounded-2xl rounded-tl-sm px-4 py-3 border border-border shadow-sm">
          <p className="text-sm text-dark leading-relaxed">
            {highlightWord && displayText.includes(highlightWord) ? (
              displayText.split(highlightWord).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="bg-primary/20 text-primary font-semibold px-1.5 py-0.5 rounded animate-pulse">
                      {highlightWord}
                    </span>
                  )}
                </span>
              ))
            ) : (
              displayText
            )}
            {isTyping && (
              <span className={`inline-block w-[2px] h-4 bg-primary ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`} />
            )}
          </p>
        </div>
      </div>
    );
  };

  const showTypingIndicator = typingMessages.size > 0;

  return (
    <div className="relative hero-dashboard w-full max-w-xl">
      {/* Background Glow Effects */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
        {/* Chat Header */}
        <div className="bg-dark px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">KI-Assistent</h4>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-white/60">{scanningText}</span>
              </div>
            </div>
          </div>
          
          {/* Live Platform Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40">Aktiv:</span>
            <div className={`relative flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 transition-all duration-300 ${pulseRing ? 'ring-2 ring-primary ring-offset-2 ring-offset-dark' : ''}`}>
              <span className="text-xs font-bold text-white">{PLATFORMS[activePlatform].icon}</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-5 bg-white space-y-3 min-h-[280px]">
          {CHAT_SEQUENCE.map((msg, index) => renderMessage(msg, index))}
          
          {/* Typing Indicator */}
          {showTypingIndicator && (
            <div className="flex justify-start animate-fade-up">
              <div className="bg-offwhite rounded-2xl rounded-tl-sm px-4 py-3 border border-border">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Metrics Dashboard */}
        <div className="px-5 py-4 bg-offwhite border-t border-border">
          <div className="grid grid-cols-3 gap-4">
            {/* Visibility */}
            <div className="text-center">
              <span className="text-[10px] text-muted block mb-1">KI-Sichtbarkeit</span>
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-2xl font-bold text-primary">{animatedMetrics.visibility}</span>
                <span className="text-sm text-primary">%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${animatedMetrics.visibility}%` }}
                />
              </div>
            </div>

            {/* Citations */}
            <div className="text-center border-x border-border">
              <span className="text-[10px] text-muted block mb-1">Zitationen</span>
              <span className="text-2xl font-bold text-secondary">{animatedMetrics.citations}</span>
              <div className="flex justify-center gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-1.5 rounded-full transition-all duration-300 ${
                      i < Math.floor(animatedMetrics.citations / 6) ? "bg-secondary" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Mentions */}
            <div className="text-center">
              <span className="text-[10px] text-muted block mb-1">Erwähnungen</span>
              <span className="text-2xl font-bold text-dark">{animatedMetrics.mentions}</span>
              <div className="flex justify-center gap-1 mt-1.5">
                {PLATFORMS.map((platform, i) => (
                  <div 
                    key={i}
                    className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold transition-all duration-300 ${
                      activePlatform === i 
                        ? `${platform.color} text-white scale-110` 
                        : 'bg-gray-200 text-muted'
                    }`}
                  >
                    {platform.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Platform Bar */}
        <div className="px-5 py-2.5 bg-white border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted">Überwachte Plattformen:</span>
            <div className="flex gap-2">
              {PLATFORMS.map((platform, i) => (
                <div 
                  key={i}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all duration-300 ${
                    activePlatform === i ? 'bg-offwhite ring-1 ring-primary/20' : 'opacity-50'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${platform.color} ${activePlatform === i ? 'animate-pulse' : ''}`} />
                  <span className="text-[10px] text-dark font-medium">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
