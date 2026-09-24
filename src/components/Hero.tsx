import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import HeroCubes from "@/components/HeroCubes";
import HeroOrbit from "@/components/HeroOrbit";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-brand-charcoal"
    >
      <div className="bg-grid absolute inset-0 opacity-70" />
      <HeroCubes />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-brand-green/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-[-6rem] h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-green">
            Más de 15 años impulsando empresas en Panamá
          </span>

          <h1 className="font-heading mt-6 text-4xl font-bold leading-tight text-balance text-white sm:text-5xl lg:text-6xl">
            Soluciones TI en Panamá que tu{" "}
            <span className="text-brand-green">empresa merece</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Soporte técnico outsourcing, consultoría TI, cloud AWS,
            inteligencia artificial, desarrollo web y ciberseguridad para
            pequeñas y medianas empresas en Panamá. No vendemos servicios,
            entregamos soluciones reales.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={whatsappLink("Hola, quiero solicitar una cotización de servicios TI.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-brand-ink shadow-lg shadow-brand-green/20 transition-transform hover:scale-105 hover:bg-brand-green-dark hover:text-white"
            >
              <MessageCircle size={18} />
              Solicitar cotización
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-brand-green hover:text-brand-green"
            >
              Ver servicios
              <ArrowRight size={18} />
            </a>
          </div>

          <p className="mt-8 text-sm font-medium text-white/50">
            Tu operación TI, sin interrupciones — IA que trabaja por tu
            empresa, hoy.
          </p>
        </div>

        <HeroOrbit />
      </div>
    </section>
  );
}
