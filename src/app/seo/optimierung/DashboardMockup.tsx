"use client";

import { useState, useEffect, useRef } from "react";

export default function DashboardMockup() {
  const [mounted, setMounted] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [circleOffset, setCircleOffset] = useState(534);
  const [progressWidths, setProgressWidths] = useState([0, 0, 0, 0, 0]);
  const [checkmarkVisible, setCheckmarkVisible] = useState([false, false, false]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Start animations after 0.8s delay
    const delayTimer = setTimeout(() => {
      setMounted(true);
    }, 800);

    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Animate circular score gauge
    setCircleOffset(107);

    // Animate score counting from 0 to 92
    const duration = 2000;
    const startTime = performance.now();
    const targetScore = 92;

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // EaseOut timing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentScore = Math.floor(easeOut * targetScore);

      setScoreCount(currentScore);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateCount);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateCount);

    // Animate progress bars with stagger
    const targetWidths = [85, 92, 88, 95, 100];
    targetWidths.forEach((width, index) => {
      setTimeout(() => {
        setProgressWidths(prev => {
          const newWidths = [...prev];
          newWidths[index] = width;
          return newWidths;
        });
      }, index * 200);
    });

    // Animate checkmark items with stagger
    [0, 1, 2].forEach((index) => {
      setTimeout(() => {
        setCheckmarkVisible(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, index * 300);
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted]);

  return (
    <div className="hero-dashboard relative mx-auto mt-12 max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-2xl">
        {/* Dashboard Header */}
        <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-sm font-medium text-muted">SEO Performance</h3>
            <p className="text-xs text-muted/60">Letzte Analyse: Heute, 14:32</p>
          </div>
          <div className="rounded-lg bg-primary/10 px-3 py-1.5 animate-pulse">
            <span className="text-sm font-semibold text-primary">Live</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Performance Score Circle */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              {/* Outer Circle */}
              <svg className="h-48 w-48 -rotate-90 transform" viewBox="0 0 200 200">
                {/* Background Circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="#E5E3DF"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Progress Circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="#C2722A"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="534"
                  strokeDashoffset={circleOffset}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </svg>
              {/* Score Number */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-dark">{scoreCount}</span>
                <span className="text-sm font-medium text-muted">SEO Score</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">Ausgezeichnet</p>
          </div>

          {/* Right: Core Web Vitals */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-dark">Core Web Vitals</h4>

            {/* LCP */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium text-muted">LCP (Largest Contentful Paint)</span>
                <span className="text-xs font-bold text-primary">1.2s</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${progressWidths[0]}%`,
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                ></div>
              </div>
            </div>

            {/* FID */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium text-muted">FID (First Input Delay)</span>
                <span className="text-xs font-bold text-primary">45ms</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${progressWidths[1]}%`,
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                ></div>
              </div>
            </div>

            {/* CLS */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium text-muted">CLS (Cumulative Layout Shift)</span>
                <span className="text-xs font-bold text-primary">0.08</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${progressWidths[2]}%`,
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                ></div>
              </div>
            </div>

            {/* PageSpeed */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium text-muted">PageSpeed Score</span>
                <span className="text-xs font-bold text-primary">95/100</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${progressWidths[3]}%`,
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                ></div>
              </div>
            </div>

            {/* Mobile Friendly */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Mobile Friendly</span>
                <span className="text-xs font-bold text-primary">100%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${progressWidths[4]}%`,
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Suggestions */}
        <div className="mt-8 border-t border-border pt-6">
          <h4 className="mb-4 text-sm font-semibold text-dark">Optimierungsempfehlungen</h4>
          <div className="space-y-3">
            <div
              className="flex items-start gap-3 rounded-lg bg-offwhite p-3"
              style={{
                opacity: checkmarkVisible[0] ? 1 : 0,
                transform: checkmarkVisible[0] ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
              }}
            >
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-dark">Strukturierte Daten implementiert</p>
                <p className="text-xs text-muted/80">Schema.org Markup für bessere SERP-Features</p>
              </div>
            </div>

            <div
              className="flex items-start gap-3 rounded-lg bg-offwhite p-3"
              style={{
                opacity: checkmarkVisible[1] ? 1 : 0,
                transform: checkmarkVisible[1] ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
              }}
            >
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-dark">Bilder komprimiert</p>
                <p className="text-xs text-muted/80">WebP-Format für 40% schnellere Ladezeiten</p>
              </div>
            </div>

            <div
              className="flex items-start gap-3 rounded-lg bg-offwhite p-3"
              style={{
                opacity: checkmarkVisible[2] ? 1 : 0,
                transform: checkmarkVisible[2] ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
              }}
            >
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary/30">
                <svg className="h-3 w-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-dark">Meta-Beschreibungen optimiert</p>
                <p className="text-xs text-muted/80">Click-Through-Rate um 23% gesteigert</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-secondary/5 blur-3xl"></div>
    </div>
  );
}
