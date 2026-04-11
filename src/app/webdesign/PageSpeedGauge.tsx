'use client';

import { useState, useEffect, useRef } from 'react';

export default function PageSpeedGauge() {
  const [score, setScore] = useState(0);
  const [badScore, setBadScore] = useState(0);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = gaugeRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    let start: number | null = null;
    const duration = 1600;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = easeOut(progress);
      setScore(Math.round(eased * 96));
      setBadScore(Math.round(eased * 42));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [triggered]);

  const circumference = 2 * Math.PI * 54;
  const goodOffset = circumference - (score / 100) * circumference;
  const badOffset = circumference - (badScore / 100) * circumference;

  return (
    <div ref={gaugeRef} className="mt-10 rounded-2xl bg-[#1A1A1A] p-8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
      {/* Bad gauge */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-400/70">Vorher</span>
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="54" fill="none" stroke="#ffffff0d" strokeWidth="12" />
          <circle
            cx="70" cy="70" r="54" fill="none" stroke="#ef4444" strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={badOffset}
            transform="rotate(-90 70 70)"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
          <text x="70" y="64" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="system-ui">{badScore}</text>
          <text x="70" y="82" textAnchor="middle" fill="#ffffff60" fontSize="11" fontFamily="system-ui">/100</text>
        </svg>
        <div className="flex flex-col gap-1.5 text-center">
          {[["LCP", "4.8s", "#ef4444"], ["CLS", "0.31", "#f97316"], ["FID", "180ms", "#ef4444"]].map(([k, v, c]) => (
            <span key={k} className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: `${c}20`, color: c }}>{k}: {v}</span>
          ))}
        </div>
        <span className="text-xs text-white/30">Ø Agentur-Website</span>
      </div>

      {/* VS divider */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-white/10 hidden sm:block" />
        <span className="text-sm font-bold text-white/20">VS</span>
        <div className="w-px h-16 bg-white/10 hidden sm:block" />
      </div>

      {/* Good gauge */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Mit SeoForge</span>
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="54" fill="none" stroke="#ffffff0d" strokeWidth="12" />
          <circle
            cx="70" cy="70" r="54" fill="none" stroke="#C2722A" strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={goodOffset}
            transform="rotate(-90 70 70)"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
          <text x="70" y="64" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="system-ui">{score}</text>
          <text x="70" y="82" textAnchor="middle" fill="#ffffff60" fontSize="11" fontFamily="system-ui">/100</text>
        </svg>
        <div className="flex flex-col gap-1.5 text-center">
          {[["LCP", "1.1s", "#22c55e"], ["CLS", "0.02", "#22c55e"], ["FID", "8ms", "#22c55e"]].map(([k, v, c]) => (
            <span key={k} className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: `${c}20`, color: c }}>{k}: {v}</span>
          ))}
        </div>
        <span className="text-xs text-primary/60">SeoForge-Website</span>
      </div>
    </div>
  );
}
