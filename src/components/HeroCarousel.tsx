"use client";

import { Children, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const INTERVAL = 7000;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * Rota los slides del hero. Se pausa al pasar el mouse o enfocar un elemento,
 * cuando la pestaña no está visible, y no avanza solo si el usuario prefiere menos movimiento.
 */
export default function HeroCarousel({ labels, children }: { labels: string[]; children: ReactNode }) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [active, setActive] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
  // null = el usuario no ha tocado pausa/play: rota solo si no prefiere menos movimiento
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const playing = userPlaying ?? !reducedMotion;
  const [held, setHeld] = useState(false); // hover o foco dentro del carrusel
  const touchX = useRef<number | null>(null);

  const go = useCallback((index: number) => setActive((index + count) % count), [count]);

  useEffect(() => {
    if (!playing || held) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % count);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, [playing, held, active, count]);

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Servicios destacados"
      className="relative"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="grid xl:h-[clamp(32rem,calc(100svh-10rem),50rem)]" aria-live={playing && !held ? "off" : "polite"}>
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${count}: ${labels[i] ?? ""}`}
            aria-hidden={i !== active}
            inert={i !== active}
            className={`col-start-1 row-start-1 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
              i === active ? "hero-slide-active z-10 opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-5 z-20 mx-auto flex max-w-7xl items-center gap-3 px-5 lg:bottom-8 lg:px-8">
        <button
          type="button"
          onClick={() => setUserPlaying(!playing)}
          aria-label={playing ? "Pausar carrusel" : "Reproducir carrusel"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-brand-ink/60 text-white backdrop-blur transition-colors hover:border-brand-green hover:text-brand-green"
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Slide anterior"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-brand-ink/60 text-white backdrop-blur transition-colors hover:border-brand-green hover:text-brand-green"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir al slide ${i + 1}: ${labels[i] ?? ""}`}
              aria-current={i === active}
              className="group flex h-9 items-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-brand-green" : "w-4 bg-white/35 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Slide siguiente"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-brand-ink/60 text-white backdrop-blur transition-colors hover:border-brand-green hover:text-brand-green"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
