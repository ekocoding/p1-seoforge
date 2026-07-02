"use client";

import { useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  WHITE MARBLE SHADER  —  fractional Brownian motion + domain warping
//  Palette: offwhite dominant (#F8F7F5) · warm ivory veins · rare brand orange
// ─────────────────────────────────────────────────────────────────────────────
function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const t0Ref     = useRef<number>(0);
  const mouseRef  = useRef<[number, number]>([0.5, 0.5]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    /* ── Vertex shader ──────────────────────────────────────────────────── */
    const VS = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    /* ── Fragment shader — white marble ─────────────────────────────────── */
    const FS = `
      precision mediump float;
      uniform float u_time;
      uniform vec2  u_res;
      uniform vec2  u_mouse;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i),             hash(i + vec2(1.0, 0.0)), f.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
          f.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
        for (int i = 0; i < 6; i++) {
          v += a * noise(p);
          p  = rot * p * 2.1 + vec2(1.7, 9.2);
          a *= 0.48;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res;
        /* mirror y so top is brighter — feels like natural light from above */
        uv.y = 1.0 - uv.y;

        float t = u_time * 0.048;   /* slow, luxurious drift */

        vec2 q = vec2(
          fbm(uv * 1.6 + t * 0.6),
          fbm(uv * 1.6 + vec2(5.2, 1.3) + t)
        );
        vec2 r = vec2(
          fbm(uv * 1.6 + 2.2 * q + vec2(1.7, 9.2) + t * 0.75),
          fbm(uv * 1.6 + 2.2 * q + vec2(8.3, 2.8) + t * 0.65)
        );
        float f = fbm(uv * 1.6 + 2.8 * r);

        /* Mouse proximity — warm brightening where cursor rests */
        float md = length(uv - u_mouse);
        f += 0.07 * smoothstep(0.45, 0.0, md);

        /* ── White marble palette ──────────────────────────────────────────
           snow    #FAFAF9  near-white highlight
           ivory   #F8F7F5  offwhite base (brand bg)
           cream   #F2EDE6  very warm, subtle
           vein    #E8DDD4  sandy-warm vein
           accent  #C2722A  brand orange — almost never visible, rare peaks
        ─────────────────────────────────────────────────────────────────── */
        vec3 snow   = vec3(0.980, 0.980, 0.976);
        vec3 ivory  = vec3(0.972, 0.969, 0.961);
        vec3 cream  = vec3(0.949, 0.929, 0.902);
        vec3 vein   = vec3(0.910, 0.867, 0.831);
        vec3 accent = vec3(0.761, 0.447, 0.165);

        vec3 col = mix(snow,  ivory,  smoothstep(0.22, 0.44, f));
        col      = mix(col,   cream,  smoothstep(0.44, 0.60, f));
        col      = mix(col,   vein,   smoothstep(0.60, 0.72, f) * 0.55);
        /* rare, ultra-subtle brand orange — only at extreme noise peaks */
        col      = mix(col,   accent, pow(max(f - 0.73, 0.0), 3.2) * 0.22);

        /* Very gentle center-brightening (inverse vignette) */
        vec2  c    = uv - 0.5;
        float vig  = 1.0 - dot(c, c) * 0.22;
        col *= vig;

        /* Subtle top-light: slightly brighter at top-center */
        float topLight = 1.0 - length(uv - vec2(0.5, 0.08)) * 0.35;
        col += vec3(0.008) * clamp(topLight, 0.0, 1.0);

        col = clamp(col, 0.0, 1.0);
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    /* ── Compile & link ─────────────────────────────────────────────────── */
    function mkShader(type: number, src: string) {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      return sh;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER,   VS));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    /* ── Resize handler ─────────────────────────────────────────────────── */
    function resize() {
      canvas!.width  = canvas!.clientWidth  * window.devicePixelRatio;
      canvas!.height = canvas!.clientHeight * window.devicePixelRatio;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── Mouse tracking ─────────────────────────────────────────────────── */
    function onMouse(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      mouseRef.current = [
        (e.clientX - r.left) / r.width,
        1.0 - (e.clientY - r.top) / r.height,
      ];
    }
    window.addEventListener("mousemove", onMouse);

    /* ── Render loop ────────────────────────────────────────────────────── */
    function frame(ts: number) {
      if (!t0Ref.current) t0Ref.current = ts;
      const t = (ts - t0Ref.current) * 0.001;
      gl!.uniform1f(uTime,  t);
      gl!.uniform2f(uRes,   canvas!.width, canvas!.height);
      gl!.uniform2f(uMouse, mouseRef.current[0], mouseRef.current[1]);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO EXPORT
───────────────────────────────────────────────────────────────────────────── */
export default function LeistungenHero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-offwhite overflow-hidden pt-20"
    >
      {/* WebGL marble shader */}
      <ShaderCanvas />

      {/* Subtle grain texture overlay — adds premium paper feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />

      {/* Decorative watermark — dark, barely visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0.028 }}
      >
        <span
          className="font-[family-name:var(--font-heading)] font-black text-dark leading-none"
          style={{ fontSize: "clamp(160px, 28vw, 420px)" }}
        >
          03
        </span>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Badge */}
        <p className="hero-badge text-[11px] font-semibold uppercase tracking-[0.3em] text-primary mb-7">
          SeoForge · Leistungen
        </p>

        {/* Headline */}
        <h1
          className="hero-title font-[family-name:var(--font-heading)] text-dark leading-[1.05] mb-7"
        >
          Vier Bereiche.<br />
          <span className="gradient-text">Eine Agentur.</span>
        </h1>

        {/* Sub-copy */}
        <p className="hero-description text-lg text-muted max-w-lg mx-auto mb-14 leading-relaxed">
          SEO, GEO, Webdesign und KI-SEO — strategisch verzahnt, messbar wirksam,
          vollständig aus einer Hand.
        </p>

        {/* Anchor pills */}
        <div className="hero-cta flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "01 · SEO",       href: "#seo"       },
            { label: "02 · GEO",       href: "#geo"       },
            { label: "03 · Webdesign", href: "#webdesign" },
            { label: "04 · KI-SEO",    href: "#ki-seo"    },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="group inline-flex items-center gap-2.5 border border-dark/[0.1] text-dark/55 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium hover:border-primary/40 hover:text-dark hover:bg-white/70 transition-all duration-200"
            >
              {label}
              <span className="text-primary text-xs float-chevron">↓</span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom separator — thin line for clean transition to dark section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-dark/[0.06]" />

      {/* Scroll label */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
        <span className="text-[10px] text-dark font-mono tracking-[0.3em]">SCROLL</span>
        <span className="text-dark text-xs float-chevron">↓</span>
      </div>
    </section>
  );
}
