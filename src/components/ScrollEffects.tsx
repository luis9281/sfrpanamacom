"use client";

import { useEffect } from "react";

/**
 * Efectos de scroll para toda la página:
 * - [data-reveal="up|left|right|zoom"]: entra al aparecer en pantalla.
 *   Los hijos directos de [data-reveal-stagger] entran uno por uno.
 * - [data-count]: cuenta desde 0 hasta el número al aparecer.
 * - [data-parallax="0.2"]: se desplaza a otra velocidad que el scroll.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
      Array.from(group.children).forEach((child) => {
        const el = child as HTMLElement;
        el.dataset.reveal ||= group.dataset.revealStagger || "up";
      });
    });

    const countUp = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      const duration = 1400;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const pending = new Set<HTMLElement>();
    const reveal = (el: HTMLElement, order: number) => {
      if (!pending.delete(el)) return;
      el.style.setProperty("--reveal-delay", `${order * 90}ms`);
      el.classList.add("is-visible");
      if (el.dataset.count && !reduceMotion) countUp(el);
      revealObserver.unobserve(el);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        // Los que aparecen a la vez entran escalonados, en orden.
        let order = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement, order++);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal], [data-count]").forEach((el) => {
      pending.add(el);
      revealObserver.observe(el);
    });

    if (reduceMotion) return () => revealObserver.disconnect();

    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const inView = new Set<HTMLElement>();
    const parallaxObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) inView.add(el);
        else inView.delete(el);
      });
      schedule();
    });
    parallaxEls.forEach((el) => parallaxObserver.observe(el));

    let frame = 0;
    const update = () => {
      frame = 0;
      // Respaldo por si el observer no avisa en un scroll rápido (pasa en Safari):
      // todo lo que ya quedó por encima del borde inferior se muestra.
      let order = 0;
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) reveal(el, order++);
      });

      const mid = window.innerHeight / 2;
      inView.forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.2;
        const parent = el.parentElement ?? el;
        const rect = parent.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - mid) * speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      revealObserver.disconnect();
      parallaxObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
