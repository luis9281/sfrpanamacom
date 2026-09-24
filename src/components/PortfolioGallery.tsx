import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { whatsappLink } from "@/lib/site";

// El marco muestra la captura en 16:10 (720 × 450); al pasar el mouse se desplaza hasta el final.
const FRAME_HEIGHT = 450;

const cardWidth = "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]";

export default function PortfolioGallery() {
  return (
    <div data-reveal-stagger="up" className="flex flex-wrap justify-center gap-6">
      {portfolio.map((site) => (
        <a
          key={site.slug}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${site.name} — abrir ${site.domain} en una pestaña nueva`}
          style={
            {
              "--accent": site.accent,
              "--shift": `${-(1 - FRAME_HEIGHT / site.height) * 100}%`,
            } as CSSProperties
          }
          className={`${cardWidth} group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_var(--accent)]`}
        >
          {/* Barra de navegador */}
          <div className="flex items-center gap-3 border-b border-black/5 bg-neutral-50 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-[11px] font-medium text-neutral-500 ring-1 ring-black/5">
              {site.domain}
            </span>
          </div>

          {/* Captura del sitio */}
          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
            <Image
              src={`/images/portafolio/${site.slug}.webp`}
              alt={`Diseño de la página web de ${site.name}`}
              width={720}
              height={site.height}
              loading="lazy"
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-[5s] ease-in-out group-hover:translate-y-[var(--shift)] motion-reduce:transition-none"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
          </div>

          {/* Pie con color de marca */}
          <div className="relative flex flex-1 items-start gap-4 p-5">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-25 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100"
            />
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                {site.industry}
              </span>
              <h3 className="font-heading mt-1.5 text-lg font-bold text-brand-ink">
                {site.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-brand-charcoal-light/75">
                {site.description}
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-brand-charcoal transition-colors duration-300 group-hover:border-transparent group-hover:bg-[var(--accent)] group-hover:text-white">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </a>
      ))}

      {/* Tarjeta final: invitación a cotizar */}
      <a
        href={whatsappLink("Hola, quiero cotizar el diseño de una página web.")}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cardWidth} group relative flex min-h-80 flex-col justify-between overflow-hidden rounded-2xl bg-brand-charcoal p-8 text-white shadow-sm transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_rgba(124,194,66,0.8)]`}
      >
        <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-green/25 blur-3xl transition-transform duration-700 group-hover:scale-125" />
        <div className="relative">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">
            Tu proyecto
          </span>
          <h3 className="font-heading mt-3 text-2xl font-bold leading-snug">
            Tu empresa podría ser la próxima en esta galería
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Cuéntanos tu idea y te enviamos una propuesta de diseño, hosting y
            dominio a la medida.
          </p>
        </div>
        <span className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-bold text-brand-ink transition-transform group-hover:scale-105">
          <MessageCircle size={18} />
          Cotizar mi página web
        </span>
      </a>
    </div>
  );
}
