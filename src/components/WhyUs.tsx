import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  {
    title: "15+ años de experiencia",
    description: "Trayectoria comprobada apoyando pymes en Panamá.",
  },
  {
    title: "Soporte 24/7",
    description: "Tu operación TI nunca se detiene, ni siquiera un momento.",
  },
  {
    title: "Ahorro de hasta 60%",
    description: "Reduce costos de infraestructura migrando a AWS.",
  },
  {
    title: "Hasta 50% menos costo",
    description: "Frente a mantener un equipo de TI interno.",
  },
];

const values = [
  "Confianza",
  "Responsabilidad",
  "Conocimiento",
  "Soporte TI",
  "Cloud AWS",
  "Inteligencia Artificial",
  "Ciberseguridad",
  "Desarrollo Web",
  "Outsourcing TI",
];

export default function WhyUs() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-brand-green-light/40 py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div data-parallax="0.2" className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl" />
        <div data-parallax="-0.15" className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div data-reveal="left">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-green-dark">
              Nosotros
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              No vendemos servicios, entregamos soluciones reales
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-charcoal-light/80">
              En System FR Panamá llevamos más de 15 años ayudando a pequeñas
              y medianas empresas a resolver sus retos tecnológicos. Nuestro
              equipo de técnicos especializados trabaja en mantenimiento,
              reparaciones, servidores, seguridad, Windows, Linux y cableado
              estructurado, siempre enfocados en la continuidad de tu
              operación.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {values.map((value) => (
                <span
                  key={value}
                  className="rounded-full border border-brand-green/30 bg-white px-4 py-1.5 text-xs font-bold text-brand-charcoal"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>

          <div data-reveal="right" className="relative">
            <div
              aria-hidden="true"
              className="animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-green/40"
            />
            <div
              aria-hidden="true"
              className="animate-spin-slower pointer-events-none absolute left-1/2 top-1/2 h-[105%] w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-green/20"
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-green shadow-[0_0_12px_rgba(124,194,66,0.8)]" />
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-10 shadow-xl">
              <Image
                src="/images/logo-full.jpg"
                alt="System FR Panamá"
                width={640}
                height={533}
                className="mx-auto h-auto w-full max-w-sm"
              />
            </div>
          </div>
        </div>

        <div
          data-reveal-stagger="up"
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <CheckCircle2 className="text-brand-green" size={26} />
              <h3 className="font-heading mt-4 text-base font-bold text-brand-ink">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal-light/80">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
