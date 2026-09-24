"use client";

import { useEffect, useRef } from "react";
import { BrainCircuit, Cloud, Code2, Server, ShieldCheck } from "lucide-react";

const items = [
  { icon: Cloud, label: "Cloud AWS", caption: "EC2 · S3 · Alta disponibilidad" },
  { icon: ShieldCheck, label: "Ciberseguridad", caption: "Firewalls · Antivirus" },
  { icon: BrainCircuit, label: "Inteligencia Artificial", caption: "Chatbots · Automatización" },
  { icon: Code2, label: "Desarrollo Web", caption: "Sitios · Ecommerce · SEO" },
  { icon: Server, label: "Hosting", caption: "Dominios · Correo · cPanel" },
];

const RADIUS_X = 205;
const RADIUS_Y = 118;
const SPEED = 0.00022; // radianes por milisegundo (~28 s por vuelta)
const HOVER_SPEED = 0.00003;
const SPHERE = 208; // px, igual a h-52

export default function HeroOrbit() {
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = -Math.PI / 2;
    let speed = SPEED;
    let targetSpeed = SPEED;
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let last = performance.now();
    let frame = 0;
    let visible = true;

    const render = () => {
      const count = items.length;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = angle + (i / count) * Math.PI * 2;
        const depth = Math.sin(a); // -1 atrás, 1 adelante
        const x = Math.cos(a) * RADIUS_X;
        const y = depth * RADIUS_Y;
        const scale = 0.72 + (depth + 1) * 0.19;
        el.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = (0.4 + (depth + 1) * 0.3).toFixed(3);
        el.style.zIndex = depth > 0 ? "30" : "10";
        el.style.filter = depth < -0.3 ? `blur(${((-depth - 0.3) * 2).toFixed(2)}px)` : "none";
      });
      stage.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      speed += (targetSpeed - speed) * 0.06;
      angle += speed * dt;
      tiltX += (targetTiltX - tiltX) * 0.06;
      tiltY += (targetTiltY - tiltY) * 0.06;
      render();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion || frame || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    render();
    if (reduceMotion) return;

    const section = stage.closest("section") ?? stage;
    const onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = px * 16;
      targetTiltX = -py * 12;
    };
    const onPointerLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };
    const onOver = (event: Event) => {
      if ((event.target as Element).closest("li")) targetSpeed = HOVER_SPEED;
    };
    const onOut = () => {
      targetSpeed = SPEED;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(stage);

    section.addEventListener("pointermove", onPointerMove as EventListener, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    stage.addEventListener("pointerover", onOver);
    stage.addEventListener("pointerout", onOut);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      observer.disconnect();
      section.removeEventListener("pointermove", onPointerMove as EventListener);
      section.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("pointerover", onOver);
      stage.removeEventListener("pointerout", onOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-lg items-center justify-center [perspective:1200px] lg:flex">
      <div ref={stageRef} className="relative h-full w-full will-change-transform">
        {/* Órbita */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="-256 -256 512 512"
        >
          <ellipse
            rx={RADIUS_X}
            ry={RADIUS_Y}
            fill="none"
            stroke="rgba(124,194,66,0.35)"
            strokeDasharray="2 7"
            strokeLinecap="round"
          />
          <ellipse
            rx={RADIUS_X + 36}
            ry={RADIUS_Y + 14}
            fill="none"
            stroke="rgba(124,194,66,0.12)"
          />
        </svg>

        {/* Núcleo: esfera de alambre girando */}
        <div className="absolute left-1/2 top-1/2 z-20 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className="absolute inset-[-30%] rounded-full bg-brand-green/20 blur-3xl" />
          <div className="hero-sphere absolute inset-0 [transform-style:preserve-3d]">
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <span
                key={`m${deg}`}
                className="absolute inset-0 rounded-full border border-brand-green/50"
                style={{ transform: `rotateY(${deg}deg)` }}
              />
            ))}
            {[-0.66, -0.33, 0, 0.33, 0.66].map((t) => {
              const size = Math.sqrt(1 - t * t) * SPHERE;
              return (
                <span
                  key={`p${t}`}
                  className="absolute left-1/2 top-1/2 rounded-full border border-brand-green/35"
                  style={{
                    width: size,
                    height: size,
                    marginLeft: -size / 2,
                    marginTop: -size / 2,
                    transform: `translateY(${(t * SPHERE) / 2}px) rotateX(90deg)`,
                  }}
                />
              );
            })}
          </div>
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-brand-charcoal/80 shadow-[0_0_60px_rgba(124,194,66,0.35)] backdrop-blur-sm">
            <span className="font-heading text-3xl font-extrabold tracking-tight text-white">
              SFR
            </span>
          </div>
        </div>

        {/* Tarjetas en órbita */}
        <ul aria-label="Especialidades">
          {items.map(({ icon: Icon, label, caption }, i) => (
            <li
              key={label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 flex cursor-default items-center gap-3 whitespace-nowrap rounded-2xl border border-white/60 bg-white/95 py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] will-change-transform"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-brand-green-dark text-white shadow-inner">
                <Icon size={20} strokeWidth={2.2} />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-bold leading-tight text-brand-charcoal">
                  {label}
                </span>
                <span className="text-[11px] font-medium leading-tight text-brand-charcoal-light/60">
                  {caption}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
