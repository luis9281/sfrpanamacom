import { ArrowRight, MessageCircle, ShieldCheck, Cloud, Cpu } from "lucide-react";
import { whatsappLink } from "@/lib/site";

const floatingCards = [
  { icon: Cloud, label: "Cloud AWS", position: "left-[-1.5rem] top-10 lg:left-[-2.5rem]" },
  { icon: ShieldCheck, label: "Ciberseguridad", position: "right-[-1rem] top-1/2 -translate-y-1/2 lg:right-[-2.5rem]" },
  { icon: Cpu, label: "Inteligencia Artificial", position: "left-6 bottom-[-1.5rem] lg:left-10" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-brand-charcoal"
    >
      <div className="bg-grid absolute inset-0 opacity-70" />
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

        <div className="relative mx-auto hidden aspect-square w-full max-w-md items-center justify-center lg:flex">
          <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-brand-green/30 bg-white/5">
            <div className="absolute inset-6 rounded-full border border-brand-green/20" />
            <div className="absolute inset-14 rounded-full border border-brand-green/10" />
            <span className="font-heading text-5xl font-extrabold text-white">
              SFR
            </span>

            {floatingCards.map(({ icon: Icon, label, position }) => (
              <div
                key={label}
                className={`absolute flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl ${position}`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green-light text-brand-green-dark">
                  <Icon size={16} />
                </span>
                <span className="text-xs font-bold text-brand-charcoal">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
