"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED WHITE HERO SHADER — FBM domain warping (Inigo Quilez)
   Off-white dominant, sichtbare Orange/Gold-Schlieren, maus-interaktiv.
   Wird von allen Webdesign-Subpage-Heroes verwendet — KEIN dunkler Dimmer.
═══════════════════════════════════════════════════════════════════════════ */
export default function HeroShaderWhite() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const t0Ref     = useRef<number>(0);
  const mouseRef  = useRef<[number, number]>([0.5, 0.5]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const VS = `attribute vec2 a_pos; void main(){gl_Position=vec4(a_pos,0.,1.);}`;
    const FS = `
      precision mediump float;
      uniform float u_time;
      uniform vec2  u_res;
      uniform vec2  u_mouse;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){
        vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
      }
      float fbm(vec2 p){
        float v=0.,a=.5;mat2 r=mat2(.8,.6,-.6,.8);
        for(int i=0;i<6;i++){v+=a*noise(p);p=r*p*2.1+vec2(1.7,9.2);a*=.48;}
        return v;
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/u_res;
        float t=u_time*.10;
        vec2 q=vec2(fbm(uv*2.2+t*.75),fbm(uv*2.2+vec2(5.2,1.3)+t));
        vec2 r=vec2(fbm(uv*2.2+3.6*q+vec2(1.7,9.2)+t*.95),fbm(uv*2.2+3.6*q+vec2(8.3,2.8)+t*.8));
        float f=fbm(uv*2.2+3.6*r);

        float md=length(uv-u_mouse);
        f+=.11*smoothstep(.5,0.,md);

        vec3 base  =vec3(1.,.988,.976);
        vec3 warm  =vec3(.993,.955,.898);
        vec3 orange=vec3(.761,.447,.165);
        vec3 gold  =vec3(.831,.659,.325);
        vec3 col=mix(base,warm,smoothstep(.24,.58,f));
        col=mix(col,orange,smoothstep(.50,.80,f)*.32);
        col=mix(col,gold,pow(max(f-.62,0.),1.9)*2.2*.22);

        vec2 c=uv-.5;
        col*=1.-dot(c,c)*1.2;
        gl_FragColor=vec4(col,1.);
      }
    `;

    function mkSh(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkSh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, mkSh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    function resize() {
      canvas!.width  = canvas!.clientWidth  * (window.devicePixelRatio || 1);
      canvas!.height = canvas!.clientHeight * (window.devicePixelRatio || 1);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function onMouse(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      mouseRef.current = [
        (e.clientX - r.left) / r.width,
        1.0 - (e.clientY - r.top) / r.height,
      ];
    }
    window.addEventListener("mousemove", onMouse);

    function frame(ts: number) {
      if (!t0Ref.current) t0Ref.current = ts;
      gl!.uniform1f(uTime, (ts - t0Ref.current) * 0.001);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
